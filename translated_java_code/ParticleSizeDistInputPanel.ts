"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class ParticleSizeDistInputPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = 8625305001830241963;

        private d_parentPanel : ParticleGeneratePanel = null;

        private d_partSizeDist : ParticleSize = null;

        private inputPanel : InputPartDistPanel = null;

        private displayFrame : DisplayPartDistFrame = null;

        public constructor(partSizeDist : ParticleSize, parentPanel : ParticleGeneratePanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_partSizeDist = partSizeDist;
            this.d_parentPanel = parentPanel;
            this.inputPanel = new InputPartDistPanel(this.d_partSizeDist, this);
            this.displayFrame = new DisplayPartDistFrame(this.d_partSizeDist, this);
            this.displayFrame.pack();
            this.displayFrame.setVisible(false);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.inputPanel, gbc);
            this.add(this.inputPanel);
        }

        public getSuper() : ParticleGeneratePanel {
            return this.d_parentPanel;
        }

        public refreshDisplayPartDistFrame() {
            this.displayFrame.refresh();
        }

        public setVisibleDisplayFrame(visible : boolean) {
            console.info("part size dist set visible = " + visible);
            this.displayFrame.setVisible(visible);
        }
    }
}

