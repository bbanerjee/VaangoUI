from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QLabel, 
                                 QComboBox, QDoubleSpinBox, QCheckBox, QPushButton, 
                                 QGroupBox, QFormLayout)
from PySide6.QtCore import Slot

from .core import ParticleShape
from .generator import Vaango_UIGenerateRVEParticles

class GenerateParticlesPanel(QWidget):
    def __init__(self, visualization_window):
        super().__init__()
        self.viz_window = visualization_window
        self.generator = Vaango_UIGenerateRVEParticles()
        
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()
        
        # Inputs Group
        input_group = QGroupBox("RVE Parameters")
        form_layout = QFormLayout()
        
        self.shape_combo = QComboBox()
        self.shape_combo.addItems(["Circle", "Hollow Circle", "Sphere", "Hollow Sphere"])
        self.shape_combo.currentTextChanged.connect(self.on_shape_changed)
        form_layout.addRow("Particle Shape:", self.shape_combo)
        
        self.rve_size_spin = QDoubleSpinBox()
        self.rve_size_spin.setRange(0.0, 10000.0)
        self.rve_size_spin.setValue(100.0)
        form_layout.addRow("RVE Size:", self.rve_size_spin)
        
        self.thickness_spin = QDoubleSpinBox()
        self.thickness_spin.setRange(0.0, 1000.0)
        self.thickness_spin.setValue(1.0)
        self.thickness_label = QLabel("Thickness:")
        form_layout.addRow(self.thickness_label, self.thickness_spin)
        
        self.periodic_check = QCheckBox("Periodic Distribution")
        form_layout.addRow(self.periodic_check)
        
        input_group.setLayout(form_layout)
        layout.addWidget(input_group)
        
        # Actions
        self.generate_btn = QPushButton("Generate Particles")
        self.generate_btn.clicked.connect(self.generate)
        layout.addWidget(self.generate_btn)
        
        self.save_btn = QPushButton("Save to File")
        self.save_btn.clicked.connect(self.save)
        layout.addWidget(self.save_btn)
        
        layout.addStretch()
        self.setLayout(layout)
        
        self.on_shape_changed(self.shape_combo.currentText())

    @Slot(str)
    def on_shape_changed(self, text):
        if "Sphere" in text:
            self.thickness_spin.setEnabled(False) # Maybe thickness means shell thickness for hollow?
            if "Hollow" in text:
                self.thickness_spin.setEnabled(True)
        else:
             # Circle
             self.thickness_spin.setEnabled(True) # Thickness usually means depth for 2D

    def generate(self):
        shape_text = self.shape_combo.currentText()
        shape = ParticleShape.CIRCLE
        if shape_text == "Hollow Circle": shape = ParticleShape.HOLLOW_CIRCLE
        elif shape_text == "Sphere": shape = ParticleShape.SPHERE
        elif shape_text == "Hollow Sphere": shape = ParticleShape.HOLLOW_SPHERE
        
        rve_size = self.rve_size_spin.value()
        thickness = self.thickness_spin.value()
        periodic = self.periodic_check.isChecked()
        
        print(f"Generating: Size={rve_size}, Shape={shape}, Periodic={periodic}")
        
        self.generator.distribute_particles(rve_size, periodic, shape, thickness)
        
        # Update Visualization
        particles = self.generator.s_part_list.all_particles
        print(f"Generated {len(particles)} particles.")
        self.viz_window.update_particles(particles)

    def save(self):
        print("Save functionality not fully implemented yet.")
