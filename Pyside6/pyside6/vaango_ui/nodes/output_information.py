from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QLineEdit, QSpinBox, QDoubleSpinBox, QCheckBox
from PySide6.QtCore import Qt

class OutputInformationNode:
    def __init__(self):
        self.name = "Output information"
        self.output_uda_file = "output.uda"
        self.time_interval = 1.0
        self.timestep_interval = 1
        self.checkpoint_cycle = 0
        self.checkpoint_time_interval = self.time_interval * 5.0
        self.checkpoint_timestep_interval = int(self.timestep_interval * 5)

        # Summed reduction variables
        self.summed_kineticEnergy = False
        self.summed_totalStrainEnergy = False
        self.summed_accStrainEnergy = False
        self.summed_momentum = False
        self.summed_totalMass = False
        self.summed_centerOfMass = False

        # MPM particle variables
        self.p_particleID = False
        self.p_position = False
        self.p_mass = False
        self.p_volume = False
        self.p_temperature = False
        self.p_deformationGradient = False
        self.p_displacement = False
        self.p_velocity = False
        self.p_stress = False
        self.p_externalForce = False
        self.p_strainRate = False
        self.p_localized = False
        self.p_damage = False
        self.p_porosity = False
        self.p_plasticStrain = False
        self.p_plasticStrainRate = False

        # MPM grid variables
        self.g_mass = False
        self.g_volume = False
        self.g_velocity = False
        self.g_stress = False
        self.g_acceleration = False

        # ICE cell-centered variables
        self.cc_density = False
        self.cc_temperature = False
        self.cc_velocity = False
        self.cc_spVolume = False
        self.cc_volFrac = False
        self.cc_pressure = False
        self.cc_equilPressure = False
        self.cc_intEnergyL = False
        self.cc_intEnergySource = False
        self.cc_Tdot = False
        self.cc_momentumL = False
        self.cc_momentumSource = False
        self.cc_delPDilatate = False

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

        layout.addWidget(QLabel("Checkpoint time interval (s)"))
        cti = QDoubleSpinBox()
        cti.setRange(0.0, 1e9)
        cti.setValue(self.checkpoint_time_interval)
        cti.valueChanged.connect(lambda v: setattr(self, 'checkpoint_time_interval', float(v)))
        layout.addWidget(cti)

        layout.addWidget(QLabel("Checkpoint timestep interval"))
        ctsi = QSpinBox()
        ctsi.setRange(0, 100000000)
        ctsi.setValue(self.checkpoint_timestep_interval)
        ctsi.valueChanged.connect(lambda v: setattr(self, 'checkpoint_timestep_interval', int(v)))
        layout.addWidget(ctsi)

        # Summed reduction variables
        layout.addWidget(QLabel("Variables to save - Summed"))
        svs = [
            ("Kinetic energy", 'summed_kineticEnergy'),
            ("Total strain energy", 'summed_totalStrainEnergy'),
            ("Accumulated strain energy", 'summed_accStrainEnergy'),
            ("Momentum", 'summed_momentum'),
            ("Total mass", 'summed_totalMass'),
            ("Center of mass", 'summed_centerOfMass')
        ]
        for label, attr in svs:
            cb = QCheckBox(label)
            cb.setChecked(getattr(self, attr))
            cb.toggled.connect(lambda v, a=attr: setattr(self, a, bool(v)))
            layout.addWidget(cb)

        # MPM particle variables
        layout.addWidget(QLabel("MPM particle variables"))
        p_items = [
            ("Particle ID", 'p_particleID'), ('Position', 'p_position'), ('Mass', 'p_mass'),
            ('Volume', 'p_volume'), ('Temperature', 'p_temperature'), ('Deformation gradient', 'p_deformationGradient'),
            ('Displacement', 'p_displacement'), ('Velocity', 'p_velocity'), ('Stress', 'p_stress'),
            ('External force', 'p_externalForce'), ('Strain rate', 'p_strainRate'), ('Failed flag', 'p_localized'),
            ('Damage', 'p_damage'), ('Porosity', 'p_porosity'), ('Plastic strain', 'p_plasticStrain'),
            ('Plastic strain rate', 'p_plasticStrainRate')
        ]
        for label, attr in p_items:
            cb = QCheckBox(label)
            cb.setChecked(getattr(self, attr))
            cb.toggled.connect(lambda v, a=attr: setattr(self, a, bool(v)))
            layout.addWidget(cb)

        # MPM grid variables
        layout.addWidget(QLabel("MPM grid variables"))
        g_items = [
            ("Mass", 'g_mass'), ('Volume', 'g_volume'), ('Velocity', 'g_velocity'),
            ('Stress', 'g_stress'), ('Acceleration', 'g_acceleration')
        ]
        for label, attr in g_items:
            cb = QCheckBox(label)
            cb.setChecked(getattr(self, attr))
            cb.toggled.connect(lambda v, a=attr: setattr(self, a, bool(v)))
            layout.addWidget(cb)

        # ICE cell-centered variables
        layout.addWidget(QLabel("ICE cell-centered variables"))
        cc_items = [
            ("Density", 'cc_density'), ('Temperature', 'cc_temperature'), ('Velocity', 'cc_velocity'),
            ('Specific volume', 'cc_spVolume'), ('Volume fraction', 'cc_volFrac'), ('Pressure', 'cc_pressure'),
            ('Equilibration pressure', 'cc_equilPressure'), ('Lagrangian internal energy', 'cc_intEnergyL'),
            ('Internal energy source', 'cc_intEnergySource'), ('Temperature rate', 'cc_Tdot'),
            ('Lagrangian momentum', 'cc_momentumL'), ('Momentum source', 'cc_momentumSource'),
            ('Dilatation pressure increment', 'cc_delPDilatate')
        ]
        for label, attr in cc_items:
            cb = QCheckBox(label)
            cb.setChecked(getattr(self, attr))
            cb.toggled.connect(lambda v, a=attr: setattr(self, a, bool(v)))
            layout.addWidget(cb)

    def write_vaango(self, file, tab="  "):
        if file is None:
            return
        tab1 = tab + "  "
        file.write(f"{tab}<DataArchiver>\n")
        file.write(f"{tab1}<filebase> {self.output_uda_file} </filebase>\n")
        # Prefer timestep interval if > 0
        if int(self.timestep_interval) > 0:
            file.write(f"{tab1}<outputTimestepInterval> {self.timestep_interval} </outputTimestepInterval>\n")
        else:
            file.write(f"{tab1}<outputInterval> {self.time_interval} </outputInterval>\n")

        # Checkpoint specification: prefer timestep-interval if set
        if int(self.checkpoint_cycle) > 0:
            if int(self.checkpoint_timestep_interval) > 0:
                file.write(f"{tab1}<checkpoint cycle=\"{self.checkpoint_cycle}\" timestepInterval=\"{self.checkpoint_timestep_interval}\"/>\n")
            else:
                file.write(f"{tab1}<checkpoint cycle=\"{self.checkpoint_cycle}\" interval=\"{self.checkpoint_time_interval}\"/>\n")
        else:
            # still write checkpoint element with defaults
            if int(self.checkpoint_timestep_interval) > 0:
                file.write(f"{tab1}<checkpoint cycle=\"{self.checkpoint_cycle}\" timestepInterval=\"{self.checkpoint_timestep_interval}\"/>\n")
            else:
                file.write(f"{tab1}<checkpoint cycle=\"{self.checkpoint_cycle}\" interval=\"{self.checkpoint_time_interval}\"/>\n")

        # Variables
        file.write(f"{tab1}<variables>\n")
        # Summed
        file.write(f"{tab1}  <summed>\n")
        if self.summed_kineticEnergy:
            file.write(f"{tab1}    <kineticEnergy/>\n")
        if self.summed_totalStrainEnergy:
            file.write(f"{tab1}    <totalStrainEnergy/>\n")
        if self.summed_accStrainEnergy:
            file.write(f"{tab1}    <accStrainEnergy/>\n")
        if self.summed_momentum:
            file.write(f"{tab1}    <momentum/>\n")
        if self.summed_totalMass:
            file.write(f"{tab1}    <totalMass/>\n")
        if self.summed_centerOfMass:
            file.write(f"{tab1}    <centerOfMass/>\n")
        file.write(f"{tab1}  </summed>\n")

        # MPM particles
        file.write(f"{tab1}  <MPMParticles>\n")
        if self.p_particleID: file.write(f"{tab1}    <particleID/>\n")
        if self.p_position: file.write(f"{tab1}    <position/>\n")
        if self.p_mass: file.write(f"{tab1}    <mass/>\n")
        if self.p_volume: file.write(f"{tab1}    <volume/>\n")
        if self.p_temperature: file.write(f"{tab1}    <temperature/>\n")
        if self.p_deformationGradient: file.write(f"{tab1}    <deformationGradient/>\n")
        if self.p_displacement: file.write(f"{tab1}    <displacement/>\n")
        if self.p_velocity: file.write(f"{tab1}    <velocity/>\n")
        if self.p_stress: file.write(f"{tab1}    <stress/>\n")
        if self.p_externalForce: file.write(f"{tab1}    <externalForce/>\n")
        if self.p_strainRate: file.write(f"{tab1}    <strainRate/>\n")
        if self.p_localized: file.write(f"{tab1}    <localized/>\n")
        if self.p_damage: file.write(f"{tab1}    <damage/>\n")
        if self.p_porosity: file.write(f"{tab1}    <porosity/>\n")
        if self.p_plasticStrain: file.write(f"{tab1}    <plasticStrain/>\n")
        if self.p_plasticStrainRate: file.write(f"{tab1}    <plasticStrainRate/>\n")
        file.write(f"{tab1}  </MPMParticles>\n")

        # MPM grid
        file.write(f"{tab1}  <MPMGrid>\n")
        if self.g_mass: file.write(f"{tab1}    <mass/>\n")
        if self.g_volume: file.write(f"{tab1}    <volume/>\n")
        if self.g_velocity: file.write(f"{tab1}    <velocity/>\n")
        if self.g_stress: file.write(f"{tab1}    <stress/>\n")
        if self.g_acceleration: file.write(f"{tab1}    <acceleration/>\n")
        file.write(f"{tab1}  </MPMGrid>\n")

        # ICE cell-centered
        file.write(f"{tab1}  <ICECellCentered>\n")
        if self.cc_density: file.write(f"{tab1}    <density/>\n")
        if self.cc_temperature: file.write(f"{tab1}    <temperature/>\n")
        if self.cc_velocity: file.write(f"{tab1}    <velocity/>\n")
        if self.cc_spVolume: file.write(f"{tab1}    <spVolume/>\n")
        if self.cc_volFrac: file.write(f"{tab1}    <volFrac/>\n")
        if self.cc_pressure: file.write(f"{tab1}    <pressure/>\n")
        if self.cc_equilPressure: file.write(f"{tab1}    <equilPressure/>\n")
        if self.cc_intEnergyL: file.write(f"{tab1}    <intEnergyL/>\n")
        if self.cc_intEnergySource: file.write(f"{tab1}    <intEnergySource/>\n")
        if self.cc_Tdot: file.write(f"{tab1}    <Tdot/>\n")
        if self.cc_momentumL: file.write(f"{tab1}    <momentumL/>\n")
        if self.cc_momentumSource: file.write(f"{tab1}    <momentumSource/>\n")
        if self.cc_delPDilatate: file.write(f"{tab1}    <delPDilatate/>\n")
        file.write(f"{tab1}  </ICECellCentered>\n")

        file.write(f"{tab1}</variables>\n")

        file.write(f"{tab}</DataArchiver>\n\n")
