"""
Minimal test to isolate the ModernGL segfault issue.
Run this FIRST before the full application.
"""
import moderngl
import numpy as np
import sys

print("="*60)
print("MODERNGL MINIMAL SEGFAULT TEST")
print("="*60)

# Test 1: Can we create a context?
print("\nTest 1: Creating standalone context...")
try:
    ctx = moderngl.create_context(standalone=True, require=330)
    print(f"✓ SUCCESS")
    print(f"  Vendor: {ctx.info.get('GL_VENDOR')}")
    print(f"  Renderer: {ctx.info.get('GL_RENDERER')}")
    print(f"  Version: {ctx.info.get('GL_VERSION')}")
except Exception as e:
    print(f"✗ FAILED: {e}")
    print("\n!!! Standalone context creation failed !!!")
    print("Your system may not support standalone OpenGL contexts.")
    print("Solutions:")
    print("  1. Update GPU drivers")
    print("  2. Use a window-based context (with glfw)")
    print("  3. Run on a system with proper OpenGL support")
    sys.exit(1)

# Test 2: Can we create a simple shader program?
print("\nTest 2: Compiling shader program...")
try:
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
    print(f"✓ SUCCESS")
    print(f"  Attributes: {list(prog._members.keys())}")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

# Test 3: Create a simple triangle
print("\nTest 3: Creating simple triangle mesh...")
vertices = np.array([
    [0.0, 0.5, 0.0],
    [-0.5, -0.5, 0.0],
    [0.5, -0.5, 0.0]
], dtype=np.float32)

indices = np.array([0, 1, 2], dtype=np.int32)

print(f"  Vertices: {vertices.shape}")
print(f"  Indices: {indices.shape}")
print(f"  Max index: {indices.max()}, Num vertices: {len(vertices)}")

# Test 4: Create buffers
print("\nTest 4: Creating GPU buffers...")
try:
    vbo = ctx.buffer(vertices.tobytes())
    ibo = ctx.buffer(indices.tobytes())
    print(f"✓ SUCCESS")
    print(f"  VBO size: {vbo.size} bytes")
    print(f"  IBO size: {ibo.size} bytes")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

# Test 5: Create VAO
print("\nTest 5: Creating VAO...")
try:
    vao_content = [(vbo, '3f', 'in_vert')]
    vao = ctx.vertex_array(prog, vao_content, ibo)
    print(f"✓ SUCCESS")
    print(f"  VAO vertices: {vao.vertices}")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

# Test 6: Create framebuffer
print("\nTest 6: Creating framebuffer...")
try:
    fbo_texture = ctx.texture((512, 512), 4, dtype='f4')
    fbo_depth = ctx.depth_texture((512, 512))
    fbo = ctx.framebuffer(fbo_texture, fbo_depth)
    print(f"✓ SUCCESS")
    print(f"  Texture size: {fbo_texture.size}")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

# Test 7: Set uniforms
print("\nTest 7: Setting shader uniforms...")
try:
    # Simple orthographic "MVP" matrix
    mvp = np.eye(4, dtype=np.float32)
    prog['mvp'].write(mvp.tobytes())
    prog['color'].value = (1.0, 0.0, 0.0, 1.0)
    print(f"✓ SUCCESS")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

# Test 8: Enable depth test
print("\nTest 8: Configuring render state...")
try:
    ctx.enable(moderngl.DEPTH_TEST)
    fbo.use()
    ctx.clear(0.0, 0.0, 0.0, 1.0)
    print(f"✓ SUCCESS")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

# Test 9: THE CRITICAL TEST - Render the triangle
print("\nTest 9: RENDERING (this is where the segfault likely occurs)...")
print("If you see a segfault after this line, the issue is in vao.render()...")
try:
    vao.render(moderngl.TRIANGLES)
    print(f"✓ SUCCESS - Rendering works!")
except Exception as e:
    print(f"✗ FAILED with exception: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Test 10: Read back the framebuffer
print("\nTest 10: Reading framebuffer...")
try:
    data = fbo.read(components=4, dtype='f4')
    print(f"✓ SUCCESS")
    print(f"  Read {len(data)} bytes")
except Exception as e:
    print(f"✗ FAILED: {e}")
    sys.exit(1)

print("\n" + "="*60)
print("ALL TESTS PASSED!")
print("="*60)
print("\nModernGL is working correctly on your system.")
print("The issue must be in the integration with DearPyGui.")
print("\nPossible causes:")
print("  1. DearPyGui interfering with OpenGL context")
print("  2. Threading issues")
print("  3. Context switching between DPG and ModernGL")
print("\nRecommendation:")
print("  Consider rendering to a texture in a separate thread")
print("  or using a shared context approach.")