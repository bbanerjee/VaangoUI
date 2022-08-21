import * as Vue from "vue";
import {Component, Prop, Watch} from "av-ts";

@Component({
  name: 'main-text-panel',
  props: {
    sidebarTabIndex: Number,
    sidebarTabName: String
  }
})
export default class MainTextPanel extends Vue {
  
  id : string = "MainTextPanel";

}