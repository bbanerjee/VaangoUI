#ifndef __Vaango_UI_ICE_FLAGS_NODE_H__
#define __Vaango_UI_ICE_FLAGS_NODE_H__

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

class Vaango_UIICEFlagsNode
{
private:

  bool d_show = false;

public:

  Vaango_UIICEFlagsNode() = default;

  ~Vaango_UIICEFlagsNode() = default;

public:

  void draw(int id)
  {
    ImNodes::BeginNode(id);

    ImNodes::BeginNodeTitleBar();
    ImGui::Text("ICE settings");
    ImNodes::EndNodeTitleBar();

    ImGui::PushItemWidth(100);

    const char* algo[] = {"Total form", "Rate form"};
    static int algorithm = 0;
    ImGui::Combo("Algorithm", &algorithm, algo, IM_ARRAYSIZE(algo));
    s_iceFlags.algorithm = static_cast<ICEAlgorithm>(algorithm);

    const char* advect[] = {"First order", "Second order"};
    static int advection = 1;
    ImGui::Combo("Advection", &advection, advect,
                 IM_ARRAYSIZE(advect));
    s_iceFlags.advection = static_cast<ICEAdvectionAlgorithm>(advection);

    ImGui::Checkbox("Compatible fluxes?", &s_iceFlags.doCompatibleFluxes);
    ImGui::Checkbox("Clamp specific volume?", &s_iceFlags.clampSpecificVolume);

    static bool showAdvancedSettings = false;
    static bool showHeatAddition = false;

    ImGui::Checkbox("Advanced settings ...", &showAdvancedSettings);
    if (showAdvancedSettings) {
      advancedSettings();
    }
    ImGui::Checkbox("Heat addition?", &s_iceFlags.doHeatAddition);
    if (s_iceFlags.doHeatAddition) {
      heatAddition();
    }

    ImGui::PopItemWidth();

    ImNodes::BeginOutputAttribute(id+1);
    ImGui::Indent(200);
    ImGui::Text("Integration");
    ImGui::Unindent();
    ImNodes::EndOutputAttribute();

    ImNodes::EndNode();
  }

  void advancedSettings() {
    ImGui::Indent(20);
    ImGui::InputFloat("CFL number", &s_iceFlags.cflNumber);
    ImGui::InputInt("Max. equilibrium iterations", &s_iceFlags.maxEquilibriumIters);
    ImGui::InputInt("Min. grid level", &s_iceFlags.minGridLevel);
    ImGui::InputInt("Max. grid level", &s_iceFlags.maxGridLevel);
    ImGui::Unindent();
  }

  void heatAddition() {
    ImGui::Indent(20);
    ImGui::InputFloat("Heat addition start time", &s_iceFlags.addHeatStartTime);
    ImGui::InputFloat("Heat addition end time", &s_iceFlags.addHeatEndTime);
    ImGui::InputInt("Number of heated materials", &s_iceFlags.numberOfAddHeatMaterials);
    if (s_iceFlags.numberOfAddHeatMaterials > 0) {
      ImGui::Indent(20);
      s_iceFlags.addHeatMaterial.reserve(s_iceFlags.numberOfAddHeatMaterials);
      if (ImGui::BeginTable("##HeatAdd", 2,
                            ImGuiTableFlags_SizingFixedFit | ImGuiTableFlags_Resizable | 
                            ImGuiTableFlags_BordersOuter | ImGuiTableFlags_BordersV |
                            ImGuiTableFlags_NoHostExtendX)) {
        ImGui::TableSetupColumn("Material ID");
        ImGui::TableSetupColumn("Heat energy coefficient");
        ImGui::TableHeadersRow();
        for (int i = 0; i < s_iceFlags.numberOfAddHeatMaterials; i++) {
          ImGui::TableNextRow();
          int materialID = 0;
          float coeff = 8.0e10;
          ImGui::TableNextColumn();
          char buf[64];
          sprintf(buf, "##Material ID %d", i);
          ImGui::InputInt(buf, &materialID);
          ImGui::TableNextColumn();
          sprintf(buf, "##Heat energy coeff %d", i);
          ImGui::InputFloat(buf, &coeff, 0.0f, 0.0f, "%.2e");
          s_iceFlags.addHeatMaterial[i] = std::make_pair(materialID, coeff);
        }
        ImGui::EndTable();
      }
      ImGui::Unindent();
    }
    ImGui::Unindent();
  }

  void saveToJSON(bool& save) const {
  }

  void saveToXML(bool& save) const {
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_ICE_FLAGS_NODE_H__