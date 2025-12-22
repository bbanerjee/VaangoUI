import app_state
import dearpygui.dearpygui as dpg
from app import get_app_singleton

def clear_property_editor():
    dpg.delete_item(app_state.PROPERTY_EDITOR_TAG, children_only=True)
    dpg.add_text("Select a node to edit properties", parent=app_state.PROPERTY_EDITOR_TAG)

def show_node_properties(node_instance):
    clear_property_editor()
    if not node_instance or not hasattr(node_instance, "edit_properties"):
        dpg.add_text("This node has no editable properties", parent=app_state.PROPERTY_EDITOR_TAG)
        return

    with dpg.group(parent=app_state.PROPERTY_EDITOR_TAG):
        node_instance.edit_properties()

def setup_global_node_click_handler(node_editor_id):
    """Set up a global handler for all node clicks"""
    with dpg.handler_registry():
        dpg.add_mouse_click_handler(
            button=dpg.mvMouseButton_Left,
            callback=handle_global_click
        )

def handle_global_click(sender, app_data, user_data):
    """Global click handler that checks what was clicked"""
    app = get_app_singleton()
    
    # Check each node to see if it was clicked
    for node_id in app.nodes.keys():
        if dpg.is_item_hovered(node_id) and dpg.is_item_clicked(node_id):
            on_node_click(node_id, app_data, user_data)
            break

def on_node_click(sender, app_data_callback, user_data):
    """Handles left-click on nodes — updates property editor"""

    # Filter out drag events - only process actual clicks
    # Check if mouse is being dragged
    if dpg.is_mouse_button_dragging(dpg.mvMouseButton_Left, threshold=5.0):
        return  # Ignore drag events

    # sender is the node ID that was clicked
    print("on_node_click: sender (node_id)=", sender)
    sender_data = dpg.get_item_user_data(sender)
    print("on_node_click: item sender_data =", sender_data)
    if sender_data:
        print(sender_data['selected_node'])
        clicked_node_id = sender_data['selected_node']
    else: 
        clicked_node_id = sender
    
    # Use sender, not app_data_callback
    app_state.APP_DATA["selected_node"] = clicked_node_id

    # Check if the item exists
    if not dpg.does_item_exist(clicked_node_id):
        print(f"Warning: Node {clicked_node_id} no longer exists")
        clear_property_editor()
        return

    app = get_app_singleton()
    node = app.nodes.get(clicked_node_id)

    # Search sub-nodes if not found in main graph
    if not node:
        for main_node in app.nodes.values():
            if hasattr(main_node, "sub_nodes") and main_node.sub_nodes:
                node = main_node.sub_nodes.get(clicked_node_id)
                if node:
                    break

    if node:
        show_node_properties(node)
    else:
        print(f"Warning: Node {clicked_node_id} not found in app.nodes")
        clear_property_editor()


def link_callback(sender, app_data_callback, user_data):
    """Called when user creates a link: app_data = [output_attr_tag, input_attr_tag]"""
    print("link_callback: app_data", app_data_callback)
    user_data["links"].append(app_data_callback)

    output_attr_tag = app_data_callback[0]
    input_attr_tag = app_data_callback[1]

    # Find the nodes that own these attributes
    output_node_id = dpg.get_item_parent(output_attr_tag)
    input_node_id = dpg.get_item_parent(input_attr_tag)
    print(f"Linking from {output_node_id} to {input_node_id}")

    output_node_tag = dpg.get_item_alias(output_node_id)
    input_node_tag = dpg.get_item_alias(input_node_id)

    output_node = None
    input_node = None

    app = get_app_singleton()
    for node in app.nodes.values():
        print(f"Checking node: {node} input: {input_node_tag} output: {output_node_tag} tag: {node.node_tag}")
        if node.node_tag == output_node_tag:
            output_node = node
        if node.node_tag == input_node_tag:
            input_node = node

    if not output_node or not input_node:
        print("Warning: Link involves unknown node")
        return

    # Store the link for delink handling
    link_id = dpg.add_node_link(output_attr_tag, input_attr_tag, parent=sender)
    app_state.LINKS[link_id] = (output_node, input_node)

    # Notify the downstream node that it now has a new input
    input_node.set_input(input_attr_tag, output_node)

    print(f"Linked: {output_node.name} → {input_node.name}")

def delink_callback(sender, app_data_callback, user_data):
    """Called when user deletes a link: app_data = link_id"""
    link_id = app_data_callback

    if link_id not in app_state.LINKS:
        return

    output_node, input_node = app_state.LINKS[link_id]

    # Optional: tell the downstream node to clear its input/cache
    if hasattr(input_node, "clear_input"):
        input_node.clear_input()
    else:
        # Default fallback: just resets internal state
        input_node.input_mesh = None
        input_node.ms = None
        input_node.output_mesh = None
        dpg.set_item_label(input_node.node_tag, input_node.name)

    print(f"Unlinked: {output_node.name} → {input_node.name}")

    # Remove from tracking
    del app_state.LINKS[link_id]
    dpg.delete_item(link_id)

    # Remove from user_data if needed
    if [output_node, input_node] in user_data["links"]:
        user_data["links"].remove([output_node, input_node])

def node_selected(sender, app_data):
    selected_nodes = dpg.get_selected_nodes(sender)
    if not selected_nodes:
        clear_property_editor()
        return
    
    node_tag = selected_nodes[0]  # take first selected

    # Search in main nodes and all open sub-editors
    node = get_app_singleton().nodes.get(node_tag)
    if not node:
        # Search inside any ProblemSetup sub-nodes
        for main_node in get_app_singleton().nodes.values():
            if hasattr(main_node, "sub_nodes"):
                node = main_node.sub_nodes.get(node_tag)
                if node:
                    break

    if node and hasattr(node, "edit_properties"):
        show_node_properties(node)
    else:
        clear_property_editor()
