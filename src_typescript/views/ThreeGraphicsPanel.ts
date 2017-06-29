import * as Vue from "vue";
import {Component} from "av-ts";

@Component({
  name: 'three-graphics-panel'
})
export default class ThreeGraphicsPanel extends Vue {
  
  id : string = "ThreeGraphicsPanel";
  size: Object = {
    w: 200,
    h: 200
  };

  /*
  stopAnimation(event: any) {
    console.log(event);
    console.log("Click detected in main graphics panel");
  }
  */
}