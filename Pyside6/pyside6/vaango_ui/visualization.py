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
        # Set clear/background color for the 3D view
        try:
            frame = self.defaultFrameGraph()
            if frame is not None:
                frame.setClearColor(QColor("black"))
        except Exception:
            try:
                # Fallback: some Qt versions expose setClearColor directly
                self.setClearColor(QColor("black"))
            except Exception:
                pass
        
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
        # Optional corner markers for debugging domain box visibility
        self.domain_corner_entities = []

    def update_particles(self, particle_list):
        self.scene_manager.clear()
        for particle in particle_list:
            self.scene_manager.add_particle(particle)

    def add_domain_box(self, box_min, box_max, color="green", opacity=0.3):
        """Add or update a cuboid representing the domain between box_min and box_max.
        box_min/box_max: iterable of 3 floats
        """
        # Clear existing domain box if present
        print(f"[Vaango3DWindow] add_domain_box called with min={box_min} max={box_max} color={color} opacity={opacity}")
        try:
            if hasattr(self, 'domain_box_entity') and self.domain_box_entity is not None:
                self.domain_box_entity.setParent(None)
                self.domain_box_entity.deleteLater()
                self.domain_box_entity = None
            # clear corner markers
            try:
                for c in getattr(self, 'domain_corner_entities', []):
                    c.setParent(None)
                    c.deleteLater()
                self.domain_corner_entities = []
            except Exception:
                pass
        except Exception:
            pass

        try:
            self.domain_box_entity = Qt3DCore.QEntity(self.root)

            # Create cuboid mesh sized to the extents
            mesh = Qt3DExtras.QCuboidMesh()
            minx, miny, minz = float(box_min[0]), float(box_min[1]), float(box_min[2])
            maxx, maxy, maxz = float(box_max[0]), float(box_max[1]), float(box_max[2])
            sx = maxx - minx
            sy = maxy - miny
            sz = maxz - minz
            # Avoid zero extents
            sx = sx if sx != 0 else 0.001
            sy = sy if sy != 0 else 0.001
            sz = sz if sz != 0 else 0.001
            mesh.setXExtent(sx)
            mesh.setYExtent(sy)
            mesh.setZExtent(sz)
            self.domain_box_entity.addComponent(mesh)

            try:
                # Ensure entity is enabled and identifiable
                try:
                    self.domain_box_entity.setObjectName("domain_box_entity")
                except Exception:
                    pass
                try:
                    self.domain_box_entity.setEnabled(True)
                except Exception:
                    pass
            except Exception:
                pass

            # Debug prints for extents and center
            print(f"[Vaango3DWindow] domain extents: sx={sx}, sy={sy}, sz={sz}")

            # Transform to center
            cx = (minx + maxx) / 2.0
            cy = (miny + maxy) / 2.0
            cz = (minz + maxz) / 2.0
            transform = Qt3DCore.QTransform()
            transform.setTranslation(QVector3D(cx, cy, cz))
            self.domain_box_entity.addComponent(transform)

            print(f"[Vaango3DWindow] domain center: cx={cx}, cy={cy}, cz={cz}")
            # Debug: list root children and domain components
            try:
                root_children = getattr(self.root, 'children', lambda: [])()
                try:
                    rc_len = len(root_children)
                except Exception:
                    rc_len = 'unknown'
                print(f"[Vaango3DWindow] root children count: {rc_len}")
                try:
                    comps = self.domain_box_entity.components()
                    print(f"[Vaango3DWindow] domain_box_entity components: {len(comps)}")
                except Exception as _e:
                    print(f"[Vaango3DWindow] could not list domain components: {_e}")
            except Exception:
                pass

            # Material (use opaque diffuse to ensure visibility)
            try:
                mat = Qt3DExtras.QPhongMaterial()
                col = QColor(color)
                # Use full opacity for debugging visibility
                col.setAlphaF(1.0)
                mat.setDiffuse(col)
                mat.setAmbient(col)
                self.domain_box_entity.addComponent(mat)

                # Create small sphere markers at corners as a wireframe fallback
                try:
                    # corner coordinates
                    corners = [
                        (minx, miny, minz), (minx, miny, maxz), (minx, maxy, minz), (minx, maxy, maxz),
                        (maxx, miny, minz), (maxx, miny, maxz), (maxx, maxy, minz), (maxx, maxy, maxz)
                    ]
                    radius = max(min(sx, sy, sz) * 0.02, 0.05)
                    for idx, (cx_c, cy_c, cz_c) in enumerate(corners):
                        cent_ent = Qt3DCore.QEntity(self.root)
                        sph = Qt3DExtras.QSphereMesh()
                        sph.setRadius(radius)
                        try:
                            sph.setRings(20)
                            sph.setSlices(20)
                        except Exception:
                            pass
                        cent_ent.addComponent(sph)
                        t = Qt3DCore.QTransform()
                        t.setTranslation(QVector3D(cx_c, cy_c, cz_c))
                        cent_ent.addComponent(t)
                        cm = Qt3DExtras.QPhongMaterial()
                        cm.setDiffuse(QColor("yellow"))
                        cent_ent.addComponent(cm)
                        try:
                            cent_ent.setObjectName(f"domain_corner_{idx}")
                        except Exception:
                            pass
                        try:
                            cent_ent.setEnabled(True)
                        except Exception:
                            pass
                        self.domain_corner_entities.append(cent_ent)
                except Exception as e:
                    print(f"[Vaango3DWindow] failed to create corner markers: {e}")
                try:
                    print(f"[Vaango3DWindow] created {len(self.domain_corner_entities)} corner markers")
                except Exception:
                    pass
                # Inspect components on domain entity and corners
                try:
                    comps = []
                    try:
                        comps = self.domain_box_entity.components()
                    except Exception:
                        comps = []
                    print(f"[Vaango3DWindow] domain_box_entity component types: {[type(c).__name__ for c in comps]}")
                    for i, cent in enumerate(getattr(self, 'domain_corner_entities', [])):
                        try:
                            ccomps = cent.components()
                            names = [type(c).__name__ for c in ccomps]
                            trans = None
                            for c in ccomps:
                                try:
                                    if hasattr(c, 'translation'):
                                        t = c.translation()
                                        trans = (t.x(), t.y(), t.z())
                                        break
                                    if hasattr(c, 'translation') or hasattr(c, 'translation'):
                                        # fallback
                                        pass
                                except Exception:
                                    pass
                            print(f"[Vaango3DWindow] corner[{i}] component types: {names}, transform translation: {trans}")
                        except Exception as e:
                            print(f"[Vaango3DWindow] failed inspecting corner[{i}]: {e}")
                except Exception:
                    pass
                # Adjust camera to center on the domain box and back off so it's visible
                try:
                    self.camera().setViewCenter(QVector3D(cx, cy, cz))
                    # Move camera along +Z relative to box center to ensure visibility
                    dist = max(sx, sy, sz) * 3.0 + 10.0
                    new_pos = QVector3D(cx, cy, cz + dist)
                    self.camera().setPosition(new_pos)
                    print(f"[Vaango3DWindow] camera repositioned to {new_pos.x()},{new_pos.y()},{new_pos.z()}")
                    try:
                        vp = self.camera().position()
                        vc = self.camera().viewCenter()
                        print(f"[Vaango3DWindow] camera position: {vp.x()},{vp.y()},{vp.z()} viewCenter: {vc.x()},{vc.y()},{vc.z()}")
                    except Exception:
                        pass
                except Exception as e:
                    print(f"[Vaango3DWindow] failed to reposition camera: {e}")
            except Exception as e:
                print(f"[Vaango3DWindow] failed to create material: {e}")
        except Exception:
            # don't crash the application when 3D components fail
            try:
                self.domain_box_entity = None
            except Exception:
                pass

    def clear_domain_box(self):
        try:
            if hasattr(self, 'domain_box_entity') and self.domain_box_entity is not None:
                self.domain_box_entity.setParent(None)
                self.domain_box_entity.deleteLater()
                self.domain_box_entity = None
        except Exception:
            pass

    def add_stl_mesh(self, vertices, faces, color="lightgray", opacity=1.0):
        """Add an STL mesh given vertices and faces arrays."""
        print(f"[Vaango3DWindow] add_stl_mesh called with {len(vertices)} vertices and {len(faces)} faces")
        try:
            import struct
            mesh_entity = Qt3DCore.QEntity(self.root)

            # Create custom mesh
            mesh = Qt3DRender.QGeometryMesh()
            geometry = Qt3DRender.QGeometry(mesh)

            # Vertex buffer
            vertex_data = bytearray()
            for v in vertices:
                vertex_data += struct.pack('fff', v[0], v[1], v[2])
            vertex_buffer = Qt3DRender.QBuffer()
            vertex_buffer.setData(vertex_data)

            # Position attribute
            position_attribute = Qt3DRender.QAttribute()
            position_attribute.setName(Qt3DRender.QAttribute.defaultPositionAttributeName())
            position_attribute.setVertexBaseType(Qt3DRender.QAttribute.Float)
            position_attribute.setVertexSize(3)
            position_attribute.setAttributeType(Qt3DRender.QAttribute.VertexAttribute)
            position_attribute.setBuffer(vertex_buffer)
            position_attribute.setByteStride(12)
            position_attribute.setCount(len(vertices))

            geometry.addAttribute(position_attribute)

            # Index buffer
            index_data = bytearray()
            for f in faces:
                index_data += struct.pack('III', f[0], f[1], f[2])
            index_buffer = Qt3DRender.QBuffer()
            index_buffer.setData(index_data)

            # Index attribute
            index_attribute = Qt3DRender.QAttribute()
            index_attribute.setName(Qt3DRender.QAttribute.defaultIndexAttributeName())
            index_attribute.setVertexBaseType(Qt3DRender.QAttribute.UnsignedInt)
            index_attribute.setAttributeType(Qt3DRender.QAttribute.IndexAttribute)
            index_attribute.setBuffer(index_buffer)
            index_attribute.setCount(len(faces) * 3)

            geometry.addAttribute(index_attribute)

            mesh.setGeometry(geometry)
            mesh.setPrimitiveType(Qt3DRender.QGeometryRenderer.Triangles)

            mesh_entity.addComponent(mesh)

            # Material
            material = Qt3DExtras.QPhongMaterial()
            mat_color = QColor(color)
            mat_color.setAlphaF(opacity)
            material.setDiffuse(mat_color)
            mesh_entity.addComponent(material)

        except Exception as e:
            print(f"[Vaango3DWindow] failed to add STL mesh: {e}")

