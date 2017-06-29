import * as Vue from "vue";
import {Component} from "av-ts";

@Component({
  name: 'sidebar'
})
export default class Sidebar extends Vue {
  
  id : string = "Sidebar";

  public propagateActiveTab(index: number, name: string) {
    console.log("Propagating active tab " + index + " " + name);
    this.$emit('propagateActiveTab', index, name);
  }
}