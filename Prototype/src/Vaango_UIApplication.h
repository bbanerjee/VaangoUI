#ifndef __VAANGO_UIAPPLICATION_H__
#define __VAANGO_UIAPPLICATION_H__

#include <Vaango_UIEnvironment.h>
#include <Vaango_UIComponentBase.h>

#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <vector>

namespace VaangoUI {

class Vaango_UIApplication {
  public:

    static void startAndRun();

    Vaango_UIApplication() = delete;
    ~Vaango_UIApplication() = delete;

    Vaango_UIApplication( const Vaango_UIApplication & )            = delete;
    Vaango_UIApplication& operator=( const Vaango_UIApplication & ) = delete;
    Vaango_UIApplication( Vaango_UIApplication && )                 = delete;
    Vaango_UIApplication& operator=( Vaango_UIApplication && )      = delete;
};

} // end namespace VaangoUI

#endif // __VAANGO_UIAPPLICATION_H__