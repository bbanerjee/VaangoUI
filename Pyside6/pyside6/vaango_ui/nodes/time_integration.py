from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QDoubleSpinBox, QComboBox, QCheckBox
from PySide6.QtCore import Qt

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
