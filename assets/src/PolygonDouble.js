"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var PolygonDouble = (function () {
        /**
         * Constructor
         */
        function PolygonDouble(x, y, nPts) {
            var _this = this;
            if (((x != null && x instanceof Array) || x === null) && ((y != null && y instanceof Array) || y === null) && ((typeof nPts === 'number') || nPts === null)) {
                this.d_nPts = 0;
                (function () {
                    _this.d_nPts = nPts;
                    _this.d_x = new Array(nPts);
                    _this.d_y = new Array(nPts);
                    for (var ii = 0; ii < nPts; ii++) {
                        _this.d_x[ii] = x[ii];
                        _this.d_y[ii] = y[ii];
                    }
                })();
            }
            else if (x === undefined && y === undefined && nPts === undefined) {
                this.d_nPts = 0;
                (function () {
                    _this.d_nPts = 0;
                    _this.d_x = new Array(20);
                    _this.d_y = new Array(20);
                })();
            }
            else
                throw new Error('invalid overload');
        }
        /**
         * Get the number of points in the polygon
         */
        PolygonDouble.prototype.nofPoints = function () {
            return this.d_nPts;
        };
        /**
         * Get a point at an index
         */
        PolygonDouble.prototype.x = function (index) {
            return this.d_x[index];
        };
        PolygonDouble.prototype.y = function (index) {
            return this.d_y[index];
        };
        /**
         * Add a point to the polygon
         */
        PolygonDouble.prototype.add = function (x, y) {
            this.d_x[this.d_nPts] = x;
            this.d_y[this.d_nPts] = y;
            ++this.d_nPts;
        };
        /**
         * Print the polygon
         */
        PolygonDouble.prototype.print = function () {
            console.info("NofPts = " + this.d_nPts);
            for (var ii = 0; ii < this.d_nPts; ii++) {
                console.info("x = " + this.d_x[ii] + " y = " + this.d_y[ii]);
            }
        };
        return PolygonDouble;
    }());
    vaango_ui.PolygonDouble = PolygonDouble;
})(vaango_ui || (vaango_ui = {}));
