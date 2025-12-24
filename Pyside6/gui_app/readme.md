# Engineering Pipeline Studio - Qt Conversion

This is a complete conversion of the DearPyGUI-based Engineering Pipeline Studio to PySide6 with Qt3D.

## Project Structure

```
project/
├── main.py                      # Application entry point
├── app.py                       # Singleton application class
├── viewer_3d.py                 # Qt3D mesh viewer
├── requirements.txt             # Python dependencies
├── widgets/
│   ├── node_editor.py          # Custom node graph editor
│   ├── property_editor.py      # Property editing panel
│   └── node_palette.py         # Node library palette
└── nodes/
    ├── base_node.py            # Base class for all nodes
    ├── import_geometry.py      # Geometry import node
    ├── mesh_clean.py           # Mesh cleaning node
    ├── geometry_builder.py     # Geometry builder node
    ├── generate_mesh.py        # Tetrahedral mesh generation
    ├── problem_setup.py        # Problem setup node
    ├── solver.py               # Solver node
    ├── postprocess.py          # Post-processing node
    └── other_nodes.py          # Additional node implementations
```

## Key Changes from DearPyGUI

### 1. **Node Editor System**

DearPyGUI has built-in node editor support. Qt doesn't, so I created a custom implementation:

- **NodeEditorWidget**: QGraphicsView-based node graph editor
- **NodeGraphicsItem**: Visual representation of nodes
- **NodeSocket**: Input/output connection points
- **Connection**: Bezier curves connecting nodes
- **NodeEditorScene**: Custom scene handling connections

**Features:**
- Drag nodes to move
- Click sockets to create connections
- Delete key removes selected nodes
- Mouse wheel to zoom
- Middle mouse button to pan
- Rubber band selection

### 2. **Widget Replacements**

| DearPyGUI | PySide6 |
|-----------|---------|
| `dpg.window()` | `QMainWindow`, `QDockWidget` |
| `dpg.node_editor()` | Custom `NodeEditorWidget` |
| `dpg.node()` | `NodeGraphicsItem` |
| `dpg.slider_float()` | `QSlider`, `QDoubleSpinBox` |
| `dpg.combo()` | `QComboBox` |
| `dpg.checkbox()` | `QCheckBox` |
| `dpg.button()` | `QPushButton` |
| `dpg.input_text()` | `QLineEdit` |
| `dpg.file_dialog()` | `QFileDialog` |

### 3. **Event Handling**

DearPyGUI uses callbacks:
```python
dpg.add_button(callback=my_function)
```

Qt uses signals/slots:
```python
button.clicked.connect(my_function)
```

### 4. **3D Viewer**

- **DearPyGUI**: No built-in 3D viewer (custom implementation needed)
- **Qt3D**: Full-featured 3D rendering with `Qt3DWindow`

The `Viewer3D` class provides:
- Mesh rendering with Qt3D
- Camera controls (orbit, pan, zoom)
- Lighting setup
- Material properties
- Wireframe/solid rendering

### 5. **Layout System**

DearPyGUI uses containers and groups:
```python
with dpg.window():
    with dpg.group(horizontal=True):
        dpg.add_button()
```

Qt uses layouts:
```python
window = QMainWindow()
layout = QVBoxLayout()
layout.addWidget(button)
```

### 6. **Styling**

- **DearPyGUI**: Uses themes with `dpg.bind_theme()`
- **Qt**: Uses QSS (Qt Style Sheets), similar to CSS

## Installation

```bash
pip install -r requirements.txt
```

## Running the Application

```bash
python main.py
```

## Node Implementation Guide

### Creating a New Node

1. **Inherit from BaseNode:**

```python
from nodes.base_node import BaseNode
from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel

class MyNode(BaseNode):
    def __init__(self):
        super().__init__(name="My Custom Node")
        self.my_parameter = 1.0
```

2. **Create the node's widget:**

```python
def create_widget(self):
    widget = QWidget()
    layout = QVBoxLayout()
    widget.setLayout(layout)
    
    # Add controls
    label = QLabel("My Parameter")
    label.setStyleSheet("color: white;")
    layout.addWidget(label)
    
    widget.setMaximumWidth(180)
    widget.setStyleSheet("background: transparent;")
    return widget
```

3. **Implement input handling:**

```python
def set_input(self, socket_index, upstream_node):
    # Get data from upstream node
    self.input_data = upstream_node.output_data
    # Optionally auto-execute
    self.execute()
```

4. **Implement execution:**

