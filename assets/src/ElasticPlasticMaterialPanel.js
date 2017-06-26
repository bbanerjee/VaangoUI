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
    var ElasticPlasticMaterialPanel = (function (_super) {
        __extends(ElasticPlasticMaterialPanel, _super);
        function ElasticPlasticMaterialPanel() {
            var _this = _super.call(this) || this;
            _this.d_isothermal = false;
            _this.d_doMelting = false;
            _this.d_evolvePorosity = false;
            _this.d_evolveDamage = false;
            _this.d_checkTEPLA = false;
            _this.d_stressTriax = false;
            _this.d_spHeatComp = false;
            _this.d_eos = null;
            _this.d_flowStress = null;
            _this.d_yieldCond = null;
            _this.d_shear = null;
            _this.d_melt = null;
            _this.d_spHeat = null;
            _this.d_damage = null;
            _this.d_stability = null;
            _this.isothermalCB = null;
            _this.doMeltingCB = null;
            _this.evolvePorosityCB = null;
            _this.evolveDamageCB = null;
            _this.checkTEPLACB = null;
            _this.stressTriaxCB = null;
            _this.spHeatCompCB = null;
            _this.toleranceEntry = null;
            _this.taylorQuinneyEntry = null;
            _this.critStressEntry = null;
            _this.bulkModEntry = null;
            _this.shearModEntry = null;
            _this.cteEntry = null;
            _this.eosComB = null;
            _this.flowStressComB = null;
            _this.yieldCondComB = null;
            _this.shearComB = null;
            _this.meltComB = null;
            _this.spHeatComB = null;
            _this.damageComB = null;
            _this.stabilityComB = null;
            _this.mieGruneisenFrame = null;
            _this.johnsonCookFlowFrame = null;
            _this.hancockMacKenzieDamageFrame = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_isothermal = false;
            _this.d_doMelting = false;
            _this.d_evolvePorosity = false;
            _this.d_evolveDamage = false;
            _this.d_checkTEPLA = false;
            _this.d_stressTriax = false;
            _this.d_spHeatComp = false;
            _this.d_eos = new String("mie_gruneisen");
            _this.d_flowStress = new String("johnson_cook");
            _this.d_yieldCond = new String("vonMises");
            _this.d_shear = new String("constant_shear");
            _this.d_melt = new String("constant_Tm");
            _this.d_spHeat = new String("constant_Cp");
            _this.d_damage = new String("hancock_mackenzie");
            _this.d_stability = new String("none");
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var panel1 = new JPanel(new GridLayout(4, 0));
            _this.isothermalCB = new JCheckBox("Isothermal");
            _this.doMeltingCB = new JCheckBox("Do Melting");
            _this.spHeatCompCB = new JCheckBox("Compute Specific Heat");
            _this.evolvePorosityCB = new JCheckBox("Evolve Porosity");
            _this.evolveDamageCB = new JCheckBox("Evolve Damage");
            _this.checkTEPLACB = new JCheckBox("Check TEPLA Failure Crit.");
            _this.stressTriaxCB = new JCheckBox("Check Max. Stress Failure Crit.");
            _this.isothermalCB.setSelected(false);
            _this.doMeltingCB.setSelected(false);
            _this.spHeatCompCB.setSelected(false);
            _this.evolvePorosityCB.setSelected(false);
            _this.evolveDamageCB.setSelected(false);
            _this.checkTEPLACB.setSelected(false);
            _this.stressTriaxCB.setSelected(false);
            panel1.add(_this.isothermalCB);
            panel1.add(_this.doMeltingCB);
            panel1.add(_this.spHeatCompCB);
            panel1.add(_this.evolvePorosityCB);
            panel1.add(_this.evolveDamageCB);
            panel1.add(_this.checkTEPLACB);
            panel1.add(_this.stressTriaxCB);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            var fillBoth = GridBagConstraints.BOTH;
            var panelgb = new GridBagLayout();
            var panelgbc = new GridBagConstraints();
            var panelElastic = new JPanel(panelgb);
            var bulkModLabel = new JLabel("Bulk Modulus");
            UintahGui.setConstraints(panelgbc, fillBoth, 0, 0);
            panelgb.setConstraints(bulkModLabel, panelgbc);
            panelElastic.add(bulkModLabel);
            _this.bulkModEntry = new vaango_ui.DecimalField(1.3E11, 9, true);
            UintahGui.setConstraints(panelgbc, fillBoth, 1, 0);
            panelgb.setConstraints(_this.bulkModEntry, panelgbc);
            panelElastic.add(_this.bulkModEntry);
            var shearModLabel = new JLabel("Shear Modulus");
            UintahGui.setConstraints(panelgbc, fillBoth, 0, 1);
            panelgb.setConstraints(shearModLabel, panelgbc);
            panelElastic.add(shearModLabel);
            _this.shearModEntry = new vaango_ui.DecimalField(4.6E10, 9, true);
            UintahGui.setConstraints(panelgbc, fillBoth, 1, 1);
            panelgb.setConstraints(_this.shearModEntry, panelgbc);
            panelElastic.add(_this.shearModEntry);
            var cteLabel = new JLabel("Coeff. of Thermal Expansion");
            UintahGui.setConstraints(panelgbc, fillBoth, 0, 2);
            panelgb.setConstraints(cteLabel, panelgbc);
            panelElastic.add(cteLabel);
            _this.cteEntry = new vaango_ui.DecimalField(1.0E-5, 9, true);
            UintahGui.setConstraints(panelgbc, fillBoth, 1, 2);
            panelgb.setConstraints(_this.cteEntry, panelgbc);
            panelElastic.add(_this.cteEntry);
            UintahGui.setConstraints(gbc, fillBoth, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panelElastic, gbc);
            _this.add(panelElastic);
            var panel2 = new JPanel(new GridLayout(11, 0));
            var toleranceLabel = new JLabel("Tolerance");
            var taylorQuinneyLabel = new JLabel("Taylor-Quinney Coefficient");
            var critStressLabel = new JLabel("Max. Triax. Stress at Failure");
            _this.toleranceEntry = new vaango_ui.DecimalField(1.0E-12, 9, true);
            _this.taylorQuinneyEntry = new vaango_ui.DecimalField(0.9, 3);
            _this.critStressEntry = new vaango_ui.DecimalField(5.0E9, 9, true);
            panel2.add(toleranceLabel);
            panel2.add(_this.toleranceEntry);
            panel2.add(taylorQuinneyLabel);
            panel2.add(_this.taylorQuinneyEntry);
            panel2.add(critStressLabel);
            panel2.add(_this.critStressEntry);
            var eosLabel = new JLabel("Equation of State Model");
            var flowStressLabel = new JLabel("Flow Stress Model");
            var yieldCondLabel = new JLabel("Yield Condition Model");
            var shearLabel = new JLabel("Shear Modulus Model");
            var meltLabel = new JLabel("Melt Temperature Model");
            var spHeatLabel = new JLabel("Specific Heat Model");
            var damageLabel = new JLabel("Damage Model");
            var stabilityLabel = new JLabel("Material Stability Model");
            _this.eosComB = new JComboBox();
            _this.flowStressComB = new JComboBox();
            _this.yieldCondComB = new JComboBox();
            _this.shearComB = new JComboBox();
            _this.meltComB = new JComboBox();
            _this.spHeatComB = new JComboBox();
            _this.damageComB = new JComboBox();
            _this.stabilityComB = new JComboBox();
            _this.eosComB.addItem("Mie-Gruneisen");
            _this.eosComB.addItem("None");
            _this.flowStressComB.addItem("Johnson-Cook");
            _this.flowStressComB.addItem("Mechanical Threshold Stress");
            _this.flowStressComB.addItem("Preston-Tonks-Wallace");
            _this.flowStressComB.addItem("Zerilli-Armstrong");
            _this.flowStressComB.addItem("Steinberg-Cochran-Guinan");
            _this.flowStressComB.addItem("Linear");
            _this.yieldCondComB.addItem("von Mises");
            _this.yieldCondComB.addItem("Gurson-Tvergaard-Needleman");
            _this.shearComB.addItem("Constant");
            _this.shearComB.addItem("Chen-Gray");
            _this.shearComB.addItem("Steinberg-Guinan");
            _this.shearComB.addItem("Nadal-Le Poac");
            _this.meltComB.addItem("Constant");
            _this.meltComB.addItem("Steinberg-Guinan");
            _this.meltComB.addItem("Burakovsky-Preston-Silbar");
            _this.spHeatComB.addItem("Constant");
            _this.spHeatComB.addItem("Copper Model");
            _this.spHeatComB.addItem("Steel Model");
            _this.spHeatComB.addItem("Aluminum Model");
            _this.damageComB.addItem("Hancock-MacKenzie");
            _this.damageComB.addItem("Johnson-Cook");
            _this.stabilityComB.addItem("None");
            _this.stabilityComB.addItem("Drucker Stability");
            _this.stabilityComB.addItem("Acoustic Tensor Stability");
            _this.stabilityComB.addItem("Drucker + Acoustic Tensor");
            panel2.add(eosLabel);
            panel2.add(_this.eosComB);
            panel2.add(flowStressLabel);
            panel2.add(_this.flowStressComB);
            panel2.add(yieldCondLabel);
            panel2.add(_this.yieldCondComB);
            panel2.add(shearLabel);
            panel2.add(_this.shearComB);
            panel2.add(meltLabel);
            panel2.add(_this.meltComB);
            panel2.add(spHeatLabel);
            panel2.add(_this.spHeatComB);
            panel2.add(damageLabel);
            panel2.add(_this.damageComB);
            panel2.add(stabilityLabel);
            panel2.add(_this.stabilityComB);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            _this.add(panel2);
            _this.mieGruneisenFrame = new ElasticPlasticMaterialPanel.MieGruneisenFrame(_this);
            _this.johnsonCookFlowFrame = new ElasticPlasticMaterialPanel.JohnsonCookFlowFrame(_this);
            _this.hancockMacKenzieDamageFrame = new ElasticPlasticMaterialPanel.HancockMacKenzieDamageFrame(_this);
            _this.mieGruneisenFrame.pack();
            _this.johnsonCookFlowFrame.pack();
            _this.hancockMacKenzieDamageFrame.pack();
            _this.mieGruneisenFrame.setVisible(false);
            _this.johnsonCookFlowFrame.setVisible(false);
            _this.hancockMacKenzieDamageFrame.setVisible(false);
            var checkBoxListener = new ElasticPlasticMaterialPanel.CheckBoxListener(_this);
            _this.isothermalCB.addItemListener(checkBoxListener);
            _this.doMeltingCB.addItemListener(checkBoxListener);
            _this.spHeatCompCB.addItemListener(checkBoxListener);
            _this.evolvePorosityCB.addItemListener(checkBoxListener);
            _this.evolveDamageCB.addItemListener(checkBoxListener);
            _this.checkTEPLACB.addItemListener(checkBoxListener);
            _this.stressTriaxCB.addItemListener(checkBoxListener);
            _this.eosComB.addActionListener(_this);
            _this.flowStressComB.addActionListener(_this);
            _this.yieldCondComB.addActionListener(_this);
            _this.shearComB.addActionListener(_this);
            _this.meltComB.addActionListener(_this);
            _this.spHeatComB.addActionListener(_this);
            _this.damageComB.addActionListener(_this);
            _this.stabilityComB.addActionListener(_this);
            return _this;
        }
        ElasticPlasticMaterialPanel.prototype.actionPerformed = function (e) {
            var source = e.getSource();
            var item = source.getSelectedItem();
            var location = this.getParent().getLocation();
            this.validate();
            if (source === this.eosComB) {
                if (item === "Mie-Gruneisen") {
                    this.d_eos = "mie_gruneisen";
                    this.mieGruneisenFrame.setLocation(location);
                    this.mieGruneisenFrame.setVisible(true);
                }
                else if (item === "None") {
                    this.d_eos = "none";
                    this.mieGruneisenFrame.setVisible(false);
                }
            }
            else if (source === this.flowStressComB) {
                if (item === "Johnson-Cook") {
                    this.d_flowStress = "johnson_cook";
                    this.johnsonCookFlowFrame.setLocation(location);
                    this.johnsonCookFlowFrame.setVisible(true);
                }
                else if (item === "Mechanical Threshold Stress") {
                    this.johnsonCookFlowFrame.setVisible(false);
                }
                else if (item === "Preston-Tonks-Wallace") {
                    this.johnsonCookFlowFrame.setVisible(false);
                }
                else if (item === "Zerilli-Armstrong") {
                    this.johnsonCookFlowFrame.setVisible(false);
                }
                else if (item === "Steinberg-Cochran-Guinan") {
                    this.johnsonCookFlowFrame.setVisible(false);
                }
                else if (item === "Linear") {
                    this.johnsonCookFlowFrame.setVisible(false);
                }
            }
            else if (source === this.yieldCondComB) {
                if (item === "von Mises") {
                    this.d_yieldCond = "vonMises";
                }
                else if (item === "Gurson-Tvergaard-Needleman") {
                }
            }
            else if (source === this.shearComB) {
                if (item === "Constant") {
                    this.d_shear = "constant_shear";
                }
                else if (item === "Chen-Gray") {
                }
                else if (item === "Steinberg-Guinan") {
                }
                else if (item === "Nadal-Le Poac") {
                }
            }
            else if (source === this.meltComB) {
                if (item === "Constant") {
                    this.d_melt = "constant_Tm";
                }
                else if (item === "Steinberg-Guinan") {
                }
                else if (item === "Burakovsky-Preston-Silbar") {
                }
            }
            else if (source === this.spHeatComB) {
                if (item === "Constant") {
                    this.d_spHeat = "constant_Cp";
                }
                else if (item === "Copper Model") {
                }
                else if (item === "Steel Model") {
                }
                else if (item === "Aluminum Model") {
                }
            }
            else if (source === this.damageComB) {
                if (item === "Johnson-Cook") {
                    this.d_damage = "johnson_cook";
                    this.hancockMacKenzieDamageFrame.setVisible(false);
                }
                else if (item === "Hancock-MacKenzie") {
                    this.d_damage = "hancock_mackenzie";
                    this.hancockMacKenzieDamageFrame.setLocation(location);
                    this.hancockMacKenzieDamageFrame.setVisible(true);
                }
            }
            else if (source === this.stabilityComB) {
                if (item === "None") {
                    this.d_stability = "none";
                }
                else if (item === "Drucker Stability") {
                }
                else if (item === "Acoustic Tensor Stability") {
                }
                else if (item === "Drucker + Acoustic Tensor") {
                }
            }
        };
        /**
         * Write the contents out in Uintah format
         */
        ElasticPlasticMaterialPanel.prototype.writeUintah = function (pw, tab1) {
            if (pw == null)
                return;
            var tab2 = new String(tab1 + "  ");
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
            if ((this.d_eos === new String("mie_gruneisen"))) {
                this.mieGruneisenFrame.writeUintah(pw, tab2);
            }
            pw.println(tab1 + "</equation_of state>");
            pw.println(tab1);
            pw.println(tab1 + "<plasticity_model type = \"" + this.d_flowStress + "\">");
            if ((this.d_flowStress === new String("johnson_cook"))) {
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
            if ((this.d_damage === new String("hancock_mackenzie"))) {
                this.hancockMacKenzieDamageFrame.writeUintah(pw, tab2);
            }
            pw.println(tab1 + "</damage_model>");
            pw.println(tab1);
            pw.println(tab1 + "<stability_check type = \"" + this.d_stability + "\">");
            pw.println(tab1 + "</stability_check>");
            pw.println(tab1);
        };
        return ElasticPlasticMaterialPanel;
    }(JPanel));
    /**
     *
     */
    ElasticPlasticMaterialPanel.serialVersionUID = -975020056441827558;
    vaango_ui.ElasticPlasticMaterialPanel = ElasticPlasticMaterialPanel;
    (function (ElasticPlasticMaterialPanel) {
        var CheckBoxListener = (function () {
            function CheckBoxListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ItemListener"] });
                this.__parent = __parent;
            }
            CheckBoxListener.prototype.itemStateChanged = function (e) {
                var source = e.getItemSelectable();
                if (source === this.__parent.isothermalCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_isothermal = true;
                    }
                    else {
                        this.__parent.d_isothermal = false;
                    }
                }
                else if (source === this.__parent.doMeltingCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_doMelting = true;
                    }
                    else {
                        this.__parent.d_doMelting = false;
                    }
                }
                else if (source === this.__parent.spHeatCompCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_spHeatComp = true;
                    }
                    else {
                        this.__parent.d_spHeatComp = false;
                    }
                }
                else if (source === this.__parent.evolvePorosityCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_evolvePorosity = true;
                    }
                    else {
                        this.__parent.d_evolvePorosity = false;
                    }
                }
                else if (source === this.__parent.evolveDamageCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_evolveDamage = true;
                    }
                    else {
                        this.__parent.d_evolveDamage = false;
                    }
                }
                else if (source === this.__parent.checkTEPLACB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_checkTEPLA = true;
                    }
                    else {
                        this.__parent.d_checkTEPLA = false;
                    }
                }
                else if (source === this.__parent.stressTriaxCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_stressTriax = true;
                    }
                    else {
                        this.__parent.d_stressTriax = false;
                    }
                }
            };
            return CheckBoxListener;
        }());
        ElasticPlasticMaterialPanel.CheckBoxListener = CheckBoxListener;
        var MieGruneisenFrame = (function (_super) {
            __extends(MieGruneisenFrame, _super);
            function MieGruneisenFrame(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.event.DocumentListener", "javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.WindowConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 129466013765137485;
                _this.d_c0 = 0.0;
                _this.d_gamma0 = 0.0;
                _this.d_salpha = 0.0;
                _this.c0Entry = null;
                _this.gamma0Entry = null;
                _this.salphaEntry = null;
                _this.closeButton = null;
                _this.setLocation(100, 100);
                _this.setTitle("Mie-Gruneisen EOS Model");
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.getContentPane().setLayout(gb);
                var panel = new JPanel(new GridLayout(3, 0));
                var c0Label = new JLabel("C_0");
                var gamma0Label = new JLabel("gamma_0");
                var salphaLabel = new JLabel("S_alpha");
                _this.d_c0 = 3940.0;
                _this.d_gamma0 = 2.02;
                _this.d_salpha = 1.489;
                _this.c0Entry = new vaango_ui.DecimalField(_this.d_c0, 6);
                _this.gamma0Entry = new vaango_ui.DecimalField(_this.d_gamma0, 6);
                _this.salphaEntry = new vaango_ui.DecimalField(_this.d_salpha, 6);
                _this.c0Entry.getDocument().addDocumentListener(_this);
                _this.gamma0Entry.getDocument().addDocumentListener(_this);
                _this.salphaEntry.getDocument().addDocumentListener(_this);
                panel.add(c0Label);
                panel.add(_this.c0Entry);
                panel.add(gamma0Label);
                panel.add(_this.gamma0Entry);
                panel.add(salphaLabel);
                panel.add(_this.salphaEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel, gbc);
                _this.getContentPane().add(panel);
                _this.closeButton = new JButton("Close");
                _this.closeButton.setActionCommand("close");
                _this.closeButton.addActionListener(_this);
                UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(_this.closeButton, gbc);
                _this.getContentPane().add(_this.closeButton);
                return _this;
            }
            MieGruneisenFrame.prototype.insertUpdate = function (e) {
                this.d_c0 = this.c0Entry.getValue();
                this.d_gamma0 = this.gamma0Entry.getValue();
                this.d_salpha = this.salphaEntry.getValue();
            };
            MieGruneisenFrame.prototype.removeUpdate = function (e) {
            };
            MieGruneisenFrame.prototype.changedUpdate = function (e) {
            };
            MieGruneisenFrame.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "close") {
                    this.setVisible(false);
                }
            };
            MieGruneisenFrame.prototype.writeUintah = function (pw, tab) {
                if (pw == null)
                    return;
                pw.println(tab + "<C_0> " + this.d_c0 + " </C_0>");
                pw.println(tab + "<Gamma_0> " + this.d_gamma0 + " </Gamma_0>");
                pw.println(tab + "<S_alpha> " + this.d_salpha + " </S_alpha>");
            };
            return MieGruneisenFrame;
        }(JFrame));
        ElasticPlasticMaterialPanel.MieGruneisenFrame = MieGruneisenFrame;
        var JohnsonCookFlowFrame = (function (_super) {
            __extends(JohnsonCookFlowFrame, _super);
            function JohnsonCookFlowFrame(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.WindowConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 549130924707254360;
                _this.c_AEntry = null;
                _this.c_BEntry = null;
                _this.c_CEntry = null;
                _this.c_nEntry = null;
                _this.c_mEntry = null;
                _this.c_epdot0Entry = null;
                _this.c_TrEntry = null;
                _this.c_TmEntry = null;
                _this.closeButton = null;
                _this.setLocation(150, 150);
                _this.setTitle("Johnson-Cook Flow Model");
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.getContentPane().setLayout(gb);
                var panel = new JPanel(new GridLayout(8, 0));
                var c_ALabel = new JLabel("A");
                var c_BLabel = new JLabel("B");
                var c_CLabel = new JLabel("C");
                var c_nLabel = new JLabel("n");
                var c_mLabel = new JLabel("m");
                var c_epdot0Label = new JLabel("epdot_0");
                var c_TrLabel = new JLabel("T_r");
                var c_TmLabel = new JLabel("T_m");
                _this.c_AEntry = new vaango_ui.DecimalField(9.0E7, 9, true);
                _this.c_BEntry = new vaango_ui.DecimalField(2.92E8, 9, true);
                _this.c_CEntry = new vaango_ui.DecimalField(0.025, 6);
                _this.c_nEntry = new vaango_ui.DecimalField(0.31, 6);
                _this.c_mEntry = new vaango_ui.DecimalField(1.09, 6);
                _this.c_epdot0Entry = new vaango_ui.DecimalField(1.0, 9, true);
                _this.c_TrEntry = new vaango_ui.DecimalField(298.0, 6);
                _this.c_TmEntry = new vaango_ui.DecimalField(1793.0, 6);
                panel.add(c_ALabel);
                panel.add(_this.c_AEntry);
                panel.add(c_BLabel);
                panel.add(_this.c_BEntry);
                panel.add(c_CLabel);
                panel.add(_this.c_CEntry);
                panel.add(c_nLabel);
                panel.add(_this.c_nEntry);
                panel.add(c_mLabel);
                panel.add(_this.c_mEntry);
                panel.add(c_epdot0Label);
                panel.add(_this.c_epdot0Entry);
                panel.add(c_TrLabel);
                panel.add(_this.c_TrEntry);
                panel.add(c_TmLabel);
                panel.add(_this.c_TmEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel, gbc);
                _this.getContentPane().add(panel);
                _this.closeButton = new JButton("Close");
                _this.closeButton.setActionCommand("close");
                _this.closeButton.addActionListener(_this);
                UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(_this.closeButton, gbc);
                _this.getContentPane().add(_this.closeButton);
                return _this;
            }
            JohnsonCookFlowFrame.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "close") {
                    this.setVisible(false);
                }
            };
            JohnsonCookFlowFrame.prototype.writeUintah = function (pw, tab) {
                if (pw == null)
                    return;
                pw.println(tab + "<A> " + this.c_AEntry.getValue() + " </A>");
                pw.println(tab + "<B> " + this.c_BEntry.getValue() + " </B>");
                pw.println(tab + "<C> " + this.c_CEntry.getValue() + " </C>");
                pw.println(tab + "<n> " + this.c_nEntry.getValue() + " </n>");
                pw.println(tab + "<m> " + this.c_mEntry.getValue() + " </m>");
                pw.println(tab + "<epdot_0> " + this.c_epdot0Entry.getValue() + " </epdot_0>");
                pw.println(tab + "<Tr> " + this.c_TrEntry.getValue() + " </Tr>");
                pw.println(tab + "<Tm> " + this.c_TrEntry.getValue() + " </Tm>");
            };
            return JohnsonCookFlowFrame;
        }(JFrame));
        ElasticPlasticMaterialPanel.JohnsonCookFlowFrame = JohnsonCookFlowFrame;
        var HancockMacKenzieDamageFrame = (function (_super) {
            __extends(HancockMacKenzieDamageFrame, _super);
            function HancockMacKenzieDamageFrame(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.WindowConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -7070186904046548969;
                _this.d0Entry = null;
                _this.dCritEntry = null;
                _this.closeButton = null;
                _this.setLocation(200, 200);
                _this.setTitle("Hancock-MacKenzie Damage Model");
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.getContentPane().setLayout(gb);
                var panel = new JPanel(new GridLayout(2, 0));
                var d0Label = new JLabel("D_0");
                var dCritLabel = new JLabel("D_crit");
                _this.d0Entry = new vaango_ui.DecimalField(1.0E-4, 6);
                _this.dCritEntry = new vaango_ui.DecimalField(0.7, 6);
                panel.add(d0Label);
                panel.add(_this.d0Entry);
                panel.add(dCritLabel);
                panel.add(_this.dCritEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel, gbc);
                _this.getContentPane().add(panel);
                _this.closeButton = new JButton("Close");
                _this.closeButton.setActionCommand("close");
                _this.closeButton.addActionListener(_this);
                UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(_this.closeButton, gbc);
                _this.getContentPane().add(_this.closeButton);
                return _this;
            }
            HancockMacKenzieDamageFrame.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "close") {
                    this.setVisible(false);
                }
            };
            HancockMacKenzieDamageFrame.prototype.writeUintah = function (pw, tab) {
                if (pw == null)
                    return;
                pw.println(tab + "<D0> " + this.d0Entry.getValue() + " </D0>");
                pw.println(tab + "<Dc> " + this.dCritEntry.getValue() + " </Dc>");
            };
            return HancockMacKenzieDamageFrame;
        }(JFrame));
        ElasticPlasticMaterialPanel.HancockMacKenzieDamageFrame = HancockMacKenzieDamageFrame;
    })(ElasticPlasticMaterialPanel = vaango_ui.ElasticPlasticMaterialPanel || (vaango_ui.ElasticPlasticMaterialPanel = {}));
})(vaango_ui || (vaango_ui = {}));
