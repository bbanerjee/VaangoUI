from PySide6.QtWidgets import (QWidget, QVBoxLayout, QLabel, QScrollArea, 
                               QFormLayout, QLineEdit, QSpinBox, QDoubleSpinBox,
                               QCheckBox, QComboBox, QPushButton, QSlider)
from PySide6.QtCore import Qt, Signal


class PropertyEditorWidget(QWidget):
    """Widget for editing node properties"""
    
    def __init__(self):
        super().__init__()
        self.current_node = None
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout()
        self.setLayout(layout)
        
        # Title
        title = QLabel("Properties")
        title.setStyleSheet("font-weight: bold; font-size: 14px; padding: 5px;")
        layout.addWidget(title)
        
        # Scroll area for properties
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        
        self.properties_container = QWidget()
        self.properties_layout = QVBoxLayout()
        self.properties_container.setLayout(self.properties_layout)
        
        scroll.setWidget(self.properties_container)
        layout.addWidget(scroll)
        
        # Default message
        self.show_default_message()
    
    def show_default_message(self):
        """Show default message when no node is selected"""
        self.clear()
        label = QLabel("Select a node to edit properties")
        label.setStyleSheet("color: gray; padding: 10px;")
        label.setAlignment(Qt.AlignCenter)
        self.properties_layout.addWidget(label)
        self.properties_layout.addStretch()
    
    def clear(self):
        """Clear all property widgets"""
        while self.properties_layout.count():
            child = self.properties_layout.takeAt(0)
            if child.widget():
                child.widget().deleteLater()
    
    def show_node_properties(self, node_instance):
        """Display properties for a given node"""
        self.clear()
        self.current_node = node_instance
        
        if not node_instance or not hasattr(node_instance, 'edit_properties'):
            label = QLabel("This node has no editable properties")
            label.setStyleSheet("color: gray; padding: 10px;")
            self.properties_layout.addWidget(label)
            self.properties_layout.addStretch()
            return
        
        # Let the node populate its properties
        node_instance.edit_properties(self.properties_layout)
        self.properties_layout.addStretch()
    
    def add_text_property(self, label, value, callback):
        """Add a text input property"""
        widget = QLineEdit(value)
        widget.textChanged.connect(callback)
        self.properties_layout.addWidget(QLabel(label))
        self.properties_layout.addWidget(widget)
        return widget
    
    def add_int_property(self, label, value, min_val, max_val, callback):
        """Add an integer input property"""
        widget = QSpinBox()
        widget.setRange(min_val, max_val)
        widget.setValue(value)
        widget.valueChanged.connect(callback)
        self.properties_layout.addWidget(QLabel(label))
        self.properties_layout.addWidget(widget)
        return widget
    
    def add_float_property(self, label, value, min_val, max_val, callback):
        """Add a float input property"""
        widget = QDoubleSpinBox()
        widget.setRange(min_val, max_val)
        widget.setValue(value)
        widget.setDecimals(3)
        widget.valueChanged.connect(callback)
        self.properties_layout.addWidget(QLabel(label))
        self.properties_layout.addWidget(widget)
        return widget
    
    def add_bool_property(self, label, value, callback):
        """Add a checkbox property"""
        widget = QCheckBox(label)
        widget.setChecked(value)
        widget.stateChanged.connect(lambda state: callback(state == Qt.Checked))
        self.properties_layout.addWidget(widget)
        return widget
    
    def add_combo_property(self, label, items, current, callback):
        """Add a combo box property"""
        widget = QComboBox()
        widget.addItems(items)
        widget.setCurrentText(current)
        widget.currentTextChanged.connect(callback)
        self.properties_layout.addWidget(QLabel(label))
        self.properties_layout.addWidget(widget)
        return widget
    
    def add_button(self, label, callback):
        """Add a button"""
        button = QPushButton(label)
        button.clicked.connect(callback)
        self.properties_layout.addWidget(button)
        return button
    
    def add_slider_property(self, label, value, min_val, max_val, callback):
        """Add a slider property"""
        widget = QSlider(Qt.Horizontal)
        widget.setRange(int(min_val * 100), int(max_val * 100))
        widget.setValue(int(value * 100))
        widget.valueChanged.connect(lambda v: callback(v / 100.0))
        
        value_label = QLabel(f"{value:.2f}")
        widget.valueChanged.connect(lambda v: value_label.setText(f"{v/100.0:.2f}"))
        
        self.properties_layout.addWidget(QLabel(label))
        self.properties_layout.addWidget(widget)
        self.properties_layout.addWidget(value_label)
        return widget
