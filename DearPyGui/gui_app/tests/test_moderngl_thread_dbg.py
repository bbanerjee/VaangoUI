import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import threading
import queue
import time
import glfw

# --- 1. Matrix Helpers ---
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

        # NVIDIA TWEAK: Set a tiny but visible window. 
        # Sometimes 'VISIBLE=FALSE' triggers the driver's power-saving/idle mode.
        glfw.window_hint(glfw.VISIBLE, glfw.TRUE) 
        glfw.window_hint(glfw.DECORATED, glfw.FALSE) # No borders
        glfw.window_hint(glfw.FOCUSED, glfw.FALSE)   # Don't steal focus
        
        self.window = glfw.create_window(1, 1, "NVIDIA_HB", None, None)
        if not self.window:
            glfw.terminate()
            return False

        glfw.make_context_current(self.window)
        # Create context and force garbage collection of any leaked contexts
        self.ctx = moderngl.create_context()
        self.ctx.gc_mode = "context_gc" 

        if self.ctx:
            print(f"HW: {self.ctx.info.get('GL_RENDERER')}")
            
            # FBO Setup with float32 for maximum driver engagement
            self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
            self.fbo_depth = self.ctx.depth_renderbuffer((self.width, self.height))
            self.fbo = self.ctx.framebuffer(
                color_attachments=[self.fbo_texture], 
                depth_attachment=self.fbo_depth
            )
            
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
            return True
        return False

    def render_thread(self, data_queue):
        if not self.initialize_context(): return

        p_verts = np.array([
            0,1,0, -0.5,-0.5,0.5, 0.5,-0.5,0.5,
            0,1,0, 0.5,-0.5,0.5, 0.5,-0.5,-0.5,
            0,1,0, 0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
            0,1,0, -0.5,-0.5,-0.5, -0.5,-0.5,0.5
        ], dtype='f4')
        vbo_p = self.ctx.buffer(p_verts.tobytes())
        vao_p = self.ctx.vertex_array(self.prog, [(vbo_p, '3f', 'in_vert')])

        start_time = time.perf_counter()
        
        while self.running:
            try:
                self.heartbeat += 1
                t = time.perf_counter() - start_time
                
                self.fbo.use()
                self.ctx.viewport = (0, 0, self.width, self.height)
                self.ctx.enable(moderngl.DEPTH_TEST)
                
                # Clear FBO directly - 1.0 Blue, 0.5 Red (Pink/Purple)
                self.fbo.clear(0.8, 0.2, 0.5, 1.0) 
                
                view = look_at_matrix([2.0, 2.0, 5.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
                proj = perspective_matrix(np.radians(45.0), self.width/self.height, 0.1, 100.0)
                
                m_p = rotate_y_matrix(t)
                self.prog['mvp'].write((proj @ view @ m_p).astype('f4').tobytes())
                self.prog['color'].value = (1.0, 1.0, 1.0) # White Pyramid
                vao_p.render()
                
                self.ctx.finish()

                raw = self.fbo_texture.read()
                img = np.frombuffer(raw, dtype='f4').reshape(self.height, self.width, 4).copy()
                
                gpu_mean = np.mean(img[:,:,:3])
                
                # Silent GPU -> Cyan CPU box
                if gpu_mean < 0.01:
                    x_pos = int(300 + np.sin(t*4) * 200)
                    img[250:350, x_pos-50:x_pos+50] = [0.0, 1.0, 1.0, 1.0]
                
                img[:, :, 3] = 1.0 
                out_flat = img.ravel()
                
                if data_queue.full():
                    try: data_queue.get_nowait()
                    except: pass
                data_queue.put((out_flat, self.heartbeat, gpu_mean))
                
            except Exception as e:
                print(f"Loop Error: {e}")
            
            time.sleep(0.01)

        if self.window:
            glfw.destroy_window(self.window)
        glfw.terminate()

def main():
    width, height = 600, 600
    renderer = MGLRenderer(width, height)
    data_queue = queue.Queue(maxsize=1)
    
    thread = threading.Thread(target=renderer.render_thread, args=(data_queue,), daemon=True)
    thread.start()

    dpg.create_context()
    with dpg.texture_registry():
        dpg.add_dynamic_texture(width, height, default_value=np.zeros(width*height*4, dtype='f4'), tag="mgl_tex")

    with dpg.window(label="NVIDIA 1660S Force-Wake", width=620, height=720):
        dpg.add_image("mgl_tex", width=600, height=600)
        dpg.add_text("HB: 0", tag="hb_text")
        dpg.add_text("GPU Mean: 0", tag="gpu_mean_text")
        dpg.add_text("Status: Forcing HW...", tag="status_text")

    dpg.create_viewport(width=640, height=760)
    dpg.setup_dearpygui()
    dpg.show_viewport()

    while dpg.is_dearpygui_running():
        try:
            pixels, hb, g_mean = data_queue.get_nowait()
            dpg.set_value("mgl_tex", pixels)
            dpg.set_value("hb_text", f"HB: {hb}")
            dpg.set_value("gpu_mean_text", f"GPU Mean: {g_mean:.6f}")
            
            if g_mean < 0.01:
                dpg.set_value("status_text", "Status: HW ASLEEP (Cyan Box = CPU)")
                dpg.configure_item("status_text", color=[0, 255, 255])
            else:
                dpg.set_value("status_text", "Status: HW AWAKE! (Pink BG)")
                dpg.configure_item("status_text", color=[255, 100, 255])
                
        except queue.Empty:
            pass
        dpg.render_dearpygui_frame()

    renderer.running = False
    thread.join(0.5)
    dpg.destroy_context()

if __name__ == "__main__":
    main()