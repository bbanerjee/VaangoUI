"use strict";
const VTKGraphicsState_1 = require("./VTKGraphicsState");
const VTKGraphicsGetters_1 = require("./VTKGraphicsGetters");
const VTKGraphicsActions_1 = require("./VTKGraphicsActions");
const VTKGraphicsMutations_1 = require("./VTKGraphicsMutations");
class VTKGraphicsModule {
    constructor() {
        this.mutations = VTKGraphicsMutations_1.default;
        this.getters = VTKGraphicsGetters_1.default;
        this.actions = VTKGraphicsActions_1.default;
        this.state = new VTKGraphicsState_1.VTKGraphicsState();
    }
}
exports.VTKGraphicsModule = VTKGraphicsModule;
