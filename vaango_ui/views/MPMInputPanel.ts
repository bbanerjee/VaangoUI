import * as Vue from "vue";
import {Component} from "av-ts";

@Component({
  name: 'mpm-input-panel'
})
export default class MPMInputPanel extends Vue {
  
  id : string = "MPMInputPanel";
  sidebarTabIndex : number = 0;
}