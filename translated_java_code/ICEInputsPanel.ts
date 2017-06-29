"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import GridLayout = java.awt.GridLayout;

    import GridBagLayout = java.awt.GridBagLayout;

    import GridBagConstraints = java.awt.GridBagConstraints;

    import ItemEvent = java.awt.event.ItemEvent;

    import ItemListener = java.awt.event.ItemListener;

    import ActionEvent = java.awt.event.ActionEvent;

    import ActionListener = java.awt.event.ActionListener;

    import PrintWriter = java.io.PrintWriter;

    import File = java.io.File;

    import FileWriter = java.io.FileWriter;

    import JButton = javax.swing.JButton;

    import JComboBox = javax.swing.JComboBox;

    import JCheckBox = javax.swing.JCheckBox;

    import JTabbedPane = javax.swing.JTabbedPane;

    import JPanel = javax.swing.JPanel;

    import JList = javax.swing.JList;

    import JLabel = javax.swing.JLabel;

    import JScrollPane = javax.swing.JScrollPane;

    import DefaultListModel = javax.swing.DefaultListModel;

    import ListSelectionModel = javax.swing.ListSelectionModel;

    import DocumentListener = javax.swing.event.DocumentListener;

    import DocumentEvent = javax.swing.event.DocumentEvent;

    import ListSelectionListener = javax.swing.event.ListSelectionListener;

    import ListSelectionEvent = javax.swing.event.ListSelectionEvent;

    import Vector = java.util.Vector;

    export class ICEInputsPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = 8103156522519027416;

        private d_mpmMat : Vector<string> = null;

        private d_iceMat : Vector<string> = null;

        private iceParamInputPanel : ICEInputsPanel.ICEParamInputPanel = null;

        private saveButton : JButton = null;

        public constructor(mpmMat : Vector<string>, iceMat : Vector<string>, parent : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_mpmMat = mpmMat;
            this.d_iceMat = iceMat;
            this.iceParamInputPanel = new ICEInputsPanel.ICEParamInputPanel(this);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            this.saveButton = new JButton("Save");
            this.saveButton.setActionCommand("save");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.iceParamInputPanel, gbc);
            this.add(this.iceParamInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.saveButton, gbc);
            this.add(this.saveButton);
            var buttonListener : ICEInputsPanel.ButtonListener = new ICEInputsPanel.ButtonListener(this);
            this.saveButton.addActionListener(buttonListener);
        }

        public refresh() {
            this.iceParamInputPanel.refresh();
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            this.iceParamInputPanel.writeUintah(pw, tab);
        }
    }

    export namespace ICEInputsPanel {

        export class ButtonListener implements ActionListener {
            public __parent: any;
            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "save") {
                    var outputFile : File = new File("test.ups");
                    try {
                        var fw : FileWriter = new FileWriter(outputFile);
                        var pw : PrintWriter = new PrintWriter(fw);
                        var tab : string = <string>new String("  ");
                        this.__parent.iceParamInputPanel.writeUintah(pw, tab);
                        pw.close();
                        fw.close();
                    } catch(event) {
                        console.info("Could not write ICEParamInputPanel to file " + outputFile.getName());
                    };
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
        }

        export class ICEParamInputPanel extends JPanel implements ItemListener, DocumentListener {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d_numAddHeatMat : number;

            d_iceAlgo : string;

            d_advectAlgo : string;

            d_compatFlux : boolean;

            d_addHeat : boolean;

            d_clampSpVol : boolean;

            iceAlgoComB : JComboBox<string>;

            advectAlgoComB : JComboBox<string>;

            compatFluxCB : JCheckBox;

            addHeatCB : JCheckBox;

            clampCB : JCheckBox;

            cflEntry : DecimalField;

            maxEqItEntry : IntegerField;

            minLevelEntry : IntegerField;

            maxLevelEntry : IntegerField;

            numAddHeatMatEntry : IntegerField;

            addHeatStartTimeEntry : DecimalField;

            addHeatEndTimeEntry : DecimalField;

            addHeatMatTabPane : JTabbedPane;

            addHeatPanelList : Vector<ICEInputsPanel.AddHeatPanel>;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.event.DocumentListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 5143932103012908193;
                this.d_numAddHeatMat = 1;
                this.d_iceAlgo = null;
                this.d_advectAlgo = null;
                this.d_compatFlux = true;
                this.d_addHeat = true;
                this.d_clampSpVol = true;
                this.iceAlgoComB = null;
                this.advectAlgoComB = null;
                this.compatFluxCB = null;
                this.addHeatCB = null;
                this.clampCB = null;
                this.cflEntry = null;
                this.maxEqItEntry = null;
                this.minLevelEntry = null;
                this.maxLevelEntry = null;
                this.numAddHeatMatEntry = null;
                this.addHeatStartTimeEntry = null;
                this.addHeatEndTimeEntry = null;
                this.addHeatMatTabPane = null;
                this.addHeatPanelList = null;
                this.d_iceAlgo = <string>new String("EqForm");
                this.d_advectAlgo = <string>new String("SecondOrder");
                this.d_compatFlux = true;
                this.d_addHeat = true;
                this.d_clampSpVol = true;
                this.d_numAddHeatMat = 1;
                this.addHeatPanelList = new Vector<ICEInputsPanel.AddHeatPanel>();
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.setLayout(gb);
                var panel1 : JPanel = new JPanel(new GridLayout(5, 0));
                var iceAlgoLabel : JLabel = new JLabel("Solution Technqiue");
                this.iceAlgoComB = new JComboBox<string>();
                this.iceAlgoComB.addItem("Total Form");
                this.iceAlgoComB.addItem("Rate Form");
                this.iceAlgoComB.setSelectedIndex(0);
                panel1.add(iceAlgoLabel);
                panel1.add(this.iceAlgoComB);
                var advectAlgoLabel : JLabel = new JLabel("Advection Algorithm");
                this.advectAlgoComB = new JComboBox<string>();
                this.advectAlgoComB.addItem("Second Order");
                this.advectAlgoComB.addItem("First Order");
                this.advectAlgoComB.setSelectedIndex(0);
                panel1.add(advectAlgoLabel);
                panel1.add(this.advectAlgoComB);
                this.compatFluxCB = new JCheckBox("Turn on Compatible Fluxes");
                this.compatFluxCB.setSelected(true);
                panel1.add(this.compatFluxCB);
                this.addHeatCB = new JCheckBox("Turn on Heat Addition");
                this.addHeatCB.setSelected(true);
                panel1.add(this.addHeatCB);
                this.clampCB = new JCheckBox("Clamp Specific Volume");
                this.clampCB.setSelected(true);
                panel1.add(this.clampCB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel1, gbc);
                this.add(panel1);
                var panel2 : JPanel = new JPanel(new GridLayout(4, 0));
                var cflLabel : JLabel = new JLabel("CFL Number");
                this.cflEntry = new DecimalField(0.25, 5);
                panel2.add(cflLabel);
                panel2.add(this.cflEntry);
                var maxEqItLabel : JLabel = new JLabel("Maximum Equilibrium Iterations");
                this.maxEqItEntry = new IntegerField(1000, 5);
                panel2.add(maxEqItLabel);
                panel2.add(this.maxEqItEntry);
                var minLevelLabel : JLabel = new JLabel("Minimum Grid Level");
                this.minLevelEntry = new IntegerField(0, 5);
                panel2.add(minLevelLabel);
                panel2.add(this.minLevelEntry);
                var maxLevelLabel : JLabel = new JLabel("Maximum Grid Level");
                this.maxLevelEntry = new IntegerField(1000, 5);
                panel2.add(maxLevelLabel);
                panel2.add(this.maxLevelEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(panel2, gbc);
                this.add(panel2);
                var panel3 : JPanel = new JPanel(new GridLayout(3, 0));
                var numAddHeatMatLabel : JLabel = new JLabel("Number of Add Heat Materials");
                this.numAddHeatMatEntry = new IntegerField(1, 3);
                this.numAddHeatMatEntry.getDocument().addDocumentListener(this);
                panel3.add(numAddHeatMatLabel);
                panel3.add(this.numAddHeatMatEntry);
                var addHeatStartTimeLabel : JLabel = new JLabel("Add Heat Start Time");
                this.addHeatStartTimeEntry = new DecimalField(0.0, 9, true);
                panel3.add(addHeatStartTimeLabel);
                panel3.add(this.addHeatStartTimeEntry);
                var addHeatEndTimeLabel : JLabel = new JLabel("Add Heat End Time");
                this.addHeatEndTimeEntry = new DecimalField(0.001, 9, true);
                panel3.add(addHeatEndTimeLabel);
                panel3.add(this.addHeatEndTimeEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
                gb.setConstraints(panel3, gbc);
                this.add(panel3);
                this.addHeatMatTabPane = new JTabbedPane();
                for(var ii : number = 0; ii < this.d_numAddHeatMat; ++ii) {
                    var addHeatPanel : ICEInputsPanel.AddHeatPanel = new ICEInputsPanel.AddHeatPanel(this.__parent);
                    var tabLabel : string = <string>new String("Add Heat Mat " + /* valueOf */new String(ii).toString());
                    this.addHeatMatTabPane.addTab(tabLabel, null, addHeatPanel, null);
                    this.addHeatPanelList.addElement(addHeatPanel);
                }
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 3, 1, 1, 5);
                gb.setConstraints(this.addHeatMatTabPane, gbc);
                this.add(this.addHeatMatTabPane);
                this.iceAlgoComB.addItemListener(this);
                this.advectAlgoComB.addItemListener(this);
                this.compatFluxCB.addItemListener(this);
                this.addHeatCB.addItemListener(this);
            }

            public itemStateChanged(e : ItemEvent) {
                var source : any = e.getItemSelectable();
                var item : string = /* valueOf */new String(e.getItem()).toString();
                if(source === this.iceAlgoComB) {
                    if(item === "Total Form") {
                        this.d_iceAlgo = "EqForm";
                    } else {
                        this.d_iceAlgo = "RateForm";
                    }
                } else if(source === this.advectAlgoComB) {
                    if(item === "First Order") {
                        this.d_advectAlgo = "FirstOrder";
                    } else {
                        this.d_advectAlgo = "SecondOrder";
                    }
                } else if(source === this.compatFluxCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.d_compatFlux = true;
                    } else {
                        this.d_compatFlux = false;
                    }
                } else if(source === this.addHeatCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.d_addHeat = true;
                    } else {
                        this.d_addHeat = false;
                    }
                } else if(source === this.clampCB) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.d_clampSpVol = true;
                    } else {
                        this.d_clampSpVol = false;
                    }
                }
            }

            public insertUpdate(e : DocumentEvent) {
                var numMat : number = this.numAddHeatMatEntry.getValue();
                if(numMat <= 0) return;
                this.addHeatMatTabPane.removeAll();
                for(var ii : number = 0; ii < numMat; ++ii) {
                    var addHeatPanel : ICEInputsPanel.AddHeatPanel = new ICEInputsPanel.AddHeatPanel(this.__parent);
                    var tabLabel : string = <string>new String("Add Heat Mat " + /* valueOf */new String(ii).toString());
                    this.addHeatMatTabPane.addTab(tabLabel, null, addHeatPanel, null);
                    this.addHeatPanelList.addElement(addHeatPanel);
                }
                this.d_numAddHeatMat = numMat;
                this.validate();
            }

            public removeUpdate(e : DocumentEvent) {
            }

            public changedUpdate(e : DocumentEvent) {
            }

            public refresh() {
                var numMat : number = this.numAddHeatMatEntry.getValue();
                for(var ii : number = 0; ii < numMat; ++ii) {
                    this.addHeatPanelList.elementAt(ii).updateMatList();
                }
            }

            /**
             * Write the contents out in Uintah format
             */
            public writeUintah(pw : PrintWriter, tab : string) {
                if(pw == null) return;
                var tab1 : string = <string>new String(tab + "  ");
                var tab2 : string = <string>new String(tab1 + "  ");
                var tab3 : string = <string>new String(tab2 + "  ");
                pw.println(tab + "<CFD>");
                pw.println(tab1 + "<cfl> " + this.cflEntry.getValue() + " </cfl>");
                pw.println(tab1 + "<ICE>");
                pw.println(tab2 + "<max_iteration_equilibration> " + this.maxEqItEntry.getValue() + " </max_iteration_equilibration>");
                pw.println(tab2 + "<solution technique=\"" + this.d_iceAlgo + "\"/>");
                pw.println(tab2 + "<advection type=\"" + this.d_advectAlgo + "\" useCompatibleFluxes=\"" + this.d_compatFlux + "\"/>");
                if(this.d_clampSpVol) {
                    pw.println(tab2 + "<ClampSpecificVolume> " + this.d_clampSpVol + " </ClampSpecificVolume> ");
                }
                if(this.d_addHeat) {
                    pw.println(tab2 + "<ADD_HEAT>");
                    pw.println(tab3 + "<add_heat_t_start> " + this.addHeatStartTimeEntry.getValue() + " </add_heat_t_start>");
                    pw.println(tab3 + "<add_heat_t_final> " + this.addHeatEndTimeEntry.getValue() + " </add_heat_t_final>");
                    pw.print(tab3 + "<add_heat_matls> [");
                    for(var ii : number = 0; ii < this.d_numAddHeatMat; ++ii) {
                        pw.print(this.addHeatPanelList.elementAt(ii).getMatID());
                        if(ii < this.d_numAddHeatMat - 1) pw.print(", ");
                    }
                    pw.println("] </add_heat_matls>");
                    pw.print(tab3 + "<add_heat_coeff> [");
                    for(var ii : number = 0; ii < this.d_numAddHeatMat; ++ii) {
                        pw.print(this.addHeatPanelList.elementAt(ii).getCoeff());
                        if(ii < this.d_numAddHeatMat - 1) pw.print(", ");
                    }
                    pw.println("] </add_heat_coeff>");
                    pw.println(tab2 + "</ADD_HEAT>");
                }
                pw.println(tab1 + "</ICE>");
                pw.println(tab + "</CFD>");
                pw.println(" ");
            }
        }

        export class AddHeatPanel extends JPanel implements ListSelectionListener {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d_numMPM : number;

            d_numICE : number;

            d_addHeatMatID : number;

            d_addHeatCoeff : number;

            addHeatMatListModel : DefaultListModel<string>;

            addHeatMatList : JList<string>;

            addHeatMatSP : JScrollPane;

            addHeatCoeffEntry : DecimalField;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.event.ListSelectionListener","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 8980091494413394177;
                this.d_numMPM = 0;
                this.d_numICE = 0;
                this.d_addHeatMatID = 0;
                this.d_addHeatCoeff = 0;
                this.addHeatMatListModel = null;
                this.addHeatMatList = null;
                this.addHeatMatSP = null;
                this.addHeatCoeffEntry = null;
                this.d_numMPM = this.__parent.d_mpmMat.size();
                this.d_numICE = this.__parent.d_iceMat.size();
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.setLayout(gb);
                var addHeatMatLabel : JLabel = new JLabel("Material ID");
                this.addHeatMatListModel = new DefaultListModel<string>();
                for(var ii : number = 0; ii < this.d_numICE; ++ii) {
                    this.addHeatMatListModel.addElement(this.__parent.d_iceMat.elementAt(ii));
                }
                this.addHeatMatList = new JList<string>(this.addHeatMatListModel);
                this.addHeatMatList.setSelectedIndex(0);
                this.addHeatMatList.setVisibleRowCount(2);
                this.addHeatMatList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
                this.addHeatMatList.addListSelectionListener(this);
                this.addHeatMatSP = new JScrollPane(this.addHeatMatList);
                UintahGui.setConstraints(gbc, 0, 0);
                gb.setConstraints(addHeatMatLabel, gbc);
                this.add(addHeatMatLabel);
                UintahGui.setConstraints(gbc, 1, 0);
                gb.setConstraints(this.addHeatMatSP, gbc);
                this.add(this.addHeatMatSP);
                this.d_addHeatMatID = this.d_numMPM;
                var addHeatCoeffLabel : JLabel = new JLabel("Heat Coeff.");
                this.addHeatCoeffEntry = new DecimalField(8.0E10, 9, true);
                UintahGui.setConstraints(gbc, 0, 1);
                gb.setConstraints(addHeatCoeffLabel, gbc);
                this.add(addHeatCoeffLabel);
                UintahGui.setConstraints(gbc, 1, 1);
                gb.setConstraints(this.addHeatCoeffEntry, gbc);
                this.add(this.addHeatCoeffEntry);
                this.d_addHeatCoeff = 8.0E10;
            }

            public valueChanged(e : ListSelectionEvent) {
                this.d_addHeatMatID = this.d_numMPM + this.addHeatMatList.getSelectedIndex();
            }

            public getMatID() : number {
                return this.d_addHeatMatID;
            }

            public getCoeff() : number {
                return this.d_addHeatCoeff;
            }

            public updateMatList() {
                if(this.__parent.d_iceMat.size() !== this.d_numICE || this.__parent.d_mpmMat.size() !== this.d_numMPM) {
                    this.d_numMPM = this.__parent.d_mpmMat.size();
                    this.d_numICE = this.__parent.d_iceMat.size();
                    this.addHeatMatListModel.removeAllElements();
                    for(var ii : number = 0; ii < this.d_numICE; ++ii) {
                        this.addHeatMatListModel.addElement(this.__parent.d_iceMat.elementAt(ii));
                    }
                    this.validate();
                }
            }
        }
    }

}

