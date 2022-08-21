#include <Vaango_UIEnvironment.h>

#include <imgui.h>
#include <imgui_impl_glfw.h>
#include <imgui_impl_opengl3.h>

#include <vector>
#include <cmath>

using namespace VaangoUI;

// Initialize static window variable
GLFWwindow* Vaango_UIEnvironment::main_window = nullptr;

Vaango_UIEnvironment::Vaango_UIEnvironment(const std::string& title,
                                           const int width,
                                           const int height)
{
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
  main_window = glfwCreateWindow(width, height, "test_UiLayout",
                                 nullptr, nullptr);
  if (!main_window) {
    std::cout << "Error: Could not create glfw window" << std::endl;
    return;
  }

  // Assign context
  glfwMakeContextCurrent(main_window);
  //gladLoadGL();
  gladLoadGLLoader((GLADloadproc) glfwGetProcAddress);

  // Enable vsync
  glfwSwapInterval(1);
}

Vaango_UIEnvironment::~Vaango_UIEnvironment()
{
  /* Delete all UI components */
  for (auto component : d_components) {
    delete component;
  }
  d_components.clear();

  glfwDestroyWindow(main_window);
  glfwTerminate();
}

void
Vaango_UIEnvironment::startImGui()
{
  if (d_imguiRunning) {
    std::cout << "startImGui::ImGui is already running.  Cannot start new ImGui context." << std::endl;
    return;
  }

  // Setup ImGui context
  IMGUI_CHECKVERSION();
  ImGui::CreateContext();

  // Setup style
  setupImGuiStyle();

  // Setup glfw and opengl backend for imgui
  ImGui_ImplGlfw_InitForOpenGL(main_window, true);
  ImGui_ImplOpenGL3_Init("#version 330");

  // Set flag
  d_imguiRunning = true;
}

void
Vaango_UIEnvironment::stopImGui()
{
  if (!d_imguiRunning) {
    std::cout << "stopImGui::ImGui is not running.  Cannot stop ImGui." << std::endl;
    return;
  }

  ImGui_ImplOpenGL3_Shutdown();
  ImGui_ImplGlfw_Shutdown();
  ImGui::DestroyContext();

  // Set flag
  d_imguiRunning = false;
}

void
Vaango_UIEnvironment::runMainLoop(std::vector<Vaango_UIComponentBase*> components)
{
  if (!d_imguiRunning) {
    std::cout << "runMainLoop::ImGui is not running.  Please start ImGui." << std::endl;
    return;
  }

  bool show_demo_window = true;
  ImVec4 bg_color = {0.45f, 0.55f, 0.60f, 1.00f};
  while (!glfwWindowShouldClose(main_window)) {
 
    // Poll events
    glfwPollEvents();

    // Create main frame
    ImGui_ImplOpenGL3_NewFrame();
    ImGui_ImplGlfw_NewFrame();
    ImGui::NewFrame();

    // Show demo
    ImGui::ShowDemoWindow(&show_demo_window);

    // Create the components
    for (auto component : components) {
      component->draw();
    }

    // Render
    ImGui::Render();

    // OpenGL draw (shows window)
    int display_w, display_h;
    glfwGetFramebufferSize(main_window, &display_w, &display_h);
    glViewport(0, 0, display_w, display_h);
    glClearColor(bg_color.x * bg_color.w, 
                 bg_color.y * bg_color.w, 
                 bg_color.z * bg_color.w, bg_color.w);
    glClear(GL_COLOR_BUFFER_BIT);
    ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());

    // Update and Render additional Platform Windows
    // For this specific demo app we could also call glfwMakeContextCurrent(window) directly)
    ImGuiIO& io = ImGui::GetIO();
    if (io.ConfigFlags & ImGuiConfigFlags_ViewportsEnable) {
      GLFWwindow* backup_current_context = glfwGetCurrentContext();
      ImGui::UpdatePlatformWindows();
      ImGui::RenderPlatformWindowsDefault();
      glfwMakeContextCurrent(backup_current_context);
    }

    // Swap buffers
    glfwSwapBuffers(Vaango_UIEnvironment::main_window);
  }
}
  
