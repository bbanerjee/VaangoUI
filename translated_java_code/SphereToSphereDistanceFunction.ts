"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class SphereToSphereDistanceFunction implements DistanceFunction {
        public distance(p1 : number[], p2 : number[]) : number {
            var d : number = 0;
            for(var i : number = 0; i < 3; i++) {
                var diff : number = (p1[i] - p2[i]);
                d += diff * diff;
            }
            d = Math.sqrt(d) - (p1[3] + p2[3]);
            if(d < 0.0) d = 0.001 * Math.min(p1[3], p2[3]);
            return d * d;
        }

        public distanceToRect(point : number[], min : number[], max : number[]) : number {
            var d : number = 0;
            for(var i : number = 0; i < 3; i++) {
                var diff : number = 0;
                if(point[i] + point[3] > max[i]) {
                    diff = (point[i] + point[3] - max[i]);
                } else if(point[i] - point[3] < min[i]) {
                    diff = (point[i] - point[3] - min[i]);
                }
                d += diff * diff;
            }
            return d;
        }

        constructor() {
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.DistanceFunction"] });
        }
    }
}

