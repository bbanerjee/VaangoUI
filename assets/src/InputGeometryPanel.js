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
    var InputGeometryPanel = (function (_super) {
        __extends(InputGeometryPanel, _super);
        function InputGeometryPanel(partList, geomObj, geomPiece, parent) {
            var _this = _super.call(this) || this;
            _this.d_domainSize = 0.0;
            _this.d_usePartList = false;
            _this.d_partList = null;
            _this.d_parent = null;
            _this.d_geomObj = null;
            _this.d_geomPiece = null;
            _this.usePartListCB = null;
            _this.createGeomObjectPanel = null;
            _this.createGeomPiecePanel = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_domainSize = 100.0;
            _this.d_usePartList = false;
            _this.d_partList = partList;
            _this.d_geomObj = geomObj;
            _this.d_geomPiece = geomPiece;
            _this.d_parent = parent;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            _this.usePartListCB = new JCheckBox("Use Computed Particle Distribution");
            _this.usePartListCB.setSelected(false);
            _this.usePartListCB.addItemListener(_this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.usePartListCB, gbc);
            _this.add(_this.usePartListCB);
            _this.createGeomPiecePanel = new vaango_ui.CreateGeomPiecePanel(_this.d_usePartList, _this.d_partList, _this.d_geomPiece, _this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.createGeomPiecePanel, gbc);
            _this.add(_this.createGeomPiecePanel);
            _this.createGeomObjectPanel = new vaango_ui.CreateGeomObjectPanel(_this.d_usePartList, _this.d_partList, _this.d_geomObj, _this.d_geomPiece, _this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(_this.createGeomObjectPanel, gbc);
            _this.add(_this.createGeomObjectPanel);
            return _this;
        }
        InputGeometryPanel.prototype.refresh = function () {
            if (this.d_partList == null)
                return;
            if (this.d_partList.size() > 0) {
                this.d_usePartList = true;
                this.d_domainSize = this.d_partList.getRVESize();
                this.updatePanels();
            }
        };
        InputGeometryPanel.prototype.updatePanels = function () {
            this.d_parent.updatePanels();
        };
        InputGeometryPanel.prototype.itemStateChanged = function (e) {
            var source = e.getItemSelectable();
            if (source === this.usePartListCB) {
                if (e.getStateChange() === ItemEvent.SELECTED) {
                    this.createPartListGeomObjects();
                }
                else {
                    this.deletePartListGeomObjects();
                }
            }
        };
        InputGeometryPanel.prototype.refreshDisplay = function () {
            this.d_parent.setDomainSize(this.d_domainSize);
            this.d_parent.refreshDisplayGeometryFrame();
        };
        InputGeometryPanel.prototype.createPartListGeomObjects = function () {
            this.d_usePartList = true;
            var simComponent = this.d_parent.getSimComponent();
            this.createGeomPiecePanel.setEnabled(false);
            this.createGeomPiecePanel.setVisible(false);
            this.createGeomObjectPanel.usePartList(this.d_usePartList);
            this.createGeomObjectPanel.disableCreate();
            this.createGeomObjectPanel.disableDelete();
            if (this.d_partList != null) {
                this.d_domainSize = this.d_partList.getRVESize();
                this.createGeomPiecePanel.createPartListGeomPiece(simComponent);
                this.createGeomObjectPanel.addPartListGeomObjectPanel();
                this.refreshDisplay();
            }
        };
        InputGeometryPanel.prototype.deletePartListGeomObjects = function () {
            this.d_usePartList = false;
            this.createGeomPiecePanel.setVisible(true);
            this.createGeomPiecePanel.setEnabled(true);
            this.createGeomObjectPanel.usePartList(this.d_usePartList);
            this.createGeomObjectPanel.enableCreate();
            this.createGeomObjectPanel.enableDelete();
            if (this.d_partList != null) {
                this.d_domainSize = 100.0;
                this.createGeomPiecePanel.deletePartListGeomPiece();
                this.createGeomObjectPanel.removePartListGeomObjectPanel();
                this.refreshDisplay();
            }
        };
        return InputGeometryPanel;
    }(JPanel));
    /**
     *
     */
    InputGeometryPanel.serialVersionUID = -1993980566972829798;
    vaango_ui.InputGeometryPanel = InputGeometryPanel;
})(vaango_ui || (vaango_ui = {}));
