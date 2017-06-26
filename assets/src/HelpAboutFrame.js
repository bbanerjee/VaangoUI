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
    var HelpAboutFrame = (function (_super) {
        __extends(HelpAboutFrame, _super);
        function HelpAboutFrame() {
            var _this = _super.call(this) || this;
            Object.defineProperty(_this, '__interfaces', { configurable: true, value: ["java.util.EventListener", "java.awt.event.ActionListener", "javax.swing.RootPaneContainer", "javax.swing.TransferHandler.HasGetTransferHandler", "java.awt.MenuContainer", "javax.accessibility.Accessible", "javax.swing.WindowConstants", "java.awt.image.ImageObserver", "java.io.Serializable"] });
            _this.setSize(300, 300);
            _this.setLocation(500, 50);
            _this.setTitle("About ...");
            var gb = new GridBagLayout();
            var c = new GridBagConstraints();
            _this.getContentPane().setLayout(gb);
            UintahGui.setConstraints(c, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 1);
            var text = new String("Uintah User Interface");
            _this.textArea = new JTextArea(text, 20, 30);
            _this.textArea.setEditable(false);
            _this.textArea.setFont(new Font("Dialog", Font.PLAIN, 12));
            _this.createHelpText();
            gb.setConstraints(_this.textArea, c);
            _this.getContentPane().add(_this.textArea);
            UintahGui.setConstraints(c, GridBagConstraints.CENTER, 1.0, 1.0, 0, 1, 1, 1, 1);
            var button = new Button("Close Window");
            gb.setConstraints(button, c);
            button.addActionListener(_this);
            _this.getContentPane().add(button);
            return _this;
        }
        /**
         * Respond to button pressed
         */
        HelpAboutFrame.prototype.actionPerformed = function (e) {
            this.setVisible(false);
        };
        HelpAboutFrame.prototype.createHelpText = function () {
            this.textArea.append("\n");
            this.textArea.append("Version 1.0\n");
            this.textArea.append("Author : Biswajit Banerjee\n");
            this.textArea.append("Department of Mechanical Engineering\n");
            this.textArea.append("University of Utah\n");
        };
        return HelpAboutFrame;
    }(JFrame));
    /**
     *
     */
    HelpAboutFrame.serialVersionUID = -6763837052154368745;
    vaango_ui.HelpAboutFrame = HelpAboutFrame;
})(vaango_ui || (vaango_ui = {}));
