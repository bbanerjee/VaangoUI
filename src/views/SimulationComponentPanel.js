import Vue from "vue";

let SimulationComponentPanel = Vue.extend(
  {
    name: 'simulation-component-panel',

    data() {
      return {
        id : "SimulationComponentPanel"
      };
    }
  }
);

exports.default = SimulationComponentPanel;
