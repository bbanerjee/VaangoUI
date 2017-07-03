"use strict";
function setEditorScene(store) {
    store.commit('SET_EDITOR_SCENE');
}

exports.setEditorScene = setEditorScene;

function setEditorCamera(store) {
    store.commit('SET_EDITOR_CAMERA');
}
exports.setEditorCamera = setEditorCamera;

function deleteEditorScene(store) {
    store.commit('DELETE_EDITOR_SCENE');
}
exports.deleteEditorScene = deleteEditorScene;

function deleteEditorCamera(store) {
    store.commit('DELETE_EDITOR_CAMERA');
}
exports.deleteEditorCamera = deleteEditorCamera;

function addGeometryObject(store) {
    store.commit('ADD_GEOMETRY_OBJECT');
}
exports.addGeometryObject = addGeometryObject;

function updateGeometryObjectsCreatedFlag(store) {
    store.commit('GEOMETRY_OBJECTS_CREATED');
}
exports.updateGeometryObjectsCreatedFlag = updateGeometryObjectsCreatedFlag;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    setEditorScene,
    setEditorCamera,
    deleteEditorScene,
    deleteEditorCamera,
    addGeometryObject,
    updateGeometryObjectsCreatedFlag
};
