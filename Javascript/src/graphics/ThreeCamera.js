import Vue from "vue";
const THREE = require("three");
const Store = require("../vuex/Store").default;
const util = require('./util');

let Camera = Vue.extend(
  {
    name: 'Camera',

    props: {
      size : {
        type: Object, // { w, h }
      }, 
      position : {
        type: Object  // { x, y, z }
      }
    },

    data() {

      return {
        d_size: {w: 0, h: 0},
        d_position: {x: 0, y: 0, z: 0}
      };
    }, 

    created() {

      // Keep local copies of the properties in case we need to modify them
      this.d_size = this.size;
      this.d_position = this.position;

      let camera = Store.getters.camera;
      if (!camera) {
        let w = (this.size).w;
        let h = (this.size).h;
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
    },

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
    },

    methods: {
      updateCameraPosition(camera, pos) {
        console.log(pos);
        util.assign(camera.position, pos);
        //camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
      }
    }
  }
);

exports.default = Camera;

