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
import {LiteGraphStates} from "./LiteGraphStates.js"
import LGraphCanvas from "./LGraphCanvas.js"

/**
* LGraph is the class that contain a full graph. We instantiate one and 
* add nodes to it, and then we can run the execution loop.
*
* @class LGraph
*/
const LGraphStatus = {
  STATUS_STOPPED : 1,
  STATUS_RUNNING : 2
};

export default class LGraph {

  constructor() {
	  if (LiteGraph.d_debug)
		  console.log("Graph created");
	  this.d_list_of_graphcanvas = null;
    this.clear();

    //default supported types
    this.d_supported_types = ["number","string","boolean"];
  }

  // used to know which types of connections support this graph 
  // (some graphs do not allow certain types)
  getSupportedTypes ()  { 
    return this.d_supported_types; 
  }

  /**
  * Removes all nodes from this graph
  * @method clear
  */
  clear ()  {
  	this.stop();
	  this.d_status = LGraphStatus.STATUS_STOPPED;
	  this.d_last_node_id = 0;

	  //nodes
	  this.d_nodes = [];
	  this.d_nodes_by_id = {};
    //nodes that are executable sorted in execution order
    this.d_nodes_in_order = null; 

	  //links
	  this.d_last_link_id = 0;
	  this.d_links = {}; //container with all the links

	  //iterations
	  this.d_iteration = 0;

	  this.d_config = {};

    //timing
    this.d_globaltime = 0;
    this.d_runningtime = 0;
    this.d_fixedtime =  0;
    this.d_fixedtime_lapse = 0.01;
    this.d_elapsed_time = 0.01;
    this.d_starttime = 0;

    //globals
    this.d_global_inputs = {};
    this.d_global_outputs = {};

    this.d_debug = true;

    this.change();

    this.sendActionToCanvas("clear");
  }

  /**
  * Stops the execution loop of the graph
  * @method stop execution
  */
  stop ()  {
    if( this.d_status == LGraphStatus.STATUS_STOPPED )
      return;

    this.d_status = LGraphStatus.STATUS_STOPPED;

    if(this.d_onStopEvent)
      this.onStopEvent();

    if(this.d_execution_timer_id != null)
      clearInterval(this.d_execution_timer_id);
    this.d_execution_timer_id = null;

    this.sendEventToAllNodes("onStop");
  }

  /* Called when something visually changed */
  change ()  {
    if(LiteGraph.d_debug)
      console.log("Graph changed");

    this.sendActionToCanvas("setDirty",[true,true]);

    if(this.d_on_change)
      this.on_change(this);
  }

  /**
  * Attach Canvas to this graph
  * @method attachCanvas
  * @param {GraphCanvas} graph_canvas 
  */
  attachCanvas (graphcanvas)  {
    if(graphcanvas.constructor != LGraphCanvas)
      throw("attachCanvas expects a LGraphCanvas instance");
    if(graphcanvas.graph && graphcanvas.graph != this)
      graphcanvas.graph.detachCanvas( graphcanvas );

    graphcanvas.graph = this;
    if(!this.d_list_of_graphcanvas)
      this.d_list_of_graphcanvas = [];
    this.d_list_of_graphcanvas.push(graphcanvas);
  }

  /**
  * Detach Canvas from this graph
  * @method detachCanvas
  * @param {GraphCanvas} graph_canvas 
  */
  detachCanvas (graphcanvas)  {
    if(!this.d_list_of_graphcanvas)
      return;

    let pos = this.d_list_of_graphcanvas.indexOf( graphcanvas );
    if(pos == -1)
      return;
    graphcanvas.graph = null;
    this.d_list_of_graphcanvas.splice(pos,1);
  }

