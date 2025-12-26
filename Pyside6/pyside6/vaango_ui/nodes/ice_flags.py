from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QCheckBox, QDoubleSpinBox, QSpinBox
from PySide6.QtCore import Qt

class ICEFlagsNode:
    def __init__(self):
        self.name = "ICE settings"
        self.algorithm = "Total form"
        self.advection = "Second order"
        self.do_compatible_fluxes = False
        self.clamp_specific_volume = False

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
        layout.addWidget(QLabel("ICE settings"))

        layout.addWidget(QLabel("Algorithm"))
        cb = QComboBox()
        cb.addItems(["Total form","Rate form"])
        cb.setCurrentText(self.algorithm)
        cb.currentTextChanged.connect(lambda v: setattr(self,'algorithm', v))
        layout.addWidget(cb)

        layout.addWidget(QLabel("Advection"))
        cb2 = QComboBox()
        cb2.addItems(["First order","Second order"])
        cb2.setCurrentText(self.advection)
        cb2.currentTextChanged.connect(lambda v: setattr(self,'advection', v))
        layout.addWidget(cb2)

        # Simple flags
        chk1 = QCheckBox("Compatible fluxes?")
        chk1.setChecked(self.do_compatible_fluxes)
        chk1.stateChanged.connect(lambda s: setattr(self,'do_compatible_fluxes', s==Qt.Checked))
        layout.addWidget(chk1)

        chk2 = QCheckBox("Clamp specific volume?")
        chk2.setChecked(self.clamp_specific_volume)
        chk2.stateChanged.connect(lambda s: setattr(self,'clamp_specific_volume', s==Qt.Checked))
        layout.addWidget(chk2)

        layout.addWidget(QCheckBox("Advanced settings"))
