import {Getter, GetterTree} from 'vuex';
import {VTKGraphicsState} from "./VTKGraphicsState";

export function actors(state: VTKGraphicsState) {
  return state.actors;
}

export function sources(state: VTKGraphicsState) {
  return state.sources;
}

export function mappers(state: VTKGraphicsState) {
  return state.mappers;
}

export function areVTKActorsCreated(state: VTKGraphicsState) {
  return state.areVTKActorsCreated;
}


export default <GetterTree<VTKGraphicsState, any>> {
  actors, 
  sources,
  mappers,
  areVTKActorsCreated
}