  /**
  * Starts running this graph every interval milliseconds.
  * @method start
  * @param {number} interval amount of milliseconds between executions, default is 1
  */
  start (interval)  {
    if( this.d_status == LGraphStatus.STATUS_RUNNING )
      return;
    this.d_status = LGraphStatus.STATUS_RUNNING;

    if(this.d_onPlayEvent)
      this.onPlayEvent();

    this.sendEventToAllNodes("onStart");

    //launch
    this.d_starttime = LiteGraph.getTime();
    interval = interval || 1;

    this.d_execution_timer_id = setInterval( () => { 
      //execute
      this.runStep(1); 
    }, interval);
  }

  /**
  * Run N steps (cycles) of the graph
  * @method runStep
  * @param {number} num number of steps to run, default is 1
  */
  runStep (num)  {
    num = num || 1;

    let start = LiteGraph.getTime();
    this.d_globaltime = 0.001 * (start - this.d_starttime);

    let nodes = this.d_nodes_in_order ? this.d_nodes_in_order : this.d_nodes;
    if(!nodes)
      return;

    try {
      //iterations
      for(let i = 0; i < num; i++) {
        for( let j = 0, l = nodes.length; j < l; ++j ) {
          let node = nodes[j];
          if( node.mode == LiteGraphStates.ALWAYS && node.onExecute )
            node.onExecute();
        }

        this.d_fixedtime += this.d_fixedtime_lapse;
        if( this.d_onExecuteStep )
          this.onExecuteStep();
      }

      if( this.d_onAfterExecute )
        this.onAfterExecute();
      this.d_errors_in_execution = false;

    } catch (err) {

      this.d_errors_in_execution = true;
      if(LiteGraph.d_throw_errors)
        throw err;
      if(LiteGraph.d_debug)
        console.log("Error during execution: " + err);
      this.stop();
    }

    let elapsed = LiteGraph.getTime() - start;
    if (elapsed == 0)
      elapsed = 1;
    this.d_elapsed_time = 0.001 * elapsed;
    this.d_globaltime += 0.001 * elapsed;
    this.d_iteration += 1;
  }

  /**
  * Updates the graph execution order according to relevance of the nodes (nodes with only outputs have more relevance than
  * nodes with only inputs.
  * @method updateExecutionOrder
  */
  updateExecutionOrder ()  {
    this.d_nodes_in_order = this.computeExecutionOrder( true );
  }

  //This is more internal, it computes the order and returns it
  computeExecutionOrder ( only_onExecute )  {
    let L = [];
    let S = [];
    let M = {};
    let visited_links = {}; //to avoid repeating links
    let remaining_links = {}; //to a
    
    //search for the nodes without inputs (starting nodes)
    for (let i = 0, l = this.d_nodes.length; i < l; ++i) {
      let n = this.d_nodes[i];
      if( only_onExecute && !n.onExecute )
        continue;

      M[n.id] = n; //add to pending nodes

      let num = 0; //num of input connections
      if(n.inputs)
        for(let j = 0, l2 = n.inputs.length; j < l2; j++)
          if(n.inputs[j] && n.inputs[j].link != null)
            num += 1;

      if(num == 0) //is a starting node
        S.push(n);
      else //num of input links 
        remaining_links[n.id] = num;
    }

    while(true) {
      if(S.length == 0)
        break;
        
      //get an starting node
      let n = S.shift();
      L.push(n); //add to ordered list
      delete M[n.id]; //remove from the pending nodes
      
      //for every output
      if(n.outputs) {
        for(let i = 0; i < n.outputs.length; i++) {
          let output = n.outputs[i];
          //not connected
          if(output == null || output.links == null || output.links.length == 0)
            continue;

          //for every connection
          for(let j = 0; j < output.links.length; j++) {
            let link_id = output.links[j];
            let link = this.d_links[link_id];
            if(!link) continue;

            //already visited link (ignore it)
            if(visited_links[ link.id ])
              continue;

            let target_node = this.getNodeById( link.target_id );
            if(target_node == null) {
              visited_links[ link.id ] = true;
              continue;
            }

            visited_links[link.id] = true; //mark as visited
            remaining_links[target_node.id] -= 1; //reduce the number of links remaining
            if (remaining_links[target_node.id] == 0)
              S.push(target_node); //if no more links, then add to Starters array
          }
        }
      }
    }
    
    //the remaining ones (loops)
    for(let i in M)
      L.push( M[i] );
      
    if( L.length != this._nodes.length && LiteGraph.d_debug )
      console.warn("something went wrong, nodes missing");

    //save order number in the node
    for(let i = 0; i < L.length; ++i)
      L[i].order = i;
    
    return L;
  }

