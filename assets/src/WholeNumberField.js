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
    var WholeNumberField = (function (_super) {
        __extends(WholeNumberField, _super);
        function WholeNumberField(value, columns) {
            var _this = _super.call(this, columns) || this;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.SwingConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.integerFormatter = NumberFormat.getNumberInstance();
            _this.integerFormatter.setParseIntegerOnly(true);
            _this.setValue(value);
            return _this;
        }
        WholeNumberField.prototype.getValue = function () {
            var retVal = 0;
            try {
                retVal = this.integerFormatter.parse(this.getText()).intValue();
            }
            catch (e) {
            }
            ;
            return retVal;
        };
        WholeNumberField.prototype.setValue = function (value) {
            this.setText(this.integerFormatter.format(value));
        };
        WholeNumberField.prototype.createDefaultModel = function () {
            return new WholeNumberField.WholeNumberDocument(this);
        };
        return WholeNumberField;
    }(JTextField));
    /**
     *
     */
    WholeNumberField.serialVersionUID = 9073779561776791173;
    vaango_ui.WholeNumberField = WholeNumberField;
    (function (WholeNumberField) {
        var WholeNumberDocument = (function (_super) {
            __extends(WholeNumberDocument, _super);
            function WholeNumberDocument(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.text.Document", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -8935374188934031387;
                return _this;
            }
            WholeNumberDocument.prototype.insertString = function (offs, src, a) {
                var source = (src).split('');
                var result = new Array(source.length);
                var j = 0;
                for (var i = 0; i < result.length; i++) {
                    if (javaemul.internal.CharacterHelper.isDigit(source[i]))
                        result[j++] = source[i];
                }
                _super.prototype.insertString.call(this, offs, (function (str, index, len) { return str.substring(index, index + len); })((result).join(''), 0, j), a);
            };
            return WholeNumberDocument;
        }(PlainDocument));
        WholeNumberField.WholeNumberDocument = WholeNumberDocument;
    })(WholeNumberField = vaango_ui.WholeNumberField || (vaango_ui.WholeNumberField = {}));
})(vaango_ui || (vaango_ui = {}));
