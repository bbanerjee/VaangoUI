#ifndef __Vaango_UI_VORONOI_H__
#define __Vaango_UI_VORONOI_H__

#include <Core/Vertex.h>
#include <Core/Edge.h>
#include <Core/Face.h>
#include <Core/Enums.h>
#include <Vaango_UIData.h>

#include <vector>
#include <list>

namespace VaangoUI {

//**************************************************************************
// Program : Voronoi.java
// Purpose : Delaunay triangulation of a set of 2D points
//           by projecting the 3D convex hull and then determine
//           the Voronoi Diagram
//**************************************************************************

class Voronoi 
{
private:

  int d_nofVert = 0;
  std::list<Vertex> d_vertex;
  std::list<Edge> d_edge;
  std::list<Face> d_face;
  ParticlesInRVE d_pl;

public:

  Voronoi()  = default;

  Voronoi(const ParticlesInRVE& pl) {
    d_nofVert = pl.size(); 
    d_pl = pl;
  }

  /** 
   * Create the convex hull 
   */
  void process() {
    readPoints();
    if (!makeTetrahedron()) return;;
    constructHull();
    outputDelaunayTriangles();
    outputVoronoiVertices();
  }

  /** 
   * Read the input set of points 
   */
  void readPoints() {
    for (int ii = 0; ii < d_nofVert; ii++) {
      ParticleInRVE p = d_pl.getParticle(ii);
      Point cent = p.getCenter(); 
      Vertex vert(cent);
      d_vertex.push_back(vert);
    }
    printVertices();
  }

  /** 
   * Make the starting tetrahedron 
   */
  bool makeTetrahedron() {

    // Find the number of vertices
    int nofVerts = d_vertex.size();
    if (nofVerts < 4) {
      std::cout << "There should be at least 4 vertices" << "\n";
      return false;
    }

    // Find 3 non-collinear points
    auto vertexIter = d_vertex.begin();
    Vertex v1 = *vertexIter;  // 1st pt.in tetra base
    ++iter;
    Vertex v2 = *vertexIter;  // 2nd pt. in tetra base
    ++iter;
    Vertex v3 = *vertexIter;  // 3rd pt. in tetra base
    while (collinear(v1, v2, v3)) {
      if (index == nofVerts-1) {
	      std::cout << "All points are collinear" << "\n";
	      return false;
      } else {
	      ++vertexIter;
	      v1 = v2; v2 = v3; v3 = *vertexIter;
      }
    }
    v1.mark(VoronoiFlags::PROCESSED); 
    v2.mark(VoronoiFlags::PROCESSED); 
    v3.mark(VoronoiFlags::PROCESSED);

    // Create the edges of the initial triangle
    Edge e1(&v1, &v2);  // First edge of base triangle;
    d_edge.push_back(e1);
    Edge e2(&v2, &v3);  // Second edge of base triangle;
    d_edge.push_back(e2);
    Edge e3(&v3, &v1);  // Third edge of base triangle;
    d_edge.push_back(e3);

    // Create the face for the triangle forming base of tetrahedron
    Face base(&v1, &v2, &v3, &e1, &e2, &e3); 
    d_face.push_back(base);

    // Link edges to face
    e1.adjFace(0, &base); e2.adjFace(0, &base); e3.adjFace(0, &base);

    // Find a fourth non-coplanar point to form a tetrahedron
    ++vertexIter;
    Vertex v4 = *vertexIter;
    long vol = volume6(base, v4); // Volume for ccw test 
    while (vol == 0) {
      if (vertexIter == d_vertex.end()) {
	      std::cout << "All points are coplanar" << "\n";
	      return false;
      } else {
	      ++vertexIter;
	      v4 = *vertexIter;
	      vol = volume6(base, v4);
      }
    }
    v4.mark(VoronoiFlags::PROCESSED);

    // Store vertices is ccw order
    Vertex vTemp;  
    Edge eTemp;    
    if (vol < 0) {
      vTemp = v1; v1 = v2; v2 = vTemp;
      eTemp = e1; e1 = e2; e2 = eTemp;
    }

    // Construct the faces and edges between the original triangle
    // and the fourth point
    e1.adjFace(1, makeFace(e1, v4));
    e2.adjFace(1, makeFace(e2, v4));
    e3.adjFace(1, makeFace(e3, v4));

    // Cleanup
    cleanup();
    return true;
  }

