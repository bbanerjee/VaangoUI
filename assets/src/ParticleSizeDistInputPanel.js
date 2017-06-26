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
    var ParticleSizeDistInputPanel = (function (_super) {
        __extends(ParticleSizeDistInputPanel, _super);
        function ParticleSizeDistInputPanel(partSizeDist, parentPanel) {
            var _this = _super.call(this) || this;
            _this.d_parentPanel = null;
            _this.d_partSizeDist = null;
            _this.inputPanel = null;
            _this.displayFrame = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_partSizeDist = partSizeDist;
            _this.d_parentPanel = parentPanel;
            _this.inputPanel = new vaango_ui.InputPartDistPanel(_this.d_partSizeDist, _this);
            _this.displayFrame = new vaango_ui.DisplayPartDistFrame(_this.d_partSizeDist, _this);
            _this.displayFrame.pack();
            _this.displayFrame.setVisible(false);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.inputPanel, gbc);
            _this.add(_this.inputPanel);
            return _this;
        }
        ParticleSizeDistInputPanel.prototype.getSuper = function () {
            return this.d_parentPanel;
        };
        ParticleSizeDistInputPanel.prototype.refreshDisplayPartDistFrame = function () {
            this.displayFrame.refresh();
        };
        ParticleSizeDistInputPanel.prototype.setVisibleDisplayFrame = function (visible) {
            console.info("part size dist set visible = " + visible);
            this.displayFrame.setVisible(visible);
        };
        return ParticleSizeDistInputPanel;
    }(JPanel));
    /**
     *
     */
    ParticleSizeDistInputPanel.serialVersionUID = 8625305001830241963;
    vaango_ui.ParticleSizeDistInputPanel = ParticleSizeDistInputPanel;
})(vaango_ui || (vaango_ui = {}));
