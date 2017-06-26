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
    var SphereGeomPiece = (function (_super) {
        __extends(SphereGeomPiece, _super);
        function SphereGeomPiece(name, center, radius) {
            var _this = this;
            _this.d_center = null;
            _this.d_radius = 0.0;
            if (((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null)) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_radius = radius;
                    _this.d_center = new vaango_ui.Point(center);
                })();
            }
            else if (name === undefined && center === undefined && radius === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String("Sphere");
                    _this.d_center = new vaango_ui.Point();
                    _this.d_radius = 0.0;
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        SphereGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        SphereGeomPiece.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<sphere label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<origin> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </origin>");
            pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
            pw.println(tab + "</sphere>");
        };
        SphereGeomPiece.prototype.print = function () {
            var tab1 = new String("  ");
            console.info("<sphere label=\"" + this.d_name + "\">");
            console.info(tab1 + "<origin> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </origin>");
            console.info(tab1 + "<radius> " + this.d_radius + " </radius>");
            console.info("</sphere>");
        };
        return SphereGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.SphereGeomPiece = SphereGeomPiece;
})(vaango_ui || (vaango_ui = {}));
