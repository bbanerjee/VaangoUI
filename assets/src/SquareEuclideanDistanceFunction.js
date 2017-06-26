"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var SquareEuclideanDistanceFunction = (function () {
        function SquareEuclideanDistanceFunction() {
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.DistanceFunction"] });
        }
        SquareEuclideanDistanceFunction.prototype.distance = function (p1, p2) {
            var d = 0;
            for (var i = 0; i < p1.length; i++) {
                var diff = (p1[i] - p2[i]);
                d += diff * diff;
            }
            return d;
        };
        SquareEuclideanDistanceFunction.prototype.distanceToRect = function (point, min, max) {
            var d = 0;
            for (var i = 0; i < point.length; i++) {
                var diff = 0;
                if (point[i] > max[i]) {
                    diff = (point[i] - max[i]);
                }
                else if (point[i] < min[i]) {
                    diff = (point[i] - min[i]);
                }
                d += diff * diff;
            }
            return d;
        };
        return SquareEuclideanDistanceFunction;
    }());
    vaango_ui.SquareEuclideanDistanceFunction = SquareEuclideanDistanceFunction;
})(vaango_ui || (vaango_ui = {}));
