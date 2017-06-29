"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    export class SmoothSphereGeomPiece extends GeomPiece {
        private d_center : Point = null;

        private d_outerRadius : number = 0.0;

        private d_innerRadius : number = 0.0;

        private d_numRadial : number = 0;

        public constructor(name? : any, center? : any, outerRadius? : any, innerRadius? : any, numRadial? : any) {
            if(((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof outerRadius === 'number') || outerRadius === null) && ((typeof innerRadius === 'number') || innerRadius === null) && ((typeof numRadial === 'number') || numRadial === null)) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_outerRadius = outerRadius;
                    this.d_innerRadius = innerRadius;
                    this.d_numRadial = numRadial;
                    this.d_center = new Point(center.getX(), center.getY(), center.getZ());
                })();
            } else if(((typeof name === 'string') || name === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof outerRadius === 'number') || outerRadius === null) && ((typeof innerRadius === 'number') || innerRadius === null) && numRadial === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_outerRadius = outerRadius;
                    this.d_innerRadius = innerRadius;
                    this.d_numRadial = 0;
                    this.d_center = new Point(center.getX(), center.getY(), center.getZ());
                })();
            } else if(name === undefined && center === undefined && outerRadius === undefined && innerRadius === undefined && numRadial === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String("SmoothSphere");
                    this.d_center = new Point();
                    this.d_outerRadius = 0.0;
                    this.d_innerRadius = 0.0;
                    this.d_numRadial = 0;
                })();
            } else throw new Error('invalid overload');
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<smooth_sphere label=\"" + this.d_name + "\">");
            pw.println(tab1 + "<center> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </center>");
            pw.println(tab1 + "<outer_radius> " + this.d_outerRadius + " </outer_radius>");
            pw.println(tab1 + "<inner_radius> " + this.d_innerRadius + " </inner_radius>");
            pw.println(tab1 + "<num_radial_pts> " + this.d_numRadial + " </num_radial_pts>");
            pw.println(tab1 + "<algorithm> equal_area </algorithm>");
            pw.println(tab + "</smooth_sphere>");
        }

        public print() {
            var tab1 : string = <string>new String("  ");
            console.info("<smooth_spherel label=\"" + this.d_name + "\">");
            console.info(tab1 + "<center> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </center>");
            console.info(tab1 + "<outer_radius> " + this.d_outerRadius + " </outer_radius>");
            console.info(tab1 + "<inner_radius> " + this.d_innerRadius + " </inner_radius>");
            console.info(tab1 + "<num_radial_pts> " + this.d_numRadial + " </num_radial_pts>");
            console.info(tab1 + "<algorithm> equal_area </algorithm>");
            console.info("</smooth_sphere>");
        }
    }
}

