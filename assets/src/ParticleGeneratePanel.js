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
    var ParticleGeneratePanel = (function (_super) {
        __extends(ParticleGeneratePanel, _super);
        function ParticleGeneratePanel(particleList, parent) {
            var _this = _super.call(this) || this;
            _this.d_particleList = null;
            _this.d_partSizeDist = null;
            _this.particleSizeInputPanel = null;
            _this.particleLocGenPanel = null;
            _this.partTabbedPane = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.swing.event.ChangeListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_particleList = particleList;
            _this.d_partSizeDist = new vaango_ui.ParticleSize();
            _this.partTabbedPane = new JTabbedPane();
            _this.particleSizeInputPanel = new vaango_ui.ParticleSizeDistInputPanel(_this.d_partSizeDist, _this);
            _this.particleLocGenPanel = new vaango_ui.ParticleLocGeneratePanel(_this.d_particleList, _this.d_partSizeDist, _this);
            _this.partTabbedPane.addTab("Size Distribution", null, _this.particleSizeInputPanel, null);
            _this.partTabbedPane.addTab("Generate Locations", null, _this.particleLocGenPanel, null);
            _this.partTabbedPane.setSelectedIndex(0);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.partTabbedPane, gbc);
            _this.add(_this.partTabbedPane);
            _this.partTabbedPane.addChangeListener(_this);
            return _this;
        }
        ParticleGeneratePanel.prototype.getParticleList = function () {
            return this.d_particleList;
        };
        ParticleGeneratePanel.prototype.stateChanged = function (e) {
            var curTab = this.partTabbedPane.getSelectedIndex();
            if (curTab === 0) {
                console.info("part gen state changed : display = true");
                this.particleSizeInputPanel.setVisibleDisplayFrame(true);
            }
            else {
                console.info("part gen state changed : display = false");
                this.particleLocGenPanel.setVisibleDisplayFrame(true);
            }
        };
        ParticleGeneratePanel.prototype.setVisibleDisplayFrame = function (visible) {
            if (visible) {
                console.info("part gen set visible: display = true");
                this.particleSizeInputPanel.setVisibleDisplayFrame(true);
            }
            else {
                console.info("part gen set visible: display = false");
                this.particleSizeInputPanel.setVisibleDisplayFrame(false);
                this.particleLocGenPanel.setVisibleDisplayFrame(false);
            }
        };
        return ParticleGeneratePanel;
    }(JPanel));
    /**
     *
     */
    ParticleGeneratePanel.serialVersionUID = 5139050966831013555;
    vaango_ui.ParticleGeneratePanel = ParticleGeneratePanel;
})(vaango_ui || (vaango_ui = {}));