  /**
  * Returns the amount of time the graph has been running in milliseconds
  * @method getTime
  * @return {number} number of milliseconds the graph has been running
  */
  getTime ()  {
    return this.d_globaltime;
  }

  /**
  * Returns the amount of time accumulated using the fixedtime_lapse var. This is used in context where the time increments should be constant
  * @method getFixedTime
  * @return {number} number of milliseconds the graph has been running
  */
  getFixedTime ()  {
    return this.d_fixedtime;
  }

  /**
  * Returns the amount of time it took to compute the latest iteration. Take into account that this number could be not correct
  * if the nodes are using graphical actions
  * @method getElapsedTime
  * @return {number} number of milliseconds it took the last cycle
  */
  getElapsedTime ()  
  {
    return this.d_elapsed_time;
  }

  /**
  * Sends an event to all the nodes, useful to trigger stuff
  * @method sendEventToAllNodes
  * @param {String} eventname the name of the event (function to be called)
  * @param {Array} params parameters in array format
  */
  sendEventToAllNodes ( eventname, params, mode )  {
    mode = mode || LiteGraphStates.ALWAYS;

    let nodes = this.d_nodes_in_order ? this.d_nodes_in_order : this.d_nodes;
    if(!nodes)
      return;

    for( let j = 0, l = nodes.length; j < l; ++j )
    {
      let node = nodes[j];
      if(node[eventname] && node.mode == mode )
      {
        if(params === undefined)
          node[eventname]();
        else if(params && params.constructor === Array)
          node[eventname].apply( node, params );
        else
          node[eventname](params);
      }
    }
  }

  sendActionToCanvas (action, params)  {
    if(!this.d_list_of_graphcanvas) 
      return;

    for(let i = 0; i < this.d_list_of_graphcanvas.length; ++i)
    {
      let c = this.d_list_of_graphcanvas[i];
      if( c[action] )
        c[action].apply(c, params);
    }
  }

  /**
  * Adds a new node instasnce to this graph
  * @method add
  * @param {LGraphNode} node the instance of the node
  */
  add (node, skip_compute_order)  {
    if(!node || (node.id != -1 && this.d_nodes_by_id[node.id] != null))
      return; //already added

    if(this.d_nodes.length >= LiteGraphStates.MAX_NUMBER_OF_NODES)
      throw("LiteGraph: max number of nodes in a graph reached");

    //give him an id
    if(node.id == null || node.id == -1)
      node.id = ++this.last_node_id;
    else if (this.d_last_node_id < node.id)
      this.d_last_node_id = node.id;

    node.graph = this;

    this.d__nodes.push(node);
    this.d__nodes_by_id[node.id] = node;

    if(node.onAdded)
      node.onAdded( this );

    if(this.d_config.align_to_grid)
      node.alignToGrid();

    if(!skip_compute_order)
      this.updateExecutionOrder();

    if(this.d_onNodeAdded)
      this.onNodeAdded(node);


    this.setDirtyCanvas(true);

    this.change();

    return node; //to chain actions
  }

