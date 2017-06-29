"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class BoxGeomPiecePanel extends JPanel implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -1153459331824259741;

        private d_box : BoxGeomPiece = null;

        private d_parent : GeomPiecePanel = null;

        nameEntry : JTextField = null;

        minEntry : DecimalVectorField = null;

        maxEntry : DecimalVectorField = null;

        acceptButton : JButton = null;

        public constructor(parent : GeomPiecePanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_box = new BoxGeomPiece();
            this.d_parent = parent;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var fill : number = GridBagConstraints.BOTH;
            var xgap : number = 5;
            var ygap : number = 0;
            var nameLabel : JLabel = new JLabel("Geom Piece Name");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
            gb.setConstraints(nameLabel, gbc);
            this.add(nameLabel);
            this.nameEntry = new JTextField("Box", 20);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
            gb.setConstraints(this.nameEntry, gbc);
            this.add(this.nameEntry);
            var minLabel : JLabel = new JLabel("Lower Left Corner");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 1);
            gb.setConstraints(minLabel, gbc);
            this.add(minLabel);
            this.minEntry = new DecimalVectorField(0.0, 0.0, 0.0, 5, true);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
            gb.setConstraints(this.minEntry, gbc);
            this.add(this.minEntry);
            var maxLabel : JLabel = new JLabel("Upper Right Corner");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 2);
            gb.setConstraints(maxLabel, gbc);
            this.add(maxLabel);
            this.maxEntry = new DecimalVectorField(0.0, 0.0, 0.0, 5, true);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 2);
            gb.setConstraints(this.maxEntry, gbc);
            this.add(this.maxEntry);
            this.acceptButton = new JButton("Accept");
            this.acceptButton.setActionCommand("accept");
            this.acceptButton.addActionListener(this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 3);
            gb.setConstraints(this.acceptButton, gbc);
            this.add(this.acceptButton);
        }

        public actionPerformed(e : ActionEvent) {
            if(e.getActionCommand() === "accept") {
                var name : string = this.nameEntry.getText();
                var xmin : number = this.minEntry.x();
                var ymin : number = this.minEntry.y();
                var zmin : number = this.minEntry.z();
                var xmax : number = this.maxEntry.x();
                var ymax : number = this.maxEntry.y();
                var zmax : number = this.maxEntry.z();
                var min : Point = new Point(xmin, ymin, zmin);
                var max : Point = new Point(xmax, ymax, zmax);
                this.d_box.set(name, min, max);
                this.d_parent.addGeomPiece(this.d_box);
            }
        }
    }
}

