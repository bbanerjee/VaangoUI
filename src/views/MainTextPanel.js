const Vue = require("vue");

let MainTextPanel = Vue.extend( 
  {
    name: 'main-text-panel',

    props: {
      sidebarTabIndex: {
        default() {
          return 0;
        }
      }, 
      sidebarTabName: {
        default() {
          return "None";
        }
      }
    },
  
    data() {
      return {
        id : "MainTextPanel"
      }
    }, 
  }
);

exports.default = MainTextPanel;