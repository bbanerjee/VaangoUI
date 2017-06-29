"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class HelpAboutFrame extends JFrame implements ActionListener {
        /**
         * 
         */
        private static serialVersionUID : number = -6763837052154368745;

        textArea : JTextArea;

        public constructor() {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener","javax.swing.RootPaneContainer","javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","javax.accessibility.Accessible","javax.swing.WindowConstants","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.setSize(300, 300);
            this.setLocation(500, 50);
            this.setTitle("About ...");
            var gb : GridBagLayout = new GridBagLayout();
            var c : GridBagConstraints = new GridBagConstraints();
            this.getContentPane().setLayout(gb);
            UintahGui.setConstraints(c, GridBagConstraints.BOTH, 1.0, 1.0, 0, 0, 1, 1, 1);
            var text : string = <string>new String("Uintah User Interface");
            this.textArea = new JTextArea(text, 20, 30);
            this.textArea.setEditable(false);
            this.textArea.setFont(new Font("Dialog", Font.PLAIN, 12));
            this.createHelpText();
            gb.setConstraints(this.textArea, c);
            this.getContentPane().add(this.textArea);
            UintahGui.setConstraints(c, GridBagConstraints.CENTER, 1.0, 1.0, 0, 1, 1, 1, 1);
            var button : Button = new Button("Close Window");
            gb.setConstraints(button, c);
            button.addActionListener(this);
            this.getContentPane().add(button);
        }

        /**
         * Respond to button pressed
         */
        public actionPerformed(e : ActionEvent) {
            this.setVisible(false);
        }

        private createHelpText() {
            this.textArea.append("\n");
            this.textArea.append("Version 1.0\n");
            this.textArea.append("Author : Biswajit Banerjee\n");
            this.textArea.append("Department of Mechanical Engineering\n");
            this.textArea.append("University of Utah\n");
        }
    }
}

