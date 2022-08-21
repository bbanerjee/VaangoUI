#include <Vaango_UIEnvironment.h>
#include <Vaango_UITestComponent.h>
#include <Vaango_UIEngineeringViewsComponent.h>

#include <gtest/gtest.h>
#include <iostream>

using namespace VaangoUI;

int main(int argc, char** argv, char* env[]) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}

TEST(Test_UIEnvironment, genericTests) {

  // Constructor
  Vaango_UIEnvironment uiEnv("test_UIEnv", 800, 600);
  std::cout << "Window = " << Vaango_UIEnvironment::main_window << std::endl;

  std::vector<Vaango_UIComponentBase*> components;

  // Test component
  Vaango_UITestComponent component("test component", 300, 200);
  components.push_back(&component);

  // Engineering views component
  Vaango_UIEngineeringViewsComponent viewsComponent("Engineering views", 300, 200);
  viewsComponent.loadIconTextures("assets/Icons");
  components.push_back(&viewsComponent);

  uiEnv.startImGui();
  uiEnv.runMainLoop(components);
  uiEnv.stopImGui();
}

