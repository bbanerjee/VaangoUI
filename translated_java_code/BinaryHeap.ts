"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Arrays = java.util.Arrays;

    /**
     * An implementation of an implicit binary heap. Min-heap and max-heap both supported
     */
    export abstract class BinaryHeap<T> {
        static defaultCapacity : number = 64;

        private direction : number;

        private data : any[];

        private keys : number[];

        private __capacity : number;

        private __size : number;

        constructor(capacity : number, direction : number) {
            this.direction = 0;
            this.__capacity = 0;
            this.__size = 0;
            this.direction = direction;
            this.data = new Array(capacity);
            this.keys = new Array(capacity);
            this.__capacity = capacity;
            this.__size = 0;
        }

        public offer(key : number, value : T) {
            if(this.__size >= this.__capacity) {
                this.__capacity *= 2;
                this.data = Arrays.copyOf<any>(this.data, this.__capacity);
                this.keys = Arrays.copyOf(this.keys, this.__capacity);
            }
            this.data[this.__size] = value;
            this.keys[this.__size] = key;
            this.siftUp(this.__size);
            this.__size++;
        }

        removeTip() {
            if(this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            this.__size--;
            this.data[0] = this.data[this.__size];
            this.keys[0] = this.keys[this.__size];
            this.data[this.__size] = null;
            this.siftDown(0);
        }

        replaceTip(key : number, value : T) {
            if(this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            this.data[0] = value;
            this.keys[0] = key;
            this.siftDown(0);
        }

        getTip() : T {
            if(this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            return <T>this.data[0];
        }

        getTipKey() : number {
            if(this.__size === 0) {
                throw new java.lang.IllegalStateException();
            }
            return this.keys[0];
        }

        siftUp(c : number) {
            for(var p : number = ((c - 1) / 2|0); c !== 0 && this.direction * this.keys[c] > this.direction * this.keys[p]; c = p, p = ((c - 1) / 2|0)) {
                var pData : any = this.data[p];
                var pDist : number = this.keys[p];
                this.data[p] = this.data[c];
                this.keys[p] = this.keys[c];
                this.data[c] = pData;
                this.keys[c] = pDist;
            }
        }

        siftDown(p : number) {
            for(var c : number = p * 2 + 1; c < this.__size; p = c, c = p * 2 + 1) {
                if(c + 1 < this.__size && this.direction * this.keys[c] < this.direction * this.keys[c + 1]) {
                    c++;
                }
                if(this.direction * this.keys[p] < this.direction * this.keys[c]) {
                    var pData : any = this.data[p];
                    var pDist : number = this.keys[p];
                    this.data[p] = this.data[c];
                    this.keys[p] = this.keys[c];
                    this.data[c] = pData;
                    this.keys[c] = pDist;
                } else {
                    break;
                }
            }
        }

        public size() : number {
            return this.__size;
        }

        public capacity() : number {
            return this.__capacity;
        }
    }

    export namespace BinaryHeap {

        export class Max<T> extends BinaryHeap<T> implements MaxHeap<T> {
            public constructor(capacity? : any) {
                if(((typeof capacity === 'number') || capacity === null)) {
                    super(capacity, 1);
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.MaxHeap"] });
                    (() => {
                    })();
                } else if(capacity === undefined) {
                    super(BinaryHeap.defaultCapacity, 1);
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.MaxHeap"] });
                    (() => {
                    })();
                } else throw new Error('invalid overload');
            }

            public removeMax() {
                this.removeTip();
            }

            public replaceMax(key : number, value : T) {
                this.replaceTip(key, value);
            }

            public getMax() : T {
                return this.getTip();
            }

            public getMaxKey() : number {
                return this.getTipKey();
            }
        }

        export class Min<T> extends BinaryHeap<T> implements MinHeap<T> {
            public constructor(capacity? : any) {
                if(((typeof capacity === 'number') || capacity === null)) {
                    super(capacity, -1);
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.MinHeap"] });
                    (() => {
                    })();
                } else if(capacity === undefined) {
                    super(BinaryHeap.defaultCapacity, -1);
                    Object.defineProperty(this, '__interfaces', { configurable: true, value: ["vaango_ui.MinHeap"] });
                    (() => {
                    })();
                } else throw new Error('invalid overload');
            }

            public removeMin() {
                this.removeTip();
            }

            public replaceMin(key : number, value : T) {
                this.replaceTip(key, value);
            }

            public getMin() : T {
                return this.getTip();
            }

            public getMinKey() : number {
                return this.getTipKey();
            }
        }
    }

}

