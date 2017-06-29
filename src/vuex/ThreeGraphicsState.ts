import THREE = require('three');

export class ThreeGraphicsState {
  scene      : THREE.Scene;
  camera     : THREE.Camera;
  areThreeObjectsCreated : boolean;

  constructor(w: number, h: number) {
    this.scene = <THREE.Scene>null;
    this.camera = <THREE.Camera>null;
    this.areThreeObjectsCreated = false;
  }
};
