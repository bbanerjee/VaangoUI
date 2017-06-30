"use strict";
const ParticleState = require("./ParticleState").default;
const ParticleGetters = require("./ParticleGetters");
const ParticleActions = require("./ParticleActions");
const ParticleMutations = require("./ParticleMutations");

class ParticleModule {
    constructor() {
        this.mutations = ParticleMutations.default;
        this.getters = ParticleGetters.default;
        this.actions = ParticleActions.default;
        this.state = new ParticleState();
    }
}

exports.default = ParticleModule;
