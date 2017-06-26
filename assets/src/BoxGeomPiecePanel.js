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
    var BoxGeomPiecePanel = (function (_super) {
        __extends(BoxGeomPiecePanel, _super);
        function BoxGeomPiecePanel(parent) {
            var _this = _super.call(this) || this;
            _this.d_box = null;
            _this.d_parent = null;
            _this.nameEntry = null;
            _this.minEntry = null;
            _this.maxEntry = null;
            _this.acceptButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_box = new vaango_ui.BoxGeomPiece();
            _this.d_parent = parent;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var fill = GridBagConstraints.BOTH;
            var xgap = 5;
            var ygap = 0;
            var nameLabel = new JLabel("Geom Piece Name");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
            gb.setConstraints(nameLabel, gbc);
            _this.add(nameLabel);
            _this.nameEntry = new JTextField("Box", 20);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
            gb.setConstraints(_this.nameEntry, gbc);
            _this.add(_this.nameEntry);
            var minLabel = new JLabel("Lower Left Corner");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 1);
            gb.setConstraints(minLabel, gbc);
            _this.add(minLabel);
            _this.minEntry = new vaango_ui.DecimalVectorField(0.0, 0.0, 0.0, 5, true);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
            gb.setConstraints(_this.minEntry, gbc);
            _this.add(_this.minEntry);
            var maxLabel = new JLabel("Upper Right Corner");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 2);
            gb.setConstraints(maxLabel, gbc);
            _this.add(maxLabel);
            _this.maxEntry = new vaango_ui.DecimalVectorField(0.0, 0.0, 0.0, 5, true);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 2);
            gb.setConstraints(_this.maxEntry, gbc);
            _this.add(_this.maxEntry);
            _this.acceptButton = new JButton("Accept");
            _this.acceptButton.setActionCommand("accept");
            _this.acceptButton.addActionListener(_this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 3);
            gb.setConstraints(_this.acceptButton, gbc);
            _this.add(_this.acceptButton);
            return _this;
        }
        BoxGeomPiecePanel.prototype.actionPerformed = function (e) {
            if (e.getActionCommand() === "accept") {
                var name = this.nameEntry.getText();
                var xmin = this.minEntry.x();
                var ymin = this.minEntry.y();
                var zmin = this.minEntry.z();
                var xmax = this.maxEntry.x();
                var ymax = this.maxEntry.y();
                var zmax = this.maxEntry.z();
                var min = new vaango_ui.Point(xmin, ymin, zmin);
                var max = new vaango_ui.Point(xmax, ymax, zmax);
                this.d_box.set(name, min, max);
                this.d_parent.addGeomPiece(this.d_box);
            }
        };
        return BoxGeomPiecePanel;
    }(JPanel));
    /**
     *
     */
    BoxGeomPiecePanel.serialVersionUID = -1153459331824259741;
    vaango_ui.BoxGeomPiecePanel = BoxGeomPiecePanel;
})(vaango_ui || (vaango_ui = {}));
