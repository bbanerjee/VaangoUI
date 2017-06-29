"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    import Vector = java.util.Vector;

    export class ICEMaterialsPanel extends JPanel implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = 7684826886240542619;

        private d_geomObj : Vector<GeomObject> = null;

        private d_iceMat : Vector<string> = null;

        private iceMatTabbedPane : JTabbedPane = null;

        private iceMatInputPanel : Vector<ICEMaterialInputPanel> = null;

        private addButton : JButton = null;

        private delButton : JButton = null;

        public constructor(geomObj : Vector<GeomObject>, iceMat : Vector<string>, parent : UintahInputPanel) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.d_geomObj = geomObj;
            this.d_iceMat = iceMat;
            this.iceMatInputPanel = new Vector<ICEMaterialInputPanel>();
            var gb : GridBagLayout = new GridBagLayout();
            var gbc : GridBagConstraints = new GridBagConstraints();
            this.setLayout(gb);
            this.addButton = new JButton("Add Material");
            this.addButton.setActionCommand("add");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(this.addButton, gbc);
            this.add(this.addButton);
            this.delButton = new JButton("Remove Material");
            this.delButton.setActionCommand("delete");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 1, 5);
            gb.setConstraints(this.delButton, gbc);
            this.add(this.delButton);
            var matID : string = <string>new String("ICE Material " + /* valueOf */new String(0).toString());
            this.d_iceMat.addElement(matID);
            var matPanel : ICEMaterialInputPanel = new ICEMaterialInputPanel(0, this.d_geomObj);
            this.iceMatInputPanel.addElement(matPanel);
            this.iceMatTabbedPane = new JTabbedPane();
            this.iceMatTabbedPane.addTab(matID, null, matPanel, null);
            this.iceMatTabbedPane.setSelectedIndex(0);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, GridBagConstraints.REMAINDER, 1, 5);
            gb.setConstraints(this.iceMatTabbedPane, gbc);
            this.add(this.iceMatTabbedPane);
            this.addButton.addActionListener(this);
            this.delButton.addActionListener(this);
        }

        public refresh() {
            var numMat : number = this.d_iceMat.size();
            for(var ii : number = 0; ii < numMat; ++ii) {
                var matPanel : ICEMaterialInputPanel = this.iceMatInputPanel.elementAt(ii);
                matPanel.refresh();
            }
        }

        public createPartListICEMaterial(simType : string) {
            if((simType === <string>new String("mpmice"))) {
                var numMat : number = this.d_iceMat.size();
                if(numMat < 2) {
                    var matID : string = <string>new String("ICE Material " + /* valueOf */new String(numMat).toString());
                    this.d_iceMat.addElement(matID);
                    var matPanel : ICEMaterialInputPanel = new ICEMaterialInputPanel(numMat, this.d_geomObj);
                    this.iceMatInputPanel.addElement(matPanel);
                    this.iceMatTabbedPane.add(matPanel, numMat);
                    this.iceMatTabbedPane.setTitleAt(numMat, matID);
                    this.iceMatTabbedPane.setSelectedIndex(0);
                }
            }
        }

        public writeUintah(pw : PrintWriter, tab : string, matIndex : number) {
            if(pw == null) return;
            var numMat : number = this.d_iceMat.size();
            if(matIndex < numMat) {
                var matPanel : ICEMaterialInputPanel = this.iceMatInputPanel.elementAt(matIndex);
                matPanel.writeUintah(pw, tab);
            }
        }

        public actionPerformed(e : ActionEvent) {
            if(e.getActionCommand() === "add") {
                var ii : number = this.d_iceMat.size();
                var matID : string = <string>new String("ICE Material " + /* valueOf */new String(ii).toString());
                this.d_iceMat.addElement(matID);
                var matPanel : ICEMaterialInputPanel = new ICEMaterialInputPanel(ii, this.d_geomObj);
                this.iceMatInputPanel.addElement(matPanel);
                this.iceMatTabbedPane.add(matPanel, ii);
                this.iceMatTabbedPane.setTitleAt(ii, matID);
                this.iceMatTabbedPane.setSelectedIndex(ii);
            } else if(e.getActionCommand() === "delete") {
                var ii : number = this.d_iceMat.size() - 1;
                this.d_iceMat.removeElementAt(ii);
                this.iceMatInputPanel.removeElementAt(ii);
                this.iceMatTabbedPane.remove(ii);
                this.iceMatTabbedPane.setSelectedIndex(ii);
            }
        }
    }
}

