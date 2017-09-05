//  This is the entry routine for Vaango UI

const Vue = require("vue");
const Store = require("./vuex/Store").default;

var VaangoMainPanel = require("./views/VaangoMainPanel.vue").default;
var MainMenubar = require("./views/MainMenubar.vue").default;
var Sidebar = require("./views/Sidebar.vue").default;
var VaangoInputsSidebar = require("./views/VaangoInputsSidebar.vue").default;
var MainTextPanel = require("./views/MainTextPanel.vue").default;
var ThreeGraphicsPanel = require("./views/ThreeGraphicsPanel.vue").default;
var VtkGraphicsPanel = require("./views/VtkGraphicsPanel.vue").default;
var GeneralInputPanel = require("./views/GeneralInputPanel.vue").default;
var MPMInputPanel = require("./views/MPMInputPanel.vue").default;
var ICEInputPanel = require("./views/ICEInputPanel.vue").default;
var TimeInputPanel = require("./views/TimeInputPanel.vue").default;
var GeometryEditorGraphicsPanel = require("./views/GeometryEditorGraphicsPanel.vue").default;

Vue.component('vaango-main-panel', VaangoMainPanel);
Vue.component('main-menubar', MainMenubar);
Vue.component('sidebar', Sidebar);
Vue.component('vaango-inputs-sidebar', VaangoInputsSidebar);
Vue.component('main-text-panel', MainTextPanel);
Vue.component('three-graphics-panel', ThreeGraphicsPanel);
Vue.component('vtk-graphics-panel', VtkGraphicsPanel);
Vue.component('general-input-panel', GeneralInputPanel);
Vue.component('mpm-input-panel', MPMInputPanel);
Vue.component('ice-input-panel', ICEInputPanel);
Vue.component('time-input-panel', TimeInputPanel);
Vue.component('editor-graphics-panel', GeometryEditorGraphicsPanel);


var ThreeRenderer = require("./graphics/ThreeRenderer.vue").default;
var ThreeScene = require("./graphics/ThreeScene.vue").default;
var ThreeCamera = require("./graphics/ThreeCamera.vue").default;
var ThreeSphere = require("./graphics/ThreeSphere.vue").default;
var ThreeEllipsoidParticles = require("./graphics/ThreeEllipsoidParticles.vue").default;

Vue.component('three-renderer', ThreeRenderer);
Vue.component('three-scene', ThreeScene);
Vue.component('three-camera', ThreeCamera);
Vue.component('three-sphere', ThreeSphere);
Vue.component('three-ellipsoid-particles', ThreeEllipsoidParticles);

var VtkSphere = require("./graphics/VtkSphere.vue").default;
var VtkEllipsoidParticles = require("./graphics/VtkEllipsoidParticles.vue").default;
var VtkRenderer = require("./graphics/VtkRenderer.vue").default;

Vue.component('vtk-sphere', VtkSphere);
Vue.component('vtk-ellipsoid-particles', VtkEllipsoidParticles);
Vue.component('vtk-renderer', VtkRenderer);

var GeometryEditorRenderer = require("./graphics/GeometryEditorRenderer.vue").default;
var GeometryEditorScene = require("./graphics/GeometryEditorScene.vue").default;
var GeometryEditorCamera = require("./graphics/GeometryEditorCamera.vue").default;

Vue.component('editor-renderer', GeometryEditorRenderer);
Vue.component('editor-scene', GeometryEditorScene);
Vue.component('editor-camera', GeometryEditorCamera);

// import ParticleList = vaango_ui.ParticleList;
class VaangoUI {
  
        /*
        private d_partList : ParticleList = null;
        private uintahInputPanel : UintahInputPanel = null;
        private particleGenPanel : ParticleGeneratePanel = null;
        private mainTabbedPane : JTabbedPane = null;
        public helpAboutFrame : HelpAboutFrame = null;
        public oldFile : File = null;
        public static mainFrame : JFrame = null;
        public static OPEN : number = 1;
        public static SAVE : number = 2;
        */

