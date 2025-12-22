# Global application state
APP_DATA  = {
    "version": "1.0.0",
    "name": "Engineering Pipeline Studio",
    "author": "Your Name",
    "description": "A node-based GUI application for engineering simulations.",
    "nodes" : {},  # node_tag 
    "links": [],  # (output_node_instance, input_node_instance)
    "selected_node": None,
}

# Global property editor tag
PROPERTY_EDITOR_TAG = "property_editor"

# Global storage for links: link_id → (output_node_instance, input_node_instance)
LINKS = {}

# Optional: Add helper functions to manipulate state
def add_node(node_id, node_info):
    APP_DATA["nodes"][node_id] = node_info

def get_selected_node():
    return APP_DATA.get("selected_node")