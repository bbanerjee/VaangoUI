import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import threading
import queue
import time
import glfw
import sys

# --- Matrix Helpers ---
def perspective_matrix(fov, aspect, near, far):
    t = np.tan(fov / 2.0)
    res = np.zeros((4, 4), dtype=np.float32)
    res[0, 0] = 1.0 / (aspect * t)
    res[1, 1] = 1.0 / t
    res[2, 2] = -(far + near) / (far - near)
    res[2, 3] = -1.0
    res[3, 2] = -(2.0 * far * near) / (far - near)
    return res

def look_at_matrix(eye, target, up):
    eye = np.array(eye, dtype='f4')
    target = np.array(target, dtype='f4')
    up = np.array(up, dtype='f4')
    f = (target - eye)
    f /= (np.linalg.norm(f) + 1e-9)
    s = np.cross(f, up)
    s /= (np.linalg.norm(s) + 1e-9)
    u = np.cross(s, f)
    res = np.eye(4, dtype='f4')
    res[0, 0], res[1, 0], res[2, 0] = s[0], s[1], s[2]
    res[0, 1], res[1, 1], res[2, 1] = u[0], u[1], u[2]
    res[0, 2], res[1, 2], res[2, 2] = -f[0], -f[1], -f[2]
    res[3, 0], res[3, 1], res[3, 2] = -np.dot(s, eye), -np.dot(u, eye), np.dot(f, eye)
    return res

def rotate_y_matrix(angle):
    c, s = np.cos(angle, dtype='f4'), np.sin(angle, dtype='f4')
    res = np.eye(4, dtype='f4')
    res[0, 0], res[0, 2] = c, s
    res[2, 0], res[2, 2] = -s, c
    return res

class MGLRenderer:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.ctx = None
        self.prog = None
        self.running = True
        self.heartbeat = 0
        self.window = None

    def initialize_context(self):
        if not glfw.init():
            return False
        glfw.window_hint(glfw.VISIBLE, glfw.FALSE) 
        self.window = glfw.create_window(self.width, self.height, "Debug_Context", None, None)
        if not self.window:
            return False
        glfw.make_context_current(self.window)
        self.ctx = moderngl.create_context()
        
        # --- DEBUG INFO ---
        print(f"--- GPU DEBUG INFO ---")
        print(f"Vendor: {self.ctx.info['GL_VENDOR']}")
        print(f"Renderer: {self.ctx.info['GL_RENDERER']}")
        print(f"Version: {self.ctx.info['GL_VERSION']}")
        
        self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
        self.fbo_depth = self.ctx.depth_renderbuffer((self.width, self.height))
        self.fbo = self.ctx.framebuffer(self.fbo_texture, self.fbo_depth)
        
        try:
            self.prog = self.ctx.program(
                vertex_shader='''
                    #version 330 core
                    in vec3 in_vert;
                    uniform mat4 mvp;
                    void main() {
                        gl_Position = mvp * vec4(in_vert, 1.0);
                    }
                ''',
                fragment_shader='''
                    #version 330 core
                    out vec4 f_color;
                    uniform vec3 color;
                    void main() {
                        f_color = vec4(color, 1.0);
                    }
                '''
            )
        except Exception as e:
            print(f"Shader Error: {e}")
            return False
        return True

    def render_thread(self, data_queue):
        if not self.initialize_context(): return

        # Geometry defined explicitly for testing
        p_verts = np.array([
            0,1,0, -0.5,-0.5,0.5, 0.5,-0.5,0.5,
            0,1,0, 0.5,-0.5,0.5, 0.5,-0.5,-0.5,
            0,1,0, 0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
            0,1,0, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
            -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5, # Base 1
            -0.5,-0.5,-0.5, 0.5,-0.5,0.5, -0.5,-0.5,0.5  # Base 2
        ], dtype='f4')
        
        vbo = self.ctx.buffer(p_verts.tobytes())
        vao = self.ctx.vertex_array(self.prog, [(vbo, '3f', 'in_vert')])

        start_time = time.perf_counter()
        
        while self.running:
            try:
                self.heartbeat += 1
                t = time.perf_counter() - start_time
                
                self.fbo.use()
                # DEBUG: Force clear color and depth every frame
                self.ctx.clear(0.8, 0.2, 0.5, 1.0, depth=1.0)
                
                # DEBUG: Disable culling so we see faces regardless of orientation
                self.ctx.disable(moderngl.CULL_FACE)
                self.ctx.enable(moderngl.DEPTH_TEST)
                
                # Camera Setup
                view = look_at_matrix([2.0, 2.0, 5.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
                proj = perspective_matrix(np.radians(45.0), self.width/self.height, 0.1, 100.0)
                model = rotate_y_matrix(t)
                mvp = proj @ view @ model
                
                # DEBUG: Verify MVP matrix is not all zeros or NaNs
                if self.heartbeat % 100 == 0:
                    print(f"MVP Trace: {mvp[0,0]:.2f}, {mvp[3,3]:.2f}")

                self.prog['mvp'].write(mvp.astype('f4').tobytes())
                self.prog['color'].value = (1.0, 1.0, 1.0) # Solid White
                
                vao.render()
                
                # Read back
                raw = self.fbo_texture.read()
                img = np.frombuffer(raw, dtype='f4').reshape(self.height, self.width, 4).copy()
                
                # Calculate mean of RGB channels
                gpu_mean = np.mean(img[:,:,:3])
                
                if data_queue.full():
                    data_queue.get_nowait()
                data_queue.put((img.ravel(), self.heartbeat, gpu_mean))
                
            except Exception as e:
                print(f"Render Loop Error: {e}")
            time.sleep(0.01)

def main():
    width, height = 600, 600
    renderer = MGLRenderer(width, height)
    data_queue = queue.Queue(maxsize=1)
    
    thread = threading.Thread(target=renderer.render_thread, args=(data_queue,), daemon=True)
    thread.start()

    dpg.create_context()
    with dpg.texture_registry():
        dpg.add_dynamic_texture(width, height, default_value=np.zeros(width*height*4, dtype='f4'), tag="mgl_tex")

    with dpg.window(label="Debug Renderer", width=620, height=750):
        dpg.add_image("mgl_tex", width=600, height=600)
        dpg.add_text("Heartbeat: 0", tag="hb_text")
        dpg.add_text("GPU Mean: 0", tag="mean_text")
        dpg.add_text("System: Initializing...", tag="sys_text")

    dpg.create_viewport(width=640, height=800)
    dpg.setup_dearpygui()
    dpg.show_viewport()

    while dpg.is_dearpygui_running():
        try:
            pixels, hb, g_mean = data_queue.get_nowait()
            dpg.set_value("mgl_tex", pixels)
            dpg.set_value("hb_text", f"Heartbeat: {hb}")
            dpg.set_value("mean_text", f"GPU Mean: {g_mean:.6f}")
            
            # Diagnostic Feedback
            if g_mean > 0.505: # Background is 0.5, so anything higher means white pixels exist
                dpg.set_value("sys_text", "Status: PYRAMID DETECTED")
                dpg.configure_item("sys_text", color=[0, 255, 0])
            else:
                dpg.set_value("sys_text", "Status: ONLY BACKGROUND DETECTED")
                dpg.configure_item("sys_text", color=[255, 0, 0])
                
        except queue.Empty:
            pass
        dpg.render_dearpygui_frame()

    renderer.running = False
    thread.join(0.5)
    dpg.destroy_context()

if __name__ == "__main__":
    main()