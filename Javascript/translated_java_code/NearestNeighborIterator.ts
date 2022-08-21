"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Arrays = java.util.Arrays;

    import Iterator = java.util.Iterator;

    /**
     */
    export class NearestNeighborIterator<T> implements Iterator<T>, java.lang.Iterable<T> {
        private distanceFunction : DistanceFunction;

        private searchPoint : number[];

        private pendingPaths : MinHeap<KdNode<T>>;

        private evaluatedPoints : IntervalHeap<T>;

        private pointsRemaining : number;

        private lastDistanceReturned : number;

        constructor(treeRoot : KdNode<T>, searchPoint : number[], maxPointsReturned : number, distanceFunction : DistanceFunction) {
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.Iterator","java.lang.Iterable"] });
            this.pointsRemaining = 0;
            this.lastDistanceReturned = 0;
            this.searchPoint = Arrays.copyOf(searchPoint, searchPoint.length);
            this.pointsRemaining = Math.min(maxPointsReturned, treeRoot.size());
            this.distanceFunction = distanceFunction;
            this.pendingPaths = new BinaryHeap.Min<KdNode<T>>();
            this.pendingPaths.offer(0, treeRoot);
            this.evaluatedPoints = new IntervalHeap<T>();
        }

        public hasNext() : boolean {
            return this.pointsRemaining > 0;
        }

        public next() : T {
            if(!this.hasNext()) {
                throw new java.lang.IllegalStateException("NearestNeighborIterator has reached end!");
            }
            while((this.pendingPaths.size() > 0 && (this.evaluatedPoints.size() === 0 || (this.pendingPaths.getMinKey() < this.evaluatedPoints.getMinKey())))){
                KdTree.nearestNeighborSearchStep<any>(this.pendingPaths, this.evaluatedPoints, this.pointsRemaining, this.distanceFunction, this.searchPoint);
            };
            this.pointsRemaining--;
            this.lastDistanceReturned = this.evaluatedPoints.getMinKey();
            var value : T = this.evaluatedPoints.getMin();
            this.evaluatedPoints.removeMin();
            return value;
        }

        public distance() : number {
            return this.lastDistanceReturned;
        }

        public remove() {
            throw new java.lang.UnsupportedOperationException();
        }

        public iterator() : Iterator<T> {
            return this;
        }
    }
}

