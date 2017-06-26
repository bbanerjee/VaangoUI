"use strict";
function scene(GraphicsState) {
    return GraphicsState.scene;
}
exports.scene = scene;
function camera(GraphicsState) {
    return GraphicsState.camera;
}
exports.camera = camera;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    scene,
    camera
};
