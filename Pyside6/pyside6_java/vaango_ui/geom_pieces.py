import abc
from .point import Point

class GeomPiece(abc.ABC):
    def __init__(self):
        self.d_name = ""

    @abc.abstractmethod
    def get_name(self):
        pass

    @abc.abstractmethod
    def write_uintah(self, file, tab):
        pass

    @abc.abstractmethod
    def print(self):
        pass

class BoxGeomPiece(GeomPiece):
    def __init__(self, name="Box", min_pt=None, max_pt=None):
        super().__init__()
        self.d_name = name
        self.d_min = Point(min_pt) if min_pt else Point()
        self.d_max = Point(max_pt) if max_pt else Point()

    def set(self, name, min_pt, max_pt):
        self.d_name = name
        self.d_min = min_pt
        self.d_max = max_pt

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        tab1 = tab + "  "
        file.write(f"{tab}<box label=\"{self.d_name}\">\n")
        file.write(f"{tab1}<min> [{self.d_min.x()}, {self.d_min.y()}, {self.d_min.z()}] </min>\n")
        file.write(f"{tab1}<max> [{self.d_max.x()}, {self.d_max.y()}, {self.d_max.z()}] </max>\n")
        file.write(f"{tab}</box>\n")

    def print(self):
        tab1 = "  "
        print(f"<box label=\"{self.d_name}\">")
        print(f"{tab1}<min> [{self.d_min.x()}, {self.d_min.y()}, {self.d_min.z()}] </min>")
        print(f"{tab1}<max> [{self.d_max.x()}, {self.d_max.y()}, {self.d_max.z()}] </max>")
        print("</box>")

class CylinderGeomPiece(GeomPiece):
    def __init__(self, name="Cylinder", center=None, radius=0.0, length=0.0):
        super().__init__()
        self.d_name = name
        self.d_radius = radius
        if center:
            self.d_bottom = Point(center)
            self.d_top = Point(center.x(), center.y(), center.z() + length)
        else:
            self.d_bottom = Point()
            self.d_top = Point()

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        tab1 = tab + "  "
        file.write(f"{tab}<cylinder label=\"{self.d_name}\">\n")
        file.write(f"{tab1}<bottom> [{self.d_bottom.x()}, {self.d_bottom.y()}, {self.d_bottom.z()}] </bottom>\n")
        file.write(f"{tab1}<top> [{self.d_top.x()}, {self.d_top.y()}, {self.d_top.z()}] </top>\n")
        file.write(f"{tab1}<radius> {self.d_radius} </radius>\n")
        file.write(f"{tab}</cylinder>\n")

    def print(self):
        tab1 = "  "
        print(f"<cylinder label=\"{self.d_name}\">")
        print(f"{tab1}<bottom> [{self.d_bottom.x()}, {self.d_bottom.y()}, {self.d_bottom.z()}] </bottom>")
        print(f"{tab1}<top> [{self.d_top.x()}, {self.d_top.y()}, {self.d_top.z()}] </top>")
        print(f"{tab1}<radius> {self.d_radius} </radius>")
        print("</cylinder>")

class SphereGeomPiece(GeomPiece):
    def __init__(self, name="Sphere", center=None, radius=0.0):
        super().__init__()
        self.d_name = name
        self.d_radius = radius
        self.d_center = Point(center) if center else Point()

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        tab1 = tab + "  "
        file.write(f"{tab}<sphere label=\"{self.d_name}\">\n")
        file.write(f"{tab1}<origin> [{self.d_center.x()}, {self.d_center.y()}, {self.d_center.z()}] </origin>\n")
        file.write(f"{tab1}<radius> {self.d_radius} </radius>\n")
        file.write(f"{tab}</sphere>\n")

    def print(self):
        tab1 = "  "
        print(f"<sphere label=\"{self.d_name}\">")
        print(f"{tab1}<origin> [{self.d_center.x()}, {self.d_center.y()}, {self.d_center.z()}] </origin>")
        print(f"{tab1}<radius> {self.d_radius} </radius>")
        print("</sphere>")

