from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QCheckBox, QDoubleSpinBox, QSpinBox, QLineEdit
from PySide6.QtCore import Qt

class MPMFlagsNode:
    def __init__(self):
        self.name = "MPM settings"
        # Problem & interpolation
        self.simulation_dim = "3D"
        self.interpolator = "GIMP"
        self.cpdi_lcrit = 1.0e10

        # Deformation gradient
        self.defgrad_algorithm = "Taylor series"
        self.num_terms_series_defgrad = 5

        # General flags
        self.withICE = False
        self.doPressureStabilization = False
        self.fracture = False
        self.useCohesiveZones = False
        self.withColor = False
        self.computeScaleFactor = False
        self.doGridReset = False
        self.minMassForAcceleration = 3.0e-15

        # Interpolator specific
        self.nodes8or27 = 27
        self.useCPTI = False
        self.cpdiLcrit = 1.0e10

        # Boundary conditions
        self.useLoadCurves = False
        self.forceIncrementFactor = 1.0
        self.useCBDI = False

        # Damping / viscosity
        self.artificialViscosity = False
        self.artificialViscosityHeating = False
        self.artificialDampCoeff = 0.0
        self.artificialViscCoeff1 = 0.2
        self.artificialViscCoeff2 = 2.0

        # Particle deletion / erosion
        self.doErosion = False
        self.erosionAlgorithm = "NONE"
        self.createNewParticles = False
        self.deleteRogueParticles = True
        self.maxVel = 3.0e37
        self.minPartMass = 3.0e-15

        # Contact
        self.doContactFriction = False
        self.computeCollinearNormals = False
        self.addFrictionWork = False

        # Adding materials / particles
        self.canAddMPMMaterial = False
        self.addNewMaterial = False
        self.insertParticles = False
        self.insertParticlesFile = "dummy.part"

        # Prescribed deformation
        self.prescribeDeformation = False
        self.exactDeformation = False
        self.prescribedDeformationFile = "dummy.pres"

        # AMR
        self.AMR = False
        self.GEVelProj = False
        self.refineParticles = False
        self.minGridLevel = 0
        self.maxGridLevel = 1000

        # Rotation
        self.initializeStressFromBodyForce = False
        self.useCoordRotation = False
        self.coordRotationSpeed = 0.0
        self.coordRotationCenter = [0.0, 0.0, 0.0]
        self.coordRotationBodyRefPoint = [0.0, 0.0, 0.0]
        self.coordRotationAxis = [1.0, 0.0, 0.0]

        # MMS
        self.mmsType = "NONE"

        # Thermal
        self.computeNodalHeatFlux = False
        self.doExplicitHeatConduction = False
        self.doImplicitHeatConduction = False
        self.doTransientImplicitHeatConduction = False
        self.extraSolverFlushes = 0
        self.doThermalExpansion = False
        self.doScalarDiffusion = False

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
        layout.addWidget(QLabel("MPM settings"))
        # Problem type
        layout.addWidget(QLabel("Problem type"))
        cb = QComboBox()
        cb.addItems(["Plane stress","Plane strain","Axisymmetric","3D"])
        cb.setCurrentText(self.simulation_dim)
        cb.currentTextChanged.connect(lambda v: setattr(self,'simulation_dim', v))
        layout.addWidget(cb)

        # Interpolation
        layout.addWidget(QLabel("Interpolation type"))
        cb2 = QComboBox()
        cb2.addItems(["Linear","GIMP","CPDI","CPTI"])
        cb2.setCurrentText(self.interpolator)
        cb2.currentTextChanged.connect(lambda v: setattr(self,'interpolator', v))
        layout.addWidget(cb2)

        # CPDI critical length
        lcrit = QDoubleSpinBox()
        lcrit.setRange(0.0, 1e30)
        lcrit.setDecimals(6)
        lcrit.setValue(self.cpdi_lcrit)
        lcrit.valueChanged.connect(lambda v: setattr(self,'cpdi_lcrit', float(v)))
        layout.addWidget(QLabel("Critical length (if CPDI)"))
        layout.addWidget(lcrit)

        # Deformation gradient algorithm
        layout.addWidget(QLabel("Deformation gradient algorithm"))
        dg = QComboBox()
        dg.addItems(["First order","Subcycling","Taylor series"])
        dg.setCurrentText(self.defgrad_algorithm)
        dg.currentTextChanged.connect(lambda v: setattr(self, 'defgrad_algorithm', v))
        layout.addWidget(dg)
        nts = QSpinBox()
        nts.setRange(1, 100)
        nts.setValue(self.num_terms_series_defgrad)
        nts.valueChanged.connect(lambda v: setattr(self, 'num_terms_series_defgrad', int(v)))
        layout.addWidget(QLabel("Number of series terms (if Taylor series)"))
        layout.addWidget(nts)

        # Advanced settings toggle
        adv_chk = QCheckBox("Advanced settings ...")
        layout.addWidget(adv_chk)

        adv_container = QWidget()
        adv_layout = QVBoxLayout()
        adv_container.setLayout(adv_layout)
        adv_container.setVisible(False)
        layout.addWidget(adv_container)
        adv_chk.toggled.connect(lambda v: adv_container.setVisible(bool(v)))

        # General settings
        adv_layout.addWidget(QLabel("General settings"))
        g1 = QCheckBox("Solid-fluid coupling (withICE)")
        g1.setChecked(self.withICE)
        g1.stateChanged.connect(lambda s: setattr(self, 'withICE', s==Qt.Checked))
        adv_layout.addWidget(g1)
        g2 = QCheckBox("Pressure stabilization")
        g2.setChecked(self.doPressureStabilization)
        g2.stateChanged.connect(lambda s: setattr(self, 'doPressureStabilization', s==Qt.Checked))
        adv_layout.addWidget(g2)
        adv_layout.addWidget(QCheckBox("Fracture (not editable here)"))

        # Boundary condition settings
        adv_layout.addWidget(QLabel("Boundary condition flags"))
        bc1 = QCheckBox("Use load curves")
        bc1.setChecked(self.useLoadCurves)
        bc1.stateChanged.connect(lambda s: setattr(self, 'useLoadCurves', s==Qt.Checked))
        adv_layout.addWidget(bc1)
        cbd = QCheckBox("Use CBDI")
        cbd.setChecked(self.useCBDI)
        cbd.stateChanged.connect(lambda s: setattr(self, 'useCBDI', s==Qt.Checked))
        adv_layout.addWidget(cbd)
        fif = QDoubleSpinBox()
        fif.setRange(0.0, 1e6)
        fif.setValue(self.forceIncrementFactor)
        fif.valueChanged.connect(lambda v: setattr(self, 'forceIncrementFactor', float(v)))
        adv_layout.addWidget(QLabel("Force BC increment factor"))
        adv_layout.addWidget(fif)

        # Damping
        adv_layout.addWidget(QLabel("Damping / viscosity"))
        dv = QCheckBox("Artificial viscosity")
        dv.setChecked(self.artificialViscosity)
        dv.stateChanged.connect(lambda s: setattr(self, 'artificialViscosity', s==Qt.Checked))
        adv_layout.addWidget(dv)
        adv_damp = QDoubleSpinBox()
        adv_damp.setRange(0.0, 1e6)
        adv_damp.setDecimals(6)
        adv_damp.setValue(self.artificialDampCoeff)
        adv_damp.valueChanged.connect(lambda v: setattr(self, 'artificialDampCoeff', float(v)))
        adv_layout.addWidget(QLabel("Damping Coefficient"))
        adv_layout.addWidget(adv_damp)

        # Contact
        adv_layout.addWidget(QLabel("Contact flags"))
        cf1 = QCheckBox("Friction")
        cf1.setChecked(self.doContactFriction)
        cf1.stateChanged.connect(lambda s: setattr(self, 'doContactFriction', s==Qt.Checked))
        adv_layout.addWidget(cf1)

        # Rotation settings
        adv_layout.addWidget(QLabel("Rotating coordinates"))
        rot_chk = QCheckBox("Use coordinate rotation")
        rot_chk.setChecked(self.useCoordRotation)
        rot_chk.stateChanged.connect(lambda s: setattr(self, 'useCoordRotation', s==Qt.Checked))
        adv_layout.addWidget(rot_chk)
        rot_speed = QDoubleSpinBox()
        rot_speed.setRange(0.0, 1e6)
        rot_speed.setDecimals(6)
        rot_speed.setValue(self.coordRotationSpeed)
        rot_speed.valueChanged.connect(lambda v: setattr(self, 'coordRotationSpeed', float(v)))
        adv_layout.addWidget(QLabel("Angular velocity (rad/s)"))
        adv_layout.addWidget(rot_speed)

        # Prescribed deformation
        adv_layout.addWidget(QLabel("Prescribed deformation"))
        pd_chk = QCheckBox("Prescribe deformation")
        pd_chk.setChecked(self.prescribeDeformation)
        pd_chk.stateChanged.connect(lambda s: setattr(self, 'prescribeDeformation', s==Qt.Checked))
        adv_layout.addWidget(pd_chk)
        pdf = QLineEdit(self.prescribedDeformationFile)
        pdf.textChanged.connect(lambda v: setattr(self, 'prescribedDeformationFile', v))
        adv_layout.addWidget(QLabel("Deformation file"))
        adv_layout.addWidget(pdf)

        # AMR
        adv_layout.addWidget(QLabel("Adaptive mesh refinement"))
        amr_chk = QCheckBox("AMR")
        amr_chk.setChecked(self.AMR)
        amr_chk.stateChanged.connect(lambda s: setattr(self, 'AMR', s==Qt.Checked))
        adv_layout.addWidget(amr_chk)
        amr_min = QSpinBox()
        amr_min.setRange(0, 10000)
        amr_min.setValue(self.minGridLevel)
        amr_min.valueChanged.connect(lambda v: setattr(self, 'minGridLevel', int(v)))
        adv_layout.addWidget(QLabel("Min grid level"))
        adv_layout.addWidget(amr_min)
        amr_max = QSpinBox()
        amr_max.setRange(0, 10000)
        amr_max.setValue(self.maxGridLevel)
        amr_max.valueChanged.connect(lambda v: setattr(self, 'maxGridLevel', int(v)))
        adv_layout.addWidget(QLabel("Max grid level"))
        adv_layout.addWidget(amr_max)

        # Deletion / erosion
        adv_layout.addWidget(QLabel("Particle deletion / erosion"))
        del_chk = QCheckBox("Delete rogue particles")
        del_chk.setChecked(self.deleteRogueParticles)
        del_chk.stateChanged.connect(lambda s: setattr(self, 'deleteRogueParticles', s==Qt.Checked))
        adv_layout.addWidget(del_chk)
        mv = QDoubleSpinBox()
        mv.setRange(0.0, 1e40)
        mv.setDecimals(6)
        mv.setValue(self.maxVel)
        mv.valueChanged.connect(lambda v: setattr(self, 'maxVel', float(v)))
        adv_layout.addWidget(QLabel("Max. velocity"))
        adv_layout.addWidget(mv)

        # Thermal & diffusion
        adv_layout.addWidget(QLabel("Thermal & diffusion"))
        th_chk = QCheckBox("Thermal expansion")
        th_chk.setChecked(self.doThermalExpansion)
        th_chk.stateChanged.connect(lambda s: setattr(self, 'doThermalExpansion', s==Qt.Checked))
        adv_layout.addWidget(th_chk)
        df_chk = QCheckBox("Scalar diffusion")
        df_chk.setChecked(self.doScalarDiffusion)
        df_chk.stateChanged.connect(lambda s: setattr(self, 'doScalarDiffusion', s==Qt.Checked))
        adv_layout.addWidget(df_chk)

    def write_vaango(self, file, tab="  "):
        if file is None:
            return
        tab1 = tab + "  "
        file.write(f"{tab}<MPMSettings>\n")
        file.write(f"{tab1}<problem_type> {self.simulation_dim} </problem_type>\n")
        file.write(f"{tab1}<interpolator> {self.interpolator} </interpolator>\n")
        file.write(f"{tab1}<cpdi_critical_length> {self.cpdi_lcrit} </cpdi_critical_length>\n")

        # General flags
        file.write(f"{tab1}<withICE> {str(bool(self.withICE)).lower()} </withICE>\n")
        file.write(f"{tab1}<doPressureStabilization> {str(bool(self.doPressureStabilization)).lower()} </doPressureStabilization>\n")
        file.write(f"{tab1}<fracture> {str(bool(self.fracture)).lower()} </fracture>\n")
        file.write(f"{tab1}<useCohesiveZones> {str(bool(self.useCohesiveZones)).lower()} </useCohesiveZones>\n")

        # Boundary / BC
        file.write(f"{tab1}<useLoadCurves> {str(bool(self.useLoadCurves)).lower()} </useLoadCurves>\n")
        file.write(f"{tab1}<useCBDI> {str(bool(self.useCBDI)).lower()} </useCBDI>\n")
        file.write(f"{tab1}<forceIncrementFactor> {self.forceIncrementFactor} </forceIncrementFactor>\n")

        # Damping / viscosity
        file.write(f"{tab1}<artificialViscosity> {str(bool(self.artificialViscosity)).lower()} </artificialViscosity>\n")
        file.write(f"{tab1}<artificialViscCoeff1> {self.artificialViscCoeff1} </artificialViscCoeff1>\n")
        file.write(f"{tab1}<artificialViscCoeff2> {self.artificialViscCoeff2} </artificialViscCoeff2>\n")

        # Deletion / erosion
        file.write(f"{tab1}<deleteRogueParticles> {str(bool(self.deleteRogueParticles)).lower()} </deleteRogueParticles>\n")
        file.write(f"{tab1}<maxVel> {self.maxVel} </maxVel>\n")
        file.write(f"{tab1}<minPartMass> {self.minPartMass} </minPartMass>\n")

        # AMR
        file.write(f"{tab1}<AMR> {str(bool(self.AMR)).lower()} </AMR>\n")
        file.write(f"{tab1}<minGridLevel> {self.minGridLevel} </minGridLevel>\n")
        file.write(f"{tab1}<maxGridLevel> {self.maxGridLevel} </maxGridLevel>\n")

        # Rotation
        file.write(f"{tab1}<useCoordRotation> {str(bool(self.useCoordRotation)).lower()} </useCoordRotation>\n")
        file.write(f"{tab1}<coordRotationSpeed> {self.coordRotationSpeed} </coordRotationSpeed>\n")

        # Thermal
        file.write(f"{tab1}<doThermalExpansion> {str(bool(self.doThermalExpansion)).lower()} </doThermalExpansion>\n")
        file.write(f"{tab1}<doScalarDiffusion> {str(bool(self.doScalarDiffusion)).lower()} </doScalarDiffusion>\n")

        file.write(f"{tab}</MPMSettings>\n\n")
