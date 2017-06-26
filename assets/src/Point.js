"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Point = (function () {
        function Point(xCoord, yCoord, zCoord) {
            var _this = this;
            this.d_x = 0.0;
            this.d_y = 0.0;
            this.d_z = 0.0;
            if (((typeof xCoord === 'number') || xCoord === null) && ((typeof yCoord === 'number') || yCoord === null) && ((typeof zCoord === 'number') || zCoord === null)) {
                (function () {
                    _this.d_x = xCoord;
                    _this.d_y = yCoord;
                    _this.d_z = zCoord;
                })();
            }
            else if (((xCoord != null && xCoord instanceof vaango_ui.Point) || xCoord === null) && yCoord === undefined && zCoord === undefined) {
                var pt = xCoord;
                (function () {
                    _this.d_x = pt.d_x;
                    _this.d_y = pt.d_y;
                    _this.d_z = pt.d_z;
                })();
            }
            else if (xCoord === undefined && yCoord === undefined && zCoord === undefined) {
                (function () {
                    _this.d_x = 0.0;
                    _this.d_y = 0.0;
                    _this.d_z = 0.0;
                })();
            }
            else
                throw new Error('invalid overload');
        }
        Point.prototype.getX = function () {
            return this.d_x;
        };
        Point.prototype.getY = function () {
            return this.d_y;
        };
        Point.prototype.getZ = function () {
            return this.d_z;
        };
        Point.prototype.setX = function (val) {
            this.d_x = val;
        };
        Point.prototype.setY = function (val) {
            this.d_y = val;
        };
        Point.prototype.setZ = function (val) {
            this.d_z = val;
        };
        Point.prototype.translate = function (xTrans, yTrans, zTrans) {
            return new Point(this.d_x + xTrans, this.d_y + yTrans, this.d_z + zTrans);
        };
        Point.prototype.isLessThan = function (pt) {
            return (this.d_x < pt.d_x) || (this.d_y < pt.d_y) || (this.d_z < pt.d_z);
        };
        Point.prototype.isGreaterThan = function (pt) {
            return (this.d_x > pt.d_x) || (this.d_y > pt.d_y) || (this.d_z > pt.d_z);
        };
        return Point;
    }());
    vaango_ui.Point = Point;
})(vaango_ui || (vaango_ui = {}));
