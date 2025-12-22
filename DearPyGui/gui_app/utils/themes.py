from dearpygui import dearpygui as dpg
import platform

def load_vscode_font():
    with dpg.font_registry():
        system = platform.system()
        
        if system == "Windows":
            font_path = "C:/Windows/Fonts/consola.ttf"
        elif system == "Darwin":  # macOS
            font_path = "/System/Library/Fonts/Menlo.ttc"
        else:  # Linux
            font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
        
        try:
            default_font = dpg.add_font(font_path, 15)
            dpg.bind_font(default_font)
            print(f"Loaded font: {font_path}")
        except Exception as e:
            print(f"Could not load font {font_path}: {e}")
            print("Using default DearPyGui font")


def create_dark_theme():
    with dpg.theme() as theme:
        with dpg.theme_component(dpg.mvAll):
            # Background colors
            dpg.add_theme_color(dpg.mvThemeCol_WindowBg, (20, 20, 30, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ChildBg, (25, 25, 35, 255))
            dpg.add_theme_color(dpg.mvThemeCol_FrameBg, (35, 35, 45, 255))
            
            # Text
            dpg.add_theme_color(dpg.mvThemeCol_Text, (220, 220, 230, 255))
            
            # Buttons
            dpg.add_theme_color(dpg.mvThemeCol_Button, (50, 50, 70, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ButtonHovered, (70, 70, 90, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ButtonActive, (80, 80, 100, 255))
            
            # Rounding
            dpg.add_theme_style(dpg.mvStyleVar_FrameRounding, 4)
            dpg.add_theme_style(dpg.mvStyleVar_WindowRounding, 6)
            
    return theme

def create_light_theme():
    with dpg.theme() as light_theme:
        with dpg.theme_component(dpg.mvAll):
            # Background colors
            dpg.add_theme_color(dpg.mvThemeCol_WindowBg, (240, 240, 245, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ChildBg, (250, 250, 252, 255))
            dpg.add_theme_color(dpg.mvThemeCol_PopupBg, (255, 255, 255, 255))
            dpg.add_theme_color(dpg.mvThemeCol_Border, (200, 200, 210, 255))
            
            # Frame/Input backgrounds
            dpg.add_theme_color(dpg.mvThemeCol_FrameBg, (255, 255, 255, 255))
            dpg.add_theme_color(dpg.mvThemeCol_FrameBgHovered, (245, 245, 250, 255))
            dpg.add_theme_color(dpg.mvThemeCol_FrameBgActive, (235, 235, 245, 255))
            
            # Text
            dpg.add_theme_color(dpg.mvThemeCol_Text, (20, 20, 25, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TextDisabled, (140, 140, 150, 255))
            
            # Title bar
            dpg.add_theme_color(dpg.mvThemeCol_TitleBg, (230, 230, 240, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TitleBgActive, (220, 220, 235, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TitleBgCollapsed, (240, 240, 245, 255))
            
            # Buttons
            dpg.add_theme_color(dpg.mvThemeCol_Button, (200, 200, 215, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ButtonHovered, (180, 180, 200, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ButtonActive, (160, 160, 185, 255))
            
            # Headers
            dpg.add_theme_color(dpg.mvThemeCol_Header, (220, 220, 235, 255))
            dpg.add_theme_color(dpg.mvThemeCol_HeaderHovered, (210, 210, 230, 255))
            dpg.add_theme_color(dpg.mvThemeCol_HeaderActive, (200, 200, 225, 255))
            
            # Tabs
            dpg.add_theme_color(dpg.mvThemeCol_Tab, (230, 230, 240, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TabHovered, (210, 210, 230, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TabActive, (245, 245, 250, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TabUnfocused, (235, 235, 242, 255))
            dpg.add_theme_color(dpg.mvThemeCol_TabUnfocusedActive, (240, 240, 245, 255))
            
            # Scrollbar
            dpg.add_theme_color(dpg.mvThemeCol_ScrollbarBg, (245, 245, 248, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ScrollbarGrab, (200, 200, 210, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ScrollbarGrabHovered, (180, 180, 195, 255))
            dpg.add_theme_color(dpg.mvThemeCol_ScrollbarGrabActive, (160, 160, 180, 255))
            
            # Checkmarks and sliders
            dpg.add_theme_color(dpg.mvThemeCol_CheckMark, (60, 120, 200, 255))
            dpg.add_theme_color(dpg.mvThemeCol_SliderGrab, (70, 130, 210, 255))
            dpg.add_theme_color(dpg.mvThemeCol_SliderGrabActive, (50, 110, 190, 255))
            
            # Separators
            dpg.add_theme_color(dpg.mvThemeCol_Separator, (200, 200, 210, 255))
            dpg.add_theme_color(dpg.mvThemeCol_SeparatorHovered, (180, 180, 200, 255))
            dpg.add_theme_color(dpg.mvThemeCol_SeparatorActive, (160, 160, 190, 255))
            
            # Resize grip
            dpg.add_theme_color(dpg.mvThemeCol_ResizeGrip, (200, 200, 210, 100))
            dpg.add_theme_color(dpg.mvThemeCol_ResizeGripHovered, (180, 180, 200, 170))
            dpg.add_theme_color(dpg.mvThemeCol_ResizeGripActive, (160, 160, 190, 240))
            
            # Menu bar
            dpg.add_theme_color(dpg.mvThemeCol_MenuBarBg, (235, 235, 242, 255))
            
            # ========== NODE EDITOR COLORS ==========
            # Node background
            dpg.add_theme_color(dpg.mvNodeCol_NodeBackground, (255, 255, 255, 255))
            dpg.add_theme_color(dpg.mvNodeCol_NodeBackgroundHovered, (248, 248, 252, 255))
            dpg.add_theme_color(dpg.mvNodeCol_NodeBackgroundSelected, (240, 245, 255, 255))
            
            # Node outline/border
            dpg.add_theme_color(dpg.mvNodeCol_NodeOutline, (180, 180, 195, 255))
            
            # Title bar
            dpg.add_theme_color(dpg.mvNodeCol_TitleBar, (220, 220, 235, 255))
            dpg.add_theme_color(dpg.mvNodeCol_TitleBarHovered, (210, 210, 230, 255))
            dpg.add_theme_color(dpg.mvNodeCol_TitleBarSelected, (200, 210, 235, 255))
            
            # Links (connections between nodes)
            dpg.add_theme_color(dpg.mvNodeCol_Link, (70, 130, 210, 255))
            dpg.add_theme_color(dpg.mvNodeCol_LinkHovered, (90, 150, 230, 255))
            dpg.add_theme_color(dpg.mvNodeCol_LinkSelected, (50, 110, 190, 255))
            
            # Pins (connection points)
            dpg.add_theme_color(dpg.mvNodeCol_Pin, (70, 130, 210, 255))
            dpg.add_theme_color(dpg.mvNodeCol_PinHovered, (90, 150, 230, 255))
            
            # Box selector (when dragging to select multiple nodes)
            dpg.add_theme_color(dpg.mvNodeCol_BoxSelector, (70, 130, 210, 80))
            dpg.add_theme_color(dpg.mvNodeCol_BoxSelectorOutline, (70, 130, 210, 255))
            
            # Grid lines in node editor background
            dpg.add_theme_color(dpg.mvNodeCol_GridBackground, (250, 250, 252, 255))
            dpg.add_theme_color(dpg.mvNodeCol_GridLine, (230, 230, 235, 255))
            
            # Style variables
            dpg.add_theme_style(dpg.mvStyleVar_FrameRounding, 4)
            dpg.add_theme_style(dpg.mvStyleVar_WindowRounding, 6)
            dpg.add_theme_style(dpg.mvStyleVar_ChildRounding, 4)
            dpg.add_theme_style(dpg.mvStyleVar_GrabRounding, 3)
            dpg.add_theme_style(dpg.mvStyleVar_TabRounding, 4)
            dpg.add_theme_style(dpg.mvStyleVar_ScrollbarRounding, 9)
            
            dpg.add_theme_style(dpg.mvStyleVar_WindowPadding, 10, 10)
            dpg.add_theme_style(dpg.mvStyleVar_FramePadding, 6, 4)
            dpg.add_theme_style(dpg.mvStyleVar_ItemSpacing, 8, 6)
            dpg.add_theme_style(dpg.mvStyleVar_ItemInnerSpacing, 6, 6)
            
            # Node-specific style variables
            dpg.add_theme_style(dpg.mvNodeStyleVar_NodeCornerRounding, 6)
            dpg.add_theme_style(dpg.mvNodeStyleVar_NodePadding, 8, 8)
            dpg.add_theme_style(dpg.mvNodeStyleVar_NodeBorderThickness, 1.5)
            dpg.add_theme_style(dpg.mvNodeStyleVar_LinkThickness, 3)
            dpg.add_theme_style(dpg.mvNodeStyleVar_PinCircleRadius, 5)
            dpg.add_theme_style(dpg.mvNodeStyleVar_PinQuadSideLength, 8)
            
    return light_theme
