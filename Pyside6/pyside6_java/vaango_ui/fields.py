from PySide6.QtWidgets import QLineEdit, QWidget, QHBoxLayout, QLabel
from PySide6.QtGui import QDoubleValidator, QIntValidator
from PySide6.QtCore import Qt

class DecimalField(QLineEdit):
    def __init__(self, value=0.0, columns=10, exp=False, parent=None):
        super().__init__(parent)
        self.setFixedWidth(columns * 10)  # Approximate width
        
        # In Qt6, QDoubleValidator doesn't enforce strict typing as rigidly as Java fields
        # but we can set notation
        self.validator = QDoubleValidator(self)
        if exp:
            self.validator.setNotation(QDoubleValidator.ScientificNotation)
        else:
            self.validator.setNotation(QDoubleValidator.StandardNotation)
        
        self.setValidator(self.validator)
        self._exp = exp
        self.setValue(value)
        self.editingFinished.connect(self._format_value)

    def getValue(self):
        try:
            return float(self.text())
        except ValueError:
            return 0.0

    def setValue(self, value):
        if self._exp:
            self.setText(f"{value:.4E}")
        else:
            self.setText(f"{value:.4f}")

    def _format_value(self):
        self.setValue(self.getValue())

class IntegerField(QLineEdit):
    def __init__(self, value=0, columns=10, parent=None):
        super().__init__(parent)
        self.setFixedWidth(columns * 10)
        self.setValidator(QIntValidator(self))
        self.setValue(value)

    def getValue(self):
        try:
            return int(self.text())
        except ValueError:
            return 0

    def setValue(self, value):
        self.setText(str(value))

class WholeNumberField(IntegerField):
    def __init__(self, value=0, columns=10, parent=None):
        super().__init__(value, columns, parent)
        self.validator().setBottom(0)

class VectorField(QWidget):
    def __init__(self, x_val, y_val, z_val, columns, field_class, **kwargs):
        super().__init__()
        layout = QHBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        
        self.x_label = QLabel("x")
        self.x_entry = field_class(x_val, columns, **kwargs)
        
        self.y_label = QLabel("y")
        self.y_entry = field_class(y_val, columns, **kwargs)
        
        self.z_label = QLabel("z")
        self.z_entry = field_class(z_val, columns, **kwargs)

        layout.addWidget(self.x_label)
        layout.addWidget(self.x_entry)
        layout.addWidget(self.y_label)
        layout.addWidget(self.y_entry)
        layout.addWidget(self.z_label)
        layout.addWidget(self.z_entry)
        
        self.setLayout(layout)

    def x(self):
        return self.x_entry.getValue()

    def y(self):
        return self.y_entry.getValue()

    def z(self):
        return self.z_entry.getValue()

    def setEnabled(self, enabled):
        super().setEnabled(enabled)
        self.x_entry.setEnabled(enabled)
        self.y_entry.setEnabled(enabled)
        self.z_entry.setEnabled(enabled)
        self.x_label.setEnabled(enabled)
        self.y_label.setEnabled(enabled)
        self.z_label.setEnabled(enabled)

class IntegerVectorField(VectorField):
    def __init__(self, x_val=0, y_val=0, z_val=0, columns=5):
        super().__init__(x_val, y_val, z_val, columns, IntegerField)

class DecimalVectorField(VectorField):
    def __init__(self, x_val=0.0, y_val=0.0, z_val=0.0, columns=5, exp=False):
        super().__init__(x_val, y_val, z_val, columns, DecimalField, exp=exp)
