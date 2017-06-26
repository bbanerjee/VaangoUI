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
const util_1 = require("./util");
let Camera = class Camera extends Vue {
    constructor() {
        super(...arguments);
        // prop
        this.size = av_ts_1.p({
            type: Object,
        });
        this.camera = av_ts_1.p({
            type: THREE.Camera
        });
        this.position = av_ts_1.p({
            type: Object // { x, y, z }
        });
    }
    created() {
        this.d_camera = Store_1.default.getters.camera;
        if (!this.d_camera) {
            let w = this.size.w;
            let h = this.size.h;
            this.d_camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
            console.log("Created camera");
            // Update the position if the template specifies that
            console.log(this.position);
            if (this.position) {
                this.updateCameraPosition(this.position);
            }
        }
    }
    mounted() {
        // Update the position if the template specifies that
        console.log(this.position);
        if (this.position) {
            this.updateCameraPosition(this.position);
        }
    }
    get getCamera() {
        return Store_1.default.getters.camera;
    }
    updateCameraPosition(pos) {
        console.log(pos);
        util_1.default(this.d_camera.position, pos);
        this.d_camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
        Store_1.default.commit('SET_CAMERA', this.d_camera);
        console.log(Store_1.default.getters.camera.position);
    }
};
__decorate([
    av_ts_1.Prop
], Camera.prototype, "size", void 0);
__decorate([
    av_ts_1.Prop
], Camera.prototype, "camera", void 0);
__decorate([
    av_ts_1.Prop
], Camera.prototype, "position", void 0);
__decorate([
    av_ts_1.Lifecycle
], Camera.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], Camera.prototype, "mounted", null);
Camera = __decorate([
    av_ts_1.Component({
        name: 'Camera',
    })
], Camera);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Camera;