  /**
  * Removes a node from the graph
  * @method remove
  * @param {LGraphNode} node the instance of the node
  */
  remove (node)  {
    if(this.d_nodes_by_id[node.id] == null)
      return; //not found

    if(node.ignore_remove) 
      return; //cannot be removed

    //disconnect inputs
    if(node.inputs) {
      for(let i = 0; i < node.inputs.length; i++) {
        let slot = node.inputs[i];
        if(slot.link != null)
          node.disconnectInput(i);
      }
    }

    //disconnect outputs
    if(node.outputs) {
      for(let i = 0; i < node.outputs.length; i++) {
        let slot = node.outputs[i];
        if(slot.links != null && slot.links.length)
          node.disconnectOutput(i);
      }
    }

    //callback
    if(node.onRemoved)
      node.onRemoved();

    node.graph = null;

    //remove from canvas render
    if(this.d_list_of_graphcanvas) {
      for(let i = 0; i < this.list_of_graphcanvas.length; ++i) {
        var canvas = this.d_list_of_graphcanvas[i];
        if(canvas.selected_nodes[node.id])
          delete canvas.selected_nodes[node.id];
        if(canvas.node_dragged == node)
          canvas.node_dragged = null;
      }
    }

    //remove from containers
    var pos = this.d_nodes.indexOf(node);
    if(pos != -1)
      this.d_nodes.splice(pos,1);
    delete this.d_nodes_by_id[node.id];

    if(this.onNodeRemoved)
      this.onNodeRemoved(node);

    this.setDirtyCanvas(true,true);

    this.change();

    this.updateExecutionOrder();
  }

  /**
  * Returns a node by its id.
  * @method getNodeById
  * @param {Number} id
  */
  getNodeById ( id )  {
    if( id == null )
      return null;
    return this.d_nodes_by_id[ id ];
  }

  /**
  * Returns a list of nodes that matches a class
  * @method findNodesByClass
  * @param {Class} classObject the class itself (not an string)
  * @return {Array} a list with all the nodes of this type
  */
  findNodesByClass (classObject)  {
    let r = [];
    for(let i = 0, l = this.d_nodes.length; i < l; ++i)
      if(this.d_nodes[i].constructor === classObject)
        r.push(this.d_nodes[i]);
    return r;
  }

  /**
  * Returns a list of nodes that matches a type
  * @method findNodesByType
  * @param {String} type the name of the node type
  * @return {Array} a list with all the nodes of this type
  */
  findNodesByType (type)  {
    type = type.toLowerCase();
    let r = [];
    for(let i = 0, l = this.d_nodes.length; i < l; ++i)
      if(this.d_nodes[i].type.toLowerCase() == type )
        r.push(this.d_nodes[i]);
    return r;
  }

  /**
  * Returns a list of nodes that matches a name
  * @method findNodesByName
  * @param {String} name the name of the node to search
  * @return {Array} a list with all the nodes with this name
  */
  findNodesByTitle (title)  {
    let result = [];
    for(let i = 0, l = this.d_nodes.length; i < l; ++i)
      if(this.d_nodes[i].title == title)
        result.push(this.d_nodes[i]);
    return result;
  }

  /**
  * Returns the top-most node in this position of the canvas
  * @method getNodeOnPos
  * @param {number} x the x coordinate in canvas space
  * @param {number} y the y coordinate in canvas space
  * @param {Array} nodes_list a list with all the nodes to search from, by default is all the nodes in the graph
  * @return {Array} a list with all the nodes that intersect this coordinate
  */
  getNodeOnPos (x,y, nodes_list)  {
    nodes_list = nodes_list || this.d_nodes;
    for (let i = nodes_list.length - 1; i >= 0; i--) {
      var n = nodes_list[i];
      if(n.isPointInsideNode( x, y, 2 ))
        return n;
    }
    return null;
  }

  // ********** GLOBALS *****************

  //Tell this graph has a global input of this type
  addGlobalInput (name, type, value)  {
    this.d_global_inputs[name] = { name: name, type: type, value: value };

    if(this.d_onGlobalInputAdded)
      this.onGlobalInputAdded(name, type);

    if(this.d_onGlobalsChange)
      this.onGlobalsChange();
  }

