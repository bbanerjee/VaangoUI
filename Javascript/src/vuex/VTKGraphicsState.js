"use strict";
class VTKGraphicsState {
    constructor() {
        this.actors  = [];
        this.sources = [];
        this.mappers = [];
        this.areVTKActorsCreated = false;
    }
}
exports.default = VTKGraphicsState;
