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
    var ICEMaterialsPanel = (function (_super) {
        __extends(ICEMaterialsPanel, _super);
        function ICEMaterialsPanel(geomObj, iceMat, parent) {
            var _this = _super.call(this) || this;
            _this.d_geomObj = null;
            _this.d_iceMat = null;
            _this.iceMatTabbedPane = null;
            _this.iceMatInputPanel = null;
            _this.addButton = null;
            _this.delButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_geomObj = geomObj;
            _this.d_iceMat = iceMat;
            _this.iceMatInputPanel = new Vector();
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            _this.addButton = new JButton("Add Material");
            _this.addButton.setActionCommand("add");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.addButton, gbc);
            _this.add(_this.addButton);
            _this.delButton = new JButton("Remove Material");
            _this.delButton.setActionCommand("delete");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
            gb.setConstraints(_this.delButton, gbc);
            _this.add(_this.delButton);
            var matID = new String("ICE Material " + new String(0).toString());
            _this.d_iceMat.addElement(matID);
            var matPanel = new vaango_ui.ICEMaterialInputPanel(0, _this.d_geomObj);
            _this.iceMatInputPanel.addElement(matPanel);
            _this.iceMatTabbedPane = new JTabbedPane();
            _this.iceMatTabbedPane.addTab(matID, null, matPanel, null);
            _this.iceMatTabbedPane.setSelectedIndex(0);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, GridBagConstraints.REMAINDER, 1, 5);
            gb.setConstraints(_this.iceMatTabbedPane, gbc);
            _this.add(_this.iceMatTabbedPane);
            _this.addButton.addActionListener(_this);
            _this.delButton.addActionListener(_this);
            return _this;
        }
        ICEMaterialsPanel.prototype.refresh = function () {
            var numMat = this.d_iceMat.size();
            for (var ii = 0; ii < numMat; ++ii) {
                var matPanel = this.iceMatInputPanel.elementAt(ii);
                matPanel.refresh();
            }
        };
        ICEMaterialsPanel.prototype.createPartListICEMaterial = function (simType) {
            if ((simType === new String("mpmice"))) {
                var numMat = this.d_iceMat.size();
                if (numMat < 2) {
                    var matID = new String("ICE Material " + new String(numMat).toString());
                    this.d_iceMat.addElement(matID);
                    var matPanel = new vaango_ui.ICEMaterialInputPanel(numMat, this.d_geomObj);
                    this.iceMatInputPanel.addElement(matPanel);
                    this.iceMatTabbedPane.add(matPanel, numMat);
                    this.iceMatTabbedPane.setTitleAt(numMat, matID);
                    this.iceMatTabbedPane.setSelectedIndex(0);
                }
            }
        };
        ICEMaterialsPanel.prototype.writeUintah = function (pw, tab, matIndex) {
            if (pw == null)
                return;
            var numMat = this.d_iceMat.size();
            if (matIndex < numMat) {
                var matPanel = this.iceMatInputPanel.elementAt(matIndex);
                matPanel.writeUintah(pw, tab);
            }
        };
        ICEMaterialsPanel.prototype.actionPerformed = function (e) {
            if (e.getActionCommand() === "add") {
                var ii = this.d_iceMat.size();
                var matID = new String("ICE Material " + new String(ii).toString());
                this.d_iceMat.addElement(matID);
                var matPanel = new vaango_ui.ICEMaterialInputPanel(ii, this.d_geomObj);
                this.iceMatInputPanel.addElement(matPanel);
                this.iceMatTabbedPane.add(matPanel, ii);
                this.iceMatTabbedPane.setTitleAt(ii, matID);
                this.iceMatTabbedPane.setSelectedIndex(ii);
            }
            else if (e.getActionCommand() === "delete") {
                var ii = this.d_iceMat.size() - 1;
                this.d_iceMat.removeElementAt(ii);
                this.iceMatInputPanel.removeElementAt(ii);
                this.iceMatTabbedPane.remove(ii);
                this.iceMatTabbedPane.setSelectedIndex(ii);
            }
        };
        return ICEMaterialsPanel;
    }(JPanel));
    /**
     *
     */
    ICEMaterialsPanel.serialVersionUID = 7684826886240542619;
    vaango_ui.ICEMaterialsPanel = ICEMaterialsPanel;
})(vaango_ui || (vaango_ui = {}));
