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
    var UintahInputPanel = (function (_super) {
        __extends(UintahInputPanel, _super);
        function UintahInputPanel(particleList, parent) {
            var _this = _super.call(this) || this;
            _this.d_partList = null;
            _this.d_parent = null;
            _this.d_mpmMat = null;
            _this.d_iceMat = null;
            _this.d_geomObj = null;
            _this.d_simComponent = null;
            _this.uintahTabbedPane = null;
            _this.generalInpPanel = null;
            _this.geomPanel = null;
            _this.mpmInpPanel = null;
            _this.mpmMatPanel = null;
            _this.iceInpPanel = null;
            _this.iceMatPanel = null;
            _this.exchangePanel = null;
            _this.gridBCPanel = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.swing.event.ChangeListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_mpmMat = new Vector();
            _this.d_iceMat = new Vector();
            _this.d_geomObj = new Vector();
            _this.d_simComponent = new String("none");
            _this.d_partList = particleList;
            _this.d_parent = parent;
            _this.uintahTabbedPane = new JTabbedPane();
            _this.generalInpPanel = new vaango_ui.GeneralInputsPanel(_this.d_simComponent, _this);
            _this.geomPanel = new vaango_ui.GeometryPanel(_this.d_partList, _this.d_geomObj, _this);
            _this.mpmInpPanel = new vaango_ui.MPMInputsPanel(_this);
            _this.mpmMatPanel = new vaango_ui.MPMMaterialsPanel(_this.d_geomObj, _this.d_mpmMat, _this);
            _this.iceInpPanel = new vaango_ui.ICEInputsPanel(_this.d_mpmMat, _this.d_iceMat, _this);
            _this.iceMatPanel = new vaango_ui.ICEMaterialsPanel(_this.d_geomObj, _this.d_iceMat, _this);
            _this.exchangePanel = new vaango_ui.MPMICEExchangePanel(_this.d_mpmMat, _this.d_iceMat, _this);
            _this.gridBCPanel = new vaango_ui.GridBCPanel(_this);
            _this.uintahTabbedPane.addTab("General Inputs", null, _this.generalInpPanel, null);
            _this.uintahTabbedPane.addTab("Geometry", null, _this.geomPanel, null);
            _this.uintahTabbedPane.addTab("MPM Parameters", null, _this.mpmInpPanel, null);
            _this.uintahTabbedPane.addTab("MPM Materials", null, _this.mpmMatPanel, null);
            _this.uintahTabbedPane.addTab("ICE Parameters", null, _this.iceInpPanel, null);
            _this.uintahTabbedPane.addTab("ICE Materials", null, _this.iceMatPanel, null);
            _this.uintahTabbedPane.addTab("Exchange", null, _this.exchangePanel, null);
            _this.uintahTabbedPane.addTab("Grid and BC", null, _this.gridBCPanel, null);
            _this.uintahTabbedPane.setSelectedIndex(0);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.uintahTabbedPane, gbc);
            _this.add(_this.uintahTabbedPane);
            var numTabs = _this.uintahTabbedPane.getTabCount();
            for (var ii = 1; ii < numTabs; ++ii) {
                _this.uintahTabbedPane.setEnabledAt(ii, false);
            }
            _this.uintahTabbedPane.addChangeListener(_this);
            return _this;
        }
        UintahInputPanel.prototype.stateChanged = function (e) {
            if (this.uintahTabbedPane.getSelectedIndex() === 1) {
                this.geomPanel.setVisibleDisplayGeometryFrame(true);
            }
            var numParticles = this.d_partList.size();
            if (numParticles > 0) {
                if ((this.d_simComponent === "mpm")) {
                    this.mpmMatPanel.createPartListMPMMaterial(this.d_simComponent);
                }
                else if ((this.d_simComponent === "mpmice")) {
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
        };
        UintahInputPanel.prototype.setVisibleDisplayFrame = function (visible) {
            this.geomPanel.setVisibleDisplayGeometryFrame(visible);
        };
        UintahInputPanel.prototype.getSimComponent = function () {
            return this.d_simComponent;
        };
        UintahInputPanel.prototype.enableTabs = function (simComponent) {
            this.d_simComponent = simComponent;
            if ((this.d_simComponent === "mpm")) {
                this.uintahTabbedPane.setEnabledAt(1, true);
                this.uintahTabbedPane.setEnabledAt(2, true);
                this.uintahTabbedPane.setEnabledAt(3, true);
                this.uintahTabbedPane.setEnabledAt(4, false);
                this.uintahTabbedPane.setEnabledAt(5, false);
                this.uintahTabbedPane.setEnabledAt(7, true);
            }
            else if ((this.d_simComponent === "ice")) {
                this.uintahTabbedPane.setEnabledAt(1, true);
                this.uintahTabbedPane.setEnabledAt(2, false);
                this.uintahTabbedPane.setEnabledAt(3, false);
                this.uintahTabbedPane.setEnabledAt(4, true);
                this.uintahTabbedPane.setEnabledAt(5, true);
                this.uintahTabbedPane.setEnabledAt(6, true);
                this.uintahTabbedPane.setEnabledAt(7, true);
            }
            else if ((this.d_simComponent === "mpmice")) {
                var numTabs = this.uintahTabbedPane.getTabCount();
                for (var ii = 1; ii < numTabs; ++ii) {
                    this.uintahTabbedPane.setEnabledAt(ii, true);
                }
            }
            else {
                var numTabs = this.uintahTabbedPane.getTabCount();
                for (var ii = 1; ii < numTabs; ++ii) {
                    this.uintahTabbedPane.setEnabledAt(ii, false);
                }
            }
        };
        UintahInputPanel.prototype.updatePanels = function () {
            this.validate();
            this.d_parent.updatePanels();
        };
        UintahInputPanel.prototype.writeUintah = function (pw) {
            if (pw == null)
                return;
            var tab = new String("  ");
            var tab1 = new String(tab + "  ");
            var tab2 = new String(tab1 + "  ");
            pw.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            pw.println("<!-- <!DOCTYPE Uintah_specification SYSTEM \"input.dtd\"> -->");
            pw.println("<Uintah_specification>");
            pw.println(tab);
            try {
                this.generalInpPanel.writeUintah(pw, tab);
            }
            catch (e) {
                console.info("Could not write GeneralInputPanel.");
            }
            ;
            try {
                this.mpmInpPanel.writeUintah(pw, tab);
            }
            catch (e) {
                console.info("Could not write MPMInputPanel.");
            }
            ;
            try {
                this.iceInpPanel.writeUintah(pw, tab);
            }
            catch (e) {
                console.info("Could not write ICEInputPanel.");
            }
            ;
            pw.println(tab + "<MaterialProperties>");
            pw.println(tab);
            pw.println(tab1 + "<MPM>");
            var numMPMMat = this.d_mpmMat.size();
            for (var ii = 0; ii < numMPMMat; ++ii) {
                try {
                    this.mpmMatPanel.writeUintah(pw, tab2, ii);
                }
                catch (e) {
                    console.info("Could not write MPMMaterialInputPanel.");
                }
                ;
            }
            try {
                this.mpmMatPanel.writeUintahContact(pw, tab2);
            }
            catch (e) {
                console.info("Could not write MPMMaterialInputPanel contact information.");
            }
            ;
            pw.println(tab1 + "</MPM>");
            pw.println(tab);
            pw.println(tab1 + "<ICE>");
            var numICEMat = this.d_iceMat.size();
            for (var ii = 0; ii < numICEMat; ++ii) {
                try {
                    this.iceMatPanel.writeUintah(pw, tab2, ii);
                }
                catch (e) {
                    console.info("Could not write ICEMaterialInputPanel.");
                }
                ;
            }
            pw.println(tab1 + "</ICE>");
            pw.println(tab);
            pw.println(tab1 + "<exchange_properties>");
            try {
                this.exchangePanel.writeUintah(pw, tab2);
            }
            catch (e) {
                console.info("Could not write ExchangePanel.");
            }
            ;
            pw.println(tab1 + "</exchange_properties>");
            pw.println(tab + "</MaterialProperties>");
            pw.println(tab);
            pw.println(tab + "<Grid>");
            try {
                this.gridBCPanel.writeUintah(pw, tab1);
            }
            catch (e) {
                console.info("Could not write GridBCPanel.");
            }
            ;
            pw.println(tab + "</Grid>");
            pw.println(tab + "<PhysicalBC>");
            pw.println(tab1 + "<MPM>");
            pw.println(tab1 + "</MPM>");
            pw.println(tab + "</PhysicalBC>");
            pw.println(tab);
            pw.println("</Uintah_specification>");
        };
        return UintahInputPanel;
    }(JPanel));
    /**
     *
     */
    UintahInputPanel.serialVersionUID = -8245735383813936277;
    vaango_ui.UintahInputPanel = UintahInputPanel;
})(vaango_ui || (vaango_ui = {}));
