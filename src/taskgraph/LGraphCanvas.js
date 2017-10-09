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
import LiteGraph from "./LiteGraph.js"
import { LiteGraphStates } from "./LiteGraphStates.js"

const node_colors = {
    "red": { color: "#FAA", bgcolor: "#A44" },
    "green": { color: "#AFA", bgcolor: "#4A4" },
    "blue": { color: "#AAF", bgcolor: "#44A" },
    "white": { color: "#FFF", bgcolor: "#AAA" }
};

/**
 * LGraphCanvas: LGraph renderer CLASS                                  
 * The Global Scope. It contains all the registered node classes.
 * Valid callbacks are: onNodeSelected, onNodeDeselected, onShowNodePanel, onNodeDblClicked
 *
 * @class LGraphCanvas
 * @constructor
 * @param {HTMLCanvas} canvas the canvas where you want to render (it accepts a selector in string format or the canvas itself)
 * @param {LGraph} graph [optional]
 * @param {Object} options [optional] { skip_rendering, autoresize }
 */

export default class LGraphCanvas {

  constructor(canvas, graph, options) {

    options = options || {};

    if (canvas && canvas.constructor === String) {
      canvas = document.querySelector(canvas);
    }

    this.d_max_zoom = 10;
    this.d_min_zoom = 0.1;

    this.d_title_text_font = "bold 14px Arial";
    this.d_inner_text_font = "normal 12px Arial";
    this.d_efault_link_color = "#AAC";

    this.d_highquality_render = true;
    this.d_editor_alpha = 1; //used for transition
    this.d_pause_rendering = false;
    this.d_render_shadows = true;
    this.d_clear_background = true;

    this.d_render_only_selected = true;
    this.d_live_mode = false;
    this.d_show_info = true;
    this.d_allow_dragcanvas = true;
    this.d_allow_dragnodes = true;
    this.d_allow_interaction = true; //allow to control widgets, buttons, collapse, etc

    this.d_always_render_background = false;
    this.d_render_connections_shadows = false; //too much cpu
    this.d_render_connections_border = true;
    this.d_render_curved_connections = true;
    this.d_render_connection_arrows = true;

    this.d_connections_width = 4;

    //link canvas and graph
    if (graph)
      graph.attachCanvas(this);

    this.setCanvas(canvas);
    this.clear();

    if (!options.skip_render)
      this.startRendering();

    this.d_autoresize = options.autoresize;
    this.d_link_type_colors = { "-1": "#F85", 'number': "#AAC", "node": "#DCA" };
  }

  /**
  * clears all the data inside
  *
  * @method clear
  */
  clear ()  {
    this.d_frame = 0;
    this.d_last_draw_time = 0;
    this.d_render_time = 0;
    this.d_fps = 0;

    this.d_scale = 1;
    this.d_offset = [0, 0];

    this.d_selected_nodes = {};
    this.d_node_dragged = null;
    this.d_node_over = null;
    this.d_node_capturing_input = null;
    this.d_connecting_node = null;

    this.d_dirty_canvas = true;
    this.d_dirty_bgcanvas = true;
    this.d_dirty_area = null;

    this.d_node_in_panel = null;

    this.d_last_mouse = [0, 0];
    this.d_last_mouseclick = 0;

    if (this.d_onClear)
      this.onClear();
    //this.UIinit();
  }

  /**
  * assigns a graph, you can reasign graphs to the same canvas
  *
  * @method setGraph
  * @param {LGraph} graph
  */
  setGraph (graph, skip_clear)  {
    if (this.d_graph == graph)
      return;

    if (!skip_clear)
      this.clear();

    if (!graph && this.d_graph) {
      this.d_graph.detachCanvas(this);
      return;
    }

    graph.attachCanvas(this);
    this.setDirty(true, true);
  }

  /**
  * opens a graph contained inside a node in the current graph
  *
  * @method openSubgraph
  * @param {LGraph} graph
  */
  openSubgraph (graph)  {
    if (!graph)
      throw ("graph cannot be null");

    if (this.d_graph == graph)
      throw ("graph cannot be the same");

    this.clear();

    if (this.d_graph) {
      if (!this.d_graph_stack)
        this.d_graph_stack = [];
      this.d_graph_stack.push(this.d_graph);
    }

    graph.attachCanvas(this);
    this.setDirty(true, true);
  }

  /**
  * closes a subgraph contained inside a node 
  *
  * @method closeSubgraph
  * @param {LGraph} assigns a graph
  */
  closeSubgraph ()  {
    if (!this.d_graph_stack || this.d_graph_stack.length == 0)
      return;
    let graph = this.d_graph_stack.pop();
    graph.attachCanvas(this);
    this.setDirty(true, true);
  }

  /**
  * assigns a canvas
  *
  * @method setCanvas
  * @param {Canvas} assigns a canvas
  */
  setCanvas (canvas, skip_events)  {
    let that = this;

    if (canvas) {
      if (canvas.constructor === String) {
        canvas = document.getElementById(canvas);
        if (!canvas)
          throw ("Error creating LiteGraph canvas: Canvas not found");
      }
    }

    if (canvas === this.d_canvas)
      return;

    if (!canvas && this.d_canvas) {
      //maybe detach events from old_canvas
      if (!skip_events)
        this.unbindEvents();
    }

    this.d_canvas = canvas;

    if (!canvas)
      return;

    //this.d_canvas.tabindex = "1000";
    canvas.className += " lgraphcanvas";
    canvas.data = this;

    //bg canvas: used for non changing stuff
    this.d_bgcanvas = null;
    if (!this.d_bgcanvas) {
      this.d_bgcanvas = document.createElement("canvas");
      this.d_bgcanvas.width = this.d_canvas.width;
      this.d_bgcanvas.height = this.d_canvas.height;
    }

    if (canvas.getContext == null) {
      throw ("This browser doesnt support Canvas");
    }

    let ctx = this.d_ctx = canvas.getContext("2d");
    if (ctx == null) {
      console.warn("This canvas seems to be WebGL, enabling WebGL renderer");
      this.enableWebGL();
    }

    /*
    //input:  (move and up could be unbinded)
    this.d_mousemove_callback = this.d_processMouseMove.bind(this);
    this.d_mouseup_callback = this.d_processMouseUp.bind(this);

    if (!skip_events)
      this.bindEvents();
    */
  }

  //used in some events to capture them
  _doNothing (e)  { e.preventDefault(); return false; };
  _doReturnTrue (e)  { e.preventDefault(); return true; };

  bindEvents ()  {
    if (this.d_events_binded) {
      console.warn("LGraphCanvas: events already binded");
      return;
    }

    let canvas = this.d_canvas;

    this.d_mousedown_callback = this.d_processMouseDown.bind(this);
    this.d_mousewheel_callback = this.d_processMouseWheel.bind(this);

    canvas.addEventListener("mousedown", this.d_mousedown_callback, true); //down do not need to store the binded
    canvas.addEventListener("mousemove", this.d_mousemove_callback);
    canvas.addEventListener("mousewheel", this.d_mousewheel_callback, false);

    canvas.addEventListener("contextmenu", this.d_oNothing);
    canvas.addEventListener("DOMMouseScroll", this.d_mousewheel_callback, false);

    //touch events
    //if( 'touchstart' in document.documentElement )
    {
      canvas.addEventListener("touchstart", this.d_touchHandler, true);
      canvas.addEventListener("touchmove", this.d_touchHandler, true);
      canvas.addEventListener("touchend", this.d_touchHandler, true);
      canvas.addEventListener("touchcancel", this.d_touchHandler, true);
    }

    //Keyboard ******************
    this.d_key_callback = this.d_processKey.bind(this);

    canvas.addEventListener("keydown", this.d_key_callback);
    canvas.addEventListener("keyup", this.d_key_callback);

    //Droping Stuff over nodes ************************************
    this.d_ondrop_callback = this.d_processDrop.bind(this);

    canvas.addEventListener("dragover", this.d_oNothing, false);
    canvas.addEventListener("dragend", this.d_oNothing, false);
    canvas.addEventListener("drop", this.d_ondrop_callback, false);
    canvas.addEventListener("dragenter", this.d_oReturnTrue, false);

    this.d_events_binded = true;
  }

  unbindEvents ()  {
    if (!this.d_events_binded) {
      console.warn("LGraphCanvas: no events binded");
      return;
    }

    this.d_canvas.removeEventListener("mousedown", this.d_mousedown_callback);
    this.d_canvas.removeEventListener("mousewheel", this.d_mousewheel_callback);
    this.d_canvas.removeEventListener("DOMMouseScroll", this.d_mousewheel_callback);
    this.d_canvas.removeEventListener("keydown", this.d_key_callback);
    this.d_canvas.removeEventListener("keyup", this.d_key_callback);
    this.d_canvas.removeEventListener("contextmenu", this.d_oNothing);
    this.d_canvas.removeEventListener("drop", this.d_ondrop_callback);
    this.d_canvas.removeEventListener("dragenter", this.d_oReturnTrue);

    this.d_canvas.removeEventListener("touchstart", this.d_touchHandler);
    this.d_canvas.removeEventListener("touchmove", this.d_touchHandler);
    this.d_canvas.removeEventListener("touchend", this.d_touchHandler);
    this.d_canvas.removeEventListener("touchcancel", this.d_touchHandler);

    this.d_mousedown_callback = null;
    this.d_mousewheel_callback = null;
    this.d_key_callback = null;
    this.d_ondrop_callback = null;

    this.d_events_binded = false;
  }

  getFileExtension (url)  {
    let question = url.indexOf("?");
    if (question != -1)
      url = url.substr(0, question);
    let point = url.lastIndexOf(".");
    if (point == -1)
      return "";
    return url.substr(point + 1).toLowerCase();
  }

