"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Arrays = java.util.Arrays;
    /**
     * An implementation of an implicit binary interval heap.
     */
    var IntervalHeap = (function () {
        function IntervalHeap(capacity) {
            if (capacity === void 0) { capacity = IntervalHeap.defaultCapacity; }
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.MinHeap", "vaango_ui.MaxHeap"] });
            this.__capacity = 0;
            this.__size = 0;
            this.data = new Array(capacity);
            this.keys = new Array(capacity);
            this.__capacity = capacity;
            this.__size = 0;
        }
        IntervalHeap.prototype.offer = function (key, value) {
            if (this.__size >= this.__capacity) {
                this.__capacity *= 2;
                this.data = Arrays.copyOf(this.data, this.__capacity);
                this.keys = Arrays.copyOf(this.keys, this.__capacity);
            }
            this.__size++;
            this.data[this.__size - 1] = value;
            this.keys[this.__size - 1] = key;
            this.siftInsertedValueUp();
        };
        IntervalHeap.prototype.removeMin = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            this.__size--;
            this.data[0] = this.data[this.__size];
            this.keys[0] = this.keys[this.__size];
            this.data[this.__size] = null;
            this.siftDownMin(0);
        };
        IntervalHeap.prototype.replaceMin = function (key, value) {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            this.data[0] = value;
            this.keys[0] = key;
            if (this.__size > 1) {
                if (this.keys[1] < key) {
                    this.swap(0, 1);
                }
                this.siftDownMin(0);
            }
        };
        IntervalHeap.prototype.removeMax = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            else if (this.__size === 1) {
                this.removeMin();
                return;
            }
            this.__size--;
            this.data[1] = this.data[this.__size];
            this.keys[1] = this.keys[this.__size];
            this.data[this.__size] = null;
            this.siftDownMax(1);
        };
        IntervalHeap.prototype.replaceMax = function (key, value) {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            else if (this.__size === 1) {
                this.replaceMin(key, value);
                return;
            }
            this.data[1] = value;
            this.keys[1] = key;
            if (key < this.keys[0]) {
                this.swap(0, 1);
            }
            this.siftDownMax(1);
        };
        IntervalHeap.prototype.getMin = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            return this.data[0];
        };
        IntervalHeap.prototype.getMax = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            else if (this.__size === 1) {
                return this.data[0];
            }
            return this.data[1];
        };
        IntervalHeap.prototype.getMinKey = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            return this.keys[0];
        };
        IntervalHeap.prototype.getMaxKey = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            else if (this.__size === 1) {
                return this.keys[0];
            }
            return this.keys[1];
        };
        IntervalHeap.prototype.swap = function (x, y) {
            var yData = this.data[y];
            var yDist = this.keys[y];
            this.data[y] = this.data[x];
            this.keys[y] = this.keys[x];
            this.data[x] = yData;
            this.keys[x] = yDist;
            return y;
        };
        /**
         * Min-side (u % 2 == 0):
         * - leftchild:  2u + 2
         * - rightchild: 2u + 4
         * - parent:     (x/2-1)&~1
         *
         * Max-side (u % 2 == 1):
         * - leftchild:  2u + 1
         * - rightchild: 2u + 3
         * - parent:     (x/2-1)|1
         */
        IntervalHeap.prototype.siftInsertedValueUp = function () {
            var u = this.__size - 1;
            if (u === 0) {
            }
            else if (u === 1) {
                if (this.keys[u] < this.keys[u - 1]) {
                    this.swap(u, u - 1);
                }
            }
            else if (u % 2 === 1) {
                var p = ((u / 2 | 0) - 1) | 1;
                if (this.keys[u] < this.keys[u - 1]) {
                    u = this.swap(u, u - 1);
                    if (this.keys[u] < this.keys[p - 1]) {
                        u = this.swap(u, p - 1);
                        this.siftUpMin(u);
                    }
                }
                else {
                    if (this.keys[u] > this.keys[p]) {
                        u = this.swap(u, p);
                        this.siftUpMax(u);
                    }
                }
            }
            else {
                var p = ((u / 2 | 0) - 1) | 1;
                if (this.keys[u] > this.keys[p]) {
                    u = this.swap(u, p);
                    this.siftUpMax(u);
                }
                else if (this.keys[u] < this.keys[p - 1]) {
                    u = this.swap(u, p - 1);
                    this.siftUpMin(u);
                }
            }
        };
        IntervalHeap.prototype.siftUpMin = function (c) {
            for (var p = ((c / 2 | 0) - 1) & ~1; p >= 0 && this.keys[c] < this.keys[p]; c = p, p = ((c / 2 | 0) - 1) & ~1) {
                this.swap(c, p);
            }
        };
        IntervalHeap.prototype.siftUpMax = function (c) {
            for (var p = ((c / 2 | 0) - 1) | 1; p >= 0 && this.keys[c] > this.keys[p]; c = p, p = ((c / 2 | 0) - 1) | 1) {
                this.swap(c, p);
            }
        };
        IntervalHeap.prototype.siftDownMin = function (p) {
            for (var c = p * 2 + 2; c < this.__size; p = c, c = p * 2 + 2) {
                if (c + 2 < this.__size && this.keys[c + 2] < this.keys[c]) {
                    c += 2;
                }
                if (this.keys[c] < this.keys[p]) {
                    this.swap(p, c);
                    if (c + 1 < this.__size && this.keys[c + 1] < this.keys[c]) {
                        this.swap(c, c + 1);
                    }
                }
                else {
                    break;
                }
            }
        };
        IntervalHeap.prototype.siftDownMax = function (p) {
            for (var c = p * 2 + 1; c <= this.__size; p = c, c = p * 2 + 1) {
                if (c === this.__size) {
                    if (this.keys[c - 1] > this.keys[p]) {
                        this.swap(p, c - 1);
                    }
                    break;
                }
                else if (c + 2 === this.__size) {
                    if (this.keys[c + 1] > this.keys[c]) {
                        if (this.keys[c + 1] > this.keys[p]) {
                            this.swap(p, c + 1);
                        }
                        break;
                    }
                }
                else if (c + 2 < this.__size) {
                    if (this.keys[c + 2] > this.keys[c]) {
                        c += 2;
                    }
                }
                if (this.keys[c] > this.keys[p]) {
                    this.swap(p, c);
                    if (this.keys[c - 1] > this.keys[c]) {
                        this.swap(c, c - 1);
                    }
                }
                else {
                    break;
                }
            }
        };
        IntervalHeap.prototype.size = function () {
            return this.__size;
        };
        IntervalHeap.prototype.capacity = function () {
            return this.__capacity;
        };
        IntervalHeap.prototype.toString = function () {
            var twoPlaces = new java.text.DecimalFormat("0.00");
            var str = new java.lang.StringBuffer(IntervalHeap.getCanonicalName());
            str.append(", size: ").append(this.size()).append(" capacity: ").append(this.capacity());
            var i = 0;
            var p = 2;
            while ((i < this.size())) {
                var x = 0;
                str.append("\t");
                while (((i + x) < this.size() && x < p)) {
                    str.append(twoPlaces.format(this.keys[i + x])).append(", ");
                    x++;
                }
                ;
                str.append("\n");
                i += x;
                p *= 2;
            }
            ;
            return str.toString();
        };
        IntervalHeap.prototype.validateHeap = function () {
            for (var i = 0; i < this.__size - 1; i += 2) {
                if (this.keys[i] > this.keys[i + 1])
                    return false;
            }
            for (var i = 2; i < this.__size; i++) {
                var maxParent = this.keys[((i / 2 | 0) - 1) | 1];
                var minParent = this.keys[((i / 2 | 0) - 1) & ~1];
                if (this.keys[i] > maxParent || this.keys[i] < minParent)
                    return false;
            }
            return true;
        };
        return IntervalHeap;
    }());
    IntervalHeap.defaultCapacity = 64;
    vaango_ui.IntervalHeap = IntervalHeap;
})(vaango_ui || (vaango_ui = {}));
