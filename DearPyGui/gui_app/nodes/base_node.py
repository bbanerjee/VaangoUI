import dearpygui.dearpygui as dpg
import uuid
from app import get_app_singleton
from callbacks import on_node_click
from app_state import APP_DATA

class BaseNode:
    def __init__(self, name="BaseNode"):
        self.app = get_app_singleton()
        self.name = name
        self.tag = str(uuid.uuid4())
        self.input_attr = f"{self.tag}_in"
        self.output_attr = f"{self.tag}_out"
        self.node_tag = f"node_{self.tag}"

        print(f"Creating node: {self.name} with tag {self.node_tag}")

        # Register this instance so link_callback can find it
        self.app.nodes[self.node_tag] = self

        self.create_node_ui_base()

    def create_node_ui_base(self):
        print(f"Creating UI for node: {self.name} tag: {self.node_tag} parent: {self.app.node_editor_tag}")

        # Auto positioning
        pos = self.app.get_next_node_position()

        with dpg.node(label=self.name, 
                      tag=self.node_tag, 
                      parent=self.app.node_editor_tag,
                      pos=pos) as node_id:
            with dpg.node_attribute(tag=self.input_attr, attribute_type=dpg.mvNode_Attr_Input):
                dpg.add_text(self.name)

            # ←←← This is where you put your custom controls ←←←
            # We leave a placeholder — child classes will add their UI here
            print(f"Adding placeholder static attribute for node: {self.name} tag: {self.node_tag}_static")
            with dpg.node_attribute(attribute_type=dpg.mvNode_Attr_Static,
                                   tag=f"{self.node_tag}_static"):
                dpg.add_text("Configure me")  # placeholder

            with dpg.node_attribute(attribute_type=dpg.mvNode_Attr_Static):
                dpg.add_button(label="Run", callback=self.execute)

            with dpg.node_attribute(tag=self.output_attr, attribute_type=dpg.mvNode_Attr_Output):
                dpg.add_text("Result")

        # Store the node
        app = get_app_singleton()
        app.nodes[node_id] = node_id

        # Set up click handler
        self._setup_click_handler()

        # Set callback for individual nodes
        #print(f"Setting on_node_click callback for node: {node_id} tag: {self.node_tag}")
        #dpg.set_item_callback(node_id, on_node_click)

        # To pass user_data to node callbacks, use configure_item
        #dpg.configure_item(node_id, user_data=APP_DATA)

    def _setup_click_handler(self):
        """Set up click handler for this node"""
        print(f"Setting up click handler for node: {self.name} tag: {self.node_tag}")
        with dpg.item_handler_registry() as self.handler_registry:
            dpg.add_item_clicked_handler(
                button=dpg.mvMouseButton_Left,
                callback=on_node_click,
                user_data=APP_DATA
            )
        dpg.bind_item_handler_registry(self.node_tag, self.handler_registry)

    def set_pos(self, x, y):
        dpg.set_item_pos(self.tag, [x, y])

    def set_input(self, attr_id, upstream_node):
        print(f"{self.name} received input from {upstream_node.name}")

    def execute(self, sender=None, app_data=None):
        print(f"Executing {self.name} node")