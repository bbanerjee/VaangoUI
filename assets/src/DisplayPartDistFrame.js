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
    var DecimalFormat = java.text.DecimalFormat;
    var DisplayPartDistFrame = (function (_super) {
        __extends(DisplayPartDistFrame, _super);
        function DisplayPartDistFrame(partSizeDist, parent) {
            var _this = _super.call(this) || this;
            _this.d_partSizeDist = null;
            _this.d_parent = null;
            _this.inputCanvas = null;
            _this.calcCanvas = null;
            _this.ballCanvas = null;
            _this.INPUT = 1;
            _this.CALC = 2;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.WindowConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.setLocation(100, 100);
            var canvasWidth = 100;
            var canvasHeight = 100;
            _this.setTitle("Particle Size Distribution");
            _this.d_partSizeDist = partSizeDist;
            _this.d_parent = parent;
            var panel1 = new JPanel(new GridLayout(1, 0));
            var panel11 = new JPanel();
            var panel12 = new JPanel();
            var panel2 = new JPanel();
            var gbInput = new GridBagLayout();
            var gbCalc = new GridBagLayout();
            var gbBall = new GridBagLayout();
            panel11.setLayout(gbInput);
            panel12.setLayout(gbCalc);
            panel2.setLayout(gbBall);
            var inputCanvasLabel = new JLabel("Input Size Distribution");
            _this.inputCanvas = new DisplayPartDistFrame.DistribCanvas(_this, 3 * canvasWidth, 3 * canvasHeight, _this.INPUT);
            var calcCanvasLabel = new JLabel("Calculated Size Distribution");
            _this.calcCanvas = new DisplayPartDistFrame.DistribCanvas(_this, 3 * canvasWidth, 3 * canvasHeight, _this.CALC);
            var ballCanvasLabel = new JLabel("Calculated Particle Sizes");
            _this.ballCanvas = new DisplayPartDistFrame.BallCanvas(_this, 6 * canvasWidth, canvasHeight);
            var gbc = new GridBagConstraints();
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gbInput.setConstraints(inputCanvasLabel, gbc);
            panel11.add(inputCanvasLabel);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gbInput.setConstraints(_this.inputCanvas, gbc);
            panel11.add(_this.inputCanvas);
            panel1.add(panel11);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gbCalc.setConstraints(calcCanvasLabel, gbc);
            panel12.add(calcCanvasLabel);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gbCalc.setConstraints(_this.calcCanvas, gbc);
            panel12.add(_this.calcCanvas);
            panel1.add(panel12);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gbBall.setConstraints(ballCanvasLabel, gbc);
            panel2.add(ballCanvasLabel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gbBall.setConstraints(_this.ballCanvas, gbc);
            panel2.add(_this.ballCanvas);
            var gb = new GridBagLayout();
            _this.getContentPane().setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.getContentPane().add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 1);
            gb.setConstraints(panel2, gbc);
            _this.getContentPane().add(panel2);
            return _this;
        }
        DisplayPartDistFrame.prototype.setParticleSizeDist = function (ps) {
            this.d_partSizeDist = ps;
        };
        DisplayPartDistFrame.prototype.refresh = function () {
            this.inputCanvas.refresh();
            this.calcCanvas.refresh();
            this.ballCanvas.refresh();
        };
        return DisplayPartDistFrame;
    }(JFrame));
    /**
     *
     */
    DisplayPartDistFrame.serialVersionUID = 621234823627831119;
    vaango_ui.DisplayPartDistFrame = DisplayPartDistFrame;
    (function (DisplayPartDistFrame) {
        var DistribCanvas = (function (_super) {
            __extends(DistribCanvas, _super);
            function DistribCanvas(__parent, width, height, flag) {
                var _this = _super.call(this, width, height) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -8140739435964672419;
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
                _this.d_flag = _this.__parent.INPUT;
                _this.initialize();
                _this.d_flag = flag;
                return _this;
            }
            DistribCanvas.prototype.initialize = function () {
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
            DistribCanvas.prototype.paintComponent = function (g) {
                this.drawHistogram(g);
                this.drawRule(g);
            };
            DistribCanvas.prototype.refresh = function () {
                var g = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            };
            DistribCanvas.prototype.clear = function (g) {
                var d = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            };
            DistribCanvas.prototype.drawRule = function (g) {
                var nofSizesInp = this.__parent.d_partSizeDist.nofSizesInp;
                if (nofSizesInp === 0)
                    return;
                var nofSizesCalc = this.__parent.d_partSizeDist.nofSizesCalc;
                var maxPartSize = 1000.0;
                if (this.d_flag === this.__parent.INPUT) {
                    maxPartSize = this.__parent.d_partSizeDist.sizeInp[nofSizesInp - 1];
                }
                else {
                    maxPartSize = this.__parent.d_partSizeDist.sizeCalc[nofSizesCalc - 1];
                }
                var expomanti = this.computeExponentMantissa(maxPartSize);
                var partSizeExponent = expomanti[0];
                var partSizeMantissa = expomanti[1];
                var scale = 100.0;
                var maxSize = Math.round((partSizeMantissa * scale));
                var sizeIncr = (maxSize / 10 | 0);
                g.setColor(new Color(230, 163, 4));
                g.fillRect(this.xmin - this.xbuf, this.ymin, this.xbuf, this.ymax - this.ymin);
                g.fillRect(this.xmin, this.ymax, this.xmax - this.xmin, this.ybuf);
                g.setColor(new Color(0, 0, 0));
                g.drawRect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                g.setFont(new Font("SansSerif", Font.PLAIN, 10));
                var xloc = this.xmin;
                var incr = ((this.xmax - this.xmin) / 10 | 0);
                g.drawString("Particle Size (x 1.0e" + new String(Math.round((partSizeExponent - 2.0))).toString() + ")", ((this.xmax + this.xmin) / 3 | 0), this.ymax + this.ybuf);
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
                var yloc = this.ymax;
                incr = ((this.ymax - this.ymin) / 10 | 0);
                if (this.d_flag !== this.__parent.INPUT)
                    g.drawString("N", 0, ((this.ymax + this.ymin) / 2 | 0));
                else
                    g.drawString("Vol %", 0, ((this.ymax + this.ymin) / 2 | 0) - this.xmedTick);
                for (var i = 0; i <= 10; i++) {
                    if (i % 10 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xlongTick, yloc);
                        g.drawString(/* valueOf */ new String(i * 10).toString(), 2, yloc);
                    }
                    else if (i % 2 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */ new String(i * 10).toString(), this.xmin - this.xlongTick, yloc);
                    }
                    else {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */ new String(i * 10).toString(), this.xmin - this.xlongTick, yloc);
                    }
                    yloc -= incr;
                }
            };
            DistribCanvas.prototype.computeExponentMantissa = function (val) {
                var exp = Math.abs(Math.log(val) / Math.log(10.0));
                if (val < 1.0) {
                    exp = -Math.ceil(exp);
                }
                else {
                    exp = Math.floor(exp);
                }
                var man = val * Math.pow(10.0, -exp);
                var output = new Array(2);
                output[0] = exp;
                output[1] = man;
                return output;
            };
            DistribCanvas.prototype.drawHistogram = function (g) {
                var nofSizesInp = this.__parent.d_partSizeDist.nofSizesInp;
                if (nofSizesInp === 0)
                    return;
                var nofSizesCalc = this.__parent.d_partSizeDist.nofSizesCalc;
                var maxPartSize = 1000.0;
                if (this.d_flag === this.__parent.INPUT) {
                    maxPartSize = this.__parent.d_partSizeDist.sizeInp[nofSizesInp - 1];
                }
                else {
                    maxPartSize = this.__parent.d_partSizeDist.sizeCalc[nofSizesCalc - 1];
                }
                var expomanti = this.computeExponentMantissa(maxPartSize);
                var partSizeMantissa = expomanti[1];
                var scale = 100.0;
                var maxSize = Math.round((partSizeMantissa * scale));
                if (this.d_flag === this.__parent.INPUT) {
                    var cum1 = 0.0;
                    for (var ii = 0; ii < nofSizesInp; ii++) {
                        var size_start = 0.0;
                        if (ii > 0)
                            size_start = this.__parent.d_partSizeDist.sizeInp[ii - 1];
                        var size_end = this.__parent.d_partSizeDist.sizeInp[ii];
                        size_start *= (partSizeMantissa * scale / maxPartSize);
                        size_end *= (partSizeMantissa * scale / maxPartSize);
                        var minXBox = this.getXScreenCoord(size_start, maxSize);
                        var minYBox = this.getYScreenCoord(this.__parent.d_partSizeDist.volFracInp[ii]);
                        var maxXBox = this.getXScreenCoord(size_end, maxSize);
                        var maxYBox = this.getYScreenCoord(0.0);
                        var boxWidth = maxXBox - minXBox;
                        var boxHeight = maxYBox - minYBox;
                        g.setColor(new Color(184, 119, 27));
                        g.fillRect(minXBox, minYBox, boxWidth, boxHeight);
                        g.setColor(new Color(0, 0, 0));
                        g.drawRect(minXBox, minYBox, boxWidth, boxHeight);
                        var x1 = this.getXScreenCoord(size_start, maxSize);
                        var x2 = this.getXScreenCoord(size_end, maxSize);
                        var y1 = this.getYScreenCoord(cum1);
                        cum1 += this.__parent.d_partSizeDist.volFracInp[ii];
                        var y2 = this.getYScreenCoord(cum1);
                        g.setColor(new Color(184, 60, 27));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        g.setColor(new Color(0, 0, 0));
                    }
                    var cum1Calc = 0.0;
                    for (var ii = 0; ii < nofSizesCalc; ii++) {
                        var size_start = 0.0;
                        if (ii > 0)
                            size_start = this.__parent.d_partSizeDist.sizeCalc[ii - 1];
                        var size_end = this.__parent.d_partSizeDist.sizeCalc[ii];
                        size_start *= (partSizeMantissa * scale / maxPartSize);
                        size_end *= (partSizeMantissa * scale / maxPartSize);
                        var minXBox = this.getXScreenCoord(size_start, maxSize);
                        var minYBox = this.getYScreenCoord(this.__parent.d_partSizeDist.volFrac3DCalc[ii]);
                        var maxXBox = this.getXScreenCoord(size_end, maxSize);
                        var maxYBox = this.getYScreenCoord(0.0);
                        var boxWidth = maxXBox - minXBox;
                        var boxHeight = maxYBox - minYBox;
                        g.setColor(new Color(200, 200, 10));
                        g.fillRect(minXBox, minYBox, boxWidth, boxHeight);
                        g.setColor(new Color(0, 0, 0));
                        g.drawRect(minXBox, minYBox, boxWidth, boxHeight);
                        g.setColor(new Color(0, 0, 0));
                        var x1 = this.getXScreenCoord(size_start, maxSize);
                        var x2 = this.getXScreenCoord(size_end, maxSize);
                        var y1 = this.getYScreenCoord(cum1Calc);
                        cum1Calc += this.__parent.d_partSizeDist.volFrac3DCalc[ii];
                        var y2 = this.getYScreenCoord(cum1Calc);
                        g.setColor(new Color(200, 200, 10));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        g.setColor(new Color(0, 0, 0));
                    }
                    var x0 = this.xmin + this.xbuf;
                    var y0 = this.ymin + this.yshortTick;
                    g.setColor(new Color(184, 119, 27));
                    g.fillRect(x0, y0, this.xshortTick, this.yshortTick);
                    g.setColor(new Color(0, 0, 0));
                    g.drawRect(x0, y0, this.xshortTick, this.yshortTick);
                    g.setColor(new Color(184, 60, 27));
                    y0 += (this.yshortTick / 2 | 0);
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2 | 0);
                    g.drawString("Input", x0 + this.xbuf, y0);
                    y0 = this.ymin + this.ylongTick;
                    g.setColor(new Color(200, 200, 10));
                    g.fillRect(x0, y0, this.xshortTick, this.yshortTick);
                    g.drawRect(x0, y0, this.xshortTick, this.yshortTick);
                    y0 += (this.yshortTick / 2 | 0);
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2 | 0);
                    g.drawString("Calculated", x0 + this.xbuf, y0);
                    g.setColor(new Color(0, 0, 0));
                }
                else {
                    var x0 = ((this.xmax - this.xmin) / 2 | 0);
                    var y0 = this.ymin + this.yshortTick;
                    y0 += (this.yshortTick / 2 | 0);
                    g.setColor(new Color(84, 27, 225));
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2 | 0);
                    g.drawString("Distribution in 2D", x0 + this.xbuf, y0);
                    y0 = this.ymin + this.ylongTick;
                    y0 += (this.yshortTick / 2 | 0);
                    g.setColor(new Color(184, 119, 27));
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2 | 0);
                    g.drawString("Distribution in 3D", x0 + this.xbuf, y0);
                    g.setColor(new Color(0, 0, 0));
                    var numBalls2D = 0.0;
                    var numBalls3D = 0.0;
                    for (var ii = 0; ii < nofSizesCalc; ii++) {
                        numBalls2D += this.__parent.d_partSizeDist.freq2DCalc[ii];
                        numBalls3D += this.__parent.d_partSizeDist.freq3DCalc[ii];
                    }
                    numBalls2D /= 100.0;
                    numBalls3D /= 100.0;
                    var cum1 = 0.0;
                    var cum2 = 0.0;
                    for (var ii = 0; ii < nofSizesCalc; ii++) {
                        var size_start = 0.0;
                        if (ii > 0)
                            size_start = this.__parent.d_partSizeDist.sizeCalc[ii - 1];
                        var size_end = this.__parent.d_partSizeDist.sizeCalc[ii];
                        size_start *= (partSizeMantissa * scale / maxPartSize);
                        size_end *= (partSizeMantissa * scale / maxPartSize);
                        var freq2D_start = 0.0;
                        var freq3D_start = 0.0;
                        if (ii > 0) {
                            freq2D_start = this.__parent.d_partSizeDist.freq2DCalc[ii - 1] / numBalls2D;
                            freq3D_start = this.__parent.d_partSizeDist.freq3DCalc[ii - 1] / numBalls3D;
                        }
                        var freq2D_end = this.__parent.d_partSizeDist.freq2DCalc[ii] / numBalls2D;
                        var freq3D_end = this.__parent.d_partSizeDist.freq3DCalc[ii] / numBalls3D;
                        var x1 = this.getXScreenCoord(size_start, maxSize);
                        var x2 = this.getXScreenCoord(size_end, maxSize);
                        var y1 = this.getYScreenCoord(freq2D_start);
                        var y2 = this.getYScreenCoord(freq2D_end);
                        g.setColor(new Color(84, 27, 225));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        y1 = this.getYScreenCoord(freq3D_start);
                        y2 = this.getYScreenCoord(freq3D_end);
                        g.setColor(new Color(184, 119, 27));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        g.setColor(new Color(0, 0, 0));
                        y1 = this.getYScreenCoord(cum1);
                        cum1 += freq2D_end;
                        y2 = this.getYScreenCoord(cum1);
                        g.setColor(new Color(84, 27, 225));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        y1 = this.getYScreenCoord(cum2);
                        cum2 += freq3D_end;
                        y2 = this.getYScreenCoord(cum2);
                        g.setColor(new Color(184, 119, 27));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        g.setColor(new Color(0, 0, 0));
                    }
                }
            };
            DistribCanvas.prototype.getXScreenCoord = function (coord, maxSize) {
                return this.xmin + ((coord / maxSize * (this.xmax - this.xmin)) | 0);
            };
            DistribCanvas.prototype.getYScreenCoord = function (coord) {
                return this.ymax - ((coord / 100.0 * (this.ymax - this.ymin)) | 0);
            };
            return DistribCanvas;
        }(vaango_ui.LightWeightCanvas));
        DisplayPartDistFrame.DistribCanvas = DistribCanvas;
        var BallCanvas = (function (_super) {
            __extends(BallCanvas, _super);
            function BallCanvas(__parent, width, height) {
                var _this = _super.call(this, width, height) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -5465706776407352728;
                _this.setBackground(new Color(255, 255, 255));
                return _this;
            }
            BallCanvas.prototype.paintComponent = function (g) {
                this.drawBalls(g);
            };
            BallCanvas.prototype.refresh = function () {
                var g = this.getGraphics();
                this.clear(g);
                this.paintComponent(g);
            };
            BallCanvas.prototype.clear = function (g) {
                var d = this.getSize();
                g.setColor(this.getBackground());
                g.fillRect(0, 0, d.width, d.height);
            };
            BallCanvas.prototype.drawBalls = function (g) {
                var d = this.getSize();
                var width = d.width;
                var height = d.height;
                g.setColor(new Color(255, 255, 255));
                g.fillRect(2, 2, width, height);
                g.setColor(new Color(0, 0, 0));
                var nofBallSizes = this.__parent.d_partSizeDist.nofSizesCalc;
                if (nofBallSizes === 0)
                    return;
                var boxWidth = (width / nofBallSizes | 0);
                var sqrBoxWidth = boxWidth - 5;
                if (boxWidth > height)
                    sqrBoxWidth = height - 5;
                var maxDia = this.__parent.d_partSizeDist.sizeCalc[nofBallSizes - 1];
                var scaleFactor = 1 / maxDia;
                var df = new DecimalFormat("###.#");
                var scaledRad = new Array(nofBallSizes);
                var xCent = new Array(nofBallSizes);
                var yCent = new Array(nofBallSizes);
                for (var ii = 0; ii < nofBallSizes; ii++) {
                    scaledRad[ii] = ((this.__parent.d_partSizeDist.sizeCalc[ii] * scaleFactor * sqrBoxWidth / 2.0) | 0);
                    xCent[ii] = (boxWidth / 2 | 0) + ii * boxWidth;
                    yCent[ii] = (height / 2 | 0);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCent[ii] - scaledRad[ii], yCent[ii] - scaledRad[ii], 2 * scaledRad[ii], 2 * scaledRad[ii]);
                    g.setFont(new Font("SansSerif", Font.PLAIN, 10));
                    g.setColor(new Color(0, 0, 0));
                    var output = df.format(this.__parent.d_partSizeDist.sizeCalc[ii]);
                    g.drawString(output, xCent[ii], yCent[ii]);
                }
            };
            return BallCanvas;
        }(vaango_ui.LightWeightCanvas));
        DisplayPartDistFrame.BallCanvas = BallCanvas;
    })(DisplayPartDistFrame = vaango_ui.DisplayPartDistFrame || (vaango_ui.DisplayPartDistFrame = {}));
})(vaango_ui || (vaango_ui = {}));
