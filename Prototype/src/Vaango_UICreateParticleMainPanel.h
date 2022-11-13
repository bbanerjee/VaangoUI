#ifndef __Vaango_UI_CREATE_PARTICLE_MAIN_PANEL_H__
#define __Vaango_UI_CREATE_PARTICLE_MAIN_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIInputPartDistPanel.h>
#include <Vaango_UIDisplayPartDistPanel.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UICreateParticleMainPanel : public Vaango_UIPanelBase
{
private:

  Vaango_UIInputPartDistPanel d_inputPartDist;
  Vaango_UIDisplayPartDistPanel d_displayPartDist;

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
    //io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;
    //std::cout << "visible = " << d_isVisible << "\n";
    if (ImGui::Begin(title.c_str(), &d_isVisible, 0)) {
      {
        ImGui::BeginGroup();
        ImGui::BeginChild("create particles", ImVec2(0, 0));
        if (ImGui::BeginTabBar("##Tabs", ImGuiTabBarFlags_None)) {
          if (ImGui::BeginTabItem("Particle size distribution")) {
            d_inputPartDist.draw("input_part_dist", width, height);
            ImGui::EndTabItem();
          }
          if (ImGui::BeginTabItem("Generate particles")) {
            d_displayPartDist.draw("generate_part", width, height);
            ImGui::EndTabItem();
          }
          ImGui::EndTabBar();
        }
        ImGui::EndChild();
        if (ImGui::Button("Close")) {
          isVisible(false);
        }
        ImGui::SameLine();
        if (ImGui::Button("Save")) {}
        ImGui::EndGroup();
      }
      ImGui::End();
    }
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_CREATE_PARTICLE_MAIN_PANEL_H__