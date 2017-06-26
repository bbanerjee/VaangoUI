"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Vector = java.util.Vector;
    var GeomObject = (function () {
        function GeomObject() {
            this.d_temperature = 0;
            this.d_density = 0;
            this.d_pressure = 0;
            this.d_name = new String("Default");
            this.d_resolution = new vaango_ui.Vector3D();
            this.d_velocity = new vaango_ui.Vector3D();
            this.d_temperature = 0.0;
            this.d_density = 0.0;
            this.d_pressure = 0.0;
            this.d_geomPieceVector = new Vector();
        }
        GeomObject.prototype.getName = function () {
            return this.d_name;
        };
        GeomObject.prototype.setName = function (name) {
            this.d_name = name;
        };
        GeomObject.prototype.setResolution = function (x, y, z) {
            this.d_resolution.set(x, y, z);
        };
        GeomObject.prototype.setVelocity = function (x, y, z) {
            this.d_velocity.set(x, y, z);
        };
        GeomObject.prototype.setPressure = function (pressure) {
            this.d_pressure = pressure;
        };
        GeomObject.prototype.setTemperature = function (temperature) {
            this.d_temperature = temperature;
        };
        GeomObject.prototype.setDensity = function (density) {
            this.d_density = density;
        };
        GeomObject.prototype.addGeomPiece = function (geomPiece) {
            this.d_geomPieceVector.addElement(geomPiece);
        };
        GeomObject.prototype.removeGeomPieceAt = function (index) {
            this.d_geomPieceVector.removeElementAt(index);
        };
        GeomObject.prototype.writeUintah = function (pw, tab) {
            var tab1 = new String(tab + "  ");
            pw.println(tab + "<geom_object>");
            pw.println(tab1 + "<res> [" + (this.d_resolution.x() | 0) + ", " + (this.d_resolution.y() | 0) + ", " + (this.d_resolution.z() | 0) + "] </res>");
            pw.println(tab1 + "<velocity> [" + this.d_velocity.x() + ", " + this.d_velocity.y() + ", " + this.d_velocity.z() + "] </velocity>");
            pw.println(tab1 + "<temperature> " + this.d_temperature + " </temperature>");
            if (this.d_density > 0.0) {
                pw.println(tab1 + "<density> " + this.d_density + " </density>");
                pw.println(tab1 + "<pressure> " + this.d_pressure + " </pressure>");
            }
            for (var ii = 0; ii < this.d_geomPieceVector.size(); ++ii) {
                var geomPiece = this.d_geomPieceVector.elementAt(ii);
                geomPiece.writeUintah(pw, tab1);
            }
            pw.println(tab + "</geom_object>");
        };
        GeomObject.prototype.print = function () {
            var tab1 = new String("  ");
            console.info("<geom_object>");
            console.info(tab1 + "<res> [" + (this.d_resolution.x() | 0) + ", " + (this.d_resolution.y() | 0) + ", " + (this.d_resolution.z() | 0) + "] </res>");
            console.info(tab1 + "<velocity> [" + this.d_velocity.x() + ", " + this.d_velocity.y() + ", " + this.d_velocity.z() + "] </velocity>");
            console.info(tab1 + "<temperature> " + this.d_temperature + " </temperature>");
            console.info(tab1 + "<density> " + this.d_density + " </density>");
            console.info(tab1 + "<pressure> " + this.d_density + " </pressure>");
            for (var ii = 0; ii < this.d_geomPieceVector.size(); ++ii) {
                var geomPiece = this.d_geomPieceVector.elementAt(ii);
                geomPiece.print();
            }
            console.info("</geom_object>");
        };
        return GeomObject;
    }());
    vaango_ui.GeomObject = GeomObject;
})(vaango_ui || (vaango_ui = {}));
