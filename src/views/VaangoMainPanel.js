import Vue from "vue";

let VaangoMainPanel = Vue.extend( 
  {
    name: 'vaango-main-panel',

    data() {
      return {
        id : "VaangoMainPanel", 
        sidebarTabIndex : 0, 
        sidebarTabName : "",
        editorWindowActive : false,
        size : { x: 500, y: 500 }
      }
    },

    methods: {
      updateActiveTab(index, name) {
        console.log("Updating sidebarTabIndex to " + index + " " + name);
        this.sidebarTabIndex = index;
        this.sidebarTabName = name;

        // If the "Create geometry" tab has been selected than
        // turn on the editor window
        if (this.sidebarTabName === "Create geometry") {
          this.editorWindowActive = true;
        } else {
          this.editorWindowActive = false;
        }
      }
    }
  }
);

exports.default = VaangoMainPanel;
