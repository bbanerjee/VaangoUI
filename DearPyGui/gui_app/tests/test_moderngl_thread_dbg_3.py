import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import threading
import queue
import time
import glfw

# --- 1. Fixed Matrix Helpers ---
def perspective_matrix(fov, aspect, near, far):
    f = 1.0 / np.tan(fov / 2.0)
    res = np.zeros((4, 4), dtype=np.float32)
    res[0, 0] = f / aspect
    res[1, 1] = f
    res[2, 2] = (far + near) / (near - far)
    res[2, 3] = -1.0
    res[3, 2] = (2.0 * far * near) / (near - far)
    return res

def look_at_matrix(eye, target, up):
    eye = np.array(eye, dtype='f4')
    target = np.array(target, dtype='f4')
    up = np.array(up, dtype='f4')
    
    zvec = eye - target
    zvec /= np.linalg.norm(zvec)
    xvec = np.cross(up, zvec)
    xvec /= np.linalg.norm(xvec)
    yvec = np.cross(zvec, xvec)

    res = np.eye(4, dtype='f4')
    res[0, 0], res[1, 0], res[2, 0] = xvec
    res[0, 1], res[1, 1], res[2, 1] = yvec
    res[0, 2], res[1, 2], res[2, 2] = zvec
    res[3, 0] = -np.dot(xvec, eye)
    res[3, 1] = -np.dot(yvec, eye)
    res[3, 2] = -np.dot(zvec, eye)
    return res

def rotate_y_matrix(angle):
    c, s = np.cos(angle), np.sin(angle)
    res = np.eye(4, dtype='f4')
    res[0, 0], res[0, 2] = c, s
    res[2, 0], res[2, 2] = -s, c
    return res

class MGLRenderer:
    def __init__(self, width, height):
        self.width, self.height = width, height
        self.running = True
        self.heartbeat = 0

    def initialize_context(self):
        if not glfw.init(): return False
        glfw.window_hint(glfw.VISIBLE, glfw.FALSE)
        self.window = glfw.create_window(1, 1, "Hidden", None, None)
        glfw.make_context_current(self.window)
        self.ctx = moderngl.create_context()
        
        self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
        self.fbo_depth = self.ctx.depth_renderbuffer((self.width, self.height))
        self.fbo = self.ctx.framebuffer(self.fbo_texture, self.fbo_depth)
        
        self.prog = self.ctx.program(
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
        return True

    def render_thread(self, data_queue):
        if not self.initialize_context(): return

        # Explicit geometry with Base
        p_verts = np.array([
            0,1,0, -0.5,-0.5,0.5, 0.5,-0.5,0.5,
            0,1,0, 0.5,-0.5,0.5, 0.5,-0.5,-0.5,
            0,1,0, 0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
            0,1,0, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
            -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5,
            -0.5,-0.5,-0.5, 0.5,-0.5,0.5, -0.5,-0.5,0.5
        ], dtype='f4')
        
        vbo = self.ctx.buffer(p_verts.tobytes())
        vao = self.ctx.vertex_array(self.prog, [(vbo, '3f', 'in_vert')])

        start_time = time.perf_counter()
        
        while self.running:
            try:
                self.heartbeat += 1
                t = time.perf_counter() - start_time
                
                self.fbo.use()
                self.ctx.clear(0.8, 0.2, 0.5, 1.0, depth=1.0)
                self.ctx.enable(moderngl.DEPTH_TEST)
                self.ctx.disable(moderngl.CULL_FACE)
                
                # REVISED CAMERA: Positioned slightly above and back
                view = look_at_matrix([0.0, 1.0, 3.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
                proj = perspective_matrix(np.radians(45.0), self.width/self.height, 0.1, 100.0)
                model = rotate_y_matrix(t)
                
                # ModernGL expects the dot product result as (Projection * View * Model)
                mvp = proj @ view @ model
                
                # DEBUG TRACE: Check if last row/column is helping perspective
                if self.heartbeat % 100 == 0:
                    print(f"MVP Trace [3,2]: {mvp[3,2]:.2f} | [2,3]: {mvp[2,3]:.2f}")

                self.prog['mvp'].write(mvp.astype('f4').tobytes())
                self.prog['color'].value = (1.0, 1.0, 1.0)
                
                vao.render()
                
                raw = self.fbo_texture.read()
                img = np.frombuffer(raw, dtype='f4').reshape(self.height, self.width, 4).copy()
                gpu_mean = np.mean(img[:,:,:3])
                
                if data_queue.full(): data_queue.get_nowait()
                data_queue.put((img.ravel(), self.heartbeat, gpu_mean))
                
            except Exception as e:
                print(f"Error: {e}")
            time.sleep(0.01)

def main():
    width, height = 600, 600
    renderer = MGLRenderer(width, height)
    data_queue = queue.Queue(maxsize=1)
    threading.Thread(target=renderer.render_thread, args=(data_queue,), daemon=True).start()

    dpg.create_context()
    with dpg.texture_registry():
        dpg.add_dynamic_texture(width, height, default_value=np.zeros(width*height*4, dtype='f4'), tag="mgl_tex")

    with dpg.window(label="MVP Fix Debugger", width=620, height=750):
        dpg.add_image("mgl_tex", width=600, height=600)
        dpg.add_text("Mean: 0", tag="mean_text")
        dpg.add_text("Status: Checking...", tag="sys_text")

    dpg.create_viewport(width=640, height=800)
    dpg.setup_dearpygui()
    dpg.show_viewport()

    while dpg.is_dearpygui_running():
        try:
            pixels, hb, g_mean = data_queue.get_nowait()
            dpg.set_value("mgl_tex", pixels)
            dpg.set_value("mean_text", f"GPU Mean: {g_mean:.6f}")
            if g_mean > 0.501:
                dpg.set_value("sys_text", "Status: SUCCESS - Pyramid Found")
                dpg.configure_item("sys_text", color=[0, 255, 0])
            else:
                dpg.set_value("sys_text", "Status: FAIL - Only Background")
                dpg.configure_item("sys_text", color=[255, 0, 0])
        except queue.Empty: pass
        dpg.render_dearpygui_frame()
    
    renderer.running = False
    dpg.destroy_context()

if __name__ == "__main__":
    main()