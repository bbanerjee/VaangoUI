#ifndef __Vaango_UI_EDGE_H__
#define __Vaango_UI_EDGE_H__

#include <Core/Enums.h>

#include <vector>

namespace VaangoUI {

// forward declarations
class Vertex;
class Face;

class Edge 
{
private:

  Vertex* d_endPts[2];
  Face* d_adjFace[2];
  Face* d_newFace;    // Pointer to incident cone face
  bool d_delete;      // True if edge should be deleted

public:

  Edge();

  Edge(Vertex* start, Vertex* end, 
       Face* left, Face* right);

  Edge(const Edge& e);

  Vertex* start() const; 

  Vertex* end() const; 

  Face* left() const; 

  Face* right() const; 

  Vertex* endPt(int index) const;
  void endPt(int index, Vertex* v);

  Face* adjFace(int index) const;
  void adjFace(int index, Face* f);

  Face* newFace() const;
  void newFace(Face* f);

  bool remove() const;
  void remove(bool flag);

  friend std::ostream& operator<< (std::ostream &out, const Edge& data);

  /*
  void printFaceOrientation() {

    // Endpoints of the edge should be in opposite order in the
    // adjacent face
    std::cout << "Face 1 :";
    for (int ii = 0; ii < 3; ii++) {
      if (this == left()->edge(ii)) {
        std::cout << " Edge :" << ii;
        System.out.print(" ("+ adjFace(0).vertex(0).x()+
                ","+ adjFace(0).vertex(0).y()+");");
        System.out.print(" ("+ adjFace(0).vertex(1).x()+
                ","+ adjFace(0).vertex(1).y()+");");
        System.out.print(" ("+ adjFace(0).vertex(2).x()+
                ","+ adjFace(0).vertex(2).y()+");");
        System.out.println(" ");
      }
    }
    System.out.print("Face 2 :");
    for (int ii = 0; ii < 3; ii++) {
      if (this == right().edge(ii)) {
        System.out.print(" Edge :"+ii);
        System.out.print(" ("+ adjFace(1).vertex(0).x()+
                ","+ adjFace(1).vertex(0).y()+");");
        System.out.print(" ("+ adjFace(1).vertex(1).x()+
                ","+ adjFace(1).vertex(1).y()+");");
        System.out.print(" ("+ adjFace(1).vertex(2).x()+
                ","+ adjFace(1).vertex(2).y()+");");
        System.out.println(" ");
      }
    }
  }
  */

  /*
  bool checkFaceOrientation() {

    // Endpoints of the edge should be in opposite order in the
    // adjacent face
    Vertex v1 = null;
    Vertex v2 = null;
    Vertex v3 = null;
    Vertex v4 = null;
    for (int ii = 0; ii < 3; ii++) {
      if (adjFace(0).edge(ii) == this) {
        v1 = adjFace(0).vertex(ii);
        v2 = adjFace(0).vertex((ii+1)%3);
      }
	  if (adjFace(1).edge(ii) == this) {
	    v3 = adjFace(1).vertex(ii);
	    v4 = adjFace(1).vertex((ii+1)%3);
	  }
    }
    if (v1 == v4 && v2 == v3) return true;
    return false;
  }
  */

};

} // end namespace VaangoUI

#endif //__Vaango_UI_EDGE_H__