  /** 
   * Construct the incremental convex hull 
   */
  void constructHull() {
    int size = d_vertex.size();
    auto vertexIter = d_vertex.begin();
    Vertex v;
    while (index < size) {
      v = *vertexIter;
      if (!v.isMarked()) {
	      v.mark(VoronoiFlags::PROCESSED);
	      bool changed = addOne(v);
	      if (changed) cleanup();
	      size = d_vertex.size();
        vertexIter = d_vertex.begin();
      } else {
	      vertexIter++;
      }
    }
    printFaceOrientation();
    checkFaceOrientation();
    checkConvexity();
  }

  /** 
   * Find if three points are collinear
   */
  bool collinear(const Vertex& v1, const Vertex& v2, const Vertex& v3) {
    return (areaTri(v1, v2, v3) == 0) ;
  }

  /** 
   * Calculate the area of a triangle
   */
  long areaTri(const Vertex& v1, const Vertex& v2, const Vertex& v3) {
    return (v1.v(0)*v2.v(1) - v1.v(1)*v2.v(0) +
	    v1.v(1)*v3.v(0) - v1.v(0)*v3.v(1) +
	    v2.v(0)*v3.v(1) - v3.v(0)*v2.v(1));
  }

  /** 
   * Calculate the volume of a tetrahedron
   */
  long volume6(const Face& f, const Vertex& p) {
    long ax = f.vertex(0)->v(0); long ay = f.vertex(0)->v(1); 
    long az = f.vertex(0)->v(2); 
    long bx = f.vertex(1)->v(0); long by = f.vertex(1)->v(1); 
    long bz = f.vertex(1)->v(2); 
    long cx = f.vertex(2)->v(0); long cy = f.vertex(2)->v(1); 
    long cz = f.vertex(2)->v(2); 
    long dx = p.v(0); long dy = p.v(1); long dz = p.v(2); 
    long vol = - az*by*cx + ay*bz*cx + az*bx*cy - ax*bz*cy
                 - ay*bx*cz + ax*by*cz + az*by*dx - ay*bz*dx
                 - az*cy*dx + bz*cy*dx + ay*cz*dx - by*cz*dx
                 - az*bx*dy + ax*bz*dy + az*cx*dy - bz*cx*dy
                 - ax*cz*dy + bx*cz*dy + ay*bx*dz - ax*by*dz
                 - ay*cx*dz + by*cx*dz + ax*cy*dz - bx*cy*dz;
    return vol;
  }

  /** 
   * Make a new face based on an edge and a vertex
   */
  Face makeFace(Edge e, Vertex p) {

    // Make two new edges (if they don't already exist)
    Edge[] newEdge = new Edge[2];
    for (int ii = 0; ii < 2; ++ii) {
      if ((newEdge[ii] = e.endPt(ii).duplicate()) == null) {
	newEdge[ii] = new Edge(e.endPt(ii), p);
	d_edge.add(newEdge[ii]);
	e.endPt(ii).duplicate(newEdge[ii]);
      }
    }

    // Make the new face
    Face newFace = new Face();
    newFace.edge(0,e); newFace.edge(1,newEdge[0]); newFace.edge(2,newEdge[1]);
    d_face.add(newFace);

    // Make sure that everything is counter clockwise
    makeCCW(newFace, e, p);

    // Set the adjacent face pointers
    for (int ii = 0; ii < 2; ++ii) {
      for (int jj = 0; jj < 2; ++jj) {
	if (newEdge[ii].adjFace(jj) == null) {
	  newEdge[ii].adjFace(jj,newFace);
	  break;
	}
      }
    }
    return newFace;
  }

  /** 
   * Make all the vertices and edges of face counter-clockwise
   */
  void makeCCW(Face f, Edge e, Vertex p) {

    Face fi; // THe invisible face adjacent to edge e

    // If this is the initial tetrahedrom the e has only one 
    // adjacent face - this is the fi otherwise use 
    // the actual invisible face
    if (e.adjFace(1) == null) fi = e.adjFace(0);
    else {
      if (!e.adjFace(0).visible()) fi = e.adjFace(0);
      else fi = e.adjFace(1);
    }

    // Set v1 and v2 of f to have opposite orientation
    // same for invisibleFace
    // Find the index of vertex e.v2() in invisibleFace
    int ii;
    for (ii = 0; fi.vertex(ii) != e.endPt(1); ++ii);

    // Orient f opposite to that of invisibleFace
    if (fi.vertex((ii+1)%3) != e.endPt(0)) {
      f.vertex(0, e.endPt(1));
      f.vertex(1, e.endPt(0));
    } else {
      f.vertex(0, e.endPt(0));
      f.vertex(1, e.endPt(1));
      Edge eTemp = f.edge(1); f.edge(1,f.edge(2)); f.edge(2,eTemp);
    }
    f.vertex(2,p);
  }

