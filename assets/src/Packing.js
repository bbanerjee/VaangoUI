"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var Random = java.util.Random;
    var Vector = java.util.Vector;
    var Packing = (function () {
        /**
         * Constructor
         */
        function Packing(dim, partSizeDist) {
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
        Packing.prototype.nofParticles = function () {
            return this.d_nofParticles;
        };
        Packing.prototype.radius = function (index) {
            if (index > -1 && index < this.d_nofParticles)
                return this.d_particle[index].radius();
            return -1.0;
        };
        Packing.prototype.xLoc = function (index) {
            if (index > -1 && index < this.d_nofParticles)
                return this.d_particle[index].center().x();
            return -1.0;
        };
        Packing.prototype.yLoc = function (index) {
            if (index > -1 && index < this.d_nofParticles)
                return this.d_particle[index].center().y();
            return -1.0;
        };
        Packing.prototype.zLoc = function (index) {
            if (index > -1 && index < this.d_nofParticles)
                return this.d_particle[index].center().z();
            return -1.0;
        };
        Packing.prototype.boxSize = function () {
            return this.d_boxSize;
        };
        /**
         * Create a packing
         */
        Packing.prototype.createPacking = function (maxSteps, maxTry, maxVolFrac) {
            this.setInitialData();
            this.placeInInitialGrid();
            this.rattleBox(maxSteps, maxTry, maxVolFrac);
        };
        /**
         * Find the maximum diameter of particles, the number of particles in 2D
         * and 3D, and the total volme in 2d and 3D
         */
        Packing.prototype.setInitialData = function () {
            for (var ii = 0; ii < this.d_nofSizeFrac; ii++) {
                var dia = this.d_partSizeDist.sizeCalc[ii];
                if (dia > this.d_maxRad)
                    this.d_maxRad = dia;
                var nofParts = 0;
                if (this.d_dim === Packing.TWO_DIM) {
                    nofParts = this.d_partSizeDist.freq2DCalc[ii];
                    this.d_totalVolume += nofParts * Math.pow(dia, 2);
                }
                else {
                    nofParts = this.d_partSizeDist.freq3DCalc[ii];
                    this.d_totalVolume += nofParts * Math.pow(dia, 3);
                }
                this.d_nofParticles += nofParts;
            }
            this.d_maxRad /= 2.0;
            if (this.d_dim === Packing.TWO_DIM)
                this.d_totalVolume *= (Math.PI / 4);
            else
                this.d_totalVolume *= (Math.PI / 6);
            this.d_particle = new Array(this.d_nofParticles);
            for (var ii = 0; ii < this.d_nofParticles; ii++)
                this.d_particle[ii] = new Packing.PParticle(this);
            console.info("MaxRad = " + this.d_maxRad + " totalVol = " + this.d_totalVolume + " No of Particles = " + this.d_nofParticles);
        };
        /**
         * Create a grid to put the particles and place the particles
         * one by one into random locations in the grid
         */
        Packing.prototype.placeInInitialGrid = function () {
            var nofGridCells = 0;
            if (this.d_dim === Packing.TWO_DIM)
                nofGridCells = (Math.ceil(Math.pow(this.d_nofParticles, (1.0 / 2.0))) | 0) + 1;
            else
                nofGridCells = (Math.ceil(Math.pow(this.d_nofParticles, (1.0 / 3.0))) | 0) + 1;
            var maxRad = 1.05 * this.d_maxRad;
            var maxDia = 2.0 * maxRad;
            this.d_boxSize = maxDia * nofGridCells;
            var xx = new Array(nofGridCells);
            var yy = new Array(nofGridCells);
            var zz = new Array(nofGridCells);
            var inserted;
            if (this.d_dim === Packing.TWO_DIM)
                inserted = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                    return undefined;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([nofGridCells, nofGridCells, 1]);
            else
                inserted = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                    return undefined;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([nofGridCells, nofGridCells, nofGridCells]);
            for (var ii = 0; ii < nofGridCells; ii++) {
                for (var jj = 0; jj < nofGridCells; jj++) {
                    if (this.d_dim === Packing.TWO_DIM)
                        inserted[ii][jj][0] = false;
                    else {
                        for (var kk = 0; kk < nofGridCells; kk++) {
                            inserted[ii][jj][kk] = false;
                        }
                    }
                }
                var xi = maxRad + ii * maxDia;
                xx[ii] = xi;
                yy[ii] = xi;
                if (this.d_dim === Packing.TWO_DIM)
                    zz[ii] = 0.0;
                else
                    zz[ii] = xi;
            }
            var particleNo = 0;
            for (var ii = 0; ii < this.d_nofSizeFrac; ii++) {
                var dia = this.d_partSizeDist.sizeCalc[ii];
                var radius = dia / 2.0;
                var number;
                if (this.d_dim === Packing.TWO_DIM)
                    number = this.d_partSizeDist.freq2DCalc[ii];
                else
                    number = this.d_partSizeDist.freq3DCalc[ii];
                for (var jj = 0; jj < number; jj++) {
                    var xIndex;
                    var yIndex;
                    var zIndex;
                    var rand = new Random();
                    do {
                        xIndex = rand.nextInt(nofGridCells);
                        yIndex = rand.nextInt(nofGridCells);
                        if (this.d_dim === Packing.TWO_DIM)
                            zIndex = 0;
                        else
                            zIndex = rand.nextInt(nofGridCells);
                    } while ((inserted[xIndex][yIndex][zIndex]));
                    this.d_particle[particleNo].radius(radius);
                    if (this.d_dim === Packing.TWO_DIM)
                        this.d_particle[particleNo].center(xx[xIndex], yy[yIndex], 0);
                    else
                        this.d_particle[particleNo].center(xx[xIndex], yy[yIndex], zz[zIndex]);
                    inserted[xIndex][yIndex][zIndex] = true;
                    ++particleNo;
                }
            }
            if (this.d_dim === Packing.TWO_DIM) {
                var volFrac = this.d_totalVolume / Math.pow(this.d_boxSize, 2.0);
                console.info("Vol Frac = " + volFrac + " Box Size = " + this.d_boxSize);
            }
            else {
                var volFrac = this.d_totalVolume / Math.pow(this.d_boxSize, 3.0);
                console.info("Vol Frac = " + volFrac + " Box Size = " + this.d_boxSize);
            }
            var fileName = new String("./ballLoc0");
            var outFile = new File(fileName);
            try {
                var fw = new FileWriter(outFile);
                var pw = new PrintWriter(fw);
                for (var ii = 0; ii < this.d_nofParticles; ii++) {
                    var rad = this.d_particle[ii].radius();
                    var x = this.d_particle[ii].center().x();
                    var y = this.d_particle[ii].center().y();
                    var z = this.d_particle[ii].center().z();
                    pw.println(rad + " " + x + " " + y + " " + z);
                }
                pw.close();
                fw.close();
            }
            catch (e) {
                console.info("Could not write to " + fileName);
            }
            ;
        };
        /**
         * Rattle the box and the particles
         */
        Packing.prototype.rattleBox = function (maxSteps, maxTry, maxVolFrac) {
            var stepCount = 1;
            var volFrac = 0.0;
            var stepSize = 10.0;
            maxSteps = 2;
            do {
                console.info("Step no = " + stepCount);
                this.createNeighborList();
                var scale = this.calculateScaleFactor();
                console.info("ScaleFactor = " + scale);
                while ((stepSize > 1.0E-4)) {
                    this.rescaleRadii(scale);
                    this.createNeighborList();
                    stepSize = this.moveParticles(maxTry);
                    if (stepSize <= 1.0E-4)
                        scale *= 1.1;
                }
                ;
                if (this.d_dim === Packing.TWO_DIM)
                    volFrac = this.d_totalVolume / Math.pow(this.d_boxSize, 2.0);
                else
                    volFrac = this.d_totalVolume / Math.pow(this.d_boxSize, 3.0);
                if (stepCount % 500 === 0) {
                    console.info("Steps = " + stepCount + " Vol frac = " + volFrac + " Box Size = " + this.d_boxSize);
                    var fileName = new String("./ballLoc" + stepCount);
                    var outFile = new File(fileName);
                    try {
                        var fw = new FileWriter(outFile);
                        var pw = new PrintWriter(fw);
                        for (var ii = 0; ii < this.d_nofParticles; ii++) {
                            var rad = this.d_particle[ii].radius();
                            var x = this.d_particle[ii].center().x();
                            var y = this.d_particle[ii].center().y();
                            var z = this.d_particle[ii].center().z();
                            pw.println(rad + " " + x + " " + y + " " + z);
                        }
                        pw.close();
                        fw.close();
                    }
                    catch (e) {
                        console.info("Could not write to " + fileName);
                    }
                    ;
                }
                if (stepCount % 1000 === 0)
                    console.info("Steps = " + stepCount + " Vol frac = " + volFrac);
                ++stepCount;
            } while ((stepCount < maxSteps && volFrac < maxVolFrac));
        };
        Packing.prototype.createNeighborList = function () {
            for (var ii = 0; ii < this.d_nofParticles; ii++) {
                this.d_particle[ii].clearNeighborList();
            }
            for (var ii = 0; ii < this.d_nofParticles - 1; ii++) {
                var p1 = this.d_particle[ii];
                for (var jj = ii + 1; jj < this.d_nofParticles; jj++) {
                    var p2 = this.d_particle[jj];
                    var dist = p1.distance(p2);
                    if (Math.abs(dist) < 2.0 * this.d_maxRad) {
                        this.d_particle[ii].addNeighbor(p2);
                        this.d_particle[jj].addNeighbor(p1);
                    }
                }
            }
            for (var ii = 0; ii < this.d_nofParticles; ii++) {
                var numNei = this.d_particle[ii].nofNeighbors();
                var p1 = this.d_particle[ii];
                var nearest = p1;
                var smallDist = 1.0E10;
                for (var jj = 0; jj < numNei; jj++) {
                    var p2 = p1.neighbor(jj);
                    var dist = p1.distance(p2);
                    if (dist < smallDist) {
                        smallDist = dist;
                        nearest = p2;
                    }
                }
                this.d_particle[ii].nearestParticle(nearest, smallDist);
            }
            for (var ii = 0; ii < this.d_nofParticles; ii++) {
                java.lang.System.out.print("Particle = " + ii);
                console.info(" ");
                console.info("Nearest Neighbor = " + this.d_particle[ii].nearestParticle());
                console.info("Smallest Dist = " + this.d_particle[ii].smallestDistance());
            }
        };
        Packing.prototype.calculateScaleFactor = function () {
            var minScale = 1.0E10;
            var scale = 0.0;
            for (var ii = 0; ii < this.d_nofParticles - 1; ii++) {
                var nofNeighbors = this.d_particle[ii].nofNeighbors();
                var iRadius = this.d_particle[ii].radius();
                if (nofNeighbors > 0) {
                    var smallDist = this.d_particle[ii].smallestDistance();
                    var nearest = this.d_particle[ii].nearestParticle();
                    var jRadius = nearest.radius();
                    var radSum = iRadius + jRadius;
                    scale = (smallDist + radSum) / radSum;
                    if (scale < minScale)
                        minScale = scale;
                    if (scale < 1.0) {
                        console.info("In SCALE: Distance " + smallDist + " between " + ii + " and " + nearest + " is less than the sum of their radii " + iRadius + "+" + jRadius);
                    }
                }
            }
            return 1.0 + (minScale - 1.0) * 0.95;
        };
        Packing.prototype.rescaleRadii = function (scale) {
            for (var ii = 0; ii < this.d_nofParticles; ii++) {
                this.d_particle[ii].scaleRadius(scale);
            }
        };
        Packing.prototype.moveParticles = function (maxTry) {
            var rand = new Random();
            var stepSize = 0.0;
            for (var ii = 0; ii < this.d_nofParticles; ii++) {
                console.info("Tring to move Particle " + ii);
                var p1 = this.d_particle[ii];
                stepSize = 0.1 * p1.radius();
                var nofNeighbors = p1.nofNeighbors();
                var xCent = p1.center().x();
                var yCent = p1.center().y();
                var zCent = p1.center().z();
                var rad1 = p1.radius();
                var x1 = xCent;
                var y1 = yCent;
                var z1 = zCent;
                var tryAgain = false;
                var moveParticle = true;
                var nofTry = 0;
                do {
                    tryAgain = false;
                    if (nofTry > maxTry) {
                        stepSize /= 1.1;
                        if (stepSize < 1.0E-4) {
                            moveParticle = false;
                            break;
                        }
                        nofTry = 0;
                    }
                    var moveX = stepSize * (2.0 * rand.nextDouble() - 1.0);
                    var moveY = stepSize * (2.0 * rand.nextDouble() - 1.0);
                    var moveZ = 0.0;
                    if (this.d_dim === Packing.THREE_DIM)
                        moveZ = stepSize * (2.0 * rand.nextDouble() - 1.0);
                    x1 = xCent + moveX;
                    y1 = yCent + moveY;
                    z1 = zCent + moveZ;
                    var cent1 = new Packing.PPoint(this, x1, y1, z1);
                    for (var jj = 0; jj < nofNeighbors; jj++) {
                        var p2 = p1.neighbor(jj);
                        var rad2 = p2.radius();
                        var cent2 = p2.center();
                        var dist = cent1.distance(cent2);
                        var sumRad = rad1 + rad2;
                        if (dist < sumRad) {
                            ++nofTry;
                            tryAgain = true;
                            break;
                        }
                    }
                } while ((tryAgain));
                if (moveParticle) {
                    if (x1 > this.d_boxSize)
                        x1 -= this.d_boxSize;
                    if (y1 > this.d_boxSize)
                        y1 -= this.d_boxSize;
                    if (x1 < 0.0)
                        x1 += this.d_boxSize;
                    if (y1 < 0.0)
                        y1 += this.d_boxSize;
                    if (this.d_dim === Packing.THREE_DIM) {
                        if (z1 < 0.0)
                            z1 += this.d_boxSize;
                        if (z1 > this.d_boxSize)
                            z1 -= this.d_boxSize;
                    }
                    this.d_particle[ii].center(x1, y1, z1);
                    console.info("Particle " + ii + " moved");
                }
                else {
                    console.info("Particle " + ii + " not moved");
                }
            }
            return stepSize;
        };
        /**
         * dsign
         */
        Packing.prototype.sign = function (a, b) {
            if ((a > 0.0 && b < 0.0) || (a < 0.0 && b > 0.0))
                return -a;
            return a;
        };
        return Packing;
    }());
    /**
     * Const data
     */
    Packing.TWO_DIM = 0;
    Packing.THREE_DIM = 1;
    vaango_ui.Packing = Packing;
    (function (Packing) {
        var PParticle = (function () {
            function PParticle(__parent) {
                this.__parent = __parent;
                this.p_radius = 0;
                this.p_smallestDist = 0;
                this.p_radius = 0.0;
                this.p_cent = null;
                this.p_neighborList = new Vector();
                this.p_smallestDist = 0.0;
                this.p_nearestParticle = null;
            }
            PParticle.prototype.radius$ = function () {
                return this.p_radius;
            };
            PParticle.prototype.center$ = function () {
                return this.p_cent;
            };
            PParticle.prototype.neighbor = function (jj) {
                return this.p_neighborList.get(jj);
            };
            PParticle.prototype.nofNeighbors = function () {
                return this.p_neighborList.size();
            };
            PParticle.prototype.nearestParticle$ = function () {
                return this.p_nearestParticle;
            };
            PParticle.prototype.smallestDistance = function () {
                return this.p_smallestDist;
            };
            PParticle.prototype.radius = function (rad) {
                var _this = this;
                if (((typeof rad === 'number') || rad === null)) {
                    return (function () {
                        _this.p_radius = rad;
                    })();
                }
                else if (rad === undefined) {
                    return this.radius$();
                }
                else
                    throw new Error('invalid overload');
            };
            PParticle.prototype.center = function (x, y, z) {
                var _this = this;
                if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof z === 'number') || z === null)) {
                    return (function () {
                        _this.p_cent = new Packing.PPoint(_this.__parent, x, y, z);
                    })();
                }
                else if (x === undefined && y === undefined && z === undefined) {
                    return this.center$();
                }
                else
                    throw new Error('invalid overload');
            };
            PParticle.prototype.nearestParticle = function (p, d) {
                var _this = this;
                if (((p != null && p instanceof vaango_ui.Packing.PParticle) || p === null) && ((typeof d === 'number') || d === null)) {
                    return (function () {
                        _this.p_nearestParticle = p;
                        _this.p_smallestDist = d;
                    })();
                }
                else if (p === undefined && d === undefined) {
                    return this.nearestParticle$();
                }
                else
                    throw new Error('invalid overload');
            };
            PParticle.prototype.scaleRadius = function (factor) {
                this.p_radius *= factor;
            };
            PParticle.prototype.scaleCenter = function (factor) {
                this.p_cent.scale(factor);
            };
            PParticle.prototype.addNeighbor = function (particle) {
                this.p_neighborList.add(particle);
            };
            PParticle.prototype.clearNeighborList = function () {
                if (this.p_neighborList.size() > 0)
                    this.p_neighborList.clear();
            };
            PParticle.prototype.distance = function (particle) {
                var rad1 = this.p_radius;
                var rad2 = particle.p_radius;
                var centDist = this.p_cent.distance(particle.p_cent);
                var dist = centDist - rad1 - rad2;
                return dist;
            };
            return PParticle;
        }());
        Packing.PParticle = PParticle;
        var PPoint = (function () {
            function PPoint(__parent, x, y, z) {
                this.__parent = __parent;
                this.p_x = 0;
                this.p_y = 0;
                this.p_z = 0;
                this.p_x = x;
                this.p_y = y;
                this.p_z = z;
            }
            PPoint.prototype.x = function () {
                return this.p_x;
            };
            PPoint.prototype.y = function () {
                return this.p_y;
            };
            PPoint.prototype.z = function () {
                return this.p_z;
            };
            PPoint.prototype.scale = function (factor) {
                this.p_x *= factor;
                this.p_y *= factor;
                this.p_z *= factor;
            };
            PPoint.prototype.distance = function (pt) {
                var dx = this.p_x - pt.p_x;
                var dy = this.p_y - pt.p_y;
                var dz = this.p_z - pt.p_z;
                var halfBox = this.__parent.d_boxSize / 2.0;
                if (Math.abs(dx) > halfBox)
                    dx -= this.__parent.sign(this.__parent.d_boxSize, dx);
                if (Math.abs(dy) > halfBox)
                    dy -= this.__parent.sign(this.__parent.d_boxSize, dy);
                if (Math.abs(dz) > halfBox)
                    dz -= this.__parent.sign(this.__parent.d_boxSize, dz);
                var dd = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return dd;
            };
            return PPoint;
        }());
        Packing.PPoint = PPoint;
    })(Packing = vaango_ui.Packing || (vaango_ui.Packing = {}));
})(vaango_ui || (vaango_ui = {}));
