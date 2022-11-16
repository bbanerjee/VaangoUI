#ifndef __Vaango_UI_VERTEX_H__
#define __Vaango_UI_VERTEX_H__

#include <Core/Point.h>
#include <Core/Enums.h>

#include <algorithm>
#include <vector>

namespace VaangoUI {

// forward declarations
class Edge;

class Vertex 
{

private:

  std::vector<long> d_v;
  Edge* d_duplicate; // Pointer to incident cone edge
  bool d_onHull; // True if vertex is on hull
  bool d_mark;   // True if vertex is already processed

public:

  Vertex(); 

  Vertex(long x, long y, long z);

  Vertex(const Vertex& v);

  Vertex(const Point& pt);

  long v(int index) const;

  double x() const;
  double y() const;
  double z() const;

  void set(const Point& pt);

  void set(const Vertex& v);

  bool onHull() const;
  void onHull(bool flag);

  bool isMarked() const;
  void mark(bool flag);

  Edge* duplicate() const;
  void duplicate(Edge* e);

  long mapToInt(double val) const;

  double mapToDouble(long val) const;

  friend bool operator==(const Vertex& l, const Vertex& r)
  {
    bool val = std::lexicographical_compare(l.d_v.begin(), l.d_v.end(),
                                            r.d_v.begin(), r.d_v.end());
    return !val;
  }

  friend std::ostream& operator<< (std::ostream &out, const Vertex& data); 

};

} // end namespace VaangoUI

#endif //__Vaango_UI_VERTEX_H__