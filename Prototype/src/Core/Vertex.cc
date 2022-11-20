#include <Core/Vertex.h>
#include <Core/Edge.h>

namespace VaangoUI {

Vertex::Vertex() 
  : d_v({0, 0, 0}), 
    d_onHull(false),
    d_mark(false) {}

Vertex::Vertex(long x, long y, long z) 
  : d_v({x, y, z}),
    d_onHull(false),
    d_mark(false) {}

Vertex::Vertex(const Vertex& v) 
  : d_v({mapToInt(v.x()), mapToInt(v.y()), mapToInt(v.z())}), 
    d_onHull(false),
    d_mark(false) {}

Vertex::Vertex(const Point& pt) 
  : d_v({mapToInt(pt.x), mapToInt(pt.y), mapToInt(pt.z)}), 
    d_onHull(false),
    d_mark(false) {}

long 
Vertex::v(int index) const { return d_v[index]; }

double 
Vertex::x() const { return mapToDouble(d_v[0]); }
double 
Vertex::y() const { return mapToDouble(d_v[1]); }
double 
Vertex::z() const { return mapToDouble(d_v[2]); }

void 
Vertex::set(const Point& pt) {
  d_v[0] = mapToInt(pt.x); 
  d_v[1] = mapToInt(pt.y); 
  d_v[2] = mapToInt(pt.z*pt.z+pt.y*pt.y);
}

void 
Vertex::set(const Vertex& v) {
  d_v[0] = v.x(); d_v[1] = v.y(); d_v[2] = v.z();
}

bool 
Vertex::onHull() const {return d_onHull;}
void 
Vertex::onHull(bool flag) {d_onHull = flag;}

bool 
Vertex::isMarked() const {return d_mark;}
void 
Vertex::mark(bool flag) {d_mark = flag;}

Edge* 
Vertex::duplicate() const { return d_duplicate; }

void 
Vertex::duplicate(Edge* e) { d_duplicate = e; }

long 
Vertex::mapToInt(double val) const {
  double max = 10000.0;
  return ((long) (val*max));
}

double 
Vertex::mapToDouble(long val) const {
  double max = 10000.0;
  return ((double) val/max);
}

std::ostream& operator<< (std::ostream &out, const Vertex& data) {
  out << "(" << data.x() << "," << data.y() << "," << data.z() << ") "
      << " Onhull = " << data.onHull() << " Marked = " << data.isMarked()
      << " Duplic = " << data.duplicate();
  return out;
}

} // end namespace VaangoUI
