"use strict";
const ParticleState_1 = require("./ParticleState");
const ParticleGetters_1 = require("./ParticleGetters");
const ParticleActions_1 = require("./ParticleActions");
const ParticleMutations_1 = require("./ParticleMutations");
class ParticleModule {
    constructor() {
        this.mutations = ParticleMutations_1.default;
        this.getters = ParticleGetters_1.default;
        this.actions = ParticleActions_1.default;
        this.state = new ParticleState_1.ParticleState();
    }
}
exports.ParticleModule = ParticleModule;
