"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class DisplayGeometryFrame extends JFrame {
        private static serialVersionUID : number = -1704552499804124489;

        private d_domainSize : number;

        private d_partList : ParticleList = null;

        private d_geomPiece : Vector<GeomPiece>;

        private d_parent : GeometryPanel = null;

        private topCanvas : DisplayGeometryFrame.TopCanvas = null;

        private sideCanvas : DisplayGeometryFrame.SideCanvas = null;

        private frontCanvas : DisplayGeometryFrame.FrontCanvas = null;

        public static TOP : number = 1;

        public static SIDE : number = 2;

        public static FRONT : number = 3;

        public static ORTHO : number = 4;

        public static CIRCLE : number = 1;

        public static SPHERE : number = 2;

        public constructor(partList : ParticleList, geomPiece : Vector<GeomPiece>, parent : GeometryPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.RootPaneContainer","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.WindowConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_domainSize = 0;
            this.setLocation(100, 100);
            this.setTitle("Geometry");
            this.d_partList = partList;
            this.d_geomPiece = geomPiece;
            this.d_parent = parent;
            this.d_domainSize = parent.getDomainSize();
            var panel : JPanel = new JPanel(new GridLayout(2, 2));
            this.topCanvas = new DisplayGeometryFrame.TopCanvas(this, 300, 300);
            this.sideCanvas = new DisplayGeometryFrame.SideCanvas(this, 300, 300);
            this.frontCanvas = new DisplayGeometryFrame.FrontCanvas(this, 300, 300);
            panel.add(this.topCanvas);
            panel.add(this.sideCanvas);
            panel.add(this.frontCanvas);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.getContentPane().setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel, gbc);
            this.getContentPane().add(panel);
            this.pack();
        }

        public refresh() {
            if(this.d_partList != null) {
                if(this.d_partList.size() > 0) {
                    this.d_domainSize = this.d_partList.getRVESize();
                }
            }
            this.topCanvas.refresh();
            this.sideCanvas.refresh();
            this.frontCanvas.refresh();
        }
    }

    export namespace DisplayGeometryFrame {

        export class PlaneCanvas extends LightWeightCanvas {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            d_type : number;

            xbuf : number;

            ybuf : number;

            xsmallbuf : number;

            ysmallbuf : number;

            xmin : number;

            ymin : number;

            xmax : number;

            ymax : number;

            xshortTick : number;

            yshortTick : number;

            xmedTick : number;

            ymedTick : number;

            xlongTick : number;

            ylongTick : number;

            d_domainSize : number;

            public constructor(__parent: any, width : number, height : number, type : number) {
                super(width, height);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 2685836938176311249;
                this.d_type = 0;
                this.xbuf = 0;
                this.ybuf = 0;
                this.xsmallbuf = 0;
                this.ysmallbuf = 0;
                this.xmin = 0;
                this.ymin = 0;
                this.xmax = 0;
                this.ymax = 0;
                this.xshortTick = 0;
                this.yshortTick = 0;
                this.xmedTick = 0;
                this.ymedTick = 0;
                this.xlongTick = 0;
                this.ylongTick = 0;
                this.d_domainSize = 0;
                this.d_type = type;
                this.d_domainSize = this.__parent.d_parent.getDomainSize();
                this.initialize();
            }

            initialize() {
                var d : Dimension = this.getSize();
                this.xbuf = (d.width / 10|0);
                this.ybuf = (d.height / 10|0);
                this.xsmallbuf = (this.xbuf / 4|0);
                this.ysmallbuf = (this.ybuf / 4|0);
                this.xmin = this.xbuf;
                this.ymin = this.ybuf;
                this.xmax = d.width - this.xbuf;
                this.ymax = d.height - this.ybuf;
                this.xlongTick = this.xsmallbuf * 3;
                this.xmedTick = this.xsmallbuf * 2;
                this.xshortTick = this.xsmallbuf;
                this.ylongTick = this.ysmallbuf * 3;
                this.ymedTick = this.ysmallbuf * 2;
                this.yshortTick = this.ysmallbuf;
            }

            public paintComponent(g : Graphics) {
                if(this.__parent.d_partList != null) {
                    if(this.__parent.d_partList.size() > 0) {
                        this.d_domainSize = this.__parent.d_partList.getRVESize();
                    }
                } else {
                    this.d_domainSize = this.__parent.d_parent.getDomainSize();
                }
                this.drawRule(g);
            }

            public paintImmediately$() {
                this.paintImmediately(this.xmin, this.xmax, this.xmax - this.xmin, this.ymax - this.ymin);
            }

            public paintImmediately(x? : any, y? : any, w? : any, h? : any) : any {
                if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof w === 'number') || w === null) && ((typeof h === 'number') || h === null)) {
                    return <any>(() => {
                        var g : Graphics = this.getGraphics();
                        super.paintImmediately(x, y, w, h);
                        if(this.__parent.d_partList != null) {
                            if(this.__parent.d_partList.size() > 0) {
                                this.d_domainSize = this.__parent.d_partList.getRVESize();
                            }
                        } else {
                            this.d_domainSize = this.__parent.d_parent.getDomainSize();
                        }
                        this.drawRule(g);
                    })();
                } else if(x === undefined && y === undefined && w === undefined && h === undefined) {
                    return <any>this.paintImmediately$();
                } else throw new Error('invalid overload');
            }

            drawRule(g : Graphics) {
                var sizeIncr : number = this.d_domainSize / 10.0;
                g.setColor(new Color(230, 163, 4));
                g.fillRect(this.xmin - this.xbuf, this.ymin, this.xbuf, this.ymax - this.ymin);
                g.fillRect(this.xmin, this.ymax, this.xmax - this.xmin, this.ybuf);
                g.setColor(new Color(0, 0, 0));
                g.drawRect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                g.setFont(new Font("SansSerif", Font.PLAIN, 10));
                var xloc : number = this.xmin;
                var incr : number = ((this.xmax - this.xmin) / 10|0);
                var viewType : string = null;
                var xAxis : string = null;
                var yAxis : string = null;
                if(this.d_type === DisplayGeometryFrame.TOP) {
                    viewType = "Top View";
                    xAxis = "X, 1";
                    yAxis = "Y, 2";
                } else if(this.d_type === DisplayGeometryFrame.SIDE) {
                    viewType = "Side View";
                    xAxis = "Y, 2";
                    yAxis = "Z, 3";
                } else if(this.d_type === DisplayGeometryFrame.FRONT) {
                    viewType = "Front View";
                    xAxis = "X, 1";
                    yAxis = "Z, 3";
                }
                g.drawString(viewType, ((this.xmax + this.xmin) / 3|0), this.ymax + this.ybuf);
                for(var i : number = 0; i <= 10; i++) {
                    if(i % 10 === 0) {
                        g.drawLine(xloc, this.ymax, xloc, this.ymax + this.ylongTick);
                        g.drawString(/* valueOf */new String(i * sizeIncr).toString(), xloc - this.xshortTick, this.ymax + this.ybuf - 2);
                    } else if(i % 2 === 0) {
                        g.drawLine(xloc, this.ymax, xloc, this.ymax + this.yshortTick);
                        g.drawString(/* valueOf */new String(i * sizeIncr).toString(), xloc - this.xshortTick, this.ymax + this.ymedTick + 2);
                    } else {
                        g.drawLine(xloc, this.ymax, xloc, this.ymax + this.yshortTick);
                        g.drawString(/* valueOf */new String(i * sizeIncr).toString(), xloc - this.xshortTick, this.ymax + this.ymedTick + 2);
                    }
                    xloc += incr;
                }
                g.drawString(xAxis, this.xmax + this.xshortTick, this.ymax);
                var yloc : number = this.ymax;
                incr = ((this.ymax - this.ymin) / 10|0);
                for(var i : number = 0; i <= 10; i++) {
                    if(i % 10 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xlongTick, yloc);
                        g.drawString(/* valueOf */new String(i * sizeIncr).toString(), 2, yloc);
                    } else if(i % 2 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */new String(i * sizeIncr).toString(), this.xmin - this.xlongTick, yloc);
                    } else {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */new String(i * sizeIncr).toString(), this.xmin - this.xlongTick, yloc);
                    }
                    yloc -= incr;
                }
                g.drawString(yAxis, this.xmin, this.ymin - this.yshortTick);
            }

            getXScreenCoord(coord : number) : number {
                return this.xmin + (<number>(coord / this.d_domainSize * (this.xmax - this.xmin))|0);
            }

            getYScreenCoord(coord : number) : number {
                return this.ymax - (<number>(coord / this.d_domainSize * (this.ymax - this.ymin))|0);
            }

            getXScreenLength(length : number) : number {
                return (<number>(length / this.d_domainSize * (this.xmax - this.xmin))|0);
            }

            getYScreenLength(length : number) : number {
                return (<number>(length / this.d_domainSize * (this.ymax - this.ymin))|0);
            }
        }

        export class TopCanvas extends DisplayGeometryFrame.PlaneCanvas {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            public constructor(__parent: any, width : number, height : number) {
                super(__parent, width, height, DisplayGeometryFrame.TOP);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -3316802860377428495;
                this.initialize();
            }

            initialize() {
            }

            public paintComponent(g : Graphics) {
                super.paintComponent(g);
                this.drawParticles(g);
            }

            public paintImmediately$() {
                this.paintImmediately(this.xmin, this.xmax, this.xmax - this.xmin, this.ymax - this.ymin);
            }

            public paintImmediately(x? : any, y? : any, w? : any, h? : any) : any {
                if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof w === 'number') || w === null) && ((typeof h === 'number') || h === null)) {
                    return <any>(() => {
                        var g : Graphics = this.getGraphics();
                        super.paintImmediately(x, y, w, h);
                        this.drawParticles(g);
                    })();
                } else if(x === undefined && y === undefined && w === undefined && h === undefined) {
                    return <any>this.paintImmediately$();
                } else throw new Error('invalid overload');
            }

            public refresh() {
                var g : Graphics = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            }

            public clear(g : Graphics) {
                var d : Dimension = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            }

            drawParticles(g : Graphics) {
                var size : number = this.__parent.d_partList.size();
                if(!(size > 0)) return;
                var part : Particle = this.__parent.d_partList.getParticle(0);
                var type : number = part.getType();
                if(type === DisplayGeometryFrame.CIRCLE) this.drawCircles(g, size); else if(type === DisplayGeometryFrame.SPHERE) this.drawSpheres(g, size);
            }

            drawCircles(g : Graphics, size : number) {
                for(var ii : number = 0; ii < size; ii++) {
                    var part : Particle = this.__parent.d_partList.getParticle(ii);
                    var radius : number = part.getRadius();
                    var center : Point = part.getCenter();
                    var xCent : number = center.getX();
                    var yCent : number = center.getY();
                    if(this.circleIsOutsideRVE(radius, xCent, yCent)) {
                        continue;
                    }
                    var radXScreen : number = this.getXScreenLength(radius);
                    var radYScreen : number = this.getYScreenLength(radius);
                    var xCentScreen : number = this.getXScreenCoord(xCent);
                    var yCentScreen : number = this.getYScreenCoord(yCent);
                    var clipRect : Rectangle = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.drawString(/* valueOf */new String(ii).toString(), xCentScreen, yCentScreen);
                }
            }

            circleIsOutsideRVE(rad : number, xCent : number, yCent : number) : boolean {
                var distXPlus : number = this.d_domainSize - (xCent - rad);
                var distYPlus : number = this.d_domainSize - (yCent - rad);
                var distXMinus : number = xCent + rad;
                var distYMinus : number = yCent + rad;
                if(distXPlus <= 0.0) return true;
                if(distYPlus <= 0.0) return true;
                if(distXMinus <= 0.0) return true;
                if(distYMinus <= 0.0) return true;
                return false;
            }

            drawSpheres(g : Graphics, size : number) {
                var radius : number[] = new Array(size);
                var xCent : number[] = new Array(size);
                var yCent : number[] = new Array(size);
                var zCent : number[] = new Array(size);
                for(var ii : number = 0; ii < size; ii++) {
                    var part : Particle = this.__parent.d_partList.getParticle(ii);
                    var center : Point = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                    zCent[ii] = center.getZ();
                }
                for(var jj : number = 1; jj < size; jj++) {
                    var keyXCent : number = xCent[jj];
                    var keyYCent : number = yCent[jj];
                    var keyZCent : number = zCent[jj];
                    var keyRad : number = radius[jj];
                    var ii : number = jj - 1;
                    while((ii >= 0 && zCent[ii] > keyZCent)){
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        zCent[ii + 1] = zCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    };
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    zCent[ii + 1] = keyZCent;
                    radius[ii + 1] = keyRad;
                }
                for(var ii : number = 0; ii < size; ii++) {
                    var radXScreen : number = this.getXScreenLength(radius[ii]);
                    var radYScreen : number = this.getYScreenLength(radius[ii]);
                    var xCentScreen : number = this.getXScreenCoord(xCent[ii]);
                    var yCentScreen : number = this.getYScreenCoord(yCent[ii]);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                }
            }
        }

        export class SideCanvas extends DisplayGeometryFrame.PlaneCanvas {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            public constructor(__parent: any, width : number, height : number) {
                super(__parent, width, height, DisplayGeometryFrame.SIDE);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -707348317398414842;
                this.initialize();
            }

            initialize() {
            }

            public paintComponent(g : Graphics) {
                super.paintComponent(g);
                this.drawParticles(g);
            }

            public refresh() {
                var g : Graphics = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            }

            public clear(g : Graphics) {
                var d : Dimension = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            }

            drawParticles(g : Graphics) {
                var size : number = this.__parent.d_partList.size();
                if(!(size > 0)) return;
                var part : Particle = this.__parent.d_partList.getParticle(0);
                var type : number = part.getType();
                if(type === DisplayGeometryFrame.CIRCLE) this.drawCylinders(g, size); else if(type === DisplayGeometryFrame.SPHERE) this.drawSpheres(g, size);
            }

            drawCylinders(g : Graphics, size : number) {
                var radius : number[] = new Array(size);
                var xCent : number[] = new Array(size);
                var yCent : number[] = new Array(size);
                for(var ii : number = 0; ii < size; ii++) {
                    var part : Particle = this.__parent.d_partList.getParticle(ii);
                    var center : Point = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                }
                for(var jj : number = 1; jj < size; jj++) {
                    var keyXCent : number = xCent[jj];
                    var keyYCent : number = yCent[jj];
                    var keyRad : number = radius[jj];
                    var ii : number = jj - 1;
                    while((ii >= 0 && xCent[ii] > keyXCent)){
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    };
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    radius[ii + 1] = keyRad;
                }
                var blue : number = 216;
                for(var ii : number = 0; ii < size; ii++) {
                    var radScreen : number = this.getYScreenLength(radius[ii]);
                    var centScreen : number = this.getYScreenCoord(yCent[ii]);
                    var quo : number = ii % 8;
                    if(quo >= 7) blue = 27; else if(quo === 6) blue = 54; else if(quo === 5) blue = 81; else if(quo === 4) blue = 108; else if(quo === 3) blue = 135; else if(quo === 2) blue = 162; else if(quo === 1) blue = 189;
                    var clipRect : Rectangle = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, blue));
                    g.fillRect(this.xmin, centScreen - radScreen, this.xmax - this.xmin, 2 * radScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawRect(this.xmin, centScreen - radScreen, this.xmax - this.xmin, 2 * radScreen);
                }
            }

            drawSpheres(g : Graphics, size : number) {
                var radius : number[] = new Array(size);
                var xCent : number[] = new Array(size);
                var yCent : number[] = new Array(size);
                var zCent : number[] = new Array(size);
                for(var ii : number = 0; ii < size; ii++) {
                    var part : Particle = this.__parent.d_partList.getParticle(ii);
                    var center : Point = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                    zCent[ii] = center.getZ();
                }
                for(var jj : number = 1; jj < size; jj++) {
                    var keyXCent : number = xCent[jj];
                    var keyYCent : number = yCent[jj];
                    var keyZCent : number = zCent[jj];
                    var keyRad : number = radius[jj];
                    var ii : number = jj - 1;
                    while((ii >= 0 && xCent[ii] > keyXCent)){
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        zCent[ii + 1] = zCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    };
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    zCent[ii + 1] = keyZCent;
                    radius[ii + 1] = keyRad;
                }
                for(var ii : number = 0; ii < size; ii++) {
                    var radXScreen : number = this.getXScreenLength(radius[ii]);
                    var radYScreen : number = this.getYScreenLength(radius[ii]);
                    var xCentScreen : number = this.getXScreenCoord(yCent[ii]);
                    var yCentScreen : number = this.getYScreenCoord(zCent[ii]);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                }
            }
        }

        export class FrontCanvas extends DisplayGeometryFrame.PlaneCanvas {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            public constructor(__parent: any, width : number, height : number) {
                super(__parent, width, height, DisplayGeometryFrame.FRONT);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 3140329813221024915;
                this.initialize();
            }

            initialize() {
            }

            public paintComponent(g : Graphics) {
                super.paintComponent(g);
                this.drawParticles(g);
            }

            public refresh() {
                var g : Graphics = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            }

            public clear(g : Graphics) {
                var d : Dimension = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            }

            drawParticles(g : Graphics) {
                var size : number = this.__parent.d_partList.size();
                if(!(size > 0)) return;
                var part : Particle = this.__parent.d_partList.getParticle(0);
                var type : number = part.getType();
                if(type === DisplayGeometryFrame.CIRCLE) this.drawCylinders(g, size); else if(type === DisplayGeometryFrame.SPHERE) this.drawSpheres(g, size);
            }

            drawCylinders(g : Graphics, size : number) {
                var radius : number[] = new Array(size);
                var xCent : number[] = new Array(size);
                var yCent : number[] = new Array(size);
                for(var ii : number = 0; ii < size; ii++) {
                    var part : Particle = this.__parent.d_partList.getParticle(ii);
                    var center : Point = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                }
                for(var jj : number = 1; jj < size; jj++) {
                    var keyXCent : number = xCent[jj];
                    var keyYCent : number = yCent[jj];
                    var keyRad : number = radius[jj];
                    var ii : number = jj - 1;
                    while((ii >= 0 && yCent[ii] < keyYCent)){
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    };
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    radius[ii + 1] = keyRad;
                }
                var blue : number = 216;
                for(var ii : number = 0; ii < size; ii++) {
                    var radScreen : number = this.getXScreenLength(radius[ii]);
                    var centScreen : number = this.getXScreenCoord(xCent[ii]);
                    var quo : number = ii % 8;
                    if(quo >= 7) blue = 27; else if(quo === 6) blue = 54; else if(quo === 5) blue = 81; else if(quo === 4) blue = 108; else if(quo === 3) blue = 135; else if(quo === 2) blue = 162; else if(quo === 1) blue = 189;
                    var clipRect : Rectangle = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, blue));
                    g.fillRect(centScreen - radScreen, this.ymin, 2 * radScreen, this.ymax - this.ymin);
                    g.setColor(new Color(0, 0, 0));
                    g.drawRect(centScreen - radScreen, this.ymin, 2 * radScreen, this.ymax - this.ymin);
                }
            }

            drawSpheres(g : Graphics, size : number) {
                var radius : number[] = new Array(size);
                var xCent : number[] = new Array(size);
                var yCent : number[] = new Array(size);
                var zCent : number[] = new Array(size);
                for(var ii : number = 0; ii < size; ii++) {
                    var part : Particle = this.__parent.d_partList.getParticle(ii);
                    var center : Point = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                    zCent[ii] = center.getZ();
                }
                for(var jj : number = 1; jj < size; jj++) {
                    var keyXCent : number = xCent[jj];
                    var keyYCent : number = yCent[jj];
                    var keyZCent : number = zCent[jj];
                    var keyRad : number = radius[jj];
                    var ii : number = jj - 1;
                    while((ii >= 0 && yCent[ii] < keyYCent)){
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        zCent[ii + 1] = zCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    };
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    zCent[ii + 1] = keyZCent;
                    radius[ii + 1] = keyRad;
                }
                for(var ii : number = 0; ii < size; ii++) {
                    var radXScreen : number = this.getXScreenLength(radius[ii]);
                    var radYScreen : number = this.getYScreenLength(radius[ii]);
                    var xCentScreen : number = this.getXScreenCoord(xCent[ii]);
                    var yCentScreen : number = this.getYScreenCoord(zCent[ii]);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                }
            }
        }
    }

}

