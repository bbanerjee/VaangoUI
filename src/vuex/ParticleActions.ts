import {Store, ActionTree, ActionContext} from 'vuex';
import {ParticleState} from "./ParticleState";

export function setParticleData(store: ActionContext<ParticleState, any>,
                                particleData: any)  {
  store.commit('SET_PARTICLE_DATA', particleData);
};

export function deleteParticleData(store: ActionContext<ParticleState, any>)  {
  store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
};

export default <ActionTree<ParticleState, any>> {
  setParticleData,
  deleteParticleData
}