import os
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QLabel, QPushButton, 
                               QFileDialog, QHBoxLayout)
from PySide6.QtCore import Qt
from nodes.base_node import BaseNode
import pymeshlab


class ImportGeometryNode(BaseNode):
    """Node for importing 3D geometry files"""
    
    def __init__(self):
        super().__init__(name="Import Geometry")
        self.file_path = ""
        self.mesh_set = None
        self.status_label = None
    
    def create_widget(self):
        """Create the node's UI widget"""
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        
        # Browse button
        browse_btn = QPushButton("Browse...")
        browse_btn.clicked.connect(self.browse_file)
        browse_btn.setStyleSheet("""
            QPushButton {
                background-color: #5a5a5a;
                color: white;
                border: none;
                padding: 8px;
                border-radius: 3px;
            }
            QPushButton:hover {
                background-color: #6a6a6a;
            }
        """)
        layout.addWidget(browse_btn)
        
        # Status label
        self.status_label = QLabel("No file loaded")
        self.status_label.setStyleSheet("color: white; font-size: 10px;")
        self.status_label.setWordWrap(True)
        self.status_label.setAlignment(Qt.AlignCenter)
        layout.addWidget(self.status_label)
        
        widget.setMaximumWidth(180)
        widget.setStyleSheet("background: transparent;")
        
        return widget
    
    def browse_file(self):
        """Open file browser dialog"""
        file_path, _ = QFileDialog.getOpenFileName(
            None,
            "Select 3D Geometry File",
            "",
            "3D Files (*.obj *.stl *.ply *.off *.3ds *.dae *.fbx *.gltf *.glb);;All Files (*)"
        )
        
        if file_path:
            self.load_file(file_path)
    
    def load_file(self, file_path):
        """Load the selected file"""
        try:
            self.file_path = file_path
            self.mesh_set = pymeshlab.MeshSet()
            self.mesh_set.load_new_mesh(self.file_path)
            
            print(f"Loaded {self.file_path}")
            
            # Update status
            filename = os.path.basename(self.file_path)
            mesh = self.mesh_set.current_mesh()
            status_text = f"{filename}\n{mesh.vertex_number()} verts\n{mesh.face_number()} faces"
            if self.status_label:
                self.status_label.setText(status_text)
            
            # Store output
            self.output_data = self.mesh_set
            
            # Show in viewer
            self.app.viewer.load_mesh(mesh)
            
            # Notify downstream
            self.executed.emit()
            
        except Exception as e:
            print(f"Error loading file: {e}")
            if self.status_label:
                self.status_label.setText(f"Error: {str(e)}")
    
    def execute(self):
        """Execute node - trigger file browser if no file loaded"""
        if not self.mesh_set:
            self.browse_file()
        else:
            # Re-display the mesh
            if self.mesh_set:
                self.app.viewer.load_mesh(self.mesh_set.current_mesh())
    
    def edit_properties(self, layout):
        """Add properties to property editor"""
        # File path display
        path_label = QLabel("File Path:")
        path_label.setStyleSheet("font-weight: bold;")
        layout.addWidget(path_label)
        
        path_value = QLabel(self.file_path if self.file_path else "No file loaded")
        path_value.setWordWrap(True)
        path_value.setStyleSheet("color: gray; padding: 5px; background: #f5f5f5; border-radius: 3px;")
        layout.addWidget(path_value)
        
        # Mesh info
        if self.mesh_set:
            mesh = self.mesh_set.current_mesh()
            
            info_label = QLabel("Mesh Information:")
            info_label.setStyleSheet("font-weight: bold; margin-top: 10px;")
            layout.addWidget(info_label)
            
            info_text = f"""
            Vertices: {mesh.vertex_number()}
            Faces: {mesh.face_number()}
            Edges: {mesh.edge_number()}
            """
            info_value = QLabel(info_text)
            info_value.setStyleSheet("color: gray; padding: 5px; background: #f5f5f5; border-radius: 3px;")
            layout.addWidget(info_value)
        
        # Reload button
        reload_btn = QPushButton("Reload File")
        reload_btn.clicked.connect(lambda: self.load_file(self.file_path) if self.file_path else None)
        reload_btn.setEnabled(bool(self.file_path))
        layout.addWidget(reload_btn)
    
    def clear_input(self):
        """Clear node data"""
        self.file_path = ""
        self.mesh_set = None
        self.output_data = None
        if self.status_label:
            self.status_label.setText("No file loaded")
