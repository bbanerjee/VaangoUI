"use strict";
function SET_PARTICLE_DATA(state, particleData) {
    state.particleData = particleData;
    state.isParticleReadComplete = true;
    console.log("Set VTK particleData");
}
exports.SET_PARTICLE_DATA = SET_PARTICLE_DATA;
function DELETE_PARTICLE_DATA(state, message) {
    state.particleData = null;
    state.isParticleReadComplete = false;
    console.log("Deleted VTK particle data" + message);
}
exports.DELETE_PARTICLE_DATA = DELETE_PARTICLE_DATA;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SET_PARTICLE_DATA,
    DELETE_PARTICLE_DATA
};
