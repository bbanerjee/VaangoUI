#ifndef __Vaango_UI_PHYSICAL_CONSTANTS_NODE_H__
#define __Vaango_UI_PHYSICAL_CONSTANTS_NODE_H__

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

class Vaango_UIPhysicalConstantsNode
{
private:

  bool d_show = false;

public:

  Vaango_UIPhysicalConstantsNode() = default;

  ~Vaango_UIPhysicalConstantsNode() = default;

public:

  void draw(int id)
  {
    ImNodes::BeginNode(id);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("Physical constants");
    ImNodes::EndNodeTitleBar();

    ImGui::PushItemWidth(200);
    ImGui::InputFloat("Reference pressure (Pa)", &s_physicalConstants.refPressure); 
    ImGui::InputFloat3("Gravity (m/s2)", s_physicalConstants.gravity); 
    ImGui::PopItemWidth();

    ImNodes::BeginOutputAttribute(id+1);
    ImGui::Indent(300);
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

#endif //__Vaango_UI_PHYSICAL_CONSTANTS_NODE_H__