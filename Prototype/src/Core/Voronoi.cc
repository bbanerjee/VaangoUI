#include <Voronoi.h>

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

bool VoronoiFlags::ONHULL = true;
bool VoronoiFlags::REMOVED = true;
bool VoronoiFlags::VISIBLE = true;
bool VoronoiFlags::PROCESSED = true;

Voronoi::Voronoi(const ParticlesInRVE& pl) {
  d_nofVert = pl.size(); 
  d_pl = pl;
}

void Voronoi::clear() {
  if (d_pl.size() > 0) {
    d_pl.clear();
    d_triangleList.clear();
    d_voronoiList.clear();
  }
}

/** 
 * Create the convex hull 
 */
void Voronoi::process() {
  readPoints();
  if (!makeTetrahedron()) return;;
  constructHull();
  outputDelaunayTriangles();
  outputVoronoiVertices();
}

/** 
 * Read the input set of points 
 */
void Voronoi::readPoints() {
  for (const auto& [radius, particles] : d_pl.getParticles()) {
    for (const auto& part: particles) {
      d_vertex.emplace_back(part.getCenter());
    }
  }
  printVertices();
}

/** 
 * Make the starting tetrahedron 
 */
bool Voronoi::makeTetrahedron() {

  // Find the number of vertices
  int nofVerts = d_vertex.size();
  if (nofVerts < 4) {
    std::cout << "There should be at least 4 vertices" << "\n";
    return false;
  }

  // Find 3 non-collinear points
  auto vertexIter = d_vertex.begin();
  Vertex v1 = *vertexIter;  // 1st pt.in tetra base
  ++vertexIter;
  Vertex v2 = *vertexIter;  // 2nd pt. in tetra base
  ++vertexIter;
  Vertex v3 = *vertexIter;  // 3rd pt. in tetra base
  while (collinear(v1, v2, v3)) {
    if (vertexIter == d_vertex.end()) {
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
  std::shared_ptr<Face> base = std::make_shared<Face>(&v1, &v2, &v3, &e1, &e2, &e3); 
  d_face.push_back(base);

  // Link edges to face
  e1.adjFace(0, base.get()); e2.adjFace(0, base.get()); e3.adjFace(0, base.get());

  // Find a fourth non-coplanar point to form a tetrahedron
  ++vertexIter;
  Vertex v4 = *vertexIter;
  long vol = volume6(base.get(), v4); // Volume for ccw test 
  while (vol == 0) {
    if (vertexIter == d_vertex.end()) {
      std::cout << "All points are coplanar" << "\n";
      return false;
    } else {
      ++vertexIter;
      v4 = *vertexIter;
      vol = volume6(base.get(), v4);
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
  auto f1 = makeFace(&e1, &v4);
  auto f2 = makeFace(&e2, &v4);
  auto f3 = makeFace(&e3, &v4);
  d_face.push_back(f1);
  d_face.push_back(f2);
  d_face.push_back(f3);
  e1.adjFace(1, f1.get());
  e2.adjFace(1, f2.get());
  e3.adjFace(1, f3.get());

  // Cleanup
  cleanup();
  return true;
}

/** 
 * Construct the incremental convex hull 
 */
void Voronoi::constructHull() {
  int size = d_vertex.size();
  auto vertexIter = d_vertex.begin();
  Vertex v;
  while (vertexIter != d_vertex.end()) {
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
bool Voronoi::collinear(const Vertex& v1, const Vertex& v2, const Vertex& v3) {
  return (areaTri(v1, v2, v3) == 0) ;
}

/** 
 * Calculate the area of a triangle
 */
long Voronoi::areaTri(const Vertex& v1, const Vertex& v2, const Vertex& v3) {
  return (v1.v(0)*v2.v(1) - v1.v(1)*v2.v(0) +
    v1.v(1)*v3.v(0) - v1.v(0)*v3.v(1) +
    v2.v(0)*v3.v(1) - v3.v(0)*v2.v(1));
}

/** 
 * Calculate the volume of a tetrahedron
 */
long Voronoi::volume6(const Face* f, const Vertex& p) {
  long ax = f->vertex(0)->v(0); long ay = f->vertex(0)->v(1); 
  long az = f->vertex(0)->v(2); 
  long bx = f->vertex(1)->v(0); long by = f->vertex(1)->v(1); 
  long bz = f->vertex(1)->v(2); 
  long cx = f->vertex(2)->v(0); long cy = f->vertex(2)->v(1); 
  long cz = f->vertex(2)->v(2); 
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
std::shared_ptr<Face> Voronoi::makeFace(Edge* e, Vertex* p) {

  // Make two new edges (if they don't already exist)
  Edge newEdge[2];
  for (int ii = 0; ii < 2; ++ii) {
    Vertex* vert = e->endPt(ii);
    Edge* edup = vert->duplicate(); 
    newEdge[ii] = *edup;
    if (edup == nullptr) {
      newEdge[ii] = Edge(vert, p);
      d_edge.push_back(newEdge[ii]);
      vert->duplicate(&newEdge[ii]);
    }
  }

  // Make the new face
  std::shared_ptr<Face> newFace = std::make_shared<Face>();
  newFace->edge(0, e); newFace->edge(1, &newEdge[0]); newFace->edge(2, &newEdge[1]);

  // Make sure that everything is counter clockwise
  makeCCW(newFace.get(), e, p);

  // Set the adjacent face pointers
  for (int ii = 0; ii < 2; ++ii) {
    for (int jj = 0; jj < 2; ++jj) {
      if (newEdge[ii].adjFace(jj) == nullptr) {
        newEdge[ii].adjFace(jj, newFace.get());
        break;
      }
    }
  }

  return newFace;
}

/** 
 * Make all the vertices and edges of face counter-clockwise
 */
void Voronoi::makeCCW(Face* f, Edge* e, Vertex* p) {

  Face* fi; // THe invisible face adjacent to edge e

  // If this is the initial tetrahedrom the e has only one 
  // adjacent face - this is the fi otherwise use 
  // the actual invisible face
  if (e->adjFace(1) == nullptr) fi = e->adjFace(0);
  else {
    if (!e->adjFace(0)->visible()) fi = e->adjFace(0);
    else fi = e->adjFace(1);
  }

  // Set v1 and v2 of f to have opposite orientation
  // same for invisibleFace
  // Find the index of vertex e.v2() in invisibleFace
  int ii;
  for (ii = 0; fi->vertex(ii) != e->endPt(1); ++ii);

  // Orient f opposite to that of invisibleFace
  if (fi->vertex((ii+1)%3) != e->endPt(0)) {
    f->vertex(0, e->endPt(1));
    f->vertex(1, e->endPt(0));
  } else {
    f->vertex(0, e->endPt(0));
    f->vertex(1, e->endPt(1));
    Edge* eTemp = f->edge(1); f->edge(1,f->edge(2)); f->edge(2,eTemp);
  }
  f->vertex(2,p);
}

// Cleanup the Lists to reflect the current status of the hull
void Voronoi::cleanup() {
  cleanEdges();
  cleanFaces();
  cleanVertices();
}

/** 
 * Clean up the edge list
 */
void Voronoi::cleanEdges() {

  // Integrate the new faces into the edges.  The newly added cone
  // is attached to the border edges of the visible region.  For
  // each of these border edges the newFace is copied to face1 or 
  // face2.
  auto edgeIter = d_edge.begin();
  while (edgeIter != d_edge.end()) {
    Edge e = *edgeIter;
    // std::cout << "Index = " <<  index <<  " Size = " <<  size <<  
    //		 " Edge = " <<  e <<  " New Face = " <<  e.newFace());
    // std::cout << "Before: Edge = " <<  e <<  " Adj Face 0 = " <<  e.adjFace(0) << 
    //		   " Adj Face 1 = " <<  e.adjFace(1));
    if (e.newFace() != nullptr) {
      if (e.adjFace(0)->visible()) e.adjFace(0,e.newFace());
      else e.adjFace(1,e.newFace());
      // std::cout << "Edge = " << e << " Adj Face 0 = " << e.adjFace(0) <<
      //              " Adj Face 1 = " << e.adjFace(1));
      e.newFace(nullptr);
    }
    ++edgeIter;
  }
  //printEdges();

  // Delete any edges marked deleted
  edgeIter = d_edge.begin();
  while (edgeIter != d_edge.end()) {
    const Edge e = *edgeIter;
    if (e.remove()) {
      d_edge.remove(e);
    }
    else ++edgeIter;
  }
  //printEdges();
}

/** 
 * Clean up the face list
 */
void Voronoi::cleanFaces() {
  auto faceIter = d_face.begin();
  while (faceIter != d_face.end()) {
    auto f = *faceIter;
    if (f->visible()) {
      d_face.remove(f);
    }
    else faceIter++;
  } 
}

/** 
 * Clean up the vertex list
 */
void Voronoi::cleanVertices() {
  
  // Make all vertices incident to some undeleted edge ONHULL
  auto edgeIter = d_edge.begin();
  while (edgeIter != d_edge.end()) {
    auto e = *edgeIter;
    e.endPt(0)->onHull(VoronoiFlags::ONHULL);
    e.endPt(1)->onHull(VoronoiFlags::ONHULL);
    ++edgeIter;
  }

  //std::cout << ("Vertex list before clean up" << "\n";
  //printVertices();

  // Delete all vertices that have been processed but are not on hull
  auto vertexIter = d_vertex.begin();
  while (vertexIter != d_vertex.end()) {
    auto v = *vertexIter;
    if (v.isMarked() && !v.onHull()) {
      d_vertex.remove(v);
    }
    else ++vertexIter;
  } 
  //std::cout << "Vertex list after clean up" << "\n";
  //printVertices();
  
  // Reset all flags
  vertexIter = d_vertex.begin();
  while (vertexIter != d_vertex.end()) {
    auto v = *vertexIter;
    v.duplicate(nullptr);
    v.onHull(!VoronoiFlags::ONHULL);
    ++vertexIter;
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
bool Voronoi::addOne(Vertex& p) {

  // Mark faces visible from p
  bool vis = false; // True is some face is visible
  auto faceIter = d_face.begin();
  while (faceIter != d_face.end()) {
    auto f = *faceIter;
    long vol = volume6(f.get(), p);
    //std::cout << "In AddOne : " << "\n";
    //std::cout << " " << "\n";
    //std::cout << " Face =  " << "\n";
    //std::cout << " " << "\n";
    //f.printFace();
    //std::cout << " Volume =  " << vol << "\n";
    //std::cout << " " << "\n";
    if (vol < 0) {
      f->visible(VoronoiFlags::VISIBLE);
      vis = true;
    }
    ++faceIter;
  } 

  // If no faces are visible from p, then p is inside the hull
  if (!vis) {
    p.onHull(!VoronoiFlags::ONHULL);
    return false;
  }

  // Mark edges in interior of visible region for deletion
  // Erect a new face based on each border edge
  auto edgeIter = d_edge.begin();
  while (edgeIter != d_edge.end()) {
    auto e = *edgeIter;
    //std::cout << "Current Edge in addOne" << "\n";
    //e.printEdge();
    if (e.adjFace(0)->visible() && e.adjFace(1)->visible()) {
      // Interior edge .. mark for deletion
      e.remove(VoronoiFlags::REMOVED);
    } else if (e.adjFace(0)->visible() || e.adjFace(1)->visible()) {
      // Border edge .. make a new face
      auto f1 = makeFace(&e, &p);
      e.newFace(f1.get());
    }
    ++edgeIter;
  }
  return true;
}

/** 
 * Output the 2D Delaunay triangulation
 */
void Voronoi::outputDelaunayTriangles() {
  for (auto f : d_face) {
    if (!topFace(*f)) {
      std::cout << f->vertex(0)->x() << " " << f->vertex(0)->y() << " "
                << f->vertex(1)->x() << " " << f->vertex(1)->y() << " "
                << f->vertex(2)->x() << " " << f->vertex(2)->y() << "\n";
      std::unique_ptr<Polygon<double>> p = std::make_unique<Polygon<double>>();
      p->add(f->vertex(0)->x(), f->vertex(0)->y());
      p->add(f->vertex(1)->x(), f->vertex(1)->y());
      p->add(f->vertex(2)->x(), f->vertex(2)->y());
      addTriangle(std::move(p));
    }
  }
}

/**
 *  Find if the face is a "top" face, i.e., if the outward pointing normal
 *  to the face points upward (has a +ve dot product with the z-axis vector)
 */
bool Voronoi::topFace(const Face& face) {
  long ax = face.vertex(0)->v(0); long ay = face.vertex(0)->v(1);
  //long az = face.vertex(0]->v(2);
  long bx = face.vertex(1)->v(0); long by = face.vertex(1)->v(1);
  //long bz = fac.vertex(1)->v(2);
  long cx = face.vertex(2)->v(0); long cy = face.vertex(2)->v(1);
  //long cz = face.vertex(2)->v(2);
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
 * Output the 2D Voronoi vertices
 */
void Voronoi::outputVoronoiVertices() {
  auto faceIter = d_face.begin();
  while (faceIter != d_face.end()) {
    auto f = *faceIter;
    if (!topFace(*f)) {
      Vertex voronoiVertex = getVoronoiVertex(*f);
      Point p(voronoiVertex.x(), voronoiVertex.y(), 0.0);
      std::cout << voronoiVertex.x() << " " << voronoiVertex.y() << "\n";
      addVoronoiVertex(p);
    }
  }
}

/**
 * Calculate the location of the Voronoi vertex for this face
 * (the center of the circumcircle)
 */
Vertex Voronoi::getVoronoiVertex(const Face& face) const {
  long a0 = face.vertex(0)->v(0); long a1 = face.vertex(0)->v(1);
  long b0 = face.vertex(1)->v(0); long b1 = face.vertex(1)->v(1);
  long c0 = face.vertex(2)->v(0); long c1 = face.vertex(2)->v(1);
  long D = 2*(a1*c0+b1*a0-b1*c0-a1*b0-c1*a0+c1*b0);
  if (D != 0) {
    long p0 = (b1*a0*a0 - c1*a0*a0 - b1*b1*a1 + c1*c1*a1 +
                b0*b0*c1 + a1*a1*b1 + c0*c0*a1 - c1*c1*b1 -
                c0*c0*b1 - b0*b0*a1 + b1*b1*c1 - a1*a1*c1)/D;
    long p1 = (a0*a0*c0 + a1*a1*c0 + b0*b0*a0 - b0*b0*c0 +
                b1*b1*a0 - b1*b1*c0 - a0*a0*b0 - a1*a1*b0 -
                c0*c0*a0 + c0*c0*b0 - c1*c1*a0 + c1*c1*b0)/D;
    return Vertex(p0, p1, 0);
  } 
  return Vertex(0, 0, 0);
}

/** 
 * Print the vertex list
 */
void Voronoi::printVertices() {
  std::cout << "Vertices : " << "\n";
  int ii = 0;
  for (auto v : d_vertex) {
    std::cout << "Vertex # " << ii << "  " << v << "\n";
    ii++;
  }
}

/** 
 * Print the edge list
 */
void Voronoi::printEdges() {
  std::cout << "Edges : " << "\n";
  int ii = 0;
  for (auto e : d_edge) {
    std::cout << "Edge # " + ii << "  " << "\n";
    std::cout << e << "\n";
    ii++;
  }
}

/** 
 * Print the face list
 */
void Voronoi::printFaces() {
  std::cout << "Faces : " << "\n";
  int ii = 0;
  for (auto f : d_face) {
    std::cout << "Face # " << ii << "  " << "\n";;
    std::cout << f << "\n";
    ii++;
  }
}

/** 
 * Print the orientation of the faces in the edgelist
 */
void Voronoi::printFaceOrientation() {
  std::cout << "Edge Face Orientation : " << "\n";
  int ii = 0;
  for (auto e : d_edge) {
    std::cout << "Edge # " << ii << " " << e << "\n";
    e.printFaceOrientation();
    ii++;
  }
}

/** 
 * Check the orientation of the faces in the edgelist
 */
void Voronoi::checkFaceOrientation() {
  std::cout << "Edge Face Orientation Check: " << "\n";
  int ii = 0;
  for (auto e : d_edge) {
    if (!e.checkFaceOrientation()) {
      std::cout << "** ERROR ** Face orientation wrong for Edge " << ii << "\n";
    }
    ii++;
  }
}

/** 
 * Check the convexity (each face in the hull should form a non-negative
 * volume with each vertex of the hull
 */
void Voronoi::checkConvexity() {
  int nofFaces = d_face.size();
  int nofEdges = d_edge.size();
  int nofVertices = d_vertex.size();
  std::cout << "Convexity Check : (F,E,V) = " << nofFaces << "," << 
          nofEdges << "," << nofVertices << "\n";
  if (nofFaces != 2*nofVertices-4) {
    std::cout << "** ERROR ** F = 2V-4 not satisfied" << "\n";
  }
  if (2*nofEdges != 3*nofVertices) {
    std::cout << "** ERROR ** 2E = 3V not satisfied" << "\n";
  }
  int ii = 0;
  for (auto f : d_face) {
    int jj = 0;
    for (auto v : d_vertex) {
      if (v.isMarked()) {
        long vol = volume6(f.get(),v);
        if (vol < 0) {
          std::cout << "** ERROR ** Volume between face " << ii
                    << " and vertex " << jj <<  " is " <<  vol << "\n";
        }
      }
    }
  }
}

/**
 * Triangulate the particle list
 */
void Voronoi::triangulate() {
  process();
}

/**
 *  Add a triangle to the triangle list
 */
void Voronoi::addTriangle(std::unique_ptr<Polygon<double>> p) {
  d_triangleList.push_back(std::move(p));
}

/**
 *  Get the triangle list
 */
std::vector<std::unique_ptr<Polygon<double>>>& Voronoi::getTriangles() {
  return d_triangleList;
}

/**
 *  Add a point to the voronoi vertex list
 */
void Voronoi::addVoronoiVertex(const Point& p) {
  d_voronoiList.push_back(p);
}

/**
 *  Get the voronoi vertex list
 */
std::vector<Point> Voronoi::getVoronoiVertices() {
  return d_voronoiList;
}

} // end namespace VaangoUI
