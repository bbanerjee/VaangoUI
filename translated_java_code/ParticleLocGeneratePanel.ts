"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class ParticleLocGeneratePanel extends JPanel {
        private static serialVersionUID : number = -197763295924184684;

        private d_parentPanel : ParticleGeneratePanel = null;

        private computePanel : ComputeParticleLocPanel = null;

        private displayFrame : DisplayParticleLocFrame = null;

        private d_rveSize : number = 100.0;

        public constructor(partList : ParticleList, partSizeDist : ParticleSize, parentPanel : ParticleGeneratePanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_parentPanel = parentPanel;
            this.computePanel = new ComputeParticleLocPanel(partList, partSizeDist, this);
            this.displayFrame = new DisplayParticleLocFrame(partList, this);
            this.displayFrame.pack();
            this.displayFrame.setVisible(false);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.computePanel, gbc);
            this.add(this.computePanel);
        }

        public getSuper() : ParticleGeneratePanel {
            return this.d_parentPanel;
        }

        public refreshDisplayPartLocFrame() {
            this.displayFrame.refresh();
        }

        public refreshDisplayPart3DFrame() {
        }

        public setVisibleDisplayFrame(visible : boolean) {
            this.displayFrame.setVisible(visible);
        }

        public setRVESize(rveSize : number) {
            this.d_rveSize = rveSize;
        }

        public getRVESize() : number {
            return this.d_rveSize;
        }
    }
}

