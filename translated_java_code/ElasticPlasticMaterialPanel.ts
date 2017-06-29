"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Point = java.awt.Point;

    export class ElasticPlasticMaterialPanel extends JPanel implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -975020056441827558;

        private d_isothermal : boolean = false;

        private d_doMelting : boolean = false;

        private d_evolvePorosity : boolean = false;

        private d_evolveDamage : boolean = false;

        private d_checkTEPLA : boolean = false;

        private d_stressTriax : boolean = false;

        private d_spHeatComp : boolean = false;

        private d_eos : string = null;

        private d_flowStress : string = null;

        private d_yieldCond : string = null;

        private d_shear : string = null;

        private d_melt : string = null;

        private d_spHeat : string = null;

        private d_damage : string = null;

        private d_stability : string = null;

        private isothermalCB : JCheckBox = null;

        private doMeltingCB : JCheckBox = null;

        private evolvePorosityCB : JCheckBox = null;

        private evolveDamageCB : JCheckBox = null;

        private checkTEPLACB : JCheckBox = null;

        private stressTriaxCB : JCheckBox = null;

        private spHeatCompCB : JCheckBox = null;

        private toleranceEntry : DecimalField = null;

        private taylorQuinneyEntry : DecimalField = null;

        private critStressEntry : DecimalField = null;

        private bulkModEntry : DecimalField = null;

        private shearModEntry : DecimalField = null;

        private cteEntry : DecimalField = null;

        private eosComB : JComboBox<string> = null;

        private flowStressComB : JComboBox<string> = null;

        private yieldCondComB : JComboBox<string> = null;

        private shearComB : JComboBox<string> = null;

        private meltComB : JComboBox<string> = null;

        private spHeatComB : JComboBox<string> = null;

        private damageComB : JComboBox<string> = null;

        private stabilityComB : JComboBox<string> = null;

        private mieGruneisenFrame : ElasticPlasticMaterialPanel.MieGruneisenFrame = null;

        private johnsonCookFlowFrame : ElasticPlasticMaterialPanel.JohnsonCookFlowFrame = null;

        private hancockMacKenzieDamageFrame : ElasticPlasticMaterialPanel.HancockMacKenzieDamageFrame = null;

        public constructor() {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_isothermal = false;
            this.d_doMelting = false;
            this.d_evolvePorosity = false;
            this.d_evolveDamage = false;
            this.d_checkTEPLA = false;
            this.d_stressTriax = false;
            this.d_spHeatComp = false;
            this.d_eos = <string>new String("mie_gruneisen");
            this.d_flowStress = <string>new String("johnson_cook");
            this.d_yieldCond = <string>new String("vonMises");
            this.d_shear = <string>new String("constant_shear");
            this.d_melt = <string>new String("constant_Tm");
            this.d_spHeat = <string>new String("constant_Cp");
            this.d_damage = <string>new String("hancock_mackenzie");
            this.d_stability = <string>new String("none");
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var panel1 : JPanel = new JPanel(new GridLayout(4, 0));
            this.isothermalCB = new JCheckBox("Isothermal");
            this.doMeltingCB = new JCheckBox("Do Melting");
            this.spHeatCompCB = new JCheckBox("Compute Specific Heat");
            this.evolvePorosityCB = new JCheckBox("Evolve Porosity");
            this.evolveDamageCB = new JCheckBox("Evolve Damage");
            this.checkTEPLACB = new JCheckBox("Check TEPLA Failure Crit.");
            this.stressTriaxCB = new JCheckBox("Check Max. Stress Failure Crit.");
            this.isothermalCB.setSelected(false);
            this.doMeltingCB.setSelected(false);
            this.spHeatCompCB.setSelected(false);
            this.evolvePorosityCB.setSelected(false);
            this.evolveDamageCB.setSelected(false);
            this.checkTEPLACB.setSelected(false);
            this.stressTriaxCB.setSelected(false);
            panel1.add(this.isothermalCB);
            panel1.add(this.doMeltingCB);
            panel1.add(this.spHeatCompCB);
            panel1.add(this.evolvePorosityCB);
            panel1.add(this.evolveDamageCB);
            panel1.add(this.checkTEPLACB);
            panel1.add(this.stressTriaxCB);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            var fillBoth : number = GridBagConstraints.BOTH;
            var panelgb : GridBagLayout = new GridBagLayout();
            var panelgbc : GridBagConstraints = new GridBagConstraints();
            var panelElastic : JPanel = new JPanel(panelgb);
            var bulkModLabel : JLabel = new JLabel("Bulk Modulus");
            UintahGui.setConstraints(panelgbc, fillBoth, 0, 0);
            panelgb.setConstraints(bulkModLabel, panelgbc);
            panelElastic.add(bulkModLabel);
            this.bulkModEntry = new DecimalField(1.3E11, 9, true);
            UintahGui.setConstraints(panelgbc, fillBoth, 1, 0);
            panelgb.setConstraints(this.bulkModEntry, panelgbc);
            panelElastic.add(this.bulkModEntry);
            var shearModLabel : JLabel = new JLabel("Shear Modulus");
            UintahGui.setConstraints(panelgbc, fillBoth, 0, 1);
            panelgb.setConstraints(shearModLabel, panelgbc);
            panelElastic.add(shearModLabel);
            this.shearModEntry = new DecimalField(4.6E10, 9, true);
            UintahGui.setConstraints(panelgbc, fillBoth, 1, 1);
            panelgb.setConstraints(this.shearModEntry, panelgbc);
            panelElastic.add(this.shearModEntry);
            var cteLabel : JLabel = new JLabel("Coeff. of Thermal Expansion");
            UintahGui.setConstraints(panelgbc, fillBoth, 0, 2);
            panelgb.setConstraints(cteLabel, panelgbc);
            panelElastic.add(cteLabel);
            this.cteEntry = new DecimalField(1.0E-5, 9, true);
            UintahGui.setConstraints(panelgbc, fillBoth, 1, 2);
            panelgb.setConstraints(this.cteEntry, panelgbc);
            panelElastic.add(this.cteEntry);
            UintahGui.setConstraints(gbc, fillBoth, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panelElastic, gbc);
            this.add(panelElastic);
            var panel2 : JPanel = new JPanel(new GridLayout(11, 0));
            var toleranceLabel : JLabel = new JLabel("Tolerance");
            var taylorQuinneyLabel : JLabel = new JLabel("Taylor-Quinney Coefficient");
            var critStressLabel : JLabel = new JLabel("Max. Triax. Stress at Failure");
            this.toleranceEntry = new DecimalField(1.0E-12, 9, true);
            this.taylorQuinneyEntry = new DecimalField(0.9, 3);
            this.critStressEntry = new DecimalField(5.0E9, 9, true);
            panel2.add(toleranceLabel);
            panel2.add(this.toleranceEntry);
            panel2.add(taylorQuinneyLabel);
            panel2.add(this.taylorQuinneyEntry);
            panel2.add(critStressLabel);
            panel2.add(this.critStressEntry);
            var eosLabel : JLabel = new JLabel("Equation of State Model");
            var flowStressLabel : JLabel = new JLabel("Flow Stress Model");
            var yieldCondLabel : JLabel = new JLabel("Yield Condition Model");
            var shearLabel : JLabel = new JLabel("Shear Modulus Model");
            var meltLabel : JLabel = new JLabel("Melt Temperature Model");
            var spHeatLabel : JLabel = new JLabel("Specific Heat Model");
            var damageLabel : JLabel = new JLabel("Damage Model");
            var stabilityLabel : JLabel = new JLabel("Material Stability Model");
            this.eosComB = new JComboBox<string>();
            this.flowStressComB = new JComboBox<string>();
            this.yieldCondComB = new JComboBox<string>();
            this.shearComB = new JComboBox<string>();
            this.meltComB = new JComboBox<string>();
            this.spHeatComB = new JComboBox<string>();
            this.damageComB = new JComboBox<string>();
            this.stabilityComB = new JComboBox<string>();
            this.eosComB.addItem("Mie-Gruneisen");
            this.eosComB.addItem("None");
            this.flowStressComB.addItem("Johnson-Cook");
            this.flowStressComB.addItem("Mechanical Threshold Stress");
            this.flowStressComB.addItem("Preston-Tonks-Wallace");
            this.flowStressComB.addItem("Zerilli-Armstrong");
            this.flowStressComB.addItem("Steinberg-Cochran-Guinan");
            this.flowStressComB.addItem("Linear");
            this.yieldCondComB.addItem("von Mises");
            this.yieldCondComB.addItem("Gurson-Tvergaard-Needleman");
            this.shearComB.addItem("Constant");
            this.shearComB.addItem("Chen-Gray");
            this.shearComB.addItem("Steinberg-Guinan");
            this.shearComB.addItem("Nadal-Le Poac");
            this.meltComB.addItem("Constant");
            this.meltComB.addItem("Steinberg-Guinan");
            this.meltComB.addItem("Burakovsky-Preston-Silbar");
            this.spHeatComB.addItem("Constant");
            this.spHeatComB.addItem("Copper Model");
            this.spHeatComB.addItem("Steel Model");
            this.spHeatComB.addItem("Aluminum Model");
            this.damageComB.addItem("Hancock-MacKenzie");
            this.damageComB.addItem("Johnson-Cook");
            this.stabilityComB.addItem("None");
            this.stabilityComB.addItem("Drucker Stability");
            this.stabilityComB.addItem("Acoustic Tensor Stability");
            this.stabilityComB.addItem("Drucker + Acoustic Tensor");
            panel2.add(eosLabel);
            panel2.add(this.eosComB);
            panel2.add(flowStressLabel);
            panel2.add(this.flowStressComB);
            panel2.add(yieldCondLabel);
            panel2.add(this.yieldCondComB);
            panel2.add(shearLabel);
            panel2.add(this.shearComB);
            panel2.add(meltLabel);
            panel2.add(this.meltComB);
            panel2.add(spHeatLabel);
            panel2.add(this.spHeatComB);
            panel2.add(damageLabel);
            panel2.add(this.damageComB);
            panel2.add(stabilityLabel);
            panel2.add(this.stabilityComB);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            this.add(panel2);
            this.mieGruneisenFrame = new ElasticPlasticMaterialPanel.MieGruneisenFrame(this);
            this.johnsonCookFlowFrame = new ElasticPlasticMaterialPanel.JohnsonCookFlowFrame(this);
            this.hancockMacKenzieDamageFrame = new ElasticPlasticMaterialPanel.HancockMacKenzieDamageFrame(this);
            this.mieGruneisenFrame.pack();
            this.johnsonCookFlowFrame.pack();
            this.hancockMacKenzieDamageFrame.pack();
            this.mieGruneisenFrame.setVisible(false);
            this.johnsonCookFlowFrame.setVisible(false);
            this.hancockMacKenzieDamageFrame.setVisible(false);
            var checkBoxListener : ElasticPlasticMaterialPanel.CheckBoxListener = new ElasticPlasticMaterialPanel.CheckBoxListener(this);
            this.isothermalCB.addItemListener(checkBoxListener);
            this.doMeltingCB.addItemListener(checkBoxListener);
            this.spHeatCompCB.addItemListener(checkBoxListener);
            this.evolvePorosityCB.addItemListener(checkBoxListener);
            this.evolveDamageCB.addItemListener(checkBoxListener);
            this.checkTEPLACB.addItemListener(checkBoxListener);
            this.stressTriaxCB.addItemListener(checkBoxListener);
            this.eosComB.addActionListener(this);
            this.flowStressComB.addActionListener(this);
            this.yieldCondComB.addActionListener(this);
            this.shearComB.addActionListener(this);
            this.meltComB.addActionListener(this);
            this.spHeatComB.addActionListener(this);
            this.damageComB.addActionListener(this);
            this.stabilityComB.addActionListener(this);
        }

        public actionPerformed(e : ActionEvent) {
            var source : JComboBox<string> = <JComboBox<string>>e.getSource();
            var item : string = <string>source.getSelectedItem();
            var location : Point = this.getParent().getLocation();
            this.validate();
            if(source === this.eosComB) {
                if(item === "Mie-Gruneisen") {
                    this.d_eos = "mie_gruneisen";
                    this.mieGruneisenFrame.setLocation(location);
                    this.mieGruneisenFrame.setVisible(true);
                } else if(item === "None") {
                    this.d_eos = "none";
                    this.mieGruneisenFrame.setVisible(false);
                }
            } else if(source === this.flowStressComB) {
                if(item === "Johnson-Cook") {
                    this.d_flowStress = "johnson_cook";
                    this.johnsonCookFlowFrame.setLocation(location);
                    this.johnsonCookFlowFrame.setVisible(true);
                } else if(item === "Mechanical Threshold Stress") {
                    this.johnsonCookFlowFrame.setVisible(false);
                } else if(item === "Preston-Tonks-Wallace") {
                    this.johnsonCookFlowFrame.setVisible(false);
                } else if(item === "Zerilli-Armstrong") {
                    this.johnsonCookFlowFrame.setVisible(false);
                } else if(item === "Steinberg-Cochran-Guinan") {
                    this.johnsonCookFlowFrame.setVisible(false);
                } else if(item === "Linear") {
                    this.johnsonCookFlowFrame.setVisible(false);
                }
            } else if(source === this.yieldCondComB) {
                if(item === "von Mises") {
                    this.d_yieldCond = "vonMises";
                } else if(item === "Gurson-Tvergaard-Needleman") {
                }
            } else if(source === this.shearComB) {
                if(item === "Constant") {
                    this.d_shear = "constant_shear";
                } else if(item === "Chen-Gray") {
                } else if(item === "Steinberg-Guinan") {
                } else if(item === "Nadal-Le Poac") {
                }
            } else if(source === this.meltComB) {
                if(item === "Constant") {
                    this.d_melt = "constant_Tm";
                } else if(item === "Steinberg-Guinan") {
                } else if(item === "Burakovsky-Preston-Silbar") {
                }
            } else if(source === this.spHeatComB) {
                if(item === "Constant") {
                    this.d_spHeat = "constant_Cp";
                } else if(item === "Copper Model") {
                } else if(item === "Steel Model") {
                } else if(item === "Aluminum Model") {
                }
            } else if(source === this.damageComB) {
                if(item === "Johnson-Cook") {
                    this.d_damage = "johnson_cook";
                    this.hancockMacKenzieDamageFrame.setVisible(false);
                } else if(item === "Hancock-MacKenzie") {
                    this.d_damage = "hancock_mackenzie";
                    this.hancockMacKenzieDamageFrame.setLocation(location);
                    this.hancockMacKenzieDamageFrame.setVisible(true);
                }
            } else if(source === this.stabilityComB) {
                if(item === "None") {
                    this.d_stability = "none";
                } else if(item === "Drucker Stability") {
                } else if(item === "Acoustic Tensor Stability") {
                } else if(item === "Drucker + Acoustic Tensor") {
                }
            }
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab1 : string) {
            if(pw == null) return;
            var tab2 : string = <string>new String(tab1 + "  ");
            pw.println(tab1 + "<isothermal> " + this.d_isothermal + " </isothermal>");
            pw.println(tab1 + "<do_melting> " + this.d_doMelting + " </do_melting>");
            pw.println(tab1 + "<evolve_porosity> " + this.d_evolvePorosity + " </evolve_porosity>");
            pw.println(tab1 + "<evolve_damage> " + this.d_evolveDamage + " </evolve_damage>");
            pw.println(tab1 + "<check_TEPLA_failure_criterion> " + this.d_checkTEPLA + " </check_TEPLA_failure_criterion>");
            pw.println(tab1 + "<check_max_stress_failure> " + this.d_stressTriax + " </check_max_stress_failure>");
            pw.println(tab1 + "<compute_specific_heat> " + this.d_spHeatComp + " </compute_specific_heat>");
            pw.println(tab1);
            pw.println(tab1 + "<tolerance> " + this.toleranceEntry.getValue() + " </tolerance>");
            pw.println(tab1 + "<taylor_quinney_coeff> " + this.taylorQuinneyEntry.getValue() + " </taylor_quinney_coeff>");
            pw.println(tab1 + "<critical_stress> " + this.critStressEntry.getValue() + " </critical_stress>");
            pw.println(tab1);
            pw.println(tab1 + "<bulk_modulus> " + this.bulkModEntry.getValue() + " </bulk_modulus>");
            pw.println(tab1 + "<shear_modulus> " + this.shearModEntry.getValue() + " </shear_modulus>");
            pw.println(tab1 + "<coeff_thermal_expansion> " + this.cteEntry.getValue() + " </coeff_thermal_expansion>");
            pw.println(tab1);
            pw.println(tab1 + "<equation_of state type = \"" + this.d_eos + "\">");
            if((this.d_eos === <string>new String("mie_gruneisen"))) {
                this.mieGruneisenFrame.writeUintah(pw, tab2);
            }
            pw.println(tab1 + "</equation_of state>");
            pw.println(tab1);
            pw.println(tab1 + "<plasticity_model type = \"" + this.d_flowStress + "\">");
            if((this.d_flowStress === <string>new String("johnson_cook"))) {
                this.johnsonCookFlowFrame.writeUintah(pw, tab2);
            }
            pw.println(tab1 + "</plasticity_model>");
            pw.println(tab1);
            pw.println(tab1 + "<yield_condition type = \"" + this.d_yieldCond + "\">");
            pw.println(tab1 + "</yield_condition>");
            pw.println(tab1);
            pw.println(tab1 + "<shear_modulus_model type = \"" + this.d_shear + "\">");
            pw.println(tab1 + "</shear_modulus_model>");
            pw.println(tab1);
            pw.println(tab1 + "<melting_temp_model type = \"" + this.d_melt + "\">");
            pw.println(tab1 + "</melting_temp_model>");
            pw.println(tab1);
            pw.println(tab1 + "<specific_heat_model type = \"" + this.d_spHeat + "\">");
            pw.println(tab1 + "</specific_heat_model>");
            pw.println(tab1);
            pw.println(tab1 + "<damage_model type = \"" + this.d_damage + "\">");
            if((this.d_damage === <string>new String("hancock_mackenzie"))) {
                this.hancockMacKenzieDamageFrame.writeUintah(pw, tab2);
            }
            pw.println(tab1 + "</damage_model>");
            pw.println(tab1);
            pw.println(tab1 + "<stability_check type = \"" + this.d_stability + "\">");
            pw.println(tab1 + "</stability_check>");
            pw.println(tab1);
        }
    }

    export namespace ElasticPlasticMaterialPanel {

        export class CheckBoxListener implements ItemListener {
            public __parent: any;
            public itemStateChanged(e : ItemEvent) {
                var source : any = e.getItemSelectable();
                if(source === this.__parent.isothermalCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_isothermal = true;
                    } else {
                        this.__parent.d_isothermal = false;
                    }
                } else if(source === this.__parent.doMeltingCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_doMelting = true;
                    } else {
                        this.__parent.d_doMelting = false;
                    }
                } else if(source === this.__parent.spHeatCompCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_spHeatComp = true;
                    } else {
                        this.__parent.d_spHeatComp = false;
                    }
                } else if(source === this.__parent.evolvePorosityCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_evolvePorosity = true;
                    } else {
                        this.__parent.d_evolvePorosity = false;
                    }
                } else if(source === this.__parent.evolveDamageCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_evolveDamage = true;
                    } else {
                        this.__parent.d_evolveDamage = false;
                    }
                } else if(source === this.__parent.checkTEPLACB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_checkTEPLA = true;
                    } else {
                        this.__parent.d_checkTEPLA = false;
                    }
                } else if(source === this.__parent.stressTriaxCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_stressTriax = true;
                    } else {
                        this.__parent.d_stressTriax = false;
                    }
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ItemListener"] });
                this.__parent = __parent;
            }
        }

        export class MieGruneisenFrame extends JFrame implements ActionListener, DocumentListener {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d_c0 : number;

            d_gamma0 : number;

            d_salpha : number;

            c0Entry : DecimalField;

            gamma0Entry : DecimalField;

            salphaEntry : DecimalField;

            closeButton : JButton;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.event.DocumentListener","javax.swing.RootPaneContainer","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.WindowConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 129466013765137485;
                this.d_c0 = 0.0;
                this.d_gamma0 = 0.0;
                this.d_salpha = 0.0;
                this.c0Entry = null;
                this.gamma0Entry = null;
                this.salphaEntry = null;
                this.closeButton = null;
                this.setLocation(100, 100);
                this.setTitle("Mie-Gruneisen EOS Model");
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.getContentPane().setLayout(gb);
                var panel : JPanel = new JPanel(new GridLayout(3, 0));
                var c0Label : JLabel = new JLabel("C_0");
                var gamma0Label : JLabel = new JLabel("gamma_0");
                var salphaLabel : JLabel = new JLabel("S_alpha");
                this.d_c0 = 3940.0;
                this.d_gamma0 = 2.02;
                this.d_salpha = 1.489;
                this.c0Entry = new DecimalField(this.d_c0, 6);
                this.gamma0Entry = new DecimalField(this.d_gamma0, 6);
                this.salphaEntry = new DecimalField(this.d_salpha, 6);
                this.c0Entry.getDocument().addDocumentListener(this);
                this.gamma0Entry.getDocument().addDocumentListener(this);
                this.salphaEntry.getDocument().addDocumentListener(this);
                panel.add(c0Label);
                panel.add(this.c0Entry);
                panel.add(gamma0Label);
                panel.add(this.gamma0Entry);
                panel.add(salphaLabel);
                panel.add(this.salphaEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel, gbc);
                this.getContentPane().add(panel);
                this.closeButton = new JButton("Close");
                this.closeButton.setActionCommand("close");
                this.closeButton.addActionListener(this);
                UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(this.closeButton, gbc);
                this.getContentPane().add(this.closeButton);
            }

            public insertUpdate(e : DocumentEvent) {
                this.d_c0 = this.c0Entry.getValue();
                this.d_gamma0 = this.gamma0Entry.getValue();
                this.d_salpha = this.salphaEntry.getValue();
            }

            public removeUpdate(e : DocumentEvent) {
            }

            public changedUpdate(e : DocumentEvent) {
            }

            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "close") {
                    this.setVisible(false);
                }
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                if(pw == null) return;
                pw.println(tab + "<C_0> " + this.d_c0 + " </C_0>");
                pw.println(tab + "<Gamma_0> " + this.d_gamma0 + " </Gamma_0>");
                pw.println(tab + "<S_alpha> " + this.d_salpha + " </S_alpha>");
            }
        }

        export class JohnsonCookFlowFrame extends JFrame implements ActionListener {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            c_AEntry : DecimalField;

            c_BEntry : DecimalField;

            c_CEntry : DecimalField;

            c_nEntry : DecimalField;

            c_mEntry : DecimalField;

            c_epdot0Entry : DecimalField;

            c_TrEntry : DecimalField;

            c_TmEntry : DecimalField;

            closeButton : JButton;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.RootPaneContainer","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.WindowConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 549130924707254360;
                this.c_AEntry = null;
                this.c_BEntry = null;
                this.c_CEntry = null;
                this.c_nEntry = null;
                this.c_mEntry = null;
                this.c_epdot0Entry = null;
                this.c_TrEntry = null;
                this.c_TmEntry = null;
                this.closeButton = null;
                this.setLocation(150, 150);
                this.setTitle("Johnson-Cook Flow Model");
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.getContentPane().setLayout(gb);
                var panel : JPanel = new JPanel(new GridLayout(8, 0));
                var c_ALabel : JLabel = new JLabel("A");
                var c_BLabel : JLabel = new JLabel("B");
                var c_CLabel : JLabel = new JLabel("C");
                var c_nLabel : JLabel = new JLabel("n");
                var c_mLabel : JLabel = new JLabel("m");
                var c_epdot0Label : JLabel = new JLabel("epdot_0");
                var c_TrLabel : JLabel = new JLabel("T_r");
                var c_TmLabel : JLabel = new JLabel("T_m");
                this.c_AEntry = new DecimalField(9.0E7, 9, true);
                this.c_BEntry = new DecimalField(2.92E8, 9, true);
                this.c_CEntry = new DecimalField(0.025, 6);
                this.c_nEntry = new DecimalField(0.31, 6);
                this.c_mEntry = new DecimalField(1.09, 6);
                this.c_epdot0Entry = new DecimalField(1.0, 9, true);
                this.c_TrEntry = new DecimalField(298.0, 6);
                this.c_TmEntry = new DecimalField(1793.0, 6);
                panel.add(c_ALabel);
                panel.add(this.c_AEntry);
                panel.add(c_BLabel);
                panel.add(this.c_BEntry);
                panel.add(c_CLabel);
                panel.add(this.c_CEntry);
                panel.add(c_nLabel);
                panel.add(this.c_nEntry);
                panel.add(c_mLabel);
                panel.add(this.c_mEntry);
                panel.add(c_epdot0Label);
                panel.add(this.c_epdot0Entry);
                panel.add(c_TrLabel);
                panel.add(this.c_TrEntry);
                panel.add(c_TmLabel);
                panel.add(this.c_TmEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel, gbc);
                this.getContentPane().add(panel);
                this.closeButton = new JButton("Close");
                this.closeButton.setActionCommand("close");
                this.closeButton.addActionListener(this);
                UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(this.closeButton, gbc);
                this.getContentPane().add(this.closeButton);
            }

            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "close") {
                    this.setVisible(false);
                }
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                if(pw == null) return;
                pw.println(tab + "<A> " + this.c_AEntry.getValue() + " </A>");
                pw.println(tab + "<B> " + this.c_BEntry.getValue() + " </B>");
                pw.println(tab + "<C> " + this.c_CEntry.getValue() + " </C>");
                pw.println(tab + "<n> " + this.c_nEntry.getValue() + " </n>");
                pw.println(tab + "<m> " + this.c_mEntry.getValue() + " </m>");
                pw.println(tab + "<epdot_0> " + this.c_epdot0Entry.getValue() + " </epdot_0>");
                pw.println(tab + "<Tr> " + this.c_TrEntry.getValue() + " </Tr>");
                pw.println(tab + "<Tm> " + this.c_TrEntry.getValue() + " </Tm>");
            }
        }

        export class HancockMacKenzieDamageFrame extends JFrame implements ActionListener {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d0Entry : DecimalField;

            dCritEntry : DecimalField;

            closeButton : JButton;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.RootPaneContainer","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.WindowConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -7070186904046548969;
                this.d0Entry = null;
                this.dCritEntry = null;
                this.closeButton = null;
                this.setLocation(200, 200);
                this.setTitle("Hancock-MacKenzie Damage Model");
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.getContentPane().setLayout(gb);
                var panel : JPanel = new JPanel(new GridLayout(2, 0));
                var d0Label : JLabel = new JLabel("D_0");
                var dCritLabel : JLabel = new JLabel("D_crit");
                this.d0Entry = new DecimalField(1.0E-4, 6);
                this.dCritEntry = new DecimalField(0.7, 6);
                panel.add(d0Label);
                panel.add(this.d0Entry);
                panel.add(dCritLabel);
                panel.add(this.dCritEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel, gbc);
                this.getContentPane().add(panel);
                this.closeButton = new JButton("Close");
                this.closeButton.setActionCommand("close");
                this.closeButton.addActionListener(this);
                UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(this.closeButton, gbc);
                this.getContentPane().add(this.closeButton);
            }

            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "close") {
                    this.setVisible(false);
                }
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                if(pw == null) return;
                pw.println(tab + "<D0> " + this.d0Entry.getValue() + " </D0>");
                pw.println(tab + "<Dc> " + this.dCritEntry.getValue() + " </Dc>");
            }
        }
    }

}

