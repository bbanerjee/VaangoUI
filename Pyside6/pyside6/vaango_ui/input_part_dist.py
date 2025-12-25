from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit,
                                    QDoubleSpinBox, QPushButton, QTableWidget, QTableWidgetItem,
                                    QFileDialog, QDialog, QHeaderView, QMessageBox)
from PySide6.QtCore import Slot, Qt
from .particle_utils import ParticleSizeDist
from .particle_size_histogram import ParticleSizeHistogramWidget, ParticleSizeSource

class InputPartDistPanel(QWidget):
    def __init__(self, size_dist: ParticleSizeDist):
        super().__init__()
        self.size_dist = size_dist
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        # Material name and global params
        row = QHBoxLayout()
        row.addWidget(QLabel("Material name:"))
        self.material_edit = QLineEdit(self.size_dist.material_name)
        row.addWidget(self.material_edit)
        row.addWidget(QLabel("Vol frac:"))
        self.vol_frac_spin = QDoubleSpinBox()
        self.vol_frac_spin.setRange(0.0, 100.0)
        self.vol_frac_spin.setValue(self.size_dist.particle_vol_frac)
        row.addWidget(self.vol_frac_spin)
        row.addWidget(QLabel("Max size:"))
        self.max_size_spin = QDoubleSpinBox()
        self.max_size_spin.setRange(0.0, 1e6)
        self.max_size_spin.setValue(self.size_dist.max_particle_size)
        row.addWidget(self.max_size_spin)
        layout.addLayout(row)

        # Table of sizes
        self.table = QTableWidget(0, 2)
        self.table.setHorizontalHeaderLabels(["Size passing (L)", "Vol. fraction (%)"])
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        layout.addWidget(self.table)

        btn_row = QHBoxLayout()
        self.add_btn = QPushButton("Add row")
        self.add_btn.clicked.connect(self.add_row)
        btn_row.addWidget(self.add_btn)

        self.remove_btn = QPushButton("Remove selected")
        self.remove_btn.clicked.connect(self.remove_selected)
        btn_row.addWidget(self.remove_btn)

        self.read_btn = QPushButton("Read from file")
        self.read_btn.clicked.connect(self.read_from_file)
        btn_row.addWidget(self.read_btn)

        self.save_btn = QPushButton("Save to file")
        self.save_btn.clicked.connect(self.save_to_file)
        btn_row.addWidget(self.save_btn)

        layout.addLayout(btn_row)

        action_row = QHBoxLayout()
        self.apply_btn = QPushButton("Apply")
        self.apply_btn.clicked.connect(self.apply_changes)
        action_row.addWidget(self.apply_btn)

        self.close_btn = QPushButton("Close")
        self.close_btn.clicked.connect(self.close_parent)
        action_row.addWidget(self.close_btn)

        layout.addLayout(action_row)

        self.setLayout(layout)
        self.load_table()

    def load_table(self):
        self.table.setRowCount(0)
        sizes = self.size_dist.size
        fracs = self.size_dist.vol_frac
        n = max(len(sizes), len(fracs))
        for i in range(n):
            size = sizes[i] if i < len(sizes) else 0.0
            frac = fracs[i] if i < len(fracs) else 0.0
            self._insert_row(size, frac)

    def _insert_row(self, size: float, frac: float):
        r = self.table.rowCount()
        self.table.insertRow(r)
        item_size = QTableWidgetItem(f"{size:g}")
        item_size.setFlags(item_size.flags() | Qt.ItemIsEditable)
        self.table.setItem(r, 0, item_size)
        item_frac = QTableWidgetItem(f"{frac:g}")
        item_frac.setFlags(item_frac.flags() | Qt.ItemIsEditable)
        self.table.setItem(r, 1, item_frac)

    @Slot()
    def add_row(self):
        last_size = float(self.table.item(self.table.rowCount()-1, 0).text()) if self.table.rowCount() > 0 and self.table.item(self.table.rowCount()-1,0) else (self.size_dist.size[-1] if self.size_dist.size else 1.0)
        self._insert_row(1.1 * last_size, 1.0)

    @Slot()
    def remove_selected(self):
        rows = sorted({idx.row() for idx in self.table.selectedIndexes()}, reverse=True)
        for r in rows:
            self.table.removeRow(r)

    @Slot()
    def read_from_file(self):
        path, _ = QFileDialog.getOpenFileName(self, "Open particle size JSON", ".", "JSON Files (*.json);;All Files (*)")
        if not path:
            return
        try:
            self.size_dist.read_from_file(path)
            self.material_edit.setText(self.size_dist.material_name)
            self.vol_frac_spin.setValue(self.size_dist.particle_vol_frac)
            self.max_size_spin.setValue(self.size_dist.max_particle_size)
            self.load_table()
        except Exception as e:
            QMessageBox.warning(self, "Read error", f"Failed to read file:\n{e}")

    @Slot()
    def save_to_file(self):
        path, _ = QFileDialog.getSaveFileName(self, "Save particle size JSON", ".", "JSON Files (*.json);;All Files (*)")
        if not path:
            return
        try:
            # Update values first
            self._gather_to_size_dist()
            self.size_dist.save_to_file(path)
        except Exception as e:
            QMessageBox.warning(self, "Save error", f"Failed to save file:\n{e}")

    def _gather_to_size_dist(self):
        self.size_dist.material_name = self.material_edit.text()
        self.size_dist.particle_vol_frac = float(self.vol_frac_spin.value())
        self.size_dist.max_particle_size = float(self.max_size_spin.value())

        sizes = []
        fracs = []
        for r in range(self.table.rowCount()):
            try:
                s_item = self.table.item(r, 0)
                f_item = self.table.item(r, 1)
                s = float(s_item.text()) if s_item and s_item.text() else 0.0
                f = float(f_item.text()) if f_item and f_item.text() else 0.0
                if f > 0.0:
                    sizes.append(s)
                    fracs.append(f)
            except Exception:
                continue
        # Sort descending by size as C++ did
        pairs = sorted(zip(sizes, fracs), key=lambda v: v[0], reverse=True)
        self.size_dist.size = [p[0] for p in pairs]
        self.size_dist.vol_frac = [p[1] for p in pairs]
        self.size_dist.num_sizes = len(self.size_dist.size)

    @Slot()
    def apply_changes(self):
        self._gather_to_size_dist()
        self.size_dist.calc_particle_dist()
        QMessageBox.information(self, "Applied", "Size distribution updated and recalculated.")

    @Slot()
    def close_parent(self):
        # If placed in a dialog, close the dialog; otherwise hide widget
        parent = self.parent()
        if parent and hasattr(parent, 'accept'):
            parent.accept()
        else:
            self.close()


class InputPartDistDialog(QDialog):
    def __init__(self, size_dist: ParticleSizeDist, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Particle Size Distribution")
        self.resize(640, 480)
        # Layout: left = input panel, right = histogram display
        main_layout = QHBoxLayout()
        self.panel = InputPartDistPanel(size_dist)
        main_layout.addWidget(self.panel, 2)

        self.hist_widget_input = ParticleSizeHistogramWidget(size_dist, ParticleSizeSource.INPUT)
        main_layout.addWidget(self.hist_widget_input, 3)

        # Keep reference to size_dist so we can refresh
        self.size_dist = size_dist

        self.setLayout(main_layout)

        # Connect apply/read/save actions to refresh histogram
        self.panel.apply_btn.clicked.connect(self.refresh_hist)
        self.panel.read_btn.clicked.connect(self.refresh_hist)
        self.panel.save_btn.clicked.connect(self.refresh_hist)

    def refresh_hist(self):
        # ensure size_dist recalculated
        try:
            self.size_dist.calc_particle_dist()
        except Exception:
            pass
        self.hist_widget_input.update_and_refresh()
