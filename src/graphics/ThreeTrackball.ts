import THREE = require('three');

interface Screen {
  left: number; top: number; width: number; height: number;
}

class ThreeTrackball {

  // Constants
  static readonly STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
  static readonly EPS = 0.000001;

  // Input parameters
  public camera: THREE.Camera;
  public domElement: HTMLCanvasElement;

  // API
  public enabled: boolean;
  public screen: Screen;

  public rotateSpeed: number;
  public zoomSpeed: number;
  public panSpeed: number;

  public noRotate: boolean;
  public noZoom: boolean;
  public noPan: boolean;

  public staticMoving: boolean;
  public dynamicDampingFactor: number;

  public minDistance: number;
  public maxDistance: number;

  public keys: number[];

  // internals

  private d_target: THREE.Vector3;

  private d_lastPosition: THREE.Vector3;

  private d_state: Object;
  private d_prevState: Object;

  private d_eye: THREE.Vector3;

  private d_movePrev: THREE.Vector2;
  private d_moveCurr: THREE.Vector2;

  private d_lastAxis: THREE.Vector3;
  private d_lastAngle = 0;

  private d_zoomStart: THREE.Vector2;
  private d_zoomEnd: THREE.Vector2;

  private d_touchZoomDistanceStart = 0;
  private d_touchZoomDistanceEnd = 0;

  private d_panStart: THREE.Vector2;
  private d_panEnd: THREE.Vector2;

  // for reset

  private d_target0: THREE.Vector3;
  private d_position0: THREE.Vector3;
  private d_up0: THREE.Vector3;

  // events

  private changeEvent: Object;
  private startEvent: Object;
  private endEvent: Object;

  // private quantitie that were used in closures in original code
  private vector: THREE.Vector2;
  private axis: THREE.Vector3;
  private quaternion: THREE.Quaternion;
  private eyeDirection: THREE.Vector3;
  private objectUpDirection: THREE.Vector3;
  private objectSidewaysDirection: THREE.Vector3;
  private moveDirection: THREE.Vector3;
  private angle: number;
  private mouseChange: THREE.Vector2;
  private objectUp: THREE.Vector3;
  private pan: THREE.Vector3;

  // Constructor
  constructor(camera: THREE.Camera, domElement: HTMLCanvasElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.enabled = true;
    this.screen = { left: 0, top: 0, width: 0, height: 0 };
    this.rotateSpeed = 1.0;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;
    this.noRotate = false;
    this.noZoom = false;
    this.noPan = false;
    this.staticMoving = false;
    this.dynamicDampingFactor = 0.2;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

    this.d_target = new THREE.Vector3();
    this.d_lastPosition = new THREE.Vector3();
    this.d_state = ThreeTrackball.STATE.NONE;
    this.d_prevState = ThreeTrackball.STATE.NONE;
    this.d_eye = new THREE.Vector3();
    this.d_movePrev = new THREE.Vector2();
    this.d_moveCurr = new THREE.Vector2();
    this.d_lastAxis = new THREE.Vector3();
    this.d_lastAngle = 0;
    this.d_zoomStart = new THREE.Vector2();
    this.d_zoomEnd = new THREE.Vector2();
    this.d_touchZoomDistanceStart = 0;
    this.d_touchZoomDistanceEnd = 0;
    this.d_panStart = new THREE.Vector2();
    this.d_panEnd = new THREE.Vector2();

    this.d_target0 = this.d_target.clone();
    this.d_position0 = this.camera.position.clone();
    this.d_up0 = this.camera.up.clone();

    this.changeEvent = { type: 'change' };
    this.startEvent = { type: 'start' };
    this.endEvent = { type: 'end' };

    this.vector = new THREE.Vector2();
    this.axis = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.eyeDirection = new THREE.Vector3();
    this.objectUpDirection = new THREE.Vector3();
    this.objectSidewaysDirection = new THREE.Vector3();
    this.moveDirection = new THREE.Vector3();
    this.angle = 0.0;
    this.mouseChange = new THREE.Vector2();
    this.objectUp = new THREE.Vector3();
    this.pan = new THREE.Vector3();

    this.handleResize();
    this.update();
  }

  public handleResize(): void {
    let box = this.domElement.getBoundingClientRect();
    // adjustments come from similar code in the jquery offset() function
    let d = this.domElement.ownerDocument.documentElement;
    this.screen.left = box.left + window.pageXOffset - d.clientLeft;
    this.screen.top = box.top + window.pageYOffset - d.clientTop;
    this.screen.width = box.width;
    this.screen.height = box.height;
  }