  // Cleanup the Lists to reflect the current status of the hull
  void cleanup() {
    cleanEdges();
    cleanFaces();
    cleanVertices();
  }

  /** 
   * Clean up the edge list
   */
  void cleanEdges() {

    // Integrate the new faces into the edges.  The newly added cone
    // is attached to the border edges of the visible region.  For
    // each of these border edges the newFace is copied to face1 or 
    // face2.
    int size = d_edge.size();
    int index = 0;
    Edge e ;
    while (index < size) {
      e = (Edge) d_edge.get(index);
      //System.out.println("Index = " + index + " Size = " + size + 
      //		 " Edge = " + e + " New Face = " + e.newFace());
      //System.out.println("Before: Edge = " + e + " Adj Face 0 = " + e.adjFace(0) +
      //		   " Adj Face 1 = " + e.adjFace(1));
      if (e.newFace() != null) {
	if (e.adjFace(0).visible()) e.adjFace(0,e.newFace());
	else e.adjFace(1,e.newFace());
        //System.out.println("Edge = " + e + " Adj Face 0 = " + e.adjFace(0) +
	//		   " Adj Face 1 = " + e.adjFace(1));
	e.newFace(null);
      }
      ++index;
    }
    //printEdges();

    // Delete any edges marked deleted
    index = 0;
    while (index < size) {
      e = (Edge) d_edge.get(index);
      if (e.delete()) {
	d_edge.remove(e);
	size = d_edge.size();
      }
      else ++index;
    }
    //printEdges();
  }

  /** 
   * Clean up the face list
   */
  void cleanFaces() {
    int size = d_face.size();
    int index = 0;
    Face f;
    do {
      f = (Face) d_face.get(index);
      if (f.visible()) {
	d_face.remove(f);
	size = d_face.size();
      }
      else index++;
    } while(index < size);
  }

  /** 
   * Clean up the vertex list
   */
  void cleanVertices() {
    
    // Make all vertices incident to some undeleted edge ONHULL
    int size = d_edge.size();
    int index = 0;
    Edge e ;
    while (index < size) {
      e = (Edge) d_edge.get(index);
      e.endPt(0).onHull(ONHULL);
      e.endPt(1).onHull(ONHULL);
      ++index;
    }

    //System.out.println("Vertex list before clean up");
    //printVertices();
    // Delete all vertices that have been processed but are not on hull
    index = 0;
    Vertex v ;
    size = d_vertex.size();
    while (index < size) {
      v = (Vertex) d_vertex.get(index);
      if (v.isMarked() && !v.onHull()) {
	d_vertex.remove(v);
	size = d_vertex.size();
      }
      else ++index;
    } 
    //System.out.println("Vertex list after clean up");
    //printVertices();
    
    // Reset all flags
    index = 0;
    while (index < size) {
      v = (Vertex) d_vertex.get(index);
      v.duplicate(null);
      v.onHull(!ONHULL);
      ++index;
    }
  }

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
  boolean addOne(Vertex p) {

    // Mark faces visible from p
    int nofFaces = d_face.size();
    int currFace = 0;
    boolean vis = false; // True is some face is visible
    while (currFace < nofFaces) { 
      Face f = (Face) d_face.get(currFace);
      long vol = volume6(f, p);
      //System.out.println("In AddOne : ");
      //System.out.println(" ");
      //System.out.println(" Face =  ");
      //System.out.println(" ");
      //f.printFace();
      //System.out.println(" Volume =  "+vol);
      //System.out.println(" ");
      if (vol < 0) {
	f.visible(VISIBLE);
	vis = true;
      }
      ++currFace;
    } 

    // If no faces are visible from p, then p is inside the hull
    if (!vis) {
      p.onHull(!ONHULL);
      return false;
    }

    // Mark edges in interior of visible region for deletion
    // Erect a new face based on each border edge
    int nofEdges = d_edge.size();
    int currEdge = 0;
    while (currEdge < nofEdges) {
      Edge e = (Edge) d_edge.get(currEdge);
      //System.out.println("Current Edge in addOne");
      //e.printEdge();
      if (e.adjFace(0).visible() && e.adjFace(1).visible()) {
	// Interior edge .. mark for deletion
	e.delete(REMOVED);
      } else if (e.adjFace(0).visible() || e.adjFace(1).visible()) {
	// Border edge .. make a new face
	e.newFace(makeFace(e, p));
      }
      ++currEdge;
    }
    return true;
  }

