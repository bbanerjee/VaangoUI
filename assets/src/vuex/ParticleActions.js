"use strict";
function setParticleData(store) {
    store.commit('SET_PARTICLE_DATA');
}
exports.setParticleData = setParticleData;
;
function deleteParticleData(store) {
    store.commit('DELETE_PARTICLE_DATA');
}
exports.deleteParticleData = deleteParticleData;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    setParticleData,
    deleteParticleData
};