```python
def execute(self):
    # Process input_data
    result = self.process(self.input_data)
    
    # Store output
    self.output_data = result
    
    # Update viewer if needed
    self.app.viewer.load_mesh(result)
    
    # Emit signal
    self.executed.emit()
```

5. **Add property editor:**

```python
def edit_properties(self, layout):
    # Add widgets to property editor
    from PySide6.QtWidgets import QLabel, QDoubleSpinBox
    
    layout.addWidget(QLabel("My Parameter:"))
    
    spinbox = QDoubleSpinBox()
    spinbox.setValue(self.my_parameter)
    spinbox.valueChanged.connect(self.update_parameter)
    layout.addWidget(spinbox)

def update_parameter(self, value):
    self.my_parameter = value
    self.property_changed.emit()
```

6. **Register in main.py:**

```python
from nodes.my_node import MyNode

NODE_REGISTRY = {
    # ... existing nodes
    "MyNode": MyNode,
}
```

## Architecture Overview

### Application Flow

1. **main.py** creates `MainWindow`
2. `MainWindow` sets up:
   - Central widget: `NodeEditorWidget`
   - Left dock: `NodePaletteWidget`
   - Left bottom dock: `PropertyEditorWidget`
   - Menu bar with actions
3. User creates nodes from palette
4. Nodes are added to `NodeEditorScene`
5. User connects nodes by dragging sockets
6. Connections trigger `set_input()` on downstream nodes
7. Node execution updates `output_data`
8. Viewer displays results

### Signal Flow

```
User Action → Qt Signal → Node Method → Update UI/Data → Emit Signal → Downstream Nodes
```

### Data Flow

```
Import → Clean → Generate Mesh → Problem Setup → Solver → Post-Process
   ↓        ↓          ↓              ↓            ↓           ↓
MeshSet  MeshSet   Tet Mesh      Materials    Results    Visualization
```

## Key Differences Summary

| Aspect | DearPyGUI | PySide6/Qt |
|--------|-----------|------------|
| **Architecture** | Immediate mode | Retained mode |
| **Widgets** | Context managers | Object-oriented |
| **Events** | Callbacks | Signals/Slots |
| **Layout** | Groups/Containers | Layout managers |
| **Node Editor** | Built-in | Custom implementation |
| **3D** | External | Qt3D built-in |
| **Styling** | Theme API | QSS (CSS-like) |
| **Threading** | Simple callbacks | QThread/signals |

## Advanced Features

### Custom Node Graphics

Modify `NodeGraphicsItem.paint()` to customize node appearance:

```python
def paint(self, painter, option, widget):
    # Custom drawing code
    painter.setBrush(QBrush(QColor(255, 100, 100)))
    painter.drawRoundedRect(self.boundingRect(), 15, 15)
```

### Connection Validation

Override `NodeEditorScene.end_connection()` to add validation:

```python
def end_connection(self, end_socket):
    # Check connection validity
    if not self.is_valid_connection(self.start_socket, end_socket):
        return
    # ... create connection
```

### Async Operations

Use QThread for long-running operations:

```python
from PySide6.QtCore import QThread, Signal

class SolverThread(QThread):
    progress = Signal(int)
    finished = Signal(dict)
    
    def run(self):
        # Long-running solver code
        for i in range(100):
            # ... work ...
            self.progress.emit(i)
        self.finished.emit(results)
```

## Troubleshooting

### Node Editor Not Responding
- Check that `NodeGraphicsItem` has `ItemIsMovable` flag set
- Verify scene rect is large enough: `setSceneRect(-5000, -5000, 10000, 10000)`

### Connections Not Drawing
- Ensure sockets are children of `NodeGraphicsItem`
- Check that `update_path()` is called on position changes

### 3D Viewer Not Showing Mesh
- Verify mesh has valid vertices and faces
- Check camera position and view center
- Ensure geometry buffer data is correct format (float32, uint32)

### Properties Not Updating
- Connect signals properly: `widget.valueChanged.connect(callback)`
- Call `property_changed.emit()` after updates
- Check that property editor is cleared before repopulating

## Performance Tips

1. **Large Meshes**: Use level-of-detail for display
2. **Many Nodes**: Implement viewport culling in scene
3. **Real-time Updates**: Throttle viewer updates with QTimer
4. **Memory**: Clean up disconnected nodes properly

## Future Enhancements

- [ ] Undo/redo system using QUndoCommand
- [ ] Node templates/presets
- [ ] Multi-selection and group operations
- [ ] Node comments/annotations
- [ ] Export/import pipeline as JSON
- [ ] Python console for scripting
- [ ] Plugin system for custom nodes
- [ ] Performance profiling overlay

## License

Same as original project.
