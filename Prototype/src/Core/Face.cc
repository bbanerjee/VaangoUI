#include <Core/Vertex.h>
#include <Core/Edge.h>
#include <Core/Face.h>

namespace VaangoUI {

  Face::Face() 
    : d_vertex(), 
      d_edge(),
      d_visible(false) {}

  Face::Face(const Vertex& v1, const Vertex& v2, const Vertex& v3) 
    : d_vertex({v1, v2, v3}), 
      d_edge(),
      d_visible(false) {}

  Face::Face(const Vertex& v1, const Vertex& v2, const Vertex& v3, 
             const Edge& e12, const Edge& e23, const Edge& e31) 
    : d_vertex({v1, v2, v3}), 
      d_edge({e12, e23, e31}),
      d_visible(false) {}

  Face::Face(const Face& f) 
    : d_vertex({f.d_vertex[0], f.d_vertex[1], f.d_vertex[2]}), 
      d_edge({f.d_edge[0], f.d_edge[1], f.d_edge[2]}),
      d_visible(f.d_visible) {}

  const Vertex& 
  Face::vertex(int index) const { return d_vertex[index]; }
  void 
  Face::vertex(int index, const Vertex& v) { d_vertex[index] = v; }

  const Edge& 
  Face::edge(int index) const { return d_edge[index]; }
  void 
  Face::edge(int index, const Edge& e) { d_edge[index] = e; }

  bool 
  Face::visible() const {return d_visible;}
  void 
  Face::visible(bool flag) {d_visible = flag;}

  /**
   *  Find if the face is a "top" face, i.e., if the outward pointing normal
   *  to the face points upward (has a +ve dot product with the z-axis vector)
   */
  bool 
  Face::topFace(const Face& face) {
    long ax = face.vertex(0).v(0); long ay = face.vertex(0).v(1);
    //long az = face.vertex(0].v(2);
    long bx = face.vertex(1).v(0); long by = face.vertex(1).v(1);
    //long bz = fac.vertex(1).v(2);
    long cx = face.vertex(2).v(0); long cy = face.vertex(2).v(1);
    //long cz = face.vertex(2).v(2);
    long A0 = bx - ax;
    long A1 = by - ay;
    //long A2 = bz - az;
    long B0 = cx - ax;
    long B1 = cy - ay;
    //long B2 = cz - az;
    //long AxB_i = A1*B2-A2*B1;
    //long AxB_j = A2*B0-A0*B2;
    long AxB_k = A0*B1-A1*B0;
    long AxBdotZ = AxB_k;
    if (AxBdotZ > 0) return true;
    return false;
  }
  
  /**
   * Calculate the location of the Voronoi vertex for this face
   * (the center of the circumcircle)
   */
  void 
  Face::getVoronoiVertex(const Face& face, Vertex& v) const {
    long a0 = face.vertex(0).v(0); long a1 = d_vertex[0].v(1);
    long b0 = face.vertex(1).v(0); long b1 = d_vertex[1].v(1);
    long c0 = face.vertex(2).v(0); long c1 = d_vertex[2].v(1);
    long D = 2*(a1*c0+b1*a0-b1*c0-a1*b0-c1*a0+c1*b0);
    if (D != 0) {
      long p0 = (b1*a0*a0 - c1*a0*a0 - b1*b1*a1 + c1*c1*a1 +
                 b0*b0*c1 + a1*a1*b1 + c0*c0*a1 - c1*c1*b1 -
                 c0*c0*b1 - b0*b0*a1 + b1*b1*c1 - a1*a1*c1)/D;
      long p1 = (a0*a0*c0 + a1*a1*c0 + b0*b0*a0 - b0*b0*c0 +
                 b1*b1*a0 - b1*b1*c0 - a0*a0*b0 - a1*a1*b0 -
                 c0*c0*a0 + c0*c0*b0 - c1*c1*a0 + c1*c1*b0)/D;
      v = Vertex(p0, p1, 0);
    } else {
      v = Vertex(0, 0, 0);
    }
  }

  std::ostream& operator<< (std::ostream &out, const Face& data) {
    out << "v1 = " << data.vertex(0) << " v2 = " << data.vertex(1)
        << " v3 = " << data.vertex(2)
        << " e1 = " << data.edge(0) << " e2 = " << data.edge(1)
        << " e3 = " << data.edge(2) <<  " visible = " << data.visible();
    return out;
  }

} // end namespace VaangoUI