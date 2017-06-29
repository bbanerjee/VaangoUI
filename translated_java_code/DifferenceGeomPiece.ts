"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    export class DifferenceGeomPiece extends GeomPiece {
        private d_geomPiece1 : GeomPiece = null;

        private d_geomPiece2 : GeomPiece = null;

        public constructor(name : string, geomPiece1 : GeomPiece, geomPiece2 : GeomPiece) {
            super();
            if(geomPiece1 == null || geomPiece2 == null) return;
            this.d_name = name;
            this.d_geomPiece1 = geomPiece1;
            this.d_geomPiece2 = geomPiece2;
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            if(this.d_geomPiece1 == null || this.d_geomPiece2 == null) return;
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<difference label=\"" + this.d_name + "\">");
            this.d_geomPiece1.writeUintah(pw, tab1);
            this.d_geomPiece2.writeUintah(pw, tab1);
            pw.println(tab + "</difference>");
        }

        public print() {
            if(this.d_geomPiece1 == null || this.d_geomPiece2 == null) return;
            console.info("<difference label=\"" + this.d_name + "\">");
            this.d_geomPiece1.print();
            this.d_geomPiece2.print();
            console.info("</difference>");
        }
    }
}

