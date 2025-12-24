import math
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QTabWidget, QLabel)
from .geom_pieces import (BoxGeomPiece, CylinderGeomPiece, SphereGeomPiece, 
                          SmoothCylGeomPiece, SmoothSphereGeomPiece, UnionGeomPiece, DifferenceGeomPiece)
from .particle import Particle
from .point import Point

class CreateGeomPiecePanel(QWidget):
    def __init__(self, use_part_list, part_list, geom_piece_list, parent):
        super().__init__()
        self.d_parent = parent
        self.d_geom_piece = geom_piece_list
        self.d_part_list = part_list
        self.d_part_geom_piece_exists = False
        
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()
        
        button_layout = QHBoxLayout()
        self.add_button = QPushButton("Create Geom Piece")
        self.add_button.clicked.connect(self.on_add_clicked)
        self.del_button = QPushButton("Delete Geom Piece")
        self.del_button.clicked.connect(self.on_del_clicked)
        
        button_layout.addWidget(self.add_button)
        button_layout.addWidget(self.del_button)
        layout.addLayout(button_layout)
        
        self.geom_piece_tab_pane = QTabWidget()
        layout.addWidget(self.geom_piece_tab_pane)
        
        self.setLayout(layout)

    def on_add_clicked(self):
        # Stub for adding manual pieces
        label = QLabel(f"Geom Piece {self.geom_piece_tab_pane.count()}")
        self.geom_piece_tab_pane.addTab(label, f"Object {self.geom_piece_tab_pane.count()}")

    def on_del_clicked(self):
        idx = self.geom_piece_tab_pane.currentIndex()
        if idx >= 0:
            self.geom_piece_tab_pane.removeTab(idx)

    def create_part_list_geom_piece(self, sim_component):
        if not self.d_part_list or self.d_part_list.size() == 0:
            return
        if self.d_part_geom_piece_exists:
            return
            
        part_thick = self.d_part_list.get_particle(0).get_thickness()
        
        if part_thick > 0.0:
            self.create_hollow_part_list_geom_piece(sim_component)
        else:
            self.create_solid_part_list_geom_piece(sim_component)
            
        self.d_part_geom_piece_exists = True

    def delete_part_list_geom_piece(self):
        if not self.d_part_list or self.d_part_list.size() == 0:
            return
            
        if self.d_part_geom_piece_exists:
            self.d_geom_piece.clear()
            self.d_part_geom_piece_exists = False

    def create_solid_part_list_geom_piece(self, sim_component):
        part_type = self.d_part_list.get_particle(0).get_type()
        if part_type == Particle.CIRCLE:
            self.create_solid_cylinder_geom_piece()
        elif part_type == Particle.SPHERE:
            self.create_solid_sphere_geom_piece()

    def create_hollow_part_list_geom_piece(self, sim_component):
        part_type = self.d_part_list.get_particle(0).get_type()
        if part_type == Particle.CIRCLE:
            self.create_hollow_cylinder_geom_piece()
        elif part_type == Particle.SPHERE:
            self.create_hollow_sphere_geom_piece()

    def create_solid_cylinder_geom_piece(self):
        num_part = self.d_part_list.size()
        rve_size = self.d_part_list.get_rve_size()
        min_rad = self.d_part_list.get_particle(num_part - 1).get_radius()
        point_spacing = min_rad / 10.0
        
        union = UnionGeomPiece("all_particles")
        for ii in range(num_part):
            part = self.d_part_list.get_particle(ii)
            center = part.get_center()
            radius = part.get_radius()
            length = part.get_length()
            if length == 0.0:
                length = 0.05 * rve_size
            thickness = radius
            
            num_radial = math.ceil(radius / point_spacing)
            num_axial = math.ceil(length / point_spacing)
            
            arc_points = self.calc_arc_points(center, radius, rve_size)
            arc_start = arc_points[0]
            arc_angle = arc_points[1]
            
            name = f"solid_cylinder_{ii}"
            piece = SmoothCylGeomPiece(name, center, radius, thickness, length, 
                                       int(num_radial), int(num_axial), arc_start, arc_angle)
            self.d_geom_piece.append(piece)
            
            solid_name = f"outer_cylinder_{ii}"
            cyl_piece = CylinderGeomPiece(solid_name, center, radius, length)
            union.add_geom_piece(cyl_piece)
            
        min_pt = Point(0.0, 0.0, 0.0)
        max_pt = Point(rve_size, rve_size, rve_size)
        box = BoxGeomPiece("domain", min_pt, max_pt)
        
        diff = DifferenceGeomPiece("rest_of_domain", box, union)
        self.d_geom_piece.append(diff)

    def create_solid_sphere_geom_piece(self):
        num_part = self.d_part_list.size()
        rve_size = self.d_part_list.get_rve_size()
        min_rad = self.d_part_list.get_particle(num_part - 1).get_radius()
        point_spacing = min_rad / 10.0
        
        union = UnionGeomPiece("all_particles")
        for ii in range(num_part):
            part = self.d_part_list.get_particle(ii)
            center = part.get_center()
            outer_radius = part.get_radius()
            inner_radius = 0.0
            
            num_radial = math.ceil(outer_radius / point_spacing)
            
            name = f"solid_sphere_{ii}"
            piece = SmoothSphereGeomPiece(name, center, outer_radius, inner_radius, int(num_radial))
            self.d_geom_piece.append(piece)
            
            solid_name = f"outer_sphere_{ii}"
            sph_piece = SphereGeomPiece(solid_name, center, outer_radius)
            union.add_geom_piece(sph_piece)
            
        min_pt = Point(0.0, 0.0, 0.0)
        max_pt = Point(rve_size, rve_size, rve_size)
        box = BoxGeomPiece("domain", min_pt, max_pt)
        
        diff = DifferenceGeomPiece("rest_of_domain", box, union)
        self.d_geom_piece.append(diff)

    def create_hollow_cylinder_geom_piece(self):
        # ... Similar logic to create_solid_cylinder_geom_piece but with inner/outer
        # For brevity, implementing a simplified version or copying logic
        num_part = self.d_part_list.size()
        rve_size = self.d_part_list.get_rve_size()
        min_rad = self.d_part_list.get_particle(num_part - 1).get_radius()
        point_spacing = min_rad / 10.0
        
        union_outer = UnionGeomPiece("all_particles")
        union_inner = UnionGeomPiece("all_inside")
        
        for ii in range(num_part):
            part = self.d_part_list.get_particle(ii)
            center = part.get_center()
            radius = part.get_radius()
            length = part.get_length()
            if length == 0.0:
                length = 0.05 * rve_size
            thickness = part.get_thickness()
            
            num_radial = math.ceil(radius / point_spacing)
            num_axial = math.ceil(length / point_spacing)
            
            arc_points = self.calc_arc_points(center, radius, rve_size)
            arc_start = arc_points[0]
            arc_angle = arc_points[1]
            
            name = f"hollow_cylinder_{ii}"
            piece = SmoothCylGeomPiece(name, center, radius, thickness, length, 
                                       int(num_radial), int(num_axial), arc_start, arc_angle)
            self.d_geom_piece.append(piece)
            
            solid_name = f"outer_cylinder_{ii}"
            cyl_piece_solid = CylinderGeomPiece(solid_name, center, radius, length)
            union_outer.add_geom_piece(cyl_piece_solid)
            
            hollow_name = f"inner_cylinder_{ii}"
            cyl_piece_hollow = CylinderGeomPiece(hollow_name, center, radius - thickness, length)
            union_inner.add_geom_piece(cyl_piece_hollow)
            
        min_pt = Point(0.0, 0.0, 0.0)
        max_pt = Point(rve_size, rve_size, rve_size)
        box = BoxGeomPiece("domain", min_pt, max_pt)
        
        diff = DifferenceGeomPiece("rest_of_domain", box, union_outer)
        self.d_geom_piece.append(diff)
        self.d_geom_piece.append(union_inner)

    def create_hollow_sphere_geom_piece(self):
        num_part = self.d_part_list.size()
        rve_size = self.d_part_list.get_rve_size()
        min_rad = self.d_part_list.get_particle(num_part - 1).get_radius()
        point_spacing = min_rad / 7.0
        
        union_outer = UnionGeomPiece("all_particles")
        union_inner = UnionGeomPiece("all_inside")
        
        for ii in range(num_part):
            part = self.d_part_list.get_particle(ii)
            center = part.get_center()
            outer_radius = part.get_radius()
            thickness = part.get_thickness()
            inner_radius = outer_radius - thickness
            
            num_radial = max(2, math.ceil(thickness / point_spacing))
            
            name = f"hollow_sphere_{ii}"
            piece = SmoothSphereGeomPiece(name, center, outer_radius, inner_radius, int(num_radial))
            self.d_geom_piece.append(piece)
            
            solid_name = f"outer_sphere_{ii}"
            sph_piece_solid = SphereGeomPiece(solid_name, center, outer_radius)
            union_outer.add_geom_piece(sph_piece_solid)
            
            hollow_name = f"inner_sphere_{ii}"
            sph_piece_hollow = SphereGeomPiece(hollow_name, center, inner_radius)
            union_inner.add_geom_piece(sph_piece_hollow)
            
        min_pt = Point(0.0, 0.0, 0.0)
        max_pt = Point(rve_size, rve_size, rve_size)
        box = BoxGeomPiece("domain", min_pt, max_pt)
        
        diff = DifferenceGeomPiece("rest_of_domain", box, union_outer)
        self.d_geom_piece.append(diff)
        self.d_geom_piece.append(union_inner)

    def calc_arc_points(self, center, radius, rve_size):
        # Simplified stub or full logic
        # For now, return default 0-360
        return [0.0, 360.0]

class CreateGeomObjectPanel(QWidget):
    def __init__(self, use_part_list, part_list, geom_obj, geom_piece, parent):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Create Geom Object Panel (Stub)"))
        self.setLayout(layout)

    def use_part_list(self, use): pass
    def disable_create(self): pass
    def disable_delete(self): pass
    def enable_create(self): pass
    def enable_delete(self): pass
    def add_part_list_geom_object_panel(self): pass
    def remove_part_list_geom_object_panel(self): pass
