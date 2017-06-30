const THREE = require('three');
const Vue = require("vue");

const Store = require("../vuex/Store").default;

let ThreeSphere = Vue.extend(
  {
    name: 'ThreeSphere',

    props: {
      center : {
        type: Object,    // {x : ?, y: ?, z: ?}
        required: true
      },
      radius : {
        type: Number,
        required: true
      },
    },

    data() {
     return {
       d_geometry : null,
       d_material : null,
       d_sphere   : null,
     }
    },

    created() {
      let radius = this.radius;
      let center = this.center;
      this.createThreeSphere(radius, center);
      Store.commit('ADD_THREE_OBJECT', this.d_sphere);
      console.log("Added sphere to scene");
    },

    mounted() {
    },

    beforeDestroy() {
    } ,

    methods: {
      createThreeSphere(radius, center) {
       
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
  }
);

exports.default = ThreeSphere;
