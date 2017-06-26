"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class SquareEuclideanDistanceFunction implements DistanceFunction {
        public distance(p1 : number[], p2 : number[]) : number {
            var d : number = 0;
            for(var i : number = 0; i < p1.length; i++) {
                var diff : number = (p1[i] - p2[i]);
                d += diff * diff;
            }
            return d;
        }

        public distanceToRect(point : number[], min : number[], max : number[]) : number {
            var d : number = 0;
            for(var i : number = 0; i < point.length; i++) {
                var diff : number = 0;
                if(point[i] > max[i]) {
                    diff = (point[i] - max[i]);
                } else if(point[i] < min[i]) {
                    diff = (point[i] - min[i]);
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

