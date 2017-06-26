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
    var NumberFormat = java.text.NumberFormat;
    var IntegerField = (function (_super) {
        __extends(IntegerField, _super);
        function IntegerField(value, columns) {
            var _this = _super.call(this, columns) || this;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.SwingConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.integerFormatter = NumberFormat.getNumberInstance();
            _this.integerFormatter.setParseIntegerOnly(true);
            _this.setValue(value);
            return _this;
        }
        IntegerField.prototype.getValue = function () {
            var retVal = 0;
            try {
                retVal = this.integerFormatter.parse(this.getText()).intValue();
            }
            catch (e) {
            }
            ;
            return retVal;
        };
        IntegerField.prototype.setValue = function (value) {
            this.setText(this.integerFormatter.format(value));
        };
        IntegerField.prototype.createDefaultModel = function () {
            return new IntegerField.IntegerDocument(this);
        };
        return IntegerField;
    }(JTextField));
    /**
     *
     */
    IntegerField.serialVersionUID = 813120457405528594;
    vaango_ui.IntegerField = IntegerField;
    (function (IntegerField) {
        var IntegerDocument = (function (_super) {
            __extends(IntegerDocument, _super);
            function IntegerDocument(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.text.Document", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 2199993368669400908;
                return _this;
            }
            IntegerDocument.prototype.insertString = function (offs, src, a) {
                var source = (src).split('');
                var result = new Array(source.length);
                var j = 0;
                for (var i = 0; i < result.length; i++) {
                    if (javaemul.internal.CharacterHelper.isDigit(source[i]))
                        result[j++] = source[i];
                }
                _super.prototype.insertString.call(this, offs, (function (str, index, len) { return str.substring(index, index + len); })((result).join(''), 0, j), a);
            };
            return IntegerDocument;
        }(PlainDocument));
        IntegerField.IntegerDocument = IntegerDocument;
    })(IntegerField = vaango_ui.IntegerField || (vaango_ui.IntegerField = {}));
})(vaango_ui || (vaango_ui = {}));
