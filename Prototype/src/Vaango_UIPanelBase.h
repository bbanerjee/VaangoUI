#ifndef __Vaango_UI_PANEL_H__
#define __Vaango_UI_PANEL_H__

#include <Vaango_UIBase.h>

namespace VaangoUI {

class Vaango_UIPanelBase 
{
public:

  Vaango_UIPanelBase()
    : d_isVisible(true)
  {
  }

  virtual ~Vaango_UIPanelBase() = default;

public:

  virtual void init(Vaango_UIBase* mainUI)
  {
    d_mainUI = mainUI;
  }

  virtual void draw(const std::string& title,
                    int width, int height) = 0;

  void isVisible(bool flag)
  {
    d_isVisible = flag;
  }

public:

  bool d_isVisible;

protected:

  Vaango_UIBase* d_mainUI;

};

} // namespace VaangoUI

#endif //__Vaango_UI_PANEL_H__