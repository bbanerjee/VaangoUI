"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Random = java.util.Random;

    import Vector = java.util.Vector;

    import Iterator = java.util.Iterator;

    export class ComputeParticleLocPanel extends JPanel implements ItemListener, ActionListener {
        private static serialVersionUID : number = 4020539494067019875;

        private d_partList : ParticleList = null;

        private d_partSizeDist : ParticleSize = null;

        private d_parent : ParticleLocGeneratePanel = null;

        private d_rvePartSizeDist : ParticleSize = null;

        private d_partTypeFlag : number = 0;

        private d_hollowFlag : boolean = false;

        private d_thickness : number = 0.0;

        private rveSizeEntry : DecimalField = null;

        private thicknessLabel : JLabel = null;

        private thicknessEntry : DecimalField = null;

        private partTypeCBox : JComboBox<string> = null;

        private randomButton : JButton = null;

        private periodicButton : JButton = null;

        private saveButton : JButton = null;

        private progressBar : JProgressBar = null;

        private d_rveSize : number = 0.0;

        private d_progress : number = 0;

        public static CIRCLE : number = 1;

        public static SPHERE : number = 2;

        public static YES : number = 1;

        public static NO : number = 2;

        public constructor(partList : ParticleList, partSizeDist : ParticleSize, parent : ParticleLocGeneratePanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_partList = partList;
            this.d_partSizeDist = partSizeDist;
            this.d_parent = parent;
            this.d_rvePartSizeDist = new ParticleSize(partSizeDist);
            this.d_partTypeFlag = ComputeParticleLocPanel.CIRCLE;
            this.d_hollowFlag = false;
            this.d_thickness = 0.0;
            this.d_rveSize = 100.0;
            this.d_parent.setRVESize(this.d_rveSize);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var panel1 : JPanel = new JPanel(new GridLayout(4, 0));
            var rveSizeLabel : JLabel = new JLabel("RVE Size (in one dimension) ");
            panel1.add(rveSizeLabel);
            this.rveSizeEntry = new DecimalField(1.0, 5);
            panel1.add(this.rveSizeEntry);
            var partTypeLabel : JLabel = new JLabel("Type of particle ");
            panel1.add(partTypeLabel);
            this.partTypeCBox = new JComboBox<string>();
            this.partTypeCBox.addItem("Solid Circle");
            this.partTypeCBox.addItem("Hollow Circle");
            this.partTypeCBox.addItem("Solid Sphere");
            this.partTypeCBox.addItem("Hollow Sphere");
            this.partTypeCBox.setSelectedIndex(0);
            panel1.add(this.partTypeCBox);
            this.thicknessLabel = new JLabel("Thickness");
            panel1.add(this.thicknessLabel);
            this.thicknessEntry = new DecimalField(0.0, 9, true);
            panel1.add(this.thicknessEntry);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            var panel10 : JPanel = new JPanel(new GridLayout(4, 0));
            var labelrun : JLabel = new JLabel("Click on one of the following buttons");
            panel10.add(labelrun);
            this.randomButton = new JButton("Create Random Distribution");
            this.randomButton.setActionCommand("dist");
            panel10.add(this.randomButton);
            this.periodicButton = new JButton("Create Periodic Distribution");
            this.periodicButton.setActionCommand("periodic");
            panel10.add(this.periodicButton);
            this.progressBar = new JProgressBar(0, 100);
            this.progressBar.setValue(0);
            this.progressBar.setStringPainted(true);
            panel10.add(this.progressBar);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel10, gbc);
            this.add(panel10);
            var panel3 : JPanel = new JPanel(new GridLayout(1, 0));
            this.saveButton = new JButton("Save Calculated Data");
            this.saveButton.setActionCommand("save");
            panel3.add(this.saveButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 3, 1, 1, 5);
            gb.setConstraints(panel3, gbc);
            this.add(panel3);
            this.partTypeCBox.addItemListener(this);
            this.randomButton.addActionListener(this);
            this.periodicButton.addActionListener(this);
            this.saveButton.addActionListener(this);
            this.thicknessLabel.setEnabled(false);
            this.thicknessEntry.setEnabled(false);
        }

        public itemStateChanged(e : ItemEvent) {
            var item : string = /* valueOf */new String(e.getItem()).toString();
            if((item === "Solid Circle")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.CIRCLE;
                this.d_hollowFlag = false;
            } else if((item === "Hollow Circle")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.CIRCLE;
                this.d_hollowFlag = true;
            } else if((item === "Solid Sphere")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.SPHERE;
                this.d_hollowFlag = false;
            } else if((item === "Hollow Sphere")) {
                this.d_partTypeFlag = ComputeParticleLocPanel.SPHERE;
                this.d_hollowFlag = true;
            }
            this.thicknessLabel.setEnabled(this.d_hollowFlag);
            this.thicknessEntry.setEnabled(this.d_hollowFlag);
        }

        public actionPerformed(e : ActionEvent) {
            if(this.d_hollowFlag) {
                this.d_thickness = this.thicknessEntry.getValue();
            } else {
                this.d_thickness = 0.0;
            }
            if(e.getActionCommand() === "dist") {
                this.distributeParticles();
            } else if(e.getActionCommand() === "periodic") {
                this.periodicParticleDist();
            } else if(e.getActionCommand() === "save") {
                this.saveParticleDist();
            }
        }

        private distributeParticles() {
            this.d_partList.clear();
            this.estimateRVEPartSizeDist();
            switch((this.d_partTypeFlag)) {
            case ComputeParticleLocPanel.CIRCLE:
                this.distributeCircles();
                break;
            case ComputeParticleLocPanel.SPHERE:
                this.distributeSpheres();
                break;
            }
        }

        private periodicParticleDist() {
            this.d_partList.clear();
            this.estimateRVEPartSizeDist();
            switch((this.d_partTypeFlag)) {
            case ComputeParticleLocPanel.CIRCLE:
                this.distributeCirclesPeriodic();
                break;
            case ComputeParticleLocPanel.SPHERE:
                this.distributeSpheresPeriodic();
                break;
            }
        }

        private estimateRVEPartSizeDist() {
            this.d_rvePartSizeDist.copy(this.d_partSizeDist);
            this.d_rveSize = this.rveSizeEntry.getValue();
            this.d_parent.setRVESize(this.d_rveSize);
            this.d_partList.setRVESize(this.d_rveSize);
            var nofSizes : number = this.d_partSizeDist.nofSizesCalc;
            var dia : number[] = new Array(nofSizes);
            var vol : number[] = new Array(nofSizes);
            var num : number[] = new Array(nofSizes);
            var scaledNum : number[] = new Array(nofSizes);
            var rveSize : number = this.d_rveSize;
            var vf : number = this.d_partSizeDist.volFracInComposite * 0.01;
            var totvol : number = 0.0;
            var volInputRVE : number = 0.0;
            var volActualRVE : number = 0.0;
            var scalefac : number = 1.0;
            switch((this.d_partTypeFlag)) {
            case ComputeParticleLocPanel.CIRCLE:
                volActualRVE = rveSize * rveSize;
                for(var ii : number = 0; ii < nofSizes; ++ii) {
                    num[ii] = this.d_partSizeDist.freq2DCalc[ii];
                    dia[ii] = this.d_partSizeDist.sizeCalc[ii];
                    vol[ii] = 0.25 * Math.PI * dia[ii] * dia[ii];
                    totvol += (num[ii] * vol[ii]);
                }
                break;
            case ComputeParticleLocPanel.SPHERE:
                volActualRVE = rveSize * rveSize * rveSize;
                for(var ii : number = 0; ii < nofSizes; ++ii) {
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
            for(var ii : number = 0; ii < nofSizes; ++ii) {
                scaledNum[ii] = (<number>Math.round(num[ii] * scalefac)|0);
                this.d_rvePartSizeDist.freq2DCalc[ii] = scaledNum[ii];
                this.d_rvePartSizeDist.freq3DCalc[ii] = scaledNum[ii];
                totvol += (scaledNum[ii] * vol[ii]);
            }
            for(var ii : number = 0; ii < nofSizes; ii++) {
                var volFrac : number = 100.0 * vol[ii] * scaledNum[ii] / totvol;
                this.d_rvePartSizeDist.volFrac2DCalc[ii] = volFrac;
                this.d_rvePartSizeDist.volFrac3DCalc[ii] = volFrac;
            }
            this.d_rvePartSizeDist.print();
            var newVolFrac : number = 0.0;
            var fracComp : number = this.d_rvePartSizeDist.volFracInComposite / 100.0;
            switch((this.d_partTypeFlag)) {
            case ComputeParticleLocPanel.CIRCLE:
                newVolFrac = totvol / (rveSize * rveSize);
                break;
            case ComputeParticleLocPanel.SPHERE:
                newVolFrac = totvol / (rveSize * rveSize * rveSize);
                break;
            }
            console.info("Updated volume fraction = " + newVolFrac + " Target vol. frac. = " + fracComp);
            while((newVolFrac < 0.95 * fracComp)){
                for(var ii : number = 0; ii < nofSizes; ii++) {
                    if(this.d_rvePartSizeDist.freq2DCalc[ii] === 0) {
                        this.d_rvePartSizeDist.freq2DCalc[ii] = 1;
                        this.d_rvePartSizeDist.freq3DCalc[ii] = 1;
                        totvol += vol[ii];
                        break;
                    }
                }
                for(var ii : number = 0; ii < nofSizes; ii++) {
                    var volFrac : number = 100.0 * vol[ii] / totvol;
                    this.d_rvePartSizeDist.volFrac2DCalc[ii] = volFrac;
                    this.d_rvePartSizeDist.volFrac3DCalc[ii] = volFrac;
                }
                switch((this.d_partTypeFlag)) {
                case ComputeParticleLocPanel.CIRCLE:
                    newVolFrac = totvol / (rveSize * rveSize);
                    break;
                case ComputeParticleLocPanel.SPHERE:
                    newVolFrac = totvol / (rveSize * rveSize * rveSize);
                    break;
                }
                console.info("Updated volume fraction = " + newVolFrac + " Target vol. frac. = " + fracComp);
            };
        }

        private distributeCircles() {
            try {
                var rand : Random = new Random();
                var MAX_ITER : number = 1000;
                var matCode : number = 0;
                var nofSizesCalc : number = this.d_rvePartSizeDist.nofSizesCalc;
                for(var ii : number = nofSizesCalc - 1; ii > -1; ii--) {
                    var nofParts : number = this.d_rvePartSizeDist.freq2DCalc[ii];
                    var partDia : number = this.d_rvePartSizeDist.sizeCalc[ii];
                    var partDiaNext : number = 0.0;
                    if(ii === 0) partDiaNext = 0.5 * this.d_rvePartSizeDist.sizeCalc[0]; else partDiaNext = this.d_rvePartSizeDist.sizeCalc[ii - 1];
                    this.d_progress += Math.round(<number>ii / <number>nofSizesCalc) * 100;
                    this.progressBar.setValue(this.d_progress);
                    for(var jj : number = 0; jj < nofParts; jj++) {
                        var fit : boolean = false;
                        var nofIter : number = 0;
                        while((!fit)){
                            if(nofIter > MAX_ITER) {
                                if(partDia < partDiaNext) break; else {
                                    nofIter = 0;
                                    partDia *= 0.9;
                                }
                            }
                            nofIter++;
                            var xCent : number = rand.nextDouble() * this.d_rveSize;
                            var yCent : number = rand.nextDouble() * this.d_rveSize;
                            var partCent : Point = new Point(xCent, yCent, 0.0);
                            var boxFit : boolean = this.isCircleInsideRVE(partDia, xCent, yCent);
                            if(boxFit) {
                                var nofPartsInVector : number = this.d_partList.size();
                                var circlesIntersect : boolean = false;
                                for(var kk : number = 0; kk < nofPartsInVector; kk++) {
                                    var part : Particle = this.d_partList.getParticle(kk);
                                    var dia1 : number = 2.0 * part.getRadius();
                                    var cent1 : Point = part.getCenter();
                                    circlesIntersect = this.doCirclesIntersect(dia1, cent1, partDia, partCent);
                                    if(circlesIntersect) break;
                                }
                                if(circlesIntersect) fit = false; else {
                                    var newParticle : Particle = new Particle(0.5 * partDia, this.d_rveSize, this.d_thickness, partCent, matCode);
                                    this.d_partList.addParticle(newParticle);
                                    this.d_parent.refreshDisplayPartLocFrame();
                                    fit = true;
                                }
                            }
                        };
                    }
                }
                var vecSize : number = this.d_partList.size();
                var vol : number = 0.0;
                for(var ii : number = 0; ii < vecSize; ii++) {
                    var rad : number = (this.d_partList.getParticle(ii)).getRadius();
                    vol += Math.PI * rad * rad;
                }
                var volBox : number = this.d_rveSize * this.d_rveSize;
                var vfrac : number = vol / volBox;
                console.info("No of parts = " + vecSize + " Vol frac = " + vfrac);
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                var partDia : number = this.d_rvePartSizeDist.sizeCalc[0];
                var fracComp : number = this.d_rvePartSizeDist.volFracInComposite / 100.0;
                while((vfrac < fracComp)){
                    var fit : boolean = false;
                    var nofIter : number = 0;
                    console.info("Part Dia = " + partDia + " Vol frac = " + vfrac + "Vol Frac Comp = " + this.d_rvePartSizeDist.volFracInComposite);
                    while((!fit)){
                        if(nofIter > MAX_ITER) break;
                        nofIter++;
                        var xCent : number = rand.nextDouble() * this.d_rveSize;
                        var yCent : number = rand.nextDouble() * this.d_rveSize;
                        var partCent : Point = new Point(xCent, yCent, 0.0);
                        var boxFit : boolean = this.isCircleInsideRVE(partDia, xCent, yCent);
                        if(boxFit) {
                            var nofPartsInVector : number = this.d_partList.size();
                            var circlesIntersect : boolean = false;
                            for(var kk : number = 0; kk < nofPartsInVector; kk++) {
                                var part : Particle = this.d_partList.getParticle(kk);
                                var dia1 : number = 2.0 * part.getRadius();
                                var cent1 : Point = part.getCenter();
                                circlesIntersect = this.doCirclesIntersect(dia1, cent1, partDia, partCent);
                                if(circlesIntersect) break;
                            }
                            if(circlesIntersect) fit = false; else {
                                var newParticle : Particle = new Particle(0.5 * partDia, this.d_rveSize, this.d_thickness, partCent, matCode);
                                this.d_partList.addParticle(newParticle);
                                this.d_parent.refreshDisplayPartLocFrame();
                                fit = true;
                            }
                        }
                    };
                    if(fit) {
                        vfrac += (0.25 * Math.PI * partDia * partDia) / volBox;
                    } else {
                        partDia = 0.9 * partDia;
                    }
                };
                vecSize = this.d_partList.size();
                vol = 0.0;
                for(var ii : number = 0; ii < vecSize; ii++) {
                    var rad : number = (this.d_partList.getParticle(ii)).getRadius();
                    vol += Math.PI * rad * rad;
                }
                vfrac = vol / volBox;
                console.info("No of parts = " + vecSize + " Vol frac = " + (vol / volBox));
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                this.d_parent.refreshDisplayPart3DFrame();
            } catch(e) {
                console.info("Some exception occured in method distributeCircles");
            };
        }

        private doCirclesIntersect(dia1 : number, cent1 : Point, dia2 : number, cent2 : Point) : boolean {
            var x1 : number = cent1.getX();
            var y1 : number = cent1.getY();
            var x2 : number = cent2.getX();
            var y2 : number = cent2.getY();
            var distCent : number = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
            var sumRadii : number = dia1 / 2 + dia2 / 2;
            var gap : number = distCent - sumRadii;
            if(gap < 0.01 * sumRadii) return true;
            return false;
        }

        private isCircleInsideRVE(dia : number, xCent : number, yCent : number) : boolean {
            var rad : number = 0.5 * dia;
            var xMinPartBox : number = xCent - rad;
            var xMaxPartBox : number = xCent + rad;
            var yMinPartBox : number = yCent - rad;
            var yMaxPartBox : number = yCent + rad;
            if(xMinPartBox >= 0.0 && xMaxPartBox <= this.d_rveSize && yMinPartBox >= 0.0 && yMaxPartBox <= this.d_rveSize) {
                return true;
            }
            return false;
        }

        private distributeSpheres() {
            try {
                var rand : Random = new Random();
                var MAX_ITER : number = 3000;
                var rotation : number = 0.0;
                var matCode : number = 0;
                var nofSizesCalc : number = this.d_rvePartSizeDist.nofSizesCalc;
                for(var ii : number = nofSizesCalc; ii > 0; ii--) {
                    var nofParts : number = this.d_rvePartSizeDist.freq3DCalc[ii - 1];
                    var partDia : number = 0.0;
                    var partDiaCurr : number = 0.0;
                    var fit : boolean = false;
                    console.info("Particle size fraction # = " + ii);
                    this.d_progress += Math.round(<number>ii / <number>nofSizesCalc) * 100;
                    this.progressBar.setValue(this.d_progress);
                    this.setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
                    for(var jj : number = 0; jj < nofParts; jj++) {
                        console.info("Particle # = " + jj);
                        partDia = this.d_rvePartSizeDist.sizeCalc[ii - 1];
                        partDiaCurr = partDia;
                        fit = false;
                        var nofIter : number = 0;
                        while((!fit)){
                            nofIter++;
                            if(nofIter > MAX_ITER) break;
                            var xCent : number = rand.nextDouble() * this.d_rveSize;
                            var yCent : number = rand.nextDouble() * this.d_rveSize;
                            var zCent : number = rand.nextDouble() * this.d_rveSize;
                            var partCent : Point = new Point(xCent, yCent, zCent);
                            var boxFit : boolean = this.isSphereInsideRVE(partDia, xCent, yCent, zCent);
                            if(boxFit) {
                                var spheresIntersect : boolean = false;
                                var nofPartsInVector : number = this.d_partList.size();
                                for(var kk : number = 0; kk < nofPartsInVector; kk++) {
                                    var part : Particle = this.d_partList.getParticle(kk);
                                    var dia1 : number = 2.0 * part.getRadius();
                                    var cent1 : Point = part.getCenter();
                                    spheresIntersect = this.doSpheresIntersect(dia1, cent1, partDia, partCent);
                                    if(spheresIntersect) break;
                                }
                                if(spheresIntersect) fit = false; else {
                                    var newParticle : Particle = new Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, partCent, matCode, this.d_thickness);
                                    this.d_partList.addParticle(newParticle);
                                    newParticle.print();
                                    this.d_parent.refreshDisplayPartLocFrame();
                                    if(partDiaCurr !== partDia) {
                                        partDia = Math.pow(Math.pow(partDiaCurr, 3) - Math.pow(partDia, 3), (1.0 / 3.0));
                                        partDiaCurr = partDia;
                                        nofIter = 0;
                                        fit = false;
                                    } else {
                                        fit = true;
                                    }
                                }
                            }
                        };
                    }
                }
                var vecSize : number = this.d_partList.size();
                var vol : number = 0.0;
                for(var ii : number = 0; ii < vecSize; ii++) {
                    var dia : number = 2.0 * this.d_partList.getParticle(ii).getRadius();
                    vol += dia * dia * dia * Math.PI / 6.0;
                }
                var volBox : number = Math.pow(this.d_rveSize, 3);
                var vfrac : number = vol / volBox;
                console.info("No of parts = " + vecSize + " Vol frac = " + (vol / volBox));
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                var partDia : number = this.d_rvePartSizeDist.sizeCalc[0];
                var fracComp : number = this.d_rvePartSizeDist.volFracInComposite / 100.0;
                while((vfrac < fracComp)){
                    var fit : boolean = false;
                    var nofIter : number = 0;
                    console.info("Part Dia = " + partDia + " Vol frac = " + vfrac + "Vol Frac = " + this.d_rvePartSizeDist.volFracInComposite);
                    while((!fit)){
                        if(nofIter > MAX_ITER) break;
                        nofIter++;
                        var xCent : number = rand.nextDouble() * this.d_rveSize;
                        var yCent : number = rand.nextDouble() * this.d_rveSize;
                        var zCent : number = rand.nextDouble() * this.d_rveSize;
                        var partCent : Point = new Point(xCent, yCent, zCent);
                        var boxFit : boolean = this.isSphereInsideRVE(partDia, xCent, yCent, zCent);
                        if(boxFit) {
                            var nofPartsInVector : number = this.d_partList.size();
                            var spheresIntersect : boolean = false;
                            for(var kk : number = 0; kk < nofPartsInVector; kk++) {
                                var part : Particle = this.d_partList.getParticle(kk);
                                var dia1 : number = 2.0 * part.getRadius();
                                var cent1 : Point = part.getCenter();
                                spheresIntersect = this.doSpheresIntersect(dia1, cent1, partDia, partCent);
                                if(spheresIntersect) break;
                            }
                            if(spheresIntersect) fit = false; else {
                                var newParticle : Particle = new Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, partCent, matCode, this.d_thickness);
                                this.d_partList.addParticle(newParticle);
                                this.d_parent.refreshDisplayPartLocFrame();
                                fit = true;
                            }
                        }
                    };
                    if(fit) {
                        vfrac += Math.pow(partDia, 3) * Math.PI / (6.0 * volBox);
                    } else {
                        partDia *= 0.9;
                    }
                };
                vecSize = this.d_partList.size();
                vol = 0.0;
                for(var ii : number = 0; ii < vecSize; ii++) {
                    var dia : number = 2.0 * this.d_partList.getParticle(ii).getRadius();
                    vol += dia * dia * dia * Math.PI / 6.0;
                }
                vfrac = vol / volBox;
                console.info("Final values");
                console.info("No of parts = " + vecSize + " Vol frac = " + (vol / volBox));
                console.info("Volume of parts = " + vol + " Box vol = " + volBox);
                this.d_parent.refreshDisplayPart3DFrame();
            } catch(e) {
                console.info("Some exception occured in method distributeSpheres");
            };
            this.setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
        }

        private isSphereInsideRVE(dia : number, xCent : number, yCent : number, zCent : number) : boolean {
            var rad : number = 0.5 * dia;
            var xMinPartBox : number = xCent - rad;
            var xMaxPartBox : number = xCent + rad;
            var yMinPartBox : number = yCent - rad;
            var yMaxPartBox : number = yCent + rad;
            var zMinPartBox : number = zCent - rad;
            var zMaxPartBox : number = zCent + rad;
            if(xMinPartBox >= 0.0 && xMaxPartBox <= this.d_rveSize && yMinPartBox >= 0.0 && yMaxPartBox <= this.d_rveSize && zMinPartBox >= 0.0 && zMaxPartBox <= this.d_rveSize) {
                return true;
            }
            return false;
        }

        private doSpheresIntersect(dia1 : number, cent1 : Point, dia2 : number, cent2 : Point) : boolean {
            var x1 : number = cent1.getX();
            var y1 : number = cent1.getY();
            var z1 : number = cent1.getZ();
            var x2 : number = cent2.getX();
            var y2 : number = cent2.getY();
            var z2 : number = cent2.getZ();
            var distCent : number = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
            var sumRadii : number = dia1 / 2 + dia2 / 2;
            if(sumRadii > distCent) return true;
            return false;
        }

        private distributeCirclesPeriodic() {
            var MAX_ITER : number = 2000;
            var matCode : number = 0;
            this.d_partList.clear();
            var kdtree : KdTree<number> = new KdTree<number>(2);
            var maxSearchPoints : number = 50;
            var distanceFunction : DistanceFunction = new CircleToCircleDistanceFunction();
            var rand : Random = new Random();
            var nofSizesCalc : number = this.d_rvePartSizeDist.nofSizesCalc;
            var rveVolume : number = this.d_rveSize * this.d_rveSize;
            var targetNofParts : number[] = (this.d_rvePartSizeDist.freq2DCalc).clone();
            var totalVolume : number = 0.0;
            var volFrac : number = totalVolume / rveVolume;
            var targetPartVolFrac : number = 0.0;
            for(var ii : number = nofSizesCalc; ii > 0; ii--) {
                var nofParts : number = this.d_rvePartSizeDist.freq2DCalc[ii - 1];
                java.lang.System.out.print("Particle Size = " + this.d_rvePartSizeDist.sizeCalc[ii - 1] + " Particles = " + nofParts);
                var partRad : number = 0.5 * this.d_rvePartSizeDist.sizeCalc[ii - 1];
                var partVol : number = Math.PI * partRad * partRad;
                targetPartVolFrac += <number>targetNofParts[ii - 1] * partVol / rveVolume;
                var boxMin : number = -0.9 * partRad;
                var boxMax : number = this.d_rveSize + 0.9 * partRad;
                var boxInMin : number = partRad;
                var boxInMax : number = this.d_rveSize - partRad;
                var numFitted : number = 0;
                for(var jj : number = 0; jj < nofParts; jj++) {
                    var fit : boolean = false;
                    var nofIter : number = 0;
                    while((!fit && nofIter < MAX_ITER)){
                        var tx : number = rand.nextDouble();
                        var ty : number = rand.nextDouble();
                        var xCent : number = (1 - tx) * boxMin + tx * boxMax;
                        var yCent : number = (1 - ty) * boxMin + ty * boxMax;
                        var partCent : Point = new Point(xCent, yCent, 0.0);
                        if(this.inLimits(xCent, boxInMin, boxInMax) && this.inLimits(yCent, boxInMin, boxInMax)) {
                            if(!this.intersectsAnotherCircle(partCent, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                var newParticle : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, partCent, matCode);
                                this.d_partList.addParticle(newParticle);
                                totalVolume += newParticle.getVolume();
                                var thisPointArray : number[] = [partCent.getX(), partCent.getY(), partCent.getZ(), partRad];
                                kdtree.addPoint(thisPointArray, this.d_partList.size());
                                this.d_parent.refreshDisplayPartLocFrame();
                                fit = true;
                                ++numFitted;
                            }
                            ++nofIter;
                        } else {
                            if(!this.intersectsAnotherCircle(partCent, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                var xLoc : number[] = new Array(3);
                                var yLoc : number[] = new Array(3);
                                var nofLoc : number = this.findPartLoc(partRad, xCent, yCent, 0, this.d_rveSize, xLoc, yLoc);
                                var cent1 : Point = new Point(xLoc[0], yLoc[0], 0.0);
                                var cent2 : Point = new Point(xLoc[1], yLoc[1], 0.0);
                                var cent3 : Point = new Point(xLoc[2], yLoc[2], 0.0);
                                if(nofLoc !== 0) {
                                    if(nofLoc === 3) {
                                        if(!this.intersectsAnotherCircle(cent1, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                            if(!this.intersectsAnotherCircle(cent2, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                                if(!this.intersectsAnotherCircle(cent3, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                                    fit = true;
                                                    ++numFitted;
                                                    var pOrig : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, partCent, matCode);
                                                    this.d_partList.addParticle(pOrig);
                                                    totalVolume += pOrig.getVolume();
                                                    var pOrigArray : number[] = [partCent.getX(), partCent.getY(), partCent.getZ(), partRad];
                                                    kdtree.addPoint(pOrigArray, this.d_partList.size());
                                                    var p1 : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, cent1, matCode);
                                                    this.d_partList.addParticle(p1);
                                                    var p1Array : number[] = [cent1.getX(), cent1.getY(), cent1.getZ(), partRad];
                                                    kdtree.addPoint(p1Array, this.d_partList.size());
                                                    var p2 : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, cent2, matCode);
                                                    this.d_partList.addParticle(p2);
                                                    var p2Array : number[] = [cent2.getX(), cent2.getY(), cent2.getZ(), partRad];
                                                    kdtree.addPoint(p2Array, this.d_partList.size());
                                                    var p3 : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, cent3, matCode);
                                                    this.d_partList.addParticle(p3);
                                                    var p3Array : number[] = [cent3.getX(), cent3.getY(), cent3.getZ(), partRad];
                                                    kdtree.addPoint(p3Array, this.d_partList.size());
                                                    this.d_parent.refreshDisplayPartLocFrame();
                                                }
                                            }
                                        }
                                    } else {
                                        if(!this.intersectsAnotherCircle(cent1, 2.0 * partRad, kdtree, maxSearchPoints, distanceFunction)) {
                                            fit = true;
                                            ++numFitted;
                                            var pOrig : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, partCent, matCode);
                                            this.d_partList.addParticle(pOrig);
                                            totalVolume += pOrig.getVolume();
                                            var pOrigArray : number[] = [partCent.getX(), partCent.getY(), partCent.getZ(), partRad];
                                            kdtree.addPoint(pOrigArray, this.d_partList.size());
                                            var p1 : Particle = new Particle(partRad, this.d_rveSize, this.d_thickness, cent1, matCode);
                                            this.d_partList.addParticle(p1);
                                            var p1Array : number[] = [cent1.getX(), cent1.getY(), cent1.getZ(), partRad];
                                            kdtree.addPoint(p1Array, this.d_partList.size());
                                            this.d_parent.refreshDisplayPartLocFrame();
                                        }
                                    }
                                }
                            }
                            ++nofIter;
                        }
                        if(nofIter % MAX_ITER === 0) {
                            partRad *= 0.995;
                            nofIter = 0;
                        }
                    };
                }
                volFrac = totalVolume / rveVolume;
                targetPartVolFrac = Math.min(targetPartVolFrac, this.d_rvePartSizeDist.volFracInComposite / 100.0);
                console.info(" Particles fitted = " + numFitted + " Vol. Frac. = " + volFrac + " Target vf = " + targetPartVolFrac + " partRad = " + partRad);
                var volFracDiff : number = volFrac - targetPartVolFrac;
                if(volFracDiff < 0.0) {
                    var volDiff : number = Math.abs(volFracDiff * rveVolume);
                    if(ii === 1) {
                        partRad = 0.5 * this.d_rvePartSizeDist.sizeCalc[ii - 1];
                        partVol = Math.PI * partRad * partRad;
                        var numExtraParts : number = (<number>Math.ceil(volDiff / partVol)|0);
                        this.d_rvePartSizeDist.freq2DCalc[ii - 1] = numExtraParts;
                        ii = 2;
                    } else {
                        partRad = 0.5 * this.d_rvePartSizeDist.sizeCalc[ii - 2];
                        partVol = Math.PI * partRad * partRad;
                        var numExtraParts : number = (<number>Math.ceil(volDiff / partVol)|0);
                        this.d_rvePartSizeDist.freq2DCalc[ii - 2] += numExtraParts;
                    }
                }
            }
            console.info("RVE volume = " + rveVolume + " Total particle volume = " + totalVolume + " Volume fraction = " + totalVolume / rveVolume);
            this.d_parent.refreshDisplayPart3DFrame();
        }

        private inLimits(x : number, min : number, max : number) : boolean {
            if(x === min || x === max || (x > min && x < max)) return true;
            return false;
        }

        private intersectsAnotherCircle(center : Point, diameter : number, kdtree : KdTree<number>, maxSearchPoints : number, distanceFunction : DistanceFunction) : boolean {
            var newPoint : number[] = [center.getX(), center.getY(), center.getZ(), 0.5 * diameter];
            var numSearchPoints : number = (<number>Math.max(maxSearchPoints, Math.round(0.3 * <number>this.d_partList.size()))|0);
            var nearCirclesIterator : NearestNeighborIterator<number> = kdtree.getNearestNeighborIterator(newPoint, numSearchPoints, distanceFunction);
            while((nearCirclesIterator.hasNext())){
                var index : number = nearCirclesIterator.next();
                var part : Particle = this.d_partList.getParticle(index - 1);
                var neighborDiameter : number = 2.0 * part.getRadius();
                var neighborCenter : Point = part.getCenter();
                var circlesIntersect : boolean = this.doCirclesIntersect(neighborDiameter, neighborCenter, diameter, center);
                if(circlesIntersect) return true;
            };
            return false;
        }

        private findPartLoc(rad : number, x : number, y : number, min : number, max : number, xLoc : number[], yLoc : number[]) : number {
            var xmin : number = x - rad;
            var xmax : number = x + rad;
            var ymin : number = y - rad;
            var ymax : number = y + rad;
            if(xmin < min && ymin < min) {
                xLoc[0] = x + this.d_rveSize;
                yLoc[0] = y;
                xLoc[1] = x + this.d_rveSize;
                yLoc[1] = y + this.d_rveSize;
                xLoc[2] = x;
                yLoc[2] = y + this.d_rveSize;
                return 3;
            }
            if(xmax > max && ymin < min) {
                xLoc[0] = x - this.d_rveSize;
                yLoc[0] = y;
                xLoc[1] = x;
                yLoc[1] = y + this.d_rveSize;
                xLoc[2] = x - this.d_rveSize;
                yLoc[2] = y + this.d_rveSize;
                return 3;
            }
            if(xmax > max && ymax > max) {
                xLoc[0] = x - this.d_rveSize;
                yLoc[0] = y - this.d_rveSize;
                xLoc[1] = x;
                yLoc[1] = y - this.d_rveSize;
                xLoc[2] = x - this.d_rveSize;
                yLoc[2] = y;
                return 3;
            }
            if(xmin < min && ymax > max) {
                xLoc[0] = x;
                yLoc[0] = y - this.d_rveSize;
                xLoc[1] = x + this.d_rveSize;
                yLoc[1] = y - this.d_rveSize;
                xLoc[2] = x + this.d_rveSize;
                yLoc[2] = y;
                return 3;
            }
            if(xmin < min) {
                xLoc[0] = x + this.d_rveSize;
                yLoc[0] = y;
                return 1;
            }
            if(xmax > max) {
                xLoc[0] = x - this.d_rveSize;
                yLoc[0] = y;
                return 1;
            }
            if(ymin < min) {
                xLoc[0] = x;
                yLoc[0] = y + this.d_rveSize;
                return 1;
            }
            if(ymax > max) {
                xLoc[0] = x;
                yLoc[0] = y - this.d_rveSize;
                return 1;
            }
            return 0;
        }

        private distributeSpheresPeriodic() {
            var MAX_ITER : number = 3000;
            var rotation : number = 0.0;
            var matCode : number = 0;
            this.d_partList.clear();
            var rveMin : Point = new Point(0.0, 0.0, 0.0);
            var rveMax : Point = new Point(this.d_rveSize, this.d_rveSize, this.d_rveSize);
            var kdtree : KdTree<number> = new KdTree<number>(3);
            var maxSearchPoints : number = 40;
            var distanceFunction : DistanceFunction = new SphereToSphereDistanceFunction();
            var rand : Random = new Random();
            var nofSizesCalc : number = this.d_rvePartSizeDist.nofSizesCalc;
            var vol : number = 0.0;
            for(var ii : number = nofSizesCalc; ii > 0; ii--) {
                var nofParts : number = this.d_rvePartSizeDist.freq3DCalc[ii - 1];
                var partDia : number = this.d_rvePartSizeDist.sizeCalc[ii - 1];
                this.d_progress += Math.round(<number>ii / <number>nofSizesCalc) * 100;
                this.progressBar.setValue(this.d_progress);
                this.setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
                for(var jj : number = 0; jj < nofParts; jj++) {
                    console.info("Particle size fraction # = " + ii + " Particle # = " + jj);
                    var boxMin : number = -0.45 * partDia;
                    var boxMax : number = this.d_rveSize + 0.45 * partDia;
                    var fit : boolean = false;
                    var nofIter : number = 0;
                    while((!fit && nofIter < MAX_ITER)){
                        nofIter++;
                        var tx : number = rand.nextDouble();
                        var ty : number = rand.nextDouble();
                        var tz : number = rand.nextDouble();
                        var xCent : number = (1 - tx) * boxMin + tx * boxMax;
                        var yCent : number = (1 - ty) * boxMin + ty * boxMax;
                        var zCent : number = (1 - tz) * boxMin + tz * boxMax;
                        var partCent : Point = new Point(xCent, yCent, zCent);
                        var periodicLoc : Vector<Point> = new Vector<Point>(8);
                        this.findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
                        if(kdtree.size() === 0) {
                            var iter : Iterator<Point> = periodicLoc.iterator();
                            while((iter.hasNext())){
                                var thisPoint : Point = iter.next();
                                var newParticle : Particle = new Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, thisPoint, matCode, this.d_thickness);
                                this.d_partList.addParticle(newParticle);
                                var thisPointArray : number[] = [thisPoint.getX(), thisPoint.getY(), thisPoint.getZ(), 0.5 * partDia];
                                kdtree.addPoint(thisPointArray, this.d_partList.size());
                                this.d_parent.refreshDisplayPartLocFrame();
                            };
                            vol += partDia * partDia * partDia * Math.PI / 6.0;
                            fit = true;
                        } else {
                            var noIntersections : boolean = true;
                            var iter : Iterator<Point> = periodicLoc.iterator();
                            while((iter.hasNext())){
                                var thisPoint : Point = iter.next();
                                if(this.intersectsAnotherSphere(thisPoint, partDia, kdtree, maxSearchPoints, distanceFunction)) {
                                    noIntersections = false;
                                    break;
                                }
                            };
                            if(noIntersections) {
                                iter = periodicLoc.iterator();
                                while((iter.hasNext())){
                                    var thisPoint : Point = iter.next();
                                    var newParticle : Particle = new Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, thisPoint, matCode, this.d_thickness);
                                    this.d_partList.addParticle(newParticle);
                                    var thisPointArray : number[] = [thisPoint.getX(), thisPoint.getY(), thisPoint.getZ(), 0.5 * partDia];
                                    kdtree.addPoint(thisPointArray, this.d_partList.size());
                                    this.d_parent.refreshDisplayPartLocFrame();
                                };
                                vol += partDia * partDia * partDia * Math.PI / 6.0;
                                fit = true;
                            }
                        }
                    };
                }
            }
            var volBox : number = Math.pow(this.d_rveSize, 3);
            var vfrac : number = vol / volBox;
            var partDia : number = this.d_rvePartSizeDist.sizeCalc[0];
            var fracComp : number = this.d_rvePartSizeDist.volFracInComposite / 100.0;
            console.info("After Stage 1: No of parts = " + this.d_partList.size() + " Vol frac = " + vfrac + " MaxFrac" + fracComp);
            console.info("  Volume of parts = " + vol + " Box vol = " + volBox);
            while((vfrac < fracComp)){
                var fit : boolean = false;
                var nofIter : number = 0;
                console.info("Part Dia = " + partDia + " Vol frac = " + vfrac + " Target Vol Frac = " + this.d_rvePartSizeDist.volFracInComposite);
                var boxMin : number = -0.45 * partDia;
                var boxMax : number = this.d_rveSize + 0.45 * partDia;
                while((!fit)){
                    if(nofIter > MAX_ITER) break;
                    nofIter++;
                    var tx : number = rand.nextDouble();
                    var ty : number = rand.nextDouble();
                    var tz : number = rand.nextDouble();
                    var xCent : number = (1 - tx) * boxMin + tx * boxMax;
                    var yCent : number = (1 - ty) * boxMin + ty * boxMax;
                    var zCent : number = (1 - tz) * boxMin + tz * boxMax;
                    var partCent : Point = new Point(xCent, yCent, zCent);
                    var periodicLoc : Vector<Point> = new Vector<Point>(8);
                    this.findPeriodicSpherePartLoc(partCent, partDia, rveMin, rveMax, periodicLoc);
                    var iter : Iterator<Point> = periodicLoc.iterator();
                    var noIntersections : boolean = true;
                    while((iter.hasNext())){
                        var thisPoint : Point = iter.next();
                        if(this.intersectsAnotherSphere(thisPoint, partDia, kdtree, maxSearchPoints, distanceFunction)) {
                            noIntersections = false;
                            break;
                        }
                    };
                    if(noIntersections) {
                        iter = periodicLoc.iterator();
                        while((iter.hasNext())){
                            var thisPoint : Point = iter.next();
                            var newParticle : Particle = new Particle(this.d_partTypeFlag, 0.5 * partDia, rotation, thisPoint, matCode, this.d_thickness);
                            this.d_partList.addParticle(newParticle);
                            var thisPointArray : number[] = [thisPoint.getX(), thisPoint.getY(), thisPoint.getZ(), 0.5 * partDia];
                            kdtree.addPoint(thisPointArray, this.d_partList.size());
                            this.d_parent.refreshDisplayPartLocFrame();
                        };
                        vol += partDia * partDia * partDia * Math.PI / 6.0;
                        vfrac = vol / volBox;
                        fit = true;
                    }
                };
                if(!fit) partDia *= 0.9;
            };
            console.info("Final values");
            console.info("No of parts = " + this.d_partList.size() + " Vol frac = " + vfrac);
            console.info("Volume of parts = " + vol + " Box vol = " + volBox);
            this.d_parent.refreshDisplayPart3DFrame();
            this.setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
            var nofPartsInVector : number = this.d_partList.size();
            var spheresIntersect : boolean = false;
            for(var jj : number = 0; jj < nofPartsInVector - 1; jj++) {
                var partj : Particle = this.d_partList.getParticle(jj);
                var diaj : number = 2.0 * partj.getRadius();
                var centj : Point = partj.getCenter();
                for(var kk : number = jj + 1; kk < nofPartsInVector; kk++) {
                    var partk : Particle = this.d_partList.getParticle(kk);
                    var diak : number = 2.0 * partk.getRadius();
                    var centk : Point = partk.getCenter();
                    spheresIntersect = this.doSpheresIntersect(diaj, centj, diak, centk);
                    if(spheresIntersect) {
                        console.info("Some spheres intersect");
                        console.info(" Particle J = [" + centj.getX() + "," + centj.getY() + "," + centj.getZ() + "] Dia = " + diaj);
                        console.info(" Particle K = [" + centk.getX() + "," + centk.getY() + "," + centk.getZ() + "] Dia = " + diak);
                    }
                }
            }
        }

        private intersectsAnotherSphere(center : Point, diameter : number, kdtree : KdTree<number>, maxSearchPoints : number, distanceFunction : DistanceFunction) : boolean {
            var newPoint : number[] = [center.getX(), center.getY(), center.getZ(), 0.5 * diameter];
            var numSearchPoints : number = (<number>Math.max(maxSearchPoints, Math.round(0.3 * <number>this.d_partList.size()))|0);
            var nearSpheresIterator : NearestNeighborIterator<number> = kdtree.getNearestNeighborIterator(newPoint, numSearchPoints, distanceFunction);
            while((nearSpheresIterator.hasNext())){
                var index : number = nearSpheresIterator.next();
                var part : Particle = this.d_partList.getParticle(index - 1);
                var neighborDiameter : number = 2.0 * part.getRadius();
                var neighborCenter : Point = part.getCenter();
                var spheresIntersect : boolean = this.doSpheresIntersect(neighborDiameter, neighborCenter, diameter, center);
                if(spheresIntersect) return true;
            };
            return false;
        }

        private findPeriodicSpherePartLoc(center : Point, diameter : number, rveMin : Point, rveMax : Point, periodicLoc : Vector<Point>) {
            var xRVE : number = rveMax.getX() - rveMin.getX();
            var yRVE : number = rveMax.getY() - rveMin.getY();
            var zRVE : number = rveMax.getZ() - rveMin.getZ();
            periodicLoc.add(center);
            var periodicPositions : Vector<Point> = new Vector<Point>(26);
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
            var iter : Iterator<Point> = periodicPositions.iterator();
            while((iter.hasNext())){
                var thisPoint : Point = iter.next();
                var rad : number = 0.5 * diameter;
                var pointBoxMin : Point = thisPoint.translate(-rad, -rad, -rad);
                var pointBoxMax : Point = thisPoint.translate(rad, rad, rad);
                if(this.boxBoxIntersect(pointBoxMin, pointBoxMax, rveMin, rveMax)) {
                    periodicLoc.add(thisPoint);
                }
            };
        }

        private boxBoxIntersect(ptMin : Point, ptMax : Point, rveMin : Point, rveMax : Point) : boolean {
            if(ptMax.isLessThan(rveMin)) return false;
            if(ptMin.isGreaterThan(rveMax)) return false;
            return true;
        }

        private saveParticleDist() {
            var file : File = null;
            var fc : JFileChooser = new JFileChooser(new File(".."));
            var returnVal : number = fc.showSaveDialog(this);
            if(returnVal === JFileChooser.APPROVE_OPTION) file = fc.getSelectedFile();
            if(file == null) return;
            this.d_partList.saveToFile(file, this.d_partTypeFlag);
        }
    }
}

