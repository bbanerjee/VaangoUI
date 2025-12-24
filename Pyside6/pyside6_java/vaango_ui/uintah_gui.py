import sys
from PySide6.QtWidgets import (QApplication, QMainWindow, QTabWidget, QMenu, QMenuBar, 
                               QFileDialog, QMessageBox)
from PySide6.QtGui import QAction
from .particle_list import ParticleList
from .uintah_input_panel import UintahInputPanel
from .particle_generate_panel import ParticleGeneratePanel

class UintahGui(QMainWindow):
    OPEN = 1
    SAVE = 2

    def __init__(self, in_applet=False):
        super().__init__()
        
        self.setWindowTitle("Uintah User Interface")
        self.setGeometry(20, 50, 800, 600)

        self.d_part_list = ParticleList()
        self.old_file = None
        self.help_about_frame = None # Placeholder

        self.init_ui()

    def init_ui(self):
        # Menu Bar
        menu_bar = self.menuBar()
        
        # File Menu
        file_menu = menu_bar.addMenu("File")
        
        read_action = QAction("Read Particle Location Data", self)
        read_action.triggered.connect(self.read_particle_location_data)
        file_menu.addAction(read_action)
        
        save_action = QAction("Save Uintah Input File", self)
        save_action.triggered.connect(self.save_uintah_input_file)
        file_menu.addAction(save_action)
        
        exit_action = QAction("Exit", self)
        exit_action.triggered.connect(self.close)
        file_menu.addAction(exit_action)
        
        # Help Menu
        help_menu = menu_bar.addMenu("Help")
        about_action = QAction("About", self)
        about_action.triggered.connect(self.show_about)
        help_menu.addAction(about_action)

        # Main Tabbed Pane
        self.main_tabbed_pane = QTabWidget()
        self.setCentralWidget(self.main_tabbed_pane)

        self.uintah_input_panel = UintahInputPanel(self.d_part_list, self)
        self.particle_gen_panel = ParticleGeneratePanel(self.d_part_list, self)

        self.main_tabbed_pane.addTab(self.uintah_input_panel, "Uintah Inputs")
        self.main_tabbed_pane.addTab(self.particle_gen_panel, "Generate Particle Locations")
        
        self.main_tabbed_pane.currentChanged.connect(self.on_tab_changed)

    def on_tab_changed(self, index):
        if index == 0:
            self.particle_gen_panel.set_visible_display_frame(False)
        else:
            self.particle_gen_panel.set_visible_display_frame(True)
            self.uintah_input_panel.set_visible_display_frame(False)

    def update_panels(self):
        pass

    def read_particle_location_data(self):
        filename = self.get_file_name(self.OPEN)
        if filename:
            self.d_part_list.read_from_file(filename)

    def save_uintah_input_file(self):
        filename = self.get_file_name(self.SAVE)
        if filename:
            self.write_uintah(filename)

    def show_about(self):
        QMessageBox.about(self, "About", "Vaango UI converted to PySide6")

    def get_file_name(self, option):
        file_dialog = QFileDialog(self)
        if self.old_file:
            file_dialog.selectFile(self.old_file)
        
        if option == self.OPEN:
            filename, _ = file_dialog.getOpenFileName(self, "Open File", ".")
        else:
            filename, _ = file_dialog.getSaveFileName(self, "Save File", ".")
        
        if filename:
            self.old_file = filename
            return filename
        return None

    def write_uintah(self, output_file):
        try:
            with open(output_file, 'w') as f:
                self.uintah_input_panel.write_uintah(f)
        except Exception as e:
            print(f"Could not write to file {output_file}: {e}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = UintahGui()
    window.show()
    sys.exit(app.exec())
