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
const Object3D_1 = require("./Object3D");
const Store_1 = require("../vuex/Store");
let Camera = class Camera extends Vue {
    constructor() {
        super(...arguments);
        // prop
        this.obj = av_ts_1.p({
            type: THREE.Camera
        });
    }
    created() {
        //debugger;
        this._obj = Store_1.default.getters.camera;
        console.log("Creating camera");
        //const w = this.$root.$el.offsetWidth; // fixme
        //const h = this.$root.$el.offsetHeight; // fixme
        //if (!(this._obj instanceof THREE.Camera)) {
        //    this._obj = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        //}
    }
    mounted() {
        //debugger;
        Store_1.default.commit('SET_CAMERA', this._obj);
    }
};
__decorate([
    av_ts_1.Prop
], Camera.prototype, "obj", void 0);
__decorate([
    av_ts_1.Lifecycle
], Camera.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], Camera.prototype, "mounted", null);
Camera = __decorate([
    av_ts_1.Component({
        name: 'Camera',
        mixins: [Object3D_1.default]
    })
], Camera);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Camera;
