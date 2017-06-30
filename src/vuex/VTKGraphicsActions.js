"use strict";
function addActor(store) {
    store.commit('ADD_VTK_ACTOR');
}
exports.addActor = addActor;

function addSource(store) {
    store.commit('ADD_VTK_SOURCE');
}
exports.addSource = addSource;

function addMapper(store) {
    store.commit('ADD_VTK_MAPPER');
}
exports.addMapper = addMapper;

function updateVTKActorsCreatedFlag(store) {
    store.commit('VTK_ACTORS_CREATED');
}
exports.updateVTKActorsCreatedFlag = updateVTKActorsCreatedFlag;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    addActor,
    addSource,
    addMapper,
    updateVTKActorsCreatedFlag
};