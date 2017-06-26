"use strict";
function scene(state) {
    return state.scene;
}
exports.scene = scene;
function camera(state) {
    return state.camera;
}
exports.camera = camera;
function vtk_object(state) {
    return state.vtk_object;
}
exports.vtk_object = vtk_object;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    scene,
    camera,
    vtk_object
};
