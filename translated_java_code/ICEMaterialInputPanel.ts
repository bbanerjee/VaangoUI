"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class ICEMaterialInputPanel extends JPanel implements ItemListener, ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -7751299726753904460;

        private d_eosModel : string = null;

        private d_burnModel : string = null;

        private d_geomObj : Vector<GeomObject> = null;

        private d_selGeomObj : number[] = null;

        private matNameEntry : JTextField = null;

        private burnModelComB : JComboBox<string> = null;

        private eosModelComB : JComboBox<string> = null;

        private dynamicViscEntry : DecimalField = null;

        private thermalCondEntry : DecimalField = null;

        private spHeatEntry : DecimalField = null;

        private speedSoundEntry : DecimalField = null;

        private gammaEntry : DecimalField = null;

        private geomObjectList : JList<string> = null;

        private geomObjectListModel : DefaultListModel<string> = null;

        private geomObjectSP : JScrollPane = null;

        private updateButton : JButton = null;

        public constructor(matIndex : number, geomObj : Vector<GeomObject>) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_eosModel = <string>new String("ideal_gas");
            this.d_burnModel = <string>new String("null");
            this.d_geomObj = geomObj;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var panel1 : JPanel = new JPanel(new GridLayout(6, 0));
            var matNameLabel : JLabel = new JLabel("Material Name");
            var matName : string = <string>new String("Material " + /* valueOf */new String(matIndex).toString());
            this.matNameEntry = new JTextField(matName, 20);
            panel1.add(matNameLabel);
            panel1.add(this.matNameEntry);
            var dynamicViscLabel : JLabel = new JLabel("Dynamic Viscosity");
            this.dynamicViscEntry = new DecimalField(0.0, 7);
            panel1.add(dynamicViscLabel);
            panel1.add(this.dynamicViscEntry);
            var thermalCondLabel : JLabel = new JLabel("Thermal Conductivity");
            this.thermalCondEntry = new DecimalField(0.0, 7);
            panel1.add(thermalCondLabel);
            panel1.add(this.thermalCondEntry);
            var spHeatLabel : JLabel = new JLabel("Specific Heat");
            this.spHeatEntry = new DecimalField(716.0, 7);
            panel1.add(spHeatLabel);
            panel1.add(this.spHeatEntry);
            var speedSoundLabel : JLabel = new JLabel("Speed of Sound");
            this.speedSoundEntry = new DecimalField(376, 7);
            panel1.add(speedSoundLabel);
            panel1.add(this.speedSoundEntry);
            var gammaLabel : JLabel = new JLabel("Gamma");
            this.gammaEntry = new DecimalField(1.4, 7);
            panel1.add(gammaLabel);
            panel1.add(this.gammaEntry);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            var panel2 : JPanel = new JPanel(new GridLayout(2, 0));
            var eosModelLabel : JLabel = new JLabel("Equation of State Model");
            this.eosModelComB = new JComboBox<string>();
            this.eosModelComB.addItem("Ideal Gas EOS");
            this.eosModelComB.addItem("Murnaghan EOS");
            this.eosModelComB.addItem("Tillotson EOS");
            this.eosModelComB.addItem("Gruneisen EOS");
            this.eosModelComB.addItem("JWL EOS");
            this.eosModelComB.addItem("JWL++ EOS");
            panel2.add(eosModelLabel);
            panel2.add(this.eosModelComB);
            var burnModelLabel : JLabel = new JLabel("Burn Model");
            this.burnModelComB = new JComboBox<string>();
            this.burnModelComB.addItem("None");
            this.burnModelComB.addItem("Simple Burn");
            this.burnModelComB.addItem("Pressure Burn");
            this.burnModelComB.addItem("Ignition and Combustion");
            panel2.add(burnModelLabel);
            panel2.add(this.burnModelComB);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            this.add(panel2);
            var geomObjectPanel : JPanel = new JPanel(new GridLayout(1, 0));
            var geomObjectLabel : JLabel = new JLabel("Geometry Objects");
            geomObjectPanel.add(geomObjectLabel);
            this.geomObjectListModel = new DefaultListModel<string>();
            for(var ii : number = 0; ii < this.d_geomObj.size(); ++ii) {
                var go : GeomObject = <GeomObject>this.d_geomObj.elementAt(ii);
                this.geomObjectListModel.addElement(go.getName());
            }
            this.geomObjectList = new JList<string>(this.geomObjectListModel);
            this.geomObjectList.setVisibleRowCount(4);
            this.geomObjectSP = new JScrollPane(this.geomObjectList);
            geomObjectPanel.add(this.geomObjectSP);
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(geomObjectPanel, gbc);
            this.add(geomObjectPanel);
            this.updateButton = new JButton("Update");
            UintahGui.setConstraints(gbc, 0, 3);
            gb.setConstraints(this.updateButton, gbc);
            this.add(this.updateButton);
            this.eosModelComB.addItemListener(this);
            this.burnModelComB.addItemListener(this);
            this.updateButton.addActionListener(this);
        }

        public actionPerformed(e : ActionEvent) {
            this.d_selGeomObj = this.geomObjectList.getSelectedIndices();
            this.geomObjectList.setSelectedIndices(this.d_selGeomObj);
        }

        public itemStateChanged(e : ItemEvent) {
            var source : any = e.getItemSelectable();
            var item : string = /* valueOf */new String(e.getItem()).toString();
            if(source === this.burnModelComB) {
                if((item === <string>new String("None"))) {
                    this.d_burnModel = "null";
                } else if((item === <string>new String("Simple Burn"))) {
                    this.d_burnModel = "simple";
                } else if((item === <string>new String("Pressure Burn"))) {
                    this.d_burnModel = "pressure";
                } else if((item === <string>new String("Ignition and Combustion"))) {
                    this.d_burnModel = "IgnitionCombustion";
                }
            } else {
                if((item === <string>new String("Ideal Gas EOS"))) {
                    this.d_eosModel = "ideal_gas";
                } else if((item === <string>new String("Murnaghan EOS"))) {
                    this.d_eosModel = "Murnahan";
                } else if((item === <string>new String("Tillotson EOS"))) {
                    this.d_eosModel = "Tillotson";
                } else if((item === <string>new String("Gruneisen EOS"))) {
                    this.d_eosModel = "Gruneisen";
                } else if((item === <string>new String("JWL EOS"))) {
                    this.d_eosModel = "JWL";
                } else if((item === <string>new String("JWL++ EOS"))) {
                    this.d_eosModel = "JWLC";
                }
            }
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            var tab1 : string = <string>new String(tab + "  ");
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
            if(this.d_geomObj != null) {
                var numGeomObj : number[] = this.geomObjectList.getSelectedIndices();
                for(var ii : number = 0; ii < numGeomObj.length; ++ii) {
                    var index : number = numGeomObj[ii];
                    var geomObject : GeomObject = <GeomObject>this.d_geomObj.elementAt(index);
                    geomObject.writeUintah(pw, tab1);
                }
            }
            pw.println(tab + "</material>");
        }

        public getMatName() : string {
            return this.matNameEntry.getText();
        }

        public refresh() {
            this.geomObjectListModel.removeAllElements();
            for(var ii : number = 0; ii < this.d_geomObj.size(); ++ii) {
                var go : GeomObject = <GeomObject>this.d_geomObj.elementAt(ii);
                this.geomObjectListModel.addElement(go.getName());
            }
            if(this.d_selGeomObj != null) {
                this.geomObjectList.setSelectedIndices(this.d_selGeomObj);
            }
            this.validate();
        }
    }
}