  //assign a data to the global input
  setGlobalInputData (name, data)  {
    let input = this.d_global_inputs[name];
    if (!input)
      return;
    input.value = data;
  }

  //assign a data to the global input
  getGlobalInputData (name)  {
    let input = this.d_global_inputs[name];
    if (!input)
      return null;
    return input.value;
  }

  //rename the global input
  renameGlobalInput (old_name, name)  {
    if(name == old_name)
      return;

    if(!this.d_global_inputs[old_name])
      return false;

    if(this.d_global_inputs[name]) {
      console.error("there is already one input with that name");
      return false;
    }

    this.d_global_inputs[name] = this.d_global_inputs[old_name];
    delete this.d_global_inputs[old_name];

    if(this.d_onGlobalInputRenamed)
      this.onGlobalInputRenamed(old_name, name);

    if(this.d_onGlobalsChange)
      this.onGlobalsChange();
  }

  changeGlobalInputType (name, type)  {
    if(!this.d_global_inputs[name])
      return false;

    if(this.d_global_inputs[name].type.toLowerCase() == type.toLowerCase() )
      return;

    this.d_global_inputs[name].type = type;
    if(this.d_onGlobalInputTypeChanged)
      this.onGlobalInputTypeChanged(name, type);
  }

  removeGlobalInput (name)  {
    if(!this.d_global_inputs[name])
      return false;

    delete this.d_global_inputs[name];

    if(this.d_onGlobalInputRemoved)
      this.onGlobalInputRemoved(name);

    if(this.d_onGlobalsChange)
      this.onGlobalsChange();
    return true;
  }


  addGlobalOutput (name, type, value)  {
    this.d_global_outputs[name] = { name: name, type: type, value: value };

    if(this.d_onGlobalOutputAdded)
      this.onGlobalOutputAdded(name, type);

    if(this.d_onGlobalsChange)
      this.onGlobalsChange();
  }

  //assign a data to the global output
  setGlobalOutputData (name, value)  {
    let output = this.d_global_outputs[ name ];
    if (!output)
      return;
    output.value = value;
  }

  //assign a data to the global input
  getGlobalOutputData (name)  {
    let output = this.d_global_outputs[name];
    if (!output)
      return null;
    return output.value;
  }

  //rename the global output
  renameGlobalOutput (old_name, name)  {
    if(!this.d_global_outputs[old_name])
      return false;

    if(this.d_global_outputs[name]) {
      console.error("there is already one output with that name");
      return false;
    }

    this.d_global_outputs[name] = this.d_global_outputs[old_name];
    delete this.d_global_outputs[old_name];

    if(this.d_onGlobalOutputRenamed)
      this.onGlobalOutputRenamed(old_name, name);

    if(this.d_onGlobalsChange)
      this.onGlobalsChange();
  }

  changeGlobalOutputType (name, type)  {
    if(!this.d_global_outputs[name])
      return false;

    if(this.d_global_outputs[name].type.toLowerCase() == type.toLowerCase() )
      return;

    this.d_global_outputs[name].type = type;
    if(this.d_onGlobalOutputTypeChanged)
      this.onGlobalOutputTypeChanged(name, type);
  }

  removeGlobalOutput (name)  {
    if(!this.d_global_outputs[name])
      return false;
    delete this.d_global_outputs[name];

    if(this.d_onGlobalOutputRemoved)
      this.onGlobalOutputRemoved(name);

    if(this.d_onGlobalsChange)
      this.onGlobalsChange();
    return true;
  }

  /**
  * Assigns a value to all the nodes that matches this name. This is used to create global variables of the node that
  * can be easily accesed from the outside of the graph
  * @method setInputData
  * @param {String} name the name of the node
  * @param {*} value value to assign to this node
  */
  setInputData (name,value)  {
    let nodes = this.findNodesByName( name );
    for(let i = 0, l = nodes.length; i < l; ++i)
      nodes[i].setValue(value);
  }

