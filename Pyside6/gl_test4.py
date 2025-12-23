import os
import sys

from PySide6.QtCore import Qt
from PySide6.QtWidgets import QApplication
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QSurfaceFormat
from OpenGL import GL

# Force software GL
os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
os.environ["QT_LOGGING_RULES"] = "*.debug=true"

class GLWidget(QOpenGLWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Immediate-Mode Triangle")
        self.resize(600, 600)
        #self.setCentralWidget(GLWidget())

    def initializeGL(self):
        GL.glClearColor(0.8, 0.2, 0.5, 1.0)
        print("✔ OpenGL context valid", flush=True)

    def paintGL(self):
        GL.glClear(GL.GL_COLOR_BUFFER_BIT)

        # Immediate-mode triangle
        GL.glBegin(GL.GL_TRIANGLES)
        GL.glColor3f(1.0, 1.0, 1.0)
        GL.glVertex2f(0.0, 0.6)
        GL.glVertex2f(-0.6, -0.6)
        GL.glVertex2f(0.6, -0.6)
        GL.glEnd()

if __name__ == "__main__":
    QApplication.setAttribute(Qt.AA_UseDesktopOpenGL)
    app = QApplication(sys.argv)

    fmt = QSurfaceFormat()
    fmt.setSamples(8)

    win = GLWidget()
    win.setFormat(fmt)
    win.show()
    sys.exit(app.exec())

