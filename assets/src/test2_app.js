"use strict";
var Vue = require("vue");
var vm = new Vue({
    el: '#test2-app',
    render: function (h) {
        return h('h1', 'testing hello world');
    }
});
