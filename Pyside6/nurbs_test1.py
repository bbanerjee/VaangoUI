import sys
import numpy as np
from PySide6.QtCore import Qt, QByteArray
from PySide6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QSlider, QLabel, QSpinBox)
from PySide6.QtGui import QColor, QVector3D
from PySide6.Qt3DCore import Qt3DCore
from PySide6.Qt3DRender import Qt3DRender
from PySide6.Qt3DExtras import Qt3DExtras

from geomdl import BSpline, utilities

class NurbsSurfaceEntity(Qt3DCore.QEntity):
    def __init__(self, parent=None):
        super().__init__(parent)
        
        self.geometry = Qt3DCore.QGeometry(self)
        self.v_attr = Qt3DCore.QAttribute(self.geometry)
        self.i_attr = Qt3DCore.QAttribute(self.geometry)
        
        self.renderer = Qt3DRender.QGeometryRenderer()
        self.renderer.setGeometry(self.geometry)
        
        # Use a material that reacts well to light to see surface curvature
        self.material = Qt3DExtras.QPhongMaterial(self)
        self.material.setDiffuse(QColor("#2ecc71"))
        self.material.setAmbient(QColor("#1a5276"))
        self.material.setSpecular(QColor("white"))
        self.material.setShininess(50.0)
        
        self.addComponent(self.renderer)
        self.addComponent(self.material)
        
        self._degree = 3
        self._res = 30 
        self.update_surface()

    def update_surface(self, z_mod=0.0):
        # 1. Geometry Setup via geomdl
        surf = BSpline.Surface()
        surf.degree_u = self._degree
        surf.degree_v = self._degree
        
        size_u, size_v = 6, 6
        # Generate control points grid using NumPy
        u_pts = np.linspace(-3, 3, size_u)
        v_pts = np.linspace(-3, 3, size_v)
        uu, vv = np.meshgrid(u_pts, v_pts)
        zz = np.zeros_like(uu)
        
        # Deform the center of the surface
        zz[2:4, 2:4] = z_mod 
        
        # Stack into (N, 3) list for geomdl
        ctrlpts = np.stack([uu.ravel(), vv.ravel(), zz.ravel()], axis=1).tolist()
        
        surf.set_ctrlpts(ctrlpts, size_u, size_v)
        surf.knotvector_u = utilities.generate_knot_vector(surf.degree_u, size_u)
        surf.knotvector_v = utilities.generate_knot_vector(surf.degree_v, size_v)
        
        surf.delta = 1.0 / self._res
        surf.evaluate()
        
        # 2. Convert evaluated points to NumPy Array
        evalpts = np.array(surf.evalpts, dtype=np.float32)
        
        # 3. Fast Index Generation using NumPy
        # This replaces the slow nested for-loop
        res_plus_1 = self._res + 1
        grid = np.arange(res_plus_1**2).reshape(res_plus_1, res_plus_1)
        
        # Select four corners of every quad in the grid
        p1 = grid[:-1, :-1].ravel()
        p2 = grid[:-1, 1:].ravel()
        p3 = grid[1:, :-1].ravel()
        p4 = grid[1:, 1:].ravel()
        
        # Create two triangles per quad
        indices = np.stack([p1, p2, p3, p2, p4, p3], axis=1).astype(np.uint32)
        
        # 4. Push to GPU via QByteArray
        v_buf = Qt3DCore.QBuffer(self.geometry)
        v_buf.setData(QByteArray(evalpts.tobytes()))
        
        self.v_attr.setName(Qt3DCore.QAttribute.defaultPositionAttributeName())
        self.v_attr.setVertexBaseType(Qt3DCore.QAttribute.Float)
        self.v_attr.setVertexSize(3)
        self.v_attr.setAttributeType(Qt3DCore.QAttribute.VertexAttribute)
        self.v_attr.setBuffer(v_buf)
        self.v_attr.setCount(len(evalpts))
        
        i_buf = Qt3DCore.QBuffer(self.geometry)
        i_buf.setData(QByteArray(indices.tobytes()))
        self.i_attr.setAttributeType(Qt3DCore.QAttribute.IndexAttribute)
        self.i_attr.setVertexBaseType(Qt3DCore.QAttribute.UnsignedInt)
        self.i_attr.setBuffer(i_buf)
        self.i_attr.setCount(indices.size)
        
        if not self.geometry.attributes():
            self.geometry.addAttribute(self.v_attr)
            self.geometry.addAttribute(self.i_attr)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PySide6 + NumPy + Qt3D NURBS")
        
        # View setup
        self.view = Qt3DExtras.Qt3DWindow()
        self.view.defaultFrameGraph().setClearColor(QColor("#121212"))
        self.container = QWidget.createWindowContainer(self.view)
        
        # Layout
        central = QWidget()
        layout = QHBoxLayout(central)
        sidebar = QVBoxLayout()
        
        # UI Elements
        sidebar.addWidget(QLabel("<b>Surface Controls</b>"))
        
        sidebar.addWidget(QLabel("Z-Displacement:"))
        self.z_slider = QSlider(Qt.Horizontal)
        self.z_slider.setRange(-30, 30)
        self.z_slider.setValue(10)
        sidebar.addWidget(self.z_slider)
        
        sidebar.addWidget(QLabel("Tesselation (Mesh Density):"))
        self.res_spin = QSpinBox()
        self.res_spin.setRange(4, 100)
        self.res_spin.setValue(30)
        sidebar.addWidget(self.res_spin)
        
        sidebar.addStretch()
        layout.addLayout(sidebar, 1)
        layout.addWidget(self.container, 4)
        self.setCentralWidget(central)
        
        # Scene
        self.root = Qt3DCore.QEntity()
        self.surface = NurbsSurfaceEntity(self.root)
        
        # Connect UI
        self.z_slider.valueChanged.connect(self.update_params)
        self.res_spin.valueChanged.connect(self.update_params)
        
        # Lights & Camera
        self.setup_scene_extras()
        self.view.setRootEntity(self.root)

    def setup_scene_extras(self):
        # Light
        light_ent = Qt3DCore.QEntity(self.root)
        light = Qt3DRender.QPointLight(light_ent)
        light.setIntensity(1.2)
        light_ent.addComponent(light)
        light_ent.addComponent(Qt3DCore.QTransform(translation=QVector3D(5, 5, 10)))
        
        # Camera
        camera = self.view.camera()
        camera.lens().setPerspectiveProjection(45, 1.0, 0.1, 1000)
        camera.setPosition(QVector3D(8, 8, 8))
        camera.setViewCenter(QVector3D(0, 0, 0))
        
        self.cam_controller = Qt3DExtras.QOrbitCameraController(self.root)
        self.cam_controller.setCamera(camera)

    def update_params(self):
        self.surface._res = self.res_spin.value()
        self.surface.update_surface(self.z_slider.value() / 10.0)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.resize(1200, 800)
    window.show()
    sys.exit(app.exec())
