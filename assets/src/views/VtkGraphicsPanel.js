"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const av_ts_1 = require("av-ts");
//import vtk = require("vtk.js");
let VtkGraphicsPanel = class VtkGraphicsPanel extends Vue {
    //import vtk = require("vtk.js");
    constructor() {
        super(...arguments);
        this.id = "VtkGraphicsPanel";
        this.size = {
            w: 300,
            h: 300
        };
        /*
        stopAnimation(event: any) {
          console.log(event);
          console.log("Click detected in main graphics panel");
        }
        */
    }
};
VtkGraphicsPanel = __decorate([
    av_ts_1.Component({
        name: 'vtk-graphics-panel'
    })
], VtkGraphicsPanel);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VtkGraphicsPanel;