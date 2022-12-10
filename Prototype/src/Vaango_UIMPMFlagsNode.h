#ifndef __Vaango_UI_MPM_FLAGS_NODE_H__
#define __Vaango_UI_MPM_FLAGS_NODE_H__

#include <Vaango_UIData.h>
#include <Vaango_UIUtils.h>

#include <imgui.h>
#include <imnodes.h>
#include <json.hpp>

#include <iostream>
#include <fstream>
#include <filesystem>

using json = nlohmann::json;

namespace VaangoUI {

class Vaango_UIMPMFlagsNode
{
private:

  bool d_show = false;

public:

  Vaango_UIMPMFlagsNode() = default;

  ~Vaango_UIMPMFlagsNode() = default;

public:

  void draw(int id)
  {
    ImNodes::BeginNode(id);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("MPM settings");
    ImNodes::EndNodeTitleBar();

    ImGui::PushItemWidth(100);

    const char* dimen[] = {"Plane stress", "Plane stress", "Axisymmetric", "3D"};
    static int dim = 3;
    ImGui::Combo("Problem type", &dim, dimen, IM_ARRAYSIZE(dimen));
    s_mpmFlags.simulationDim = static_cast<Dimensionality>(dim);

    const char* interpolation[] = {"Linear", "GIMP", "CPDI", "CPTI"};
    static int type = 0;
    ImGui::Combo("Interpolation type", &type, interpolation,
                 IM_ARRAYSIZE(interpolation));
    s_mpmFlags.interpolatorType = static_cast<MPMInterpolation>(type);
    if (s_mpmFlags.interpolatorType == MPMInterpolation::CPDI) {
      ImGui::InputFloat("Critical length", &s_mpmFlags.cpdiLcrit, 0.0f, 0.0f, "%.3f"); 
    }

    const char* defgrad[] = {"First order", "Subcycling", "Taylor series"};
    static int def = 2;
    ImGui::Combo("Deformation gradient algorithm", &def, defgrad,
                 IM_ARRAYSIZE(defgrad));
    s_mpmFlags.defGradAlgorithm = static_cast<DeformationGradient>(def);
    if (s_mpmFlags.defGradAlgorithm == DeformationGradient::TAYLOR_SERIES) {
      ImGui::InputInt("Number of series terms", &s_mpmFlags.numTermsSeriesDefGrad); 
    }

    static bool showAdvancedSettings = false;
    static bool showGeneralSettings = false;
    static bool showBCSettings = false;
    static bool showDampingSettings = false;
    static bool showContactSettings = false;
    static bool showRotationSettings = false;
    static bool showDeformationSettings = false;
    static bool showMMSSettings = false;
    static bool showAMRSettings = false;
    static bool showAdditionSettings = false;
    static bool showDeletionSettings = false;
    static bool showThermalSettings = false;
    static bool showDiffusionSettings = false;
    ImGui::Checkbox("Advanced settings ...", &showAdvancedSettings);
    if (showAdvancedSettings) {
      ImGui::Indent(20);
      ImGui::Checkbox("General settings ...", &showGeneralSettings);
      if (showGeneralSettings) {
        generalSettings();
      }
      ImGui::Checkbox("Boundary condition flags ...", &showBCSettings);
      if (showBCSettings) {
        bcSettings();
      }
      ImGui::Checkbox("Damping flags ...", &showDampingSettings);
      if (showDampingSettings) {
        dampingSettings();
      }
      ImGui::Checkbox("Contact flags ...", &showContactSettings);
      if (showContactSettings) {
        contactSettings();
      }
      ImGui::Checkbox("Rotating coordinates ...", &showRotationSettings);
      if (showRotationSettings) {
        rotationSettings();
      }
      ImGui::Checkbox("Prescribed deformation ...", &showDeformationSettings);
      if (showDeformationSettings) {
        deformationSettings();
      }
      ImGui::Checkbox("Manufactured solutions ...", &showMMSSettings);
      if (showMMSSettings) {
        mmsSettings();
      }
      ImGui::Checkbox("Adaptive mesh refinement ...", &showAMRSettings);
      if (showAMRSettings) {
        amrSettings();
      }
      ImGui::Checkbox("Particle deletion ...", &showDeletionSettings);
      if (showDeletionSettings) {
        deletionSettings();
      }
      ImGui::Checkbox("Particle addition ...", &showAdditionSettings);
      if (showAdditionSettings) {
        additionSettings();
      }
      ImGui::Checkbox("Thermal settings ...", &showThermalSettings);
      if (showThermalSettings) {
        thermalSettings();
      }
      ImGui::Checkbox("Scalar diffusion ...", &showDiffusionSettings);
      if (showDiffusionSettings) {
        diffusionSettings();
      }
    }

    ImGui::PopItemWidth();

    ImNodes::BeginOutputAttribute(id+1);
    ImGui::Indent(200);
    ImGui::Text("Integration");
    ImGui::Unindent();
    ImNodes::EndOutputAttribute();

    ImNodes::EndNode();
  }

