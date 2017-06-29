"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class ParticleGeneratePanel extends JPanel implements ChangeListener {
        /**
         * 
         */
        private static serialVersionUID : number = 5139050966831013555;

        private d_particleList : ParticleList = null;

        private d_partSizeDist : ParticleSize = null;

        private particleSizeInputPanel : ParticleSizeDistInputPanel = null;

        private particleLocGenPanel : ParticleLocGeneratePanel = null;

        private partTabbedPane : JTabbedPane = null;

        public constructor(particleList : ParticleList, parent : UintahGui) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.swing.event.ChangeListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_particleList = particleList;
            this.d_partSizeDist = new ParticleSize();
            this.partTabbedPane = new JTabbedPane();
            this.particleSizeInputPanel = new ParticleSizeDistInputPanel(this.d_partSizeDist, this);
            this.particleLocGenPanel = new ParticleLocGeneratePanel(this.d_particleList, this.d_partSizeDist, this);
            this.partTabbedPane.addTab("Size Distribution", null, this.particleSizeInputPanel, null);
            this.partTabbedPane.addTab("Generate Locations", null, this.particleLocGenPanel, null);
            this.partTabbedPane.setSelectedIndex(0);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.partTabbedPane, gbc);
            this.add(this.partTabbedPane);
            this.partTabbedPane.addChangeListener(this);
        }

        public getParticleList() : ParticleList {
            return this.d_particleList;
        }

        public stateChanged(e : ChangeEvent) {
            var curTab : number = this.partTabbedPane.getSelectedIndex();
            if(curTab === 0) {
                console.info("part gen state changed : display = true");
                this.particleSizeInputPanel.setVisibleDisplayFrame(true);
            } else {
                console.info("part gen state changed : display = false");
                this.particleLocGenPanel.setVisibleDisplayFrame(true);
            }
        }

        public setVisibleDisplayFrame(visible : boolean) {
            if(visible) {
                console.info("part gen set visible: display = true");
                this.particleSizeInputPanel.setVisibleDisplayFrame(true);
            } else {
                console.info("part gen set visible: display = false");
                this.particleSizeInputPanel.setVisibleDisplayFrame(false);
                this.particleLocGenPanel.setVisibleDisplayFrame(false);
            }
        }
    }
}

