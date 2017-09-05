const Vue = require("vue");
const vkbeautify = require("vkbeautify");

let ICEInputPanel = Vue.extend(
  {
    name: 'ice-input-panel',

    data() {
      return {
        id : "ICEInputPanel",
        sidebarTabIndex : 0,

        // These are the names that are displayed in the UI
        d_dimensionLabels : [
          "3D",
          "2D Axisymmetric"
        ],
        d_dimension: 0,

        // Solution technique
        d_iceAlgoLabel: "Solution technique",
        d_iceAlgoItems : [
          "Total form",
          "Rate form"
        ],
        d_iceAlgoItemsUPS : [
          "EqForm",
          "RateForm"
        ],
        d_iceAlgo: "Rate form",
        d_iceAlgoIndex: 1,

        // Advection algorithm
        d_advectAlgoLabel: "Advection algorithm",
        d_advectAlgoItems : [
          "First order",
          "Second order"
        ],
        d_advectAlgoItemsUPS : [
          "FirstOrder",
          "SecondOrder"
        ],
        d_advectAlgo : "Second order",
        d_advectAlgoIndex: 1,

        // ICE simulation flags
        d_iceFlagLabel : "ICE flags",
        d_iceFlagItems : [
          "Turn on compatible fluxes",
          "Turn on heat addition",
          "Clamp specific volume"
        ],
        d_iceFlagItemsUPS : [
        ],
        d_iceFlags : [],
        d_compatFlux : false,
        d_addHeat: false,
        d_clampSpVol : false,

        // Limiting conditions 
        d_cflLabel : "CFL number",
        d_cfl : 0.25,
        d_maxEqItLabel : "Maximum equilibrium iterations",
        d_maxEqIt : 1000,
        d_minLevelLabel : "Minimum grid level",
        d_minLevel : 0,
        d_maxLevelLabel : "Maximum grid level",
        d_maxLevel : 100,

        // Heat addition
        d_numAddHeatMatLabel : "Nummber of Add Heat materials",
        d_numAddHeatMat : 0,
        d_addHeatStartTimeLabel : "Add heat start time",
        d_addHeatStartTime : 0.0, 
        d_addHeatEndTimeLabel : "Add heat end time",
        d_addHeatEndTime : 0.001, 

        // ** TODO ** Add panel for multiple heat addition materials
      };
    },

    computed: {
      c_addHeat: {
        get: function() {
          return this.d_addHeat;
        }
      }
    },

    methods: {

      updateICEAlgo() {
        this.d_iceAlgoIndex = 0;
        this.d_iceAlgoItems.forEach((label, index) => {
          if (this.d_iceAlgo === label) {
            this.d_iceAlgoIndex = index;
            return;
          }
        });
      },

      updateAdvectAlgo() {
        this.d_advectAlgoIndex = 0;
        this.d_advectAlgoItems.forEach((label, index) => {
          if (this.d_advectAlgo === label) {
            this.d_advectAlgoIndex = index;
            return;
          }
        });
      },

      updateICEFlags() {
        this.d_iceFlags.forEach((flag) => {
          if (flag.index === 0) {
            this.d_compatFlux = true;
          } 
          if (flag.index === 1) {
            this.d_addHeat = true;
          } 
          if (flag.index === 2) {
            this.d_clampSpVol = true;
          }
        });
      },

      printICEParameters() {
        console.log("dim = " + this.d_dimension);
        console.log("Ice Algo = " + this.d_iceAlgo);
        console.log("Advection Algo = " + this.d_advectAlgo);
        console.log("ICE Flags = ");
        this.d_iceFlags.forEach((flag) => {
          console.log(flag.index + " " + flag.label);
        });

        let xmlDoc = document.implementation.createDocument("", "", null);

        let cfd = xmlDoc.createElement("CFD");
        let cfl = xmlDoc.createElement("cfl");
        cfl.appendChild(xmlDoc.createTextNode(this.d_cfl.toString()));
        cfd.appendChild(cfl);

        let ice = xmlDoc.createElement("ICE");
        let maxit = xmlDoc.createElement("max_iteration_equilibration");
        maxit.appendChild(xmlDoc.createTextNode(this.d_maxEqIt.toString()));
        ice.appendChild(maxit);

        let algo = this.d_iceAlgoItemsUPS[this.d_iceAlgoIndex];
        let solAlgo = xmlDoc.createElement("solution");
        solAlgo.setAttribute("technique", algo);
        ice.appendChild(solAlgo);

        algo = this.d_advectAlgoItemsUPS[this.d_advectAlgoIndex];
        let advectAlgo = xmlDoc.createElement("advection");
        advectAlgo.setAttribute("type", algo);
        let compatFlux = xmlDoc.createElement("useCompatiblefluxes");
        compatFlux.appendChild(xmlDoc.createTextNode(this.d_compatFlux.toString()));
        advectAlgo.appendChild(compatFlux);
        ice.appendChild(advectAlgo);

        let clamp = xmlDoc.createElement("ClampSpecificVolume");
        clamp.appendChild(xmlDoc.createTextNode(this.d_clampSpVol.toString()));
        ice.appendChild(clamp);

        if (this.d_addHeat) {
          let addHeat = xmlDoc.createElement("ADD_HEAT");
          let addHeatT0 = xmlDoc.createElement("add_heat_t_start");
          addHeatT0.appendChild(xmlDoc.createTextNode(this.d_addHeatStartTime.toString()));
          addHeat.appendChild(addHeatT0);
          let addHeatT1 = xmlDoc.createElement("add_heat_t_final");
          addHeatT1.appendChild(xmlDoc.createTextNode(this.d_addHeatEndTime.toString()));
          addHeat.appendChild(addHeatT1);
          let addHeatMats = xmlDoc.createElement("add_heat_matls");
          /* **TODO** Add the materials */
          addHeat.appendChild(addHeatMats);
          let addHeatCoeffs = xmlDoc.createElement("add_heat_coeff");
          /* **TODO** Add the coefficients */
          addHeat.appendChild(addHeatCoeffs);
          ice.appendChild(addHeat);
        }

        cfd.appendChild(ice);
        xmlDoc.appendChild(cfd);
        var formatter = new vkbeautify();
        var xmlText = formatter.xml(new XMLSerializer().serializeToString(xmlDoc));

        console.log(xmlText);

        var blob = new Blob([xmlText], {type: "text/plain;charset=utf-8"});
        var a = document.createElement("a");
        var url = URL.createObjectURL(blob);
        a.href = url;
        a.download = "test.ups";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
      }

    }
  }
);

exports.default = ICEInputPanel;
