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
    var MPMMaterialsPanel = (function (_super) {
        __extends(MPMMaterialsPanel, _super);
        function MPMMaterialsPanel(geomObj, mpmMat, parent) {
            var _this = _super.call(this) || this;
            _this.d_geomObj = null;
            _this.d_mpmMat = null;
            _this.mpmMatTabbedPane = null;
            _this.mpmMatInputPanel = null;
            _this.addButton = null;
            _this.delButton = null;
            _this.contactPanel = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.swing.event.ChangeListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_geomObj = geomObj;
            _this.d_mpmMat = mpmMat;
            _this.mpmMatInputPanel = new Vector();
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            _this.addButton = new JButton("Add Material");
            _this.addButton.setActionCommand("add");
            UintahGui.setConstraints(gbc, 0, 0);
            gb.setConstraints(_this.addButton, gbc);
            _this.add(_this.addButton);
            _this.delButton = new JButton("Remove Material");
            _this.delButton.setActionCommand("delete");
            UintahGui.setConstraints(gbc, 1, 0);
            gb.setConstraints(_this.delButton, gbc);
            _this.add(_this.delButton);
            var matID = new String("MPM Material " + new String(0).toString());
            _this.d_mpmMat.addElement(matID);
            var matPanel = new vaango_ui.MPMMaterialInputPanel(0, _this.d_geomObj);
            _this.mpmMatInputPanel.addElement(matPanel);
            _this.contactPanel = new vaango_ui.MPMContactInputPanel(_this.d_mpmMat);
            _this.mpmMatTabbedPane = new JTabbedPane();
            _this.mpmMatTabbedPane.addTab(matID, null, matPanel, null);
            _this.mpmMatTabbedPane.addTab("Contact", null, _this.contactPanel, null);
            _this.mpmMatTabbedPane.setSelectedIndex(0);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, GridBagConstraints.REMAINDER, 1, 5);
            gb.setConstraints(_this.mpmMatTabbedPane, gbc);
            _this.add(_this.mpmMatTabbedPane);
            _this.mpmMatTabbedPane.addChangeListener(_this);
            var buttonListener = new MPMMaterialsPanel.ButtonListener(_this);
            _this.addButton.addActionListener(buttonListener);
            _this.delButton.addActionListener(buttonListener);
            return _this;
        }
        MPMMaterialsPanel.prototype.stateChanged = function (e) {
            var numTab = this.mpmMatTabbedPane.getTabCount();
            var tabIndex = this.mpmMatTabbedPane.getSelectedIndex();
            if (tabIndex === numTab - 1) {
                this.contactPanel.refresh();
            }
        };
        MPMMaterialsPanel.prototype.refresh = function () {
            var numMat = this.d_mpmMat.size();
            for (var ii = 0; ii < numMat; ++ii) {
                var matPanel = this.mpmMatInputPanel.elementAt(ii);
                matPanel.refresh();
            }
        };
        MPMMaterialsPanel.prototype.createPartListMPMMaterial = function (simType) {
            if ((simType === new String("mpm"))) {
                var numMat = this.d_mpmMat.size();
                if (numMat < 2) {
                    var matID = new String("Material " + new String(numMat).toString());
                    this.d_mpmMat.addElement(matID);
                    var matPanel = new vaango_ui.MPMMaterialInputPanel(numMat, this.d_geomObj);
                    this.mpmMatInputPanel.addElement(matPanel);
                    this.mpmMatTabbedPane.add(matPanel, numMat);
                    this.mpmMatTabbedPane.setTitleAt(numMat, matID);
                    this.mpmMatTabbedPane.setSelectedIndex(0);
                }
            }
        };
        MPMMaterialsPanel.prototype.writeUintah = function (pw, tab, matIndex) {
            if (pw == null)
                return;
            var numMat = this.d_mpmMat.size();
            if (matIndex < numMat) {
                var matPanel = this.mpmMatInputPanel.elementAt(matIndex);
                matPanel.writeUintah(pw, tab);
            }
        };
        MPMMaterialsPanel.prototype.writeUintahContact = function (pw, tab) {
            if (pw == null)
                return;
            this.contactPanel.writeUintah(pw, tab);
        };
        return MPMMaterialsPanel;
    }(JPanel));
    /**
     *
     */
    MPMMaterialsPanel.serialVersionUID = 2160671222060156287;
    vaango_ui.MPMMaterialsPanel = MPMMaterialsPanel;
    (function (MPMMaterialsPanel) {
        var ButtonListener = (function () {
            function ButtonListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
            ButtonListener.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "add") {
                    var ii = this.__parent.d_mpmMat.size();
                    var matID = new String("Material " + new String(ii).toString());
                    this.__parent.d_mpmMat.addElement(matID);
                    var matPanel = new vaango_ui.MPMMaterialInputPanel(ii, this.__parent.d_geomObj);
                    this.__parent.mpmMatInputPanel.addElement(matPanel);
                    this.__parent.mpmMatTabbedPane.add(matPanel, ii);
                    this.__parent.mpmMatTabbedPane.setTitleAt(ii, matID);
                    this.__parent.mpmMatTabbedPane.setSelectedIndex(ii);
                }
                else if (e.getActionCommand() === "delete") {
                    var ii = this.__parent.d_mpmMat.size() - 1;
                    this.__parent.d_mpmMat.removeElementAt(ii);
                    this.__parent.mpmMatInputPanel.removeElementAt(ii);
                    this.__parent.mpmMatTabbedPane.remove(ii);
                    this.__parent.mpmMatTabbedPane.setSelectedIndex(ii);
                }
            };
            return ButtonListener;
        }());
        MPMMaterialsPanel.ButtonListener = ButtonListener;
    })(MPMMaterialsPanel = vaango_ui.MPMMaterialsPanel || (vaango_ui.MPMMaterialsPanel = {}));
})(vaango_ui || (vaango_ui = {}));
