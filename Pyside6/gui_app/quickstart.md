# Quick Start Guide

## Installation

### 1. Install Dependencies

```bash
pip install PySide6 pymeshlab numpy
```

Or use the requirements file:

```bash
pip install -r requirements.txt
```

### 2. Project Structure

Create the following directory structure:

```
engineering_pipeline/
├── main.py
├── app.py
├── viewer_3d.py
├── requirements.txt
├── widgets/
│   ├── __init__.py
│   ├── node_editor.py
│   ├── property_editor.py
│   └── node_palette.py
└── nodes/
    ├── __init__.py
    ├── base_node.py
    ├── import_geometry.py
    ├── mesh_clean.py
    └── other_nodes.py
```

### 3. Run the Application

```bash
python main.py
```

## First Steps

### Creating Your First Pipeline

1. **Import Geometry**
   - Click "Import Geometry" in the Node Library
   - Node appears in the editor
   - Click "Browse..." button
   - Select a .obj, .stl, or .ply file
   - Mesh appears in 3D viewer

2. **Clean the Mesh**
   - Click "Mesh Clean" in Node Library
   - Drag from output socket of Import node to input socket of Clean node
   - Orange line appears connecting them
   - Clean node auto-executes
   - Check the property panel for options

3. **View Properties**
   - Click any node to select it
   - Properties appear in left bottom panel
   - Modify parameters
   - Changes apply immediately

### Node Editor Controls

| Action | Control |
|--------|---------|
| Move node | Left-click and drag node |
| Create connection | Click output socket, drag to input socket |
| Select node | Left-click node |
| Delete node | Select node, press Delete key |
| Zoom | Mouse wheel |
| Pan | Middle mouse button + drag |
| Select multiple | Drag rubber band over nodes |

### 3D Viewer Controls

- **Orbit**: Left mouse button + drag
- **Pan**: Middle mouse button + drag
- **Zoom**: Mouse wheel

## Example Workflows

### Basic Mesh Processing

```
Import Geometry → Mesh Clean → Generate Mesh → Postprocess
```

1. Import a surface mesh (.stl)
2. Clean duplicates and fix orientation
3. Generate tetrahedral volume mesh
4. Visualize results

### Complete Simulation Pipeline

```
Import Geometry → Mesh Clean → Generate Mesh → Problem Setup → Solver → Postprocess
```

1. Import geometry
2. Clean and repair
3. Generate volume mesh
4. Define materials and boundary conditions
5. Run solver
6. Visualize results and export

## Tips and Tricks

### Selecting Nodes
- Click directly on the node title bar for best results
- Avoid clicking on widgets inside the node

### Connection Tips
- Always drag from **output** (right) to **input** (left)
- Connections only work between different nodes
- One output can connect to multiple inputs
- One input accepts only one connection (last wins)

### Property Editor
- Some nodes have no editable properties
- Properties update in real-time
- Changes may trigger auto-execution

### 3D Viewer
- Click "View → 3D Viewer" to open
- Window can be closed and reopened
- Mesh updates automatically when nodes execute

### Performance
- Large meshes may take time to display
- Zoom out if node editor feels sluggish
- Use wireframe mode for complex meshes

## Troubleshooting

### Problem: Nodes don't connect
**Solution**: Make sure you're dragging from output (right) to input (left), not the reverse.

### Problem: Nothing happens when I connect nodes
**Solution**: Some nodes don't auto-execute. Click the "Run" button on the node.

### Problem: Can't see the mesh in 3D viewer
**Solution**: 
- Check that file loaded successfully
- Look in property panel for error messages
- Try zooming out in 3D viewer
- Reset camera: Close and reopen 3D viewer

### Problem: Node editor is too zoomed in/out
**Solution**: Use mouse wheel to adjust zoom level.

### Problem: Can't move nodes
**Solution**: 
- Make sure you're clicking on the node background, not widgets
- Try clicking the title bar area
- Check that node isn't behind another node

### Problem: Property editor shows "No properties"
**Solution**: This is normal for some nodes. Not all nodes have editable properties.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Delete / Backspace | Delete selected nodes |
| Mouse Wheel | Zoom in/out |
| Middle Mouse | Pan view |

## Next Steps

1. **Explore Nodes**: Try each node type to understand capabilities
2. **Build Pipelines**: Create multi-step workflows
3. **Customize**: Modify node parameters in property panel
4. **Export**: Use Postprocess node to export results

## Creating Custom Nodes

See the README.md for detailed instructions on creating custom nodes.

Basic template:

```python
from nodes.base_node import BaseNode
from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel

class MyNode(BaseNode):
    def __init__(self):
        super().__init__(name="My Node")
    
    def create_widget(self):
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        
        label = QLabel("My Custom Node")
        label.setStyleSheet("color: white;")
        layout.addWidget(label)
        
        widget.setMaximumWidth(180)
        return widget
    
    def execute(self):
        print("Executing my node!")
```

Then add to NODE_REGISTRY in main.py.

## Getting Help

- Check README.md for detailed documentation
- Review example nodes for patterns
- Look at node_editor.py for connection logic
- Check property_editor.py for UI patterns

## Common Patterns

### Auto-execution on Input
```python
def set_input(self, socket_index, upstream_node):
    self.input_data = upstream_node.output_data
    self.execute()  # Auto-run when input arrives
```

### Manual Execution
```python
def set_input(self, socket_index, upstream_node):
    self.input_data = upstream_node.output_data
    # Don't execute - wait for user to click Run button
```

### Passing Data Downstream
```python
def execute(self):
    # Process data
    result = self.process(self.input_data)
    
    # Store for downstream nodes
    self.output_data = result
    
    # Notify connections
    self.executed.emit()
```

Happy node editing!
