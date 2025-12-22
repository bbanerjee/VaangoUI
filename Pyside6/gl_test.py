import os
os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
os.environ["QT_LOGGING_RULES"] = "qt.qpa.gl=true;qt.opengl=true"

import sys
import ctypes

from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QSurfaceFormat, QOpenGLContext
from PySide6.QtOpenGL import QOpenGLShaderProgram

# ---------- OpenGL format (MUST be before QApplication) ----------
fmt = QSurfaceFormat()
fmt.setRenderableType(QSurfaceFormat.OpenGL)
fmt.setProfile(QSurfaceFormat.CoreProfile)
fmt.setVersion(3, 3)
fmt.setDepthBufferSize(24)
fmt.setSwapBehavior(QSurfaceFormat.DoubleBuffer)
QSurfaceFormat.setDefaultFormat(fmt)


class GLWidget(QOpenGLWidget):
    def initializeGL(self):
        print("initializeGL() entered", flush=True)

        ctx = QOpenGLContext.currentContext()
        if not ctx or not ctx.isValid():
            print("❌ OpenGL context INVALID", flush=True)
            return

        self.gl = ctx.functions()
        print("✔ OpenGL context valid", flush=True)

        # ---- Clear color ----
        self.gl.glClearColor(0.8, 0.2, 0.5, 1.0)

        # ---- Shaders ----
        vs = """
        #version 330 core
        layout (location = 0) in vec2 pos;
        void main() {
            gl_Position = vec4(pos, 0.0, 1.0);
        }
        """

        fs = """
        #version 330 core
        out vec4 FragColor;
        void main() {
            FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        """

        self.program = QOpenGLShaderProgram()
        ok = self.program.addShaderFromSourceCode(
             QOpenGLShaderProgram.Vertex, vs
             )
        print("Vertex shader ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        ok = self.program.addShaderFromSourceCode(
             QOpenGLShaderProgram.Fragment, fs
        )
        print("Fragment shader ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        ok = self.program.link()
        print("Program link ok:", ok, flush=True)
        print(self.program.log(), flush=True)
        if not ok:
            print("❌ Shader program failed — aborting GL init", flush=True)
        return
        
        print("✔ Shader program linked", flush=True)

        # ---- VAO ----
        self.vao = ctypes.c_uint()
        self.gl.glGenVertexArrays(1, ctypes.byref(self.vao))
        self.gl.glBindVertexArray(self.vao)

        # ---- VBO ----
        vertices = (ctypes.c_float * 6)(
            0.0,  0.6,
           -0.6, -0.6,
            0.6, -0.6,
        )

        self.vbo = ctypes.c_uint()
        self.gl.glGenBuffers(1, ctypes.byref(self.vbo))
        self.gl.glBindBuffer(self.gl.GL_ARRAY_BUFFER, self.vbo)
        self.gl.glBufferData(
            self.gl.GL_ARRAY_BUFFER,
            ctypes.sizeof(vertices),
            vertices,
            self.gl.GL_STATIC_DRAW,
        )

        # ---- Attribute 0 ----
        self.gl.glEnableVertexAttribArray(0)
        self.gl.glVertexAttribPointer(
            0, 2, self.gl.GL_FLOAT, False, 0, None
        )

        print("✔ VAO/VBO configured", flush=True)

    def paintGL(self):
        self.gl.glClear(self.gl.GL_COLOR_BUFFER_BIT)
        self.program.bind()
        self.gl.glBindVertexArray(self.vao)
        self.gl.glDrawArrays(self.gl.GL_TRIANGLES, 0, 3)
        self.program.release()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PySide6 Safe OpenGL Test")
        self.resize(600, 600)
        self.setCentralWidget(GLWidget())


if __name__ == "__main__":
    print("Starting application", flush=True)
    app = QApplication(sys.argv)
    win = MainWindow()
    win.show()
    sys.exit(app.exec())

