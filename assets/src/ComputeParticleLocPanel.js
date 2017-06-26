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
    var Random = java.util.Random;
    var Vector = java.util.Vector;
    var ComputeParticleLocPanel = (function (_super) {
        __extends(ComputeParticleLocPanel, _super);
        function ComputeParticleLocPanel(partList, partSizeDist, parent) {
            var _this = _super.call(this) || this;
            _this.d_partList = null;
            _this.d_partSizeDist = null;
            _this.d_parent = null;
            _this.d_rvePartSizeDist = null;
            _this.d_partTypeFlag = 0;
            _this.d_hollowFlag = false;
            _this.d_thickness = 0.0;
            _this.rveSizeEntry = null;
            _this.thicknessLabel = null;
            _this.thicknessEntry = null;
            _this.partTypeCBox = null;
            _this.randomButton = null;
            _this.periodicButton = null;
            _this.saveButton = null;
            _this.progressBar = null;
            _this.d_rveSize = 0.0;
            _this.d_progress = 0;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_partList = partList;
            _this.d_partSizeDist = partSizeDist;
            _this.d_parent = parent;
            _this.d_rvePartSizeDist = new vaango_ui.ParticleSize(partSizeDist);
            _this.d_partTypeFlag = ComputeParticleLocPanel.CIRCLE;
            _this.d_hollowFlag = false;
            _this.d_thickness = 0.0;
            _this.d_rveSize = 100.0;
            _this.d_parent.setRVESize(_this.d_rveSize);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var panel1 = new JPanel(new GridLayout(4, 0));
            var rveSizeLabel = new JLabel("RVE Size (in one dimension) ");
            panel1.add(rveSizeLabel);
            _this.rveSizeEntry = new vaango_ui.DecimalField(1.0, 5);
            panel1.add(_this.rveSizeEntry);
            var partTypeLabel = new JLabel("Type of particle ");
            panel1.add(partTypeLabel);
            _this.partTypeCBox = new JComboBox();
            _this.partTypeCBox.addItem("Solid Circle");
            _this.partTypeCBox.addItem("Hollow Circle");
            _this.partTypeCBox.addItem("Solid Sphere");
            _this.partTypeCBox.addItem("Hollow Sphere");
            _this.partTypeCBox.setSelectedIndex(0);
            panel1.add(_this.partTypeCBox);
            _this.thicknessLabel = new JLabel("Thickness");
            panel1.add(_this.thicknessLabel);
            _this.thicknessEntry = new vaango_ui.DecimalField(0.0, 9, true);
            panel1.add(_this.thicknessEntry);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            var panel10 = new JPanel(new GridLayout(4, 0));
            var labelrun = new JLabel("Click on one of the following buttons");
            panel10.add(labelrun);
            _this.randomButton = new JButton("Create Random Distribution");
            _this.randomButton.setActionCommand("dist");
            panel10.add(_this.randomButton);
            _this.periodicButton = new JButton("Create Periodic Distribution");
            _this.periodicButton.setActionCommand("periodic");
            panel10.add(_this.periodicButton);
            _this.progressBar = new JProgressBar(0, 100);
            _this.progressBar.setValue(0);
            _this.progressBar.setStringPainted(true);
            panel10.add(_this.progressBar);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel10, gbc);
            _this.add(panel10);
            var panel3 = new JPanel(new GridLayout(1, 0));
            _this.saveButton = new JButton("Save Calculated Data");
            _this.saveButton.setActionCommand("save");
            panel3.add(_this.saveButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 3, 1, 1, 5);
            gb.setConstraints(panel3, gbc);
            _this.add(panel3);
            _this.partTypeCBox.addItemListener(_this);
            _this.randomButton.addActionListener(_this);
            _this.periodicButton.addActionListener(_this);
            _this.saveButton.addActionListener(_this);
            _this.thicknessLabel.setEnabled(false);
            _this.thicknessEntry.setEnabled(false);
            return _this;
        }
        ComputeParticleLocPanel.prototype.itemStateChanged = function (e) {
            var item = new String(e.getItem()).toString();
            if ((item === "Solid Circle")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.CIRCLE;
                this.d_hollowFlag = false;
            }
            else if ((item === "Hollow Circle")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.CIRCLE;
                this.d_hollowFlag = true;
            }
            else if ((item === "Solid Sphere")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.SPHERE;
                this.d_hollowFlag = false;
            }
            else if ((item === "Hollow Sphere")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.SPHERE;
                this.d_hollowFlag = true;
            }
            this.thicknessLabel.setEnabled(this.d_hollowFlag);
            this.thicknessEntry.setEnabled(this.d_hollowFlag);
        };
        ComputeParticleLocPanel.prototype.actionPerformed = function (e) {
            if (this.d_hollowFlag) {
                this.d_thickness = this.thicknessEntry.getValue();
            }
            else {
                this.d_thickness = 0.0;
            }
            if (e.getActionCommand() === "dist") {
                this.distributeParticles();
            }
            else if (e.getActionCommand() === "periodic") {
                this.periodicParticleDist();
            }
            else if (e.getActionCommand() === "save") {
                this.saveParticleDist();
            }
        };
        ComputeParticleLocPanel.prototype.distributeParticles = function () {
            this.d_partList.clear();
            this.estimateRVEPartSizeDist();
            switch ((this.d_partTypeFlag)) {
                case ComputeParticleLocPanel.CIRCLE:
                    this.distributeCircles();
                    break;
                case ComputeParticleLocPanel.SPHERE:
                    this.distributeSpheres();
                    break;
            }
        };
        ComputeParticleLocPanel.prototype.periodicParticleDist = function () {
            this.d_partList.clear();
            this.estimateRVEPartSizeDist();
            switch ((this.d_partTypeFlag)) {
                case ComputeParticleLocPanel.CIRCLE:
                    this.distributeCirclesPeriodic();
                    break;
                case ComputeParticleLocPanel.SPHERE:
                    this.distributeSpheresPeriodic();
                    break;
            }
        };
        ComputeParticleLocPanel.prototype.estimateRVEPartSizeDist = function () {
            this.d_rvePartSizeDist.copy(this.d_partSizeDist);
            this.d_rveSize = this.rveSizeEntry.getValue();
            this.d_parent.setRVESize(this.d_rveSize);
            this.d_partList.setRVESize(this.d_rveSize);
            var nofSizes = this.d_partSizeDist.nofSizesCalc;
            var dia = new Array(nofSizes);
            var vol = new Array(nofSizes);
            var num = new Array(nofSizes);
            var scaledNum = new Array(nofSizes);
            var rveSize = this.d_rveSize;
            var vf = this.d_partSizeDist.volFracInComposite * 0.01;
            var totvol = 0.0;
            var volInputRVE = 0.0;
            var volActualRVE = 0.0;
            var scalefac = 1.0;
            switch ((this.d_partTypeFlag)) {
                case ComputeParticleLocPanel.CIRCLE:
                    volActualRVE = rveSize * rveSize;
                    for (var ii = 0; ii < nofSizes; ++ii) {
                        num[ii] = this.d_partSizeDist.freq2DCalc[ii];
                        dia[ii] = this.d_partSizeDist.sizeCalc[ii];
                        vol[ii] = 0.25 * Math.PI * dia[ii] * dia[ii];
                        totvol += (num[ii] * vol[ii]);
                    }
                    break;
                case ComputeParticleLocPanel.SPHERE:
                    volActualRVE = rveSize * rveSize * rveSize;
                    for (var ii = 0; ii < nofSizes; ++ii) {
                        num[ii] = this.d_partSizeDist.freq3DCalc[ii];
                        dia[ii] = this.d_partSizeDist.sizeCalc[ii];
                        vol[ii] = Math.PI * dia[ii] * dia[ii] * dia[ii] / 6.0;
                        totvol += (num[ii] * vol[ii]);
                    }
                    break;
            }
            volInputRVE = totvol / vf;
            scalefac = volActualRVE / volInputRVE;
            totvol = 0.0;
            for (var ii = 0; ii < nofSizes; ++ii) {
                scaledNum[ii] = (Math.round(num[ii] * scalefac) | 0);
                this.d_rvePartSizeDist.freq2DCalc[ii] = scaledNum[ii];
                this.d_rvePartSizeDist.freq3DCalc[ii] = scaledNum[ii];
                totvol += (scaledNum[ii] * vol[ii]);
            }
            for (var ii = 0; ii < nofSizes; ii++) {
                var volFrac = 100.0 * vol[ii] * scaledNum[ii] / totvol;
                this.d_rvePartSizeDist.volFrac2DCalc[ii] = volFrac;
                this.d_rvePartSizeDist.volFrac3DCalc[ii] = volFrac;
            }
            this.d_rvePartSizeDist.print();
            var newVolFrac = 0.0;
            var fracComp = this.d_rvePartSizeDist.volFracInComposite / 100.0;
            switch ((this.d_partTypeFlag)) {
                case ComputeParticleLocPanel.CIRCLE:
                    newVolFrac = totvol / (rveSize * rveSize);
                    break;
                case ComputeParticleLocPanel.SPHERE:
                    newVolFrac = totvol / (rveSize * rveSize * rveSize);
                    break;
            }
            console.info("Updated volume fraction = " + newVolFrac + " Target vol. frac. = " + fracComp);
            while ((newVolFrac < 0.95 * fracComp)) {
                for (var ii = 0; ii < nofSizes; ii++) {
                    if (this.d_rvePartSizeDist.freq2DCalc[ii] === 0) {
                        this.d_rvePartSizeDist.freq2DCalc[ii] = 1;
                        this.d_rvePartSizeDist.freq3DCalc[ii] = 1;
                        totvol += vol[ii];
                        break;
                    }
                }
                for (var ii = 0; ii < nofSizes; ii++) {
                    var volFrac = 100.0 * vol[ii] / totvol;
                    this.d_rvePartSizeDist.volFrac2DCalc[ii] = volFrac;
                    this.d_rvePartSizeDist.volFrac3DCalc[ii] = volFrac;
                }
                switch ((this.d_partTypeFlag)) {
                    case ComputeParticleLocPanel.CIRCLE:
                        newVolFrac = totvol / (rveSize * rveSize);
                        break;
                    case ComputeParticleLocPanel.SPHERE:
                        newVolFrac = totvol / (rveSize * rveSize * rveSize);
                        break;
                }
                console.info("Updated volume fraction = " + newVolFrac + " Target vol. frac. = " + fracComp);
            }
            ;
        };
        ComputeParticleLocPanel.prototype.distributeCircles = function () {
            try {
                var rand = new Random();
                var MAX_ITER = 1000;
                var matCode = 0;
                var nofSizesCalc = this.d_rvePartSizeDist.nofSizesCalc;
                for (var ii = nofSizesCalc - 1; ii > -1; ii--) {
                    var nofParts = this.d_rvePartSizeDist.freq2DCalc[ii];
                    var partDia = this.d_rvePartSizeDist.sizeCalc[ii];
                    var partDiaNext = 0.0;
                    if (ii === 0)
                        partDiaNext = 0.5 * this.d_rvePartSizeDist.sizeCalc[0];
                    else
                        partDiaNext = this.d_rvePartSizeDist.sizeCalc[ii - 1];
                    this.d_progress += Math.round(ii / nofSizesCalc) * 100;
                    this.progressBar.setValue(this.d_progress);
                    for (var jj = 0; jj < nofParts; jj++) {
                        var fit = false;
                        var nofIter = 0;
                        while ((!fit)) {
                            if (nofIter > MAX_ITER) {
                                if (partDia < partDiaNext)
                                    break;
                                else {
                                    nofIter = 0;
                                    partDia *= 0.9;
                                }
                            }
                            nofIter++;
                            var xCent = rand.nextDouble() * this.d_rveSize;
                            var yCent = rand.nextDouble() * this.d_rveSize;
                            var partCent = new vaango_ui.Point(xCent, yCent, 0.0);
                            var boxFit = this.isCircleInsideRVE(partDia, xCent, yCent);
                            if (boxFit) {
                                var nofPartsInVector = this.d_partList.size();
                                var circlesIntersect = false;
                                for (var kk = 0; kk < nofPartsInVector; kk++) {
                                    var part = this.d_partList.getParticle(kk);
                                    var dia1 = 2.0 * part.getRadius();
                                    var cent1 = part.getCenter();
                                    circlesIntersect = this.doCirclesIntersect(dia1, cent1, partDia, partCent);
                                    if (circlesIntersect)
                                        break;
                                }
                                if (circlesIntersect)
                                    fit = false;
                                else {
                                    var newParticle = new vaango_ui.Particle(0.5 * partDia, this.d_rveSize, this.d_thickness, partCent, matCode);
                                    this.d_partList.addParticle(newParticle);
                                    this.d_parent.refreshDisplayPartLocFrame();
                                    fit = true;
                                }
                            }
                        }
                        ;
                    }
                }
                var vecSize = this.d_partList.size();
                var vol = 0.0;
                for (var ii = 0; ii < vecSize; ii++) {
                    var rad = (this.d_partList.getParticle(ii)).getRadius();
                    vol += Math.PI * rad * rad;
                }
                var volBox = this.d_rveSize * this.d_rveSize;
                var vfrac = vol / volBox;
                console.info("No of parts = " + vecSize + " Vol frac = " + vfrac);
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                var partDia = this.d_rvePartSizeDist.sizeCalc[0];
                var fracComp = this.d_rvePartSizeDist.volFracInComposite / 100.0;
                while ((vfrac < fracComp)) {
                    var fit = false;
                    var nofIter = 0;
                    console.info("Part Dia = " + partDia + " Vol frac = " + vfrac + "Vol Frac Comp = " + this.d_rvePartSizeDist.volFracInComposite);
                    while ((!fit)) {
                        if (nofIter > MAX_ITER)
                            break;
                        nofIter++;
                        var xCent = rand.nextDouble() * this.d_rveSize;
                        var yCent = rand.nextDouble() * this.d_rveSize;
                        var partCent = new vaango_ui.Point(xCent, yCent, 0.0);
                        var boxFit = this.isCircleInsideRVE(partDia, xCent, yCent);
                        if (boxFit) {
                            var nofPartsInVector = this.d_partList.size();
                            var circlesIntersect = false;
                            for (var kk = 0; kk < nofPartsInVector; kk++) {
                                var part = this.d_partList.getParticle(kk);
                                var dia1 = 2.0 * part.getRadius();
                                var cent1 = part.getCenter();
                                circlesIntersect = this.doCirclesIntersect(dia1, cent1, partDia, partCent);
                                if (circlesIntersect)
                                    break;
                            }
                            if (circlesIntersect)
                                fit = false;
                            else {
                                var newParticle = new vaango_ui.Particle(0.5 * partDia, this.d_rveSize, this.d_thickness, partCent, matCode);
                                this.d_partList.addParticle(newParticle);
                                this.d_parent.refreshDisplayPartLocFrame();
                                fit = true;
                            }
                        }
                    }
                    ;
                    if (fit) {
                        vfrac += (0.25 * Math.PI * partDia * partDia) / volBox;
                    }
                    else {
                        partDia = 0.9 * partDia;
                    }
                }
                ;
                vecSize = this.d_partList.size();
                vol = 0.0;
                for (var ii = 0; ii < vecSize; ii++) {
                    var rad = (this.d_partList.getParticle(ii)).getRadius();
                    vol += Math.PI * rad * rad;
                }
                vfrac = vol / volBox;
                console.info("No of parts = " + vecSize + " Vol frac = " + (vol / volBox));
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                this.d_parent.refreshDisplayPart3DFrame();
            }
            catch (e) {
                console.info("Some exception occured in method distributeCircles");
            }
            ;
        };
        ComputeParticleLocPanel.prototype.doCirclesIntersect = function (dia1, cent1, dia2, cent2) {
            var x1 = cent1.getX();
            var y1 = cent1.getY();
            var x2 = cent2.getX();
            var y2 = cent2.getY();
            var distCent = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
            var sumRadii = dia1 / 2 + dia2 / 2;
            var gap = distCent - sumRadii;
            if (gap < 0.01 * sumRadii)
                return true;
            return false;
        };
        ComputeParticleLocPanel.prototype.isCircleInsideRVE = function (dia, xCent, yCent) {
            var rad = 0.5 * dia;
            var xMinPartBox = xCent - rad;
            var xMaxPartBox = xCent + rad;
            var yMinPartBox = yCent - rad;
            var yMaxPartBox = yCent + rad;
            if (xMinPartBox >= 0.0 && xMaxPartBox <= this.d_rveSize && yMinPartBox >= 0.0 && yMaxPartBox <= this.d_rveSize) {
                return true;
            }
            return false;
        };
        ComputeParticleLocPanel.prototype.distributeSpheres = function () {
            try {
                var rand = new Random();
                var MAX_ITER = 3000;
                var rotation = 0.0;
                var matCode = 0;
                var nofSizesCalc = this.d_rvePartSizeDist.nofSizesCalc;
                for (var ii = nofSizesCalc; ii > 0; ii--) {
                    var nofParts = this.d_rvePartSizeDist.freq3DCalc[ii - 1];
                    var partDia = 0.0;
                    var partDiaCurr = 0.0;
                    var fit = false;
                    console.info("Particle size fraction # = " + ii);
                    this.d_progress += Math.round(ii / nofSizesCalc) * 100;
                    this.progressBar.setValue(this.d_progress);
                    this.setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
                    for (var jj = 0; jj < nofParts; jj++) {
                        console.info("Particle # = " + jj);
                        partDia = this.d_rvePartSizeDist.sizeCalc[ii - 1];
                        partDiaCurr = partDia;
                        fit = false;
                        var nofIter = 0;
                        while ((!fit)) {
                            nofIter++;
                            if (nofIter > MAX_ITER)
                                break;
                            var xCent = rand.nextDouble() * this.d_rveSize;
                            var yCent = rand.nextDouble() * this.d_rveSize;
                            var zCent = rand.nextDouble() * this.d_rveSize;
                            var partCent = new vaango_ui.Point(xCent, yCent, zCent);
                            var boxFit = this.isSphereInsideRVE(partDia, xCent, yCent, zCent);
                            if (boxFit) {
                                var spheresIntersect = false;
                                var nofPartsInVector = this.d_partList.size();
                                for (var kk = 0; kk < nofPartsInVector; kk++) {
                                    var part = this.d_partList.getParticle(kk);
                                    var dia1 = 2.0 * part.getRadius();
                                    var cent1 = part.getCenter();
                                    spheresIntersect = this.doSpheresIntersect(dia1, cent1, partDia, partCent);
                                    if (spheresIntersect)
                                        break;
                                }
                                if (spheresIntersect)
                                    fit = false;
                                else {
                                    var newParticle = new vaango_ui.Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, partCent, matCode, this.d_thickness);
                                    this.d_partList.addParticle(newParticle);
                                    newParticle.print();
                                    this.d_parent.refreshDisplayPartLocFrame();
                                    if (partDiaCurr !== partDia) {
                                        partDia = Math.pow(Math.pow(partDiaCurr, 3) - Math.pow(partDia, 3), (1.0 / 3.0));
                                        partDiaCurr = partDia;
                                        nofIter = 0;
                                        fit = false;
                                    }
                                    else {
                                        fit = true;
                                    }
                                }
                            }
                        }
                        ;
                    }
                }
                var vecSize = this.d_partList.size();
                var vol = 0.0;
                for (var ii = 0; ii < vecSize; ii++) {
                    var dia = 2.0 * this.d_partList.getParticle(ii).getRadius();
                    vol += dia * dia * dia * Math.PI / 6.0;
                }
                var volBox = Math.pow(this.d_rveSize, 3);
                var vfrac = vol / volBox;
                console.info("No of parts = " + vecSize + " Vol frac = " + (vol / volBox));
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                var partDia = this.d_rvePartSizeDist.sizeCalc[0];
                var fracComp = this.d_rvePartSizeDist.volFracInComposite / 100.0;
                while ((vfrac < fracComp)) {
                    var fit = false;
                    var nofIter = 0;
                    console.info("Part Dia = " + partDia + " Vol frac = " + vfrac + "Vol Frac = " + this.d_rvePartSizeDist.volFracInComposite);
                    while ((!fit)) {
                        if (nofIter > MAX_ITER)
                            break;
                        nofIter++;
                        var xCent = rand.nextDouble() * this.d_rveSize;
                        var yCent = rand.nextDouble() * this.d_rveSize;
                        var zCent = rand.nextDouble() * this.d_rveSize;
                        var partCent = new vaango_ui.Point(xCent, yCent, zCent);
                        var boxFit = this.isSphereInsideRVE(partDia, xCent, yCent, zCent);
                        if (boxFit) {
                            var nofPartsInVector = this.d_partList.size();
                            var spheresIntersect = false;
                            for (var kk = 0; kk < nofPartsInVector; kk++) {
                                var part = this.d_partList.getParticle(kk);
                                var dia1 = 2.0 * part.getRadius();
                                var cent1 = part.getCenter();
                                spheresIntersect = this.doSpheresIntersect(dia1, cent1, partDia, partCent);
                                if (spheresIntersect)
                                    break;
                            }
                            if (spheresIntersect)
                                fit = false;
                            else {
                                var newParticle = new vaango_ui.Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, partCent, matCode, this.d_thickness);
                                this.d_partList.addParticle(newParticle);
                                this.d_parent.refreshDisplayPartLocFrame();
                                fit = true;
                            }
                        }
                    }
                    ;
                    if (fit) {
                        vfrac += Math.pow(partDia, 3) * Math.PI / (6.0 * volBox);
                    }
                    else {
                        partDia *= 0.9;
                    }
                }
                ;
                vecSize = this.d_partList.size();
                vol = 0.0;
                for (var ii = 0; ii < vecSize; ii++) {
                    var dia = 2.0 * this.d_partList.getParticle(ii).getRadius();
                    vol += dia * dia * dia * Math.PI / 6.0;
                }
                vfrac = vol / volBox;
                console.info("Final values");
                console.info("No of parts = " + vecSize + " Vol frac = " + (vol / volBox));
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                this.d_parent.refreshDisplayPart3DFrame();
            }
            catch (e) {
                console.info("Some exception occured in method distributeSpheres");
            }
            ;
            this.setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
        };
        ComputeParticleLocPanel.prototype.isSphereInsideRVE = function (dia, xCent, yCent, zCent) {
            var rad = 0.5 * dia;
            var xMinPartBox = xCent - rad;
            var xMaxPartBox = xCent + rad;
            var yMinPartBox = yCent - rad;
            var yMaxPartBox = yCent + rad;
            var zMinPartBox = zCent - rad;
            var zMaxPartBox = zCent + rad;
            if (xMinPartBox >= 0.0 && xMaxPartBox <= this.d_rveSize && yMinPartBox >= 0.0 && yMaxPartBox <= this.d_rveSize && zMinPartBox >= 0.0 && zMaxPartBox <= this.d_rveSize) {
                return true;
            }
            return false;
        };
        ComputeParticleLocPanel.prototype.doSpheresIntersect = function (dia1, cent1, dia2, cent2) {
            var x1 = cent1.getX();
            var y1 = cent1.getY();
            var z1 = cent1.getZ();
            var x2 = cent2.getX();
            var y2 = cent2.getY();
            var z2 = cent2.getZ();
            var distCent = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
            var sumRadii = dia1 / 2 + dia2 / 2;
            if (sumRadii > distCent)
                return true;
            return false;
        };
        ComputeParticleLocPanel.prototype.distributeCirclesPeriodic = function () {
            var MAX_ITER = 2000;
            var matCode = 0;
            this.d_partList.clear();
            var kdtree = new vaango_ui.KdTree(2);
            var maxSearchPoints = 50;
            var distanceFunction = new vaango_ui.CircleToCircleDistanceFunction();
            var rand = new Random();
            var nofSizesCalc = this.d_rvePartSizeDist.nofSizesCalc;
            var rveVolume = this.d_rveSize * this.d_rveSize;
            var targetNofParts = (this.d_rvePartSizeDist.freq2DCalc).clone();
            var totalVolume = 0.0;
            var volFrac = totalVolume / rveVolume;
            var targetPartVolFrac = 0.0;
            for (var ii = nofSizesCalc; ii > 0; ii--) {
                var nofParts = this.d_rvePartSizeDist.freq2DCalc[ii - 1];
                java.lang.System.out.print("Particle Size = " + this.d_rvePartSizeDist.sizeCalc[ii - 1] + " Particles = " + nofParts);
                var partRad = 0.5 * this.d_rvePartSizeDist.sizeCalc[ii - 1];
                var partVol = Math.PI * partRad * partRad;
                targetPartVolFrac += targetNofParts[ii - 1] * partVol / rveVolume;
                var boxMin = -0.9 * partRad;
                var boxMax = this.d_rveSize + 0.9 * partRad;
                var boxInMin = partRad;
                var boxInMax = this.d_rveSize - partRad;
                var numFitted = 0;
                for (var jj = 0; jj < nofParts; jj++) {
                    var fit = false;
                    var nofIter = 0;
                    while ((!fit && nofIter < MAX_ITER)) {
                        var tx = rand.nextDouble();
                        var ty = rand.nextDouble();
                        var xCent = (1 - tx) * boxMin + tx * boxMax;
                        var yCent = (1 - ty) * boxMin + ty * boxMax;
                        var partCent = new vaango_ui.Point(xCent, yCent, 0.0);
                        if (this.inLimits(xCent, boxInMin, boxInMax) && this.inLimits(yCent, boxInMin, boxInMax)) {
                            if (!this.intersectsAnotherCircle(partCent, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                var newParticle = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, partCent, matCode);
                                this.d_partList.addParticle(newParticle);
                                totalVolume += newParticle.getVolume();
                                var thisPointArray = [partCent.getX(), partCent.getY(), partCent.getZ(), partRad];
                                kdtree.addPoint(thisPointArray, this.d_partList.size());
                                this.d_parent.refreshDisplayPartLocFrame();
                                fit = true;
                                ++numFitted;
                            }
                            ++nofIter;
                        }
                        else {
                            if (!this.intersectsAnotherCircle(partCent, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                var xLoc = new Array(3);
                                var yLoc = new Array(3);
                                var nofLoc = this.findPartLoc(partRad, xCent, yCent, 0, this.d_rveSize, xLoc, yLoc);
                                var cent1 = new vaango_ui.Point(xLoc[0], yLoc[0], 0.0);
                                var cent2 = new vaango_ui.Point(xLoc[1], yLoc[1], 0.0);
                                var cent3 = new vaango_ui.Point(xLoc[2], yLoc[2], 0.0);
                                if (nofLoc !== 0) {
                                    if (nofLoc === 3) {
                                        if (!this.intersectsAnotherCircle(cent1, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                            if (!this.intersectsAnotherCircle(cent2, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                                if (!this.intersectsAnotherCircle(cent3, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                                    fit = true;
                                                    ++numFitted;
                                                    var pOrig = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, partCent, matCode);
                                                    this.d_partList.addParticle(pOrig);
                                                    totalVolume += pOrig.getVolume();
                                                    var pOrigArray = [partCent.getX(), partCent.getY(), partCent.getZ(), partRad];
                                                    kdtree.addPoint(pOrigArray, this.d_partList.size());
                                                    var p1 = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, cent1, matCode);
                                                    this.d_partList.addParticle(p1);
                                                    var p1Array = [cent1.getX(), cent1.getY(), cent1.getZ(), partRad];
                                                    kdtree.addPoint(p1Array, this.d_partList.size());
                                                    var p2 = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, cent2, matCode);
                                                    this.d_partList.addParticle(p2);
                                                    var p2Array = [cent2.getX(), cent2.getY(), cent2.getZ(), partRad];
                                                    kdtree.addPoint(p2Array, this.d_partList.size());
                                                    var p3 = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, cent3, matCode);
                                                    this.d_partList.addParticle(p3);
                                                    var p3Array = [cent3.getX(), cent3.getY(), cent3.getZ(), partRad];
                                                    kdtree.addPoint(p3Array, this.d_partList.size());
                                                    this.d_parent.refreshDisplayPartLocFrame();
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (!this.intersectsAnotherCircle(cent1, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                            fit = true;
                                            ++numFitted;
                                            var pOrig = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, partCent, matCode);
                                            this.d_partList.addParticle(pOrig);
                                            totalVolume += pOrig.getVolume();
                                            var pOrigArray = [partCent.getX(), partCent.getY(), partCent.getZ(), partRad];
                                            kdtree.addPoint(pOrigArray, this.d_partList.size());
                                            var p1 = new vaango_ui.Particle(partRad, this.d_rveSize, this.d_thickness, cent1, matCode);
                                            this.d_partList.addParticle(p1);
                                            var p1Array = [cent1.getX(), cent1.getY(), cent1.getZ(), partRad];
                                            kdtree.addPoint(p1Array, this.d_partList.size());
                                            this.d_parent.refreshDisplayPartLocFrame();
                                        }
                                    }
                                }
                            }
                            ++nofIter;
                        }
                        if (nofIter % MAX_ITER === 0) {
                            partRad *= 0.995;
                            nofIter = 0;
                        }
                    }
                    ;
                }
                volFrac = totalVolume / rveVolume;
                targetPartVolFrac = Math.min(targetPartVolFrac, this.d_rvePartSizeDist.volFracInComposite / 100.0);
                console.info(" Particles fitted = " + numFitted + " Vol. Frac. = " + volFrac + " Target vf = " + targetPartVolFrac + " partRad = " + partRad);
                var volFracDiff = volFrac - targetPartVolFrac;
                if (volFracDiff < 0.0) {
                    var volDiff = Math.abs(volFracDiff * rveVolume);
                    if (ii === 1) {
                        partRad = 0.5 * this.d_rvePartSizeDist.sizeCalc[ii - 1];
                        partVol = Math.PI * partRad * partRad;
                        var numExtraParts = (Math.ceil(volDiff / partVol) | 0);
                        this.d_rvePartSizeDist.freq2DCalc[ii - 1] = numExtraParts;
                        ii = 2;
                    }
                    else {
                        partRad = 0.5 * this.d_rvePartSizeDist.sizeCalc[ii - 2];
                        partVol = Math.PI * partRad * partRad;
                        var numExtraParts = (Math.ceil(volDiff / partVol) | 0);
                        this.d_rvePartSizeDist.freq2DCalc[ii - 2] += numExtraParts;
                    }
                }
            }
            console.info("RVE volume = " + rveVolume + " Total particle volume = " + totalVolume + " Volume fraction = " + totalVolume / rveVolume);
            this.d_parent.refreshDisplayPart3DFrame();
        };
        ComputeParticleLocPanel.prototype.inLimits = function (x, min, max) {
            if (x === min || x === max || (x > min && x < max))
                return true;
            return false;
        };
        ComputeParticleLocPanel.prototype.intersectsAnotherCircle = function (center, diameter, kdtree, maxSearchPoints, distanceFunction) {
            var newPoint = [center.getX(), center.getY(), center.getZ(), 0.5 * diameter];
            var numSearchPoints = (Math.max(maxSearchPoints, Math.round(0.3 * this.d_partList.size())) | 0);
            var nearCirclesIterator = kdtree.getNearestNeighborIterator(newPoint, numSearchPoints, distanceFunction);
            while ((nearCirclesIterator.hasNext())) {
                var index = nearCirclesIterator.next();
                var part = this.d_partList.getParticle(index - 1);
                var neighborDiameter = 2.0 * part.getRadius();
                var neighborCenter = part.getCenter();
                var circlesIntersect = this.doCirclesIntersect(neighborDiameter, neighborCenter, diameter, center);
                if (circlesIntersect)
                    return true;
            }
            ;
            return false;
        };
        ComputeParticleLocPanel.prototype.findPartLoc = function (rad, x, y, min, max, xLoc, yLoc) {
            var xmin = x - rad;
            var xmax = x + rad;
            var ymin = y - rad;
            var ymax = y + rad;
            if (xmin < min && ymin < min) {
                xLoc[0] = x + this.d_rveSize;
                yLoc[0] = y;
                xLoc[1] = x + this.d_rveSize;
                yLoc[1] = y + this.d_rveSize;
                xLoc[2] = x;
                yLoc[2] = y + this.d_rveSize;
                return 3;
            }
            if (xmax > max && ymin < min) {
                xLoc[0] = x - this.d_rveSize;
                yLoc[0] = y;
                xLoc[1] = x;
                yLoc[1] = y + this.d_rveSize;
                xLoc[2] = x - this.d_rveSize;
                yLoc[2] = y + this.d_rveSize;
                return 3;
            }
            if (xmax > max && ymax > max) {
                xLoc[0] = x - this.d_rveSize;
                yLoc[0] = y - this.d_rveSize;
                xLoc[1] = x;
                yLoc[1] = y - this.d_rveSize;
                xLoc[2] = x - this.d_rveSize;
                yLoc[2] = y;
                return 3;
            }
            if (xmin < min && ymax > max) {
                xLoc[0] = x;
                yLoc[0] = y - this.d_rveSize;
                xLoc[1] = x + this.d_rveSize;
                yLoc[1] = y - this.d_rveSize;
                xLoc[2] = x + this.d_rveSize;
                yLoc[2] = y;
                return 3;
            }
            if (xmin < min) {
                xLoc[0] = x + this.d_rveSize;
                yLoc[0] = y;
                return 1;
            }
            if (xmax > max) {
                xLoc[0] = x - this.d_rveSize;
                yLoc[0] = y;
                return 1;
            }
            if (ymin < min) {
                xLoc[0] = x;
                yLoc[0] = y + this.d_rveSize;
                return 1;
            }
            if (ymax > max) {
                xLoc[0] = x;
                yLoc[0] = y - this.d_rveSize;
                return 1;
            }
            return 0;
        };
        ComputeParticleLocPanel.prototype.distributeSpheresPeriodic = function () {
            var MAX_ITER = 3000;
            var rotation = 0.0;
            var matCode = 0;
            this.d_partList.clear();
            var rveMin = new vaango_ui.Point(0.0, 0.0, 0.0);
            var rveMax = new vaango_ui.Point(this.d_rveSize, this.d_rveSize, this.d_rveSize);
            var kdtree = new vaango_ui.KdTree(3);
            var maxSearchPoints = 40;
            var distanceFunction = new vaango_ui.SphereToSphereDistanceFunction();
            var rand = new Random();
            var nofSizesCalc = this.d_rvePartSizeDist.nofSizesCalc;
            var vol = 0.0;
            for (var ii = nofSizesCalc; ii > 0; ii--) {
                var nofParts = this.d_rvePartSizeDist.freq3DCalc[ii - 1];
                var partDia = this.d_rvePartSizeDist.sizeCalc[ii - 1];
                this.d_progress += Math.round(ii / nofSizesCalc) * 100;
                this.progressBar.setValue(this.d_progress);
                this.setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
                for (var jj = 0; jj < nofParts; jj++) {
                    console.info("Particle size fraction # = " + ii + " Particle # = " + jj);
                    var boxMin = -0.45 * partDia;
                    var boxMax = this.d_rveSize + 0.45 * partDia;
                    var fit = false;
                    var nofIter = 0;
                    while ((!fit && nofIter < MAX_ITER)) {
                        nofIter++;
                        var tx = rand.nextDouble();
                        var ty = rand.nextDouble();
                        var tz = rand.nextDouble();
                        var xCent = (1 - tx) * boxMin + tx * boxMax;
                        var yCent = (1 - ty) * boxMin + ty * boxMax;
                        var zCent = (1 - tz) * boxMin + tz * boxMax;
                        var partCent = new vaango_ui.Point(xCent, yCent, zCent);
                        var periodicLoc = new Vector(8);
                        this.findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
                        if (kdtree.size() === 0) {
                            var iter = periodicLoc.iterator();
                            while ((iter.hasNext())) {
                                var thisPoint = iter.next();
                                var newParticle = new vaango_ui.Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, thisPoint, matCode, this.d_thickness);
                                this.d_partList.addParticle(newParticle);
                                var thisPointArray = [thisPoint.getX(), thisPoint.getY(), thisPoint.getZ(), 0.5 * partDia];
                                kdtree.addPoint(thisPointArray, this.d_partList.size());
                                this.d_parent.refreshDisplayPartLocFrame();
                            }
                            ;
                            vol += partDia * partDia * partDia * Math.PI / 6.0;
                            fit = true;
                        }
                        else {
                            var noIntersections = true;
                            var iter = periodicLoc.iterator();
                            while ((iter.hasNext())) {
                                var thisPoint = iter.next();
                                if (this.intersectsAnotherSphere(thisPoint, partDia, kdtree, maxSearchPoints, distanceFunction)) {
                                    noIntersections = false;
                                    break;
                                }
                            }
                            ;
                            if (noIntersections) {
                                iter = periodicLoc.iterator();
                                while ((iter.hasNext())) {
                                    var thisPoint = iter.next();
                                    var newParticle = new vaango_ui.Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, thisPoint, matCode, this.d_thickness);
                                    this.d_partList.addParticle(newParticle);
                                    var thisPointArray = [thisPoint.getX(), thisPoint.getY(), thisPoint.getZ(), 0.5 * partDia];
                                    kdtree.addPoint(thisPointArray, this.d_partList.size());
                                    this.d_parent.refreshDisplayPartLocFrame();
                                }
                                ;
                                vol += partDia * partDia * partDia * Math.PI / 6.0;
                                fit = true;
                            }
                        }
                    }
                    ;
                }
            }
            var volBox = Math.pow(this.d_rveSize, 3);
            var vfrac = vol / volBox;
            var partDia = this.d_rvePartSizeDist.sizeCalc[0];
            var fracComp = this.d_rvePartSizeDist.volFracInComposite / 100.0;
            console.info("After Stage 1: No of parts = " + this.d_partList.size() + " Vol frac = " + vfrac + " MaxFrac" + fracComp);
            console.info("  Volume of parts = " + vol + " Box vol = " + volBox);
            while ((vfrac < fracComp)) {
                var fit = false;
                var nofIter = 0;
                console.info("Part Dia = " + partDia + " Vol frac = " + vfrac + " Target Vol Frac = " + this.d_rvePartSizeDist.volFracInComposite);
                var boxMin = -0.45 * partDia;
                var boxMax = this.d_rveSize + 0.45 * partDia;
                while ((!fit)) {
                    if (nofIter > MAX_ITER)
                        break;
                    nofIter++;
                    var tx = rand.nextDouble();
                    var ty = rand.nextDouble();
                    var tz = rand.nextDouble();
                    var xCent = (1 - tx) * boxMin + tx * boxMax;
                    var yCent = (1 - ty) * boxMin + ty * boxMax;
                    var zCent = (1 - tz) * boxMin + tz * boxMax;
                    var partCent = new vaango_ui.Point(xCent, yCent, zCent);
                    var periodicLoc = new Vector(8);
                    this.findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
                    var iter = periodicLoc.iterator();
                    var noIntersections = true;
                    while ((iter.hasNext())) {
                        var thisPoint = iter.next();
                        if (this.intersectsAnotherSphere(thisPoint, partDia, kdtree, maxSearchPoints, distanceFunction)) {
                            noIntersections = false;
                            break;
                        }
                    }
                    ;
                    if (noIntersections) {
                        iter = periodicLoc.iterator();
                        while ((iter.hasNext())) {
                            var thisPoint = iter.next();
                            var newParticle = new vaango_ui.Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, thisPoint, matCode, this.d_thickness);
                            this.d_partList.addParticle(newParticle);
                            var thisPointArray = [thisPoint.getX(), thisPoint.getY(), thisPoint.getZ(), 0.5 * partDia];
                            kdtree.addPoint(thisPointArray, this.d_partList.size());
                            this.d_parent.refreshDisplayPartLocFrame();
                        }
                        ;
                        vol += partDia * partDia * partDia * Math.PI / 6.0;
                        vfrac = vol / volBox;
                        fit = true;
                    }
                }
                ;
                if (!fit)
                    partDia *= 0.9;
            }
            ;
            console.info("Final values");
            console.info("No of parts = " + this.d_partList.size() + " Vol frac = " + vfrac);
            console.info("Volume of parts = " + vol + " Box vol = " + volBox);
            this.d_parent.refreshDisplayPart3DFrame();
            this.setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
            var nofPartsInVector = this.d_partList.size();
            var spheresIntersect = false;
            for (var jj = 0; jj < nofPartsInVector - 1; jj++) {
                var partj = this.d_partList.getParticle(jj);
                var diaj = 2.0 * partj.getRadius();
                var centj = partj.getCenter();
                for (var kk = jj + 1; kk < nofPartsInVector; kk++) {
                    var partk = this.d_partList.getParticle(kk);
                    var diak = 2.0 * partk.getRadius();
                    var centk = partk.getCenter();
                    spheresIntersect = this.doSpheresIntersect(diaj, centj, diak, centk);
                    if (spheresIntersect) {
                        console.info("Some spheres intersect");
                        console.info(" Particle J = [" + centj.getX() + "," + centj.getY() + "," + centj.getZ() + "] Dia = " + diaj);
                        console.info(" Particle K = [" + centk.getX() + "," + centk.getY() + "," + centk.getZ() + "] Dia = " + diak);
                    }
                }
            }
        };
        ComputeParticleLocPanel.prototype.intersectsAnotherSphere = function (center, diameter, kdtree, maxSearchPoints, distanceFunction) {
            var newPoint = [center.getX(), center.getY(), center.getZ(), 0.5 * diameter];
            var numSearchPoints = (Math.max(maxSearchPoints, Math.round(0.3 * this.d_partList.size())) | 0);
            var nearSpheresIterator = kdtree.getNearestNeighborIterator(newPoint, numSearchPoints, distanceFunction);
            while ((nearSpheresIterator.hasNext())) {
                var index = nearSpheresIterator.next();
                var part = this.d_partList.getParticle(index - 1);
                var neighborDiameter = 2.0 * part.getRadius();
                var neighborCenter = part.getCenter();
                var spheresIntersect = this.doSpheresIntersect(neighborDiameter, neighborCenter, diameter, center);
                if (spheresIntersect)
                    return true;
            }
            ;
            return false;
        };
        ComputeParticleLocPanel.prototype.findPeriodicSpherePartLoc = function (center, diameter, rveMin, rveMax, periodicLoc) {
            var xRVE = rveMax.getX() - rveMin.getX();
            var yRVE = rveMax.getY() - rveMin.getY();
            var zRVE = rveMax.getZ() - rveMin.getZ();
            periodicLoc.add(center);
            var periodicPositions = new Vector(26);
            periodicPositions.add(center.translate(0.0, yRVE, 0.0));
            periodicPositions.add(center.translate(0.0, -yRVE, 0.0));
            periodicPositions.add(center.translate(xRVE, 0.0, 0.0));
            periodicPositions.add(center.translate(xRVE, yRVE, 0.0));
            periodicPositions.add(center.translate(xRVE, -yRVE, 0.0));
            periodicPositions.add(center.translate(-xRVE, 0.0, 0.0));
            periodicPositions.add(center.translate(-xRVE, yRVE, 0.0));
            periodicPositions.add(center.translate(-xRVE, -yRVE, 0.0));
            periodicPositions.add(center.translate(0.0, 0.0, zRVE));
            periodicPositions.add(center.translate(0.0, yRVE, zRVE));
            periodicPositions.add(center.translate(0.0, -yRVE, zRVE));
            periodicPositions.add(center.translate(xRVE, 0.0, zRVE));
            periodicPositions.add(center.translate(xRVE, yRVE, zRVE));
            periodicPositions.add(center.translate(xRVE, -yRVE, zRVE));
            periodicPositions.add(center.translate(-xRVE, 0.0, zRVE));
            periodicPositions.add(center.translate(-xRVE, yRVE, zRVE));
            periodicPositions.add(center.translate(-xRVE, -yRVE, zRVE));
            periodicPositions.add(center.translate(0.0, 0.0, -zRVE));
            periodicPositions.add(center.translate(0.0, yRVE, -zRVE));
            periodicPositions.add(center.translate(0.0, -yRVE, -zRVE));
            periodicPositions.add(center.translate(xRVE, 0.0, -zRVE));
            periodicPositions.add(center.translate(xRVE, yRVE, -zRVE));
            periodicPositions.add(center.translate(xRVE, -yRVE, -zRVE));
            periodicPositions.add(center.translate(-xRVE, 0.0, -zRVE));
            periodicPositions.add(center.translate(-xRVE, yRVE, -zRVE));
            periodicPositions.add(center.translate(-xRVE, -yRVE, -zRVE));
            var iter = periodicPositions.iterator();
            while ((iter.hasNext())) {
                var thisPoint = iter.next();
                var rad = 0.5 * diameter;
                var pointBoxMin = thisPoint.translate(-rad, -rad, -rad);
                var pointBoxMax = thisPoint.translate(rad, rad, rad);
                if (this.boxBoxIntersect(pointBoxMin, pointBoxMax, rveMin, rveMax)) {
                    periodicLoc.add(thisPoint);
                }
            }
            ;
        };
        ComputeParticleLocPanel.prototype.boxBoxIntersect = function (ptMin, ptMax, rveMin, rveMax) {
            if (ptMax.isLessThan(rveMin))
                return false;
            if (ptMin.isGreaterThan(rveMax))
                return false;
            return true;
        };
        ComputeParticleLocPanel.prototype.saveParticleDist = function () {
            var file = null;
            var fc = new JFileChooser(new File(".."));
            var returnVal = fc.showSaveDialog(this);
            if (returnVal === JFileChooser.APPROVE_OPTION)
                file = fc.getSelectedFile();
            if (file == null)
                return;
            this.d_partList.saveToFile(file, this.d_partTypeFlag);
        };
        return ComputeParticleLocPanel;
    }(JPanel));
    ComputeParticleLocPanel.serialVersionUID = 4020539494067019875;
    ComputeParticleLocPanel.CIRCLE = 1;
    ComputeParticleLocPanel.SPHERE = 2;
    ComputeParticleLocPanel.YES = 1;
    ComputeParticleLocPanel.NO = 2;
    vaango_ui.ComputeParticleLocPanel = ComputeParticleLocPanel;
})(vaango_ui || (vaango_ui = {}));
