const Vue = require("vue");

let VaangoInputsSidebar = Vue.extend( 
  {
    name: 'vaango-inputs-sidebar',

    data() {
      return {
        id: "VaangoInputsSidebar",
        tabNames: [
          "Simulation type",
          "Timestep controls",
          "Geometry",
          "MPM Parameters",
          "MPM Materials",
          "ICE Parameters",
          "ICE Materials",
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