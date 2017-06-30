"use strict";
function particleData(state) {
    return state.particleData;
}
exports.particleData = particleData;

function isParticleReadComplete(state) {
    return state.isParticleReadComplete;
}
exports.isParticleReadComplete = isParticleReadComplete;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    particleData,
    isParticleReadComplete
};
