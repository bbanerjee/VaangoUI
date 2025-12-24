from PySide6.QtCore import QObject, Signal, Slot, Property
from PySide6.QtGui import QVector3D, QColor, QQuaternion
from PySide6.Qt3DCore import Qt3DCore
from PySide6.Qt3DExtras import Qt3DExtras
from PySide6.Qt3DRender import Qt3DRender

from .core import ParticleShape

class ParticleScene(QObject):
    def __init__(self, root_entity):
        super().__init__()
        self.root_entity = root_entity
        self.particle_entities = []

    def clear(self):
        for entity in self.particle_entities:
            entity.setParent(None)
            entity.deleteLater()
        self.particle_entities.clear()

    def add_particle(self, particle):
        entity = Qt3DCore.QEntity(self.root_entity)
        
        # Mesh
        mesh = None
        if particle.shape in [ParticleShape.SPHERE, ParticleShape.HOLLOW_SPHERE]:
            mesh = Qt3DExtras.QSphereMesh()
            mesh.setRadius(particle.radius)
            mesh.setRings(20)
            mesh.setSlices(20)
        elif particle.shape in [ParticleShape.CIRCLE, ParticleShape.HOLLOW_CIRCLE]:
            # Use a cylinder for 2D circle, thin depth
            mesh = Qt3DExtras.QCylinderMesh()
            mesh.setRadius(particle.radius)
            mesh.setLength(1.0 if particle.length <= 0 else particle.length) # Thickness/Depth
            mesh.setRings(20)
            mesh.setSlices(20)

        entity.addComponent(mesh)

        # Transform
        transform = Qt3DCore.QTransform()
        transform.setTranslation(QVector3D(particle.center.x, particle.center.y, particle.center.z))
        
        # Rotation if needed (C++ code had rotation, usually 0 for spheres)
        # If circle/cylinder, default is Y-axis, might need rotation to align with Z-axis if 2D
        if particle.shape in [ParticleShape.CIRCLE, ParticleShape.HOLLOW_CIRCLE]:
             # Rotate 90 deg around X to make cylinder face Z? Depends on coordinate system.
             # Assuming Z is up, cylinder default is Y up.
             transform.setRotation(QQuaternion.fromAxisAndAngle(QVector3D(1, 0, 0), 90.0))

        entity.addComponent(transform)

        # Material
        material = Qt3DExtras.QPhongMaterial()
        # Randomish color based on ID or fixed?
        material.setDiffuse(QColor("red"))
        entity.addComponent(material)

        self.particle_entities.append(entity)

class Vaango3DWindow(Qt3DExtras.Qt3DWindow):
    def __init__(self):
        super().__init__()
        
        self.root = Qt3DCore.QEntity()
        self.setRootEntity(self.root)
        
        # Camera
        self.camera().lens().setPerspectiveProjection(45.0, 16.0/9.0, 0.1, 1000.0)
        self.camera().setPosition(QVector3D(0, 0, 200.0))
        self.camera().setViewCenter(QVector3D(0, 0, 0))
        
        # Camera controls
        self.cam_controller = Qt3DExtras.QOrbitCameraController(self.root)
        self.cam_controller.setLinearSpeed(50.0)
        self.cam_controller.setLookSpeed(180.0)
        self.cam_controller.setCamera(self.camera())
        
        # Lights
        self.light_entity = Qt3DCore.QEntity(self.root)
        self.light = Qt3DRender.QPointLight(self.light_entity)
        self.light.setColor(QColor("white"))
        self.light.setIntensity(1.0)
        self.light_entity.addComponent(self.light)
        
        self.light_transform = Qt3DCore.QTransform()
        self.light_transform.setTranslation(QVector3D(0, 500, 500))
        self.light_entity.addComponent(self.light_transform)

        # Scene Manager
        self.scene_manager = ParticleScene(self.root)

    def update_particles(self, particle_list):
        self.scene_manager.clear()
        for particle in particle_list:
            self.scene_manager.add_particle(particle)

