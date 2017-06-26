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
    var ICEMaterialInputPanel = (function (_super) {
        __extends(ICEMaterialInputPanel, _super);
        function ICEMaterialInputPanel(matIndex, geomObj) {
            var _this = _super.call(this) || this;
            _this.d_eosModel = null;
            _this.d_burnModel = null;
            _this.d_geomObj = null;
            _this.d_selGeomObj = null;
            _this.matNameEntry = null;
            _this.burnModelComB = null;
            _this.eosModelComB = null;
            _this.dynamicViscEntry = null;
            _this.thermalCondEntry = null;
            _this.spHeatEntry = null;
            _this.speedSoundEntry = null;
            _this.gammaEntry = null;
            _this.geomObjectList = null;
            _this.geomObjectListModel = null;
            _this.geomObjectSP = null;
            _this.updateButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_eosModel = new String("ideal_gas");
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
            var dynamicViscLabel = new JLabel("Dynamic Viscosity");
            _this.dynamicViscEntry = new vaango_ui.DecimalField(0.0, 7);
            panel1.add(dynamicViscLabel);
            panel1.add(_this.dynamicViscEntry);
            var thermalCondLabel = new JLabel("Thermal Conductivity");
            _this.thermalCondEntry = new vaango_ui.DecimalField(0.0, 7);
            panel1.add(thermalCondLabel);
            panel1.add(_this.thermalCondEntry);
            var spHeatLabel = new JLabel("Specific Heat");
            _this.spHeatEntry = new vaango_ui.DecimalField(716.0, 7);
            panel1.add(spHeatLabel);
            panel1.add(_this.spHeatEntry);
            var speedSoundLabel = new JLabel("Speed of Sound");
            _this.speedSoundEntry = new vaango_ui.DecimalField(376, 7);
            panel1.add(speedSoundLabel);
            panel1.add(_this.speedSoundEntry);
            var gammaLabel = new JLabel("Gamma");
            _this.gammaEntry = new vaango_ui.DecimalField(1.4, 7);
            panel1.add(gammaLabel);
            panel1.add(_this.gammaEntry);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            var panel2 = new JPanel(new GridLayout(2, 0));
            var eosModelLabel = new JLabel("Equation of State Model");
            _this.eosModelComB = new JComboBox();
            _this.eosModelComB.addItem("Ideal Gas EOS");
            _this.eosModelComB.addItem("Murnaghan EOS");
            _this.eosModelComB.addItem("Tillotson EOS");
            _this.eosModelComB.addItem("Gruneisen EOS");
            _this.eosModelComB.addItem("JWL EOS");
            _this.eosModelComB.addItem("JWL++ EOS");
            panel2.add(eosModelLabel);
            panel2.add(_this.eosModelComB);
            var burnModelLabel = new JLabel("Burn Model");
            _this.burnModelComB = new JComboBox();
            _this.burnModelComB.addItem("None");
            _this.burnModelComB.addItem("Simple Burn");
            _this.burnModelComB.addItem("Pressure Burn");
            _this.burnModelComB.addItem("Ignition and Combustion");
            panel2.add(burnModelLabel);
            panel2.add(_this.burnModelComB);
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
            _this.geomObjectList.setVisibleRowCount(4);
            _this.geomObjectSP = new JScrollPane(_this.geomObjectList);
            geomObjectPanel.add(_this.geomObjectSP);
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(geomObjectPanel, gbc);
            _this.add(geomObjectPanel);
            _this.updateButton = new JButton("Update");
            UintahGui.setConstraints(gbc, 0, 3);
            gb.setConstraints(_this.updateButton, gbc);
            _this.add(_this.updateButton);
            _this.eosModelComB.addItemListener(_this);
            _this.burnModelComB.addItemListener(_this);
            _this.updateButton.addActionListener(_this);
            return _this;
        }
        ICEMaterialInputPanel.prototype.actionPerformed = function (e) {
            this.d_selGeomObj = this.geomObjectList.getSelectedIndices();
            this.geomObjectList.setSelectedIndices(this.d_selGeomObj);
        };
        ICEMaterialInputPanel.prototype.itemStateChanged = function (e) {
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
                if ((item === new String("Ideal Gas EOS"))) {
                    this.d_eosModel = "ideal_gas";
                }
                else if ((item === new String("Murnaghan EOS"))) {
                    this.d_eosModel = "Murnahan";
                }
                else if ((item === new String("Tillotson EOS"))) {
                    this.d_eosModel = "Tillotson";
                }
                else if ((item === new String("Gruneisen EOS"))) {
                    this.d_eosModel = "Gruneisen";
                }
                else if ((item === new String("JWL EOS"))) {
                    this.d_eosModel = "JWL";
                }
                else if ((item === new String("JWL++ EOS"))) {
                    this.d_eosModel = "JWLC";
                }
            }
        };
        /**
         * Write the contents out in Uintah format
         */
        ICEMaterialInputPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            var tab1 = new String(tab + "  ");
            pw.println(tab);
            pw.println(tab + "<material name = \"" + this.matNameEntry.getText() + "\">");
            pw.println(tab1);
            pw.println(tab1 + "<dynamic_viscosity> " + this.dynamicViscEntry.getValue() + " </dynamic_viscosity>");
            pw.println(tab1 + "<thermal_conductivity> " + this.thermalCondEntry.getValue() + " </thermal_conductivity>");
            pw.println(tab1 + "<specific_heat> " + this.spHeatEntry.getValue() + " </specific_heat>");
            pw.println(tab1 + "<gamma> " + this.gammaEntry.getValue() + " </gamma>");
            pw.println(tab1);
            pw.println(tab1 + "<EOS type=\"" + this.d_eosModel + "\">");
            pw.println(tab1 + "</EOS>");
            if (this.d_geomObj != null) {
                var numGeomObj = this.geomObjectList.getSelectedIndices();
                for (var ii = 0; ii < numGeomObj.length; ++ii) {
                    var index = numGeomObj[ii];
                    var geomObject = this.d_geomObj.elementAt(index);
                    geomObject.writeUintah(pw, tab1);
                }
            }
            pw.println(tab + "</material>");
        };
        ICEMaterialInputPanel.prototype.getMatName = function () {
            return this.matNameEntry.getText();
        };
        ICEMaterialInputPanel.prototype.refresh = function () {
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
        return ICEMaterialInputPanel;
    }(JPanel));
    /**
     *
     */
    ICEMaterialInputPanel.serialVersionUID = -7751299726753904460;
    vaango_ui.ICEMaterialInputPanel = ICEMaterialInputPanel;
})(vaango_ui || (vaango_ui = {}));
