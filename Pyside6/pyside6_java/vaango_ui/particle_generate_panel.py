from PySide6.QtWidgets import QWidget, QLabel, QVBoxLayout

class ParticleGeneratePanel(QWidget):
    def __init__(self, particle_list=None, parent=None):
        super().__init__()
        layout = QVBoxLayout()
        layout.addWidget(QLabel("Particle Generate Panel (Not Implemented)"))
        self.setLayout(layout)
        
    def set_visible_display_frame(self, visible):
        pass
