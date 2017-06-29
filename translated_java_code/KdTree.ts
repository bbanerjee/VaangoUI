"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    /**
     */
    export class KdTree<T> extends KdNode<T> {
        public constructor(dimensions : number, bucketCapacity : number = 24) {
            super(dimensions, bucketCapacity);
        }

        public getNearestNeighborIterator(searchPoint : number[], maxPointsReturned : number, distanceFunction : DistanceFunction) : NearestNeighborIterator<T> {
            return new NearestNeighborIterator<T>(this, searchPoint, maxPointsReturned, distanceFunction);
        }

        public findNearestNeighbors(searchPoint : number[], maxPointsReturned : number, distanceFunction : DistanceFunction) : MaxHeap<T> {
            var pendingPaths : BinaryHeap.Min<KdNode<T>> = new BinaryHeap.Min<KdNode<T>>();
            var evaluatedPoints : BinaryHeap.Max<T> = new BinaryHeap.Max<T>();
            var pointsRemaining : number = Math.min(maxPointsReturned, this.size());
            pendingPaths.offer(0, this);
            while((pendingPaths.size() > 0 && (evaluatedPoints.size() < pointsRemaining || (pendingPaths.getMinKey() < evaluatedPoints.getMaxKey())))){
                KdTree.nearestNeighborSearchStep<any>(pendingPaths, evaluatedPoints, pointsRemaining, distanceFunction, searchPoint);
            };
            return evaluatedPoints;
        }

        static nearestNeighborSearchStep<T>(pendingPaths : MinHeap<KdNode<T>>, evaluatedPoints : MaxHeap<T>, desiredPoints : number, distanceFunction : DistanceFunction, searchPoint : number[]) {
            var cursor : KdNode<T> = pendingPaths.getMin();
            pendingPaths.removeMin();
            while((!cursor.isLeaf())){
                var pathNotTaken : KdNode<T>;
                if(searchPoint[cursor.splitDimension] > cursor.splitValue) {
                    pathNotTaken = cursor.left;
                    cursor = cursor.right;
                } else {
                    pathNotTaken = cursor.right;
                    cursor = cursor.left;
                }
                var otherDistance : number = distanceFunction.distanceToRect(searchPoint, pathNotTaken.minBound, pathNotTaken.maxBound);
                if(evaluatedPoints.size() < desiredPoints || otherDistance <= evaluatedPoints.getMaxKey()) {
                    pendingPaths.offer(otherDistance, pathNotTaken);
                }
            };
            if(cursor.singlePoint) {
                var nodeDistance : number = distanceFunction.distance(cursor.points[0], searchPoint);
                if(evaluatedPoints.size() < desiredPoints || nodeDistance <= evaluatedPoints.getMaxKey()) {
                    for(var i : number = 0; i < cursor.size(); i++) {
                        var value : T = <T>cursor.data[i];
                        if(evaluatedPoints.size() === desiredPoints) {
                            evaluatedPoints.replaceMax(nodeDistance, value);
                        } else {
                            evaluatedPoints.offer(nodeDistance, value);
                        }
                    }
                }
            } else {
                for(var i : number = 0; i < cursor.size(); i++) {
                    var point : number[] = cursor.points[i];
                    var value : T = <T>cursor.data[i];
                    var distance : number = distanceFunction.distance(point, searchPoint);
                    if(evaluatedPoints.size() < desiredPoints) {
                        evaluatedPoints.offer(distance, value);
                    } else if(distance < evaluatedPoints.getMaxKey()) {
                        evaluatedPoints.replaceMax(distance, value);
                    }
                }
            }
        }
    }
}

