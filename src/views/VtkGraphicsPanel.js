const Vue = require("vue");

let VtkGraphicsPanel = Vue.extend(
  {
    name: 'vtk-graphics-panel',

    data() {
      return {
        id : "VtkGraphicsPanel",
        size : { w: 500, h: 500}
      };
    },

    methods: {
      /*
      stopAnimation(event: any) {
      console.log(event);
      console.log("Click detected in main graphics panel");
      }
      */
    }
  }
); 

exports.default = VtkGraphicsPanel;
