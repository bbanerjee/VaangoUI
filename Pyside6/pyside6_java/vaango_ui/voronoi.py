import math
from .point import Point
from .polygon_double import PolygonDouble

class Voronoi:
    ONHULL = True
    REMOVED = True
    VISIBLE = True
    PROCESSED = True

    def __init__(self, particle_list=None):
        self.d_vertex = []
        self.d_edge = []
        self.d_face = []
        self.d_pl = particle_list
        self.d_nof_vert = 0
        if particle_list:
            self.d_nof_vert = particle_list.size()

    def process(self):
        self.read_points()
        if not self.make_tetrahedron():
            return
        self.construct_hull()
        self.output_delaunay_triangles()
        self.output_voronoi_vertices()

    def read_points(self):
        for ii in range(self.d_nof_vert):
            p = self.d_pl.get_particle(ii)
            cent = p.get_center()
            vert = Vertex(pt=cent)
            self.d_vertex.append(vert)
        # self.print_vertices()

    def make_tetrahedron(self):
        nof_verts = len(self.d_vertex)
        if nof_verts < 4:
            print("There should be at least 4 vertices")
            return False

        index = 0
        v1 = self.d_vertex[index]
        index += 1
        v2 = self.d_vertex[index]
        index += 1
        v3 = self.d_vertex[index]

        while self.collinear(v1, v2, v3):
            if index == nof_verts - 1:
                print("All points are collinear")
                return False
            else:
                index += 1
                v1 = v2
                v2 = v3
                v3 = self.d_vertex[index]
        
        v1.mark(self.PROCESSED)
        v2.mark(self.PROCESSED)
        v3.mark(self.PROCESSED)

        e1 = Edge(v1, v2)
        self.d_edge.append(e1)
        e2 = Edge(v2, v3)
        self.d_edge.append(e2)
        e3 = Edge(v3, v1)
        self.d_edge.append(e3)

        base = Face(v1, v2, v3, e1, e2, e3)
        self.d_face.append(base)

        e1.adj_face(0, base)
        e2.adj_face(0, base)
        e3.adj_face(0, base)

        index += 1
        v4 = self.d_vertex[index]
        vol = self.volume6(base, v4)
        
        while vol == 0:
            if index == nof_verts - 1:
                print("All points are coplanar")
                return False
            else:
                index += 1
                v4 = self.d_vertex[index]
                vol = self.volume6(base, v4)
        
        v4.mark(self.PROCESSED)

        if vol < 0:
            v1, v2 = v2, v1
            e1, e2 = e2, e1
        
        e1.adj_face(1, self.make_face(e1, v4))
        e2.adj_face(1, self.make_face(e2, v4))
        e3.adj_face(1, self.make_face(e3, v4))

        self.cleanup()
        return True

    def construct_hull(self):
        size = len(self.d_vertex)
        index = 0
        while index < size:
            v = self.d_vertex[index]
            if not v.is_marked():
                v.mark(self.PROCESSED)
                changed = self.add_one(v)
                if changed:
                    self.cleanup()
                size = len(self.d_vertex)
                index = 0
            else:
                index += 1
        
        # self.check_face_orientation()
        # self.check_convexity()

    def collinear(self, v1, v2, v3):
        return self.area_tri(v1, v2, v3) == 0

    def area_tri(self, v1, v2, v3):
        return (v1.v(0)*v2.v(1) - v1.v(1)*v2.v(0) +
                v1.v(1)*v3.v(0) - v1.v(0)*v3.v(1) +
                v2.v(0)*v3.v(1) - v3.v(0)*v2.v(1))

    def volume6(self, f, p):
        ax = f.vertex(0).v(0)
        ay = f.vertex(0).v(1)
        az = f.vertex(0).v(2)
        
        bx = f.vertex(1).v(0)
        by = f.vertex(1).v(1)
        bz = f.vertex(1).v(2)
        
        cx = f.vertex(2).v(0)
        cy = f.vertex(2).v(1)
        cz = f.vertex(2).v(2)
        
        dx = p.v(0)
        dy = p.v(1)
        dz = p.v(2)
        
        vol = (- az*by*cx + ay*bz*cx + az*bx*cy - ax*bz*cy
               - ay*bx*cz + ax*by*cz + az*by*dx - ay*bz*dx
               - az*cy*dx + bz*cy*dx + ay*cz*dx - by*cz*dx
               - az*bx*dy + ax*bz*dy + az*cx*dy - bz*cx*dy
               - ax*cz*dy + bx*cz*dy + ay*bx*dz - ax*by*dz
               - ay*cx*dz + by*cx*dz + ax*cy*dz - bx*cy*dz)
        return vol

    def make_face(self, e, p):
        new_edge = [None, None]
        for ii in range(2):
            new_edge[ii] = e.end_pt(ii).duplicate()
            if new_edge[ii] is None:
                new_edge[ii] = Edge(e.end_pt(ii), p)
                self.d_edge.append(new_edge[ii])
                e.end_pt(ii).duplicate(new_edge[ii])
        
        new_face = Face()
        new_face.edge(0, e)
        new_face.edge(1, new_edge[0])
        new_face.edge(2, new_edge[1])
        self.d_face.append(new_face)

        self.make_ccw(new_face, e, p)

        for ii in range(2):
            for jj in range(2):
                if new_edge[ii].adj_face(jj) is None:
                    new_edge[ii].adj_face(jj, new_face)
                    break
        return new_face

    def make_ccw(self, f, e, p):
        fi = None
        if e.adj_face(1) is None:
            fi = e.adj_face(0)
        else:
            if not e.adj_face(0).visible():
                fi = e.adj_face(0)
            else:
                fi = e.adj_face(1)
        
        ii = 0
        while fi.vertex(ii) != e.end_pt(1):
            ii += 1
            if ii >= 3: break # Should not happen

        if fi.vertex((ii+1)%3) != e.end_pt(0):
            f.vertex(0, e.end_pt(1))
            f.vertex(1, e.end_pt(0))
        else:
            f.vertex(0, e.end_pt(0))
            f.vertex(1, e.end_pt(1))
            e_temp = f.edge(1)
            f.edge(1, f.edge(2))
            f.edge(2, e_temp)
        
        f.vertex(2, p)

    def cleanup(self):
        self.clean_edges()
        self.clean_faces()
        self.clean_vertices()

    def clean_edges(self):
        # Integrate new faces
        for e in self.d_edge:
            if e.new_face() is not None:
                if e.adj_face(0).visible():
                    e.adj_face(0, e.new_face())
                else:
                    e.adj_face(1, e.new_face())
                e.new_face(None)
        
        # Remove deleted edges
        self.d_edge = [e for e in self.d_edge if not e.delete()]

    def clean_faces(self):
        self.d_face = [f for f in self.d_face if not f.visible()]

    def clean_vertices(self):
        for e in self.d_edge:
            e.end_pt(0).on_hull(self.ONHULL)
            e.end_pt(1).on_hull(self.ONHULL)
        
        self.d_vertex = [v for v in self.d_vertex if not (v.is_marked() and not v.on_hull())]

        for v in self.d_vertex:
            v.duplicate(None)
            v.on_hull(not self.ONHULL)

    def add_one(self, p):
        vis = False
        for f in self.d_face:
            vol = self.volume6(f, p)
            if vol < 0:
                f.visible(self.VISIBLE)
                vis = True
        
        if not vis:
            p.on_hull(not self.ONHULL)
            return False
        
        for e in self.d_edge:
            if e.adj_face(0).visible() and e.adj_face(1).visible():
                e.delete(self.REMOVED)
            elif e.adj_face(0).visible() or e.adj_face(1).visible():
                e.new_face(self.make_face(e, p))
        
        return True

    def output_delaunay_triangles(self):
        for f in self.d_face:
            if not f.top_face():
                p = PolygonDouble()
                p.add(f.vertex(0).x(), f.vertex(0).y())
                p.add(f.vertex(1).x(), f.vertex(1).y())
                p.add(f.vertex(2).x(), f.vertex(2).y())
                if self.d_pl:
                    self.d_pl.add_triangle(p)

    def output_voronoi_vertices(self):
        for f in self.d_face:
            if not f.top_face():
                voronoi_vertex = f.get_voronoi_vertex()
                p = Point(voronoi_vertex.x(), voronoi_vertex.y(), 0.0)
                if self.d_pl:
                    self.d_pl.add_voronoi_vertex(p)


