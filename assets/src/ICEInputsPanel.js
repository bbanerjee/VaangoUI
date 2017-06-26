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
    var GridLayout = java.awt.GridLayout;
    var GridBagLayout = java.awt.GridBagLayout;
    var GridBagConstraints = java.awt.GridBagConstraints;
    var ItemEvent = java.awt.event.ItemEvent;
    var PrintWriter = java.io.PrintWriter;
    var File = java.io.File;
    var FileWriter = java.io.FileWriter;
    var JButton = javax.swing.JButton;
    var JComboBox = javax.swing.JComboBox;
    var JCheckBox = javax.swing.JCheckBox;
    var JTabbedPane = javax.swing.JTabbedPane;
    var JPanel = javax.swing.JPanel;
    var JList = javax.swing.JList;
    var JLabel = javax.swing.JLabel;
    var JScrollPane = javax.swing.JScrollPane;
    var DefaultListModel = javax.swing.DefaultListModel;
    var ListSelectionModel = javax.swing.ListSelectionModel;
    var Vector = java.util.Vector;
    var ICEInputsPanel = (function (_super) {
        __extends(ICEInputsPanel, _super);
        function ICEInputsPanel(mpmMat, iceMat, parent) {
            var _this = _super.call(this) || this;
            _this.d_mpmMat = null;
            _this.d_iceMat = null;
            _this.iceParamInputPanel = null;
            _this.saveButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_mpmMat = mpmMat;
            _this.d_iceMat = iceMat;
            _this.iceParamInputPanel = new ICEInputsPanel.ICEParamInputPanel(_this);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            _this.saveButton = new JButton("Save");
            _this.saveButton.setActionCommand("save");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.iceParamInputPanel, gbc);
            _this.add(_this.iceParamInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.saveButton, gbc);
            _this.add(_this.saveButton);
            var buttonListener = new ICEInputsPanel.ButtonListener(_this);
            _this.saveButton.addActionListener(buttonListener);
            return _this;
        }
        ICEInputsPanel.prototype.refresh = function () {
            this.iceParamInputPanel.refresh();
        };
        ICEInputsPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            this.iceParamInputPanel.writeUintah(pw, tab);
        };
        return ICEInputsPanel;
    }(JPanel));
    /**
     *
     */
    ICEInputsPanel.serialVersionUID = 8103156522519027416;
    vaango_ui.ICEInputsPanel = ICEInputsPanel;
    (function (ICEInputsPanel) {
        var ButtonListener = (function () {
            function ButtonListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
            ButtonListener.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "save") {
                    var outputFile = new File("test.ups");
                    try {
                        var fw = new FileWriter(outputFile);
                        var pw = new PrintWriter(fw);
                        var tab = new String("  ");
                        this.__parent.iceParamInputPanel.writeUintah(pw, tab);
                        pw.close();
                        fw.close();
                    }
                    catch (event) {
                        console.info("Could not write ICEParamInputPanel to file " + outputFile.getName());
                    }
                    ;
                }
            };
            return ButtonListener;
        }());
        ICEInputsPanel.ButtonListener = ButtonListener;
        var ICEParamInputPanel = (function (_super) {
            __extends(ICEParamInputPanel, _super);
            function ICEParamInputPanel(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.event.DocumentListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 5143932103012908193;
                _this.d_numAddHeatMat = 1;
                _this.d_iceAlgo = null;
                _this.d_advectAlgo = null;
                _this.d_compatFlux = true;
                _this.d_addHeat = true;
                _this.d_clampSpVol = true;
                _this.iceAlgoComB = null;
                _this.advectAlgoComB = null;
                _this.compatFluxCB = null;
                _this.addHeatCB = null;
                _this.clampCB = null;
                _this.cflEntry = null;
                _this.maxEqItEntry = null;
                _this.minLevelEntry = null;
                _this.maxLevelEntry = null;
                _this.numAddHeatMatEntry = null;
                _this.addHeatStartTimeEntry = null;
                _this.addHeatEndTimeEntry = null;
                _this.addHeatMatTabPane = null;
                _this.addHeatPanelList = null;
                _this.d_iceAlgo = new String("EqForm");
                _this.d_advectAlgo = new String("SecondOrder");
                _this.d_compatFlux = true;
                _this.d_addHeat = true;
                _this.d_clampSpVol = true;
                _this.d_numAddHeatMat = 1;
                _this.addHeatPanelList = new Vector();
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.setLayout(gb);
                var panel1 = new JPanel(new GridLayout(5, 0));
                var iceAlgoLabel = new JLabel("Solution Technqiue");
                _this.iceAlgoComB = new JComboBox();
                _this.iceAlgoComB.addItem("Total Form");
                _this.iceAlgoComB.addItem("Rate Form");
                _this.iceAlgoComB.setSelectedIndex(0);
                panel1.add(iceAlgoLabel);
                panel1.add(_this.iceAlgoComB);
                var advectAlgoLabel = new JLabel("Advection Algorithm");
                _this.advectAlgoComB = new JComboBox();
                _this.advectAlgoComB.addItem("Second Order");
                _this.advectAlgoComB.addItem("First Order");
                _this.advectAlgoComB.setSelectedIndex(0);
                panel1.add(advectAlgoLabel);
                panel1.add(_this.advectAlgoComB);
                _this.compatFluxCB = new JCheckBox("Turn on Compatible Fluxes");
                _this.compatFluxCB.setSelected(true);
                panel1.add(_this.compatFluxCB);
                _this.addHeatCB = new JCheckBox("Turn on Heat Addition");
                _this.addHeatCB.setSelected(true);
                panel1.add(_this.addHeatCB);
                _this.clampCB = new JCheckBox("Clamp Specific Volume");
                _this.clampCB.setSelected(true);
                panel1.add(_this.clampCB);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
                gb.setConstraints(panel1, gbc);
                _this.add(panel1);
                var panel2 = new JPanel(new GridLayout(4, 0));
                var cflLabel = new JLabel("CFL Number");
                _this.cflEntry = new vaango_ui.DecimalField(0.25, 5);
                panel2.add(cflLabel);
                panel2.add(_this.cflEntry);
                var maxEqItLabel = new JLabel("Maximum Equilibrium Iterations");
                _this.maxEqItEntry = new vaango_ui.IntegerField(1000, 5);
                panel2.add(maxEqItLabel);
                panel2.add(_this.maxEqItEntry);
                var minLevelLabel = new JLabel("Minimum Grid Level");
                _this.minLevelEntry = new vaango_ui.IntegerField(0, 5);
                panel2.add(minLevelLabel);
                panel2.add(_this.minLevelEntry);
                var maxLevelLabel = new JLabel("Maximum Grid Level");
                _this.maxLevelEntry = new vaango_ui.IntegerField(1000, 5);
                panel2.add(maxLevelLabel);
                panel2.add(_this.maxLevelEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                gb.setConstraints(panel2, gbc);
                _this.add(panel2);
                var panel3 = new JPanel(new GridLayout(3, 0));
                var numAddHeatMatLabel = new JLabel("Number of Add Heat Materials");
                _this.numAddHeatMatEntry = new vaango_ui.IntegerField(1, 3);
                _this.numAddHeatMatEntry.getDocument().addDocumentListener(_this);
                panel3.add(numAddHeatMatLabel);
                panel3.add(_this.numAddHeatMatEntry);
                var addHeatStartTimeLabel = new JLabel("Add Heat Start Time");
                _this.addHeatStartTimeEntry = new vaango_ui.DecimalField(0.0, 9, true);
                panel3.add(addHeatStartTimeLabel);
                panel3.add(_this.addHeatStartTimeEntry);
                var addHeatEndTimeLabel = new JLabel("Add Heat End Time");
                _this.addHeatEndTimeEntry = new vaango_ui.DecimalField(0.001, 9, true);
                panel3.add(addHeatEndTimeLabel);
                panel3.add(_this.addHeatEndTimeEntry);
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
                gb.setConstraints(panel3, gbc);
                _this.add(panel3);
                _this.addHeatMatTabPane = new JTabbedPane();
                for (var ii = 0; ii < _this.d_numAddHeatMat; ++ii) {
                    var addHeatPanel = new ICEInputsPanel.AddHeatPanel(_this.__parent);
                    var tabLabel = new String("Add Heat Mat " + new String(ii).toString());
                    _this.addHeatMatTabPane.addTab(tabLabel, null, addHeatPanel, null);
                    _this.addHeatPanelList.addElement(addHeatPanel);
                }
                UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 3, 1, 1, 5);
                gb.setConstraints(_this.addHeatMatTabPane, gbc);
                _this.add(_this.addHeatMatTabPane);
                _this.iceAlgoComB.addItemListener(_this);
                _this.advectAlgoComB.addItemListener(_this);
                _this.compatFluxCB.addItemListener(_this);
                _this.addHeatCB.addItemListener(_this);
                return _this;
            }
            ICEParamInputPanel.prototype.itemStateChanged = function (e) {
                var source = e.getItemSelectable();
                var item = new String(e.getItem()).toString();
                if (source === this.iceAlgoComB) {
                    if (item === "Total Form") {
                        this.d_iceAlgo = "EqForm";
                    }
                    else {
                        this.d_iceAlgo = "RateForm";
                    }
                }
                else if (source === this.advectAlgoComB) {
                    if (item === "First Order") {
                        this.d_advectAlgo = "FirstOrder";
                    }
                    else {
                        this.d_advectAlgo = "SecondOrder";
                    }
                }
                else if (source === this.compatFluxCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.d_compatFlux = true;
                    }
                    else {
                        this.d_compatFlux = false;
                    }
                }
                else if (source === this.addHeatCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.d_addHeat = true;
                    }
                    else {
                        this.d_addHeat = false;
                    }
                }
                else if (source === this.clampCB) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.d_clampSpVol = true;
                    }
                    else {
                        this.d_clampSpVol = false;
                    }
                }
            };
            ICEParamInputPanel.prototype.insertUpdate = function (e) {
                var numMat = this.numAddHeatMatEntry.getValue();
                if (numMat <= 0)
                    return;
                this.addHeatMatTabPane.removeAll();
                for (var ii = 0; ii < numMat; ++ii) {
                    var addHeatPanel = new ICEInputsPanel.AddHeatPanel(this.__parent);
                    var tabLabel = new String("Add Heat Mat " + new String(ii).toString());
                    this.addHeatMatTabPane.addTab(tabLabel, null, addHeatPanel, null);
                    this.addHeatPanelList.addElement(addHeatPanel);
                }
                this.d_numAddHeatMat = numMat;
                this.validate();
            };
            ICEParamInputPanel.prototype.removeUpdate = function (e) {
            };
            ICEParamInputPanel.prototype.changedUpdate = function (e) {
            };
            ICEParamInputPanel.prototype.refresh = function () {
                var numMat = this.numAddHeatMatEntry.getValue();
                for (var ii = 0; ii < numMat; ++ii) {
                    this.addHeatPanelList.elementAt(ii).updateMatList();
                }
            };
            /**
             * Write the contents out in Uintah format
             */
            ICEParamInputPanel.prototype.writeUintah = function (pw, tab) {
                if (pw == null)
                    return;
                var tab1 = new String(tab + "  ");
                var tab2 = new String(tab1 + "  ");
                var tab3 = new String(tab2 + "  ");
                pw.println(tab + "<CFD>");
                pw.println(tab1 + "<cfl> " + this.cflEntry.getValue() + " </cfl>");
                pw.println(tab1 + "<ICE>");
                pw.println(tab2 + "<max_iteration_equilibration> " + this.maxEqItEntry.getValue() + " </max_iteration_equilibration>");
                pw.println(tab2 + "<solution technique=\"" + this.d_iceAlgo + "\"/>");
                pw.println(tab2 + "<advection type=\"" + this.d_advectAlgo + "\" useCompatibleFluxes=\"" + this.d_compatFlux + "\"/>");
                if (this.d_clampSpVol) {
                    pw.println(tab2 + "<ClampSpecificVolume> " + this.d_clampSpVol + " </ClampSpecificVolume> ");
                }
                if (this.d_addHeat) {
                    pw.println(tab2 + "<ADD_HEAT>");
                    pw.println(tab3 + "<add_heat_t_start> " + this.addHeatStartTimeEntry.getValue() + " </add_heat_t_start>");
                    pw.println(tab3 + "<add_heat_t_final> " + this.addHeatEndTimeEntry.getValue() + " </add_heat_t_final>");
                    pw.print(tab3 + "<add_heat_matls> [");
                    for (var ii = 0; ii < this.d_numAddHeatMat; ++ii) {
                        pw.print(this.addHeatPanelList.elementAt(ii).getMatID());
                        if (ii < this.d_numAddHeatMat - 1)
                            pw.print(", ");
                    }
                    pw.println("] </add_heat_matls>");
                    pw.print(tab3 + "<add_heat_coeff> [");
                    for (var ii = 0; ii < this.d_numAddHeatMat; ++ii) {
                        pw.print(this.addHeatPanelList.elementAt(ii).getCoeff());
                        if (ii < this.d_numAddHeatMat - 1)
                            pw.print(", ");
                    }
                    pw.println("] </add_heat_coeff>");
                    pw.println(tab2 + "</ADD_HEAT>");
                }
                pw.println(tab1 + "</ICE>");
                pw.println(tab + "</CFD>");
                pw.println(" ");
            };
            return ICEParamInputPanel;
        }(JPanel));
        ICEInputsPanel.ICEParamInputPanel = ICEParamInputPanel;
        var AddHeatPanel = (function (_super) {
            __extends(AddHeatPanel, _super);
            function AddHeatPanel(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.event.ListSelectionListener", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 8980091494413394177;
                _this.d_numMPM = 0;
                _this.d_numICE = 0;
                _this.d_addHeatMatID = 0;
                _this.d_addHeatCoeff = 0;
                _this.addHeatMatListModel = null;
                _this.addHeatMatList = null;
                _this.addHeatMatSP = null;
                _this.addHeatCoeffEntry = null;
                _this.d_numMPM = _this.__parent.d_mpmMat.size();
                _this.d_numICE = _this.__parent.d_iceMat.size();
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.setLayout(gb);
                var addHeatMatLabel = new JLabel("Material ID");
                _this.addHeatMatListModel = new DefaultListModel();
                for (var ii = 0; ii < _this.d_numICE; ++ii) {
                    _this.addHeatMatListModel.addElement(_this.__parent.d_iceMat.elementAt(ii));
                }
                _this.addHeatMatList = new JList(_this.addHeatMatListModel);
                _this.addHeatMatList.setSelectedIndex(0);
                _this.addHeatMatList.setVisibleRowCount(2);
                _this.addHeatMatList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
                _this.addHeatMatList.addListSelectionListener(_this);
                _this.addHeatMatSP = new JScrollPane(_this.addHeatMatList);
                UintahGui.setConstraints(gbc, 0, 0);
                gb.setConstraints(addHeatMatLabel, gbc);
                _this.add(addHeatMatLabel);
                UintahGui.setConstraints(gbc, 1, 0);
                gb.setConstraints(_this.addHeatMatSP, gbc);
                _this.add(_this.addHeatMatSP);
                _this.d_addHeatMatID = _this.d_numMPM;
                var addHeatCoeffLabel = new JLabel("Heat Coeff.");
                _this.addHeatCoeffEntry = new vaango_ui.DecimalField(8.0E10, 9, true);
                UintahGui.setConstraints(gbc, 0, 1);
                gb.setConstraints(addHeatCoeffLabel, gbc);
                _this.add(addHeatCoeffLabel);
                UintahGui.setConstraints(gbc, 1, 1);
                gb.setConstraints(_this.addHeatCoeffEntry, gbc);
                _this.add(_this.addHeatCoeffEntry);
                _this.d_addHeatCoeff = 8.0E10;
                return _this;
            }
            AddHeatPanel.prototype.valueChanged = function (e) {
                this.d_addHeatMatID = this.d_numMPM + this.addHeatMatList.getSelectedIndex();
            };
            AddHeatPanel.prototype.getMatID = function () {
                return this.d_addHeatMatID;
            };
            AddHeatPanel.prototype.getCoeff = function () {
                return this.d_addHeatCoeff;
            };
            AddHeatPanel.prototype.updateMatList = function () {
                if (this.__parent.d_iceMat.size() !== this.d_numICE || this.__parent.d_mpmMat.size() !== this.d_numMPM) {
                    this.d_numMPM = this.__parent.d_mpmMat.size();
                    this.d_numICE = this.__parent.d_iceMat.size();
                    this.addHeatMatListModel.removeAllElements();
                    for (var ii = 0; ii < this.d_numICE; ++ii) {
                        this.addHeatMatListModel.addElement(this.__parent.d_iceMat.elementAt(ii));
                    }
                    this.validate();
                }
            };
            return AddHeatPanel;
        }(JPanel));
        ICEInputsPanel.AddHeatPanel = AddHeatPanel;
    })(ICEInputsPanel = vaango_ui.ICEInputsPanel || (vaango_ui.ICEInputsPanel = {}));
})(vaango_ui || (vaango_ui = {}));
