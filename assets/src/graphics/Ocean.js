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
const ThreeObject3D_1 = require("./ThreeObject3D");
const Store_1 = require("../vuex/Store");
let Ocean = class Ocean extends Vue {
    created() {
        //debugger;
        this.animate = this.animate.bind(this);
        this.clock = new THREE.Clock();
        this._obj = this.createOcean();
    }
    mounted() {
        //debugger;
        Store_1.default.commit('ADD_OBJECT', this._obj);
        this.animate();
    }
    //methods: {
    createOcean() {
        //debugger;
        const geometry = new THREE.PlaneGeometry(10000, 10000, 40, 40);
        geometry.rotateX(-Math.PI / 2);
        for (let i = 0, l = geometry.vertices.length; i < l; i++) {
            geometry.vertices[i].y = 50.0 * Math.sin(i / 2);
        }
        const texture = new THREE.TextureLoader().load(require('./water.jpg'));
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
        const material = new THREE.MeshBasicMaterial({ color: 0x0044ff, map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Ocean';
        return mesh;
    }
    animate() {
        //debugger;
        requestAnimationFrame(this.animate);
        const time = this.clock.getElapsedTime() * 5;
        for (let i = 0, l = this._obj.geometry.vertices.length; i < l; i++) {
            this._obj.geometry.vertices[i].y = 10 * Math.sin(i / 5 + (time + i) / 7);
        }
        this._obj.geometry.verticesNeedUpdate = true;
    }
};
__decorate([
    av_ts_1.Lifecycle
], Ocean.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], Ocean.prototype, "mounted", null);
Ocean = __decorate([
    av_ts_1.Component({
        name: 'Ocean',
        mixins: [ThreeObject3D_1.default]
    })
], Ocean);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ocean;
