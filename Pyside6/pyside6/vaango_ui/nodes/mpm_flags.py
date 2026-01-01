from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QCheckBox, QDoubleSpinBox, QSpinBox
from PySide6.QtCore import Qt

class MPMFlagsNode:
    def __init__(self):
        self.name = "MPM settings"
        self.simulation_dim = "3D"
        self.interpolator = "Linear"
        self.cpdi_lcrit = 0.0

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
        pass

    def execute(self):
        pass

    def edit_properties(self, layout: QVBoxLayout):
        layout.addWidget(QLabel("MPM settings"))

        layout.addWidget(QLabel("Problem type"))
        cb = QComboBox()
        cb.addItems(["Plane stress","Plane strain","Axisymmetric","3D"])
        cb.setCurrentText(self.simulation_dim)
        cb.currentTextChanged.connect(lambda v: setattr(self,'simulation_dim', v))
        layout.addWidget(cb)

        layout.addWidget(QLabel("Interpolation type"))
        cb2 = QComboBox()
        cb2.addItems(["Linear","GIMP","CPDI","CPTI"])
        cb2.setCurrentText(self.interpolator)
        cb2.currentTextChanged.connect(lambda v: setattr(self,'interpolator', v))
        layout.addWidget(cb2)

        layout.addWidget(QLabel("Critical length (if CPDI)"))
        lcrit = QDoubleSpinBox()
        lcrit.setRange(0.0, 1e6)
        lcrit.setValue(self.cpdi_lcrit)
        lcrit.valueChanged.connect(lambda v: setattr(self,'cpdi_lcrit', float(v)))
        layout.addWidget(lcrit)

        layout.addWidget(QCheckBox("Advanced settings"))

    def write_vaango(self, file, tab="  "):
        if file is None:
            return
        tab1 = tab + "  "
        file.write(f"{tab}<MPMSettings>\n")
        file.write(f"{tab1}<problem_type> {self.simulation_dim} </problem_type>\n")
        file.write(f"{tab1}<interpolator> {self.interpolator} </interpolator>\n")
        file.write(f"{tab1}<cpdi_critical_length> {self.cpdi_lcrit} </cpdi_critical_length>\n")
        file.write(f"{tab}</MPMSettings>\n\n")
