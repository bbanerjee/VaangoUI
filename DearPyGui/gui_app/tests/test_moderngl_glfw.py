"""
ModernGL + DearPyGui using GLFW for context creation.
This is the most compatible approach that works on virtually all systems.

Install: pip install glfw
"""
import dearpygui.dearpygui as dpg
import moderngl
import glfw
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
        
        self.glfw_window = None
        self.context_initialized = False

    def initialize_context(self):
        """Creates ModernGL context using GLFW (most compatible method)."""
        if self.context_initialized:
            return True

        try:
            print("Initializing GLFW + ModernGL context...")
            
            # Initialize GLFW
            if not glfw.init():
                print("✗ GLFW initialization failed")
                return False
            
            # Configure GLFW for offscreen rendering
            glfw.window_hint(glfw.VISIBLE, glfw.FALSE)  # Hidden window
            glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 3)
            glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 3)
            glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)
            glfw.window_hint(glfw.OPENGL_FORWARD_COMPAT, glfw.TRUE)
            
            # Create hidden GLFW window for OpenGL context
            self.glfw_window = glfw.create_window(
                640, 480, 
                "Hidden ModernGL Context", 
                None, None
            )
            
            if not self.glfw_window:
                print("✗ GLFW window creation failed")
                glfw.terminate()
                return False
            
            # Make the context current
            glfw.make_context_current(self.glfw_window)
            
            # Create ModernGL context from current OpenGL context
            self.ctx = moderngl.create_context()
            
            print(f"✓ Context: {self.ctx.info.get('GL_RENDERER', 'Unknown')}")
            
            # Configure rendering
            self.ctx.enable(moderngl.DEPTH_TEST)
            
            # Create offscreen framebuffer
            self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
            self.fbo_depth = self.ctx.depth_texture((self.width, self.height))
            self.fbo = self.ctx.framebuffer(
                color_attachments=[self.fbo_texture],
                depth_attachment=self.fbo_depth
            )
            
            # Compile shaders
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
            
            print("✓ ModernGL + GLFW initialized successfully")
            self.context_initialized = True
            return True
            
        except Exception as e:
            print(f"✗ Context initialization failed: {e}")
            import traceback
            traceback.print_exc()
            return False

    def set_mesh(self, vertices, faces):
        """Upload mesh to GPU."""
        if not self.context_initialized:
            return

        try:
            # Make context current
            glfw.make_context_current(self.glfw_window)
            
            # Release old resources
            if self.vao:
                self.vao.release()
            if self.vbo:
                self.vbo.release()
            if self.ibo:
                self.ibo.release()

            # Convert data
            verts_flat = np.array(vertices, dtype=np.float32).flatten()
            indices_flat = np.array(faces, dtype=np.int32).flatten()
            
            # Validate
            if indices_flat.max() >= len(vertices):
                print("ERROR: Invalid indices")
                return
            
            self.num_indices = len(indices_flat)
            
            # Create buffers
            self.vbo = self.ctx.buffer(verts_flat.tobytes())
            self.ibo = self.ctx.buffer(indices_flat.tobytes())
            
            # Create VAO
            self.vao = self.ctx.vertex_array(
                self.prog,
                [(self.vbo, '3f', 'in_vert')],
                self.ibo
            )
            
            print(f"✓ Mesh loaded: {len(vertices)} verts, {self.num_indices//3} tris")
            
        except Exception as e:
            print(f"✗ Mesh loading failed: {e}")
            self.num_indices = 0

    def render(self, rotation_angle, color):
        """Render scene to texture."""
        if not self.context_initialized or not self.vao or self.num_indices == 0:
            print("Render skipped: not ready")
            return bytes(self.width * self.height * 16)

        try:
            # Make context current
            glfw.make_context_current(self.glfw_window)
            
            # Use our framebuffer
            self.fbo.use()
            
            # Clear with a visible color to test if rendering is working
            self.ctx.clear(0.2, 0.2, 0.3, 1.0)  # Dark blue-gray
            
            # Calculate matrices
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
            
            # Set uniforms
            self.prog['mvp'].write(mvp.tobytes())
            self.prog['color'].value = tuple(color)
            
            # DEBUG: Print first frame info
            if not hasattr(self, '_first_render_done'):
                print(f"First render:")
                print(f"  VAO vertices: {self.vao.vertices}")
                print(f"  Num indices: {self.num_indices}")
                print(f"  Color: {color}")
                print(f"  Rotation: {rotation_angle}")
                self._first_render_done = True
            
            # Render
            self.vao.render(moderngl.TRIANGLES)
            
            # Read pixels
            pixel_data = self.fbo.read(components=4, dtype='f4')
            
            # DEBUG: Check if we got valid data (first frame only)
            if not hasattr(self, '_first_data_checked'):
                data_array = np.frombuffer(pixel_data, dtype=np.float32)
                print(f"\nPixel data stats:")
                print(f"  Size: {len(data_array)} floats ({len(pixel_data)} bytes)")
                print(f"  Expected: {self.width * self.height * 4} floats")
                print(f"  Min: {data_array.min():.4f}")
                print(f"  Max: {data_array.max():.4f}")
                print(f"  Mean: {data_array.mean():.4f}")
                
                # Check background color (should be 0.2, 0.2, 0.3, 1.0)
                bg_r = data_array[0::4]
                bg_g = data_array[1::4]
                bg_b = data_array[2::4]
                bg_a = data_array[3::4]
                print(f"  Background R avg: {bg_r.mean():.3f} (expected ~0.2)")
                print(f"  Background G avg: {bg_g.mean():.3f} (expected ~0.2)")
                print(f"  Background B avg: {bg_b.mean():.3f} (expected ~0.3)")
                print(f"  Background A avg: {bg_a.mean():.3f} (expected ~1.0)")
                
                # Check if any pixels are bright (from the pyramid)
                bright_pixels = np.sum((bg_r > 0.4) | (bg_g > 0.4) | (bg_b > 0.4))
                print(f"  Bright pixels (pyramid): {bright_pixels} / {len(bg_r)}")
                
                if bright_pixels == 0:
                    print("\n  ⚠️  WARNING: No bright pixels found!")
                    print("  The pyramid may not be rendering or is out of view")
                
                self._first_data_checked = True
            
            return pixel_data
            
        except Exception as e:
            print(f"✗ Render error: {e}")
            import traceback
            traceback.print_exc()
            return bytes(self.width * self.height * 16)

    def cleanup(self):
        """Release all resources."""
        try:
            if self.glfw_window:
                glfw.make_context_current(self.glfw_window)
            
            if self.vao: self.vao.release()
            if self.vbo: self.vbo.release()
            if self.ibo: self.ibo.release()
            if self.fbo: self.fbo.release()
            if self.fbo_texture: self.fbo_texture.release()
            if self.fbo_depth: self.fbo_depth.release()
            if self.ctx: self.ctx.release()
            
            if self.glfw_window:
                glfw.destroy_window(self.glfw_window)
            
            glfw.terminate()
            print("✓ Resources cleaned up")
        except:
            pass


