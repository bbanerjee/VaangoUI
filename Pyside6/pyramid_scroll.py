import sys
from array import array
from PySide6.QtCore import Qt, QObject, Slot, QByteArray
from PySide6.QtGui import QGuiApplication, QVector3D, QColor, QMouseEvent, QWheelEvent
from PySide6.Qt3DCore import Qt3DCore
from PySide6.Qt3DRender import Qt3DRender
from PySide6.Qt3DExtras import Qt3DExtras
from PySide6.Qt3DInput import Qt3DInput

class EdgeLines:
    """Replaces the C++ struct for managing edge states."""
    def __init__(self):
        self.edges = []
        self.materials = []
        self.selected_edge = -1

class CustomQt3DWindow(Qt3DExtras.Qt3DWindow):
    """Subclass to log mouse events as per the C++ code."""
    def mousePressEvent(self, event: QMouseEvent):
        print(f"Mouse Press: button={event.button()} pos=({event.position().x()},{event.position().y()})")
        super().mousePressEvent(event)

    def mouseReleaseEvent(self, event: QMouseEvent):
        print(f"Mouse Release: button={event.button()}")
        super().mouseReleaseEvent(event)

    def mouseMoveEvent(self, event: QMouseEvent):
        # Note: Mouse move logs can be very chatty
        super().mouseMoveEvent(event)

    def wheelEvent(self, event: QWheelEvent):
        print(f"Wheel Event: angleDelta=({event.angleDelta().x()},{event.angleDelta().y()})")
        super().wheelEvent(event)

def create_edge_line(parent, start, end, color):
    # Vertex data for a single line (2 points)
    vertices = array("f", [
        start.x(), start.y(), start.z(),
        end.x(), end.y(), end.z()
    ])

    geometry = Qt3DCore.QGeometry(parent)
    
    #buf = Qt3DCore.QBuffer(geometry)
    #buf.setData(vertices.tobytes())

    # Use QByteArray
    buf = Qt3DCore.QBuffer(geometry)
    v_data = QByteArray(vertices.tobytes())
    buf.setData(v_data)

    attr = Qt3DCore.QAttribute(geometry)
    attr.setName(Qt3DCore.QAttribute.defaultPositionAttributeName())
    attr.setVertexBaseType(Qt3DCore.QAttribute.Float)
    attr.setVertexSize(3)
    attr.setAttributeType(Qt3DCore.QAttribute.VertexAttribute)
    attr.setBuffer(buf)
    attr.setByteStride(3 * 4)
    attr.setCount(2)
    geometry.addAttribute(attr)

    renderer = Qt3DRender.QGeometryRenderer(parent)
    renderer.setGeometry(geometry)
    renderer.setPrimitiveType(Qt3DRender.QGeometryRenderer.Lines)

    material = Qt3DExtras.QPhongMaterial(parent)
    material.setDiffuse(color)
    material.setAmbient(color)

    entity = Qt3DCore.QEntity(parent)
    entity.addComponent(renderer)
    entity.addComponent(material)
    return entity

