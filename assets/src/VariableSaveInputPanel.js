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
    var Vector = java.util.Vector;
    var VariableSaveInputPanel = (function (_super) {
        __extends(VariableSaveInputPanel, _super);
        function VariableSaveInputPanel() {
            var _this = _super.call(this) || this;
            _this.d_summedVar = null;
            _this.d_partVar = null;
            _this.d_gridVar = null;
            _this.d_cellVar = null;
            _this.d_summedVarStr = null;
            _this.d_partVarStr = null;
            _this.d_gridVarStr = null;
            _this.d_cellVarStr = null;
            _this.d_summedVarState = null;
            _this.d_partVarState = null;
            _this.d_gridVarState = null;
            _this.d_cellVarState = null;
            _this.kineticEnergyCB = null;
            _this.accStrainEnergyCB = null;
            _this.strainEnergyCB = null;
            _this.momentumCB = null;
            _this.totalMassCB = null;
            _this.centerOfMassCB = null;
            _this.p_particleIDCB = null;
            _this.p_positionCB = null;
            _this.p_massCB = null;
            _this.p_volumeCB = null;
            _this.p_temperatureCB = null;
            _this.p_stressCB = null;
            _this.p_deformationGradientCB = null;
            _this.p_displacementCB = null;
            _this.p_velocityCB = null;
            _this.p_externalForceCB = null;
            _this.p_localizedCB = null;
            _this.p_damageCB = null;
            _this.p_porosityCB = null;
            _this.p_plasticStrainCB = null;
            _this.p_plasticStrainRateCB = null;
            _this.p_strainRateCB = null;
            _this.g_massCB = null;
            _this.g_volumeCB = null;
            _this.g_velocityCB = null;
            _this.g_stressCB = null;
            _this.g_accelerationCB = null;
            _this.cc_densityCB = null;
            _this.cc_temperatureCB = null;
            _this.cc_velocityCB = null;
            _this.cc_spVolumeCB = null;
            _this.cc_volFracCB = null;
            _this.cc_pressureCB = null;
            _this.cc_equilPressureCB = null;
            _this.cc_intEnergyLCB = null;
            _this.cc_intEnergySourceCB = null;
            _this.cc_TdotCB = null;
            _this.cc_momentumLCB = null;
            _this.cc_momentumSourceCB = null;
            _this.cc_delPDilatateCB = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_summedVar = new Vector();
            _this.d_partVar = new Vector();
            _this.d_gridVar = new Vector();
            _this.d_cellVar = new Vector();
            _this.d_summedVarStr = new Vector();
            _this.d_partVarStr = new Vector();
            _this.d_gridVarStr = new Vector();
            _this.d_cellVarStr = new Vector();
            _this.d_summedVarState = new Vector();
            _this.d_partVarState = new Vector();
            _this.d_gridVarState = new Vector();
            _this.d_cellVarState = new Vector();
            var panel0 = new JPanel(new GridLayout(1, 0));
            var panel1 = new JPanel(new GridLayout(0, 1));
            var panel2 = new JPanel(new GridLayout(0, 1));
            var panel3 = new JPanel(new GridLayout(0, 1));
            var panel4 = new JPanel(new GridLayout(0, 1));
            var label0 = new JLabel("Variables to be saved");
            panel0.add(label0);
            var label1 = new JLabel("Summed Variables");
            panel1.add(label1);
            _this.kineticEnergyCB = new JCheckBox("Kinetic Energy");
            _this.strainEnergyCB = new JCheckBox("Inc. Strain Energy");
            _this.accStrainEnergyCB = new JCheckBox("Total Strain Energy");
            _this.momentumCB = new JCheckBox("Momentum");
            _this.totalMassCB = new JCheckBox("Mass");
            _this.centerOfMassCB = new JCheckBox("Center of Mass");
            _this.d_summedVar.addElement(_this.kineticEnergyCB);
            _this.d_summedVarStr.addElement(new String("KineticEnergy"));
            _this.d_summedVar.addElement(_this.strainEnergyCB);
            _this.d_summedVarStr.addElement(new String("StrainEnergy"));
            _this.d_summedVar.addElement(_this.accStrainEnergyCB);
            _this.d_summedVarStr.addElement(new String("AccStrainEnergy"));
            _this.d_summedVar.addElement(_this.totalMassCB);
            _this.d_summedVarStr.addElement(new String("TotalMass"));
            _this.d_summedVar.addElement(_this.centerOfMassCB);
            _this.d_summedVarStr.addElement(new String("CenterOfMassPosition"));
            var numSummedVar = _this.d_summedVar.size();
            for (var ii = 0; ii < numSummedVar; ++ii) {
                var checkBox = _this.d_summedVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(_this);
                _this.d_summedVarState.addElement(new Boolean(true));
                panel1.add(checkBox);
            }
            var label2 = new JLabel("Particle Variables");
            panel2.add(label2);
            _this.p_particleIDCB = new JCheckBox("Particle ID");
            _this.p_positionCB = new JCheckBox("Position");
            _this.p_massCB = new JCheckBox("Mass");
            _this.p_volumeCB = new JCheckBox("Volume");
            _this.p_temperatureCB = new JCheckBox("Temperature");
            _this.p_deformationGradientCB = new JCheckBox("Def. Gradient");
            _this.p_displacementCB = new JCheckBox("Displacement");
            _this.p_velocityCB = new JCheckBox("Velocity");
            _this.p_stressCB = new JCheckBox("Stress");
            _this.p_externalForceCB = new JCheckBox("External Force");
            _this.p_strainRateCB = new JCheckBox("Strain Rate");
            _this.p_localizedCB = new JCheckBox("Failed Particles");
            _this.p_damageCB = new JCheckBox("Damage");
            _this.p_porosityCB = new JCheckBox("Porosity");
            _this.p_plasticStrainCB = new JCheckBox("Plastic Strain");
            _this.p_plasticStrainRateCB = new JCheckBox("Plastic Strain Rate");
            _this.d_partVar.addElement(_this.p_particleIDCB);
            _this.d_partVarStr.addElement(new String("p.particleID"));
            _this.d_partVar.addElement(_this.p_positionCB);
            _this.d_partVarStr.addElement(new String("p.x"));
            _this.d_partVar.addElement(_this.p_massCB);
            _this.d_partVarStr.addElement(new String("p.mass"));
            _this.d_partVar.addElement(_this.p_volumeCB);
            _this.d_partVarStr.addElement(new String("p.volume"));
            _this.d_partVar.addElement(_this.p_temperatureCB);
            _this.d_partVarStr.addElement(new String("p.temperature"));
            _this.d_partVar.addElement(_this.p_deformationGradientCB);
            _this.d_partVarStr.addElement(new String("p.deformationGradient"));
            _this.d_partVar.addElement(_this.p_displacementCB);
            _this.d_partVarStr.addElement(new String("p.displacement"));
            _this.d_partVar.addElement(_this.p_velocityCB);
            _this.d_partVarStr.addElement(new String("p.velocity"));
            _this.d_partVar.addElement(_this.p_stressCB);
            _this.d_partVarStr.addElement(new String("p.stress"));
            _this.d_partVar.addElement(_this.p_externalForceCB);
            _this.d_partVarStr.addElement(new String("p.externalforce"));
            _this.d_partVar.addElement(_this.p_strainRateCB);
            _this.d_partVarStr.addElement(new String("p.strainRate"));
            _this.d_partVar.addElement(_this.p_localizedCB);
            _this.d_partVarStr.addElement(new String("p.localized"));
            _this.d_partVar.addElement(_this.p_damageCB);
            _this.d_partVarStr.addElement(new String("p.damage"));
            _this.d_partVar.addElement(_this.p_porosityCB);
            _this.d_partVarStr.addElement(new String("p.porosity"));
            _this.d_partVar.addElement(_this.p_plasticStrainCB);
            _this.d_partVarStr.addElement(new String("p.plasticStrain"));
            _this.d_partVar.addElement(_this.p_plasticStrainRateCB);
            _this.d_partVarStr.addElement(new String("p.plasticStrainRate"));
            var numPartVar = _this.d_partVar.size();
            for (var ii = 0; ii < numPartVar; ++ii) {
                var checkBox = _this.d_partVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(_this);
                _this.d_partVarState.addElement(new Boolean(true));
                panel2.add(checkBox);
            }
            _this.p_strainRateCB.setSelected(false);
            _this.p_localizedCB.setSelected(false);
            _this.p_damageCB.setSelected(false);
            _this.p_porosityCB.setSelected(false);
            _this.p_plasticStrainCB.setSelected(false);
            _this.p_plasticStrainRateCB.setSelected(false);
            var label3 = new JLabel("Grid Variables");
            panel3.add(label3);
            _this.g_massCB = new JCheckBox("Mass");
            _this.g_volumeCB = new JCheckBox("Volume");
            _this.g_velocityCB = new JCheckBox("Velocity");
            _this.g_stressCB = new JCheckBox("Stress");
            _this.g_accelerationCB = new JCheckBox("Acceleration");
            _this.d_gridVar.addElement(_this.g_massCB);
            _this.d_gridVarStr.addElement(new String("g.mass"));
            _this.d_gridVar.addElement(_this.g_volumeCB);
            _this.d_gridVarStr.addElement(new String("g.volume"));
            _this.d_gridVar.addElement(_this.g_velocityCB);
            _this.d_gridVarStr.addElement(new String("g.velocity"));
            _this.d_gridVar.addElement(_this.g_stressCB);
            _this.d_gridVarStr.addElement(new String("g.stressFS"));
            _this.d_gridVar.addElement(_this.g_accelerationCB);
            _this.d_gridVarStr.addElement(new String("g.acceleration"));
            var numGridVar = _this.d_gridVar.size();
            for (var ii = 0; ii < numGridVar; ++ii) {
                var checkBox = _this.d_gridVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(_this);
                _this.d_gridVarState.addElement(new Boolean(true));
                panel3.add(checkBox);
            }
            var label4 = new JLabel("Cell-Centered Variables");
            panel4.add(label4);
            _this.cc_densityCB = new JCheckBox("Density");
            _this.cc_temperatureCB = new JCheckBox("Temperature");
            _this.cc_velocityCB = new JCheckBox("Velocity");
            _this.cc_spVolumeCB = new JCheckBox("Specific Volume");
            _this.cc_volFracCB = new JCheckBox("Volume Fraction");
            _this.cc_pressureCB = new JCheckBox("Pressure");
            _this.cc_equilPressureCB = new JCheckBox("Equilibriation Pressure");
            _this.cc_intEnergyLCB = new JCheckBox("Internal Energy");
            _this.cc_intEnergySourceCB = new JCheckBox("Internal Energy Source");
            _this.cc_TdotCB = new JCheckBox("Temperature Rate");
            _this.cc_momentumLCB = new JCheckBox("Momentum");
            _this.cc_momentumSourceCB = new JCheckBox("Momentum Source");
            _this.cc_delPDilatateCB = new JCheckBox("delP Dilatation");
            _this.d_cellVar.addElement(_this.cc_densityCB);
            _this.d_cellVarStr.addElement(new String("rho_CC"));
            _this.d_cellVar.addElement(_this.cc_temperatureCB);
            _this.d_cellVarStr.addElement(new String("temp_CC"));
            _this.d_cellVar.addElement(_this.cc_velocityCB);
            _this.d_cellVarStr.addElement(new String("vel_CC"));
            _this.d_cellVar.addElement(_this.cc_spVolumeCB);
            _this.d_cellVarStr.addElement(new String("sp_vol_CC"));
            _this.d_cellVar.addElement(_this.cc_volFracCB);
            _this.d_cellVarStr.addElement(new String("vol_frac_CC"));
            _this.d_cellVar.addElement(_this.cc_pressureCB);
            _this.d_cellVarStr.addElement(new String("press_CC"));
            _this.d_cellVar.addElement(_this.cc_equilPressureCB);
            _this.d_cellVarStr.addElement(new String("press_equil_CC"));
            _this.d_cellVar.addElement(_this.cc_intEnergyLCB);
            _this.d_cellVarStr.addElement(new String("int_eng_L_CC"));
            _this.d_cellVar.addElement(_this.cc_intEnergySourceCB);
            _this.d_cellVarStr.addElement(new String("intE_source_CC"));
            _this.d_cellVar.addElement(_this.cc_TdotCB);
            _this.d_cellVarStr.addElement(new String("Tdot"));
            _this.d_cellVar.addElement(_this.cc_momentumLCB);
            _this.d_cellVarStr.addElement(new String("mom_L_CC"));
            _this.d_cellVar.addElement(_this.cc_momentumSourceCB);
            _this.d_cellVarStr.addElement(new String("mom_source_CC"));
            _this.d_cellVar.addElement(_this.cc_delPDilatateCB);
            _this.d_cellVarStr.addElement(new String("delP_Dilatate"));
            var numCellVar = _this.d_cellVar.size();
            for (var ii = 0; ii < numCellVar; ++ii) {
                var checkBox = _this.d_cellVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(_this);
                _this.d_cellVarState.addElement(new Boolean(true));
                panel4.add(checkBox);
            }
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, GridBagConstraints.REMAINDER, 1, 5);
            gb.setConstraints(panel0, gbc);
            _this.add(panel0);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            _this.add(panel2);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 1, 1, 1, 1, 5);
            gb.setConstraints(panel3, gbc);
            _this.add(panel3);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 1, 2, 1, 1, 5);
            gb.setConstraints(panel4, gbc);
            _this.add(panel4);
            return _this;
        }
        VariableSaveInputPanel.prototype.refresh = function () {
        };
        /**
         * Listen for changed item state
         */
        VariableSaveInputPanel.prototype.itemStateChanged = function (e) {
            var source = e.getItemSelectable();
            var numSummedVar = this.d_summedVar.size();
            for (var ii = 0; ii < numSummedVar; ++ii) {
                var checkBox = this.d_summedVar.elementAt(ii);
                if (source === checkBox) {
                    if (e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_summedVarState.setElementAt(new Boolean(false), ii);
                    }
                    else {
                        this.d_summedVarState.setElementAt(new Boolean(true), ii);
                    }
                    return;
                }
            }
            var numPartVar = this.d_partVar.size();
            for (var ii = 0; ii < numPartVar; ++ii) {
                var checkBox = this.d_partVar.elementAt(ii);
                if (source === checkBox) {
                    if (e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_partVarState.setElementAt(new Boolean(false), ii);
                    }
                    else {
                        this.d_partVarState.setElementAt(new Boolean(true), ii);
                    }
                    return;
                }
            }
            var numGridVar = this.d_gridVar.size();
            for (var ii = 0; ii < numGridVar; ++ii) {
                var checkBox = this.d_gridVar.elementAt(ii);
                if (source === checkBox) {
                    if (e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_gridVarState.setElementAt(new Boolean(false), ii);
                    }
                    else {
                        this.d_gridVarState.setElementAt(new Boolean(true), ii);
                    }
                    return;
                }
            }
            var numCellVar = this.d_cellVar.size();
            for (var ii = 0; ii < numCellVar; ++ii) {
                var checkBox = this.d_cellVar.elementAt(ii);
                if (source === checkBox) {
                    if (e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_cellVarState.setElementAt(new Boolean(false), ii);
                    }
                    else {
                        this.d_cellVarState.setElementAt(new Boolean(true), ii);
                    }
                    return;
                }
            }
        };
        /**
         * Write the contents out in Uintah format
         */
        VariableSaveInputPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            try {
                var tab1 = new String(tab + "  ");
                var numSummedVar = this.d_summedVar.size();
                for (var ii = 0; ii < numSummedVar; ++ii) {
                    var state = this.d_summedVarState.elementAt(ii).booleanValue();
                    if (state) {
                        var label = this.d_summedVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                var numPartVar = this.d_partVar.size();
                for (var ii = 0; ii < numPartVar; ++ii) {
                    var state = this.d_partVarState.elementAt(ii).booleanValue();
                    if (state) {
                        var label = this.d_partVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                var numGridVar = this.d_gridVar.size();
                for (var ii = 0; ii < numGridVar; ++ii) {
                    var state = this.d_gridVarState.elementAt(ii).booleanValue();
                    if (state) {
                        var label = this.d_gridVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                var numCellVar = this.d_cellVar.size();
                for (var ii = 0; ii < numCellVar; ++ii) {
                    var state = this.d_cellVarState.elementAt(ii).booleanValue();
                    if (state) {
                        var label = this.d_cellVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                pw.println(tab + "</DataArchiver>");
                pw.println(tab);
            }
            catch (e) {
                console.info("Could not write VariableSaveInputPanel");
            }
            ;
        };
        return VariableSaveInputPanel;
    }(JPanel));
    /**
     *
     */
    VariableSaveInputPanel.serialVersionUID = 3342182319427876582;
    vaango_ui.VariableSaveInputPanel = VariableSaveInputPanel;
})(vaango_ui || (vaango_ui = {}));
