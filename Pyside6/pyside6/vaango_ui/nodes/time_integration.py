from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QDoubleSpinBox, QComboBox, QCheckBox, QSpinBox
from PySide6.QtCore import Qt

class TimeIntegrationNode:
    def __init__(self):
        self.name = "Time integration"
        self.start_time = 0.0
        self.end_time = 1.0
        self.integration_type = "Explicit"
        self.multiplier = 1.0

        # Implicit-specific
        self.dynamics_type = "Quasistatic"
        self.solver_type = "Simple"
        self.disp_tolerance = 1e-6
        self.energy_tolerance = 1e-6
        self.max_iter_before_timestep_decrease = 10
        self.timestep_decrease_factor = 0.5
        self.min_iter_before_timestep_increase = 1
        self.timestep_increase_factor = 1.1
        self.max_iter_before_timestep_restart = 50

        # More settings
        self.max_timesteps = 10000
        self.initial_timestep = 1e-3
        self.min_timestep = 1e-12
        self.max_timestep = 1.0
        self.max_increase_factor = 2.0

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

        # Explicit: multiplier
        mul_label = QLabel("Timestep multiplier")
        mul_spin = QDoubleSpinBox()
        mul_spin.setRange(0.0, 1e6)
        mul_spin.setDecimals(6)
        mul_spin.setValue(self.multiplier)
        mul_spin.valueChanged.connect(lambda v: setattr(self, 'multiplier', float(v)))
        layout.addWidget(mul_label)
        layout.addWidget(mul_spin)

        # Implicit controls
        layout.addWidget(QLabel("-- Implicit settings --"))
        dyn_cb = QComboBox()
        dyn_cb.addItems(["Quasistatic","Dynamic","Transient"])
        dyn_cb.setCurrentText(self.dynamics_type)
        dyn_cb.currentTextChanged.connect(lambda v: setattr(self, 'dynamics_type', v))
        layout.addWidget(QLabel("Dynamics type"))
        layout.addWidget(dyn_cb)

        solver_cb = QComboBox()
        solver_cb.addItems(["Simple","PetSc","Hypre"])
        solver_cb.setCurrentText(self.solver_type)
        solver_cb.currentTextChanged.connect(lambda v: setattr(self, 'solver_type', v))
        layout.addWidget(QLabel("Solver type"))
        layout.addWidget(solver_cb)

        layout.addWidget(QLabel("Convergence Tolerance"))
        layout.addWidget(QLabel("Displacement norm"))
        dt_spin = QDoubleSpinBox()
        dt_spin.setRange(0.0, 1.0)
        dt_spin.setDecimals(8)
        dt_spin.setValue(self.disp_tolerance)
        dt_spin.valueChanged.connect(lambda v: setattr(self, 'disp_tolerance', float(v)))
        layout.addWidget(dt_spin)
        layout.addWidget(QLabel("Energy norm"))
        et_spin = QDoubleSpinBox()
        et_spin.setRange(0.0, 1.0)
        et_spin.setDecimals(8)
        et_spin.setValue(self.energy_tolerance)
        et_spin.valueChanged.connect(lambda v: setattr(self, 'energy_tolerance', float(v)))
        layout.addWidget(et_spin)

        layout.addWidget(QLabel("Timestep decrease"))
        mid_spin = QSpinBox()
        mid_spin.setRange(0, 1000000)
        mid_spin.setValue(self.max_iter_before_timestep_decrease)
        mid_spin.valueChanged.connect(lambda v: setattr(self, 'max_iter_before_timestep_decrease', int(v)))
        layout.addWidget(QLabel("Max iterations before"))
        layout.addWidget(mid_spin)
        tdec_spin = QDoubleSpinBox()
        tdec_spin.setRange(0.0, 10.0)
        tdec_spin.setDecimals(6)
        tdec_spin.setValue(self.timestep_decrease_factor)
        tdec_spin.valueChanged.connect(lambda v: setattr(self, 'timestep_decrease_factor', float(v)))
        layout.addWidget(QLabel("Decrease factor"))
        layout.addWidget(tdec_spin)

        layout.addWidget(QLabel("Timestep increase"))
        minit_spin = QSpinBox()
        minit_spin.setRange(0, 1000000)
        minit_spin.setValue(self.min_iter_before_timestep_increase)
        minit_spin.valueChanged.connect(lambda v: setattr(self, 'min_iter_before_timestep_increase', int(v)))
        layout.addWidget(QLabel("Max iterations before"))
        layout.addWidget(minit_spin)
        tinc_spin = QDoubleSpinBox()
        tinc_spin.setRange(0.0, 10.0)
        tinc_spin.setDecimals(6)
        tinc_spin.setValue(self.timestep_increase_factor)
        tinc_spin.valueChanged.connect(lambda v: setattr(self, 'timestep_increase_factor', float(v)))
        layout.addWidget(QLabel("Increase factor"))
        layout.addWidget(tinc_spin)

        layout.addWidget(QLabel("Timestep restart"))
        mst_spin = QSpinBox()
        mst_spin.setRange(0, 1000000)
        mst_spin.setValue(self.max_iter_before_timestep_restart)
        mst_spin.valueChanged.connect(lambda v: setattr(self, 'max_iter_before_timestep_restart', int(v)))
        layout.addWidget(QLabel("Max iterations before"))
        layout.addWidget(mst_spin)

        # More settings checkbox and fields
        more_chk = QCheckBox("More settings...")
        layout.addWidget(more_chk)

        max_ts_spin = QSpinBox()
        max_ts_spin.setRange(0, 100000000)
        max_ts_spin.setValue(self.max_timesteps)
        max_ts_spin.valueChanged.connect(lambda v: setattr(self, 'max_timesteps', int(v)))
        init_dt = QDoubleSpinBox()
        init_dt.setRange(0.0, 1e9)
        init_dt.setDecimals(12)
        init_dt.setValue(self.initial_timestep)
        init_dt.valueChanged.connect(lambda v: setattr(self, 'initial_timestep', float(v)))
        min_dt = QDoubleSpinBox()
        min_dt.setRange(0.0, 1e9)
        min_dt.setDecimals(12)
        min_dt.setValue(self.min_timestep)
        min_dt.valueChanged.connect(lambda v: setattr(self, 'min_timestep', float(v)))
        max_dt = QDoubleSpinBox()
        max_dt.setRange(0.0, 1e9)
        max_dt.setDecimals(12)
        max_dt.setValue(self.max_timestep)
        max_dt.valueChanged.connect(lambda v: setattr(self, 'max_timestep', float(v)))
        max_if = QDoubleSpinBox()
        max_if.setRange(1.0, 1e6)
        max_if.setDecimals(6)
        max_if.setValue(self.max_increase_factor)
        max_if.valueChanged.connect(lambda v: setattr(self, 'max_increase_factor', float(v)))

        # Pack more fields but hide by default
        layout.addWidget(QLabel("Maximum timesteps"))
        layout.addWidget(max_ts_spin)
        layout.addWidget(QLabel("Initial timestep size (s)"))
        layout.addWidget(init_dt)
        layout.addWidget(QLabel("Minimum timestep size (s)"))
        layout.addWidget(min_dt)
        layout.addWidget(QLabel("Maximum timestep size (s)"))
        layout.addWidget(max_dt)
        layout.addWidget(QLabel("Maximum timestep increase factor"))
        layout.addWidget(max_if)

        # show/hide logic for more settings
        def toggle_more(checked):
            max_ts_spin.setVisible(checked)
            init_dt.setVisible(checked)
            min_dt.setVisible(checked)
            max_dt.setVisible(checked)
            max_if.setVisible(checked)
        more_chk.toggled.connect(toggle_more)
        toggle_more(False)

    def write_vaango(self, file, tab="  "):
        if file is None:
            return
        tab1 = tab + "  "
        file.write(f"{tab}<TimeIntegration>\n")
        file.write(f"{tab1}<initTime> {self.start_time} </initTime>\n")
        file.write(f"{tab1}<maxTime> {self.end_time} </maxTime>\n")
        file.write(f"{tab1}<integration_type> {self.integration_type} </integration_type>\n")
        file.write(f"{tab1}<multiplier> {self.multiplier} </multiplier>\n")

        # Implicit/solver settings
        file.write(f"{tab1}<dynamics_type> {self.dynamics_type} </dynamics_type>\n")
        file.write(f"{tab1}<solver_type> {self.solver_type} </solver_type>\n")
        file.write(f"{tab1}<disp_tolerance> {self.disp_tolerance} </disp_tolerance>\n")
        file.write(f"{tab1}<energy_tolerance> {self.energy_tolerance} </energy_tolerance>\n")
        file.write(f"{tab1}<max_iter_before_timestep_decrease> {self.max_iter_before_timestep_decrease} </max_iter_before_timestep_decrease>\n")
        file.write(f"{tab1}<timestep_decrease_factor> {self.timestep_decrease_factor} </timestep_decrease_factor>\n")
        file.write(f"{tab1}<min_iter_before_timestep_increase> {self.min_iter_before_timestep_increase} </min_iter_before_timestep_increase>\n")
        file.write(f"{tab1}<timestep_increase_factor> {self.timestep_increase_factor} </timestep_increase_factor>\n")
        file.write(f"{tab1}<max_iter_before_timestep_restart> {self.max_iter_before_timestep_restart} </max_iter_before_timestep_restart>\n")

        # More settings
        file.write(f"{tab1}<max_timesteps> {self.max_timesteps} </max_timesteps>\n")
        file.write(f"{tab1}<initial_timestep> {self.initial_timestep} </initial_timestep>\n")
        file.write(f"{tab1}<min_timestep> {self.min_timestep} </min_timestep>\n")
        file.write(f"{tab1}<max_timestep> {self.max_timestep} </max_timestep>\n")
        file.write(f"{tab1}<max_increase_factor> {self.max_increase_factor} </max_increase_factor>\n")

        file.write(f"{tab}</TimeIntegration>\n\n")
