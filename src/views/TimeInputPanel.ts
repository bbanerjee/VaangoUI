import * as Vue from "vue";
import { Component } from "av-ts";


@Component({
  name: 'time-input-panel',
})
export default class TimeInputPanel extends Vue {

  id: string = "TimeInputPanel";

  initTime: Number = 0.0;
  maxTime: Number = 1.0;
  maxNumSteps: Number = 99999;
  deltInit: Number = 1.0e-6;
  deltMin: Number = 0.001;
  deltMax: Number = 0.01;
  maxDeltInc: Number = 1.0;
  deltMultiplier: Number = 0.3;

  updateInitTime(time: number) {
    console.log("Before " + this.initTime)
    this.initTime = time;
    console.log("After " + this.initTime)
  }
}