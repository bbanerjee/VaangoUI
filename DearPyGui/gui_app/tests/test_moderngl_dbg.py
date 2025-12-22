"""
ModernGL + DearPyGui - WORKING VERSION
Key insight: Render BEFORE dpg.render_dearpygui_frame() to avoid context conflicts
"""
import dearpygui.dearpygui as dpg
import moderngl
import numpy as np

def perspective_matrix(fov, aspect, near, far):
    f = 1.0 / np.tan(fov / 2.0)
    return np.array([
        [f / aspect, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, (far + near) / (near - far), -1],
        [0, 0, (2 * far * near) / (near - far), 0]
    ], dtype=np.float32)

def look_at_matrix(eye, target, up):
    z = eye - target
    z = z / np.linalg.norm(z)
    x = np.cross(up, z)
    x = x / np.linalg.norm(x)
    y = np.cross(z, x)
    
    view = np.eye(4, dtype=np.float32)
    view[:3, 0], view[:3, 1], view[:3, 2] = x, y, z
    view[:3, 3] = [-np.dot(x, eye), -np.dot(y, eye), -np.dot(z, eye)]
    return view.T

def rotate_y_matrix(angle):
    c, s = np.cos(angle), np.sin(angle)
    return np.array([
        [c, 0, s, 0],
        [0, 1, 0, 0],
        [-s, 0, c, 0],
        [0, 0, 0, 1]
    ], dtype=np.float32)

