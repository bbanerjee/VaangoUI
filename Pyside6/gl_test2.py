import os
import sys
import ctypes

# Force software GL and verbose logging
#os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
#os.environ["QT_LOGGING_RULES"] = "*.debug=true"

from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QSurfaceFormat
from PySide6.QtOpenGL import QOpenGLShaderProgram, QOpenGLShader

# ---------- OpenGL 2.1 Compatibility Profile ----------
fmt = QSurfaceFormat()
fmt.setVersion(2, 1)
fmt.setProfile(QSurfaceFormat.CompatibilityProfile)
fmt.setDepthBufferSize(24)
fmt.setSwapBehavior(QSurfaceFormat.DoubleBuffer)
QSurfaceFormat.setDefaultFormat(fmt)


class GLWidget(QOpenGLWidget):
    def initializeGL(self):
        print("initializeGL() entered", flush=True)

        ctx = self.context()
        if not ctx or not ctx.isValid():
            print("❌ OpenGL context invalid", flush=True)
            return

        print("✔ OpenGL context valid", flush=True)
        self.gl = ctx.functions()

        # Clear color: pink
        self.gl.glClearColor(0.8, 0.2, 0.5, 1.0)

        # ----- Shaders (GLSL 120) -----
        vs = """
        #version 120
        attribute vec2 pos;
        void main() {
            gl_Position = vec4(pos, 0.0, 1.0);
        }
        """
        fs = """
        #version 120
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        """

        self.program = QOpenGLShaderProgram()
        ok = self.program.addShaderFromSourceCode(QOpenGLShader.Vertex, vs)
        print("Vertex shader ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        ok = self.program.addShaderFromSourceCode(QOpenGLShader.Fragment, fs)
        print("Fragment shader ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        ok = self.program.link()
        print("Program link ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        if not ok:
            print("❌ Shader program failed — aborting GL init", flush=True)
            return

        print("✔ Shader program linked", flush=True)

        # ----- Vertex Data -----
        self.vertices = (ctypes.c_float * 6)(
            0.0,  0.6,
           -0.6, -0.6,
            0.6, -0.6,
        )

        # Enable vertex array (OpenGL 2.1 style)
        self.gl.glEnableClientState(self.gl.GL_VERTEX_ARRAY)
        self.gl.glVertexPointer(2, self.gl.GL_FLOAT, 0, self.vertices)
        print("✔ Vertex array configured", flush=True)

    def paintGL(self):
        self.gl.glClear(self.gl.GL_COLOR_BUFFER_BIT)

        self.program.bind()
        self.gl.glDrawArrays(self.gl.GL_TRIANGLES, 0, 3)
        self.program.release()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PySide6 OpenGL 2.1 Triangle")
        self.resize(600, 600)
        self.setCentralWidget(GLWidget())


if __name__ == "__main__":
    print("Starting application", flush=True)
    app = QApplication(sys.argv)
    win = MainWindow()
    win.show()
    sys.exit(app.exec())

