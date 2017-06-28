import * as Vue from "vue";
import {Component} from "av-ts";

@Component({
  name: 'mpm-input-panel'
})
export default class MPMInputPanel extends Vue {
  
  id : string = "MPMInputPanel";
  sidebarTabIndex : number = 0;

  threeD : boolean = true;
  twoD : boolean = false;

  integrationType : string = "explicit";
  interpolationType : string = "gimp";

  mpmFlags : string [] = ["resetGrid",
                          "colors",
                          "artVisc",
                          "pressStab"];

  minPartMass : number = 1.0e-16;
  maxPartVel : number = 1.0e16;

  artViscC1 : number = 0.0;
  artViscC2 : number = 0.0;

  defGradAlgo : string = "taylor";
  defGradFile : string = "none";
  defGradTaylorTerms : number = 1;
  doVelProj : boolean = false;

  doRotCoord : boolean = false;
  rotCen : number [] = [0,0,0];
  rotAxis : number [] = [0,0,0];
  rotVel : number [] = [0,0,0];

  doGridAMR : boolean = false;
  doPartAMR : boolean = false;

  printMPMParameters() {
    console.log("MPM Flags = " + this.mpmFlags);

    var xmlDoc = document.implementation.createDocument(null, "main", null);
    var root = xmlDoc.createElement("MPM");
    var node = xmlDoc.createTextNode("artificial_viscosity");
    node.nodeValue = this.artViscC1.toString();
    root.appendChild(node);
    var xmlText = new XMLSerializer().serializeToString(root);

    console.log("XML = " + xmlText);

  }
}