"use strict";
var Vue = require("vue");
var app = require('../../tests/test3_app.vue').default;
var vm = new Vue({
    el: '#test3-app',
    components: { app: app },
    render: function (h) {
        return h('app');
    }
});
