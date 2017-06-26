import * as Vue from "vue";
import {Data, Component, Lifecycle, Watch, Prop, p } from 'av-ts';

import * as vtkActor        from 'vtk.js/Sources/Rendering/Core/Actor';
import * as vtkSphereSource from 'vtk.js/Sources/Filters/Sources/SphereSource';
import * as vtkMapper       from 'vtk.js/Sources/Rendering/Core/Mapper';

import Store from "../vuex/Store";

@Component({
  name: 'VtkSphere',
})
export default class VtkSphere extends Vue {

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
    let xCoord = (<any>this.center).x;
    let yCoord = (<any>this.center).y;
    let zCoord = (<any>this.center).z;
    sphere.setCenter(xCoord, yCoord, zCoord);
    console.log("Center = " + sphere.getCenter());

    // Set up the connections
    mapper.setInputConnection(sphere.getOutputPort());
    actor.setMapper(mapper);

    // Save the data
    Store.commit('ADD_VTK_ACTOR',  actor);
    Store.commit('ADD_VTK_SOURCE', sphere);
    Store.commit('ADD_VTK_MAPPER', mapper);
  }

  @Lifecycle
  mounted() {
  }

}