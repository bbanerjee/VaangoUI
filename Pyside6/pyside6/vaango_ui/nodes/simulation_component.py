from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QPushButton
from PySide6.QtCore import Qt

class SimulationComponentNode:
    def __init__(self):
        self.name = "Simulation component"
        self.component = "MPM"  # default

    def create_widget(self):
        w = QWidget()
        layout = QVBoxLayout()
        w.setLayout(layout)

        title = QLabel(self.name)
        title.setAlignment(Qt.AlignCenter)
        layout.addWidget(title)

        cb = QComboBox()
        cb.addItems(["MPM", "ICE", "MPMICE"])
        cb.setCurrentText(self.component)
        cb.currentTextChanged.connect(self._on_component_changed)
        layout.addWidget(cb)

        return w

    def set_input(self, socket_index, upstream_node):
        # accept upstream node output if connected
        self.input_node = upstream_node

    def execute(self):
        pass

    def _on_component_changed(self, text):
        self.component = text
        # If MPM selected, programmatically add MPMFlags node and connect it
        if text == "MPM":
            try:
                from PySide6.QtWidgets import QApplication
                from vaango_ui import nodes as nodes_pkg
                from vaango_ui.widgets.node_editor import Connection, NodeGraphicsItem
            except Exception:
                return

            # Find Nodes component window (VaangoUINodesComponent)
            editor_widget = None
            for top in QApplication.topLevelWidgets():
                try:
                    if hasattr(top, 'editor'):
                        editor_widget = getattr(top, 'editor')
                        break
                except Exception:
                    continue
            if editor_widget is None:
                return

            # Create an MPMFlagsNode instance and add to editor
            try:
                MPMCls = getattr(nodes_pkg, 'MPMFlagsNode', None)
                if MPMCls is None:
                    return
                mpm_inst = MPMCls()
                graphics_mpm = editor_widget.add_node(mpm_inst)
            except Exception:
                return

            # Find this node's graphics item in the scene
            scene = editor_widget.scene() if hasattr(editor_widget, 'scene') else getattr(editor_widget, 'editor_scene', None)
            if scene is None:
                return

            sim_graphics = None
            mpm_graphics = None
            for item in scene.items():
                try:
                    if isinstance(item, NodeGraphicsItem):
                        if getattr(item, 'node_instance', None) is self:
                            sim_graphics = item
                        if getattr(item, 'node_instance', None) is mpm_inst:
                            mpm_graphics = item
                except Exception:
                    continue

            if sim_graphics is None or mpm_graphics is None:
                return

            # Create connection from mpm_graphics.output_socket to sim_graphics.input_socket
            try:
                start_socket = mpm_graphics.output_socket
                end_socket = sim_graphics.input_socket
                conn = Connection(start_socket, end_socket)
                scene.addItem(conn)
                start_socket.connections.append(conn)
                end_socket.connections.append(conn)
                conn.update_path()

                # Notify set_input on the simulation node
                try:
                    sim_graphics.node_instance.set_input(end_socket.index, mpm_inst)
                except Exception:
                    pass
            except Exception:
                return
