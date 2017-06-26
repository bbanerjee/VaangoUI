"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Arrays = java.util.Arrays;
    /**
     */
    var NearestNeighborIterator = (function () {
        function NearestNeighborIterator(treeRoot, searchPoint, maxPointsReturned, distanceFunction) {
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.Iterator", "java.lang.Iterable"] });
            this.pointsRemaining = 0;
            this.lastDistanceReturned = 0;
            this.searchPoint = Arrays.copyOf(searchPoint, searchPoint.length);
            this.pointsRemaining = Math.min(maxPointsReturned, treeRoot.size());
            this.distanceFunction = distanceFunction;
            this.pendingPaths = new vaango_ui.BinaryHeap.Min();
            this.pendingPaths.offer(0, treeRoot);
            this.evaluatedPoints = new vaango_ui.IntervalHeap();
        }
        NearestNeighborIterator.prototype.hasNext = function () {
            return this.pointsRemaining > 0;
        };
        NearestNeighborIterator.prototype.next = function () {
            if (!this.hasNext()) {
                throw new java.lang.IllegalStateException("NearestNeighborIterator has reached end!");
            }
            while ((this.pendingPaths.size() > 0 && (this.evaluatedPoints.size() === 0 || (this.pendingPaths.getMinKey() < this.evaluatedPoints.getMinKey())))) {
                vaango_ui.KdTree.nearestNeighborSearchStep(this.pendingPaths, this.evaluatedPoints, this.pointsRemaining, this.distanceFunction, this.searchPoint);
            }
            ;
            this.pointsRemaining--;
            this.lastDistanceReturned = this.evaluatedPoints.getMinKey();
            var value = this.evaluatedPoints.getMin();
            this.evaluatedPoints.removeMin();
            return value;
        };
        NearestNeighborIterator.prototype.distance = function () {
            return this.lastDistanceReturned;
        };
        NearestNeighborIterator.prototype.remove = function () {
            throw new java.lang.UnsupportedOperationException();
        };
        NearestNeighborIterator.prototype.iterator = function () {
            return this;
        };
        return NearestNeighborIterator;
    }());
    vaango_ui.NearestNeighborIterator = NearestNeighborIterator;
})(vaango_ui || (vaango_ui = {}));
