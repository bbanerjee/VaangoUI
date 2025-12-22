import os
import sys
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QSurfaceFormat
from PySide6.QtOpenGL import GL

# Force software GL
os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
os.environ["QT_LOGGING_RULES"] = "*.debug=true"

# OpenGL 2.1 Compatibility Profile
fmt = QSurfaceFormat()
fmt.setVersion(2, 1)
fmt.setProfile(QSurfaceFormat.CompatibilityProfile)
fmt.setDepthBufferSize(24)
fmt.setSwapBehavior(QSurfaceFormat.DoubleBuffer)
QSurfaceFormat.setDefaultFormat(fmt)


class GLWidget(QOpenGLWidget):
    def initializeGL(self):
        self.gl = self.context().functions()
        self.gl.glClearColor(0.8, 0.2, 0.5, 1.0)
        print("✔ OpenGL context valid", flush=True)

    def paintGL(self):
        self.gl.glClear(GL.GL_COLOR_BUFFER_BIT)

        # Immediate-mode triangle
        self.gl.glBegin(GL.GL_TRIANGLES)
        GL.glColor3f(1.0, 1.0, 1.0)
        GL.glVertex2f(0.0, 0.6)
        GL.glVertex2f(-0.6, -0.6)
        GL.glVertex2f(0.6, -0.6)
        self.gl.glEnd()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Immediate-Mode Triangle")
        self.resize(600, 600)
        self.setCentralWidget(GLWidget())


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainWindow()
    win.show()
    sys.exit(app.exec())

