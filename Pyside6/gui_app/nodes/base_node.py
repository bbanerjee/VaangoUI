import uuid
from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QPushButton
from PySide6.QtCore import Qt, Signal, QObject


class BaseNode(QObject):
    """Base class for all nodes in the pipeline"""
    
    # Signals
    executed = Signal()
    property_changed = Signal()
    
    def __init__(self, name="BaseNode"):
        super().__init__()
        
        from app import PipelineApp
        self.app = PipelineApp.get_instance()
        
        self.name = name
        self.node_id = str(uuid.uuid4())
        
        # Register this instance
        self.app.nodes[self.node_id] = self
        
        # Node data
        self.input_data = None
        self.output_data = None
        
        print(f"Created node: {self.name} with ID {self.node_id}")
    
    def create_widget(self):
        """Create the Qt widget that will be displayed in the node"""
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        
        # Placeholder content
        info_label = QLabel("Configure me")
        info_label.setAlignment(Qt.AlignCenter)
        info_label.setStyleSheet("color: white; padding: 5px;")
        layout.addWidget(info_label)
        
        # Run button
        run_btn = QPushButton("Run")
        run_btn.clicked.connect(self.execute)
        run_btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 5px;
                border-radius: 3px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)
        layout.addWidget(run_btn)
        
        widget.setMaximumWidth(180)
        widget.setStyleSheet("background: transparent;")
        
        return widget
    
    def set_input(self, socket_index, upstream_node):
        """Called when an upstream node is connected"""
        print(f"{self.name} received input from {upstream_node.name}")
        self.input_data = upstream_node.output_data
        
        # Optionally auto-execute when input arrives
        # self.execute()
    
    def execute(self):
        """Execute the node's main function"""
        print(f"Executing {self.name} node")
        self.executed.emit()
    
    def edit_properties(self, layout):
        """Override this to add custom properties to the property editor
        
        Args:
            layout: QVBoxLayout where properties should be added
        """
        label = QLabel("No properties available")
        label.setStyleSheet("color: gray;")
        layout.addWidget(label)
    
    def clear_input(self):
        """Clear input data when disconnected"""
        self.input_data = None
        self.output_data = None
    
    def get_status_text(self):
        """Get current status text for display"""
        return "Ready"
