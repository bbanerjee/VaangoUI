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
    var GeomPiecePanel = (function (_super) {
        __extends(GeomPiecePanel, _super);
        function GeomPiecePanel(parent) {
            var _this = _super.call(this) || this;
            _this.d_parent = null;
            _this.geomComB = null;
            _this.gb = null;
            _this.gbc = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_parent = parent;
            _this.gb = new GridBagLayout();
            _this.gbc = new GridBagConstraints();
            _this.setLayout(_this.gb);
            var geomLabel = new JLabel("Geometry Piece Type");
            UintahGui.setConstraints(_this.gbc, 0, 0);
            _this.gb.setConstraints(geomLabel, _this.gbc);
            _this.add(geomLabel);
            _this.geomComB = new JComboBox();
            _this.geomComB.addItem("Box");
            _this.geomComB.addItem("Cylinder");
            _this.geomComB.addItem("Sphere");
            _this.geomComB.addItem("Cone");
            _this.geomComB.addActionListener(_this);
            UintahGui.setConstraints(_this.gbc, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
            _this.gb.setConstraints(_this.geomComB, _this.gbc);
            _this.add(_this.geomComB);
            return _this;
        }
        GeomPiecePanel.prototype.actionPerformed = function (e) {
            var source = e.getSource();
            var item = source.getSelectedItem();
            if ((item === new String("Box"))) {
                var boxPanel = new vaango_ui.BoxGeomPiecePanel(this);
                UintahGui.setConstraints(this.gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                this.gb.setConstraints(boxPanel, this.gbc);
                this.add(boxPanel);
                this.validate();
                this.updatePanels();
            }
            else if ((item === new String("Cylinder"))) {
            }
            else if ((item === new String("Sphere"))) {
            }
            else if ((item === new String("Cone"))) {
            }
        };
        GeomPiecePanel.prototype.updatePanels = function () {
            this.d_parent.updatePanels();
        };
        GeomPiecePanel.prototype.addGeomPiece = function (piece) {
            this.d_parent.addGeomPiece(piece);
        };
        return GeomPiecePanel;
    }(JPanel));
    /**
     *
     */
    GeomPiecePanel.serialVersionUID = -5246223015641425017;
    vaango_ui.GeomPiecePanel = GeomPiecePanel;
})(vaango_ui || (vaango_ui = {}));
