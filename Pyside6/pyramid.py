import sys
import threading
import queue
import time
import numpy as np
import moderngl
import glfw
from PySide6.QtWidgets import QApplication, QMainWindow, QLabel, QVBoxLayout, QWidget
from PySide6.QtGui import QImage, QPixmap
from PySide6.QtCore import Qt, QTimer

# --- Matrix Helpers (Orthogonal & Rotation) ---
def ortho_matrix(left, right, bottom, top, near, far):
    res = np.eye(4, dtype='f4')
    res[0, 0] = 2.0 / (right - left)
    res[1, 1] = 2.0 / (top - bottom)
    res[2, 2] = -2.0 / (far - near)
    res[3, 0] = -(right + left) / (right - left)
    res[3, 1] = -(top + bottom) / (top - bottom)
    res[3, 2] = -(far + near) / (far - near)
    return res

def look_at_matrix(eye, target, up):
    eye = np.array(eye, dtype='f4')
    target = np.array(target, dtype='f4')
    up = np.array(up, dtype='f4')
    forward = target - eye
    forward /= np.linalg.norm(forward)
    right = np.cross(forward, up)
    right /= np.linalg.norm(right)
    actual_up = np.cross(right, forward)
    res = np.eye(4, dtype='f4')
    res[0, 0], res[1, 0], res[2, 0] = right
    res[0, 1], res[1, 1], res[2, 1] = actual_up
    res[0, 2], res[1, 2], res[2, 2] = -forward
    res[3, 0], res[3, 1] = -np.dot(right, eye), -np.dot(actual_up, eye)
    res[3, 2] = -np.dot(forward, eye)
    return res

def rotate_y_matrix(angle):
    c, s = np.cos(angle), np.sin(angle)
    res = np.eye(4, dtype='f4')
    res[0, 0], res[0, 2], res[2, 0], res[2, 2] = c, s, -s, c
    return res

class RenderWorker(threading.Thread):
    def __init__(self, width, height, data_queue):
        super().__init__(daemon=True)
        self.width, self.height = width, height
        self.data_queue = data_queue
        self.running = True

    def run(self):
        if not glfw.init(): return
        glfw.window_hint(glfw.VISIBLE, glfw.FALSE)
        window = glfw.create_window(1, 1, "Offscreen", None, None)
        glfw.make_context_current(window)
        ctx = moderngl.create_context()

        prog = ctx.program(
            vertex_shader='''
                #version 330 core
                in vec3 in_vert;
                uniform mat4 mvp;
                void main() { gl_Position = mvp * vec4(in_vert, 1.0); }
            ''',
            fragment_shader='''
                #version 330 core
                out vec4 f_color;
                uniform vec3 color;
                void main() { f_color = vec4(color, 1.0); }
            '''
        )

        # Basic Pyramid Vertices
        # Pyramid Vertices (3 vertices per triangle, CCW order)
        vertices = np.array([
            # Side 1 (Front)
            0.0,  0.5,  0.0,   -0.5, -0.5,  0.5,    0.5, -0.5,  0.5,
            # Side 2 (Right)
            0.0,  0.5,  0.0,    0.5, -0.5,  0.5,    0.5, -0.5, -0.5,
            # Side 3 (Back)
            0.0,  0.5,  0.0,    0.5, -0.5, -0.5,   -0.5, -0.5, -0.5,
            # Side 4 (Left)
            0.0,  0.5,  0.0,   -0.5, -0.5, -0.5,   -0.5, -0.5,  0.5,
            # Base (Two triangles to make a square)
            -0.5, -0.5, -0.5,   0.5, -0.5,  0.5,   -0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,    0.5, -0.5,  0.5
        ], dtype='f4')
        
        vbo = ctx.buffer(vertices.tobytes())
        vao = ctx.vertex_array(prog, [(vbo, '3f', 'in_vert')])
        fbo_tex = ctx.texture((self.width, self.height), 4) # 8-bit RGBA for easy QImage conversion
        fbo_depth = ctx.depth_renderbuffer((self.width, self.height))
        fbo = ctx.framebuffer(fbo_tex, fbo_depth)

        start_time = time.perf_counter()
        while self.running:
            t = time.perf_counter() - start_time
            fbo.use()
            ctx.clear(0.8, 0.2, 0.5, 1.0) # Pink Background
            ctx.enable(moderngl.DEPTH_TEST)

            # Orthogonal projection for consistency
            aspect = self.width / self.height
            size = 10.0 
            proj = ortho_matrix(-size * aspect, size * aspect, -size, size, -100.0, 100.0)
            #view = look_at_matrix([2.0, 2.0, 2.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
            view = look_at_matrix([2.5, 2.0, 2.5], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
            model = rotate_y_matrix(t)
            
            prog['mvp'].write((proj @ view @ model).astype('f4').T.tobytes())
            prog['color'].value = (1.0, 1.0, 1.0)
            
            vao.render()
            
            # Read as bytes for PySide6
            img_data = fbo_tex.read()
            if self.data_queue.full(): self.data_queue.get_nowait()
            self.data_queue.put(img_data)
            time.sleep(0.016)

class MainWindow(QMainWindow):
    def __init__(self, width, height):
        super().__init__()
        self.setWindowTitle("PySide6 ModernGL Pyramid")
        self.width, self.height = width, height
        
        self.label = QLabel()
        self.setCentralWidget(self.label)
        
        self.data_queue = queue.Queue(maxsize=1)
        self.worker = RenderWorker(width, height, self.data_queue)
        self.worker.start()
        
        # UI Refresh Timer (approx 60 FPS)
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(16)

    def update_frame(self):
        try:
            raw_data = self.data_queue.get_nowait()
            # Convert raw bytes to QImage
            qimg = QImage(raw_data, self.width, self.height, QImage.Format_RGBA8888).flipped(Qt.Orientation.Vertical)
            self.label.setPixmap(QPixmap.fromImage(qimg))
        except queue.Empty:
            pass

    def closeEvent(self, event):
        self.worker.running = False
        self.worker.join()
        super().closeEvent(event)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow(600, 600)
    window.show()
    sys.exit(app.exec())
