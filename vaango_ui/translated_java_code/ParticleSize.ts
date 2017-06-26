"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import DecimalFormat = java.text.DecimalFormat;

    export class ParticleSize {
        public static NOF_SIZES : number = 100;

        public compositeName : string = null;

        public volFracInComposite : number = 0.0;

        public nofSizesInp : number = 0;

        public sizeInp : number[];

        public volFracInp : number[];

        public nofSizesCalc : number = 0;

        public sizeCalc : number[];

        public freq2DCalc : number[];

        public freq3DCalc : number[];

        public volFrac2DCalc : number[];

        public volFrac3DCalc : number[];

        public constructor(partSizeDist? : any) {
            if(((partSizeDist != null && partSizeDist instanceof vaango_ui.ParticleSize) || partSizeDist === null)) {
                (() => {
                    this.compositeName = partSizeDist.compositeName;
                    this.volFracInComposite = partSizeDist.volFracInComposite;
                    this.nofSizesInp = partSizeDist.nofSizesInp;
                    this.sizeInp = new Array(ParticleSize.NOF_SIZES);
                    this.volFracInp = new Array(ParticleSize.NOF_SIZES);
                    for(var ii : number = 0; ii < this.nofSizesInp; ii++) {
                        this.sizeInp[ii] = partSizeDist.sizeInp[ii];
                        this.volFracInp[ii] = partSizeDist.volFracInp[ii];
                    }
                    this.nofSizesCalc = partSizeDist.nofSizesCalc;
                    this.sizeCalc = new Array(ParticleSize.NOF_SIZES);
                    this.freq2DCalc = new Array(ParticleSize.NOF_SIZES);
                    this.freq3DCalc = new Array(ParticleSize.NOF_SIZES);
                    this.volFrac2DCalc = new Array(ParticleSize.NOF_SIZES);
                    this.volFrac3DCalc = new Array(ParticleSize.NOF_SIZES);
                    for(var ii : number = 0; ii < this.nofSizesCalc; ii++) {
                        this.sizeCalc[ii] = partSizeDist.sizeCalc[ii];
                        this.freq2DCalc[ii] = partSizeDist.freq2DCalc[ii];
                        this.freq3DCalc[ii] = partSizeDist.freq3DCalc[ii];
                        this.volFrac2DCalc[ii] = partSizeDist.volFrac2DCalc[ii];
                        this.volFrac3DCalc[ii] = partSizeDist.volFrac3DCalc[ii];
                    }
                })();
            } else if(partSizeDist === undefined) {
                (() => {
                    this.compositeName = "Default";
                    this.volFracInComposite = 100.0;
                    this.nofSizesInp = 2;
                    this.sizeInp = new Array(ParticleSize.NOF_SIZES);
                    this.volFracInp = new Array(ParticleSize.NOF_SIZES);
                    this.nofSizesCalc = 2;
                    this.sizeCalc = new Array(ParticleSize.NOF_SIZES);
                    this.freq2DCalc = new Array(ParticleSize.NOF_SIZES);
                    this.freq3DCalc = new Array(ParticleSize.NOF_SIZES);
                    this.volFrac2DCalc = new Array(ParticleSize.NOF_SIZES);
                    this.volFrac3DCalc = new Array(ParticleSize.NOF_SIZES);
                    for(var ii : number = 0; ii < ParticleSize.NOF_SIZES; ii++) {
                        this.sizeInp[ii] = 0.0;
                        this.volFracInp[ii] = 0.0;
                        this.sizeCalc[ii] = 0.0;
                        this.freq2DCalc[ii] = 0;
                        this.freq3DCalc[ii] = 0;
                        this.volFrac2DCalc[ii] = 0;
                        this.volFrac3DCalc[ii] = 0;
                    }
                    this.sizeInp[0] = 100.0;
                    this.volFracInp[0] = 10.0;
                    this.sizeCalc[0] = 100.0;
                    this.freq2DCalc[0] = 10;
                    this.freq3DCalc[0] = 10;
                    this.volFrac2DCalc[0] = 0.001;
                    this.volFrac3DCalc[0] = 0.001;
                    this.sizeInp[1] = 1000.0;
                    this.volFracInp[1] = 90.0;
                    this.sizeCalc[1] = 1000.0;
                    this.freq2DCalc[1] = 90;
                    this.freq3DCalc[1] = 90;
                    this.volFrac2DCalc[1] = 0.999;
                    this.volFrac3DCalc[1] = 0.999;
                })();
            } else throw new Error('invalid overload');
        }

        public copy(partSizeDist : ParticleSize) {
            this.compositeName = partSizeDist.compositeName;
            this.volFracInComposite = partSizeDist.volFracInComposite;
            this.nofSizesInp = partSizeDist.nofSizesInp;
            for(var ii : number = 0; ii < this.nofSizesInp; ii++) {
                this.sizeInp[ii] = partSizeDist.sizeInp[ii];
                this.volFracInp[ii] = partSizeDist.volFracInp[ii];
            }
            this.nofSizesCalc = partSizeDist.nofSizesCalc;
            for(var ii : number = 0; ii < this.nofSizesCalc; ii++) {
                this.sizeCalc[ii] = partSizeDist.sizeCalc[ii];
                this.freq2DCalc[ii] = partSizeDist.freq2DCalc[ii];
                this.freq3DCalc[ii] = partSizeDist.freq3DCalc[ii];
                this.volFrac2DCalc[ii] = partSizeDist.volFrac2DCalc[ii];
                this.volFrac3DCalc[ii] = partSizeDist.volFrac3DCalc[ii];
            }
        }

        public print() {
            var df : DecimalFormat = new DecimalFormat("##0.##E00");
            console.info("Input");
            console.info("Size ... Vol.Frac");
            for(var ii : number = 0; ii < this.nofSizesInp; ii++) {
                console.info(df.format(this.sizeInp[ii]) + "    " + df.format(this.volFracInp[ii]));
            }
            console.info("Calculated");
            console.info("Size ... Number (2D) .. Vol.Frac (2D)... Number (3D) .. Vol.Frac (3D)");
            for(var ii : number = 0; ii < this.nofSizesCalc; ii++) {
                console.info(df.format(this.sizeCalc[ii]) + "    " + this.freq2DCalc[ii] + "     " + df.format(this.volFrac2DCalc[ii]) + "      " + this.freq3DCalc[ii] + "     " + df.format(this.volFrac3DCalc[ii]));
            }
        }
    }
}

