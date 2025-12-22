import sys
from PySide6.QtWidgets import QApplication, QLabel

print("Phase 1: Imports successful")
app = QApplication(sys.argv)
print("Phase 2: QApplication initialized")
w = QLabel("If you see this, Qt is working.")
w.show()
print("Phase 3: Window shown")
sys.exit(app.exec())
