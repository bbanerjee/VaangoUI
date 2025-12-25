from PySide6.QtWidgets import (QGraphicsView, QGraphicsScene, QGraphicsItem, 
                               QGraphicsProxyWidget, QWidget, QVBoxLayout, QLabel,
                               QGraphicsPathItem, QGraphicsEllipseItem)
from PySide6.QtCore import Qt, QRectF, QPointF, QLineF, Signal, QObject
from PySide6.QtGui import QPen, QBrush, QColor, QPainter, QPainterPath, QTransform


class NodeSocket(QGraphicsEllipseItem):
    """Represents an input or output socket on a node"""
    def __init__(self, node, socket_type, index=0):
        super().__init__(-8, -8, 16, 16)
        self.node = node
        self.socket_type = socket_type  # 'input' or 'output'
        self.index = index
        self.connections = []  # List of Connection objects
        
        # Styling
        self.setBrush(QBrush(QColor(100, 200, 100)))
        self.setPen(QPen(QColor(0, 0, 0), 2))
        self.setAcceptHoverEvents(True)
        self.setZValue(3)
    
    def hoverEnterEvent(self, event):
        self.setBrush(QBrush(QColor(150, 255, 150)))
        super().hoverEnterEvent(event)
    
    def hoverLeaveEvent(self, event):
        self.setBrush(QBrush(QColor(100, 200, 100)))
        super().hoverLeaveEvent(event)
    
    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.node.scene().start_connection(self)
        super().mousePressEvent(event)
    
    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.node.scene().end_connection(self)
        super().mouseReleaseEvent(event)


class Connection(QGraphicsPathItem):
    """Represents a connection between two sockets"""
    def __init__(self, start_socket, end_socket=None):
        super().__init__()
        self.start_socket = start_socket
        self.end_socket = end_socket
        
        # Styling
        pen = QPen(QColor(100, 100, 100), 3)
        self.setPen(pen)
        self.setZValue(1)
        
        self.update_path()
    
    def update_path(self, end_pos=None):
        """Update the bezier curve path"""
        path = QPainterPath()
        
        start_pos = self.start_socket.scenePos()
        if end_pos is None and self.end_socket:
            end_pos = self.end_socket.scenePos()
        elif end_pos is None:
            return
        
        path.moveTo(start_pos)
        
        # Create smooth bezier curve
        dx = end_pos.x() - start_pos.x()
        ctrl_offset = abs(dx) * 0.5
        
        ctrl1 = QPointF(start_pos.x() + ctrl_offset, start_pos.y())
        ctrl2 = QPointF(end_pos.x() - ctrl_offset, end_pos.y())
        
        path.cubicTo(ctrl1, ctrl2, end_pos)
        self.setPath(path)
    
    def remove(self):
        """Remove this connection from both sockets"""
        if self.start_socket:
            try:
                self.start_socket.connections.remove(self)
            except ValueError:
                pass
        if self.end_socket:
            try:
                self.end_socket.connections.remove(self)
            except ValueError:
                pass
        if self.scene():
            self.scene().removeItem(self)


