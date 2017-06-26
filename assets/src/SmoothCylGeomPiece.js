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
    var SmoothCylGeomPiece = (function (_super) {
        __extends(SmoothCylGeomPiece, _super);
        function SmoothCylGeomPiece(name, center, radius, thickness, length, numRadial, numAxial, arcStart, arcAngle) {
            var _this = this;
            _this.d_bottom = null;
            _this.d_top = null;
            _this.d_radius = 0.0;
            _this.d_thickness = 0.0;
            _this.d_numRadial = 0;
            _this.d_numAxial = 0;
            _this.d_arcStartAngle = 0.0;
            _this.d_arcAngle = 0.0;
            if (((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null) && ((typeof thickness === 'number') || thickness === null) && ((typeof length === 'number') || length === null) && ((typeof numRadial === 'number') || numRadial === null) && ((typeof numAxial === 'number') || numAxial === null) && ((typeof arcStart === 'number') || arcStart === null) && ((typeof arcAngle === 'number') || arcAngle === null)) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_radius = radius;
                    if (thickness === 0.0) {
                        _this.d_thickness = radius;
                    }
                    else {
                        _this.d_thickness = thickness;
                    }
                    _this.d_numRadial = numRadial;
                    _this.d_numAxial = numAxial;
                    _this.d_arcStartAngle = arcStart;
                    _this.d_arcAngle = arcAngle;
                    _this.d_bottom = new vaango_ui.Point(center);
                    _this.d_top = new vaango_ui.Point(center.getX(), center.getY(), center.getZ() + length);
                })();
            }
            else if (((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null) && ((typeof thickness === 'number') || thickness === null) && ((typeof length === 'number') || length === null) && numRadial === undefined && numAxial === undefined && arcStart === undefined && arcAngle === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_radius = radius;
                    if (thickness === 0.0) {
                        _this.d_thickness = radius;
                    }
                    else {
                        _this.d_thickness = thickness;
                    }
                    _this.d_numRadial = 0;
                    _this.d_numAxial = 0;
                    _this.d_arcStartAngle = 0.0;
                    _this.d_arcAngle = 360.0;
                    _this.d_bottom = new vaango_ui.Point(center);
                    _this.d_top = new vaango_ui.Point(center.getX(), center.getY(), center.getZ() + length);
                })();
            }
            else if (name === undefined && center === undefined && radius === undefined && thickness === undefined && length === undefined && numRadial === undefined && numAxial === undefined && arcStart === undefined && arcAngle === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String("SmoothCyl");
                    _this.d_bottom = new vaango_ui.Point();
                    _this.d_top = new vaango_ui.Point();
                    _this.d_radius = 0.0;
                    _this.d_thickness = 0.0;
                    _this.d_numRadial = 0;
                    _this.d_numAxial = 0;
                    _this.d_arcStartAngle = 0.0;
                    _this.d_arcAngle = 0.0;
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        SmoothCylGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        SmoothCylGeomPiece.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<smoothcyl label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            pw.println(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
            pw.println(tab1 + "<thickness> " + this.d_thickness + " </thickness>");
            pw.println(tab1 + "<num_radial> " + this.d_numRadial + " </num_radial>");
            pw.println(tab1 + "<num_axial> 2 </num_axial>");
            pw.println(tab + "</smoothcyl>");
        };
        SmoothCylGeomPiece.prototype.print = function () {
            var tab1 = new String("  ");
            console.info("<smoothcyl label=\"" + this.d_name + "\">");
            console.info(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            console.info(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            console.info(tab1 + "<radius> " + this.d_radius + " </radius>");
            console.info(tab1 + "<thickness> " + this.d_thickness + " </thickness>");
            console.info(tab1 + "<num_radial> " + this.d_numRadial + " </num_radial>");
            console.info(tab1 + "<num_axial> " + this.d_numAxial + " </num_axial>");
            console.info(tab1 + "<arc_start_angle> " + this.d_arcStartAngle + " </arc_start_angle>");
            console.info(tab1 + "<arc_angle> " + this.d_arcAngle + " </arc_angle>");
            console.info("</smoothcyl>");
        };
        return SmoothCylGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.SmoothCylGeomPiece = SmoothCylGeomPiece;
})(vaango_ui || (vaango_ui = {}));
