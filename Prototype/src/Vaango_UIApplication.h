#ifndef __VAANGO_UIAPPLICATION_H__
#define __VAANGO_UIAPPLICATION_H__

namespace VaangoUI {

class Vaango_UIApplication {
  public:

    static void initialize();

    Vaango_UIApplication() = delete;
    ~Vaango_UIApplication() = delete;

    Vaango_UIApplication( const Vaango_UIApplication & )            = delete;
    Vaango_UIApplication& operator=( const Vaango_UIApplication & ) = delete;
    Vaango_UIApplication( Vaango_UIApplication && )                 = delete;
    Vaango_UIApplication& operator=( Vaango_UIApplication && )      = delete;
};

} // end namespace VaangoUI

#endif // __VAANGO_UIAPPLICATION_H__