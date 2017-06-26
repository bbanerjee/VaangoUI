"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Arrays = java.util.Arrays;
    /**
     */
    var KdNode = (function () {
        function KdNode(dimensions, bucketCapacity) {
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
        KdNode.prototype.size = function () {
            return this.__size;
        };
        KdNode.prototype.isLeaf = function () {
            return this.points != null;
        };
        KdNode.prototype.addPoint = function (point, value) {
            var cursor = this;
            while ((!cursor.isLeaf())) {
                cursor.extendBounds(point);
                cursor.__size++;
                if (point[cursor.splitDimension] > cursor.splitValue) {
                    cursor = cursor.right;
                }
                else {
                    cursor = cursor.left;
                }
            }
            ;
            cursor.addLeafPoint(point, value);
        };
        KdNode.prototype.addLeafPoint = function (point, value) {
            this.points[this.__size] = point;
            this.data[this.__size] = value;
            this.extendBounds(point);
            this.__size++;
            if (this.__size === this.points.length - 1) {
                if (this.calculateSplit()) {
                    this.splitLeafNode();
                }
                else {
                    this.increaseLeafCapacity();
                }
            }
        };
        KdNode.prototype.checkBounds = function (point) {
            for (var i = 0; i < this.dimensions; i++) {
                if (point[i] > this.maxBound[i])
                    return false;
                if (point[i] < this.minBound[i])
                    return false;
            }
            return true;
        };
        KdNode.prototype.extendBounds = function (point) {
            if (this.minBound == null) {
                this.minBound = Arrays.copyOf(point, this.dimensions);
                this.maxBound = Arrays.copyOf(point, this.dimensions);
                return;
            }
            for (var i = 0; i < this.dimensions; i++) {
                if ((Number.NaN === point[i])) {
                    if (!(Number.NaN === this.minBound[i]) || !(Number.NaN === this.maxBound[i])) {
                        this.singlePoint = false;
                    }
                    this.minBound[i] = javaemul.internal.DoubleHelper.NaN;
                    this.maxBound[i] = javaemul.internal.DoubleHelper.NaN;
                }
                else if (this.minBound[i] > point[i]) {
                    this.minBound[i] = point[i];
                    this.singlePoint = false;
                }
                else if (this.maxBound[i] < point[i]) {
                    this.maxBound[i] = point[i];
                    this.singlePoint = false;
                }
            }
        };
        KdNode.prototype.increaseLeafCapacity = function () {
            this.points = Arrays.copyOf(this.points, this.points.length * 2);
            this.data = Arrays.copyOf(this.data, this.data.length * 2);
        };
        KdNode.prototype.calculateSplit = function () {
            if (this.singlePoint)
                return false;
            var width = 0;
            for (var i = 0; i < this.dimensions; i++) {
                var dwidth = (this.maxBound[i] - this.minBound[i]);
                if ((Number.NaN === dwidth))
                    dwidth = 0;
                if (dwidth > width) {
                    this.splitDimension = i;
                    width = dwidth;
                }
            }
            if (width === 0) {
                return false;
            }
            this.splitValue = (this.minBound[this.splitDimension] + this.maxBound[this.splitDimension]) * 0.5;
            if (this.splitValue === javaemul.internal.DoubleHelper.POSITIVE_INFINITY) {
                this.splitValue = javaemul.internal.DoubleHelper.MAX_VALUE;
            }
            else if (this.splitValue === javaemul.internal.DoubleHelper.NEGATIVE_INFINITY) {
                this.splitValue = -javaemul.internal.DoubleHelper.MAX_VALUE;
            }
            if (this.splitValue === this.maxBound[this.splitDimension]) {
                this.splitValue = this.minBound[this.splitDimension];
            }
            return true;
        };
        KdNode.prototype.splitLeafNode = function () {
            this.right = new KdNode(this.dimensions, this.bucketCapacity);
            this.left = new KdNode(this.dimensions, this.bucketCapacity);
            for (var i = 0; i < this.__size; i++) {
                var oldLocation = this.points[i];
                var oldData = this.data[i];
                if (oldLocation[this.splitDimension] > this.splitValue) {
                    this.right.addLeafPoint(oldLocation, oldData);
                }
                else {
                    this.left.addLeafPoint(oldLocation, oldData);
                }
            }
            this.points = null;
            this.data = null;
        };
        return KdNode;
    }());
    vaango_ui.KdNode = KdNode;
})(vaango_ui || (vaango_ui = {}));
