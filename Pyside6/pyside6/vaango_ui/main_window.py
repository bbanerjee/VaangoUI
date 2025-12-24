import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QWidget, QHBoxLayout, QDockWidget, QTextEdit
from PySide6.QtCore import Qt, QObject, Signal

from .visualization import Vaango3DWindow
from .panels import GenerateParticlesPanel

class StreamRedirector(QObject):
    text_written = Signal(str)

    def write(self, text):
        self.text_written.emit(str(text))

    def flush(self):
        pass

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Vaango UI - PySide6")
        self.resize(1280, 800)
        
        self.create_menu()
        
        # 3D View
        self.view_3d = Vaango3DWindow()
        container = QWidget.createWindowContainer(self.view_3d)
        self.setCentralWidget(container)
        
        # Panel
        self.panel = GenerateParticlesPanel(self.view_3d)
        
        dock = QDockWidget("Controls", self)
        dock.setAllowedAreas(Qt.RightDockWidgetArea | Qt.LeftDockWidgetArea)
        dock.setWidget(self.panel)
        self.addDockWidget(Qt.RightDockWidgetArea, dock)
        
        # Console
        self.console_dock = QDockWidget("Console", self)
        self.console_dock.setAllowedAreas(Qt.BottomDockWidgetArea | Qt.TopDockWidgetArea)
        self.console = QTextEdit()
        self.console.setReadOnly(True)
        self.console.append("Vaango UI Started.")
        self.console_dock.setWidget(self.console)
        self.addDockWidget(Qt.BottomDockWidgetArea, self.console_dock)

        # Redirect Stdout/Stderr
        self.stdout_redirector = StreamRedirector()
        self.stdout_redirector.text_written.connect(self.update_console)
        self.stderr_redirector = StreamRedirector()
        self.stderr_redirector.text_written.connect(self.update_console)
        
        self.original_stdout = sys.stdout
        self.original_stderr = sys.stderr
        
        sys.stdout = self.stdout_redirector
        sys.stderr = self.stderr_redirector

    def create_menu(self):
        menu_bar = self.menuBar()
        file_menu = menu_bar.addMenu("File")
        
        exit_action = file_menu.addAction("Exit")
        exit_action.triggered.connect(self.close)

    def update_console(self, text):
        cursor = self.console.textCursor()
        cursor.movePosition(cursor.End)
        cursor.insertText(text)
        self.console.setTextCursor(cursor)
        self.console.ensureCursorVisible()

    def closeEvent(self, event):
        sys.stdout = self.original_stdout
        sys.stderr = self.original_stderr
        super().closeEvent(event)

def main():
    app = QApplication(sys.argv)
    
    window = MainWindow()
    window.show()
    
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
