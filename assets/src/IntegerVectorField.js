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
    var IntegerVectorField = (function (_super) {
        __extends(IntegerVectorField, _super);
        function IntegerVectorField(xval, yval, zval, columns) {
            var _this = _super.call(this) || this;
            _this.xLabel = null;
            _this.yLabel = null;
            _this.zLabel = null;
            _this.xEntry = null;
            _this.yEntry = null;
            _this.zEntry = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            _this.xLabel = new JLabel("x");
            _this.setConstraints(gbc, 0, 0);
            gb.setConstraints(_this.xLabel, gbc);
            _this.add(_this.xLabel);
            _this.xEntry = new vaango_ui.IntegerField(xval, columns);
            _this.setConstraints(gbc, 1, 0);
            gb.setConstraints(_this.xEntry, gbc);
            _this.add(_this.xEntry);
            _this.yLabel = new JLabel("y");
            _this.setConstraints(gbc, 2, 0);
            gb.setConstraints(_this.yLabel, gbc);
            _this.add(_this.yLabel);
            _this.yEntry = new vaango_ui.IntegerField(yval, columns);
            _this.setConstraints(gbc, 3, 0);
            gb.setConstraints(_this.yEntry, gbc);
            _this.add(_this.yEntry);
            _this.zLabel = new JLabel("z");
            _this.setConstraints(gbc, 4, 0);
            gb.setConstraints(_this.zLabel, gbc);
            _this.add(_this.zLabel);
            _this.zEntry = new vaango_ui.IntegerField(zval, columns);
            _this.setConstraints(gbc, 5, 0);
            gb.setConstraints(_this.zEntry, gbc);
            _this.add(_this.zEntry);
            return _this;
        }
        IntegerVectorField.prototype.x = function () {
            return this.xEntry.getValue();
        };
        IntegerVectorField.prototype.y = function () {
            return this.yEntry.getValue();
        };
        IntegerVectorField.prototype.z = function () {
            return this.zEntry.getValue();
        };
        IntegerVectorField.prototype.setEnabled = function (enable) {
            if (enable) {
                this.xLabel.setEnabled(true);
                this.yLabel.setEnabled(true);
                this.zLabel.setEnabled(true);
                this.xEntry.setEnabled(true);
                this.yEntry.setEnabled(true);
                this.zEntry.setEnabled(true);
            }
            else {
                this.xLabel.setEnabled(false);
                this.yLabel.setEnabled(false);
                this.zLabel.setEnabled(false);
                this.xEntry.setEnabled(false);
                this.yEntry.setEnabled(false);
                this.zEntry.setEnabled(false);
            }
        };
        IntegerVectorField.prototype.setConstraints = function (c, col, row) {
            c.fill = GridBagConstraints.NONE;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets = new Insets(5, 5, 5, 5);
            c.insets = insets;
        };
        return IntegerVectorField;
    }(JPanel));
    /**
     *
     */
    IntegerVectorField.serialVersionUID = -5563228233944277430;
    vaango_ui.IntegerVectorField = IntegerVectorField;
})(vaango_ui || (vaango_ui = {}));
