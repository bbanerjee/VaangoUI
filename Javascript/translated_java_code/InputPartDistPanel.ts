"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import DecimalFormat = java.text.DecimalFormat;

    export class InputPartDistPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = -2753326228947983618;

        private d_partSizeDist : ParticleSize = null;

        private d_parent : ParticleSizeDistInputPanel = null;

        private alreadyCalculated : boolean = false;

        private readButton : JButton = null;

        private calcButton : JButton = null;

        private saveButton : JButton = null;

        public matNameEntry : JTextField = null;

        public volFracEntry : DecimalField = null;

        public size11Entry : DecimalField = null;

        public frac11Entry : DecimalField = null;

        public size12Entry : DecimalField = null;

        public frac12Entry : DecimalField = null;

        public size13Entry : DecimalField = null;

        public frac13Entry : DecimalField = null;

        public size14Entry : DecimalField = null;

        public frac14Entry : DecimalField = null;

        public size15Entry : DecimalField = null;

        public frac15Entry : DecimalField = null;

        public size16Entry : DecimalField = null;

        public frac16Entry : DecimalField = null;

        public constructor(partSizeDist : ParticleSize, parent : ParticleSizeDistInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_partSizeDist = partSizeDist;
            this.d_parent = parent;
            this.alreadyCalculated = false;
            var panel1 : JPanel = new JPanel(new GridLayout(1, 0));
            var panel2 : JPanel = new JPanel(new GridLayout(4, 0));
            var panel4 : JPanel = new JPanel(new GridLayout(8, 0));
            var panel6 : JPanel = new JPanel(new GridLayout(1, 0));
            this.readButton = new JButton("Read from File");
            this.readButton.setActionCommand("read");
            panel1.add(this.readButton);
            var label21 : JLabel = new JLabel("Composite Material Name");
            var label23 : JLabel = new JLabel("Vol. Frac. of Particles in Composite (%)");
            this.matNameEntry = new JTextField(this.d_partSizeDist.compositeName, 20);
            this.volFracEntry = new DecimalField(100.0, 5);
            panel2.add(label21);
            panel2.add(this.matNameEntry);
            panel2.add(label23);
            panel2.add(this.volFracEntry);
            var label41 : JLabel = new JLabel("Size Distribution");
            var label42 : JLabel = new JLabel("of Particles");
            var label43 : JLabel = new JLabel("Size <=");
            var label44 : JLabel = new JLabel("Fraction (volume %)");
            this.size11Entry = new DecimalField(this.d_partSizeDist.sizeInp[0], 4, true);
            this.frac11Entry = new DecimalField(this.d_partSizeDist.volFracInp[0], 5);
            this.size12Entry = new DecimalField(this.d_partSizeDist.sizeInp[1], 4, true);
            this.frac12Entry = new DecimalField(this.d_partSizeDist.volFracInp[0] + this.d_partSizeDist.volFracInp[1], 5);
            this.size13Entry = new DecimalField(0.0, 4, true);
            this.frac13Entry = new DecimalField(0.0, 5);
            this.size14Entry = new DecimalField(0.0, 4, true);
            this.frac14Entry = new DecimalField(0.0, 5);
            this.size15Entry = new DecimalField(0.0, 4, true);
            this.frac15Entry = new DecimalField(0.0, 5);
            this.size16Entry = new DecimalField(0.0, 4, true);
            this.frac16Entry = new DecimalField(0.0, 5);
            panel4.add(label41);
            panel4.add(label42);
            panel4.add(label43);
            panel4.add(label44);
            panel4.add(this.size11Entry);
            panel4.add(this.frac11Entry);
            panel4.add(this.size12Entry);
            panel4.add(this.frac12Entry);
            panel4.add(this.size13Entry);
            panel4.add(this.frac13Entry);
            panel4.add(this.size14Entry);
            panel4.add(this.frac14Entry);
            panel4.add(this.size15Entry);
            panel4.add(this.frac15Entry);
            panel4.add(this.size16Entry);
            panel4.add(this.frac16Entry);
            this.calcButton = new JButton("Calculate Particle Distribution");
            this.calcButton.setActionCommand("calc");
            this.saveButton = new JButton("Save to File");
            this.saveButton.setActionCommand("save");
            panel6.add(this.calcButton);
            panel6.add(this.saveButton);
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            this.add(panel2);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel4, gbc);
            this.add(panel4);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 4, 1, 1, 5);
            gb.setConstraints(panel6, gbc);
            this.add(panel6);
            var textFieldListener : InputPartDistPanel.TextFieldListener = new InputPartDistPanel.TextFieldListener(this);
            this.matNameEntry.getDocument().addDocumentListener(textFieldListener);
            this.volFracEntry.getDocument().addDocumentListener(textFieldListener);
            this.size11Entry.getDocument().addDocumentListener(textFieldListener);
            this.frac11Entry.getDocument().addDocumentListener(textFieldListener);
            this.size12Entry.getDocument().addDocumentListener(textFieldListener);
            this.frac12Entry.getDocument().addDocumentListener(textFieldListener);
            this.size13Entry.getDocument().addDocumentListener(textFieldListener);
            this.frac13Entry.getDocument().addDocumentListener(textFieldListener);
            this.size14Entry.getDocument().addDocumentListener(textFieldListener);
            this.frac14Entry.getDocument().addDocumentListener(textFieldListener);
            this.size15Entry.getDocument().addDocumentListener(textFieldListener);
            this.frac15Entry.getDocument().addDocumentListener(textFieldListener);
            this.size16Entry.getDocument().addDocumentListener(textFieldListener);
            this.frac16Entry.getDocument().addDocumentListener(textFieldListener);
            var buttonListener : InputPartDistPanel.ButtonListener = new InputPartDistPanel.ButtonListener(this);
            this.readButton.addActionListener(buttonListener);
            this.calcButton.addActionListener(buttonListener);
            this.saveButton.addActionListener(buttonListener);
        }

        readFromFile() {
            var file : File = null;
            var fc : JFileChooser = new JFileChooser(new File(".."));
            var returnVal : number = fc.showOpenDialog(this);
            if(returnVal === JFileChooser.APPROVE_OPTION) {
                file = fc.getSelectedFile();
            }
            if(file == null) return;
            try {
                var fr : FileReader = new FileReader(file);
                var st : StreamTokenizer = new StreamTokenizer(fr);
                st.commentChar('#');
                st.quoteChar('\"');
                var count : number = 0;
                while((st.nextToken() !== StreamTokenizer.TT_EOF)){
                    count++;
                    switch((count)) {
                    case 1:
                        this.matNameEntry.setText(st.sval);
                        break;
                    case 2:
                        this.volFracEntry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 3:
                        this.size11Entry.setValue(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 4:
                        this.frac11Entry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 5:
                        this.size12Entry.setValue(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 6:
                        this.frac12Entry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 7:
                        this.size13Entry.setValue(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 8:
                        this.frac13Entry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 9:
                        this.size14Entry.setValue(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 10:
                        this.frac14Entry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 11:
                        this.size15Entry.setValue(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 12:
                        this.frac15Entry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 13:
                        this.size16Entry.setValue(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    case 14:
                        this.frac16Entry.setText(/* valueOf */new String(this.getDoubleValue(st)).toString());
                        break;
                    }
                };
                fr.close();
            } catch(e) {
                console.info("Could not read " + file.getName());
            };
            this.updatePartSizeDistFromInput();
            this.d_parent.refreshDisplayPartDistFrame();
        }

        getDoubleValue(tokenizer : StreamTokenizer) : number {
            try {
                var numb : number = tokenizer.nval;
                var next_token : number = tokenizer.nextToken();
                if(next_token === StreamTokenizer.TT_WORD) {
                    var nextLetter : string = tokenizer.sval.charAt(0);
                    if((nextLetter === 'e') || (nextLetter === 'E')) {
                        var exp : string = tokenizer.sval.substring(1);
                        numb *= Math.pow(10.0, javaemul.internal.DoubleHelper.parseDouble(exp));
                        return numb;
                    } else {
                        tokenizer.pushBack();
                        return numb;
                    }
                } else {
                    tokenizer.pushBack();
                    return numb;
                }
            } catch(e) {
                console.info("IO Exception reading input particle size distribution file.");
            };
            return 0.0;
        }

        updatePartSizeDistFromInput() {
            var matName : string = this.matNameEntry.getText();
            var volFracOfParticles : number = this.volFracEntry.getValue();
            this.d_partSizeDist.compositeName = matName;
            this.d_partSizeDist.volFracInComposite = volFracOfParticles;
            var nofSizes : number = 0;
            try {
                var size : number = this.size11Entry.getValue();
                var volFrac : number = this.frac11Entry.getValue();
                if(size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac;
                    ++nofSizes;
                }
                size = this.size12Entry.getValue();
                volFrac = this.frac12Entry.getValue();
                if(size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac11Entry.getValue();
                    ++nofSizes;
                }
                size = this.size13Entry.getValue();
                volFrac = this.frac13Entry.getValue();
                if(size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac12Entry.getValue();
                    ++nofSizes;
                }
                size = this.size14Entry.getValue();
                volFrac = this.frac14Entry.getValue();
                if(size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac13Entry.getValue();
                    ++nofSizes;
                }
                size = this.size15Entry.getValue();
                volFrac = this.frac15Entry.getValue();
                if(size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac14Entry.getValue();
                    ++nofSizes;
                }
                size = this.size16Entry.getValue();
                volFrac = this.frac16Entry.getValue();
                if(size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac15Entry.getValue();
                    ++nofSizes;
                }
                this.d_partSizeDist.nofSizesInp = nofSizes;
            } catch(e) {
                console.info("Error reading size/vol % data from entry");
            };
        }

        saveToFile() {
            this.updatePartSizeDistFromInput();
            var file : File = null;
            var fc : JFileChooser = new JFileChooser(new File(".."));
            var returnVal : number = fc.showSaveDialog(this);
            if(returnVal === JFileChooser.APPROVE_OPTION) {
                file = fc.getSelectedFile();
            }
            if(file == null) return;
            try {
                var fw : FileWriter = new FileWriter(file);
                var pw : PrintWriter = new PrintWriter(fw);
                pw.println("# Particle Size Distribution Data");
                pw.println("# Material Name");
                pw.println("\"" + this.matNameEntry.getText() + "\"");
                pw.println("# Volume Fraction of Particles in Composite");
                pw.println(this.volFracEntry.getText());
                pw.println("# Size Distribution");
                pw.println("# Size (<= )   % (volume)");
                pw.println(this.size11Entry.getText() + " " + this.frac11Entry.getText());
                pw.println(this.size12Entry.getText() + " " + this.frac12Entry.getText());
                pw.println(this.size13Entry.getText() + " " + this.frac13Entry.getText());
                pw.println(this.size14Entry.getText() + " " + this.frac14Entry.getText());
                pw.println(this.size15Entry.getText() + " " + this.frac15Entry.getText());
                pw.println(this.size16Entry.getText() + " " + this.frac16Entry.getText());
                pw.close();
                fw.close();
            } catch(e) {
                console.info("Could not write " + file.getName());
            };
            this.d_parent.refreshDisplayPartDistFrame();
        }

        calcParticleDist() {
            var NUM_SIZES_MAX : number = 11;
            var LARGE_INT : number = 100000;
            var nofSizesInp : number = this.d_partSizeDist.nofSizesInp;
            if(nofSizesInp === 0) return;
            var sizeInp : number[] = new Array(nofSizesInp);
            var volFracInp : number[] = new Array(nofSizesInp);
            for(var ii : number = 0; ii < nofSizesInp; ii++) {
                sizeInp[ii] = this.d_partSizeDist.sizeInp[ii];
                volFracInp[ii] = this.d_partSizeDist.volFracInp[ii];
            }
            if(nofSizesInp === 1) {
                console.info("Composite");
                console.info("Size .. Number ");
                var totBalls : number = LARGE_INT;
                this.d_partSizeDist.nofSizesCalc = 1;
                this.d_partSizeDist.sizeCalc[0] = this.d_partSizeDist.sizeInp[0];
                this.d_partSizeDist.freq2DCalc[0] = totBalls;
                this.d_partSizeDist.freq3DCalc[0] = totBalls;
                console.info(sizeInp[0] + "    " + totBalls);
                console.info(" Total   " + totBalls);
                return;
            }
            var meanSizeCalc : number[] = new Array(NUM_SIZES_MAX);
            var meanVolFracCalc : number[] = new Array(NUM_SIZES_MAX);
            if(nofSizesInp > 0) {
                var minSize : number = sizeInp[0];
                var maxSize : number = sizeInp[nofSizesInp - 1];
                var sizeIncr : number = (maxSize - minSize) / (NUM_SIZES_MAX - 1);
                var sizeCalc : number[] = new Array(NUM_SIZES_MAX);
                if(volFracInp[0] > 0.0) {
                    sizeCalc[0] = 0.5 * minSize;
                } else {
                    sizeCalc[0] = minSize;
                }
                for(var ii : number = 1; ii < NUM_SIZES_MAX; ++ii) {
                    sizeCalc[ii] = minSize + ii * sizeIncr;
                }
                for(var ii : number = 0; ii < NUM_SIZES_MAX - 1; ++ii) {
                    var size_start : number = sizeCalc[ii];
                    var size_end : number = sizeCalc[ii + 1];
                    meanSizeCalc[ii] = 0.5 * (size_start + size_end);
                    var intp : number = 0.0;
                    for(var jj : number = 0; jj < nofSizesInp; ++jj) {
                        size_start = 0.0;
                        if(jj > 0) size_start = sizeInp[jj - 1];
                        size_end = sizeInp[jj];
                        var tt : number = (meanSizeCalc[ii] - size_start) / (size_end - size_start);
                        if(tt >= 0.0 && tt <= 1.0) {
                            if(jj > 0) {
                                intp = (1.0 - tt) * volFracInp[jj - 1] + tt * volFracInp[jj];
                            } else {
                                intp = tt * volFracInp[jj];
                            }
                            break;
                        }
                    }
                    meanVolFracCalc[ii] = intp / 100.0;
                }
            }
            var totalVol : number = 1000.0 * Math.pow(sizeInp[nofSizesInp - 1], 3);
            var nofSizesCalc : number = 0;
            var nofBalls2D : number[] = new Array(NUM_SIZES_MAX);
            var nofBalls3D : number[] = new Array(NUM_SIZES_MAX);
            var ballDia : number[] = new Array(NUM_SIZES_MAX);
            if(nofSizesInp > 0) {
                for(var ii : number = 0; ii < NUM_SIZES_MAX - 1; ++ii) {
                    nofBalls2D[nofSizesCalc] = (<number>Math.ceil(meanVolFracCalc[ii] * totalVol / Math.pow(meanSizeCalc[ii], 2))|0);
                    nofBalls3D[nofSizesCalc] = (<number>Math.ceil(meanVolFracCalc[ii] * totalVol / Math.pow(meanSizeCalc[ii], 3))|0);
                    ballDia[nofSizesCalc] = meanSizeCalc[ii];
                    ++nofSizesCalc;
                }
                this.d_partSizeDist.nofSizesCalc = nofSizesCalc;
            }
            var vol2D : number[] = new Array(nofSizesCalc);
            var vol3D : number[] = new Array(nofSizesCalc);
            var n2D : number;
            var n3D : number;
            var dia : number;
            var totVol2D : number = 0.0;
            var totVol3D : number = 0.0;
            for(var ii : number = 0; ii < nofSizesCalc; ++ii) {
                n2D = nofBalls2D[ii];
                n3D = nofBalls3D[ii];
                dia = ballDia[ii];
                vol2D[ii] = dia * dia * n2D;
                vol3D[ii] = dia * dia * dia * n3D;
                totVol2D += vol2D[ii];
                totVol3D += vol3D[ii];
            }
            var df : DecimalFormat = new DecimalFormat("##0.0##E0");
            console.info("Composite");
            console.info("Size ... Number (2D) .. Vol.Frac (2D)... Number (3D) .. Vol.Frac (3D)");
            var totBalls2D : number = 0;
            var totBalls3D : number = 0;
            for(var ii : number = 0; ii < nofSizesCalc; ii++) {
                this.d_partSizeDist.sizeCalc[ii] = ballDia[ii];
                this.d_partSizeDist.freq2DCalc[ii] = nofBalls2D[ii];
                this.d_partSizeDist.freq3DCalc[ii] = nofBalls3D[ii];
                this.d_partSizeDist.volFrac2DCalc[ii] = 100.0 * vol2D[ii] / totVol2D;
                this.d_partSizeDist.volFrac3DCalc[ii] = 100.0 * vol3D[ii] / totVol3D;
                totBalls2D += nofBalls2D[ii];
                totBalls3D += nofBalls3D[ii];
                console.info(df.format(ballDia[ii]) + "    " + nofBalls2D[ii] + "     " + df.format(this.d_partSizeDist.volFrac2DCalc[ii]) + "      " + nofBalls3D[ii] + "     " + df.format(this.d_partSizeDist.volFrac3DCalc[ii]));
            }
            console.info(" Total:  2D = " + totBalls2D + " 3D = " + totBalls3D);
            this.d_parent.refreshDisplayPartDistFrame();
        }

        public getParticleSizeDist() : ParticleSize {
            return this.d_partSizeDist;
        }
    }

    export namespace InputPartDistPanel {

        export class TextFieldListener implements DocumentListener {
            public __parent: any;
            public insertUpdate(e : DocumentEvent) {
                this.__parent.updatePartSizeDistFromInput();
            }

            public removeUpdate(e : DocumentEvent) {
                this.__parent.updatePartSizeDistFromInput();
            }

            public changedUpdate(e : DocumentEvent) {
                this.__parent.updatePartSizeDistFromInput();
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.event.DocumentListener"] });
                this.__parent = __parent;
            }
        }

        export class ButtonListener implements ActionListener {
            public __parent: any;
            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "read") {
                    this.__parent.readFromFile();
                } else if(e.getActionCommand() === "save") {
                    if(!this.__parent.alreadyCalculated) this.__parent.calcParticleDist();
                    this.__parent.saveToFile();
                } else if(e.getActionCommand() === "calc") {
                    this.__parent.calcParticleDist();
                    this.__parent.alreadyCalculated = true;
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
        }
    }

}

