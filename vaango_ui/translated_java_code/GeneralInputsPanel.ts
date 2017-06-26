"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class GeneralInputsPanel extends JPanel {
        /**
         * 
         */
        private static serialVersionUID : number = -4491787296780758593;

        private d_simComponent : string = null;

        private d_parent : UintahInputPanel = null;

        private constInputPanel : GeneralInputsPanel.PhysicalConstInputPanel = null;

        private timeInputPanel : TimeInputPanel = null;

        private saveInputPanel : VariableSaveInputPanel = null;

        private saveButton : JButton = null;

        public constructor(simComponent : string, parent : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_simComponent = simComponent;
            this.d_parent = parent;
            this.timeInputPanel = new TimeInputPanel(this.d_simComponent, this);
            this.saveInputPanel = new VariableSaveInputPanel();
            this.constInputPanel = new GeneralInputsPanel.PhysicalConstInputPanel(this);
            this.saveButton = new JButton("Save");
            this.saveButton.setActionCommand("save");
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.timeInputPanel, gbc);
            this.add(this.timeInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(this.constInputPanel, gbc);
            this.add(this.constInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(this.saveButton, gbc);
            this.add(this.saveButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 3, 5);
            gb.setConstraints(this.saveInputPanel, gbc);
            this.add(this.saveInputPanel);
            var buttonListener : GeneralInputsPanel.ButtonListener = new GeneralInputsPanel.ButtonListener(this);
            this.saveButton.addActionListener(buttonListener);
        }

        public updateTabs(simComponent : string) {
            this.d_simComponent = simComponent;
            this.d_parent.enableTabs(simComponent);
        }

        public refresh() {
            this.constInputPanel.refresh();
            this.timeInputPanel.refresh();
            this.saveInputPanel.refresh();
        }

        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            this.timeInputPanel.writeUintah(pw, tab);
            this.saveInputPanel.writeUintah(pw, tab);
            this.constInputPanel.writeUintah(pw, tab);
        }
    }

    export namespace GeneralInputsPanel {

        export class ButtonListener implements ActionListener {
            public __parent: any;
            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "save") {
                    var outputFile : File = new File("test.ups");
                    try {
                        var fw : FileWriter = new FileWriter(outputFile);
                        var pw : PrintWriter = new PrintWriter(fw);
                        this.__parent.timeInputPanel.writeUintah(pw, "  ");
                        this.__parent.saveInputPanel.writeUintah(pw, "  ");
                        pw.close();
                        fw.close();
                    } catch(event) {
                        console.info("Could not write GeneralInputsPanel to file " + outputFile.getName());
                    };
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
        }

        export class PhysicalConstInputPanel extends JPanel {
            public __parent: any;
            /**
             * 
             */
            static serialVersionUID : number;

            presEntry : DecimalField;

            gravEntry : DecimalVectorField;

            public constructor(__parent: any) {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
                this.__parent = __parent;
                this.serialVersionUID = -3494113212481409042;
                this.presEntry = null;
                this.gravEntry = null;
                var gb : GridBagLayout = new GridBagLayout();
                var gbc : GridBagConstraints = new GridBagConstraints();
                this.setLayout(gb);
                var fill : number = GridBagConstraints.BOTH;
                var xgap : number = 5;
                var ygap : number = 0;
                var presLabel : JLabel = new JLabel("Ref. Pressure");
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
                gb.setConstraints(presLabel, gbc);
                this.add(presLabel);
                this.presEntry = new DecimalField(101325.0, 9);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
                gb.setConstraints(this.presEntry, gbc);
                this.add(this.presEntry);
                var gravLabel : JLabel = new JLabel("Gravity:");
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 1);
                gb.setConstraints(gravLabel, gbc);
                this.add(gravLabel);
                this.gravEntry = new DecimalVectorField(0.0, 0.0, 0.0, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
                gb.setConstraints(this.gravEntry, gbc);
                this.add(this.gravEntry);
            }

            public refresh() {
            }

            public writeUintah(pw : PrintWriter, tab : string) {
                if(pw == null) return;
                try {
                    var tab1 : string = <string>new String(tab + "  ");
                    pw.println(tab + "<PhysicalConstants>");
                    pw.println(tab1 + "<reference_pressure> " + this.presEntry.getValue() + " </reference_pressure>");
                    pw.println(tab1 + "<gravity> [" + this.gravEntry.x() + ", " + this.gravEntry.y() + ", " + this.gravEntry.z() + "] </gravity>");
                    pw.println(tab + "</PhysicalConstants>");
                    pw.println(tab);
                } catch(e) {
                    console.info("Could not write PhysicalConstInputPanel.");
                };
            }
        }
    }

}