  /**
  * Returns the value of the first node with this name. This is used to access global variables of the graph from the outside
  * @method setInputData
  * @param {String} name the name of the node
  * @return {*} value of the node
  */
  getOutputData (name)  {
    let n = this.findNodesByName(name);
    if(n.length)
      return m[0].getValue();
    return null;
  }

  //This feature is not finished yet, is to create graphs where nodes are not executed unless a trigger message is received
  triggerInput (name,value)  {
    let nodes = this.findNodesByName(name);
    for(let i = 0; i < nodes.length; ++i)
      nodes[i].onTrigger(value);
  }

  setCallback (name,func)  {
    let nodes = this.findNodesByName(name);
    for(let i = 0; i < nodes.length; ++i)
      nodes[i].setTrigger(func);
  }

  connectionChange ( node )  {
    this.updateExecutionOrder();
    if( this.d_onConnectionChange )
      this.onConnectionChange( node );
    this.sendActionToCanvas("onConnectionChange");
  }

  /**
  * returns if the graph is in live mode
  * @method isLive
  */
  isLive ()  {
    if(!this.d_list_of_graphcanvas)
      return false;

    for(let i = 0; i < this.d_list_of_graphcanvas.length; ++i) {
      let c = this.d_list_of_graphcanvas[i];
      if(c.live_mode)
        return true;
    }
    return false;
  }

  setDirtyCanvas (fg,bg)  {
    this.sendActionToCanvas("setDirty",[fg,bg]);
  }

  //save and recover app state ***************************************
  /**
  * Creates a Object containing all the info about this graph, it can be serialized
  * @method serialize
  * @return {Object} value of the node
  */
  serialize ()  {
    let nodes_info = [];
    for(let i = 0, l = this.d_nodes.length; i < l; ++i)
      nodes_info.push( this.d_nodes[i].serialize() );

    //remove data from links, we dont want to store it
    for(let i in this.d_links) //links is an OBJECT
    {
      let link = this.d_links[i];
      link.data = null;
      delete link.d_last_time;
    }

    let data = {
      iteration: this.d_iteration,
      frame: this.d_frame,
      last_node_id: this.d_last_node_id,
      last_link_id: this.d_last_link_id,
      links: LiteGraph.cloneObject( this.d_links ),

      config: this.d_config,
      nodes: nodes_info
    };

    return data;
  }

  /**
  * Configure a graph from a JSON string 
  * @method configure
  * @param {String} str configure a graph from a JSON string
  */
  configure (data, keep_old)  {
    if(!keep_old)
      this.clear();

    let nodes = data.nodes;

    //copy all stored fields
    for (let i in data)
      this[i] = data[i];

    let error = false;

    //create nodes
    this.d_nodes = [];
    for(let i = 0, l = nodes.length; i < l; ++i) {
      let n_info = nodes[i]; //stored info
      let node = LiteGraph.createNode( n_info.type, n_info.title );
      if(!node) {
        if(LiteGraph.d_debug)
          console.log("Node not found: " + n_info.type);
        error = true;
        continue;
      }

      node.id = n_info.id; //id it or it will create a new id
      this.add(node, true); //add before configure, otherwise configure cannot create links
    }

    //configure nodes afterwards so they can reach each other
    for(let i = 0, l = nodes.length; i < l; ++i) {
      let n_info = nodes[i];
      let node = this.getNodeById( n_info.id );
      if(node)
        node.configure( n_info );
    }

    this.updateExecutionOrder();
    this.setDirtyCanvas(true,true);
    return error;
  }

  load (url)  {
    let req = new XMLHttpRequest();
    req.open('GET', url, true); 
    req.send(null);
    req.onload =  (oEvent) => {
      if(req.status !== 200) {
        console.error("Error loading graph:",req.status,req.response);
        return;
      }
      let data = JSON.parse( req.response );
      this.configure(data);
    }
    req.onerror = (err) => {
      console.error("Error loading graph:",err);
    }
  }
}
