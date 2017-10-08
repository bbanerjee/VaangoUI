/**
 * Copyright (C) 2013 by Javi Agenjo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
//Creates an interface to access extra features from a graph (like play, stop, live, etc)
export default class LGraphEdior {

  constructor(container_id, options) {

    //fill container
    var html = "<div class='header'><div class='tools tools-left'></div><div class='tools tools-right'></div></div>";
    html += "<div class='content'><div class='editor-area'><canvas class='graphcanvas' width='1000' height='500' tabindex=10></canvas></div></div>";
    html += "<div class='footer'><div class='tools tools-left'></div><div class='tools tools-right'></div></div>";

    var root = document.createElement("div");
    this.root = root;
    root.className = "litegraph-editor";
    root.innerHTML = html;

    this.tools = root.querySelector(".tools");

    var canvas = root.querySelector(".graphcanvas");

    //create graph
    var graph = this.graph = new LGraph();
    var graphcanvas = this.graphcanvas = new LGraphCanvas(canvas, graph);
    graphcanvas.background_image = "imgs/grid.png";
    graph.onAfterExecute = () => { graphcanvas.draw(true) };

    //add stuff
    //this.addToolsButton("loadsession_button","Load","imgs/icon-load.png", this.onLoadButton.bind(this), ".tools-left" );
    //this.addToolsButton("savesession_button","Save","imgs/icon-save.png", this.onSaveButton.bind(this), ".tools-left" );
    this.addLoadCounter();
    this.addToolsButton("playnode_button", "Play", "imgs/icon-play.png", this.onPlayButton.bind(this), ".tools-right");
    this.addToolsButton("playstepnode_button", "Step", "imgs/icon-playstep.png", this.onPlayStepButton.bind(this), ".tools-right");

    this.addToolsButton("livemode_button", "Live", "imgs/icon-record.png", this.onLiveButton.bind(this), ".tools-right");
    this.addToolsButton("maximize_button", "", "imgs/icon-maximize.png", this.onFullscreenButton.bind(this), ".tools-right");

    this.addMiniWindow(300, 200);

    //append to DOM
    var parent = document.getElementById(container_id);
    if (parent)
      parent.appendChild(root);

    graphcanvas.resize();
    //graphcanvas.draw(true,true);
  }

  addLoadCounter = () => {
    var meter = document.createElement("div");
    meter.className = 'headerpanel loadmeter toolbar-widget';

    var html = "<div class='cpuload'><strong>CPU</strong> <div class='bgload'><div class='fgload'></div></div></div>";
    html += "<div class='gpuload'><strong>GFX</strong> <div class='bgload'><div class='fgload'></div></div></div>";

    meter.innerHTML = html;
    this.root.querySelector(".header .tools-left").appendChild(meter);
    var self = this;

    setInterval(function () {
      meter.querySelector(".cpuload .fgload").style.width = ((2 * self.graph.elapsed_time) * 90) + "px";
      if (self.graph.status == LGraph.STATUS_RUNNING)
        meter.querySelector(".gpuload .fgload").style.width = ((self.graphcanvas.render_time * 10) * 90) + "px";
      else
        meter.querySelector(".gpuload .fgload").style.width = 4 + "px";
    }, 200);
  }

  addToolsButton = (id, name, icon_url, callback, container) => {
    if (!container)
      container = ".tools";

    var button = this.createButton(name, icon_url);
    button.id = id;
    button.addEventListener("click", callback);

    this.root.querySelector(container).appendChild(button);
  }


  createPanel = (title, options) => {

    var root = document.createElement("div");
    root.className = "dialog";
    root.innerHTML = "<div class='dialog-header'><span class='dialog-title'>" + title + "</span></div><div class='dialog-content'></div><div class='dialog-footer'></div>";
    root.header = root.querySelector(".dialog-header");
    root.content = root.querySelector(".dialog-content");
    root.footer = root.querySelector(".dialog-footer");


    return root;
  }

  createButton = (name, icon_url) => {
    var button = document.createElement("button");
    if (icon_url)
      button.innerHTML = "<img src='" + icon_url + "'/> ";
    button.innerHTML += name;
    return button;
  }

  onLoadButton = () => {
    var panel = this.createPanel("Load session");
    var close = this.createButton("Close");
    close.style.float = "right";
    close.addEventListener("click", function () { panel.parentNode.removeChild(panel); });
    panel.header.appendChild(close);
    panel.content.innerHTML = "test";

    this.root.appendChild(panel);
  }

  onSaveButton = () => {
  }

  onPlayButton = () => {
    var graph = this.graph;
    var button = this.root.querySelector("#playnode_button");

    if (graph.status == LGraph.STATUS_STOPPED) {
      button.innerHTML = "<img src='imgs/icon-stop.png'/> Stop";
      graph.start(1);
    }
    else {
      button.innerHTML = "<img src='imgs/icon-play.png'/> Play";
      graph.stop();
    }
  }

  onPlayStepButton = () => {
    var graph = this.graph;
    graph.runStep(1);
    this.graphcanvas.draw(true, true);
  }

  onLiveButton = () => {
    var is_live_mode = !this.graphcanvas.live_mode;
    this.graphcanvas.switchLiveMode(true);
    this.graphcanvas.draw();
    var url = this.graphcanvas.live_mode ? "imgs/gauss_bg_medium.jpg" : "imgs/gauss_bg.jpg";
    var button = this.root.querySelector("#livemode_button");
    button.innerHTML = !is_live_mode ? "<img src='imgs/icon-record.png'/> Live" : "<img src='imgs/icon-gear.png'/> Edit";
  }

  goFullscreen = () => {
    if (this.root.requestFullscreen)
      this.root.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    else if (this.root.mozRequestFullscreen)
      this.root.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    else if (this.root.webkitRequestFullscreen)
      this.root.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    else
      throw ("Fullscreen not supported");

    var self = this;
    setTimeout(function () {
      self.graphcanvas.resize();
    }, 100);
  }

  onFullscreenButton = () => {
    this.goFullscreen();
  }

  onMaximizeButton = () => {
    this.maximize();
  }

  addMiniWindow = (w, h) => {
    var miniwindow = document.createElement("div");
    miniwindow.className = "litegraph miniwindow";
    miniwindow.innerHTML = "<canvas class='graphcanvas' width='" + w + "' height='" + h + "' tabindex=10></canvas>";
    var canvas = miniwindow.querySelector("canvas");

    var graphcanvas = new LGraphCanvas(canvas, this.graph);
    graphcanvas.background_image = "imgs/grid.png";
    graphcanvas.scale = 0.25;
    graphcanvas.allow_dragnodes = false;
    graphcanvas.allow_interaction = false;
    this.miniwindow_graphcanvas = graphcanvas;
    graphcanvas.onClear = () => {
      graphcanvas.scale = 0.25;
      graphcanvas.allow_dragnodes = false;
      graphcanvas.allow_interaction = false;
    };

    miniwindow.style.position = "absolute";
    miniwindow.style.top = "4px";
    miniwindow.style.right = "4px";

    var close_button = document.createElement("div");
    close_button.className = "corner-button";
    close_button.innerHTML = "X";
    close_button.addEventListener("click", function (e) {
      graphcanvas.setGraph(null);
      miniwindow.parentNode.removeChild(miniwindow);
    });
    miniwindow.appendChild(close_button);

    this.root.querySelector(".content").appendChild(miniwindow);
  }

}