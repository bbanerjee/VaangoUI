from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QCheckBox, QDoubleSpinBox, QSpinBox

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
