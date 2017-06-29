"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class TimeInputPanel extends JPanel implements ItemListener, ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = 863703153055040651;

        private titleEntry : JTextField = null;

        private simCompCB : JComboBox<string> = null;

        private initTimeEntry : DecimalField = null;

        private maxTimeEntry : DecimalField = null;

        private maxNofStepsEntry : IntegerField = null;

        private deltInitEntry : DecimalField = null;

        private deltMinEntry : DecimalField = null;

        private deltMaxEntry : DecimalField = null;

        private maxDeltIncEntry : DecimalField = null;

        private deltMultiplierEntry : DecimalField = null;

        private udaFilenameEntry : JTextField = null;

        private outputIntervalEntry : DecimalField = null;

        private outputTimestepIntervalEntry : IntegerField = null;

        private checkPointCycleEntry : IntegerField = null;

        private checkPointIntervalEntry : DecimalField = null;

        private checkPointTimestepIntervalEntry : IntegerField = null;

        private d_simType : string = null;

        private d_parent : GeneralInputsPanel = null;

        private d_outputStep : boolean = false;

        private d_checkStep : boolean = false;

        public constructor(simType : string, parent : GeneralInputsPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_simType = simType;
            this.d_parent = parent;
            this.d_outputStep = false;
            this.d_checkStep = false;
            var panel1 : JPanel = new JPanel(new GridLayout(3, 0));
            var titleLabel : JLabel = new JLabel("Simulation Title");
            this.titleEntry = new JTextField("Test Simulation", 20);
            var simCompLabel : JLabel = new JLabel("Simulation Component");
            this.simCompCB = new JComboBox<string>();
            this.simCompCB.addItem("Select one");
            this.simCompCB.addItem("MPM");
            this.simCompCB.addItem("ICE");
            this.simCompCB.addItem("MPMICE");
            var udaFilenameLabel : JLabel = new JLabel("Output UDA Filename");
            this.udaFilenameEntry = new JTextField("test.uda", 20);
            panel1.add(titleLabel);
            panel1.add(this.titleEntry);
            panel1.add(simCompLabel);
            panel1.add(this.simCompCB);
            panel1.add(udaFilenameLabel);
            panel1.add(this.udaFilenameEntry);
            var panel2 : JPanel = new JPanel(new GridLayout(8, 0));
            var initTimeLabel : JLabel = new JLabel("Initial Time");
            this.initTimeEntry = new DecimalField(0.0, 8, true);
            var maxTimeLabel : JLabel = new JLabel("Maximum Time");
            this.maxTimeEntry = new DecimalField(1.0, 8, true);
            var maxNofStepsLabel : JLabel = new JLabel("Maximum Timesteps");
            this.maxNofStepsEntry = new IntegerField(0, 5);
            var deltInitLabel : JLabel = new JLabel("Initial Timestep Size");
            this.deltInitEntry = new DecimalField(1.0E-9, 8, true);
            var deltMinLabel : JLabel = new JLabel("Minimum Timestep Size");
            this.deltMinEntry = new DecimalField(0.0, 8, true);
            var deltMaxLabel : JLabel = new JLabel("Maximum Timestep Size");
            this.deltMaxEntry = new DecimalField(0.001, 8, true);
            var maxDeltIncLabel : JLabel = new JLabel("Maximum Timestep Increase Factor");
            this.maxDeltIncEntry = new DecimalField(1.0, 6);
            var deltMultiplierLabel : JLabel = new JLabel("Timestep Multiplier");
            this.deltMultiplierEntry = new DecimalField(0.5, 6);
            panel2.add(initTimeLabel);
            panel2.add(this.initTimeEntry);
            panel2.add(maxTimeLabel);
            panel2.add(this.maxTimeEntry);
            panel2.add(maxNofStepsLabel);
            panel2.add(this.maxNofStepsEntry);
            panel2.add(deltInitLabel);
            panel2.add(this.deltInitEntry);
            panel2.add(deltMinLabel);
            panel2.add(this.deltMinEntry);
            panel2.add(deltMaxLabel);
            panel2.add(this.deltMaxEntry);
            panel2.add(maxDeltIncLabel);
            panel2.add(this.maxDeltIncEntry);
            panel2.add(deltMultiplierLabel);
            panel2.add(this.deltMultiplierEntry);
            var panel4 : JPanel = new JPanel(new GridLayout(6, 0));
            var outputIntervalRB : JRadioButton = new JRadioButton("Output Time Interval");
            outputIntervalRB.setActionCommand("outputtime");
            outputIntervalRB.setSelected(true);
            this.outputIntervalEntry = new DecimalField(1.0E-6, 8, true);
            var outputTimestepIntervalRB : JRadioButton = new JRadioButton("Output Timestep Interval");
            outputTimestepIntervalRB.setActionCommand("outputstep");
            this.outputTimestepIntervalEntry = new IntegerField(10, 4);
            var outputBG : ButtonGroup = new ButtonGroup();
            outputBG.add(outputIntervalRB);
            outputBG.add(outputTimestepIntervalRB);
            var checkPointCycleLabel : JLabel = new JLabel("Check Point Cycle");
            this.checkPointCycleEntry = new IntegerField(2, 4);
            var checkPointIntervalRB : JRadioButton = new JRadioButton("Checkpoint Time Interval");
            checkPointIntervalRB.setActionCommand("checktime");
            checkPointIntervalRB.setSelected(true);
            this.checkPointIntervalEntry = new DecimalField(5.0E-6, 8, true);
            var checkPointTimestepIntervalRB : JRadioButton = new JRadioButton("Checkpoint Timestep Interval");
            checkPointTimestepIntervalRB.setActionCommand("checkstep");
            this.checkPointTimestepIntervalEntry = new IntegerField(50, 4);
            var checkPointBG : ButtonGroup = new ButtonGroup();
            checkPointBG.add(checkPointIntervalRB);
            checkPointBG.add(checkPointTimestepIntervalRB);
            panel4.add(outputIntervalRB);
            panel4.add(this.outputIntervalEntry);
            panel4.add(outputTimestepIntervalRB);
            panel4.add(this.outputTimestepIntervalEntry);
            panel4.add(checkPointCycleLabel);
            panel4.add(this.checkPointCycleEntry);
            panel4.add(checkPointIntervalRB);
            panel4.add(this.checkPointIntervalEntry);
            panel4.add(checkPointTimestepIntervalRB);
            panel4.add(this.checkPointTimestepIntervalEntry);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            this.add(panel2);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel4, gbc);
            this.add(panel4);
            this.simCompCB.addItemListener(this);
            outputIntervalRB.addActionListener(this);
            outputTimestepIntervalRB.addActionListener(this);
            checkPointIntervalRB.addActionListener(this);
            checkPointTimestepIntervalRB.addActionListener(this);
        }

        public actionPerformed(e : ActionEvent) {
            if(((e.getActionCommand()) === "outputtime")) {
                this.d_outputStep = false;
            } else if(((e.getActionCommand()) === "outputstep")) {
                this.d_outputStep = true;
            } else if(((e.getActionCommand()) === "checktime")) {
                this.d_checkStep = false;
            } else if(((e.getActionCommand()) === "checkstep")) {
                this.d_checkStep = true;
            }
        }

        public itemStateChanged(e : ItemEvent) {
            var item : string = /* valueOf */new String(e.getItem()).toString();
            if((item === <string>new String("MPM"))) {
                this.d_simType = "mpm";
            } else if((item === <string>new String("ICE"))) {
                this.d_simType = "ice";
            } else if((item === <string>new String("MPMICE"))) {
                this.d_simType = "mpmice";
            } else if((item === <string>new String("RMPMICE"))) {
                this.d_simType = "rmpmice";
            } else if((item === <string>new String("SMPM"))) {
                this.d_simType = "smpm";
            } else if((item === <string>new String("SMPMICE"))) {
                this.d_simType = "smpmice";
            }
            this.d_parent.updateTabs(this.d_simType);
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            try {
                var tab1 : string = <string>new String(tab + "  ");
                pw.println(tab + "<Meta>");
                pw.println(tab1 + "<title> " + this.titleEntry.getText() + " </title>");
                pw.println(tab + "</Meta>");
                pw.println(tab);
                pw.println(tab + "<SimulationComponent type=\"" + this.d_simType + "\" />");
                pw.println(tab);
                pw.println(tab + "<Time>");
                pw.println(tab1 + "<initTime> " + this.initTimeEntry.getValue() + " </initTime>");
                pw.println(tab1 + "<maxTime> " + this.maxTimeEntry.getValue() + " </maxTime>");
                if(this.maxNofStepsEntry.getValue() > 0) {
                    pw.println(tab1 + "<max_Timesteps> " + this.maxNofStepsEntry.getValue() + " </max_Timesteps>");
                }
                pw.println(tab1 + "<delt_init> " + this.deltInitEntry.getValue() + " </delt_init>");
                pw.println(tab1 + "<delt_min> " + this.deltMinEntry.getValue() + " </delt_min>");
                pw.println(tab1 + "<delt_max> " + this.deltMaxEntry.getValue() + " </delt_max>");
                pw.println(tab1 + "<max_delt_increase> " + this.maxDeltIncEntry.getValue() + " </max_delt_increase>");
                pw.println(tab1 + "<timestep_multiplier> " + this.deltMultiplierEntry.getValue() + " </timestep_multiplier>");
                pw.println(tab + "</Time>");
                pw.println(tab);
                pw.println(tab + "<DataArchiver>");
                pw.println(tab1 + "<filebase> " + this.udaFilenameEntry.getText() + " </filebase>");
                if(this.d_outputStep) {
                    pw.println(tab1 + "<outputTimestepInterval> " + this.outputTimestepIntervalEntry.getValue() + " </outputTimestepInterval>");
                } else {
                    pw.println(tab1 + "<outputInterval> " + this.outputIntervalEntry.getValue() + " </outputInterval>");
                }
                if(this.d_checkStep) {
                    pw.println(tab1 + "<checkpoint cycle=\"" + this.checkPointCycleEntry.getValue() + "\" timestepInterval=\"" + this.checkPointTimestepIntervalEntry.getValue() + "\"/>");
                } else {
                    pw.println(tab1 + "<checkpoint cycle=\"" + this.checkPointCycleEntry.getValue() + "\" interval=\"" + this.checkPointIntervalEntry.getValue() + "\"/>");
                }
            } catch(e) {
                console.info("Could not write Uintah <Time> data.");
            };
        }

        public refresh() {
        }
    }
}

