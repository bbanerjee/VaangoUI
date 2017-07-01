const Vue = require("vue");
const vkbeautify = require("vkbeautify");

let MPMInputPanel = Vue.extend(
  {
    name: 'mpm-input-panel',

    data() {
      return {
        id : "MPMInputPanel",
        sidebarTabIndex : 0,

        // These are the names that are displayed in the UI
        d_dimensionLabels : [
          "3D",
          "2D Axisymmetric"
        ],
        d_dimension: 0,

        d_integrationTypeLabels : [
          "Explicit",
          "Explicit: Fracture",
          "Implicit"
        ],
        d_integrationTypeStrings : [
          "explicit",
          "fracture",
          "implicit"
        ],
        d_integration: "Explicit",

        interpolationType : "gimp",

        mpmFlags : ["test"],

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
        console.log("dim = " + this.d_dimension);
        console.log("int = " + this.d_integration);
        console.log("MPM Flags = " + this.mpmFlags);

        let xmlDoc = document.implementation.createDocument("", "", null);

        let mpmElement = xmlDoc.createElement("MPM");

        /*
        let d_integrator = integrationType;
        let flag = xmlDoc.createElement("time_integrator");
        flag.appendChild(xmlDoc.createTextNode(d_integrator));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("interpolator");
        flag.appendChild(xmlDoc.createTextNode(d_mpmAlgo));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("minimum_particle_mass");
        flag.appendChild(xmlDoc.createTextNode(d_minMass));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("maximum_particle_velocity");
        flag.appendChild(xmlDoc.createTextNode(d_maxVel));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("do_grid_reset");
        flag.appendChild(xmlDoc.createTextNode(d_gridReset));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("use_load_curves");
        flag.appendChild(xmlDoc.createTextNode(d_loadCurve));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("do_contact_friction_heating");
        flag.appendChild(xmlDoc.createTextNode(d_fricHeat));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("artificial_damping_coeff");
        flag.appendChild(xmlDoc.createTextNode(d_damping));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("artificial_viscosity");
        flag.appendChild(xmlDoc.createTextNode(d_viscosity));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("artificial_viscosity_coeff1");
        flag.appendChild(xmlDoc.createTextNode(d_viscCoefC1));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("artificial_viscosity_coeff2");
        flag.appendChild(xmlDoc.createTextNode(d_viscCoefC2));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("erosion");
        flag = xmlDoc.createAttribute("algorithm");
        flag.appendChild(xmlDoc.createTextNode(d_failAlgo));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("create_new_particles");
        flag.appendChild(xmlDoc.createTextNode(d_convert));
        mpmElement.appendChild(flag);

                    if(this.__parent.d_integrator === "implicit") {
        flag = xmlDoc.createElement("dynamic");
        flag.appendChild(xmlDoc.createTextNode(d_impDynamic));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("solver");
        flag.appendChild(xmlDoc.createTextNode(d_solver));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("DoImplicitHeatConduction");
        flag.appendChild(xmlDoc.createTextNode(d_impHeat));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("convergence_criteria_disp");
        flag.appendChild(xmlDoc.createTextNode(d_convDisp));
        flag.appendChild(xmlDoc.createTextNode())

        flag = xmlDoc.createElement("convergence_criteria_energy");
        flag.appendChild(xmlDoc.createTextNode(d_convEnergy));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("num_iters_to_decrease_delT");
        flag.appendChild(xmlDoc.createTextNode(d_maxItersDecDelt));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("delT_decrease_factor");
        flag.appendChild(xmlDoc.createTextNode(d_deltDecFac));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("num_iters_to_increase_delT");
        flag.appendChild(xmlDoc.createTextNode(d_maxItersIncDelt));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("delT_increase_factor");
        flag.appendChild(xmlDoc.createTextNode(d_delTInFac));
        mpmElement.appendChild(flag);

        flag = xmlDoc.createElement("iters_before_timestep_restart");
        flag.appendChild(xmlDoc.createTextNode(d_maxItersRestart));
        mpmElement.appendChild(flag);
                    }
                    */
        var artVisc = xmlDoc.createElement("artificial_viscosity");
        var artViscVal = xmlDoc.createTextNode(this.artViscC1.toString());
        artVisc.appendChild(artViscVal);
        console.log("art visc = " + this.artViscC1 + "," + artVisc.nodeValue);
        mpmElement.appendChild(artVisc);

        xmlDoc.appendChild(mpmElement);
        var formatter = new vkbeautify();
        var xmlText = formatter.xml(new XMLSerializer().serializeToString(xmlDoc));

        console.log(xmlText);
      }

    }
  }
);

exports.default = MPMInputPanel;
