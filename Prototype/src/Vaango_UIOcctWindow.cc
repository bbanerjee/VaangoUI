#include <Vaango_UIOcctWindow.h>

IMPLEMENT_STANDARD_RTTIEXT(Vaango_UIOcctWindow, Aspect_Window)

#define GLFW_EXPOSE_NATIVE_X11
#define GLFW_EXPOSE_NATIVE_GLX

#include <GLFW/glfw3.h>
#include <GLFW/glfw3native.h>

#include <stdexcept>
#include <iostream>

Vaango_UIOcctWindow::Vaango_UIOcctWindow(GLFWwindow* window)
{
  d_GlfwWindow = window;
  if (d_GlfwWindow != nullptr) {

    int aWidth = 0, aHeight = 0;
    glfwGetWindowPos (d_GlfwWindow, &d_xLeft, &d_yTop);
    glfwGetWindowSize(d_GlfwWindow, &aWidth, &aHeight);
    d_xRight  = d_xLeft + aWidth;
    d_yBottom = d_yTop + aHeight;

    auto x11Display = glfwGetX11Display();
    if (x11Display != nullptr) {
      d_display = new Aspect_DisplayConnection(reinterpret_cast<Aspect_XDisplay*>(x11Display));
    } else {
      throw std::runtime_error("**ERROR** Could not get X11 display for OCCT");
    }
  } 
}

void
Vaango_UIOcctWindow::Close()
{
}

Aspect_Drawable 
Vaango_UIOcctWindow::NativeHandle() const
{
  return (Aspect_Drawable) glfwGetX11Window(d_GlfwWindow);
}

Aspect_RenderingContext 
Vaango_UIOcctWindow::NativeGlContext() const
{
  return glfwGetGLXContext(d_GlfwWindow);
}

Standard_Boolean 
Vaango_UIOcctWindow::IsMapped() const
{
  return glfwGetWindowAttrib(d_GlfwWindow, GLFW_VISIBLE) != 0;
}

void Vaango_UIOcctWindow::Map() const 
{
  glfwShowWindow(d_GlfwWindow);
}

void Vaango_UIOcctWindow::Unmap() const
{
  glfwHideWindow(d_GlfwWindow);
}

//! Apply the resizing to the window <me>.
Aspect_TypeOfResize 
Vaango_UIOcctWindow::DoResize() 
{
  if (glfwGetWindowAttrib (d_GlfwWindow, GLFW_VISIBLE) == 1) {

    int x_pos = 0, y_pos = 0, width = 0, height = 0;
    glfwGetWindowPos (d_GlfwWindow, &x_pos, &y_pos);
    glfwGetWindowSize(d_GlfwWindow, &width, &height);
    d_xLeft   = x_pos;
    d_xRight  = x_pos + width;
    d_yTop    = y_pos;
    d_yBottom = y_pos + height;
  }
  return Aspect_TOR_UNKNOWN;
}

Graphic3d_Vec2i 
Vaango_UIOcctWindow::CursorPosition() const
{
  Graphic3d_Vec2d pos;
  glfwGetCursorPos(d_GlfwWindow, &pos.x(), &pos.y());
  return Graphic3d_Vec2i(static_cast<int>(pos.x()), static_cast<int>(pos.y()));
}
