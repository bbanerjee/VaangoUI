const Vue = require("vue");

let ThreeGraphicsPanel = Vue.extend(
  {

    name: 'three-graphics-panel',

    data() {
      return {
       id : "ThreeGraphicsPanel",
       size : { w: 200, h: 200}
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

exports.default = ThreeGraphicsPanel;
