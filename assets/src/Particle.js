"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Particle = (function () {
        function Particle(type, radius, length, thickness, center, matCode) {
            var _this = this;
            this.d_type = 1;
            this.d_radius = 0.0;
            this.d_length = 1.0;
            this.d_thickness = 0.0;
            this.d_rotation = 0.0;
            this.d_center = null;
            this.d_matCode = 0;
            if (((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((typeof thickness === 'number') || thickness === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof matCode === 'number') || matCode === null)) {
                (function () {
                    _this.d_type = type;
                    _this.d_radius = radius;
                    _this.d_length = length;
                    _this.d_thickness = thickness;
                    _this.d_rotation = 0.0;
                    _this.d_center = new vaango_ui.Point(center);
                    _this.d_matCode = matCode;
                })();
            }
            else if (((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((thickness != null && thickness instanceof vaango_ui.Point) || thickness === null) && ((typeof center === 'number') || center === null) && ((typeof matCode === 'number') || matCode === null)) {
                var rotation = length;
                var center = thickness;
                var matCode = center;
                var thickness = matCode;
                (function () {
                    _this.d_type = type;
                    _this.d_radius = radius;
                    _this.d_length = 0.0;
                    _this.d_thickness = thickness;
                    _this.d_rotation = rotation;
                    _this.d_center = new vaango_ui.Point(center);
                    _this.d_matCode = matCode;
                })();
            }
            else if (((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((thickness != null && thickness instanceof vaango_ui.Point) || thickness === null) && ((typeof center === 'number') || center === null) && matCode === undefined) {
                var rotation = length;
                var center = thickness;
                var matCode = center;
                (function () {
                    _this.d_type = type;
                    _this.d_radius = radius;
                    _this.d_length = 0.0;
                    _this.d_thickness = 0.0;
                    _this.d_rotation = rotation;
                    _this.d_center = new vaango_ui.Point(center);
                    _this.d_matCode = matCode;
                })();
            }
            else if (((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((thickness != null && thickness instanceof vaango_ui.Point) || thickness === null) && ((typeof center === 'number') || center === null) && matCode === undefined) {
                var radius = type;
                var length = radius;
                var thickness = length;
                var center = thickness;
                var matCode = center;
                (function () {
                    _this.d_type = Particle.CIRCLE;
                    _this.d_radius = radius;
                    _this.d_length = length;
                    _this.d_thickness = thickness;
                    _this.d_rotation = 0.0;
                    _this.d_center = new vaango_ui.Point(center);
                    _this.d_matCode = matCode;
                })();
            }
            else if (((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((length != null && length instanceof vaango_ui.Point) || length === null) && ((typeof thickness === 'number') || thickness === null) && center === undefined && matCode === undefined) {
                var radius = type;
                var length = radius;
                var center = length;
                var matCode = thickness;
                (function () {
                    _this.d_type = Particle.CIRCLE;
                    _this.d_radius = radius;
                    _this.d_length = length;
                    _this.d_thickness = 0.0;
                    _this.d_rotation = 0.0;
                    _this.d_center = new vaango_ui.Point(center);
                    _this.d_matCode = matCode;
                })();
            }
            else if (((typeof type === 'number') || type === null) && radius === undefined && length === undefined && thickness === undefined && center === undefined && matCode === undefined) {
                (function () {
                    _this.d_type = type;
                    _this.d_radius = 0.0;
                    _this.d_length = 1.0;
                    _this.d_thickness = 0.0;
                    _this.d_rotation = 0.0;
                    _this.d_center = new vaango_ui.Point(0.0, 0.0, 0.0);
                    _this.d_matCode = 0;
                })();
            }
            else if (type === undefined && radius === undefined && length === undefined && thickness === undefined && center === undefined && matCode === undefined) {
                (function () {
                    _this.d_type = Particle.CIRCLE;
                    _this.d_radius = 0.0;
                    _this.d_length = 1.0;
                    _this.d_thickness = 0.0;
                    _this.d_rotation = 0.0;
                    _this.d_center = new vaango_ui.Point(0.0, 0.0, 0.0);
                    _this.d_matCode = 0;
                })();
            }
            else
                throw new Error('invalid overload');
        }
        Particle.prototype.getType = function () {
            return this.d_type;
        };
        Particle.prototype.getMatCode = function () {
            return this.d_matCode;
        };
        Particle.prototype.getRadius = function () {
            return this.d_radius;
        };
        Particle.prototype.getLength = function () {
            return this.d_length;
        };
        Particle.prototype.getThickness = function () {
            return this.d_thickness;
        };
        Particle.prototype.getRotation = function () {
            return this.d_rotation;
        };
        Particle.prototype.getCenter = function () {
            return this.d_center;
        };
        Particle.prototype.getVolume = function () {
            if (this.d_type === Particle.CIRCLE) {
                return Math.PI * this.d_radius * this.d_radius;
            }
            else {
                return Math.PI * this.d_radius * this.d_radius * this.d_radius * (4.0 / 3.0);
            }
        };
        Particle.prototype.setType = function (type) {
            this.d_type = type;
        };
        Particle.prototype.setMatCode = function (matCode) {
            this.d_matCode = matCode;
        };
        Particle.prototype.setRadius = function (radius) {
            this.d_radius = radius;
        };
        Particle.prototype.setLength = function (length) {
            this.d_length = length;
        };
        Particle.prototype.setThickness = function (thickness) {
            this.d_thickness = thickness;
        };
        Particle.prototype.setRotation = function (rotation) {
            this.d_rotation = rotation;
        };
        Particle.prototype.setCenter = function (center) {
            this.d_center = center;
        };
        Particle.prototype.print$ = function () {
            console.info("Material Code = " + this.d_matCode + " Type = " + this.d_type + " Rad = " + this.d_radius + " Length = " + this.d_length + " Thick = " + this.d_thickness + " Rotation = " + this.d_rotation + " Center = [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "]");
        };
        Particle.prototype.print = function (pw, tab) {
            var _this = this;
            if (((pw != null && pw instanceof java.io.PrintWriter) || pw === null) && ((typeof tab === 'string') || tab === null)) {
                return (function () {
                    var tab1 = new String(tab + "  ");
                    switch ((_this.d_type)) {
                        case Particle.CIRCLE:
                            pw.println(tab + "<cylinder label=\"" + _this.d_matCode + "\">");
                            pw.println(tab1 + "<bottom> [" + _this.d_center.getX() + ", " + _this.d_center.getY() + ", " + _this.d_center.getZ() + "] </bottom>");
                            var zcoord = _this.d_center.getZ() + _this.d_length;
                            pw.println(tab1 + "<top> [" + _this.d_center.getX() + ", " + _this.d_center.getY() + ", " + zcoord + "] </top>");
                            pw.println(tab1 + "<radius> " + _this.d_radius + " </radius>");
                            pw.println(tab1 + "<thickness> " + _this.d_thickness + " </thickness>");
                            pw.println(tab + "</cylinder>");
                            break;
                        case Particle.SPHERE:
                            pw.println(tab + "<sphere label=\"" + _this.d_matCode + "\">");
                            pw.println(tab1 + "<center> [" + _this.d_center.getX() + ", " + _this.d_center.getY() + ", " + _this.d_center.getZ() + "] </center>");
                            pw.println(tab1 + "<radius> " + _this.d_radius + " </radius>");
                            pw.println(tab1 + "<thickness> " + _this.d_thickness + " </thickness>");
                            pw.println(tab + "</sphere>");
                            break;
                        default:
                            console.info("Not output method for particle type " + _this.d_type + " implemented yet.");
                    }
                })();
            }
            else if (pw === undefined && tab === undefined) {
                return this.print$();
            }
            else
                throw new Error('invalid overload');
        };
        return Particle;
    }());
    Particle.CIRCLE = 1;
    Particle.SPHERE = 2;
    vaango_ui.Particle = Particle;
})(vaango_ui || (vaango_ui = {}));
