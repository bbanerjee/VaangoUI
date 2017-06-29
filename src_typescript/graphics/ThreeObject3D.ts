import * as Vue from "vue";
import THREE = require('three');

import {Component, Lifecycle, Watch, Prop, p, Trait} from 'av-ts';

import assign from './util';

@Component({
  name: 'ThreeObject3D'
})
export default class ThreeObject3D extends Vue {

  @Prop
  obj = p({ 
    type: THREE.Object3D 
  })

  @Prop
  position = p({
    type: Object  // { x, y, z }
  })  

  @Prop
  rotation = p({ 
    type: Object  // { x, y, z }
  })  

  // This is the instance variable in the data() method
  _obj   =  <THREE.Object3D>null;
  parent =  <THREE.Object3D>null

  // Watch handlers
  @Watch('position')
  updatePosition(v: any) : void {
    //debugger;
    console.log("Updating position");
    if (v) assign(this._obj.position, v)
  }

  @Watch('rotation')
  updateRotation(v: any) : void {
    //debugger;
    if (v) assign(this._obj.rotation, v)
  }

  // Lifecycle
  @Lifecycle
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
  }

  // ready => mounted + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  @Lifecycle
  mounted() {
    if (this.position) assign(this._obj.position, this.position)
    if (this.rotation) assign(this._obj.rotation, this.rotation)
    if (this.parent) this.parent.add(this._obj)
  }

  // detached => destroyed + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#detached-deprecated
  // but we use beforeDestroy to clean up
  @Lifecycle
  beforeDestroy() {
    //debugger;
    if (this.parent) this.parent.remove(this._obj)
  }
}