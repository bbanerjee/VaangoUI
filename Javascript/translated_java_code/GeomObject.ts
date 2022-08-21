"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    import PrintWriter = java.io.PrintWriter;

    export class GeomObject {
        private d_name : string;

        private d_resolution : Vector3D;

        private d_velocity : Vector3D;

        private d_temperature : number;

        private d_density : number;

        private d_pressure : number;

        private d_geomPieceVector : Vector<GeomPiece>;

        public constructor() {
            this.d_temperature = 0;
            this.d_density = 0;
            this.d_pressure = 0;
            this.d_name = <string>new String("Default");
            this.d_resolution = new Vector3D();
            this.d_velocity = new Vector3D();
            this.d_temperature = 0.0;
            this.d_density = 0.0;
            this.d_pressure = 0.0;
            this.d_geomPieceVector = new Vector<GeomPiece>();
        }

        public getName() : string {
            return this.d_name;
        }

        public setName(name : string) {
            this.d_name = name;
        }

        public setResolution(x : number, y : number, z : number) {
            this.d_resolution.set(x, y, z);
        }

        public setVelocity(x : number, y : number, z : number) {
            this.d_velocity.set(x, y, z);
        }

        public setPressure(pressure : number) {
            this.d_pressure = pressure;
        }

        public setTemperature(temperature : number) {
            this.d_temperature = temperature;
        }

        public setDensity(density : number) {
            this.d_density = density;
        }

        public addGeomPiece(geomPiece : GeomPiece) {
            this.d_geomPieceVector.addElement(geomPiece);
        }

        public removeGeomPieceAt(index : number) {
            this.d_geomPieceVector.removeElementAt(index);
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            var tab1 : string = <string>new String(tab + "  ");
            pw.println(tab + "<geom_object>");
            pw.println(tab1 + "<res> [" + (<number>this.d_resolution.x()|0) + ", " + (<number>this.d_resolution.y()|0) + ", " + (<number>this.d_resolution.z()|0) + "] </res>");
            pw.println(tab1 + "<velocity> [" + this.d_velocity.x() + ", " + this.d_velocity.y() + ", " + this.d_velocity.z() + "] </velocity>");
            pw.println(tab1 + "<temperature> " + this.d_temperature + " </temperature>");
            if(this.d_density > 0.0) {
                pw.println(tab1 + "<density> " + this.d_density + " </density>");
                pw.println(tab1 + "<pressure> " + this.d_pressure + " </pressure>");
            }
            for(var ii : number = 0; ii < this.d_geomPieceVector.size(); ++ii) {
                var geomPiece : GeomPiece = <GeomPiece>this.d_geomPieceVector.elementAt(ii);
                geomPiece.writeUintah(pw, tab1);
            }
            pw.println(tab + "</geom_object>");
        }

        public print() {
            var tab1 : string = <string>new String("  ");
            console.info("<geom_object>");
            console.info(tab1 + "<res> [" + (<number>this.d_resolution.x()|0) + ", " + (<number>this.d_resolution.y()|0) + ", " + (<number>this.d_resolution.z()|0) + "] </res>");
            console.info(tab1 + "<velocity> [" + this.d_velocity.x() + ", " + this.d_velocity.y() + ", " + this.d_velocity.z() + "] </velocity>");
            console.info(tab1 + "<temperature> " + this.d_temperature + " </temperature>");
            console.info(tab1 + "<density> " + this.d_density + " </density>");
            console.info(tab1 + "<pressure> " + this.d_density + " </pressure>");
            for(var ii : number = 0; ii < this.d_geomPieceVector.size(); ++ii) {
                var geomPiece : GeomPiece = <GeomPiece>this.d_geomPieceVector.elementAt(ii);
                geomPiece.print();
            }
            console.info("</geom_object>");
        }
    }
}

