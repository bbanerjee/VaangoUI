import * as Vue from 'vue';
import * as Vuex  from 'vuex';
import { Module, GetterTree, MutationTree, ActionTree, Plugin } from 'vuex';

import {ThreeGraphicsState}   from './ThreeGraphicsState';
import ThreeGraphicsGetters   from './ThreeGraphicsGetters';
import ThreeGraphicsActions   from './ThreeGraphicsActions';
import ThreeGraphicsMutations from './ThreeGraphicsMutations';

export class ThreeGraphicsModule implements Module<ThreeGraphicsState, any> {

  state: ThreeGraphicsState;
  mutations = ThreeGraphicsMutations;
  getters = ThreeGraphicsGetters;
  actions = ThreeGraphicsActions;

  constructor() {
    let w = 500;
    let h = 500;
    this.state = new ThreeGraphicsState(w, h);
  }
}
