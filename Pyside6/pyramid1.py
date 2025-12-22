import sys
import numpy as np
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QMatrix4x4, QVector3D, QOpenGLFunctions, QSurfaceFormat
from PySide6.QtOpenGL import QOpenGLShader, QOpenGLShaderProgram
from PySide6.QtCore import Qt, QTimer

class PyramidGLWidget(QOpenGLWidget, QOpenGLFunctions):
    def __init__(self):
        super().__init__()
        self.rotation_angle = 0
        
    def initializeGL(self):
        self.initializeOpenGLFunctions()
        
        # 1. Set State
        self.glClearColor(0.8, 0.2, 0.5, 1.0)
        self.glEnable(self.GL_DEPTH_TEST)
        self.glEnable(self.GL_CULL_FACE)

        # 2. Shaders
        v_shader = """
        #version 330 core
        layout(location = 0) in vec3 in_vert;
        uniform mat4 mvp;
        void main() {
            gl_Position = mvp * vec4(in_vert, 1.0);
        }
        """
        f_shader = """
        #version 330 core
        out vec4 f_color;
        uniform vec3 color;
        void main() {
            f_color = vec4(color, 1.0);
        }
        """
        
        self.program = QOpenGLShaderProgram()
        if not self.program.addShaderFromSourceCode(QOpenGLShader.Vertex, v_shader):
            print("Vertex Shader Error:", self.program.log())
        if not self.program.addShaderFromSourceCode(QOpenGLShader.Fragment, f_shader):
            print("Fragment Shader Error:", self.program.log())
        if not self.program.link():
            print("Shader Link Error:", self.program.log())

        # 3. Data (CCW Order)
        self.vertices = np.array([
            0.0,  0.5,  0.0,   -0.5, -0.5,  0.5,    0.5, -0.5,  0.5,
            0.0,  0.5,  0.0,    0.5, -0.5,  0.5,    0.5, -0.5, -0.5,
            0.0,  0.5,  0.0,    0.5, -0.5, -0.5,   -0.5, -0.5, -0.5,
            0.0,  0.5,  0.0,   -0.5, -0.5, -0.5,   -0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5,   0.5, -0.5,  0.5,   -0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,    0.5, -0.5,  0.5
        ], dtype='f4')

        # 4. Start Timer here to ensure context is ready
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_animation)
        self.timer.start(16)

    def update_animation(self):
        self.rotation_angle += 1.0
        self.update()

    def paintGL(self):
        self.glClear(self.GL_COLOR_BUFFER_BIT | self.GL_DEPTH_BUFFER_BIT)
        
        if not self.program.bind():
            return

        # Projection with safety depth (-100 to 100)
        proj = QMatrix4x4()
        aspect = self.width() / self.height()
        size = 2.0
        proj.ortho(-size * aspect, size * aspect, -size, size, -100.0, 100.0)

        view = QMatrix4x4()
        view.lookAt(QVector3D(2.0, 2.0, 2.0), QVector3D(0, 0, 0), QVector3D(0, 1, 0))

        model = QMatrix4x4()
        model.rotate(self.rotation_angle, 0, 1, 0)

        self.program.setUniformValue("mvp", proj * view * model)
        self.program.setUniformValue("color", QVector3D(1.0, 1.0, 1.0))

        self.program.enableAttributeArray(0)
        self.program.setAttributeArray(0, self.GL_FLOAT, self.vertices, 3)
        self.glDrawArrays(self.GL_TRIANGLES, 0, len(self.vertices) // 3)
        self.program.disableAttributeArray(0)
        self.program.release()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Qt Pyramid Fix")
        self.resize(800, 600)
        self.gl_widget = PyramidGLWidget()
        self.setCentralWidget(self.gl_widget)

if __name__ == "__main__":
    # --- CRITICAL FIX FOR SILENT EXIT ---
    fmt = QSurfaceFormat()
    fmt.setVersion(3, 3)
    fmt.setProfile(QSurfaceFormat.CoreProfile)
    fmt.setDepthBufferSize(24)
    QSurfaceFormat.setDefaultFormat(fmt)
    # ------------------------------------

    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
    
