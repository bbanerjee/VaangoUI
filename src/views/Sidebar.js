const Vue = require("vue");

let Sidebar = Vue.extend (
  {
    name: 'sidebar',

    data() {
      return {
        id : "Sidebar"
      }
    },

    methods: {
      propagateActiveTab(index, name) {
        console.log("Propagating active tab " + index + " " + name);
        this.$emit('propagateActiveTab', index, name);
      }
    }
  }
);

exports.default = Sidebar;