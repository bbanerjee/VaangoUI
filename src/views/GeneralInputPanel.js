const Vue = require("vue");

let GeneralInputPanel = Vue.extend(
  {
    name: 'general-input-panel',

    data() {
      return {
        id : "GeneralInputPanel"
      };
    }
  }
);

exports.default = GeneralInputPanel;