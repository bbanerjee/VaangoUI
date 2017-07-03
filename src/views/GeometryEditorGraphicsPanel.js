const Vue = require("vue");


let GeometryEditorGraphicsPanel = Vue.extend(
  {

    name: 'editor-graphics-panel',

    data() {
      return {
       id : "GeometryEditorGraphicsPanel",
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

exports.default = GeometryEditorGraphicsPanel;

Vue.component('editor-graphics-panel', GeometryEditorGraphicsPanel);