  constructor() {

    this.ui_vm = new Vue ({
        store: Store,
        el: '#vaango-main-panel',
        components: {
            'vaango-main-panel' : VaangoMainPanel
        },
        render: h => {
            return h('vaango-main-panel');
        }
    });

    this.events_vm = new Vue();

    //this.d_partList = new ParticleList();
  }

  initUI() {

            /*
            var menuListener : VaangoUI.MenuListener = new VaangoUI.MenuListener(this);
            var menuBar : JMenuBar = new JMenuBar();
            this.setJMenuBar(menuBar);
            var fileMenu : JMenu = new JMenu("File");
            menuBar.add(fileMenu);
            var menuItem : JMenuItem;
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
            this.uintahInputPanel = new UintahInputPanel(this.d_partList, this);
            this.particleGenPanel = new ParticleGeneratePanel(this.d_partList, this);
            this.mainTabbedPane.addTab("Uintah Inputs", null, this.uintahInputPanel, null);
            this.mainTabbedPane.addTab("Generate Particle Locations", null, this.particleGenPanel, null);
            this.mainTabbedPane.setSelectedIndex(0);
            this.getContentPane().add(this.mainTabbedPane);
            var helpMenu : JMenu = new JMenu("Help");
            menuBar.add(helpMenu);
            menuItem = new JMenuItem("About");
            helpMenu.add(menuItem);
            menuItem.addActionListener(menuListener);
            this.helpAboutFrame = new HelpAboutFrame();
            this.helpAboutFrame.pack();
            var tabListener : VaangoUI.TabListener = new VaangoUI.TabListener(this);
            this.mainTabbedPane.addChangeListener(tabListener);
            */
  }

        /*
        public updatePanels() {
            VaangoUI.mainFrame.pack();
        }

        getFileName(option : number) : File {
            var fc : JFileChooser = new JFileChooser(new File(".."));
            if(this.oldFile != null) fc.setSelectedFile(this.oldFile);
            var returnVal : number = 0;
            if(option === VaangoUI.OPEN) {
                returnVal = fc.showOpenDialog(this);
            } else {
                returnVal = fc.showSaveDialog(this);
            }
            if(returnVal === JFileChooser.APPROVE_OPTION) {
                var file : File = fc.getSelectedFile();
                this.oldFile = file;
                return file;
            } else return null;
        }

        writeUintah(outputFile : File) {
            try {
                var fw : FileWriter = new FileWriter(outputFile);
                var pw : PrintWriter = new PrintWriter(fw);
                this.uintahInputPanel.writeUintah(pw);
                pw.close();
                fw.close();
            } catch(event) {
                console.info("Could not write to file " + outputFile.getName());
            };
        }

        public static setConstraints(c? : any, fill? : any, wx? : any, wy? : any, gx? : any, gy? : any, gw? : any, gh? : any, ins? : any) : any {
            if(((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && ((typeof wy === 'number') || wy === null) && ((typeof gx === 'number') || gx === null) && ((typeof gy === 'number') || gy === null) && ((typeof gw === 'number') || gw === null) && ((typeof gh === 'number') || gh === null) && ((typeof ins === 'number') || ins === null)) {
                return <any>(() => {
                    c.fill = fill;
                    c.weightx = <number>wx;
                    c.weighty = <number>wy;
                    c.gridx = gx;
                    c.gridy = gy;
                    c.gridwidth = gw;
                    c.gridheight = gh;
                    var insets : Insets = new Insets(ins, ins, ins, ins);
                    c.insets = insets;
                })();
            } else if(((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && ((typeof wy === 'number') || wy === null) && ((typeof gx === 'number') || gx === null) && ((typeof gy === 'number') || gy === null) && gw === undefined && gh === undefined && ins === undefined) {
                return <any>vaango_ui.VaangoUI.setConstraints$java_awt_GridBagConstraints$int$int$int$int$int(c, fill, wx, wy, gx, gy);
            } else if(((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && ((typeof wy === 'number') || wy === null) && gx === undefined && gy === undefined && gw === undefined && gh === undefined && ins === undefined) {
                return <any>vaango_ui.VaangoUI.setConstraints$java_awt_GridBagConstraints$int$int$int(c, fill, wx, wy);
            } else if(((c != null && c instanceof java.awt.GridBagConstraints) || c === null) && ((typeof fill === 'number') || fill === null) && ((typeof wx === 'number') || wx === null) && wy === undefined && gx === undefined && gy === undefined && gw === undefined && gh === undefined && ins === undefined) {
                return <any>vaango_ui.VaangoUI.setConstraints$java_awt_GridBagConstraints$int$int(c, fill, wx);
            } else throw new Error('invalid overload');
        }

        public static setConstraints$java_awt_GridBagConstraints$int$int(c : GridBagConstraints, col : number, row : number) {
            c.fill = GridBagConstraints.NONE;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets : Insets = new Insets(5, 5, 5, 5);
            c.insets = insets;
        }

        public static setConstraints$java_awt_GridBagConstraints$int$int$int(c : GridBagConstraints, fill : number, col : number, row : number) {
            c.fill = fill;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets : Insets = new Insets(5, 5, 5, 5);
            c.insets = insets;
        }

        public static setConstraints$java_awt_GridBagConstraints$int$int$int$int$int(c : GridBagConstraints, fill : number, xinset : number, yinset : number, col : number, row : number) {
            c.fill = fill;
            c.weightx = 1.0;
            c.weighty = 1.0;
            c.gridx = col;
            c.gridy = row;
            c.gridwidth = 1;
            c.gridheight = 1;
            var insets : Insets = new Insets(yinset, xinset, yinset, xinset);
            c.insets = insets;
        } */
}

