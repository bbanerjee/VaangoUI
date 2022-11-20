#ifndef __Vaango_UI_ENVIRONMENT_H__
#define __Vaango_UI_ENVIRONMENT_H__

#include <Vaango_UIComponentBase.h>

#include <vtkCallbackCommand.h>
#include <vtkContourFilter.h>
#include <vtkGenericRenderWindowInteractor.h>
#include <vtkGenericOpenGLRenderWindow.h>
#include <vtkInteractorStyleTrackballCamera.h>
#include <vtkMath.h>
#include <vtkPointData.h>
#include <vtkPolyDataMapper.h>
#include <vtkRenderer.h>
#include <vtkShortArray.h>
#include <vtkSmartPointer.h>
#include <vtkStructuredPoints.h>

#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <string>
#include <iostream>
#include <vector>

namespace VaangoUI {

class Vaango_UIEnvironment
{
public:

  static GLFWwindow* main_window;

  static void error_callback(int error, const char* desc) {
    std::cout << "Error " << std::to_string(error) << ": " << desc << std::endl;
  }

public:

  Vaango_UIEnvironment(const std::string& title,
                       const int width = 1200,
                       const int height = 1000);

  ~Vaango_UIEnvironment();

public:

  void startImGui();
  void stopImGui();

  void setupVTK();
  void setupVTKBuffers();

  void runMainLoop(std::vector<Vaango_UIComponentBase*> components);

  void addUIComponent(Vaango_UIComponentBase& component);

private:

  void setupImGuiStyle();

private:

  bool d_imguiRunning = false;
  std::vector<Vaango_UIComponentBase*> d_components;

public:

  static int vtk_viewportSize[2];
  static vtkSmartPointer<vtkRenderer> vtk_Renderer;
  static vtkSmartPointer<vtkInteractorStyleTrackballCamera> vtk_InteractorStyle;
  static vtkSmartPointer<vtkGenericRenderWindowInteractor> vtk_Interactor;
  static vtkSmartPointer<vtkCallbackCommand> vtk_CurrentCallback;
  static vtkSmartPointer<vtkGenericOpenGLRenderWindow> vtk_RenderWindow;

};

} // namespace VaangoUI

#endif //__Vaango_UI_ENVIRONMENT_H__