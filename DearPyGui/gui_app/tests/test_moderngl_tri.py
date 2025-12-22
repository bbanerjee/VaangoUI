import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import sys
import threading
import queue
import time

class SimpleRenderer:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.ctx = None
        self.prog = None
        self.vao = None
        self.vbo = None
        self.fbo = None
        self.running = True

    def initialize(self):
        """Setup Standalone ModernGL context."""
        try:
            self.ctx = moderngl.create_standalone_context()
            print(f"--- Headless GPU INFO ---")
            print(f"Renderer: {self.ctx.info['GL_RENDERER']}")
            print(f"-------------------------")
        except Exception as e:
            print(f"ERROR: Could not create ModernGL context: {e}")
            return False
        
        self.ctx.viewport = (0, 0, self.width, self.height)
        self.ctx.disable(moderngl.CULL_FACE)
        self.ctx.disable(moderngl.DEPTH_TEST)
        
        self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
        self.fbo = self.ctx.framebuffer(color_attachments=[self.fbo_texture])
        
        self.prog = self.ctx.program(
            vertex_shader='''
                #version 330 core
                in vec2 in_vert;
                in vec3 in_color;
                out vec3 v_color;
                void main() {
                    gl_Position = vec4(in_vert, 0.0, 1.0);
                    v_color = in_color;
                }
            ''',
            fragment_shader='''
                #version 330 core
                in vec3 v_color;
                out vec4 f_color;
                void main() {
                    f_color = vec4(v_color, 1.0);
                }
            '''
        )
        
        vertices = np.array([
            0.0,  0.7,   1.0, 0.0, 0.0,
           -0.7, -0.7,   0.0, 1.0, 0.0,
            0.7, -0.7,   0.0, 0.0, 1.0,
        ], dtype='f4')
        
        self.vbo = self.ctx.buffer(vertices.tobytes())
        self.vao = self.ctx.vertex_array(self.prog, [(self.vbo, '2f 3f', 'in_vert', 'in_color')])
        return True

    def render_loop(self, data_queue):
        """Target for the background thread."""
        if not self.initialize():
            return

        while self.running:
            self.fbo.use()
            self.ctx.clear(0.9, 0.9, 1.0, 1.0) 
            self.vao.render(moderngl.TRIANGLES)
            self.ctx.finish()
            
            raw_data = self.fbo.read(components=4, dtype='f4')
            data = np.frombuffer(raw_data, dtype='f4').copy().reshape(self.height, self.width, 4)
            data[:, :, 3] = 1.0
            processed_data = np.flipud(data).flatten()
            
            # Put the new frame in the queue (overwrite old if needed)
            if data_queue.full():
                try:
                    data_queue.get_nowait()
                except queue.Empty:
                    pass
            data_queue.put(processed_data)
            
            # Artificial sleep to prevent the thread from spinning too fast
            # and stealing all GPU resources from the main UI thread.
            time.sleep(0.01)

        self.cleanup()

    def cleanup(self):
        if self.vao: self.vao.release()
        if self.vbo: self.vbo.release()
        if self.fbo: self.fbo.release()
        if self.ctx: self.ctx.release()

def main():
    width, height = 600, 600
    renderer = SimpleRenderer(width, height)
    data_queue = queue.Queue(maxsize=1)
    
    # Start the ModernGL thread
    render_thread = threading.Thread(target=renderer.render_loop, args=(data_queue,), daemon=True)
    render_thread.start()

    # Dear PyGui Setup
    dpg.create_context()
    
    with dpg.texture_registry():
        dpg.add_dynamic_texture(
            width=width, 
            height=height, 
            default_value=np.zeros(width*height*4, dtype='f4'), 
            tag="tex_tag"
        )

    with dpg.window(label="Threaded ModernGL Output", width=620, height=720, no_close=True):
        dpg.add_text("The Renderer is running on a background thread.")
        dpg.add_image("tex_tag", width=600, height=600)
        dpg.add_separator()
        dpg.add_text("UI FPS: 0", tag="ui_fps")
        dpg.add_text("Data Mean: 0", tag="status_info")

    dpg.create_viewport(title='Multithreaded Renderer', width=640, height=760)
    dpg.setup_dearpygui()
    dpg.show_viewport()

    while dpg.is_dearpygui_running():
        # Check if the render thread has produced new data
        try:
            # Non-blocking get from queue
            pixel_data = data_queue.get_nowait()
            dpg.set_value("tex_tag", pixel_data)
            
            if dpg.get_frame_count() % 60 == 0:
                avg = np.mean(pixel_data)
                dpg.set_value("status_info", f"Data Mean: {avg:.4f}")
        except queue.Empty:
            pass
            
        if dpg.get_frame_count() % 60 == 0:
            dpg.set_value("ui_fps", f"UI FPS: {dpg.get_frame_rate()}")

        dpg.render_dearpygui_frame()

    # Signal the thread to stop
    renderer.running = False
    render_thread.join(timeout=1.0)
    dpg.destroy_context()

if __name__ == "__main__":
    main()