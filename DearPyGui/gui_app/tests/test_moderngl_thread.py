import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import threading
import queue
import time

# --- 1. Robust Matrix Helper Functions ---
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
    f = (target - eye)
    f /= np.linalg.norm(f)
    s = np.cross(f, up)
    s /= np.linalg.norm(s)
    u = np.cross(s, f)
    res = np.eye(4, dtype=np.float32)
    res[0, 0], res[1, 0], res[2, 0] = s[0], s[1], s[2]
    res[0, 1], res[1, 1], res[2, 1] = u[0], u[1], u[2]
    res[0, 2], res[1, 2], res[2, 2] = -f[0], -f[1], -f[2]
    res[3, 0], res[3, 1], res[3, 2] = -np.dot(s, eye), -np.dot(u, eye), np.dot(f, eye)
    return res

def rotate_y_matrix(angle):
    c, s = np.cos(angle), np.sin(angle)
    res = np.eye(4, dtype=np.float32)
    res[0, 0], res[0, 2] = c, s
    res[2, 0], res[2, 2] = -s, c
    return res

# --- 2. The ModernGL Renderer Class ---
class MGLRenderer:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.ctx = None
        self.prog = None
        self.vbo = None
        self.ibo = None
        self.vao = None
        self.fbo = None
        self.running = True
        self.heartbeat = 0

    def initialize_context(self):
        try:
            self.ctx = moderngl.create_standalone_context()
            self.ctx.enable(moderngl.DEPTH_TEST)
            
            # Use 8-bit unsigned bytes for texture - much more stable for DPG uploads
            self.fbo_texture = self.ctx.texture((self.width, self.height), 4)
            self.fbo_depth = self.ctx.depth_renderbuffer((self.width, self.height))
            self.fbo = self.ctx.framebuffer(self.fbo_texture, self.fbo_depth)

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
                    uniform vec4 base_color;
                    uniform float u_time;
                    out vec4 f_color;
                    void main() {
                        float pulse = (sin(u_time * 5.0) + 1.0) * 0.5;
                        f_color = vec4(base_color.rgb * (0.4 + pulse * 0.6), 1.0);
                    }
                '''
            )
            return True
        except Exception as e:
            print(f"GL Init Error: {e}")
            return False

    def render_thread(self, data_queue):
        if not self.initialize_context(): return
        
        # Geometry
        verts = np.array([[0,0.8,0], [-0.7,-0.6,0.7], [0.7,-0.6,0.7], [0.7,-0.6,-0.7], [-0.7,-0.6,-0.7]], dtype='f4')
        indices = np.array([0,1,2, 0,2,3, 0,3,4, 0,4,1, 1,2,3, 1,3,4], dtype='i4')
        
        vbo = self.ctx.buffer(verts.tobytes())
        ibo = self.ctx.buffer(indices.tobytes())
        vao = self.ctx.vertex_array(self.prog, [(vbo, '3f', 'in_vert')], ibo)

        start_time = time.perf_counter()
        while self.running:
            self.heartbeat += 1
            t = time.perf_counter() - start_time
            
            self.fbo.use()
            self.ctx.viewport = (0, 0, self.width, self.height)
            self.ctx.clear(0.15, 0.15, 0.2, 1.0)
            self.ctx.clear(depth=1.0)
            
            # Matrices
            model = rotate_y_matrix(t * 1.5)
            view = look_at_matrix(np.array([0, 1.5, 5]), np.array([0, 0, 0]), np.array([0, 1, 0]))
            proj = perspective_matrix(np.radians(45), self.width/self.height, 0.1, 100)
            mvp = proj @ view @ model
            
            self.prog['mvp'].write(mvp.astype('f4').tobytes())
            self.prog['u_time'].value = float(t)
            self.prog['base_color'].value = (0.2, 0.6, 1.0, 1.0)
            
            vao.render(moderngl.TRIANGLES)
            self.ctx.finish() 

            # Read Pixels as 8-bit unsigned int
            raw = self.fbo.read(components=4, dtype='u1')
            img = np.frombuffer(raw, dtype='u1').copy().reshape(self.height, self.width, 4)
            
            # Moving White Pixel (validation)
            px_idx = int(t * 100) % self.width
            img[10, px_idx] = [255, 255, 255, 255]
            
            # Flip and convert to float32 for DPG's dynamic texture
            out = np.flipud(img).astype('f4') / 255.0
            out_flat = out.flatten()
            
            if data_queue.full():
                try: data_queue.get_nowait()
                except: pass
            data_queue.put((out_flat, self.heartbeat))
            
            time.sleep(0.005)

def main():
    width, height = 600, 600
    renderer = MGLRenderer(width, height)
    data_queue = queue.Queue(maxsize=1)
    
    thread = threading.Thread(target=renderer.render_thread, args=(data_queue,), daemon=True)
    thread.start()

    dpg.create_context()
    with dpg.texture_registry():
        # Initialize with zeros
        dpg.add_dynamic_texture(width, height, default_value=np.zeros(width*height*4, dtype='f4'), tag="mgl_tex")

    with dpg.window(label="NVIDIA Headless 3D - Fixed Sync", width=620, height=720):
        dpg.add_image("mgl_tex", width=600, height=600)
        dpg.add_text("Thread Heartbeat: 0", tag="hb_text")
        dpg.add_text("Mean Value: 0", tag="mean_text")

    dpg.create_viewport(width=640, height=760)
    dpg.setup_dearpygui()
    dpg.show_viewport()

    while dpg.is_dearpygui_running():
        try:
            pixels, hb = data_queue.get_nowait()
            # Crucial: DPG needs a flat float list or array
            dpg.set_value("mgl_tex", pixels)
            
            dpg.set_value("hb_text", f"Thread Heartbeat: {hb}")
            # Use raw pixels to calculate mean to see if it's changing
            dpg.set_value("mean_text", f"Mean: {np.mean(pixels):.6f}")
        except queue.Empty:
            pass
        dpg.render_dearpygui_frame()

    renderer.running = False
    thread.join(1.0)
    dpg.destroy_context()

if __name__ == "__main__":
    main()