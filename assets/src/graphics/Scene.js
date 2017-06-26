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
let Scene = class Scene extends Vue {
    constructor() {
        super(...arguments);
        this.obj = av_ts_1.p({
            type: THREE.Scene
        });
    }
    created() {
        this._obj = Store_1.default.getters.scene;
        console.log("Got scene");
    }
    mounted() {
        //this.updatePosition(this.position);
        Store_1.default.commit('SET_SCENE', this._obj);
        console.log("Set the scene");
    }
};
__decorate([
    av_ts_1.Prop
], Scene.prototype, "obj", void 0);
__decorate([
    av_ts_1.Lifecycle
], Scene.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], Scene.prototype, "mounted", null);
Scene = __decorate([
    av_ts_1.Component({
        name: 'Scene',
        mixins: [Object3D_1.default]
    })
], Scene);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Scene;
