import Vue from "vue";

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
