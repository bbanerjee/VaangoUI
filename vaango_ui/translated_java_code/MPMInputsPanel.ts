"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class MPMInputsPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = 4158953765783251830;

        private d_integrator : string = null;

        private d_mpmAlgo : string = null;

        private d_failAlgo : string = null;

        private d_impDynamic : boolean = true;

        private d_solver : string = null;

        private d_gridReset : boolean = true;

        private d_loadCurve : boolean = false;

        private d_fricHeat : boolean = false;

        private d_damping : number = 0.0;

        private d_viscosity : boolean = false;

        private d_convert : boolean = false;

        private d_impHeat : boolean = false;

        private mpmFlagInputPanel : MPMInputsPanel.MPMFlagInputPanel = null;

        private saveButton : JButton = null;

        public constructor(parent : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_integrator = <string>new String("explicit");
            this.d_mpmAlgo = <string>new String("linear");
            this.d_failAlgo = <string>new String("none");
            this.d_impDynamic = true;
            this.d_solver = <string>new String("petsc");
            this.d_gridReset = true;
            this.d_loadCurve = false;
            this.d_fricHeat = false;
            this.d_damping = 0.0;
            this.d_viscosity = false;
            this.d_convert = false;
            this.d_impHeat = false;
            this.mpmFlagInputPanel = new MPMInputsPanel.MPMFlagInputPanel(this);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            this.saveButton = new JButton("Save");
            this.saveButton.setActionCommand("save");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.mpmFlagInputPanel, gbc);
            this.add(this.mpmFlagInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.saveButton, gbc);
            this.add(this.saveButton);
            var buttonListener : MPMInputsPanel.ButtonListener = new MPMInputsPanel.ButtonListener(this);
            this.saveButton.addActionListener(buttonListener);
        }

        public refresh() {
            this.mpmFlagInputPanel.refresh();
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            this.mpmFlagInputPanel.writeUintah(pw, tab);
        }
    }

    export namespace MPMInputsPanel {

        export class ButtonListener implements ActionListener {
            public __parent: any;
            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "save") {
                    var outputFile : File = new File("test.ups");
                    try {
                        var fw : FileWriter = new FileWriter(outputFile);
                        var pw : PrintWriter = new PrintWriter(fw);
                        this.__parent.mpmFlagInputPanel.writeUintah(pw, "  ");
                        pw.close();
                        fw.close();
                    } catch(event) {
                        console.info("Could not write MPMFlagInputPanel to file " + outputFile.getName());
                    };
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
        }

        export class MPMFlagInputPanel extends JPanel {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            integratorComB : JComboBox<string>;

            mpmAlgoComB : JComboBox<string>;

            gridResetCB : JCheckBox;

            minMassEntry : DecimalField;

            maxVelEntry : DecimalField;

            loadCurvesCB : JCheckBox;

            fricHeatCB : JCheckBox;

            dampingCB : JCheckBox;

            dampCoeffEntry : DecimalField;

            viscosityCB : JCheckBox;

            viscCoeff1Entry : DecimalField;

            viscCoeff2Entry : DecimalField;

            failAlgoComB : JComboBox<string>;

            convertCB : JCheckBox;

            implicitAlgoComB : JComboBox<string>;

            implicitSolverComB : JComboBox<string>;

            impHeatCB : JCheckBox;

            convDispEntry : DecimalField;

            convEnergyEntry : DecimalField;

            maxItersDecDeltEntry : IntegerField;

            delTDecFacEntry : DecimalField;

            minItersIncDeltEntry : IntegerField;

            delTIncFacEntry : DecimalField;

            maxItersRestartEntry : IntegerField;

            implicitAlgoLabel : JLabel;

            implicitSolverLabel : JLabel;

            convDispLabel : JLabel;

            convEnergyLabel : JLabel;

            maxItersDecDeltLabel : JLabel;

            delTDecFacLabel : JLabel;

            minItersIncDeltLabel : JLabel;

            delTIncFacLabel : JLabel;

            maxItersRestartLabel : JLabel;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -7696820022141671434;
                this.integratorComB = null;
                this.mpmAlgoComB = null;
                this.gridResetCB = null;
                this.minMassEntry = null;
                this.maxVelEntry = null;
                this.loadCurvesCB = null;
                this.fricHeatCB = null;
                this.dampingCB = null;
                this.dampCoeffEntry = null;
                this.viscosityCB = null;
                this.viscCoeff1Entry = null;
                this.viscCoeff2Entry = null;
                this.failAlgoComB = null;
                this.convertCB = null;
                this.implicitAlgoComB = null;
                this.implicitSolverComB = null;
                this.impHeatCB = null;
                this.convDispEntry = null;
                this.convEnergyEntry = null;
                this.maxItersDecDeltEntry = null;
                this.delTDecFacEntry = null;
                this.minItersIncDeltEntry = null;
                this.delTIncFacEntry = null;
                this.maxItersRestartEntry = null;
                this.implicitAlgoLabel = null;
                this.implicitSolverLabel = null;
                this.convDispLabel = null;
                this.convEnergyLabel = null;
                this.maxItersDecDeltLabel = null;
                this.delTDecFacLabel = null;
                this.minItersIncDeltLabel = null;
                this.delTIncFacLabel = null;
                this.maxItersRestartLabel = null;
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.setLayout(gb);
                var panel1 : JPanel = new JPanel(new GridLayout(1, 0));
                var integratorLabel : JLabel = new JLabel("Time Integration");
                this.integratorComB = new JComboBox<string>();
                this.integratorComB.addItem("Explicit");
                this.integratorComB.addItem("Implicit");
                panel1.add(integratorLabel);
                panel1.add(this.integratorComB);
                var mpmAlgoLabel : JLabel = new JLabel("MPM Interpolation");
                this.mpmAlgoComB = new JComboBox<string>();
                this.mpmAlgoComB.addItem("Linear");
                this.mpmAlgoComB.addItem("GIMP");
                this.mpmAlgoComB.addItem("CPDI");
                panel1.add(mpmAlgoLabel);
                panel1.add(this.mpmAlgoComB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel1, gbc);
                this.add(panel1);
                var gbPanel2 : GridBagLayout = new GridBagLayout();
                var gbcPanel2 : GridBagConstraints = new GridBagConstraints();
                var panel2 : JPanel = new JPanel(gbPanel2);
                var minMassLabel : JLabel = new JLabel("Minimum Allowed Particle Mass");
                this.minMassEntry = new DecimalField(1.0E-12, 9, true);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gbPanel2.setConstraints(minMassLabel, gbcPanel2);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
                gbPanel2.setConstraints(this.minMassEntry, gbcPanel2);
                panel2.add(minMassLabel);
                panel2.add(this.minMassEntry);
                var maxVelLabel : JLabel = new JLabel("Maximum Allowed Particle Velocity");
                this.maxVelEntry = new DecimalField(1.0E8, 9, true);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gbPanel2.setConstraints(maxVelLabel, gbcPanel2);
                UintahGui.setConstraints(gbcPanel2, GridBagConstraints.NONE, 1.0, 1.0, 1, 1, 1, 1, 5);
                gbPanel2.setConstraints(this.maxVelEntry, gbcPanel2);
                panel2.add(maxVelLabel);
                panel2.add(this.maxVelEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
                gb.setConstraints(panel2, gbc);
                this.add(panel2);
                var panel3 : JPanel = new JPanel(new GridLayout(3, 0));
                this.gridResetCB = new JCheckBox("Reset Grid Every Timestep");
                this.gridResetCB.setSelected(true);
                panel3.add(this.gridResetCB);
                this.loadCurvesCB = new JCheckBox("Use Load Curves");
                this.loadCurvesCB.setSelected(false);
                panel3.add(this.loadCurvesCB);
                this.fricHeatCB = new JCheckBox("Heating Due to Contact Friction");
                this.fricHeatCB.setSelected(false);
                panel3.add(this.fricHeatCB);
                this.impHeatCB = new JCheckBox("Implicit Heat Conduction");
                this.impHeatCB.setSelected(false);
                this.impHeatCB.setEnabled(false);
                panel3.add(this.impHeatCB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 3, 1, 1, 5);
                gb.setConstraints(panel3, gbc);
                this.add(panel3);
                var gbPanel4 : GridBagLayout = new GridBagLayout();
                var gbcPanel4 : GridBagConstraints = new GridBagConstraints();
                var panel4 : JPanel = new JPanel(gbPanel4);
                this.dampingCB = new JCheckBox("Velocity Damping");
                this.dampingCB.setSelected(false);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gbPanel4.setConstraints(this.dampingCB, gbcPanel4);
                panel4.add(this.dampingCB);
                var dampCoeffLabel : JLabel = new JLabel("Velocity Damping Coeff.");
                this.dampCoeffEntry = new DecimalField(0.0, 5);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
                gbPanel4.setConstraints(dampCoeffLabel, gbcPanel4);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 2, 0, 1, 1, 5);
                gbPanel4.setConstraints(this.dampCoeffEntry, gbcPanel4);
                panel4.add(dampCoeffLabel);
                panel4.add(this.dampCoeffEntry);
                this.viscosityCB = new JCheckBox("Force Damping (Artificial Viscosity)");
                this.viscosityCB.setSelected(false);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gbPanel4.setConstraints(this.viscosityCB, gbcPanel4);
                panel4.add(this.viscosityCB);
                var viscCoeff1Label : JLabel = new JLabel("Viscosity Coeff. 1");
                this.viscCoeff1Entry = new DecimalField(0.2, 5);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 1, 1, 1, 1, 5);
                gbPanel4.setConstraints(viscCoeff1Label, gbcPanel4);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 2, 1, 1, 1, 5);
                gbPanel4.setConstraints(this.viscCoeff1Entry, gbcPanel4);
                panel4.add(viscCoeff1Label);
                panel4.add(this.viscCoeff1Entry);
                var viscCoeff2Label : JLabel = new JLabel("Viscosity Coeff. 2");
                this.viscCoeff2Entry = new DecimalField(2.0, 5);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 3, 1, 1, 1, 5);
                gbPanel4.setConstraints(viscCoeff2Label, gbcPanel4);
                UintahGui.setConstraints(gbcPanel4, GridBagConstraints.NONE, 1.0, 1.0, 4, 1, 1, 1, 5);
                gbPanel4.setConstraints(this.viscCoeff2Entry, gbcPanel4);
                panel4.add(viscCoeff2Label);
                panel4.add(this.viscCoeff2Entry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 4, 1, 1, 5);
                gb.setConstraints(panel4, gbc);
                this.add(panel4);
                var panel6 : JPanel = new JPanel(new GridLayout(2, 0));
                var failAlgoLabel : JLabel = new JLabel("Failure Algorithm");
                this.failAlgoComB = new JComboBox<string>();
                this.failAlgoComB.addItem("No Failure");
                this.failAlgoComB.addItem("Zero Stress After Failure");
                this.failAlgoComB.addItem("Allow No Tension After Failure");
                this.failAlgoComB.addItem("Remove Mass After Failure");
                this.failAlgoComB.addItem("Keep Stress After Failure");
                panel6.add(failAlgoLabel);
                panel6.add(this.failAlgoComB);
                this.convertCB = new JCheckBox("Create New Material For Failed Particles");
                this.convertCB.setSelected(false);
                this.convertCB.setEnabled(false);
                panel6.add(this.convertCB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 6, 1, 1, 5);
                gb.setConstraints(panel6, gbc);
                this.add(panel6);
                var panel7 : JPanel = new JPanel(new GridLayout(1, 0));
                this.implicitAlgoLabel = new JLabel("Implicit MPM Algorithm");
                this.implicitAlgoComB = new JComboBox<string>();
                this.implicitAlgoComB.addItem("Dynamic");
                this.implicitAlgoComB.addItem("Quasistatic");
                panel7.add(this.implicitAlgoLabel);
                panel7.add(this.implicitAlgoComB);
                this.implicitSolverLabel = new JLabel("Implicit MPM Solver");
                this.implicitSolverComB = new JComboBox<string>();
                this.implicitSolverComB.addItem("Petsc Solver");
                this.implicitSolverComB.addItem("Simple Solver");
                panel7.add(this.implicitSolverLabel);
                panel7.add(this.implicitSolverComB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 7, 1, 1, 5);
                gb.setConstraints(panel7, gbc);
                this.add(panel7);
                var gbPanel9 : GridBagLayout = new GridBagLayout();
                var gbcPanel9 : GridBagConstraints = new GridBagConstraints();
                var panel9 : JPanel = new JPanel(gbPanel9);
                this.convDispLabel = new JLabel("Convergence Tol. (Disp.)");
                this.convDispEntry = new DecimalField(1.0E-10, 9, true);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gbPanel9.setConstraints(this.convDispLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
                gbPanel9.setConstraints(this.convDispEntry, gbcPanel9);
                panel9.add(this.convDispLabel);
                panel9.add(this.convDispEntry);
                this.convEnergyLabel = new JLabel("Convergence Tol. (Energy)");
                this.convEnergyEntry = new DecimalField(4.0E-10, 9, true);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 2, 0, 1, 1, 5);
                gbPanel9.setConstraints(this.convEnergyLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 3, 0, 1, 1, 5);
                gbPanel9.setConstraints(this.convEnergyEntry, gbcPanel9);
                panel9.add(this.convEnergyLabel);
                panel9.add(this.convEnergyEntry);
                this.maxItersDecDeltLabel = new JLabel("Max. Iter. Before Timestep Decrease ");
                this.maxItersDecDeltEntry = new IntegerField(12, 5);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gbPanel9.setConstraints(this.maxItersDecDeltLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 1, 1, 1, 5);
                gbPanel9.setConstraints(this.maxItersDecDeltEntry, gbcPanel9);
                panel9.add(this.maxItersDecDeltLabel);
                panel9.add(this.maxItersDecDeltEntry);
                this.delTDecFacLabel = new JLabel("Timestep Decrease Factor");
                this.delTDecFacEntry = new DecimalField(0.5, 4);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 2, 1, 1, 1, 5);
                gbPanel9.setConstraints(this.delTDecFacLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 3, 1, 1, 1, 5);
                gbPanel9.setConstraints(this.delTDecFacEntry, gbcPanel9);
                panel9.add(this.delTDecFacLabel);
                panel9.add(this.delTDecFacEntry);
                this.minItersIncDeltLabel = new JLabel("Min. Iter. Before Timestep Increase ");
                this.minItersIncDeltEntry = new IntegerField(4, 5);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
                gbPanel9.setConstraints(this.minItersIncDeltLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 2, 1, 1, 5);
                gbPanel9.setConstraints(this.minItersIncDeltEntry, gbcPanel9);
                panel9.add(this.minItersIncDeltLabel);
                panel9.add(this.minItersIncDeltEntry);
                this.delTIncFacLabel = new JLabel("Timestep Increase Factor");
                this.delTIncFacEntry = new DecimalField(2.0, 4);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 2, 2, 1, 1, 5);
                gbPanel9.setConstraints(this.delTIncFacLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 3, 2, 1, 1, 5);
                gbPanel9.setConstraints(this.delTIncFacEntry, gbcPanel9);
                panel9.add(this.delTIncFacLabel);
                panel9.add(this.delTIncFacEntry);
                this.maxItersRestartLabel = new JLabel("Max. Iter. Before Timestep Restart ");
                this.maxItersRestartEntry = new IntegerField(15, 5);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.BOTH, 1.0, 1.0, 0, 3, 1, 1, 5);
                gbPanel9.setConstraints(this.maxItersRestartLabel, gbcPanel9);
                UintahGui.setConstraints(gbcPanel9, GridBagConstraints.NONE, 1.0, 1.0, 1, 3, 1, 1, 5);
                gbPanel9.setConstraints(this.maxItersRestartEntry, gbcPanel9);
                panel9.add(this.maxItersRestartLabel);
                panel9.add(this.maxItersRestartEntry);
                this.implicitAlgoLabel.setEnabled(false);
                this.implicitSolverLabel.setEnabled(false);
                this.convDispLabel.setEnabled(false);
                this.convEnergyLabel.setEnabled(false);
                this.maxItersDecDeltLabel.setEnabled(false);
                this.delTDecFacLabel.setEnabled(false);
                this.minItersIncDeltLabel.setEnabled(false);
                this.delTIncFacLabel.setEnabled(false);
                this.maxItersRestartLabel.setEnabled(false);
                this.implicitAlgoComB.setEnabled(false);
                this.implicitSolverComB.setEnabled(false);
                this.impHeatCB.setEnabled(false);
                this.convDispEntry.setEnabled(false);
                this.convEnergyEntry.setEnabled(false);
                this.maxItersDecDeltEntry.setEnabled(false);
                this.delTDecFacEntry.setEnabled(false);
                this.minItersIncDeltEntry.setEnabled(false);
                this.delTIncFacEntry.setEnabled(false);
                this.maxItersRestartEntry.setEnabled(false);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 9, 1, 1, 5);
                gb.setConstraints(panel9, gbc);
                this.add(panel9);
                var comboBoxListener : MPMFlagInputPanel.ComboBoxListener = new MPMFlagInputPanel.ComboBoxListener(this);
                this.integratorComB.addItemListener(comboBoxListener);
                this.mpmAlgoComB.addItemListener(comboBoxListener);
                this.failAlgoComB.addItemListener(comboBoxListener);
                this.implicitAlgoComB.addItemListener(comboBoxListener);
                this.implicitSolverComB.addItemListener(comboBoxListener);
                var cbListener : MPMFlagInputPanel.CheckBoxListener = new MPMFlagInputPanel.CheckBoxListener(this);
                this.gridResetCB.addItemListener(cbListener);
                this.loadCurvesCB.addItemListener(cbListener);
                this.fricHeatCB.addItemListener(cbListener);
                this.dampingCB.addItemListener(cbListener);
                this.viscosityCB.addItemListener(cbListener);
                this.convertCB.addItemListener(cbListener);
                this.impHeatCB.addItemListener(cbListener);
            }

            public refresh() {
            }

            /**
             * Write the contents out in Uintah format
             */
            public writeUintah(pw : PrintWriter, tab : string) {
                if(pw == null) return;
                try {
                    var tab1 : string = <string>new String(tab + "  ");
                    pw.println(tab + "<MPM>");
                    pw.println(tab1 + "<time_integrator> " + this.__parent.d_integrator + " </time_integrator>");
                    pw.println(tab1 + "<interpolator> " + this.__parent.d_mpmAlgo + " </interpolator>");
                    pw.println(tab1 + "<minimum_particle_mass> " + this.minMassEntry.getValue() + " </minimum_particle_mass>");
                    pw.println(tab1 + "<maximum_particle_velocity> " + this.maxVelEntry.getValue() + " </maximum_particle_velocity>");
                    if(!this.__parent.d_gridReset) {
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
                    if(this.__parent.d_integrator === "implicit") {
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
                } catch(e) {
                    console.info("Could not write MPMFlagInputPanel");
                };
            }
        }

        export namespace MPMFlagInputPanel {

            export class ComboBoxListener implements ItemListener {
                public __parent: any;
                public itemStateChanged(e : ItemEvent) {
                    var source : any = e.getItemSelectable();
                    var item : string = /* valueOf */new String(e.getItem()).toString();
                    if(source === this.__parent.integratorComB) {
                        if(item === "Explicit") {
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
                        } else {
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
                    } else if(source === this.__parent.mpmAlgoComB) {
                        if(item === "Linear") {
                            this.__parent.__parent.d_mpmAlgo = "linear";
                        } else if(item === "GIMP") {
                            this.__parent.__parent.d_mpmAlgo = "gimp";
                        } else {
                            this.__parent.__parent.d_mpmAlgo = "cpdi";
                        }
                    } else if(source === this.__parent.failAlgoComB) {
                        if(item === "No Failure") {
                            this.__parent.__parent.d_failAlgo = "none";
                        } else if(item === "Remove Mass After Failure") {
                            this.__parent.__parent.d_failAlgo = "RemoveMass";
                            this.__parent.convertCB.setEnabled(true);
                        } else if(item === "Zero Stress After Failure") {
                            this.__parent.__parent.d_failAlgo = "ZeroStress";
                            this.__parent.convertCB.setEnabled(true);
                        } else if(item === "Allow No Tension After Failure") {
                            this.__parent.__parent.d_failAlgo = "AllowNoTension";
                            this.__parent.convertCB.setEnabled(true);
                        } else {
                            this.__parent.__parent.d_failAlgo = "KeepStress";
                            this.__parent.convertCB.setEnabled(true);
                        }
                    } else if(source === this.__parent.implicitAlgoComB) {
                        if(item === "Dynamic") {
                            this.__parent.__parent.d_impDynamic = true;
                        } else {
                            this.__parent.__parent.d_impDynamic = false;
                        }
                    } else if(source === this.__parent.implicitSolverComB) {
                        if(item === "Petsc Solver") {
                            this.__parent.__parent.d_solver = "petsc";
                        } else {
                            this.__parent.__parent.d_solver = "simple";
                        }
                    }
                }

                constructor(__parent: any) {
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ItemListener"] });
                    this.__parent = __parent;
                }
            }

            export class CheckBoxListener implements ItemListener {
                public __parent: any;
                public itemStateChanged(e : ItemEvent) {
                    var source : any = e.getItemSelectable();
                    if(source === this.__parent.gridResetCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_gridReset = true;
                        } else {
                            this.__parent.__parent.d_gridReset = false;
                        }
                    } else if(source === this.__parent.loadCurvesCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_loadCurve = true;
                        } else {
                            this.__parent.__parent.d_loadCurve = false;
                        }
                    } else if(source === this.__parent.fricHeatCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_fricHeat = true;
                        } else {
                            this.__parent.__parent.d_fricHeat = false;
                        }
                    } else if(source === this.__parent.dampingCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.dampCoeffEntry.setEnabled(true);
                            this.__parent.__parent.d_damping = this.__parent.dampCoeffEntry.getValue();
                        } else {
                            this.__parent.__parent.d_damping = 0.0;
                            this.__parent.dampCoeffEntry.setEnabled(false);
                        }
                    } else if(source === this.__parent.viscosityCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_viscosity = true;
                            this.__parent.viscCoeff1Entry.setEnabled(true);
                            this.__parent.viscCoeff2Entry.setEnabled(true);
                        } else {
                            this.__parent.__parent.d_viscosity = false;
                            this.__parent.viscCoeff1Entry.setEnabled(false);
                            this.__parent.viscCoeff2Entry.setEnabled(false);
                        }
                    } else if(source === this.__parent.convertCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_convert = true;
                        } else {
                            this.__parent.__parent.d_convert = false;
                        }
                    } else if(source === this.__parent.impHeatCB) {
                        if(e.getStateChange() === ItemEvent.SELECTED) {
                            this.__parent.__parent.d_impHeat = true;
                        } else {
                            this.__parent.__parent.d_impHeat = false;
                        }
                    }
                }

                constructor(__parent: any) {
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ItemListener"] });
                    this.__parent = __parent;
                }
            }
        }

    }

}

