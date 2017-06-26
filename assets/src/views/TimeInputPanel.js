"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const av_ts_1 = require("av-ts");
let TimeInputPanel = class TimeInputPanel extends Vue {
    constructor() {
        super(...arguments);
        this.id = "TimeInputPanel";
        this.initTime = 0.0;
        this.maxTime = 1.0;
        this.maxNumSteps = 99999;
        this.deltInit = 1.0e-6;
        this.deltMin = 0.001;
        this.deltMax = 0.01;
        this.maxDeltInc = 1.0;
        this.deltMultiplier = 0.3;
    }
    updateInitTime(time) {
        console.log("Before " + this.initTime);
        this.initTime = time;
        console.log("After " + this.initTime);
    }
};
TimeInputPanel = __decorate([
    av_ts_1.Component({
        name: 'time-input-panel',
    })
], TimeInputPanel);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimeInputPanel;
