"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import PrintWriter = java.io.PrintWriter;

    export abstract class GeomPiece {
        d_name : string;

        public abstract getName() : string;

        public abstract writeUintah(pw : PrintWriter, tab : string);

        public abstract print();

        constructor() {
        }
    }
}

