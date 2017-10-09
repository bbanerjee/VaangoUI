import Vue from "vue";

let VaangoMainPanel = Vue.extend( 
  {
    name: 'vaango-main-panel',

    data() {
      return {
        id : "VaangoMainPanel", 
        sidebarTabIndex : 0, 
        sidebarTabName : "",
        taskgraphEditorIsActive : false,
        geometryEditorIsActive : false,
        size : { x: 500, y: 500 }
      }
    },

    methods: {
      updateActiveTab(index, name) {
        console.log("Updating sidebarTabIndex to " + index + " " + name);
        this.sidebarTabIndex = index;
        this.sidebarTabName = name;

        // If the "Taskgraph editor" tab has been selected than
        // turn on the taskgraph editor window
        if (this.sidebarTabName === "Taskgraph editor") {
          this.taskgraphEditorIsActive = true;
        } else {
          this.taskgraphEditorIsActive = false;
        }

        // If the "Create geometry" tab has been selected than
        // turn on the geometry editor window
        if (this.sidebarTabName === "Create geometry") {
          this.geometryEditorIsActive = true;
        } else {
          this.geometryEditorIsActive = false;
        }
      }
    }
  }
);

exports.default = VaangoMainPanel;