class NodeGraphicsItem(QGraphicsItem):
    """Graphics item representing a node in the editor"""
    def __init__(self, node_instance):
        super().__init__()
        self.node_instance = node_instance
        self.width = 200
        self.height = 150
        
        # Sockets
        self.input_socket = NodeSocket(self, 'input', 0)
        self.input_socket.setParentItem(self)
        self.input_socket.setPos(0, 30)
        
        self.output_socket = NodeSocket(self, 'output', 0)
        self.output_socket.setParentItem(self)
        self.output_socket.setPos(self.width, 30)
        
        # Create proxy widget for node content
        self.proxy = QGraphicsProxyWidget(self)
        self.proxy.setWidget(node_instance.create_widget())
        self.proxy.setPos(10, 40)
        
        # Set flags
        self.setFlag(QGraphicsItem.ItemIsMovable, True)
        self.setFlag(QGraphicsItem.ItemIsSelectable, True)
        self.setFlag(QGraphicsItem.ItemSendsGeometryChanges, True)
        self.setZValue(2)
    
    def boundingRect(self):
        return QRectF(0, 0, self.width, self.height)
    
    def paint(self, painter, option, widget):
        # Draw node background
        if self.isSelected():
            painter.setBrush(QBrush(QColor(255, 200, 100, 200)))
            painter.setPen(QPen(QColor(255, 150, 0), 3))
        else:
            painter.setBrush(QBrush(QColor(70, 70, 80, 220)))
            painter.setPen(QPen(QColor(0, 0, 0), 2))
        
        painter.drawRoundedRect(self.boundingRect(), 10, 10)
        
        # Draw title bar
        painter.setBrush(QBrush(QColor(50, 50, 60, 220)))
        title_rect = QRectF(0, 0, self.width, 30)
        painter.drawRoundedRect(title_rect, 10, 10)
        
        # Draw title text
        painter.setPen(QPen(QColor(255, 255, 255)))
        painter.drawText(title_rect, Qt.AlignCenter, self.node_instance.name)
    
    def itemChange(self, change, value):
        # Update connections when node moves
        if change == QGraphicsItem.ItemPositionHasChanged:
            for conn in list(self.input_socket.connections):
                conn.update_path()
            for conn in list(self.output_socket.connections):
                conn.update_path()
        
        if change == QGraphicsItem.ItemSelectedHasChanged:
            if value:  # Node was selected
                try:
                    self.scene().node_selected.emit(self.node_instance)
                except Exception:
                    pass
        
        return super().itemChange(change, value)


class NodeEditorScene(QGraphicsScene):
    """Custom scene for node editor with connection logic"""
    node_selected = Signal(object)  # Emits node_instance when selected
    
    def __init__(self):
        super().__init__()
        self.temp_connection = None
        self.start_socket = None
        self.setSceneRect(-5000, -5000, 10000, 10000)
    
    def start_connection(self, socket):
        """Start dragging a new connection"""
        self.start_socket = socket
        self.temp_connection = Connection(socket)
        self.addItem(self.temp_connection)
    
    def end_connection(self, end_socket):
        """Complete a connection between two sockets"""
        if not self.temp_connection or not self.start_socket:
            return
        
        # Remove temporary connection
        self.removeItem(self.temp_connection)
        self.temp_connection = None
        
        # Validate connection (output -> input only)
        if self.start_socket.socket_type == end_socket.socket_type:
            self.start_socket = None
            return
        
        # Ensure output -> input direction
        if self.start_socket.socket_type == 'input':
            self.start_socket, end_socket = end_socket, self.start_socket
        
        # Don't connect node to itself
        if self.start_socket.node == end_socket.node:
            self.start_socket = None
            return
        
        # Create permanent connection
        connection = Connection(self.start_socket, end_socket)
        self.addItem(connection)
        
        self.start_socket.connections.append(connection)
        end_socket.connections.append(connection)
        
        # Notify nodes
        output_node = self.start_socket.node.node_instance
        input_node = end_socket.node.node_instance
        try:
            input_node.set_input(end_socket.index, output_node)
        except Exception:
            pass
        
        self.start_socket = None
    
    def mouseMoveEvent(self, event):
        # Update temporary connection while dragging
        if self.temp_connection:
            self.temp_connection.update_path(event.scenePos())
        super().mouseMoveEvent(event)
    
    def mouseReleaseEvent(self, event):
        # Cancel temporary connection if released in empty space
        if self.temp_connection:
            self.removeItem(self.temp_connection)
            self.temp_connection = None
            self.start_socket = None
        super().mouseReleaseEvent(event)
    
    def keyPressEvent(self, event):
        # Delete selected items
        if event.key() == Qt.Key_Delete or event.key() == Qt.Key_Backspace:
            for item in self.selectedItems():
                if isinstance(item, NodeGraphicsItem):
                    # Remove all connections
                    for conn in list(item.input_socket.connections):
                        conn.remove()
                    for conn in list(item.output_socket.connections):
                        conn.remove()
                    self.removeItem(item)
        super().keyPressEvent(event)


