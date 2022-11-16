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

  std::vector<Vertex*> d_endPts;
  std::vector<Face*> d_adjFace;
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

  void printFaceOrientation() const;

  bool checkFaceOrientation() const;

  friend bool operator==(const Edge& l, const Edge& r)
  {
    bool val = std::lexicographical_compare(l.d_endPts.begin(), l.d_endPts.end(),
                                            r.d_endPts.begin(), r.d_endPts.end());
    return !val;
  }

  friend std::ostream& operator<< (std::ostream &out, const Edge& data);
};

} // end namespace VaangoUI

#endif //__Vaango_UI_EDGE_H__