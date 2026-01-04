import sys
import inspect
import importlib
from typing import Dict, Any, Type, Optional, List

from PySide6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QFormLayout, QLabel, QLineEdit, QDoubleSpinBox, QSpinBox,
    QCheckBox, QComboBox, QGroupBox, QScrollArea, QTabWidget,
    QPushButton, QListWidget, QSplitter, QFrame, QMessageBox,
    QSizePolicy
)
from PySide6.QtCore import Qt

# Import the generated models
import ups_spec_models

class ClassRegistry:
    """Helper to map tag names to Python classes."""
    def __init__(self):
        self.tag_map: Dict[str, Type[ups_spec_models.UpsElement]] = {}
        self._build_registry()

    def _build_registry(self):
        for name, obj in inspect.getmembers(ups_spec_models):
            if inspect.isclass(obj) and issubclass(obj, ups_spec_models.UpsElement) and obj is not ups_spec_models.UpsElement:
                if hasattr(obj, 'tag_name'):
                    self.tag_map[obj.tag_name] = obj

    def get_class_for_tag(self, tag: str) -> Optional[Type[ups_spec_models.UpsElement]]:
        return self.tag_map.get(tag)

class UpsWidgetFactory:
    """Creates widgets dynamically based on UPS specifications."""
    
    def __init__(self, registry: ClassRegistry):
        self.registry = registry

    def create_widget(self, element_class: Type[ups_spec_models.UpsElement], parent_spec_context=None) -> QWidget:
        """Creates a form widget for a given UPS Element Class."""
        spec = element_class.get_spec()
        
        container = QGroupBox(spec['tag'])
        layout = QVBoxLayout()
        container.setLayout(layout)

        # Keep track of attribute widgets for dynamic conditional logic
        attr_widgets: Dict[str, QWidget] = {}

        # 1. Attributes Section
        if spec['attributes']:
            attr_group = QGroupBox("Attributes")
            attr_layout = QFormLayout()
            attr_group.setLayout(attr_layout)
            
            for name, attr_spec in spec['attributes'].items():
                input_widget = self._create_input_control(attr_spec)
                # store widget for potential need_applies_to conditions
                attr_widgets[name] = input_widget
                label_text = f"{name} ({'Req' if attr_spec['need'] == 'REQUIRED' else 'Opt'}):"
                attr_layout.addRow(label_text, input_widget)
            
            layout.addWidget(attr_group)

        # 2. Main Value Section (if not NO_DATA)
        if spec['spec_type'] != 'NO_DATA':
            val_group = QGroupBox("Value")
            val_layout = QHBoxLayout()
            val_group.setLayout(val_layout)
            
            # Create a synthetic spec for the value based on the element's type
            value_spec = {
                'type': spec['spec_type'],
                'valid_values': None, # We'd need to parse this from somewhere if it exists on the tag itself
                'need': 'REQUIRED'
            }
            # Sometimes valid_values for the text content is in the 'validValues' part of the spec string
            # But get_spec separates attributes. The class generator puts the main type in 'spec_type'.
            # The 'valid_values' might be lost for the main tag in the current generator if not carefully handled,
            # but usually it's simple types.
            
            input_widget = self._create_input_control(value_spec)
            val_layout.addWidget(input_widget)
            layout.addWidget(val_group)

        # 3. Children Section
        if spec['children_spec']:
            children_area = QWidget()
            children_layout = QVBoxLayout()
            children_area.setLayout(children_layout)
            
            for child_info in spec['children_spec']:
                child_tag = child_info['tag']
                child_req = child_info['spec'] # {'need': ..., 'type': ...}
                need_applies_to = child_info.get('need_applies_to')
                parsed_need = None
                if need_applies_to:
                    parsed_need = self.parse_need_applies_to(need_applies_to)
                
                child_class = self.registry.get_class_for_tag(child_tag)
                
                if not child_class:
                    # Fallback for unknown classes (maybe just a primitive leaf defined inline)
                    # Use a generic placeholder widget
                    self._add_generic_child_field(children_layout, child_tag, child_req)
                    continue

                if child_req['need'] == 'MULTIPLE':
                    # List Manager
                    list_manager = UpsListManager(child_tag, child_class, self)
                    # attach condition metadata
                    if parsed_need:
                        list_manager.setProperty('need_applies_to', parsed_need)
                    # evaluate initial visibility if parent context available
                    if parent_spec_context is not None:
                        self._evaluate_child_visibility(list_manager, parsed_need, parent_spec_context, attr_widgets)
                    children_layout.addWidget(list_manager)
                else:
                    # Single Instance (Optional or Required)
                    # We create a collapsible or standard group
                    # For simplicity, we just add it. 
                    # Optimization: Lazy load?
                    
                    # Determine if it's a "Leaf" (only attributes/value) or "Branch" (nested children)
                    child_static_spec = child_class.get_spec()
                    is_complex = bool(child_static_spec['children_spec'])
                    
                    if is_complex:
                        # Recursive call; pass parent context for conditional logic
                        child_widget = self.create_widget(child_class, parent_spec_context={'class': element_class, 'attr_widgets': attr_widgets})
                        # attach condition metadata
                        if parsed_need:
                            child_widget.setProperty('need_applies_to', parsed_need)
                        if child_req['need'] == 'OPTIONAL':
                            try:
                                child_widget.setCheckable(True)
                                child_widget.setChecked(False)
                            except Exception:
                                pass
                        # evaluate initial visibility
                        self._evaluate_child_visibility(child_widget, parsed_need, {'class': element_class, 'attr_widgets': attr_widgets}, attr_widgets)
                        children_layout.addWidget(child_widget)
                    else:
                        # It's simple, maybe render it inline?
                        # For now, stick to consistent GroupBox approach
                        child_widget = self.create_widget(child_class, parent_spec_context={'class': element_class, 'attr_widgets': attr_widgets})
                        if parsed_need:
                            child_widget.setProperty('need_applies_to', parsed_need)
                        if child_req['need'] == 'OPTIONAL':
                            try:
                                child_widget.setCheckable(True)
                                child_widget.setChecked(False)
                            except Exception:
                                pass
                        self._evaluate_child_visibility(child_widget, parsed_need, {'class': element_class, 'attr_widgets': attr_widgets}, attr_widgets)
                        children_layout.addWidget(child_widget)

            layout.addWidget(children_area)

        # Add stretch to keep things compact at top
        layout.addStretch()
        return container

    # --- Conditional logic helpers ---
    def parse_need_applies_to(self, raw: str):
        """Parse strings like 'type steadyBurn' or 'name a,b' into structured dict."""
        if not raw:
            return None
        raw = raw.strip()
        parts = raw.split(None, 1)
        if len(parts) == 1:
            key = parts[0]
            vals = []
        else:
            key = parts[0]
            vals = parts[1]
            # split by comma or whitespace
            if ',' in vals:
                vals = [v.strip() for v in vals.split(',') if v.strip()]
            else:
                vals = [v.strip() for v in vals.split() if v.strip()]
        return {'key': key, 'values': vals}

    def _read_attr_widget_value(self, widget: QWidget):
        # Read current value from common input widgets
        try:
            if isinstance(widget, QLineEdit):
                return widget.text()
            if isinstance(widget, QComboBox):
                return widget.currentText()
            if isinstance(widget, QCheckBox):
                return widget.isChecked()
            if isinstance(widget, QSpinBox) or isinstance(widget, QDoubleSpinBox):
                return widget.value()
        except Exception:
            pass
        return None

    def _evaluate_child_visibility(self, child_widget: QWidget, parsed_need, parent_context, attr_widgets):
        """Show or hide child_widget based on parsed_need and parent_context."""
        if not parsed_need:
            # No condition -> visible
            child_widget.setVisible(True)
            return

        key = parsed_need.get('key')
        values = parsed_need.get('values', [])

        visible = False
        # 'name' checks parent's tag name
        if key == 'name':
            parent_class = parent_context.get('class') if parent_context else None
            if parent_class and parent_class.tag_name in values:
                visible = True
        else:
            # assume key is an attribute name on parent (e.g., 'type' or 'var')
            parent_attrs = parent_context.get('attr_widgets') if parent_context else {}
            w = parent_attrs.get(key)
            if w is not None:
                val = self._read_attr_widget_value(w)
                # compare as string for simplicity
                sval = str(val) if val is not None else ''
                for v in values:
                    if sval == v:
                        visible = True
                        break

        child_widget.setVisible(visible)

        # If parent has attribute widgets, connect signals to update visibility dynamically
        if parent_context and parent_context.get('attr_widgets'):
            for attr_name, w in parent_context['attr_widgets'].items():
                try:
                    # connect common change signals
                    if isinstance(w, QLineEdit):
                        w.textChanged.connect(lambda _v, cw=child_widget, pn=parsed_need: self._evaluate_child_visibility(cw, pn, parent_context, parent_context['attr_widgets']))
                    elif isinstance(w, QComboBox):
                        w.currentIndexChanged.connect(lambda _i, cw=child_widget, pn=parsed_need: self._evaluate_child_visibility(cw, pn, parent_context, parent_context['attr_widgets']))
                    elif isinstance(w, QCheckBox):
                        w.toggled.connect(lambda _s, cw=child_widget, pn=parsed_need: self._evaluate_child_visibility(cw, pn, parent_context, parent_context['attr_widgets']))
                    elif isinstance(w, QSpinBox) or isinstance(w, QDoubleSpinBox):
                        w.valueChanged.connect(lambda _v, cw=child_widget, pn=parsed_need: self._evaluate_child_visibility(cw, pn, parent_context, parent_context['attr_widgets']))
                except Exception:
                    pass

    def _create_input_control(self, spec: Dict) -> QWidget:
        dtype = spec.get('type', 'STRING')
        valid_vals = spec.get('valid_values')
        
        # Check for Enums (Comma separated strings)
        if dtype == 'STRING' and valid_vals and ',' in valid_vals:
            cb = QComboBox()
            items = [x.strip() for x in valid_vals.split(',')]
            cb.addItems(items)
            return cb
            
        if dtype == 'BOOLEAN':
            return QCheckBox()
            
        if dtype == 'INTEGER':
            sb = QSpinBox()
            sb.setRange(-2147483648, 2147483647)
            if valid_vals == 'positive':
                sb.setMinimum(0)
            elif valid_vals and ',' in valid_vals:
                # Range "min, max"
                try:
                    parts = valid_vals.split(',')
                    sb.setRange(int(parts[0]), int(parts[1]))
                except:
                    pass
            return sb
            
        if dtype == 'DOUBLE':
            sb = QDoubleSpinBox()
            sb.setRange(-float('inf'), float('inf'))
            if valid_vals == 'positive':
                sb.setMinimum(0.0)
            elif valid_vals and ',' in valid_vals:
                 try:
                    parts = valid_vals.split(',')
                    sb.setRange(float(parts[0]), float(parts[1]))
                 except:
                    pass
            return sb
            
        # Default / String / Vector
        le = QLineEdit()
        if dtype == 'VECTOR':
            le.setPlaceholderText("[x, y, z]")
        return le

    def _add_generic_child_field(self, layout, tag, spec):
        """Handle children that don't have a distinct class (should be rare with our generator)."""
        row = QHBoxLayout()
        label = QLabel(f"{tag} ({spec['type']}):")
        input_w = self._create_input_control(spec)
        row.addWidget(label)
        row.addWidget(input_w)
        layout.addLayout(row)

