"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class GeomPiecePanel extends JPanel implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -5246223015641425017;

        private d_parent : CreateGeomPiecePanel = null;

        private geomComB : JComboBox<string> = null;

        private gb : GridBagLayout = null;

        private gbc : GridBagConstraints = null;

        public constructor(parent : CreateGeomPiecePanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_parent = parent;
            this.gb = new GridBagLayout();
            this.gbc = new GridBagConstraints();
            this.setLayout(this.gb);
            var geomLabel : JLabel = new JLabel("Geometry Piece Type");
            UintahGui.setConstraints(this.gbc, 0, 0);
            this.gb.setConstraints(geomLabel, this.gbc);
            this.add(geomLabel);
            this.geomComB = new JComboBox<string>();
            this.geomComB.addItem("Box");
            this.geomComB.addItem("Cylinder");
            this.geomComB.addItem("Sphere");
            this.geomComB.addItem("Cone");
            this.geomComB.addActionListener(this);
            UintahGui.setConstraints(this.gbc, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
            this.gb.setConstraints(this.geomComB, this.gbc);
            this.add(this.geomComB);
        }

        public actionPerformed(e : ActionEvent) {
            var source : JComboBox<string> = <JComboBox<string>>e.getSource();
            var item : string = <string>source.getSelectedItem();
            if((item === <string>new String("Box"))) {
                var boxPanel : BoxGeomPiecePanel = new BoxGeomPiecePanel(this);
                UintahGui.setConstraints(this.gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
                this.gb.setConstraints(boxPanel, this.gbc);
                this.add(boxPanel);
                this.validate();
                this.updatePanels();
            } else if((item === <string>new String("Cylinder"))) {
            } else if((item === <string>new String("Sphere"))) {
            } else if((item === <string>new String("Cone"))) {
            }
        }

        public updatePanels() {
            this.d_parent.updatePanels();
        }

        public addGeomPiece(piece : GeomPiece) {
            this.d_parent.addGeomPiece(piece);
        }
    }
}

