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
    var CreateGeomObjectPanel = (function (_super) {
        __extends(CreateGeomObjectPanel, _super);
        function CreateGeomObjectPanel(usePartList, partList, geomObj, geomPiece, parent) {
            var _this = _super.call(this) || this;
            _this.d_usePartList = false;
            _this.d_partList = null;
            _this.d_geomObj = null;
            _this.d_geomPiece = null;
            _this.d_parent = null;
            _this.addButton = null;
            _this.delButton = null;
            _this.geomObjectTabPane = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_usePartList = false;
            _this.d_partList = partList;
            _this.d_geomObj = geomObj;
            _this.d_geomPiece = geomPiece;
            _this.d_parent = parent;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var panel = new JPanel(new GridLayout(1, 0));
            _this.addButton = new JButton("Create Geom Object");
            _this.addButton.setActionCommand("add");
            _this.addButton.addActionListener(_this);
            panel.add(_this.addButton);
            _this.delButton = new JButton("Delete Geom Object");
            _this.delButton.setActionCommand("del");
            _this.delButton.addActionListener(_this);
            panel.add(_this.delButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel, gbc);
            _this.add(panel);
            _this.geomObjectTabPane = new JTabbedPane();
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.geomObjectTabPane, gbc);
            _this.add(_this.geomObjectTabPane);
            return _this;
        }
        CreateGeomObjectPanel.prototype.usePartList = function (flag) {
            this.d_usePartList = flag;
        };
        CreateGeomObjectPanel.prototype.disableCreate = function () {
            this.addButton.setEnabled(false);
        };
        CreateGeomObjectPanel.prototype.disableDelete = function () {
            this.delButton.setEnabled(false);
        };
        CreateGeomObjectPanel.prototype.enableCreate = function () {
            this.addButton.setEnabled(true);
        };
        CreateGeomObjectPanel.prototype.enableDelete = function () {
            this.delButton.setEnabled(true);
        };
        CreateGeomObjectPanel.prototype.addPartListGeomObjectPanel = function () {
            this.d_usePartList = true;
            var particleTabName = new String("Particles");
            var particleGeomObjectPanel = new vaango_ui.GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
            var numPart = this.d_partList.size();
            console.info("Number of particles = " + numPart + "Number of geom pieces = " + this.d_geomPiece.size());
            for (var ii = 0; ii < numPart; ++ii) {
                var gp = this.d_geomPiece.elementAt(ii);
                particleGeomObjectPanel.addGeomPiece(gp);
            }
            particleGeomObjectPanel.selectAllGeomPiece();
            this.geomObjectTabPane.addTab(particleTabName, particleGeomObjectPanel);
            var remainderTabName = new String("Outside Particles");
            var remainderGeomObjectPanel = new vaango_ui.GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
            var gpOuter = this.d_geomPiece.elementAt(numPart);
            remainderGeomObjectPanel.addGeomPiece(gpOuter);
            remainderGeomObjectPanel.selectAllGeomPiece();
            this.geomObjectTabPane.addTab(remainderTabName, remainderGeomObjectPanel);
            var partThick = this.d_partList.getParticle(0).getThickness();
            if (partThick > 0.0) {
                var insideTabName = new String("Inside Particles");
                var insideGeomObjectPanel = new vaango_ui.GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
                var gpInner = this.d_geomPiece.elementAt(numPart + 1);
                insideGeomObjectPanel.addGeomPiece(gpInner);
                insideGeomObjectPanel.selectAllGeomPiece();
                this.geomObjectTabPane.addTab(insideTabName, insideGeomObjectPanel);
            }
            this.validate();
            this.updatePanels();
        };
        CreateGeomObjectPanel.prototype.removePartListGeomObjectPanel = function () {
            this.d_usePartList = false;
            if (this.d_geomObj.size() > 0) {
                this.d_geomObj.removeAllElements();
            }
            this.geomObjectTabPane.removeAll();
            this.validate();
            this.updatePanels();
        };
        CreateGeomObjectPanel.prototype.actionPerformed = function (e) {
            if (e.getActionCommand() === "add") {
                var tabName = new String("Object");
                var geomObjectPanel = new vaango_ui.GeomObjectPanel(this.d_usePartList, this.d_partList, this.d_geomObj, this.d_geomPiece, this);
                this.geomObjectTabPane.addTab(tabName, geomObjectPanel);
                this.validate();
                this.updatePanels();
            }
            else if (e.getActionCommand() === "del") {
                var index = this.geomObjectTabPane.getSelectedIndex();
                this.geomObjectTabPane.removeTabAt(index);
                if (this.d_geomObj.size() > 0) {
                    this.d_geomObj.removeElementAt(index);
                }
                this.validate();
                this.updatePanels();
            }
        };
        CreateGeomObjectPanel.prototype.updatePanels = function () {
            this.d_parent.updatePanels();
        };
        return CreateGeomObjectPanel;
    }(JPanel));
    /**
     *
     */
    CreateGeomObjectPanel.serialVersionUID = 213838650361477373;
    vaango_ui.CreateGeomObjectPanel = CreateGeomObjectPanel;
})(vaango_ui || (vaango_ui = {}));
