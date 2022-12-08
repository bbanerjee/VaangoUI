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

  void draw()
  {
    ImNodes::BeginNode(1);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("Output information");
    ImNodes::EndNodeTitleBar();

    ImNodes::BeginInputAttribute(2);
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
    ImGui::PopItemWidth();

    // Variables that can be output will depend on chosen components

    ImNodes::EndNode();
  }

  void saveToJSON(bool& save) const {
  }

  void saveToXML(bool& save) const {
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_OUTPUT_INFORMATION_NODE_H__