import {Getter, GetterTree} from 'vuex';
import {ThreeGraphicsState} from "./ThreeGraphicsState";

export function scene(ThreeGraphicsState: ThreeGraphicsState)  {
  return ThreeGraphicsState.scene;
}

export function camera(ThreeGraphicsState: ThreeGraphicsState) {
  return ThreeGraphicsState.camera;
}

export function areThreeObjectsCreated(state: ThreeGraphicsState) {
  return state.areThreeObjectsCreated;
}
export default <GetterTree<ThreeGraphicsState, any>> {
  scene, 
  camera,
  areThreeObjectsCreated
}