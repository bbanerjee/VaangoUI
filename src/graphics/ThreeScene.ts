import * as Vue from "vue";
import THREE = require('three');

import { Component, Lifecycle, Watch, Prop, p } from 'av-ts';

import Store from '../vuex/Store';

@Component({
  name: 'ThreeScene',
})

export default class ThreeScene extends Vue {

  @Prop
  size = p({
    type: Object, // { w, h }
  });

  @Lifecycle
  created() {

    // Create the scene
    let scene = Store.getters.scene;
    if (!scene) {
      scene = new THREE.Scene();
      console.log("Created scene");

      // Add the lights
      let dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(1, 1, 1);
      scene.add(dirLight);
      dirLight = new THREE.DirectionalLight(0x002288);
      dirLight.position.set(-1, -1, -1);
      scene.add(dirLight);
      let ambLight = new THREE.AmbientLight(0x222222);
      scene.add(ambLight);
      console.log("Added lights");

      // Update the scene
      Store.commit('SET_SCENE', scene)
    }

  }

  @Lifecycle
  mounted() {

    // Get the scene and the camera
    let scene = Store.getters.scene;
    let camera = Store.getters.camera;
    console.log("Got camera");

    // Add the camera to the scene
    if (camera) {
      scene.add(camera);
      console.log("Added camera to scene");
      console.log(camera.position);

      // Update the scene
      Store.commit('SET_SCENE', scene);
      //console.log("Set the scene");
    } else {
      console.log("Camera has not been created yet");
    }
  }

}
