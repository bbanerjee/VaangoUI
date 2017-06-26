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
    var DecimalFormat = java.text.DecimalFormat;
    var DecimalField = (function (_super) {
        __extends(DecimalField, _super);
        function DecimalField(value, columns, exp) {
            var _this = this;
            if (((typeof value === 'number') || value === null) && ((typeof columns === 'number') || columns === null) && ((typeof exp === 'boolean') || exp === null)) {
                _this = _super.call(this, columns) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.SwingConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                (function () {
                    var pattern = "#0.0#";
                    var patternExp = "0.0##E00";
                    if (exp) {
                        _this.formatter = new DecimalFormat(patternExp);
                    }
                    else {
                        _this.formatter = new DecimalFormat(pattern);
                    }
                    _this.setDocument(new DecimalField.RealNumberDocument(_this, _this.formatter));
                    _this.setValue(value);
                })();
            }
            else if (((typeof value === 'number') || value === null) && ((typeof columns === 'number') || columns === null) && exp === undefined) {
                _this = _super.call(this, columns) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.Scrollable", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.SwingConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                (function () {
                    _this.formatter = new DecimalFormat();
                    _this.formatter.applyPattern(new String("#0.0#"));
                    _this.setDocument(new DecimalField.RealNumberDocument(_this, _this.formatter));
                    _this.setValue(value);
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        DecimalField.prototype.getValue = function () {
            var retVal = 0.0;
            try {
                var input = this.getText().toUpperCase();
                retVal = this.formatter.parse(input).doubleValue();
            }
            catch (e) {
            }
            ;
            return retVal;
        };
        DecimalField.prototype.setValue$double = function (value) {
            try {
                var text = this.formatter.format(value);
                this.setText(text);
            }
            catch (e) {
                console.info("Cannot format " + value);
            }
            ;
        };
        DecimalField.prototype.setValue = function (value) {
            var _this = this;
            if (((typeof value === 'string') || value === null)) {
                return (function () {
                    _this.setText(value);
                })();
            }
            else if (((typeof value === 'number') || value === null)) {
                return this.setValue$double(value);
            }
            else
                throw new Error('invalid overload');
        };
        DecimalField.prototype.createDefaultModel = function () {
            return new DecimalField.RealNumberDocument(this, this.formatter);
        };
        return DecimalField;
    }(JTextField));
    /**
     *
     */
    DecimalField.serialVersionUID = -3565097307778821744;
    vaango_ui.DecimalField = DecimalField;
    (function (DecimalField) {
        var RealNumberDocument = (function (_super) {
            __extends(RealNumberDocument, _super);
            function RealNumberDocument(__parent, f) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.text.Document", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 4586901351110216371;
                _this.format = f;
                return _this;
            }
            RealNumberDocument.prototype.insertString = function (offs, str, a) {
                var currentText = this.getText(0, this.getLength());
                var beforeOffset = currentText.substring(0, offs);
                var afterOffset = currentText.substring(offs, currentText.length);
                var proposedResult = beforeOffset + str + afterOffset;
                try {
                    this.format.parseObject(proposedResult);
                    _super.prototype.insertString.call(this, offs, str, a);
                }
                catch (e) {
                }
                ;
            };
            RealNumberDocument.prototype.remove = function (offs, len) {
                var currentText = this.getText(0, this.getLength());
                var beforeOffset = currentText.substring(0, offs);
                var afterOffset = currentText.substring(len + offs, currentText.length);
                var proposedResult = beforeOffset + afterOffset;
                try {
                    if (proposedResult.length !== 0)
                        this.format.parseObject(proposedResult);
                    _super.prototype.remove.call(this, offs, len);
                }
                catch (e) {
                }
                ;
            };
            return RealNumberDocument;
        }(PlainDocument));
        DecimalField.RealNumberDocument = RealNumberDocument;
    })(DecimalField = vaango_ui.DecimalField || (vaango_ui.DecimalField = {}));
})(vaango_ui || (vaango_ui = {}));
