"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import System = java.lang.System;

    import PrintWriter = java.io.PrintWriter;

    import Vector = java.util.Vector;

    export class UnionGeomPiece extends GeomPiece {
        private d_geomPiece : Vector<GeomPiece> = null;

        public constructor(name? : any, geomPiece? : any) {
            if(((typeof name === 'string') || name === null) && ((geomPiece != null && geomPiece instanceof java.util.Vector) || geomPiece === null)) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    if(geomPiece == null) {
                        this.d_geomPiece = new Vector<GeomPiece>();
                        return;
                    }
                    this.d_geomPiece = new Vector<GeomPiece>();
                    var numGeomPiece : number = geomPiece.size();
                    if(numGeomPiece > 0) {
                        for(var ii : number = 0; ii < numGeomPiece; ++ii) {
                            this.d_geomPiece.addElement(geomPiece.elementAt(ii));
                        }
                    }
                })();
            } else if(((typeof name === 'string') || name === null) && geomPiece === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String(name);
                    this.d_geomPiece = new Vector<GeomPiece>();
                })();
            } else if(name === undefined && geomPiece === undefined) {
                super();
                (() => {
                    this.d_name = <string>new String("Union");
                    this.d_geomPiece = new Vector<GeomPiece>();
                })();
            } else throw new Error('invalid overload');
        }

        public set(name : string, geomPiece : Vector<GeomPiece>) {
            this.d_name = name;
            if(geomPiece == null) return;
            this.d_geomPiece.clear();
            var numGeomPiece : number = geomPiece.size();
            if(numGeomPiece > 0) {
                for(var ii : number = 0; ii < numGeomPiece; ++ii) {
                    this.d_geomPiece.addElement(geomPiece.elementAt(ii));
                }
            }
        }

        public addGeomPiece(geomPiece : GeomPiece) {
            this.d_geomPiece.addElement(geomPiece);
        }

        public getName() : string {
            return this.d_name;
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            if(this.d_geomPiece == null) return;
            var numGeomPiece : number = this.d_geomPiece.size();
            if(numGeomPiece > 0) {
                var tab1 : string = <string>new String(tab + "  ");
                pw.println(tab + "<union label=\"" + this.d_name + "\">");
                for(var ii : number = 0; ii < numGeomPiece; ++ii) {
                    var geomPiece : GeomPiece = <GeomPiece>this.d_geomPiece.elementAt(ii);
                    geomPiece.writeUintah(pw, tab1);
                }
                pw.println(tab + "</union>");
            }
        }

        public print() {
            if(this.d_geomPiece == null) return;
            var numGeomPiece : number = this.d_geomPiece.size();
            if(numGeomPiece > 0) {
                console.info("<union label=\"" + this.d_name + "\">");
                for(var ii : number = 0; ii < numGeomPiece; ++ii) {
                    var geomPiece : GeomPiece = <GeomPiece>this.d_geomPiece.elementAt(ii);
                    geomPiece.print();
                }
                console.info("</union>");
            }
        }
    }
}

