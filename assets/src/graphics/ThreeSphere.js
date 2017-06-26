"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const THREE = require("three");
const Vue = require("vue");
const av_ts_1 = require("av-ts");
const Store_1 = require("../vuex/Store");
let ThreeSphere = class ThreeSphere extends Vue {
    constructor() {
        super(...arguments);
        this.center = av_ts_1.p({
            type: Object,
            required: true
        });
        this.radius = av_ts_1.p({
            type: Number,
            required: true
        });
    }
    created() {
        let radius = this.radius;
        let center = this.center;
        this.createThreeSphere(radius, center);
        Store_1.default.commit('ADD_THREE_OBJECT', this.d_sphere);
        console.log("Added sphere to scene");
    }
    mounted() {
    }
    beforeDestroy() {
    }
    createThreeSphere(radius, center) {
        // Create the sphere
        this.d_geometry = new THREE.SphereBufferGeometry(radius, 10, 10);
        this.d_geometry.translate(center.x, center.y, center.z);
        this.d_material = new THREE.MeshPhongMaterial({
            color: 0xffaa00,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            shading: THREE.SmoothShading,
            wireframe: false
        });
        this.d_sphere = new THREE.Mesh(this.d_geometry, this.d_material);
        console.log("Created THREE.SphereBuffer");
    }
};
__decorate([
    av_ts_1.Prop
], ThreeSphere.prototype, "center", void 0);
__decorate([
    av_ts_1.Prop
], ThreeSphere.prototype, "radius", void 0);
__decorate([
    av_ts_1.Lifecycle
], ThreeSphere.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeSphere.prototype, "mounted", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeSphere.prototype, "beforeDestroy", null);
ThreeSphere = __decorate([
    av_ts_1.Component({
        name: 'ThreeSphere',
    })
], ThreeSphere);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThreeSphere;
