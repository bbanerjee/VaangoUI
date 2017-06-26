"use strict";
// implements Object.assign
// fix `Cannot resolve module 'babel-runtime/core-js/object/assign'`
// https://github.com/babel/babel/issues/2780
function assign(dest, ...srcs) {
    srcs.reverse().forEach(src => {
        for (const k in src) {
            if (src.hasOwnProperty(k)) {
                dest[k] = src[k];
            }
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assign;
