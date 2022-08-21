import * as Vue from "vue";
import {Component} from "av-ts";

@Component({
  name: 'vaango-main-panel',
})
export default class VaangoMainPanel extends Vue {
  
  id : string = "VaangoMainPanel";
  sidebarTabIndex : number = 0;
  sidebarTabName : string = "";
  size: {
    x: 500;
    y: 500;
  };

  public updateActiveTab(index: number, name: string) {
    console.log("Updating sidebarTabIndex to " + index + " " + name);
    this.sidebarTabIndex = index;
    this.sidebarTabName = name;
  }
}
