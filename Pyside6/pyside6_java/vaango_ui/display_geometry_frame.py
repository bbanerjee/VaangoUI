from PySide6.QtWidgets import QFrame

class DisplayGeometryFrame(QFrame):
    def __init__(self, part_list, geom_piece, parent=None):
        super().__init__(parent)
    
    def refresh(self):
        pass

    def update(self):
        super().update()
