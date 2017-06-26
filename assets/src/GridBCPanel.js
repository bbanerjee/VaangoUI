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
    var GridBCPanel = (function (_super) {
        __extends(GridBCPanel, _super);
        function GridBCPanel(parentPanel) {
            var _this = _super.call(this) || this;
            _this.d_parentPanel = null;
            _this.levelTabbedPane = null;
            _this.bcTabbedPane = null;
            _this.levelPanel = null;
            _this.xminPanel = null;
            _this.xmaxPanel = null;
            _this.yminPanel = null;
            _this.ymaxPanel = null;
            _this.zminPanel = null;
            _this.zmaxPanel = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_domainSize = 0;
            _this.d_numLevel = 0;
            _this.d_parentPanel = parentPanel;
            _this.d_domainSize = 100.0;
            _this.d_numLevel = 1;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var fill = GridBagConstraints.NONE;
            var xgap = 5;
            var ygap = 0;
            _this.levelTabbedPane = new JTabbedPane();
            var level = 0;
            var levelID = new String("Level " + new String(level).toString());
            _this.levelPanel = new GridBCPanel.LevelPanel(_this, level);
            _this.levelTabbedPane.addTab(levelID, null, _this.levelPanel, null);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
            gb.setConstraints(_this.levelTabbedPane, gbc);
            _this.add(_this.levelTabbedPane);
            _this.bcTabbedPane = new JTabbedPane();
            _this.xminPanel = new GridBCPanel.BCPanel(_this, "x-");
            _this.bcTabbedPane.addTab("BCs at x-", null, _this.xminPanel, null);
            _this.xmaxPanel = new GridBCPanel.BCPanel(_this, "x+");
            _this.bcTabbedPane.addTab("BCs at x+", null, _this.xmaxPanel, null);
            _this.yminPanel = new GridBCPanel.BCPanel(_this, "y-");
            _this.bcTabbedPane.addTab("BCs at y-", null, _this.yminPanel, null);
            _this.ymaxPanel = new GridBCPanel.BCPanel(_this, "y+");
            _this.bcTabbedPane.addTab("BCs at y+", null, _this.ymaxPanel, null);
            _this.zminPanel = new GridBCPanel.BCPanel(_this, "z-");
            _this.bcTabbedPane.addTab("BCs at z-", null, _this.zminPanel, null);
            _this.zmaxPanel = new GridBCPanel.BCPanel(_this, "z+");
            _this.bcTabbedPane.addTab("BCs at z+", null, _this.zmaxPanel, null);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 2);
            gb.setConstraints(_this.bcTabbedPane, gbc);
            _this.add(_this.bcTabbedPane);
            return _this;
        }
        GridBCPanel.prototype.refresh = function () {
        };
        GridBCPanel.prototype.setDomainSize = function (domainSize) {
            this.d_domainSize = domainSize;
        };
        GridBCPanel.prototype.getDomainSize = function () {
            return this.d_domainSize;
        };
        GridBCPanel.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<Level>");
            this.levelPanel.writeUintah(pw, tab1);
            pw.println(tab + "</Level>");
            pw.println(tab + "<BoundaryConditions>");
            this.xminPanel.writeUintah(pw, tab1);
            this.xmaxPanel.writeUintah(pw, tab1);
            this.yminPanel.writeUintah(pw, tab1);
            this.ymaxPanel.writeUintah(pw, tab1);
            this.zminPanel.writeUintah(pw, tab1);
            this.zmaxPanel.writeUintah(pw, tab1);
            pw.println(tab + "</BoundaryConditions>");
        };
        return GridBCPanel;
    }(JPanel));
    /**
     *
     */
    GridBCPanel.serialVersionUID = -5569179840836739842;
    vaango_ui.GridBCPanel = GridBCPanel;
    (function (GridBCPanel) {
        var LevelPanel = (function (_super) {
            __extends(LevelPanel, _super);
            function LevelPanel(__parent, level) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -1258169842759352604;
                _this.d_level = 0;
                _this.minEntry = null;
                _this.maxEntry = null;
                _this.resEntry = null;
                _this.extraEntry = null;
                _this.patchEntry = null;
                _this.d_level = level;
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.setLayout(gb);
                var fillBoth = GridBagConstraints.BOTH;
                var fill = GridBagConstraints.NONE;
                var xgap = 5;
                var ygap = 0;
                var minLabel = new JLabel("Domain Lower Left Corner");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 0);
                gb.setConstraints(minLabel, gbc);
                _this.add(minLabel);
                _this.minEntry = new vaango_ui.DecimalVectorField(0.0, 0.0, 0.0, 5, true);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
                gb.setConstraints(_this.minEntry, gbc);
                _this.add(_this.minEntry);
                var maxLabel = new JLabel("Domain Upper Right Corner");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 1);
                gb.setConstraints(maxLabel, gbc);
                _this.add(maxLabel);
                _this.maxEntry = new vaango_ui.DecimalVectorField(1.0, 1.0, 1.0, 5, true);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
                gb.setConstraints(_this.maxEntry, gbc);
                _this.add(_this.maxEntry);
                var resLabel = new JLabel("Grid Resolution");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 2);
                gb.setConstraints(resLabel, gbc);
                _this.add(resLabel);
                _this.resEntry = new vaango_ui.IntegerVectorField(1, 1, 1, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 2);
                gb.setConstraints(_this.resEntry, gbc);
                _this.add(_this.resEntry);
                var extraLabel = new JLabel("Extra Grid Cells");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 3);
                gb.setConstraints(extraLabel, gbc);
                _this.add(extraLabel);
                _this.extraEntry = new vaango_ui.IntegerVectorField(0, 0, 0, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 3);
                gb.setConstraints(_this.extraEntry, gbc);
                _this.add(_this.extraEntry);
                var patchLabel = new JLabel("Patches");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 4);
                gb.setConstraints(patchLabel, gbc);
                _this.add(patchLabel);
                _this.patchEntry = new vaango_ui.IntegerVectorField(1, 1, 1, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 4);
                gb.setConstraints(_this.patchEntry, gbc);
                _this.add(_this.patchEntry);
                return _this;
            }
            LevelPanel.prototype.writeUintah = function (pw, tab) {
                var tab1 = new String(tab + "  ");
                pw.println(tab + "<Box label=\"Level" + this.d_level + "\">");
                pw.println(tab1 + "<lower> [" + this.minEntry.x() + ", " + this.minEntry.y() + ", " + this.minEntry.z() + "] </lower>");
                pw.println(tab1 + "<upper> [" + this.maxEntry.x() + ", " + this.maxEntry.y() + ", " + this.maxEntry.z() + "] </upper>");
                pw.println(tab1 + "<resolution> [" + this.resEntry.x() + ", " + this.resEntry.y() + ", " + this.resEntry.z() + "] </resolution>");
                pw.println(tab1 + "<extraCells> [" + this.extraEntry.x() + ", " + this.extraEntry.y() + ", " + this.extraEntry.z() + "] </extraCells>");
                pw.println(tab1 + "<patches> [" + this.patchEntry.x() + ", " + this.patchEntry.y() + ", " + this.patchEntry.z() + "] </patches>");
                pw.println(tab + "</Box>");
            };
            return LevelPanel;
        }(JPanel));
        GridBCPanel.LevelPanel = LevelPanel;
        var BCPanel = (function (_super) {
            __extends(BCPanel, _super);
            function BCPanel(__parent, location) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -6321950247287299958;
                _this.d_location = null;
                _this.d_symm = false;
                _this.symmBCPanel = null;
                _this.pressurePanel = null;
                _this.densityPanel = null;
                _this.temperaturePanel = null;
                _this.spVolPanel = null;
                _this.velocityPanel = null;
                _this.d_symm = false;
                _this.d_location = location;
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.setLayout(gb);
                var fillBoth = GridBagConstraints.BOTH;
                var xgap = 5;
                var ygap = 0;
                _this.symmBCPanel = new BCPanel.SymmBCPanel(_this, location);
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 0);
                gb.setConstraints(_this.symmBCPanel, gbc);
                _this.add(_this.symmBCPanel);
                _this.pressurePanel = new BCPanel.ScalarBCPanel(_this, "Pressure");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 1);
                gb.setConstraints(_this.pressurePanel, gbc);
                _this.add(_this.pressurePanel);
                _this.densityPanel = new BCPanel.ScalarBCPanel(_this, "Density");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 2);
                gb.setConstraints(_this.densityPanel, gbc);
                _this.add(_this.densityPanel);
                _this.temperaturePanel = new BCPanel.ScalarBCPanel(_this, "Temperature");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 3);
                gb.setConstraints(_this.temperaturePanel, gbc);
                _this.add(_this.temperaturePanel);
                _this.spVolPanel = new BCPanel.ScalarBCPanel(_this, "SpecificVol");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 4);
                gb.setConstraints(_this.spVolPanel, gbc);
                _this.add(_this.spVolPanel);
                _this.velocityPanel = new BCPanel.VectorBCPanel(_this, "Velocity");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 5);
                gb.setConstraints(_this.velocityPanel, gbc);
                _this.add(_this.velocityPanel);
                return _this;
            }
            BCPanel.prototype.writeUintah = function (pw, tab) {
                var tab1 = new String(tab + "  ");
                pw.println(tab + "<Face side=\"" + this.d_location + "\">");
                if (this.d_symm) {
                    this.symmBCPanel.writeUintah(pw, tab1);
                }
                else {
                    this.pressurePanel.writeUintah(pw, tab1);
                    this.densityPanel.writeUintah(pw, tab1);
                    this.temperaturePanel.writeUintah(pw, tab1);
                    this.spVolPanel.writeUintah(pw, tab1);
                    this.velocityPanel.writeUintah(pw, tab1);
                }
                pw.println(tab + "</Face>");
            };
            return BCPanel;
        }(JPanel));
        GridBCPanel.BCPanel = BCPanel;
        (function (BCPanel) {
            var SymmBCPanel = (function (_super) {
                __extends(SymmBCPanel, _super);
                function SymmBCPanel(__parent, location) {
                    var _this = _super.call(this) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                    _this.__parent = __parent;
                    _this.serialVersionUID = 2181078199352982391;
                    _this.symmCB = null;
                    var gb = new GridBagLayout();
                    var gbc = new GridBagConstraints();
                    _this.setLayout(gb);
                    var fillBoth = GridBagConstraints.BOTH;
                    var xgap = 5;
                    var ygap = 0;
                    _this.symmCB = new JCheckBox("Symmetry BCs only");
                    _this.symmCB.setSelected(false);
                    _this.symmCB.addItemListener(_this);
                    UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 0);
                    gb.setConstraints(_this.symmCB, gbc);
                    _this.add(_this.symmCB);
                    return _this;
                }
                SymmBCPanel.prototype.itemStateChanged = function (e) {
                    if (e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_symm = true;
                        this.__parent.pressurePanel.setEnabled(false);
                        this.__parent.densityPanel.setEnabled(false);
                        this.__parent.temperaturePanel.setEnabled(false);
                        this.__parent.spVolPanel.setEnabled(false);
                        this.__parent.velocityPanel.setEnabled(false);
                    }
                    else {
                        this.__parent.d_symm = false;
                        this.__parent.pressurePanel.setEnabled(true);
                        this.__parent.densityPanel.setEnabled(true);
                        this.__parent.temperaturePanel.setEnabled(true);
                        this.__parent.spVolPanel.setEnabled(true);
                        this.__parent.velocityPanel.setEnabled(true);
                    }
                };
                SymmBCPanel.prototype.writeUintah = function (pw, tab) {
                    var tab1 = new String(tab + "  ");
                    pw.println(tab1 + "<BCType id=\"all\" var=\"symmetry\" label=\"Symmetric\">");
                    pw.println(tab1 + "</BCType>");
                };
                return SymmBCPanel;
            }(JPanel));
            BCPanel.SymmBCPanel = SymmBCPanel;
            var ScalarBCPanel = (function (_super) {
                __extends(ScalarBCPanel, _super);
                function ScalarBCPanel(__parent, scalar) {
                    var _this = _super.call(this) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                    _this.__parent = __parent;
                    _this.serialVersionUID = 4684880393626223493;
                    _this.d_scalar = null;
                    _this.d_type = null;
                    _this.d_mat = null;
                    _this.presLabel = null;
                    _this.typeLabel = null;
                    _this.typeCB = null;
                    _this.matLabel = null;
                    _this.matCB = null;
                    _this.valLabel = null;
                    _this.valEntry = null;
                    _this.d_scalar = scalar;
                    _this.d_type = "symmetry";
                    _this.d_mat = "all";
                    _this.setLayout(new FlowLayout(FlowLayout.LEFT));
                    _this.presLabel = new JLabel(scalar + ":");
                    _this.add(_this.presLabel);
                    _this.typeLabel = new JLabel("BC Type");
                    _this.add(_this.typeLabel);
                    _this.typeCB = new JComboBox();
                    _this.typeCB.addItem("Symmetry");
                    _this.typeCB.addItem("Dirichlet");
                    _this.typeCB.addItem("Neumann");
                    _this.typeCB.addItem("Compute From Density");
                    _this.typeCB.addActionListener(_this);
                    _this.add(_this.typeCB);
                    _this.matLabel = new JLabel("Material");
                    _this.add(_this.matLabel);
                    _this.matCB = new JComboBox();
                    _this.matCB.addItem("All");
                    _this.matCB.addItem("Material 0");
                    _this.matCB.addActionListener(_this);
                    _this.add(_this.matCB);
                    _this.valLabel = new JLabel("Value");
                    _this.add(_this.valLabel);
                    _this.valEntry = new vaango_ui.DecimalField(0.0, 9);
                    _this.add(_this.valEntry);
                    return _this;
                }
                ScalarBCPanel.prototype.actionPerformed = function (e) {
                    var source = e.getSource();
                    var item = source.getSelectedItem();
                    if (source.equals(this.typeCB)) {
                        if ((item === "Symmetry")) {
                            this.d_type = "symmetry";
                        }
                        else if ((item === "Dirchlet")) {
                            this.d_type = "Dirichlet";
                        }
                        else if ((item === "Neumann")) {
                            this.d_type = "Neumann";
                        }
                        else if ((item === "Compute From Density")) {
                            this.d_type = "computeFromDensity";
                        }
                    }
                    else if (source.equals(this.matCB)) {
                        if ((item === "All")) {
                            this.d_mat = "all";
                        }
                        else if ((item === "Material 0")) {
                            this.d_mat = "0";
                        }
                    }
                };
                ScalarBCPanel.prototype.setEnabled = function (enable) {
                    if (enable) {
                        this.presLabel.setEnabled(true);
                        this.typeLabel.setEnabled(true);
                        this.typeCB.setEnabled(true);
                        this.matLabel.setEnabled(true);
                        this.matCB.setEnabled(true);
                        this.valLabel.setEnabled(true);
                        this.valEntry.setEnabled(true);
                    }
                    else {
                        this.presLabel.setEnabled(false);
                        this.typeLabel.setEnabled(false);
                        this.typeCB.setEnabled(false);
                        this.matLabel.setEnabled(false);
                        this.matCB.setEnabled(false);
                        this.valLabel.setEnabled(false);
                        this.valEntry.setEnabled(false);
                    }
                };
                ScalarBCPanel.prototype.writeUintah = function (pw, tab) {
                    var tab1 = new String(tab + "  ");
                    pw.println(tab + "<BCType id=\"" + this.d_mat + "\" var=\"" + this.d_type + "\" label=\"" + this.d_scalar + "\">");
                    pw.println(tab1 + "<value> " + this.valEntry.getValue() + " </value>");
                    pw.println(tab + "</BCType>");
                };
                return ScalarBCPanel;
            }(JPanel));
            BCPanel.ScalarBCPanel = ScalarBCPanel;
            var VectorBCPanel = (function (_super) {
                __extends(VectorBCPanel, _super);
                function VectorBCPanel(__parent, vector) {
                    var _this = _super.call(this) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                    _this.__parent = __parent;
                    _this.serialVersionUID = 4257087448692450869;
                    _this.d_vector = null;
                    _this.d_type = null;
                    _this.d_mat = null;
                    _this.presLabel = null;
                    _this.typeLabel = null;
                    _this.typeCB = null;
                    _this.matLabel = null;
                    _this.matCB = null;
                    _this.valLabel = null;
                    _this.valEntry = null;
                    _this.d_vector = vector;
                    _this.d_type = "symmetry";
                    _this.d_mat = "all";
                    var gb = new GridBagLayout();
                    var gbc = new GridBagConstraints();
                    _this.setLayout(gb);
                    var fill = GridBagConstraints.NONE;
                    var xgap = 5;
                    var ygap = 0;
                    _this.presLabel = new JLabel(vector + ":");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
                    gb.setConstraints(_this.presLabel, gbc);
                    _this.add(_this.presLabel);
                    _this.typeLabel = new JLabel("BC Type");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
                    gb.setConstraints(_this.typeLabel, gbc);
                    _this.add(_this.typeLabel);
                    _this.typeCB = new JComboBox();
                    _this.typeCB.addItem("Symmetry");
                    _this.typeCB.addItem("Dirichlet");
                    _this.typeCB.addItem("Neumann");
                    _this.typeCB.addActionListener(_this);
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 2, 0);
                    gb.setConstraints(_this.typeCB, gbc);
                    _this.add(_this.typeCB);
                    _this.matLabel = new JLabel("Material");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 3, 0);
                    gb.setConstraints(_this.matLabel, gbc);
                    _this.add(_this.matLabel);
                    _this.matCB = new JComboBox();
                    _this.matCB.addItem("All");
                    _this.matCB.addItem("Material 0");
                    _this.matCB.addActionListener(_this);
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 4, 0);
                    gb.setConstraints(_this.matCB, gbc);
                    _this.add(_this.matCB);
                    _this.valLabel = new JLabel("Value");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 5, 0);
                    gb.setConstraints(_this.valLabel, gbc);
                    _this.add(_this.valLabel);
                    _this.valEntry = new vaango_ui.DecimalVectorField(0.0, 0.0, 0.0, 9, true);
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 6, 0);
                    gb.setConstraints(_this.valEntry, gbc);
                    _this.add(_this.valEntry);
                    return _this;
                }
                VectorBCPanel.prototype.actionPerformed = function (e) {
                    var source = e.getSource();
                    var item = source.getSelectedItem();
                    if (source.equals(this.typeCB)) {
                        if ((item === "Symmetry")) {
                            this.d_type = "symmetry";
                        }
                        else if ((item === "Dirchlet")) {
                            this.d_type = "Dirichlet";
                        }
                        else if ((item === "Neumann")) {
                            this.d_type = "Neumann";
                        }
                    }
                    else if (source.equals(this.matCB)) {
                        if ((item === "All")) {
                            this.d_mat = "all";
                        }
                        else if ((item === "Material 0")) {
                            this.d_mat = "0";
                        }
                    }
                };
                VectorBCPanel.prototype.setEnabled = function (enable) {
                    if (enable) {
                        this.presLabel.setEnabled(true);
                        this.typeLabel.setEnabled(true);
                        this.typeCB.setEnabled(true);
                        this.matLabel.setEnabled(true);
                        this.matCB.setEnabled(true);
                        this.valLabel.setEnabled(true);
                        this.valEntry.setEnabled(true);
                    }
                    else {
                        this.presLabel.setEnabled(false);
                        this.typeLabel.setEnabled(false);
                        this.typeCB.setEnabled(false);
                        this.matLabel.setEnabled(false);
                        this.matCB.setEnabled(false);
                        this.valLabel.setEnabled(false);
                        this.valEntry.setEnabled(false);
                    }
                };
                VectorBCPanel.prototype.writeUintah = function (pw, tab) {
                    var tab1 = new String(tab + "  ");
                    pw.println(tab + "<BCType id=\"" + this.d_mat + "\" var=\"" + this.d_type + "\" label=\"" + this.d_vector + "\">");
                    pw.println(tab1 + "<value> [" + this.valEntry.x() + ", " + this.valEntry.y() + ", " + this.valEntry.y() + "] </value>");
                    pw.println(tab + "</BCType>");
                };
                return VectorBCPanel;
            }(JPanel));
            BCPanel.VectorBCPanel = VectorBCPanel;
        })(BCPanel = GridBCPanel.BCPanel || (GridBCPanel.BCPanel = {}));
    })(GridBCPanel = vaango_ui.GridBCPanel || (vaango_ui.GridBCPanel = {}));
})(vaango_ui || (vaango_ui = {}));
