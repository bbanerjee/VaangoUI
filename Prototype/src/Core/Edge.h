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
       Face* left = nullptr, Face* right = nullptr);

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

  void printFaceOrientation() const;

  bool checkFaceOrientation() const;

};

} // end namespace VaangoUI

#endif //__Vaango_UI_EDGE_H__