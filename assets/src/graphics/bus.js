"use strict";
var Vue = require("vue");
Object.defineProperty(exports, "__esModule", { value: true });
// global event bus
// fix `Uncaught TypeError: this.$dispatch is not a function`
// http://rc.vuejs.org/guide/migration.html#dispatch-and-broadcast-deprecated
exports.default = new Vue();
