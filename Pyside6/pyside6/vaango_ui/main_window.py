import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QWidget, QHBoxLayout, QDockWidget, QTextEdit, QFileDialog, QMessageBox
from PySide6.QtCore import Qt, QObject, Signal
from PySide6.QtGui import QTextCursor

from .visualization import Vaango3DWindow
from .panels import GenerateParticlesPanel
from .input_part_dist import InputPartDistDialog
from .nodes_component import VaangoUINodesComponent
# Property editor (prefer local copy in vaango_ui.widgets, fallback to gui_app)
try:
    from .widgets.property_editor import PropertyEditorWidget
except Exception:
    try:
        from gui_app.widgets.property_editor import PropertyEditorWidget
    except Exception:
        PropertyEditorWidget = None

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
        
        self.controls_dock = QDockWidget("Controls", self)
        self.controls_dock.setAllowedAreas(Qt.RightDockWidgetArea | Qt.LeftDockWidgetArea)
        self.controls_dock.setWidget(self.panel)
        self.addDockWidget(Qt.RightDockWidgetArea, self.controls_dock)

        # Property editor dock (placed below Controls)
        try:
            if PropertyEditorWidget is not None:
                self.property_editor = PropertyEditorWidget()
            else:
                from PySide6.QtWidgets import QLabel
                self.property_editor = QLabel("Property editor not available")
                self.property_editor.setAlignment(Qt.AlignCenter)

            self.property_dock = QDockWidget("Properties", self)
            self.property_dock.setAllowedAreas(Qt.RightDockWidgetArea | Qt.LeftDockWidgetArea)
            self.property_dock.setWidget(self.property_editor)
            # Add the dock and split it vertically under the controls dock
            self.addDockWidget(Qt.RightDockWidgetArea, self.property_dock)
            try:
                # Place property dock below the controls dock
                self.splitDockWidget(self.controls_dock, self.property_dock, Qt.Vertical)
            except Exception:
                pass
        except Exception as e:
            print(f"Failed to create Property editor dock: {e}")
        
        # Console
        self.console_dock = QDockWidget("Console", self)
        self.console_dock.setAllowedAreas(Qt.BottomDockWidgetArea | Qt.TopDockWidgetArea)
        self.console = QTextEdit()
        self.console.setReadOnly(True)
        self.console.append("Vaango UI Started.")
        self.console_dock.setWidget(self.console)
        self.addDockWidget(Qt.BottomDockWidgetArea, self.console_dock)

        # Nodes component (node editor + add menu)
        try:
            self.nodes_component = VaangoUINodesComponent(self)
            self.nodes_dock = QDockWidget("Nodes", self)
            self.nodes_dock.setAllowedAreas(Qt.LeftDockWidgetArea | Qt.RightDockWidgetArea)
            self.nodes_dock.setWidget(self.nodes_component)
            self.addDockWidget(Qt.LeftDockWidgetArea, self.nodes_dock)
            # Connect node selection to property editor (if available)
            try:
                editor = getattr(self.nodes_component, 'editor', None)
                if editor is not None and hasattr(editor, 'editor_scene') and hasattr(self, 'property_editor'):
                    try:
                        editor.editor_scene.node_selected.connect(self.property_editor.show_node_properties)
                    except Exception as _e:
                        print(f"Failed to connect node_selected signal: {_e}")
            except Exception:
                pass
        except Exception as e:
            print(f"Failed to create Nodes dock: {e}")
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
        # File menu
        file_menu = menu_bar.addMenu("File")
        read_action = file_menu.addAction("Read particle location data")
        read_action.setShortcut("Ctrl+O")
        read_action.triggered.connect(self.load_particle_locations)

        save_action = file_menu.addAction("Save Vaango input file")
        save_action.setShortcut("Ctrl+S")
        save_action.triggered.connect(self.save_vaango_input)

        exit_action = file_menu.addAction("Exit")
        exit_action.setShortcut("Ctrl+Q")
        exit_action.triggered.connect(self.close)

        # Create menu
        create_menu = menu_bar.addMenu("Create")
        create_particles_action = create_menu.addAction("Create particles")
        create_particles_action.triggered.connect(self.toggle_create_panel)
        create_input_action = create_menu.addAction("Create input data")
        create_input_action.triggered.connect(self.open_size_dist_dialog)

        # About / Help
        about_menu = menu_bar.addMenu("About")
        about_action = about_menu.addAction("About Vaango UI")
        about_action.triggered.connect(self.show_about)

        help_menu = menu_bar.addMenu("Help")
        help_action = help_menu.addAction("Help")
        help_action.triggered.connect(self.show_help)

        # View menu - toggle panels like Nodes and Controls
        view_menu = menu_bar.addMenu("View")
        toggle_nodes_action = view_menu.addAction("Show Nodes")
        toggle_nodes_action.setCheckable(True)
        toggle_nodes_action.setChecked(True)
        toggle_nodes_action.triggered.connect(self.toggle_nodes_dock)

        toggle_controls_action = view_menu.addAction("Show Controls")
        toggle_controls_action.setCheckable(True)
        toggle_controls_action.setChecked(True)
        toggle_controls_action.triggered.connect(self.toggle_create_panel)

    def open_size_dist_dialog(self):
        try:
            size_dist = self.panel.generator.s_size_dist
        except Exception:
            # Fall back to a fresh ParticleSizeDist
            from .particle_utils import ParticleSizeDist
            size_dist = ParticleSizeDist()

        dlg = InputPartDistDialog(size_dist, parent=self)
        dlg.exec()

    def toggle_create_panel(self):
        try:
            visible = self.controls_dock.isVisible()
            self.controls_dock.setVisible(not visible)
        except Exception:
            pass

    def toggle_nodes_dock(self):
        try:
            visible = self.nodes_dock.isVisible()
            self.nodes_dock.setVisible(not visible)
        except Exception:
            pass

    def load_particle_locations(self):
        fname, _ = QFileDialog.getOpenFileName(self, "Open particle locations", "", "All Files (*)")
        if not fname:
            return
        # Best-effort: hand file path to generator if it has a load method
        try:
            gen = self.panel.generator
            if hasattr(gen, 'load'):
                gen.load(fname)
                print(f"Loaded particle locations from {fname}")
            else:
                print(f"Selected particle file: {fname} (no loader implemented)")
        except Exception as e:
            print(f"Failed to load particle locations: {e}")

    def save_vaango_input(self):
        fname, _ = QFileDialog.getSaveFileName(self, "Save Vaango input file", "", "Vaango input (*.ups *.xml);;All Files (*)")
        if not fname:
            return
        try:
            # If panel has a save method, call it; otherwise just print
            if hasattr(self.panel, 'save'):
                self.panel.save()
                print(f"Invoked panel.save(); choose path: {fname}")
            else:
                print(f"Save requested to: {fname} (no save implemented)")
        except Exception as e:
            print(f"Failed to save Vaango input: {e}")

    def show_about(self):
        QMessageBox.about(self, "About Vaango UI", "Vaango UI - PySide6 port\nConverted from Vaango C++ UI")

    def show_help(self):
        QMessageBox.information(self, "Help", "Help for Vaango UI is not available yet.")

    def open_nodes_component(self):
        try:
            comp = VaangoUINodesComponent(self)
            dock = QDockWidget("Nodes", self)
            dock.setAllowedAreas(Qt.LeftDockWidgetArea | Qt.RightDockWidgetArea)
            dock.setWidget(comp)
            self.addDockWidget(Qt.LeftDockWidgetArea, dock)
        except Exception as e:
            print(f"Failed to open Nodes component: {e}")

    def update_console(self, text):
        cursor = self.console.textCursor()
        cursor.movePosition(QTextCursor.End)
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
