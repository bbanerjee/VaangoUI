import THREE = require('three');
import * as Vue from "vue";
import {Data, Component, Lifecycle, Watch, Prop, p } from 'av-ts';

import Store from "../vuex/Store";

@Component({
  name: 'ThreeSphere',
})
export default class ThreeSphere extends Vue {

  private d_geometry : THREE.SphereBufferGeometry;
  private d_material : THREE.MeshBasicMaterial;
  private d_sphere   : THREE.Mesh;

  @Prop
  center = p({
    type: Object,    // {x : ?, y: ?, z: ?}
    required: true
  });

  @Prop
  radius = p({
    type: Number,
    required: true
  });

  @Lifecycle
  public created() {
    let radius = <number>this.radius;
    let center = <THREE.Vector3>this.center;
    this.createThreeSphere(radius, center);
    Store.commit('ADD_THREE_OBJECT', this.d_sphere);
    console.log("Added sphere to scene");
  }

  @Lifecycle
  public mounted() {
  }

  @Lifecycle
  public beforeDestroy() {
  } 

  private createThreeSphere(radius: number, center: THREE.Vector3) {
   
    // Create the sphere
    this.d_geometry = new THREE.SphereBufferGeometry( radius, 10, 10 );
    this.d_geometry.translate(center.x, center.y, center.z);

    this.d_material = new THREE.MeshPhongMaterial({
       color: 0xffaa00, 
       emissive: 0x072534,
       side: THREE.DoubleSide,
       shading: THREE.SmoothShading,
       wireframe: false} );
    this.d_sphere = new THREE.Mesh(this.d_geometry, this.d_material );
    console.log("Created THREE.SphereBuffer");
  }

}