def create_pyramid_with_edges(parent, shared_transform):
    container = Qt3DCore.QEntity(parent)

    # Pyramid data
    vertices = array("f", [
         0.0,  0.5,  0.0,  # 0: tip
        -0.5, -0.5,  0.5,  # 1: base FL
         0.5, -0.5,  0.5,  # 2: base FR
         0.5, -0.5, -0.5,  # 3: base BR
        -0.5, -0.5, -0.5   # 4: base BL
    ])
    indices = array("I", [
        0, 1, 2,  0, 2, 3,  0, 3, 4,  0, 4, 1, # sides
        1, 2, 4,  2, 3, 4                    # base
    ])

    geometry = Qt3DCore.QGeometry(container)

    # Vertex Buffer
    v_buf = Qt3DCore.QBuffer(geometry)
    v_buf.setData(QByteArray(vertices.tobytes()))
    v_attr = Qt3DCore.QAttribute(geometry)
    v_attr.setName(Qt3DCore.QAttribute.defaultPositionAttributeName())
    v_attr.setVertexBaseType(Qt3DCore.QAttribute.Float)
    v_attr.setVertexSize(3)
    v_attr.setAttributeType(Qt3DCore.QAttribute.VertexAttribute)
    v_attr.setBuffer(v_buf)
    v_attr.setCount(5)
    geometry.addAttribute(v_attr)

    # Index Buffer
    i_buf = Qt3DCore.QBuffer(geometry)
    i_buf.setData(QByteArray(indices.tobytes()))
    i_attr = Qt3DCore.QAttribute(geometry)
    i_attr.setVertexBaseType(Qt3DCore.QAttribute.UnsignedInt)
    i_attr.setAttributeType(Qt3DCore.QAttribute.IndexAttribute)
    i_attr.setBuffer(i_buf)
    i_attr.setCount(len(indices))
    geometry.addAttribute(i_attr)

    pyramid_renderer = Qt3DRender.QGeometryRenderer(container)
    pyramid_renderer.setGeometry(geometry)
    pyramid_renderer.setPrimitiveType(Qt3DRender.QGeometryRenderer.Triangles)

    pyramid_mat = Qt3DExtras.QPhongMaterial(container)
    pyramid_mat.setDiffuse(QColor(Qt.white))
    pyramid_mat.setAmbient(QColor(30, 30, 30))

    pyramid_entity = Qt3DCore.QEntity(container)
    pyramid_entity.addComponent(pyramid_renderer)
    pyramid_entity.addComponent(pyramid_mat)
    pyramid_entity.addComponent(shared_transform)

    # Logic for edge creation
    edge_lines = EdgeLines()
    edge_pairs = [
        (0, 1), (0, 2), (0, 3), (0, 4),
        (1, 2), (2, 3), (3, 4), (4, 1)
    ]

    def get_v3d(idx):
        return QVector3D(vertices[idx*3], vertices[idx*3+1], vertices[idx*3+2])

    for i, (v1, v2) in enumerate(edge_pairs):
        edge_ent = create_edge_line(container, get_v3d(v1), get_v3d(v2), QColor(Qt.yellow))
        edge_ent.addComponent(shared_transform)
        
        picker = Qt3DRender.QObjectPicker(edge_ent)
        picker.setEnabled(True)
        edge_ent.addComponent(picker)
        
        edge_lines.edges.append(edge_ent)
        
        # In Python, we can find the material easily
        for comp in edge_ent.components():
            if isinstance(comp, Qt3DExtras.QPhongMaterial):
                edge_lines.materials.append(comp)
                break
                
    return edge_lines

def main():
    app = QGuiApplication(sys.argv)
    view = CustomQt3DWindow()

    # FrameGraph setup for clear color (NVIDIA driver friendly)
    frame_graph = view.defaultFrameGraph()
    if isinstance(frame_graph, Qt3DExtras.QForwardRenderer):
        frame_graph.setClearColor(QColor(204, 51, 128))

    view.resize(800, 800)
    view.show()

    root_entity = Qt3DCore.QEntity()

    # Light
    light_entity = Qt3DCore.QEntity(root_entity)
    light = Qt3DRender.QPointLight(light_entity)
    light.setColor(QColor("white"))
    light.setIntensity(1.0)
    light_entity.addComponent(light)
    light_transform = Qt3DCore.QTransform()
    light_transform.setTranslation(QVector3D(5, 5, 10))
    light_entity.addComponent(light_transform)

    # Input settings
    input_settings = Qt3DInput.QInputSettings(root_entity)

    transform = Qt3DCore.QTransform()
    edge_lines = create_pyramid_with_edges(root_entity, transform)

    # Edge Picking Logic
    def handle_click(index):
        # Deselect old
        if edge_lines.selected_edge >= 0:
            old_mat = edge_lines.materials[edge_lines.selected_edge]
            old_mat.setDiffuse(QColor(Qt.yellow))
            old_mat.setAmbient(QColor(Qt.yellow))
        
        # Select new (or toggle off)
        if edge_lines.selected_edge == index:
            edge_lines.selected_edge = -1
        else:
            edge_lines.selected_edge = index
            new_mat = edge_lines.materials[index]
            new_mat.setDiffuse(QColor(Qt.green))
            new_mat.setAmbient(QColor(Qt.green))
            print(f"Selected edge {index}")

    # Connect pickers (using a closure to capture 'i')
    for i, edge in enumerate(edge_lines.edges):
        for comp in edge.components():
            if isinstance(comp, Qt3DRender.QObjectPicker):
                comp.clicked.connect(lambda ev, idx=i: handle_click(idx))

    # Camera
    camera = view.camera()
    camera.lens().setPerspectiveProjection(45.0, 1.0, 0.1, 1000.0)
    camera.setPosition(QVector3D(0, 1.0, 3.0))
    camera.setViewCenter(QVector3D(0, 0, 0))

    view.setRootEntity(root_entity)

    # Orbit Controller
    cam_controller = Qt3DExtras.QOrbitCameraController(root_entity)
    cam_controller.setCamera(camera)
    cam_controller.setLinearSpeed(50.0)
    cam_controller.setLookSpeed(180.0)

    sys.exit(app.exec())

if __name__ == "__main__":
    main()
