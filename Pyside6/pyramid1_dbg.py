import os
#os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
# Force Qt to use a basic rendering backend
#os.environ["QT_QUICK_BACKEND"] = "software"
# Tell Qt to ignore specific GPU driver checks that cause silent crashes
#os.environ["QT_LOGGING_RULES"] = "*.debug=true" 
# Prevent the DBus error from blocking the thread
#os.environ["QT_NO_XDG_DESKTOP_PORTAL"] = "1"

import sys
import numpy as np
from PySide6.QtWidgets import QApplication, QMainWindow, QMessageBox
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QMatrix4x4, QVector3D, QOpenGLFunctions, QSurfaceFormat
from PySide6.QtOpenGL import QOpenGLShader, QOpenGLShaderProgram
from PySide6.QtCore import Qt, QTimer

from PySide6.QtGui import QSurfaceFormat

fmt = QSurfaceFormat()
fmt.setRenderableType(QSurfaceFormat.OpenGL)
fmt.setProfile(QSurfaceFormat.CompatibilityProfile)
fmt.setVersion(3, 3)
fmt.setDepthBufferSize(24)

QSurfaceFormat.setDefaultFormat(fmt)

class PyramidGLWidget(QOpenGLWidget, QOpenGLFunctions):
    def __init__(self):
        super().__init__()
        self.rotation_angle = 0
        print("Widget initialized...")
        
    def initializeGL(self):
        print("Initializing OpenGL...")
        # Check if we can actually get functions
        self.initializeOpenGLFunctions()
        #if not self.initializeOpenGLFunctions():
        #    print("Could not initialize OpenGL functions!")
        #    return

        # Print GPU Info for debugging
        print(f"Vendor: {self.glGetString(self.GL_VENDOR)}")
        print(f"Renderer: {self.glGetString(self.GL_RENDERER)}")
        print(f"OpenGL Version: {self.glGetString(self.GL_VERSION)}")

        self.glClearColor(0.8, 0.2, 0.5, 1.0)
        self.glEnable(self.GL_DEPTH_TEST)
        self.glEnable(self.GL_CULL_FACE)

        # Shaders - Using 120 (OpenGL 2.1) as a fallback if 330 fails on older drivers
        v_shader = """
        #version 330
        attribute vec3 in_vert;
        uniform mat4 mvp;
        void main() {
            gl_Position = mvp * vec4(in_vert, 1.0);
        }
        """
        f_shader = """
        #version 330
        uniform vec3 color;
        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
        """
        
        self.program = QOpenGLShaderProgram()
        if not self.program.addShaderFromSourceCode(QOpenGLShader.Vertex, v_shader):
            print("Vertex Shader Error:", self.program.log())
        if not self.program.addShaderFromSourceCode(QOpenGLShader.Fragment, f_shader):
            print("Fragment Shader Error:", self.program.log())
        if not self.program.link():
            print("Shader Link Error:", self.program.log())

        self.vertices = np.array([
            0.0,  0.5,  0.0,   -0.5, -0.5,  0.5,    0.5, -0.5,  0.5,
            0.0,  0.5,  0.0,    0.5, -0.5,  0.5,    0.5, -0.5, -0.5,
            0.0,  0.5,  0.0,    0.5, -0.5, -0.5,   -0.5, -0.5, -0.5,
            0.0,  0.5,  0.0,   -0.5, -0.5, -0.5,   -0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5,   0.5, -0.5,  0.5,   -0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,    0.5, -0.5,  0.5
        ], dtype='f4')

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_animation)
        self.timer.start(16)
        print("Initialization complete.")

    def update_animation(self):
        self.rotation_angle += 1.0
        self.update()

    def paintGL(self):
        self.glClear(self.GL_COLOR_BUFFER_BIT | self.GL_DEPTH_BUFFER_BIT)
        if not self.program.bind(): return

        proj = QMatrix4x4()
        aspect = self.width() / (self.height() if self.height() > 0 else 1)
        size = 2.0
        proj.ortho(-size * aspect, size * aspect, -size, size, -10.0, 10.0)

        view = QMatrix4x4()
        view.lookAt(QVector3D(2.0, 2.0, 2.0), QVector3D(0, 0, 0), QVector3D(0, 1, 0))

        model = QMatrix4x4()
        model.rotate(self.rotation_angle, 0, 1, 0)

        self.program.setUniformValue("mvp", proj * view * model)
        self.program.setUniformValue("color", QVector3D(1.0, 1.0, 1.0))

        # Use attribute location for broader compatibility
        loc = self.program.attributeLocation("in_vert")
        self.program.enableAttributeArray(loc)
        self.program.setAttributeArray(loc, self.GL_FLOAT, self.vertices, 3)
        self.glDrawArrays(self.GL_TRIANGLES, 0, len(self.vertices) // 3)
        self.program.disableAttributeArray(loc)
        self.program.release()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PySide6 Debugging OpenGL")
        self.resize(600, 600)
        try:
            self.gl_widget = PyramidGLWidget()
            self.setCentralWidget(self.gl_widget)
        except Exception as e:
            print(f"Error creating Widget: {e}")

if __name__ == "__main__":
    print("Starting Application...")

    app = QApplication(sys.argv)
    
    try:
        window = MainWindow()
        window.show()
        print("Window visible, entering event loop.")
        app.exec()
    except Exception as e:
        print(f"Critical Application Error: {e}")
