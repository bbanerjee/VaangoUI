from PySide6.QtWidgets import (QWidget, QLabel, QLineEdit, QComboBox, QRadioButton, 
                                QButtonGroup, QGridLayout, QVBoxLayout, QGroupBox, QHBoxLayout) 
# Note: PySide6 doesn't have JTextField, ButtonGroup in the same way. 
# JTextField -> QLineEdit
# ButtonGroup -> QButtonGroup
from PySide6.QtWidgets import QLineEdit, QButtonGroup
from .fields import DecimalField, IntegerField

class TimeInputPanel(QWidget):
    def __init__(self, sim_type="mpm", parent=None):
        super().__init__()
        self.d_sim_type = sim_type
        self.d_parent = parent
        self.d_output_step = False
        self.d_check_step = False

        self.init_ui()

    def init_ui(self):
        main_layout = QVBoxLayout()

        # Header Panel
        header_group = QGroupBox("Simulation Header")
        header_layout = QGridLayout()
        
        self.title_entry = QLineEdit("Test Simulation")
        self.sim_comp_cb = QComboBox()
        self.sim_comp_cb.addItems(["Select one", "MPM", "ICE", "MPMICE"])
        self.sim_comp_cb.currentTextChanged.connect(self.on_sim_comp_changed)
        
        self.uda_filename_entry = QLineEdit("test.uda")

        header_layout.addWidget(QLabel("Simulation Title"), 0, 0)
        header_layout.addWidget(self.title_entry, 0, 1)
        header_layout.addWidget(QLabel("Simulation Component"), 1, 0)
        header_layout.addWidget(self.sim_comp_cb, 1, 1)
        header_layout.addWidget(QLabel("Output UDA Filename"), 2, 0)
        header_layout.addWidget(self.uda_filename_entry, 2, 1)
        
        header_group.setLayout(header_layout)
        main_layout.addWidget(header_group)

        # Time Inputs
        time_group = QGroupBox("Time Inputs")
        time_layout = QGridLayout()

        self.init_time_entry = DecimalField(0.0, 8, True)
        self.max_time_entry = DecimalField(1.0, 8, True)
        self.max_nof_steps_entry = IntegerField(0, 5)
        self.delt_init_entry = DecimalField(1.0e-9, 8, True)
        self.delt_min_entry = DecimalField(0.0, 8, True)
        self.delt_max_entry = DecimalField(1.0e-3, 8, True)
        self.max_delt_inc_entry = DecimalField(1.0, 6)
        self.delt_multiplier_entry = DecimalField(0.5, 6)

        time_layout.addWidget(QLabel("Initial Time"), 0, 0)
        time_layout.addWidget(self.init_time_entry, 0, 1)
        time_layout.addWidget(QLabel("Maximum Time"), 1, 0)
        time_layout.addWidget(self.max_time_entry, 1, 1)
        time_layout.addWidget(QLabel("Maximum Timesteps"), 2, 0)
        time_layout.addWidget(self.max_nof_steps_entry, 2, 1)
        time_layout.addWidget(QLabel("Initial Timestep Size"), 3, 0)
        time_layout.addWidget(self.delt_init_entry, 3, 1)
        time_layout.addWidget(QLabel("Minimum Timestep Size"), 4, 0)
        time_layout.addWidget(self.delt_min_entry, 4, 1)
        time_layout.addWidget(QLabel("Maximum Timestep Size"), 5, 0)
        time_layout.addWidget(self.delt_max_entry, 5, 1)
        time_layout.addWidget(QLabel("Maximum Timestep Increase Factor"), 6, 0)
        time_layout.addWidget(self.max_delt_inc_entry, 6, 1)
        time_layout.addWidget(QLabel("Timestep Multiplier"), 7, 0)
        time_layout.addWidget(self.delt_multiplier_entry, 7, 1)

        time_group.setLayout(time_layout)
        main_layout.addWidget(time_group)

        # Output Intervals
        output_group = QGroupBox("Output Intervals")
        output_layout = QGridLayout()

        self.output_interval_rb = QRadioButton("Output Time Interval")
        self.output_interval_rb.setChecked(True)
        self.output_interval_entry = DecimalField(1.0e-6, 8, True)

        self.output_timestep_interval_rb = QRadioButton("Output Timestep Interval")
        self.output_timestep_interval_entry = IntegerField(10, 4)

        self.output_bg = QButtonGroup(self)
        self.output_bg.addButton(self.output_interval_rb)
        self.output_bg.addButton(self.output_timestep_interval_rb)
        self.output_bg.buttonClicked.connect(self.on_output_rb_clicked)

        self.check_point_cycle_label = QLabel("Check Point Cycle")
        self.check_point_cycle_entry = IntegerField(2, 4)

        self.check_point_interval_rb = QRadioButton("Checkpoint Time Interval")
        self.check_point_interval_rb.setChecked(True)
        self.check_point_interval_entry = DecimalField(5.0e-6, 8, True)

        self.check_point_timestep_interval_rb = QRadioButton("Checkpoint Timestep Interval")
        self.check_point_timestep_interval_entry = IntegerField(50, 4)
        
        self.check_point_bg = QButtonGroup(self)
        self.check_point_bg.addButton(self.check_point_interval_rb)
        self.check_point_bg.addButton(self.check_point_timestep_interval_rb)
        self.check_point_bg.buttonClicked.connect(self.on_checkpoint_rb_clicked)

        output_layout.addWidget(self.output_interval_rb, 0, 0)
        output_layout.addWidget(self.output_interval_entry, 0, 1)
        output_layout.addWidget(self.output_timestep_interval_rb, 1, 0)
        output_layout.addWidget(self.output_timestep_interval_entry, 1, 1)
        
        output_layout.addWidget(self.check_point_cycle_label, 2, 0)
        output_layout.addWidget(self.check_point_cycle_entry, 2, 1)
        
        output_layout.addWidget(self.check_point_interval_rb, 3, 0)
        output_layout.addWidget(self.check_point_interval_entry, 3, 1)
        output_layout.addWidget(self.check_point_timestep_interval_rb, 4, 0)
        output_layout.addWidget(self.check_point_timestep_interval_entry, 4, 1)

        output_group.setLayout(output_layout)
        main_layout.addWidget(output_group)

        self.setLayout(main_layout)

    def on_output_rb_clicked(self, button):
        if button == self.output_interval_rb:
            self.d_output_step = False
        else:
            self.d_output_step = True

    def on_checkpoint_rb_clicked(self, button):
        if button == self.check_point_interval_rb:
            self.d_check_step = False
        else:
            self.d_check_step = True

    def on_sim_comp_changed(self, text):
        if text == "Select one":
            return
        
        self.d_sim_type = text.lower()
        if self.d_parent:
            self.d_parent.update_tabs(self.d_sim_type)

    def refresh(self):
        pass

    def write_uintah(self, file, tab):
        if file is None:
            return

        tab1 = tab + "  "

        file.write(f"{tab}<Meta>\n")
        file.write(f"{tab1}<title> {self.title_entry.text()} </title>\n")
        file.write(f"{tab}</Meta>\n\n")

        file.write(f"{tab}<SimulationComponent type=\"{self.d_sim_type}\" />\n\n")
        
        file.write(f"{tab}<Time>\n")
        file.write(f"{tab1}<initTime> {self.init_time_entry.getValue()} </initTime>\n")
        file.write(f"{tab1}<maxTime> {self.max_time_entry.getValue()} </maxTime>\n")
        
        if self.max_nof_steps_entry.getValue() > 0:
            file.write(f"{tab1}<max_Timesteps> {self.max_nof_steps_entry.getValue()} </max_Timesteps>\n")
            
        file.write(f"{tab1}<delt_init> {self.delt_init_entry.getValue()} </delt_init>\n")
        file.write(f"{tab1}<delt_min> {self.delt_min_entry.getValue()} </delt_min>\n")
        file.write(f"{tab1}<delt_max> {self.delt_max_entry.getValue()} </delt_max>\n")
        file.write(f"{tab1}<max_delt_increase> {self.max_delt_inc_entry.getValue()} </max_delt_increase>\n")
        file.write(f"{tab1}<timestep_multiplier> {self.delt_multiplier_entry.getValue()} </timestep_multiplier>\n")
        file.write(f"{tab}</Time>\n\n")

        file.write(f"{tab}<DataArchiver>\n")
        file.write(f"{tab1}<filebase> {self.uda_filename_entry.text()} </filebase>\n")
        
        if self.d_output_step:
            file.write(f"{tab1}<outputTimestepInterval> {self.output_timestep_interval_entry.getValue()} </outputTimestepInterval>\n")
        else:
            file.write(f"{tab1}<outputInterval> {self.output_interval_entry.getValue()} </outputInterval>\n")
            
        if self.d_check_step:
            file.write(f"{tab1}<checkpoint cycle=\"{self.check_point_cycle_entry.getValue()}\" timestepInterval=\"{self.check_point_timestep_interval_entry.getValue()}\"/>\n")
        else:
            file.write(f"{tab1}<checkpoint cycle=\"{self.check_point_cycle_entry.getValue()}\" interval=\"{self.check_point_interval_entry.getValue()}\"/>\n")
