#include <Vaango_UIGenerateParticlesPanel.h>
#include <Vaango_UIGenerateRVEParticles.h>
#include <Vaango_UIEnvironment.h>

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

  vtk_actors.clear();

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
    Vaango_UIEnvironment::vtk_Renderer->AddActor(actor);
    Vaango_UIEnvironment::vtk_Renderer->SetBackground(colors->GetColor3d("DarkSlateGray").GetData());
  }
}

void Vaango_UIGenerateParticlesPanel::drawParticles(int width, int height) {

  // Render to our framebuffer
  glBindFramebuffer(GL_FRAMEBUFFER, Vaango_UIEnvironment::vtk_frameBuffer);
  Vaango_UIEnvironment::vtk_RenderWindow->Render();
  glBindFramebuffer(GL_FRAMEBUFFER, 0);

   // Process events
  if (ImGui::IsWindowFocused()) {

    ImGuiIO& io = ImGui::GetIO();
    io.ConfigWindowsMoveFromTitleBarOnly = true;
    ImVec2 wPos = ImGui::GetWindowPos();

    double xpos = static_cast<double>(io.MousePos[0]) - static_cast<double>(ImGui::GetWindowPos().x);
    double ypos = static_cast<double>(io.MousePos[1]) - static_cast<double>(ImGui::GetWindowPos().y);
    int ctrl = static_cast<int>(io.KeyCtrl);
    int shift = static_cast<int>(io.KeyShift);
    bool dclick = io.MouseDoubleClicked[0] || io.MouseDoubleClicked[1] || io.MouseDoubleClicked[2];

    Vaango_UIEnvironment::vtk_Interactor->SetEventInformationFlipY(xpos, ypos, ctrl, shift, dclick);

    if (io.MouseClicked[ImGuiMouseButton_Left])
      Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::LeftButtonPressEvent, nullptr);
    else if (io.MouseReleased[ImGuiMouseButton_Left])
      Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::LeftButtonReleaseEvent, nullptr);
    else if (io.MouseClicked[ImGuiMouseButton_Right])
      Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::RightButtonPressEvent, nullptr);
    else if (io.MouseReleased[ImGuiMouseButton_Right])
      Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::RightButtonReleaseEvent, nullptr);
    else if (io.MouseWheel > 0)
      Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::MouseWheelBackwardEvent, nullptr);

    Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::MouseMoveEvent, nullptr);
  }

  // Get the size of the child (i.e. the whole draw size of the windows).
  ImVec2 wsize = ImGui::GetContentRegionAvail();
  ImGui::Image(reinterpret_cast<void*>(Vaango_UIEnvironment::vtk_renderTexture), wsize, ImVec2(0, 1), ImVec2(1, 0));
  
}


} // namespace VaangoUI
