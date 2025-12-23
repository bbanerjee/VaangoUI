import os
import sys
import ctypes

# Force software GL and verbose Qt logging
#os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
#os.environ["QT_LOGGING_RULES"] = "*.debug=true"

from OpenGL import GL
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QSurfaceFormat
from PySide6.QtOpenGL import QOpenGLShaderProgram, QOpenGLShader



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

        # ----- Shaders (GLSL 330) -----
        vs = """
        #version 330 core
        layout (location = 0) in vec2 pos;
        void main() {
            gl_Position = vec4(pos, 0.0, 1.0);
        }
        """
        fs = """
        #version 330
        out vec4 FragColor;
        void main() {
            FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        """

        self.program = QOpenGLShaderProgram()
        ok = self.program.addShaderFromSourceCode(QOpenGLShader.Vertex, vs)
        print("Vertex shader ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        ok = self.program.addShaderFromSourceCode(QOpenGLShader.Fragment, fs)
        print("Fragment shader ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        #self.program.bindAttributeLocation("pos", 0)

        ok = self.program.link()
        print("Program link ok:", ok, flush=True)
        print(self.program.log(), flush=True)

        if not ok:
            print("❌ Shader program failed — aborting GL init", flush=True)
            return

        print("✔ Shader program linked", flush=True)

        # ----- Vertex Data (VAO+VBO) -----
        #self.vertices = np.array([
        #    0.0,  0.6,
        #   -0.6, -0.6,
        #    0.6, -0.6,
        #], dtype=np.float32)
        #self.vertices = [
        #    0.0,  0.6,
        #   -0.6, -0.6,
        #    0.6, -0.6,
        #]
        vertices = (ctypes.c_float * 6)(
             0.0,  0.6,
            -0.6, -0.6,
             0.6, -0.6
        )

        # Set up VAO
        self.vao = GL.glGenVertexArrays(1)
        GL.glBindVertexArray(self.vao)

        # Set up VBO
        self.vbo = GL.glGenBuffers(1)
        GL.glBindBuffer(GL.GL_ARRAY_BUFFER, self.vbo)
        GL.glBufferData(
            GL.GL_ARRAY_BUFFER,
            ctypes.sizeof(self.vertices),
            self.vertices,
            GL.GL_STATIC_DRAW
        )

        # Set up attribute pointer
        GL.glEnableVertexAttribArray(0)
        GL.glVertexAttribPointer(
           0,   # location
           2,   # vec2
           GL.GL_FLOAT,
           GL.GL_FALSE,
           2 * ctypes.sizeof(ctypes.c_float),
           ctypes.c_void_p(0)
        )

        GL.glBindBuffer(GL.GL_ARRAY_BUFFER, 0)
        GL.glBindVertexArray(0)

        print("✔ Vertex buffers initialized", flush=True)


    def paintGL(self):
        self.gl.glClear(GL.GL_COLOR_BUFFER_BIT)

        self.program.bind()

        GL.glBindVertexArray(self.vao)
        GL.glDrawArrays(GL.GL_TRIANGLES, 0, 3)
        GL.glBindVertexArray(0)

        self.program.release()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PySide6 OpenGL 3.3 Triangle (VBO)")
        self.resize(600, 600)
        self.setCentralWidget(GLWidget())

if __name__ == "__main__":
    print("Starting application", flush=True)
    app = QApplication(sys.argv)

    fmt = QSurfaceFormat()
    fmt.setVersion(3, 3)
    fmt.setProfile(QSurfaceFormat.CoreProfile)
    fmt.setSamples(8)
    QSurfaceFormat.setDefaultFormat(fmt)

    win = MainWindow()
    win.show()

    sys.exit(app.exec())

