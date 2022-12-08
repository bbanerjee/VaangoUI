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
    ImGui::Text("Time integration");
    ImNodes::EndNodeTitleBar();

    ImGui::PushItemWidth(100);
    const char* integrationTypes[] = {"Explicit", "Implicit", "Symplectic"};
    static int type = 0;
    ImGui::Combo("Integration type", &type, integrationTypes,
                 IM_ARRAYSIZE(integrationTypes));
    s_integration.integrationType = static_cast<IntegrationType>(type);
    ImGui::InputFloat("Start time (s)", &s_integration.startTime, 0.0f, 0.0f, "%.2e"); 
    ImGui::InputFloat("End time (s)", &s_integration.endTime, 0.0f, 0.0f, "%.2e"); 
    ImGui::InputInt("Maximum timesteps", &s_integration.maxTimesteps); 
    ImGui::InputFloat("Initial timestep size (s)", &s_integration.initialTimestep, 0.0f, 0.0f, "%.2e");
    ImGui::InputFloat("Minimum timestep size (s)", &s_integration.minTimestep, 0.0f, 0.0f, "%.2e");
    ImGui::InputFloat("Maximum timestep size (s)", &s_integration.maxTimestep, 0.0f, 0.0f, "%.2e");
    ImGui::InputFloat("Maximum timestep increase factor", &s_integration.maxIncreaseFactor, 0.0f, 0.0f, "%.2e");
    ImGui::InputFloat("Timestep multiplier", &s_integration.multiplier, 0.0f, 0.0f, "%.2e");
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

#endif //__Vaango_UI_MPM_FLAGS_NODE_H__