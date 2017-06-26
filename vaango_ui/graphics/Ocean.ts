import * as Vue from "vue";
import THREE = require('three');

import {Data, Component, Lifecycle, Watch, Prop, p } from 'av-ts';

import ThreeObject3D from "./ThreeObject3D";
import Store from "../vuex/Store";

@Component({
  name: 'Ocean',
  mixins: [ThreeObject3D]
})
export default class Ocean extends Vue implements ThreeObject3D {

  clock : THREE.Clock;
  _obj  : THREE.Mesh;



  @Lifecycle
  created() {
    //debugger;
    this.animate = this.animate.bind(this);
    this.clock = new THREE.Clock();
    this._obj = this.createOcean();
  }

  @Lifecycle
  mounted() {
    //debugger;
    Store.commit('ADD_OBJECT', this._obj);
    this.animate();
  }

  //methods: {
  createOcean() {
    //debugger;
    const geometry = new THREE.PlaneGeometry(10000, 10000, 40, 40);
    geometry.rotateX(-Math.PI / 2);
    for (let i = 0, l = geometry.vertices.length; i < l; i++) {
      geometry.vertices[i].y = 50.0 * Math.sin(i / 2);
    }
    const texture = new THREE.TextureLoader().load(require('./water.jpg'));
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x0044ff, map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'Ocean';
    return mesh;
  }

  animate() {
    //debugger;
    requestAnimationFrame(this.animate);
    const time = this.clock.getElapsedTime() * 5;
    for (let i = 0, l = (<THREE.Geometry>this._obj.geometry).vertices.length; i < l; i++) {
      (<THREE.Geometry>this._obj.geometry).vertices[i].y = 10 * Math.sin(i / 5 + (time + i) / 7);
    }
    (<THREE.Geometry>this._obj.geometry).verticesNeedUpdate = true;
  }

    // Mixins from Object3D
    obj: any;
    position: any;
    rotation: any;
    parent: any;

    updatePosition: (v: any) => void;
    updateRotation: (v: any) => void;
    beforeDestroy: () => void;
}