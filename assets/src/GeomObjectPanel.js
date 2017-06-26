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
    var Vector = java.util.Vector;
    var GeomObjectPanel = (function (_super) {
        __extends(GeomObjectPanel, _super);
        function GeomObjectPanel(usePartList, partList, geomObj, geomPiece, parent) {
            var _this = _super.call(this) || this;
            _this.d_usePartList = false;
            _this.d_geomObj = null;
            _this.d_geomPiece = null;
            _this.d_parent = null;
            _this.d_numLocalGeomObject = 0;
            _this.d_localGeomObjectStartIndex = 0;
            _this.d_localGeomPiece = null;
            _this.d_T = 0.0;
            _this.d_p = 0.0;
            _this.d_rho = 0.0;
            _this.nameEntry = null;
            _this.resEntry = null;
            _this.velEntry = null;
            _this.tempEntry = null;
            _this.presEntry = null;
            _this.rhoEntry = null;
            _this.geomPieceList = null;
            _this.geomPieceListModel = null;
            _this.geomPieceSP = null;
            _this.acceptButton = null;
            _this.nameLabel = null;
            _this.resLabel = null;
            _this.velLabel = null;
            _this.tempLabel = null;
            _this.rhoLabel = null;
            _this.presLabel = null;
            _this.geomPieceLabel = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_usePartList = usePartList;
            _this.d_geomObj = geomObj;
            _this.d_geomPiece = geomPiece;
            _this.d_numLocalGeomObject = 0;
            _this.d_localGeomObjectStartIndex = 0;
            _this.d_localGeomPiece = new Vector();
            _this.d_parent = parent;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var fill = GridBagConstraints.BOTH;
            var xgap = 5;
            var ygap = 0;
            _this.nameLabel = new JLabel("Name");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
            gb.setConstraints(_this.nameLabel, gbc);
            _this.add(_this.nameLabel);
            _this.nameEntry = new JTextField("Geometry Object", 10);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
            gb.setConstraints(_this.nameEntry, gbc);
            _this.add(_this.nameEntry);
            _this.resLabel = new JLabel("Particles/Cell");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 1);
            gb.setConstraints(_this.resLabel, gbc);
            _this.add(_this.resLabel);
            _this.resEntry = new vaango_ui.IntegerVectorField(2, 2, 2, 5);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
            gb.setConstraints(_this.resEntry, gbc);
            _this.add(_this.resEntry);
            _this.velLabel = new JLabel("Velocity (m/s)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 2);
            gb.setConstraints(_this.velLabel, gbc);
            _this.add(_this.velLabel);
            _this.velEntry = new vaango_ui.DecimalVectorField(0.0, 0.0, 0.0, 5);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 2);
            gb.setConstraints(_this.velEntry, gbc);
            _this.add(_this.velEntry);
            _this.d_T = 300.0;
            _this.d_p = 101325.0;
            var gamma = 1.4;
            var cv = 716;
            _this.d_rho = _this.d_p / ((gamma - 1.0) * cv * _this.d_T);
            _this.tempLabel = new JLabel("Temperature (K)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 3);
            gb.setConstraints(_this.tempLabel, gbc);
            _this.add(_this.tempLabel);
            _this.tempEntry = new vaango_ui.DecimalField(_this.d_T, 5);
            _this.tempEntry.addActionListener(_this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 3);
            gb.setConstraints(_this.tempEntry, gbc);
            _this.add(_this.tempEntry);
            _this.presLabel = new JLabel("Pressure (Pa)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 4);
            gb.setConstraints(_this.presLabel, gbc);
            _this.add(_this.presLabel);
            _this.presEntry = new vaango_ui.DecimalField(_this.d_p, 5);
            _this.presEntry.addActionListener(_this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 4);
            gb.setConstraints(_this.presEntry, gbc);
            _this.add(_this.presEntry);
            _this.rhoLabel = new JLabel("Density (kg/m3)");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 5);
            gb.setConstraints(_this.rhoLabel, gbc);
            _this.add(_this.rhoLabel);
            _this.rhoEntry = new vaango_ui.DecimalField(_this.d_rho, 5);
            _this.rhoEntry.addActionListener(_this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 5);
            gb.setConstraints(_this.rhoEntry, gbc);
            _this.add(_this.rhoEntry);
            _this.geomPieceLabel = new JLabel("Geometry Pieces");
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 6);
            gb.setConstraints(_this.geomPieceLabel, gbc);
            _this.add(_this.geomPieceLabel);
            _this.geomPieceListModel = new DefaultListModel();
            _this.geomPieceList = new JList(_this.geomPieceListModel);
            _this.geomPieceList.setVisibleRowCount(4);
            _this.geomPieceSP = new JScrollPane(_this.geomPieceList);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 6);
            gb.setConstraints(_this.geomPieceSP, gbc);
            _this.add(_this.geomPieceSP);
            if (_this.d_usePartList) {
                _this.geomPieceLabel.setEnabled(false);
                _this.geomPieceSP.setEnabled(false);
            }
            else {
                _this.geomPieceLabel.setEnabled(true);
                _this.geomPieceSP.setEnabled(true);
            }
            _this.acceptButton = new JButton("Accept");
            _this.acceptButton.setActionCommand("accept");
            _this.acceptButton.addActionListener(_this);
            UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 7);
            gb.setConstraints(_this.acceptButton, gbc);
            _this.add(_this.acceptButton);
            return _this;
        }
        GeomObjectPanel.prototype.actionPerformed = function (e) {
            var source = e.getSource();
            if ((source === this.tempEntry)) {
                var gamma = 1.4;
                var cv = 716;
                this.d_T = this.tempEntry.getValue();
                this.d_p = this.presEntry.getValue();
                this.d_rho = this.d_p / ((gamma - 1.0) * cv * this.d_T);
                this.rhoEntry.setValue(this.d_rho);
            }
            else if ((source === this.presEntry)) {
                var gamma = 1.4;
                var cv = 716;
                this.d_T = this.tempEntry.getValue();
                this.d_p = this.presEntry.getValue();
                this.d_rho = this.d_p / ((gamma - 1.0) * cv * this.d_T);
                this.rhoEntry.setValue(this.d_rho);
            }
            else if ((source === this.rhoEntry)) {
                var gamma = 1.4;
                var cv = 716;
                this.d_T = this.tempEntry.getValue();
                this.d_rho = this.rhoEntry.getValue();
                this.d_p = (gamma - 1.0) * cv * this.d_T * this.d_rho;
                this.presEntry.setValue(this.d_p);
            }
            else {
                var command = e.getActionCommand();
                if ((command === new String("accept"))) {
                    if (this.d_usePartList) {
                        this.createPartListGeomObject();
                    }
                    else {
                        var go = new vaango_ui.GeomObject();
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
        };
        GeomObjectPanel.prototype.createPartListGeomObject = function () {
            if (this.d_numLocalGeomObject > 0) {
                for (var ii = this.d_localGeomObjectStartIndex; ii < this.d_numLocalGeomObject; ++ii) {
                    this.d_geomObj.removeElementAt(ii);
                    var go = new vaango_ui.GeomObject();
                    go.setName(this.geomPieceListModel.elementAt(ii));
                    go.setResolution(this.resEntry.x(), this.resEntry.y(), this.resEntry.z());
                    go.setVelocity(this.velEntry.x(), this.velEntry.y(), this.velEntry.z());
                    go.setTemperature(this.tempEntry.getValue());
                    go.setDensity(this.rhoEntry.getValue());
                    go.setPressure(this.presEntry.getValue());
                    go.addGeomPiece(this.d_localGeomPiece.elementAt(ii));
                    this.d_geomObj.add(ii, go);
                }
            }
            else {
                this.d_localGeomObjectStartIndex = this.d_geomObj.size();
                var numGeomPiece = this.d_localGeomPiece.size();
                for (var ii = 0; ii < numGeomPiece; ++ii) {
                    var go = new vaango_ui.GeomObject();
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
        };
        GeomObjectPanel.prototype.usePartList = function (flag) {
            this.d_usePartList = flag;
        };
        GeomObjectPanel.prototype.addGeomPiece = function (geomPiece) {
            this.d_localGeomPiece.addElement(geomPiece);
            this.geomPieceListModel.addElement(geomPiece.getName());
        };
        GeomObjectPanel.prototype.removeGeomPiece = function (geomPiece) {
            for (var ii = 0; ii < this.d_localGeomPiece.size(); ++ii) {
                var gp = this.d_localGeomPiece.elementAt(ii);
                if (gp.equals(geomPiece)) {
                    this.d_localGeomPiece.removeElementAt(ii);
                    this.geomPieceListModel.removeElementAt(ii);
                }
            }
        };
        GeomObjectPanel.prototype.selectAllGeomPiece = function () {
            var numGeomPiece = this.geomPieceListModel.size();
            this.geomPieceList.setSelectionInterval(0, numGeomPiece);
        };
        GeomObjectPanel.prototype.updatePanels = function () {
            this.d_parent.updatePanels();
        };
        return GeomObjectPanel;
    }(JPanel));
    GeomObjectPanel.serialVersionUID = 7580943145107407310;
    vaango_ui.GeomObjectPanel = GeomObjectPanel;
})(vaango_ui || (vaango_ui = {}));
