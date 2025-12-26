from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QPushButton, QScrollArea
from PySide6.QtCore import Qt


class NodePaletteWidget(QWidget):
    """Widget displaying available node types"""
    
    def __init__(self, node_registry, node_editor):
        super().__init__()
        self.node_registry = node_registry
        self.node_editor = node_editor
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout()
        self.setLayout(layout)
        
        # Title
        title = QLabel("Node Library")
        title.setStyleSheet("font-weight: bold; font-size: 14px; padding: 5px;")
        layout.addWidget(title)
        
        # Scroll area for node buttons
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        
        buttons_widget = QWidget()
        buttons_layout = QVBoxLayout()
        buttons_widget.setLayout(buttons_layout)
        
        # Create button for each node type
        for node_name, node_class in self.node_registry.items():
            display_name = node_name.replace("Node", "")
            button = QPushButton(display_name)
            button.setMinimumHeight(35)
            button.clicked.connect(lambda checked, nc=node_class: self.create_node(nc))
            button.setStyleSheet("""
                QPushButton {
                    text-align: left;
                    padding-left: 10px;
                    background-color: #5a5a5a;
                    color: white;
                    border: 1px solid #3a3a3a;
                    border-radius: 3px;
                }
                QPushButton:hover {
                    background-color: #6a6a6a;
                }
                QPushButton:pressed {
                    background-color: #4a4a4a;
                }
            """)
            buttons_layout.addWidget(button)
        
        buttons_layout.addStretch()
        scroll.setWidget(buttons_widget)
        layout.addWidget(scroll)
    
    def create_node(self, node_class):
        """Create and add a new node instance"""
        node_instance = node_class()
        
        # Get position from app
        from app import PipelineApp
        app = PipelineApp.get_instance()
        pos = app.get_next_node_position()
        
        # Add to editor
        self.node_editor.add_node(node_instance, pos)
