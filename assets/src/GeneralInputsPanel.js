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
    var GeneralInputsPanel = (function (_super) {
        __extends(GeneralInputsPanel, _super);
        function GeneralInputsPanel(simComponent, parent) {
            var _this = _super.call(this) || this;
            _this.d_simComponent = null;
            _this.d_parent = null;
            _this.constInputPanel = null;
            _this.timeInputPanel = null;
            _this.saveInputPanel = null;
            _this.saveButton = null;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.d_simComponent = simComponent;
            _this.d_parent = parent;
            _this.timeInputPanel = new vaango_ui.TimeInputPanel(_this.d_simComponent, _this);
            _this.saveInputPanel = new vaango_ui.VariableSaveInputPanel();
            _this.constInputPanel = new GeneralInputsPanel.PhysicalConstInputPanel(_this);
            _this.saveButton = new JButton("Save");
            _this.saveButton.setActionCommand("save");
            var gb = new GridBagLayout();
            var gbc = new GridBagConstraints();
            _this.setLayout(gb);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 0, 1, 1, 5);
            gb.setConstraints(_this.timeInputPanel, gbc);
            _this.add(_this.timeInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 1, 1, 1, 5);
            gb.setConstraints(_this.constInputPanel, gbc);
            _this.add(_this.constInputPanel);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 0, 2, 1, 1, 5);
            gb.setConstraints(_this.saveButton, gbc);
            _this.add(_this.saveButton);
            UintahGui.setConstraints(gbc, GridBagConstraints.NONE, 1.0, 1.0, 1, 0, 1, 3, 5);
            gb.setConstraints(_this.saveInputPanel, gbc);
            _this.add(_this.saveInputPanel);
            var buttonListener = new GeneralInputsPanel.ButtonListener(_this);
            _this.saveButton.addActionListener(buttonListener);
            return _this;
        }
        GeneralInputsPanel.prototype.updateTabs = function (simComponent) {
            this.d_simComponent = simComponent;
            this.d_parent.enableTabs(simComponent);
        };
        GeneralInputsPanel.prototype.refresh = function () {
            this.constInputPanel.refresh();
            this.timeInputPanel.refresh();
            this.saveInputPanel.refresh();
        };
        GeneralInputsPanel.prototype.writeUintah = function (pw, tab) {
            if (pw == null)
                return;
            this.timeInputPanel.writeUintah(pw, tab);
            this.saveInputPanel.writeUintah(pw, tab);
            this.constInputPanel.writeUintah(pw, tab);
        };
        return GeneralInputsPanel;
    }(JPanel));
    /**
     *
     */
    GeneralInputsPanel.serialVersionUID = -4491787296780758593;
    vaango_ui.GeneralInputsPanel = GeneralInputsPanel;
    (function (GeneralInputsPanel) {
        var ButtonListener = (function () {
            function ButtonListener(__parent) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
            ButtonListener.prototype.actionPerformed = function (e) {
                if (e.getActionCommand() === "save") {
                    var outputFile = new File("test.ups");
                    try {
                        var fw = new FileWriter(outputFile);
                        var pw = new PrintWriter(fw);
                        this.__parent.timeInputPanel.writeUintah(pw, "  ");
                        this.__parent.saveInputPanel.writeUintah(pw, "  ");
                        pw.close();
                        fw.close();
                    }
                    catch (event) {
                        console.info("Could not write GeneralInputsPanel to file " + outputFile.getName());
                    }
                    ;
                }
            };
            return ButtonListener;
        }());
        GeneralInputsPanel.ButtonListener = ButtonListener;
        var PhysicalConstInputPanel = (function (_super) {
            __extends(PhysicalConstInputPanel, _super);
            function PhysicalConstInputPanel(__parent) {
                var _this = _super.call(this) || this;
                Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "java.awt.image.ImageObserver", "java.io.Serializable"] });
                _this.__parent = __parent;
                _this.serialVersionUID = -3494113212481409042;
                _this.presEntry = null;
                _this.gravEntry = null;
                var gb = new GridBagLayout();
                var gbc = new GridBagConstraints();
                _this.setLayout(gb);
                var fill = GridBagConstraints.BOTH;
                var xgap = 5;
                var ygap = 0;
                var presLabel = new JLabel("Ref. Pressure");
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 0);
                gb.setConstraints(presLabel, gbc);
                _this.add(presLabel);
                _this.presEntry = new vaango_ui.DecimalField(101325.0, 9);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 0);
                gb.setConstraints(_this.presEntry, gbc);
                _this.add(_this.presEntry);
                var gravLabel = new JLabel("Gravity:");
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 0, 1);
                gb.setConstraints(gravLabel, gbc);
                _this.add(gravLabel);
                _this.gravEntry = new vaango_ui.DecimalVectorField(0.0, 0.0, 0.0, 5);
                UintahGui.setConstraints(gbc, fill, xgap, ygap, 1, 1);
                gb.setConstraints(_this.gravEntry, gbc);
                _this.add(_this.gravEntry);
                return _this;
            }
            PhysicalConstInputPanel.prototype.refresh = function () {
            };
            PhysicalConstInputPanel.prototype.writeUintah = function (pw, tab) {
                if (pw == null)
                    return;
                try {
                    var tab1 = new String(tab + "  ");
                    pw.println(tab + "<PhysicalConstants>");
                    pw.println(tab1 + "<reference_pressure> " + this.presEntry.getValue() + " </reference_pressure>");
                    pw.println(tab1 + "<gravity> [" + this.gravEntry.x() + ", " + this.gravEntry.y() + ", " + this.gravEntry.z() + "] </gravity>");
                    pw.println(tab + "</PhysicalConstants>");
                    pw.println(tab);
                }
                catch (e) {
                    console.info("Could not write PhysicalConstInputPanel.");
                }
                ;
            };
            return PhysicalConstInputPanel;
        }(JPanel));
        GeneralInputsPanel.PhysicalConstInputPanel = PhysicalConstInputPanel;
    })(GeneralInputsPanel = vaango_ui.GeneralInputsPanel || (vaango_ui.GeneralInputsPanel = {}));
})(vaango_ui || (vaango_ui = {}));
