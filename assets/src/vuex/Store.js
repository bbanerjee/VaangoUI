"use strict";
const Vue = require("vue");
const Vuex = require("vuex");
const ThreeGraphicsModule_1 = require("./ThreeGraphicsModule");
const VTKGraphicsModule_1 = require("./VTKGraphicsModule");
const ParticleModule_1 = require("./ParticleModule");
Vue.use(Vuex);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Vuex.Store({
    modules: {
        threeGraphics: new ThreeGraphicsModule_1.ThreeGraphicsModule(),
        vtkGraphics: new VTKGraphicsModule_1.VTKGraphicsModule(),
        particles: new ParticleModule_1.ParticleModule()
    }
});
