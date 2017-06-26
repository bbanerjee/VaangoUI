"use strict";
const GraphicsState_1 = require("./GraphicsState");
const GraphicsGetters_1 = require("./GraphicsGetters");
const GraphicsActions_1 = require("./GraphicsActions");
const GraphicsMutations_1 = require("./GraphicsMutations");
class GraphicsModule {
    constructor() {
        this.mutations = GraphicsMutations_1.default;
        this.getters = GraphicsGetters_1.default;
        this.actions = GraphicsActions_1.default;
        let w = 300;
        let h = 300;
        this.state = new GraphicsState_1.GraphicsState(w, h);
    }
}
exports.GraphicsModule = GraphicsModule;
