"use strict";
const VTKGraphicsState = require("./VTKGraphicsState").default;
const VTKGraphicsGetters = require("./VTKGraphicsGetters");
const VTKGraphicsActions = require("./VTKGraphicsActions");
const VTKGraphicsMutations = require("./VTKGraphicsMutations");

class VTKGraphicsModule {
    constructor() {
        this.mutations = VTKGraphicsMutations.default;
        this.getters = VTKGraphicsGetters.default;
        this.actions = VTKGraphicsActions.default;
        this.state = new VTKGraphicsState();
    }
}
exports.default = VTKGraphicsModule;
