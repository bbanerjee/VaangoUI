from PySide6.QtWidgets import (QWidget, QLabel, QPushButton, QGridLayout, QVBoxLayout, QGroupBox)
from .fields import DecimalField, DecimalVectorField
from .time_input_panel import TimeInputPanel
from .variable_save_input_panel import VariableSaveInputPanel

class PhysicalConstInputPanel(QWidget):
    def __init__(self):
        super().__init__()
        layout = QGridLayout()
        
        self.pres_entry = DecimalField(101325.0, 9)
        self.grav_entry = DecimalVectorField(0.0, 0.0, 0.0, 5)
        
        layout.addWidget(QLabel("Ref. Pressure"), 0, 0)
        layout.addWidget(self.pres_entry, 0, 1)
        
        layout.addWidget(QLabel("Gravity:"), 1, 0)
        layout.addWidget(self.grav_entry, 1, 1)
        
        self.setLayout(layout)

    def refresh(self):
        pass

    def write_uintah(self, file, tab):
        if file is None:
            return
        
        tab1 = tab + "  "
        file.write(f"{tab}<PhysicalConstants>\n")
        file.write(f"{tab1}<reference_pressure> {self.pres_entry.getValue()} </reference_pressure>\n")
        file.write(f"{tab1}<gravity> [{self.grav_entry.x()}, {self.grav_entry.y()}, {self.grav_entry.z()}] </gravity>\n")
        file.write(f"{tab}</PhysicalConstants>\n\n")

class GeneralInputsPanel(QWidget):
    def __init__(self, sim_component="none", parent=None):
        super().__init__()
        self.d_sim_component = sim_component
        self.d_parent = parent

        self.init_ui()

    def init_ui(self):
        layout = QGridLayout()

        self.time_input_panel = TimeInputPanel(self.d_sim_component, self)
        self.const_input_panel = PhysicalConstInputPanel()
        self.save_input_panel = VariableSaveInputPanel()
        
        self.save_button = QPushButton("Save")
        self.save_button.clicked.connect(self.on_save_clicked)

        layout.addWidget(self.time_input_panel, 0, 0)
        layout.addWidget(self.const_input_panel, 1, 0)
        layout.addWidget(self.save_button, 2, 0)
        
        layout.addWidget(self.save_input_panel, 0, 1, 3, 1)
        
        self.setLayout(layout)

    def update_tabs(self, sim_component):
        self.d_sim_component = sim_component
        if self.d_parent:
            self.d_parent.enable_tabs(sim_component)

    def refresh(self):
        self.const_input_panel.refresh()
        self.time_input_panel.refresh()
        self.save_input_panel.refresh()

    def write_uintah(self, file, tab):
        if file is None:
            return
        self.time_input_panel.write_uintah(file, tab)
        self.save_input_panel.write_uintah(file, tab)
        self.const_input_panel.write_uintah(file, tab)

    def on_save_clicked(self):
        output_file = "test.ups"
        try:
            with open(output_file, 'w') as f:
                self.time_input_panel.write_uintah(f, "  ")
                self.save_input_panel.write_uintah(f, "  ")
            print(f"Written GeneralInputsPanel to file {output_file}")
        except Exception as e:
            print(f"Could not write GeneralInputsPanel to file {output_file}: {e}")
