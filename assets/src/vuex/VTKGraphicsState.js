//import * as vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
"use strict";
class VTKGraphicsState {
    constructor() {
        this.actors = [];
        this.sources = [];
        this.mappers = [];
        this.areVTKActorsCreated = false;
    }
}
exports.VTKGraphicsState = VTKGraphicsState;
;
