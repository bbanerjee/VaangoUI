import {Store, ActionTree, ActionContext} from 'vuex';
import {VTKGraphicsState} from "./VTKGraphicsState";

export function addActor(store: ActionContext<VTKGraphicsState, any>)  {
  store.commit('ADD_VTK_ACTOR');
};

export function addSource(store: ActionContext<VTKGraphicsState, any>)  {
  store.commit('ADD_VTK_SOURCE');
};

export function addMapper(store: ActionContext<VTKGraphicsState, any>)  {
  store.commit('ADD_VTK_MAPPER');
};

export function updateVTKActorsCreatedFlag(store: ActionContext<VTKGraphicsState, any>)  {
  store.commit('VTK_ACTORS_CREATED');
};

export default <ActionTree<VTKGraphicsState, any>> {
  addActor,
  addSource,
  addMapper,
  updateVTKActorsCreatedFlag
}