class NodeEditorWidget(QGraphicsView):
    """Main node editor widget using QGraphicsView"""
    def __init__(self):
        super().__init__()
        
        # Create custom scene
        self.editor_scene = NodeEditorScene()
        self.setScene(self.editor_scene)
        
        # View settings
        self.setRenderHint(QPainter.Antialiasing)
        self.setRenderHint(QPainter.TextAntialiasing)
        self.setViewportUpdateMode(QGraphicsView.FullViewportUpdate)
        self.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.setTransformationAnchor(QGraphicsView.AnchorUnderMouse)
        self.setResizeAnchor(QGraphicsView.AnchorUnderMouse)
        
        # Enable mouse tracking and drag mode
        self.setDragMode(QGraphicsView.RubberBandDrag)
        
        # Background
        self.setBackgroundBrush(QBrush(QColor(53, 53, 53)))
    
    def add_node(self, node_instance, pos=None):
        """Add a node instance to the editor"""
        graphics_node = NodeGraphicsItem(node_instance)
        self.editor_scene.addItem(graphics_node)
        
        if pos:
            graphics_node.setPos(pos[0], pos[1])
        
        return graphics_node
    
    def wheelEvent(self, event):
        """Zoom with mouse wheel"""
        zoom_factor = 1.15
        
        if event.angleDelta().y() > 0:
            self.scale(zoom_factor, zoom_factor)
        else:
            self.scale(1 / zoom_factor, 1 / zoom_factor)
    
    def mousePressEvent(self, event):
        if event.button() == Qt.MiddleButton:
            self.setDragMode(QGraphicsView.ScrollHandDrag)
        super().mousePressEvent(event)
    
    def mouseReleaseEvent(self, event):
        if event.button() == Qt.MiddleButton:
            self.setDragMode(QGraphicsView.RubberBandDrag)
        super().mouseReleaseEvent(event)

    def contextMenuEvent(self, event):
        # Build a menu of available node types from pyside6.vaango_ui.nodes
        try:
            import inspect, importlib
            # Try package-relative import first, then common package names
            nodes_pkg = None
            pkg_candidates = []
            if __package__:
                pkg_candidates.append(f"{__package__}.nodes")
            pkg_candidates.extend(["vaango_ui.nodes", "pyside6.vaango_ui.nodes"])
            for cand in pkg_candidates:
                try:
                    nodes_pkg = importlib.import_module(cand)
                    break
                except Exception:
                    continue

            if nodes_pkg is None:
                return

            menu = QMenu(self)
            scene_pos = self.mapToScene(event.pos())
            items = []

            # Prefer explicit __all__ if present
            names = []
            try:
                names = list(getattr(nodes_pkg, '__all__', []))
            except Exception:
                names = []

            if not names:
                names = [n for n in dir(nodes_pkg) if not n.startswith('_')]

            for attr_name in names:
                try:
                    attr = getattr(nodes_pkg, attr_name, None)
                except Exception:
                    attr = None
                if not inspect.isclass(attr):
                    continue
                # Accept classes that end with 'Node' or subclasses of a base Node class
                if not attr_name.endswith('Node'):
                    continue
                # Try to obtain a display name without raising
                disp = attr_name
                try:
                    inst = attr()
                    disp = getattr(inst, 'name', attr_name)
                except Exception:
                    disp = attr_name
                items.append((disp, attr))

            items.sort(key=lambda x: x[0])
            if not items:
                action = menu.addAction("(no node types found)")
                action.setEnabled(False)
                menu.exec(event.globalPos())
                return

            for disp, cls in items:
                menu.addAction(disp, lambda checked=False, c=cls, p=scene_pos: self.add_node(c(), (p.x(), p.y())))
            menu.exec(event.globalPos())
        except Exception:
            return
