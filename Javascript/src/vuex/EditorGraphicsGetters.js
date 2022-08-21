"use strict";
function editorScene(EditorGraphicsState) {
    return EditorGraphicsState.scene;
}
exports.editorScene = editorScene;

function editorCamera(EditorGraphicsState) {
    return EditorGraphicsState.camera;
}
exports.editorCamera = editorCamera;

function areGeometryObjectsCreated(state) {
    return state.areGeometryObjectsCreated;
}
exports.areGeometryObjectsCreated = areGeometryObjectsCreated;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    editorScene,
    editorCamera,
    areGeometryObjectsCreated
};
