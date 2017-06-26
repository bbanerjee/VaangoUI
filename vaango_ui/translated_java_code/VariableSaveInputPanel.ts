"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class VariableSaveInputPanel extends JPanel implements ItemListener {
        /**
         * 
         */
        private static serialVersionUID : number = 3342182319427876582;

        public d_summedVar : Vector<JCheckBox> = null;

        public d_partVar : Vector<JCheckBox> = null;

        public d_gridVar : Vector<JCheckBox> = null;

        public d_cellVar : Vector<JCheckBox> = null;

        public d_summedVarStr : Vector<string> = null;

        public d_partVarStr : Vector<string> = null;

        public d_gridVarStr : Vector<string> = null;

        public d_cellVarStr : Vector<string> = null;

        public d_summedVarState : Vector<boolean> = null;

        public d_partVarState : Vector<boolean> = null;

        public d_gridVarState : Vector<boolean> = null;

        public d_cellVarState : Vector<boolean> = null;

        private kineticEnergyCB : JCheckBox = null;

        private accStrainEnergyCB : JCheckBox = null;

        private strainEnergyCB : JCheckBox = null;

        private momentumCB : JCheckBox = null;

        private totalMassCB : JCheckBox = null;

        private centerOfMassCB : JCheckBox = null;

        private p_particleIDCB : JCheckBox = null;

        private p_positionCB : JCheckBox = null;

        private p_massCB : JCheckBox = null;

        private p_volumeCB : JCheckBox = null;

        private p_temperatureCB : JCheckBox = null;

        private p_stressCB : JCheckBox = null;

        private p_deformationGradientCB : JCheckBox = null;

        private p_displacementCB : JCheckBox = null;

        private p_velocityCB : JCheckBox = null;

        private p_externalForceCB : JCheckBox = null;

        private p_localizedCB : JCheckBox = null;

        private p_damageCB : JCheckBox = null;

        private p_porosityCB : JCheckBox = null;

        private p_plasticStrainCB : JCheckBox = null;

        private p_plasticStrainRateCB : JCheckBox = null;

        private p_strainRateCB : JCheckBox = null;

        private g_massCB : JCheckBox = null;

        private g_volumeCB : JCheckBox = null;

        private g_velocityCB : JCheckBox = null;

        private g_stressCB : JCheckBox = null;

        private g_accelerationCB : JCheckBox = null;

        private cc_densityCB : JCheckBox = null;

        private cc_temperatureCB : JCheckBox = null;

        private cc_velocityCB : JCheckBox = null;

        private cc_spVolumeCB : JCheckBox = null;

        private cc_volFracCB : JCheckBox = null;

        private cc_pressureCB : JCheckBox = null;

        private cc_equilPressureCB : JCheckBox = null;

        private cc_intEnergyLCB : JCheckBox = null;

        private cc_intEnergySourceCB : JCheckBox = null;

        private cc_TdotCB : JCheckBox = null;

        private cc_momentumLCB : JCheckBox = null;

        private cc_momentumSourceCB : JCheckBox = null;

        private cc_delPDilatateCB : JCheckBox = null;

        public constructor() {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_summedVar = new Vector<JCheckBox>();
            this.d_partVar = new Vector<JCheckBox>();
            this.d_gridVar = new Vector<JCheckBox>();
            this.d_cellVar = new Vector<JCheckBox>();
            this.d_summedVarStr = new Vector<string>();
            this.d_partVarStr = new Vector<string>();
            this.d_gridVarStr = new Vector<string>();
            this.d_cellVarStr = new Vector<string>();
            this.d_summedVarState = new Vector<boolean>();
            this.d_partVarState = new Vector<boolean>();
            this.d_gridVarState = new Vector<boolean>();
            this.d_cellVarState = new Vector<boolean>();
            var panel0 : JPanel = new JPanel(new GridLayout(1, 0));
            var panel1 : JPanel = new JPanel(new GridLayout(0, 1));
            var panel2 : JPanel = new JPanel(new GridLayout(0, 1));
            var panel3 : JPanel = new JPanel(new GridLayout(0, 1));
            var panel4 : JPanel = new JPanel(new GridLayout(0, 1));
            var label0 : JLabel = new JLabel("Variables to be saved");
            panel0.add(label0);
            var label1 : JLabel = new JLabel("Summed Variables");
            panel1.add(label1);
            this.kineticEnergyCB = new JCheckBox("Kinetic Energy");
            this.strainEnergyCB = new JCheckBox("Inc. Strain Energy");
            this.accStrainEnergyCB = new JCheckBox("Total Strain Energy");
            this.momentumCB = new JCheckBox("Momentum");
            this.totalMassCB = new JCheckBox("Mass");
            this.centerOfMassCB = new JCheckBox("Center of Mass");
            this.d_summedVar.addElement(this.kineticEnergyCB);
            this.d_summedVarStr.addElement(<string>new String("KineticEnergy"));
            this.d_summedVar.addElement(this.strainEnergyCB);
            this.d_summedVarStr.addElement(<string>new String("StrainEnergy"));
            this.d_summedVar.addElement(this.accStrainEnergyCB);
            this.d_summedVarStr.addElement(<string>new String("AccStrainEnergy"));
            this.d_summedVar.addElement(this.totalMassCB);
            this.d_summedVarStr.addElement(<string>new String("TotalMass"));
            this.d_summedVar.addElement(this.centerOfMassCB);
            this.d_summedVarStr.addElement(<string>new String("CenterOfMassPosition"));
            var numSummedVar : number = this.d_summedVar.size();
            for(var ii : number = 0; ii < numSummedVar; ++ii) {
                var checkBox : JCheckBox = this.d_summedVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(this);
                this.d_summedVarState.addElement(<boolean>new Boolean(true));
                panel1.add(checkBox);
            }
            var label2 : JLabel = new JLabel("Particle Variables");
            panel2.add(label2);
            this.p_particleIDCB = new JCheckBox("Particle ID");
            this.p_positionCB = new JCheckBox("Position");
            this.p_massCB = new JCheckBox("Mass");
            this.p_volumeCB = new JCheckBox("Volume");
            this.p_temperatureCB = new JCheckBox("Temperature");
            this.p_deformationGradientCB = new JCheckBox("Def. Gradient");
            this.p_displacementCB = new JCheckBox("Displacement");
            this.p_velocityCB = new JCheckBox("Velocity");
            this.p_stressCB = new JCheckBox("Stress");
            this.p_externalForceCB = new JCheckBox("External Force");
            this.p_strainRateCB = new JCheckBox("Strain Rate");
            this.p_localizedCB = new JCheckBox("Failed Particles");
            this.p_damageCB = new JCheckBox("Damage");
            this.p_porosityCB = new JCheckBox("Porosity");
            this.p_plasticStrainCB = new JCheckBox("Plastic Strain");
            this.p_plasticStrainRateCB = new JCheckBox("Plastic Strain Rate");
            this.d_partVar.addElement(this.p_particleIDCB);
            this.d_partVarStr.addElement(<string>new String("p.particleID"));
            this.d_partVar.addElement(this.p_positionCB);
            this.d_partVarStr.addElement(<string>new String("p.x"));
            this.d_partVar.addElement(this.p_massCB);
            this.d_partVarStr.addElement(<string>new String("p.mass"));
            this.d_partVar.addElement(this.p_volumeCB);
            this.d_partVarStr.addElement(<string>new String("p.volume"));
            this.d_partVar.addElement(this.p_temperatureCB);
            this.d_partVarStr.addElement(<string>new String("p.temperature"));
            this.d_partVar.addElement(this.p_deformationGradientCB);
            this.d_partVarStr.addElement(<string>new String("p.deformationGradient"));
            this.d_partVar.addElement(this.p_displacementCB);
            this.d_partVarStr.addElement(<string>new String("p.displacement"));
            this.d_partVar.addElement(this.p_velocityCB);
            this.d_partVarStr.addElement(<string>new String("p.velocity"));
            this.d_partVar.addElement(this.p_stressCB);
            this.d_partVarStr.addElement(<string>new String("p.stress"));
            this.d_partVar.addElement(this.p_externalForceCB);
            this.d_partVarStr.addElement(<string>new String("p.externalforce"));
            this.d_partVar.addElement(this.p_strainRateCB);
            this.d_partVarStr.addElement(<string>new String("p.strainRate"));
            this.d_partVar.addElement(this.p_localizedCB);
            this.d_partVarStr.addElement(<string>new String("p.localized"));
            this.d_partVar.addElement(this.p_damageCB);
            this.d_partVarStr.addElement(<string>new String("p.damage"));
            this.d_partVar.addElement(this.p_porosityCB);
            this.d_partVarStr.addElement(<string>new String("p.porosity"));
            this.d_partVar.addElement(this.p_plasticStrainCB);
            this.d_partVarStr.addElement(<string>new String("p.plasticStrain"));
            this.d_partVar.addElement(this.p_plasticStrainRateCB);
            this.d_partVarStr.addElement(<string>new String("p.plasticStrainRate"));
            var numPartVar : number = this.d_partVar.size();
            for(var ii : number = 0; ii < numPartVar; ++ii) {
                var checkBox : JCheckBox = this.d_partVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(this);
                this.d_partVarState.addElement(<boolean>new Boolean(true));
                panel2.add(checkBox);
            }
            this.p_strainRateCB.setSelected(false);
            this.p_localizedCB.setSelected(false);
            this.p_damageCB.setSelected(false);
            this.p_porosityCB.setSelected(false);
            this.p_plasticStrainCB.setSelected(false);
            this.p_plasticStrainRateCB.setSelected(false);
            var label3 : JLabel = new JLabel("Grid Variables");
            panel3.add(label3);
            this.g_massCB = new JCheckBox("Mass");
            this.g_volumeCB = new JCheckBox("Volume");
            this.g_velocityCB = new JCheckBox("Velocity");
            this.g_stressCB = new JCheckBox("Stress");
            this.g_accelerationCB = new JCheckBox("Acceleration");
            this.d_gridVar.addElement(this.g_massCB);
            this.d_gridVarStr.addElement(<string>new String("g.mass"));
            this.d_gridVar.addElement(this.g_volumeCB);
            this.d_gridVarStr.addElement(<string>new String("g.volume"));
            this.d_gridVar.addElement(this.g_velocityCB);
            this.d_gridVarStr.addElement(<string>new String("g.velocity"));
            this.d_gridVar.addElement(this.g_stressCB);
            this.d_gridVarStr.addElement(<string>new String("g.stressFS"));
            this.d_gridVar.addElement(this.g_accelerationCB);
            this.d_gridVarStr.addElement(<string>new String("g.acceleration"));
            var numGridVar : number = this.d_gridVar.size();
            for(var ii : number = 0; ii < numGridVar; ++ii) {
                var checkBox : JCheckBox = this.d_gridVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(this);
                this.d_gridVarState.addElement(<boolean>new Boolean(true));
                panel3.add(checkBox);
            }
            var label4 : JLabel = new JLabel("Cell-Centered Variables");
            panel4.add(label4);
            this.cc_densityCB = new JCheckBox("Density");
            this.cc_temperatureCB = new JCheckBox("Temperature");
            this.cc_velocityCB = new JCheckBox("Velocity");
            this.cc_spVolumeCB = new JCheckBox("Specific Volume");
            this.cc_volFracCB = new JCheckBox("Volume Fraction");
            this.cc_pressureCB = new JCheckBox("Pressure");
            this.cc_equilPressureCB = new JCheckBox("Equilibriation Pressure");
            this.cc_intEnergyLCB = new JCheckBox("Internal Energy");
            this.cc_intEnergySourceCB = new JCheckBox("Internal Energy Source");
            this.cc_TdotCB = new JCheckBox("Temperature Rate");
            this.cc_momentumLCB = new JCheckBox("Momentum");
            this.cc_momentumSourceCB = new JCheckBox("Momentum Source");
            this.cc_delPDilatateCB = new JCheckBox("delP Dilatation");
            this.d_cellVar.addElement(this.cc_densityCB);
            this.d_cellVarStr.addElement(<string>new String("rho_CC"));
            this.d_cellVar.addElement(this.cc_temperatureCB);
            this.d_cellVarStr.addElement(<string>new String("temp_CC"));
            this.d_cellVar.addElement(this.cc_velocityCB);
            this.d_cellVarStr.addElement(<string>new String("vel_CC"));
            this.d_cellVar.addElement(this.cc_spVolumeCB);
            this.d_cellVarStr.addElement(<string>new String("sp_vol_CC"));
            this.d_cellVar.addElement(this.cc_volFracCB);
            this.d_cellVarStr.addElement(<string>new String("vol_frac_CC"));
            this.d_cellVar.addElement(this.cc_pressureCB);
            this.d_cellVarStr.addElement(<string>new String("press_CC"));
            this.d_cellVar.addElement(this.cc_equilPressureCB);
            this.d_cellVarStr.addElement(<string>new String("press_equil_CC"));
            this.d_cellVar.addElement(this.cc_intEnergyLCB);
            this.d_cellVarStr.addElement(<string>new String("int_eng_L_CC"));
            this.d_cellVar.addElement(this.cc_intEnergySourceCB);
            this.d_cellVarStr.addElement(<string>new String("intE_source_CC"));
            this.d_cellVar.addElement(this.cc_TdotCB);
            this.d_cellVarStr.addElement(<string>new String("Tdot"));
            this.d_cellVar.addElement(this.cc_momentumLCB);
            this.d_cellVarStr.addElement(<string>new String("mom_L_CC"));
            this.d_cellVar.addElement(this.cc_momentumSourceCB);
            this.d_cellVarStr.addElement(<string>new String("mom_source_CC"));
            this.d_cellVar.addElement(this.cc_delPDilatateCB);
            this.d_cellVarStr.addElement(<string>new String("delP_Dilatate"));
            var numCellVar : number = this.d_cellVar.size();
            for(var ii : number = 0; ii < numCellVar; ++ii) {
                var checkBox : JCheckBox = this.d_cellVar.elementAt(ii);
                checkBox.setSelected(true);
                checkBox.addItemListener(this);
                this.d_cellVarState.addElement(<boolean>new Boolean(true));
                panel4.add(checkBox);
            }
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, GridBagConstraints.REMAINDER, 1, 5);
            gb.setConstraints(panel0, gbc);
            this.add(panel0);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            this.add(panel2);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 1, 1, 1, 1, 5);
            gb.setConstraints(panel3, gbc);
            this.add(panel3);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 1, 2, 1, 1, 5);
            gb.setConstraints(panel4, gbc);
            this.add(panel4);
        }

        public refresh() {
        }

        /**
         * Listen for changed item state
         */
        public itemStateChanged(e : ItemEvent) {
            var source : any = e.getItemSelectable();
            var numSummedVar : number = this.d_summedVar.size();
            for(var ii : number = 0; ii < numSummedVar; ++ii) {
                var checkBox : JCheckBox = this.d_summedVar.elementAt(ii);
                if(source === checkBox) {
                    if(e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_summedVarState.setElementAt(<boolean>new Boolean(false), ii);
                    } else {
                        this.d_summedVarState.setElementAt(<boolean>new Boolean(true), ii);
                    }
                    return;
                }
            }
            var numPartVar : number = this.d_partVar.size();
            for(var ii : number = 0; ii < numPartVar; ++ii) {
                var checkBox : JCheckBox = this.d_partVar.elementAt(ii);
                if(source === checkBox) {
                    if(e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_partVarState.setElementAt(<boolean>new Boolean(false), ii);
                    } else {
                        this.d_partVarState.setElementAt(<boolean>new Boolean(true), ii);
                    }
                    return;
                }
            }
            var numGridVar : number = this.d_gridVar.size();
            for(var ii : number = 0; ii < numGridVar; ++ii) {
                var checkBox : JCheckBox = this.d_gridVar.elementAt(ii);
                if(source === checkBox) {
                    if(e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_gridVarState.setElementAt(<boolean>new Boolean(false), ii);
                    } else {
                        this.d_gridVarState.setElementAt(<boolean>new Boolean(true), ii);
                    }
                    return;
                }
            }
            var numCellVar : number = this.d_cellVar.size();
            for(var ii : number = 0; ii < numCellVar; ++ii) {
                var checkBox : JCheckBox = this.d_cellVar.elementAt(ii);
                if(source === checkBox) {
                    if(e.getStateChange() === ItemEvent.DESELECTED) {
                        this.d_cellVarState.setElementAt(<boolean>new Boolean(false), ii);
                    } else {
                        this.d_cellVarState.setElementAt(<boolean>new Boolean(true), ii);
                    }
                    return;
                }
            }
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            try {
                var tab1 : string = <string>new String(tab + "  ");
                var numSummedVar : number = this.d_summedVar.size();
                for(var ii : number = 0; ii < numSummedVar; ++ii) {
                    var state : boolean = this.d_summedVarState.elementAt(ii).booleanValue();
                    if(state) {
                        var label : string = this.d_summedVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                var numPartVar : number = this.d_partVar.size();
                for(var ii : number = 0; ii < numPartVar; ++ii) {
                    var state : boolean = this.d_partVarState.elementAt(ii).booleanValue();
                    if(state) {
                        var label : string = this.d_partVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                var numGridVar : number = this.d_gridVar.size();
                for(var ii : number = 0; ii < numGridVar; ++ii) {
                    var state : boolean = this.d_gridVarState.elementAt(ii).booleanValue();
                    if(state) {
                        var label : string = this.d_gridVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                var numCellVar : number = this.d_cellVar.size();
                for(var ii : number = 0; ii < numCellVar; ++ii) {
                    var state : boolean = this.d_cellVarState.elementAt(ii).booleanValue();
                    if(state) {
                        var label : string = this.d_cellVarStr.elementAt(ii);
                        pw.println(tab1 + "<save label=\"" + label + "\"/>");
                    }
                }
                pw.println(tab + "</DataArchiver>");
                pw.println(tab);
            } catch(e) {
                console.info("Could not write VariableSaveInputPanel");
            };
        }
    }
}

