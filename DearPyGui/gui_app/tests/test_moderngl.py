import dearpygui.dearpygui as dpg
import moderngl
import numpy as np
import struct

# --- 1. Matrix Helper Functions (Using NumPy) ---
# We use these to create the MVP (Model-View-Projection) matrix for the shader.
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

# --- 2. The ModernGL Renderer Class ---
class MGLRenderer:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        
        # Initialize resources to None for safe cleanup
        self.vbo = None
        self.ibo = None
        self.vao = None

        # Create a standalone context (headless)
        self.ctx = None
        #self.ctx = moderngl.create_context(standalone=True)
        #self.ctx.enable(moderngl.DEPTH_TEST)

        self.num_indices = 0

    def initialize_context(self):
        """Creates the ModernGL context and dependent resources."""
        if self.ctx is not None:
            # Context already initialized
            return

        print("Initializing ModernGL Context...")
        # CRITICAL: Create the standalone context here.
        self.ctx = moderngl.create_context(standalone=True)
        self.ctx.enable(moderngl.DEPTH_TEST)
        self.ctx.error

        # Create Framebuffer resources (These depend on the context)
        self.fbo_texture = self.ctx.texture((self.width, self.height), 4, dtype='f4')
        self.fbo_depth = self.ctx.depth_texture((self.width, self.height))
        self.fbo = self.ctx.framebuffer(self.fbo_texture, self.fbo_depth)

        # Compile Shaders
        self.prog = self.ctx.program(
            vertex_shader='''
                #version 330
                in vec3 in_vert;
                uniform mat4 mvp;
                void main() {
                    gl_Position = mvp * vec4(in_vert, 1.0);
                }
            ''',
            fragment_shader='''
                #version 330
                uniform vec4 color;
                out vec4 f_color;
                void main() {
                    f_color = color;
                }
            '''
        )
        

    def set_mesh(self, vertices, faces):
        """Uploads mesh data to the GPU."""

        # --- 1. Cleanup Old Resources ---
        if self.vao:
            self.vao.release()
        if self.vbo:
            self.vbo.release()
        if self.ibo:
            self.ibo.release()

        # Ensure data is flat float32 arrays
        verts_flat = np.array(vertices, dtype=np.float32).flatten()
        # ModernGL expects an index buffer for faces (flattened ints)
        indices_flat = np.array(faces, dtype=np.int32).flatten()
        
        if verts_flat.size == 0 or indices_flat.size == 0:
            print("Warning: Mesh data is empty, skipping buffer creation.")
            self.num_indices = 0
            return

        self.num_indices = len(indices_flat)

        # Create Buffer Objects
        self.vbo = self.ctx.buffer(verts_flat.tobytes())
        self.ibo = self.ctx.buffer(indices_flat.tobytes())

        # Define Layout: "3f" means 3 floats (x,y,z) per vertex
        vao_content = [(self.vbo, '3f', 'in_vert')]

        # Check for index buffer overrun *before* creating the VAO
        max_index = indices_flat.max() if indices_flat.size > 0 else -1
        num_vertices = len(vertices)
        if max_index >= num_vertices:
            print(f"Error: Max index ({max_index}) exceeds vertex count ({num_vertices}). THIS CAUSES SEG FAULTS.")
            # Do not create VAO or program will crash upon rendering
            self.num_indices = 0
            # Clean up the invalid buffers
            self.vbo.release()
            self.ibo.release()
            self.vbo = self.ibo = None
            return

        self.vao = self.ctx.vertex_array(self.prog, vao_content, self.ibo)

    def render(self, rotation_angle, color):
        """Renders the scene and returns raw pixel data."""
        self.fbo.use()
        self.ctx.clear(0.1, 0.1, 0.1, 1.0) # Dark gray background

        if self.vao and self.num_indices > 0:
            print("render: calculating matrices and rendering mesh")
            # Calculate Matrices
            proj = perspective_matrix(np.radians(45.0), self.width/self.height, 0.1, 100.0)
            view = look_at_matrix(np.array([0.0, 2.0, 4.0]), np.array([0.0, 0.0, 0.0]), np.array([0.0, 1.0, 0.0]))
            model = rotate_y_matrix(rotation_angle)
            
            mvp = proj @ view @ model
            
            # Update Uniforms
            self.prog['mvp'].write(mvp.tobytes())
            self.prog['color'].value = color

            print(f"VBO size: {self.vbo.size}")
            print(f"IBO size: {self.ibo.size}")
            print(f"Expected IBO size: {self.num_indices * 4}")  # 4 bytes per int32

            # Draw
            print("render: rendering VAO")
            self.vao.render(moderngl.TRIANGLES)


        # Read pixels from the Framebuffer
        # We read as 32-bit floats for DPG (RGBA)
        print("render: reading pixels from FBO")
        return self.fbo.read(components=4, dtype='f4')

    def __del__(self):
        """Explicitly release all resources when the object is destroyed."""
        if self.vao: self.vao.release()
        if self.vbo: self.vbo.release()
        if self.ibo: self.ibo.release()
        if self.fbo: self.fbo.release()
        if self.fbo_texture: self.fbo_texture.release()
        if self.fbo_depth: self.fbo_depth.release()
        # We don't release the context itself, as it manages its own lifecycle
        # or the lifecycle of the window if a context was passed in.
        print("MGLRenderer resources released.")

