"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Arrays = java.util.Arrays;

    /**
     */
    export class KdNode<T> {
        dimensions : number;

        bucketCapacity : number;

        __size : number;

        points : number[][];

        data : any[];

        left : KdNode<T>;

        right : KdNode<T>;

        splitDimension : number;

        splitValue : number;

        minBound : number[];

        maxBound : number[];

        singlePoint : boolean;

        constructor(dimensions : number, bucketCapacity : number) {
            this.dimensions = 0;
            this.bucketCapacity = 0;
            this.__size = 0;
            this.splitDimension = 0;
            this.splitValue = 0;
            this.singlePoint = false;
            this.dimensions = dimensions;
            this.bucketCapacity = bucketCapacity;
            this.__size = 0;
            this.singlePoint = true;
            this.points = new Array(bucketCapacity + 1);
            this.data = new Array(bucketCapacity + 1);
        }

        public size() : number {
            return this.__size;
        }

        public isLeaf() : boolean {
            return this.points != null;
        }

        public addPoint(point : number[], value : T) {
            var cursor : KdNode<T> = this;
            while((!cursor.isLeaf())){
                cursor.extendBounds(point);
                cursor.__size++;
                if(point[cursor.splitDimension] > cursor.splitValue) {
                    cursor = cursor.right;
                } else {
                    cursor = cursor.left;
                }
            };
            cursor.addLeafPoint(point, value);
        }

        public addLeafPoint(point : number[], value : T) {
            this.points[this.__size] = point;
            this.data[this.__size] = value;
            this.extendBounds(point);
            this.__size++;
            if(this.__size === this.points.length - 1) {
                if(this.calculateSplit()) {
                    this.splitLeafNode();
                } else {
                    this.increaseLeafCapacity();
                }
            }
        }

        private checkBounds(point : number[]) : boolean {
            for(var i : number = 0; i < this.dimensions; i++) {
                if(point[i] > this.maxBound[i]) return false;
                if(point[i] < this.minBound[i]) return false;
            }
            return true;
        }

        private extendBounds(point : number[]) {
            if(this.minBound == null) {
                this.minBound = Arrays.copyOf(point, this.dimensions);
                this.maxBound = Arrays.copyOf(point, this.dimensions);
                return;
            }
            for(var i : number = 0; i < this.dimensions; i++) {
                if(/* isNaN */(Number.NaN === point[i])) {
                    if(!/* isNaN */(Number.NaN === this.minBound[i]) || !/* isNaN */(Number.NaN === this.maxBound[i])) {
                        this.singlePoint = false;
                    }
                    this.minBound[i] = javaemul.internal.DoubleHelper.NaN;
                    this.maxBound[i] = javaemul.internal.DoubleHelper.NaN;
                } else if(this.minBound[i] > point[i]) {
                    this.minBound[i] = point[i];
                    this.singlePoint = false;
                } else if(this.maxBound[i] < point[i]) {
                    this.maxBound[i] = point[i];
                    this.singlePoint = false;
                }
            }
        }

        private increaseLeafCapacity() {
            this.points = Arrays.copyOf<any>(this.points, this.points.length * 2);
            this.data = Arrays.copyOf<any>(this.data, this.data.length * 2);
        }

        private calculateSplit() : boolean {
            if(this.singlePoint) return false;
            var width : number = 0;
            for(var i : number = 0; i < this.dimensions; i++) {
                var dwidth : number = (this.maxBound[i] - this.minBound[i]);
                if(/* isNaN */(Number.NaN === dwidth)) dwidth = 0;
                if(dwidth > width) {
                    this.splitDimension = i;
                    width = dwidth;
                }
            }
            if(width === 0) {
                return false;
            }
            this.splitValue = (this.minBound[this.splitDimension] + this.maxBound[this.splitDimension]) * 0.5;
            if(this.splitValue === javaemul.internal.DoubleHelper.POSITIVE_INFINITY) {
                this.splitValue = javaemul.internal.DoubleHelper.MAX_VALUE;
            } else if(this.splitValue === javaemul.internal.DoubleHelper.NEGATIVE_INFINITY) {
                this.splitValue = -javaemul.internal.DoubleHelper.MAX_VALUE;
            }
            if(this.splitValue === this.maxBound[this.splitDimension]) {
                this.splitValue = this.minBound[this.splitDimension];
            }
            return true;
        }

        private splitLeafNode() {
            this.right = new KdNode<T>(this.dimensions, this.bucketCapacity);
            this.left = new KdNode<T>(this.dimensions, this.bucketCapacity);
            for(var i : number = 0; i < this.__size; i++) {
                var oldLocation : number[] = this.points[i];
                var oldData : any = this.data[i];
                if(oldLocation[this.splitDimension] > this.splitValue) {
                    this.right.addLeafPoint(oldLocation, <T>oldData);
                } else {
                    this.left.addLeafPoint(oldLocation, <T>oldData);
                }
            }
            this.points = null;
            this.data = null;
        }
    }
}

