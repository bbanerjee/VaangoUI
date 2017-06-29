"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class DecimalVectorField extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = -1635086378274896859;

        private xLabel : JLabel = null;

        private yLabel : JLabel = null;

        private zLabel : JLabel = null;

        private xEntry : DecimalField = null;

        private yEntry : DecimalField = null;

        private zEntry : DecimalField = null;

        public constructor(xval? : any, yval? : any, zval? : any, columns? : any, exp? : any) {
            if(((typeof xval === 'number') || xval === null) && ((typeof yval === 'number') || yval === null) && ((typeof zval === 'number') || zval === null) && ((typeof columns === 'number') || columns === null) && ((typeof exp === 'boolean') || exp === null)) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                (() => {
                    var gb : GridBagLayout = new GridBagLayout();
                    var gbc : GridBagConstraints = new GridBagConstraints();
                    this.setLayout(gb);
                    this.xLabel = new JLabel("x");
                    this.setConstraints(gbc, 0, 0);
                    gb.setConstraints(this.xLabel, gbc);
                    this.add(this.xLabel);
                    this.xEntry = new DecimalField(xval, columns, exp);
                    this.setConstraints(gbc, 1, 0);
                    gb.setConstraints(this.xEntry, gbc);
                    this.add(this.xEntry);
                    this.yLabel = new JLabel("y");
                    this.setConstraints(gbc, 2, 0);
                    gb.setConstraints(this.yLabel, gbc);
                    this.add(this.yLabel);
                    this.yEntry = new DecimalField(yval, columns, exp);
                    this.setConstraints(gbc, 3, 0);
                    gb.setConstraints(this.yEntry, gbc);
                    this.add(this.yEntry);
                    this.zLabel = new JLabel("z");
                    this.setConstraints(gbc, 4, 0);
                    gb.setConstraints(this.zLabel, gbc);
                    this.add(this.zLabel);
                    this.zEntry = new DecimalField(zval, columns, exp);
                    this.setConstraints(gbc, 5, 0);
                    gb.setConstraints(this.zEntry, gbc);
                    this.add(this.zEntry);
                })();
            } else if(((typeof xval === 'number') || xval === null) && ((typeof yval === 'number') || yval === null) && ((typeof zval === 'number') || zval === null) && ((typeof columns === 'number') || columns === null) && exp === undefined) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                (() => {
                    var gb : GridBagLayout = new GridBagLayout();
                    var gbc : GridBagConstraints = new GridBagConstraints();
                    this.setLayout(gb);
                    this.xLabel = new JLabel("x");
                    this.setConstraints(gbc, 0, 0);
                    gb.setConstraints(this.xLabel, gbc);
                    this.add(this.xLabel);
                    this.xEntry = new DecimalField(xval, columns);
                    this.setConstraints(gbc, 1, 0);
                    gb.setConstraints(this.xEntry, gbc);
                    this.add(this.xEntry);
                    this.yLabel = new JLabel("y");
                    this.setConstraints(gbc, 2, 0);
                    gb.setConstraints(this.yLabel, gbc);
                    this.add(this.yLabel);
                    this.yEntry = new DecimalField(yval, columns);
                    this.setConstraints(gbc, 3, 0);
                    gb.setConstraints(this.yEntry, gbc);
                    this.add(this.yEntry);
                    this.zLabel = new JLabel("z");
                    this.setConstraints(gbc, 4, 0);
                    gb.setConstraints(this.zLabel, gbc);
                    this.add(this.zLabel);
                    this.zEntry = new DecimalField(zval, columns);
                    this.setConstraints(gbc, 5, 0);
                    gb.setConstraints(this.zEntry, gbc);
                    this.add(this.zEntry);
                })();
            } else throw new Error('invalid overload');
        }

        public x() : number {
            return this.xEntry.getValue();
        }

        public y() : number {
            return this.yEntry.getValue();
        }

        public z() : number {
            return this.zEntry.getValue();
        }

        public setEnabled(enable : boolean) {
            if(enable) {
                this.xLabel.setEnabled(true);
                this.yLabel.setEnabled(true);
                this.zLabel.setEnabled(true);
                this.xEntry.setEnabled(true);
                this.yEntry.setEnabled(true);
                this.zEntry.setEnabled(true);
            } else {
                this.xLabel.setEnabled(false);
                this.yLabel.setEnabled(false);
                this.zLabel.setEnabled(false);
                this.xEntry.setEnabled(false);
                this.yEntry.setEnabled(false);
                this.zEntry.setEnabled(false);
            }
        }

        private setConstraints(c : GridBagConstraints, col : number, row : number) {
            c.fill = GridBagConstraints.NONE;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets : Insets = new Insets(5, 5, 5, 5);
            c.insets = insets;
        }
    }
}

