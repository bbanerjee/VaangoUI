#ifndef __Vaango_UI_DRAW_H__
#define __Vaango_UI_DRAW_H__

#include <Vaango_UIBase.h>
#include <imgui.h>
#include <memory>

#include <glad/glad.h>
#include <GLFW/glfw3.h>


namespace VaangoUI {

class Vaango_UIPanelBase;

class Vaango_UILayout : public Vaango_UIBase
{
public:

  Vaango_UILayout(GLFWwindow* mainWindow,
                  const std::string& settingsFile);

  virtual ~Vaango_UILayout();

protected:

  virtual bool isViewVisible() override
  {
    //return !ImGui::IsPopupOpen();
    return true;
  }

  virtual void addMessageToConsole(const char* message) override {};

  virtual void draw(AIS_InteractiveContext* context,
                    V3d_View* view,
                    const bool hasFocus) override;

private:

  void init(AIS_InteractiveContext* context,
            V3d_View* view);

  Vaango_UIPanelBase* getPanel(const std::string& id_string) 
  {
    auto panel_iter = d_panels.find(id_string.c_str());
    if (panel_iter == d_panels.end()) {
      throw std::runtime_error("Could not find VaangoUI panel " + id_string);
    }
    return panel_iter->second.get();
  }

private:

  GLFWwindow* d_mainWindow;
  std::map<std::string, std::unique_ptr<Vaango_UIPanelBase>> d_panels;
  bool d_isInitialized;
  bool d_autoscaleUIfromDPI = true;
  bool d_isViewVisible = true;
  std::string d_settingsFileName;

};

} // namespace VaangoUI

#endif //__Vaango_UI_DRAW_H__
