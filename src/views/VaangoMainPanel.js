const Vue = require("vue");

let VaangoMainPanel = Vue.extend( 
  {
    name: 'vaango-main-panel',

    data() {
      return {
        id : "VaangoMainPanel", 
        sidebarTabIndex : 0, 
        sidebarTabName : "",
        size : { x: 500, y: 500 }
      }
    },

    methods: {
      updateActiveTab(index, name) {
        console.log("Updating sidebarTabIndex to " + index + " " + name);
        this.sidebarTabIndex = index;
        this.sidebarTabName = name;
      }
    }
  }
);

exports.default = VaangoMainPanel;
