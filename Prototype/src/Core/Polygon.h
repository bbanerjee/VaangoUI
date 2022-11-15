#ifndef __Vaango_UI_POLYGON_H__
#define __Vaango_UI_POLYGON_H__

#include <Core/Point.h>

#include <vector>

namespace VaangoUI {

template<typename T>
class Polygon {
  
private:

  std::vector<T> d_x;
  std::vector<T> d_y;
  int d_nPts;

public:

  Polygon() 
    : d_nPts(0) {}

  Polygon(const std::vector<T>& x, const std::vector<T>& y, int nPts) 
    : d_nPts(nPts) 
  {
    for (int ii = 0; ii < nPts; ii++) {
      d_x.push_back(x[ii]);
      d_y.push_back(y[ii]);
    }
  }

  int nofPoints() {
    return d_nPts;
  }

  T x(int index) { return d_x[index]; }
  T y(int index) { return d_y[index]; }

  void add(T x, T y) {
    d_x.push_back(x);
    d_y.push_back(y);
    ++d_nPts;
  }

  friend std::ostream& operator<< (std::ostream &out, const Polygon<T>& data) {
    out << "NofPts = " << data.d_nPts << " ";
    for (int ii = 0; ii < data.d_nPts; ii++) {
      out << "x = " << data.d_x[ii] << " y = " << data.d_y[ii];
    }
    return out;
  }

};

} // end namespace VaangoUI

#endif //__Vaango_UI_POLYGON_H__