from PySide6.QtWidgets import (QWidget, QVBoxLayout, QLabel, QPushButton,
                               QCheckBox, QGroupBox, QFormLayout)
from PySide6.QtCore import Qt
from nodes.base_node import BaseNode
import pymeshlab


class MeshCleanNode(BaseNode):
    """Node for cleaning and repairing meshes"""
    
    def __init__(self):
        super().__init__(name="Mesh Clean & Repair")
        self.mesh_set = None
        
        # Repair options
        self.remove_dup_vertices = True
        self.remove_dup_faces = True
        self.remove_zero_area = True
        self.fix_orientation = True
        
        # UI elements
        self.status_label = None
        self.dup_v_check = None
        self.dup_f_check = None
        self.zero_check = None
        self.orient_check = None
    
    def create_widget(self):
        """Create the node's UI widget"""
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        
        # Title
        title = QLabel("Repair Options")
        title.setStyleSheet("color: white; font-weight: bold; font-size: 11px;")
        layout.addWidget(title)
        
        # Checkboxes
        self.dup_v_check = QCheckBox("Duplicate vertices")
        self.dup_v_check.setChecked(self.remove_dup_vertices)
        self.dup_v_check.setStyleSheet("color: white; font-size: 10px;")
        self.dup_v_check.stateChanged.connect(
            lambda state: setattr(self, 'remove_dup_vertices', state == Qt.Checked)
        )
        layout.addWidget(self.dup_v_check)
        
        self.dup_f_check = QCheckBox("Duplicate faces")
        self.dup_f_check.setChecked(self.remove_dup_faces)
        self.dup_f_check.setStyleSheet("color: white; font-size: 10px;")
        self.dup_f_check.stateChanged.connect(
            lambda state: setattr(self, 'remove_dup_faces', state == Qt.Checked)
        )
        layout.addWidget(self.dup_f_check)
        
        self.zero_check = QCheckBox("Zero-area faces")
        self.zero_check.setChecked(self.remove_zero_area)
        self.zero_check.setStyleSheet("color: white; font-size: 10px;")
        self.zero_check.stateChanged.connect(
            lambda state: setattr(self, 'remove_zero_area', state == Qt.Checked)
        )
        layout.addWidget(self.zero_check)
        
        self.orient_check = QCheckBox("Fix orientation")
        self.orient_check.setChecked(self.fix_orientation)
        self.orient_check.setStyleSheet("color: white; font-size: 10px;")
        self.orient_check.stateChanged.connect(
            lambda state: setattr(self, 'fix_orientation', state == Qt.Checked)
        )
        layout.addWidget(self.orient_check)
        
        # Clean button
        clean_btn = QPushButton("Clean Now")
        clean_btn.clicked.connect(self.execute)
        clean_btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 6px;
                border-radius: 3px;
                margin-top: 5px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)
        layout.addWidget(clean_btn)
        
        # Status
        self.status_label = QLabel("Waiting for input")
        self.status_label.setStyleSheet("color: white; font-size: 9px;")
        self.status_label.setWordWrap(True)
        self.status_label.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.status_label)
        
        widget.setMaximumWidth(180)
        widget.setStyleSheet("background: transparent;")
        
        return widget
    
    def set_input(self, socket_index, upstream_node):
        """Called when upstream node is connected"""
        print(f"{self.name} received input from {upstream_node.name}")
        
        # Get mesh from upstream node
        if hasattr(upstream_node, "mesh_set") and upstream_node.mesh_set:
            self.mesh_set = upstream_node.mesh_set
            if self.status_label:
                self.status_label.setText("Input received")
            # Auto-execute
            self.execute()
        elif hasattr(upstream_node, "output_data"):
            self.mesh_set = upstream_node.output_data
            if self.status_label:
                self.status_label.setText("Input received")
            self.execute()
    
    def execute(self):
        """Execute mesh cleaning"""
        if not self.mesh_set or self.mesh_set.is_empty():
            if self.status_label:
                self.status_label.setText("Error: No input mesh")
            return
        
        try:
            # Apply selected repairs
            if self.remove_dup_vertices:
                self.mesh_set.remove_duplicate_vertices()
            
            if self.remove_dup_faces:
                self.mesh_set.remove_duplicate_faces()
            
            if self.remove_zero_area:
                self.mesh_set.remove_zero_area_faces()
            
            if self.fix_orientation:
                self.mesh_set.meshing_repair_non_manifold_edges()
                self.mesh_set.meshing_repair_non_manifold_vertices()
            
            # Get cleaned mesh
            cleaned = self.mesh_set.current_mesh()
            
            # Store output
            self.output_data = self.mesh_set
            
            # Update viewer
            self.app.viewer.load_mesh(cleaned)
            
            # Update status
            status_text = f"Cleaned\n{cleaned.vertex_number()} verts\n{cleaned.face_number()} faces"
            if self.status_label:
                self.status_label.setText(status_text)
            
            print(f"Mesh cleaned: {cleaned.vertex_number()} vertices, {cleaned.face_number()} faces")
            
            # Notify downstream
            self.executed.emit()
            
        except Exception as e:
            print(f"Error cleaning mesh: {e}")
            if self.status_label:
                self.status_label.setText(f"Error: {str(e)}")
    
    def edit_properties(self, layout):
        """Add properties to property editor"""
        # Options group
        options_group = QGroupBox("Cleaning Options")
        options_layout = QFormLayout()
        options_group.setLayout(options_layout)
        
        # Create checkboxes
        dup_v = QCheckBox()
        dup_v.setChecked(self.remove_dup_vertices)
        dup_v.stateChanged.connect(
            lambda state: self.update_option('remove_dup_vertices', state == Qt.Checked)
        )
        options_layout.addRow("Remove duplicate vertices:", dup_v)
        
        dup_f = QCheckBox()
        dup_f.setChecked(self.remove_dup_faces)
        dup_f.stateChanged.connect(
            lambda state: self.update_option('remove_dup_faces', state == Qt.Checked)
        )
        options_layout.addRow("Remove duplicate faces:", dup_f)
        
        zero = QCheckBox()
        zero.setChecked(self.remove_zero_area)
        zero.stateChanged.connect(
            lambda state: self.update_option('remove_zero_area', state == Qt.Checked)
        )
        options_layout.addRow("Remove zero-area faces:", zero)
        
        orient = QCheckBox()
        orient.setChecked(self.fix_orientation)
        orient.stateChanged.connect(
            lambda state: self.update_option('fix_orientation', state == Qt.Checked)
        )
        options_layout.addRow("Fix orientation:", orient)
        
        layout.addWidget(options_group)
        
        # Execute button
        execute_btn = QPushButton("Clean Mesh")
        execute_btn.clicked.connect(self.execute)
        layout.addWidget(execute_btn)
        
        # Status info
        if self.mesh_set:
            mesh = self.mesh_set.current_mesh()
            info_label = QLabel(f"Current mesh: {mesh.vertex_number()} vertices, {mesh.face_number()} faces")
            info_label.setStyleSheet("color: gray; padding: 5px; margin-top: 10px;")
            layout.addWidget(info_label)
    
    def update_option(self, option_name, value):
        """Update an option and sync with node widget checkboxes"""
        setattr(self, option_name, value)
        
        # Update node widget checkboxes
        if option_name == 'remove_dup_vertices' and self.dup_v_check:
            self.dup_v_check.setChecked(value)
        elif option_name == 'remove_dup_faces' and self.dup_f_check:
            self.dup_f_check.setChecked(value)
        elif option_name == 'remove_zero_area' and self.zero_check:
            self.zero_check.setChecked(value)
        elif option_name == 'fix_orientation' and self.orient_check:
            self.orient_check.setChecked(value)
    
    def clear_input(self):
        """Clear node data"""
        self.mesh_set = None
        self.output_data = None
        if self.status_label:
            self.status_label.setText("Waiting for input")
