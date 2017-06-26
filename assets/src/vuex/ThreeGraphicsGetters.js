"use strict";
function scene(ThreeGraphicsState) {
    return ThreeGraphicsState.scene;
}
exports.scene = scene;
function camera(ThreeGraphicsState) {
    return ThreeGraphicsState.camera;
}
exports.camera = camera;
function areThreeObjectsCreated(state) {
    return state.areThreeObjectsCreated;
}
exports.areThreeObjectsCreated = areThreeObjectsCreated;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    scene,
    camera,
    areThreeObjectsCreated
};
