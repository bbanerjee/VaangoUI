"use strict";
const THREE = require("three");
class GraphicsState {
    constructor(w, h) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        this.vtk_object = null;
    }
}
exports.GraphicsState = GraphicsState;
;
