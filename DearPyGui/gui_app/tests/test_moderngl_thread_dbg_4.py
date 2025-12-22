import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import threading
import queue
import time
import glfw

# --- 1. Robust Matrix Helpers (Standard OpenGL Style) ---
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
    
    forward = target - eye
    forward /= np.linalg.norm(forward)
    
    right = np.cross(forward, up)
    right /= np.linalg.norm(right)
    
    actual_up = np.cross(right, forward)
    
    res = np.eye(4, dtype='f4')
    res[0, 0], res[1, 0], res[2, 0] = right
    res[0, 1], res[1, 1], res[2, 1] = actual_up
    res[0, 2], res[1, 2], res[2, 2] = -forward
    res[3, 0] = -np.dot(right, eye)
    res[3, 1] = -np.dot(actual_up, eye)
    #res[3, 2] = -np.dot(forward, eye)
    res[3, 2] = np.dot(forward, eye)
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

    def render_thread(self, data_queue):
        if not glfw.init(): return
        glfw.window_hint(glfw.VISIBLE, glfw.FALSE)
        window = glfw.create_window(1, 1, "Context", None, None)
        glfw.make_context_current(window)
        ctx = moderngl.create_context()
        
        # Shader
        # prog = ctx.program(
        #     vertex_shader='''
        #         #version 330 core
        #         in vec3 in_vert;
        #         uniform mat4 mvp;
        #         void main() { gl_Position = mvp * vec4(in_vert, 1.0); }
        #     ''',
        #     fragment_shader='''
        #         #version 330 core
        #         out vec4 f_color;
        #         void main() { f_color = vec4(1.0, 1.0, 1.0, 1.0); }
        #     '''
        # )
        prog = ctx.program(
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

        # Geometry: centered at origin
        vertices = np.array([
            0.0, 0.5, 0.0,  -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,
            0.0, 0.5, 0.0,   0.5, -0.5,  0.5,   0.5, -0.5, -0.5,
            0.0, 0.5, 0.0,   0.5, -0.5, -0.5,  -0.5, -0.5, -0.5,
            0.0, 0.5, 0.0,  -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5
        ], dtype='f4')
        #vertices = vertices * 2.0
        
        vbo = ctx.buffer(vertices.tobytes())
        vao = ctx.vertex_array(prog, [(vbo, '3f', 'in_vert')])
        
        fbo_tex = ctx.texture((self.width, self.height), 4, dtype='f4')
        fbo_depth = ctx.depth_renderbuffer((self.width, self.height))
        fbo = ctx.framebuffer(fbo_tex, fbo_depth)

        start_time = time.perf_counter()
        
        while self.running:
            t = time.perf_counter() - start_time
            fbo.use()
            # Clear to BLACK to make mean calculation obvious
            ctx.clear(0.0, 0.0, 0.0, 1.0)
            ctx.enable(moderngl.DEPTH_TEST)
            
            # Camera 3 units back, looking at origin
            proj = perspective_matrix(np.radians(45.0), self.width/self.height, 0.1, 100.0)
            #view = look_at_matrix([0.0, 1.0, 3.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
            view = look_at_matrix([0.0, 0.5, 1.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
            #view = look_at_matrix([0.0, 0.0, 1.5], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0])
            model = rotate_y_matrix(t)
            mvp = proj @ view @ model
            
            prog['mvp'].write(mvp.astype('f4').tobytes())
            prog['color'].value = (1.0, 1.0, 1.0) # White Pyramid
            vao.render()
            
            raw = fbo_tex.read()
            img = np.frombuffer(raw, dtype='f4').reshape(self.height, self.width, 4).copy()
            
            # Re-apply Pink Background to the image AFTER checking the render
            render_sum = np.sum(img[:,:,:3])
            if render_sum == 0:
                # If nothing rendered, show solid red so we know it's empty
                img[:,:,0:3] = [0.8, 0.2, 0.5] 
            
            if data_queue.full(): data_queue.get_nowait()
            data_queue.put((img.ravel(), render_sum))
            time.sleep(0.01)

def main():
    w, h = 600, 600
    renderer = MGLRenderer(w, h)
    q = queue.Queue(maxsize=1)
    threading.Thread(target=renderer.render_thread, args=(q,), daemon=True).start()

    dpg.create_context()
    with dpg.texture_registry():
        dpg.add_dynamic_texture(w, h, default_value=np.zeros(w*h*4, dtype='f4'), tag="tex")

    with dpg.window(label="Frustum Debugger", width=620, height=660):
        dpg.add_image("tex", width=600, height=600)
        dpg.add_text("Render Sum: 0", tag="stat")

    dpg.create_viewport(width=640, height=700)
    dpg.setup_dearpygui()
    dpg.show_viewport()

    while dpg.is_dearpygui_running():
        try:
            pixels, r_sum = q.get_nowait()
            dpg.set_value("tex", pixels)
            dpg.set_value("stat", f"Render Pixels Detected: {r_sum:.2f}")
        except queue.Empty: pass
        dpg.render_dearpygui_frame()

    renderer.running = False
    dpg.destroy_context()

if __name__ == "__main__":
    main()