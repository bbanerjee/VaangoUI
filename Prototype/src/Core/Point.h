#ifndef __Vaango_UI_POINT_H__
#define __Vaango_UI_POINT_H__

#include <Core/Enums.h>

namespace VaangoUI {

struct Point {

  double x = 0.0;
  double y = 0.0;
  double z = 0.0;

  Point()
  {
  }

  Point(double xCoord, double yCoord, double zCoord) 
    : x(xCoord), y(yCoord), z(zCoord)
  {
  }

  Point(const Point& pt) 
    : x(pt.x), y(pt.y), z(pt.z)
  {
  }

  // Translate a point to get another point
  Point translate(double xTrans, double yTrans, double zTrans) {
    return Point(x+xTrans, y+yTrans, z+zTrans);
  }
  
  // Find if any of the components of a point are less than another point
  bool isLessThan(const Point& pt) const
  {
    return (x < pt.x) || (y < pt.y) || (z < pt.z);
  }

  // Find if any of the components of a point are greater than another point
  bool isGreaterThan(const Point& pt) const
  {
    return (x > pt.x) || (y > pt.y) || (z > pt.z);
  }

  // Print the point data
  friend std::ostream& operator<< (std::ostream &out, const Point& data) {
    out << "[" << data.x << ", " << data.y << ", " << data.z << "]"; 
    return out;
  }
};

} // end namespace VaangoUI

#endif //__Vaango_UI_POINT_H__
