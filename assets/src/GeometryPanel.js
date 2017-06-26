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
    var GeometryPanel = (function (_super) {
        __extends(GeometryPanel, _super);
        function GeometryPanel(partList, geomObj, parentPanel) {
            var _this = _super.call(this) || this;
            _this.d_parentPanel = null;
            _this.d_geomObj = null;
            _this.d_geomPiece = null;
            _this.inputPanel = null;
            _this.displayFrame = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_domainSize = 0;
            _this.d_parentPanel = parentPanel;
            _this.d_domainSize = 100.0;
            _this.d_geomObj = geomObj;
            _this.d_geomPiece = new Vector();
            _this.inputPanel = new vaango_ui.InputGeometryPanel(partList, _this.d_geomObj, _this.d_geomPiece, _this);
            _this.displayFrame = new vaango_ui.DisplayGeometryFrame(partList, _this.d_geomPiece, _this);
            _this.displayFrame.setVisible(false);
            _this.displayFrame.pack();
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.inputPanel, gbc);
            _this.add(_this.inputPanel);
            return _this;
        }
        GeometryPanel.prototype.refresh = function () {
            this.inputPanel.refresh();
        };
        GeometryPanel.prototype.updatePanels = function () {
            this.validate();
            this.inputPanel.validate();
            this.displayFrame.validate();
            this.d_parentPanel.updatePanels();
        };
        GeometryPanel.prototype.getSuper = function () {
            return this.d_parentPanel;
        };
        GeometryPanel.prototype.getSimComponent = function () {
            return this.d_parentPanel.getSimComponent();
        };
        GeometryPanel.prototype.refreshDisplayGeometryFrame = function () {
            this.displayFrame.refresh();
        };
        GeometryPanel.prototype.setVisibleDisplayGeometryFrame = function (visible) {
            this.displayFrame.setVisible(visible);
        };
        GeometryPanel.prototype.setDomainSize = function (domainSize) {
            this.d_domainSize = domainSize;
        };
        GeometryPanel.prototype.getDomainSize = function () {
            return this.d_domainSize;
        };
        GeometryPanel.prototype.createPartListGeomObjects = function () {
            this.inputPanel.createPartListGeomObjects();
        };
        return GeometryPanel;
    }(JPanel));
    /**
     *
     */
    GeometryPanel.serialVersionUID = 6999161601032330600;
    vaango_ui.GeometryPanel = GeometryPanel;
})(vaango_ui || (vaango_ui = {}));
