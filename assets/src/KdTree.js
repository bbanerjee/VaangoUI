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
    /**
     */
    var KdTree = (function (_super) {
        __extends(KdTree, _super);
        function KdTree(dimensions, bucketCapacity) {
            if (bucketCapacity === void 0) { bucketCapacity = 24; }
            return _super.call(this, dimensions, bucketCapacity) || this;
        }
        KdTree.prototype.getNearestNeighborIterator = function (searchPoint, maxPointsReturned, distanceFunction) {
            return new vaango_ui.NearestNeighborIterator(this, searchPoint, maxPointsReturned, distanceFunction);
        };
        KdTree.prototype.findNearestNeighbors = function (searchPoint, maxPointsReturned, distanceFunction) {
            var pendingPaths = new vaango_ui.BinaryHeap.Min();
            var evaluatedPoints = new vaango_ui.BinaryHeap.Max();
            var pointsRemaining = Math.min(maxPointsReturned, this.size());
            pendingPaths.offer(0, this);
            while ((pendingPaths.size() > 0 && (evaluatedPoints.size() < pointsRemaining || (pendingPaths.getMinKey() < evaluatedPoints.getMaxKey())))) {
                KdTree.nearestNeighborSearchStep(pendingPaths, evaluatedPoints, pointsRemaining, distanceFunction, searchPoint);
            }
            ;
            return evaluatedPoints;
        };
        KdTree.nearestNeighborSearchStep = function (pendingPaths, evaluatedPoints, desiredPoints, distanceFunction, searchPoint) {
            var cursor = pendingPaths.getMin();
            pendingPaths.removeMin();
            while ((!cursor.isLeaf())) {
                var pathNotTaken;
                if (searchPoint[cursor.splitDimension] > cursor.splitValue) {
                    pathNotTaken = cursor.left;
                    cursor = cursor.right;
                }
                else {
                    pathNotTaken = cursor.right;
                    cursor = cursor.left;
                }
                var otherDistance = distanceFunction.distanceToRect(searchPoint, pathNotTaken.minBound, pathNotTaken.maxBound);
                if (evaluatedPoints.size() < desiredPoints || otherDistance <= evaluatedPoints.getMaxKey()) {
                    pendingPaths.offer(otherDistance, pathNotTaken);
                }
            }
            ;
            if (cursor.singlePoint) {
                var nodeDistance = distanceFunction.distance(cursor.points[0], searchPoint);
                if (evaluatedPoints.size() < desiredPoints || nodeDistance <= evaluatedPoints.getMaxKey()) {
                    for (var i = 0; i < cursor.size(); i++) {
                        var value = cursor.data[i];
                        if (evaluatedPoints.size() === desiredPoints) {
                            evaluatedPoints.replaceMax(nodeDistance, value);
                        }
                        else {
                            evaluatedPoints.offer(nodeDistance, value);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < cursor.size(); i++) {
                    var point = cursor.points[i];
                    var value = cursor.data[i];
                    var distance = distanceFunction.distance(point, searchPoint);
                    if (evaluatedPoints.size() < desiredPoints) {
                        evaluatedPoints.offer(distance, value);
                    }
                    else if (distance < evaluatedPoints.getMaxKey()) {
                        evaluatedPoints.replaceMax(distance, value);
                    }
                }
            }
        };
        return KdTree;
    }(vaango_ui.KdNode));
    vaango_ui.KdTree = KdTree;
})(vaango_ui || (vaango_ui = {}));
