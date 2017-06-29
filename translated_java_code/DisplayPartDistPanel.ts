"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import DecimalFormat = java.text.DecimalFormat;

    export class DisplayPartDistPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = -3857472260211697750;

        private d_partSizeDist : ParticleSize = null;

        private d_parent : ParticleSizeDistInputPanel = null;

        private inputCanvas : DisplayPartDistPanel.DistribCanvas = null;

        private calcCanvas : DisplayPartDistPanel.DistribCanvas = null;

        private ballCanvas : DisplayPartDistPanel.BallCanvas = null;

        INPUT : number = 1;

        CALC : number = 2;

        public constructor(partSizeDist : ParticleSize, parent : ParticleSizeDistInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_partSizeDist = partSizeDist;
            this.d_parent = parent;
            var canvasWidth : number = 100;
            var canvasHeight : number = 100;
            var panel1 : JPanel = new JPanel(new GridLayout(1, 0));
            var panel11 : JPanel = new JPanel();
            var panel12 : JPanel = new JPanel();
            var panel2 : JPanel = new JPanel();
            var gbInput : GridBagLayout = new GridBagLayout();
            var gbCalc : GridBagLayout = new GridBagLayout();
            var gbBall : GridBagLayout = new GridBagLayout();
            panel11.setLayout(gbInput);
            panel12.setLayout(gbCalc);
            panel2.setLayout(gbBall);
            var inputCanvasLabel : JLabel = new JLabel("Input Size Distribution");
            this.inputCanvas = new DisplayPartDistPanel.DistribCanvas(this, 3 * canvasWidth, 3 * canvasHeight, this.INPUT);
            var calcCanvasLabel : JLabel = new JLabel("Calculated Size Distribution");
            this.calcCanvas = new DisplayPartDistPanel.DistribCanvas(this, 3 * canvasWidth, 3 * canvasHeight, this.CALC);
            var ballCanvasLabel : JLabel = new JLabel("Calculated Particle Sizes");
            this.ballCanvas = new DisplayPartDistPanel.BallCanvas(this, 6 * canvasWidth, canvasHeight);
            var gbc : GridBagConstraints = new GridBagConstraints();
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gbInput.setConstraints(inputCanvasLabel, gbc);
            panel11.add(inputCanvasLabel);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gbInput.setConstraints(this.inputCanvas, gbc);
            panel11.add(this.inputCanvas);
            panel1.add(panel11);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gbCalc.setConstraints(calcCanvasLabel, gbc);
            panel12.add(calcCanvasLabel);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 5);
            gbCalc.setConstraints(this.calcCanvas, gbc);
            panel12.add(this.calcCanvas);
            panel1.add(panel12);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gbBall.setConstraints(ballCanvasLabel, gbc);
            panel2.add(ballCanvasLabel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gbBall.setConstraints(this.ballCanvas, gbc);
            panel2.add(this.ballCanvas);
            var gb : GridBagLayout = new GridBagLayout();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.BOTH, 1.0, 1.0, 0, 1, 1, 1, 1);
            gb.setConstraints(panel2, gbc);
            this.add(panel2);
        }

        public setParticleSizeDist(ps : ParticleSize) {
            this.d_partSizeDist = ps;
        }

        public refresh() {
            this.inputCanvas.refresh();
            this.calcCanvas.refresh();
            this.ballCanvas.refresh();
        }
    }

    export namespace DisplayPartDistPanel {

        export class DistribCanvas extends LightWeightCanvas {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

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

            d_flag : number;

            public constructor(__parent: any, width : number, height : number, flag : number) {
                super(width, height);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = 1499076092071613264;
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
                this.d_flag = this.__parent.INPUT;
                this.initialize();
                this.d_flag = flag;
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
                this.drawHistogram(g);
                this.drawRule(g);
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

            drawRule(g : Graphics) {
                var nofSizesInp : number = this.__parent.d_partSizeDist.nofSizesInp;
                if(nofSizesInp === 0) return;
                var nofSizesCalc : number = this.__parent.d_partSizeDist.nofSizesCalc;
                var maxPartSize : number = 1000.0;
                if(this.d_flag === this.__parent.INPUT) {
                    maxPartSize = this.__parent.d_partSizeDist.sizeInp[nofSizesInp - 1];
                } else {
                    maxPartSize = this.__parent.d_partSizeDist.sizeCalc[nofSizesCalc - 1];
                }
                var expomanti : number[] = this.computeExponentMantissa(maxPartSize);
                var partSizeExponent : number = expomanti[0];
                var partSizeMantissa : number = expomanti[1];
                var scale : number = 100.0;
                var maxSize : number = Math.round(<number>(partSizeMantissa * scale));
                var sizeIncr : number = (maxSize / 10|0);
                g.setColor(new Color(230, 163, 4));
                g.fillRect(this.xmin - this.xbuf, this.ymin, this.xbuf, this.ymax - this.ymin);
                g.fillRect(this.xmin, this.ymax, this.xmax - this.xmin, this.ybuf);
                g.setColor(new Color(0, 0, 0));
                g.drawRect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
                g.setFont(new Font("SansSerif", Font.PLAIN, 10));
                var xloc : number = this.xmin;
                var incr : number = ((this.xmax - this.xmin) / 10|0);
                g.drawString("Particle Size (x 1.0e" + /* valueOf */new String(Math.round(<number>(partSizeExponent - 2.0))).toString() + ")", ((this.xmax + this.xmin) / 3|0), this.ymax + this.ybuf);
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
                var yloc : number = this.ymax;
                incr = ((this.ymax - this.ymin) / 10|0);
                if(this.d_flag !== this.__parent.INPUT) g.drawString("N", 0, ((this.ymax + this.ymin) / 2|0)); else g.drawString("Vol %", 0, ((this.ymax + this.ymin) / 2|0) - this.xmedTick);
                for(var i : number = 0; i <= 10; i++) {
                    if(i % 10 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xlongTick, yloc);
                        g.drawString(/* valueOf */new String(i * 10).toString(), 2, yloc);
                    } else if(i % 2 === 0) {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */new String(i * 10).toString(), this.xmin - this.xlongTick, yloc);
                    } else {
                        g.drawLine(this.xmin, yloc, this.xmin - this.xshortTick, yloc);
                        g.drawString(/* valueOf */new String(i * 10).toString(), this.xmin - this.xlongTick, yloc);
                    }
                    yloc -= incr;
                }
            }

            computeExponentMantissa(val : number) : number[] {
                var exp : number = Math.abs(Math.log(val) / Math.log(10.0));
                if(val < 1.0) {
                    exp = -Math.ceil(exp);
                } else {
                    exp = Math.floor(exp);
                }
                var man : number = val * Math.pow(10.0, -exp);
                var output : number[] = new Array(2);
                output[0] = exp;
                output[1] = man;
                return output;
            }

            drawHistogram(g : Graphics) {
                var nofSizesInp : number = this.__parent.d_partSizeDist.nofSizesInp;
                if(nofSizesInp === 0) return;
                var nofSizesCalc : number = this.__parent.d_partSizeDist.nofSizesCalc;
                var maxPartSize : number = 1000.0;
                if(this.d_flag === this.__parent.INPUT) {
                    maxPartSize = this.__parent.d_partSizeDist.sizeInp[nofSizesInp - 1];
                } else {
                    maxPartSize = this.__parent.d_partSizeDist.sizeCalc[nofSizesCalc - 1];
                }
                var expomanti : number[] = this.computeExponentMantissa(maxPartSize);
                var partSizeMantissa : number = expomanti[1];
                var scale : number = 100.0;
                var maxSize : number = Math.round(<number>(partSizeMantissa * scale));
                if(this.d_flag === this.__parent.INPUT) {
                    var cum1 : number = 0.0;
                    for(var ii : number = 0; ii < nofSizesInp; ii++) {
                        var size_start : number = 0.0;
                        if(ii > 0) size_start = this.__parent.d_partSizeDist.sizeInp[ii - 1];
                        var size_end : number = this.__parent.d_partSizeDist.sizeInp[ii];
                        size_start *= (partSizeMantissa * scale / maxPartSize);
                        size_end *= (partSizeMantissa * scale / maxPartSize);
                        var minXBox : number = this.getXScreenCoord(size_start, maxSize);
                        var minYBox : number = this.getYScreenCoord(this.__parent.d_partSizeDist.volFracInp[ii]);
                        var maxXBox : number = this.getXScreenCoord(size_end, maxSize);
                        var maxYBox : number = this.getYScreenCoord(0.0);
                        var boxWidth : number = maxXBox - minXBox;
                        var boxHeight : number = maxYBox - minYBox;
                        g.setColor(new Color(184, 119, 27));
                        g.fillRect(minXBox, minYBox, boxWidth, boxHeight);
                        g.setColor(new Color(0, 0, 0));
                        g.drawRect(minXBox, minYBox, boxWidth, boxHeight);
                        var x1 : number = this.getXScreenCoord(size_start, maxSize);
                        var x2 : number = this.getXScreenCoord(size_end, maxSize);
                        var y1 : number = this.getYScreenCoord(cum1);
                        cum1 += this.__parent.d_partSizeDist.volFracInp[ii];
                        var y2 : number = this.getYScreenCoord(cum1);
                        g.setColor(new Color(184, 60, 27));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        g.setColor(new Color(0, 0, 0));
                    }
                    var cum1Calc : number = 0.0;
                    for(var ii : number = 0; ii < nofSizesCalc; ii++) {
                        var size_start : number = 0.0;
                        if(ii > 0) size_start = this.__parent.d_partSizeDist.sizeCalc[ii - 1];
                        var size_end : number = this.__parent.d_partSizeDist.sizeCalc[ii];
                        size_start *= (partSizeMantissa * scale / maxPartSize);
                        size_end *= (partSizeMantissa * scale / maxPartSize);
                        var minXBox : number = this.getXScreenCoord(size_start, maxSize);
                        var minYBox : number = this.getYScreenCoord(this.__parent.d_partSizeDist.volFrac3DCalc[ii]);
                        var maxXBox : number = this.getXScreenCoord(size_end, maxSize);
                        var maxYBox : number = this.getYScreenCoord(0.0);
                        var boxWidth : number = maxXBox - minXBox;
                        var boxHeight : number = maxYBox - minYBox;
                        g.setColor(new Color(200, 200, 10));
                        g.fillRect(minXBox, minYBox, boxWidth, boxHeight);
                        g.setColor(new Color(0, 0, 0));
                        g.drawRect(minXBox, minYBox, boxWidth, boxHeight);
                        g.setColor(new Color(0, 0, 0));
                        var x1 : number = this.getXScreenCoord(size_start, maxSize);
                        var x2 : number = this.getXScreenCoord(size_end, maxSize);
                        var y1 : number = this.getYScreenCoord(cum1Calc);
                        cum1Calc += this.__parent.d_partSizeDist.volFrac3DCalc[ii];
                        var y2 : number = this.getYScreenCoord(cum1Calc);
                        g.setColor(new Color(200, 200, 10));
                        g.drawLine(x1, y1, x2, y2);
                        g.drawLine(x1 + 1, y1, x2 + 1, y2);
                        g.drawLine(x1 + 2, y1, x2 + 2, y2);
                        g.setColor(new Color(0, 0, 0));
                    }
                    var x0 : number = this.xmin + this.xbuf;
                    var y0 : number = this.ymin + this.yshortTick;
                    g.setColor(new Color(184, 119, 27));
                    g.fillRect(x0, y0, this.xshortTick, this.yshortTick);
                    g.setColor(new Color(0, 0, 0));
                    g.drawRect(x0, y0, this.xshortTick, this.yshortTick);
                    g.setColor(new Color(184, 60, 27));
                    y0 += (this.yshortTick / 2|0);
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2|0);
                    g.drawString("Input", x0 + this.xbuf, y0);
                    y0 = this.ymin + this.ylongTick;
                    g.setColor(new Color(200, 200, 10));
                    g.fillRect(x0, y0, this.xshortTick, this.yshortTick);
                    g.drawRect(x0, y0, this.xshortTick, this.yshortTick);
                    y0 += (this.yshortTick / 2|0);
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2|0);
                    g.drawString("Calculated", x0 + this.xbuf, y0);
                    g.setColor(new Color(0, 0, 0));
                } else {
                    var x0 : number = ((this.xmax - this.xmin) / 2|0);
                    var y0 : number = this.ymin + this.yshortTick;
                    y0 += (this.yshortTick / 2|0);
                    g.setColor(new Color(84, 27, 225));
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2|0);
                    g.drawString("Distribution in 2D", x0 + this.xbuf, y0);
                    y0 = this.ymin + this.ylongTick;
                    y0 += (this.yshortTick / 2|0);
                    g.setColor(new Color(184, 119, 27));
                    g.drawLine(x0 + this.xmedTick, y0, x0 + this.xlongTick, y0);
                    y0 += (this.yshortTick / 2|0);
                    g.drawString("Distribution in 3D", x0 + this.xbuf, y0);
                    g.setColor(new Color(0, 0, 0));
                    var numBalls2D : number = 0.0;
                    var numBalls3D : number = 0.0;
                    for(var ii : number = 0; ii < nofSizesCalc; ii++) {
                        numBalls2D += this.__parent.d_partSizeDist.freq2DCalc[ii];
                        numBalls3D += this.__parent.d_partSizeDist.freq3DCalc[ii];
                    }
                    numBalls2D /= 100.0;
                    numBalls3D /= 100.0;
                    var cum1 : number = 0.0;
                    var cum2 : number = 0.0;
                    for(var ii : number = 0; ii < nofSizesCalc; ii++) {
                        var size_start : number = 0.0;
                        if(ii > 0) size_start = this.__parent.d_partSizeDist.sizeCalc[ii - 1];
                        var size_end : number = this.__parent.d_partSizeDist.sizeCalc[ii];
                        size_start *= (partSizeMantissa * scale / maxPartSize);
                        size_end *= (partSizeMantissa * scale / maxPartSize);
                        var freq2D_start : number = 0.0;
                        var freq3D_start : number = 0.0;
                        if(ii > 0) {
                            freq2D_start = this.__parent.d_partSizeDist.freq2DCalc[ii - 1] / numBalls2D;
                            freq3D_start = this.__parent.d_partSizeDist.freq3DCalc[ii - 1] / numBalls3D;
                        }
                        var freq2D_end : number = this.__parent.d_partSizeDist.freq2DCalc[ii] / numBalls2D;
                        var freq3D_end : number = this.__parent.d_partSizeDist.freq3DCalc[ii] / numBalls3D;
                        var x1 : number = this.getXScreenCoord(size_start, maxSize);
                        var x2 : number = this.getXScreenCoord(size_end, maxSize);
                        var y1 : number = this.getYScreenCoord(freq2D_start);
                        var y2 : number = this.getYScreenCoord(freq2D_end);
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
            }

            getXScreenCoord(coord : number, maxSize : number) : number {
                return this.xmin + (<number>(coord / maxSize * (this.xmax - this.xmin))|0);
            }

            getYScreenCoord(coord : number) : number {
                return this.ymax - (<number>(coord / 100.0 * (this.ymax - this.ymin))|0);
            }
        }

        export class BallCanvas extends LightWeightCanvas {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            public constructor(__parent: any, width : number, height : number) {
                super(width, height);
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -8031713824337460367;
                this.setBackground(new Color(255, 255, 255));
            }

            public paintComponent(g : Graphics) {
                this.drawBalls(g);
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

            drawBalls(g : Graphics) {
                var d : Dimension = this.getSize();
                var width : number = d.width;
                var height : number = d.height;
                g.setColor(new Color(255, 255, 255));
                g.fillRect(2, 2, width, height);
                g.setColor(new Color(0, 0, 0));
                var nofBallSizes : number = this.__parent.d_partSizeDist.nofSizesCalc;
                if(nofBallSizes === 0) return;
                var boxWidth : number = (width / nofBallSizes|0);
                var sqrBoxWidth : number = boxWidth - 5;
                if(boxWidth > height) sqrBoxWidth = height - 5;
                var maxDia : number = this.__parent.d_partSizeDist.sizeCalc[nofBallSizes - 1];
                var scaleFactor : number = 1 / maxDia;
                var df : DecimalFormat = new DecimalFormat("###.#");
                var scaledRad : number[] = new Array(nofBallSizes);
                var xCent : number[] = new Array(nofBallSizes);
                var yCent : number[] = new Array(nofBallSizes);
                for(var ii : number = 0; ii < nofBallSizes; ii++) {
                    scaledRad[ii] = (<number>(this.__parent.d_partSizeDist.sizeCalc[ii] * scaleFactor * sqrBoxWidth / 2.0)|0);
                    xCent[ii] = (boxWidth / 2|0) + ii * boxWidth;
                    yCent[ii] = (height / 2|0);
                    g.setColor(new Color(184, 119, 27));
                    g.fillOval(xCent[ii] - scaledRad[ii], yCent[ii] - scaledRad[ii], 2 * scaledRad[ii], 2 * scaledRad[ii]);
                    g.setFont(new Font("SansSerif", Font.PLAIN, 10));
                    g.setColor(new Color(0, 0, 0));
                    var output : string = df.format(this.__parent.d_partSizeDist.sizeCalc[ii]);
                    g.drawString(output, xCent[ii], yCent[ii]);
                }
            }
        }
    }

}

