"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import NumberFormat = java.text.NumberFormat;

    import ParseException = java.text.ParseException;

    export class IntegerField extends JTextField {
        /**
         * 
         */
        private static serialVersionUID : number = 813120457405528594;

        private integerFormatter : NumberFormat;

        public constructor(value : number, columns : number) {
            super(columns);
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.SwingConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.integerFormatter = NumberFormat.getNumberInstance();
            this.integerFormatter.setParseIntegerOnly(true);
            this.setValue(value);
        }

        public getValue() : number {
            var retVal : number = 0;
            try {
                retVal = this.integerFormatter.parse(this.getText()).intValue();
            } catch(e) {
            };
            return retVal;
        }

        public setValue(value : number) {
            this.setText(this.integerFormatter.format(value));
        }

        createDefaultModel() : Document {
            return new IntegerField.IntegerDocument(this);
        }
    }

    export namespace IntegerField {

        export class IntegerDocument extends PlainDocument {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            public insertString(offs : number, src : string, a : AttributeSet) {
                var source : string[] = /* toCharArray */(src).split('');
                var result : string[] = new Array(source.length);
                var j : number = 0;
                for(var i : number = 0; i < result.length; i++) {
                    if(javaemul.internal.CharacterHelper.isDigit(source[i])) result[j++] = source[i];
                }
                super.insertString(offs, <string>((str, index, len) => str.substring(index, index + len))((result).join(''), 0, j), a);
            }

            constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.text.Document","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 2199993368669400908;
            }
        }
    }

}

