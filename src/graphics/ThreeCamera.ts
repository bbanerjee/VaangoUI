import * as Vue from "vue";
import THREE = require("three");

import { Component, Lifecycle, Prop, p } from 'av-ts';

import Store from "../vuex/Store";
import assign from './util';

@Component({
  name: 'Camera',
})
export default class Camera extends Vue {

  // prop
  @Prop
  size = p({
    type: Object, // { w, h }
  });

  @Prop
  position = p({
    type: Object  // { x, y, z }
  })  

  // data
  d_size: any;
  d_position: any;

  @Lifecycle
  created() {

    // Keep local copies of the properties in case we need to modify them
    this.d_size = this.size;
    this.d_position = this.position;

    let camera = Store.getters.camera;
    if (!camera) {
      let w = (<any>this.size).w;
      let h = (<any>this.size).h;
      camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
      console.log("Created camera")

      // Update the position if the template specifies that
      console.log(this.position);
      if (this.position) {
        this.updateCameraPosition(camera, this.position);
        camera.updateProjectionMatrix();
      }
      Store.commit('SET_CAMERA', camera);
      console.log(Store.getters.camera.position);
    }
  }

  @Lifecycle
  mounted() {

    // Update the position if the template specifies that
    /*
    console.log(this.position);
    let camera = Store.getters.camera;
    if (this.position) {
      this.updateCameraPosition(camera, this.position);
    }
    Store.commit('SET_CAMERA', camera);
    console.log(Store.getters.camera.position);
    */
  }

  /*
  get getCamera() {
    return Store.getters.camera;
  }
  */

  private updateCameraPosition(camera: THREE.Camera, pos: any) : void {
    console.log(pos);
    assign(camera.position, pos);
    //camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
  }
}