  //this file allows to render the canvas using WebGL instead of Canvas2D
  //this is useful if you plant to render 3D objects inside your nodes
  enableWebGL ()  {
    if (typeof (GL) === undefined)
      throw ("litegl.js must be included to use a WebGL canvas");
    if (typeof (enableWebGLCanvas) === undefined)
      throw ("webglCanvas.js must be included to use this feature");

    this.d_gl = this.d_ctx = enableWebGLCanvas(this.d_canvas);
    this.d_ctx.webgl = true;
    this.d_bgcanvas = this.d_canvas;
    this.d_bgctx = this.d_gl;
  }

  /**
  * marks as dirty the canvas, this way it will be rendered again 
  *
  * @class LGraphCanvas
  * @method setDirty
  * @param {bool} fgcanvas if the foreground canvas is dirty (the one containing the nodes)
  * @param {bool} bgcanvas if the background canvas is dirty (the one containing the wires)
  */
  setDirty (fgcanvas, bgcanvas)  {
    if (fgcanvas)
      this.d_dirty_canvas = true;
    if (bgcanvas)
      this.d_dirty_bgcanvas = true;
  }

  /**
  * Used to attach the canvas in a popup
  *
  * @method getCanvasWindow
  * @return {window} returns the window where the canvas is attached (the DOM root node)
  */
  getCanvasWindow ()  {
    if (!this.d_canvas)
      return window;
    let doc = this.d_canvas.ownerDocument;
    return doc.defaultView || doc.parentWindow;
  }

  /**
  * starts rendering the content of the canvas when needed
  *
  * @method startRendering
  */
  startRendering ()  {
    if (this.d_is_rendering) return; //already rendering

    this.d_is_rendering = true;
    renderFrame.call(this);

    function renderFrame() {
      if (!this.d_pause_rendering)
        this.draw();

      let window = this.getCanvasWindow();
      if (this.d_is_rendering)
        window.requestAnimationFrame(renderFrame.bind(this));
    }
  }

  /**
  * stops rendering the content of the canvas (to save resources)
  *
  * @method stopRendering
  */
  stopRendering ()  {
    this.d_is_rendering = false;
  }

  /* LiteGraphCanvas input */
  processMouseDown (e)  {
    if (!this.d_graph)
      return;

    this.adjustMouseEvent(e);

    let ref_window = this.getCanvasWindow();
    let document = ref_window.document;

    //move mouse move event to the window in case it drags outside of the canvas
    this.d_canvas.removeEventListener("mousemove", this.d_mousemove_callback);
    ref_window.document.addEventListener("mousemove", this.d_mousemove_callback, true); //catch for the entire window
    ref_window.document.addEventListener("mouseup", this.d_mouseup_callback, true);

    let n = this.d_graph.getNodeOnPos(e.canvasX, e.canvasY, this.d_visible_nodes);
    let skip_dragging = false;

    LiteGraph.closeAllContextMenus(ref_window);

    if (e.which == 1) { //left button mouse
      if (!e.shiftKey) { //REFACTOR: integrate with function
        //no node or another node selected
        if (!n || !this.d_selected_nodes[n.id]) {

          let todeselect = [];
          for (let i in this.d_selected_nodes)
            if (this.d_selected_nodes[i] != n)
              todeselect.push(this.d_selected_nodes[i]);

          //two passes to avoid problems modifying the container
          for (let i in todeselect)
            this.processNodeDeselected(todeselect[i]);
        }
      }
      let clicking_canvas_bg = false;

      //when clicked on top of a node
      //and it is not interactive
      if (n && this.d_allow_interaction) {
        if (!this.d_live_mode && !n.flags.pinned)
          this.bringToFront(n); //if it wasnt selected?
        let skip_action = false;

        //not dragging mouse to connect two slots
        if (!this.d_connecting_node &&
          !n.flags.collapsed &&
          !this.d_live_mode) {
          //search for outputs
          if (n.outputs)
            for (let i = 0, l = n.outputs.length; i < l; ++i) {
              let output = n.outputs[i];
              let link_pos = n.getConnectionPos(false, i);
              if (isInsideRectangle(e.canvasX, e.canvasY,
                link_pos[0] - 10, link_pos[1] - 5,
                20, 10)) {
                this.d_connecting_node = n;
                this.d_connecting_output = output;
                this.d_connecting_pos = n.getConnectionPos(false, i);
                this.d_connecting_slot = i;

                skip_action = true;
                break;
              }
            }

          //search for inputs
          if (n.inputs)
            for (let i = 0, l = n.inputs.length; i < l; ++i) {
              let input = n.inputs[i];
              let link_pos = n.getConnectionPos(true, i);
              if (isInsideRectangle(e.canvasX, e.canvasY,
                link_pos[0] - 10, link_pos[1] - 5,
                20, 10)) {
                if (input.link !== null) {
                  n.disconnectInput(i);
                  this.d_dirty_bgcanvas = true;
                  skip_action = true;
                }
              }
            }

          //Search for corner
          if (!skip_action &&
            isInsideRectangle(e.canvasX, e.canvasY,
              n.pos[0] + n.size[0] - 5, n.pos[1] + n.size[1] - 5,
              5, 5)) {
            this.d_resizing_node = n;
            this.d_canvas.style.cursor = "se-resize";
            skip_action = true;
          }
        }

        //Search for corner
        if (!skip_action &&
          isInsideRectangle(e.canvasX, e.canvasY,
            n.pos[0], n.pos[1] - LiteGraphStates.NODE_TITLE_HEIGHT,
            LiteGraphStates.NODE_TITLE_HEIGHT, LiteGraphStates.NODE_TITLE_HEIGHT)) {
          n.collapse();
          skip_action = true;
        }

        //it wasnt clicked on the links boxes
        if (!skip_action) {
          let block_drag_node = false;

          //double clicking
          let now = LiteGraph.getTime();
          if ((now - this.d_last_mouseclick) < 300 &&
            this.d_selected_nodes[n.id]) {
            //double click node
            if (n.onDblClick)
              n.onDblClick(e);
            this.processNodeDblClicked(n);
            block_drag_node = true;
          }

          //if do not capture mouse
          if (n.onMouseDown &&
            n.onMouseDown(e, [e.canvasX - n.pos[0], e.canvasY - n.pos[1]]))
            block_drag_node = true;
          else if (this.d_live_mode) {
            clicking_canvas_bg = true;
            block_drag_node = true;
          }

          if (!block_drag_node) {
            if (this.d_allow_dragnodes)
              this.d_node_dragged = n;

            if (!this.d_selected_nodes[n.id])
              this.processNodeSelected(n, e);
          }

          this.d_dirty_canvas = true;
        }
      }
      else
        clicking_canvas_bg = true;

      if (clicking_canvas_bg && this.d_allow_dragcanvas) {
        this.d_ragging_canvas = true;
      }
    }
    else if (e.which == 2) //middle button
    {

    }
    else if (e.which == 3) //right button
    {
      this.processContextMenu(n, e);
    }

    this.d_last_mouse[0] = e.localX;
    this.d_last_mouse[1] = e.localY;
    this.d_last_mouseclick = LiteGraph.getTime();
    this.d_canvas_mouse = [e.canvasX, e.canvasY];

    this.d_graph.change();

    //this is to ensure to defocus(blur) if a text input element is on focus
    if (!ref_window.document.activeElement ||
      (ref_window.document.activeElement.nodeName.toLowerCase() != "input" &&
        ref_window.document.activeElement.nodeName.toLowerCase() != "textarea"))
      e.preventDefault();
    e.stopPropagation();

    if (this.d_onMouseDown)
      this.onMouseDown(e);

    return false;
  }

