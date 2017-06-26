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
    var Vector = java.util.Vector;
    var UnionGeomPiece = (function (_super) {
        __extends(UnionGeomPiece, _super);
        function UnionGeomPiece(name, geomPiece) {
            var _this = this;
            _this.d_geomPiece = null;
            if (((typeof name === 'string') || name === null) && ((geomPiece != null && geomPiece instanceof java.util.Vector) || geomPiece === null)) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    if (geomPiece == null) {
                        _this.d_geomPiece = new Vector();
                        return;
                    }
                    _this.d_geomPiece = new Vector();
                    var numGeomPiece = geomPiece.size();
                    if (numGeomPiece > 0) {
                        for (var ii = 0; ii < numGeomPiece; ++ii) {
                            _this.d_geomPiece.addElement(geomPiece.elementAt(ii));
                        }
                    }
                })();
            }
            else if (((typeof name === 'string') || name === null) && geomPiece === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String(name);
                    _this.d_geomPiece = new Vector();
                })();
            }
            else if (name === undefined && geomPiece === undefined) {
                _this = _super.call(this) || this;
                (function () {
                    _this.d_name = new String("Union");
                    _this.d_geomPiece = new Vector();
                })();
            }
            else
                throw new Error('invalid overload');
            return _this;
        }
        UnionGeomPiece.prototype.set = function (name, geomPiece) {
            this.d_name = name;
            if (geomPiece == null)
                return;
            this.d_geomPiece.clear();
            var numGeomPiece = geomPiece.size();
            if (numGeomPiece > 0) {
                for (var ii = 0; ii < numGeomPiece; ++ii) {
                    this.d_geomPiece.addElement(geomPiece.elementAt(ii));
                }
            }
        };
        UnionGeomPiece.prototype.addGeomPiece = function (geomPiece) {
            this.d_geomPiece.addElement(geomPiece);
        };
        UnionGeomPiece.prototype.getName = function () {
            return this.d_name;
        };
        UnionGeomPiece.prototype.writeUintah = function (pw, tab) {
            if (this.d_geomPiece == null)
                return;
            var numGeomPiece = this.d_geomPiece.size();
            if (numGeomPiece > 0) {
                var tab1 = new String(tab + "  ");
                pw.println(tab + "<union label=\"" + this.d_name + "\">");
                for (var ii = 0; ii < numGeomPiece; ++ii) {
                    var geomPiece = this.d_geomPiece.elementAt(ii);
                    geomPiece.writeUintah(pw, tab1);
                }
                pw.println(tab + "</union>");
            }
        };
        UnionGeomPiece.prototype.print = function () {
            if (this.d_geomPiece == null)
                return;
            var numGeomPiece = this.d_geomPiece.size();
            if (numGeomPiece > 0) {
                console.info("<union label=\"" + this.d_name + "\">");
                for (var ii = 0; ii < numGeomPiece; ++ii) {
                    var geomPiece = this.d_geomPiece.elementAt(ii);
                    geomPiece.print();
                }
                console.info("</union>");
            }
        };
        return UnionGeomPiece;
    }(vaango_ui.GeomPiece));
    vaango_ui.UnionGeomPiece = UnionGeomPiece;
})(vaango_ui || (vaango_ui = {}));
