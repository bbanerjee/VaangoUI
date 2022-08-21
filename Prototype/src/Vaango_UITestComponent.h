#ifndef __Vaango_UI_TEST_COMPONENT_H__
#define __Vaango_UI_TEST_COMPONENT_H__

#include <Vaango_UIComponentBase.h>

#include <imgui.h>

namespace VaangoUI {

class Vaango_UITestComponent final : public Vaango_UIComponentBase
{
public:

  Vaango_UITestComponent(const std::string& title,
                         int width, int height)
    : Vaango_UIComponentBase(title, width, height)
  {
  }

  ~Vaango_UITestComponent()
  {
  } 

  // Virtual constuctor (default constructor used)
  Vaango_UITestComponent* create(const std::string& title,
                                 int width, int height) const override
  {
    return new Vaango_UITestComponent(title, width, height);
  }

  // Virtual constuctor (copy constructor used)
  Vaango_UITestComponent* clone() const override
  {
    return new Vaango_UITestComponent(*this);
  }

public:

  void draw() override
  {
    if (ImGui::Begin(d_title.c_str(), &d_isVisible, 0)) {
      ImGui::End();
    }
  }

};

} // namespace VaangoUI

#endif //__Vaango_UI_TEST_COMPONENT_H__