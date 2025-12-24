from PySide6.QtWidgets import (QWidget, QGridLayout, QCheckBox)
from .create_geom_piece_panel import CreateGeomPiecePanel, CreateGeomObjectPanel

class InputGeometryPanel(QWidget):
    def __init__(self, part_list, geom_obj, geom_piece, parent):
        super().__init__()
        self.d_part_list = part_list
        self.d_geom_obj = geom_obj
        self.d_geom_piece = geom_piece
        self.d_parent = parent
        
        self.d_domain_size = 100.0
        self.d_use_part_list = False

        self.init_ui()

    def init_ui(self):
        layout = QGridLayout()

        self.use_part_list_cb = QCheckBox("Use Computed Particle Distribution")
        self.use_part_list_cb.stateChanged.connect(self.on_use_part_list_changed)
        
        self.create_geom_piece_panel = CreateGeomPiecePanel(
            self.d_use_part_list, self.d_part_list, self.d_geom_piece, self)
        
        self.create_geom_object_panel = CreateGeomObjectPanel(
            self.d_use_part_list, self.d_part_list, self.d_geom_obj, self.d_geom_piece, self)
        
        layout.addWidget(self.use_part_list_cb, 0, 0)
        layout.addWidget(self.create_geom_piece_panel, 1, 0)
        layout.addWidget(self.create_geom_object_panel, 2, 0)
        
        self.setLayout(layout)

    def refresh(self):
        if self.d_part_list and self.d_part_list.size() > 0:
            self.d_use_part_list = True
            self.d_domain_size = self.d_part_list.get_rve_size()
            self.update_panels()

    def update_panels(self):
        if self.d_parent:
            self.d_parent.update_panels()

    def on_use_part_list_changed(self, state):
        if state:
            self.create_part_list_geom_objects()
        else:
            self.delete_part_list_geom_objects()

    def refresh_display(self):
        self.d_parent.set_domain_size(self.d_domain_size)
        self.d_parent.refresh_display_geometry_frame()

    def create_part_list_geom_objects(self):
        self.d_use_part_list = True
        sim_component = self.d_parent.get_sim_component()
        
        self.create_geom_piece_panel.setEnabled(False)
        self.create_geom_piece_panel.setVisible(False)
        
        self.create_geom_object_panel.use_part_list(self.d_use_part_list)
        self.create_geom_object_panel.disable_create()
        self.create_geom_object_panel.disable_delete()
        
        if self.d_part_list:
            self.d_domain_size = self.d_part_list.get_rve_size()
            self.create_geom_piece_panel.create_part_list_geom_piece(sim_component)
            self.create_geom_object_panel.add_part_list_geom_object_panel()
            self.refresh_display()

    def delete_part_list_geom_objects(self):
        self.d_use_part_list = False
        self.create_geom_piece_panel.setVisible(True)
        self.create_geom_piece_panel.setEnabled(True)
        
        self.create_geom_object_panel.use_part_list(self.d_use_part_list)
        self.create_geom_object_panel.enable_create()
        self.create_geom_object_panel.enable_delete()
        
        if self.d_part_list:
            self.d_domain_size = 100.0
            self.create_geom_piece_panel.delete_part_list_geom_piece()
            self.create_geom_object_panel.remove_part_list_geom_object_panel()
            self.refresh_display()
