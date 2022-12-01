#ifndef __VAANGO_UI_UTILS_GOBAG_H__
#define __VAANGO_UI_UTILS_GOBAG_H__

#include <Core/Point.h>
#include <Utils/nanoflann.hpp>
#include <memory>

namespace VaangoUI {

/* linspace function */
template <typename T,
          std::enable_if_t<std::is_arithmetic_v<T>, bool> = true>
std::vector<T>
linspace(T start, T end, int num)
{
  std::vector<T> linspaced;
  if (num > 0) { 
    double delta = static_cast<double>(end - start) / static_cast<double>(num);
    for (int i = 0; i < num + 1; ++i) { 
      double val = start + delta * static_cast<double>(i);
      if (std::is_integral_v<T>) {
        linspaced.push_back(static_cast<T>(std::round(val)));
      } else {
        linspaced.push_back(static_cast<T>(val));
      }
    }
  }
  return linspaced;
}

} // end namespace VaangoUI

#endif // __VAANGO_UI_UTILS_GOBAG_H__
