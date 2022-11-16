#include <Core/Vertex.h>
#include <Core/Edge.h>
#include <Core/Face.h>

namespace VaangoUI {

Edge::Edge() 
{
  d_endPts.reserve(2); 
  d_adjFace.reserve(2);
  d_delete = false; 
}

Edge::Edge(Vertex* start, Vertex* end, 
           Face* left, Face* right) 
{
  d_endPts = {start, end};
  d_adjFace = {left, right};
  d_delete = false; 
}

Edge::Edge(const Edge& e) 
{
  d_endPts = {e.start(), e.end()};
  d_adjFace = {e.left(), e.right()};
  d_newFace = e.d_newFace;
  d_delete = e.d_delete; 
}

Vertex* 
Edge::start() const {
  return d_endPts[0];
}

Vertex* 
Edge::end() const {
  return d_endPts[1];
}

Face* 
Edge::left() const {
  return d_adjFace[0];
}

Face* 
Edge::right() const {
  return d_adjFace[1];
}

Vertex* 
Edge::endPt(int index) const { return d_endPts[index]; }
void 
Edge::endPt(int index, Vertex* v) { d_endPts[index] = v; }

Face* 
Edge::adjFace(int index) const { return d_adjFace[index]; }
void 
Edge::adjFace(int index, Face* f) { d_adjFace[index] = f; }

Face* 
Edge::newFace() const { return d_newFace; }
void 
Edge::newFace(Face* f) { d_newFace = f; }

bool 
Edge::remove() const {return d_delete;}
void 
Edge::remove(bool flag) {d_delete = flag;}

std::ostream& operator<< (std::ostream &out, const Edge& data) {
  out << "v1 = " << data.start() << " v2 = " << data.end()
      << " f1 = " << data.left()  << " f2 = " << data.right()
      << " newFace = " << data.newFace() 
      << " delete = " << data.remove();
  return out;
}

void 
Edge::printFaceOrientation() const {

  // Endpoints of the edge should be in opposite order in the
  // adjacent face
  std::cout << "Face 1 :";
  for (int ii = 0; ii < 3; ii++) {
    if (this == left()->edge(ii)) {
      std::cout << " Edge :" << ii;
      std::cout << " (" << adjFace(0)->vertex(0)->x() <<
              "," << adjFace(0)->vertex(0)->y() <<");";
      std::cout << " (" << adjFace(0)->vertex(1)->x() <<
              "," << adjFace(0)->vertex(1)->y() <<");";
      std::cout << " (" << adjFace(0)->vertex(2)->x() <<
              "," << adjFace(0)->vertex(2)->y() <<");";
      std::cout << "\n";
    }
  }
  std::cout << "Face 2 :";
  for (int ii = 0; ii < 3; ii++) {
    if (this == right()->edge(ii)) {
      std::cout << " Edge :" << ii;
      std::cout << " (" << adjFace(1)->vertex(0)->x() <<
              "," << adjFace(1)->vertex(0)->y() <<");";
      std::cout << " (" << adjFace(1)->vertex(1)->x() <<
              "," << adjFace(1)->vertex(1)->y() <<");";
      std::cout << " (" << adjFace(1)->vertex(2)->x() <<
              "," << adjFace(1)->vertex(2)->y() <<");";
      std::cout << "\n";
    }
  }
}

bool 
Edge::checkFaceOrientation() const {

  // Endpoints of the edge should be in opposite order in the
  // adjacent face
  Vertex* v1 = nullptr;
  Vertex* v2 = nullptr;
  Vertex* v3 = nullptr;
  Vertex* v4 = nullptr;
  for (int ii = 0; ii < 3; ii++) {
    if (adjFace(0)->edge(ii) == this) {
      v1 = adjFace(0)->vertex(ii);
      v2 = adjFace(0)->vertex((ii+1)%3);
    }
  if (adjFace(1)->edge(ii) == this) {
    v3 = adjFace(1)->vertex(ii);
    v4 = adjFace(1)->vertex((ii+1)%3);
  }
  }
  if (v1 == v4 && v2 == v3) return true;
  return false;
}

} // end namespace VaangoUI
