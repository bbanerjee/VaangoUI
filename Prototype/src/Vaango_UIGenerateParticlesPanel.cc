#include <Vaango_UIGenerateParticlesPanel.h>
#include <Vaango_UIGenerateRVEParticles.h>
#include <Vaango_UIEnvironment.h>

#include <Core/Enums.h>
#include <Core/ParticleSizeDist.h>
#include <Core/ParticlesInRVE.h>

#include <vtkActor.h>
#include <vtkAppendPolyData.h>
#include <vtkAxesActor.h>
#include <vtkBox.h>
#include <vtkCamera.h>
#include <vtkCaptionActor2D.h>
#include <vtkClipPolyData.h>
#include <vtkCubeSource.h>
#include <vtkCylinderSource.h>
#include <vtkFloatArray.h>
#include <vtkGlyph3DMapper.h>
#include <vtkImplicitBoolean.h>
#include <vtkNamedColors.h>
#include <vtkNew.h>
#include <vtkOrientationMarkerWidget.h>
#include <vtkPlane.h>
#include <vtkPolyDataMapper.h>
#include <vtkProperty.h>
#include <vtkSmartPointer.h>
#include <vtkSphereSource.h>
#include <vtkTextActor.h>
#include <vtkTextProperty.h>
#include <vtkTransform.h>
#include <vtkTransformPolyDataFilter.h>

//#define CLIPPING

