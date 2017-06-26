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
    var MPMMaterialInputPanel = (function (_super) {
        __extends(MPMMaterialInputPanel, _super);
        function MPMMaterialInputPanel(matIndex, geomObj) {
            var _this = _super.call(this) || this;
            _this.d_isRigid = false;
            _this.d_burnModel = null;
            _this.d_constModel = null;
            _this.d_geomObj = null;
            _this.d_selGeomObj = null;
            _this.matNameEntry = null;
            _this.densityEntry = null;
            _this.thermalCondEntry = null;
            _this.spHeatEntry = null;
            _this.roomTempEntry = null;
            _this.meltTempEntry = null;
            _this.burnModelComB = null;
            _this.constModelComB = null;
            _this.isRigidCB = null;
            _this.constModelPanel = null;
            _this.rigidPanel = null;
            _this.hypoElasticPanel = null;
            _this.compNeoHookPanel = null;
            _this.elasticPlasticPanel = null;
            _this.viscoSCRAMPanel = null;
            _this.geomObjectList = null;
            _this.geomObjectListModel = null;
            _this.geomObjectSP = null;
            _this.updateButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_isRigid = false;
            _this.d_constModel = new String("rigid");
            _this.d_burnModel = new String("null");
            _this.d_geomObj = geomObj;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var panel1 = new JPanel(new GridLayout(6, 0));
            var matNameLabel = new JLabel("Material Name");
            var matName = new String("Material " + new String(matIndex).toString());
            _this.matNameEntry = new JTextField(matName, 20);
            panel1.add(matNameLabel);
            panel1.add(_this.matNameEntry);
            var densityLabel = new JLabel("Density");
            _this.densityEntry = new vaango_ui.DecimalField(8900.0, 7);
            panel1.add(densityLabel);
            panel1.add(_this.densityEntry);
            var thermalCondLabel = new JLabel("Thermal Conductivity");
            _this.thermalCondEntry = new vaango_ui.DecimalField(390.0, 7);
            panel1.add(thermalCondLabel);
            panel1.add(_this.thermalCondEntry);
            var spHeatLabel = new JLabel("Specific Heat");
            _this.spHeatEntry = new vaango_ui.DecimalField(410.0, 7);
            panel1.add(spHeatLabel);
            panel1.add(_this.spHeatEntry);
            var roomTempLabel = new JLabel("Room Temperature");
            _this.roomTempEntry = new vaango_ui.DecimalField(298.0, 7);
            panel1.add(roomTempLabel);
            panel1.add(_this.roomTempEntry);
            var meltTempLabel = new JLabel("Melt Temperature");
            _this.meltTempEntry = new vaango_ui.DecimalField(1400.0, 7);
            panel1.add(meltTempLabel);
            panel1.add(_this.meltTempEntry);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            var panel2 = new JPanel(new GridLayout(3, 2));
            var burnModelLabel = new JLabel("Burn Model");
            _this.burnModelComB = new JComboBox();
            _this.burnModelComB.addItem("None");
            _this.burnModelComB.addItem("Simple Burn");
            _this.burnModelComB.addItem("Pressure Burn");
            _this.burnModelComB.addItem("Ignition and Combustion");
            panel2.add(burnModelLabel);
            panel2.add(_this.burnModelComB);
            var constModelLabel = new JLabel("Constitutive Model");
            _this.constModelComB = new JComboBox();
            _this.constModelComB.addItem("Rigid");
            _this.constModelComB.addItem("Hypoelastic");
            _this.constModelComB.addItem("Compressible Neo-Hookean");
            _this.constModelComB.addItem("Elastic-Plastic");
            _this.constModelComB.addItem("ViscoSCRAM");
            panel2.add(constModelLabel);
            panel2.add(_this.constModelComB);
            _this.isRigidCB = new JCheckBox("Treat Material As Rigid ");
            _this.isRigidCB.setSelected(false);
            _this.isRigidCB.setEnabled(false);
            panel2.add(_this.isRigidCB);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            _this.add(panel2);
            var geomObjectPanel = new JPanel(new GridLayout(1, 0));
            var geomObjectLabel = new JLabel("Geometry Objects");
            geomObjectPanel.add(geomObjectLabel);
            _this.geomObjectListModel = new DefaultListModel();
            for (var ii = 0; ii < _this.d_geomObj.size(); ++ii) {
                var go = _this.d_geomObj.elementAt(ii);
                _this.geomObjectListModel.addElement(go.getName());
            }
            _this.geomObjectList = new JList(_this.geomObjectListModel);
            _this.geomObjectList.setVisibleRowCount(7);
            _this.geomObjectSP = new JScrollPane(_this.geomObjectList);
            geomObjectPanel.add(_this.geomObjectSP);
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(geomObjectPanel, gbc);
            _this.add(geomObjectPanel);
            _this.updateButton = new JButton("Update");
            UintahGui.setConstraints(gbc, 0, 3);
            gb.setConstraints(_this.updateButton, gbc);
            _this.add(_this.updateButton);
            _this.constModelPanel = new JPanel();
            _this.rigidPanel = new vaango_ui.RigidMaterialPanel();
            _this.hypoElasticPanel = new vaango_ui.HypoElasticMaterialPanel();
            _this.compNeoHookPanel = new vaango_ui.CompNeoHookMaterialPanel();
            _this.elasticPlasticPanel = new vaango_ui.ElasticPlasticMaterialPanel();
            _this.viscoSCRAMPanel = new vaango_ui.ViscoSCRAMMaterialPanel();
            _this.constModelPanel.add(_this.rigidPanel);
            _this.constModelPanel.add(_this.hypoElasticPanel);
            _this.constModelPanel.add(_this.compNeoHookPanel);
            _this.constModelPanel.add(_this.elasticPlasticPanel);
            _this.constModelPanel.add(_this.viscoSCRAMPanel);
            _this.rigidPanel.setVisible(true);
            _this.hypoElasticPanel.setVisible(false);
            _this.compNeoHookPanel.setVisible(false);
            _this.elasticPlasticPanel.setVisible(false);
            _this.viscoSCRAMPanel.setVisible(false);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 1, 0, 1, GridBagConstraints.REMAINDER, 5);
            gb.setConstraints(_this.constModelPanel, gbc);
            _this.add(_this.constModelPanel);
            _this.burnModelComB.addItemListener(_this);
            _this.constModelComB.addItemListener(_this);
            _this.updateButton.addActionListener(_this);
            var checkBoxListener = new MPMMaterialInputPanel.CheckBoxListener(_this);
            _this.isRigidCB.addItemListener(checkBoxListener);
            return _this;
        }
        MPMMaterialInputPanel.prototype.getMatName = function () {
            return this.matNameEntry.getText();
        };
        MPMMaterialInputPanel.prototype.actionPerformed = function (e) {
            this.d_selGeomObj = this.geomObjectList.getSelectedIndices();
            this.geomObjectList.setSelectedIndices(this.d_selGeomObj);
        };
        MPMMaterialInputPanel.prototype.refresh = function () {
            this.geomObjectListModel.removeAllElements();
            for (var ii = 0; ii < this.d_geomObj.size(); ++ii) {
                var go = this.d_geomObj.elementAt(ii);
                this.geomObjectListModel.addElement(go.getName());
            }
            if (this.d_selGeomObj != null) {
                this.geomObjectList.setSelectedIndices(this.d_selGeomObj);
            }
            this.validate();
        };
        MPMMaterialInputPanel.prototype.itemStateChanged = function (e) {
            var source = e.getItemSelectable();
            var item = new String(e.getItem()).toString();
            if (source === this.burnModelComB) {
                if ((item === new String("None"))) {
                    this.d_burnModel = "null";
                }
                else if ((item === new String("Simple Burn"))) {
                    this.d_burnModel = "simple";
                }
                else if ((item === new String("Pressure Burn"))) {
                    this.d_burnModel = "pressure";
                }
                else if ((item === new String("Ignition and Combustion"))) {
                    this.d_burnModel = "IgnitionCombustion";
                }
            }
            else {
                this.d_isRigid = false;
                this.rigidPanel.setVisible(false);
                this.elasticPlasticPanel.setVisible(false);
                this.viscoSCRAMPanel.setVisible(false);
                this.isRigidCB.setSelected(false);
                this.isRigidCB.setEnabled(true);
                if (item === "Rigid") {
                    this.d_constModel = "rigid";
                    this.rigidPanel.setVisible(true);
                    this.d_isRigid = true;
                    this.isRigidCB.setSelected(true);
                    this.isRigidCB.setEnabled(false);
                }
                else if (item === "Hypoelastic") {
                    this.d_constModel = "hypoelastic";
                    this.hypoElasticPanel.setVisible(true);
                }
                else if (item === "Compressible Neo-Hookean") {
                    this.d_constModel = "comp_neo_hook";
                    this.compNeoHookPanel.setVisible(true);
                }
                else if (item === "Elastic-Plastic") {
                    this.d_constModel = "elastic_plastic";
                    this.elasticPlasticPanel.setVisible(true);
                }
                else if (item === "ViscoSCRAM") {
                    this.d_constModel = "visco_scram";
                    this.viscoSCRAMPanel.setVisible(true);
                }
                this.validate();
            }
        };
        /**
         * Write the contents out in Uintah format
         */
        MPMMaterialInputPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            try {
                var tab1 = new String(tab + "  ");
                var tab2 = new String(tab1 + "  ");
                pw.println(tab + "<material name = \"" + this.matNameEntry.getText() + "\">");
                if (this.d_isRigid) {
                    pw.println(tab1 + "<is_rigid> " + this.d_isRigid + " </is_rigid>");
                }
                pw.println(tab1 + "<density> " + this.densityEntry.getValue() + " </density>");
                pw.println(tab1 + "<thermal_conductivity> " + this.thermalCondEntry.getValue() + " </thermal_conductivity>");
                pw.println(tab1 + "<specific_heat> " + this.spHeatEntry.getValue() + " </specific_heat>");
                pw.println(tab1 + "<room_temp> " + this.roomTempEntry.getValue() + " </room_temp>");
                pw.println(tab1 + "<melt_temp> " + this.meltTempEntry.getValue() + " </melt_temp>");
                pw.println(tab);
                pw.println(tab1 + "<constitutive_model type=\"" + this.d_constModel + "\">");
                if ((this.d_constModel === new String("rigid"))) {
                    this.rigidPanel.writeUintah(pw, tab2);
                }
                else if ((this.d_constModel === new String("hypoelastic"))) {
                    this.hypoElasticPanel.writeUintah(pw, tab2);
                }
                else if ((this.d_constModel === new String("comp_neo_hook"))) {
                    this.compNeoHookPanel.writeUintah(pw, tab2);
                }
                else if ((this.d_constModel === new String("elastic_plastic"))) {
                    this.elasticPlasticPanel.writeUintah(pw, tab2);
                }
                pw.println(tab1 + "</constitutive_model>");
                if (this.d_geomObj != null) {
                    var numGeomObj = this.geomObjectList.getSelectedIndices();
                    console.info(numGeomObj.length);
                    for (var ii = 0; ii < numGeomObj.length; ++ii) {
                        var index = numGeomObj[ii];
                        console.info("geomObj index = " + index);
                        var geomObject = this.d_geomObj.elementAt(index);
                        geomObject.writeUintah(pw, tab1);
                    }
                }
                pw.println(tab + "</material>");
                pw.println(tab);
            }
            catch (e) {
                console.info("Could not write MPMMaterialInputPanel.");
            }
            ;
        };
        return MPMMaterialInputPanel;
    }(JPanel));
    /**
     *
     */
    MPMMaterialInputPanel.serialVersionUID = -6209096040121319210;
    vaango_ui.MPMMaterialInputPanel = MPMMaterialInputPanel;
    (function (MPMMaterialInputPanel) {
        var CheckBoxListener = (function () {
            function CheckBoxListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ItemListener"] });
                this.__parent = __parent;
            }
            CheckBoxListener.prototype.itemStateChanged = function (e) {
                if (e.getStateChange() === ItemEvent.SELECTED) {
                    this.__parent.d_isRigid = true;
                }
                else {
                    this.__parent.d_isRigid = false;
                }
            };
            return CheckBoxListener;
        }());
        MPMMaterialInputPanel.CheckBoxListener = CheckBoxListener;
    })(MPMMaterialInputPanel = vaango_ui.MPMMaterialInputPanel || (vaango_ui.MPMMaterialInputPanel = {}));
})(vaango_ui || (vaango_ui = {}));
