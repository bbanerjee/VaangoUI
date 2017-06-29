"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Format = java.text.Format;

    import DecimalFormat = java.text.DecimalFormat;

    import ParseException = java.text.ParseException;

    export class DecimalField extends JTextField {
        /**
         * 
         */
        private static serialVersionUID : number = -3565097307778821744;

        formatter : DecimalFormat;

        public constructor(value? : any, columns? : any, exp? : any) {
            if(((typeof value === 'number') || value === null) && ((typeof columns === 'number') || columns === null) && ((typeof exp === 'boolean') || exp === null)) {
                super(columns);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.SwingConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
                (() => {
                    var pattern : string = "#0.0#";
                    var patternExp : string = "0.0##E00";
                    if(exp) {
                        this.formatter = new DecimalFormat(patternExp);
                    } else {
                        this.formatter = new DecimalFormat(pattern);
                    }
                    this.setDocument(new DecimalField.RealNumberDocument(this, this.formatter));
                    this.setValue(value);
                })();
            } else if(((typeof value === 'number') || value === null) && ((typeof columns === 'number') || columns === null) && exp === undefined) {
                super(columns);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.SwingConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
                (() => {
                    this.formatter = new DecimalFormat();
                    this.formatter.applyPattern(<string>new String("#0.0#"));
                    this.setDocument(new DecimalField.RealNumberDocument(this, this.formatter));
                    this.setValue(value);
                })();
            } else throw new Error('invalid overload');
        }

        public getValue() : number {
            var retVal : number = 0.0;
            try {
                var input : string = this.getText().toUpperCase();
                retVal = this.formatter.parse(input).doubleValue();
            } catch(e) {
            };
            return retVal;
        }

        public setValue$double(value : number) {
            try {
                var text : string = this.formatter.format(value);
                this.setText(text);
            } catch(e) {
                console.info("Cannot format " + value);
            };
        }

        public setValue(value? : any) : any {
            if(((typeof value === 'string') || value === null)) {
                return <any>(() => {
                    this.setText(value);
                })();
            } else if(((typeof value === 'number') || value === null)) {
                return <any>this.setValue$double(value);
            } else throw new Error('invalid overload');
        }

        createDefaultModel() : Document {
            return new DecimalField.RealNumberDocument(this, this.formatter);
        }
    }

    export namespace DecimalField {

        export class RealNumberDocument extends PlainDocument {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            format : Format;

            public constructor(__parent: any, f : Format) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.text.Document","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 4586901351110216371;
                this.format = f;
            }

            public insertString(offs : number, str : string, a : AttributeSet) {
                var currentText : string = this.getText(0, this.getLength());
                var beforeOffset : string = currentText.substring(0, offs);
                var afterOffset : string = currentText.substring(offs, currentText.length);
                var proposedResult : string = beforeOffset + str + afterOffset;
                try {
                    this.format.parseObject(proposedResult);
                    super.insertString(offs, str, a);
                } catch(e) {
                };
            }

            public remove(offs : number, len : number) {
                var currentText : string = this.getText(0, this.getLength());
                var beforeOffset : string = currentText.substring(0, offs);
                var afterOffset : string = currentText.substring(len + offs, currentText.length);
                var proposedResult : string = beforeOffset + afterOffset;
                try {
                    if(proposedResult.length !== 0) this.format.parseObject(proposedResult);
                    super.remove(offs, len);
                } catch(e) {
                };
            }
        }
    }

}

