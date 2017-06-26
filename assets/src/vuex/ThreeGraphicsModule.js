"use strict";
const ThreeGraphicsState_1 = require("./ThreeGraphicsState");
const ThreeGraphicsGetters_1 = require("./ThreeGraphicsGetters");
const ThreeGraphicsActions_1 = require("./ThreeGraphicsActions");
const ThreeGraphicsMutations_1 = require("./ThreeGraphicsMutations");
class ThreeGraphicsModule {
    constructor() {
        this.mutations = ThreeGraphicsMutations_1.default;
        this.getters = ThreeGraphicsGetters_1.default;
        this.actions = ThreeGraphicsActions_1.default;
        let w = 300;
        let h = 300;
        this.state = new ThreeGraphicsState_1.ThreeGraphicsState(w, h);
    }
}
exports.ThreeGraphicsModule = ThreeGraphicsModule;
