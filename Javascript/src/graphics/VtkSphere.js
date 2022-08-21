import Vue from "vue";

const vtkActor        = require("vtk.js/Sources/Rendering/Core/Actor");
const vtkSphereSource = require("vtk.js/Sources/Filters/Sources/SphereSource");
const vtkMapper       = require("vtk.js/Sources/Rendering/Core/Mapper");

const Store = require("../vuex/Store").default;

let VtkSphere = Vue.extend(
  {
    name: 'VtkSphere',

    props: {
      center : {
        type: Object,    // {x : ?, y: ?, z: ?}
        required: true
      },

      radius : {
        type: Number,
        required: true
      }
    },

    created() {

      // Create the _mapper
      console.log("Sphere mapper created");
      const mapper = vtkMapper.newInstance();

      // Create the actor
      console.log("Sphere actor created");
      const actor = vtkActor.newInstance();
      actor.getProperty().setEdgeVisibility(true);
      actor.getProperty().setEdgeColor(1.0, 0.5, 0.5);

      // Create the source
      console.log("Sphere source created");
      const sphere = vtkSphereSource.newInstance();
      sphere.setPhiResolution(36);
      sphere.setThetaResolution(36);
      sphere.setRadius(this.radius);
      let xCoord = (this.center).x;
      let yCoord = (this.center).y;
      let zCoord = (this.center).z;
      sphere.setCenter(xCoord, yCoord, zCoord);
      console.log("Center = " + sphere.getCenter());

      // Set up the connections
      mapper.setInputConnection(sphere.getOutputPort());
      actor.setMapper(mapper);

      // Save the data
      Store.commit('ADD_VTK_ACTOR',  actor);
      Store.commit('ADD_VTK_SOURCE', sphere);
      Store.commit('ADD_VTK_MAPPER', mapper);
    },

    mounted() {
    }

  }
);

exports.default = VtkSphere;

