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
    var MPMContactInputPanel = (function (_super) {
        __extends(MPMContactInputPanel, _super);
        function MPMContactInputPanel(mpmMat) {
            var _this = _super.call(this) || this;
            _this.d_contactType = null;
            _this.d_contactDir = null;
            _this.d_mpmMat = null;
            _this.d_selMat = null;
            _this.contactTypeComB = null;
            _this.contactMatList = null;
            _this.contactMatListModel = null;
            _this.contactMatSP = null;
            _this.frictionLabel = null;
            _this.frictionEntry = null;
            _this.contactDirLabel = null;
            _this.contactDirComB = null;
            _this.updateButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "java.awt.event.ItemListener", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_contactType = new String("null");
            _this.d_contactDir = new Array(3);
            _this.d_contactDir[0] = 0.0;
            _this.d_contactDir[1] = 0.0;
            _this.d_contactDir[2] = 0.0;
            _this.d_mpmMat = mpmMat;
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            var contactTypeLabel = new JLabel("Contact Type");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 0);
            gb.setConstraints(contactTypeLabel, gbc);
            _this.add(contactTypeLabel);
            _this.contactTypeComB = new JComboBox();
            _this.contactTypeComB.addItem("No Contact");
            _this.contactTypeComB.addItem("Rigid Contact");
            _this.contactTypeComB.addItem("Specified Velocity Contact");
            _this.contactTypeComB.addItem("Single Velocity Contact");
            _this.contactTypeComB.addItem("Approach Contact");
            _this.contactTypeComB.addItem("Frictional Contact");
            _this.contactTypeComB.addItemListener(_this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 0);
            gb.setConstraints(_this.contactTypeComB, gbc);
            _this.add(_this.contactTypeComB);
            var contactMatLabel = new JLabel("Contact Materials");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 1);
            gb.setConstraints(contactMatLabel, gbc);
            _this.add(contactMatLabel);
            _this.contactMatListModel = new DefaultListModel();
            for (var ii = 0; ii < _this.d_mpmMat.size(); ++ii) {
                _this.contactMatListModel.addElement(_this.d_mpmMat.elementAt(ii));
            }
            _this.contactMatList = new JList(_this.contactMatListModel);
            _this.contactMatList.setVisibleRowCount(5);
            _this.contactMatSP = new JScrollPane(_this.contactMatList);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 1);
            gb.setConstraints(_this.contactMatSP, gbc);
            _this.add(_this.contactMatSP);
            _this.frictionLabel = new JLabel("Friction Coefficient");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 2);
            gb.setConstraints(_this.frictionLabel, gbc);
            _this.add(_this.frictionLabel);
            _this.frictionLabel.setEnabled(false);
            _this.frictionEntry = new vaango_ui.DecimalField(0.0, 7);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 2);
            gb.setConstraints(_this.frictionEntry, gbc);
            _this.add(_this.frictionEntry);
            _this.frictionEntry.setEnabled(false);
            _this.contactDirLabel = new JLabel("Initial Contact Direction");
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 0, 3);
            gb.setConstraints(_this.contactDirLabel, gbc);
            _this.add(_this.contactDirLabel);
            _this.contactDirLabel.setEnabled(false);
            _this.contactDirComB = new JComboBox();
            _this.contactDirComB.addItem("X-Direction");
            _this.contactDirComB.addItem("Y-Direction");
            _this.contactDirComB.addItem("Z-Direction");
            _this.contactDirComB.addItemListener(_this);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1, 3);
            gb.setConstraints(_this.contactDirComB, gbc);
            _this.add(_this.contactDirComB);
            _this.contactDirComB.setEnabled(false);
            _this.updateButton = new JButton("Update");
            UintahGui.setConstraints(gbc, 0, 4);
            gb.setConstraints(_this.updateButton, gbc);
            _this.add(_this.updateButton);
            _this.updateButton.addActionListener(_this);
            return _this;
        }
        MPMContactInputPanel.prototype.actionPerformed = function (e) {
            this.d_selMat = this.contactMatList.getSelectedIndices();
            this.contactMatList.setSelectedIndices(this.d_selMat);
        };
        MPMContactInputPanel.prototype.itemStateChanged = function (e) {
            var source = e.getItemSelectable();
            var item = new String(e.getItem()).toString();
            if ((source === this.contactTypeComB)) {
                this.frictionLabel.setEnabled(false);
                this.frictionEntry.setEnabled(false);
                this.contactDirLabel.setEnabled(false);
                this.contactDirComB.setEnabled(false);
                if ((item === "No Contact")) {
                    this.d_contactType = "null";
                }
                else if ((item === "Rigid Contact")) {
                    this.d_contactType = "rigid";
                    this.contactDirLabel.setEnabled(true);
                    this.contactDirComB.setEnabled(true);
                }
                else if ((item === "Specified Velocity Contact")) {
                    this.d_contactType = "specified";
                }
                else if ((item === "Single Velocity Contact")) {
                    this.d_contactType = "single_velocity";
                }
                else if ((item === "Approach Contact")) {
                    this.d_contactType = "approach";
                    this.frictionLabel.setEnabled(true);
                    this.frictionEntry.setEnabled(true);
                }
                else if ((item === "Frictional Contact")) {
                    this.d_contactType = "friction";
                    this.frictionLabel.setEnabled(true);
                    this.frictionEntry.setEnabled(true);
                }
            }
            else if ((source === this.contactDirComB)) {
                if ((item === "X-Direction")) {
                    this.d_contactDir[0] = 1.0;
                    this.d_contactDir[1] = 0.0;
                    this.d_contactDir[2] = 0.0;
                }
                else if ((item === "Y-Direction")) {
                    this.d_contactDir[0] = 0.0;
                    this.d_contactDir[1] = 1.0;
                    this.d_contactDir[2] = 0.0;
                }
                else if ((item === "Z-Direction")) {
                    this.d_contactDir[0] = 0.0;
                    this.d_contactDir[1] = 0.0;
                    this.d_contactDir[2] = 1.0;
                }
            }
        };
        MPMContactInputPanel.prototype.refresh = function () {
            this.contactMatListModel.removeAllElements();
            for (var ii = 0; ii < this.d_mpmMat.size(); ++ii) {
                this.contactMatListModel.addElement(this.d_mpmMat.elementAt(ii));
            }
            if (this.d_selMat != null) {
                this.contactMatList.setSelectedIndices(this.d_selMat);
            }
            this.validate();
        };
        /**
         * Write the contents out in Uintah format
         */
        MPMContactInputPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            if ((this.d_contactType === "null"))
                return;
            var tab1 = new String(tab + "  ");
            try {
                pw.println(tab + "<contact>");
                pw.println(tab1 + "<type> " + this.d_contactType + " </type>");
                if ((this.d_contactType === "rigid")) {
                    pw.println(tab1 + "<direction> [" + this.d_contactDir[0] + ", " + this.d_contactDir[1] + ", " + this.d_contactDir[2] + "] </direction>");
                }
            }
            catch (e) {
                console.info("failed contact part 1");
            }
            ;
            try {
                if (this.d_selMat.length > 0) {
                    pw.print(tab1 + "<materials> [");
                    for (var ii = 0; ii < this.d_selMat.length; ++ii) {
                        if (ii === this.d_selMat.length - 1) {
                            pw.print(this.d_selMat[ii]);
                        }
                        else {
                            pw.print(this.d_selMat[ii] + ",");
                        }
                    }
                }
            }
            catch (e) {
                console.info("failed contact part 2");
            }
            ;
            try {
                pw.println("] </materials>");
                if ((this.d_contactType === "friction") || (this.d_contactType === "approach")) {
                    pw.println(tab1 + "<mu> " + this.frictionEntry.getValue() + " </mu>");
                }
                pw.println(tab1 + "<stop_time> 9999999.9 </stop_time>");
                pw.println(tab + "</contact>");
            }
            catch (e) {
                console.info("failed contact part 3");
            }
            ;
        };
        return MPMContactInputPanel;
    }(JPanel));
    /**
     *
     */
    MPMContactInputPanel.serialVersionUID = 8045934468645835561;
    vaango_ui.MPMContactInputPanel = MPMContactInputPanel;
})(vaango_ui || (vaango_ui = {}));
