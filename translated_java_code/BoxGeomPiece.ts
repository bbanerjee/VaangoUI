"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    export class BoxGeomPiece extends GeomPiece {
        private d_min : Point = null;

        private d_max : Point = null;

        public constructor(name? : any, min? : any, max? : any) {
            if(((typeof name === 'string') || name === null) && ((min != null && min instanceof vaango_ui.Point) || min === null) && ((max != null && max instanceof vaango_ui.Point) || max === null)) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_min = new Point(min);
                    this.d_max = new Point(max);
                })();
            } else if(name === undefined && min === undefined && max === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String("Box");
                    this.d_min = new Point();
                    this.d_max = new Point();
                })();
            } else throw new Error('invalid overload');
        }

        public set(name : string, min : Point, max : Point) {
            this.d_name = name;
            this.d_min = min;
            this.d_max = max;
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<box label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<min> [" + this.d_min.getX() + ", " + this.d_min.getY() + ", " + this.d_min.getZ() + "] </min>");
            pw.println(tab1 + "<max> [" + this.d_max.getX() + ", " + this.d_max.getY() + ", " + this.d_max.getZ() + "] </max>");
            pw.println(tab + "</box>");
        }

        public print() {
            var tab1 : string = <string>new String("  ");
            console.info("<box label=\"" + this.d_name + "\">");
            console.info(tab1 + "<min> [" + this.d_min.getX() + ", " + this.d_min.getY() + ", " + this.d_min.getZ() + "] </min>");
            console.info(tab1 + "<max> [" + this.d_max.getX() + ", " + this.d_max.getY() + ", " + this.d_max.getZ() + "] </max>");
            console.info("</box>");
        }
    }
}

