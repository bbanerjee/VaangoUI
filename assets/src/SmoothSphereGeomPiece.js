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
    var SmoothSphereGeomPiece = (function (_super) {
        __extends(SmoothSphereGeomPiece, _super);
        function SmoothSphereGeomPiece(name, center, outerRadius, innerRadius, numRadial) {
            var _this = this;
            _this.d_center = null;
            _this.d_outerRadius = 0.0;
            _this.d_innerRadius = 0.0;
            _this.d_numRadial = 0;
            if (((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof outerRadius === 'number') || outerRadius === null) && ((typeof innerRadius === 'number') || innerRadius === null) && ((typeof numRadial === 'number') || numRadial === null)) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_outerRadius = outerRadius;
                    _this.d_innerRadius = innerRadius;
                    _this.d_numRadial = numRadial;
                    _this.d_center = new vaango_ui.Point(center.getX(), center.getY(), center.getZ());
                })();
            }
            else if (((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof outerRadius === 'number') || outerRadius === null) && ((typeof innerRadius === 'number') || innerRadius === null) && numRadial === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_outerRadius = outerRadius;
                    _this.d_innerRadius = innerRadius;
                    _this.d_numRadial = 0;
                    _this.d_center = new vaango_ui.Point(center.getX(), center.getY(), center.getZ());
                })();
            }
            else if (name === undefined && center === undefined && outerRadius === undefined && innerRadius === undefined && numRadial === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String("SmoothSphere");
                    _this.d_center = new vaango_ui.Point();
                    _this.d_outerRadius = 0.0;
                    _this.d_innerRadius = 0.0;
                    _this.d_numRadial = 0;
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        SmoothSphereGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        SmoothSphereGeomPiece.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<smooth_sphere label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<center> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </center>");
            pw.println(tab1 + "<outer_radius> " + this.d_outerRadius + " </outer_radius>");
            pw.println(tab1 + "<inner_radius> " + this.d_innerRadius + " </inner_radius>");
            pw.println(tab1 + "<num_radial_pts> " + this.d_numRadial + " </num_radial_pts>");
            pw.println(tab1 + "<algorithm> equal_area </algorithm>");
            pw.println(tab + "</smooth_sphere>");
        };
        SmoothSphereGeomPiece.prototype.print = function () {
            var tab1 = new String("  ");
            console.info("<smooth_spherel label=\"" + this.d_name + "\">");
            console.info(tab1 + "<center> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </center>");
            console.info(tab1 + "<outer_radius> " + this.d_outerRadius + " </outer_radius>");
            console.info(tab1 + "<inner_radius> " + this.d_innerRadius + " </inner_radius>");
            console.info(tab1 + "<num_radial_pts> " + this.d_numRadial + " </num_radial_pts>");
            console.info(tab1 + "<algorithm> equal_area </algorithm>");
            console.info("</smooth_sphere>");
        };
        return SmoothSphereGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.SmoothSphereGeomPiece = SmoothSphereGeomPiece;
})(vaango_ui || (vaango_ui = {}));
