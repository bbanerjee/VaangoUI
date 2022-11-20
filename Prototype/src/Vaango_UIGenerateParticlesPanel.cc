#include <Vaango_UIGenerateParticlesPanel.h>
#include <Vaango_UIGenerateRVEParticles.h>

#include <Core/Enums.h>

#include <vtkActor.h>
#include <vtkCylinderSource.h>
#include <vtkNamedColors.h>
#include <vtkNew.h>
#include <vtkPolyDataMapper.h>
#include <vtkProperty.h>
#include <vtkSmartPointer.h>
#include <vtkSphereSource.h>


namespace VaangoUI {

Vaango_UIGenerateParticlesPanel::  Vaango_UIGenerateParticlesPanel()
{
  d_isVisible = false;
}

Vaango_UIGenerateParticlesPanel::~Vaango_UIGenerateParticlesPanel()
{
} 

void Vaango_UIGenerateParticlesPanel::draw(const std::string& title, int width, int height)
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

void Vaango_UIGenerateParticlesPanel::generateParticles(int width, int height) {

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

void Vaango_UIGenerateParticlesPanel::actuallyGenerate()
{
  generator.distributeParticles(d_rveSize, d_periodicDistribution,
                                d_partShape, d_thickness);
  createVTKActors();
}

void Vaango_UIGenerateParticlesPanel::createVTKActors() {

  vtkNew<vtkNamedColors> colors;

  for (auto part : s_partList.getParticles()) {

    vtkNew<vtkPolyDataMapper> mapper;
    switch (part.getShape())
    {
      case ParticleShape::CIRCLE: 
      case ParticleShape::HOLLOW_CIRCLE: 
      {
        vtkNew<vtkCylinderSource> source;
        source->SetCenter(part.getCenter().x, part.getCenter().y, part.getCenter().z);
        source->SetRadius(part.getRadius());
        source->SetHeight(1.0);

        mapper->SetInputConnection(source->GetOutputPort());
      }
        break;
      case ParticleShape::SPHERE: 
      case ParticleShape::HOLLOW_SPHERE: 
      {
        vtkNew<vtkSphereSource> source;
        source->SetCenter(part.getCenter().x, part.getCenter().y, part.getCenter().z);
        source->SetRadius(part.getRadius());

        mapper->SetInputConnection(source->GetOutputPort());
      }
        break;
      default:
        break;

    }

    vtkNew<vtkActor> actor;
    actor->SetMapper(mapper);
    actor->GetProperty()->SetColor(colors->GetColor3d("MistyRose").GetData());

    vtk_actors.push_back(actor);
  }
}

void Vaango_UIGenerateParticlesPanel::drawParticles(int width, int height) {

}


} // namespace VaangoUI