class UpsListManager(QGroupBox):
    """Widget to manage a list of identical child elements (MULTIPLE)."""
    def __init__(self, tag_name: str, child_class: Type, factory: UpsWidgetFactory):
        super().__init__(f"{tag_name} (List)")
        self.tag_name = tag_name
        self.child_class = child_class
        self.factory = factory
        
        self.layout_main = QVBoxLayout()
        self.setLayout(self.layout_main)
        
        self.tabs = QTabWidget()
        self.layout_main.addWidget(self.tabs)
        
        btn_layout = QHBoxLayout()
        self.btn_add = QPushButton(f"Add {tag_name}")
        self.btn_add.clicked.connect(self.add_item)
        self.btn_remove = QPushButton("Remove Selected")
        self.btn_remove.clicked.connect(self.remove_current)
        
        btn_layout.addWidget(self.btn_add)
        btn_layout.addWidget(self.btn_remove)
        btn_layout.addStretch()
        self.layout_main.addLayout(btn_layout)

    def add_item(self):
        # Create a new instance of the widget
        widget = self.factory.create_widget(self.child_class)
        
        # Wrap in a scroll area if complex? 
        # For now, direct add
        idx = self.tabs.addTab(widget, f"Item {self.tabs.count() + 1}")
        self.tabs.setCurrentIndex(idx)

    def remove_current(self):
        idx = self.tabs.currentIndex()
        if idx >= 0:
            self.tabs.removeTab(idx)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("UPS Specification Editor")
        self.resize(1000, 800)
        
        self.registry = ClassRegistry()
        self.factory = UpsWidgetFactory(self.registry)
        
        # Main Layout
        central = QWidget()
        self.setCentralWidget(central)
        main_layout = QHBoxLayout(central)
        
        splitter = QSplitter(Qt.Horizontal)
        main_layout.addWidget(splitter)
        
        # Left Panel: Component List
        left_panel = QWidget()
        left_layout = QVBoxLayout(left_panel)
        left_layout.addWidget(QLabel("<b>Available Components</b>"))
        
        self.comp_list = QListWidget()
        self.comp_list.setSortingEnabled(True)
        # Populate list
        for tag in sorted(self.registry.tag_map.keys()):
            self.comp_list.addItem(tag)
            
        self.comp_list.currentItemChanged.connect(self.on_component_selected)
        left_layout.addWidget(self.comp_list)
        
        # Right Panel: Editor Area
        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        self.editor_container = QWidget()
        self.scroll_area.setWidget(self.editor_container)
        
        # Add to splitter
        splitter.addWidget(left_panel)
        splitter.addWidget(self.scroll_area)
        splitter.setSizes([300, 700])

    def on_component_selected(self, current, previous):
        if not current:
            return
            
        tag = current.text()
        cls = self.registry.get_class_for_tag(tag)
        
        if cls:
            self.load_component_form(cls)

    def load_component_form(self, cls):
        # Clear previous
        if self.editor_container.layout():
            # Reparenting to a dummy widget effectively deletes them from layout
            QWidget().setLayout(self.editor_container.layout())
        
        layout = QVBoxLayout()
        self.editor_container.setLayout(layout)
        
        # Create Header
        header = QLabel(f"<h2>{cls.tag_name}</h2>")
        layout.addWidget(header)
        
        # Create Form
        form_widget = self.factory.create_widget(cls)
        layout.addWidget(form_widget)
        
        layout.addStretch()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
