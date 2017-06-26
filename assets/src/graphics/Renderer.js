"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const THREE = require("three");
const av_ts_1 = require("av-ts");
const Store_1 = require("../vuex/Store");
let ThreeRenderer = class ThreeRenderer extends Vue {
    constructor() {
        super(...arguments);
        this.size = av_ts_1.p({
            type: Object,
            required: true
        });
        this.obj = av_ts_1.p({
            type: THREE.WebGLRenderer
        });
    }
    created() {
        this.animate = this.animate.bind(this);
        this._obj = this.obj;
        if (!(this._obj instanceof THREE.WebGLRenderer)) {
            this._obj = new THREE.WebGLRenderer({ antialias: true });
        }
        let w = this.size.w;
        let h = this.size.h;
        this._obj.setSize(w, h);
        this._obj.setClearColor(0x000000);
        this._pointer = { x: 0, y: 0 };
        this._pointerOld = { x: 0, y: 0 };
    }
    get getScene() {
        return Store_1.default.getters.scene;
    }
    get getCamera() {
        return Store_1.default.getters.camera;
    }
    mounted() {
        console.log("Mounted THREE renderer");
        console.log(this.$refs);
        console.log(this._obj.domElement);
        //this._obj.domElement,appendTo(this.$refs["graphics-container"]);
        //this.$refs["graphics-container"].appendChild(this._obj.domElement);
        if ((this.$refs)["three-graphics-container"]) {
            console.log("Graphics container created");
            let el = (this.$refs)["three-graphics-container"];
            el.appendChild(this._obj.domElement);
        }
        this._animationOn = true;
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
        this._animationID = requestAnimationFrame(this.animate);
        this._obj.render(Store_1.default.getters.scene, Store_1.default.getters.camera);
    }
    stopAnimation(event) {
        console.log(event);
        console.log("Click detected in renderer");
        console.log(this._animationOn);
        if (this._animationOn) {
            cancelAnimationFrame(this._animationID);
        }
        else {
            this.animate();
        }
        this._animationOn = !this._animationOn;
    }
    startRotation(event) {
        console.log("drag started");
        let pointerOld = this.getMousePosition(event.clientX, event.clientY);
        this._pointerOld.x = pointerOld[0];
        this._pointerOld.y = pointerOld[1];
    }
    endRotation(event) {
        //debugger;
        console.log("drag ended");
        let pointer = this.getMousePosition(event.clientX, event.clientY);
        this._pointer.x = pointer[0];
        this._pointer.y = pointer[1];
        console.log(this._pointerOld.x + "," + this._pointerOld.y + "," +
            this._pointer.x + ", " + this._pointer.y);
        console.log(this._obj.domElement.getBoundingClientRect());
    }
    getMousePosition(x, y) {
        let rect = this._obj.domElement.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }
};
__decorate([
    av_ts_1.Prop
], ThreeRenderer.prototype, "size", void 0);
__decorate([
    av_ts_1.Prop
], ThreeRenderer.prototype, "obj", void 0);
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