  /** 
   * Output the 2D Delaunay triangulation
   */
  void outputDelaunayTriangles() {
    int size = d_face.size();
    for (int index = 0; index < size; index++) {
      Face f = (Face) d_face.get(index);
      if (!f.topFace()) {
	System.out.println(f.vertex(0).x()+" "+f.vertex(0).y()+" "+
			   f.vertex(1).x()+" "+f.vertex(1).y()+" "+
			   f.vertex(2).x()+" "+f.vertex(2).y());
	PolygonDouble p = new PolygonDouble();
	p.add(f.vertex(0).x(), f.vertex(0).y());
	p.add(f.vertex(1).x(), f.vertex(1).y());
	p.add(f.vertex(2).x(), f.vertex(2).y());
	d_pl.addTriangle(p);
      }
    }
  }
  
  /** 
   * Output the 2D Voronoi vertices
   */
  void outputVoronoiVertices() {
    int size = d_face.size();
    for (int index = 0; index < size; index++) {
      Face f = (Face) d_face.get(index);
      if (!f.topFace()) {
	Vertex voronoiVertex = f.getVoronoiVertex();
	Point p = new Point(voronoiVertex.x(), voronoiVertex.y(), 0.0);
	System.out.println(voronoiVertex.x()+" "+voronoiVertex.y());
	d_pl.addVoronoiVertex(p);
      }
    }
  }
  
  /** 
   * Print the vertex list
   */
  void printVertices() {
    System.out.println("Vertices : ");
    int size = d_vertex.size();
    for (int ii = 0; ii < size; ii++) {
      System.out.println("Vertex # " + ii + "  ");
      ((Vertex) d_vertex.get(ii)).printVertex();
    }
  }

  /** 
   * Print the edge list
   */
  void printEdges() {
    System.out.println("Edges : ");
    int size = d_edge.size();
    for (int ii = 0; ii < size; ii++) {
      System.out.println("Edge # " + ii + "  ");
      ((Edge) d_edge.get(ii)).printEdge();
    }
  }

  /** 
   * Print the face list
   */
  void printFaces() {
    System.out.println("Faces : ");
    int size = d_face.size();
    for (int ii = 0; ii < size; ii++) {
      System.out.println("Face # " + ii + "  ");
      ((Face) d_face.get(ii)).printFace();
    }
  }

  /** 
   * Print the orientation of the faces in the edgelist
   */
  void printFaceOrientation() {
    System.out.println("Edge Face Orientation : ");
    int size = d_edge.size();
    for (int ii = 0; ii < size; ii++) {
      Edge e = (Edge) d_edge.get(ii);
      System.out.println("Edge # "+ii+"("+e.endPt(0).x()+","+e.endPt(0).y()+
			 ");("+e.endPt(1).x()+","+e.endPt(1).y()+")");
      e.printFaceOrientation();
    }
  }

  /** 
   * Check the orientation of the faces in the edgelist
   */
  void checkFaceOrientation() {
    System.out.println("Edge Face Orientation Check: ");
    int size = d_edge.size();
    for (int ii = 0; ii < size; ii++) {
      Edge e = (Edge) d_edge.get(ii);
      if (!e.checkFaceOrientation()) {
	System.out.println("** ERROR ** Face orientation wrong for Edge "+ii);
      }
    }
  }

  /** 
   * Check the convexity (each face in the hull should form a non-negative
   * volume with each vertex of the hull
   */
  void checkConvexity() {
    int nofFaces = d_face.size();
    int nofEdges = d_edge.size();
    int nofVertices = d_vertex.size();
    System.out.println("Convexity Check : (F,E,V) = "+nofFaces+","+
		       nofEdges+","+nofVertices);
    if (nofFaces != 2*nofVertices-4) {
      System.out.println("** ERROR ** F = 2V-4 not satisfied");
    }
    if (2*nofEdges != 3*nofVertices) {
      System.out.println("** ERROR ** 2E = 3V not satisfied");
    }
    for (int ii = 0; ii < nofFaces; ii++) {
      Face f = (Face) d_face.get(ii);
      for (int jj = 0; jj < nofVertices; jj++) {
	Vertex v = (Vertex) d_vertex.get(jj);
	if (v.isMarked()) {
	  long vol = volume6(f,v);
	  if (vol < 0) {
	    System.out.println("** ERROR ** Volume between face "+ii+
			       " and vertex "+jj+ " is " + vol);
	  }
	}
      }
    }
  }


}; 

} // end namespace VaangoUI

#endif //__Vaango_UI_VORONOI_H__