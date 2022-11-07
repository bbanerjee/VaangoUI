#ifndef __Vaango_UI_MAINMENU_COMPONENT_H__
#define __Vaango_UI_MAINMENU_COMPONENT_H__

#include <Vaango_UIComponentBase.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UIMainMenuComponent final : public Vaango_UIComponentBase
{
public:

  Vaango_UIMainMenuComponent()
    : Vaango_UIComponentBase("main_menu", 100, 100)
  {
  }

  ~Vaango_UIMainMenuComponent()
  {
  } 

  // Virtual constuctor (default constructor used)
  Vaango_UIMainMenuComponent* create(const std::string& title = "dummy",
                                     int width = 100, int height = 100) const override
  {
    return new Vaango_UIMainMenuComponent();
  }

  // Virtual constuctor (copy constructor used)
  Vaango_UIMainMenuComponent* clone() const override
  {
    return new Vaango_UIMainMenuComponent(*this);
  }

public:

  void draw() override
  {
    if (ImGui::BeginMainMenuBar()) {

      if (ImGui::BeginMenu("File")) {
        showFileMenu();
        ImGui::EndMenu();
      }

      if (ImGui::BeginMenu("Create")) {
        showInputsMenu();
        ImGui::EndMenu();
      }

      if (ImGui::BeginMenu("About")) {
        showAbout();
        ImGui::EndMenu();
      }

      if (ImGui::BeginMenu("Help")) {
        showHelp();
        ImGui::EndMenu();
      }
      ImGui::EndMainMenuBar();
    }
  }

  void showFileMenu() {
    if (ImGui::MenuItem("Read particle location data", "Ctrl-O")) {

    }
    if (ImGui::MenuItem("Save Vaango input file", "Ctrl-S")) {

    }
    if (ImGui::MenuItem("Exit", "Ctrl-Q")) {

    }
  }

  void showInputsMenu() {
    if (ImGui::MenuItem("Create particles")) {

    }
    if (ImGui::MenuItem("Create input data")) {

    }
  }

  void showAbout() {

  }

  void showHelp() {

  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_MAINMENU_COMPONENT_H__