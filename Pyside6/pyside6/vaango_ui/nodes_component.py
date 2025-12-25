from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QPushButton,
                               QMenu, QLabel)
from PySide6.QtGui import QAction
from PySide6.QtCore import Qt

# Import only the local node editor; avoid gui_app and pyside6_java fallbacks
try:
    from vaango_ui.node_editor import NodeEditorWidget
except Exception:
    try:
        from pyside6.vaango_ui.node_editor import NodeEditorWidget
    except Exception:
        NodeEditorWidget = None

# Try importing richer node types from pyside6.vaango_ui.nodes (discover dynamically)
try:
    import inspect
    from pyside6.vaango_ui import nodes as nodes_pkg
    _discovered_nodes = {}
    for attr_name in dir(nodes_pkg):
        attr = getattr(nodes_pkg, attr_name)
        if inspect.isclass(attr) and attr_name.endswith('Node'):
            # Try instantiate to get display name, otherwise use class name
            try:
                inst = attr()
                disp = getattr(inst, 'name', attr_name)
            except Exception:
                disp = attr_name
            _discovered_nodes[disp] = attr
except Exception:
    _discovered_nodes = {}

# Do NOT use SpatialNode here; prefer the local PySide node editor
SPATIAL_AVAILABLE = False


class SimpleNode:
    """Lightweight node model compatible with NodeEditorWidget's expectations.

    Must have: `name` attribute and `create_widget()` method and `set_input()`.
    """
    def __init__(self, name="Node"):
        self.name = name
        self.input_data = None
        self.output_data = None

    def create_widget(self):
        from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QPushButton
        widget = QWidget()
        layout = QVBoxLayout()
        widget.setLayout(layout)
        title = QLabel(self.name)
        title.setAlignment(Qt.AlignCenter)
        layout.addWidget(title)

        btn = QPushButton("Run")
        btn.clicked.connect(self.execute)
        layout.addWidget(btn)

        widget.setMaximumWidth(200)
        return widget

    def set_input(self, socket_index, upstream_node):
        # store upstream node output
        self.input_data = getattr(upstream_node, 'output_data', None)

    def execute(self):
        # default behavior: copy input to output
        self.output_data = self.input_data


class VaangoUINodesComponent(QWidget):
    """PySide6 port of Vaango_UINodesComponent (ImGui+ImNodes -> Qt).

    Provides a node editor area and a small 'Add' menu to insert example nodes.
    """
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Nodes")
        self.resize(600, 400)

        layout = QVBoxLayout()
        self.setLayout(layout)

        # Toolbar with add button
        toolbar = QHBoxLayout()
        add_btn = QPushButton("Add")
        add_menu = QMenu()
        # Populate add_menu from discovered nodes (if any), otherwise keep legacy items
        if _discovered_nodes:
            # sort display names
            for disp in sorted(_discovered_nodes.keys()):
                add_menu.addAction(QAction(disp, self, triggered=lambda checked=False, d=disp: self.add_node(d)))
        else:
            add_menu.addAction(QAction("Physical constants", self, triggered=lambda: self.add_node("Physical constants")))
            add_menu.addAction(QAction("Geometry", self, triggered=lambda: self.add_node("Geometry")))
            add_menu.addAction(QAction("Integration", self, triggered=lambda: self.add_node("Integration")))
            sim_menu = QMenu("Simulation component", self)
            sim_menu.addAction(QAction("MPM", self, triggered=lambda: self.add_node("MPM Flags")))
            sim_menu.addAction(QAction("ICE", self, triggered=lambda: self.add_node("ICE Flags")))
            sim_menu.addAction(QAction("MPMICE", self, triggered=lambda: (self.add_node("MPM Flags"), self.add_node("ICE Flags"))))
            add_menu.addMenu(sim_menu)
            add_menu.addAction(QAction("Output models", self, triggered=lambda: self.add_node("Output")))
        add_btn.setMenu(add_menu)
        toolbar.addWidget(add_btn)
        toolbar.addStretch()
        layout.addLayout(toolbar)

        # Node editor area: always use the local NodeEditorWidget implementation
        if NodeEditorWidget is not None:
            self.editor = NodeEditorWidget()
        else:
            self.editor = QLabel("Node editor not available (gui_app.widgets.node_editor missing)")
            self.editor.setAlignment(Qt.AlignCenter)

        # Build node factories from discovered nodes for Add menu and programmatic adds
        self._node_factories = {}
        for disp, cls in _discovered_nodes.items():
            self._node_factories[disp] = (lambda c=cls: c())
        # ensure SimpleNode fallback
        self._node_factories.setdefault('SimpleNode', lambda: SimpleNode('SimpleNode'))

        layout.addWidget(self.editor)

    def add_node(self, name: str):
        # Instantiate node via discovered factories when possible
        factory = None
        if hasattr(self, '_node_factories') and name in self._node_factories:
            factory = self._node_factories[name]
        else:
            # fallback to class-level discoveries
            if name in _discovered_nodes:
                factory = (lambda c=_discovered_nodes[name]: c())
            else:
                factory = lambda: SimpleNode(name=name)

        # If using SpatialNode's graph model, add by model name
        try:
            if SPATIAL_AVAILABLE and hasattr(self, '_graph_model'):
                # graph_model.addNode expects the registered model type name
                self._graph_model.addNode(name)
                return
        except Exception:
            pass

        # Otherwise create an instance and add to the view's API
        node = factory()
        try:
            self.editor.add_node(node)
        except Exception:
            print(f"Added node: {name} (no editor present)")
