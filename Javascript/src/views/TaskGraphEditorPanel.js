import Vue from "vue";

let TaskGraphEditorPanel = Vue.extend(
  {

    name: 'task-graph-editor-panel',

    data() {
      return {
       id : "TaskGraphEditorPanel",
      };
    },

    methods: {
     /*
     detectAction(event: any) {
       console.log(event);
       console.log("Click detected in task graph editor panel");
     }
     */
    }
  }
);

exports.default = TaskGraphEditorPanel;