class Vertex:
    def __init__(self, x=0, y=0, z=0, pt=None):
        self.d_v = [0, 0, 0]
        if pt:
            self.d_v[0] = self.map_to_int(pt.x())
            self.d_v[1] = self.map_to_int(pt.y())
            self.d_v[2] = self.map_to_int(pt.x()**2 + pt.y()**2)
        else:
            self.d_v[0] = x
            self.d_v[1] = y
            self.d_v[2] = z
        
        self.d_duplicate = None
        self.d_on_hull = not Voronoi.ONHULL
        self.d_mark = not Voronoi.PROCESSED

    def v(self, index):
        return self.d_v[index]

    def x(self):
        return self.map_to_double(self.d_v[0])
    
    def y(self):
        return self.map_to_double(self.d_v[1])
    
    def z(self):
        return self.map_to_double(self.d_v[2])

    def on_hull(self, flag=None):
        if flag is not None:
            self.d_on_hull = flag
        return self.d_on_hull

    def is_marked(self):
        return self.d_mark

    def mark(self, flag):
        self.d_mark = flag

    def duplicate(self, e=None):
        if e is not None:
            self.d_duplicate = e
        return self.d_duplicate

    def map_to_int(self, val):
        return int(val * 10000.0)

    def map_to_double(self, val):
        return float(val) / 10000.0

