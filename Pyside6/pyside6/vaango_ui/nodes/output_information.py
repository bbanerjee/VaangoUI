from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QLineEdit, QSpinBox, QDoubleSpinBox, QCheckBox
from PySide6.QtCore import Qt

class OutputInformationNode:
    def __init__(self):
        self.name = "Output information"
        self.output_uda_file = "output.uda"
        self.time_interval = 1.0
        self.timestep_interval = 1
        self.checkpoint_cycle = 0

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
        layout.addWidget(QLabel("Output information"))

        layout.addWidget(QLabel("Output UDA file"))
        le = QLineEdit(self.output_uda_file)
        le.textChanged.connect(lambda v: setattr(self, 'output_uda_file', v))
        layout.addWidget(le)

        layout.addWidget(QLabel("Output time interval (s)"))
        td = QDoubleSpinBox()
        td.setRange(0.0, 1e6)
        td.setValue(self.time_interval)
        td.valueChanged.connect(lambda v: setattr(self,'time_interval', float(v)))
        layout.addWidget(td)

        layout.addWidget(QLabel("Output timestep interval"))
        ts = QSpinBox()
        ts.setRange(0, 1000000)
        ts.setValue(self.timestep_interval)
        ts.valueChanged.connect(lambda v: setattr(self,'timestep_interval', int(v)))
        layout.addWidget(ts)

        layout.addWidget(QLabel("Checkpoint cycle"))
        cc = QSpinBox()
        cc.setRange(0, 1000000)
        cc.setValue(self.checkpoint_cycle)
        cc.valueChanged.connect(lambda v: setattr(self,'checkpoint_cycle', int(v)))
        layout.addWidget(cc)

        # Simple toggles for variable groups (placeholders)
        layout.addWidget(QLabel("Variables to save (groups)"))
        layout.addWidget(QCheckBox("Summed variables"))
        layout.addWidget(QCheckBox("MPM particle variables"))
        layout.addWidget(QCheckBox("MPM grid variables"))
        layout.addWidget(QCheckBox("ICE cell-centered variables"))