  void generalSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Solid-fluid coupling", &s_mpmFlags.withICE);
    ImGui::Checkbox("Pressure stabilization", &s_mpmFlags.doPressureStabilization);
    ImGui::Checkbox("Fracture", &s_mpmFlags.fracture);
    ImGui::Checkbox("Cohesive zones", &s_mpmFlags.useCohesiveZones);
    ImGui::Checkbox("Add color flags", &s_mpmFlags.withColor);
    ImGui::Checkbox("Scale deformation", &s_mpmFlags.computeScaleFactor);
    ImGui::Checkbox("Reset grid", &s_mpmFlags.doGridReset);
    ImGui::InputFloat("Minimum mass allowed", &s_mpmFlags.minMassForAcceleration, 0.0f, 0.0f, "%.2e");
    ImGui::Unindent();
  }

  void bcSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Load curves", &s_mpmFlags.useLoadCurves);
    ImGui::Checkbox("CBDI", &s_mpmFlags.useCBDI);
    ImGui::InputFloat("Force BC increment factor", &s_mpmFlags.forceIncrementFactor);
    ImGui::Unindent();
  }

  void dampingSettings() {
    ImGui::Indent(20);
    ImGui::InputFloat("Damping Coefficient", &s_mpmFlags.artificialDampCoeff);
    ImGui::Checkbox("Artificial viscosity?", &s_mpmFlags.artificialViscosity);
    if (s_mpmFlags.artificialViscosity) {
      ImGui::Indent(20);
      ImGui::Checkbox("Viscous heating?", &s_mpmFlags.artificialViscosityHeating);
      ImGui::InputFloat("Coefficient 1", &s_mpmFlags.artificialViscCoeff1);
      ImGui::InputFloat("Coefficient 2", &s_mpmFlags.artificialViscCoeff2);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void contactSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Friction?", &s_mpmFlags.doContactFriction);
    ImGui::Checkbox("Collinear normals?", &s_mpmFlags.computeCollinearNormals);
    ImGui::Checkbox("Add friction work?", &s_mpmFlags.addFrictionWork);
    ImGui::Unindent();
  }

  void rotationSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Initialize stress from body force", &s_mpmFlags.initializeStressFromBodyForce);
    ImGui::Checkbox("Rotation?", &s_mpmFlags.useCoordRotation);
    if (s_mpmFlags.useCoordRotation) {
      ImGui::Indent(20);
      ImGui::InputFloat("Angular velocity (rad/s)", &s_mpmFlags.coordRotationSpeed);
      ImGui::InputFloat3("Rotation center", s_mpmFlags.coordRotationCenter);
      ImGui::InputFloat3("Rotation body reference point", s_mpmFlags.coordRotationBodyRefPoint);
      ImGui::InputFloat3("Rotation axis", s_mpmFlags.coordRotationAxis);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void deformationSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Prescribed deformation?", &s_mpmFlags.prescribeDeformation);
    if (s_mpmFlags.prescribeDeformation) {
      ImGui::Indent(20);
      ImGui::Checkbox("Use exact deformation", &s_mpmFlags.exactDeformation);
      ImGui::InputText("Deformation file", &s_mpmFlags.prescribedDeformationFile[0], 64);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void mmsSettings() {
    ImGui::Indent(20);
    const char* mms[] = {"None", "Axis aligned", "Generalized vortex",
                         "Expanding ring", "Axis aligned 3L"};
    static int manuf = 0;
    ImGui::Combo("##Solution", &manuf, mms,
                 IM_ARRAYSIZE(mms));
    s_mpmFlags.mmsType = static_cast<MMSType>(manuf);
    ImGui::Unindent();
  }

  void amrSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("AMR?", &s_mpmFlags.AMR);
    if (s_mpmFlags.AMR) {
      ImGui::Indent(20);
      ImGui::Checkbox("Velocity projection?", &s_mpmFlags.GEVelProj);
      ImGui::Checkbox("refine particles?", &s_mpmFlags.refineParticles);
      ImGui::InputInt("Minimum grid level", &s_mpmFlags.minGridLevel);
      ImGui::InputInt("Maximum grid level", &s_mpmFlags.maxGridLevel);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void deletionSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Delete rogue particles?", &s_mpmFlags.deleteRogueParticles);
    if (s_mpmFlags.deleteRogueParticles) {
      ImGui::Indent(20);
      ImGui::InputFloat("Max. velocity", &s_mpmFlags.maxVel, 0.0f, 0.0f, "%0.2e");
      ImGui::InputFloat("Min. mass", &s_mpmFlags.minPartMass, 0.0f, 0.0f, "%0.2e");
      ImGui::Unindent();
    }
    ImGui::Checkbox("Erode particles?", &s_mpmFlags.doErosion);
    if (s_mpmFlags.doErosion) {
      ImGui::Indent(20);
      const char* erode[] = {"None", "Brittle damage", "Allow no tension",
                             "Allow no shear", "Zero stress"};
      static int erosion = 0;
      ImGui::Combo("Algorithm", &erosion, erode, IM_ARRAYSIZE(erode));
      s_mpmFlags.erosionAlgorithm = static_cast<ErosionAlgorithm>(erosion);
      ImGui::Checkbox("Create new particles?", &s_mpmFlags.createNewParticles);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void additionSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Allow adding materials?", &s_mpmFlags.canAddMPMMaterial);
    ImGui::Checkbox("Add material?", &s_mpmFlags.addNewMaterial);
    ImGui::Checkbox("Insert particles?", &s_mpmFlags.insertParticles);
    if (s_mpmFlags.insertParticles) {
      ImGui::Indent(20);
      ImGui::InputText("Particle file", &s_mpmFlags.insertParticlesFile[0], 64);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void thermalSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Thermal expansion?", &s_mpmFlags.doThermalExpansion);
    const char* conduct[] = {"None", "Explicit", "Implicit", "Transient implicit"};
    static int conduction = 0;
    ImGui::Combo("Thermal conduction", &conduction, conduct,
                 IM_ARRAYSIZE(conduct));
    switch (conduction) {
      case static_cast<int>(ThermalConduction::NONE):
        s_mpmFlags.doExplicitHeatConduction = false;
        s_mpmFlags.doImplicitHeatConduction = false;
        s_mpmFlags.doTransientImplicitHeatConduction = false;
        break;
      case static_cast<int>(ThermalConduction::EXPLICIT):
        s_mpmFlags.doExplicitHeatConduction = true;
        s_mpmFlags.doImplicitHeatConduction = false;
        s_mpmFlags.doTransientImplicitHeatConduction = false;
        break;
      case static_cast<int>(ThermalConduction::IMPLICIT):
        s_mpmFlags.doExplicitHeatConduction = false;
        s_mpmFlags.doImplicitHeatConduction = true;
        s_mpmFlags.doTransientImplicitHeatConduction = false;
        break;
      case static_cast<int>(ThermalConduction::TRANSIENT_IMPLICIT):
        s_mpmFlags.doExplicitHeatConduction = false;
        s_mpmFlags.doImplicitHeatConduction = false;
        s_mpmFlags.doTransientImplicitHeatConduction = true;
        break;
      default:
        break;
    }

    if (s_mpmFlags.doImplicitHeatConduction || 
        s_mpmFlags.doTransientImplicitHeatConduction) {
      ImGui::Indent(20);
      ImGui::InputInt("Extra PetSc solver flushes", &s_mpmFlags.extraSolverFlushes);
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void diffusionSettings() {
    ImGui::Indent(20);
    ImGui::Checkbox("Scalar diffusion?", &s_mpmFlags.doScalarDiffusion);
    ImGui::Unindent();
  }

  void saveToJSON(bool& save) const {
  }

  void saveToXML(bool& save) const {
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_MPM_FLAGS_NODE_H__