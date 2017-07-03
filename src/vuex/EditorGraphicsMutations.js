"use strict";
function SET_EDITOR_SCENE(state, scene) {
    state.scene = scene;
    console.log("set scene");
}
exports.SET_EDITOR_SCENE = SET_EDITOR_SCENE;

function SET_EDITOR_CAMERA(state, camera) {
    state.camera = camera;
    console.log("set camera");
}
exports.SET_EDITOR_CAMERA = SET_EDITOR_CAMERA;

function DELETE_EDITOR_SCENE(state, message) {
    state.scene = null;
    console.log("deleted scene" + message);
}
exports.DELETE_EDITOR_SCENE = DELETE_EDITOR_SCENE;

function DELETE_EDITOR_CAMERA(state, message) {
    state.camera = null;
    console.log("deleted camera" + message);
}
exports.DELETE_EDITOR_CAMERA = DELETE_EDITOR_CAMERA;

function ADD_GEOMETRY_OBJECT(state, object) {
    state.scene.add(object);
    console.log("Added object");
}
exports.ADD_GEOMETRY_OBJECT = ADD_GEOMETRY_OBJECT;

function GEOMETRY_OBJECTS_CREATED(state, value) {
    state.areGeometryObjectsCreated = value;
    console.log("Geometry editor state updated");
}
exports.GEOMETRY_OBJECTS_CREATED = GEOMETRY_OBJECTS_CREATED;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SET_EDITOR_SCENE,
    SET_EDITOR_CAMERA,
    DELETE_EDITOR_SCENE,
    DELETE_EDITOR_CAMERA,
    ADD_GEOMETRY_OBJECT,
    GEOMETRY_OBJECTS_CREATED,
};