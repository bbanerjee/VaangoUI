"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class RigidMaterialPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = 7038570409615456983;

        private bulkEntry : DecimalField = null;

        private shearEntry : DecimalField = null;

        private cteEntry : DecimalField = null;

        public constructor() {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var bulkLabel : JLabel = new JLabel("Bulk Modulus");
            UintahGui.setConstraints(gbc, 0, 0);
            gb.setConstraints(bulkLabel, gbc);
            this.add(bulkLabel);
            this.bulkEntry = new DecimalField(1.3E11, 9, true);
            UintahGui.setConstraints(gbc, 1, 0);
            gb.setConstraints(this.bulkEntry, gbc);
            this.add(this.bulkEntry);
            var shearLabel : JLabel = new JLabel("Shear Modulus");
            UintahGui.setConstraints(gbc, 0, 1);
            gb.setConstraints(shearLabel, gbc);
            this.add(shearLabel);
            this.shearEntry = new DecimalField(4.6E10, 9, true);
            UintahGui.setConstraints(gbc, 1, 1);
            gb.setConstraints(this.shearEntry, gbc);
            this.add(this.shearEntry);
            var cteLabel : JLabel = new JLabel("Coeff. of Thermal Expansion");
            UintahGui.setConstraints(gbc, 0, 2);
            gb.setConstraints(cteLabel, gbc);
            this.add(cteLabel);
            this.cteEntry = new DecimalField(1.0E-5, 9, true);
            UintahGui.setConstraints(gbc, 1, 2);
            gb.setConstraints(this.cteEntry, gbc);
            this.add(this.cteEntry);
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            pw.println(tab + "<bulk_modulus> " + this.bulkEntry.getValue() + " </bulk_modulus>");
            pw.println(tab + "<shear_modulus> " + this.shearEntry.getValue() + " </shear_modulus>");
            pw.println(tab + "<coeff_thermal_expansion> " + this.cteEntry.getValue() + " </coeff_thermal_expansion>");
        }
    }
}