class App:
    def __init__(self):
        self.width = 600
        self.height = 600
        self.renderer = MGLRenderer(self.width, self.height)
        self.rotation = 0.0
        self.texture_tag = "mgl_texture"
        self.frame_count = 0

    def setup_mesh(self):
        """Create pyramid mesh."""
        vertices = [
            [ 0.0,  1.0,  0.0],
            [-1.0, -1.0,  1.0],
            [ 1.0, -1.0,  1.0],
            [ 1.0, -1.0, -1.0],
            [-1.0, -1.0, -1.0]
        ]
        
        faces = [
            [0, 1, 2],
            [0, 2, 3],
            [0, 3, 4],
            [0, 4, 1],
            [1, 3, 2],
            [1, 4, 3]
        ]
        
        self.renderer.set_mesh(vertices, faces)

    def run(self):
        print("="*60)
        print("ModernGL + DearPyGui (GLFW Context)")
        print("="*60)
        
        # Initialize renderer (creates GLFW window + ModernGL context)
        if not self.renderer.initialize_context():
            print("Failed to initialize renderer")
            return
        
        # Create DPG context
        dpg.create_context()
        
        # Load mesh
        self.setup_mesh()

        # Create texture
        initial_data = [0.15, 0.15, 0.15, 1.0] * (self.width * self.height)
        
        print(f"\nCreating DPG texture:")
        print(f"  Size: {self.width}x{self.height}")
        print(f"  Initial data length: {len(initial_data)}")
        print(f"  Expected: {self.width * self.height * 4}")

        with dpg.texture_registry(show=False):
            dpg.add_dynamic_texture(
                width=self.width, 
                height=self.height, 
                default_value=initial_data, 
                tag=self.texture_tag
            )
        
        print(f"✓ Texture created with tag: {self.texture_tag}")

        # Create viewport
        dpg.create_viewport(title='ModernGL + DearPyGui (GLFW)', width=800, height=700)

        with dpg.window(label="3D Viewer", width=650, height=680, pos=[10, 10], no_close=True):
            dpg.add_text("ModernGL 3D Rendering (GLFW Context)")
            dpg.add_text("If you see only black, check console for debug info", color=(255, 255, 0))
            dpg.add_separator()
            
            with dpg.group(horizontal=True):
                dpg.add_text("Frame:")
                dpg.add_text("0", tag="frame_counter")
                dpg.add_text(" | Rotation:")
                dpg.add_text("0.00", tag="rotation_text")
            
            with dpg.group(horizontal=True):
                dpg.add_text("Data check:")
                dpg.add_text("Waiting...", tag="data_status", color=(255, 200, 0))
            
            dpg.add_separator()
            dpg.add_image(self.texture_tag)
            dpg.add_separator()
            dpg.add_text("Background should be dark blue-gray, pyramid should be bright blue")

        dpg.setup_dearpygui()
        dpg.show_viewport()

        print("Starting main loop...")
        print("="*60)

        try:
            while dpg.is_dearpygui_running():
                self.rotation += 0.02
                
                # Render with ModernGL
                pixel_data = self.renderer.render(
                    self.rotation, 
                    (0.3, 0.7, 1.0, 1.0)
                )
                
                # Convert to float array
                float_data = np.frombuffer(pixel_data, dtype=np.float32)
                
                # CRITICAL FIX: Flip vertically - OpenGL has origin at bottom-left,
                # DearPyGui expects origin at top-left
                float_data = float_data.reshape((self.height, self.width, 4))
                float_data = np.flipud(float_data)  # Flip upside down
                float_data = float_data.flatten()
                
                # DEBUG: Check data on first few frames
                if self.frame_count < 3:
                    print(f"\nFrame {self.frame_count}:")
                    print(f"  Pixel data length: {len(float_data)}")
                    print(f"  Expected length: {self.width * self.height * 4}")
                    print(f"  Data range: [{float_data.min():.3f}, {float_data.max():.3f}]")
                    print(f"  First 16 values: {float_data[:16]}")
                
                # Update texture
                dpg.set_value(self.texture_tag, float_data)
                
                # Update UI
                self.frame_count += 1
                if self.frame_count % 60 == 0:
                    dpg.set_value("frame_counter", str(self.frame_count))
                    dpg.set_value("rotation_text", f"{self.rotation:.2f}")
                
                # Update data status
                if self.frame_count == 10:
                    if float_data.max() > 0.5:
                        dpg.set_value("data_status", "Rendering OK")
                        dpg.configure_item("data_status", color=(0, 255, 0))
                    else:
                        dpg.set_value("data_status", "Only background visible - check geometry/matrices")
                        dpg.configure_item("data_status", color=(255, 0, 0))
                
                # Render DPG
                dpg.render_dearpygui_frame()
                
        except KeyboardInterrupt:
            print("\nInterrupted")
        except Exception as e:
            print(f"\nException: {e}")
            import traceback
            traceback.print_exc()
        finally:
            print("\nCleaning up...")
            self.renderer.cleanup()
            dpg.destroy_context()
            print("✓ Done")


if __name__ == "__main__":
    app = App()
    app.run()