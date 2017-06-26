"use strict";
var Vue = require("vue");
var Test4App = require('../../tests/test4_app.vue').default;
var vm = new Vue({
    el: '#test4-app',
    components: { Test4App: Test4App },
    render: function (h) {
        return h('test4-app');
    }
});
