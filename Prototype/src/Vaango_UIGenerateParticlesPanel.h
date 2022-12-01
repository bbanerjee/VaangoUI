#ifndef __Vaango_UI_GENERATE_PARTICLES_PANEL_H__
#define __Vaango_UI_GENERATE_PARTICLES_PANEL_H__

#include <Vaango_UIPanelBase.h>
#include <Vaango_UIGenerateRVEParticles.h>

#include <Core/Enums.h>

#include <vtkActor.h>
#include <vtkSmartPointer.h>

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

  Vaango_UIGenerateParticlesPanel();

  virtual ~Vaango_UIGenerateParticlesPanel();

  void draw(const std::string& title, int width, int height);

private:

  void generateParticles(int width, int height);
  
  void actuallyGenerate();

  void createVTKActors();

  void drawParticles(int width, int height); 

};

} // namespace VaangoUI

#endif //__Vaango_UI_GENERATE_PARTICLES_PANEL_H__