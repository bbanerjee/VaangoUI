#include <Core/Vertex.h>
#include <Core/Edge.h>
#include <Core/Face.h>

namespace VaangoUI {

Face::Face() 
{ 
  d_visible = false; 
}

Face::Face(Vertex* v1, Vertex* v2, Vertex* v3) 
{
  d_vertex[0] = v1; d_vertex[1] = v2; d_vertex[2] = v3; 
  d_visible = false;
}

Face::Face(Vertex* v1, Vertex* v2, Vertex* v3, 
            Edge* e12, Edge* e23, Edge* e31) 
{
  d_vertex[0] = v1; d_vertex[1] = v2; d_vertex[2] = v3; 
  d_edge[0] = e12; d_edge[1] = e23; d_edge[2] = e31; 
  d_visible = false;
}

Face::Face(const Face& f) 
{
  d_vertex[0] = f.d_vertex[0]; d_vertex[1] = f.d_vertex[1]; 
  d_vertex[2] = f.d_vertex[2];
  d_edge[0] = f.d_edge[0]; d_edge[1] = f.d_edge[1]; d_edge[2] = f.d_edge[2];
  d_visible = f.d_visible;
}

Vertex* 
Face::vertex(int index) const { return d_vertex[index]; }
void 
Face::vertex(int index, Vertex* v) { d_vertex[index] = v; }

Edge* 
Face::edge(int index) const { return d_edge[index]; }
void 
Face::edge(int index, Edge* e) { d_edge[index] = e; }

bool 
Face::visible() const {return d_visible;}
void 
Face::visible(bool flag) {d_visible = flag;}

std::ostream& operator<< (std::ostream &out, const Face& data) {
  out << "v1 = " << *data.vertex(0) << " v2 = " << data.vertex(1)
      << " v3 = " << *data.vertex(2)
      << " e1 = " << *data.edge(0) << " e2 = " << *data.edge(1)
      << " e3 = " << *data.edge(2) <<  " visible = " << data.visible();
  return out;
}

} // end namespace VaangoUI