void 
Vaango_UIEnvironment::addUIComponent(Vaango_UIComponentBase& component)
{
  Vaango_UIComponentBase* clone = component.clone();
  d_components.push_back(clone);
}

void 
Vaango_UIEnvironment::setupImGuiStyle()
{
  ImGuiIO& io = ImGui::GetIO();
  ImGuiStyle& style = ImGui::GetStyle();

  // Enable docking amd ,ultiple viewports
  io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;
  io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable;  

  // set up scaling for fonts
  io.Fonts->AddFontFromFileTTF("assets/Fonts/static/Ruda-Bold.ttf", 15.0f);
  //bool d_autoscaleUIfromDPI = getSettings().get<bool>("layout", "autoscale", true);
  //float fontScale = d_autoscaleUIfromDPI ? d_uiEnv->getMonitorDPI()/96.0f : 1.0f;
  float fontScale = 1.0f;
  io.FontGlobalScale = fontScale;

  style.FrameRounding     = 4.0f;
  style.WindowBorderSize  = 0.0f;
  style.PopupBorderSize   = 0.0f;
  style.WindowRounding    = 4.0f;
  style.GrabRounding      = std::floor (2.f * io.FontGlobalScale);
  style.FrameRounding     = std::floor (2.f * io.FontGlobalScale);
  style.ScrollbarRounding = std::floor (2.f * io.FontGlobalScale);

  style.FramePadding.x = std::floor (6.0f * io.FontGlobalScale);
  style.FramePadding.y = std::floor (3.0f * io.FontGlobalScale);
  style.ItemSpacing.x  = std::floor (8.0f * io.FontGlobalScale);
  style.ItemSpacing.y  = std::floor (4.0f * io.FontGlobalScale);
  style.ScrollbarSize  = std::floor (16.f * io.FontGlobalScale);

  ImVec4* colors = style.Colors;
  colors[ImGuiCol_Text]                   = ImVec4(1.00f, 1.00f, 1.00f, 1.00f);
  colors[ImGuiCol_TextDisabled]           = ImVec4(0.73f, 0.75f, 0.74f, 1.00f);
  colors[ImGuiCol_WindowBg]               = ImVec4(0.09f, 0.09f, 0.09f, 0.94f);
  colors[ImGuiCol_ChildBg]                = ImVec4(0.00f, 0.00f, 0.00f, 0.00f);
  colors[ImGuiCol_PopupBg]                = ImVec4(0.08f, 0.08f, 0.08f, 0.94f);
  colors[ImGuiCol_Border]                 = ImVec4(0.20f, 0.20f, 0.20f, 0.50f);
  colors[ImGuiCol_BorderShadow]           = ImVec4(0.00f, 0.00f, 0.00f, 0.00f);
  colors[ImGuiCol_FrameBg]                = ImVec4(0.71f, 0.39f, 0.39f, 0.54f);
  colors[ImGuiCol_FrameBgHovered]         = ImVec4(0.84f, 0.66f, 0.66f, 0.40f);
  colors[ImGuiCol_FrameBgActive]          = ImVec4(0.84f, 0.66f, 0.66f, 0.67f);
  colors[ImGuiCol_TitleBg]                = ImVec4(0.47f, 0.22f, 0.22f, 0.67f);
  colors[ImGuiCol_TitleBgActive]          = ImVec4(0.47f, 0.22f, 0.22f, 1.00f);
  colors[ImGuiCol_TitleBgCollapsed]       = ImVec4(0.47f, 0.22f, 0.22f, 0.67f);
  colors[ImGuiCol_MenuBarBg]              = ImVec4(0.34f, 0.16f, 0.16f, 1.00f);
  colors[ImGuiCol_ScrollbarBg]            = ImVec4(0.02f, 0.02f, 0.02f, 0.53f);
  colors[ImGuiCol_ScrollbarGrab]          = ImVec4(0.31f, 0.31f, 0.31f, 1.00f);
  colors[ImGuiCol_ScrollbarGrabHovered]   = ImVec4(0.41f, 0.41f, 0.41f, 1.00f);
  colors[ImGuiCol_ScrollbarGrabActive]    = ImVec4(0.51f, 0.51f, 0.51f, 1.00f);
  colors[ImGuiCol_CheckMark]              = ImVec4(1.00f, 1.00f, 1.00f, 1.00f);
  colors[ImGuiCol_SliderGrab]             = ImVec4(0.71f, 0.39f, 0.39f, 1.00f);
  colors[ImGuiCol_SliderGrabActive]       = ImVec4(0.84f, 0.66f, 0.66f, 1.00f);
  colors[ImGuiCol_Button]                 = ImVec4(0.47f, 0.22f, 0.22f, 0.65f);
  colors[ImGuiCol_ButtonHovered]          = ImVec4(0.71f, 0.39f, 0.39f, 0.65f);
  colors[ImGuiCol_ButtonActive]           = ImVec4(0.20f, 0.20f, 0.20f, 0.50f);
  colors[ImGuiCol_Header]                 = ImVec4(0.71f, 0.39f, 0.39f, 0.54f);
  colors[ImGuiCol_HeaderHovered]          = ImVec4(0.84f, 0.66f, 0.66f, 0.65f);
  colors[ImGuiCol_HeaderActive]           = ImVec4(0.84f, 0.66f, 0.66f, 0.00f);
  colors[ImGuiCol_Separator]              = ImVec4(0.43f, 0.43f, 0.50f, 0.50f);
  colors[ImGuiCol_SeparatorHovered]       = ImVec4(0.71f, 0.39f, 0.39f, 0.54f);
  colors[ImGuiCol_SeparatorActive]        = ImVec4(0.71f, 0.39f, 0.39f, 0.54f);
  colors[ImGuiCol_ResizeGrip]             = ImVec4(0.71f, 0.39f, 0.39f, 0.54f);
  colors[ImGuiCol_ResizeGripHovered]      = ImVec4(0.84f, 0.66f, 0.66f, 0.66f);
  colors[ImGuiCol_ResizeGripActive]       = ImVec4(0.84f, 0.66f, 0.66f, 0.66f);
  colors[ImGuiCol_Tab]                    = ImVec4(0.71f, 0.39f, 0.39f, 0.54f);
  colors[ImGuiCol_TabHovered]             = ImVec4(0.84f, 0.66f, 0.66f, 0.66f);
  colors[ImGuiCol_TabActive]              = ImVec4(0.84f, 0.66f, 0.66f, 0.66f);
  colors[ImGuiCol_TabUnfocused]           = ImVec4(0.07f, 0.10f, 0.15f, 0.97f);
  colors[ImGuiCol_TabUnfocusedActive]     = ImVec4(0.14f, 0.26f, 0.42f, 1.00f);
  colors[ImGuiCol_PlotLines]              = ImVec4(0.61f, 0.61f, 0.61f, 1.00f);
  colors[ImGuiCol_PlotLinesHovered]       = ImVec4(1.00f, 0.43f, 0.35f, 1.00f);
  colors[ImGuiCol_PlotHistogram]          = ImVec4(0.90f, 0.70f, 0.00f, 1.00f);
  colors[ImGuiCol_PlotHistogramHovered]   = ImVec4(1.00f, 0.60f, 0.00f, 1.00f);
  colors[ImGuiCol_TextSelectedBg]         = ImVec4(0.26f, 0.59f, 0.98f, 0.35f);
  colors[ImGuiCol_DragDropTarget]         = ImVec4(1.00f, 1.00f, 0.00f, 0.90f);
  colors[ImGuiCol_NavHighlight]           = ImVec4(0.41f, 0.41f, 0.41f, 1.00f);
  colors[ImGuiCol_NavWindowingHighlight]  = ImVec4(1.00f, 1.00f, 1.00f, 0.70f);
  colors[ImGuiCol_NavWindowingDimBg]      = ImVec4(0.80f, 0.80f, 0.80f, 0.20f);
  colors[ImGuiCol_ModalWindowDimBg]       = ImVec4(0.80f, 0.80f, 0.80f, 0.35f);
}
