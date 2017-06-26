"use strict";
const THREE = require("three");
//import vtk = require('vtk.js');
//import vtkFullScreenRenderWindow  = require('vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow');
//import vtkActor = require('vtk.js/Sources/Rendering/Core/Actor');
//import vtkConeSource = require('vtk.js/Sources/Filters/Sources/ConeSource');
//import vtkMapper = require('vtk.js/Sources/Rendering/Core/Mapper');
class State {
    // For VTK
    //fullScreenRenderer: any;
    //renderer: any;
    //renderWindow: any;
    constructor(w, h) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        this.vtk_object = null;
        //this.fullScreenRenderer = 
        //  vtkFullScreenRenderWindow.newInstance({ background: [0, 0, 0] });
        //this.renderer = this.fullScreenRenderer.getRenderer();
        //this.renderWindow = this.fullScreenRenderer.getRenderWindow();
    }
}
exports.State = State;
;
