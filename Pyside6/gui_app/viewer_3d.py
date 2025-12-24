from PySide6.QtWidgets import QWidget, QVBoxLayout
from PySide6.QtCore import Qt, QUrl
from PySide6.QtGui import QVector3D, QQuaternion, QColor
from PySide6.Qt3DCore import Qt3DCore
from PySide6.Qt3DRender import Qt3DRender
from PySide6.Qt3DExtras import Qt3DExtras
from PySide6.Qt3DInput import Qt3DInput
import numpy as np


class Viewer3D(QWidget):
    """3D mesh viewer using Qt3D"""
    
    def __init__(self):
        super().__init__()
        self.setWindowTitle("3D Viewer")
        self.resize(800, 600)
        
        # Create 3D view
        self.view = Qt3DExtras.Qt3DWindow()
        self.container = QWidget.createWindowContainer(self.view, self)
        
        layout = QVBoxLayout()
        layout.addWidget(self.container)
        layout.setContentsMargins(0, 0, 0, 0)
        self.setLayout(layout)
        
        # Setup scene
        self.setup_scene()
        
        self.current_mesh_entity = None
    
    def setup_scene(self):
        """Setup the 3D scene with camera, lights, etc."""
        # Root entity
        self.root_entity = Qt3DCore.QEntity()
        
        # Camera
        self.camera = self.view.camera()
        self.camera.lens().setPerspectiveProjection(45.0, 16.0/9.0, 0.1, 1000.0)
        self.camera.setPosition(QVector3D(0, 0, 10))
        self.camera.setViewCenter(QVector3D(0, 0, 0))
        
        # Camera controller
        self.camera_controller = Qt3DExtras.QOrbitCameraController(self.root_entity)
        self.camera_controller.setCamera(self.camera)
        self.camera_controller.setLinearSpeed(50.0)
        self.camera_controller.setLookSpeed(180.0)
        
        # Lights
        light_entity = Qt3DCore.QEntity(self.root_entity)
        light = Qt3DRender.QPointLight(light_entity)
        light.setColor(QColor(255, 255, 255))
        light.setIntensity(1.0)
        light_entity.addComponent(light)
        
        light_transform = Qt3DCore.QTransform()
        light_transform.setTranslation(QVector3D(10, 10, 10))
        light_entity.addComponent(light_transform)
        
        # Ambient light
        ambient_light = Qt3DRender.QDirectionalLight(self.root_entity)
        ambient_light.setColor(QColor(100, 100, 100))
        ambient_light.setIntensity(0.3)
        ambient_light.setWorldDirection(QVector3D(0, -1, 0))
        self.root_entity.addComponent(ambient_light)
        
        # Set root entity
        self.view.setRootEntity(self.root_entity)
    
    def load_mesh(self, mesh, wireframe=False, opacity=1.0, color=None, 
                  scalar_field=None, colormap=None, scalar_range=None):
        """Load a PyMeshLab mesh into the viewer
        
        Args:
            mesh: pymeshlab.Mesh object
            wireframe: bool, show as wireframe
            opacity: float, transparency (0-1)
            color: [r,g,b,a] color override
            scalar_field: numpy array of scalars per vertex
            colormap: colormap to use for scalars
            scalar_range: [min, max] range for colormap
        """
        # Remove previous mesh
        if self.current_mesh_entity:
            self.current_mesh_entity.setEnabled(False)
            self.current_mesh_entity.deleteLater()
        
        # Create new mesh entity
        self.current_mesh_entity = Qt3DCore.QEntity(self.root_entity)
        
        # Get mesh data
        vertices = mesh.vertex_matrix()
        if mesh.face_number() > 0:
            faces = mesh.face_matrix()
        else:
            # For tetrahedral mesh, extract surface
            faces = self._extract_surface_from_tets(mesh)
        
        # Create geometry
        geometry = self._create_geometry(vertices, faces, scalar_field)
        
        # Create mesh renderer
        mesh_renderer = Qt3DRender.QGeometryRenderer()
        mesh_renderer.setGeometry(geometry)
        mesh_renderer.setPrimitiveType(Qt3DRender.QGeometryRenderer.Triangles)
        
        # Material
        material = Qt3DExtras.QPhongMaterial()
        if color:
            material.setDiffuse(QColor(color[0], color[1], color[2], int(color[3] * 255)))
        else:
            material.setDiffuse(QColor(100, 150, 200, int(opacity * 255)))
        material.setAmbient(QColor(50, 50, 50))
        material.setShininess(50.0)
        
        if wireframe:
            # For wireframe, we'd need to create line geometry
            # This is simplified - in production you'd want proper wireframe
            pass
        
        # Add components
        self.current_mesh_entity.addComponent(mesh_renderer)
        self.current_mesh_entity.addComponent(material)
        
        # Center camera on mesh
        center = vertices.mean(axis=0)
        bbox_size = np.max(np.ptp(vertices, axis=0))
        self.camera.setViewCenter(QVector3D(center[0], center[1], center[2]))
        self.camera.setPosition(QVector3D(
            center[0], 
            center[1], 
            center[2] + bbox_size * 2
        ))
    
    def _create_geometry(self, vertices, faces, scalar_field=None):
        """Create Qt3D geometry from numpy arrays"""
        geometry = Qt3DCore.QGeometry()
        
        # Vertex buffer
        vertex_data = vertices.astype(np.float32).tobytes()
        vertex_buffer = Qt3DCore.QBuffer()
        vertex_buffer.setData(vertex_data)
        
        # Position attribute
        position_attr = Qt3DCore.QAttribute()
        position_attr.setName(Qt3DCore.QAttribute.defaultPositionAttributeName())
        position_attr.setVertexBaseType(Qt3DCore.QAttribute.Float)
        position_attr.setVertexSize(3)
        position_attr.setAttributeType(Qt3DCore.QAttribute.VertexAttribute)
        position_attr.setBuffer(vertex_buffer)
        position_attr.setByteStride(12)
        position_attr.setCount(len(vertices))
        geometry.addAttribute(position_attr)
        
        # Index buffer
        index_data = faces.astype(np.uint32).flatten().tobytes()
        index_buffer = Qt3DCore.QBuffer()
        index_buffer.setData(index_data)
        
        index_attr = Qt3DCore.QAttribute()
        index_attr.setVertexBaseType(Qt3DCore.QAttribute.UnsignedInt)
        index_attr.setAttributeType(Qt3DCore.QAttribute.IndexAttribute)
        index_attr.setBuffer(index_buffer)
        index_attr.setCount(len(faces) * 3)
        geometry.addAttribute(index_attr)
        
        return geometry
    
    def _extract_surface_from_tets(self, mesh):
        """Extract surface triangles from tetrahedral mesh"""
        # This is a simplified version - in production you'd use proper
        # boundary extraction from pymeshlab
        if hasattr(mesh, 'face_matrix') and mesh.face_number() > 0:
            return mesh.face_matrix()
        
        # Return empty array if no faces
        return np.array([[0, 0, 0]], dtype=np.int32)
    
    def clear(self):
        """Clear the current mesh"""
        if self.current_mesh_entity:
            self.current_mesh_entity.setEnabled(False)
            self.current_mesh_entity.deleteLater()
            self.current_mesh_entity = None
