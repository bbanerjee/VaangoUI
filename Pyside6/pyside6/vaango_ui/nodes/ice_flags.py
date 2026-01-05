from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel, QComboBox, QCheckBox, QDoubleSpinBox, QSpinBox
from PySide6.QtCore import Qt

class ICEFlagsNode:
    def __init__(self):
        self.name = "ICE settings"
        self.algorithm = "Total form"
        self.advection = "Second order"
        self.do_compatible_fluxes = False
        self.clamp_specific_volume = False
        # advanced
        self.cfl_number = 0.25
        self.max_equilibrium_iters = 1000
        self.min_grid_level = 0
        self.max_grid_level = 1000

        # heat addition
        self.do_heat_addition = False
        self.add_heat_start_time = 0.0
        self.add_heat_end_time = 1.0e-3
        self.number_of_add_heat_materials = 0
        self.add_heat_material = []  # list of (materialID:int, coeff:float)

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

        # Advanced settings toggle
        adv_chk = QCheckBox("Advanced settings ...")
        layout.addWidget(adv_chk)

        # Advanced settings widgets (hidden by default)
        adv_container = QWidget()
        adv_layout = QVBoxLayout()
        adv_container.setLayout(adv_layout)
        adv_container.setVisible(False)
        layout.addWidget(adv_container)

        adv_chk.toggled.connect(lambda v: adv_container.setVisible(bool(v)))

        adv_layout.addWidget(QLabel("CFL number"))
        cfl_spin = QDoubleSpinBox()
        cfl_spin.setRange(0.0, 10.0)
        cfl_spin.setDecimals(6)
        cfl_spin.setValue(self.cfl_number)
        cfl_spin.valueChanged.connect(lambda v: setattr(self, 'cfl_number', float(v)))
        adv_layout.addWidget(cfl_spin)

        adv_layout.addWidget(QLabel("Max. equilibrium iterations"))
        mei = QSpinBox()
        mei.setRange(0, 1000000)
        mei.setValue(self.max_equilibrium_iters)
        mei.valueChanged.connect(lambda v: setattr(self, 'max_equilibrium_iters', int(v)))
        adv_layout.addWidget(mei)

        adv_layout.addWidget(QLabel("Min. grid level"))
        min_lvl = QSpinBox()
        min_lvl.setRange(0, 1000000)
        min_lvl.setValue(self.min_grid_level)
        min_lvl.valueChanged.connect(lambda v: setattr(self, 'min_grid_level', int(v)))
        adv_layout.addWidget(min_lvl)

        adv_layout.addWidget(QLabel("Max. grid level"))
        max_lvl = QSpinBox()
        max_lvl.setRange(0, 1000000)
        max_lvl.setValue(self.max_grid_level)
        max_lvl.valueChanged.connect(lambda v: setattr(self, 'max_grid_level', int(v)))
        adv_layout.addWidget(max_lvl)

        # Heat addition
        heat_chk = QCheckBox("Heat addition?")
        heat_chk.setChecked(self.do_heat_addition)
        heat_chk.stateChanged.connect(lambda s: setattr(self, 'do_heat_addition', s==Qt.Checked))
        layout.addWidget(heat_chk)

        # Heat addition container
        heat_container = QWidget()
        heat_layout = QVBoxLayout()
        heat_container.setLayout(heat_layout)
        heat_container.setVisible(bool(self.do_heat_addition))
        layout.addWidget(heat_container)

        heat_chk.toggled.connect(lambda v: heat_container.setVisible(bool(v)))

        heat_layout.addWidget(QLabel("Heat addition start time"))
        hs = QDoubleSpinBox()
        hs.setRange(0.0, 1e9)
        hs.setDecimals(8)
        hs.setValue(self.add_heat_start_time)
        hs.valueChanged.connect(lambda v: setattr(self, 'add_heat_start_time', float(v)))
        heat_layout.addWidget(hs)

        heat_layout.addWidget(QLabel("Heat addition end time"))
        he = QDoubleSpinBox()
        he.setRange(0.0, 1e9)
        he.setDecimals(8)
        he.setValue(self.add_heat_end_time)
        he.valueChanged.connect(lambda v: setattr(self, 'add_heat_end_time', float(v)))
        heat_layout.addWidget(he)

        heat_layout.addWidget(QLabel("Number of heated materials"))
        nhm = QSpinBox()
        nhm.setRange(0, 1000)
        nhm.setValue(self.number_of_add_heat_materials)
        def on_nhm(v):
            self.number_of_add_heat_materials = int(v)
            # resize material list
            while len(self.add_heat_material) < self.number_of_add_heat_materials:
                self.add_heat_material.append((0, 8.0e10))
            while len(self.add_heat_material) > self.number_of_add_heat_materials:
                self.add_heat_material.pop()
        nhm.valueChanged.connect(on_nhm)
        heat_layout.addWidget(nhm)

        # material entries
        for i in range(max(0, self.number_of_add_heat_materials)):
            mid_spin = QSpinBox()
            mid_spin.setRange(0, 1000000)
            coeff_spin = QDoubleSpinBox()
            coeff_spin.setRange(0.0, 1e30)
            coeff_spin.setDecimals(6)
            mat = (0, 8.0e10)
            if i < len(self.add_heat_material):
                mat = self.add_heat_material[i]
            mid_spin.setValue(mat[0])
            coeff_spin.setValue(mat[1])
            def make_on_change(idx, mspin, cspin):
                return lambda _: self._update_add_heat_material(idx, int(mspin.value()), float(cspin.value()))
            mconn = make_on_change(i, mid_spin, coeff_spin)
            mid_spin.valueChanged.connect(mconn)
            coeff_spin.valueChanged.connect(mconn)
            heat_layout.addWidget(QLabel(f"Material ID {i}"))
            heat_layout.addWidget(mid_spin)
            heat_layout.addWidget(QLabel(f"Heat energy coefficient {i}"))
            heat_layout.addWidget(coeff_spin)

    def write_vaango(self, file, tab="  "):
        if file is None:
            return
        tab1 = tab + "  "
        file.write(f"{tab}<ICESettings>\n")
        file.write(f"{tab1}<algorithm> {self.algorithm} </algorithm>\n")
        file.write(f"{tab1}<advection> {self.advection} </advection>\n")
        file.write(f"{tab1}<compatible_fluxes> {str(bool(self.do_compatible_fluxes)).lower()} </compatible_fluxes>\n")
        file.write(f"{tab1}<clamp_specific_volume> {str(bool(self.clamp_specific_volume)).lower()} </clamp_specific_volume>\n")
        # Advanced
        file.write(f"{tab1}<cflNumber> {self.cfl_number} </cflNumber>\n")
        file.write(f"{tab1}<maxEquilibriumIters> {self.max_equilibrium_iters} </maxEquilibriumIters>\n")
        file.write(f"{tab1}<minGridLevel> {self.min_grid_level} </minGridLevel>\n")
        file.write(f"{tab1}<maxGridLevel> {self.max_grid_level} </maxGridLevel>\n")

        # Heat addition
        file.write(f"{tab1}<doHeatAddition> {str(bool(self.do_heat_addition)).lower()} </doHeatAddition>\n")
        if self.do_heat_addition:
            file.write(f"{tab1}<heatAddition start=\"{self.add_heat_start_time}\" end=\"{self.add_heat_end_time}\">\n")
            for mat in self.add_heat_material:
                file.write(f"{tab1}  <material id=\"{mat[0]}\" coeff=\"{mat[1]}\"/>\n")
            file.write(f"{tab1}</heatAddition>\n")

        file.write(f"{tab}</ICESettings>\n\n")

    def _update_add_heat_material(self, idx: int, material_id: int, coeff: float):
        # ensure list large enough
        while len(self.add_heat_material) <= idx:
            self.add_heat_material.append((0, 8.0e10))
        self.add_heat_material[idx] = (int(material_id), float(coeff))
