import Vue from "vue";

const vtkActor        = require('vtk.js/Sources/Rendering/Core/Actor');
const vtkSphereSource = require('vtk.js/Sources/Filters/Sources/SphereSource');
const vtkMapper       = require('vtk.js/Sources/Rendering/Core/Mapper');

const Store = require("../vuex/Store").default;

let VtkEllipsoidParticles = Vue.extend( 
  {

    name: 'VtkEllipsoidParticles',

    created() {
      var self = this;
      Store.watch(function() {
                    return Store.getters.isParticleReadComplete;
                  },
                  function() {
                    if (Store.getters.isParticleReadComplete)
                      self.createVTKParticles();
                  });
    },

    mounted() {
    },

    methods: {

      createVTKParticles() {

        console.log("Called create VTK particles");

        // Get the particle data
        let particles = Store.getters.particleData;

        // Extract the radius and center
        let radii = particles["Radius"];
        let centers = particles["Position"];

        // Loop through particles
        radii.map(function(radius, index){

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
          sphere.setPhiResolution(10);
          sphere.setThetaResolution(10);

          // Get the radius ratios
          let ratio = [1.0, radius[1]/radius[0], radius[2]/radius[0]];

          sphere.setRadius(radius[0]);
          let center = centers[index];
          sphere.setCenter(center[0], center[1], center[2]);
          console.log("Radius = " + sphere.getRadius() + " Center = " + sphere.getCenter());

          // Set up the connections
          mapper.setInputConnection(sphere.getOutputPort());
          actor.setMapper(mapper);

          // Save the data
          Store.commit('ADD_VTK_ACTOR',  actor);
          Store.commit('ADD_VTK_SOURCE', sphere);
          Store.commit('ADD_VTK_MAPPER', mapper);
        });

        Store.commit('VTK_ACTORS_CREATED', true);
      }
    }
  }
);

exports.default = VtkEllipsoidParticles;

