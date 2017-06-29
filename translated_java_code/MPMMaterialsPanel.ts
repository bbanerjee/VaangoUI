"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class MPMMaterialsPanel extends JPanel implements ChangeListener {
        /**
         * 
         */
        private static serialVersionUID : number = 2160671222060156287;

        private d_geomObj : Vector<GeomObject> = null;

        private d_mpmMat : Vector<string> = null;

        private mpmMatTabbedPane : JTabbedPane = null;

        private mpmMatInputPanel : Vector<MPMMaterialInputPanel> = null;

        private addButton : JButton = null;

        private delButton : JButton = null;

        private contactPanel : MPMContactInputPanel = null;

        public constructor(geomObj : Vector<GeomObject>, mpmMat : Vector<string>, parent : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.swing.event.ChangeListener","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_geomObj = geomObj;
            this.d_mpmMat = mpmMat;
            this.mpmMatInputPanel = new Vector<MPMMaterialInputPanel>();
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            this.addButton = new JButton("Add Material");
            this.addButton.setActionCommand("add");
            UintahGui.setConstraints(gbc, 0, 0);
            gb.setConstraints(this.addButton, gbc);
            this.add(this.addButton);
            this.delButton = new JButton("Remove Material");
            this.delButton.setActionCommand("delete");
            UintahGui.setConstraints(gbc, 1, 0);
            gb.setConstraints(this.delButton, gbc);
            this.add(this.delButton);
            var matID : string = <string>new String("MPM Material " + /* valueOf */new String(0).toString());
            this.d_mpmMat.addElement(matID);
            var matPanel : MPMMaterialInputPanel = new MPMMaterialInputPanel(0, this.d_geomObj);
            this.mpmMatInputPanel.addElement(matPanel);
            this.contactPanel = new MPMContactInputPanel(this.d_mpmMat);
            this.mpmMatTabbedPane = new JTabbedPane();
            this.mpmMatTabbedPane.addTab(matID, null, matPanel, null);
            this.mpmMatTabbedPane.addTab("Contact", null, this.contactPanel, null);
            this.mpmMatTabbedPane.setSelectedIndex(0);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, GridBagConstraints.REMAINDER, 1, 5);
            gb.setConstraints(this.mpmMatTabbedPane, gbc);
            this.add(this.mpmMatTabbedPane);
            this.mpmMatTabbedPane.addChangeListener(this);
            var buttonListener : MPMMaterialsPanel.ButtonListener = new MPMMaterialsPanel.ButtonListener(this);
            this.addButton.addActionListener(buttonListener);
            this.delButton.addActionListener(buttonListener);
        }

        public stateChanged(e : ChangeEvent) {
            var numTab : number = this.mpmMatTabbedPane.getTabCount();
            var tabIndex : number = this.mpmMatTabbedPane.getSelectedIndex();
            if(tabIndex === numTab - 1) {
                this.contactPanel.refresh();
            }
        }

        public refresh() {
            var numMat : number = this.d_mpmMat.size();
            for(var ii : number = 0; ii < numMat; ++ii) {
                var matPanel : MPMMaterialInputPanel = this.mpmMatInputPanel.elementAt(ii);
                matPanel.refresh();
            }
        }

        public createPartListMPMMaterial(simType : string) {
            if((simType === <string>new String("mpm"))) {
                var numMat : number = this.d_mpmMat.size();
                if(numMat < 2) {
                    var matID : string = <string>new String("Material " + /* valueOf */new String(numMat).toString());
                    this.d_mpmMat.addElement(matID);
                    var matPanel : MPMMaterialInputPanel = new MPMMaterialInputPanel(numMat, this.d_geomObj);
                    this.mpmMatInputPanel.addElement(matPanel);
                    this.mpmMatTabbedPane.add(matPanel, numMat);
                    this.mpmMatTabbedPane.setTitleAt(numMat, matID);
                    this.mpmMatTabbedPane.setSelectedIndex(0);
                }
            }
        }

        public writeUintah(pw : PrintWriter, tab : string, matIndex : number) {
            if(pw == null) return;
            var numMat : number = this.d_mpmMat.size();
            if(matIndex < numMat) {
                var matPanel : MPMMaterialInputPanel = this.mpmMatInputPanel.elementAt(matIndex);
                matPanel.writeUintah(pw, tab);
            }
        }

        public writeUintahContact(pw : PrintWriter, tab : string) {
            if(pw == null) return;
            this.contactPanel.writeUintah(pw, tab);
        }
    }

    export namespace MPMMaterialsPanel {

        export class ButtonListener implements ActionListener {
            public __parent: any;
            public actionPerformed(e : ActionEvent) {
                if(e.getActionCommand() === "add") {
                    var ii : number = this.__parent.d_mpmMat.size();
                    var matID : string = <string>new String("Material " + /* valueOf */new String(ii).toString());
                    this.__parent.d_mpmMat.addElement(matID);
                    var matPanel : MPMMaterialInputPanel = new MPMMaterialInputPanel(ii, this.__parent.d_geomObj);
                    this.__parent.mpmMatInputPanel.addElement(matPanel);
                    this.__parent.mpmMatTabbedPane.add(matPanel, ii);
                    this.__parent.mpmMatTabbedPane.setTitleAt(ii, matID);
                    this.__parent.mpmMatTabbedPane.setSelectedIndex(ii);
                } else if(e.getActionCommand() === "delete") {
                    var ii : number = this.__parent.d_mpmMat.size() - 1;
                    this.__parent.d_mpmMat.removeElementAt(ii);
                    this.__parent.mpmMatInputPanel.removeElementAt(ii);
                    this.__parent.mpmMatTabbedPane.remove(ii);
                    this.__parent.mpmMatTabbedPane.setSelectedIndex(ii);
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
        }
    }

}

