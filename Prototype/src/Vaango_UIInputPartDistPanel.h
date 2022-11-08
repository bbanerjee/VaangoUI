#ifndef __Vaango_UI_INPUT_PART_DIST_PANEL_H__
#define __Vaango_UI_INPUT_PART_DIST_PANEL_H__

#include <Vaango_UIPanelBase.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UIInputPartDistPanel : public Vaango_UIPanelBase
{
public:

  Vaango_UIInputPartDistPanel()
  {
    d_isVisible = false;
  }

  virtual ~Vaango_UIInputPartDistPanel()
  {
  } 

public:

  void draw(const std::string& title, int width, int height)
  {
    ImGui::BeginChild("create particles", ImVec2(0, 0));
    ImGui::EndChild();
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_INPUT_PART_DIST_PANEL_H__