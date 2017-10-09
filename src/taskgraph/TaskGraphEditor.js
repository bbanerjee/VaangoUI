import Vue from "vue";
import LGraph from "./LGraph.js";
import LGraphCanvas from "./LGraphCanvas.js";

let TaskGraphEditor = Vue.extend(
  {
    name: 'TaskGraphEditor',

    props: {

    },

    data() {
      return {
        d_taskgraph: null,
        d_canvas: null
      };
    }, 

    computed: {
    }, 

    created() {

      this.d_taskgraph = new LGraph();
      console.log("Created task graph");

      this.d_canvas = new LGraphCanvas(null);
      console.log("Created empty task graph canvas");

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

      console.log("Element = ", this.$el);

      // Add the canvas div to the DOM
      let element = document.createElement("div");
      element.className = "vaango-taskgraph-editor";
      element.innerHTML = "<canvas class='taskgraph-canvas' width='1000' height='500' tabindex=10></canvas>";
      this.$el.appendChild(element);

      // Set the canvas
      let canvas = element.querySelector(".taskgraph-canvas");
      this.d_canvas.setCanvas(canvas);
      console.log("Mounted task editor");

      // Assign the graph to the canvas
      this.d_canvas.setGraph(this.d_taskgraph);
    },

    beforeDestroy() {
    },

    methods: {

      processMouseWheel(e) {
        e.preventDefault();
        this.d_canvas.processMouseWheel(e);
      },

      resize(e) {
        e.preventDefault();
        this.d_canvas.resize();
      }
    }
  }
);

exports.default = TaskGraphEditor;
