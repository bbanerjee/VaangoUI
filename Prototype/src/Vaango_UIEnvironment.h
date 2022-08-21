#ifndef __Vaango_UI_ENVIRONMENT_H__
#define __Vaango_UI_ENVIRONMENT_H__

#include <Vaango_UIComponentBase.h>

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

  void runMainLoop(std::vector<Vaango_UIComponentBase*> components);

  void addUIComponent(Vaango_UIComponentBase& component);

private:

  void setupImGuiStyle();

private:

  bool d_imguiRunning = false;
  std::vector<Vaango_UIComponentBase*> d_components;

};

} // namespace VaangoUI

#endif //__Vaango_UI_ENVIRONMENT_H__