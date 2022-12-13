#ifndef __VAANGO_UI_OCCT_WINDOW_H__
#define __VAANGO_UI_OCCT_WINDOW_H__

#include <Aspect_Window.hxx>
#include <Aspect_DisplayConnection.hxx>
#include <Aspect_RenderingContext.hxx>
#include <Graphic3d_Vec.hxx>
#include <Standard_Macro.hxx>
#include <TCollection_AsciiString.hxx>

// forward declaration of glfw window
struct GLFWwindow;

//! GLFWwindow wrapper implementing Aspect_Window interface
class Vaango_UIOcctWindow : public Aspect_Window
{
  DEFINE_STANDARD_RTTIEXT(Vaango_UIOcctWindow, Aspect_Window)

public:

  explicit Vaango_UIOcctWindow(GLFWwindow* window);

  virtual ~Vaango_UIOcctWindow() {};

  void Close();

  const Handle(Aspect_DisplayConnection)& GetDisplay() const 
  { 
    return d_display; 
  }

  GLFWwindow* getGlfwWindow() 
  { 
    return d_GlfwWindow; 
  }

  Aspect_RenderingContext NativeGlContext() const;

  Graphic3d_Vec2i CursorPosition() const;

public:

  virtual Aspect_Drawable NativeHandle() const override;

  virtual Aspect_Drawable NativeParentHandle() const override
  {
    return 0;
  }

  virtual Aspect_TypeOfResize DoResize() override;

  virtual Standard_Boolean IsMapped() const override;

  virtual Standard_Boolean DoMapping() const override
  {
    return Standard_True;
  }

  virtual void Map() const override;

  virtual void Unmap() const override;

  virtual void Position(Standard_Integer& x1, Standard_Integer& y1, 
                        Standard_Integer& x2, Standard_Integer& y2) const override
  {
    x1 = d_xLeft;
    x2 = d_xRight;
    y1 = d_yTop;
    y2 = d_yBottom;
  }

  virtual Standard_Real Ratio() const override
  {
    return Standard_Real (d_xRight - d_xLeft) / Standard_Real (d_yBottom - d_yTop);
  }

  virtual void Size(Standard_Integer& width, Standard_Integer& height) const override
  {
    width = d_xRight - d_xLeft;
    height = d_yBottom - d_yTop;
  }

  virtual Aspect_FBConfig NativeFBConfig() const override
  {
    return nullptr;
  }

protected:

  Handle(Aspect_DisplayConnection) d_display;
  GLFWwindow*      d_GlfwWindow;
  Standard_Integer d_xLeft;
  Standard_Integer d_xRight;
  Standard_Integer d_yTop;
  Standard_Integer d_yBottom;

};

#endif // __VAANGO_UI_OCCT_WINDOW_H__