  public getMouseOnScreen(pageX: number, pageY: number): THREE.Vector2 {
    this.vector.set(
      (pageX - this.screen.left) / this.screen.width,
      (pageY - this.screen.top) / this.screen.height
    );
    return this.vector;
  }

  public getMouseOnCircle(pageX: number, pageY: number): THREE.Vector2 {
    this.vector.set(
      ((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5)),
      ((this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width) // screen.width intentional
    );
    return this.vector;
  }

  public rotateCamera(): void {
    this.moveDirection.set(this.d_moveCurr.x - this.d_movePrev.x, this.d_moveCurr.y - this.d_movePrev.y, 0);
    this.angle = this.moveDirection.length();
    //console.log("Rotate camera: move dir" +  this.angle)
    if (this.angle) {
      this.d_eye.copy(this.camera.position).sub(this.d_target);
      this.eyeDirection.copy(this.d_eye).normalize();
      this.objectUpDirection.copy(this.camera.up).normalize();
      this.objectSidewaysDirection.crossVectors(this.objectUpDirection, this.eyeDirection).normalize();
      this.objectUpDirection.setLength(this.d_moveCurr.y - this.d_movePrev.y);
      this.objectSidewaysDirection.setLength(this.d_moveCurr.x - this.d_movePrev.x);
      this.moveDirection.copy(this.objectUpDirection.add(this.objectSidewaysDirection));
      this.axis.crossVectors(this.moveDirection, this.d_eye).normalize();
      this.angle *= this.rotateSpeed;
      this.quaternion.setFromAxisAngle(this.axis, this.angle);
      this.d_eye.applyQuaternion(this.quaternion);
      this.camera.up.applyQuaternion(this.quaternion);
      this.d_lastAxis.copy(this.axis);
      this.d_lastAngle = this.angle;
    } else if (!this.staticMoving && this.d_lastAngle) {
      this.d_lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
      this.d_eye.copy(this.camera.position).sub(this.d_target);
      this.quaternion.setFromAxisAngle(this.d_lastAxis, this.d_lastAngle);
      this.d_eye.applyQuaternion(this.quaternion);
      this.camera.up.applyQuaternion(this.quaternion);
    }
    this.d_movePrev.copy(this.d_moveCurr);
  }

  public zoomCamera(): void {
    var factor;
    if (this.d_state === ThreeTrackball.STATE.TOUCH_ZOOM_PAN) {
      factor = this.d_touchZoomDistanceStart / this.d_touchZoomDistanceEnd;
      this.d_touchZoomDistanceStart = this.d_touchZoomDistanceEnd;
      this.d_eye.multiplyScalar(factor);
    } else {
      factor = 1.0 + (this.d_zoomEnd.y - this.d_zoomStart.y) * this.zoomSpeed;
      if (factor !== 1.0 && factor > 0.0) {
        this.d_eye.multiplyScalar(factor);
      }
      if (this.staticMoving) {
        this.d_zoomStart.copy(this.d_zoomEnd);
      } else {
        this.d_zoomStart.y += (this.d_zoomEnd.y - this.d_zoomStart.y) * this.dynamicDampingFactor;
      }
    }
  }

  public panCamera(): void {
    this.mouseChange.copy(this.d_panEnd).sub(this.d_panStart);
    //console.log("Panning: Mouse movement = " + this.mouseChange.lengthSq());
    if (this.mouseChange.lengthSq()) {
      this.mouseChange.multiplyScalar(this.d_eye.length() * this.panSpeed);
      this.pan.copy(this.d_eye).cross(this.camera.up).setLength(this.mouseChange.x);
      this.pan.add(this.objectUp.copy(this.camera.up).setLength(this.mouseChange.y));
      this.camera.position.add(this.pan);
      this.d_target.add(this.pan);
      if (this.staticMoving) {
        //console.log("panning static");
        this.d_panStart.copy(this.d_panEnd);
      } else {
        //console.log("panning dynamic");
        this.d_panStart.add(this.mouseChange.subVectors(this.d_panEnd, this.d_panStart)
          .multiplyScalar(this.dynamicDampingFactor));
      }
    }
  }

  public checkDistances(): void {
    if (!this.noZoom || !this.noPan) {
      if (this.d_eye.lengthSq() > this.maxDistance * this.maxDistance) {
        this.camera.position.addVectors(this.d_target, this.d_eye.setLength(this.maxDistance));
        this.d_zoomStart.copy(this.d_zoomEnd);
      }
      if (this.d_eye.lengthSq() < this.minDistance * this.minDistance) {
        this.camera.position.addVectors(this.d_target, this.d_eye.setLength(this.minDistance));
        this.d_zoomStart.copy(this.d_zoomEnd);
      }
    }
  }

  public update(): void {
    this.d_eye.subVectors(this.camera.position, this.d_target);
    if (!this.noRotate) {
      this.rotateCamera();
    }
    if (!this.noZoom) {
      this.zoomCamera();
    }
    if (!this.noPan) {
      this.panCamera();
    }
    this.camera.position.addVectors(this.d_target, this.d_eye);
    this.checkDistances();
    this.camera.lookAt(this.d_target);
    if (this.d_lastPosition.distanceToSquared(this.camera.position) > ThreeTrackball.EPS) {
      this.d_lastPosition.copy(this.camera.position);
    }
  }

  public reset(): void {
    this.d_state = ThreeTrackball.STATE.NONE;
    this.d_prevState = ThreeTrackball.STATE.NONE;
    this.d_target.copy(this.d_target0);
    this.camera.position.copy(this.d_position0);
    this.camera.up.copy(this.d_up0);
    this.d_eye.subVectors(this.camera.position, this.d_target);
    this.camera.lookAt(this.d_target);
    this.d_lastPosition.copy(this.camera.position);
  }

  // listeners

  public keydown(event: KeyboardEvent): void {
    if (this.enabled === false) return;
    this.d_prevState = this.d_state;
    if (this.d_state !== ThreeTrackball.STATE.NONE) {
      return;
    } else if (event.keyCode === this.keys[ThreeTrackball.STATE.ROTATE] && !this.noRotate) {
      this.noZoom = true;
      this.noPan = true;
      this.d_state = ThreeTrackball.STATE.ROTATE;
    } else if (event.keyCode === this.keys[ThreeTrackball.STATE.ZOOM] && !this.noZoom) {
      this.noRotate = true;
      this.noPan = true;
      this.d_state = ThreeTrackball.STATE.ZOOM;
    } else if (event.keyCode === this.keys[ThreeTrackball.STATE.PAN] && !this.noPan) {
      this.noRotate = true;
      this.noZoom = true;
      this.d_state = ThreeTrackball.STATE.PAN;
    }
  }

  public keyup(event: KeyboardEvent): void {
    if (this.enabled === false) return;
    this.d_state = this.d_prevState;
  }

  public mousedown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    //console.log("Button = " + event.button);
    if (this.enabled === false) return;
    if (this.d_state === ThreeTrackball.STATE.NONE) {
      this.d_state = event.button;
    }
    if (this.d_state === ThreeTrackball.STATE.ROTATE && !this.noRotate) {
      this.noZoom = true;
      this.noPan = true;
      this.d_moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
      this.d_movePrev.copy(this.d_moveCurr);
    } else if (this.d_state === ThreeTrackball.STATE.ZOOM && !this.noZoom) {
      this.noRotate = true;
      this.noPan = true;
      this.d_zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
      this.d_zoomEnd.copy(this.d_zoomStart);
    } else if (this.d_state === ThreeTrackball.STATE.PAN && !this.noPan) {
      this.noRotate = true;
      this.noZoom = true;
      //console.log("State = " + this.d_state);
      //console.log("Location = " + event.pageX + ", " + event.pageY);
      this.d_panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
      this.d_panEnd.copy(this.d_panStart);
    }
  }

