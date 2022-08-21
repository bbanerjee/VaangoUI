"Generated from Java with JSweet 1.1.1 - http://www.jsweet.org";
namespace vaango_ui {
    export class LightWeightCanvas extends JComponent {
        /**
         * 
         */
        private static serialVersionUID : number = 4745691118012860762;

        public constructor(width : number, height : number) {
            super();
            Object.defineProperty(this, '__interfaces', { configurable: true, value: ["javax.swing.TransferHandler.HasGetTransferHandler","java.awt.MenuContainer","java.awt.image.ImageObserver","java.io.Serializable"] });
            this.setSize(width, height);
            this.setPreferredSize(new Dimension(width, height));
        }

        public paintComponent(g : Graphics) {
            var d : Dimension = this.getSize();
            g.drawRect(0, 0, d.width, d.height);
        }
    }
}