  processMouseMove (e)  {

    if (this.d_autoresize) this.resize();

    if (!this.d_graph) return;

    this.adjustMouseEvent(e);
    let mouse = [e.localX, e.localY];
    let delta = [mouse[0] - this.d_last_mouse[0],
    mouse[1] - this.d_last_mouse[1]];
    this.d_last_mouse = mouse;
    this.d_canvas_mouse = [e.canvasX, e.canvasY];

    if (this.d_ragging_canvas) {
      this.d_offset[0] += delta[0] / this.d_scale;
      this.d_offset[1] += delta[1] / this.d_scale;
      this.d_dirty_canvas = true;
      this.d_dirty_bgcanvas = true;
    } else if (this.d_allow_interaction) {
      if (this.d_connecting_node) this.d_dirty_canvas = true;

      //get node over
      let n = this.d_graph.getNodeOnPos(e.canvasX, e.canvasY, this.d_visible_nodes);

      //remove mouseover flag
      for (let i = 0, l = this.d_graph._nodes.length; i < l; ++i) {
        if (this.d_graph._nodes[i].mouseOver && n != this.d_graph._nodes[i]) {
          //mouse leave
          this.d_graph._nodes[i].mouseOver = false;
          if (this.d_node_over && this.d_node_over.onMouseLeave)
            this.d_node_over.onMouseLeave(e);
          this.d_node_over = null;
          this.d_dirty_canvas = true;
        }
      }

      //mouse over a node
      if (n) {
        //this.d_canvas.style.cursor = "move";
        if (!n.mouseOver) {
          //mouse enter
          n.mouseOver = true;
          this.d_node_over = n;
          this.d_dirty_canvas = true;

          if (n.onMouseEnter) n.onMouseEnter(e);
        }

        if (n.onMouseMove) n.onMouseMove(e);

        //on top of input
        if (this.d_connecting_node) {
          let pos = this.d_highlight_input || [0, 0]; //to store the output of isOverNodeInput

          if (this.d_isOverNodeBox(n, e.canvasX, e.canvasY)) {
            //mouse on top of the corner box, dont know what to do
          } else {
            let slot = this.d_isOverNodeInput(n, e.canvasX, e.canvasY, pos);
            if (slot != -1 && n.inputs[slot]) {
              let slot_type = n.inputs[slot].type;
              if (LiteGraph.isValidConnection(this.d_connecting_output.type,
                slot_type)) {
                this.d_highlight_input = pos;
              }
            } else {
              this.d_highlight_input = null;
            }
          }
        }

        //Search for corner
        if (isInsideRectangle(e.canvasX, e.canvasY,
          n.pos[0] + n.size[0] - 5, n.pos[1] + n.size[1] - 5,
          5, 5)) {
          this.d_canvas.style.cursor = "se-resize";
        } else {
          this.d_canvas.style.cursor = null;
        }
      } else {
        this.d_canvas.style.cursor = null;
      }

      if (this.d_node_capturing_input &&
        this.d_node_capturing_input != n &&
        this.d_node_capturing_input.onMouseMove) {
        this.d_node_capturing_input.onMouseMove(e);
      }

      if (this.d_node_dragged && !this.d_live_mode) {
        for (let i in this.d_selected_nodes) {
          let n = this.d_selected_nodes[i];

          n.pos[0] += delta[0] / this.d_scale;
          n.pos[1] += delta[1] / this.d_scale;
        }

        this.d_dirty_canvas = true;
        this.d_dirty_bgcanvas = true;
      }

      if (this.d_resizing_node && !this.d_live_mode) {
        this.d_resizing_node.size[0] += delta[0] / this.d_scale;
        this.d_resizing_node.size[1] += delta[1] / this.d_scale;
        let max_slots = Math.max(this.d_resizing_node.inputs ? this.d_resizing_node.inputs.length : 0, this.d_resizing_node.outputs ? this.d_resizing_node.outputs.length : 0);
        if (this.d_resizing_node.size[1] < max_slots * LiteGraphStates.NODE_SLOT_HEIGHT + 4)
          this.d_resizing_node.size[1] = max_slots * LiteGraphStates.NODE_SLOT_HEIGHT + 4;
        if (this.d_resizing_node.size[0] < LiteGraphStates.NODE_MIN_WIDTH)
          this.d_resizing_node.size[0] = LiteGraphStates.NODE_MIN_WIDTH;

        this.d_canvas.style.cursor = "se-resize";
        this.d_dirty_canvas = true;
        this.d_dirty_bgcanvas = true;
      }
    }

    e.preventDefault();
    return false;
  }

  processMouseUp (e)  {
    if (!this.d_graph) return;

    let window = this.getCanvasWindow();
    let document = window.document;

    //restore the mousemove event back to the canvas
    document.removeEventListener("mousemove", this.d_mousemove_callback, true);
    this.d_canvas.addEventListener("mousemove", this.d_mousemove_callback, true);
    document.removeEventListener("mouseup", this.d_mouseup_callback, true);

    this.adjustMouseEvent(e);

    if (e.which == 1) //left button
    {
      //dragging a connection
      if (this.d_connecting_node) {
        this.d_dirty_canvas = true;
        this.d_dirty_bgcanvas = true;

        let node = this.d_graph.getNodeOnPos(e.canvasX, e.canvasY, this.d_visible_nodes);

        //node below mouse
        if (node) {
          if (this.d_connecting_output.type == LiteGraph.EVENT && this.d_isOverNodeBox(node, e.canvasX, e.canvasY)) {
            this.d_connecting_node.connect(this.d_connecting_slot, node, LiteGraph.EVENT);
          }
          else {
            //slot below mouse? connect
            let slot = this.d_isOverNodeInput(node, e.canvasX, e.canvasY);
            if (slot != -1) {
              this.d_connecting_node.connect(this.d_connecting_slot, node, slot);
            }
            else { //not on top of an input
              let input = node.getInputInfo(0);
              //auto connect
              if (this.d_connecting_output.type == LiteGraph.EVENT)
                this.d_connecting_node.connect(this.d_connecting_slot, node, LiteGraph.EVENT);
              else
                if (input && !input.link && input.type == this.d_connecting_output.type) //toLowerCase missing
                  this.d_connecting_node.connect(this.d_connecting_slot, node, 0);
            }
          }
        }

        this.d_connecting_output = null;
        this.d_connecting_pos = null;
        this.d_connecting_node = null;
        this.d_connecting_slot = -1;

      }//not dragging connection
      else if (this.d_resizing_node) {
        this.d_dirty_canvas = true;
        this.d_dirty_bgcanvas = true;
        this.d_resizing_node = null;
      }
      else if (this.d_node_dragged) //node being dragged?
      {
        this.d_dirty_canvas = true;
        this.d_dirty_bgcanvas = true;
        this.d_node_dragged.pos[0] = Math.round(this.d_node_dragged.pos[0]);
        this.d_node_dragged.pos[1] = Math.round(this.d_node_dragged.pos[1]);
        if (this.d_graph.config.align_to_grid)
          this.d_node_dragged.alignToGrid();
        this.d_node_dragged = null;
      }
      else //no node being dragged
      {
        this.d_dirty_canvas = true;
        this.d_ragging_canvas = false;

        if (this.d_node_over && this.d_node_over.onMouseUp)
          this.d_node_over.onMouseUp(e, [e.canvasX - this.d_node_over.pos[0], e.canvasY - this.d_node_over.pos[1]]);
        if (this.d_node_capturing_input && this.d_node_capturing_input.onMouseUp)
          this.d_node_capturing_input.onMouseUp(e, [e.canvasX - this.d_node_capturing_input.pos[0], e.canvasY - this.d_node_capturing_input.pos[1]]);
      }
    }
    else if (e.which == 2) //middle button
    {
      //trace("middle");
      this.d_dirty_canvas = true;
      this.d_ragging_canvas = false;
    }
    else if (e.which == 3) //right button
    {
      //trace("right");
      this.d_dirty_canvas = true;
      this.d_ragging_canvas = false;
    }

    /*
    if((this.d_dirty_canvas || this.d_dirty_bgcanvas) && this.d_rendering_timer_id == null)
        this.draw();
    */

    this.d_graph.change();

    e.stopPropagation();
    e.preventDefault();
    return false;
  }


  processMouseWheel (e)  {
    if (!this.d_graph || !this.d_allow_dragcanvas)
      return;

    let delta = (e.wheelDeltaY != null ? e.wheelDeltaY : e.detail * -60);

    this.adjustMouseEvent(e);

    let zoom = this.d_scale;

    if (delta > 0)
      zoom *= 1.1;
    else if (delta < 0)
      zoom *= 1 / (1.1);

    this.d_setZoom(zoom, [e.localX, e.localY]);

    /*
    if(this.d_rendering_timer_id == null)
        this.draw();
    */

    this.d_graph.change();

    e.preventDefault();
    return false; // prevent default
  }

  isOverNodeBox (node, canvasx, canvasy)  {
    let title_height = LiteGraph.NODE_TITLE_HEIGHT;
    if (isInsideRectangle(canvasx, canvasy, node.pos[0] + 2, node.pos[1] + 2 - title_height, title_height - 4, title_height - 4))
      return true;
    return false;
  }

  isOverNodeInput (node, canvasx, canvasy, slot_pos)  {
    if (node.inputs)
      for (let i = 0, l = node.inputs.length; i < l; ++i) {
        let input = node.inputs[i];
        let link_pos = node.getConnectionPos(true, i);
        if (isInsideRectangle(canvasx, canvasy, link_pos[0] - 10, link_pos[1] - 5, 20, 10)) {
          if (slot_pos) {
            slot_pos[0] = link_pos[0];
            slot_pos[1] = link_pos[1];
          }
          return i;
        }
      }
    return -1;
  }

  processKey (e)   {
    if (!this.d_graph)
      return;

    let block_default = false;

    if (e.type == "keydown") {
      //select all Control A
      if (e.keyCode == 65 && e.ctrlKey) {
        this.selectAllNodes();
        block_default = true;
      }

      //delete or backspace
      if (e.keyCode == 46 || e.keyCode == 8) {
        this.deleteSelectedNodes();
        block_default = true;
      }

      //collapse
      //...

      //TODO
      if (this.d_selected_nodes)
        for (let i in this.d_selected_nodes)
          if (this.d_selected_nodes[i].onKeyDown)
            this.d_selected_nodes[i].onKeyDown(e);
    }
    else if (e.type == "keyup") {
      if (this.d_selected_nodes)
        for (let i in this.d_selected_nodes)
          if (this.d_selected_nodes[i].onKeyUp)
            this.d_selected_nodes[i].onKeyUp(e);
    }

    this.d_graph.change();

    if (block_default) {
      e.preventDefault();
      return false;
    }
  }

