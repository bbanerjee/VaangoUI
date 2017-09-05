"use strict";
import Vue from "vue";
import Vuex from "vuex";

const ThreeGraphicsModule = require("./ThreeGraphicsModule").default;
const EditorGraphicsModule = require("./EditorGraphicsModule").default;
const VTKGraphicsModule = require("./VTKGraphicsModule").default;
const ParticleModule = require("./ParticleModule").default;

//Object.defineProperty(exports, "__esModule", { value: true });

Vue.use(Vuex);

exports.default = new Vuex.Store({
    modules: {
        threeGraphics: new ThreeGraphicsModule(),
        editorGraphics: new EditorGraphicsModule(),
        vtkGraphics: new VTKGraphicsModule(),
        particles: new ParticleModule()
    }
});
