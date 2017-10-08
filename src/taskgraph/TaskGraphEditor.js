import Vue from "vue";
import LiteGraph from "./LiteGraph.js";
import LGraph from "./LGraph.js";
import LGraphCanvas from "./LGraphCanvas.js";

let TaskGraphEditor = Vue.extend(
  {
    name: 'TaskGraphEditor',

    props: {

    },

    data() {
      return {
        d_editor: null,
        d_canvas: null
      };
    }, 

    computed: {
    }, 

    created() {
      this.d_editor = new LGraph();
      this.d_canvas = new LGraphCanvas("#mycanvas");
      console.log("Created task editor");

      if(this.CanvasRenderingContext2D) {
        CanvasRenderingContext2D.prototype.roundRect = (
          x, y, width, height, radius, radius_low) => {

          if (radius === undefined) radius = 5;
          if (radius_low === undefined) radius_low  = radius;

          this.beginPath();
          this.moveTo(x + radius, y);
          this.lineTo(x + width - radius, y);
          this.quadraticCurveTo(x + width, y, x + width, y + radius);

          this.lineTo(x + width, y + height - radius_low);
          this.quadraticCurveTo(x + width, y + height, x + width - radius_low, y + height);
          this.lineTo(x + radius_low, y + height);
          this.quadraticCurveTo(x, y + height, x, y + height - radius_low);
          this.lineTo(x, y + radius);
          this.quadraticCurveTo(x, y, x + radius, y);
        }
      }
    },

    mounted() {
      console.log("Mounted task editor");
      window.graphcanvas = this.d_editor.graphcanvas;
    },

    beforeDestroy() {
    },

    methods: {

    }
  }
);

exports.default = TaskGraphEditor;
