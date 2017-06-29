import {Mutation, MutationTree} from 'vuex';
import {VTKGraphicsState} from './VTKGraphicsState';


export function ADD_VTK_ACTOR(state: VTKGraphicsState, actor: any) {
    state.actors.push(actor);
    console.log("Added VTK actor object");
}

export function ADD_VTK_SOURCE(state: VTKGraphicsState, source: any) {
    state.sources.push(source);
    console.log("Added VTK source object");
}

export function ADD_VTK_MAPPER(state: VTKGraphicsState, mapper: any) {
    state.mappers.push(mapper);
    console.log("Added VTK mapper object");
}

export function VTK_ACTORS_CREATED(state: VTKGraphicsState, value: boolean) {
    state.areVTKActorsCreated = value;
    console.log("VTK graphics state updated");
}

export default <MutationTree<VTKGraphicsState>> {
  ADD_VTK_ACTOR,
  ADD_VTK_SOURCE,
  ADD_VTK_MAPPER,
  VTK_ACTORS_CREATED
}
