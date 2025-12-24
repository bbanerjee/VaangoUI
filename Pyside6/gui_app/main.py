import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QDockWidget, QVBoxLayout, QWidget, QPushButton, QLabel
from PySide6.QtCore import Qt
from app import PipelineApp
from widgets.node_editor import NodeEditorWidget
from widgets.property_editor import PropertyEditorWidget
from widgets.node_palette import NodePaletteWidget
from viewer_3d import Viewer3D

# Global registry for nodes
from nodes.import_geometry import ImportGeometryNode
from nodes.geometry_builder import GeometryBuilderNode
from nodes.mesh_clean import MeshCleanNode
from nodes.generate_mesh import GenerateMeshNode
from nodes.problem_setup import ProblemSetupNode
from nodes.solver import SolverNode
from nodes.postprocess import PostProcessNode

NODE_REGISTRY = {
    "ImportGeometryNode": ImportGeometryNode,
    "GeometryBuilderNode": GeometryBuilderNode,
    "MeshCleanNode": MeshCleanNode,
    "GenerateMeshNode": GenerateMeshNode,
    "ProblemSetupNode": ProblemSetupNode,
    "SolverNode": SolverNode,
    "PostProcessNode": PostProcessNode,
}


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Engineering Pipeline Studio")
        self.resize(1600, 1000)
        
        # Get app singleton
        self.app = PipelineApp.get_instance()
        
        # Create central widget - node editor
        self.node_editor = NodeEditorWidget()
        self.setCentralWidget(self.node_editor)
        self.app.node_editor = self.node_editor
        
        # Create menu bar
        self.create_menu_bar()
        
        # Create left dock - node palette
        self.create_node_palette()
        
        # Create left bottom dock - property editor
        self.create_property_editor()
        
        # Apply stylesheet
        self.apply_stylesheet()
    
    def create_menu_bar(self):
        menubar = self.menuBar()
        
        # File menu
        file_menu = menubar.addMenu("File")
        file_menu.addAction("New")
        file_menu.addAction("Load")
        file_menu.addAction("Save")
        
        # View menu
        view_menu = menubar.addMenu("View")
        view_3d_action = view_menu.addAction("3D Viewer")
        view_3d_action.triggered.connect(self.show_3d_viewer)
        
        # Layout menu
        layout_menu = menubar.addMenu("Layout")
        reset_layout_action = layout_menu.addAction("Reset Auto-Layout")
        reset_layout_action.triggered.connect(self.app.reset_layout)
    
    def create_node_palette(self):
        dock = QDockWidget("Node Library", self)
        dock.setAllowedAreas(Qt.LeftDockWidgetArea | Qt.RightDockWidgetArea)
        
        self.node_palette = NodePaletteWidget(NODE_REGISTRY, self.node_editor)
        dock.setWidget(self.node_palette)
        
        self.addDockWidget(Qt.LeftDockWidgetArea, dock)
        dock.setMaximumWidth(300)
    
    def create_property_editor(self):
        dock = QDockWidget("Properties", self)
        dock.setAllowedAreas(Qt.LeftDockWidgetArea | Qt.RightDockWidgetArea)
        
        self.property_editor = PropertyEditorWidget()
        dock.setWidget(self.property_editor)
        self.app.property_editor = self.property_editor
        
        self.addDockWidget(Qt.LeftDockWidgetArea, dock)
        dock.setMaximumWidth(300)
    
    def show_3d_viewer(self):
        self.app.viewer.show()
    
    def apply_stylesheet(self):
        # Light theme stylesheet
        self.setStyleSheet("""
            QMainWindow {
                background-color: #f0f0f0;
            }
            QDockWidget {
                background-color: #ffffff;
                titlebar-close-icon: url(close.png);
                titlebar-normal-icon: url(float.png);
            }
            QDockWidget::title {
                background-color: #e0e0e0;
                padding: 5px;
            }
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 8px;
                border-radius: 4px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
            QPushButton:pressed {
                background-color: #3d8b40;
            }
        """)


def main():
    app = QApplication(sys.argv)
    app.setStyle("Fusion")  # Modern look
    
    window = MainWindow()
    window.show()
    
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
