"""
Fixed Dynamic Texture Update for Dear PyGui.
Uses NumPy for high-performance texture manipulation and correct color mapping.
"""
import dearpygui.dearpygui as dpg
import numpy as np
import time

# Configuration
WIDTH, HEIGHT = 600, 600
CHANNELS = 4  # RGBA

dpg.create_context()

def get_empty_texture_data():
    # Pre-allocate a float32 array for performance
    # Initial color: Gray (0.5, 0.5, 0.5, 1.0)
    data = np.full((HEIGHT, WIDTH, CHANNELS), 0.5, dtype=np.float32)
    data[:, :, 3] = 1.0  # Set alpha to 1.0
    return data.flatten()

# 1. Texture Registration
with dpg.texture_registry(show=False):
    dpg.add_dynamic_texture(
        width=WIDTH,
        height=HEIGHT,
        default_value=get_empty_texture_data(),
        tag="dynamic_tex"
    )

# 2. Optimized Callback Functions
def set_red():
    data = np.zeros((HEIGHT, WIDTH, CHANNELS), dtype=np.float32)
    data[:] = [1.0, 0.0, 0.0, 1.0]
    dpg.set_value("dynamic_tex", data.flatten())
    print("Set to RED")

def set_green():
    data = np.zeros((HEIGHT, WIDTH, CHANNELS), dtype=np.float32)
    data[:] = [0.0, 1.0, 0.0, 1.0]
    dpg.set_value("dynamic_tex", data.flatten())
    print("Set to GREEN")

def set_blue():
    data = np.zeros((HEIGHT, WIDTH, CHANNELS), dtype=np.float32)
    data[:] = [0.0, 0.0, 1.0, 1.0]
    dpg.set_value("dynamic_tex", data.flatten())
    print("Set to BLUE")

def set_gradient():
    # Vectorized gradient creation with NumPy
    x = np.linspace(0, 1, WIDTH)
    y = np.linspace(0, 1, HEIGHT)
    xv, yv = np.meshgrid(x, y)
    
    data = np.zeros((HEIGHT, WIDTH, CHANNELS), dtype=np.float32)
    data[:, :, 0] = xv      # Red gradient on X
    data[:, :, 1] = yv      # Green gradient on Y
    data[:, :, 2] = 0.5     # Constant Blue
    data[:, :, 3] = 1.0     # Opaque Alpha
    
    dpg.set_value("dynamic_tex", data.flatten())
    print("Set to GRADIENT")

# 3. Animation Logic
frame_count = 0
is_animating = True

def toggle_animation():
    global is_animating
    is_animating = not is_animating

def update_animated_pattern(frame):
    """
    Highly optimized animated pattern using NumPy broadcasting.
    This replaces the nested for-loops which were causing the lag.
    """
    # Create coordinate grids
    x = np.arange(WIDTH)
    y = np.arange(HEIGHT)
    
    # Calculate R and G values based on coordinates and frame shift
    # Using modulo 255 / 255.0 to simulate your original logic
    r_vals = ((x + frame) % 255) / 255.0
    g_vals = ((y + frame) % 255) / 255.0
    
    # Create the 3D array
    data = np.empty((HEIGHT, WIDTH, CHANNELS), dtype=np.float32)
    data[:, :, 0] = r_vals[None, :] # Broadcast X across rows
    data[:, :, 1] = g_vals[:, None] # Broadcast Y across columns
    data[:, :, 2] = 0.5
    data[:, :, 3] = 1.0
    
    dpg.set_value("dynamic_tex", data.flatten())

# UI Layout
with dpg.window(label="Texture Debugger", width=650, height=750, pos=[10, 10], no_close=True):
    dpg.add_text("Manual Controls:")
    with dpg.group(horizontal=True):
        dpg.add_button(label="Red", callback=set_red, width=80)
        dpg.add_button(label="Green", callback=set_green, width=80)
        dpg.add_button(label="Blue", callback=set_blue, width=80)
        dpg.add_button(label="Gradient", callback=set_gradient, width=80)
    
    dpg.add_spacer(height=10)
    dpg.add_checkbox(label="Enable Animation", default_value=True, callback=lambda s, a: toggle_animation())
    dpg.add_separator()
    
    # Display the texture
    dpg.add_image("dynamic_tex")
    
    dpg.add_separator()
    dpg.add_text("Status: Running", tag="status_text")
    dpg.add_text("Frame: 0", tag="frame_display")

dpg.create_viewport(title='Dynamic Texture Debugger', width=700, height=800)
dpg.setup_dearpygui()
dpg.show_viewport()

# Main Loop
while dpg.is_dearpygui_running():
    if is_animating:
        update_animated_pattern(frame_count)
        frame_count += 1
        
        if frame_count % 30 == 0:
            dpg.set_value("frame_display", f"Frame: {frame_count}")
    
    dpg.render_dearpygui_frame()

dpg.destroy_context()