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
//import ThreeObject3D from './ThreeObject3D';
const Store_1 = require("../vuex/Store");
let ThreeScene = 
//export default class ThreeScene extends Vue implements ThreeObject3D {
class ThreeScene extends Vue {
    constructor() {
        super(...arguments);
        this.size = av_ts_1.p({
            type: Object,
        });
        this.scene = av_ts_1.p({
            type: THREE.Scene
        });
    }
    created() {
        // Create the scene
        this.d_scene = Store_1.default.getters.scene;
        if (!this.scene) {
            this.d_scene = new THREE.Scene();
            console.log("Created scene");
            // Add the lights
            let dirLight = new THREE.DirectionalLight(0xffffff);
            dirLight.position.set(1, 1, 1);
            this.d_scene.add(dirLight);
            dirLight = new THREE.DirectionalLight(0x002288);
            dirLight.position.set(-1, -1, -1);
            this.d_scene.add(dirLight);
            let ambLight = new THREE.AmbientLight(0x222222);
            this.d_scene.add(ambLight);
            console.log("Added lights");
            // Update the scene
            Store_1.default.commit('SET_SCENE', this.d_scene);
        }
    }
    mounted() {
        // Get the camera
        let camera = Store_1.default.getters.camera;
        console.log("Got camera");
        // Add the camera to the scene
        if (camera) {
            this.d_scene.add(camera);
            console.log("Added camera to scene");
            console.log(camera.position);
            // Update the scene
            Store_1.default.commit('SET_SCENE', this.d_scene);
        }
        else {
            console.log("Camera has not been created yet");
        }
    }
    beforeDestroy() {
    }
};
__decorate([
    av_ts_1.Prop
], ThreeScene.prototype, "size", void 0);
__decorate([
    av_ts_1.Prop
], ThreeScene.prototype, "scene", void 0);
__decorate([
    av_ts_1.Lifecycle
], ThreeScene.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeScene.prototype, "mounted", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeScene.prototype, "beforeDestroy", null);
ThreeScene = __decorate([
    av_ts_1.Component({
        name: 'Scene',
    })
], ThreeScene);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThreeScene;
