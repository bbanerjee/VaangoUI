import os
os.environ["LIBGL_ALWAYS_SOFTWARE"] = "1"
os.environ["QT_NO_XDG_DESKTOP_PORTAL"] = "1"

import sys
from PySide6.QtCore import Qt
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtOpenGLWidgets import QOpenGLWidget
from PySide6.QtGui import QOpenGLFunctions

class SimpleGL(QOpenGLWidget, QOpenGLFunctions):
    def initializeGL(self):
        self.initializeOpenGLFunctions()
        print("GL Initialized!")

    def paintGL(self):
        self.glClearColor(0.8, 0.2, 0.5, 1.0)
        self.glClear(self.GL_COLOR_BUFFER_BIT)

if __name__ == "__main__":
    print("Starting...")
    QApplication.setAttribute(Qt.ApplicationAttribute.AA_UseDesktopOpenGL)
    app = QApplication(sys.argv)
    window = QMainWindow()
    window.setCentralWidget(SimpleGL())
    window.show()
    print("Loop starting...")
    sys.exit(app.exec())
