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
    var CylinderGeomPiece = (function (_super) {
        __extends(CylinderGeomPiece, _super);
        function CylinderGeomPiece(name, center, radius, length) {
            var _this = this;
            _this.d_bottom = null;
            _this.d_top = null;
            _this.d_radius = 0.0;
            if (((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null)) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_radius = radius;
                    _this.d_bottom = new vaango_ui.Point(center);
                    _this.d_top = new vaango_ui.Point(center.getX(), center.getY(), center.getZ() + length);
                })();
            }
            else if (name === undefined && center === undefined && radius === undefined && length === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String("Cylinder");
                    _this.d_bottom = new vaango_ui.Point();
                    _this.d_top = new vaango_ui.Point();
                    _this.d_radius = 0.0;
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        CylinderGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        CylinderGeomPiece.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<cylinder label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            pw.println(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
            pw.println(tab + "</cylinder>");
        };
        CylinderGeomPiece.prototype.print = function () {
            var tab1 = new String("  ");
            console.info("<cylinder label=\"" + this.d_name + "\">");
            console.info(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            console.info(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            console.info(tab1 + "<radius> " + this.d_radius + " </radius>");
            console.info("</cylinder>");
        };
        return CylinderGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.CylinderGeomPiece = CylinderGeomPiece;
})(vaango_ui || (vaango_ui = {}));
