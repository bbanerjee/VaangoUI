"use strict";
function setScene(store) {
    store.commit('SET_EDITOR_SCENE');
}

exports.setScene = setScene;

function setCamera(store) {
    store.commit('SET_EDITOR_CAMERA');
}
exports.setCamera = setCamera;

function deleteScene(store) {
    store.commit('DELETE_EDITOR_SCENE');
}
exports.deleteScene = deleteScene;

function deleteCamera(store) {
    store.commit('DELETE_EDITOR_CAMERA');
}
exports.deleteCamera = deleteCamera;

function addObject(store) {
    store.commit('ADD_GEOMETRY_OBJECT');
}
exports.addObject = addObject;

function updateGeometryObjectsCreatedFlag(store) {
    store.commit('GEOMETRY_OBJECTS_CREATED');
}
exports.updateGeometryObjectsCreatedFlag = updateGeometryObjectsCreatedFlag;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    setScene,
    setCamera,
    deleteScene,
    deleteCamera,
    addObject,
    updateGeometryObjectsCreatedFlag
};