# --- 3. Dear PyGui Application ---
class App:
    def __init__(self):
        self.width = 600
        self.height = 600
        self.renderer = MGLRenderer(self.width, self.height)
        self.rotation = 0.0
        self.texture_tag = "mgl_texture"

    def setup_mesh(self):
        # Create a simple pyramid for demonstration
        # Vertices (x, y, z)
        verts = [
            [ 0.0,  1.0,  0.0], # Top
            [-1.0, -1.0,  1.0], # Front Left
            [ 1.0, -1.0,  1.0], # Front Right
            [ 1.0, -1.0, -1.0], # Back Right
            [-1.0, -1.0, -1.0]  # Back Left
        ]
        # Indices (Triangles)
        faces = [
            [0, 1, 2],  # Front
            [0, 2, 3],  # Right
            [0, 3, 4],  # Back
            [0, 4, 1],  # Left
            [1, 2, 3], [1, 4, 3] # Bottom (Quad split into 2 tris)
        ]
        self.renderer.set_mesh(verts, faces)

    def run(self):
        dpg.create_context()

        # 2. Initialize ModernGL context and GPU resources (Delayed Step!)
        #    This is run AFTER DPG has prepared its internal context.
        self.renderer.initialize_context()

        self.setup_mesh()

        # Initialize the texture with blank data
        # DPG expects a flat list of floats (0.0 - 1.0)
        # Size = width * height * 4 (RGBA)
        initial_data = [0.0] * (self.width * self.height * 4)

        print("Creating texture registry")
        with dpg.texture_registry(show=False):
            # Dynamic texture allows frequent updates
            print("Adding dynamic texture")
            dpg.add_dynamic_texture(width=self.width, height=self.height, default_value=initial_data, tag=self.texture_tag)

        print("Creating viewport")
        dpg.create_viewport(title='ModernGL + Dear PyGui', width=800, height=700)

        print("Creating GPU Viewport window")
        with dpg.window(label="GPU Viewport", width=800, height=700):
            dpg.add_text("Rendering 3D Mesh via ModernGL FBO")
            # Display the texture
            print("Adding image to display texture")
            dpg.add_image(self.texture_tag)

        dpg.setup_dearpygui()
        dpg.show_viewport()

        while dpg.is_dearpygui_running():
            # 1. Update Rotation
            self.rotation += 0.02

            # 2. Render with ModernGL (returns bytes)
            print("Rendering frame with ModernGL")
            raw_bytes = self.renderer.render(self.rotation, (0.2, 0.6, 1.0, 1.0))
            
            # 3. Convert raw bytes to float array for DPG
            # 'f4' in ModernGL read means we get 4 bytes per float.
            # We use numpy to view this memory as float32.
            print("Converting raw bytes to float array")
            data = np.frombuffer(raw_bytes, dtype=np.float32)
            
            # 4. Update the DPG texture
            dpg.set_value(self.texture_tag, data)

            print("Rendering Dear PyGui frame")
            dpg.render_dearpygui_frame()

        dpg.destroy_context()

if __name__ == "__main__":
    app = App()
    app.run()