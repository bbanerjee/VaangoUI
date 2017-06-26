"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import PrintWriter = java.io.PrintWriter;

    export class Vector3D {
        private d_x : number = 0.0;

        private d_y : number = 0.0;

        private d_z : number = 0.0;

        public constructor(x? : any, y? : any, z? : any) {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                (() => {
                    this.d_x = x;
                    this.d_y = y;
                    this.d_z = z;
                })();
            } else if(((x != null && x instanceof vaango_ui.Vector3D) || x === null) && y === undefined && z === undefined) {
                var vec : any = x;
                (() => {
                    this.d_x = vec.d_x;
                    this.d_y = vec.d_y;
                    this.d_z = vec.d_z;
                })();
            } else if(x === undefined && y === undefined && z === undefined) {
                (() => {
                    this.d_x = 0.0;
                    this.d_y = 0.0;
                    this.d_z = 0.0;
                })();
            } else throw new Error('invalid overload');
        }

        public x$() : number {
            return this.d_x;
        }

        public y$() : number {
            return this.d_y;
        }

        public z$() : number {
            return this.d_z;
        }

        public x(val? : any) : any {
            if(((typeof val === 'number') || val === null)) {
                return <any>(() => {
                    this.d_x = val;
                })();
            } else if(val === undefined) {
                return <any>this.x$();
            } else throw new Error('invalid overload');
        }

        public y(val? : any) : any {
            if(((typeof val === 'number') || val === null)) {
                return <any>(() => {
                    this.d_y = val;
                })();
            } else if(val === undefined) {
                return <any>this.y$();
            } else throw new Error('invalid overload');
        }

        public z(val? : any) : any {
            if(((typeof val === 'number') || val === null)) {
                return <any>(() => {
                    this.d_z = val;
                })();
            } else if(val === undefined) {
                return <any>this.z$();
            } else throw new Error('invalid overload');
        }

        public set$vaango_ui_Vector3D(vec : Vector3D) {
            this.d_x = vec.d_x;
            this.d_y = vec.d_y;
            this.d_z = vec.d_z;
        }

        public set(x? : any, y? : any, z? : any) : any {
            if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                return <any>(() => {
                    this.d_x = x;
                    this.d_y = y;
                    this.d_z = z;
                })();
            } else if(((x != null && x instanceof vaango_ui.Vector3D) || x === null) && y === undefined && z === undefined) {
                return <any>this.set$vaango_ui_Vector3D(x);
            } else throw new Error('invalid overload');
        }

        public add(vec : Vector3D) {
            this.d_x += vec.d_x;
            this.d_y += vec.d_y;
            this.d_z += vec.d_z;
        }

        public norm() : number {
            return (Math.sqrt(this.d_x * this.d_x + this.d_y * this.d_y + this.d_z * this.d_z));
        }

        public dot(vec : Vector3D) : number {
            return (this.d_x * vec.d_x + this.d_y * vec.d_y + this.d_z * vec.d_z);
        }

        public print(pw? : any) : any {
            if(((pw != null && pw instanceof java.io.PrintWriter) || pw === null)) {
                return <any>(() => {
                    pw.print("[" + this.d_x + ", " + this.d_y + ", " + this.d_z + "]");
                })();
            } else if(pw === undefined) {
                return <any>this.print$();
            } else throw new Error('invalid overload');
        }

        public print$() {
            java.lang.System.out.print("[" + this.d_x + ", " + this.d_y + ", " + this.d_z + "]");
        }
    }
}

