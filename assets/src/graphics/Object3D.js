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
const util_1 = require("./util");
let Object3D = class Object3D extends Vue {
    constructor() {
        super(...arguments);
        this.obj = av_ts_1.p({
            type: THREE.Object3D
        });
        this.position = av_ts_1.p({
            type: Object // { x, y, z }
        });
        this.rotation = av_ts_1.p({
            type: Object // { x, y, z }
        });
        // This is the instance variable in the data() method
        this._obj = null;
        this.parent = null;
    }
    // Watch handlers
    updatePosition(v) {
        //debugger;
        console.log("Updating position");
        if (v)
            util_1.default(this._obj.position, v);
    }
    updateRotation(v) {
        //debugger;
        if (v)
            util_1.default(this._obj.rotation, v);
    }
    // Lifecycle
    created() {
        //debugger;
        // fix vue 2.0 `Avoid mutating a prop directly since the value will be overwritten
        // whenever the parent component re-renders. Instead, use a data or computed
        // property based on the prop's value.`
        // https://dotdev.co/peeking-into-vue-js-2-part-1-b457e60c88c6#.918arzkow
        this._obj = this.obj;
        // this.obj = new Object3D() // holder
        if (!(this._obj instanceof THREE.Object3D)) {
            this._obj = new THREE.Object3D();
        }
        // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
        // this._obj.name = this._obj.name || this.constructor.name
        this._obj.name = this._obj.name || this._obj.type;
    }
    // ready => mounted + (nextTick?)
    // http://rc.vuejs.org/guide/migration.html#ready-deprecated
    mounted() {
        if (this.position)
            util_1.default(this._obj.position, this.position);
        if (this.rotation)
            util_1.default(this._obj.rotation, this.rotation);
        if (this.parent)
            this.parent.add(this._obj);
    }
    // detached => destroyed + (nextTick?)
    // http://rc.vuejs.org/guide/migration.html#detached-deprecated
    // but we use beforeDestroy to clean up
    beforeDestroy() {
        //debugger;
        if (this.parent)
            this.parent.remove(this._obj);
    }
};
__decorate([
    av_ts_1.Prop
], Object3D.prototype, "obj", void 0);
__decorate([
    av_ts_1.Prop
], Object3D.prototype, "position", void 0);
__decorate([
    av_ts_1.Prop
], Object3D.prototype, "rotation", void 0);
__decorate([
    av_ts_1.Watch('position')
], Object3D.prototype, "updatePosition", null);
__decorate([
    av_ts_1.Watch('rotation')
], Object3D.prototype, "updateRotation", null);
__decorate([
    av_ts_1.Lifecycle
], Object3D.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], Object3D.prototype, "mounted", null);
__decorate([
    av_ts_1.Lifecycle
], Object3D.prototype, "beforeDestroy", null);
Object3D = __decorate([
    av_ts_1.Component({
        name: 'Object3D'
    })
], Object3D);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Object3D;
