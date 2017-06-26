import THREE = require('three');

import { Mutation, MutationTree } from 'vuex';
import { ThreeGraphicsState } from './ThreeGraphicsState';


export function SET_SCENE(state: ThreeGraphicsState, scene: THREE.Scene) {
  state.scene = scene;
  console.log("set scene");
}

export function SET_CAMERA(state: ThreeGraphicsState, camera: THREE.Camera) {
  state.camera = camera;
  console.log("set camera");
}

export function DELETE_SCENE(state: ThreeGraphicsState, message: string) {
  state.scene = null;
  console.log("deleted scene" + message);
}

export function DELETE_CAMERA(state: ThreeGraphicsState, message: string) {
  state.camera = null;
  console.log("deleted camera" + message);
}

export function ADD_THREE_OBJECT(state: ThreeGraphicsState, object: any) {
  state.scene.add(object);
  //console.log("Added object");
}

export function THREE_OBJECTS_CREATED(state: ThreeGraphicsState, value: boolean) {
  state.areThreeObjectsCreated = value;
  console.log("Three graphics state updated");
}


export default <MutationTree<ThreeGraphicsState>>{
  SET_SCENE,
  SET_CAMERA,
  DELETE_SCENE,
  DELETE_CAMERA,
  ADD_THREE_OBJECT,
  THREE_OBJECTS_CREATED,
}
