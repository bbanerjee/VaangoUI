"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class CreateGeomObjectPanel extends JPanel implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = 213838650361477373;

        private d_usePartList : boolean = false;

        private d_partList : ParticleList = null;

        private d_geomObj : Vector<GeomObject> = null;

        private d_geomPiece : Vector<GeomPiece> = null;

        private d_parent : InputGeometryPanel = null;

        private addButton : JButton = null;

        private delButton : JButton = null;

        private geomObjectTabPane : JTabbedPane = null;

        public constructor(usePartList : boolean, partList : ParticleList, geomObj : Vector<GeomObject>, geomPiece : Vector<GeomPiece>, parent : InputGeometryPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_usePartList = false;
            this.d_partList = partList;
            this.d_geomObj = geomObj;
            this.d_geomPiece = geomPiece;
            this.d_parent = parent;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var panel : JPanel = new JPanel(new GridLayout(1, 0));
            this.addButton = new JButton("Create Geom Object");
            this.addButton.setActionCommand("add");
            this.addButton.addActionListener(this);
            panel.add(this.addButton);
            this.delButton = new JButton("Delete Geom Object");
            this.delButton.setActionCommand("del");
            this.delButton.addActionListener(this);
            panel.add(this.delButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel, gbc);
            this.add(panel);
            this.geomObjectTabPane = new JTabbedPane();
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.geomObjectTabPane, gbc);
            this.add(this.geomObjectTabPane);
        }

        public usePartList(flag : boolean) {
            this.d_usePartList = flag;
        }

        public disableCreate() {
            this.addButton.setEnabled(false);
        }

        public disableDelete() {
            this.delButton.setEnabled(false);
        }

        public enableCreate() {
            this.addButton.setEnabled(true);
        }

        public enableDelete() {
            this.delButton.setEnabled(true);
        }

        public addPartListGeomObjectPanel() {
            this.d_usePartList = true;
            var particleTabName : string = <string>new String("Particles");
            var particleGeomObjectPanel : GeomObjectPanel = new GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
            var numPart : number = this.d_partList.size();
            console.info("Number of particles = " + numPart + "Number of geom pieces = " + this.d_geomPiece.size());
            for(var ii : number = 0; ii < numPart; ++ii) {
                var gp : GeomPiece = this.d_geomPiece.elementAt(ii);
                particleGeomObjectPanel.addGeomPiece(gp);
            }
            particleGeomObjectPanel.selectAllGeomPiece();
            this.geomObjectTabPane.addTab(particleTabName, particleGeomObjectPanel);
            var remainderTabName : string = <string>new String("Outside Particles");
            var remainderGeomObjectPanel : GeomObjectPanel = new GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
            var gpOuter : GeomPiece = this.d_geomPiece.elementAt(numPart);
            remainderGeomObjectPanel.addGeomPiece(gpOuter);
            remainderGeomObjectPanel.selectAllGeomPiece();
            this.geomObjectTabPane.addTab(remainderTabName, remainderGeomObjectPanel);
            var partThick : number = this.d_partList.getParticle(0).getThickness();
            if(partThick > 0.0) {
                var insideTabName : string = <string>new String("Inside Particles");
                var insideGeomObjectPanel : GeomObjectPanel = new GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
                var gpInner : GeomPiece = this.d_geomPiece.elementAt(numPart + 1);
                insideGeomObjectPanel.addGeomPiece(gpInner);
                insideGeomObjectPanel.selectAllGeomPiece();
                this.geomObjectTabPane.addTab(insideTabName, insideGeomObjectPanel);
            }
            this.validate();
            this.updatePanels();
        }

        public removePartListGeomObjectPanel() {
            this.d_usePartList = false;
            if(this.d_geomObj.size() > 0) {
                this.d_geomObj.removeAllElements();
            }
            this.geomObjectTabPane.removeAll();
            this.validate();
            this.updatePanels();
        }

        public actionPerformed(e : ActionEvent) {
            if(e.getActionCommand() === "add") {
                var tabName : string = <string>new String("Object");
                var geomObjectPanel : GeomObjectPanel = new GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
                this.geomObjectTabPane.addTab(tabName, geomObjectPanel);
                this.validate();
                this.updatePanels();
            } else if(e.getActionCommand() === "del") {
                var index : number = this.geomObjectTabPane.getSelectedIndex();
                this.geomObjectTabPane.removeTabAt(index);
                if(this.d_geomObj.size() > 0) {
                    this.d_geomObj.removeElementAt(index);
                }
                this.validate();
                this.updatePanels();
            }
        }

        public updatePanels() {
            this.d_parent.updatePanels();
        }
    }
}

