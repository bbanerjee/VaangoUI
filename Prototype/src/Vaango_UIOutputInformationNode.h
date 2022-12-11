#ifndef __Vaango_UI_OUTPUT_INFORMATION_NODE_H__
#define __Vaango_UI_OUTPUT_INFORMATION_NODE_H__

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

class Vaango_UIOutputInformationNode
{
private:

  bool d_show = false;

public:

  Vaango_UIOutputInformationNode() = default;

  ~Vaango_UIOutputInformationNode() = default;

public:

  void draw(int id)
  {
    ImNodes::BeginNode(id);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("Output information");
    ImNodes::EndNodeTitleBar();

    ImNodes::BeginInputAttribute(id+1);
    ImGui::Text("Integration");
    ImGui::Unindent();
    ImNodes::EndInputAttribute();

    ImGui::PushItemWidth(100);
    ImGui::InputText("Output UDA file", &s_output.outputUDAFile[0], 64);
    ImGui::InputFloat("Output time interval (s)", &s_output.timeInterval, 0.0f, 0.0f, "%.2e"); 
    ImGui::InputInt("Output timestep interval", &s_output.timestepInterval); 
    ImGui::InputInt("Checkpoint cycle", &s_output.checkpointCycle); 
    ImGui::InputFloat("Checkpoint time interval (s)", &s_output.checkpointTimeInterval, 0.0f, 0.0f, "%.2e");
    ImGui::InputInt("Checkpoint timestep interval", &s_output.checkpointTimestepInterval); 

    static bool showSummedVariables = false;
    static bool showMPMPVariables = false;
    static bool showMPMGVariables = false;
    static bool showCCVariables = false;
    ImGui::Text("Variables to save");
    ImGui::Indent(20);
    ImGui::Checkbox("Summed variables", &showSummedVariables);
    if (showSummedVariables) {
      selectSummedVars();
    }
    ImGui::Checkbox("MPM particle variables", &showMPMPVariables);
    if (showMPMPVariables) {
      selectParticleVars();
    }
    ImGui::Checkbox("MPM grid variables", &showMPMGVariables);
    if (showMPMGVariables) {
      selectGridVars();
    }
    ImGui::Checkbox("ICE cell-centered variables", &showCCVariables);
    if (showCCVariables) {
      selectCellCenteredVars();
    }
    ImGui::Unindent();
    ImGui::PopItemWidth();

    // Variables that can be output will depend on chosen components

    ImNodes::EndNode();
  }

  void selectSummedVars() {
    ImGui::PushItemWidth(200);
    if (ImGui::BeginListBox("##Summed variables")) {
      if (ImGui::Selectable("Kinetic energy", &s_output.summed.kineticEnergy)) {
        if (!ImGui::GetIO().KeyCtrl) {
          s_output.summed.kineticEnergy ^= 1;
        }
      }
      if (ImGui::Selectable("Total strain energy", &s_output.summed.totalStrainEnergy)) {
        if (!ImGui::GetIO().KeyCtrl) {
          s_output.summed.totalStrainEnergy ^= 1;
        }
      }
      if (ImGui::Selectable("Accumulated strain energy", &s_output.summed.accStrainEnergy)) {
        if (!ImGui::GetIO().KeyCtrl) {
          s_output.summed.accStrainEnergy ^= 1;
        }
      }
      if (ImGui::Selectable("Momentum", &s_output.summed.momentum)) {
        if (!ImGui::GetIO().KeyCtrl) {
          s_output.summed.momentum ^= 1;
        }
      }
      if (ImGui::Selectable("Total mass", &s_output.summed.totalMass)) {
        if (!ImGui::GetIO().KeyCtrl) {
          s_output.summed.totalMass ^= 1;
        }
      }
      if (ImGui::Selectable("Center of mass", &s_output.summed.centerOfMass)) {
        if (!ImGui::GetIO().KeyCtrl) {
          s_output.summed.centerOfMass ^= 1;
        }
      }
      ImGui::EndListBox();
    }
    ImGui::PopItemWidth();
  }

