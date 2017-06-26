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
    var LightWeightCanvas = (function (_super) {
        __extends(LightWeightCanvas, _super);
        function LightWeightCanvas(width, height) {
            var _this = _super.call(this) || this;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.setSize(width, height);
            _this.setPreferredSize(new Dimension(width, height));
            return _this;
        }
        LightWeightCanvas.prototype.paintComponent = function (g) {
            var d = this.getSize();
            g.drawRect(0, 0, d.width, d.height);
        };
        return LightWeightCanvas;
    }(JComponent));
    /**
     *
     */
    LightWeightCanvas.serialVersionUID = 4745691118012860762;
    vaango_ui.LightWeightCanvas = LightWeightCanvas;
})(vaango_ui || (vaango_ui = {}));
