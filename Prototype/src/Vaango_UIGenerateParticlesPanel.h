#ifndef __Vaango_UI_GENERATE_PARTICLES_PANEL_H__
#define __Vaango_UI_GENERATE_PARTICLES_PANEL_H__

#include <Vaango_UIPanelBase.h>

#include <imgui.h>

namespace VaangoUI {

enum class ParticleShape {
  CIRCLE,
  HOLLOW_CIRCLE,
  SPHERE,
  HOLLOW_SPHERE
};

class Vaango_UIGenerateParticlesPanel : public Vaango_UIPanelBase
{
private:

  ParticleShape d_partShape = ParticleShape::CIRCLE;
  double d_thickness = 0.0;
  double d_rveSize = 100.0;
  bool d_periodicDistribution = false;
  bool d_enableCreateDistribution = false;

public:

  Vaango_UIGenerateParticlesPanel()
  {
    d_isVisible = false;
  }

  virtual ~Vaango_UIGenerateParticlesPanel()
  {
  } 

public:

  void draw(const std::string& title, int width, int height)
  {
    // Yellow is content region min/max
		{
			ImVec2 vMin = ImGui::GetWindowContentRegionMin();
			ImVec2 vMax = ImGui::GetWindowContentRegionMax();

			vMin.x += ImGui::GetWindowPos().x;
			vMin.y += ImGui::GetWindowPos().y;
			vMax.x += ImGui::GetWindowPos().x;
			vMax.y += ImGui::GetWindowPos().y;

			ImGui::GetForegroundDrawList()->AddRect( vMin, vMax, IM_COL32( 255, 255, 0, 255 ) );
		}
    {
      ImGui::BeginChild("generate particles", ImVec2(0, 0));
      generateParticles(width, height); 
      ImGui::EndChild();
    }
    {
      ImGui::BeginChild("display particles", ImVec2(0, 0));
      drawParticles(width, height); 
      ImGui::EndChild();
    }
  }

  void generateParticles(int width, int height) {

    ImGui::Text("RVE Size");
    ImGui::SameLine();
    ImGui::PushItemWidth(100);
    float val = d_rveSize;
    ImGui::DragFloat("(L)##1a", &val);
    d_rveSize = static_cast<double>(val);
    ImGui::PopItemWidth();

    ImGui::SameLine();

    ImGui::Text("Particle shape");
    ImGui::SameLine();
    ImGui::PushItemWidth(100);
    const char* items[] = {"Solid circle", "Hollow circle", "Solid sphere", "Hollow sphere"};
    static int item = 0;
    ImGui::Combo("##1a", &item, items, IM_ARRAYSIZE(items));
    ImGui::PopItemWidth();

    ImGui::SameLine();

    ImGui::Text("Thickness");
    ImGui::SameLine();
    ImGui::PushItemWidth(100);
    val = d_thickness;
    ImGui::DragFloat("(L)##1b", &val);
    d_thickness = static_cast<double>(val);
    ImGui::PopItemWidth();

    ImVec2 buttonSize(200, 20);
    if (ImGui::Button("Create distribution", buttonSize)) {
      d_enableCreateDistribution = true;
    }

    ImGui::SameLine();

    ImGui::Checkbox("Periodic", &d_periodicDistribution);

    if (d_enableCreateDistribution) {
      actuallyGenerate();
      d_enableCreateDistribution = false;
    }
  }
  
  void actuallyGenerate()
  {
  }

  void drawParticles(int width, int height) {

  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_GENERATE_PARTICLES_PANEL_H__