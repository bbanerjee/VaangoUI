"use strict";
function actors(state) {
    return state.actors;
}
exports.actors = actors;
function sources(state) {
    return state.sources;
}
exports.sources = sources;
function mappers(state) {
    return state.mappers;
}
exports.mappers = mappers;
function areVTKActorsCreated(state) {
    return state.areVTKActorsCreated;
}
exports.areVTKActorsCreated = areVTKActorsCreated;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    actors,
    sources,
    mappers,
    areVTKActorsCreated
};
