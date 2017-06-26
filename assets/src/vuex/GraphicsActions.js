"use strict";
function setScene(store) {
    store.commit('SET_SCENE');
}
exports.setScene = setScene;
;
function setCamera(store) {
    store.commit('SET_CAMERA');
}
exports.setCamera = setCamera;
;
function deleteScene(store) {
    store.commit('DELETE_SCENE');
}
exports.deleteScene = deleteScene;
;
function deleteCamera(store) {
    store.commit('DELETE_CAMERA');
}
exports.deleteCamera = deleteCamera;
;
function addObject(store) {
    store.commit('ADD_OBJECT');
}
exports.addObject = addObject;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    setScene,
    setCamera,
    deleteScene,
    deleteCamera,
    addObject
};
