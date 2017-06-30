"use strict";
const ThreeGraphicsState = require("./ThreeGraphicsState").default;
const ThreeGraphicsGetters = require("./ThreeGraphicsGetters");
const ThreeGraphicsActions = require("./ThreeGraphicsActions");
const ThreeGraphicsMutations = require("./ThreeGraphicsMutations");

class ThreeGraphicsModule {
    constructor() {
        this.mutations = ThreeGraphicsMutations.default;
        this.getters = ThreeGraphicsGetters.default;
        this.actions = ThreeGraphicsActions.default;
        let w = 300;
        let h = 300;
        this.state = new ThreeGraphicsState(w, h);
    }
}
exports.default = ThreeGraphicsModule;