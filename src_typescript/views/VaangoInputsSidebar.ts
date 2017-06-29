import * as Vue from "vue";
import { Component } from "av-ts";

@Component({
  name: 'vaango-inputs-sidebar'
})
export default class VaangoInputsSidebar extends Vue {

  id: string = "VaangoInputsSidebar";
  tabNames: string[] =  [
    "Simulation type",
    "Timestep controls",
    "Geometry",
    "MPM Parameters",
    "MPM Materials",
    "ICE Parameters",
    "ICE Materials",
    "Exchange",
    "Grid and BC"
  ];

  public activateSidebarTab(tabIndex: number, tabName: string) {
    console.log("Activated sidebar tab: " + tabIndex + " " + tabName);
    this.$emit('activateSidebarTab', tabIndex, tabName);
  }
}