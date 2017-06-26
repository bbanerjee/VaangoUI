"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Vue = require("vue");
const av_ts_1 = require("av-ts");
const THREE = require("three");
const Store_1 = require("../vuex/Store");
let ThreeEllipsoidParticles = class ThreeEllipsoidParticles extends Vue {
    created() {
        var self = this;
        Store_1.default.watch(function () {
            return Store_1.default.getters.isParticleReadComplete;
        }, function () {
            if (Store_1.default.getters.isParticleReadComplete)
                self.createThreeParticles();
        });
    }
    mounted() {
    }
    createThreeParticles() {
        console.log("Called create Three particles");
        // Get the particle data
        let particles = Store_1.default.getters.particleData;
        // Extract the radius and center
        let radii = particles["Radius"];
        let centers = particles["Position"];
        let axes_a = particles["Axis a"];
        let axes_b = particles["Axis b"];
        let axes_c = particles["Axis c"];
        // Loop through particles
        var self = this;
        radii.map(function (radius, index) {
            // Get the radius ratios
            let ratio = [1.0, radius[1] / radius[0], radius[2] / radius[0]];
            // Get the axes into vectors and compute rotation matrix
            let axis_a = new THREE.Vector3(Math.cos(axes_a[index][0]), Math.cos(axes_a[index][1]), Math.cos(axes_a[index][2]));
            let axis_b = new THREE.Vector3(Math.cos(axes_b[index][0]), Math.cos(axes_b[index][1]), Math.cos(axes_b[index][2]));
            let axis_c = new THREE.Vector3(Math.cos(axes_c[index][0]), Math.cos(axes_c[index][1]), Math.cos(axes_c[index][2]));
            let rotMatrix = new THREE.Matrix4();
            rotMatrix.set(axis_a.x, axis_b.x, axis_c.y, 0, axis_a.y, axis_b.y, axis_c.y, 0, axis_a.z, axis_b.z, axis_c.z, 0, 0, 0, 0, 1);
            //let rotMatrix = self.computeRotationMatrix(axis_a, axis_b, axis_c);
            // Create the sphere geometry
            const sph_geometry = new THREE.SphereGeometry(radius[0], 32, 16);
            // Rotate sphere 
            sph_geometry.applyMatrix(rotMatrix);
            // Convert into ellipsoid
            sph_geometry.applyMatrix(new THREE.Matrix4().makeScale(ratio[0], ratio[1], ratio[2]));
            // Translate the geometry
            let center = new THREE.Vector3(centers[index][0], centers[index][1], centers[index][2]);
            sph_geometry.translate(center.x, center.y, center.z);
            // Convert into buffer geometry
            const geometry = new THREE.BufferGeometry().fromGeometry(sph_geometry);
            console.log("THREE.SphereBuffer geometry created");
            const material = new THREE.MeshPhongMaterial({
                color: 0xffaa00,
                emissive: 0x072534,
                side: THREE.DoubleSide,
                shading: THREE.SmoothShading,
                wireframe: false
            });
            const sphere = new THREE.Mesh(geometry, material);
            // Save the data
            Store_1.default.commit('ADD_THREE_OBJECT', sphere);
        });
        Store_1.default.commit('THREE_OBJECTS_CREATED', true);
    }
    computeRotationMatrix(axis_a, axis_b, axis_c) {
        // Normalize
        axis_a = axis_a.normalize();
        axis_b = axis_b.normalize();
        axis_c = axis_c.normalize();
        // Get the lab axes
        let x_axis = new THREE.Vector3(1.0, 0.0, 0.0);
        let y_axis = new THREE.Vector3(0.0, 1.0, 0.0);
        let z_axis = new THREE.Vector3(0.0, 0.0, 1.0);
        // Create the rotation matrix in homogeneous coordinates
        let rot_mat = new THREE.Matrix4();
        rot_mat.set(x_axis.dot(axis_a), x_axis.dot(axis_b), x_axis.dot(axis_c), 0.0, y_axis.dot(axis_a), y_axis.dot(axis_b), y_axis.dot(axis_c), 0.0, z_axis.dot(axis_a), z_axis.dot(axis_b), z_axis.dot(axis_c), 0.0, 0.0, 0.0, 0.0, 1.0);
        // TODO: Check ortho
        return rot_mat;
    }
};
__decorate([
    av_ts_1.Lifecycle
], ThreeEllipsoidParticles.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], ThreeEllipsoidParticles.prototype, "mounted", null);
ThreeEllipsoidParticles = __decorate([
    av_ts_1.Component({
        name: 'ThreeEllipsoidParticles'
    })
], ThreeEllipsoidParticles);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThreeEllipsoidParticles;
