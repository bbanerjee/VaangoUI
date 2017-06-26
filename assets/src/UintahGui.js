"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
var vaango_ui;
(function (vaango_ui) {
    var ParticleList = vaango_ui.ParticleList;
    class UintahGui {
        constructor(inAnApplet = true) {
            super();
            this.d_partList = null;
            this.uintahInputPanel = null;
            this.particleGenPanel = null;
            this.mainTabbedPane = null;
            this.helpAboutFrame = null;
            this.oldFile = null;
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            if (inAnApplet) {
                this.getRootPane().putClientProperty("defeatSystemEventQueueCheck", javaemul.internal.BooleanHelper.TRUE);
                this.getRootPane().setLocation(20, 50);
            }
            this.d_partList = new ParticleList();
        }
        static main(args) {
            UintahGui.mainFrame = new JFrame("Uintah User Interface");
            UintahGui.mainFrame.addWindowListener(new UintahGui.UintahGui$0());
            var uintahGui = new UintahGui();
            uintahGui.init();
            UintahGui.mainFrame.setLocation(20, 50);
            UintahGui.mainFrame.setContentPane(uintahGui);
            UintahGui.mainFrame.pack();
            UintahGui.mainFrame.setVisible(true);
        }
        init() {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            }
            catch (e) {
                return;
            }
            ;
            var menuListener = new UintahGui.MenuListener(this);
            var menuBar = new JMenuBar();
            this.setJMenuBar(menuBar);
            var fileMenu = new JMenu("File");
            menuBar.add(fileMenu);
            var menuItem;
            menuItem = new JMenuItem("Read Particle Location Data");
            fileMenu.add(menuItem);
            menuItem.addActionListener(menuListener);
            menuItem = new JMenuItem("Save Uintah Input File");
            fileMenu.add(menuItem);
            menuItem.addActionListener(menuListener);
            menuItem = new JMenuItem("Exit");
            fileMenu.add(menuItem);
            menuItem.addActionListener(menuListener);
            this.mainTabbedPane = new JTabbedPane();
            this.uintahInputPanel = new vaango_ui.UintahInputPanel(this.d_partList, this);
            this.particleGenPanel = new vaango_ui.ParticleGeneratePanel(this.d_partList, this);
            this.mainTabbedPane.addTab("Uintah Inputs", null, this.uintahInputPanel, null);
            this.mainTabbedPane.addTab("Generate Particle Locations", null, this.particleGenPanel, null);
            this.mainTabbedPane.setSelectedIndex(0);
            this.getContentPane().add(this.mainTabbedPane);
            var helpMenu = new JMenu("Help");
            menuBar.add(helpMenu);
            menuItem = new JMenuItem("About");
            helpMenu.add(menuItem);
            menuItem.addActionListener(menuListener);
            this.helpAboutFrame = new vaango_ui.HelpAboutFrame();
            this.helpAboutFrame.pack();
            var tabListener = new UintahGui.TabListener(this);
            this.mainTabbedPane.addChangeListener(tabListener);
        }
        updatePanels() {
            UintahGui.mainFrame.pack();
        }
        getFileName(option) {
            var fc = new JFileChooser(new File(".."));
            if (this.oldFile != null)
                fc.setSelectedFile(this.oldFile);
            var returnVal = 0;
            if (option === UintahGui.OPEN) {
                returnVal = fc.showOpenDialog(this);
            }
            else {
                returnVal = fc.showSaveDialog(this);
            }
            if (returnVal === JFileChooser.APPROVE_OPTION) {
                var file = fc.getSelectedFile();
                this.oldFile = file;
                return file;
            }
            else
                return null;
        }
        writeUintah(outputFile) {
            try {
                var fw = new FileWriter(outputFile);
                var pw = new PrintWriter(fw);
                this.uintahInputPanel.writeUintah(pw);
                pw.close();
                fw.close();
            }
            catch (event) {
                console.info("Could not write to file " + outputFile.getName());
            }
            ;
        }
        static setConstraints(c, fill, wx, wy, gx, gy, gw, gh, ins) {
            if (((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && ((typeof wy === 'number') || wy === null) && ((typeof gx === 'number') || gx === null) && ((typeof gy === 'number') || gy === null) && ((typeof gw === 'number') || gw === null) && ((typeof gh === 'number') || gh === null) && ((typeof ins === 'number') || ins === null)) {
                return (() => {
                    c.fill = fill;
                    c.weightx = wx;
                    c.weighty = wy;
                    c.gridx = gx;
                    c.gridy = gy;
                    c.gridwidth = gw;
                    c.gridheight = gh;
                    var insets = new Insets(ins, ins, ins, ins);
                    c.insets = insets;
                })();
            }
            else if (((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && ((typeof wy === 'number') || wy === null) && ((typeof gx === 'number') || gx === null) && ((typeof gy === 'number') || gy === null) && gw === undefined && gh === undefined && ins === undefined) {
                return vaango_ui.UintahGui.setConstraints$java_awt_GridBagConstraints$int$int$int$int$int(c, fill, wx, wy, gx, gy);
            }
            else if (((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && ((typeof wy === 'number') || wy === null) && gx === undefined && gy === undefined && gw === undefined && gh === undefined && ins === undefined) {
                return vaango_ui.UintahGui.setConstraints$java_awt_GridBagConstraints$int$int$int(c, fill, wx, wy);
            }
            else if (((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && wy === undefined && gx === undefined && gy === undefined && gw === undefined && gh === undefined && ins === undefined) {
                return vaango_ui.UintahGui.setConstraints$java_awt_GridBagConstraints$int$int(c, fill, wx);
            }
            else
                throw new Error('invalid overload');
        }
        static setConstraints$java_awt_GridBagConstraints$int$int(c, col, row) {
            c.fill = GridBagConstraints.NONE;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets = new Insets(5, 5, 5, 5);
            c.insets = insets;
        }
        static setConstraints$java_awt_GridBagConstraints$int$int$int(c, fill, col, row) {
            c.fill = fill;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets = new Insets(5, 5, 5, 5);
            c.insets = insets;
        }
        static setConstraints$java_awt_GridBagConstraints$int$int$int$int$int(c, fill, xinset, yinset, col, row) {
            c.fill = fill;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets = new Insets(yinset, xinset, yinset, xinset);
            c.insets = insets;
        }
    }
    UintahGui.mainFrame = null;
    UintahGui.OPEN = 1;
    UintahGui.SAVE = 2;
    vaango_ui.UintahGui = UintahGui;
    (function (UintahGui) {
        class MenuListener {
            constructor(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
            actionPerformed(e) {
                var source = (e.getSource());
                var text = source.getText();
                if ((text === "Exit")) {
                    java.lang.System.exit(0);
                }
                else if ((text === "Read Particle Location Data")) {
                    var particleFile = null;
                    if ((particleFile = this.__parent.getFileName(UintahGui.OPEN)) != null) {
                        this.__parent.d_partList.readFromFile(particleFile);
                    }
                }
                else if ((text === "Save Uintah Input File")) {
                    var uintahFile = null;
                    if ((uintahFile = this.__parent.getFileName(UintahGui.SAVE)) != null) {
                        this.__parent.writeUintah(uintahFile);
                    }
                }
                else if ((text === "About")) {
                    this.__parent.helpAboutFrame.setVisible(true);
                }
            }
        }
        UintahGui.MenuListener = MenuListener;
        class TabListener {
            constructor(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "javax.swing.event.ChangeListener"] });
                this.__parent = __parent;
            }
            stateChanged(e) {
                var curTab = this.__parent.mainTabbedPane.getSelectedIndex();
                if (curTab === 0) {
                    this.__parent.particleGenPanel.setVisibleDisplayFrame(false);
                }
                else {
                    this.__parent.particleGenPanel.setVisibleDisplayFrame(true);
                    this.__parent.uintahInputPanel.setVisibleDisplayFrame(false);
                }
            }
        }
        UintahGui.TabListener = TabListener;
        class UintahGui$0 extends WindowAdapter {
            constructor() {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.WindowListener", "java.awt.event.WindowFocusListener", "java.awt.event.WindowStateListener"] });
            }
            windowClosing(e) {
                java.lang.System.exit(0);
            }
        }
        UintahGui.UintahGui$0 = UintahGui$0;
    })(UintahGui = vaango_ui.UintahGui || (vaango_ui.UintahGui = {}));
})(vaango_ui || (vaango_ui = {}));
vaango_ui.UintahGui.main(null);
