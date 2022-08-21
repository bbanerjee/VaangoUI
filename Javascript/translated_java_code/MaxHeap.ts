"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export interface MaxHeap<T> {
        size() : number;

        offer(key : number, value : T);

        replaceMax(key : number, value : T);

        removeMax();

        getMax() : T;

        getMaxKey() : number;
    }
}

