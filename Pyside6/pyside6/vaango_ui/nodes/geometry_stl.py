from PySide6.QtWidgets import (QApplication, QWidget, QVBoxLayout, 
                               QLabel, QPushButton, QLineEdit,
                               QFileDialog)
from PySide6.QtCore import Qt

class GeometrySTLNode:
    """A node representing an STL geometry in the Vaango UI."""

    def __init__(self):
        self.name = "GeometrySTL"

        # File name
        self.file_path = ""
        self.file_path_edit = None

        # STL data
        self.vertices = None
        self.faces = None

        # STL box limits
        # box_min and box_max are 3-tuples (x,y,z)
        self.box_min = (0.0, 0.0, 0.0)
        self.box_max = (1.0, 1.0, 1.0)

    def create_widget(self):
        w = QWidget()
        layout = QVBoxLayout()
        w.setLayout(layout)

        title = QLabel(self.name)
        title.setAlignment(Qt.AlignCenter)
        layout.addWidget(title)

        def open_properties():
            try:
                for top in QApplication.topLevelWidgets():
                    if hasattr(top, 'property_editor'):
                        try:
                            top.property_editor.show_node_properties(self)
                            if hasattr(top, 'property_dock'):
                                top.property_dock.setVisible(True)
                        except Exception:
                            pass
            except Exception:
                pass

        props_btn = QPushButton("Properties...")
        props_btn.clicked.connect(open_properties)
        layout.addWidget(props_btn)

        return w

    def set_input(self, socket_index, upstream_node):
        # Accept inputs from other nodes if connected; store reference
        self.input_node = upstream_node

    def execute(self):
        # Domain node doesn't perform runtime execution in this editor
        pass

    def edit_properties(self, layout: QVBoxLayout):
        print("[GeometrySTL] edit_properties called")

        # Print selected file name
        self.file_path_edit = QLineEdit()
        self.file_path_edit.setPlaceholderText("Selected file path will appear here...")
        layout.addWidget(self.file_path_edit)

        select_button = QPushButton("Select File")
        select_button.clicked.connect(self.select_file)
        layout.addWidget(select_button)

    def select_file(self):
        file_dialog = QFileDialog()
        file_path, _ = file_dialog.getOpenFileName(None, "Select STL File", "", "STL Files (*.stl);;All Files (*)")
        if file_path:
            self.file_path = file_path
            if self.file_path_edit is not None:
                self.file_path_edit.setText(file_path)
                self._update_geometry(file_path)
            print(f"[GeometrySTL] Selected file: {file_path}")


    def _update_geometry(self, file_path):
        print(f"[GeometrySTL] _update_geometry called with file: {file_path}")

        # Read STL file
        try:
            self._load_stl_file(file_path)
        except Exception as e:
            print(f"[GeometrySTL] Error loading STL file: {e}")
            return

        # Update the bounding box limits
        self._update_mesh_info()

        # Update 3D visualization
        self._update_3d_visualization()
            
    def _load_stl_file(self, file_path):
        print(f"[GeometrySTL] _load_stl_file called with file: {file_path}")
        try:
            from vaango_ui.io.stl_reader import STLReader

            # Read STL file
            self.vertices, self.faces = STLReader.read_stl(file_path)
            
            # Update UI
            print(f"[GeometrySTL] file_status: Loaded: {file_path}")
            
        except Exception as e:
            print(f"[GeometrySTL] file_status: Error loading STL file: {e}") 

    def _update_mesh_info(self):
        """Update mesh information display"""

        import numpy as np

        info = f"Vertices: {len(self.vertices)}, Faces: {len(self.faces)}"
        if len(self.vertices) > 0:
            bounds = np.max(self.vertices, axis=0) - np.min(self.vertices, axis=0)
            info += f"\nBounds: {bounds[0]:.2f} x {bounds[1]:.2f} x {bounds[2]:.2f}"

            self._set_box_min(0, float(np.min(self.vertices[:,0])))
            self._set_box_min(1, float(np.min(self.vertices[:,1])))
            self._set_box_min(2, float(np.min(self.vertices[:,2])))
            self._set_box_max(0, float(np.max(self.vertices[:,0])))
            self._set_box_max(1, float(np.max(self.vertices[:,1])))
            self._set_box_max(2, float(np.max(self.vertices[:,2])))

        print(f"[GeometrySTL] mesh_info: {info}")

    def _set_box_min(self, idx, val):
        print(f"[GeometrySTL] setting box_min[{idx}] = {val}")
        b = list(self.box_min)
        b[idx] = val
        self.box_min = tuple(b)

    def _set_box_max(self, idx, val):
        print(f"[GeometrySTL] setting box_max[{idx}] = {val}")
        b = list(self.box_max)
        b[idx] = val
        self.box_max = tuple(b)

    def _update_3d_visualization(self):
        print(f"[GeometrySTL] _update_3d_visualization called with min={self.box_min} max={self.box_max}")
        try:
            for top in QApplication.topLevelWidgets():
                try:
                    name = top.objectName()
                except Exception:
                    name = str(type(top))
                print(f"[GeometrySTL] checking top-level widget: {name}")

                main_view = getattr(top, 'view_3d', None)
                if main_view is not None:
                    print("[GeometrySTL] found MainWindow.view_3d, calling add_domain_box...")
                    try:
                        main_view.add_stl_mesh(self.vertices, self.faces)
                        print("[GeometrySTL] add_stl_mesh succeeded on view_3d")
                    except Exception as e:
                        print(f"[GeometrySTL] add_stl_mesh on view_3d raised: {e}")
                        try:
                            if hasattr(top, 'add_stl_mesh'):
                                print("[GeometrySTL] trying top.add_stl_mesh fallback")
                                top.add_stl_mesh(self.vertices, self.faces)
                                print("[GeometrySTL] add_stl_mesh succeeded on top-level fallback")
                        except Exception as e2:
                            print(f"[GeometrySTL] fallback add_stl_mesh raised: {e2}")
                    break
                else:
                    # Not the main window, log that view_3d not present
                    print("[GeometrySTL] view_3d attribute not found on this top-level widget")
        except Exception as e:
            print(f"[GeometrySTL] exception locating top-level widgets: {e}")

    def write_vaango(self, file, tab="  "):
        # Optional: write STL file name into Vaango input if needed
        if file is None:
            return
        file.write(f"{tab}<Geometry>\n")
        file.write(f"{tab}  <box min=\"{self.box_min[0]} {self.box_min[1]} {self.box_min[2]}\" max=\"{self.box_max[0]} {self.box_max[1]} {self.box_max[2]}\"/>\n")
        file.write(f"{tab}</Geometry>\n")
