#ifndef __Vaango_UI_TIME_INTEGRATION_NODE_H__
#define __Vaango_UI_TIME_INTEGRATION_NODE_H__

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

class Vaango_UITimeIntegrationNode
{
private:

  bool d_show = false;

public:

  Vaango_UITimeIntegrationNode() = default;

  ~Vaango_UITimeIntegrationNode() = default;

public:

  void draw(int id)
  {
    ImNodes::BeginNode(id);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("Time integration");
    ImNodes::EndNodeTitleBar();

    ImGui::PushItemWidth(100);

    ImGui::InputFloat("Start time (s)", &s_integration.startTime, 0.0f, 0.0f, "%.2e"); 
    ImGui::InputFloat("End time (s)", &s_integration.endTime, 0.0f, 0.0f, "%.2e"); 

    const char* integrationTypes[] = {"Explicit", "Implicit", "Symplectic"};
    static int type = 0;
    ImGui::Combo("Integration type", &type, integrationTypes,
                 IM_ARRAYSIZE(integrationTypes));
    s_integration.integrationType = static_cast<IntegrationType>(type);

    if (type == 0) {
      ImGui::Indent(20);
      ImGui::InputFloat("Timestep multiplier", &s_integration.multiplier);
      ImGui::Unindent();
    } else if (type == 1) {
      ImGui::Indent(20);

      const char* dynamicsTypes[] = {"Quasistatic", "Dynamic", "Transient"};
      static int dyna = 0;
      ImGui::Combo("Dynamics type", &dyna, dynamicsTypes,
                   IM_ARRAYSIZE(dynamicsTypes));
      s_integration.dynamicsType = static_cast<DynamicsType>(dyna);

      const char* solverTypes[] = {"Simple", "PetSc", "Hypre"};
      static int solver = 0;
      ImGui::Combo("Solver type", &solver, solverTypes,
                   IM_ARRAYSIZE(solverTypes));
      s_integration.solverType = static_cast<ImplicitSolverType>(solver);

      ImGui::Text("Convergence Tolerance");
        ImGui::Indent(20);
        ImGui::InputFloat("Displacement norm", &s_integration.dispTolerance, 0.0f, 0.0f, "%.2e");
        ImGui::InputFloat("Energy norm", &s_integration.energyTolerance, 0.0f, 0.0f, "%.2e");
        ImGui::Unindent();
      ImGui::Text("Timestep decrease");
        ImGui::Indent(20);
        ImGui::InputInt("Max iterations before", &s_integration.maxIterBeforeTimestepDecrease);
        ImGui::InputFloat("Decrease factor", &s_integration.timestepDecreaseFactor);
        ImGui::Unindent();
      ImGui::Text("Timestep increase");
        ImGui::Indent(20);
        ImGui::InputInt("Max iterations before", &s_integration.minIterBeforeTimestepIncrease);
        ImGui::InputFloat("Increase factor", &s_integration.timestepIncreaseFactor);
        ImGui::Unindent();
      ImGui::Text("Timestep restart");
        ImGui::Indent(20);
        ImGui::InputInt("Max iterations before", &s_integration.maxIterBeforeTimestepRestart);
        ImGui::Unindent();
      ImGui::Unindent();
    }

    static bool showMoreSettings = false;
    ImGui::Checkbox("More ...", &showMoreSettings);
    if (showMoreSettings) {
      ImGui::Indent(20);
      ImGui::InputInt("Maximum timesteps", &s_integration.maxTimesteps); 
      ImGui::InputFloat("Initial timestep size (s)", &s_integration.initialTimestep, 0.0f, 0.0f, "%.2e");
      ImGui::InputFloat("Minimum timestep size (s)", &s_integration.minTimestep, 0.0f, 0.0f, "%.2e");
      ImGui::InputFloat("Maximum timestep size (s)", &s_integration.maxTimestep, 0.0f, 0.0f, "%.2e");
      ImGui::InputFloat("Maximum timestep increase factor", &s_integration.maxIncreaseFactor, 0.0f, 0.0f, "%.2e");
      ImGui::Unindent();
    }

    ImGui::PopItemWidth();

    ImNodes::BeginOutputAttribute(id+1);
    ImGui::Indent(200);
    ImGui::Text("Output");
    ImGui::Unindent();
    ImNodes::EndOutputAttribute();

    ImNodes::EndNode();
  }

  void saveToJSON(bool& save) const {
  }

  void saveToXML(bool& save) const {
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_TIME_INTEGRATION_NODE_H__