class Edge:
    def __init__(self, start=None, end=None):
        self.d_end_pts = [start, end]
        self.d_adj_face = [None, None]
        self.d_new_face = None
        self.d_delete = not Voronoi.REMOVED

    def end_pt(self, index):
        return self.d_end_pts[index]

    def adj_face(self, index, f=None):
        if f is not None:
            self.d_adj_face[index] = f
        return self.d_adj_face[index]

    def new_face(self, f=None):
        if f is not None:
            self.d_new_face = f
        return self.d_new_face

    def delete(self, flag=None):
        if flag is not None:
            self.d_delete = flag
        return self.d_delete

class Face:
    def __init__(self, v1=None, v2=None, v3=None, e1=None, e2=None, e3=None):
        self.d_vertex = [v1, v2, v3]
        self.d_edge = [e1, e2, e3]
        self.d_visible = False

    def vertex(self, index, v=None):
        if v is not None:
            self.d_vertex[index] = v
        return self.d_vertex[index]

    def edge(self, index, e=None):
        if e is not None:
            self.d_edge[index] = e
        return self.d_edge[index]

    def visible(self, flag=None):
        if flag is not None:
            self.d_visible = flag
        return self.d_visible

    def top_face(self):
        ax = self.d_vertex[0].v(0)
        ay = self.d_vertex[0].v(1)
        bx = self.d_vertex[1].v(0)
        by = self.d_vertex[1].v(1)
        cx = self.d_vertex[2].v(0)
        cy = self.d_vertex[2].v(1)
        
        A0 = bx - ax
        A1 = by - ay
        B0 = cx - ax
        B1 = cy - ay
        
        AxB_k = A0*B1 - A1*B0
        return AxB_k > 0

    def get_voronoi_vertex(self):
        a0 = self.d_vertex[0].v(0)
        a1 = self.d_vertex[0].v(1)
        b0 = self.d_vertex[1].v(0)
        b1 = self.d_vertex[1].v(1)
        c0 = self.d_vertex[2].v(0)
        c1 = self.d_vertex[2].v(1)
        
        D = 2*(a1*c0 + b1*a0 - b1*c0 - a1*b0 - c1*a0 + c1*b0)
        if D != 0:
            p0 = (b1*a0*a0 - c1*a0*a0 - b1*b1*a1 + c1*c1*a1 +
                  b0*b0*c1 + a1*a1*b1 + c0*c0*a1 - c1*c1*b1 -
                  c0*c0*b1 - b0*b0*a1 + b1*b1*c1 - a1*a1*c1) // D
            p1 = (a0*a0*c0 + a1*a1*c0 + b0*b0*a0 - b0*b0*c0 +
                  b1*b1*a0 - b1*b1*c0 - a0*a0*b0 - a1*a1*b0 -
                  c0*c0*a0 + c0*c0*b0 - c1*c1*a0 + c1*c1*b0) // D
            return Vertex(p0, p1, 0)
        else:
            return Vertex(0, 0, 0)
