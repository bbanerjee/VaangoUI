"use strict";
const Vue = require("vue");
const Vuex = require("vuex");
const state_1 = require("./state");
const getters_1 = require("./getters");
const actions_1 = require("./actions");
const mutations_1 = require("./mutations");
class GraphicsState {
    constructor() {
        this.mutations = mutations_1.default;
        this.getters = getters_1.default;
        this.actions = actions_1.default;
        let w = 300;
        let h = 300;
        this.state = new state_1.State(w, h);
    }
}
exports.GraphicsState = GraphicsState;
Vue.use(Vuex);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Vuex.Store({
    modules: { graphicsState: new GraphicsState() }
});
