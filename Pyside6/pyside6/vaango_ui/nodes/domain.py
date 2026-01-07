from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QPushButton, QDoubleSpinBox, QHBoxLayout
from PySide6.QtCore import Qt

class DomainNode:
    def __init__(self):
        self.name = "Domain"
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

        from PySide6.QtWidgets import QPushButton, QApplication

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
        print("[DomainNode] edit_properties called")
        # Add title
        layout.addWidget(QLabel("Domain box specification"))

        # Box Min
        layout.addWidget(QLabel("Box min (x, y, z)"))
        hmin = QHBoxLayout()
        xmin = QDoubleSpinBox(); xmin.setRange(-1e9, 1e9); xmin.setValue(self.box_min[0])
        ymin = QDoubleSpinBox(); ymin.setRange(-1e9, 1e9); ymin.setValue(self.box_min[1])
        zmin = QDoubleSpinBox(); zmin.setRange(-1e9, 1e9); zmin.setValue(self.box_min[2])

        # Explicit slots to ensure proper binding and debug logging
        def on_xmin_changed(v):
            print(f"[DomainNode] xmin changed -> {v}")
            self._set_box_min(0, float(v))
        def on_ymin_changed(v):
            print(f"[DomainNode] ymin changed -> {v}")
            self._set_box_min(1, float(v))
        def on_zmin_changed(v):
            print(f"[DomainNode] zmin changed -> {v}")
            self._set_box_min(2, float(v))

        xmin.valueChanged.connect(on_xmin_changed)
        ymin.valueChanged.connect(on_ymin_changed)
        zmin.valueChanged.connect(on_zmin_changed)
        hmin.addWidget(xmin); hmin.addWidget(ymin); hmin.addWidget(zmin)
        layout.addLayout(hmin)

        # Box Max
        layout.addWidget(QLabel("Box max (x, y, z)"))
        hmax = QHBoxLayout()
        xmax = QDoubleSpinBox(); xmax.setRange(-1e9, 1e9); xmax.setValue(self.box_max[0])
        ymax = QDoubleSpinBox(); ymax.setRange(-1e9, 1e9); ymax.setValue(self.box_max[1])
        zmax = QDoubleSpinBox(); zmax.setRange(-1e9, 1e9); zmax.setValue(self.box_max[2])

        def on_xmax_changed(v):
            print(f"[DomainNode] xmax changed -> {v}")
            self._set_box_max(0, float(v))
        def on_ymax_changed(v):
            print(f"[DomainNode] ymax changed -> {v}")
            self._set_box_max(1, float(v))
        def on_zmax_changed(v):
            print(f"[DomainNode] zmax changed -> {v}")
            self._set_box_max(2, float(v))

        xmax.valueChanged.connect(on_xmax_changed)
        ymax.valueChanged.connect(on_ymax_changed)
        zmax.valueChanged.connect(on_zmax_changed)
        hmax.addWidget(xmax); hmax.addWidget(ymax); hmax.addWidget(zmax)
        layout.addLayout(hmax)

    def _set_box_min(self, idx, val):
        print(f"[DomainNode] setting box_min[{idx}] = {val}")
        b = list(self.box_min)
        b[idx] = val
        self.box_min = tuple(b)
        self._update_domain_box()

    def _set_box_max(self, idx, val):
        print(f"[DomainNode] setting box_max[{idx}] = {val}")
        b = list(self.box_max)
        b[idx] = val
        self.box_max = tuple(b)
        self._update_domain_box()

    def _update_domain_box(self):
        print(f"[DomainNode] _update_domain_box called with min={self.box_min} max={self.box_max}")
        try:
            from PySide6.QtWidgets import QApplication
            for top in QApplication.topLevelWidgets():
                try:
                    name = None
                    try:
                        name = top.objectName()
                    except Exception:
                        name = str(type(top))
                    print(f"[DomainNode] checking top-level widget: {name}")

                    main_view = getattr(top, 'view_3d', None)
                    if main_view is not None:
                        print("[DomainNode] found MainWindow.view_3d, calling add_domain_box...")
                        try:
                            main_view.add_domain_box(self.box_min, self.box_max)
                            print("[DomainNode] add_domain_box succeeded on view_3d")
                        except Exception as e:
                            print(f"[DomainNode] add_domain_box on view_3d raised: {e}")
                            try:
                                if hasattr(top, 'add_domain_box'):
                                    print("[DomainNode] trying top.add_domain_box fallback")
                                    top.add_domain_box(self.box_min, self.box_max)
                                    print("[DomainNode] add_domain_box succeeded on top-level fallback")
                            except Exception as e2:
                                print(f"[DomainNode] fallback add_domain_box raised: {e2}")
                        break
                    else:
                        # Not the main window, log that view_3d not present
                        print("[DomainNode] view_3d attribute not found on this top-level widget")
                except Exception as inner_e:
                    print(f"[DomainNode] exception while checking top-level widget: {inner_e}")
                    continue
        except Exception as e:
            print(f"[DomainNode] exception locating top-level widgets: {e}")

    def write_vaango(self, file, tab="  "):
        # Optional: write domain extents into Vaango input if needed
        if file is None:
            return
        file.write(f"{tab}<Domain>\n")
        file.write(f"{tab}  <box min=\"{self.box_min[0]} {self.box_min[1]} {self.box_min[2]}\" max=\"{self.box_max[0]} {self.box_max[1]} {self.box_max[2]}\"/>\n")
        file.write(f"{tab}</Domain>\n")
