const Vue = require("vue");
const THREE = require('three');

const util = require('./util');

let ThreeObject3D = Vue.extend(
  {
    name: 'ThreeObject3D',

    props: {
      obj : { 
        type: THREE.Object3D 
      },
      position : {
        type: Object  // { x, y, z }
      },  
      rotation : {
        type: Object  // { x, y, z }
      }  
    },

    // This is the instance variable in the data() method
    data() {
      return {
       _obj : null,
        parent : null
      };
    },

    // Watch handlers
    watch: {
      position(v) {
        //debugger;
        console.log("Updating position");
        if (v) util.assign(this._obj.position, v)
      },

      rotation(v) {
        //debugger;
        if (v) util.assign(this._obj.rotation, v)
      }
    },

    // Lifecycle
    created() {
      //debugger;
      // fix vue 2.0 `Avoid mutating a prop directly since the value will be overwritten
      // whenever the parent component re-renders. Instead, use a data or computed
      // property based on the prop's value.`
      // https://dotdev.co/peeking-into-vue-js-2-part-1-b457e60c88c6#.918arzkow
      this._obj = this.obj
      // this.obj = new Object3D() // holder
      if (!(this._obj instanceof THREE.Object3D)) {
        this._obj = new THREE.Object3D()
      }
      // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
      // this._obj.name = this._obj.name || this.constructor.name
      this._obj.name = this._obj.name || this._obj.type
    },

    // ready => mounted + (nextTick?)
    // http://rc.vuejs.org/guide/migration.html#ready-deprecated
    mounted() {
      if (this.position) util.assign(this._obj.position, this.position)
      if (this.rotation) util.assign(this._obj.rotation, this.rotation)
      if (this.parent) this.parent.add(this._obj)
    },

    // detached => destroyed + (nextTick?)
    // http://rc.vuejs.org/guide/migration.html#detached-deprecated
    // but we use beforeDestroy to clean up
    beforeDestroy() {
      //debugger;
      if (this.parent) this.parent.remove(this._obj)
    }
  }
);

exports.default = ThreeObject3D;
