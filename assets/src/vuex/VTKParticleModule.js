"use strict";
const ParticleState_1 = require("./ParticleState");
const VTKParticleGetters_1 = require("./VTKParticleGetters");
const VTKParticleActions_1 = require("./VTKParticleActions");
const VTKParticleMutations_1 = require("./VTKParticleMutations");
class ParticleModule {
    constructor() {
        this.mutations = VTKParticleMutations_1.default;
        this.getters = VTKParticleGetters_1.default;
        this.actions = VTKParticleActions_1.default;
        this.state = new ParticleState_1.ParticleState();
    }
}
exports.ParticleModule = ParticleModule;
