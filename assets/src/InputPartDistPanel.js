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
    var InputPartDistPanel = (function (_super) {
        __extends(InputPartDistPanel, _super);
        function InputPartDistPanel(partSizeDist, parent) {
            var _this = _super.call(this) || this;
            _this.d_partSizeDist = null;
            _this.d_parent = null;
            _this.alreadyCalculated = false;
            _this.readButton = null;
            _this.calcButton = null;
            _this.saveButton = null;
            _this.matNameEntry = null;
            _this.volFracEntry = null;
            _this.size11Entry = null;
            _this.frac11Entry = null;
            _this.size12Entry = null;
            _this.frac12Entry = null;
            _this.size13Entry = null;
            _this.frac13Entry = null;
            _this.size14Entry = null;
            _this.frac14Entry = null;
            _this.size15Entry = null;
            _this.frac15Entry = null;
            _this.size16Entry = null;
            _this.frac16Entry = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_partSizeDist = partSizeDist;
            _this.d_parent = parent;
            _this.alreadyCalculated = false;
            var panel1 = new JPanel(new GridLayout(1, 0));
            var panel2 = new JPanel(new GridLayout(4, 0));
            var panel4 = new JPanel(new GridLayout(8, 0));
            var panel6 = new JPanel(new GridLayout(1, 0));
            _this.readButton = new JButton("Read from File");
            _this.readButton.setActionCommand("read");
            panel1.add(_this.readButton);
            var label21 = new JLabel("Composite Material Name");
            var label23 = new JLabel("Vol. Frac. of Particles in Composite (%)");
            _this.matNameEntry = new JTextField(_this.d_partSizeDist.compositeName, 20);
            _this.volFracEntry = new vaango_ui.DecimalField(100.0, 5);
            panel2.add(label21);
            panel2.add(_this.matNameEntry);
            panel2.add(label23);
            panel2.add(_this.volFracEntry);
            var label41 = new JLabel("Size Distribution");
            var label42 = new JLabel("of Particles");
            var label43 = new JLabel("Size <=");
            var label44 = new JLabel("Fraction (volume %)");
            _this.size11Entry = new vaango_ui.DecimalField(_this.d_partSizeDist.sizeInp[0], 4, true);
            _this.frac11Entry = new vaango_ui.DecimalField(_this.d_partSizeDist.volFracInp[0], 5);
            _this.size12Entry = new vaango_ui.DecimalField(_this.d_partSizeDist.sizeInp[1], 4, true);
            _this.frac12Entry = new vaango_ui.DecimalField(_this.d_partSizeDist.volFracInp[0] + _this.d_partSizeDist.volFracInp[1], 5);
            _this.size13Entry = new vaango_ui.DecimalField(0.0, 4, true);
            _this.frac13Entry = new vaango_ui.DecimalField(0.0, 5);
            _this.size14Entry = new vaango_ui.DecimalField(0.0, 4, true);
            _this.frac14Entry = new vaango_ui.DecimalField(0.0, 5);
            _this.size15Entry = new vaango_ui.DecimalField(0.0, 4, true);
            _this.frac15Entry = new vaango_ui.DecimalField(0.0, 5);
            _this.size16Entry = new vaango_ui.DecimalField(0.0, 4, true);
            _this.frac16Entry = new vaango_ui.DecimalField(0.0, 5);
            panel4.add(label41);
            panel4.add(label42);
            panel4.add(label43);
            panel4.add(label44);
            panel4.add(_this.size11Entry);
            panel4.add(_this.frac11Entry);
            panel4.add(_this.size12Entry);
            panel4.add(_this.frac12Entry);
            panel4.add(_this.size13Entry);
            panel4.add(_this.frac13Entry);
            panel4.add(_this.size14Entry);
            panel4.add(_this.frac14Entry);
            panel4.add(_this.size15Entry);
            panel4.add(_this.frac15Entry);
            panel4.add(_this.size16Entry);
            panel4.add(_this.frac16Entry);
            _this.calcButton = new JButton("Calculate Particle Distribution");
            _this.calcButton.setActionCommand("calc");
            _this.saveButton = new JButton("Save to File");
            _this.saveButton.setActionCommand("save");
            panel6.add(_this.calcButton);
            panel6.add(_this.saveButton);
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(panel1, gbc);
            _this.add(panel1);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(panel2, gbc);
            _this.add(panel2);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(panel4, gbc);
            _this.add(panel4);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 4, 1, 1, 5);
            gb.setConstraints(panel6, gbc);
            _this.add(panel6);
            var textFieldListener = new InputPartDistPanel.TextFieldListener(_this);
            _this.matNameEntry.getDocument().addDocumentListener(textFieldListener);
            _this.volFracEntry.getDocument().addDocumentListener(textFieldListener);
            _this.size11Entry.getDocument().addDocumentListener(textFieldListener);
            _this.frac11Entry.getDocument().addDocumentListener(textFieldListener);
            _this.size12Entry.getDocument().addDocumentListener(textFieldListener);
            _this.frac12Entry.getDocument().addDocumentListener(textFieldListener);
            _this.size13Entry.getDocument().addDocumentListener(textFieldListener);
            _this.frac13Entry.getDocument().addDocumentListener(textFieldListener);
            _this.size14Entry.getDocument().addDocumentListener(textFieldListener);
            _this.frac14Entry.getDocument().addDocumentListener(textFieldListener);
            _this.size15Entry.getDocument().addDocumentListener(textFieldListener);
            _this.frac15Entry.getDocument().addDocumentListener(textFieldListener);
            _this.size16Entry.getDocument().addDocumentListener(textFieldListener);
            _this.frac16Entry.getDocument().addDocumentListener(textFieldListener);
            var buttonListener = new InputPartDistPanel.ButtonListener(_this);
            _this.readButton.addActionListener(buttonListener);
            _this.calcButton.addActionListener(buttonListener);
            _this.saveButton.addActionListener(buttonListener);
            return _this;
        }
        InputPartDistPanel.prototype.readFromFile = function () {
            var file = null;
            var fc = new JFileChooser(new File(".."));
            var returnVal = fc.showOpenDialog(this);
            if (returnVal === JFileChooser.APPROVE_OPTION) {
                file = fc.getSelectedFile();
            }
            if (file == null)
                return;
            try {
                var fr = new FileReader(file);
                var st = new StreamTokenizer(fr);
                st.commentChar('#');
                st.quoteChar('\"');
                var count = 0;
                while ((st.nextToken() !== StreamTokenizer.TT_EOF)) {
                    count++;
                    switch ((count)) {
                        case 1:
                            this.matNameEntry.setText(st.sval);
                            break;
                        case 2:
                            this.volFracEntry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 3:
                            this.size11Entry.setValue(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 4:
                            this.frac11Entry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 5:
                            this.size12Entry.setValue(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 6:
                            this.frac12Entry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 7:
                            this.size13Entry.setValue(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 8:
                            this.frac13Entry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 9:
                            this.size14Entry.setValue(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 10:
                            this.frac14Entry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 11:
                            this.size15Entry.setValue(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 12:
                            this.frac15Entry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 13:
                            this.size16Entry.setValue(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                        case 14:
                            this.frac16Entry.setText(/* valueOf */ new String(this.getDoubleValue(st)).toString());
                            break;
                    }
                }
                ;
                fr.close();
            }
            catch (e) {
                console.info("Could not read " + file.getName());
            }
            ;
            this.updatePartSizeDistFromInput();
            this.d_parent.refreshDisplayPartDistFrame();
        };
        InputPartDistPanel.prototype.getDoubleValue = function (tokenizer) {
            try {
                var numb = tokenizer.nval;
                var next_token = tokenizer.nextToken();
                if (next_token === StreamTokenizer.TT_WORD) {
                    var nextLetter = tokenizer.sval.charAt(0);
                    if ((nextLetter === 'e') || (nextLetter === 'E')) {
                        var exp = tokenizer.sval.substring(1);
                        numb *= Math.pow(10.0, javaemul.internal.DoubleHelper.parseDouble(exp));
                        return numb;
                    }
                    else {
                        tokenizer.pushBack();
                        return numb;
                    }
                }
                else {
                    tokenizer.pushBack();
                    return numb;
                }
            }
            catch (e) {
                console.info("IO Exception reading input particle size distribution file.");
            }
            ;
            return 0.0;
        };
        InputPartDistPanel.prototype.updatePartSizeDistFromInput = function () {
            var matName = this.matNameEntry.getText();
            var volFracOfParticles = this.volFracEntry.getValue();
            this.d_partSizeDist.compositeName = matName;
            this.d_partSizeDist.volFracInComposite = volFracOfParticles;
            var nofSizes = 0;
            try {
                var size = this.size11Entry.getValue();
                var volFrac = this.frac11Entry.getValue();
                if (size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac;
                    ++nofSizes;
                }
                size = this.size12Entry.getValue();
                volFrac = this.frac12Entry.getValue();
                if (size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac11Entry.getValue();
                    ++nofSizes;
                }
                size = this.size13Entry.getValue();
                volFrac = this.frac13Entry.getValue();
                if (size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac12Entry.getValue();
                    ++nofSizes;
                }
                size = this.size14Entry.getValue();
                volFrac = this.frac14Entry.getValue();
                if (size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac13Entry.getValue();
                    ++nofSizes;
                }
                size = this.size15Entry.getValue();
                volFrac = this.frac15Entry.getValue();
                if (size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac14Entry.getValue();
                    ++nofSizes;
                }
                size = this.size16Entry.getValue();
                volFrac = this.frac16Entry.getValue();
                if (size !== 0) {
                    this.d_partSizeDist.sizeInp[nofSizes] = size;
                    this.d_partSizeDist.volFracInp[nofSizes] = volFrac - this.frac15Entry.getValue();
                    ++nofSizes;
                }
                this.d_partSizeDist.nofSizesInp = nofSizes;
            }
            catch (e) {
                console.info("Error reading size/vol % data from entry");
            }
            ;
        };
        InputPartDistPanel.prototype.saveToFile = function () {
            this.updatePartSizeDistFromInput();
            var file = null;
            var fc = new JFileChooser(new File(".."));
            var returnVal = fc.showSaveDialog(this);
            if (returnVal === JFileChooser.APPROVE_OPTION) {
                file = fc.getSelectedFile();
            }
            if (file == null)
                return;
            try {
                var fw = new FileWriter(file);
                var pw = new PrintWriter(fw);
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
            }
            catch (e) {
                console.info("Could not write " + file.getName());
            }
            ;
            this.d_parent.refreshDisplayPartDistFrame();
        };
        InputPartDistPanel.prototype.calcParticleDist = function () {
            var NUM_SIZES_MAX = 11;
            var LARGE_INT = 100000;
            var nofSizesInp = this.d_partSizeDist.nofSizesInp;
            if (nofSizesInp === 0)
                return;
            var sizeInp = new Array(nofSizesInp);
            var volFracInp = new Array(nofSizesInp);
            for (var ii = 0; ii < nofSizesInp; ii++) {
                sizeInp[ii] = this.d_partSizeDist.sizeInp[ii];
                volFracInp[ii] = this.d_partSizeDist.volFracInp[ii];
            }
            if (nofSizesInp === 1) {
                console.info("Composite");
                console.info("Size .. Number ");
                var totBalls = LARGE_INT;
                this.d_partSizeDist.nofSizesCalc = 1;
                this.d_partSizeDist.sizeCalc[0] = this.d_partSizeDist.sizeInp[0];
                this.d_partSizeDist.freq2DCalc[0] = totBalls;
                this.d_partSizeDist.freq3DCalc[0] = totBalls;
                console.info(sizeInp[0] + "    " + totBalls);
                console.info(" Total   " + totBalls);
                return;
            }
            var meanSizeCalc = new Array(NUM_SIZES_MAX);
            var meanVolFracCalc = new Array(NUM_SIZES_MAX);
            if (nofSizesInp > 0) {
                var minSize = sizeInp[0];
                var maxSize = sizeInp[nofSizesInp - 1];
                var sizeIncr = (maxSize - minSize) / (NUM_SIZES_MAX - 1);
                var sizeCalc = new Array(NUM_SIZES_MAX);
                if (volFracInp[0] > 0.0) {
                    sizeCalc[0] = 0.5 * minSize;
                }
                else {
                    sizeCalc[0] = minSize;
                }
                for (var ii = 1; ii < NUM_SIZES_MAX; ++ii) {
                    sizeCalc[ii] = minSize + ii * sizeIncr;
                }
                for (var ii = 0; ii < NUM_SIZES_MAX - 1; ++ii) {
                    var size_start = sizeCalc[ii];
                    var size_end = sizeCalc[ii + 1];
                    meanSizeCalc[ii] = 0.5 * (size_start + size_end);
                    var intp = 0.0;
                    for (var jj = 0; jj < nofSizesInp; ++jj) {
                        size_start = 0.0;
                        if (jj > 0)
                            size_start = sizeInp[jj - 1];
                        size_end = sizeInp[jj];
                        var tt = (meanSizeCalc[ii] - size_start) / (size_end - size_start);
                        if (tt >= 0.0 && tt <= 1.0) {
                            if (jj > 0) {
                                intp = (1.0 - tt) * volFracInp[jj - 1] + tt * volFracInp[jj];
                            }
                            else {
                                intp = tt * volFracInp[jj];
                            }
                            break;
                        }
                    }
                    meanVolFracCalc[ii] = intp / 100.0;
                }
            }
            var totalVol = 1000.0 * Math.pow(sizeInp[nofSizesInp - 1], 3);
            var nofSizesCalc = 0;
            var nofBalls2D = new Array(NUM_SIZES_MAX);
            var nofBalls3D = new Array(NUM_SIZES_MAX);
            var ballDia = new Array(NUM_SIZES_MAX);
            if (nofSizesInp > 0) {
                for (var ii = 0; ii < NUM_SIZES_MAX - 1; ++ii) {
                    nofBalls2D[nofSizesCalc] = (Math.ceil(meanVolFracCalc[ii] * totalVol / Math.pow(meanSizeCalc[ii], 2)) | 0);
                    nofBalls3D[nofSizesCalc] = (Math.ceil(meanVolFracCalc[ii] * totalVol / Math.pow(meanSizeCalc[ii], 3)) | 0);
                    ballDia[nofSizesCalc] = meanSizeCalc[ii];
                    ++nofSizesCalc;
                }
                this.d_partSizeDist.nofSizesCalc = nofSizesCalc;
            }
            var vol2D = new Array(nofSizesCalc);
            var vol3D = new Array(nofSizesCalc);
            var n2D;
            var n3D;
            var dia;
            var totVol2D = 0.0;
            var totVol3D = 0.0;
            for (var ii = 0; ii < nofSizesCalc; ++ii) {
                n2D = nofBalls2D[ii];
                n3D = nofBalls3D[ii];
                dia = ballDia[ii];
                vol2D[ii] = dia * dia * n2D;
                vol3D[ii] = dia * dia * dia * n3D;
                totVol2D += vol2D[ii];
                totVol3D += vol3D[ii];
            }
            var df = new DecimalFormat("##0.0##E0");
            console.info("Composite");
            console.info("Size ... Number (2D) .. Vol.Frac (2D)... Number (3D) .. Vol.Frac (3D)");
            var totBalls2D = 0;
            var totBalls3D = 0;
            for (var ii = 0; ii < nofSizesCalc; ii++) {
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
        };
        InputPartDistPanel.prototype.getParticleSizeDist = function () {
            return this.d_partSizeDist;
        };
        return InputPartDistPanel;
    }(JPanel));
    /**
     *
     */
    InputPartDistPanel.serialVersionUID = -2753326228947983618;
    vaango_ui.InputPartDistPanel = InputPartDistPanel;
    (function (InputPartDistPanel) {
        var TextFieldListener = (function () {
            function TextFieldListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.event.DocumentListener"] });
                this.__parent = __parent;
            }
            TextFieldListener.prototype.insertUpdate = function (e) {
                this.__parent.updatePartSizeDistFromInput();
            };
            TextFieldListener.prototype.removeUpdate = function (e) {
                this.__parent.updatePartSizeDistFromInput();
            };
            TextFieldListener.prototype.changedUpdate = function (e) {
                this.__parent.updatePartSizeDistFromInput();
            };
            return TextFieldListener;
        }());
        InputPartDistPanel.TextFieldListener = TextFieldListener;
        var ButtonListener = (function () {
            function ButtonListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
            ButtonListener.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "read") {
                    this.__parent.readFromFile();
                }
                else if (e.getActionCommand() === "save") {
                    if (!this.__parent.alreadyCalculated)
                        this.__parent.calcParticleDist();
                    this.__parent.saveToFile();
                }
                else if (e.getActionCommand() === "calc") {
                    this.__parent.calcParticleDist();
                    this.__parent.alreadyCalculated = true;
                }
            };
            return ButtonListener;
        }());
        InputPartDistPanel.ButtonListener = ButtonListener;
    })(InputPartDistPanel = vaango_ui.InputPartDistPanel || (vaango_ui.InputPartDistPanel = {}));
})(vaango_ui || (vaango_ui = {}));
