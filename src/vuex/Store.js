"use strict";
const Vue = require("vue");
const Vuex = require("vuex");

const ThreeGraphicsModule = require("./ThreeGraphicsModule").default;
const VTKGraphicsModule = require("./VTKGraphicsModule").default;
const ParticleModule = require("./ParticleModule").default;

Vue.use(Vuex);

Object.defineProperty(exports, "__esModule", { value: true });

exports.default = new Vuex.Store({
    modules: {
        threeGraphics: new ThreeGraphicsModule(),
        vtkGraphics: new VTKGraphicsModule(),
        particles: new ParticleModule()
    }
});