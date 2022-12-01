#ifndef __Vaango_UI_CREATE_PARTICLE_MAIN_PANEL_H__
#define __Vaango_UI_CREATE_PARTICLE_MAIN_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIInputPartDistPanel.h>
#include <Vaango_UIGenerateParticlesPanel.h>

#include <Core/Enums.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UICreateParticleMainPanel : public Vaango_UIPanelBase
{
private:

  Vaango_UIInputPartDistPanel d_inputPartDist;
  Vaango_UIGenerateParticlesPanel d_generatePartDist;

public:

  Vaango_UICreateParticleMainPanel()
  {
    d_isVisible = false;
  }

  virtual ~Vaango_UICreateParticleMainPanel()
  {
  } 

public:

  void draw(const std::string& title, int width, int height)
  {
    ImGui::SetNextWindowSize(ImVec2(width, height), ImGuiCond_FirstUseEver);
    drawWindowBox(IM_COL32_WHITE);
    //io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;
    //std::cout << "visible = " << d_isVisible << "\n";
    if (ImGui::Begin(title.c_str(), &d_isVisible, ImGuiWindowFlags_NoScrollbar)) {
      drawWindowBox(IM_COL32(0, 255, 0, 255));
      ImVec2 vMin = ImGui::GetWindowContentRegionMin();
      ImVec2 vMax = ImGui::GetWindowContentRegionMax();
      int actual_width = vMax.x - vMin.x;
      int actual_height = vMax.y - vMin.y;
      if (actual_width > width) {
        width = actual_width;
      }
      if (actual_height > height) {
        height = actual_height;
      }

      {
        ImGui::BeginGroup();
        {
          if (ImGui::BeginChild("create particles", 
                                ImVec2(width, -ImGui::GetFrameHeightWithSpacing()))) {
            if (ImGui::BeginTabBar("##Tabs", ImGuiTabBarFlags_FittingPolicyResizeDown)) {
              if (ImGui::BeginTabItem("Particle size distribution")) {
                d_inputPartDist.draw("input_part_dist", width, height);
                ImGui::EndTabItem();
              }
              if (ImGui::BeginTabItem("Generate particles")) {
                d_generatePartDist.draw("generate_part", width, height);
                ImGui::EndTabItem();
              }
              ImGui::EndTabBar();
            }
            ImGui::EndChild();
          }
        }
        {
          if (ImGui::Button("Close")) {
            isVisible(false);
          }
          ImGui::SameLine();
          if (ImGui::Button("Save")) {

          }
        }
        drawWindowBox(IM_COL32(0, 255, 0, 255));
        ImGui::EndGroup();
      }
    }
    ImGui::End();
  }
};

} // namespace VaangoUI

#endif //__Vaango_UI_CREATE_PARTICLE_MAIN_PANEL_H__