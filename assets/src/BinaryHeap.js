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
    var Arrays = java.util.Arrays;
    /**
     * An implementation of an implicit binary heap. Min-heap and max-heap both supported
     */
    var BinaryHeap = (function () {
        function BinaryHeap(capacity, direction) {
            this.direction = 0;
            this.__capacity = 0;
            this.__size = 0;
            this.direction = direction;
            this.data = new Array(capacity);
            this.keys = new Array(capacity);
            this.__capacity = capacity;
            this.__size = 0;
        }
        BinaryHeap.prototype.offer = function (key, value) {
            if (this.__size >= this.__capacity) {
                this.__capacity *= 2;
                this.data = Arrays.copyOf(this.data, this.__capacity);
                this.keys = Arrays.copyOf(this.keys, this.__capacity);
            }
            this.data[this.__size] = value;
            this.keys[this.__size] = key;
            this.siftUp(this.__size);
            this.__size++;
        };
        BinaryHeap.prototype.removeTip = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            this.__size--;
            this.data[0] = this.data[this.__size];
            this.keys[0] = this.keys[this.__size];
            this.data[this.__size] = null;
            this.siftDown(0);
        };
        BinaryHeap.prototype.replaceTip = function (key, value) {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            this.data[0] = value;
            this.keys[0] = key;
            this.siftDown(0);
        };
        BinaryHeap.prototype.getTip = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            return this.data[0];
        };
        BinaryHeap.prototype.getTipKey = function () {
            if (this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            return this.keys[0];
        };
        BinaryHeap.prototype.siftUp = function (c) {
            for (var p = ((c - 1) / 2 | 0); c !== 0 && this.direction * this.keys[c] > this.direction * this.keys[p]; c = p, p = ((c - 1) / 2 | 0)) {
                var pData = this.data[p];
                var pDist = this.keys[p];
                this.data[p] = this.data[c];
                this.keys[p] = this.keys[c];
                this.data[c] = pData;
                this.keys[c] = pDist;
            }
        };
        BinaryHeap.prototype.siftDown = function (p) {
            for (var c = p * 2 + 1; c < this.__size; p = c, c = p * 2 + 1) {
                if (c + 1 < this.__size && this.direction * this.keys[c] < this.direction * this.keys[c + 1]) {
                    c++;
                }
                if (this.direction * this.keys[p] < this.direction * this.keys[c]) {
                    var pData = this.data[p];
                    var pDist = this.keys[p];
                    this.data[p] = this.data[c];
                    this.keys[p] = this.keys[c];
                    this.data[c] = pData;
                    this.keys[c] = pDist;
                }
                else {
                    break;
                }
            }
        };
        BinaryHeap.prototype.size = function () {
            return this.__size;
        };
        BinaryHeap.prototype.capacity = function () {
            return this.__capacity;
        };
        return BinaryHeap;
    }());
    BinaryHeap.defaultCapacity = 64;
    vaango_ui.BinaryHeap = BinaryHeap;
    (function (BinaryHeap) {
        var Max = (function (_super) {
            __extends(Max, _super);
            function Max(capacity) {
                var _this = this;
                if (((typeof capacity === 'number') || capacity === null)) {
                    _this = _super.call(this, capacity, 1) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["vaango_ui.MaxHeap"] });
                    (function () {
                    })();
                }
                else if (capacity === undefined) {
                    _this = _super.call(this, BinaryHeap.defaultCapacity, 1) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["vaango_ui.MaxHeap"] });
                    (function () {
                    })();
                }
                else
                    throw new Error('invalid overload');
                return _this;
            }
            Max.prototype.removeMax = function () {
                this.removeTip();
            };
            Max.prototype.replaceMax = function (key, value) {
                this.replaceTip(key, value);
            };
            Max.prototype.getMax = function () {
                return this.getTip();
            };
            Max.prototype.getMaxKey = function () {
                return this.getTipKey();
            };
            return Max;
        }(BinaryHeap));
        BinaryHeap.Max = Max;
        var Min = (function (_super) {
            __extends(Min, _super);
            function Min(capacity) {
                var _this = this;
                if (((typeof capacity === 'number') || capacity === null)) {
                    _this = _super.call(this, capacity, -1) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["vaango_ui.MinHeap"] });
                    (function () {
                    })();
                }
                else if (capacity === undefined) {
                    _this = _super.call(this, BinaryHeap.defaultCapacity, -1) || this;
                    Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["vaango_ui.MinHeap"] });
                    (function () {
                    })();
                }
                else
                    throw new Error('invalid overload');
                return _this;
            }
            Min.prototype.removeMin = function () {
                this.removeTip();
            };
            Min.prototype.replaceMin = function (key, value) {
                this.replaceTip(key, value);
            };
            Min.prototype.getMin = function () {
                return this.getTip();
            };
            Min.prototype.getMinKey = function () {
                return this.getTipKey();
            };
            return Min;
        }(BinaryHeap));
        BinaryHeap.Min = Min;
    })(BinaryHeap = vaango_ui.BinaryHeap || (vaango_ui.BinaryHeap = {}));
})(vaango_ui || (vaango_ui = {}));
