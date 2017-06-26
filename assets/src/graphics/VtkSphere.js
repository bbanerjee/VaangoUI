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
let VtkSphere = class VtkSphere extends Vue {
    constructor() {
        super(...arguments);
        this.center = av_ts_1.p({
            type: Object,
            required: true
        });
        this.radius = av_ts_1.p({
            type: Number,
            required: true
        });
    }
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
        let xCoord = this.center.x;
        let yCoord = this.center.y;
        let zCoord = this.center.z;
        sphere.setCenter(xCoord, yCoord, zCoord);
        console.log("Center = " + sphere.getCenter());
        // Set up the connections
        mapper.setInputConnection(sphere.getOutputPort());
        actor.setMapper(mapper);
        // Save the data
        Store_1.default.commit('ADD_VTK_ACTOR', actor);
        Store_1.default.commit('ADD_VTK_SOURCE', sphere);
        Store_1.default.commit('ADD_VTK_MAPPER', mapper);
    }
    mounted() {
    }
};
__decorate([
    av_ts_1.Prop
], VtkSphere.prototype, "center", void 0);
__decorate([
    av_ts_1.Prop
], VtkSphere.prototype, "radius", void 0);
__decorate([
    av_ts_1.Lifecycle
], VtkSphere.prototype, "created", null);
__decorate([
    av_ts_1.Lifecycle
], VtkSphere.prototype, "mounted", null);
VtkSphere = __decorate([
    av_ts_1.Component({
        name: 'VtkSphere',
    })
], VtkSphere);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VtkSphere;
