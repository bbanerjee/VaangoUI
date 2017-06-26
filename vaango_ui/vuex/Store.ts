import * as Vue from 'vue';
import * as Vuex  from 'vuex';

import {ThreeGraphicsModule} from './ThreeGraphicsModule';
import {VTKGraphicsModule} from './VTKGraphicsModule';
import {ParticleModule} from './ParticleModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
             threeGraphics : new ThreeGraphicsModule(),
             vtkGraphics   : new VTKGraphicsModule(),
             particles     : new ParticleModule()  
           }
})