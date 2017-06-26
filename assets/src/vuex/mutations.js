"use strict";
function SET_SCENE(state, scene) {
    state.scene = scene;
    console.log("set scene");
}
exports.SET_SCENE = SET_SCENE;
function SET_CAMERA(state, camera) {
    state.camera = camera;
    console.log("set camera");
}
exports.SET_CAMERA = SET_CAMERA;
function DELETE_SCENE(state, message) {
    state.scene = null;
    console.log("deleted scene" + message);
}
exports.DELETE_SCENE = DELETE_SCENE;
function DELETE_CAMERA(state, message) {
    state.camera = null;
    console.log("deleted camera" + message);
}
exports.DELETE_CAMERA = DELETE_CAMERA;
function ADD_OBJECT(state, object) {
    state.scene.add(object);
    console.log("Added object");
}
exports.ADD_OBJECT = ADD_OBJECT;
function ADD_VTK_OBJECT(state, object) {
    state.vtk_object = object;
    console.log("Added VTK object");
}
exports.ADD_VTK_OBJECT = ADD_VTK_OBJECT;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SET_SCENE,
    SET_CAMERA,
    DELETE_SCENE,
    DELETE_CAMERA,
    ADD_OBJECT,
    ADD_VTK_OBJECT
};