module.exports = VaangoUI;

    /*
    export namespace VaangoUI {

        export class MenuListener implements ActionListener {
            public __parent: any;
            public actionPerformed(e : ActionEvent) {
                var source : JMenuItem = <JMenuItem>(e.getSource());
                var text : string = source.getText();
                if((text === "Exit")) {
                    java.lang.System.exit(0);
                } else if((text === "Read Particle Location Data")) {
                    var particleFile : File = null;
                    if((particleFile = this.__parent.getFileName(VaangoUI.OPEN)) != null) {
                        this.__parent.d_partList.readFromFile(particleFile);
                    }
                } else if((text === "Save Uintah Input File")) {
                    var uintahFile : File = null;
                    if((uintahFile = this.__parent.getFileName(VaangoUI.SAVE)) != null) {
                        this.__parent.writeUintah(uintahFile);
                    }
                } else if((text === "About")) {
                    this.__parent.helpAboutFrame.setVisible(true);
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.ActionListener"] });
                this.__parent = __parent;
            }
        }

        export class TabListener implements ChangeListener {
            public __parent: any;
            public stateChanged(e : ChangeEvent) {
                var curTab : number = this.__parent.mainTabbedPane.getSelectedIndex();
                if(curTab === 0) {
                    this.__parent.particleGenPanel.setVisibleDisplayFrame(false);
                } else {
                    this.__parent.particleGenPanel.setVisibleDisplayFrame(true);
                    this.__parent.uintahInputPanel.setVisibleDisplayFrame(false);
                }
            }

            constructor(__parent: any) {
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","javax.swing.event.ChangeListener"] });
                this.__parent = __parent;
            }
        }

        export class VaangoUI$0 extends WindowAdapter {
            public windowClosing(e : WindowEvent) {
                java.lang.System.exit(0);
            }

            constructor() {
                super();
                Object.defineProperty(this, '__interfaces', { configurable: true, value: ["java.util.EventListener","java.awt.event.WindowListener","java.awt.event.WindowFocusListener","java.awt.event.WindowStateListener"] });
            }
        }
    }
    */


