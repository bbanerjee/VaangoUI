#ifndef __Vaango_UI_VORONOI_H__
#define __Vaango_UI_VORONOI_H__

#include <Core/Vertex.h>
#include <Core/Edge.h>
#include <Core/Face.h>
#include <Core/Enums.h>
#include <Core/Polygon.h>
#include <Core/ParticlesInRVE.h>

#include <vector>
#include <list>
#include <memory>

namespace VaangoUI {

//**************************************************************************
// Purpose : Delaunay triangulation of a set of 2D points
//           by projecting the 3D convex hull and then determine
//           the Voronoi Diagram
//**************************************************************************

struct VoronoiFlags {
  static bool ONHULL;
  static bool REMOVED;
  static bool VISIBLE;
  static bool PROCESSED;
};

class Voronoi 
{
private:

  int d_nofVert = 0;
  std::list<Vertex> d_vertex;
  std::list<Edge> d_edge;
  std::list<std::shared_ptr<Face>> d_face;
  ParticlesInRVE d_pl;
  std::vector<std::unique_ptr<Polygon<double>>> d_triangleList;
  std::vector<Point> d_voronoiList;

public:

  Voronoi() = default;
  ~Voronoi() = default;

  Voronoi(const ParticlesInRVE& pl);

  void clear();

  /** 
   * Create the convex hull 
   */
  void process();

  /** 
   * Read the input set of points 
   */
  void readPoints();

  /** 
   * Make the starting tetrahedron 
   */
  bool makeTetrahedron();

  /** 
   * Construct the incremental convex hull 
   */
  void constructHull();

  /** 
   * Find if three points are collinear
   */
  bool collinear(const Vertex& v1, const Vertex& v2, const Vertex& v3); 

  /** 
   * Calculate the area of a triangle
   */
  long areaTri(const Vertex& v1, const Vertex& v2, const Vertex& v3);

  /** 
   * Calculate the volume of a tetrahedron
   */
  long volume6(const Face* f, const Vertex& p);

  /** 
   * Make a new face based on an edge and a vertex
   */
  std::shared_ptr<Face> makeFace(Edge* e, Vertex* p);

  /** 
   * Make all the vertices and edges of face counter-clockwise
   */
  void makeCCW(Face* f, Edge* e, Vertex* p);

  // Cleanup the Lists to reflect the current status of the hull
  void cleanup();

  /** 
   * Clean up the edge list
   */
  void cleanEdges();

  /** 
   * Clean up the face list
   */
  void cleanFaces();

  /** 
   * Clean up the vertex list
   */
  void cleanVertices();

  // Add a single point p to the hull, constructing the new cone faces 
  // if p is exterior.  The steps in this procedure are :
  // 1) Find which faces of the old hull are visible to "p" 
  //    (Visible => face f is visible to p iff p lies in the +ve 
  //                half space of f (based on the counterclockwise
  //                orientation of vertices in f)
  //    If volume of tetrahedron of f and p < 0 the f is visible from p
  //    If no face is visible from p the p must lie inside the hull
  //    and it is marked for subsequent deletion
  // 2) Add a cone of faces to p. The portion visible from p forms a
  //    connected region on the surface. The interior of this region
  //    has to be deleted and the cone connected to its boundary.
  //    Each edge of the hull is examined in turn.
  //    Edges whose adjacent faces are both marked visible are
  //    interior to the visible region and marked for deletion.
  //    Edges with only one visible face are on the border of visible region
  //    These the ones that form the base of a new triangle face with apex
  //    at p.
  bool addOne(Vertex& p);

  /** 
   * Output the 2D Delaunay triangulation
   */
  void outputDelaunayTriangles();

  /**
   *  Find if the face is a "top" face, i.e., if the outward pointing normal
   *  to the face points upward (has a +ve dot product with the z-axis vector)
   */
  bool topFace(const Face& face);
  
  /** 
   * Output the 2D Voronoi vertices
   */
  void outputVoronoiVertices();
  
  /**
   * Calculate the location of the Voronoi vertex for this face
   * (the center of the circumcircle)
   */
  Vertex getVoronoiVertex(const Face& face) const;

  /** 
   * Print the vertex list
   */
  void printVertices();

  /** 
   * Print the edge list
   */
  void printEdges();

  /** 
   * Print the face list
   */
  void printFaces();

  /** 
   * Print the orientation of the faces in the edgelist
   */
  void printFaceOrientation();

  /** 
   * Check the orientation of the faces in the edgelist
   */
  void checkFaceOrientation();

  /** 
   * Check the convexity (each face in the hull should form a non-negative
   * volume with each vertex of the hull
   */
  void checkConvexity();

  /**
   * Triangulate the particle list
   */
  void triangulate();

  /**
   *  Add a triangle to the triangle list
   */
  void addTriangle(std::unique_ptr<Polygon<double>> p);

  /**
   *  Get the triangle list
   */
  std::vector<std::unique_ptr<Polygon<double>>>& getTriangles();

  /**
   *  Add a point to the voronoi vertex list
   */
  void addVoronoiVertex(const Point& p);

  /**
   *  Get the voronoi vertex list
   */
  std::vector<Point> getVoronoiVertices();

}; 

} // end namespace VaangoUI

#endif //__Vaango_UI_VORONOI_H__