  public mousemove(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.enabled === false) return;
    if (this.d_state === ThreeTrackball.STATE.ROTATE && !this.noRotate) {
      this.d_movePrev.copy(this.d_moveCurr);
      this.d_moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
    } else if (this.d_state === ThreeTrackball.STATE.ZOOM && !this.noZoom) {
      this.d_zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
    } else if (this.d_state === ThreeTrackball.STATE.PAN && !this.noPan) {
      //console.log("Move State = " + this.d_state);
      //console.log("Move Location = " + event.pageX + ", " + event.pageY);
      this.d_panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
    }
    this.update();
  }

  public mouseup(event: MouseEvent): void {
    if (this.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();
    this.update();
    this.noRotate = false;
    this.noZoom = false;
    this.noPan = false;
    this.d_state = ThreeTrackball.STATE.NONE;
  }

  public mousewheel(event: WheelEvent): void {
    if (this.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();
    this.noRotate = true;
    this.noPan = true;
    switch (event.deltaMode) {
      case 2:
        // Zoom in pages
        this.d_zoomStart.y -= event.deltaY * 0.025;
        break;
      case 1:
        // Zoom in lines
        this.d_zoomStart.y -= event.deltaY * 0.01;
        break;
      default:
        // undefined, 0, assume pixels
        this.d_zoomStart.y -= event.deltaY * 0.00025;
        break;
    }
    this.update();
    this.noRotate = false;
    this.noZoom = false;
    this.noPan = false;
    this.d_state = ThreeTrackball.STATE.NONE;
  }
}

export = ThreeTrackball;