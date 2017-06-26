"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export interface MinHeap<T> {
        size() : number;

        offer(key : number, value : T);

        replaceMin(key : number, value : T);

        removeMin();

        getMin() : T;

        getMinKey() : number;
    }
}

