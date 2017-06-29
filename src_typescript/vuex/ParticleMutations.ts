import {Mutation, MutationTree} from 'vuex';
import {ParticleState} from './ParticleState';


export function SET_PARTICLE_DATA(state: ParticleState, particleData: any) {
    state.particleData = particleData;
    state.isParticleReadComplete = true;
    console.log("Set particleData");
}

export function DELETE_PARTICLE_DATA(state: ParticleState, message: string) {
    state.particleData = null;
    state.isParticleReadComplete = false;
    console.log("Deleted particle data" + message);
}


export default <MutationTree<ParticleState>> {
  SET_PARTICLE_DATA,
  DELETE_PARTICLE_DATA
}
