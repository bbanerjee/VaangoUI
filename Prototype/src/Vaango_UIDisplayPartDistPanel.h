#ifndef __Vaango_UI_DISPLAY_PART_DIST_PANEL_H__
#define __Vaango_UI_DISPLAY_PART_DIST_PANEL_H__

#include <Vaango_UIPanelBase.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UIDisplayPartDistPanel : public Vaango_UIPanelBase
{
public:

  Vaango_UIDisplayPartDistPanel()
  {
    d_isVisible = false;
  }

  virtual ~Vaango_UIDisplayPartDistPanel()
  {
  } 

public:

  void draw(const std::string& title, int width, int height)
  {
    ImGui::BeginChild("display particle distribution", ImVec2(0, 0));
    ImGui::EndChild();
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_DISPLAY_PART_DIST_PANEL_H__