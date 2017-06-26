"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const av_ts_1 = require("av-ts");
const vtkActor = require("vtk.js/Sources/Rendering/Core/Actor");
const vtkSphereSource = require("vtk.js/Sources/Filters/Sources/SphereSource");
const vtkMapper = require("vtk.js/Sources/Rendering/Core/Mapper");
const Store_1 = require("../vuex/Store");
let VtkEllipsoidParticles = class VtkEllipsoidParticles extends Vue {
    created() {
        var self = this;
        Store_1.default.watch(function () {
            return Store_1.default.getters.isParticleReadComplete;
        }, function () {
            if (Store_1.default.getters.isParticleReadComplete)
                self.createVTKParticles();
        });
    }
    mounted() {
    }
    createVTKParticles() {
        console.log("Called create VTK particles");
        // Get the particle data
        let particles = Store_1.default.getters.particleData;
        // Extract the radius and center
        let radii = particles["Radius"];
        let centers = particles["Position"];
        // Loop through particles
        radii.map(function (radius, index) {
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
            sphere.setRadius(radius[0]);
            let center = centers[index];
            sphere.setCenter(center[0], center[1], center[2]);
            console.log("Radius = " + sphere.getRadius() + " Center = " + sphere.getCenter());
            // Set up the connections
            mapper.setInputConnection(sphere.getOutputPort());
            actor.setMapper(mapper);
            // Save the data
            Store_1.default.commit('ADD_VTK_ACTOR', actor);
            Store_1.default.commit('ADD_VTK_SOURCE', sphere);
            Store_1.default.commit('ADD_VTK_MAPPER', mapper);
        });
        Store_1.default.commit('VTK_ACTORS_CREATED', true);
    }
};
__decorate([
    av_ts_1.Lifecycle
], VtkEllipsoidParticles.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], VtkEllipsoidParticles.prototype, "mounted", null);
VtkEllipsoidParticles = __decorate([
    av_ts_1.Component({
        name: 'VtkEllipsoidParticles'
    })
], VtkEllipsoidParticles);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VtkEllipsoidParticles;
