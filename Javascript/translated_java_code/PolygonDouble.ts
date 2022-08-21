"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class PolygonDouble {
        /**
         * Private data
         */
        d_x : number[];

        d_y : number[];

        d_nPts : number;

        /**
         * Constructor
         */
        public constructor(x? : any, y? : any, nPts? : any) {
            if(((x != null && x instanceof Array) || x === null) && ((y != null && y instanceof Array) || y === null) && ((typeof nPts === 'number') || nPts === null)) {
                this.d_nPts = 0;
                (() => {
                    this.d_nPts = nPts;
                    this.d_x = new Array(nPts);
                    this.d_y = new Array(nPts);
                    for(var ii : number = 0; ii < nPts; ii++) {
                        this.d_x[ii] = x[ii];
                        this.d_y[ii] = y[ii];
                    }
                })();
            } else if(x === undefined && y === undefined && nPts === undefined) {
                this.d_nPts = 0;
                (() => {
                    this.d_nPts = 0;
                    this.d_x = new Array(20);
                    this.d_y = new Array(20);
                })();
            } else throw new Error('invalid overload');
        }

        /**
         * Get the number of points in the polygon
         */
        nofPoints() : number {
            return this.d_nPts;
        }

        /**
         * Get a point at an index
         */
        x(index : number) : number {
            return this.d_x[index];
        }

        y(index : number) : number {
            return this.d_y[index];
        }

        /**
         * Add a point to the polygon
         */
        add(x : number, y : number) {
            this.d_x[this.d_nPts] = x;
            this.d_y[this.d_nPts] = y;
            ++this.d_nPts;
        }

        /**
         * Print the polygon
         */
        print() {
            console.info("NofPts = " + this.d_nPts);
            for(var ii : number = 0; ii < this.d_nPts; ii++) {
                console.info("x = " + this.d_x[ii] + " y = " + this.d_y[ii]);
            }
        }
    }
}

