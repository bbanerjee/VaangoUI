import * as Vue from "vue";
import {Component} from "av-ts";
//import vtk = require("vtk.js");

@Component({
  name: 'vtk-graphics-panel'
})
export default class VtkGraphicsPanel extends Vue {
  
  id : string = "VtkGraphicsPanel";
  size: Object = {
    w: 500,
    h: 500
  };

  /*
  stopAnimation(event: any) {
    console.log(event);
    console.log("Click detected in main graphics panel");
  }
  */
}
