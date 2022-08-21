import {Getter, GetterTree} from 'vuex';
import {ParticleState} from "./ParticleState";

export function particleData(state: ParticleState) {
  return state.particleData;
}

export function isParticleReadComplete(state: ParticleState) {
  return state.isParticleReadComplete;
}

export default <GetterTree<ParticleState, any>> {
  particleData,
  isParticleReadComplete
}