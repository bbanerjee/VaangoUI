/* global requestAnimationFrame */
/* eslint-disable no-duplicate-consts */
import Vue from "vue";

const vtkRenderWindow           = require('vtk.js/Sources/Rendering/Core/RenderWindow');
const vtkRenderer               = require('vtk.js/Sources/Rendering/Core/Renderer');
const vtkOpenGLRenderWindow     = require('vtk.js/Sources/Rendering/OpenGL/RenderWindow');
const vtkRenderWindowInteractor = require('vtk.js/Sources/Rendering/Core/RenderWindowInteractor');
const vtkTexture                = require('vtk.js/Sources/Rendering/Core/Texture');

const Store = require( '../vuex/Store').default;

let VtkRenderer = Vue.extend(
  {
    name: 'VtkRenderer',

    props: {
      size : {
        type: Object, // { w, h }
        required: true
      },

      renderWindow : {
        type: vtkRenderWindow
      },

      renderer : {
        type: vtkRenderer
      },

      openGLRenderWindow : {
        type: vtkOpenGLRenderWindow
      },

      interactor : {
        type: vtkRenderWindowInteractor
      },
    },

    data() {
      return {
        _pointer: {
          x: 0,
          y: 0
        },
        _pointerOld: {
          x: 0,
          y: 0
        },
        _renderWindow: null,
        _renderer: null,
        _openGLRenderWindow: null,
        _interactor: null,
      };
    }, 


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
    },

    beforeMount() {
    },
    

    mounted() {

      console.log("Mounting VTK renderer");

      console.log(this.$refs);
      console.log(this._renderWindow.domElement);
      if ((this.$refs)["vtk-graphics-container"]) {
        console.log("VTK Graphics container created");
        let el  = (this.$refs)["vtk-graphics-container"];
        this._openGLRenderWindow.setContainer(el);

        // Set the size of the window
        let w = (this.size).w;
        let h = (this.size).h;
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
     
        this._renderer.resetCamera();
        this._renderWindow.render();
      }

    },

    // It's good to clean up event listeners before
    // http://rc.vuejs.org/guide/migration.html#ready-deprecated
    beforeDestroy() {
    },

    methods: { 
      // Get actors from the store and add to the scene
      addActors() {
        var self = this;
        let actors  = Store.getters.actors;
        actors.map(function(actor, index){
          console.log("Adding actor " + index + " to renderer ");
          self._renderer.addActor(actor);
        });
      },

      getMousePosition(x, y) {
        debugger;
        let state = this._renderWindow.getState();
        let rect = state.canvas.getBoundingClientRect();
                    return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
      },

      zoomIn(e) {
        // Get the actors and sources
        let actors  = Store.getters.actors;
        let sources = Store.getters.sources;

        // Print the actors
        var self = this;
        actors.map(function(actor, index){
          // console.log(actor.getMapper());
        });
        this._renderer.getActiveCamera().zoom(1.1);

        //  Render only if the camera exists
        if (this._renderer.getActiveCamera()) {
          this._renderer.getActiveCamera().zoom(1.1);
          this._renderWindow.render();
        }
      },

      zoomOut(e) {
        //console.log("key press detected");
        //  Render only if the camera exists
        if (this._renderer.getActiveCamera()) {
          this._renderer.getActiveCamera().zoom(0.8);
          this._renderWindow.render();
        }
      }
    }
  }
);

exports.default = VtkRenderer;
