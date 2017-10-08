import Vue from "vue";

let VaangoInputsSidebar = Vue.extend( 
  {
    name: 'vaango-inputs-sidebar',

    data() {
      return {
        id: "VaangoInputsSidebar",
        tabNames: [
          "Taskgraph editor",
          "Simulation type",
          "Timestep controls",
          "Create geometry",
          "MPM parameters",
          "MPM materials",
          "ICE parameters",
          "ICE materials",
          "Exchange",
          "Grid and BC"
        ]
      };
    },

    methods : {

      activateSidebarTab(tabIndex, tabName) {
        console.log("Activated sidebar tab: " + tabIndex + " " + tabName);
        this.$emit('activateSidebarTab', tabIndex, tabName);
      }
    }
  }
);

exports.default = VaangoInputsSidebar;
