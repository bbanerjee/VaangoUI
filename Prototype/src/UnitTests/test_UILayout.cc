#include <Vaango_UILayout.h>

#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <imgui.h>
#include <imgui_impl_glfw.h>
#include <imgui_impl_opengl3.h>

#include <gtest/gtest.h>
#include <iostream>

using namespace VaangoUI;

class Vaango_UIEnv : public ::testing::Environment 
{
private:

  int d_argc;
  char** d_argv;
  char** d_env;

public:

  static GLFWwindow* s_window;

public:

  explicit Vaango_UIEnv(int argc, char** argv, char** env) {
    d_argc = argc;
    d_argv = argv;
    d_env = env;
  }

  virtual ~Vaango_UIEnv() {
  }
  
  virtual void SetUp() {

    // Set up error call back
    glfwSetErrorCallback(error_callback);

    // Initialize GLFW
    if (!glfwInit()) {
      std::cout << "Error: Could not initialize glfw" << std::endl;
      return;
    }

    // Set up GLFW context versions (glfw3.3 only)
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    // Create a window
    int width = 800;
    int height = 600;
    s_window = glfwCreateWindow(width, height, "test_UiLayout",
                                nullptr, nullptr);
    if (!s_window) {
      std::cout << "Error: Could not create glfw window" << std::endl;
      return;
    }

    // Assign context
    glfwMakeContextCurrent(s_window);
    gladLoadGLLoader((GLADloadproc) glfwGetProcAddress);

    // Enable vsync
    glfwSwapInterval(1);

    // Setup ImGui context
    IMGUI_CHECKVERSION();
    ImGui::CreateContext();

    // Setup style
    ImGui::StyleColorsDark();

    // Setup glfw and opengl backend for imgui
    ImGui_ImplGlfw_InitForOpenGL(s_window, true);
    ImGui_ImplOpenGL3_Init("#version 330");
  }

  virtual void TearDown() {
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    ImGui::DestroyContext();
    glfwDestroyWindow(s_window);
    glfwTerminate();
  }

  static void error_callback(int error, const char* desc) {
    std::cout << "Error " << std::to_string(error) << ": " << desc << std::endl;
  }
};

// Initialize window variable
GLFWwindow* Vaango_UIEnv::s_window = nullptr;

int main(int argc, char** argv, char* env[]) {
  ::testing::InitGoogleTest(&argc, argv);
  ::testing::AddGlobalTestEnvironment(new Vaango_UIEnv(argc, argv, env));
  return RUN_ALL_TESTS();
}

TEST(Test_UILayout, genericTests) {

  // Constructor
  Vaango_UILayout layout(Vaango_UIEnv::s_window, "mock_settings");
  std::cout << "Window = " << Vaango_UIEnv::s_window << std::endl;

  // Initialize console
  //layout.init();

  // Main loop
  int console_width = 600, console_height = 100;
  ImVec4 bg_color = {0.45f, 0.55f, 0.60f, 1.00f};
  while (!glfwWindowShouldClose(Vaango_UIEnv::s_window)) {
 
    // Poll events
    glfwPollEvents();

    // Create main frame
    ImGui_ImplOpenGL3_NewFrame();
    ImGui_ImplGlfw_NewFrame();
    ImGui::NewFrame();

    // Render
    ImGui::Render();

    // OpenGL draw (shows window)
    int display_w, display_h;
    glfwGetFramebufferSize(Vaango_UIEnv::s_window, &display_w, &display_h);
    glViewport(0, 0, display_w, display_h);
    glClearColor(bg_color.x * bg_color.w, 
                 bg_color.y * bg_color.w, 
                 bg_color.z * bg_color.w, bg_color.w);
    glClear(GL_COLOR_BUFFER_BIT);
    ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());

    // Swap buffers
    glfwSwapBuffers(Vaango_UIEnv::s_window);


  }
}