  void selectParticleVars() {
    const char* items[] = {"Particle ID", "Position", "Mass", "Volume",
                           "Temperature", "Deformation gradient",
                           "Displacement", "velocity", "Stress",
                           "External force", "Strain rate", "Failed flag",
                           "Damage", "Porosity", "Plastic strain", 
                           "Plastic strain rate"};
    bool selected[] = {s_output.p.particleID, s_output.p.position,
                       s_output.p.mass, s_output.p.volume,
                       s_output.p.temperature, s_output.p.deformationGradient,
                       s_output.p.displacement, s_output.p.velocity,
                       s_output.p.stress, s_output.p.externalForce,
                       s_output.p.strainRate, s_output.p.localized,
                       s_output.p.damage, s_output.p.porosity,
                       s_output.p.plasticStrain, s_output.p.plasticStrainRate};
    ImGui::PushItemWidth(200);
    if (ImGui::BeginListBox("##Particle variables")) {
      for (int n = 0; n < IM_ARRAYSIZE(items); n++) {
        if (ImGui::Selectable(items[n], &selected[n])) {
          if (!ImGui::GetIO().KeyCtrl) {
            selected[n] ^= 1;
          }
        }
      }
      ImGui::EndListBox();
    }
    ImGui::PopItemWidth();

    int n = 0;
    s_output.p.particleID = selected[n++];
    s_output.p.position = selected[n++];
    s_output.p.mass = selected[n++];
    s_output.p.volume = selected[n++];
    s_output.p.temperature = selected[n++];
    s_output.p.deformationGradient = selected[n++];
    s_output.p.displacement = selected[n++];
    s_output.p.velocity = selected[n++];
    s_output.p.stress = selected[n++];
    s_output.p.externalForce = selected[n++];
    s_output.p.strainRate = selected[n++];
    s_output.p.localized = selected[n++];
    s_output.p.damage = selected[n++];
    s_output.p.porosity = selected[n++];
    s_output.p.plasticStrain = selected[n++];
    s_output.p.plasticStrainRate = selected[n++];
  }

  void selectGridVars() {
    const char* items[] = {"Mass", "Volume", "Velocity", "Stress",
                           "Acceleration"};
    bool selected[] = {s_output.g.mass, s_output.g.volume, s_output.g.velocity,
                       s_output.g.stress, s_output.g.acceleration};
    ImGui::PushItemWidth(200);
    if (ImGui::BeginListBox("##Grid variables")) {
      for (int n = 0; n < IM_ARRAYSIZE(items); n++) {
        if (ImGui::Selectable(items[n], &selected[n])) {
          if (!ImGui::GetIO().KeyCtrl) {
            selected[n] ^= 1;
          }
        }
      }
      ImGui::EndListBox();
    }
    ImGui::PopItemWidth();

    int n = 0;
    s_output.g.mass = selected[n++];
    s_output.g.volume = selected[n++];
    s_output.g.velocity = selected[n++];
    s_output.g.stress = selected[n++];
    s_output.g.acceleration = selected[n++];
  }

  void selectCellCenteredVars() {
    const char* items[] = {"Density", "Temperature", "Velocity", 
                           "Specific volume", "Volume fraction", "Pressure", 
                           "Equilibration pressure", "Lagrangian internal energy", 
                           "Internal energy source", "Temperature rate",
                           "Lagrangian momentum", "Momentum source", 
                           "Dilatation pressure increment"}; 
    bool selected[] = {s_output.cc.density, s_output.cc.temperature,
                       s_output.cc.velocity, s_output.cc.spVolume,
                       s_output.cc.volFrac, s_output.cc.pressure,
                       s_output.cc.equilPressure, s_output.cc.intEnergyL,
                       s_output.cc.intEnergySource, s_output.cc.Tdot,
                       s_output.cc.momentumL, s_output.cc.momentumSource,
                       s_output.cc.delPDilatate};

    ImGui::PushItemWidth(200);
    if (ImGui::BeginListBox("##Cell-centered variables")) {
      for (int n = 0; n < IM_ARRAYSIZE(items); n++) {
        if (ImGui::Selectable(items[n], &selected[n])) {
          if (!ImGui::GetIO().KeyCtrl) {
            selected[n] ^= 1;
          }
        }
      }
      ImGui::EndListBox();
    }
    ImGui::PopItemWidth();

    int n = 0;
    s_output.cc.density = selected[n++];
    s_output.cc.temperature = selected[n++];
    s_output.cc.velocity = selected[n++];
    s_output.cc.spVolume = selected[n++];
    s_output.cc.volFrac = selected[n++];
    s_output.cc.pressure = selected[n++];
    s_output.cc.equilPressure = selected[n++];
    s_output.cc.intEnergyL = selected[n++];
    s_output.cc.intEnergySource = selected[n++];
    s_output.cc.Tdot = selected[n++];
    s_output.cc.momentumL = selected[n++];
    s_output.cc.momentumSource = selected[n++];
    s_output.cc.delPDilatate = selected[n++];
  }

  void saveToJSON(bool& save) const {
  }

  void saveToXML(bool& save) const {
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_OUTPUT_INFORMATION_NODE_H__