namespace VaangoUI {

ParticleShape s_partShapeFlag;
ParticleSizeDist s_sizeDist;
ParticlesInRVE s_partList;

Vaango_UIGenerateParticlesPanel::  Vaango_UIGenerateParticlesPanel()
{
  d_isVisible = false;
}

Vaango_UIGenerateParticlesPanel::~Vaango_UIGenerateParticlesPanel()
{
} 

void Vaango_UIGenerateParticlesPanel::draw(const std::string& title, int width, int height)
{
  drawWindowBox();
  {
    ImGui::BeginChild("generate particles", ImVec2(0, 50));
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

  drawWindowBox();

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
    s_sizeDist.print();
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

  ImVec4 bg_color = {0.45f, 0.55f, 0.60f, 1.00f};
  glClearColor(bg_color.x * bg_color.w, 
               bg_color.y * bg_color.w, 
               bg_color.z * bg_color.w, bg_color.w);

  vtkNew<vtkNamedColors> colors;

  // Bounding cube
  vtkNew<vtkCubeSource> rve;
  rve->SetBounds(0, d_rveSize, 0, d_rveSize, -d_rveSize/2.0, d_rveSize/2.0);
  rve->Update();

  vtkNew<vtkPolyDataMapper> cubeMapper;
  cubeMapper->SetInputConnection(rve->GetOutputPort());

  vtkNew<vtkActor> cubeActor;
  cubeActor->SetMapper(cubeMapper);
  cubeActor->GetProperty()->SetRepresentationToWireframe();
  //cubeActor->GetProperty()->SetOpacity(0.5);
  cubeActor->GetProperty()->SetColor(colors->GetColor3d("Blue").GetData());

  Vaango_UIEnvironment::vtk_Renderer->AddActor(cubeActor);

  // For clipping
  #ifdef CLIPPING
  vtkNew<vtkAppendPolyData> clipData;
  #endif

  vtkNew<vtkNamedColors> namedColors;
  std::vector<std::string> colorNames = {"Red", "Maroon", "Yellow", "Olive",
                                         "Lime", "Green", "Aqua", "Teal", "Blue",
                                         "Navy", "Fuchsia", "Purple"};
  std::string colorName;
  unsigned int index = -1;                                      
  for (const auto& [radius, particles] : s_partList.getParticles()) {
    
    // Skip if there are no particles for this radius
    if (particles.empty()) {
      continue;
    }

    // Set up particle color
    if (index < colorNames.size()) {
      index++;
    } else {
      index = 0;
    }
    colorName = colorNames[index] ;

    // Set up one actor for each radius
    vtkNew<vtkActor> actor;
    vtkNew<vtkGlyph3DMapper> mapper;

    switch (particles[0].getShape())
    {
      case ParticleShape::CIRCLE: 
      case ParticleShape::HOLLOW_CIRCLE: 
      {
        // Set up points, scale factors, and colors
        vtkNew<vtkPoints> centers;
        vtkNew<vtkFloatArray> scaleFactors;
        scaleFactors->SetName("Scale Factors");
        scaleFactors->SetNumberOfComponents(3);
        vtkNew<vtkUnsignedCharArray> colors;
        colors->SetName("Colors");
        colors->SetNumberOfComponents(3);

        // Set up scaling factors
        double xScale = 2.0*radius;
        double yScale = 2.0*radius;
        double zScale = d_rveSize;

        // Set up the data
        for (auto part : particles) {

          centers->InsertNextPoint(part.getCenter().x, part.getCenter().y,
                                   part.getCenter().z);
          scaleFactors->InsertNextTuple3(xScale, yScale, zScale);
          colors->InsertNextTypedTuple(namedColors->GetColor3ub(colorName).GetData());
        }

        // Set up polydata
        vtkNew<vtkPolyData> polydata;
        polydata->SetPoints(centers);
        polydata->GetPointData()->AddArray(colors);
        polydata->GetPointData()->AddArray(scaleFactors);
        
        // Set up cylinder source
        vtkNew<vtkCylinderSource> source;
        source->SetResolution(16);

        // Set up rotation (of cylinders)
        vtkNew<vtkTransform> transform;
        transform->RotateX(90.0);

        vtkNew<vtkTransformPolyDataFilter> transformPD;
        transformPD->SetTransform(transform);
        transformPD->SetInputConnection(source->GetOutputPort());

        #ifdef CLIPPING
          clipData->AddInputConnection(transformPD->GetOutputPort());
          clipData->Update();
          mapper->SetSourceConnection(clipData->GetOutputPort());
        #else
          transformPD->Update();
          mapper->SetSourceConnection(transformPD->GetOutputPort());
        #endif

        // Set up glyph mapper
        mapper->SetInputData(polydata);
        mapper->SetScalarModeToUsePointFieldData();
        mapper->SetScaleArray("Scale Factors");
        mapper->SetScaleModeToScaleByVectorComponents();
        mapper->SelectColorArray("Colors");

        actor->SetMapper(mapper);
      }
      break;

      case ParticleShape::SPHERE: 
      case ParticleShape::HOLLOW_SPHERE: 
      {
        // Set up points, scale factors, and colors
        vtkNew<vtkPoints> centers;
        vtkNew<vtkFloatArray> scaleFactors;
        scaleFactors->SetName("Scale Factors");
        scaleFactors->SetNumberOfComponents(3);
        vtkNew<vtkUnsignedCharArray> colors;
        colors->SetName("Colors");
        colors->SetNumberOfComponents(3);

        // Set up scaling factors
        double xScale = radius;
        double yScale = radius;
        double zScale = radius;

        // Set up the data
        for (auto part : particles) {

          centers->InsertNextPoint(part.getCenter().x, part.getCenter().y,
                                   part.getCenter().z);
          scaleFactors->InsertNextTuple3(xScale, yScale, zScale);
          colors->InsertNextTypedTuple(namedColors->GetColor3ub(colorName).GetData());
        }

        // Set up polydata
        vtkNew<vtkPolyData> polydata;
        polydata->SetPoints(centers);
        polydata->GetPointData()->AddArray(colors);
        polydata->GetPointData()->AddArray(scaleFactors);
        
        // Set up sphere source
        vtkNew<vtkSphereSource> source;
        source->SetThetaResolution(16);
        source->SetPhiResolution(16);

        #ifdef CLIPPING
          clipData->AddInputConnection(source->GetOutputPort());
          clipData->Update();
          mapper->SetSourceConnection(clipData->GetOutputPort());
        #else
          mapper->SetSourceConnection(source->GetOutputPort());
        #endif

        // Set up glyph mapper
        mapper->SetInputData(polydata);
        mapper->SetScalarModeToUsePointFieldData();
        mapper->SetScaleArray("Scale Factors");
        mapper->SetScaleModeToScaleByVectorComponents();
        mapper->SelectColorArray("Colors");

        actor->SetMapper(mapper);
      }
        break;

      default:
        break;

    };

    Vaango_UIEnvironment::vtk_Renderer->AddActor(actor);
  }

  #ifdef CLIPPING
  // Clipping 
  vtkNew<vtkPolyDataMapper> clipDataMapper;
  clipDataMapper->SetInputConnection(clipData->GetOutputPort());

  // Clip with cube
  //vtkNew<vtkBox> implicitCube;
  //implicitCube->SetBounds(rve->GetOutput()->GetBounds());
  // Clip with planes
  vtkNew<vtkPlane> xMinus, xPlus, yMinus, yPlus;
  xMinus->SetOrigin(0, 0, 0);
  xMinus->SetNormal(1, 0, 0);
  xPlus->SetOrigin(d_rveSize, 0, 0);
  xPlus->SetNormal(-1, 0, 0);
  yMinus->SetOrigin(0, 0, 0);
  yMinus->SetNormal(0, 1, 0);
  yPlus->SetOrigin(0, d_rveSize, 0);
  yPlus->SetNormal(0, -1, 0);

  vtkNew<vtkImplicitBoolean> boolean;
  boolean->AddFunction(xMinus);
  boolean->AddFunction(xPlus);
  boolean->AddFunction(yMinus);
  boolean->AddFunction(yPlus);
  boolean->SetOperationTypeToUnion();

  vtkNew<vtkClipPolyData> clipper;
  //clipper->SetClipFunction(implicitCube);
  clipper->SetClipFunction(boolean);
  //clipper->SetClipFunction(xPlus);
  clipper->SetInputConnection(clipData->GetOutputPort());
  //clipper->GenerateClippedOutputOn();
  //clipper->InsideOutOn();
  //clipper->Update();

  vtkNew<vtkPolyDataMapper> clipMapper;
  clipMapper->SetInputConnection(clipper->GetOutputPort());
  clipMapper->ScalarVisibilityOff();

  vtkNew<vtkActor> clipActor;
  clipActor->SetMapper(clipMapper);
  clipActor->GetProperty()->SetDiffuseColor(
      colors->GetColor3d("Tomato").GetData());
  clipActor->GetProperty()->SetRepresentationToWireframe();

  Vaango_UIEnvironment::vtk_Renderer->AddActor(clipActor);
  #endif

  // Add coordinate axis frame
  // The axes are positioned with a user transform
  vtkNew<vtkAxesActor> axes;
  axes->SetTotalLength(d_rveSize/5, d_rveSize/5, d_rveSize/5);
  auto w = axes->GetXAxisCaptionActor2D()->GetWidth();
  auto h = axes->GetXAxisCaptionActor2D()->GetHeight();
  axes->GetXAxisCaptionActor2D()->SetWidth(w*0.25);
  axes->GetXAxisCaptionActor2D()->SetHeight(h*0.25);
  w = axes->GetYAxisCaptionActor2D()->GetWidth();
  h = axes->GetYAxisCaptionActor2D()->GetHeight();
  axes->GetYAxisCaptionActor2D()->SetWidth(w*0.25);
  axes->GetYAxisCaptionActor2D()->SetHeight(h*0.25);
  w = axes->GetZAxisCaptionActor2D()->GetWidth();
  h = axes->GetZAxisCaptionActor2D()->GetHeight();
  axes->GetZAxisCaptionActor2D()->SetWidth(w*0.25);
  axes->GetZAxisCaptionActor2D()->SetHeight(h*0.25);

  Vaango_UIEnvironment::vtk_Renderer->AddActor(axes);

  /*
  vtkNew<vtkOrientationMarkerWidget> widget;
  double rgba[4]{0.0, 0.0, 0.0, 0.0};
  colors->GetColor("Carrot", rgba);
  widget->SetOutlineColor(rgba[0], rgba[1], rgba[2]);
  widget->SetOrientationMarker(axes);
  widget->SetInteractor(Vaango_UIEnvironment::vtk_Interactor);
  widget->SetViewport(0.0, 0.0, 100, 100);
  widget->SetEnabled(1);
  widget->InteractiveOff();
  */

  //Vaango_UIEnvironment::vtk_Renderer->GetActiveCamera()->Azimuth(50);
  //Vaango_UIEnvironment::vtk_Renderer->GetActiveCamera()->Elevation(-30);

  Vaango_UIEnvironment::vtk_Renderer->SetBackground(colors->GetColor3d("DarkSlateGray").GetData());
  Vaango_UIEnvironment::vtk_Renderer->ResetCamera();

  //Vaango_UIEnvironment::vtk_RenderWindow->InitializeFromCurrentContext();
  //Vaango_UIEnvironment::vtk_RenderWindow->SetSize(Vaango_UIEnvironment::vtk_viewportSize);
  //Vaango_UIEnvironment::vtk_Interactor->SetSize(Vaango_UIEnvironment::vtk_viewportSize);

}

void Vaango_UIGenerateParticlesPanel::drawParticles(int width, int height) {

  drawWindowBox();

  // Render to our framebuffer
  glBindFramebuffer(GL_FRAMEBUFFER, Vaango_UIEnvironment::vtk_frameBuffer);
  Vaango_UIEnvironment::vtk_RenderWindow->Render();
  glBindFramebuffer(GL_FRAMEBUFFER, 0);

  GLenum framebufferStatus = glCheckFramebufferStatusEXT(GL_FRAMEBUFFER_EXT);

  switch (framebufferStatus) {
    case GL_FRAMEBUFFER_COMPLETE_EXT: break;
    case GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT_EXT:
      std::cout << "Framebuffer Object" << "Error: Attachment Point Unconnected" << std::endl;
      break;
    case GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT_EXT:
      std::cout << "Framebuffer Object" << "Error: Missing Attachment" << std::endl;
      break;
    case GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS_EXT:
      std::cout << "Framebuffer Object" << "Error: Dimensions do not match" << std::endl;
      break;
    case GL_FRAMEBUFFER_INCOMPLETE_FORMATS_EXT:
      std::cout << "Framebuffer Object" << "Error: Formats" << std::endl;
      break;
    case GL_FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER_EXT:
      std::cout << "Framebuffer Object" << "Error: Draw Buffer" << std::endl;
      break;
    case GL_FRAMEBUFFER_INCOMPLETE_READ_BUFFER_EXT:
      std::cout << "Framebuffer Object" << "Error: Read Buffer" << std::endl;
      break;
    case GL_FRAMEBUFFER_UNSUPPORTED_EXT:
      std::cout << "Framebuffer Object" << "Error: Unsupported Framebuffer Configuration" << std::endl;
      break;
    default:
      std::cout << "Framebuffer Object" << "Error: Unkown Framebuffer Object Failure" << std::endl;
      break;
  }

  // Process events
  ImGuiIO& io = ImGui::GetIO();
  io.ConfigWindowsMoveFromTitleBarOnly = true;

  /*
  if (ImGui::IsWindowFocused()) {
    Vaango_UIEnvironment::vtk_Interactor->Start();
  }
  */

  if (ImGui::IsWindowFocused()) {

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
    else if (io.MouseWheel < 0)
      Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::MouseWheelForwardEvent, nullptr);

    Vaango_UIEnvironment::vtk_Interactor->InvokeEvent(vtkCommand::MouseMoveEvent, nullptr);
  }

  // Get the size of the child (i.e. the whole draw size of the windows).
  ImVec2 wsize = ImGui::GetContentRegionAvail();
  //std::cout << "wsize = " << wsize.x << ", " << wsize.y << "\n";
  ImGui::Image(reinterpret_cast<void*>(Vaango_UIEnvironment::vtk_renderTexture), wsize, ImVec2(0, 1), ImVec2(1, 0));

  /*
  int format, ww, hh;
  glGetTexLevelParameteriv(GL_TEXTURE_2D, 0, GL_TEXTURE_INTERNAL_FORMAT, &format);
  glGetTexLevelParameteriv(GL_TEXTURE_2D, 0, GL_TEXTURE_WIDTH, &ww);
  glGetTexLevelParameteriv(GL_TEXTURE_2D, 0, GL_TEXTURE_HEIGHT, &hh);
  std::cout << "format = " << format << " ww = " << ww << " hh = " << hh << "\n";
  ImGui::Image(reinterpret_cast<void*>(Vaango_UIEnvironment::vtk_renderTexture), 
               ImVec2(ww,hh), ImVec2(0, 1), ImVec2(1, 0));

  GLubyte* image = new GLubyte[ww * hh * 4];   
  glGetTexImage(GL_TEXTURE_2D, 0, GL_RGBA, GL_UNSIGNED_BYTE, image);

  GLuint r, g, b, a; // or GLubyte r, g, b, a;
  size_t x = 100, y = 100; // line and column of the pixel
  size_t elmes_per_line = ww * 4; // elements per line = 256 * "RGBA"

  size_t row = y * elmes_per_line;
  size_t col = x * 4;

  r = image[row + col]; 
  g = image[row + col + 1]; 
  b = image[row + col + 2]; 
  a = image[row + col + 3];
  std::cout << "color = " << r << "," << g << "," << b << std::endl;
  */
  
}

// Yellow is content region min/max
void Vaango_UIGenerateParticlesPanel::drawWindowBox() const {
  ImVec2 vMin = ImGui::GetWindowContentRegionMin();
  ImVec2 vMax = ImGui::GetWindowContentRegionMax();

  vMin.x += ImGui::GetWindowPos().x;
  vMin.y += ImGui::GetWindowPos().y;
  vMax.x += ImGui::GetWindowPos().x;
  vMax.y += ImGui::GetWindowPos().y;

  ImGui::GetForegroundDrawList()->AddRect( vMin, vMax, IM_COL32( 255, 255, 0, 255 ) );
}

} // namespace VaangoUI
