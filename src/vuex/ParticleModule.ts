import { Module } from 'vuex';

import { ParticleState }   from './ParticleState';
import ParticleGetters     from './ParticleGetters';
import ParticleActions     from './ParticleActions';
import ParticleMutations   from './ParticleMutations';

export class ParticleModule implements Module<ParticleState, any> {

  state : ParticleState;
  mutations = ParticleMutations;
  getters = ParticleGetters;
  actions = ParticleActions;

  constructor() {
    this.state = new ParticleState();
  }
}