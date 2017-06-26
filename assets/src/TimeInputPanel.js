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
    var TimeInputPanel = (function (_super) {
        __extends(TimeInputPanel, _super);
        function TimeInputPanel(simType, parent) {
            var _this = _super.call(this) || this;
            _this.titleEntry = null;
            _this.simCompCB = null;
            _this.initTimeEntry = null;
            _this.maxTimeEntry = null;
            _this.maxNofStepsEntry = null;
            _this.deltInitEntry = null;
            _this.deltMinEntry = null;
            _this.deltMaxEntry = null;
            _this.maxDeltIncEntry = null;
            _this.deltMultiplierEntry = null;
            _this.udaFilenameEntry = null;
            _this.outputIntervalEntry = null;
            _this.outputTimestepIntervalEntry = null;
            _this.checkPointCycleEntry = null;
            _this.checkPointIntervalEntry = null;
            _this.checkPointTimestepIntervalEntry = null;
            _this.d_simType = null;
            _this.d_parent = null;
            _this.d_outputStep = false;
            _this.d_checkStep = false;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_simType = simType;
            _this.d_parent = parent;
            _this.d_outputStep = false;
            _this.d_checkStep = false;
            var panel1 = new JPanel(new GridLayout(3, 0));
            var titleLabel = new JLabel("Simulation Title");
            _this.titleEntry = new JTextField("Test Simulation", 20);
            var simCompLabel = new JLabel("Simulation Component");
            _this.simCompCB = new JComboBox();
            _this.simCompCB.addItem("Select one");
            _this.simCompCB.addItem("MPM");
            _this.simCompCB.addItem("ICE");
            _this.simCompCB.addItem("MPMICE");
            var udaFilenameLabel = new JLabel("Output UDA Filename");
            _this.udaFilenameEntry = new JTextField("test.uda", 20);
            panel1.add(titleLabel);
            panel1.add(_this.titleEntry);
            panel1.add(simCompLabel);
            panel1.add(_this.simCompCB);
            panel1.add(udaFilenameLabel);
            panel1.add(_this.udaFilenameEntry);
            var panel2 = new JPanel(new GridLayout(8, 0));
            var initTimeLabel = new JLabel("Initial Time");
            _this.initTimeEntry = new vaango_ui.DecimalField(0.0, 8, true);
            var maxTimeLabel = new JLabel("Maximum Time");
            _this.maxTimeEntry = new vaango_ui.DecimalField(1.0, 8, true);
            var maxNofStepsLabel = new JLabel("Maximum Timesteps");
            _this.maxNofStepsEntry = new vaango_ui.IntegerField(0, 5);
            var deltInitLabel = new JLabel("Initial Timestep Size");
            _this.deltInitEntry = new vaango_ui.DecimalField(1.0E-9, 8, true);
            var deltMinLabel = new JLabel("Minimum Timestep Size");
            _this.deltMinEntry = new vaango_ui.DecimalField(0.0, 8, true);
            var deltMaxLabel = new JLabel("Maximum Timestep Size");
            _this.deltMaxEntry = new vaango_ui.DecimalField(0.001, 8, true);
            var maxDeltIncLabel = new JLabel("Maximum Timestep Increase Factor");
            _this.maxDeltIncEntry = new vaango_ui.DecimalField(1.0, 6);
            var deltMultiplierLabel = new JLabel("Timestep Multiplier");
            _this.deltMultiplierEntry = new vaango_ui.DecimalField(0.5, 6);
            panel2.add(initTimeLabel);
            panel2.add(_this.initTimeEntry);
            panel2.add(maxTimeLabel);
            panel2.add(_this.maxTimeEntry);
            panel2.add(maxNofStepsLabel);
            panel2.add(_this.maxNofStepsEntry);
            panel2.add(deltInitLabel);
            panel2.add(_this.deltInitEntry);
            panel2.add(deltMinLabel);
            panel2.add(_this.deltMinEntry);
            panel2.add(deltMaxLabel);
            panel2.add(_this.deltMaxEntry);
            panel2.add(maxDeltIncLabel);
            panel2.add(_this.maxDeltIncEntry);
            panel2.add(deltMultiplierLabel);
            panel2.add(_this.deltMultiplierEntry);
            var panel4 = new JPanel(new GridLayout(6, 0));
            var outputIntervalRB = new JRadioButton("Output Time Interval");
            outputIntervalRB.setActionCommand("outputtime");
            outputIntervalRB.setSelected(true);
            _this.outputIntervalEntry = new vaango_ui.DecimalField(1.0E-6, 8, true);
            var outputTimestepIntervalRB = new JRadioButton("Output Timestep Interval");
            outputTimestepIntervalRB.setActionCommand("outputstep");
            _this.outputTimestepIntervalEntry = new vaango_ui.IntegerField(10, 4);
            var outputBG = new ButtonGroup();
            outputBG.add(outputIntervalRB);
            outputBG.add(outputTimestepIntervalRB);
            var checkPointCycleLabel = new JLabel("Check Point Cycle");
            _this.checkPointCycleEntry = new vaango_ui.IntegerField(2, 4);
            var checkPointIntervalRB = new JRadioButton("Checkpoint Time Interval");
            checkPointIntervalRB.setActionCommand("checktime");
            checkPointIntervalRB.setSelected(true);
            _this.checkPointIntervalEntry = new vaango_ui.DecimalField(5.0E-6, 8, true);
            var checkPointTimestepIntervalRB = new JRadioButton("Checkpoint Timestep Interval");
            checkPointTimestepIntervalRB.setActionCommand("checkstep");
            _this.checkPointTimestepIntervalEntry = new vaango_ui.IntegerField(50, 4);
            var checkPointBG = new ButtonGroup();
            checkPointBG.add(checkPointIntervalRB);
            checkPointBG.add(checkPointTimestepIntervalRB);
            panel4.add(outputIntervalRB);
            panel4.add(_this.outputIntervalEntry);
            panel4.add(outputTimestepIntervalRB);
            panel4.add(_this.outputTimestepIntervalEntry);
            panel4.add(checkPointCycleLabel);
            panel4.add(_this.checkPointCycleEntry);
            panel4.add(checkPointIntervalRB);
            panel4.add(_this.checkPointIntervalEntry);
            panel4.add(checkPointTimestepIntervalRB);
            panel4.add(_this.checkPointTimestepIntervalEntry);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            _this.add(panel2);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel4, gbc);
            _this.add(panel4);
            _this.simCompCB.addItemListener(_this);
            outputIntervalRB.addActionListener(_this);
            outputTimestepIntervalRB.addActionListener(_this);
            checkPointIntervalRB.addActionListener(_this);
            checkPointTimestepIntervalRB.addActionListener(_this);
            return _this;
        }
        TimeInputPanel.prototype.actionPerformed = function (e) {
            if (((e.getActionCommand()) === "outputtime")) {
                this.d_outputStep = false;
            }
            else if (((e.getActionCommand()) === "outputstep")) {
                this.d_outputStep = true;
            }
            else if (((e.getActionCommand()) === "checktime")) {
                this.d_checkStep = false;
            }
            else if (((e.getActionCommand()) === "checkstep")) {
                this.d_checkStep = true;
            }
        };
        TimeInputPanel.prototype.itemStateChanged = function (e) {
            var item = new String(e.getItem()).toString();
            if ((item === new String("MPM"))) {
                this.d_simType = "mpm";
            }
            else if ((item === new String("ICE"))) {
                this.d_simType = "ice";
            }
            else if ((item === new String("MPMICE"))) {
                this.d_simType = "mpmice";
            }
            else if ((item === new String("RMPMICE"))) {
                this.d_simType = "rmpmice";
            }
            else if ((item === new String("SMPM"))) {
                this.d_simType = "smpm";
            }
            else if ((item === new String("SMPMICE"))) {
                this.d_simType = "smpmice";
            }
            this.d_parent.updateTabs(this.d_simType);
        };
        /**
         * Write the contents out in Uintah format
         */
        TimeInputPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            try {
                var tab1 = new String(tab + "  ");
                pw.println(tab + "<Meta>");
                pw.println(tab1 + "<title> " + this.titleEntry.getText() + " </title>");
                pw.println(tab + "</Meta>");
                pw.println(tab);
                pw.println(tab + "<SimulationComponent type=\"" + this.d_simType + "\" />");
                pw.println(tab);
                pw.println(tab + "<Time>");
                pw.println(tab1 + "<initTime> " + this.initTimeEntry.getValue() + " </initTime>");
                pw.println(tab1 + "<maxTime> " + this.maxTimeEntry.getValue() + " </maxTime>");
                if (this.maxNofStepsEntry.getValue() > 0) {
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
                if (this.d_outputStep) {
                    pw.println(tab1 + "<outputTimestepInterval> " + this.outputTimestepIntervalEntry.getValue() + " </outputTimestepInterval>");
                }
                else {
                    pw.println(tab1 + "<outputInterval> " + this.outputIntervalEntry.getValue() + " </outputInterval>");
                }
                if (this.d_checkStep) {
                    pw.println(tab1 + "<checkpoint cycle=\"" + this.checkPointCycleEntry.getValue() + "\" timestepInterval=\"" + this.checkPointTimestepIntervalEntry.getValue() + "\"/>");
                }
                else {
                    pw.println(tab1 + "<checkpoint cycle=\"" + this.checkPointCycleEntry.getValue() + "\" interval=\"" + this.checkPointIntervalEntry.getValue() + "\"/>");
                }
            }
            catch (e) {
                console.info("Could not write Uintah <Time> data.");
            }
            ;
        };
        TimeInputPanel.prototype.refresh = function () {
        };
        return TimeInputPanel;
    }(JPanel));
    /**
     *
     */
    TimeInputPanel.serialVersionUID = 863703153055040651;
    vaango_ui.TimeInputPanel = TimeInputPanel;
})(vaango_ui || (vaango_ui = {}));
