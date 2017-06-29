//import * as vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';

export class VTKGraphicsState {
  actors     : any [];
  sources    : any [];
  mappers    : any [];
  areVTKActorsCreated  : boolean;

  constructor() {
    this.actors  = [];
    this.sources = [];
    this.mappers = [];
    this.areVTKActorsCreated = false;
  }
};
