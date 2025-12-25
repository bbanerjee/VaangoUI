from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QDoubleSpinBox, QComboBox, QCheckBox

class TimeIntegrationNode:
    def __init__(self):
        self.name = "Time integration"
        self.start_time = 0.0
        self.end_time = 1.0
        self.integration_type = "Explicit"
        self.multiplier = 1.0

    def create_widget(self):
        w = QWidget()
        layout = QVBoxLayout()
        w.setLayout(layout)

        layout.addWidget(QLabel("Start time (s)"))
        st = QDoubleSpinBox()
        st.setRange(0.0, 1e9)
        st.setValue(self.start_time)
        st.valueChanged.connect(lambda v: setattr(self, 'start_time', float(v)))
        layout.addWidget(st)

        layout.addWidget(QLabel("End time (s)"))
        et = QDoubleSpinBox()
        et.setRange(0.0, 1e9)
        et.setValue(self.end_time)
        et.valueChanged.connect(lambda v: setattr(self, 'end_time', float(v)))
        layout.addWidget(et)

        layout.addWidget(QLabel("Integration type"))
        cb = QComboBox()
        cb.addItems(["Explicit","Implicit","Symplectic"])
        cb.setCurrentText(self.integration_type)
        cb.currentTextChanged.connect(lambda v: setattr(self,'integration_type', v))
        layout.addWidget(cb)

        return w

    def set_input(self, socket_index, upstream_node):
        pass

    def execute(self):
        pass

    def edit_properties(self, layout: QVBoxLayout):
        layout.addWidget(QLabel("Time integration"))

        layout.addWidget(QLabel("Start time (s)"))
        st = QDoubleSpinBox()
        st.setRange(0.0, 1e9)
        st.setValue(self.start_time)
        st.valueChanged.connect(lambda v: setattr(self, 'start_time', float(v)))
        layout.addWidget(st)

        layout.addWidget(QLabel("End time (s)"))
        et = QDoubleSpinBox()
        et.setRange(0.0, 1e9)
        et.setValue(self.end_time)
        et.valueChanged.connect(lambda v: setattr(self, 'end_time', float(v)))
        layout.addWidget(et)

        layout.addWidget(QLabel("Integration type"))
        cb = QComboBox()
        cb.addItems(["Explicit","Implicit","Symplectic"])
        cb.setCurrentText(self.integration_type)
        cb.currentTextChanged.connect(lambda v: setattr(self,'integration_type', v))
        layout.addWidget(cb)

        layout.addWidget(QCheckBox("More settings..."))
