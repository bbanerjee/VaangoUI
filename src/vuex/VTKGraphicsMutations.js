"use strict";
function ADD_VTK_ACTOR(state, actor) {
    state.actors.push(actor);
    console.log("Added VTK actor object");
}
exports.ADD_VTK_ACTOR = ADD_VTK_ACTOR;

function ADD_VTK_SOURCE(state, source) {
    state.sources.push(source);
    console.log("Added VTK source object");
}
exports.ADD_VTK_SOURCE = ADD_VTK_SOURCE;

function ADD_VTK_MAPPER(state, mapper) {
    state.mappers.push(mapper);
    console.log("Added VTK mapper object");
}
exports.ADD_VTK_MAPPER = ADD_VTK_MAPPER;

function VTK_ACTORS_CREATED(state, value) {
    state.areVTKActorsCreated = value;
    console.log("VTK graphics state updated");
}
exports.VTK_ACTORS_CREATED = VTK_ACTORS_CREATED;

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ADD_VTK_ACTOR,
    ADD_VTK_SOURCE,
    ADD_VTK_MAPPER,
    VTK_ACTORS_CREATED
};