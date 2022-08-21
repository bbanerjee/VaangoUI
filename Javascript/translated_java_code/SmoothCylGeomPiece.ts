"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    export class SmoothCylGeomPiece extends GeomPiece {
        private d_bottom : Point = null;

        private d_top : Point = null;

        private d_radius : number = 0.0;

        private d_thickness : number = 0.0;

        private d_numRadial : number = 0;

        private d_numAxial : number = 0;

        private d_arcStartAngle : number = 0.0;

        private d_arcAngle : number = 0.0;

        public constructor(name? : any, center? : any, radius? : any, thickness? : any, length? : any, numRadial? : any, numAxial? : any, arcStart? : any, arcAngle? : any) {
            if(((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null) && ((typeof thickness === 'number') || thickness === null) && ((typeof length === 'number') || length === null) && ((typeof numRadial === 'number') || numRadial === null) && ((typeof numAxial === 'number') || numAxial === null) && ((typeof arcStart === 'number') || arcStart === null) && ((typeof arcAngle === 'number') || arcAngle === null)) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_radius = radius;
                    if(thickness === 0.0) {
                        this.d_thickness = radius;
                    } else {
                        this.d_thickness = thickness;
                    }
                    this.d_numRadial = numRadial;
                    this.d_numAxial = numAxial;
                    this.d_arcStartAngle = arcStart;
                    this.d_arcAngle = arcAngle;
                    this.d_bottom = new Point(center);
                    this.d_top = new Point(center.getX(), center.getY(), center.getZ() + length);
                })();
            } else if(((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof radius === 'number') || radius === null) && ((typeof thickness === 'number') || thickness === null) && ((typeof length === 'number') || length === null) && numRadial === undefined && numAxial === undefined && arcStart === undefined && arcAngle === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_radius = radius;
                    if(thickness === 0.0) {
                        this.d_thickness = radius;
                    } else {
                        this.d_thickness = thickness;
                    }
                    this.d_numRadial = 0;
                    this.d_numAxial = 0;
                    this.d_arcStartAngle = 0.0;
                    this.d_arcAngle = 360.0;
                    this.d_bottom = new Point(center);
                    this.d_top = new Point(center.getX(), center.getY(), center.getZ() + length);
                })();
            } else if(name === undefined && center === undefined && radius === undefined && thickness === undefined && length === undefined && numRadial === undefined && numAxial === undefined && arcStart === undefined && arcAngle === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String("SmoothCyl");
                    this.d_bottom = new Point();
                    this.d_top = new Point();
                    this.d_radius = 0.0;
                    this.d_thickness = 0.0;
                    this.d_numRadial = 0;
                    this.d_numAxial = 0;
                    this.d_arcStartAngle = 0.0;
                    this.d_arcAngle = 0.0;
                })();
            } else throw new Error('invalid overload');
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<smoothcyl label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            pw.println(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
            pw.println(tab1 + "<thickness> " + this.d_thickness + " </thickness>");
            pw.println(tab1 + "<num_radial> " + this.d_numRadial + " </num_radial>");
            pw.println(tab1 + "<num_axial> 2 </num_axial>");
            pw.println(tab + "</smoothcyl>");
        }

        public print() {
            var tab1 : string = <string>new String("  ");
            console.info("<smoothcyl label=\"" + this.d_name + "\">");
            console.info(tab1 + "<bottom> [" + this.d_bottom.getX() + ", " + this.d_bottom.getY() + ", " + this.d_bottom.getZ() + "] </bottom>");
            console.info(tab1 + "<top> [" + this.d_top.getX() + ", " + this.d_top.getY() + ", " + this.d_top.getZ() + "] </top>");
            console.info(tab1 + "<radius> " + this.d_radius + " </radius>");
            console.info(tab1 + "<thickness> " + this.d_thickness + " </thickness>");
            console.info(tab1 + "<num_radial> " + this.d_numRadial + " </num_radial>");
            console.info(tab1 + "<num_axial> " + this.d_numAxial + " </num_axial>");
            console.info(tab1 + "<arc_start_angle> " + this.d_arcStartAngle + " </arc_start_angle>");
            console.info(tab1 + "<arc_angle> " + this.d_arcAngle + " </arc_angle>");
            console.info("</smoothcyl>");
        }
    }
}

