"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    export class CylinderGeomPiece extends GeomPiece {
        private d_bottom : Point = null;

        private d_top : Point = null;

        private d_radius : number = 0.0;

        public constructor(name? : any, center? : any, radius? : any, length? : any) {
            if(((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null)) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_radius = radius;
                    this.d_bottom = new Point(center);
                    this.d_top = new Point(center.getX(), center.getY(), center.getZ() + length);
                })();
            } else if(name === undefined && center === undefined && radius === undefined && length === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String("Cylinder");
                    this.d_bottom = new Point();
                    this.d_top = new Point();
                    this.d_radius = 0.0;
                })();
            } else throw new Error('invalid overload');
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<cylinder label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            pw.println(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
            pw.println(tab + "</cylinder>");
        }

        public print() {
            var tab1 : string = <string>new String("  ");
            console.info("<cylinder label=\"" + this.d_name + "\">");
            console.info(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            console.info(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            console.info(tab1 + "<radius> " + this.d_radius + " </radius>");
            console.info("</cylinder>");
        }
    }
}

