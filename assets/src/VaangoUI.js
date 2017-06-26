"use strict";
const Vue = require("vue");
require("vue-material/dist/vue-material.css");
const Store_1 = require("./vuex/Store");
var VaangoMainPanel = require("./views/VaangoMainPanel.vue").default;
var MainMenubar = require("./views/MainMenubar.vue").default;
var Sidebar = require("./views/Sidebar.vue").default;
var VaangoInputsSidebar = require("./views/VaangoInputsSidebar.vue").default;
var MainTextPanel = require("./views/MainTextPanel.vue").default;
var ThreeGraphicsPanel = require("./views/ThreeGraphicsPanel.vue").default;
var VtkGraphicsPanel = require("./views/VtkGraphicsPanel.vue").default;
var GeneralInputPanel = require("./views/GeneralInputPanel.vue").default;
var MPMInputPanel = require("./views/MPMInputPanel.vue").default;
var TimeInputPanel = require("./views/TimeInputPanel.vue").default;
Vue.component('main-menubar', MainMenubar);
Vue.component('sidebar', Sidebar);
Vue.component('vaango-inputs-sidebar', VaangoInputsSidebar);
Vue.component('main-text-panel', MainTextPanel);
Vue.component('three-graphics-panel', ThreeGraphicsPanel);
Vue.component('vtk-graphics-panel', VtkGraphicsPanel);
Vue.component('general-input-panel', GeneralInputPanel);
Vue.component('mpm-input-panel', MPMInputPanel);
Vue.component('time-input-panel', TimeInputPanel);
var ThreeOcean = require("./graphics/Ocean.vue").default;
var ThreeRenderer = require("./graphics/ThreeRenderer.vue").default;
var ThreeScene = require("./graphics/ThreeScene.vue").default;
var ThreeCamera = require("./graphics/ThreeCamera.vue").default;
var ThreeSphere = require("./graphics/ThreeSphere.vue").default;
var ThreeEllipsoidParticles = require("./graphics/ThreeEllipsoidParticles.vue").default;
Vue.component('ocean', ThreeOcean);
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
        this.ui_vm = new Vue({
            store: Store_1.default,
            el: '#vaango-main-panel',
            components: {
                'vaango-main-panel': VaangoMainPanel
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
