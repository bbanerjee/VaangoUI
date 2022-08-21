"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Random = java.util.Random;

    import Vector = java.util.Vector;

    export class Packing {
        /**
         * Const data
         */
        public static TWO_DIM : number = 0;

        public static THREE_DIM : number = 1;

        /**
         * Private data
         */
        private d_dim : number;

        private d_partSizeDist : ParticleSize;

        private d_nofSizeFrac : number;

        private d_nofParticles : number;

        private d_maxRad : number;

        private d_totalVolume : number;

        private d_particle : Packing.PParticle[];

        private d_boxSize : number;

        /**
         * Constructor
         */
        public constructor(dim : number, partSizeDist : ParticleSize) {
            this.d_dim = 0;
            this.d_nofSizeFrac = 0;
            this.d_nofParticles = 0;
            this.d_maxRad = 0;
            this.d_totalVolume = 0;
            this.d_boxSize = 0;
            this.d_dim = dim;
            this.d_partSizeDist = partSizeDist;
            this.d_nofSizeFrac = partSizeDist.nofSizesCalc;
            this.d_nofParticles = 0;
            this.d_maxRad = -1.0;
            this.d_totalVolume = 0.0;
            this.d_particle = null;
            this.d_boxSize = 0.0;
        }

        /**
         * Get the results
         */
        public nofParticles() : number {
            return this.d_nofParticles;
        }

        public radius(index : number) : number {
            if(index > -1 && index < this.d_nofParticles) return this.d_particle[index].radius();
            return -1.0;
        }

        public xLoc(index : number) : number {
            if(index > -1 && index < this.d_nofParticles) return this.d_particle[index].center().x();
            return -1.0;
        }

        public yLoc(index : number) : number {
            if(index > -1 && index < this.d_nofParticles) return this.d_particle[index].center().y();
            return -1.0;
        }

        public zLoc(index : number) : number {
            if(index > -1 && index < this.d_nofParticles) return this.d_particle[index].center().z();
            return -1.0;
        }

        public boxSize() : number {
            return this.d_boxSize;
        }

        /**
         * Create a packing
         */
        public createPacking(maxSteps : number, maxTry : number, maxVolFrac : number) {
            this.setInitialData();
            this.placeInInitialGrid();
            this.rattleBox(maxSteps, maxTry, maxVolFrac);
        }

        /**
         * Find the maximum diameter of particles, the number of particles in 2D
         * and 3D, and the total volme in 2d and 3D
         */
        setInitialData() {
            for(var ii : number = 0; ii < this.d_nofSizeFrac; ii++) {
                var dia : number = this.d_partSizeDist.sizeCalc[ii];
                if(dia > this.d_maxRad) this.d_maxRad = dia;
                var nofParts : number = 0;
                if(this.d_dim === Packing.TWO_DIM) {
                    nofParts = this.d_partSizeDist.freq2DCalc[ii];
                    this.d_totalVolume += <number>nofParts * Math.pow(dia, 2);
                } else {
                    nofParts = this.d_partSizeDist.freq3DCalc[ii];
                    this.d_totalVolume += <number>nofParts * Math.pow(dia, 3);
                }
                this.d_nofParticles += nofParts;
            }
            this.d_maxRad /= 2.0;
            if(this.d_dim === Packing.TWO_DIM) this.d_totalVolume *= (Math.PI / 4); else this.d_totalVolume *= (Math.PI / 6);
            this.d_particle = new Array(this.d_nofParticles);
            for(var ii : number = 0; ii < this.d_nofParticles; ii++) this.d_particle[ii] = new Packing.PParticle(this)
            console.info("MaxRad = " + this.d_maxRad + " totalVol = " + this.d_totalVolume + " No of Particles = " + this.d_nofParticles);
        }

        /**
         * Create a grid to put the particles and place the particles
         * one by one into random locations in the grid
         */
        placeInInitialGrid() {
            var nofGridCells : number = 0;
            if(this.d_dim === Packing.TWO_DIM) nofGridCells = (<number>Math.ceil(Math.pow(this.d_nofParticles, (1.0 / 2.0)))|0) + 1; else nofGridCells = (<number>Math.ceil(Math.pow(this.d_nofParticles, (1.0 / 3.0)))|0) + 1;
            var maxRad : number = 1.05 * this.d_maxRad;
            var maxDia : number = 2.0 * maxRad;
            this.d_boxSize = maxDia * <number>nofGridCells;
            var xx : number[] = new Array(nofGridCells);
            var yy : number[] = new Array(nofGridCells);
            var zz : number[] = new Array(nofGridCells);
            var inserted : boolean[][][];
            if(this.d_dim === Packing.TWO_DIM) inserted = <any> (function(dims) { var allocate = function(dims) { if(dims.length==0) { return undefined; } else { var array = []; for(var i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([nofGridCells, nofGridCells, 1]); else inserted = <any> (function(dims) { var allocate = function(dims) { if(dims.length==0) { return undefined; } else { var array = []; for(var i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([nofGridCells, nofGridCells, nofGridCells]);
            for(var ii : number = 0; ii < nofGridCells; ii++) {
                for(var jj : number = 0; jj < nofGridCells; jj++) {
                    if(this.d_dim === Packing.TWO_DIM) inserted[ii][jj][0] = false; else {
                        for(var kk : number = 0; kk < nofGridCells; kk++) {
                            inserted[ii][jj][kk] = false;
                        }
                    }
                }
                var xi : number = maxRad + ii * maxDia;
                xx[ii] = xi;
                yy[ii] = xi;
                if(this.d_dim === Packing.TWO_DIM) zz[ii] = 0.0; else zz[ii] = xi;
            }
            var particleNo : number = 0;
            for(var ii : number = 0; ii < this.d_nofSizeFrac; ii++) {
                var dia : number = this.d_partSizeDist.sizeCalc[ii];
                var radius : number = dia / 2.0;
                var number : number;
                if(this.d_dim === Packing.TWO_DIM) number = this.d_partSizeDist.freq2DCalc[ii]; else number = this.d_partSizeDist.freq3DCalc[ii];
                for(var jj : number = 0; jj < number; jj++) {
                    var xIndex : number;
                    var yIndex : number;
                    var zIndex : number;
                    var rand : Random = new Random();
                    do {
                        xIndex = rand.nextInt(nofGridCells);
                        yIndex = rand.nextInt(nofGridCells);
                        if(this.d_dim === Packing.TWO_DIM) zIndex = 0; else zIndex = rand.nextInt(nofGridCells);
                    } while((inserted[xIndex][yIndex][zIndex]));
                    this.d_particle[particleNo].radius(radius);
                    if(this.d_dim === Packing.TWO_DIM) this.d_particle[particleNo].center(xx[xIndex], yy[yIndex], 0); else this.d_particle[particleNo].center(xx[xIndex], yy[yIndex], zz[zIndex]);
                    inserted[xIndex][yIndex][zIndex] = true;
                    ++particleNo;
                }
            }
            if(this.d_dim === Packing.TWO_DIM) {
                var volFrac : number = this.d_totalVolume / Math.pow(this.d_boxSize, 2.0);
                console.info("Vol Frac = " + volFrac + " Box Size = " + this.d_boxSize);
            } else {
                var volFrac : number = this.d_totalVolume / Math.pow(this.d_boxSize, 3.0);
                console.info("Vol Frac = " + volFrac + " Box Size = " + this.d_boxSize);
            }
            var fileName : string = <string>new String("./ballLoc0");
            var outFile : File = new File(fileName);
            try {
                var fw : FileWriter = new FileWriter(outFile);
                var pw : PrintWriter = new PrintWriter(fw);
                for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                    var rad : number = this.d_particle[ii].radius();
                    var x : number = this.d_particle[ii].center().x();
                    var y : number = this.d_particle[ii].center().y();
                    var z : number = this.d_particle[ii].center().z();
                    pw.println(rad + " " + x + " " + y + " " + z);
                }
                pw.close();
                fw.close();
            } catch(e) {
                console.info("Could not write to " + fileName);
            };
        }

        /**
         * Rattle the box and the particles
         */
        public rattleBox(maxSteps : number, maxTry : number, maxVolFrac : number) {
            var stepCount : number = 1;
            var volFrac : number = 0.0;
            var stepSize : number = 10.0;
            maxSteps = 2;
            do {
                console.info("Step no = " + stepCount);
                this.createNeighborList();
                var scale : number = this.calculateScaleFactor();
                console.info("ScaleFactor = " + scale);
                while((stepSize > 1.0E-4)){
                    this.rescaleRadii(scale);
                    this.createNeighborList();
                    stepSize = this.moveParticles(maxTry);
                    if(stepSize <= 1.0E-4) scale *= 1.1;
                };
                if(this.d_dim === Packing.TWO_DIM) volFrac = this.d_totalVolume / Math.pow(this.d_boxSize, 2.0); else volFrac = this.d_totalVolume / Math.pow(this.d_boxSize, 3.0);
                if(stepCount % 500 === 0) {
                    console.info("Steps = " + stepCount + " Vol frac = " + volFrac + " Box Size = " + this.d_boxSize);
                    var fileName : string = <string>new String("./ballLoc" + stepCount);
                    var outFile : File = new File(fileName);
                    try {
                        var fw : FileWriter = new FileWriter(outFile);
                        var pw : PrintWriter = new PrintWriter(fw);
                        for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                            var rad : number = this.d_particle[ii].radius();
                            var x : number = this.d_particle[ii].center().x();
                            var y : number = this.d_particle[ii].center().y();
                            var z : number = this.d_particle[ii].center().z();
                            pw.println(rad + " " + x + " " + y + " " + z);
                        }
                        pw.close();
                        fw.close();
                    } catch(e) {
                        console.info("Could not write to " + fileName);
                    };
                }
                if(stepCount % 1000 === 0) console.info("Steps = " + stepCount + " Vol frac = " + volFrac);
                ++stepCount;
            } while((stepCount < maxSteps && volFrac < maxVolFrac));
        }

        createNeighborList() {
            for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                this.d_particle[ii].clearNeighborList();
            }
            for(var ii : number = 0; ii < this.d_nofParticles - 1; ii++) {
                var p1 : Packing.PParticle = this.d_particle[ii];
                for(var jj : number = ii + 1; jj < this.d_nofParticles; jj++) {
                    var p2 : Packing.PParticle = this.d_particle[jj];
                    var dist : number = p1.distance(p2);
                    if(Math.abs(dist) < 2.0 * this.d_maxRad) {
                        this.d_particle[ii].addNeighbor(p2);
                        this.d_particle[jj].addNeighbor(p1);
                    }
                }
            }
            for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                var numNei : number = this.d_particle[ii].nofNeighbors();
                var p1 : Packing.PParticle = this.d_particle[ii];
                var nearest : Packing.PParticle = p1;
                var smallDist : number = 1.0E10;
                for(var jj : number = 0; jj < numNei; jj++) {
                    var p2 : Packing.PParticle = p1.neighbor(jj);
                    var dist : number = p1.distance(p2);
                    if(dist < smallDist) {
                        smallDist = dist;
                        nearest = p2;
                    }
                }
                this.d_particle[ii].nearestParticle(nearest, smallDist);
            }
            for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                java.lang.System.out.print("Particle = " + ii);
                console.info(" ");
                console.info("Nearest Neighbor = " + this.d_particle[ii].nearestParticle());
                console.info("Smallest Dist = " + this.d_particle[ii].smallestDistance());
            }
        }

        public calculateScaleFactor() : number {
            var minScale : number = 1.0E10;
            var scale : number = 0.0;
            for(var ii : number = 0; ii < this.d_nofParticles - 1; ii++) {
                var nofNeighbors : number = this.d_particle[ii].nofNeighbors();
                var iRadius : number = this.d_particle[ii].radius();
                if(nofNeighbors > 0) {
                    var smallDist : number = this.d_particle[ii].smallestDistance();
                    var nearest : Packing.PParticle = this.d_particle[ii].nearestParticle();
                    var jRadius : number = nearest.radius();
                    var radSum : number = iRadius + jRadius;
                    scale = (smallDist + radSum) / radSum;
                    if(scale < minScale) minScale = scale;
                    if(scale < 1.0) {
                        console.info("In SCALE: Distance " + smallDist + " between " + ii + " and " + nearest + " is less than the sum of their radii " + iRadius + "+" + jRadius);
                    }
                }
            }
            return 1.0 + (minScale - 1.0) * 0.95;
        }

        rescaleRadii(scale : number) {
            for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                this.d_particle[ii].scaleRadius(scale);
            }
        }

        moveParticles(maxTry : number) : number {
            var rand : Random = new Random();
            var stepSize : number = 0.0;
            for(var ii : number = 0; ii < this.d_nofParticles; ii++) {
                console.info("Tring to move Particle " + ii);
                var p1 : Packing.PParticle = this.d_particle[ii];
                stepSize = 0.1 * p1.radius();
                var nofNeighbors : number = p1.nofNeighbors();
                var xCent : number = p1.center().x();
                var yCent : number = p1.center().y();
                var zCent : number = p1.center().z();
                var rad1 : number = p1.radius();
                var x1 : number = xCent;
                var y1 : number = yCent;
                var z1 : number = zCent;
                var tryAgain : boolean = false;
                var moveParticle : boolean = true;
                var nofTry : number = 0;
                do {
                    tryAgain = false;
                    if(nofTry > maxTry) {
                        stepSize /= 1.1;
                        if(stepSize < 1.0E-4) {
                            moveParticle = false;
                            break;
                        }
                        nofTry = 0;
                    }
                    var moveX : number = stepSize * (2.0 * rand.nextDouble() - 1.0);
                    var moveY : number = stepSize * (2.0 * rand.nextDouble() - 1.0);
                    var moveZ : number = 0.0;
                    if(this.d_dim === Packing.THREE_DIM) moveZ = stepSize * (2.0 * rand.nextDouble() - 1.0);
                    x1 = xCent + moveX;
                    y1 = yCent + moveY;
                    z1 = zCent + moveZ;
                    var cent1 : Packing.PPoint = new Packing.PPoint(this, x1, y1, z1);
                    for(var jj : number = 0; jj < nofNeighbors; jj++) {
                        var p2 : Packing.PParticle = p1.neighbor(jj);
                        var rad2 : number = p2.radius();
                        var cent2 : Packing.PPoint = p2.center();
                        var dist : number = cent1.distance(cent2);
                        var sumRad : number = rad1 + rad2;
                        if(dist < sumRad) {
                            ++nofTry;
                            tryAgain = true;
                            break;
                        }
                    }
                } while((tryAgain));
                if(moveParticle) {
                    if(x1 > this.d_boxSize) x1 -= this.d_boxSize;
                    if(y1 > this.d_boxSize) y1 -= this.d_boxSize;
                    if(x1 < 0.0) x1 += this.d_boxSize;
                    if(y1 < 0.0) y1 += this.d_boxSize;
                    if(this.d_dim === Packing.THREE_DIM) {
                        if(z1 < 0.0) z1 += this.d_boxSize;
                        if(z1 > this.d_boxSize) z1 -= this.d_boxSize;
                    }
                    this.d_particle[ii].center(x1, y1, z1);
                    console.info("Particle " + ii + " moved");
                } else {
                    console.info("Particle " + ii + " not moved");
                }
            }
            return stepSize;
        }

        /**
         * dsign
         */
        sign(a : number, b : number) : number {
            if((a > 0.0 && b < 0.0) || (a < 0.0 && b > 0.0)) return -a;
            return a;
        }
    }

    export namespace Packing {

        export class PParticle {
            public __parent: any;
            p_radius : number;

            p_cent : Packing.PPoint;

            p_neighborList : Vector<Packing.PParticle>;

            p_smallestDist : number;

            p_nearestParticle : Packing.PParticle;

            constructor(__parent: any) {
                this.__parent = __parent;
                this.p_radius = 0;
                this.p_smallestDist = 0;
                this.p_radius = 0.0;
                this.p_cent = null;
                this.p_neighborList = new Vector<Packing.PParticle>();
                this.p_smallestDist = 0.0;
                this.p_nearestParticle = null;
            }

            radius$() : number {
                return this.p_radius;
            }

            center$() : Packing.PPoint {
                return this.p_cent;
            }

            neighbor(jj : number) : Packing.PParticle {
                return <Packing.PParticle>this.p_neighborList.get(jj);
            }

            nofNeighbors() : number {
                return this.p_neighborList.size();
            }

            nearestParticle$() : Packing.PParticle {
                return this.p_nearestParticle;
            }

            smallestDistance() : number {
                return this.p_smallestDist;
            }

            public radius(rad? : any) : any {
                if(((typeof rad === 'number') || rad === null)) {
                    return <any>(() => {
                        this.p_radius = rad;
                    })();
                } else if(rad === undefined) {
                    return <any>this.radius$();
                } else throw new Error('invalid overload');
            }

            public center(x? : any, y? : any, z? : any) : any {
                if(((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                    return <any>(() => {
                        this.p_cent = new Packing.PPoint(this.__parent, x, y, z);
                    })();
                } else if(x === undefined && y === undefined && z === undefined) {
                    return <any>this.center$();
                } else throw new Error('invalid overload');
            }

            public nearestParticle(p? : any, d? : any) : any {
                if(((p != null && p instanceof vaango_ui.Packing.PParticle) || p === null) && ((typeof d === 'number') || d === null)) {
                    return <any>(() => {
                        this.p_nearestParticle = p;
                        this.p_smallestDist = d;
                    })();
                } else if(p === undefined && d === undefined) {
                    return <any>this.nearestParticle$();
                } else throw new Error('invalid overload');
            }

            scaleRadius(factor : number) {
                this.p_radius *= factor;
            }

            scaleCenter(factor : number) {
                this.p_cent.scale(factor);
            }

            addNeighbor(particle : Packing.PParticle) {
                this.p_neighborList.add(particle);
            }

            clearNeighborList() {
                if(this.p_neighborList.size() > 0) this.p_neighborList.clear();
            }

            distance(particle : Packing.PParticle) : number {
                var rad1 : number = this.p_radius;
                var rad2 : number = particle.p_radius;
                var centDist : number = this.p_cent.distance(particle.p_cent);
                var dist : number = centDist - rad1 - rad2;
                return dist;
            }
        }

        export class PPoint {
            public __parent: any;
            p_x : number;

            p_y : number;

            p_z : number;

            constructor(__parent: any, x : number, y : number, z : number) {
                this.__parent = __parent;
                this.p_x = 0;
                this.p_y = 0;
                this.p_z = 0;
                this.p_x = x;
                this.p_y = y;
                this.p_z = z;
            }

            x() : number {
                return this.p_x;
            }

            y() : number {
                return this.p_y;
            }

            z() : number {
                return this.p_z;
            }

            scale(factor : number) {
                this.p_x *= factor;
                this.p_y *= factor;
                this.p_z *= factor;
            }

            distance(pt : Packing.PPoint) : number {
                var dx : number = this.p_x - pt.p_x;
                var dy : number = this.p_y - pt.p_y;
                var dz : number = this.p_z - pt.p_z;
                var halfBox : number = this.__parent.d_boxSize / 2.0;
                if(Math.abs(dx) > halfBox) dx -= this.__parent.sign(this.__parent.d_boxSize, dx);
                if(Math.abs(dy) > halfBox) dy -= this.__parent.sign(this.__parent.d_boxSize, dy);
                if(Math.abs(dz) > halfBox) dz -= this.__parent.sign(this.__parent.d_boxSize, dz);
                var dd : number = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return dd;
            }
        }
    }

}

