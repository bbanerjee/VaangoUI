"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class MPMMaterialInputPanel extends JPanel implements ItemListener, ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -6209096040121319210;

        private d_isRigid : boolean = false;

        private d_burnModel : string = null;

        private d_constModel : string = null;

        private d_geomObj : Vector<GeomObject> = null;

        private d_selGeomObj : number[] = null;

        private matNameEntry : JTextField = null;

        private densityEntry : DecimalField = null;

        private thermalCondEntry : DecimalField = null;

        private spHeatEntry : DecimalField = null;

        private roomTempEntry : DecimalField = null;

        private meltTempEntry : DecimalField = null;

        private burnModelComB : JComboBox<string> = null;

        private constModelComB : JComboBox<string> = null;

        private isRigidCB : JCheckBox = null;

        private constModelPanel : JPanel = null;

        private rigidPanel : RigidMaterialPanel = null;

        private hypoElasticPanel : HypoElasticMaterialPanel = null;

        private compNeoHookPanel : CompNeoHookMaterialPanel = null;

        private elasticPlasticPanel : ElasticPlasticMaterialPanel = null;

        private viscoSCRAMPanel : ViscoSCRAMMaterialPanel = null;

        private geomObjectList : JList<string> = null;

        private geomObjectListModel : DefaultListModel<string> = null;

        private geomObjectSP : JScrollPane = null;

        private updateButton : JButton = null;

        public constructor(matIndex : number, geomObj : Vector<GeomObject>) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_isRigid = false;
            this.d_constModel = <string>new String("rigid");
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
            var densityLabel : JLabel = new JLabel("Density");
            this.densityEntry = new DecimalField(8900.0, 7);
            panel1.add(densityLabel);
            panel1.add(this.densityEntry);
            var thermalCondLabel : JLabel = new JLabel("Thermal Conductivity");
            this.thermalCondEntry = new DecimalField(390.0, 7);
            panel1.add(thermalCondLabel);
            panel1.add(this.thermalCondEntry);
            var spHeatLabel : JLabel = new JLabel("Specific Heat");
            this.spHeatEntry = new DecimalField(410.0, 7);
            panel1.add(spHeatLabel);
            panel1.add(this.spHeatEntry);
            var roomTempLabel : JLabel = new JLabel("Room Temperature");
            this.roomTempEntry = new DecimalField(298.0, 7);
            panel1.add(roomTempLabel);
            panel1.add(this.roomTempEntry);
            var meltTempLabel : JLabel = new JLabel("Melt Temperature");
            this.meltTempEntry = new DecimalField(1400.0, 7);
            panel1.add(meltTempLabel);
            panel1.add(this.meltTempEntry);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            var panel2 : JPanel = new JPanel(new GridLayout(3, 2));
            var burnModelLabel : JLabel = new JLabel("Burn Model");
            this.burnModelComB = new JComboBox<string>();
            this.burnModelComB.addItem("None");
            this.burnModelComB.addItem("Simple Burn");
            this.burnModelComB.addItem("Pressure Burn");
            this.burnModelComB.addItem("Ignition and Combustion");
            panel2.add(burnModelLabel);
            panel2.add(this.burnModelComB);
            var constModelLabel : JLabel = new JLabel("Constitutive Model");
            this.constModelComB = new JComboBox<string>();
            this.constModelComB.addItem("Rigid");
            this.constModelComB.addItem("Hypoelastic");
            this.constModelComB.addItem("Compressible Neo-Hookean");
            this.constModelComB.addItem("Elastic-Plastic");
            this.constModelComB.addItem("ViscoSCRAM");
            panel2.add(constModelLabel);
            panel2.add(this.constModelComB);
            this.isRigidCB = new JCheckBox("Treat Material As Rigid ");
            this.isRigidCB.setSelected(false);
            this.isRigidCB.setEnabled(false);
            panel2.add(this.isRigidCB);
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
            this.geomObjectList.setVisibleRowCount(7);
            this.geomObjectSP = new JScrollPane(this.geomObjectList);
            geomObjectPanel.add(this.geomObjectSP);
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(geomObjectPanel, gbc);
            this.add(geomObjectPanel);
            this.updateButton = new JButton("Update");
            UintahGui.setConstraints(gbc, 0, 3);
            gb.setConstraints(this.updateButton, gbc);
            this.add(this.updateButton);
            this.constModelPanel = new JPanel();
            this.rigidPanel = new RigidMaterialPanel();
            this.hypoElasticPanel = new HypoElasticMaterialPanel();
            this.compNeoHookPanel = new CompNeoHookMaterialPanel();
            this.elasticPlasticPanel = new ElasticPlasticMaterialPanel();
            this.viscoSCRAMPanel = new ViscoSCRAMMaterialPanel();
            this.constModelPanel.add(this.rigidPanel);
            this.constModelPanel.add(this.hypoElasticPanel);
            this.constModelPanel.add(this.compNeoHookPanel);
            this.constModelPanel.add(this.elasticPlasticPanel);
            this.constModelPanel.add(this.viscoSCRAMPanel);
            this.rigidPanel.setVisible(true);
            this.hypoElasticPanel.setVisible(false);
            this.compNeoHookPanel.setVisible(false);
            this.elasticPlasticPanel.setVisible(false);
            this.viscoSCRAMPanel.setVisible(false);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 1, 0, 1, GridBagConstraints.REMAINDER, 5);
            gb.setConstraints(this.constModelPanel, gbc);
            this.add(this.constModelPanel);
            this.burnModelComB.addItemListener(this);
            this.constModelComB.addItemListener(this);
            this.updateButton.addActionListener(this);
            var checkBoxListener : MPMMaterialInputPanel.CheckBoxListener = new MPMMaterialInputPanel.CheckBoxListener(this);
            this.isRigidCB.addItemListener(checkBoxListener);
        }

        public getMatName() : string {
            return this.matNameEntry.getText();
        }

        public actionPerformed(e : ActionEvent) {
            this.d_selGeomObj = this.geomObjectList.getSelectedIndices();
            this.geomObjectList.setSelectedIndices(this.d_selGeomObj);
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
                this.d_isRigid = false;
                this.rigidPanel.setVisible(false);
                this.elasticPlasticPanel.setVisible(false);
                this.viscoSCRAMPanel.setVisible(false);
                this.isRigidCB.setSelected(false);
                this.isRigidCB.setEnabled(true);
                if(item === "Rigid") {
                    this.d_constModel = "rigid";
                    this.rigidPanel.setVisible(true);
                    this.d_isRigid = true;
                    this.isRigidCB.setSelected(true);
                    this.isRigidCB.setEnabled(false);
                } else if(item === "Hypoelastic") {
                    this.d_constModel = "hypoelastic";
                    this.hypoElasticPanel.setVisible(true);
                } else if(item === "Compressible Neo-Hookean") {
                    this.d_constModel = "comp_neo_hook";
                    this.compNeoHookPanel.setVisible(true);
                } else if(item === "Elastic-Plastic") {
                    this.d_constModel = "elastic_plastic";
                    this.elasticPlasticPanel.setVisible(true);
                } else if(item === "ViscoSCRAM") {
                    this.d_constModel = "visco_scram";
                    this.viscoSCRAMPanel.setVisible(true);
                }
                this.validate();
            }
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            try {
                var tab1 : string = <string>new String(tab + "  ");
                var tab2 : string = <string>new String(tab1 + "  ");
                pw.println(tab + "<material name = \"" + this.matNameEntry.getText() + "\">");
                if(this.d_isRigid) {
                    pw.println(tab1 + "<is_rigid> " + this.d_isRigid + " </is_rigid>");
                }
                pw.println(tab1 + "<density> " + this.densityEntry.getValue() + " </density>");
                pw.println(tab1 + "<thermal_conductivity> " + this.thermalCondEntry.getValue() + " </thermal_conductivity>");
                pw.println(tab1 + "<specific_heat> " + this.spHeatEntry.getValue() + " </specific_heat>");
                pw.println(tab1 + "<room_temp> " + this.roomTempEntry.getValue() + " </room_temp>");
                pw.println(tab1 + "<melt_temp> " + this.meltTempEntry.getValue() + " </melt_temp>");
                pw.println(tab);
                pw.println(tab1 + "<constitutive_model type=\"" + this.d_constModel + "\">");
                if((this.d_constModel === <string>new String("rigid"))) {
                    this.rigidPanel.writeUintah(pw, tab2);
                } else if((this.d_constModel === <string>new String("hypoelastic"))) {
                    this.hypoElasticPanel.writeUintah(pw, tab2);
                } else if((this.d_constModel === <string>new String("comp_neo_hook"))) {
                    this.compNeoHookPanel.writeUintah(pw, tab2);
                } else if((this.d_constModel === <string>new String("elastic_plastic"))) {
                    this.elasticPlasticPanel.writeUintah(pw, tab2);
                }
                pw.println(tab1 + "</constitutive_model>");
                if(this.d_geomObj != null) {
                    var numGeomObj : number[] = this.geomObjectList.getSelectedIndices();
                    console.info(numGeomObj.length);
                    for(var ii : number = 0; ii < numGeomObj.length; ++ii) {
                        var index : number = numGeomObj[ii];
                        console.info("geomObj index = " + index);
                        var geomObject : GeomObject = <GeomObject>this.d_geomObj.elementAt(index);
                        geomObject.writeUintah(pw, tab1);
                    }
                }
                pw.println(tab + "</material>");
                pw.println(tab);
            } catch(e) {
                console.info("Could not write MPMMaterialInputPanel.");
            };
        }
    }

    export namespace MPMMaterialInputPanel {

        export class CheckBoxListener implements ItemListener {
            public __parent: any;
            public itemStateChanged(e : ItemEvent) {
                if(e.getStateChange() === ItemEvent.SELECTED) {
                    this.__parent.d_isRigid = true;
                } else {
                    this.__parent.d_isRigid = false;
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ItemListener"] });
                this.__parent = __parent;
            }
        }
    }

}

