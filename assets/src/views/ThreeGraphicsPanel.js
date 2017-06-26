"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const av_ts_1 = require("av-ts");
let ThreeGraphicsPanel = class ThreeGraphicsPanel extends Vue {
    constructor() {
        super(...arguments);
        this.id = "ThreeGraphicsPanel";
        this.size = {
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
};
ThreeGraphicsPanel = __decorate([
    av_ts_1.Component({
        name: 'three-graphics-panel'
    })
], ThreeGraphicsPanel);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThreeGraphicsPanel;
