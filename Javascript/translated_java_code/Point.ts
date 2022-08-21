"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class Point {
        private d_x : number = 0.0;

        private d_y : number = 0.0;

        private d_z : number = 0.0;

        public constructor(xCoord? : any, yCoord? : any, zCoord? : any) {
            if(((typeof xCoord === 'number') || xCoord === null) && ((typeof yCoord === 'number') || yCoord === null) && ((typeof zCoord === 'number') || zCoord === null)) {
                (() => {
                    this.d_x = xCoord;
                    this.d_y = yCoord;
                    this.d_z = zCoord;
                })();
            } else if(((xCoord != null && xCoord instanceof vaango_ui.Point) || xCoord === null) && yCoord === undefined && zCoord === undefined) {
                var pt : any = xCoord;
                (() => {
                    this.d_x = pt.d_x;
                    this.d_y = pt.d_y;
                    this.d_z = pt.d_z;
                })();
            } else if(xCoord === undefined && yCoord === undefined && zCoord === undefined) {
                (() => {
                    this.d_x = 0.0;
                    this.d_y = 0.0;
                    this.d_z = 0.0;
                })();
            } else throw new Error('invalid overload');
        }

        public getX() : number {
            return this.d_x;
        }

        public getY() : number {
            return this.d_y;
        }

        public getZ() : number {
            return this.d_z;
        }

        public setX(val : number) {
            this.d_x = val;
        }

        public setY(val : number) {
            this.d_y = val;
        }

        public setZ(val : number) {
            this.d_z = val;
        }

        public translate(xTrans : number, yTrans : number, zTrans : number) : Point {
            return new Point(this.d_x + xTrans, this.d_y + yTrans, this.d_z + zTrans);
        }

        public isLessThan(pt : Point) : boolean {
            return (this.d_x < pt.d_x) || (this.d_y < pt.d_y) || (this.d_z < pt.d_z);
        }

        public isGreaterThan(pt : Point) : boolean {
            return (this.d_x > pt.d_x) || (this.d_y > pt.d_y) || (this.d_z > pt.d_z);
        }
    }
}

