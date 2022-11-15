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

  Vertex d_vertex[3];
  Edge d_edge[3];
  bool d_visible; // True if face is visible from new point

public:

  Face(); 

  Face(const Vertex& v1, const Vertex& v2, const Vertex& v3);

  Face(const Vertex& v1, const Vertex& v2, const Vertex& v3, 
       const Edge& e12, const Edge& e23, const Edge& e31);

  Face(const Face& f);

  const Vertex& vertex(int index) const;
  void vertex(int index, const Vertex& v);

  const Edge& edge(int index) const;
  void edge(int index, const Edge& e);

  bool visible() const;
  void visible(bool flag);

  /**
   *  Find if the face is a "top" face, i.e., if the outward pointing normal
   *  to the face points upward (has a +ve dot product with the z-axis vector)
   */
  bool topFace(const Face& face);
  
  /**
   * Calculate the location of the Voronoi vertex for this face
   * (the center of the circumcircle)
   */
  void getVoronoiVertex(const Face& face, Vertex& v) const;

  friend std::ostream& operator<< (std::ostream &out, const Edge& data);

};

} // end namespace VaangoUI

#endif //__Vaango_UI_FACE_H__