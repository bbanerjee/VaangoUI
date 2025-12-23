import sys
import ctypes
from array import array

from OpenGL import GL   # constants only

from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QSurfaceFormat
from PySide6.QtOpenGL import (
    QOpenGLShaderProgram,
    QOpenGLShader,
    QOpenGLBuffer,
    QOpenGLVertexArrayObject,
    QOpenGLDebugLogger,
)


class GLWidget(QOpenGLWidget):

    def __init__(self):
        super().__init__()
        fmt = QSurfaceFormat()
        fmt.setVersion(3, 3)
        fmt.setProfile(QSurfaceFormat.CoreProfile)
        fmt.setOption(QSurfaceFormat.DebugContext)
        self.setFormat(fmt)
        self.program = None
        self.logger = None
    
    def initializeGL(self):
        print("initializeGL()", flush=True)

        self.gl = None

        ctx = self.context()
        if not ctx:
            print("No OpenGL context")
            return

        self.gl = ctx.extraFunctions()
        print("OpenGL initialized", flush=True)

        self.logger = QOpenGLDebugLogger(self)
        if self.logger.initialize():
            print("✔ OpenGL debug logger initialized", flush=True)
            self.logger.messageLogged.connect(self.handleLoggedMessage)
            self.logger.startLogging()

        fmt = ctx.format()
        print(
            f"OpenGL {fmt.majorVersion()}.{fmt.minorVersion()}, "
            f"profile={fmt.profile()}",
            flush=True
        )

        self.gl.glClearColor(0.8, 0.2, 0.5, 1.0)

        # ---------- Shaders ----------
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
            FragColor = vec4(1.0);
        }
        """

        self.program = QOpenGLShaderProgram(self)
        self.program.addShaderFromSourceCode(QOpenGLShader.Vertex, vs)
        self.program.addShaderFromSourceCode(QOpenGLShader.Fragment, fs)

        if not self.program.link():
            raise RuntimeError(self.program.log())

        # ---------- Vertex data ----------
        vertices = array(
            "f",
            [
                 0.0,  0.6,
                -0.6, -0.6,
                 0.6, -0.6,
            ],
        )

        try:
            # ---------- VAO ----------
            self.vao = QOpenGLVertexArrayObject(self)
            self.use_vao = True
            if not self.vao.create():
                print("❌ VAO creation failed", flush=True)
                return

            if self.vao.isCreated():
                self.vao.bind()
                 

            # ---------- VBO ----------
            self.vbo = QOpenGLBuffer(QOpenGLBuffer.VertexBuffer)
            if not self.vbo.create():
                print("❌ VBO creation failed", flush=True)
                return

            if self.vbo.isCreated():
                self.vbo.bind()

            self.vbo.allocate(vertices.tobytes(), len(vertices) * 4)

            # ---------- Attribute ----------
            self.program.bind()
     
            loc = self.program.attributeLocation("pos")
            print("Attribute 'pos' location:", loc, flush=True)

            if loc < 0:
                print("❌ Attribute 'pos' not found", flush=True)
                return

            # Use Qt's built-in methods instead of self.gl.glVertexAttribPointer
            self.program.enableAttributeArray(loc)
            # setAttributeBuffer(location, type, offset, tupleSize, stride)
            # If stride is 0, Qt calculates it based on tupleSize
            self.program.setAttributeBuffer(loc, GL.GL_FLOAT, 0, 2) 
            
            # Doesn't work
            #self.gl.glEnableVertexAttribArray(0)
            #self.gl.glVertexAttribPointer(
            #    0,
            #    2,
            #    GL.GL_FLOAT,
            #    False,
            #    2 * 4,
            #    ctypes.c_void_p(0)
            #)

            self.vbo.release()
            self.vao.release()
            self.program.release()

            print("✔ GL setup complete", flush=True)

        except Exception as e:
            print("❌ Exception during GL setup:", e, flush=True)

    def handleLoggedMessage(self, msg):
        print("GL DEBUG:", msg.message(), flush=True)

    def resizeGL(self, w, h):
        self.gl.glViewport(0, 0, w, h)

    def paintGL(self):

        if not hasattr(self, "gl") or self.gl is None:
           return

        self.gl.glClear(GL.GL_COLOR_BUFFER_BIT)

        self.program.bind()
        self.vao.bind()
      

        self.gl.glDrawArrays(GL.GL_TRIANGLES, 0, 3)

        self.vao.release()

        self.program.release()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Qt-only OpenGL 3.3 Triangle")
        self.resize(600, 600)
        self.setCentralWidget(GLWidget())

if __name__ == "__main__":
    print("Starting app", flush=True)

    fmt = QSurfaceFormat()
    fmt.setVersion(3, 3)
    fmt.setProfile(QSurfaceFormat.CoreProfile)
    fmt.setDepthBufferSize(24)
    fmt.setSamples(0)
    QSurfaceFormat.setDefaultFormat(fmt)

    app = QApplication(sys.argv)

    win = MainWindow()
    win.show()

    sys.exit(app.exec())

