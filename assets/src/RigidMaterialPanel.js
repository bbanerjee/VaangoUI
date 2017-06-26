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
    var RigidMaterialPanel = (function (_super) {
        __extends(RigidMaterialPanel, _super);
        function RigidMaterialPanel() {
            var _this = _super.call(this) || this;
            _this.bulkEntry = null;
            _this.shearEntry = null;
            _this.cteEntry = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var bulkLabel = new JLabel("Bulk Modulus");
            UintahGui.setConstraints(gbc, 0, 0);
            gb.setConstraints(bulkLabel, gbc);
            _this.add(bulkLabel);
            _this.bulkEntry = new vaango_ui.DecimalField(1.3E11, 9, true);
            UintahGui.setConstraints(gbc, 1, 0);
            gb.setConstraints(_this.bulkEntry, gbc);
            _this.add(_this.bulkEntry);
            var shearLabel = new JLabel("Shear Modulus");
            UintahGui.setConstraints(gbc, 0, 1);
            gb.setConstraints(shearLabel, gbc);
            _this.add(shearLabel);
            _this.shearEntry = new vaango_ui.DecimalField(4.6E10, 9, true);
            UintahGui.setConstraints(gbc, 1, 1);
            gb.setConstraints(_this.shearEntry, gbc);
            _this.add(_this.shearEntry);
            var cteLabel = new JLabel("Coeff. of Thermal Expansion");
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(cteLabel, gbc);
            _this.add(cteLabel);
            _this.cteEntry = new vaango_ui.DecimalField(1.0E-5, 9, true);
            UintahGui.setConstraints(gbc, 1, 2);
            gb.setConstraints(_this.cteEntry, gbc);
            _this.add(_this.cteEntry);
            return _this;
        }
        /**
         * Write the contents out in Uintah format
         */
        RigidMaterialPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            pw.println(tab + "<bulk_modulus> " + this.bulkEntry.getValue() + " </bulk_modulus>");
            pw.println(tab + "<shear_modulus> " + this.shearEntry.getValue() + " </shear_modulus>");
            pw.println(tab + "<coeff_thermal_expansion> " + this.cteEntry.getValue() + " </coeff_thermal_expansion>");
        };
        return RigidMaterialPanel;
    }(JPanel));
    /**
     *
     */
    RigidMaterialPanel.serialVersionUID = 7038570409615456983;
    vaango_ui.RigidMaterialPanel = RigidMaterialPanel;
})(vaango_ui || (vaango_ui = {}));