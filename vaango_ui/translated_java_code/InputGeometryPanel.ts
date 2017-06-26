"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class InputGeometryPanel extends JPanel implements ItemListener {
        /**
         * 
         */
        private static serialVersionUID : number = -1993980566972829798;

        private d_domainSize : number = 0.0;

        private d_usePartList : boolean = false;

        private d_partList : ParticleList = null;

        private d_parent : GeometryPanel = null;

        private d_geomObj : Vector<GeomObject> = null;

        private d_geomPiece : Vector<GeomPiece> = null;

        private usePartListCB : JCheckBox = null;

        private createGeomObjectPanel : CreateGeomObjectPanel = null;

        private createGeomPiecePanel : CreateGeomPiecePanel = null;

        public constructor(partList : ParticleList, geomObj : Vector<GeomObject>, geomPiece : Vector<GeomPiece>, parent : GeometryPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_domainSize = 100.0;
            this.d_usePartList = false;
            this.d_partList = partList;
            this.d_geomObj = geomObj;
            this.d_geomPiece = geomPiece;
            this.d_parent = parent;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            this.usePartListCB = new JCheckBox("Use Computed Particle Distribution");
            this.usePartListCB.setSelected(false);
            this.usePartListCB.addItemListener(this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.usePartListCB, gbc);
            this.add(this.usePartListCB);
            this.createGeomPiecePanel = new CreateGeomPiecePanel(this.d_usePartList, this.d_partList, this.d_geomPiece, this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.createGeomPiecePanel, gbc);
            this.add(this.createGeomPiecePanel);
            this.createGeomObjectPanel = new CreateGeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(this.createGeomObjectPanel, gbc);
            this.add(this.createGeomObjectPanel);
        }

        public refresh() {
            if(this.d_partList == null) return;
            if(this.d_partList.size() > 0) {
                this.d_usePartList = true;
                this.d_domainSize = this.d_partList.getRVESize();
                this.updatePanels();
            }
        }

        public updatePanels() {
            this.d_parent.updatePanels();
        }

        public itemStateChanged(e : ItemEvent) {
            var source : any = e.getItemSelectable();
            if(source === this.usePartListCB) {
                if(e.getStateChange() === ItemEvent.SELECTED) {
                    this.createPartListGeomObjects();
                } else {
                    this.deletePartListGeomObjects();
                }
            }
        }

        public refreshDisplay() {
            this.d_parent.setDomainSize(this.d_domainSize);
            this.d_parent.refreshDisplayGeometryFrame();
        }

        public createPartListGeomObjects() {
            this.d_usePartList = true;
            var simComponent : string = this.d_parent.getSimComponent();
            this.createGeomPiecePanel.setEnabled(false);
            this.createGeomPiecePanel.setVisible(false);
            this.createGeomObjectPanel.usePartList(this.d_usePartList);
            this.createGeomObjectPanel.disableCreate();
            this.createGeomObjectPanel.disableDelete();
            if(this.d_partList != null) {
                this.d_domainSize = this.d_partList.getRVESize();
                this.createGeomPiecePanel.createPartListGeomPiece(simComponent);
                this.createGeomObjectPanel.addPartListGeomObjectPanel();
                this.refreshDisplay();
            }
        }

        public deletePartListGeomObjects() {
            this.d_usePartList = false;
            this.createGeomPiecePanel.setVisible(true);
            this.createGeomPiecePanel.setEnabled(true);
            this.createGeomObjectPanel.usePartList(this.d_usePartList);
            this.createGeomObjectPanel.enableCreate();
            this.createGeomObjectPanel.enableDelete();
            if(this.d_partList != null) {
                this.d_domainSize = 100.0;
                this.createGeomPiecePanel.deletePartListGeomPiece();
                this.createGeomObjectPanel.removePartListGeomObjectPanel();
                this.refreshDisplay();
            }
        }
    }
}

