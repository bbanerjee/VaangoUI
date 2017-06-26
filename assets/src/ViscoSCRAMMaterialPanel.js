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
    var ViscoSCRAMMaterialPanel = (function (_super) {
        __extends(ViscoSCRAMMaterialPanel, _super);
        function ViscoSCRAMMaterialPanel() {
            var _this = _super.call(this) || this;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            return _this;
        }
        /**
         * Write the contents out in Uintah format
         */
        ViscoSCRAMMaterialPanel.prototype.writeUintah = function (pw) {
            if (pw == null)
                return;
        };
        return ViscoSCRAMMaterialPanel;
    }(JPanel));
    /**
     *
     */
    ViscoSCRAMMaterialPanel.serialVersionUID = -7468356791990080074;
    vaango_ui.ViscoSCRAMMaterialPanel = ViscoSCRAMMaterialPanel;
})(vaango_ui || (vaango_ui = {}));
