const Vue = require("vue");
const THREE = require('three');
const ThreeTrackball = require('./ThreeTrackball');

const Store = require('../vuex/Store').default;

let GeometryEditorRenderer = Vue.extend(
  {
    name: 'GeometryEditorRenderer',

    props: {
      size : {
        type: Object, // { w, h }
        required: true
      },

      renderer : {
        type: THREE.WebGLRenderer
      }
    },

    data() {
  
      return {
        d_renderer: null,
        d_controls: null,
        d_testCamera : null,
        d_cameraHelper : null,

        d_pointer: { x: 0, y: 0 },
        d_pointerOld: { x: 0, y: 0 },
        d_size: {left: 0, top: 0, width: 0, height: 0}
      };
    }, 

    created() {
      this.d_renderer = this.renderer;
      if (!(this.d_renderer instanceof THREE.WebGLRenderer)) {
        this.d_renderer = new THREE.WebGLRenderer({ antialias: true });
      }
      let w = (this.size).w;
      let h = (this.size).h;
      this.d_size = {left: 0, top: 0, width: w, height: w};
      this.d_renderer.setSize(w, h);
      this.d_renderer.setClearColor(0x52576e)
      this.d_testCamera = new THREE.PerspectiveCamera( 30, w/h, 100, 200 );
      this.d_cameraHelper = new THREE.CameraHelper( this.d_testCamera );
      this.d_pointer = {x: 0, y: 0};
      this.d_pointerOld = {x: 0, y: 0};
      console.log("Created Geometry editor renderer");
    },

    computed: {
      getScene() {
        return Store.getters.editorScene;
      },
        
      getCamera() {
        return Store.getters.editorCamera;
      },

      getTrackballControls() {
        return this.d_controls;
      }
    }, 

    mounted() {
      console.log("Mounted geometry editor renderer");
      console.log(this.$refs);
      console.log(this.d_renderer.domElement);
      this.d_renderer.domElement.setAttribute("id", "editor-canvas");
      if ((this.$refs)["editor-container"]) {
        console.log("Geometry editor container created");
        let el  = (this.$refs)["editor-container"];
        el.appendChild(this.d_renderer.domElement);

        // Update based on actual screen size
        this.setActualScreenSize(this.d_renderer.domElement);
        this.d_renderer.setSize(this.d_size.width, this.d_size.height);
        let camera = Store.getters.editorCamera;
        camera.aspect = this.d_size.width / this.d_size.height;
        camera.updateProjectionMatrix();
        Store.commit('SET_EDITOR_CAMERA', camera);

        this.d_controls = new ThreeTrackball(Store.getters.camera,
                                             this.d_renderer.domElement);
        console.log("Ediotr trackballControls: mounted + created");
        this.d_controls.rotateSpeed = 10.0;
        this.d_controls.zoomSpeed = 1.2;
        this.d_controls.panSpeed = 0.8;
        this.d_controls.noZoom = false;
        this.d_controls.noPan = false;
        this.d_controls.staticMoving = true;
        this.d_controls.dynamicDampingFactor = 0.3;
        this.d_controls.keys = [65, 83, 68];
        console.log("Added trackball controls")

        let scene = Store.getters.editorScene;
        scene.add(this.d_cameraHelper);
        Store.commit('SET_EDITOR_SCENE', scene);

      }
      this.animate();
    },

    // It's good to clean up event listeners before
    // a component is destroyed.
    // http://rc.vuejs.org/guide/migration.html#ready-deprecated
    beforeDestroy() {
      Store.commit('DELETE_EDITOR_SCENE');
      Store.commit('DELETE_EDITOR_CAMERA');
    },

    methods: {
      setActualScreenSize(domElement) {
        let box = domElement.getBoundingClientRect();
        let d = domElement.ownerDocument.documentElement;
        this.d_size.left = box.left + window.pageXOffset - d.clientLeft;
        this.d_size.top = box.top + window.pageYOffset - d.clientTop;
        this.d_size.width = box.width;
        this.d_size.height = box.height;
      },

      animate() {
        requestAnimationFrame( this.animate );
        this.render();
      },

      render() {
        this.d_renderer.render(Store.getters.scene, Store.getters.camera);
        //console.log("Done rendering");
      },

      startRotation(event) {
        console.log("drag started");
        let pointerOld = this.getMousePosition(event.clientX, event.clientY);
        this.d_pointerOld.x = pointerOld[0];
        this.d_pointerOld.y = pointerOld[1];
      },

      endRotation(event) {
        console.log("drag ended");
        let pointer = this.getMousePosition(event.clientX, event.clientY);
        this.d_pointer.x = pointer[0];
        this.d_pointer.y = pointer[1];
        console.log(this.d_pointerOld.x + "," + this.d_pointerOld.y + "," +
                    this.d_pointer.x + ", " + this.d_pointer.y);
        console.log(this.d_renderer.domElement.getBoundingClientRect());       
      },

      getMousePosition(x, y) {
        let rect = this.d_renderer.domElement.getBoundingClientRect();
                    return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
      },

      keydown(event) {
        this.d_controls.keydown(event);
      },

      keyup(event) {
        this.d_controls.keyup(event);
      },

      mousedown(event) {
        event.preventDefault();
        this.d_controls.mousedown(event);
      },

      mousemove(event) {
        event.preventDefault();
        this.d_controls.mousemove(event);
      },

      mouseup(event) {
        event.preventDefault();
        this.d_controls.mouseup(event);
        Store.commit('SET_EDITOR_CAMERA', this.d_controls.camera)
      },

      mousewheel(event) {
        event.preventDefault();
        this.d_controls.mousewheel(event);
        Store.commit('SET_EDITOR_CAMERA', this.d_controls.camera)
      },

      contextmenu(event) {
        event.preventDefault();
      }
    }
  }
);

exports.default = GeometryEditorRenderer;
