#include <Vaango_UIApplication.h>
#include <Vaango_UIEnvironment.h>
#include <Vaango_UIComponentBase.h>
#include <Vaango_UIMainMenuComponent.h>
#include <Vaango_UINodesComponent.h>
//#include <Vaango_UITestComponent.h>

namespace VaangoUI {

  void
  Vaango_UIApplication::initialize()
  {

    // Constructor
    Vaango_UIEnvironment uiEnv("vaango_UIEnv", 800, 600);
    std::cout << "Window = " << Vaango_UIEnvironment::main_window << std::endl;

    std::vector<Vaango_UIComponentBase*> components;

    // Main menu component
    Vaango_UIMainMenuComponent mainMenu;
    components.push_back(&mainMenu);

    // Nodes component
    Vaango_UINodesComponent component("Nodes", 300, 300);
    components.push_back(&component);

    //Vaango_UITestComponent component("test component", 300, 200);
    //components.push_back(&component);

    uiEnv.startImGui();
    uiEnv.setupImNodes();
    uiEnv.setupOCCTViewer();
    uiEnv.setupVTK();
    uiEnv.setupVTKBuffers(1000, 1000);
    uiEnv.runMainLoop(components);
    uiEnv.deleteVTKBuffers();
    uiEnv.stopOCCT();
    uiEnv.stopImNodes();
    uiEnv.stopImGui();

  }

} // end namespace VaangoUI