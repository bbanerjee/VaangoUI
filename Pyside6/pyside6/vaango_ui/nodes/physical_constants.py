from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QDoubleSpinBox, QHBoxLayout
from PySide6.QtCore import Qt

class PhysicalConstantsNode:
    def __init__(self):
        self.name = "Physical constants"
        # Mirror C++ s_physicalConstants fields with sensible defaults
        self.ref_pressure = 101325.0
        self.gravity = [0.0, -9.81, 0.0]

    def create_widget(self):
        w = QWidget()
        layout = QVBoxLayout()
        w.setLayout(layout)

        lbl = QLabel("Reference pressure (Pa)")
        layout.addWidget(lbl)
        sp = QDoubleSpinBox()
        sp.setRange(0.0, 1e9)
        sp.setValue(self.ref_pressure)
        sp.valueChanged.connect(lambda v: setattr(self, 'ref_pressure', float(v)))
        layout.addWidget(sp)

        lblg = QLabel("Gravity (m/s2)  x, y, z")
        lblg.setWordWrap(True)
        layout.addWidget(lblg)

        # Gravity displayed as text (editing vectors may be added later)
        gtxt = QLabel(str(self.gravity))
        gtxt.setAlignment(Qt.AlignLeft)
        layout.addWidget(gtxt)

        return w

    def set_input(self, socket_index, upstream_node):
        pass

    def execute(self):
        pass

    def edit_properties(self, layout: QVBoxLayout):
        layout.addWidget(QLabel("Physical constants"))

        # Reference pressure
        lbl = QLabel("Reference pressure (Pa)")
        layout.addWidget(lbl)
        sp = QDoubleSpinBox()
        sp.setRange(0.0, 1e9)
        sp.setValue(self.ref_pressure)
        sp.valueChanged.connect(lambda v: setattr(self, 'ref_pressure', float(v)))
        layout.addWidget(sp)

        # Gravity vector (simple horizontal display)
        glayout = QHBoxLayout()
        glayout.addWidget(QLabel("Gravity x"))
        gx = QDoubleSpinBox(); gx.setRange(-1e3,1e3); gx.setValue(self.gravity[0]); gx.valueChanged.connect(lambda v: self._set_gravity(0,v))
        glayout.addWidget(gx)
        glayout.addWidget(QLabel("y"))
        gy = QDoubleSpinBox(); gy.setRange(-1e3,1e3); gy.setValue(self.gravity[1]); gy.valueChanged.connect(lambda v: self._set_gravity(1,v))
        glayout.addWidget(gy)
        glayout.addWidget(QLabel("z"))
        gz = QDoubleSpinBox(); gz.setRange(-1e3,1e3); gz.setValue(self.gravity[2]); gz.valueChanged.connect(lambda v: self._set_gravity(2,v))
        glayout.addWidget(gz)
        layout.addLayout(glayout)

    def _set_gravity(self, idx, val):
        self.gravity[idx] = float(val)
