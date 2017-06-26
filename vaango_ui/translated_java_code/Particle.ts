"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import PrintWriter = java.io.PrintWriter;

    export class Particle {
        private d_type : number = 1;

        private d_radius : number = 0.0;

        private d_length : number = 1.0;

        private d_thickness : number = 0.0;

        private d_rotation : number = 0.0;

        private d_center : Point = null;

        private d_matCode : number = 0;

        static CIRCLE : number = 1;

        static SPHERE : number = 2;

        public constructor(type? : any, radius? : any, length? : any, thickness? : any, center? : any, matCode? : any) {
            if(((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((typeof thickness === 'number') || thickness === null) && ((center != null && center instanceof vaango_ui.Point) || center === null) && ((typeof matCode === 'number') || matCode === null)) {
                (() => {
                    this.d_type = type;
                    this.d_radius = radius;
                    this.d_length = length;
                    this.d_thickness = thickness;
                    this.d_rotation = 0.0;
                    this.d_center = new Point(center);
                    this.d_matCode = matCode;
                })();
            } else if(((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((thickness != null && thickness instanceof vaango_ui.Point) || thickness === null) && ((typeof center === 'number') || center === null) && ((typeof matCode === 'number') || matCode === null)) {
                var rotation : any = length;
                var center : any = thickness;
                var matCode : any = center;
                var thickness : any = matCode;
                (() => {
                    this.d_type = type;
                    this.d_radius = radius;
                    this.d_length = 0.0;
                    this.d_thickness = thickness;
                    this.d_rotation = rotation;
                    this.d_center = new Point(center);
                    this.d_matCode = matCode;
                })();
            } else if(((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((thickness != null && thickness instanceof vaango_ui.Point) || thickness === null) && ((typeof center === 'number') || center === null) && matCode === undefined) {
                var rotation : any = length;
                var center : any = thickness;
                var matCode : any = center;
                (() => {
                    this.d_type = type;
                    this.d_radius = radius;
                    this.d_length = 0.0;
                    this.d_thickness = 0.0;
                    this.d_rotation = rotation;
                    this.d_center = new Point(center);
                    this.d_matCode = matCode;
                })();
            } else if(((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((typeof length === 'number') || length === null) && ((thickness != null && thickness instanceof vaango_ui.Point) || thickness === null) && ((typeof center === 'number') || center === null) && matCode === undefined) {
                var radius : any = type;
                var length : any = radius;
                var thickness : any = length;
                var center : any = thickness;
                var matCode : any = center;
                (() => {
                    this.d_type = Particle.CIRCLE;
                    this.d_radius = radius;
                    this.d_length = length;
                    this.d_thickness = thickness;
                    this.d_rotation = 0.0;
                    this.d_center = new Point(center);
                    this.d_matCode = matCode;
                })();
            } else if(((typeof type === 'number') || type === null) && ((typeof radius === 'number') || radius === null) && ((length != null && length instanceof vaango_ui.Point) || length === null) && ((typeof thickness === 'number') || thickness === null) && center === undefined && matCode === undefined) {
                var radius : any = type;
                var length : any = radius;
                var center : any = length;
                var matCode : any = thickness;
                (() => {
                    this.d_type = Particle.CIRCLE;
                    this.d_radius = radius;
                    this.d_length = length;
                    this.d_thickness = 0.0;
                    this.d_rotation = 0.0;
                    this.d_center = new Point(center);
                    this.d_matCode = matCode;
                })();
            } else if(((typeof type === 'number') || type === null) && radius === undefined && length === undefined && thickness === undefined && center === undefined && matCode === undefined) {
                (() => {
                    this.d_type = type;
                    this.d_radius = 0.0;
                    this.d_length = 1.0;
                    this.d_thickness = 0.0;
                    this.d_rotation = 0.0;
                    this.d_center = new Point(0.0, 0.0, 0.0);
                    this.d_matCode = 0;
                })();
            } else if(type === undefined && radius === undefined && length === undefined && thickness === undefined && center === undefined && matCode === undefined) {
                (() => {
                    this.d_type = Particle.CIRCLE;
                    this.d_radius = 0.0;
                    this.d_length = 1.0;
                    this.d_thickness = 0.0;
                    this.d_rotation = 0.0;
                    this.d_center = new Point(0.0, 0.0, 0.0);
                    this.d_matCode = 0;
                })();
            } else throw new Error('invalid overload');
        }

        public getType() : number {
            return this.d_type;
        }

        public getMatCode() : number {
            return this.d_matCode;
        }

        public getRadius() : number {
            return this.d_radius;
        }

        public getLength() : number {
            return this.d_length;
        }

        public getThickness() : number {
            return this.d_thickness;
        }

        public getRotation() : number {
            return this.d_rotation;
        }

        public getCenter() : Point {
            return this.d_center;
        }

        public getVolume() : number {
            if(this.d_type === Particle.CIRCLE) {
                return Math.PI * this.d_radius * this.d_radius;
            } else {
                return Math.PI * this.d_radius * this.d_radius * this.d_radius * (4.0 / 3.0);
            }
        }

        public setType(type : number) {
            this.d_type = type;
        }

        public setMatCode(matCode : number) {
            this.d_matCode = matCode;
        }

        public setRadius(radius : number) {
            this.d_radius = radius;
        }

        public setLength(length : number) {
            this.d_length = length;
        }

        public setThickness(thickness : number) {
            this.d_thickness = thickness;
        }

        public setRotation(rotation : number) {
            this.d_rotation = rotation;
        }

        public setCenter(center : Point) {
            this.d_center = center;
        }

        public print$() {
            console.info("Material Code = " + this.d_matCode + " Type = " + this.d_type + " Rad = " + this.d_radius + " Length = " + this.d_length + " Thick = " + this.d_thickness + " Rotation = " + this.d_rotation + " Center = [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "]");
        }

        public print(pw? : any, tab? : any) : any {
            if(((pw != null && pw instanceof java.io.PrintWriter) || pw === null) && ((typeof tab === 'string') || tab === null)) {
                return <any>(() => {
                    var tab1 : string = <string>new String(tab + "  ");
                    switch((this.d_type)) {
                    case Particle.CIRCLE:
                        pw.println(tab + "<cylinder label=\"" + this.d_matCode + "\">");
                        pw.println(tab1 + "<bottom> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </bottom>");
                        var zcoord : number = this.d_center.getZ() + this.d_length;
                        pw.println(tab1 + "<top> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + zcoord + "] </top>");
                        pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
                        pw.println(tab1 + "<thickness> " + this.d_thickness + " </thickness>");
                        pw.println(tab + "</cylinder>");
                        break;
                    case Particle.SPHERE:
                        pw.println(tab + "<sphere label=\"" + this.d_matCode + "\">");
                        pw.println(tab1 + "<center> [" + this.d_center.getX() + ", " + this.d_center.getY() + ", " + this.d_center.getZ() + "] </center>");
                        pw.println(tab1 + "<radius> " + this.d_radius + " </radius>");
                        pw.println(tab1 + "<thickness> " + this.d_thickness + " </thickness>");
                        pw.println(tab + "</sphere>");
                        break;
                    default:
                        console.info("Not output method for particle type " + this.d_type + " implemented yet.");
                    }
                })();
            } else if(pw === undefined && tab === undefined) {
                return <any>this.print$();
            } else throw new Error('invalid overload');
        }
    }
}

