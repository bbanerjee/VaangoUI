from PySide6.QtWidgets import (QWidget, QLabel, QCheckBox, QGridLayout, QVBoxLayout, QGroupBox)

class VariableSaveInputPanel(QWidget):
    def __init__(self):
        super().__init__()
        
        self.d_summed_var_data = [
            ("Kinetic Energy", "KineticEnergy"),
            ("Inc. Strain Energy", "StrainEnergy"),
            ("Total Strain Energy", "AccStrainEnergy"),
            ("Mass", "TotalMass"),
            ("Center of Mass", "CenterOfMassPosition")
        ]
        
        self.d_part_var_data = [
            ("Particle ID", "p.particleID"),
            ("Position", "p.x"),
            ("Mass", "p.mass"),
            ("Volume", "p.volume"),
            ("Temperature", "p.temperature"),
            ("Def. Gradient", "p.deformationGradient"),
            ("Displacement", "p.displacement"),
            ("Velocity", "p.velocity"),
            ("Stress", "p.stress"),
            ("External Force", "p.externalforce"),
            ("Strain Rate", "p.strainRate"),
            ("Failed Particles", "p.localized"),
            ("Damage", "p.damage"),
            ("Porosity", "p.porosity"),
            ("Plastic Strain", "p.plasticStrain"),
            ("Plastic Strain Rate", "p.plasticStrainRate")
        ]
        
        self.d_grid_var_data = [
            ("Mass", "g.mass"),
            ("Volume", "g.volume"),
            ("Velocity", "g.velocity"),
            ("Stress", "g.stressFS"),
            ("Acceleration", "g.acceleration")
        ]
        
        self.d_cell_var_data = [
            ("Density", "rho_CC"),
            ("Temperature", "temp_CC"),
            ("Velocity", "vel_CC"),
            ("Specific Volume", "sp_vol_CC"),
            ("Volume Fraction", "vol_frac_CC"),
            ("Pressure", "press_CC"),
            ("Equilibriation Pressure", "press_equil_CC"),
            ("Internal Energy", "int_eng_L_CC"),
            ("Internal Energy Source", "intE_source_CC"),
            ("Temperature Rate", "Tdot"),
            ("Momentum", "mom_L_CC"),
            ("Momentum Source", "mom_source_CC"),
            ("delP Dilatation", "delP_Dilatate")
        ]
        
        self.d_summed_cbs = []
        self.d_part_cbs = []
        self.d_grid_cbs = []
        self.d_cell_cbs = []

        self.init_ui()

    def init_ui(self):
        main_layout = QVBoxLayout()
        main_layout.addWidget(QLabel("Variables to be saved"))

        # Summed Variables
        summed_group = QGroupBox("Summed Variables")
        summed_layout = QVBoxLayout()
        for label, tag in self.d_summed_var_data:
            cb = QCheckBox(label)
            cb.setChecked(True)
            self.d_summed_cbs.append((cb, tag))
            summed_layout.addWidget(cb)
        summed_group.setLayout(summed_layout)
        
        # Particle Variables
        part_group = QGroupBox("Particle Variables")
        part_layout = QVBoxLayout()
        for label, tag in self.d_part_var_data:
            cb = QCheckBox(label)
            # Defaults
            if label in ["Strain Rate", "Failed Particles", "Damage", "Porosity", "Plastic Strain", "Plastic Strain Rate"]:
                cb.setChecked(False)
            else:
                cb.setChecked(True)
            self.d_part_cbs.append((cb, tag))
            part_layout.addWidget(cb)
        part_group.setLayout(part_layout)
        
        # Grid Variables
        grid_group = QGroupBox("Grid Variables")
        grid_layout = QVBoxLayout()
        for label, tag in self.d_grid_var_data:
            cb = QCheckBox(label)
            cb.setChecked(True)
            self.d_grid_cbs.append((cb, tag))
            grid_layout.addWidget(cb)
        grid_group.setLayout(grid_layout)
        
        # Cell Variables
        cell_group = QGroupBox("Cell-Centered Variables")
        cell_layout = QVBoxLayout()
        for label, tag in self.d_cell_var_data:
            cb = QCheckBox(label)
            cb.setChecked(True)
            self.d_cell_cbs.append((cb, tag))
            cell_layout.addWidget(cb)
        cell_group.setLayout(cell_layout)
        
        # Layout in columns/grid
        grid_layout = QGridLayout()
        grid_layout.addWidget(summed_group, 0, 0)
        grid_layout.addWidget(grid_group, 1, 0)
        grid_layout.addWidget(part_group, 0, 1, 2, 1) # Span 2 rows
        grid_layout.addWidget(cell_group, 0, 2, 2, 1) # Span 2 rows
        
        main_layout.addLayout(grid_layout)
        self.setLayout(main_layout)

    def refresh(self):
        pass

    def write_uintah(self, file, tab):
        if file is None:
            return

        tab1 = tab + "  "

        for cb, tag in self.d_summed_cbs:
            if cb.isChecked():
                file.write(f"{tab1}<save label=\"{tag}\"/>\n")

        for cb, tag in self.d_part_cbs:
            if cb.isChecked():
                file.write(f"{tab1}<save label=\"{tag}\"/>\n")

        for cb, tag in self.d_grid_cbs:
            if cb.isChecked():
                file.write(f"{tab1}<save label=\"{tag}\"/>\n")

        for cb, tag in self.d_cell_cbs:
            if cb.isChecked():
                file.write(f"{tab1}<save label=\"{tag}\"/>\n")

        file.write(f"{tab}</DataArchiver>\n\n")
