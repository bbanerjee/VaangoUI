/* global requestAnimationFrame */
/* eslint-disable no-duplicate-imports */
import * as Vue from "vue";

import { Component, Lifecycle, Watch, Prop, p } from 'av-ts';

import Store from '../vuex/Store';
import { mapGetters } from 'vuex';

import * as vtkRenderWindow           from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import * as vtkRenderer               from 'vtk.js/Sources/Rendering/Core/Renderer';
import * as vtkOpenGLRenderWindow     from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import * as vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import * as vtkTexture                from 'vtk.js/Sources/Rendering/Core/Texture';
//import * as vtkFullScreenRenderWindow  from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
//import * as vtk from '../../assets/libs/vtk';
//import vtk = require('vtk.js');
//import * as vtk_dummy from 'vtk.js';
//var vtk_dummy = require('vtk.js');

@Component({
  name: 'VtkRenderer'
})
export default class VtkRenderer extends Vue {

  @Prop
  size = p({
    type: Object, // { w, h }
    required: true
  });

  @Prop
  renderWindow = p({
    type: vtkRenderWindow
  });

  @Prop
  renderer = p({
    type: vtkRenderer
  });

  @Prop
  openGLRenderWindow = p({
    type: vtkOpenGLRenderWindow
  });

  @Prop
  interactor = p({
    type: vtkRenderWindowInteractor
  });

  _pointer: {
    x: number,
    y: number
  }
  _pointerOld: {
    x: number,
    y: number
  }

  public _renderWindow: any;
  public _renderer: any;
  public _openGLRenderWindow: any;
  public _interactor: any;

  @Lifecycle
  created() {
    this._renderWindow = this.renderWindow;
    this._renderer = this.renderer;
    this._openGLRenderWindow = this.openGLRenderWindow;
    this._interactor = this.interactor;

    this._pointer = {x: 0, y: 0};
    this._pointerOld = {x: 0, y: 0};

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
    Store.watch(
      function() { return Store.getters.areVTKActorsCreated; },
      function() {
        console.log("areVTKActorsCreated? " + Store.getters.areVTKActorsCreated);
        if (Store.getters.areVTKActorsCreated) {
          self.addActors();
          self._renderer.resetCamera();
          self._renderWindow.render();
        }
      }
    );
  }

  @Lifecycle
  beforeMount() {
  }
  

  @Lifecycle
  mounted() {

    console.log("Mounting VTK renderer");

    console.log(this.$refs);
    console.log(this._renderWindow.domElement);
    if ((this.$refs)["vtk-graphics-container"]) {
      console.log("VTK Graphics container created");
      let el  = (this.$refs)["vtk-graphics-container"];
      this._openGLRenderWindow.setContainer(el);

      // Set the size of the window
      let w = (<any>this.size).w;
      let h = (<any>this.size).h;
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
  @Lifecycle
  beforeDestroy() {
  }

  // Get actors from the store and add to the scene
  private addActors() {
    var self = this;
    let actors  = Store.getters.actors;
    actors.map(function(actor : any, index : number){
      console.log("Adding actor " + index + " to renderer ");
      self._renderer.addActor(actor);
    });
  }

  private getMousePosition(x: number, y: number) {
    debugger;
    let state = this._renderWindow.getState();
    let rect = state.canvas.getBoundingClientRect();
		return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
  }

  public zoomIn(e: any) {
    // Get the actors and sources
    let actors  = Store.getters.actors;
    let sources = Store.getters.sources;

    // Print the actors
    var self = this;
    actors.map(function(actor : any, index : number){
      // console.log(actor.getMapper());
    });
    //this._renderer.getActiveCamera().zoom(1.1);
    this._renderWindow.render();
  }

  public zoomOut(e: any) {
    //console.log("key press detected");
    //this._renderer.getActiveCamera().zoom(0.8);
    //this._renderWindow.render();
  }
}