"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    import PrintWriter = java.io.PrintWriter;

    export class UintahInputPanel extends JPanel implements ChangeListener {
        /**
         * 
         */
        private static serialVersionUID : number = -8245735383813936277;

        private d_partList : ParticleList = null;

        private d_parent : UintahGui = null;

        private d_mpmMat : Vector<string> = null;

        private d_iceMat : Vector<string> = null;

        private d_geomObj : Vector<GeomObject> = null;

        private d_simComponent : string = null;

        private uintahTabbedPane : JTabbedPane = null;

        private generalInpPanel : GeneralInputsPanel = null;

        private geomPanel : GeometryPanel = null;

        private mpmInpPanel : MPMInputsPanel = null;

        private mpmMatPanel : MPMMaterialsPanel = null;

        private iceInpPanel : ICEInputsPanel = null;

        private iceMatPanel : ICEMaterialsPanel = null;

        private exchangePanel : MPMICEExchangePanel = null;

        private gridBCPanel : GridBCPanel = null;

        public constructor(particleList : ParticleList, parent : UintahGui) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.swing.event.ChangeListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_mpmMat = new Vector<string>();
            this.d_iceMat = new Vector<string>();
            this.d_geomObj = new Vector<GeomObject>();
            this.d_simComponent = <string>new String("none");
            this.d_partList = particleList;
            this.d_parent = parent;
            this.uintahTabbedPane = new JTabbedPane();
            this.generalInpPanel = new GeneralInputsPanel(this.d_simComponent, this);
            this.geomPanel = new GeometryPanel(this.d_partList, this.d_geomObj, this);
            this.mpmInpPanel = new MPMInputsPanel(this);
            this.mpmMatPanel = new MPMMaterialsPanel(this.d_geomObj, this.d_mpmMat, this);
            this.iceInpPanel = new ICEInputsPanel(this.d_mpmMat, this.d_iceMat, this);
            this.iceMatPanel = new ICEMaterialsPanel(this.d_geomObj, this.d_iceMat, this);
            this.exchangePanel = new MPMICEExchangePanel(this.d_mpmMat, this.d_iceMat, this);
            this.gridBCPanel = new GridBCPanel(this);
            this.uintahTabbedPane.addTab("General Inputs", null, this.generalInpPanel, null);
            this.uintahTabbedPane.addTab("Geometry", null, this.geomPanel, null);
            this.uintahTabbedPane.addTab("MPM Parameters", null, this.mpmInpPanel, null);
            this.uintahTabbedPane.addTab("MPM Materials", null, this.mpmMatPanel, null);
            this.uintahTabbedPane.addTab("ICE Parameters", null, this.iceInpPanel, null);
            this.uintahTabbedPane.addTab("ICE Materials", null, this.iceMatPanel, null);
            this.uintahTabbedPane.addTab("Exchange", null, this.exchangePanel, null);
            this.uintahTabbedPane.addTab("Grid and BC", null, this.gridBCPanel, null);
            this.uintahTabbedPane.setSelectedIndex(0);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.uintahTabbedPane, gbc);
            this.add(this.uintahTabbedPane);
            var numTabs : number = this.uintahTabbedPane.getTabCount();
            for(var ii : number = 1; ii < numTabs; ++ii) {
                this.uintahTabbedPane.setEnabledAt(ii, false);
            }
            this.uintahTabbedPane.addChangeListener(this);
        }

        public stateChanged(e : ChangeEvent) {
            if(this.uintahTabbedPane.getSelectedIndex() === 1) {
                this.geomPanel.setVisibleDisplayGeometryFrame(true);
            }
            var numParticles : number = this.d_partList.size();
            if(numParticles > 0) {
                if((this.d_simComponent === "mpm")) {
                    this.mpmMatPanel.createPartListMPMMaterial(this.d_simComponent);
                } else if((this.d_simComponent === "mpmice")) {
                    this.iceMatPanel.createPartListICEMaterial(this.d_simComponent);
                }
            }
            this.generalInpPanel.refresh();
            this.geomPanel.refresh();
            this.mpmInpPanel.refresh();
            this.mpmMatPanel.refresh();
            this.iceInpPanel.refresh();
            this.iceMatPanel.refresh();
            this.exchangePanel.updateMaterials(this.d_mpmMat, this.d_iceMat);
        }

        public setVisibleDisplayFrame(visible : boolean) {
            this.geomPanel.setVisibleDisplayGeometryFrame(visible);
        }

        public getSimComponent() : string {
            return this.d_simComponent;
        }

        public enableTabs(simComponent : string) {
            this.d_simComponent = simComponent;
            if((this.d_simComponent === "mpm")) {
                this.uintahTabbedPane.setEnabledAt(1, true);
                this.uintahTabbedPane.setEnabledAt(2, true);
                this.uintahTabbedPane.setEnabledAt(3, true);
                this.uintahTabbedPane.setEnabledAt(4, false);
                this.uintahTabbedPane.setEnabledAt(5, false);
                this.uintahTabbedPane.setEnabledAt(7, true);
            } else if((this.d_simComponent === "ice")) {
                this.uintahTabbedPane.setEnabledAt(1, true);
                this.uintahTabbedPane.setEnabledAt(2, false);
                this.uintahTabbedPane.setEnabledAt(3, false);
                this.uintahTabbedPane.setEnabledAt(4, true);
                this.uintahTabbedPane.setEnabledAt(5, true);
                this.uintahTabbedPane.setEnabledAt(6, true);
                this.uintahTabbedPane.setEnabledAt(7, true);
            } else if((this.d_simComponent === "mpmice")) {
                var numTabs : number = this.uintahTabbedPane.getTabCount();
                for(var ii : number = 1; ii < numTabs; ++ii) {
                    this.uintahTabbedPane.setEnabledAt(ii, true);
                }
            } else {
                var numTabs : number = this.uintahTabbedPane.getTabCount();
                for(var ii : number = 1; ii < numTabs; ++ii) {
                    this.uintahTabbedPane.setEnabledAt(ii, false);
                }
            }
        }

        public updatePanels() {
            this.validate();
            this.d_parent.updatePanels();
        }

        public writeUintah(pw : PrintWriter) {
            if(pw == null) return;
            var tab : string = <string>new String("  ");
            var tab1 : string = <string>new String(tab + "  ");
            var tab2 : string = <string>new String(tab1 + "  ");
            pw.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            pw.println("<!-- <!DOCTYPE Uintah_specification SYSTEM \"input.dtd\"> -->");
            pw.println("<Uintah_specification>");
            pw.println(tab);
            try {
                this.generalInpPanel.writeUintah(pw, tab);
            } catch(e) {
                console.info("Could not write GeneralInputPanel.");
            };
            try {
                this.mpmInpPanel.writeUintah(pw, tab);
            } catch(e) {
                console.info("Could not write MPMInputPanel.");
            };
            try {
                this.iceInpPanel.writeUintah(pw, tab);
            } catch(e) {
                console.info("Could not write ICEInputPanel.");
            };
            pw.println(tab + "<MaterialProperties>");
            pw.println(tab);
            pw.println(tab1 + "<MPM>");
            var numMPMMat : number = this.d_mpmMat.size();
            for(var ii : number = 0; ii < numMPMMat; ++ii) {
                try {
                    this.mpmMatPanel.writeUintah(pw, tab2, ii);
                } catch(e) {
                    console.info("Could not write MPMMaterialInputPanel.");
                };
            }
            try {
                this.mpmMatPanel.writeUintahContact(pw, tab2);
            } catch(e) {
                console.info("Could not write MPMMaterialInputPanel contact information.");
            };
            pw.println(tab1 + "</MPM>");
            pw.println(tab);
            pw.println(tab1 + "<ICE>");
            var numICEMat : number = this.d_iceMat.size();
            for(var ii : number = 0; ii < numICEMat; ++ii) {
                try {
                    this.iceMatPanel.writeUintah(pw, tab2, ii);
                } catch(e) {
                    console.info("Could not write ICEMaterialInputPanel.");
                };
            }
            pw.println(tab1 + "</ICE>");
            pw.println(tab);
            pw.println(tab1 + "<exchange_properties>");
            try {
                this.exchangePanel.writeUintah(pw, tab2);
            } catch(e) {
                console.info("Could not write ExchangePanel.");
            };
            pw.println(tab1 + "</exchange_properties>");
            pw.println(tab + "</MaterialProperties>");
            pw.println(tab);
            pw.println(tab + "<Grid>");
            try {
                this.gridBCPanel.writeUintah(pw, tab1);
            } catch(e) {
                console.info("Could not write GridBCPanel.");
            };
            pw.println(tab + "</Grid>");
            pw.println(tab + "<PhysicalBC>");
            pw.println(tab1 + "<MPM>");
            pw.println(tab1 + "</MPM>");
            pw.println(tab + "</PhysicalBC>");
            pw.println(tab);
            pw.println("</Uintah_specification>");
        }
    }
}

