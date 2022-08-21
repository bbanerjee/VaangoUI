"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class MPMContactInputPanel extends JPanel implements ItemListener, ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = 8045934468645835561;

        private d_contactType : string = null;

        private d_contactDir : number[] = null;

        private d_mpmMat : Vector<string> = null;

        private d_selMat : number[] = null;

        private contactTypeComB : JComboBox<string> = null;

        private contactMatList : JList<string> = null;

        private contactMatListModel : DefaultListModel<string> = null;

        private contactMatSP : JScrollPane = null;

        private frictionLabel : JLabel = null;

        private frictionEntry : DecimalField = null;

        private contactDirLabel : JLabel = null;

        private contactDirComB : JComboBox<string> = null;

        private updateButton : JButton = null;

        public constructor(mpmMat : Vector<string>) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.event.ItemListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_contactType = <string>new String("null");
            this.d_contactDir = new Array(3);
            this.d_contactDir[0] = 0.0;
            this.d_contactDir[1] = 0.0;
            this.d_contactDir[2] = 0.0;
            this.d_mpmMat = mpmMat;
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            var contactTypeLabel : JLabel = new JLabel("Contact Type");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 0);
            gb.setConstraints(contactTypeLabel, gbc);
            this.add(contactTypeLabel);
            this.contactTypeComB = new JComboBox<string>();
            this.contactTypeComB.addItem("No Contact");
            this.contactTypeComB.addItem("Rigid Contact");
            this.contactTypeComB.addItem("Specified Velocity Contact");
            this.contactTypeComB.addItem("Single Velocity Contact");
            this.contactTypeComB.addItem("Approach Contact");
            this.contactTypeComB.addItem("Frictional Contact");
            this.contactTypeComB.addItemListener(this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 0);
            gb.setConstraints(this.contactTypeComB, gbc);
            this.add(this.contactTypeComB);
            var contactMatLabel : JLabel = new JLabel("Contact Materials");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 1);
            gb.setConstraints(contactMatLabel, gbc);
            this.add(contactMatLabel);
            this.contactMatListModel = new DefaultListModel<string>();
            for(var ii : number = 0; ii < this.d_mpmMat.size(); ++ii) {
                this.contactMatListModel.addElement(<string>this.d_mpmMat.elementAt(ii));
            }
            this.contactMatList = new JList<string>(this.contactMatListModel);
            this.contactMatList.setVisibleRowCount(5);
            this.contactMatSP = new JScrollPane(this.contactMatList);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 1);
            gb.setConstraints(this.contactMatSP, gbc);
            this.add(this.contactMatSP);
            this.frictionLabel = new JLabel("Friction Coefficient");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 2);
            gb.setConstraints(this.frictionLabel, gbc);
            this.add(this.frictionLabel);
            this.frictionLabel.setEnabled(false);
            this.frictionEntry = new DecimalField(0.0, 7);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 2);
            gb.setConstraints(this.frictionEntry, gbc);
            this.add(this.frictionEntry);
            this.frictionEntry.setEnabled(false);
            this.contactDirLabel = new JLabel("Initial Contact Direction");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 3);
            gb.setConstraints(this.contactDirLabel, gbc);
            this.add(this.contactDirLabel);
            this.contactDirLabel.setEnabled(false);
            this.contactDirComB = new JComboBox<string>();
            this.contactDirComB.addItem("X-Direction");
            this.contactDirComB.addItem("Y-Direction");
            this.contactDirComB.addItem("Z-Direction");
            this.contactDirComB.addItemListener(this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 3);
            gb.setConstraints(this.contactDirComB, gbc);
            this.add(this.contactDirComB);
            this.contactDirComB.setEnabled(false);
            this.updateButton = new JButton("Update");
            UintahGui.setConstraints(gbc, 0, 4);
            gb.setConstraints(this.updateButton, gbc);
            this.add(this.updateButton);
            this.updateButton.addActionListener(this);
        }

        public actionPerformed(e : ActionEvent) {
            this.d_selMat = this.contactMatList.getSelectedIndices();
            this.contactMatList.setSelectedIndices(this.d_selMat);
        }

        public itemStateChanged(e : ItemEvent) {
            var source : any = e.getItemSelectable();
            var item : string = /* valueOf */new String(e.getItem()).toString();
            if((source === this.contactTypeComB)) {
                this.frictionLabel.setEnabled(false);
                this.frictionEntry.setEnabled(false);
                this.contactDirLabel.setEnabled(false);
                this.contactDirComB.setEnabled(false);
                if((item === "No Contact")) {
                    this.d_contactType = "null";
                } else if((item === "Rigid Contact")) {
                    this.d_contactType = "rigid";
                    this.contactDirLabel.setEnabled(true);
                    this.contactDirComB.setEnabled(true);
                } else if((item === "Specified Velocity Contact")) {
                    this.d_contactType = "specified";
                } else if((item === "Single Velocity Contact")) {
                    this.d_contactType = "single_velocity";
                } else if((item === "Approach Contact")) {
                    this.d_contactType = "approach";
                    this.frictionLabel.setEnabled(true);
                    this.frictionEntry.setEnabled(true);
                } else if((item === "Frictional Contact")) {
                    this.d_contactType = "friction";
                    this.frictionLabel.setEnabled(true);
                    this.frictionEntry.setEnabled(true);
                }
            } else if((source === this.contactDirComB)) {
                if((item === "X-Direction")) {
                    this.d_contactDir[0] = 1.0;
                    this.d_contactDir[1] = 0.0;
                    this.d_contactDir[2] = 0.0;
                } else if((item === "Y-Direction")) {
                    this.d_contactDir[0] = 0.0;
                    this.d_contactDir[1] = 1.0;
                    this.d_contactDir[2] = 0.0;
                } else if((item === "Z-Direction")) {
                    this.d_contactDir[0] = 0.0;
                    this.d_contactDir[1] = 0.0;
                    this.d_contactDir[2] = 1.0;
                }
            }
        }

        public refresh() {
            this.contactMatListModel.removeAllElements();
            for(var ii : number = 0; ii < this.d_mpmMat.size(); ++ii) {
                this.contactMatListModel.addElement(<string>this.d_mpmMat.elementAt(ii));
            }
            if(this.d_selMat != null) {
                this.contactMatList.setSelectedIndices(this.d_selMat);
            }
            this.validate();
        }

        /**
         * Write the contents out in Uintah format
         */
        public writeUintah(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            if((this.d_contactType === "null")) return;
            var tab1 : string = <string>new String(tab + "  ");
            try {
                pw.println(tab + "<contact>");
                pw.println(tab1 + "<type> " + this.d_contactType + " </type>");
                if((this.d_contactType === "rigid")) {
                    pw.println(tab1 + "<direction> [" + this.d_contactDir[0] + ", " + this.d_contactDir[1] + ", " + this.d_contactDir[2] + "] </direction>");
                }
            } catch(e) {
                console.info("failed contact part 1");
            };
            try {
                if(this.d_selMat.length > 0) {
                    pw.print(tab1 + "<materials> [");
                    for(var ii : number = 0; ii < this.d_selMat.length; ++ii) {
                        if(ii === this.d_selMat.length - 1) {
                            pw.print(this.d_selMat[ii]);
                        } else {
                            pw.print(this.d_selMat[ii] + ",");
                        }
                    }
                }
            } catch(e) {
                console.info("failed contact part 2");
            };
            try {
                pw.println("] </materials>");
                if((this.d_contactType === "friction") || (this.d_contactType === "approach")) {
                    pw.println(tab1 + "<mu> " + this.frictionEntry.getValue() + " </mu>");
                }
                pw.println(tab1 + "<stop_time> 9999999.9 </stop_time>");
                pw.println(tab + "</contact>");
            } catch(e) {
                console.info("failed contact part 3");
            };
        }
    }
}

