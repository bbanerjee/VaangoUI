"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var vaango_ui;
(function (vaango_ui) {
    var DisplayParticleLocFrame = (function (_super) {
        __extends(DisplayParticleLocFrame, _super);
        function DisplayParticleLocFrame(partList, parent) {
            var _this = _super.call(this) || this;
            _this.d_isHollow = false;
            _this.d_thickness = 0.0;
            _this.d_partList = null;
            _this.d_parent = null;
            _this.topCanvas = null;
            _this.sideCanvas = null;
            _this.frontCanvas = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.WindowConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.setLocation(100, 100);
            _this.setTitle("Particle Locations");
            _this.d_isHollow = false;
            _this.d_thickness = 0.0;
            _this.d_partList = partList;
            _this.d_parent = parent;
            var panel = new JPanel(new GridLayout(2, 2));
            _this.topCanvas = new DisplayParticleLocFrame.TopCanvas(_this, 300, 300);
            _this.sideCanvas = new DisplayParticleLocFrame.SideCanvas(_this, 300, 300);
            _this.frontCanvas = new DisplayParticleLocFrame.FrontCanvas(_this, 300, 300);
            panel.add(_this.topCanvas);
            panel.add(_this.sideCanvas);
            panel.add(_this.frontCanvas);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.getContentPane().setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel, gbc);
            _this.getContentPane().add(panel);
            _this.pack();
            return _this;
        }
        DisplayParticleLocFrame.prototype.refresh = function () {
            this.topCanvas.refresh();
            this.sideCanvas.refresh();
            this.frontCanvas.refresh();
        };
        return DisplayParticleLocFrame;
    }(JFrame));
    DisplayParticleLocFrame.serialVersionUID = -4659212516518318851;
    DisplayParticleLocFrame.TOP = 1;
    DisplayParticleLocFrame.SIDE = 2;
    DisplayParticleLocFrame.FRONT = 3;
    DisplayParticleLocFrame.CIRCLE = 1;
    DisplayParticleLocFrame.SPHERE = 2;
    DisplayParticleLocFrame.YES = 1;
    DisplayParticleLocFrame.NO = 2;
    vaango_ui.DisplayParticleLocFrame = DisplayParticleLocFrame;
    (function (DisplayParticleLocFrame) {
        var PlaneCanvas = (function (_super) {
            __extends(PlaneCanvas, _super);
            function PlaneCanvas(__parent, width, height, type) {
                var _this = _super.call(this, width, height) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -5023314821860674475;
                _this.d_type = 0;
                _this.xbuf = 0;
                _this.ybuf = 0;
                _this.xsmallbuf = 0;
                _this.ysmallbuf = 0;
                _this.xmin = 0;
                _this.ymin = 0;
                _this.xmax = 0;
                _this.ymax = 0;
                _this.xshortTick = 0;
                _this.yshortTick = 0;
                _this.xmedTick = 0;
                _this.ymedTick = 0;
                _this.xlongTick = 0;
                _this.ylongTick = 0;
                _this.d_rveSize = 0;
                _this.d_type = type;
                _this.d_rveSize = _this.__parent.d_parent.getRVESize();
                _this.initialize();
                return _this;
            }
            PlaneCanvas.prototype.initialize = function () {
                var d = this.getSize();
                this.xbuf = (d.width / 10 | 0);
                this.ybuf = (d.height / 10 | 0);
                this.xsmallbuf = (this.xbuf / 4 | 0);
                this.ysmallbuf = (this.ybuf / 4 | 0);
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
            };
            PlaneCanvas.prototype.paintComponent = function (g) {
                this.d_rveSize = this.__parent.d_parent.getRVESize();
                this.drawRule(g);
            };
            PlaneCanvas.prototype.paintImmediately$ = function () {
                this.paintImmediately(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
            };
            PlaneCanvas.prototype.paintImmediately = function (x, y, w, h) {
                var _this = this;
                if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof w === 'number') || w === null) && ((typeof h === 'number') || h === null)) {
                    return (function () {
                        var g = _this.getGraphics();
                        _super.prototype.paintImmediately.call(_this, x, y, w, h);
                        _this.d_rveSize = _this.__parent.d_parent.getRVESize();
                        _this.drawRule(g);
                    })();
                }
                else if (x === undefined && y === undefined && w === undefined && h === undefined) {
                    return this.paintImmediately$();
                }
                else
                    throw new Error('invalid overload');
            };
            PlaneCanvas.prototype.drawRule = function (g) {
                var sizeIncr = this.d_rveSize / 10.0;
                g.setColor(new Color(230, 163, 4));
                g.fillRect(this.xmin - this.xbuf, this.ymin, this.xbuf, this.ymax - this.ymin);
                g.fillRect(this.xmin, this.ymax, this.xmax - this.xmin, this.ybuf);
                g.setColor(new Color(0, 0, 0));
                g.drawRect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                g.setFont(new Font("SansSerif", Font.PLAIN, 10));
                var xloc = this.xmin;
                var incr = ((this.xmax - this.xmin) / 10 | 0);
                var viewType = null;
                var xAxis = null;
                var yAxis = null;
                if (this.d_type === DisplayParticleLocFrame.TOP) {
                    viewType = "Top View";
                    xAxis = "X, 1";
                    yAxis = "Y, 2";
                }
                else if (this.d_type === DisplayParticleLocFrame.SIDE) {
                    viewType = "Side View";
                    xAxis = "Y, 2";
                    yAxis = "Z, 3";
                }
                else if (this.d_type === DisplayParticleLocFrame.FRONT) {
                    viewType = "Front View";
                    xAxis = "X, 1";
                    yAxis = "Z, 3";
                }
                g.drawString(viewType, ((this.xmax + this.xmin) / 3 | 0), this.ymax + this.ybuf);
                for (var i = 0; i <= 10; i++) {
                    if (i % 10 === 0) {
                        g.drawLine(xloc, this.ymax, xloc, this.ymax + this.ylongTick);
                        g.drawString(/* valueOf */ new String(i * sizeIncr).toString(), xloc - this.xshortTick, this.ymax + this.ybuf - 2);
                    }
                    else if (i % 2 === 0) {
                        g.drawLine(xloc, this.ymax, xloc, this.ymax + this.yshortTick);
                        g.drawString(/* valueOf */ new String(i * sizeIncr).toString(), xloc - this.xshortTick, this.ymax + this.ymedTick + 2);
                    }
                    else {
                        g.drawLine(xloc, this.ymax, xloc, this.ymax + this.yshortTick);
                        g.drawString(/* valueOf */ new String(i * sizeIncr).toString(), xloc - this.xshortTick, this.ymax + this.ymedTick + 2);
                    }
                    xloc += incr;
                }
                g.drawString(xAxis, this.xmax + this.xshortTick, this.ymax);
                var yloc = this.ymax;
                incr = ((this.ymax - this.ymin) / 10 | 0);
                for (var i = 0; i <= 10; i++) {
                    if (i % 10 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xlongTick, yloc);
                        g.drawString(/* valueOf */ new String(i * sizeIncr).toString(), 2, yloc);
                    }
                    else if (i % 2 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */ new String(i * sizeIncr).toString(), this.xmin - this.xlongTick, yloc);
                    }
                    else {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */ new String(i * sizeIncr).toString(), this.xmin - this.xlongTick, yloc);
                    }
                    yloc -= incr;
                }
                g.drawString(yAxis, this.xmin, this.ymin - this.yshortTick);
            };
            PlaneCanvas.prototype.getXScreenCoord = function (coord) {
                return this.xmin + ((coord / this.d_rveSize * (this.xmax - this.xmin)) | 0);
            };
            PlaneCanvas.prototype.getYScreenCoord = function (coord) {
                return this.ymax - ((coord / this.d_rveSize * (this.ymax - this.ymin)) | 0);
            };
            PlaneCanvas.prototype.getXScreenLength = function (length) {
                return ((length / this.d_rveSize * (this.xmax - this.xmin)) | 0);
            };
            PlaneCanvas.prototype.getYScreenLength = function (length) {
                return ((length / this.d_rveSize * (this.ymax - this.ymin)) | 0);
            };
            return PlaneCanvas;
        }(vaango_ui.LightWeightCanvas));
        DisplayParticleLocFrame.PlaneCanvas = PlaneCanvas;
        var TopCanvas = (function (_super) {
            __extends(TopCanvas, _super);
            function TopCanvas(__parent, width, height) {
                var _this = _super.call(this, __parent, width, height, DisplayParticleLocFrame.TOP) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -2782466296581762181;
                _this.initialize();
                return _this;
            }
            TopCanvas.prototype.initialize = function () {
            };
            TopCanvas.prototype.paintComponent = function (g) {
                _super.prototype.paintComponent.call(this, g);
                this.drawParticles(g);
            };
            TopCanvas.prototype.paintImmediately$ = function () {
                this.paintImmediately(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
            };
            TopCanvas.prototype.paintImmediately = function (x, y, w, h) {
                var _this = this;
                if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof w === 'number') || w === null) && ((typeof h === 'number') || h === null)) {
                    return (function () {
                        var g = _this.getGraphics();
                        _super.prototype.paintImmediately.call(_this, x, y, w, h);
                        _this.drawParticles(g);
                    })();
                }
                else if (x === undefined && y === undefined && w === undefined && h === undefined) {
                    return this.paintImmediately$();
                }
                else
                    throw new Error('invalid overload');
            };
            TopCanvas.prototype.refresh = function () {
                var g = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            };
            TopCanvas.prototype.clear = function (g) {
                var d = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            };
            TopCanvas.prototype.drawParticles = function (g) {
                var size = this.__parent.d_partList.size();
                if (!(size > 0))
                    return;
                var part = this.__parent.d_partList.getParticle(0);
                var type = part.getType();
                this.__parent.d_thickness = part.getThickness();
                if (this.__parent.d_thickness > 0.0)
                    this.__parent.d_isHollow = true;
                if (type === DisplayParticleLocFrame.CIRCLE)
                    this.drawCircles(g, size);
                else if (type === DisplayParticleLocFrame.SPHERE)
                    this.drawSpheres(g, size);
                g.drawRect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
            };
            TopCanvas.prototype.drawCircles = function (g, size) {
                for (var ii = 0; ii < size; ii++) {
                    var part = this.__parent.d_partList.getParticle(ii);
                    var radius = part.getRadius();
                    var center = part.getCenter();
                    var xCent = center.getX();
                    var yCent = center.getY();
                    if (this.circleIsOutsideRVE(radius, xCent, yCent)) {
                        continue;
                    }
                    var radXScreen = this.getXScreenLength(radius);
                    var radYScreen = this.getYScreenLength(radius);
                    var xCentScreen = this.getXScreenCoord(xCent);
                    var yCentScreen = this.getYScreenCoord(yCent);
                    var clipRect = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    if (this.__parent.d_isHollow) {
                        radXScreen = this.getXScreenLength(radius - this.__parent.d_thickness);
                        radYScreen = this.getYScreenLength(radius - this.__parent.d_thickness);
                        g.setColor(this.getBackground());
                        g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                        g.setColor(new Color(0, 0, 0));
                        g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    }
                }
            };
            TopCanvas.prototype.circleIsOutsideRVE = function (rad, xCent, yCent) {
                var distXPlus = this.d_rveSize - (xCent - rad);
                var distYPlus = this.d_rveSize - (yCent - rad);
                var distXMinus = xCent + rad;
                var distYMinus = yCent + rad;
                if (distXPlus <= 0.0)
                    return true;
                if (distYPlus <= 0.0)
                    return true;
                if (distXMinus <= 0.0)
                    return true;
                if (distYMinus <= 0.0)
                    return true;
                return false;
            };
            TopCanvas.prototype.drawSpheres = function (g, size) {
                var radius = new Array(size);
                var xCent = new Array(size);
                var yCent = new Array(size);
                var zCent = new Array(size);
                for (var ii = 0; ii < size; ii++) {
                    var part = this.__parent.d_partList.getParticle(ii);
                    var center = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                    zCent[ii] = center.getZ();
                }
                for (var jj = 1; jj < size; jj++) {
                    var keyXCent = xCent[jj];
                    var keyYCent = yCent[jj];
                    var keyZCent = zCent[jj];
                    var keyRad = radius[jj];
                    var ii = jj - 1;
                    while ((ii >= 0 && zCent[ii] > keyZCent)) {
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        zCent[ii + 1] = zCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    }
                    ;
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    zCent[ii + 1] = keyZCent;
                    radius[ii + 1] = keyRad;
                }
                for (var ii = 0; ii < size; ii++) {
                    var radXScreen = this.getXScreenLength(radius[ii]);
                    var radYScreen = this.getYScreenLength(radius[ii]);
                    var xCentScreen = this.getXScreenCoord(xCent[ii]);
                    var yCentScreen = this.getYScreenCoord(yCent[ii]);
                    var clipRect = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                }
            };
            return TopCanvas;
        }(DisplayParticleLocFrame.PlaneCanvas));
        DisplayParticleLocFrame.TopCanvas = TopCanvas;
        var SideCanvas = (function (_super) {
            __extends(SideCanvas, _super);
            function SideCanvas(__parent, width, height) {
                var _this = _super.call(this, __parent, width, height, DisplayParticleLocFrame.SIDE) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 6945730750216943834;
                _this.initialize();
                return _this;
            }
            SideCanvas.prototype.initialize = function () {
            };
            SideCanvas.prototype.paintComponent = function (g) {
                _super.prototype.paintComponent.call(this, g);
                this.drawParticles(g);
            };
            SideCanvas.prototype.refresh = function () {
                var g = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            };
            SideCanvas.prototype.clear = function (g) {
                var d = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            };
            SideCanvas.prototype.drawParticles = function (g) {
                var size = this.__parent.d_partList.size();
                if (!(size > 0))
                    return;
                var part = this.__parent.d_partList.getParticle(0);
                var type = part.getType();
                this.__parent.d_thickness = part.getThickness();
                if (this.__parent.d_thickness > 0.0)
                    this.__parent.d_isHollow = true;
                if (type === DisplayParticleLocFrame.CIRCLE)
                    this.drawCylinders(g, size);
                else if (type === DisplayParticleLocFrame.SPHERE)
                    this.drawSpheres(g, size);
            };
            SideCanvas.prototype.drawCylinders = function (g, size) {
                var radius = new Array(size);
                var xCent = new Array(size);
                var yCent = new Array(size);
                for (var ii = 0; ii < size; ii++) {
                    var part = this.__parent.d_partList.getParticle(ii);
                    var center = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                }
                for (var jj = 1; jj < size; jj++) {
                    var keyXCent = xCent[jj];
                    var keyYCent = yCent[jj];
                    var keyRad = radius[jj];
                    var ii = jj - 1;
                    while ((ii >= 0 && xCent[ii] > keyXCent)) {
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    }
                    ;
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    radius[ii + 1] = keyRad;
                }
                var blue = 216;
                for (var ii = 0; ii < size; ii++) {
                    var radScreen = this.getYScreenLength(radius[ii]);
                    var centScreen = this.getYScreenCoord(yCent[ii]);
                    var quo = ii % 8;
                    if (quo >= 7)
                        blue = 27;
                    else if (quo === 6)
                        blue = 54;
                    else if (quo === 5)
                        blue = 81;
                    else if (quo === 4)
                        blue = 108;
                    else if (quo === 3)
                        blue = 135;
                    else if (quo === 2)
                        blue = 162;
                    else if (quo === 1)
                        blue = 189;
                    var clipRect = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, blue));
                    g.fillRect(this.xmin, centScreen - radScreen, this.xmax - this.xmin, 2 * radScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawRect(this.xmin, centScreen - radScreen, this.xmax - this.xmin, 2 * radScreen);
                }
            };
            SideCanvas.prototype.drawSpheres = function (g, size) {
                var radius = new Array(size);
                var xCent = new Array(size);
                var yCent = new Array(size);
                var zCent = new Array(size);
                for (var ii = 0; ii < size; ii++) {
                    var part = this.__parent.d_partList.getParticle(ii);
                    var center = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                    zCent[ii] = center.getZ();
                }
                for (var jj = 1; jj < size; jj++) {
                    var keyXCent = xCent[jj];
                    var keyYCent = yCent[jj];
                    var keyZCent = zCent[jj];
                    var keyRad = radius[jj];
                    var ii = jj - 1;
                    while ((ii >= 0 && xCent[ii] > keyXCent)) {
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        zCent[ii + 1] = zCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    }
                    ;
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    zCent[ii + 1] = keyZCent;
                    radius[ii + 1] = keyRad;
                }
                for (var ii = 0; ii < size; ii++) {
                    var radXScreen = this.getXScreenLength(radius[ii]);
                    var radYScreen = this.getYScreenLength(radius[ii]);
                    var xCentScreen = this.getXScreenCoord(yCent[ii]);
                    var yCentScreen = this.getYScreenCoord(zCent[ii]);
                    var clipRect = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                }
            };
            return SideCanvas;
        }(DisplayParticleLocFrame.PlaneCanvas));
        DisplayParticleLocFrame.SideCanvas = SideCanvas;
        var FrontCanvas = (function (_super) {
            __extends(FrontCanvas, _super);
            function FrontCanvas(__parent, width, height) {
                var _this = _super.call(this, __parent, width, height, DisplayParticleLocFrame.FRONT) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = 5215584795809418193;
                _this.initialize();
                return _this;
            }
            FrontCanvas.prototype.initialize = function () {
            };
            FrontCanvas.prototype.paintComponent = function (g) {
                _super.prototype.paintComponent.call(this, g);
                this.drawParticles(g);
            };
            FrontCanvas.prototype.refresh = function () {
                var g = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            };
            FrontCanvas.prototype.clear = function (g) {
                var d = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            };
            FrontCanvas.prototype.drawParticles = function (g) {
                var size = this.__parent.d_partList.size();
                if (!(size > 0))
                    return;
                var part = this.__parent.d_partList.getParticle(0);
                var type = part.getType();
                this.__parent.d_thickness = part.getThickness();
                if (this.__parent.d_thickness > 0.0)
                    this.__parent.d_isHollow = true;
                if (type === DisplayParticleLocFrame.CIRCLE)
                    this.drawCylinders(g, size);
                else if (type === DisplayParticleLocFrame.SPHERE)
                    this.drawSpheres(g, size);
            };
            FrontCanvas.prototype.drawCylinders = function (g, size) {
                var radius = new Array(size);
                var xCent = new Array(size);
                var yCent = new Array(size);
                for (var ii = 0; ii < size; ii++) {
                    var part = this.__parent.d_partList.getParticle(ii);
                    var center = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                }
                for (var jj = 1; jj < size; jj++) {
                    var keyXCent = xCent[jj];
                    var keyYCent = yCent[jj];
                    var keyRad = radius[jj];
                    var ii = jj - 1;
                    while ((ii >= 0 && yCent[ii] < keyYCent)) {
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    }
                    ;
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    radius[ii + 1] = keyRad;
                }
                var blue = 216;
                for (var ii = 0; ii < size; ii++) {
                    var radScreen = this.getXScreenLength(radius[ii]);
                    var centScreen = this.getXScreenCoord(xCent[ii]);
                    var quo = ii % 8;
                    if (quo >= 7)
                        blue = 27;
                    else if (quo === 6)
                        blue = 54;
                    else if (quo === 5)
                        blue = 81;
                    else if (quo === 4)
                        blue = 108;
                    else if (quo === 3)
                        blue = 135;
                    else if (quo === 2)
                        blue = 162;
                    else if (quo === 1)
                        blue = 189;
                    var clipRect = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, blue));
                    g.fillRect(centScreen - radScreen, this.ymin, 2 * radScreen, this.ymax - this.ymin);
                    g.setColor(new Color(0, 0, 0));
                    g.drawRect(centScreen - radScreen, this.ymin, 2 * radScreen, this.ymax - this.ymin);
                }
            };
            FrontCanvas.prototype.drawSpheres = function (g, size) {
                var radius = new Array(size);
                var xCent = new Array(size);
                var yCent = new Array(size);
                var zCent = new Array(size);
                for (var ii = 0; ii < size; ii++) {
                    var part = this.__parent.d_partList.getParticle(ii);
                    var center = part.getCenter();
                    radius[ii] = part.getRadius();
                    xCent[ii] = center.getX();
                    yCent[ii] = center.getY();
                    zCent[ii] = center.getZ();
                }
                for (var jj = 1; jj < size; jj++) {
                    var keyXCent = xCent[jj];
                    var keyYCent = yCent[jj];
                    var keyZCent = zCent[jj];
                    var keyRad = radius[jj];
                    var ii = jj - 1;
                    while ((ii >= 0 && yCent[ii] < keyYCent)) {
                        xCent[ii + 1] = xCent[ii];
                        yCent[ii + 1] = yCent[ii];
                        zCent[ii + 1] = zCent[ii];
                        radius[ii + 1] = radius[ii];
                        ii--;
                    }
                    ;
                    xCent[ii + 1] = keyXCent;
                    yCent[ii + 1] = keyYCent;
                    zCent[ii + 1] = keyZCent;
                    radius[ii + 1] = keyRad;
                }
                for (var ii = 0; ii < size; ii++) {
                    var radXScreen = this.getXScreenLength(radius[ii]);
                    var radYScreen = this.getYScreenLength(radius[ii]);
                    var xCentScreen = this.getXScreenCoord(xCent[ii]);
                    var yCentScreen = this.getYScreenCoord(zCent[ii]);
                    var clipRect = new Rectangle(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                    g.setClip(clipRect);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                    g.setColor(new Color(0, 0, 0));
                    g.drawOval(xCentScreen - radXScreen, yCentScreen - radYScreen, 2 * radXScreen, 2 * radYScreen);
                }
            };
            return FrontCanvas;
        }(DisplayParticleLocFrame.PlaneCanvas));
        DisplayParticleLocFrame.FrontCanvas = FrontCanvas;
    })(DisplayParticleLocFrame = vaango_ui.DisplayParticleLocFrame || (vaango_ui.DisplayParticleLocFrame = {}));
})(vaango_ui || (vaango_ui = {}));
