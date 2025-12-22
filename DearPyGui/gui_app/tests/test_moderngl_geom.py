"""
Test the pyramid geometry specifically to ensure it's valid.
"""
import numpy as np

print("="*60)
print("PYRAMID GEOMETRY VALIDATION")
print("="*60)

# Define the pyramid exactly as in your code
vertices = [
    [ 0.0,  1.0,  0.0],  # 0: Top
    [-1.0, -1.0,  1.0],  # 1: Front Left
    [ 1.0, -1.0,  1.0],  # 2: Front Right
    [ 1.0, -1.0, -1.0],  # 3: Back Right
    [-1.0, -1.0, -1.0]   # 4: Back Left
]

faces = [
    [0, 1, 2],  # Front
    [0, 2, 3],  # Right
    [0, 3, 4],  # Back
    [0, 4, 1],  # Left
    [1, 3, 2],  # Bottom triangle 1
    [1, 4, 3]   # Bottom triangle 2
]

print("\n1. VERTEX DATA")
print("-" * 40)
verts_array = np.array(vertices, dtype=np.float32)
print(f"Shape: {verts_array.shape}")
print(f"Dtype: {verts_array.dtype}")
print(f"Vertices:")
for i, v in enumerate(vertices):
    print(f"  {i}: [{v[0]:6.2f}, {v[1]:6.2f}, {v[2]:6.2f}]")

print("\n2. FACE DATA")
print("-" * 40)
faces_array = np.array(faces, dtype=np.int32)
print(f"Shape: {faces_array.shape}")
print(f"Dtype: {faces_array.dtype}")
print(f"Faces (triangles):")
for i, f in enumerate(faces):
    v0, v1, v2 = vertices[f[0]], vertices[f[1]], vertices[f[2]]
    print(f"  {i}: {f} -> vertices at:")
    print(f"     [{v0[0]:6.2f}, {v0[1]:6.2f}, {v0[2]:6.2f}]")
    print(f"     [{v1[0]:6.2f}, {v1[1]:6.2f}, {v1[2]:6.2f}]")
    print(f"     [{v2[0]:6.2f}, {v2[1]:6.2f}, {v2[2]:6.2f}]")

print("\n3. INDEX VALIDATION")
print("-" * 40)
indices_flat = faces_array.flatten()
print(f"Flattened indices: {indices_flat}")
print(f"Total indices: {len(indices_flat)}")
print(f"Min index: {indices_flat.min()}")
print(f"Max index: {indices_flat.max()}")
print(f"Num vertices: {len(vertices)}")
print(f"Valid index range: [0, {len(vertices)-1}]")

# Check for index errors
if indices_flat.min() < 0:
    print("\n⚠️  ERROR: Negative index found!")
elif indices_flat.max() >= len(vertices):
    print(f"\n⚠️  ERROR: Index {indices_flat.max()} >= vertex count {len(vertices)}")
    print("This WILL cause a segmentation fault!")
else:
    print("\n✓ All indices are valid")

print("\n4. BUFFER SIZES")
print("-" * 40)
verts_flat = verts_array.flatten()
print(f"Vertex buffer:")
print(f"  Elements: {len(verts_flat)} floats")
print(f"  Bytes: {verts_flat.nbytes}")
print(f"  Data: {verts_flat[:12]}...")

print(f"\nIndex buffer:")
print(f"  Elements: {len(indices_flat)} ints")
print(f"  Bytes: {indices_flat.nbytes}")
print(f"  Data: {indices_flat}")

print("\n5. WINDING ORDER CHECK")
print("-" * 40)
# Check if triangles are counter-clockwise (OpenGL default)
for i, f in enumerate(faces):
    v0 = np.array(vertices[f[0]])
    v1 = np.array(vertices[f[1]])
    v2 = np.array(vertices[f[2]])
    
    # Calculate normal using cross product
    edge1 = v1 - v0
    edge2 = v2 - v0
    normal = np.cross(edge1, edge2)
    
    # Calculate centroid
    centroid = (v0 + v1 + v2) / 3.0
    
    print(f"Triangle {i}: indices {f}")
    print(f"  Normal: [{normal[0]:6.2f}, {normal[1]:6.2f}, {normal[2]:6.2f}]")
    print(f"  Centroid: [{centroid[0]:6.2f}, {centroid[1]:6.2f}, {centroid[2]:6.2f}]")
    
    # For outward-facing normals, normal should point away from origin
    # (This is a simplification - works for convex shapes centered at origin)
    dot = np.dot(normal, centroid)
    if dot > 0:
        print(f"  ✓ Likely outward-facing")
    else:
        print(f"  ⚠️  Likely inward-facing (may appear wrong with backface culling)")

print("\n6. MODERNGL RENDERING TEST")
print("-" * 40)
print("Now testing if ModernGL can render this geometry...")

try:
    import moderngl
    
    # Create context
    ctx = moderngl.create_context(standalone=True, require=330)
    print("✓ Context created")
    
    # Create shader
    prog = ctx.program(
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
    print("✓ Shader compiled")
    
    # Create buffers
    vbo = ctx.buffer(verts_flat.tobytes())
    ibo = ctx.buffer(indices_flat.tobytes())
    print(f"✓ Buffers created (VBO: {vbo.size}B, IBO: {ibo.size}B)")
    
    # Create VAO
    vao = ctx.vertex_array(prog, [(vbo, '3f', 'in_vert')], ibo)
    print(f"✓ VAO created")
    
    # Create framebuffer
    fbo_texture = ctx.texture((512, 512), 4, dtype='f4')
    fbo_depth = ctx.depth_texture((512, 512))
    fbo = ctx.framebuffer(fbo_texture, fbo_depth)
    print("✓ Framebuffer created")
    
    # Setup rendering
    ctx.enable(moderngl.DEPTH_TEST)
    fbo.use()
    ctx.clear(0.1, 0.1, 0.1, 1.0)
    
    # Set uniforms
    mvp = np.eye(4, dtype=np.float32)
    prog['mvp'].write(mvp.tobytes())
    prog['color'].value = (1.0, 0.0, 0.0, 1.0)
    print("✓ Uniforms set")
    
    # THE CRITICAL TEST
    print("\n>>> ATTEMPTING TO RENDER <<<")
    print("If segfault occurs, it will happen on the next line...")
    
    vao.render(moderngl.TRIANGLES)
    
    print("✓✓✓ RENDER SUCCESSFUL! ✓✓✓")
    print("\nThe geometry is valid and can be rendered by ModernGL.")
    print("The segfault must be caused by interaction with DearPyGui.")
    
    # Read back to verify
    data = fbo.read(components=4, dtype='f4')
    print(f"✓ Framebuffer read successful ({len(data)} bytes)")
    
    # Clean up
    vao.release()
    vbo.release()
    ibo.release()
    fbo.release()
    fbo_texture.release()
    fbo_depth.release()
    ctx.release()
    
    print("\n" + "="*60)
    print("GEOMETRY IS VALID!")
    print("="*60)
    
except ImportError:
    print("\n⚠️  ModernGL not available, skipping render test")
    print("Install with: pip install moderngl")
    
except Exception as e:
    print(f"\n✗✗✗ RENDER FAILED ✗✗✗")
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
    print("\nIf this test fails, the issue is with ModernGL itself,")
    print("not the integration with DearPyGui.")