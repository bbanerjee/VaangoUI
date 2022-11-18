#ifndef __Vaango_UI_GENERATE_PARTICLES_PANEL_H__
#define __Vaango_UI_GENERATE_PARTICLES_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIData.h>
#include <Vaango_UIGenerateRVEParticles.h>

#include <Core/Enums.h>
#include <Core/Voronoi.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UIGenerateParticlesPanel : public Vaango_UIPanelBase
{
private:

  ParticleShape d_partShape = ParticleShape::CIRCLE;
  double d_thickness = 0.0;
  double d_rveSize = 100.0;
  bool d_periodicDistribution = false;

  bool d_enableCreateDistribution = false;
  Vaango_UIGenerateRVEParticles generator;

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

    // Estimate RVE size (2 * largest particle size)
    d_rveSize = s_sizeDist.maxParticleSize * 2.0;
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
    switch(item) {
    case 0: d_partShape = ParticleShape::CIRCLE; break;
    case 1: d_partShape = ParticleShape::HOLLOW_CIRCLE; break;
    case 2: d_partShape = ParticleShape::SPHERE; break;
    case 3: d_partShape = ParticleShape::HOLLOW_SPHERE; break;
    default: d_partShape = ParticleShape::CIRCLE; break;
    };
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
    d_enableCreateDistribution = false;
    if (ImGui::Button("Create distribution", buttonSize)) {
      d_enableCreateDistribution = true;
    }

    ImGui::SameLine();

    ImGui::Checkbox("Periodic", &d_periodicDistribution);


    // Generate particle locations
    if (d_enableCreateDistribution) {
      // Estimate the number of particles
      s_sizeDist.calcParticleDist();
      actuallyGenerate();
      d_enableCreateDistribution = false;
    }
  }
  
  void actuallyGenerate()
  {
    generator.distributeParticles(d_rveSize, d_periodicDistribution,
                                  d_partShape, d_thickness);
  }

  void drawParticles(int width, int height) {

  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_GENERATE_PARTICLES_PANEL_H__