  processDrop (e)  {
    e.preventDefault();
    this.adjustMouseEvent(e);


    let pos = [e.canvasX, e.canvasY];
    let node = this.d_graph.getNodeOnPos(pos[0], pos[1]);

    if (!node) {
      let r = null;
      if (this.d_onDropItem)
        r = this.onDropItem(event);
      if (!r)
        this.checkDropItem(e);
      return;
    }

    if (node.onDropFile || node.onDropData) {
      let files = e.dataTransfer.files;
      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          let file = e.dataTransfer.files[0];
          let filename = file.name;
          let ext = LGraphCanvas.getFileExtension(filename);
          //console.log(file);

          if (node.onDropFile)
            node.onDropFile(file);

          if (node.onDropData) {
            //prepare reader
            let reader = new FileReader();
            reader.onload = function (event) {
              //console.log(event.target);
              let data = event.target.result;
              node.onDropData(data, filename, file);
            };

            //read data
            let type = file.type.split("/")[0];
            if (type == "text" || type == "")
              reader.readAsText(file);
            else if (type == "image")
              reader.readAsDataURL(file);
            else
              reader.readAsArrayBuffer(file);
          }
        }
      }
    }

    if (node.onDropItem) {
      if (node.onDropItem(event))
        return true;
    }

    if (this.d_onDropItem)
      return this.onDropItem(event);

    return false;
  }

  //called if the graph doesnt have a default drop item behaviour
  checkDropItem (e)  {
    if (e.dataTransfer.files.length) {
      let file = e.dataTransfer.files[0];
      let ext = LGraphCanvas.getFileExtension(file.name).toLowerCase();
      let nodetype = LiteGraph.node_types_by_file_extension[ext];
      if (nodetype) {
        let node = LiteGraph.createNode(nodetype.type);
        node.pos = [e.canvasX, e.canvasY];
        this.d_graph.add(node);
        if (node.onDropFile)
          node.onDropFile(file);
      }
    }
  }


  processNodeSelected (n, e)  {
    n.selected = true;
    if (n.onSelected)
      n.onSelected();

    if (e && e.shiftKey) //add to selection
      this.d_selected_nodes[n.id] = n;
    else {
      this.d_selected_nodes = {};
      this.d_selected_nodes[n.id] = n;
    }

    this.d_dirty_canvas = true;

    if (this.d_onNodeSelected)
      this.onNodeSelected(n);

    //if(this.d_node_in_panel) this.d_showNodePanel(n);
  }

  processNodeDeselected (n)  {
    n.selected = false;
    if (n.onDeselected)
      n.onDeselected();

    delete this.d_selected_nodes[n.id];

    if (this.d_onNodeDeselected)
      this.onNodeDeselected(n);

    this.d_dirty_canvas = true;
  }

  processNodeDblClicked (n)  {
    if (this.d_onShowNodePanel)
      this.onShowNodePanel(n);

    if (this.d_onNodeDblClicked)
      this.onNodeDblClicked(n);

    this.setDirty(true);
  }

  selectNode (node)  {
    this.deselectAllNodes();

    if (!node)
      return;

    if (!node.selected && node.onSelected)
      node.onSelected();
    node.selected = true;
    this.d_selected_nodes[node.id] = node;
    this.setDirty(true);
  }

  selectAllNodes ()  {
    for (let i = 0; i < this.d_graph._nodes.length; ++i) {
      let n = this.d_graph._nodes[i];
      if (!n.selected && n.onSelected)
        n.onSelected();
      n.selected = true;
      this.d_selected_nodes[this.d_graph._nodes[i].id] = n;
    }

    this.setDirty(true);
  }

  deselectAllNodes ()  {
    for (let i in this.d_selected_nodes) {
      let n = this.d_selected_nodes;
      if (n.onDeselected)
        n.onDeselected();
      n.selected = false;
    }
    this.d_selected_nodes = {};
    this.setDirty(true);
  }

  deleteSelectedNodes ()  {
    for (let i in this.d_selected_nodes) {
      let m = this.d_selected_nodes[i];
      //if(m == this.d_node_in_panel) this.d_showNodePanel(null);
      this.d_graph.remove(m);
    }
    this.d_selected_nodes = {};
    this.setDirty(true);
  }

  centerOnNode (node)  {
    this.d_offset[0] = -node.pos[0] - node.size[0] * 0.5 + (this.d_canvas.width * 0.5 / this.d_scale);
    this.d_offset[1] = -node.pos[1] - node.size[1] * 0.5 + (this.d_canvas.height * 0.5 / this.d_scale);
    this.setDirty(true, true);
  }

  adjustMouseEvent (e)  {
    let b = this.d_canvas.getBoundingClientRect();
    e.localX = e.pageX - b.left;
    e.localY = e.pageY - b.top;

    e.canvasX = e.localX / this.d_scale - this.d_offset[0];
    e.canvasY = e.localY / this.d_scale - this.d_offset[1];
  }

  setZoom (value, zooming_center)  {
    if (!zooming_center)
      zooming_center = [this.d_canvas.width * 0.5, this.d_canvas.height * 0.5];

    let center = this.convertOffsetToCanvas(zooming_center);

    this.d_scale = value;

    if (this.d_scale > this.d_max_zoom)
      this.d_scale = this.d_max_zoom;
    else if (this.d_scale < this.d_min_zoom)
      this.d_scale = this.d_min_zoom;

    let new_center = this.convertOffsetToCanvas(zooming_center);
    let delta_offset = [new_center[0] - center[0], new_center[1] - center[1]];

    this.d_offset[0] += delta_offset[0];
    this.d_offset[1] += delta_offset[1];

    this.d_dirty_canvas = true;
    this.d_dirty_bgcanvas = true;
  }

  convertOffsetToCanvas (pos)  {
    return [pos[0] / this.d_scale - this.d_offset[0], pos[1] / this.d_scale - this.d_offset[1]];
  }

  convertCanvasToOffset (pos)  {
    return [(pos[0] + this.d_offset[0]) * this.d_scale,
    (pos[1] + this.d_offset[1]) * this.d_scale];
  }

  convertEventToCanvas (e)  {
    let rect = this.d_canvas.getClientRects()[0];
    return this.convertOffsetToCanvas([e.pageX - rect.left, e.pageY - rect.top]);
  }

  bringToFront (n)  {
    let i = this.d_graph.d_nodes.indexOf(n);
    if (i == -1) return;

    this.d_graph.d_nodes.splice(i, 1);
    this.d_graph.d_nodes.push(n);
  }

  sendToBack (n)  {
    let i = this.d_graph.d_nodes.indexOf(n);
    if (i == -1) return;

    this.d_graph.d_nodes.splice(i, 1);
    this.d_graph.d_nodes.unshift(n);
  }

  /* Interaction */



  /* LGraphCanvas render */
  computeVisibleNodes ()  {
    let visible_nodes = [];
    for (let i = 0, l = this.d_graph.d_nodes.length; i < l; ++i) {
      let n = this.d_graph.d_nodes[i];

      //skip rendering nodes in live mode
      if (this.d_live_mode && !n.onDrawBackground && !n.onDrawForeground)
        continue;

      if (!overlapBounding(this.d_visible_area, n.getBounding()))
        continue; //out of the visible area

      visible_nodes.push(n);
    }
    return visible_nodes;
  }

  draw (force_canvas, force_bgcanvas)  {
    if (!this.d_canvas)
      return;

    //fps counting
    let now = LiteGraph.getTime();
    this.d_render_time = (now - this.d_last_draw_time) * 0.001;
    this.d_last_draw_time = now;

    if (this.d_graph) {
      let start = [-this.d_offset[0], -this.d_offset[1]];
      let end = [start[0] + this.d_canvas.width / this.d_scale, start[1] + this.d_canvas.height / this.d_scale];
      this.visible_area = new Float32Array([start[0], start[1], end[0], end[1]]);
    }

    if (this.d_dirty_bgcanvas || force_bgcanvas || this.d_always_render_background || (this.d_graph && this.d_graph._last_trigger_time && (now - this.d_graph._last_trigger_time) < 1000))
      this.drawBackCanvas();

    if (this.d_dirty_canvas || force_canvas)
      this.drawFrontCanvas();

    this.d_fps = this.d_render_time ? (1.0 / this.d_render_time) : 0;
    this.d_frame += 1;
  }

  drawFrontCanvas ()  {
    if (!this.d_ctx)
      this.d_ctx = this.d_bgcanvas.getContext("2d");
    let ctx = this.d_ctx;
    if (!ctx) //maybe is using webgl...
      return;

    if (ctx.start2D)
      ctx.start2D();

    let canvas = this.d_canvas;

    //reset in case of error
    ctx.restore();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    //clip dirty area if there is one, otherwise work in full canvas
    if (this.d_dirty_area) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(this.d_dirty_area[0], this.d_dirty_area[1], this.d_dirty_area[2], this.d_dirty_area[3]);
      ctx.clip();
    }

    //clear
    //canvas.width = canvas.width;
    if (this.d_clear_background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw bg canvas
    if (this.d_bgcanvas == this.d_canvas)
      this.drawBackCanvas();
    else
      ctx.drawImage(this.d_bgcanvas, 0, 0);

    //rendering
    if (this.d_onRender)
      this.onRender(canvas, ctx);

    //info widget
    if (this.d_show_info)
      this.renderInfo(ctx);

    if (this.d_graph) {
      //apply transformations
      ctx.save();
      ctx.scale(this.d_scale, this.d_scale);
      ctx.translate(this.d_offset[0], this.d_offset[1]);

      //draw nodes
      let drawn_nodes = 0;
      let visible_nodes = this.computeVisibleNodes();
      this.d_visible_nodes = visible_nodes;

      for (let i = 0; i < visible_nodes.length; ++i) {
        let node = visible_nodes[i];

        //transform coords system
        ctx.save();
        ctx.translate(node.pos[0], node.pos[1]);

        //Draw
        this.drawNode(node, ctx);
        drawn_nodes += 1;

        //Restore
        ctx.restore();
      }

      //connections ontop?
      if (this.d_graph.config.links_ontop)
        if (!this.d_live_mode)
          this.drawConnections(ctx);

      //current connection
      if (this.d_connecting_pos != null) {
        ctx.lineWidth = this.d_connections_width;
        let link_color = null;
        switch (this.d_connecting_output.type) {
          case LiteGraph.EVENT: link_color = "#F85"; break;
          default:
            link_color = "#AFA";
        }
        this.renderLink(ctx, this.d_connecting_pos, [this.d_canvas_mouse[0], this.d_canvas_mouse[1]], link_color);

        ctx.beginPath();

        if (this.d_connecting_output.type === LiteGraph.EVENT)
          ctx.rect((this.d_connecting_pos[0] - 6) + 0.5, (this.d_connecting_pos[1] - 5) + 0.5, 14, 10);
        else
          ctx.arc(this.d_connecting_pos[0], this.d_connecting_pos[1], 4, 0, Math.PI * 2);

        /*
        if( this.d_connecting_output.round)
            ctx.arc( this.d_connecting_pos[0], this.d_connecting_pos[1],4,0,Math.PI*2);
        else
            ctx.rect( this.d_connecting_pos[0], this.d_connecting_pos[1],12,6);
        */
        ctx.fill();

        ctx.fillStyle = "#ffcc00";
        if (this.d_highlight_input) {
          ctx.beginPath();
          ctx.arc(this.d_highlight_input[0], this.d_highlight_input[1], 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    if (this.d_dirty_area) {
      ctx.restore();
      //this.d_dirty_area = null;
    }

    if (ctx.finish2D) //this is a function I use in webgl renderer
      ctx.finish2D();

    this.d_dirty_canvas = false;
  }

  renderInfo (ctx, x, y)  {
    x = x || 0;
    y = y || 0;

    ctx.save();
    ctx.translate(x, y);

    ctx.font = "10px Arial";
    ctx.fillStyle = "#888";
    if (this.d_graph) {
      ctx.fillText("T: " + this.d_graph.globaltime.toFixed(2) + "s", 5, 13 * 1);
      ctx.fillText("I: " + this.d_graph.iteration, 5, 13 * 2);
      ctx.fillText("F: " + this.d_frame, 5, 13 * 3);
      ctx.fillText("FPS:" + this.d_fps.toFixed(2), 5, 13 * 4);
    }
    else
      ctx.fillText("No graph selected", 5, 13 * 1);
    ctx.restore();
  }

  drawBackCanvas ()  {
    let canvas = this.d_bgcanvas;
    if (canvas.width != this.d_canvas.width ||
      canvas.height != this.d_canvas.height) {
      canvas.width = this.d_canvas.width;
      canvas.height = this.d_canvas.height;
    }

    if (!this.d_bgctx)
      this.d_bgctx = this.d_bgcanvas.getContext("2d");
    let ctx = this.d_bgctx;
    if (ctx.start)
      ctx.start();

    //clear
    if (this.d_clear_background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    //reset in case of error
    ctx.restore();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (this.d_graph) {
      //apply transformations
      ctx.save();
      ctx.scale(this.d_scale, this.d_scale);
      ctx.translate(this.d_offset[0], this.d_offset[1]);

      //render BG
      if (this.d_background_image && this.d_scale > 0.5) {
        ctx.globalAlpha = (1.0 - 0.5 / this.d_scale) * this.d_editor_alpha;
        ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.imageSmoothingEnabled = false;
        if (!this.d_bg_img || this.d_bg_img.name != this.d_background_image) {
          this._bg_img = new Image();
          this.d_bg_img.name = this.d_background_image;
          this.d_bg_img.src = this.d_background_image;
          let that = this;
          this.d_bg_img.onload = () => { 
            that.draw(true, true);
          }
        }

        let pattern = null;
        if (this.d_pattern == null && this.d_bg_img.width > 0) {
          pattern = ctx.createPattern(this.d_bg_img, 'repeat');
          this.d_pattern_img = this.d_bg_img;
          this.d_pattern = pattern;
        }
        else
          pattern = this.d_pattern;
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(this.d_visible_area[0], this.d_visible_area[1], this.d_visible_area[2] - this.d_visible_area[0], this.d_visible_area[3] - this.d_visible_area[1]);
          ctx.fillStyle = "transparent";
        }

        ctx.globalAlpha = 1.0;
        ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.imageSmoothingEnabled = true;
      }

      if (this.d_onBackgroundRender)
        this.onBackgroundRender(canvas, ctx);

      //DEBUG: show clipping area
      //ctx.fillStyle = "red";
      //ctx.fillRect( this.d_visible_area[0] + 10, this.d_visible_area[1] + 10, this.d_visible_area[2] - this.d_visible_area[0] - 20, this.d_visible_area[3] - this.d_visible_area[1] - 20);

      //bg
      ctx.strokeStyle = "#235";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      if (this.d_render_connections_shadows) {
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 6;
      }
      else
        ctx.shadowColor = "rgba(0,0,0,0)";

      //draw connections
      if (!this.d_live_mode)
        this.drawConnections(ctx);

      ctx.shadowColor = "rgba(0,0,0,0)";

      //restore state
      ctx.restore();
    }

    if (ctx.finish)
      ctx.finish();

    this.d_dirty_bgcanvas = false;
    this.d_dirty_canvas = true; //to force to repaint the front canvas with the bgcanvas 
  }

  /* Renders the LGraphNode on the canvas */
  drawNode (node, ctx)  {
    let glow = false;

    let color = node.color || LiteGraph.NODE_DEFAULT_COLOR;
    //if (this.d_selected) color = "#88F";

    let render_title = true;
    if (node.flags.skip_title_render || node.graph.isLive())
      render_title = false;
    if (node.mouseOver)
      render_title = true;

    //shadow and glow
    if (node.mouseOver) glow = true;

    if (node.selected) {
      /*
      ctx.shadowColor = "#EEEEFF";//glow ? "#AAF" : "#000";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 1;
      */
    }
    else if (this.d_render_shadows) {
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
    }
    else
      ctx.shadowColor = "transparent";

    //only render if it forces it to do it
    if (this.d_live_mode) {
      if (!node.flags.collapsed) {
        ctx.shadowColor = "transparent";
        //if(node.onDrawBackground)
        //	node.onDrawBackground(ctx);
        if (node.onDrawForeground)
          node.onDrawForeground(ctx);
      }

      return;
    }

    //draw in collapsed form
    /*
    if(node.flags.collapsed)
    {
        if(!node.onDrawCollapsed || node.onDrawCollapsed(ctx) == false)
            this.d_rawNodeCollapsed(node, ctx, color, node.bgcolor);
        return;
    }
    */

    let editor_alpha = this.d_editor_alpha;
    ctx.globalAlpha = editor_alpha;

    //clip if required (mask)
    let shape = node.shape || "box";
    let size = new Float32Array(node.size);
    if (node.flags.collapsed) {
      size[0] = LiteGraph.NODE_COLLAPSED_WIDTH;
      size[1] = 0;
    }

    //Start clipping
    if (node.flags.clip_area) {
      ctx.save();
      if (shape == "box") {
        ctx.beginPath();
        ctx.rect(0, 0, size[0], size[1]);
      }
      else if (shape == "round") {
        ctx.roundRect(0, 0, size[0], size[1], 10);
      }
      else if (shape == "circle") {
        ctx.beginPath();
        ctx.arc(size[0] * 0.5, size[1] * 0.5, size[0] * 0.5, 0, Math.PI * 2);
      }
      ctx.clip();
    }

    //draw shape
    this.d_rawNodeShape(node, ctx, size, color, node.bgcolor, !render_title, node.selected);
    ctx.shadowColor = "transparent";

    //connection slots
    ctx.textAlign = "left";
    ctx.font = this.d_inner_text_font;

    let render_text = this.d_scale > 0.6;

    let out_slot = this.d_connecting_output;

    //render inputs and outputs
    if (!node.flags.collapsed) {
      //input connection slots
      if (node.inputs)
        for (let i = 0; i < node.inputs.length; i++) {
          let slot = node.inputs[i];

          ctx.globalAlpha = editor_alpha;
          //change opacity of incompatible slots
          if (this.d_connecting_node && LiteGraph.isValidConnection(slot.type && out_slot.type))
            ctx.globalAlpha = 0.4 * editor_alpha;

          ctx.fillStyle = slot.link != null ? "#7F7" : "#AAA";

          let pos = node.getConnectionPos(true, i);
          pos[0] -= node.pos[0];
          pos[1] -= node.pos[1];

          ctx.beginPath();

          if (slot.type === LiteGraph.EVENT)
            ctx.rect((pos[0] - 6) + 0.5, (pos[1] - 5) + 0.5, 14, 10);
          else
            ctx.arc(pos[0], pos[1], 4, 0, Math.PI * 2);

          ctx.fill();

          //render name
          if (render_text) {
            let text = slot.label != null ? slot.label : slot.name;
            if (text) {
              ctx.fillStyle = color;
              ctx.fillText(text, pos[0] + 10, pos[1] + 5);
            }
          }
        }

      //output connection slots
      if (this.d_connecting_node)
        ctx.globalAlpha = 0.4 * editor_alpha;

      ctx.lineWidth = 1;

      ctx.textAlign = "right";
      ctx.strokeStyle = "black";
      if (node.outputs)
        for (let i = 0; i < node.outputs.length; i++) {
          let slot = node.outputs[i];

          let pos = node.getConnectionPos(false, i);
          pos[0] -= node.pos[0];
          pos[1] -= node.pos[1];

          ctx.fillStyle = slot.links && slot.links.length ? "#7F7" : "#AAA";
          ctx.beginPath();
          //ctx.rect( node.size[0] - 14,i*14,10,10);

          if (slot.type === LiteGraph.EVENT)
            ctx.rect((pos[0] - 6) + 0.5, (pos[1] - 5) + 0.5, 14, 10);
          else
            ctx.arc(pos[0], pos[1], 4, 0, Math.PI * 2);

          //trigger
          //if(slot.node_id != null && slot.slot == -1)
          //	ctx.fillStyle = "#F85";

          //if(slot.links != null && slot.links.length)
          ctx.fill();
          ctx.stroke();

          //render output name
          if (render_text) {
            let text = slot.label != null ? slot.label : slot.name;
            if (text) {
              ctx.fillStyle = color;
              ctx.fillText(text, pos[0] - 10, pos[1] + 5);
            }
          }
        }

      ctx.textAlign = "left";
      ctx.globalAlpha = 1;

      if (node.onDrawForeground)
        node.onDrawForeground(ctx);
    }//!collapsed

    if (node.flags.clip_area)
      ctx.restore();

    ctx.globalAlpha = 1.0;
  }

  /* Renders the node shape */
  drawNodeShape (node, ctx, size, fgcolor, bgcolor, no_title, selected)  {
    //bg rect
    ctx.strokeStyle = fgcolor || LiteGraph.NODE_DEFAULT_COLOR;
    ctx.fillStyle = bgcolor || LiteGraph.NODE_DEFAULT_BGCOLOR;

    /* gradient test
    let grad = ctx.createLinearGradient(0,0,0,node.size[1]);
    grad.addColorStop(0, "#AAA");
    grad.addColorStop(0.5, fgcolor || LiteGraph.NODE_DEFAULT_COLOR);
    grad.addColorStop(1, bgcolor || LiteGraph.NODE_DEFAULT_BGCOLOR);
    ctx.fillStyle = grad;
    //*/

    let title_height = LiteGraph.NODE_TITLE_HEIGHT;

    //render depending on shape
    let shape = node.shape || "box";
    if (shape == "box") {
      ctx.beginPath();
      ctx.rect(0, no_title ? 0 : -title_height, size[0] + 1, no_title ? size[1] : size[1] + title_height);
      ctx.fill();
      ctx.shadowColor = "transparent";

      if (selected) {
        ctx.strokeStyle = "#CCC";
        ctx.strokeRect(-0.5, no_title ? -0.5 : -title_height + -0.5, size[0] + 2, no_title ? (size[1] + 2) : (size[1] + title_height + 2) - 1);
        ctx.strokeStyle = fgcolor;
      }
    }
    else if (node.shape == "round") {
      ctx.roundRect(0, no_title ? 0 : -title_height, size[0], no_title ? size[1] : size[1] + title_height, 10);
      ctx.fill();
    }
    else if (node.shape == "circle") {
      ctx.beginPath();
      ctx.arc(size[0] * 0.5, size[1] * 0.5, size[0] * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowColor = "transparent";

    //ctx.stroke();

    //image
    if (node.bgImage && node.bgImage.width)
      ctx.drawImage(node.bgImage, (size[0] - node.bgImage.width) * 0.5, (size[1] - node.bgImage.height) * 0.5);

    if (node.bgImageUrl && !node.bgImage)
      node.bgImage = node.loadImage(node.bgImageUrl);

    if (node.onDrawBackground)
      node.onDrawBackground(ctx);

    //title bg (remember, it is rendered ABOVE the node
    if (!no_title) {
      ctx.fillStyle = fgcolor || LiteGraph.NODE_DEFAULT_COLOR;
      let old_alpha = ctx.globalAlpha;
      ctx.globalAlpha = 0.5 * old_alpha;
      if (shape == "box") {
        ctx.beginPath();
        ctx.rect(0, -title_height, size[0] + 1, title_height);
        ctx.fill()
        //ctx.stroke();
      }
      else if (shape == "round") {
        ctx.roundRect(0, -title_height, size[0], title_height, 10, 0);
        //ctx.fillRect(0,8,size[0],NODE_TITLE_HEIGHT - 12);
        ctx.fill();
        //ctx.stroke();
      }

      //title box
      ctx.fillStyle = node.boxcolor || LiteGraph.NODE_DEFAULT_BOXCOLOR;
      ctx.beginPath();
      if (shape == "round")
        ctx.arc(title_height * 0.5, title_height * -0.5, (title_height - 6) * 0.5, 0, Math.PI * 2);
      else
        ctx.rect(3, -title_height + 3, title_height - 6, title_height - 6);
      ctx.fill();
      ctx.globalAlpha = old_alpha;

      //title text
      ctx.font = this.d_title_text_font;
      let title = node.getTitle();
      if (title && this.d_scale > 0.5) {
        ctx.fillStyle = LiteGraph.NODE_TITLE_COLOR;
        ctx.fillText(title, 16, 13 - title_height);
      }
    }
  }

  /* Renders the node when collapsed */
  drawNodeCollapsed (node, ctx, fgcolor, bgcolor)  {
    //draw default collapsed shape
    ctx.strokeStyle = fgcolor || LiteGraph.NODE_DEFAULT_COLOR;
    ctx.fillStyle = bgcolor || LiteGraph.NODE_DEFAULT_BGCOLOR;

    let collapsed_radius = LiteGraph.NODE_COLLAPSED_RADIUS;

    //circle shape
    let shape = node.shape || "box";
    if (shape == "circle") {
      ctx.beginPath();
      ctx.arc(node.size[0] * 0.5, node.size[1] * 0.5, collapsed_radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = "rgba(0,0,0,0)";
      ctx.stroke();

      ctx.fillStyle = node.boxcolor || LiteGraph.NODE_DEFAULT_BOXCOLOR;
      ctx.beginPath();
      ctx.arc(node.size[0] * 0.5, node.size[1] * 0.5, collapsed_radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    else if (shape == "round") //rounded box
    {
      ctx.beginPath();
      ctx.roundRect(node.size[0] * 0.5 - collapsed_radius, node.size[1] * 0.5 - collapsed_radius, 2 * collapsed_radius, 2 * collapsed_radius, 5);
      ctx.fill();
      ctx.shadowColor = "rgba(0,0,0,0)";
      ctx.stroke();

      ctx.fillStyle = node.boxcolor || LiteGraph.NODE_DEFAULT_BOXCOLOR;
      ctx.beginPath();
      ctx.roundRect(node.size[0] * 0.5 - collapsed_radius * 0.5, node.size[1] * 0.5 - collapsed_radius * 0.5, collapsed_radius, collapsed_radius, 2);
      ctx.fill();
    }
    else //flat box
    {
      ctx.beginPath();
      //ctx.rect(node.size[0] * 0.5 - collapsed_radius, node.size[1] * 0.5 - collapsed_radius, 2*collapsed_radius, 2*collapsed_radius);
      ctx.rect(0, 0, node.size[0], collapsed_radius * 2);
      ctx.fill();
      ctx.shadowColor = "rgba(0,0,0,0)";
      ctx.stroke();

      ctx.fillStyle = node.boxcolor || LiteGraph.NODE_DEFAULT_BOXCOLOR;
      ctx.beginPath();
      //ctx.rect(node.size[0] * 0.5 - collapsed_radius*0.5, node.size[1] * 0.5 - collapsed_radius*0.5, collapsed_radius,collapsed_radius);
      ctx.rect(collapsed_radius * 0.5, collapsed_radius * 0.5, collapsed_radius, collapsed_radius);
      ctx.fill();
    }
  }

  //OPTIMIZE THIS: precatch connections position instead of recomputing them every time
  drawConnections (ctx)  {
    let now = LiteGraph.getTime();

    //draw connections
    ctx.lineWidth = this.d_connections_width;

    ctx.fillStyle = "#AAA";
    ctx.strokeStyle = "#AAA";
    ctx.globalAlpha = this.d_editor_alpha;
    //for every node
    for (let n = 0, l = this.d_graph._nodes.length; n < l; ++n) {
      let node = this.d_graph._nodes[n];
      //for every input (we render just inputs because it is easier as every slot can only have one input)
      if (node.inputs && node.inputs.length)
        for (let i = 0; i < node.inputs.length; ++i) {
          let input = node.inputs[i];
          if (!input || input.link == null)
            continue;
          let link_id = input.link;
          let link = this.d_graph.links[link_id];
          if (!link)
            continue;

          let start_node = this.d_graph.getNodeById(link.origin_id);
          if (start_node == null) continue;
          let start_node_slot = link.origin_slot;
          let start_node_slotpos = null;

          if (start_node_slot == -1)
            start_node_slotpos = [start_node.pos[0] + 10, start_node.pos[1] + 10];
          else
            start_node_slotpos = start_node.getConnectionPos(false, start_node_slot);

          let color = LGraphCanvas.link_type_colors[node.inputs[i].type] || this.d_efault_link_color;

          this.d_renderLink(ctx, start_node_slotpos, node.getConnectionPos(true, i), color);

          if (link && link._last_time && now - link._last_time < 1000) {
            let f = 2.0 - (now - link._last_time) * 0.002;
            let color = "rgba(255,255,255, " + f.toFixed(2) + ")";
            this.d_renderLink(ctx, start_node_slotpos, node.getConnectionPos(true, i), color, true, f);
          }
        }
    }
    ctx.globalAlpha = 1;
  }

  renderLink (ctx, a, b, color, skip_border, flow)  {
    if (!this.d_highquality_render) {
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
      return;
    }

    let dist = distance(a, b);

    if (this.d_render_connections_border && this.d_scale > 0.6)
      ctx.lineWidth = this.d_connections_width + 4;

    ctx.beginPath();

    if (this.d_render_curved_connections) //splines
    {
      ctx.moveTo(a[0], a[1]);
      ctx.bezierCurveTo(a[0] + dist * 0.25, a[1],
        b[0] - dist * 0.25, b[1],
        b[0], b[1]);
    }
    else //lines
    {
      ctx.moveTo(a[0] + 10, a[1]);
      ctx.lineTo(((a[0] + 10) + (b[0] - 10)) * 0.5, a[1]);
      ctx.lineTo(((a[0] + 10) + (b[0] - 10)) * 0.5, b[1]);
      ctx.lineTo(b[0] - 10, b[1]);
    }

    if (this.d_render_connections_border && this.d_scale > 0.6 && !skip_border) {
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.stroke();
    }

    ctx.lineWidth = this.d_connections_width;
    ctx.fillStyle = ctx.strokeStyle = color;
    ctx.stroke();

    //no symbols
    if (!this.d_render_connection_arrows || this.d_scale < 0.6)
      return;

    //render arrow
    if (this.d_render_connection_arrows && this.d_scale > 0.6) {
      let pos = this.d_computeConnectionPoint(a, b, 0.5);
      let pos2 = this.d_computeConnectionPoint(a, b, 0.51);

      //get two points in the bezier curve
      let angle = 0;
      if (this.d_render_curved_connections)
        angle = -Math.atan2(pos2[0] - pos[0], pos2[1] - pos[1]);
      else
        angle = b[1] > a[1] ? 0 : Math.PI;

      ctx.save();
      ctx.translate(pos[0], pos[1]);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(0, +5);
      ctx.lineTo(+5, -5);
      ctx.fill();
      ctx.restore();
    }

    if (flow) {
      for (let i = 0; i < 5; ++i) {
        let f = (LiteGraph.getTime() * 0.001 + (i * 0.2)) % 1;
        let pos = this.computeConnectionPoint(a, b, f);
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  computeConnectionPoint (a, b, t)  {
    let dist = distance(a, b);
    let p0 = a;
    let p1 = [a[0] + dist * 0.25, a[1]];
    let p2 = [b[0] - dist * 0.25, b[1]];
    let p3 = b;

    let c1 = (1 - t) * (1 - t) * (1 - t);
    let c2 = 3 * ((1 - t) * (1 - t)) * t;
    let c3 = 3 * (1 - t) * (t * t);
    let c4 = t * t * t;

    let x = c1 * p0[0] + c2 * p1[0] + c3 * p2[0] + c4 * p3[0];
    let y = c1 * p0[1] + c2 * p1[1] + c3 * p2[1] + c4 * p3[1];
    return [x, y];
  }

  /*
  resizeCanvas (width,height)
  {
    this.d_canvas.width = width;
    if(height)
        this.d_canvas.height = height;
  
    this.d_bgcanvas.width = this.d_canvas.width;
    this.d_bgcanvas.height = this.d_canvas.height;
    this.draw(true,true);
  }
  */

  resize (width, height)  {
    if (!width && !height) {
      let parent = this.d_canvas.parentNode;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
    }

    if (this.d_canvas.width == width && this.d_canvas.height == height)
      return;

    this.d_canvas.width = width;
    this.d_canvas.height = height;
    this.d_bgcanvas.width = this.d_canvas.width;
    this.d_bgcanvas.height = this.d_canvas.height;
    this.setDirty(true, true);
  }


  switchLiveMode (transition)  {
    if (!transition) {
      this.d_live_mode = !this.d_live_mode;
      this.d_dirty_canvas = true;
      this.d_dirty_bgcanvas = true;
      return;
    }

    let self = this;
    let delta = this.d_live_mode ? 1.1 : 0.9;
    if (this.d_live_mode) {
      this.d_live_mode = false;
      this.d_editor_alpha = 0.1;
    }

    let t = setInterval(function () {
      self.editor_alpha *= delta;
      self.dirty_canvas = true;
      self.dirty_bgcanvas = true;

      if (delta < 1 && self.editor_alpha < 0.01) {
        clearInterval(t);
        if (delta < 1)
          self.live_mode = true;
      }
      if (delta > 1 && self.editor_alpha > 0.99) {
        clearInterval(t);
        self.editor_alpha = 1;
      }
    }, 1);
  }

  onNodeSelectionChange (node)  {
    return; //disabled
    //if(this.d_node_in_panel) this.d_showNodePanel(node);
  }

  touchHandler (event)  {
    //alert("foo");
    let touches = event.changedTouches,
      first = touches[0],
      type = "";

    switch (event.type) {
      case "touchstart": type = "mousedown"; break;
      case "touchmove": type = "mousemove"; break;
      case "touchend": type = "mouseup"; break;
      default: return;
    }

    //initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //           screenX, screenY, clientX, clientY, ctrlKey,
    //           altKey, shiftKey, metaKey, button, relatedTarget);

    let window = this.getCanvasWindow();
    let document = window.document;

    let simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
      first.screenX, first.screenY,
      first.clientX, first.clientY, false,
      false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }

  /* CONTEXT MENU ********************/

  static onMenuAdd (node, e, prev_menu, canvas, first_event)  {
    let ref_window = canvas.getCanvasWindow();

    let values = LiteGraph.getNodeTypesCategories();
    let entries = {};
    for (let i in values)
      if (values[i])
        entries[i] = { value: values[i], content: values[i], is_menu: true };

    let menu = LiteGraph.createContextMenu(entries, { event: e, callback: inner_clicked, from: prev_menu }, ref_window);

    function inner_clicked(v, e) {
      let category = v.value;
      let node_types = LiteGraph.getNodeTypesInCategory(category);
      let values = [];
      for (let i in node_types)
        values.push({ content: node_types[i].title, value: node_types[i].type });

      LiteGraph.createContextMenu(values, { event: e, callback: inner_create, from: menu }, ref_window);
      return false;
    }

    function inner_create(v, e) {
      let node = LiteGraph.createNode(v.value);
      if (node) {
        node.pos = canvas.convertEventToCanvas(first_event);
        canvas.graph.add(node);
      }
    }

    return false;
  }

  static showMenuNodeInputs (node, e, prev_menu)  {
    if (!node)
      return;

    let that = this;
    let ref_window = this.getCanvasWindow();

    let options = node.optional_inputs;
    if (node.onGetInputs)
      options = node.onGetInputs();

    let entries = [];
    if (options)
      for (let i in options) {
        let entry = options[i];
        if (!entry) {
          entries.push(null);
          continue;
        }
        let label = entry[0];
        if (entry[2] && entry[2].label)
          label = entry[2].label;
        entries.push({ content: label, value: entry });
      }

    if (this.d_onMenuNodeInputs)
      entries = this.onMenuNodeInputs(entries);

    if (!entries.length)
      return;

    let menu = LiteGraph.createContextMenu(entries, { event: e, callback: inner_clicked, from: prev_menu }, ref_window);

    function inner_clicked(v, e, prev) {
      if (!node)
        return;

      if (v.callback)
        v.callback.call(that, node, v, e, prev);

      if (v.value)
        node.addInput(v.value[0], v.value[1], v.value[2]);
    }

    return false;
  }

  static showMenuNodeOutputs (node, e, prev_menu)  {
    if (!node)
      return;

    let that = this;
    let ref_window = this.getCanvasWindow();

    let options = node.optional_outputs;
    if (node.onGetOutputs)
      options = node.onGetOutputs();

    let entries = [];
    if (options)
      for (let i in options) {
        let entry = options[i];
        if (!entry) //separator?
        {
          entries.push(null);
          continue;
        }

        if (node.findOutputSlot(entry[0]) != -1)
          continue; //skip the ones already on
        let label = entry[0];
        if (entry[2] && entry[2].label)
          label = entry[2].label;
        let data = { content: label, value: entry };
        if (entry[1] == LiteGraph.EVENT)
          data.className = "event";
        entries.push(data);
      }

    if (this.d_onMenuNodeOutputs)
      entries = this.onMenuNodeOutputs(entries);

    if (!entries.length)
      return;

    let menu = LiteGraph.createContextMenu(entries, { event: e, callback: inner_clicked, from: prev_menu }, ref_window);

    function inner_clicked(v, e, prev) {
      if (!node)
        return;

      if (v.callback)
        v.callback.call(that, node, v, e, prev);

      if (!v.value)
        return;

      let value = v.value[1];

      if (value && (value.constructor === Object || value.constructor === Array)) //submenu why?
      {
        let entries = [];
        for (let i in value)
          entries.push({ content: i, value: value[i] });
        LiteGraph.createContextMenu(entries, { event: e, callback: inner_clicked, from: prev_menu });
        return false;
      }
      else
        node.addOutput(v.value[0], v.value[1], v.value[2]);
    }

    return false;
  }

  static onShowMenuNodeProperties (node, e, prev_menu)  {
    if (!node || !node.properties)
      return;

    let that = this;
    let ref_window = this.getCanvasWindow();

    let entries = [];
    for (let i in node.properties) {
      let value = node.properties[i] !== undefined ? node.properties[i] : " ";
      //value could contain invalid html characters, clean that
      value = LGraphCanvas.decodeHTML(value);
      entries.push({ content: "<span class='property_name'>" + i + "</span>" + "<span class='property_value'>" + value + "</span>", value: i });
    }
    if (!entries.length)
      return;

    let menu = LiteGraph.createContextMenu(entries, { event: e, callback: inner_clicked, from: prev_menu, allow_html: true }, ref_window);

    function inner_clicked(v, e, prev) {
      if (!node)
        return;
      that.showEditPropertyValue(node, v.value, { event: e });
    }

    return false;
  }

  static decodeHTML (str)  {
    let e = document.createElement("div");
    e.innerText = str;
    return e.innerHTML;
  }

  static onShowTitleEditor (node, event)  {
    let input_html = "";

    let dialog = document.createElement("div");
    dialog.className = "graphdialog";
    dialog.innerHTML = "<span class='name'>Title</span><input autofocus type='text' class='value'/><button>OK</button>";
    let input = dialog.querySelector("input");
    if (input) {
      input.value = node.title;
      input.addEventListener("keydown", function (e) {
        if (e.keyCode != 13)
          return;
        inner();
        e.preventDefault();
        e.stopPropagation();
      });
    }

    let rect = this.d_canvas.getClientRects()[0];
    let offsetx = -20;
    let offsety = -20;
    if (rect) {
      offsetx -= rect.left;
      offsety -= rect.top;
    }

    if (event) {
      dialog.style.left = (event.pageX + offsetx) + "px";
      dialog.style.top = (event.pageY + offsety) + "px";
    }
    else {
      dialog.style.left = (this.d_canvas.width * 0.5 + offsetx) + "px";
      dialog.style.top = (this.d_canvas.height * 0.5 + offsety) + "px";
    }

    let button = dialog.querySelector("button");
    button.addEventListener("click", inner);
    this.d_canvas.parentNode.appendChild(dialog);

    function inner() {
      setValue(input.value);
    }

    function setValue(value) {
      node.title = value;
      dialog.parentNode.removeChild(dialog);
      node.setDirtyCanvas(true, true);
    }
  }

  showEditPropertyValue (node, property, options)  {
    if (!node || node.properties[property] === undefined)
      return;

    options = options || {};
    let that = this;

    let type = "string";

    if (node.properties[property] !== null)
      type = typeof (node.properties[property]);

    let info = null;
    if (node.getPropertyInfo)
      info = node.getPropertyInfo(property);
    if (node.properties_info) {
      for (let i = 0; i < node.properties_info.length; ++i) {
        if (node.properties_info[i].name == property) {
          info = node.properties_info[i];
          break;
        }
      }
    }

    if (info !== undefined && info !== null && info.type)
      type = info.type;

    let input_html = "";

    if (type == "string" || type == "number")
      input_html = "<input autofocus type='text' class='value'/>";
    else if (type == "enum" && info.values) {
      input_html = "<select autofocus type='text' class='value'>";
      for (let i in info.values) {
        let v = info.values.constructor === Array ? info.values[i] : i;
        input_html += "<option value='" + v + "' " + (v == node.properties[property] ? "selected" : "") + ">" + info.values[i] + "</option>";
      }
      input_html += "</select>";
    }
    else if (type == "boolean") {
      input_html = "<input autofocus type='checkbox' class='value' " + (node.properties[property] ? "checked" : "") + "/>";
    }


    let dialog = document.createElement("div");
    dialog.className = "graphdialog";
    dialog.innerHTML = "<span class='name'>" + property + "</span>" + input_html + "<button>OK</button>";

    if (type == "enum" && info.values) {
      let input = dialog.querySelector("select");
      input.addEventListener("change", function (e) {
        setValue(e.target.value);
        //let index = e.target.value;
        //setValue( e.options[e.selectedIndex].value );
      });
    }
    else if (type == "boolean") {
      let input = dialog.querySelector("input");
      if (input) {
        input.addEventListener("click", function (e) {
          setValue(!!input.checked);
        });
      }
    }
    else {
      let input = dialog.querySelector("input");
      if (input) {
        input.value = node.properties[property] !== undefined ? node.properties[property] : "";
        input.addEventListener("keydown", function (e) {
          if (e.keyCode != 13)
            return;
          inner();
          e.preventDefault();
          e.stopPropagation();
        });
      }
    }

    let rect = this.d_canvas.getClientRects()[0];
    let offsetx = -20;
    let offsety = -20;
    if (rect) {
      offsetx -= rect.left;
      offsety -= rect.top;
    }

    if (options.event) {
      dialog.style.left = (options.event.pageX + offsetx) + "px";
      dialog.style.top = (options.event.pageY + offsety) + "px";
    }
    else {
      dialog.style.left = (this.d_canvas.width * 0.5 + offsetx) + "px";
      dialog.style.top = (this.d_canvas.height * 0.5 + offsety) + "px";
    }

    let button = dialog.querySelector("button");
    button.addEventListener("click", inner);

    this.d_canvas.parentNode.appendChild(dialog);


    function inner() {
      setValue(input.value);
    }

    function setValue(value) {
      if (typeof (node.properties[property]) == "number")
        value = Number(value);
      node.properties[property] = value;

      if (node.onPropertyChanged)
        node.onPropertyChanged(property, value);
      dialog.parentNode.removeChild(dialog);
      node.setDirtyCanvas(true, true);
    }
  }

  static onMenuNodeCollapse (node)  {
    node.flags.collapsed = !node.flags.collapsed;
    node.setDirtyCanvas(true, true);
  }

  static onMenuNodePin (node)  {
    node.pin();
  }

  static onMenuNodeMode (node, e, prev_menu)  {
    LiteGraph.createContextMenu(["Always", "On Event", "Never"], { event: e, callback: inner_clicked, from: prev_menu });

    function inner_clicked(v) {
      if (!node)
        return;
      switch (v) {
        case "On Event": node.mode = LiteGraph.ON_EVENT; break;
        case "Never": node.mode = LiteGraph.NEVER; break;
        case "Always":
        default:
          node.mode = LiteGraph.ALWAYS; break;
      }
    }

    return false;
  }

  static onMenuNodeColors (node, e, prev_menu)  {
    let values = [];
    for (let i in LGraphCanvas.node_colors) {
      let color = LGraphCanvas.node_colors[i];
      let value = { value: i, content: "<span style='display: block; color:" + color.color + "; background-color:" + color.bgcolor + "'>" + i + "</span>" };
      values.push(value);
    }
    LiteGraph.createContextMenu(values, { event: e, callback: inner_clicked, from: prev_menu });

    function inner_clicked(v) {
      if (!node) return;
      let color = LGraphCanvas.node_colors[v.value];
      if (color) {
        node.color = color.color;
        node.bgcolor = color.bgcolor;
        node.setDirtyCanvas(true);
      }
    }

    return false;
  }

  static onMenuNodeShapes (node, e)  {
    LiteGraph.createContextMenu(["box", "round"], { event: e, callback: inner_clicked });

    function inner_clicked(v) {
      if (!node) return;
      node.shape = v;
      node.setDirtyCanvas(true);
    }

    return false;
  }

  static onMenuNodeRemove (node)  {
    if (node.removable == false) return;
    node.graph.remove(node);
    node.setDirtyCanvas(true, true);
  }

  static onMenuNodeClone (node)  {
    if (node.clonable == false) return;
    let newnode = node.clone();
    if (!newnode) return;
    newnode.pos = [node.pos[0] + 5, node.pos[1] + 5];
    node.graph.add(newnode);
    node.setDirtyCanvas(true, true);
  }

  getCanvasMenuOptions ()  {
    let options = null;
    if (this.d_getMenuOptions)
      options = this.getMenuOptions();
    else {
      options = [
        { content: "Add Node", is_menu: true, callback: LGraphCanvas.onMenuAdd }
        //{content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
      ];

      if (this.d_graph_stack && this.d_graph_stack.length > 0)
        options = [{ content: "Close subgraph", callback: this.d_closeSubgraph.bind(this) }, null].concat(options);
    }

    if (this.d_getExtraMenuOptions) {
      let extra = this.getExtraMenuOptions(this, options);
      if (extra)
        options = options.concat(extra);
    }

    return options;
  }

  getNodeMenuOptions (node)  {
    let options = null;

    if (node.getMenuOptions)
      options = node.getMenuOptions(this);
    else
      options = [
        { content: "Inputs", is_menu: true, disabled: true, callback: LGraphCanvas.showMenuNodeInputs },
        { content: "Outputs", is_menu: true, disabled: true, callback: LGraphCanvas.showMenuNodeOutputs },
        null,
        { content: "Properties", is_menu: true, callback: LGraphCanvas.onShowMenuNodeProperties },
        null,
        { content: "Title", callback: LGraphCanvas.onShowTitleEditor },
        { content: "Mode", is_menu: true, callback: LGraphCanvas.onMenuNodeMode },
        { content: "Collapse", callback: LGraphCanvas.onMenuNodeCollapse },
        { content: "Pin", callback: LGraphCanvas.onMenuNodePin },
        { content: "Colors", is_menu: true, callback: LGraphCanvas.onMenuNodeColors },
        { content: "Shapes", is_menu: true, callback: LGraphCanvas.onMenuNodeShapes },
        null
      ];

    if (node.getExtraMenuOptions) {
      let extra = node.getExtraMenuOptions(this);
      if (extra) {
        extra.push(null);
        options = extra.concat(options);
      }
    }

    if (node.clonable !== false)
      options.push({ content: "Clone", callback: LGraphCanvas.onMenuNodeClone });
    if (node.removable !== false)
      options.push(null, { content: "Remove", callback: LGraphCanvas.onMenuNodeRemove });

    if (node.onGetInputs) {
      let inputs = node.onGetInputs();
      if (inputs && inputs.length)
        options[0].disabled = false;
    }

    if (node.onGetOutputs) {
      let outputs = node.onGetOutputs();
      if (outputs && outputs.length)
        options[1].disabled = false;
    }

    return options;
  }

  processContextMenu (node, event)  {
    let that = this;
    let win = this.getCanvasWindow();

    let menu_info = null;
    let options = { event: event, callback: inner_option_clicked };

    //check if mouse is in input
    let slot = null;
    if (node)
      slot = node.getSlotInPosition(event.canvasX, event.canvasY);

    if (slot) {
      menu_info = slot.locked ? ["Cannot remove"] : { "Remove Slot": slot };
      options.title = slot.input ? slot.input.type : slot.output.type;
      if (slot.input && slot.input.type == LiteGraph.EVENT)
        options.title = "Event";
    }
    else
      menu_info = node ? this.d_getNodeMenuOptions(node) : this.d_getCanvasMenuOptions();


    //show menu
    if (!menu_info)
      return;

    let menu = LiteGraph.createContextMenu(menu_info, options, win);

    function inner_option_clicked(v, e) {
      if (!v)
        return;

      if (v == slot) {
        if (v.input)
          node.removeInput(slot.slot);
        else if (v.output)
          node.removeOutput(slot.slot);
        return;
      }

      if (v.callback)
        return v.callback.call(that, node, e, menu, that, event);
    }
  }

}
