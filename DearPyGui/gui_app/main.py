import dearpygui.dearpygui as dpg
from app import get_app_singleton
from callbacks import link_callback, delink_callback, setup_global_node_click_handler, clear_property_editor
from app_state import APP_DATA, PROPERTY_EDITOR_TAG
from utils.themes import create_dark_theme, create_light_theme, load_vscode_font

from nodes.import_geometry import ImportGeometryNode
from nodes.geometry_builder import GeometryBuilderNode
from nodes.mesh_clean import MeshCleanNode
from nodes.generate_mesh import GenerateMeshNode
from nodes.problem_setup import ProblemSetupNode
from nodes.solver import SolverNode
from nodes.postprocess import PostProcessNode

# Global registry for nodes
NODE_REGISTRY = {
    "ImportGeometryNode": ImportGeometryNode,
    "GeometryBuilderNode": GeometryBuilderNode,
    "MeshCleanNode": MeshCleanNode,
    "GenerateMeshNode": GenerateMeshNode,
    "ProblemSetupNode": ProblemSetupNode,
    "SolverNode": SolverNode,
    "PostProcessNode": PostProcessNode,
}

def create_node_callback(sender, app_data, user_data):
    node_class = NODE_REGISTRY[user_data]
    node_class() # instantiates and auto-registers via BaseNode

# Apply it
dpg.create_context()

# Show all debugging tools at once
dpg.show_debug()           # Debug window with runtime code execution
#dpg.show_metrics()         # Performance metrics and FPS
dpg.show_item_registry()   # View all registered items and their hierarchy
#dpg.show_documentation()   # Interactive API documentation
#dpg.show_style_editor()    # Live style/theme editing
#dpg.show_font_manager()    # Font inspection
#dpg.show_about()           # Version info

#dpg.bind_theme(create_dark_theme())
dpg.bind_theme(create_light_theme())
load_vscode_font()

dpg.create_viewport(title='Engineering Pipeline Studio', width=1600, height=1000)
app = get_app_singleton()
#dpg.set_item_user_data("app", app)          # cheap way to make it reachable from callback

# Add handler IMMEDIATELY after context/viewport, wrapped in registry
#with dpg.handler_registry(tag="global_node_selector"):  # Clean registry tag
#    dpg.add_mouse_click_handler(
#        button=dpg.mvMouseButton_Left,  # Left-click to select
#        callback=on_node_click
#    )

with dpg.window(tag="MainWindow", label="main_window"):
    with dpg.menu_bar():
        with dpg.menu(label="File"):
            dpg.add_menu_item(label="New")
            dpg.add_menu_item(label="Load")
            dpg.add_menu_item(label="Save")
        with dpg.menu(label="View"):
            dpg.add_menu_item(label="3D Viewer", callback=lambda: app.viewer.show())
        with dpg.menu(label="Layout"):
            dpg.add_menu_item(label="Reset Auto-Layout", 
                              callback=lambda: get_app_singleton().reset_layout())

    with dpg.group(horizontal=True):

        # Left: Node palette 
        with dpg.child_window(width=250, autosize_y=True):
            with dpg.child_window(height=400, autosize_x=True, border=False):
                dpg.add_text("Node Library", bullet=True)
                dpg.add_separator()
                for node_name in NODE_REGISTRY.keys():
                    dpg.add_button(label=node_name.replace("Node", ""),
                                width=-1, height=35,
                                callback=create_node_callback,
                                user_data=node_name)

            # Left bottom: Property editor 
            with dpg.child_window(autosize_x=True, border=True):
                dpg.add_text("Properties", bullet=True)
                dpg.add_separator()
                with dpg.group(tag=PROPERTY_EDITOR_TAG):
                    dpg.add_text("Select a node to edit properties")

        # Center: Node editor
        with dpg.child_window(autosize_x=True, autosize_y=True):
            with dpg.node_editor(callback=link_callback,
                                 delink_callback=delink_callback,
                                 user_data=APP_DATA,
                                 minimap=True,
                                 minimap_location=dpg.mvNodeMiniMap_Location_BottomRight,
                                 tag="node_editor") as node_editor_tag:
                print("Created node editor with tag", node_editor_tag)
                app.node_editor_tag = node_editor_tag

        # Set up global click handler
        setup_global_node_click_handler(node_editor_tag)

# Store nodes in app singleton so link_callback can find them
app.nodes = {}  # will be filled when nodes call BaseNode.__init__

# Initial clear
clear_property_editor()

dpg.setup_dearpygui()
dpg.set_primary_window("MainWindow", True)
dpg.show_viewport()

while dpg.is_dearpygui_running():
    dpg.render_dearpygui_frame()

dpg.destroy_context()
