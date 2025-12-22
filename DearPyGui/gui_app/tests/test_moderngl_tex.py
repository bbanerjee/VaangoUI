"""
Test to verify DearPyGui texture format expectations.
This will create a simple gradient pattern WITHOUT ModernGL.
"""
import dearpygui.dearpygui as dpg
import numpy as np

print("="*60)
print("DearPyGui Texture Format Test")
print("="*60)

width, height = 600, 600
channels = 4  # RGBA

def update_gradient():
    """Restore gradient pattern."""
    dpg.set_value("gradient_texture", texture_data.flatten())
    print("Restored gradient")

dpg.create_context()

# Test 1: Create a gradient pattern
# Vectorized gradient creation with NumPy
print("\nTest 1: Creating gradient pattern...")
x = np.linspace(0, 1, width)
y = np.linspace(0, 1, height)
xv, yv = np.meshgrid(x, y)
    
texture_data = np.zeros((height, width, channels), dtype=np.float32)
texture_data[:, :, 0] = xv      # Red gradient on X
texture_data[:, :, 1] = yv      # Green gradient on Y
texture_data[:, :, 2] = 0.5     # Constant Blue
texture_data[:, :, 3] = 1.0     # Opaque Alpha

print(f"  Created {texture_data.size} floats ({texture_data.size//4} pixels)")
print(f"  Expected: {width * height * 4} floats")
print(f"  Data range: [{np.min(texture_data):.3f}, {np.max(texture_data):.3f}]")

with dpg.texture_registry(show=False):
    dpg.add_dynamic_texture(
        width=width,
        height=height,
        default_value=texture_data.flatten(),
        tag="gradient_texture"
    )

print("✓ Texture created")

dpg.create_viewport(title='Texture Format Test', width=700, height=700)

with dpg.window(label="Test", width=650, height=650, pos=[10, 10], no_close=True):
    dpg.add_text("Expected: Gradient from black (top-left) to yellow (bottom-right)")
    dpg.add_text("Red increases left→right, Green increases top→bottom")
    dpg.add_separator()
    dpg.add_image("gradient_texture")
    dpg.add_separator()
    
    with dpg.group(horizontal=True):
        dpg.add_button(label="Update to Red", callback=lambda: update_solid(1.0, 0.0, 0.0))
        dpg.add_button(label="Update to Green", callback=lambda: update_solid(0.0, 1.0, 0.0))
        dpg.add_button(label="Update to Blue", callback=lambda: update_solid(0.0, 0.0, 1.0))
        dpg.add_button(label="Restore Gradient", callback=update_gradient)

def update_solid(r, g, b):
    """Update texture to solid color."""
    solid_data = np.zeros((height, width, channels), dtype=np.float32)
    solid_data[:, :, 0] = r
    solid_data[:, :, 1] = g
    solid_data[:, :, 2] = b
    solid_data[:, :, 3] = 1.0
    dpg.set_value("gradient_texture", solid_data.flatten())
    print(f"Updated to solid color: ({r}, {g}, {b})")


dpg.setup_dearpygui()
dpg.show_viewport()

print("\n" + "="*60)
print("INSTRUCTIONS:")
print("="*60)
print("1. You should see a gradient pattern")
print("2. Try clicking the color buttons")
print("3. If buttons work, texture format is correct")
print("4. If you see nothing/black, there's a DPG texture issue")
print("="*60)

dpg.start_dearpygui()
dpg.destroy_context()

print("\n✓ Test complete")