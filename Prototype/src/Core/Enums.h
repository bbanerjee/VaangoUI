#ifndef __Vaango_UI_ENUMS_H__
#define __Vaango_UI_ENUMS_H__

#include <iostream>
#include <type_traits>

namespace VaangoUI {

  enum class ParticleShape {
    CIRCLE,
    HOLLOW_CIRCLE,
    SPHERE,
    HOLLOW_SPHERE
  };

  struct VoronoiFlags {
    static bool ONHULL;
    static bool REMOVED;
    static bool VISIBLE;
    static bool PROCESSED;
  };

  bool VoronoiFlags::ONHULL = true;
  bool VoronoiFlags::REMOVED = true;
  bool VoronoiFlags::VISIBLE = true;
  bool VoronoiFlags::PROCESSED = true;

  // Code from: https://stackoverflow.com/questions/11421432/how-can-i-output-the-value-of-an-enum-class-in-c11
  template<typename T>
  std::ostream& operator<<(typename std::enable_if<std::is_enum<T>::value, 
                           std::ostream>::type& stream, const T& e)
  {
    return stream << static_cast<typename std::underlying_type<T>::type>(e);
  }

} // end namespace VaangoUI

#endif //__Vaango_UI_ENUMS_H__
