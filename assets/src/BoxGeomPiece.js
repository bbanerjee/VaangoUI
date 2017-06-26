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
    var BoxGeomPiece = (function (_super) {
        __extends(BoxGeomPiece, _super);
        function BoxGeomPiece(name, min, max) {
            var _this = this;
            _this.d_min = null;
            _this.d_max = null;
            if (((typeof name === 'string') || name === null) && ((min != null && min instanceof vaango_ui.Point) || min === null) && ((max != null && max instanceof vaango_ui.Point) || max === null)) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_min = new vaango_ui.Point(min);
                    _this.d_max = new vaango_ui.Point(max);
                })();
            }
            else if (name === undefined && min === undefined && max === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String("Box");
                    _this.d_min = new vaango_ui.Point();
                    _this.d_max = new vaango_ui.Point();
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        BoxGeomPiece.prototype.set = function (name, min, max) {
            this.d_name = name;
            this.d_min = min;
            this.d_max = max;
        };
        BoxGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        BoxGeomPiece.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<box label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<min> [" + this.d_min.getX() + ", " + this.d_min.getY() + ", " + this.d_min.getZ() + "] </min>");
            pw.println(tab1 + "<max> [" + this.d_max.getX() + ", " + this.d_max.getY() + ", " + this.d_max.getZ() + "] </max>");
            pw.println(tab + "</box>");
        };
        BoxGeomPiece.prototype.print = function () {
            var tab1 = new String("  ");
            console.info("<box label=\"" + this.d_name + "\">");
            console.info(tab1 + "<min> [" + this.d_min.getX() + ", " + this.d_min.getY() + ", " + this.d_min.getZ() + "] </min>");
            console.info(tab1 + "<max> [" + this.d_max.getX() + ", " + this.d_max.getY() + ", " + this.d_max.getZ() + "] </max>");
            console.info("</box>");
        };
        return BoxGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.BoxGeomPiece = BoxGeomPiece;
})(vaango_ui || (vaango_ui = {}));
