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
    var ParticleLocGeneratePanel = (function (_super) {
        __extends(ParticleLocGeneratePanel, _super);
        function ParticleLocGeneratePanel(partList, partSizeDist, parentPanel) {
            var _this = _super.call(this) || this;
            _this.d_parentPanel = null;
            _this.computePanel = null;
            _this.displayFrame = null;
            _this.d_rveSize = 100.0;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_parentPanel = parentPanel;
            _this.computePanel = new vaango_ui.ComputeParticleLocPanel(partList, partSizeDist, _this);
            _this.displayFrame = new vaango_ui.DisplayParticleLocFrame(partList, _this);
            _this.displayFrame.pack();
            _this.displayFrame.setVisible(false);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.computePanel, gbc);
            _this.add(_this.computePanel);
            return _this;
        }
        ParticleLocGeneratePanel.prototype.getSuper = function () {
            return this.d_parentPanel;
        };
        ParticleLocGeneratePanel.prototype.refreshDisplayPartLocFrame = function () {
            this.displayFrame.refresh();
        };
        ParticleLocGeneratePanel.prototype.refreshDisplayPart3DFrame = function () {
        };
        ParticleLocGeneratePanel.prototype.setVisibleDisplayFrame = function (visible) {
            this.displayFrame.setVisible(visible);
        };
        ParticleLocGeneratePanel.prototype.setRVESize = function (rveSize) {
            this.d_rveSize = rveSize;
        };
        ParticleLocGeneratePanel.prototype.getRVESize = function () {
            return this.d_rveSize;
        };
        return ParticleLocGeneratePanel;
    }(JPanel));
    ParticleLocGeneratePanel.serialVersionUID = -197763295924184684;
    vaango_ui.ParticleLocGeneratePanel = ParticleLocGeneratePanel;
})(vaango_ui || (vaango_ui = {}));
