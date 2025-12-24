from PySide6.QtWidgets import (QWidget, QGridLayout)
from .input_geometry_panel import InputGeometryPanel
from .display_geometry_frame import DisplayGeometryFrame
from .display_particle_3d_frame import DisplayParticle3DFrame

class GeometryPanel(QWidget):
    def __init__(self, part_list, geom_obj, parent_panel):
        super().__init__()
        
        self.d_parent_panel = parent_panel
        self.d_domain_size = 100.0
        self.d_geom_obj = geom_obj
        self.d_geom_piece = [] # Vector<GeomPiece>

        self.input_panel = InputGeometryPanel(part_list, self.d_geom_obj, self.d_geom_piece, self)
        
        # 2D Display Frame
        self.display_frame = DisplayGeometryFrame(part_list, self.d_geom_piece, self)
        self.display_frame.setVisible(False)
        
        # 3D Display Frame (Qt3D)
        self.display_3d_frame = DisplayParticle3DFrame(part_list)
        self.display_3d_frame.setVisible(False)

        layout = QGridLayout()
        layout.addWidget(self.input_panel, 0, 0)
        self.setLayout(layout)

    def refresh(self):
        self.input_panel.refresh()

    def update_panels(self):
        self.update()
        self.display_frame.update()
        self.d_parent_panel.update_panels()

    def get_sim_component(self):
        return self.d_parent_panel.get_sim_component()

    def refresh_display_geometry_frame(self):
        self.display_frame.refresh()
        self.display_3d_frame.refresh()

    def set_visible_display_geometry_frame(self, visible):
        self.display_frame.setVisible(visible)
        # 3D frame can be toggled similarly or separate button
        self.display_3d_frame.setVisible(visible)

    def set_domain_size(self, domain_size):
        self.d_domain_size = domain_size

    def get_domain_size(self):
        return self.d_domain_size
