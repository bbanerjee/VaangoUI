#include <Vaango_UIOcctWindow.h>

//IMPLEMENT_STANDARD_RTTIEXT(Vaango_UIOcctWindow, Aspect_Window)

#define GLFW_EXPOSE_NATIVE_X11
#define GLFW_EXPOSE_NATIVE_GLX

#include <GLFW/glfw3.h>
#include <GLFW/glfw3native.h>

#include <stdexcept>
#include <iostream>

Vaango_UIOcctWindow::Vaango_UIOcctWindow(GLFWwindow* window)
{
  if (window != nullptr) {

    int aWidth = 0, aHeight = 0;
    glfwGetWindowPos (window, &d_xLeft, &d_yTop);
    glfwGetWindowSize(window, &aWidth, &aHeight);
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
Vaango_UIOcctWindow::Close(GLFWwindow* window)
{
}

Aspect_Drawable 
Vaango_UIOcctWindow::NativeHandle(GLFWwindow* window) const
{
  return (Aspect_Drawable) glfwGetX11Window(window);
}

Aspect_RenderingContext 
Vaango_UIOcctWindow::NativeGlContext(GLFWwindow* window) const
{
  return glfwGetGLXContext(window);
}

Standard_Boolean 
Vaango_UIOcctWindow::IsMapped(GLFWwindow* window) const
{
  return glfwGetWindowAttrib(window, GLFW_VISIBLE) != 0;
}

void Vaango_UIOcctWindow::Map(GLFWwindow* window) const 
{
  glfwShowWindow(window);
}

void Vaango_UIOcctWindow::Unmap(GLFWwindow* window) const
{
  glfwHideWindow(window);
}

//! Apply the resizing to the window <me>.
Aspect_TypeOfResize 
Vaango_UIOcctWindow::DoResize(GLFWwindow* window) 
{
  if (glfwGetWindowAttrib (window, GLFW_VISIBLE) == 1) {

    int x_pos = 0, y_pos = 0, width = 0, height = 0;
    glfwGetWindowPos (window, &x_pos, &y_pos);
    glfwGetWindowSize(window, &width, &height);
    d_xLeft   = x_pos;
    d_xRight  = x_pos + width;
    d_yTop    = y_pos;
    d_yBottom = y_pos + height;
  }
  return Aspect_TOR_UNKNOWN;
}

Graphic3d_Vec2i 
Vaango_UIOcctWindow::CursorPosition(GLFWwindow* window) const
{
  Graphic3d_Vec2d pos;
  glfwGetCursorPos(window, &pos.x(), &pos.y());
  return Graphic3d_Vec2i(static_cast<int>(pos.x()), static_cast<int>(pos.y()));
}
