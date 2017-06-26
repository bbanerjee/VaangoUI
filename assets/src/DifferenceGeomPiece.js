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
    var DifferenceGeomPiece = (function (_super) {
        __extends(DifferenceGeomPiece, _super);
        function DifferenceGeomPiece(name, geomPiece1, geomPiece2) {
            var _this = _super.call(this) || this;
            _this.d_geomPiece1 = null;
            _this.d_geomPiece2 = null;
            if (geomPiece1 == null || geomPiece2 == null)
                return _this;
            _this.d_name = name;
            _this.d_geomPiece1 = geomPiece1;
            _this.d_geomPiece2 = geomPiece2;
            return _this;
        }
        DifferenceGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        DifferenceGeomPiece.prototype.writeUintah = function (pw, tab) {
            if (this.d_geomPiece1 == null || this.d_geomPiece2 == null)
                return;
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<difference label=\"" + this.d_name + "\">");
            this.d_geomPiece1.writeUintah(pw, tab1);
            this.d_geomPiece2.writeUintah(pw, tab1);
            pw.println(tab + "</difference>");
        };
        DifferenceGeomPiece.prototype.print = function () {
            if (this.d_geomPiece1 == null || this.d_geomPiece2 == null)
                return;
            console.info("<difference label=\"" + this.d_name + "\">");
            this.d_geomPiece1.print();
            this.d_geomPiece2.print();
            console.info("</difference>");
        };
        return DifferenceGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.DifferenceGeomPiece = DifferenceGeomPiece;
})(vaango_ui || (vaango_ui = {}));
