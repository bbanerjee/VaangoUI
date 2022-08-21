import {Store, ActionTree, ActionContext} from 'vuex';
import {ThreeGraphicsState} from "./ThreeGraphicsState";

export function setScene(store: ActionContext<ThreeGraphicsState, any>)  {
  store.commit('SET_SCENE');
};

export function setCamera(store: ActionContext<ThreeGraphicsState, any>)  {
  store.commit('SET_CAMERA');
};

export function deleteScene(store: ActionContext<ThreeGraphicsState, any>)  {
  store.commit('DELETE_SCENE');
};

export function deleteCamera(store: ActionContext<ThreeGraphicsState, any>)  {
  store.commit('DELETE_CAMERA');
};

export function addObject(store: ActionContext<ThreeGraphicsState, any>)  {
  store.commit('ADD_THREE_OBJECT');
};

export function updateThreeObjectsCreatedFlag(store: ActionContext<ThreeGraphicsState, any>)  {
  store.commit('THREE_OBJECTS_CREATED');
};

export default <ActionTree<ThreeGraphicsState, any>> {
  setScene,
  setCamera,
  deleteScene,
  deleteCamera,
  addObject,
  updateThreeObjectsCreatedFlag
}