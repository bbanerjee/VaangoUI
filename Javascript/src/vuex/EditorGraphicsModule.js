"use strict";
const EditorGraphicsState = require("./EditorGraphicsState").default;
const EditorGraphicsGetters = require("./EditorGraphicsGetters");
const EditorGraphicsActions = require("./EditorGraphicsActions");
const EditorGraphicsMutations = require("./EditorGraphicsMutations");

class EditorGraphicsModule {
    constructor() {
        this.mutations = EditorGraphicsMutations.default;
        this.getters = EditorGraphicsGetters.default;
        this.actions = EditorGraphicsActions.default;
        let w = 300;
        let h = 300;
        this.state = new EditorGraphicsState(w, h);
    }
}
exports.default = EditorGraphicsModule;