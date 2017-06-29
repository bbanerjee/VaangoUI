"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import PrintWriter = java.io.PrintWriter;

    export class GridBCPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = -5569179840836739842;

        private d_domainSize : number;

        private d_numLevel : number;

        private d_parentPanel : UintahInputPanel = null;

        private levelTabbedPane : JTabbedPane = null;

        private bcTabbedPane : JTabbedPane = null;

        private levelPanel : GridBCPanel.LevelPanel = null;

        private xminPanel : GridBCPanel.BCPanel = null;

        private xmaxPanel : GridBCPanel.BCPanel = null;

        private yminPanel : GridBCPanel.BCPanel = null;

        private ymaxPanel : GridBCPanel.BCPanel = null;

        private zminPanel : GridBCPanel.BCPanel = null;

        private zmaxPanel : GridBCPanel.BCPanel = null;

        public constructor(parentPanel : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_domainSize = 0;
            this.d_numLevel = 0;
            this.d_parentPanel = parentPanel;
            this.d_domainSize = 100.0;
            this.d_numLevel = 1;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var fill : number = GridBagConstraints.NONE;
            var xgap : number = 5;
            var ygap : number = 0;
            this.levelTabbedPane = new JTabbedPane();
            var level : number = 0;
            var levelID : string = <string>new String("Level " + /* valueOf */new String(level).toString());
            this.levelPanel = new GridBCPanel.LevelPanel(this, level);
            this.levelTabbedPane.addTab(levelID, null, this.levelPanel, null);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
            gb.setConstraints(this.levelTabbedPane, gbc);
            this.add(this.levelTabbedPane);
            this.bcTabbedPane = new JTabbedPane();
            this.xminPanel = new GridBCPanel.BCPanel(this, "x-");
            this.bcTabbedPane.addTab("BCs at x-", null, this.xminPanel, null);
            this.xmaxPanel = new GridBCPanel.BCPanel(this, "x+");
            this.bcTabbedPane.addTab("BCs at x+", null, this.xmaxPanel, null);
            this.yminPanel = new GridBCPanel.BCPanel(this, "y-");
            this.bcTabbedPane.addTab("BCs at y-", null, this.yminPanel, null);
            this.ymaxPanel = new GridBCPanel.BCPanel(this, "y+");
            this.bcTabbedPane.addTab("BCs at y+", null, this.ymaxPanel, null);
            this.zminPanel = new GridBCPanel.BCPanel(this, "z-");
            this.bcTabbedPane.addTab("BCs at z-", null, this.zminPanel, null);
            this.zmaxPanel = new GridBCPanel.BCPanel(this, "z+");
            this.bcTabbedPane.addTab("BCs at z+", null, this.zmaxPanel, null);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 2);
            gb.setConstraints(this.bcTabbedPane, gbc);
            this.add(this.bcTabbedPane);
        }

        public refresh() {
        }

        public setDomainSize(domainSize : number) {
            this.d_domainSize = domainSize;
        }

        public getDomainSize() : number {
            return this.d_domainSize;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
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
        }
    }

    export namespace GridBCPanel {

        export class LevelPanel extends JPanel {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d_level : number;

            minEntry : DecimalVectorField;

            maxEntry : DecimalVectorField;

            resEntry : IntegerVectorField;

            extraEntry : IntegerVectorField;

            patchEntry : IntegerVectorField;

            public constructor(__parent: any, level : number) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -1258169842759352604;
                this.d_level = 0;
                this.minEntry = null;
                this.maxEntry = null;
                this.resEntry = null;
                this.extraEntry = null;
                this.patchEntry = null;
                this.d_level = level;
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.setLayout(gb);
                var fillBoth : number = GridBagConstraints.BOTH;
                var fill : number = GridBagConstraints.NONE;
                var xgap : number = 5;
                var ygap : number = 0;
                var minLabel : JLabel = new JLabel("Domain Lower Left Corner");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 0);
                gb.setConstraints(minLabel, gbc);
                this.add(minLabel);
                this.minEntry = new DecimalVectorField(0.0, 0.0, 0.0, 5, true);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
                gb.setConstraints(this.minEntry, gbc);
                this.add(this.minEntry);
                var maxLabel : JLabel = new JLabel("Domain Upper Right Corner");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 1);
                gb.setConstraints(maxLabel, gbc);
                this.add(maxLabel);
                this.maxEntry = new DecimalVectorField(1.0, 1.0, 1.0, 5, true);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
                gb.setConstraints(this.maxEntry, gbc);
                this.add(this.maxEntry);
                var resLabel : JLabel = new JLabel("Grid Resolution");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 2);
                gb.setConstraints(resLabel, gbc);
                this.add(resLabel);
                this.resEntry = new IntegerVectorField(1, 1, 1, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 2);
                gb.setConstraints(this.resEntry, gbc);
                this.add(this.resEntry);
                var extraLabel : JLabel = new JLabel("Extra Grid Cells");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 3);
                gb.setConstraints(extraLabel, gbc);
                this.add(extraLabel);
                this.extraEntry = new IntegerVectorField(0, 0, 0, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 3);
                gb.setConstraints(this.extraEntry, gbc);
                this.add(this.extraEntry);
                var patchLabel : JLabel = new JLabel("Patches");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 4);
                gb.setConstraints(patchLabel, gbc);
                this.add(patchLabel);
                this.patchEntry = new IntegerVectorField(1, 1, 1, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 4);
                gb.setConstraints(this.patchEntry, gbc);
                this.add(this.patchEntry);
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                var tab1 : string = <string>new String(tab + "  ");
                pw.println(tab + "<Box label=\"Level" + this.d_level + "\">");
                pw.println(tab1 + "<lower> [" + this.minEntry.x() + ", " + this.minEntry.y() + ", " + this.minEntry.z() + "] </lower>");
                pw.println(tab1 + "<upper> [" + this.maxEntry.x() + ", " + this.maxEntry.y() + ", " + this.maxEntry.z() + "] </upper>");
                pw.println(tab1 + "<resolution> [" + this.resEntry.x() + ", " + this.resEntry.y() + ", " + this.resEntry.z() + "] </resolution>");
                pw.println(tab1 + "<extraCells> [" + this.extraEntry.x() + ", " + this.extraEntry.y() + ", " + this.extraEntry.z() + "] </extraCells>");
                pw.println(tab1 + "<patches> [" + this.patchEntry.x() + ", " + this.patchEntry.y() + ", " + this.patchEntry.z() + "] </patches>");
                pw.println(tab + "</Box>");
            }
        }

        export class BCPanel extends JPanel {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d_location : string;

            d_symm : boolean;

            symmBCPanel : BCPanel.SymmBCPanel;

            pressurePanel : BCPanel.ScalarBCPanel;

            densityPanel : BCPanel.ScalarBCPanel;

            temperaturePanel : BCPanel.ScalarBCPanel;

            spVolPanel : BCPanel.ScalarBCPanel;

            velocityPanel : BCPanel.VectorBCPanel;

            public constructor(__parent: any, location : string) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -6321950247287299958;
                this.d_location = null;
                this.d_symm = false;
                this.symmBCPanel = null;
                this.pressurePanel = null;
                this.densityPanel = null;
                this.temperaturePanel = null;
                this.spVolPanel = null;
                this.velocityPanel = null;
                this.d_symm = false;
                this.d_location = location;
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.setLayout(gb);
                var fillBoth : number = GridBagConstraints.BOTH;
                var xgap : number = 5;
                var ygap : number = 0;
                this.symmBCPanel = new BCPanel.SymmBCPanel(this, location);
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 0);
                gb.setConstraints(this.symmBCPanel, gbc);
                this.add(this.symmBCPanel);
                this.pressurePanel = new BCPanel.ScalarBCPanel(this, "Pressure");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 1);
                gb.setConstraints(this.pressurePanel, gbc);
                this.add(this.pressurePanel);
                this.densityPanel = new BCPanel.ScalarBCPanel(this, "Density");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 2);
                gb.setConstraints(this.densityPanel, gbc);
                this.add(this.densityPanel);
                this.temperaturePanel = new BCPanel.ScalarBCPanel(this, "Temperature");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 3);
                gb.setConstraints(this.temperaturePanel, gbc);
                this.add(this.temperaturePanel);
                this.spVolPanel = new BCPanel.ScalarBCPanel(this, "SpecificVol");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 4);
                gb.setConstraints(this.spVolPanel, gbc);
                this.add(this.spVolPanel);
                this.velocityPanel = new BCPanel.VectorBCPanel(this, "Velocity");
                UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 5);
                gb.setConstraints(this.velocityPanel, gbc);
                this.add(this.velocityPanel);
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                var tab1 : string = <string>new String(tab + "  ");
                pw.println(tab + "<Face side=\"" + this.d_location + "\">");
                if(this.d_symm) {
                    this.symmBCPanel.writeUintah(pw, tab1);
                } else {
                    this.pressurePanel.writeUintah(pw, tab1);
                    this.densityPanel.writeUintah(pw, tab1);
                    this.temperaturePanel.writeUintah(pw, tab1);
                    this.spVolPanel.writeUintah(pw, tab1);
                    this.velocityPanel.writeUintah(pw, tab1);
                }
                pw.println(tab + "</Face>");
            }
        }

        export namespace BCPanel {

            export class SymmBCPanel extends JPanel implements ItemListener {
                public __parent: any;
                /**
                 * 
                 */
                static serialVersionUID : number;

                symmCB : JCheckBox;

                public constructor(__parent: any, location : string) {
                    super();
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                    this.__parent = __parent;
                    this.serialVersionUID = 2181078199352982391;
                    this.symmCB = null;
                    var gb : GridBagLayout = new GridBagLayout();
                    var gbc : GridBagConstraints = new GridBagConstraints();
                    this.setLayout(gb);
                    var fillBoth : number = GridBagConstraints.BOTH;
                    var xgap : number = 5;
                    var ygap : number = 0;
                    this.symmCB = new JCheckBox("Symmetry BCs only");
                    this.symmCB.setSelected(false);
                    this.symmCB.addItemListener(this);
                    UintahGui.setConstraints(gbc, fillBoth, xgap, ygap, 0, 0);
                    gb.setConstraints(this.symmCB, gbc);
                    this.add(this.symmCB);
                }

                public itemStateChanged(e : ItemEvent) {
                    if(e.getStateChange() === ItemEvent.SELECTED) {
                        this.__parent.d_symm = true;
                        this.__parent.pressurePanel.setEnabled(false);
                        this.__parent.densityPanel.setEnabled(false);
                        this.__parent.temperaturePanel.setEnabled(false);
                        this.__parent.spVolPanel.setEnabled(false);
                        this.__parent.velocityPanel.setEnabled(false);
                    } else {
                        this.__parent.d_symm = false;
                        this.__parent.pressurePanel.setEnabled(true);
                        this.__parent.densityPanel.setEnabled(true);
                        this.__parent.temperaturePanel.setEnabled(true);
                        this.__parent.spVolPanel.setEnabled(true);
                        this.__parent.velocityPanel.setEnabled(true);
                    }
                }

                public writeUintah(pw : PrintWriter, tab : string) {
                    var tab1 : string = <string>new String(tab + "  ");
                    pw.println(tab1 + "<BCType id=\"all\" var=\"symmetry\" label=\"Symmetric\">");
                    pw.println(tab1 + "</BCType>");
                }
            }

            export class ScalarBCPanel extends JPanel implements ActionListener {
                public __parent: any;
                /**
                 * 
                 */
                static serialVersionUID : number;

                d_scalar : string;

                d_type : string;

                d_mat : string;

                presLabel : JLabel;

                typeLabel : JLabel;

                typeCB : JComboBox<string>;

                matLabel : JLabel;

                matCB : JComboBox<string>;

                valLabel : JLabel;

                valEntry : DecimalField;

                public constructor(__parent: any, scalar : string) {
                    super();
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                    this.__parent = __parent;
                    this.serialVersionUID = 4684880393626223493;
                    this.d_scalar = null;
                    this.d_type = null;
                    this.d_mat = null;
                    this.presLabel = null;
                    this.typeLabel = null;
                    this.typeCB = null;
                    this.matLabel = null;
                    this.matCB = null;
                    this.valLabel = null;
                    this.valEntry = null;
                    this.d_scalar = scalar;
                    this.d_type = "symmetry";
                    this.d_mat = "all";
                    this.setLayout(new FlowLayout(FlowLayout.LEFT));
                    this.presLabel = new JLabel(scalar + ":");
                    this.add(this.presLabel);
                    this.typeLabel = new JLabel("BC Type");
                    this.add(this.typeLabel);
                    this.typeCB = new JComboBox<string>();
                    this.typeCB.addItem("Symmetry");
                    this.typeCB.addItem("Dirichlet");
                    this.typeCB.addItem("Neumann");
                    this.typeCB.addItem("Compute From Density");
                    this.typeCB.addActionListener(this);
                    this.add(this.typeCB);
                    this.matLabel = new JLabel("Material");
                    this.add(this.matLabel);
                    this.matCB = new JComboBox<string>();
                    this.matCB.addItem("All");
                    this.matCB.addItem("Material 0");
                    this.matCB.addActionListener(this);
                    this.add(this.matCB);
                    this.valLabel = new JLabel("Value");
                    this.add(this.valLabel);
                    this.valEntry = new DecimalField(0.0, 9);
                    this.add(this.valEntry);
                }

                public actionPerformed(e : ActionEvent) {
                    var source : JComboBox<string> = <JComboBox<string>>e.getSource();
                    var item : string = <string>source.getSelectedItem();
                    if(source.equals(this.typeCB)) {
                        if((item === "Symmetry")) {
                            this.d_type = "symmetry";
                        } else if((item === "Dirchlet")) {
                            this.d_type = "Dirichlet";
                        } else if((item === "Neumann")) {
                            this.d_type = "Neumann";
                        } else if((item === "Compute From Density")) {
                            this.d_type = "computeFromDensity";
                        }
                    } else if(source.equals(this.matCB)) {
                        if((item === "All")) {
                            this.d_mat = "all";
                        } else if((item === "Material 0")) {
                            this.d_mat = "0";
                        }
                    }
                }

                public setEnabled(enable : boolean) {
                    if(enable) {
                        this.presLabel.setEnabled(true);
                        this.typeLabel.setEnabled(true);
                        this.typeCB.setEnabled(true);
                        this.matLabel.setEnabled(true);
                        this.matCB.setEnabled(true);
                        this.valLabel.setEnabled(true);
                        this.valEntry.setEnabled(true);
                    } else {
                        this.presLabel.setEnabled(false);
                        this.typeLabel.setEnabled(false);
                        this.typeCB.setEnabled(false);
                        this.matLabel.setEnabled(false);
                        this.matCB.setEnabled(false);
                        this.valLabel.setEnabled(false);
                        this.valEntry.setEnabled(false);
                    }
                }

                public writeUintah(pw : PrintWriter, tab : string) {
                    var tab1 : string = <string>new String(tab + "  ");
                    pw.println(tab + "<BCType id=\"" + this.d_mat + "\" var=\"" + this.d_type + "\" label=\"" + this.d_scalar + "\">");
                    pw.println(tab1 + "<value> " + this.valEntry.getValue() + " </value>");
                    pw.println(tab + "</BCType>");
                }
            }

            export class VectorBCPanel extends JPanel implements ActionListener {
                public __parent: any;
                /**
                 * 
                 */
                static serialVersionUID : number;

                d_vector : string;

                d_type : string;

                d_mat : string;

                presLabel : JLabel;

                typeLabel : JLabel;

                typeCB : JComboBox<string>;

                matLabel : JLabel;

                matCB : JComboBox<string>;

                valLabel : JLabel;

                valEntry : DecimalVectorField;

                public constructor(__parent: any, vector : string) {
                    super();
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                    this.__parent = __parent;
                    this.serialVersionUID = 4257087448692450869;
                    this.d_vector = null;
                    this.d_type = null;
                    this.d_mat = null;
                    this.presLabel = null;
                    this.typeLabel = null;
                    this.typeCB = null;
                    this.matLabel = null;
                    this.matCB = null;
                    this.valLabel = null;
                    this.valEntry = null;
                    this.d_vector = vector;
                    this.d_type = "symmetry";
                    this.d_mat = "all";
                    var gb : GridBagLayout = new GridBagLayout();
                    var gbc : GridBagConstraints = new GridBagConstraints();
                    this.setLayout(gb);
                    var fill : number = GridBagConstraints.NONE;
                    var xgap : number = 5;
                    var ygap : number = 0;
                    this.presLabel = new JLabel(vector + ":");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
                    gb.setConstraints(this.presLabel, gbc);
                    this.add(this.presLabel);
                    this.typeLabel = new JLabel("BC Type");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
                    gb.setConstraints(this.typeLabel, gbc);
                    this.add(this.typeLabel);
                    this.typeCB = new JComboBox<string>();
                    this.typeCB.addItem("Symmetry");
                    this.typeCB.addItem("Dirichlet");
                    this.typeCB.addItem("Neumann");
                    this.typeCB.addActionListener(this);
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 2, 0);
                    gb.setConstraints(this.typeCB, gbc);
                    this.add(this.typeCB);
                    this.matLabel = new JLabel("Material");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 3, 0);
                    gb.setConstraints(this.matLabel, gbc);
                    this.add(this.matLabel);
                    this.matCB = new JComboBox<string>();
                    this.matCB.addItem("All");
                    this.matCB.addItem("Material 0");
                    this.matCB.addActionListener(this);
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 4, 0);
                    gb.setConstraints(this.matCB, gbc);
                    this.add(this.matCB);
                    this.valLabel = new JLabel("Value");
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 5, 0);
                    gb.setConstraints(this.valLabel, gbc);
                    this.add(this.valLabel);
                    this.valEntry = new DecimalVectorField(0.0, 0.0, 0.0, 9, true);
                    UintahGui.setConstraints(gbc, fill, xgap, ygap, 6, 0);
                    gb.setConstraints(this.valEntry, gbc);
                    this.add(this.valEntry);
                }

                public actionPerformed(e : ActionEvent) {
                    var source : JComboBox<string> = <JComboBox<string>>e.getSource();
                    var item : string = <string>source.getSelectedItem();
                    if(source.equals(this.typeCB)) {
                        if((item === "Symmetry")) {
                            this.d_type = "symmetry";
                        } else if((item === "Dirchlet")) {
                            this.d_type = "Dirichlet";
                        } else if((item === "Neumann")) {
                            this.d_type = "Neumann";
                        }
                    } else if(source.equals(this.matCB)) {
                        if((item === "All")) {
                            this.d_mat = "all";
                        } else if((item === "Material 0")) {
                            this.d_mat = "0";
                        }
                    }
                }

                public setEnabled(enable : boolean) {
                    if(enable) {
                        this.presLabel.setEnabled(true);
                        this.typeLabel.setEnabled(true);
                        this.typeCB.setEnabled(true);
                        this.matLabel.setEnabled(true);
                        this.matCB.setEnabled(true);
                        this.valLabel.setEnabled(true);
                        this.valEntry.setEnabled(true);
                    } else {
                        this.presLabel.setEnabled(false);
                        this.typeLabel.setEnabled(false);
                        this.typeCB.setEnabled(false);
                        this.matLabel.setEnabled(false);
                        this.matCB.setEnabled(false);
                        this.valLabel.setEnabled(false);
                        this.valEntry.setEnabled(false);
                    }
                }

                public writeUintah(pw : PrintWriter, tab : string) {
                    var tab1 : string = <string>new String(tab + "  ");
                    pw.println(tab + "<BCType id=\"" + this.d_mat + "\" var=\"" + this.d_type + "\" label=\"" + this.d_vector + "\">");
                    pw.println(tab1 + "<value> [" + this.valEntry.x() + ", " + this.valEntry.y() + ", " + this.valEntry.y() + "] </value>");
                    pw.println(tab + "</BCType>");
                }
            }
        }

    }

}

