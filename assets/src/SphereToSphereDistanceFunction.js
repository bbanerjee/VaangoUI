"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var SphereToSphereDistanceFunction = (function () {
        function SphereToSphereDistanceFunction() {
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.DistanceFunction"] });
        }
        SphereToSphereDistanceFunction.prototype.distance = function (p1, p2) {
            var d = 0;
            for (var i = 0; i < 3; i++) {
                var diff = (p1[i] - p2[i]);
                d += diff * diff;
            }
            d = Math.sqrt(d) - (p1[3] + p2[3]);
            if (d < 0.0)
                d = 0.001 * Math.min(p1[3], p2[3]);
            return d * d;
        };
        SphereToSphereDistanceFunction.prototype.distanceToRect = function (point, min, max) {
            var d = 0;
            for (var i = 0; i < 3; i++) {
                var diff = 0;
                if (point[i] + point[3] > max[i]) {
                    diff = (point[i] + point[3] - max[i]);
                }
                else if (point[i] - point[3] < min[i]) {
                    diff = (point[i] - point[3] - min[i]);
                }
                d += diff * diff;
            }
            return d;
        };
        return SphereToSphereDistanceFunction;
    }());
    vaango_ui.SphereToSphereDistanceFunction = SphereToSphereDistanceFunction;
})(vaango_ui || (vaango_ui = {}));