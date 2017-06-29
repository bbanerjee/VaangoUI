"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    export class SphereGeomPiece extends GeomPiece {
        private d_center : Point = null;

        private d_radius : number = 0.0;

        public constructor(name? : any, center? : any, radius? : any) {
            if(((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null)) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_radius = radius;
                    this.d_center = new Point(center);
                })();
            } else if(name === undefined && center === undefined && radius === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String("Sphere");
                    this.d_center = new Point();
                    this.d_radius = 0.0;
                })();
            } else throw new Error('invalid overload');
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<sphere label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<origin> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </origin>");
            pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
            pw.println(tab + "</sphere>");
        }

        public print() {
            var tab1 : string = <string>new String("  ");
            console.info("<sphere label=\"" + this.d_name + "\">");
            console.info(tab1 + "<origin> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </origin>");
            console.info(tab1 + "<radius> " + this.d_radius + " </radius>");
            console.info("</sphere>");
        }
    }
}

