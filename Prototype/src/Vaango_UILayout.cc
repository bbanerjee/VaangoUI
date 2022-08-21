#include <Vaango_UILayout.h>
#include <Vaango_UIConsolePanel.h>

namespace VaangoUI {

Vaango_UILayout::Vaango_UILayout(GLFWwindow* mainWindow,
                                 const std::string& settingsFile)
  : Vaango_UIBase(settingsFile),
    d_mainWindow(mainWindow),
    d_isInitialized(false),
    d_settingsFileName(settingsFile)
{
}

Vaango_UILayout::~Vaango_UILayout()
{
  getSettings().dump(d_settingsFileName);
}

void 
Vaango_UILayout::draw(AIS_InteractiveContext* context,
                      V3d_View* view,
                      const bool hasFocus)
{
  Vaango_UIBase::draw(context, view, hasFocus);
  init(context, view);

}

void 
Vaango_UILayout::init(AIS_InteractiveContext* context,
                    V3d_View* view)
{
  if (d_isInitialized) return;

  // set flag to prevent reinitialization
  d_isInitialized = true; 

  // create panels
  d_panels["Console"].reset(new Vaango_UIConsolePanel());

  // Redirect stdout/stderr to console
  static_cast<Vaango_UIConsolePanel*>(this->getPanel("Console"))->redirectStdoutToMessageConsole();
  std::cout << "**Testing** Application started\n";
  
}

} // namespace VaangoUI
