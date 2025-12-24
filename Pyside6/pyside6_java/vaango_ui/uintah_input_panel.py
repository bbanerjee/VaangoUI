from PySide6.QtWidgets import (QWidget, QTabWidget, QVBoxLayout, QScrollArea)
from .general_inputs_panel import GeneralInputsPanel
from .placeholders import (GeometryPanel, MPMInputsPanel, MPMMaterialsPanel, 
                           ICEInputsPanel, ICEMaterialsPanel, MPMICEExchangePanel, GridBCPanel)

class UintahInputPanel(QWidget):
    def __init__(self, particle_list, parent):
        super().__init__()
        self.d_part_list = particle_list
        self.d_parent = parent
        self.d_mpm_mat = []
        self.d_ice_mat = []
        self.d_geom_obj = []
        self.d_sim_component = "none"

        self.init_ui()

    def init_ui(self):
        main_layout = QVBoxLayout()
        
        self.uintah_tabbed_pane = QTabWidget()
        
        # Create panels
        self.general_inp_panel = GeneralInputsPanel(self.d_sim_component, self)
        self.geom_panel = GeometryPanel(self.d_part_list, self.d_geom_obj, self)
        self.mpm_inp_panel = MPMInputsPanel(self)
        self.mpm_mat_panel = MPMMaterialsPanel(self.d_geom_obj, self.d_mpm_mat, self)
        self.ice_inp_panel = ICEInputsPanel(self.d_mpm_mat, self.d_ice_mat, self)
        self.ice_mat_panel = ICEMaterialsPanel(self.d_geom_obj, self.d_ice_mat, self)
        self.exchange_panel = MPMICEExchangePanel(self.d_mpm_mat, self.d_ice_mat, self)
        self.grid_bc_panel = GridBCPanel(self)

        # Add tabs
        self.uintah_tabbed_pane.addTab(self.general_inp_panel, "General Inputs")
        self.uintah_tabbed_pane.addTab(self.geom_panel, "Geometry")
        self.uintah_tabbed_pane.addTab(self.mpm_inp_panel, "MPM Parameters")
        self.uintah_tabbed_pane.addTab(self.mpm_mat_panel, "MPM Materials")
        self.uintah_tabbed_pane.addTab(self.ice_inp_panel, "ICE Parameters")
        self.uintah_tabbed_pane.addTab(self.ice_mat_panel, "ICE Materials")
        self.uintah_tabbed_pane.addTab(self.exchange_panel, "Exchange")
        self.uintah_tabbed_pane.addTab(self.grid_bc_panel, "Grid and BC")
        
        self.uintah_tabbed_pane.setCurrentIndex(0)
        self.uintah_tabbed_pane.currentChanged.connect(self.on_tab_changed)

        # Disable all except General Inputs initially
        self.enable_tabs("none")

        main_layout.addWidget(self.uintah_tabbed_pane)
        self.setLayout(main_layout)

    def on_tab_changed(self, index):
        if index == 1:
            self.geom_panel.set_visible_display_geometry_frame(True)
        
        num_particles = self.d_part_list.size()
        if num_particles > 0:
            if self.d_sim_component == "mpm":
                self.mpm_mat_panel.create_part_list_mpm_material(self.d_sim_component)
            elif self.d_sim_component == "mpmice":
                self.ice_mat_panel.create_part_list_ice_material(self.d_sim_component)
        
        self.general_inp_panel.refresh()
        self.geom_panel.refresh()
        self.mpm_inp_panel.refresh()
        self.mpm_mat_panel.refresh()
        self.ice_inp_panel.refresh()
        self.ice_mat_panel.refresh()
        
        self.exchange_panel.update_materials(self.d_mpm_mat, self.d_ice_mat)

    def set_visible_display_frame(self, visible):
        self.geom_panel.set_visible_display_geometry_frame(visible)

    def get_sim_component(self):
        return self.d_sim_component

    def enable_tabs(self, sim_component):
        self.d_sim_component = sim_component
        
        # Mapping index to enable state
        tabs_state = [False] * 8
        tabs_state[0] = True # General Inputs always enabled

        if sim_component == "mpm":
            tabs_state[1] = True # Geometry
            tabs_state[2] = True # MPM Params
            tabs_state[3] = True # MPM Mats
            tabs_state[7] = True # Grid BC
        elif sim_component == "ice":
            tabs_state[1] = True
            tabs_state[4] = True # ICE Params
            tabs_state[5] = True # ICE Mats
            tabs_state[6] = True # Exchange
            tabs_state[7] = True
        elif sim_component == "mpmice":
            for i in range(1, 8):
                tabs_state[i] = True
        
        for i in range(1, 8):
            self.uintah_tabbed_pane.setTabEnabled(i, tabs_state[i])

    def update_panels(self):
        self.update()
        if self.d_parent:
            self.d_parent.update_panels()

    def write_uintah(self, file):
        if file is None:
            return
        
        tab = "  "
        tab1 = tab + "  "
        tab2 = tab1 + "  "

        file.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
        file.write("<!-- <!DOCTYPE Uintah_specification SYSTEM \"input.dtd\"> -->\n")
        file.write("<Uintah_specification>\n")
        file.write(f"{tab}\n")

        self.general_inp_panel.write_uintah(file, tab)
        self.mpm_inp_panel.write_uintah(file, tab)
        self.ice_inp_panel.write_uintah(file, tab)

        file.write(f"{tab}<MaterialProperties>\n")
        file.write(f"{tab}\n")

        file.write(f"{tab1}<MPM>\n")
        num_mpm_mat = len(self.d_mpm_mat)
        for ii in range(num_mpm_mat):
            self.mpm_mat_panel.write_uintah(file, tab2, ii)
        self.mpm_mat_panel.write_uintah_contact(file, tab2)
        file.write(f"{tab1}</MPM>\n")
        file.write(f"{tab}\n")

        file.write(f"{tab1}<ICE>\n")
        num_ice_mat = len(self.d_ice_mat)
        for ii in range(num_ice_mat):
            self.ice_mat_panel.write_uintah(file, tab2, ii)
        file.write(f"{tab1}</ICE>\n")
        file.write(f"{tab}\n")

        file.write(f"{tab1}<exchange_properties>\n")
        self.exchange_panel.write_uintah(file, tab2)
        file.write(f"{tab1}</exchange_properties>\n")

        file.write(f"{tab}</MaterialProperties>\n")
        file.write(f"{tab}\n")

        file.write(f"{tab}<Grid>\n")
        self.grid_bc_panel.write_uintah(file, tab1)
        file.write(f"{tab}</Grid>\n")

        file.write(f"{tab}<PhysicalBC>\n")
        file.write(f"{tab1}<MPM>\n")
        file.write(f"{tab1}</MPM>\n")
        file.write(f"{tab}</PhysicalBC>\n")
        file.write(f"{tab}\n")

        file.write("</Uintah_specification>\n")
