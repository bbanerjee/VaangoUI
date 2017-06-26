"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var DecimalFormat = java.text.DecimalFormat;
    var ParticleSize = (function () {
        function ParticleSize(partSizeDist) {
            var _this = this;
            this.compositeName = null;
            this.volFracInComposite = 0.0;
            this.nofSizesInp = 0;
            this.nofSizesCalc = 0;
            if (((partSizeDist != null && partSizeDist instanceof vaango_ui.ParticleSize) || partSizeDist === null)) {
                (function () {
                    _this.compositeName = partSizeDist.compositeName;
                    _this.volFracInComposite = partSizeDist.volFracInComposite;
                    _this.nofSizesInp = partSizeDist.nofSizesInp;
                    _this.sizeInp = new Array(ParticleSize.NOF_SIZES);
                    _this.volFracInp = new Array(ParticleSize.NOF_SIZES);
                    for (var ii = 0; ii < _this.nofSizesInp; ii++) {
                        _this.sizeInp[ii] = partSizeDist.sizeInp[ii];
                        _this.volFracInp[ii] = partSizeDist.volFracInp[ii];
                    }
                    _this.nofSizesCalc = partSizeDist.nofSizesCalc;
                    _this.sizeCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.freq2DCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.freq3DCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.volFrac2DCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.volFrac3DCalc = new Array(ParticleSize.NOF_SIZES);
                    for (var ii = 0; ii < _this.nofSizesCalc; ii++) {
                        _this.sizeCalc[ii] = partSizeDist.sizeCalc[ii];
                        _this.freq2DCalc[ii] = partSizeDist.freq2DCalc[ii];
                        _this.freq3DCalc[ii] = partSizeDist.freq3DCalc[ii];
                        _this.volFrac2DCalc[ii] = partSizeDist.volFrac2DCalc[ii];
                        _this.volFrac3DCalc[ii] = partSizeDist.volFrac3DCalc[ii];
                    }
                })();
            }
            else if (partSizeDist === undefined) {
                (function () {
                    _this.compositeName = "Default";
                    _this.volFracInComposite = 100.0;
                    _this.nofSizesInp = 2;
                    _this.sizeInp = new Array(ParticleSize.NOF_SIZES);
                    _this.volFracInp = new Array(ParticleSize.NOF_SIZES);
                    _this.nofSizesCalc = 2;
                    _this.sizeCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.freq2DCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.freq3DCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.volFrac2DCalc = new Array(ParticleSize.NOF_SIZES);
                    _this.volFrac3DCalc = new Array(ParticleSize.NOF_SIZES);
                    for (var ii = 0; ii < ParticleSize.NOF_SIZES; ii++) {
                        _this.sizeInp[ii] = 0.0;
                        _this.volFracInp[ii] = 0.0;
                        _this.sizeCalc[ii] = 0.0;
                        _this.freq2DCalc[ii] = 0;
                        _this.freq3DCalc[ii] = 0;
                        _this.volFrac2DCalc[ii] = 0;
                        _this.volFrac3DCalc[ii] = 0;
                    }
                    _this.sizeInp[0] = 100.0;
                    _this.volFracInp[0] = 10.0;
                    _this.sizeCalc[0] = 100.0;
                    _this.freq2DCalc[0] = 10;
                    _this.freq3DCalc[0] = 10;
                    _this.volFrac2DCalc[0] = 0.001;
                    _this.volFrac3DCalc[0] = 0.001;
                    _this.sizeInp[1] = 1000.0;
                    _this.volFracInp[1] = 90.0;
                    _this.sizeCalc[1] = 1000.0;
                    _this.freq2DCalc[1] = 90;
                    _this.freq3DCalc[1] = 90;
                    _this.volFrac2DCalc[1] = 0.999;
                    _this.volFrac3DCalc[1] = 0.999;
                })();
            }
            else
                throw new Error('invalid overload');
        }
        ParticleSize.prototype.copy = function (partSizeDist) {
            this.compositeName = partSizeDist.compositeName;
            this.volFracInComposite = partSizeDist.volFracInComposite;
            this.nofSizesInp = partSizeDist.nofSizesInp;
            for (var ii = 0; ii < this.nofSizesInp; ii++) {
                this.sizeInp[ii] = partSizeDist.sizeInp[ii];
                this.volFracInp[ii] = partSizeDist.volFracInp[ii];
            }
            this.nofSizesCalc = partSizeDist.nofSizesCalc;
            for (var ii = 0; ii < this.nofSizesCalc; ii++) {
                this.sizeCalc[ii] = partSizeDist.sizeCalc[ii];
                this.freq2DCalc[ii] = partSizeDist.freq2DCalc[ii];
                this.freq3DCalc[ii] = partSizeDist.freq3DCalc[ii];
                this.volFrac2DCalc[ii] = partSizeDist.volFrac2DCalc[ii];
                this.volFrac3DCalc[ii] = partSizeDist.volFrac3DCalc[ii];
            }
        };
        ParticleSize.prototype.print = function () {
            var df = new DecimalFormat("##0.##E00");
            console.info("Input");
            console.info("Size ... Vol.Frac");
            for (var ii = 0; ii < this.nofSizesInp; ii++) {
                console.info(df.format(this.sizeInp[ii]) + "    " + df.format(this.volFracInp[ii]));
            }
            console.info("Calculated");
            console.info("Size ... Number (2D) .. Vol.Frac (2D)... Number (3D) .. Vol.Frac (3D)");
            for (var ii = 0; ii < this.nofSizesCalc; ii++) {
                console.info(df.format(this.sizeCalc[ii]) + "    " + this.freq2DCalc[ii] + "     " + df.format(this.volFrac2DCalc[ii]) + "      " + this.freq3DCalc[ii] + "     " + df.format(this.volFrac3DCalc[ii]));
            }
        };
        return ParticleSize;
    }());
    ParticleSize.NOF_SIZES = 100;
    vaango_ui.ParticleSize = ParticleSize;
})(vaango_ui || (vaango_ui = {}));
