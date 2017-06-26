"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const THREE = require("three");
const ThreeTrackball = require("./ThreeTrackball");
const av_ts_1 = require("av-ts");
const Store_1 = require("../vuex/Store");
let ThreeRenderer = class ThreeRenderer extends Vue {
    constructor() {
        super(...arguments);
        this.size = av_ts_1.p({
            type: Object,
            required: true
        });
        this.renderer = av_ts_1.p({
            type: THREE.WebGLRenderer
        });
    }
    created() {
        this.d_renderer = this.renderer;
        if (!(this.d_renderer instanceof THREE.WebGLRenderer)) {
            this.d_renderer = new THREE.WebGLRenderer({ antialias: true });
        }
        let w = this.size.w;
        let h = this.size.h;
        this.d_renderer.setSize(w, h);
        this.d_renderer.setClearColor(0x52576e);
        this.d_testCamera = new THREE.PerspectiveCamera(30, w / h, 100, 200);
        this.d_cameraHelper = new THREE.CameraHelper(this.d_testCamera);
        this.d_pointer = { x: 0, y: 0 };
        this.d_pointerOld = { x: 0, y: 0 };
        console.log("Created THREE renderer");
    }
    get getScene() {
        return Store_1.default.getters.scene;
    }
    get getCamera() {
        return Store_1.default.getters.camera;
    }
    get getTrackballControls() {
        return this.d_controls;
    }
    mounted() {
        console.log("Mounted THREE renderer");
        console.log(this.$refs);
        console.log(this.d_renderer.domElement);
        this.d_renderer.domElement.setAttribute("id", "three-graphics-canvas");
        if ((this.$refs)["three-graphics-container"]) {
            console.log("Graphics container created");
            let el = (this.$refs)["three-graphics-container"];
            el.appendChild(this.d_renderer.domElement);
            this.d_controls = new ThreeTrackball(Store_1.default.getters.camera, this.d_renderer.domElement);
            console.log("TrackballControls: mounted + created");
            this.d_controls.rotateSpeed = 10.0;
            this.d_controls.zoomSpeed = 1.2;
            this.d_controls.panSpeed = 0.8;
            this.d_controls.noZoom = false;
            this.d_controls.noPan = false;
            this.d_controls.staticMoving = true;
            this.d_controls.dynamicDampingFactor = 0.3;
            this.d_controls.keys = [65, 83, 68];
            console.log("Added trackball controls");
            let scene = Store_1.default.getters.scene;
            scene.add(this.d_cameraHelper);
            Store_1.default.commit('SET_SCENE', scene);
        }
        this.animate();
    }
    // It's good to clean up event listeners before
    // a component is destroyed.
    // http://rc.vuejs.org/guide/migration.html#ready-deprecated
    beforeDestroy() {
        Store_1.default.commit('DELETE_SCENE');
        Store_1.default.commit('DELETE_CAMERA');
    }
    animate() {
        requestAnimationFrame(this.animate);
        this.render();
    }
    render() {
        this.d_renderer.render(Store_1.default.getters.scene, Store_1.default.getters.camera);
        //console.log("Done rendering");
    }
    startRotation(event) {
        console.log("drag started");
        let pointerOld = this.getMousePosition(event.clientX, event.clientY);
        this.d_pointerOld.x = pointerOld[0];
        this.d_pointerOld.y = pointerOld[1];
    }
    endRotation(event) {
        console.log("drag ended");
        let pointer = this.getMousePosition(event.clientX, event.clientY);
        this.d_pointer.x = pointer[0];
        this.d_pointer.y = pointer[1];
        console.log(this.d_pointerOld.x + "," + this.d_pointerOld.y + "," +
            this.d_pointer.x + ", " + this.d_pointer.y);
        console.log(this.d_renderer.domElement.getBoundingClientRect());
    }
    getMousePosition(x, y) {
        let rect = this.d_renderer.domElement.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }
    keydown(event) {
        this.d_controls.keydown(event);
    }
    keyup(event) {
        this.d_controls.keyup(event);
    }
    mousedown(event) {
        event.preventDefault();
        this.d_controls.mousedown(event);
    }
    mousemove(event) {
        event.preventDefault();
        this.d_controls.mousemove(event);
    }
    mouseup(event) {
        event.preventDefault();
        this.d_controls.mouseup(event);
        Store_1.default.commit('SET_CAMERA', this.d_controls.camera);
    }
    mousewheel(event) {
        event.preventDefault();
        this.d_controls.mousewheel(event);
        Store_1.default.commit('SET_CAMERA', this.d_controls.camera);
    }
    contextmenu(event) {
        event.preventDefault();
    }
};
__decorate([
    av_ts_1.Prop
], ThreeRenderer.prototype, "size", void 0);
__decorate([
    av_ts_1.Prop
], ThreeRenderer.prototype, "renderer", void 0);
__decorate([
    av_ts_1.Lifecycle
], ThreeRenderer.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeRenderer.prototype, "mounted", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeRenderer.prototype, "beforeDestroy", null);
ThreeRenderer = __decorate([
    av_ts_1.Component({
        name: 'ThreeRenderer'
    })
], ThreeRenderer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThreeRenderer;
