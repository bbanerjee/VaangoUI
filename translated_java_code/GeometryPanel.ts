"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class GeometryPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = 6999161601032330600;

        private d_domainSize : number;

        private d_parentPanel : UintahInputPanel = null;

        private d_geomObj : Vector<GeomObject> = null;

        private d_geomPiece : Vector<GeomPiece> = null;

        private inputPanel : InputGeometryPanel = null;

        private displayFrame : DisplayGeometryFrame = null;

        public constructor(partList : ParticleList, geomObj : Vector<GeomObject>, parentPanel : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_domainSize = 0;
            this.d_parentPanel = parentPanel;
            this.d_domainSize = 100.0;
            this.d_geomObj = geomObj;
            this.d_geomPiece = new Vector<GeomPiece>();
            this.inputPanel = new InputGeometryPanel(partList, this.d_geomObj, this.d_geomPiece, this);
            this.displayFrame = new DisplayGeometryFrame(partList, this.d_geomPiece, this);
            this.displayFrame.setVisible(false);
            this.displayFrame.pack();
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.CENTER, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.inputPanel, gbc);
            this.add(this.inputPanel);
        }

        public refresh() {
            this.inputPanel.refresh();
        }

        public updatePanels() {
            this.validate();
            this.inputPanel.validate();
            this.displayFrame.validate();
            this.d_parentPanel.updatePanels();
        }

        public getSuper() : UintahInputPanel {
            return this.d_parentPanel;
        }

        public getSimComponent() : string {
            return this.d_parentPanel.getSimComponent();
        }

        public refreshDisplayGeometryFrame() {
            this.displayFrame.refresh();
        }

        public setVisibleDisplayGeometryFrame(visible : boolean) {
            this.displayFrame.setVisible(visible);
        }

        public setDomainSize(domainSize : number) {
            this.d_domainSize = domainSize;
        }

        public getDomainSize() : number {
            return this.d_domainSize;
        }

        public createPartListGeomObjects() {
            this.inputPanel.createPartListGeomObjects();
        }
    }
}

