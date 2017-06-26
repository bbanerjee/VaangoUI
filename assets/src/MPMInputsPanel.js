"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var vaango_ui;
(function (vaango_ui) {
    var MPMInputsPanel = (function (_super) {
        __extends(MPMInputsPanel, _super);
        function MPMInputsPanel(parent) {
            var _this = _super.call(this) || this;
            _this.d_integrator = null;
            _this.d_mpmAlgo = null;
            _this.d_failAlgo = null;
            _this.d_impDynamic = true;
            _this.d_solver = null;
            _this.d_gridReset = true;
            _this.d_loadCurve = false;
            _this.d_fricHeat = false;
            _this.d_damping = 0.0;
            _this.d_viscosity = false;
            _this.d_convert = false;
            _this.d_impHeat = false;
            _this.mpmFlagInputPanel = null;
            _this.saveButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_integrator = new String("explicit");
            _this.d_mpmAlgo = new String("linear");
            _this.d_failAlgo = new String("none");
            _this.d_impDynamic = true;
            _this.d_solver = new String("petsc");
            _this.d_gridReset = true;
            _this.d_loadCurve = false;
            _this.d_fricHeat = false;
            _this.d_damping = 0.0;
            _this.d_viscosity = false;
            _this.d_convert = false;
            _this.d_impHeat = false;
            _this.mpmFlagInputPanel = new MPMInputsPanel.MPMFlagInputPanel(_this);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            _this.saveButton = new JButton("Save");
            _this.saveButton.setActionCommand("save");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.mpmFlagInputPanel, gbc);
            _this.add(_this.mpmFlagInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.saveButton, gbc);
            _this.add(_this.saveButton);
            var buttonListener = new MPMInputsPanel.ButtonListener(_this);
            _this.saveButton.addActionListener(buttonListener);
            return _this;
        }
        MPMInputsPanel.prototype.refresh = function () {
            this.mpmFlagInputPanel.refresh();
        };
        MPMInputsPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            this.mpmFlagInputPanel.writeUintah(pw, tab);
        };
        return MPMInputsPanel;
    }(JPanel));
    /**
     *
     */
    MPMInputsPanel.serialVersionUID = 4158953765783251830;
    vaango_ui.MPMInputsPanel = MPMInputsPanel;
    (function (MPMInputsPanel) {
        var ButtonListener = (function () {
            function ButtonListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
            ButtonListener.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "save") {
                    var outputFile = new File("test.ups");
                    try {
                        var fw = new FileWriter(outputFile);
                        var pw = new PrintWriter(fw);
                        this.__parent.mpmFlagInputPanel.writeUintah(pw, "  ");
                        pw.close();
                        fw.close();
                    }
                    catch (event) {
                        console.info("Could not write MPMFlagInputPanel to file " + outputFile.getName());
                    }
                    ;
                }
            };
            return ButtonListener;
        }());
        MPMInputsPanel.ButtonListener = ButtonListener;
        var MPMFlagInputPanel = (function (_super) {
            __extends(MPMFlagInputPanel, _super);
            function MPMFlagInputPanel(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -7696820022141671434;
                _this.integratorComB = null;
                _this.mpmAlgoComB = null;
                _this.gridResetCB = null;
                _this.minMassEntry = null;
                _this.maxVelEntry = null;
                _this.loadCurvesCB = null;
                _this.fricHeatCB = null;
                _this.dampingCB = null;
                _this.dampCoeffEntry = null;
                _this.viscosityCB = null;
                _this.viscCoeff1Entry = null;
                _this.viscCoeff2Entry = null;
                _this.failAlgoComB = null;
                _this.convertCB = null;
                _this.implicitAlgoComB = null;
                _this.implicitSolverComB = null;
                _this.impHeatCB = null;
                _this.convDispEntry = null;
                _this.convEnergyEntry = null;
                _this.maxItersDecDeltEntry = null;
                _this.delTDecFacEntry = null;
                _this.minItersIncDeltEntry = null;
                _this.delTIncFacEntry = null;
                _this.maxItersRestartEntry = null;
                _this.implicitAlgoLabel = null;
                _this.implicitSolverLabel = null;
                _this.convDispLabel = null;
                _this.convEnergyLabel = null;
                _this.maxItersDecDeltLabel = null;
                _this.delTDecFacLabel = null;
                _this.minItersIncDeltLabel = null;
                _this.delTIncFacLabel = null;
                _this.maxItersRestartLabel = null;
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.setLayout(gb);
                var panel1 = new JPanel(new GridLayout(1, 0));
                var integratorLabel = new JLabel("Time Integration");
                _this.integratorComB = new JComboBox();
                _this.integratorComB.addItem("Explicit");
                _this.integratorComB.addItem("Implicit");
                panel1.add(integratorLabel);
                panel1.add(_this.integratorComB);
                var mpmAlgoLabel = new JLabel("MPM Interpolation");
                _this.mpmAlgoComB = new JComboBox();
                _this.mpmAlgoComB.addItem("Linear");
                _this.mpmAlgoComB.addItem("GIMP");
                _this.mpmAlgoComB.addItem("CPDI");
                panel1.add(mpmAlgoLabel);
                panel1.add(_this.mpmAlgoComB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel1, gbc);
                _this.add(panel1);
                var gbPanel2 = new GridBagLayout();
                var gbcPanel2 = new GridBagConstraints();
                var panel2 = new JPanel(gbPanel2);
                var minMassLabel = new JLabel("Minimum Allowed Particle Mass");
                _this.minMassEntry = new vaango_ui.DecimalField(1.0E-12, 9, true);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gbPanel2.setConstraints(minMassLabel, gbcPanel2);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
                gbPanel2.setConstraints(_this.minMassEntry, gbcPanel2);
                panel2.add(minMassLabel);
                panel2.add(_this.minMassEntry);
                var maxVelLabel = new JLabel("Maximum Allowed Particle Velocity");
                _this.maxVelEntry = new vaango_ui.DecimalField(1.0E8, 9, true);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gbPanel2.setConstraints(maxVelLabel, gbcPanel2);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.NONE, 1.0, 1.0, 1, 1, 1, 1, 5);
                gbPanel2.setConstraints(_this.maxVelEntry, gbcPanel2);
                panel2.add(maxVelLabel);
                panel2.add(_this.maxVelEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
                gb.setConstraints(panel2, gbc);
                _this.add(panel2);
                var panel3 = new JPanel(new GridLayout(3, 0));
                _this.gridResetCB = new JCheckBox("Reset Grid Every Timestep");
                _this.gridResetCB.setSelected(true);
                panel3.add(_this.gridResetCB);
                _this.loadCurvesCB = new JCheckBox("Use Load Curves");
                _this.loadCurvesCB.setSelected(false);
                panel3.add(_this.loadCurvesCB);
                _this.fricHeatCB = new JCheckBox("Heating Due to Contact Friction");
                _this.fricHeatCB.setSelected(false);
                panel3.add(_this.fricHeatCB);
                _this.impHeatCB = new JCheckBox("Implicit Heat Conduction");
                _this.impHeatCB.setSelected(false);
                _this.impHeatCB.setEnabled(false);
                panel3.add(_this.impHeatCB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 3, 1, 1, 5);
                gb.setConstraints(panel3, gbc);
                _this.add(panel3);
                var gbPanel4 = new GridBagLayout();
                var gbcPanel4 = new GridBagConstraints();
                var panel4 = new JPanel(gbPanel4);
                _this.dampingCB = new JCheckBox("Velocity Damping");
                _this.dampingCB.setSelected(false);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gbPanel4.setConstraints(_this.dampingCB, gbcPanel4);
                panel4.add(_this.dampingCB);
                var dampCoeffLabel = new JLabel("Velocity Damping Coeff.");
                _this.dampCoeffEntry = new vaango_ui.DecimalField(0.0, 5);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
                gbPanel4.setConstraints(dampCoeffLabel, gbcPanel4);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 2, 0, 1, 1, 5);
                gbPanel4.setConstraints(_this.dampCoeffEntry, gbcPanel4);
                panel4.add(dampCoeffLabel);
                panel4.add(_this.dampCoeffEntry);
                _this.viscosityCB = new JCheckBox("Force Damping (Artificial Viscosity)");
                _this.viscosityCB.setSelected(false);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gbPanel4.setConstraints(_this.viscosityCB, gbcPanel4);
                panel4.add(_this.viscosityCB);
                var viscCoeff1Label = new JLabel("Viscosity Coeff. 1");
                _this.viscCoeff1Entry = new vaango_ui.DecimalField(0.2, 5);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 1, 1, 1, 1, 5);
                gbPanel4.setConstraints(viscCoeff1Label, gbcPanel4);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 2, 1, 1, 1, 5);
                gbPanel4.setConstraints(_this.viscCoeff1Entry, gbcPanel4);
                panel4.add(viscCoeff1Label);
                panel4.add(_this.viscCoeff1Entry);
                var viscCoeff2Label = new JLabel("Viscosity Coeff. 2");
                _this.viscCoeff2Entry = new vaango_ui.DecimalField(2.0, 5);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 3, 1, 1, 1, 5);
                gbPanel4.setConstraints(viscCoeff2Label, gbcPanel4);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 4, 1, 1, 1, 5);
                gbPanel4.setConstraints(_this.viscCoeff2Entry, gbcPanel4);
                panel4.add(viscCoeff2Label);
                panel4.add(_this.viscCoeff2Entry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 4, 1, 1, 5);
                gb.setConstraints(panel4, gbc);
                _this.add(panel4);
                var panel6 = new JPanel(new GridLayout(2, 0));
                var failAlgoLabel = new JLabel("Failure Algorithm");
                _this.failAlgoComB = new JComboBox();
                _this.failAlgoComB.addItem("No Failure");
                _this.failAlgoComB.addItem("Zero Stress After Failure");
                _this.failAlgoComB.addItem("Allow No Tension After Failure");
                _this.failAlgoComB.addItem("Remove Mass After Failure");
                _this.failAlgoComB.addItem("Keep Stress After Failure");
                panel6.add(failAlgoLabel);
                panel6.add(_this.failAlgoComB);
                _this.convertCB = new JCheckBox("Create New Material For Failed Particles");
                _this.convertCB.setSelected(false);
                _this.convertCB.setEnabled(false);
                panel6.add(_this.convertCB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 6, 1, 1, 5);
                gb.setConstraints(panel6, gbc);
                _this.add(panel6);
                var panel7 = new JPanel(new GridLayout(1, 0));
                _this.implicitAlgoLabel = new JLabel("Implicit MPM Algorithm");
                _this.implicitAlgoComB = new JComboBox();
                _this.implicitAlgoComB.addItem("Dynamic");
                _this.implicitAlgoComB.addItem("Quasistatic");
                panel7.add(_this.implicitAlgoLabel);
                panel7.add(_this.implicitAlgoComB);
                _this.implicitSolverLabel = new JLabel("Implicit MPM Solver");
                _this.implicitSolverComB = new JComboBox();
                _this.implicitSolverComB.addItem("Petsc Solver");
                _this.implicitSolverComB.addItem("Simple Solver");
                panel7.add(_this.implicitSolverLabel);
                panel7.add(_this.implicitSolverComB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 7, 1, 1, 5);
                gb.setConstraints(panel7, gbc);
                _this.add(panel7);
                var gbPanel9 = new GridBagLayout();
                var gbcPanel9 = new GridBagConstraints();
                var panel9 = new JPanel(gbPanel9);
                _this.convDispLabel = new JLabel("Convergence Tol. (Disp.)");
                _this.convDispEntry = new vaango_ui.DecimalField(1.0E-10, 9, true);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gbPanel9.setConstraints(_this.convDispLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
                gbPanel9.setConstraints(_this.convDispEntry, gbcPanel9);
                panel9.add(_this.convDispLabel);
                panel9.add(_this.convDispEntry);
                _this.convEnergyLabel = new JLabel("Convergence Tol. (Energy)");
                _this.convEnergyEntry = new vaango_ui.DecimalField(4.0E-10, 9, true);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 2, 0, 1, 1, 5);
                gbPanel9.setConstraints(_this.convEnergyLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 3, 0, 1, 1, 5);
                gbPanel9.setConstraints(_this.convEnergyEntry, gbcPanel9);
                panel9.add(_this.convEnergyLabel);
                panel9.add(_this.convEnergyEntry);
                _this.maxItersDecDeltLabel = new JLabel("Max. Iter. Before Timestep Decrease ");
                _this.maxItersDecDeltEntry = new vaango_ui.IntegerField(12, 5);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gbPanel9.setConstraints(_this.maxItersDecDeltLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 1, 1, 1, 5);
                gbPanel9.setConstraints(_this.maxItersDecDeltEntry, gbcPanel9);
                panel9.add(_this.maxItersDecDeltLabel);
                panel9.add(_this.maxItersDecDeltEntry);
                _this.delTDecFacLabel = new JLabel("Timestep Decrease Factor");
                _this.delTDecFacEntry = new vaango_ui.DecimalField(0.5, 4);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 2, 1, 1, 1, 5);
                gbPanel9.setConstraints(_this.delTDecFacLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 3, 1, 1, 1, 5);
                gbPanel9.setConstraints(_this.delTDecFacEntry, gbcPanel9);
                panel9.add(_this.delTDecFacLabel);
                panel9.add(_this.delTDecFacEntry);
                _this.minItersIncDeltLabel = new JLabel("Min. Iter. Before Timestep Increase ");
                _this.minItersIncDeltEntry = new vaango_ui.IntegerField(4, 5);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
                gbPanel9.setConstraints(_this.minItersIncDeltLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 2, 1, 1, 5);
                gbPanel9.setConstraints(_this.minItersIncDeltEntry, gbcPanel9);
                panel9.add(_this.minItersIncDeltLabel);
                panel9.add(_this.minItersIncDeltEntry);
                _this.delTIncFacLabel = new JLabel("Timestep Increase Factor");
                _this.delTIncFacEntry = new vaango_ui.DecimalField(2.0, 4);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 2, 2, 1, 1, 5);
                gbPanel9.setConstraints(_this.delTIncFacLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 3, 2, 1, 1, 5);
                gbPanel9.setConstraints(_this.delTIncFacEntry, gbcPanel9);
                panel9.add(_this.delTIncFacLabel);
                panel9.add(_this.delTIncFacEntry);
                _this.maxItersRestartLabel = new JLabel("Max. Iter. Before Timestep Restart ");
                _this.maxItersRestartEntry = new vaango_ui.IntegerField(15, 5);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 3, 1, 1, 5);
                gbPanel9.setConstraints(_this.maxItersRestartLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 3, 1, 1, 5);
                gbPanel9.setConstraints(_this.maxItersRestartEntry, gbcPanel9);
                panel9.add(_this.maxItersRestartLabel);
                panel9.add(_this.maxItersRestartEntry);
                _this.implicitAlgoLabel.setEnabled(false);
                _this.implicitSolverLabel.setEnabled(false);
                _this.convDispLabel.setEnabled(false);
                _this.convEnergyLabel.setEnabled(false);
                _this.maxItersDecDeltLabel.setEnabled(false);
                _this.delTDecFacLabel.setEnabled(false);
                _this.minItersIncDeltLabel.setEnabled(false);
                _this.delTIncFacLabel.setEnabled(false);
                _this.maxItersRestartLabel.setEnabled(false);
                _this.implicitAlgoComB.setEnabled(false);
                _this.implicitSolverComB.setEnabled(false);
                _this.impHeatCB.setEnabled(false);
                _this.convDispEntry.setEnabled(false);
                _this.convEnergyEntry.setEnabled(false);
                _this.maxItersDecDeltEntry.setEnabled(false);
                _this.delTDecFacEntry.setEnabled(false);
                _this.minItersIncDeltEntry.setEnabled(false);
                _this.delTIncFacEntry.setEnabled(false);
                _this.maxItersRestartEntry.setEnabled(false);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 9, 1, 1, 5);
                gb.setConstraints(panel9, gbc);
                _this.add(panel9);
                var comboBoxListener = new MPMFlagInputPanel.ComboBoxListener(_this);
                _this.integratorComB.addItemListener(comboBoxListener);
                _this.mpmAlgoComB.addItemListener(comboBoxListener);
                _this.failAlgoComB.addItemListener(comboBoxListener);
                _this.implicitAlgoComB.addItemListener(comboBoxListener);
                _this.implicitSolverComB.addItemListener(comboBoxListener);
                var cbListener = new MPMFlagInputPanel.CheckBoxListener(_this);
                _this.gridResetCB.addItemListener(cbListener);
                _this.loadCurvesCB.addItemListener(cbListener);
                _this.fricHeatCB.addItemListener(cbListener);
                _this.dampingCB.addItemListener(cbListener);
                _this.viscosityCB.addItemListener(cbListener);
                _this.convertCB.addItemListener(cbListener);
                _this.impHeatCB.addItemListener(cbListener);
                return _this;
            }
            MPMFlagInputPanel.prototype.refresh = function () {
            };
            /**
             * Write the contents out in Uintah format
             */
            MPMFlagInputPanel.prototype.writeUintah = function (pw, tab) {
                if (pw == null)
                    return;
                try {
                    var tab1 = new String(tab + "  ");
                    pw.println(tab + "<MPM>");
                    pw.println(tab1 + "<time_integrator> " + this.__parent.d_integrator + " </time_integrator>");
                    pw.println(tab1 + "<interpolator> " + this.__parent.d_mpmAlgo + " </interpolator>");
                    pw.println(tab1 + "<minimum_particle_mass> " + this.minMassEntry.getValue() + " </minimum_particle_mass>");
                    pw.println(tab1 + "<maximum_particle_velocity> " + this.maxVelEntry.getValue() + " </maximum_particle_velocity>");
                    if (!this.__parent.d_gridReset) {
                        pw.println(tab1 + "<do_grid_reset> " + this.__parent.d_gridReset + " </do_grid_reset>");
                    }
                    pw.println(tab1 + "<use_load_curves> " + this.__parent.d_loadCurve + " </use_load_curves>");
                    pw.println(tab1 + "<do_contact_friction_heating> " + this.__parent.d_fricHeat + " </do_contact_friction_heating>");
                    pw.println(tab1 + "<artificial_damping_coeff> " + this.__parent.d_damping + " </artificial_damping_coeff>");
                    pw.println(tab1 + "<artificial_viscosity> " + this.__parent.d_viscosity + " </artificial_viscosity>");
                    pw.println(tab1 + "<artificial_viscosity_coeff1> " + this.viscCoeff1Entry.getValue() + " </artificial_viscosity_coeff1>");
                    pw.println(tab1 + "<artificial_viscosity_coeff2> " + this.viscCoeff2Entry.getValue() + " </artificial_viscosity_coeff2>");
                    pw.println(tab1 + "<erosion algorithm = \"" + this.__parent.d_failAlgo + "\"/>");
                    pw.println(tab1 + "<create_new_particles> " + this.__parent.d_convert + " </create_new_particles>");
                    if (this.__parent.d_integrator === "implicit") {
                        pw.println(tab1 + "<dynamic> " + this.__parent.d_impDynamic + " </dynamic>");
                        pw.println(tab1 + "<solver> " + this.__parent.d_solver + " </solver>");
                        pw.println(tab1 + "<DoImplicitHeatConduction> " + this.__parent.d_impHeat + " </DoImplicitHeatConduction>");
                        pw.println(tab1 + "<convergence_criteria_disp> " + this.convDispEntry.getValue() + " </convergence_criteria_disp>");
                        pw.println(tab1 + "<convergence_criteria_energy> " + this.convEnergyEntry.getValue() + " </convergence_criteria_energy>");
                        pw.println(tab1 + "<num_iters_to_decrease_delT> " + this.maxItersDecDeltEntry.getValue() + " </num_iters_to_decrease_delT>");
                        pw.println(tab1 + "<delT_decrease_factor> " + this.delTDecFacEntry.getValue() + " </delT_decrease_factor>");
                        pw.println(tab1 + "<num_iters_to_increase_delT> " + this.minItersIncDeltEntry.getValue() + " </num_iters_to_increase_delT>");
                        pw.println(tab1 + "<delT_increase_factor> " + this.delTIncFacEntry.getValue() + " </delT_increase_factor>");
                        pw.println(tab1 + "<iters_before_timestep_restart> " + this.maxItersRestartEntry.getValue() + " </iters_before_timestep_restart>");
                    }
                    pw.println(tab + "</MPM>");
                    pw.println(tab);
                }
                catch (e) {
                    console.info("Could not write MPMFlagInputPanel");
                }
                ;
            };
            return MPMFlagInputPanel;
        }(JPanel));
        MPMInputsPanel.MPMFlagInputPanel = MPMFlagInputPanel;
        (function (MPMFlagInputPanel) {
            var ComboBoxListener = (function () {
                function ComboBoxListener(__parent) {
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ItemListener"] });
                    this.__parent = __parent;
                }
                ComboBoxListener.prototype.itemStateChanged = function (e) {
                    var source = e.getItemSelectable();
                    var item = new String(e.getItem()).toString();
                    if (source === this.__parent.integratorComB) {
                        if (item === "Explicit") {
                            this.__parent.__parent.d_integrator = "explicit";
                            this.__parent.implicitAlgoLabel.setEnabled(false);
                            this.__parent.implicitSolverLabel.setEnabled(false);
                            this.__parent.convDispLabel.setEnabled(false);
                            this.__parent.convEnergyLabel.setEnabled(false);
                            this.__parent.maxItersDecDeltLabel.setEnabled(false);
                            this.__parent.delTDecFacLabel.setEnabled(false);
                            this.__parent.minItersIncDeltLabel.setEnabled(false);
                            this.__parent.delTIncFacLabel.setEnabled(false);
                            this.__parent.maxItersRestartLabel.setEnabled(false);
                            this.__parent.implicitAlgoComB.setEnabled(false);
                            this.__parent.implicitSolverComB.setEnabled(false);
                            this.__parent.impHeatCB.setEnabled(false);
                            this.__parent.convDispEntry.setEnabled(false);
                            this.__parent.convEnergyEntry.setEnabled(false);
                            this.__parent.maxItersDecDeltEntry.setEnabled(false);
                            this.__parent.delTDecFacEntry.setEnabled(false);
                            this.__parent.minItersIncDeltEntry.setEnabled(false);
                            this.__parent.delTIncFacEntry.setEnabled(false);
                            this.__parent.maxItersRestartEntry.setEnabled(false);
                        }
                        else {
                            this.__parent.__parent.d_integrator = "implicit";
                            this.__parent.implicitAlgoLabel.setEnabled(true);
                            this.__parent.implicitSolverLabel.setEnabled(true);
                            this.__parent.convDispLabel.setEnabled(true);
                            this.__parent.convEnergyLabel.setEnabled(true);
                            this.__parent.maxItersDecDeltLabel.setEnabled(true);
                            this.__parent.delTDecFacLabel.setEnabled(true);
                            this.__parent.minItersIncDeltLabel.setEnabled(true);
                            this.__parent.delTIncFacLabel.setEnabled(true);
                            this.__parent.maxItersRestartLabel.setEnabled(true);
                            this.__parent.implicitAlgoComB.setEnabled(true);
                            this.__parent.implicitSolverComB.setEnabled(true);
                            this.__parent.impHeatCB.setEnabled(true);
                            this.__parent.convDispEntry.setEnabled(true);
                            this.__parent.convEnergyEntry.setEnabled(true);
                            this.__parent.maxItersDecDeltEntry.setEnabled(true);
                            this.__parent.delTDecFacEntry.setEnabled(true);
                            this.__parent.minItersIncDeltEntry.setEnabled(true);
                            this.__parent.delTIncFacEntry.setEnabled(true);
                            this.__parent.maxItersRestartEntry.setEnabled(true);
                        }
                    }
                    else if (source === this.__parent.mpmAlgoComB) {
                        if (item === "Linear") {
                            this.__parent.__parent.d_mpmAlgo = "linear";
                        }
                        else if (item === "GIMP") {
                            this.__parent.__parent.d_mpmAlgo = "gimp";
                        }
                        else {
                            this.__parent.__parent.d_mpmAlgo = "cpdi";
                        }
                    }
                    else if (source === this.__parent.failAlgoComB) {
                        if (item === "No Failure") {
                            this.__parent.__parent.d_failAlgo = "none";
                        }
                        else if (item === "Remove Mass After Failure") {
                            this.__parent.__parent.d_failAlgo = "RemoveMass";
                            this.__parent.convertCB.setEnabled(true);
                        }
                        else if (item === "Zero Stress After Failure") {
                            this.__parent.__parent.d_failAlgo = "ZeroStress";
                            this.__parent.convertCB.setEnabled(true);
                        }
                        else if (item === "Allow No Tension After Failure") {
                            this.__parent.__parent.d_failAlgo = "AllowNoTension";
                            this.__parent.convertCB.setEnabled(true);
                        }
                        else {
                            this.__parent.__parent.d_failAlgo = "KeepStress";
                            this.__parent.convertCB.setEnabled(true);
                        }
                    }
                    else if (source === this.__parent.implicitAlgoComB) {
                        if (item === "Dynamic") {
                            this.__parent.__parent.d_impDynamic = true;
                        }
                        else {
                            this.__parent.__parent.d_impDynamic = false;
                        }
                    }
                    else if (source === this.__parent.implicitSolverComB) {
                        if (item === "Petsc Solver") {
                            this.__parent.__parent.d_solver = "petsc";
                        }
                        else {
                            this.__parent.__parent.d_solver = "simple";
                        }
                    }
                };
                return ComboBoxListener;
            }());
            MPMFlagInputPanel.ComboBoxListener = ComboBoxListener;
            var CheckBoxListener = (function () {
                function CheckBoxListener(__parent) {
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ItemListener"] });
                    this.__parent = __parent;
                }
                CheckBoxListener.prototype.itemStateChanged = function (e) {
                    var source = e.getItemSelectable();
                    if (source === this.__parent.gridResetCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_gridReset = true;
                        }
                        else {
                            this.__parent.__parent.d_gridReset = false;
                        }
                    }
                    else if (source === this.__parent.loadCurvesCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_loadCurve = true;
                        }
                        else {
                            this.__parent.__parent.d_loadCurve = false;
                        }
                    }
                    else if (source === this.__parent.fricHeatCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_fricHeat = true;
                        }
                        else {
                            this.__parent.__parent.d_fricHeat = false;
                        }
                    }
                    else if (source === this.__parent.dampingCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.dampCoeffEntry.setEnabled(true);
                            this.__parent.__parent.d_damping = this.__parent.dampCoeffEntry.getValue();
                        }
                        else {
                            this.__parent.__parent.d_damping = 0.0;
                            this.__parent.dampCoeffEntry.setEnabled(false);
                        }
                    }
                    else if (source === this.__parent.viscosityCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_viscosity = true;
                            this.__parent.viscCoeff1Entry.setEnabled(true);
                            this.__parent.viscCoeff2Entry.setEnabled(true);
                        }
                        else {
                            this.__parent.__parent.d_viscosity = false;
                            this.__parent.viscCoeff1Entry.setEnabled(false);
                            this.__parent.viscCoeff2Entry.setEnabled(false);
                        }
                    }
                    else if (source === this.__parent.convertCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_convert = true;
                        }
                        else {
                            this.__parent.__parent.d_convert = false;
                        }
                    }
                    else if (source === this.__parent.impHeatCB) {
                        if (e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_impHeat = true;
                        }
                        else {
                            this.__parent.__parent.d_impHeat = false;
                        }
                    }
                };
                return CheckBoxListener;
            }());
            MPMFlagInputPanel.CheckBoxListener = CheckBoxListener;
        })(MPMFlagInputPanel = MPMInputsPanel.MPMFlagInputPanel || (MPMInputsPanel.MPMFlagInputPanel = {}));
    })(MPMInputsPanel = vaango_ui.MPMInputsPanel || (vaango_ui.MPMInputsPanel = {}));
})(vaango_ui || (vaango_ui = {}));
