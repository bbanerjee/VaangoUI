import * as Vue from 'vue';
import * as Vuex  from 'vuex';
import { Module, GetterTree, MutationTree, ActionTree, Plugin } from 'vuex';

import {VTKGraphicsState}   from './VTKGraphicsState';
import VTKGraphicsGetters   from './VTKGraphicsGetters';
import VTKGraphicsActions   from './VTKGraphicsActions';
import VTKGraphicsMutations from './VTKGraphicsMutations';

export class VTKGraphicsModule implements Module<VTKGraphicsState, any> {

  state: VTKGraphicsState;
  mutations = VTKGraphicsMutations;
  getters = VTKGraphicsGetters;
  actions = VTKGraphicsActions;

  constructor() {
    this.state = new VTKGraphicsState();
  }
}
