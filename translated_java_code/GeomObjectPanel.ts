"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class GeomObjectPanel extends JPanel implements ActionListener {
        private static serialVersionUID : number = 7580943145107407310;

        private d_usePartList : boolean = false;

        private d_geomObj : Vector<GeomObject> = null;

        private d_geomPiece : Vector<any> = null;

        private d_parent : CreateGeomObjectPanel = null;

        private d_numLocalGeomObject : number = 0;

        private d_localGeomObjectStartIndex : number = 0;

        private d_localGeomPiece : Vector<GeomPiece> = null;

        private d_T : number = 0.0;

        private d_p : number = 0.0;

        private d_rho : number = 0.0;

        private nameEntry : JTextField = null;

        private resEntry : IntegerVectorField = null;

        private velEntry : DecimalVectorField = null;

        private tempEntry : DecimalField = null;

        private presEntry : DecimalField = null;

        private rhoEntry : DecimalField = null;

        private geomPieceList : JList<string> = null;

        private geomPieceListModel : DefaultListModel<string> = null;

        private geomPieceSP : JScrollPane = null;

        private acceptButton : JButton = null;

        private nameLabel : JLabel = null;

        private resLabel : JLabel = null;

        private velLabel : JLabel = null;

        private tempLabel : JLabel = null;

        private rhoLabel : JLabel = null;

        private presLabel : JLabel = null;

        private geomPieceLabel : JLabel = null;

        public constructor(usePartList : boolean, partList : ParticleList, geomObj : Vector<GeomObject>, geomPiece : Vector<any>, parent : CreateGeomObjectPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_usePartList = usePartList;
            this.d_geomObj = geomObj;
            this.d_geomPiece = geomPiece;
            this.d_numLocalGeomObject = 0;
            this.d_localGeomObjectStartIndex = 0;
            this.d_localGeomPiece = new Vector<GeomPiece>();
            this.d_parent = parent;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var fill : number = GridBagConstraints.BOTH;
            var xgap : number = 5;
            var ygap : number = 0;
            this.nameLabel = new JLabel("Name");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
            gb.setConstraints(this.nameLabel, gbc);
            this.add(this.nameLabel);
            this.nameEntry = new JTextField("Geometry Object", 10);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
            gb.setConstraints(this.nameEntry, gbc);
            this.add(this.nameEntry);
            this.resLabel = new JLabel("Particles/Cell");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 1);
            gb.setConstraints(this.resLabel, gbc);
            this.add(this.resLabel);
            this.resEntry = new IntegerVectorField(2, 2, 2, 5);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
            gb.setConstraints(this.resEntry, gbc);
            this.add(this.resEntry);
            this.velLabel = new JLabel("Velocity (m/s)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 2);
            gb.setConstraints(this.velLabel, gbc);
            this.add(this.velLabel);
            this.velEntry = new DecimalVectorField(0.0, 0.0, 0.0, 5);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 2);
            gb.setConstraints(this.velEntry, gbc);
            this.add(this.velEntry);
            this.d_T = 300.0;
            this.d_p = 101325.0;
            var gamma : number = 1.4;
            var cv : number = 716;
            this.d_rho = this.d_p / ((gamma - 1.0) * cv * this.d_T);
            this.tempLabel = new JLabel("Temperature (K)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 3);
            gb.setConstraints(this.tempLabel, gbc);
            this.add(this.tempLabel);
            this.tempEntry = new DecimalField(this.d_T, 5);
            this.tempEntry.addActionListener(this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 3);
            gb.setConstraints(this.tempEntry, gbc);
            this.add(this.tempEntry);
            this.presLabel = new JLabel("Pressure (Pa)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 4);
            gb.setConstraints(this.presLabel, gbc);
            this.add(this.presLabel);
            this.presEntry = new DecimalField(this.d_p, 5);
            this.presEntry.addActionListener(this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 4);
            gb.setConstraints(this.presEntry, gbc);
            this.add(this.presEntry);
            this.rhoLabel = new JLabel("Density (kg/m3)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 5);
            gb.setConstraints(this.rhoLabel, gbc);
            this.add(this.rhoLabel);
            this.rhoEntry = new DecimalField(this.d_rho, 5);
            this.rhoEntry.addActionListener(this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 5);
            gb.setConstraints(this.rhoEntry, gbc);
            this.add(this.rhoEntry);
            this.geomPieceLabel = new JLabel("Geometry Pieces");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 6);
            gb.setConstraints(this.geomPieceLabel, gbc);
            this.add(this.geomPieceLabel);
            this.geomPieceListModel = new DefaultListModel<string>();
            this.geomPieceList = new JList<string>(this.geomPieceListModel);
            this.geomPieceList.setVisibleRowCount(4);
            this.geomPieceSP = new JScrollPane(this.geomPieceList);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 6);
            gb.setConstraints(this.geomPieceSP, gbc);
            this.add(this.geomPieceSP);
            if(this.d_usePartList) {
                this.geomPieceLabel.setEnabled(false);
                this.geomPieceSP.setEnabled(false);
            } else {
                this.geomPieceLabel.setEnabled(true);
                this.geomPieceSP.setEnabled(true);
            }
            this.acceptButton = new JButton("Accept");
            this.acceptButton.setActionCommand("accept");
            this.acceptButton.addActionListener(this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 7);
            gb.setConstraints(this.acceptButton, gbc);
            this.add(this.acceptButton);
        }

        public actionPerformed(e : ActionEvent) {
            var source : any = e.getSource();
            if((source === this.tempEntry)) {
                var gamma : number = 1.4;
                var cv : number = 716;
                this.d_T = this.tempEntry.getValue();
                this.d_p = this.presEntry.getValue();
                this.d_rho = this.d_p / ((gamma - 1.0) * cv * this.d_T);
                this.rhoEntry.setValue(this.d_rho);
            } else if((source === this.presEntry)) {
                var gamma : number = 1.4;
                var cv : number = 716;
                this.d_T = this.tempEntry.getValue();
                this.d_p = this.presEntry.getValue();
                this.d_rho = this.d_p / ((gamma - 1.0) * cv * this.d_T);
                this.rhoEntry.setValue(this.d_rho);
            } else if((source === this.rhoEntry)) {
                var gamma : number = 1.4;
                var cv : number = 716;
                this.d_T = this.tempEntry.getValue();
                this.d_rho = this.rhoEntry.getValue();
                this.d_p = (gamma - 1.0) * cv * this.d_T * this.d_rho;
                this.presEntry.setValue(this.d_p);
            } else {
                var command : string = e.getActionCommand();
                if((command === <string>new String("accept"))) {
                    if(this.d_usePartList) {
                        this.createPartListGeomObject();
                    } else {
                        var go : GeomObject = new GeomObject();
                        go.setName(this.nameEntry.getText());
                        go.setResolution(this.resEntry.x(), this.resEntry.y(), this.resEntry.z());
                        go.setVelocity(this.velEntry.x(), this.velEntry.y(), this.velEntry.z());
                        go.setTemperature(this.tempEntry.getValue());
                        go.setDensity(this.rhoEntry.getValue());
                        go.setPressure(this.presEntry.getValue());
                        go.addGeomPiece(this.d_geomPiece.elementAt(0));
                        this.d_geomObj.addElement(go);
                        this.d_numLocalGeomObject = 1;
                        this.d_localGeomObjectStartIndex = 0;
                    }
                }
            }
        }

        private createPartListGeomObject() {
            if(this.d_numLocalGeomObject > 0) {
                for(var ii : number = this.d_localGeomObjectStartIndex; ii < this.d_numLocalGeomObject; ++ii) {
                    this.d_geomObj.removeElementAt(ii);
                    var go : GeomObject = new GeomObject();
                    go.setName(this.geomPieceListModel.elementAt(ii));
                    go.setResolution(this.resEntry.x(), this.resEntry.y(), this.resEntry.z());
                    go.setVelocity(this.velEntry.x(), this.velEntry.y(), this.velEntry.z());
                    go.setTemperature(this.tempEntry.getValue());
                    go.setDensity(this.rhoEntry.getValue());
                    go.setPressure(this.presEntry.getValue());
                    go.addGeomPiece(this.d_localGeomPiece.elementAt(ii));
                    this.d_geomObj.add(ii, go);
                }
            } else {
                this.d_localGeomObjectStartIndex = this.d_geomObj.size();
                var numGeomPiece : number = this.d_localGeomPiece.size();
                for(var ii : number = 0; ii < numGeomPiece; ++ii) {
                    var go : GeomObject = new GeomObject();
                    go.setName(this.geomPieceListModel.elementAt(ii));
                    go.setResolution(this.resEntry.x(), this.resEntry.y(), this.resEntry.z());
                    go.setVelocity(this.velEntry.x(), this.velEntry.y(), this.velEntry.z());
                    go.setTemperature(this.tempEntry.getValue());
                    go.setDensity(this.rhoEntry.getValue());
                    go.setPressure(this.presEntry.getValue());
                    go.addGeomPiece(this.d_localGeomPiece.elementAt(ii));
                    this.d_geomObj.addElement(go);
                }
                this.d_numLocalGeomObject = numGeomPiece;
            }
        }

        public usePartList(flag : boolean) {
            this.d_usePartList = flag;
        }

        public addGeomPiece(geomPiece : GeomPiece) {
            this.d_localGeomPiece.addElement(geomPiece);
            this.geomPieceListModel.addElement(geomPiece.getName());
        }

        public removeGeomPiece(geomPiece : GeomPiece) {
            for(var ii : number = 0; ii < this.d_localGeomPiece.size(); ++ii) {
                var gp : GeomPiece = this.d_localGeomPiece.elementAt(ii);
                if(gp.equals(geomPiece)) {
                    this.d_localGeomPiece.removeElementAt(ii);
                    this.geomPieceListModel.removeElementAt(ii);
                }
            }
        }

        public selectAllGeomPiece() {
            var numGeomPiece : number = this.geomPieceListModel.size();
            this.geomPieceList.setSelectionInterval(0, numGeomPiece);
        }

        public updatePanels() {
            this.d_parent.updatePanels();
        }
    }
}