class MGLRenderer:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        
        self.vbo = None
        self.ibo = None
        self.vao = None
        self.ctx = None
        self.fbo = None
        self.fbo_texture = None
        self.fbo_depth = None
        self.prog = None
        self.num_indices = 0
        
        self.context_initialized = False

    def initialize_context(self):
        """Creates the ModernGL context BEFORE DearPyGui viewport setup."""
        if self.context_initialized:
            return True

        try:
            print("Initializing ModernGL context...")
            
            # Create standalone context
            self.ctx = moderngl.create_context(standalone=True, require=330)
            
            print(f"✓ Context: {self.ctx.info.get('GL_RENDERER', 'Unknown')}")
            
            # Configure context
            self.ctx.enable(moderngl.DEPTH_TEST)
            
            # Create offscreen framebuffer
            self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
            self.fbo_depth = self.ctx.depth_texture((self.width, self.height))
            self.fbo = self.ctx.framebuffer(
                color_attachments=[self.fbo_texture],
                depth_attachment=self.fbo_depth
            )
            
            # Compile shader program
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
                    uniform vec4 color;
                    out vec4 f_color;
                    void main() {
                        f_color = color;
                    }
                '''
            )
            
            print("✓ ModernGL initialized")
            self.context_initialized = True
            return True
            
        except Exception as e:
            print(f"✗ ModernGL init failed: {e}")
            import traceback
            traceback.print_exc()
            return False

    def set_mesh(self, vertices, faces):
        """Uploads mesh data to GPU."""
        if not self.context_initialized:
            return

        try:
            # Release old resources
            if self.vao:
                self.vao.release()
                self.vao = None
            if self.vbo:
                self.vbo.release()
                self.vbo = None
            if self.ibo:
                self.ibo.release()
                self.ibo = None

            # Convert to numpy arrays
            verts_array = np.array(vertices, dtype=np.float32)
            faces_array = np.array(faces, dtype=np.int32)
            
            verts_flat = verts_array.flatten()
            indices_flat = faces_array.flatten()
            
            # Validate indices
            if indices_flat.max() >= len(vertices):
                print(f"ERROR: Invalid mesh indices")
                return
            
            self.num_indices = len(indices_flat)
            
            # Create GPU buffers - BOTH must be instance variables
            self.vbo = self.ctx.buffer(verts_flat.tobytes())
            self.ibo = self.ctx.buffer(indices_flat.tobytes())
            
            # Create VAO
            self.vao = self.ctx.vertex_array(
                self.prog,
                [(self.vbo, '3f', 'in_vert')],
                self.ibo
            )
            
            print(f"✓ Mesh loaded: {len(vertices)} vertices, {self.num_indices//3} triangles")
            
        except Exception as e:
            print(f"✗ Mesh loading failed: {e}")
            self.num_indices = 0

    def render(self, rotation_angle, color):
        """Renders scene to offscreen buffer and returns pixel data."""
        # Return empty data if not ready
        if not self.context_initialized or not self.vao or self.num_indices == 0:
            return bytes(self.width * self.height * 16)  # 4 components * 4 bytes

        try:
            # CRITICAL: Bind our framebuffer
            self.fbo.use()
            
            # Clear
            self.ctx.clear(0.15, 0.15, 0.15, 1.0)
            
            # Calculate transformation matrices
            proj = perspective_matrix(
                np.radians(45.0), 
                self.width / self.height, 
                0.1, 
                100.0
            )
            
            view = look_at_matrix(
                np.array([0.0, 2.5, 5.0]),
                np.array([0.0, 0.0, 0.0]),
                np.array([0.0, 1.0, 0.0])
            )
            
            model = rotate_y_matrix(rotation_angle)
            
            mvp = proj @ view @ model
            
            # Update shader uniforms
            self.prog['mvp'].write(mvp.tobytes())
            self.prog['color'].value = tuple(color)
            
            # RENDER
            self.vao.render(moderngl.TRIANGLES)
            
            # Read framebuffer contents
            pixel_data = self.fbo.read(components=4, dtype='f4')
            
            return pixel_data
            
        except Exception as e:
            print(f"✗ Render error: {e}")
            return bytes(self.width * self.height * 16)

    def cleanup(self):
        """Release all GPU resources."""
        if self.vao: self.vao.release()
        if self.vbo: self.vbo.release()
        if self.ibo: self.ibo.release()
        if self.fbo: self.fbo.release()
        if self.fbo_texture: self.fbo_texture.release()
        if self.fbo_depth: self.fbo_depth.release()
        if self.ctx: self.ctx.release()


class App:
    def __init__(self):
        self.width = 600
        self.height = 600
        self.renderer = MGLRenderer(self.width, self.height)
        self.rotation = 0.0
        self.texture_tag = "mgl_texture"
        self.frame_count = 0

    def setup_mesh(self):
        """Define pyramid geometry."""
        vertices = [
            [ 0.0,  1.0,  0.0],   # 0: Top
            [-1.0, -1.0,  1.0],   # 1: Front Left
            [ 1.0, -1.0,  1.0],   # 2: Front Right
            [ 1.0, -1.0, -1.0],   # 3: Back Right
            [-1.0, -1.0, -1.0]    # 4: Back Left
        ]
        
        faces = [
            [0, 1, 2],  # Front face
            [0, 2, 3],  # Right face
            [0, 3, 4],  # Back face
            [0, 4, 1],  # Left face
            [1, 3, 2],  # Bottom triangle 1
            [1, 4, 3]   # Bottom triangle 2
        ]
        
        self.renderer.set_mesh(vertices, faces)

    def run(self):
        print("="*60)
        print("ModernGL + DearPyGui Integration")
        print("="*60)
        
        # Step 1: Initialize ModernGL FIRST (before DPG viewport)
        if not self.renderer.initialize_context():
            print("Failed to initialize renderer")
            return
        
        # Step 2: Create DearPyGui context
        dpg.create_context()
        
        # Step 3: Load mesh
        self.setup_mesh()

        # Step 4: Create texture for display
        # Initialize with gray to show something before first render
        initial_data = [0.15, 0.15, 0.15, 1.0] * (self.width * self.height)

        with dpg.texture_registry(show=False):
            dpg.add_dynamic_texture(
                width=self.width, 
                height=self.height, 
                default_value=initial_data, 
                tag=self.texture_tag
            )

        # Step 5: Create DPG viewport and UI
        dpg.create_viewport(
            title='ModernGL + DearPyGui', 
            width=800, 
            height=700
        )

        with dpg.window(
            label="3D Viewer", 
            width=650, 
            height=680, 
            pos=[10, 10],
            no_close=True
        ):
            dpg.add_text("ModernGL 3D Rendering")
            dpg.add_separator()
            
            with dpg.group(horizontal=True):
                dpg.add_text("Frame:")
                dpg.add_text("0", tag="frame_counter")
                dpg.add_text(" | Rotation:")
                dpg.add_text("0.00", tag="rotation_display")
            
            dpg.add_separator()
            dpg.add_image(self.texture_tag)

        # Step 6: Setup DearPyGui
        dpg.setup_dearpygui()
        dpg.show_viewport()

        print("Starting main loop...")
        print("="*60)

        # Main render loop
        try:
            while dpg.is_dearpygui_running():
                # Update rotation
                self.rotation += 0.02
                
                # CRITICAL: Render with ModernGL BEFORE DPG renders
                # This ensures contexts don't conflict
                pixel_data = self.renderer.render(
                    self.rotation, 
                    (0.3, 0.7, 1.0, 1.0)  # Blue color
                )
                
                # Convert bytes to float array for DPG
                float_data = np.frombuffer(pixel_data, dtype=np.float32)
                
                # Update DPG texture
                dpg.set_value(self.texture_tag, float_data)
                
                # Update UI every 60 frames
                self.frame_count += 1
                if self.frame_count % 60 == 0:
                    dpg.set_value("frame_counter", str(self.frame_count))
                    dpg.set_value("rotation_display", f"{self.rotation:.2f}")
                
                # Render DPG frame AFTER our ModernGL render
                dpg.render_dearpygui_frame()
                
        except KeyboardInterrupt:
            print("\nInterrupted by user")
        except Exception as e:
            print(f"\nException: {e}")
            import traceback
            traceback.print_exc()
        finally:
            # Cleanup
            print("\nCleaning up...")
            self.renderer.cleanup()
            dpg.destroy_context()
            print("✓ Application closed cleanly")


if __name__ == "__main__":
    app = App()
    app.run()