class SmoothCylGeomPiece(GeomPiece):
    def __init__(self, name="SmoothCyl", center=None, radius=0.0, thickness=0.0, length=0.0, 
                 num_radial=0, num_axial=0, arc_start=0.0, arc_angle=0.0):
        super().__init__()
        self.d_name = name
        self.d_radius = radius
        self.d_thickness = thickness if thickness != 0.0 else radius
        self.d_num_radial = num_radial
        self.d_num_axial = num_axial
        self.d_arc_start_angle = arc_start
        self.d_arc_angle = arc_angle if arc_angle != 0.0 else 360.0
        
        if center:
            self.d_bottom = Point(center)
            self.d_top = Point(center.x(), center.y(), center.z() + length)
        else:
            self.d_bottom = Point()
            self.d_top = Point()

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        tab1 = tab + "  "
        file.write(f"{tab}<smoothcyl label=\"{self.d_name}\">\n")
        file.write(f"{tab1}<bottom> [{self.d_bottom.x()}, {self.d_bottom.y()}, {self.d_bottom.z()}] </bottom>\n")
        file.write(f"{tab1}<top> [{self.d_top.x()}, {self.d_top.y()}, {self.d_top.z()}] </top>\n")
        file.write(f"{tab1}<radius> {self.d_radius} </radius>\n")
        file.write(f"{tab1}<thickness> {self.d_thickness} </thickness>\n")
        file.write(f"{tab1}<num_radial> {self.d_num_radial} </num_radial>\n")
        file.write(f"{tab1}<num_axial> 2 </num_axial>\n") # Hardcoded in Java
        file.write(f"{tab}</smoothcyl>\n")

    def print(self):
        tab1 = "  "
        print(f"<smoothcyl label=\"{self.d_name}\">")
        print(f"{tab1}<bottom> [{self.d_bottom.x()}, {self.d_bottom.y()}, {self.d_bottom.z()}] </bottom>")
        print(f"{tab1}<top> [{self.d_top.x()}, {self.d_top.y()}, {self.d_top.z()}] </top>")
        print(f"{tab1}<radius> {self.d_radius} </radius>")
        print(f"{tab1}<thickness> {self.d_thickness} </thickness>")
        print(f"{tab1}<num_radial> {self.d_num_radial} </num_radial>")
        print(f"{tab1}<num_axial> {self.d_num_axial} </num_axial>")
        print(f"{tab1}<arc_start_angle> {self.d_arc_start_angle} </arc_start_angle>")
        print(f"{tab1}<arc_angle> {self.d_arc_angle} </arc_angle>")
        print("</smoothcyl>")

class SmoothSphereGeomPiece(GeomPiece):
    def __init__(self, name="SmoothSphere", center=None, outer_radius=0.0, 
                 inner_radius=0.0, num_radial=0):
        super().__init__()
        self.d_name = name
        self.d_outer_radius = outer_radius
        self.d_inner_radius = inner_radius
        self.d_num_radial = num_radial
        self.d_center = Point(center) if center else Point()

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        tab1 = tab + "  "
        file.write(f"{tab}<smooth_sphere label=\"{self.d_name}\">\n")
        file.write(f"{tab1}<center> [{self.d_center.x()}, {self.d_center.y()}, {self.d_center.z()}] </center>\n")
        file.write(f"{tab1}<outer_radius> {self.d_outer_radius} </outer_radius>\n")
        file.write(f"{tab1}<inner_radius> {self.d_inner_radius} </inner_radius>\n")
        file.write(f"{tab1}<num_radial_pts> {self.d_num_radial} </num_radial_pts>\n")
        file.write(f"{tab1}<algorithm> equal_area </algorithm>\n")
        file.write(f"{tab}</smooth_sphere>\n")

    def print(self):
        tab1 = "  "
        print(f"<smooth_sphere label=\"{self.d_name}\">")
        print(f"{tab1}<center> [{self.d_center.x()}, {self.d_center.y()}, {self.d_center.z()}] </center>")
        print(f"{tab1}<outer_radius> {self.d_outer_radius} </outer_radius>")
        print(f"{tab1}<inner_radius> {self.d_inner_radius} </inner_radius>")
        print(f"{tab1}<num_radial_pts> {self.d_num_radial} </num_radial_pts>")
        print(f"{tab1}<algorithm> equal_area </algorithm>")
        print("</smooth_sphere>")

class DifferenceGeomPiece(GeomPiece):
    def __init__(self, name="Difference", geom_piece1=None, geom_piece2=None):
        super().__init__()
        self.d_name = name
        self.d_geom_piece1 = geom_piece1
        self.d_geom_piece2 = geom_piece2

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        if not self.d_geom_piece1 or not self.d_geom_piece2:
            return
        
        tab1 = tab + "  "
        file.write(f"{tab}<difference label=\"{self.d_name}\">\n")
        self.d_geom_piece1.write_uintah(file, tab1)
        self.d_geom_piece2.write_uintah(file, tab1)
        file.write(f"{tab}</difference>\n")

    def print(self):
        if not self.d_geom_piece1 or not self.d_geom_piece2:
            return

        print(f"<difference label=\"{self.d_name}\">")
        self.d_geom_piece1.print()
        self.d_geom_piece2.print()
        print("</difference>")

class UnionGeomPiece(GeomPiece):
    def __init__(self, name="Union", geom_pieces=None):
        super().__init__()
        self.d_name = name
        self.d_geom_pieces = geom_pieces if geom_pieces else []

    def set(self, name, geom_pieces):
        self.d_name = name
        self.d_geom_pieces = geom_pieces if geom_pieces else []

    def add_geom_piece(self, geom_piece):
        self.d_geom_pieces.append(geom_piece)

    def get_name(self):
        return self.d_name

    def write_uintah(self, file, tab):
        if not self.d_geom_pieces:
            return

        tab1 = tab + "  "
        file.write(f"{tab}<union label=\"{self.d_name}\">\n")
        for piece in self.d_geom_pieces:
            piece.write_uintah(file, tab1)
        file.write(f"{tab}</union>\n")

    def print(self):
        if not self.d_geom_pieces:
            return

        print(f"<union label=\"{self.d_name}\">")
        for piece in self.d_geom_pieces:
            piece.print()
        print("</union>")
