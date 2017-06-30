const Vue = require("vue");

let TimeInputPanel = Vue.extend(
  {
    name: 'time-input-panel',

    data() {
      return {
        id: "TimeInputPanel",
        initTime: 0.0,
        maxTime: 1.0,
        maxNumSteps: 99999,
        deltInit: 1.0e-6,
        deltMin: 0.001,
        deltMax: 0.01,
        maxDeltInc: 1.0,
        deltMultiplier: 0.3
      };
    },

    methods: {

      updateInitTime(time) {
        console.log("Before " + this.initTime)
        this.initTime = time;
        console.log("After " + this.initTime)
      }
    }
  }
);

exports.default = TimeInputPanel;
