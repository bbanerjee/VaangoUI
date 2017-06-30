const Vue = require("vue");
const vkbeautify = require("vkbeautify");

let MPMInputPanel = Vue.extend(
  {
    name: 'mpm-input-panel',

    data() {
      return {
        id : "MPMInputPanel",
        sidebarTabIndex : 0,

        threeD : true,
        twoD : false,

        integrationType : "explicit",
        interpolationType : "gimp",

        mpmFlags : ["resetGrid",
                    "colors",
                    "artVisc",
                    "pressStab"],

        minPartMass : 1.0e-16,
        maxPartVel : 1.0e16,

        artViscC1 : 0.0,
        artViscC2 : 0.0,

        defGradAlgo : "taylor",
        defGradFile : "none",
        defGradTaylorTerms : 1,
        doVelProj : false,

        doRotCoord : false,
        rotCen : [0,0,0],
        rotAxis : [0,0,0],
        rotVel : [0,0,0],

        doGridAMR : false,
        doPartAMR : false
      };
    },

    methods: {

      printMPMParameters() {
        console.log("MPM Flags = " + this.mpmFlags);

        var xmlDoc = document.implementation.createDocument("", "", null);
        var mpmElement = xmlDoc.createElement("MPM");
        var artVisc = xmlDoc.createElement("artificial_viscosity");
        var artViscVal = xmlDoc.createTextNode(this.artViscC1.toString());
        artVisc.appendChild(artViscVal);
        console.log("art visc = " + this.artViscC1 + "," + artVisc.nodeValue);
        mpmElement.appendChild(artVisc);
        xmlDoc.appendChild(mpmElement);
        var formatter = new vkbeautify();
        var xmlText = formatter.xml(new XMLSerializer().serializeToString(xmlDoc));
        //var xmlText = new XMLSerializer().serializeToString(xmlDoc);

        console.log("XML = " + xmlText);
      }

    }
  }
);

exports.default = MPMInputPanel;