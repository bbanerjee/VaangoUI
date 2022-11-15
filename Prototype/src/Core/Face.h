#ifndef __Vaango_UI_FACE_H__
#define __Vaango_UI_FACE_H__

#include <Core/Point.h>
#include <Core/Enums.h>

#include <vector>

namespace VaangoUI {

// forward declarations
class Vertex;
class Edge;

// Triangular face only
class Face {

private:

  Vertex* d_vertex[3];
  Edge* d_edge[3];
  bool d_visible; // True if face is visible from new point

public:

  Face(); 

  Face(Vertex* v1, Vertex* v2, Vertex* v3);

  Face(Vertex* v1, Vertex* v2, Vertex* v3, 
       Edge* e12, Edge* e23, Edge* e31);

  Face(const Face& f);

  Vertex* vertex(int index) const;
  void vertex(int index, Vertex* v);

  Edge* edge(int index) const;
  void edge(int index, Edge* e);

  bool visible() const;
  void visible(bool flag);

  friend std::ostream& operator<< (std::ostream &out, const Edge& data);

};

} // end namespace VaangoUI

#endif //__Vaango_UI_FACE_H__