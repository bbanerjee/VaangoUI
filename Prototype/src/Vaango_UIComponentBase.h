#ifndef __Vaango_UI_COMPONENT_H__
#define __Vaango_UI_COMPONENT_H__

#include <glad/glad.h>

#include <string>
#include <iostream>

namespace VaangoUI {

struct Vaango_UIIcon
{
  unsigned int id;
  int width;
  int height;
};

class Vaango_UIComponentBase
{
public:
  Vaango_UIComponentBase(const std::string& title, int width, int height)
    : d_title(title)
    , d_width(width)
    , d_height(height)
    , d_isVisible(true)
  {
  }

  virtual ~Vaango_UIComponentBase() {}

  // Virtual constuctor (default constructor used)
  virtual Vaango_UIComponentBase* create(const std::string& title, int width,
                                         int height) const = 0;

  // Virtual constuctor (copy constructor used)
  virtual Vaango_UIComponentBase* clone() const = 0;

public:

  virtual void draw() = 0;

protected:

  Vaango_UIIcon creatIconTextureFromImageFile(const std::string& fileName);

protected:

  std::string d_title;
  int d_width;
  int d_height;
  bool d_isVisible;
};

} // namespace VaangoUI

#endif //__Vaango_UI_COMPONENT_H__