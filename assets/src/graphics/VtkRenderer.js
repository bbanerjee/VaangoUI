"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* global requestAnimationFrame */
/* eslint-disable no-duplicate-imports */
const Vue = require("vue");
const av_ts_1 = require("av-ts");
const Store_1 = require("../vuex/Store");
const vtkRenderWindow = require("vtk.js/Sources/Rendering/Core/RenderWindow");
const vtkRenderer = require("vtk.js/Sources/Rendering/Core/Renderer");
const vtkOpenGLRenderWindow = require("vtk.js/Sources/Rendering/OpenGL/RenderWindow");
const vtkRenderWindowInteractor = require("vtk.js/Sources/Rendering/Core/RenderWindowInteractor");
//import * as vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
//import * as vtk from '../../assets/libs/vtk';
//import vtk = require('vtk.js');
//import * as vtk_dummy from 'vtk.js';
//var vtk_dummy = require('vtk.js');
let VtkRenderer = class VtkRenderer extends Vue {
    //import * as vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
    //import * as vtk from '../../assets/libs/vtk';
    //import vtk = require('vtk.js');
    //import * as vtk_dummy from 'vtk.js';
    //var vtk_dummy = require('vtk.js');
    constructor() {
        super(...arguments);
        this.size = av_ts_1.p({
            type: Object,
            required: true
        });
        this.renderWindow = av_ts_1.p({
            type: vtkRenderWindow
        });
        this.renderer = av_ts_1.p({
            type: vtkRenderer
        });
        this.openGLRenderWindow = av_ts_1.p({
            type: vtkOpenGLRenderWindow
        });
        this.interactor = av_ts_1.p({
            type: vtkRenderWindowInteractor
        });
    }
    created() {
        this._renderWindow = this.renderWindow;
        this._renderer = this.renderer;
        this._openGLRenderWindow = this.openGLRenderWindow;
        this._interactor = this.interactor;
        this._pointer = { x: 0, y: 0 };
        this._pointerOld = { x: 0, y: 0 };
        // Create VTK render window and renderer
        this._renderWindow = vtkRenderWindow.newInstance();
        this._renderer = vtkRenderer.newInstance();
        this._renderWindow.addRenderer(this._renderer);
        this._renderer.setBackground(0.32, 0.34, 0.43);
        // Create OpenGL renderwindow
        this._openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
        this._renderWindow.addView(this._openGLRenderWindow);
        // Create interactor
        this._interactor = vtkRenderWindowInteractor.newInstance();
        // Add watch to check for data updates
        var self = this;
        Store_1.default.watch(function () { return Store_1.default.getters.areVTKActorsCreated; }, function () {
            console.log("areVTKActorsCreated? " + Store_1.default.getters.areVTKActorsCreated);
            if (Store_1.default.getters.areVTKActorsCreated) {
                self.addActors();
                self._renderer.resetCamera();
                self._renderWindow.render();
            }
        });
    }
    beforeMount() {
    }
    mounted() {
        console.log("Mounting VTK renderer");
        console.log(this.$refs);
        console.log(this._renderWindow.domElement);
        if ((this.$refs)["vtk-graphics-container"]) {
            console.log("VTK Graphics container created");
            let el = (this.$refs)["vtk-graphics-container"];
            this._openGLRenderWindow.setContainer(el);
            // Set the size of the window
            let w = this.size.w;
            let h = this.size.h;
            this._openGLRenderWindow.setSize(w, h);
            // Add the actors from the store
            this.addActors();
            // Interactor
            this._interactor.setView(this._openGLRenderWindow);
            this._interactor.initialize();
            this._interactor.bindEvents(el);
            // Texture image
            /*
            var self = this;
            const img = new Image();
            img.src = `./test.png`;
            img.onload = function textureLoaded() {
              const texture = vtkTexture.newInstance();
              texture.setInterpolate(true);
              texture.setImage(img);
              let actors  = Store.getters.actors;
              actors.map(function(actor : any){
                actor.addTexture(texture);
              });
              self._renderer.resetCamera();
              self._renderWindow.render();
            };
            */
            this._renderWindow.render();
        }
    }
    // It's good to clean up event listeners before
    // http://rc.vuejs.org/guide/migration.html#ready-deprecated
    beforeDestroy() {
    }
    // Get actors from the store and add to the scene
    addActors() {
        var self = this;
        let actors = Store_1.default.getters.actors;
        actors.map(function (actor, index) {
            console.log("Adding actor " + index + " to renderer ");
            self._renderer.addActor(actor);
        });
    }
    getMousePosition(x, y) {
        debugger;
        let state = this._renderWindow.getState();
        let rect = state.canvas.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }
    zoomIn(e) {
        // Get the actors and sources
        let actors = Store_1.default.getters.actors;
        let sources = Store_1.default.getters.sources;
        // Print the actors
        var self = this;
        actors.map(function (actor, index) {
            // console.log(actor.getMapper());
        });
        //this._renderer.getActiveCamera().zoom(1.1);
        this._renderWindow.render();
    }
    zoomOut(e) {
        //console.log("key press detected");
        //this._renderer.getActiveCamera().zoom(0.8);
        //this._renderWindow.render();
    }
};
__decorate([
    av_ts_1.Prop
], VtkRenderer.prototype, "size", void 0);
__decorate([
    av_ts_1.Prop
], VtkRenderer.prototype, "renderWindow", void 0);
__decorate([
    av_ts_1.Prop
], VtkRenderer.prototype, "renderer", void 0);
__decorate([
    av_ts_1.Prop
], VtkRenderer.prototype, "openGLRenderWindow", void 0);
__decorate([
    av_ts_1.Prop
], VtkRenderer.prototype, "interactor", void 0);
__decorate([
    av_ts_1.Lifecycle
], VtkRenderer.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], VtkRenderer.prototype, "beforeMount", null);
__decorate([
    av_ts_1.Lifecycle
], VtkRenderer.prototype, "mounted", null);
__decorate([
    av_ts_1.Lifecycle
], VtkRenderer.prototype, "beforeDestroy", null);
VtkRenderer = __decorate([
    av_ts_1.Component({
        name: 'VtkRenderer'
    })
], VtkRenderer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VtkRenderer;
