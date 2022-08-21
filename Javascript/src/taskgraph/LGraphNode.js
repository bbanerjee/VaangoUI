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
import LiteGraph from "./LiteGraph.js";
import {LiteGraphStates} from "./LiteGraphStates.js";

/**
* Base Class for all the node type classes
* @class LGraphNode
* @param {String} name a name for the node
*
* title: string
* pos: [x,y]
* size: [x,y]
*
* input|output: every connection
*   +  { name:string, type:string, pos: [x,y]=Optional, direction: "input"|"output", links: Array });
*
* flags:
*   + skip_title_render
*   + clip_area
*   + unsafe_execution: not allowed for safe execution
*
* supported callbacks: 
*   + onAdded: when added to graph
*   + onRemoved: when removed from graph
*   + onStart:	when the graph starts playing
*   + onStop:	when the graph stops playing
*   + onDrawForeground: render the inside widgets inside the node
*   + onDrawBackground: render the background area inside the node (only in edit mode)
*   + onMouseDown
*   + onMouseMove
*   + onMouseUp
*   + onMouseEnter
*   + onMouseLeave
*   + onExecute: execute the node
*   + onPropertyChanged: when a property is changed in the panel (return true to skip default behaviour)
*   + onGetInputs: returns an array of possible inputs
*   + onGetOutputs: returns an array of possible outputs
*   + onDblClick
*   + onSerialize
*   + onSelected
*   + onDeselected
*   + onDropItem : DOM item dropped over the node
*   + onDropFile : file dropped over the node
*   + onConnectInput : if returns false the incoming connection will be canceled
*   + onConnectionsChange : a connection changed (new one or removed)
*/

export default class LGraphNode {

  constructor(title) {

    this.d_title = title || "Unnamed";
    this.d_size = [LiteGraph.NODE_WIDTH,60];
    this.d_graph = null;

    this.d_pos = new Float32Array(10,10);

    Object.defineProperty( this, "pos", {
      set: function(v)
      {
        if(!v || !v.length < 2)
          return;
        this.d_pos[0] = v[0];
        this.d_pos[1] = v[1];
      },
      get: function()
      {
        return this.d_pos;
      },
      enumerable: true
    });

    this.d_id = -1; //not know till not added
    this.d_type = null;

    //inputs available: array of inputs
    this.d_inputs = [];
    this.d_outputs = [];
    this.d_connections = [];

    //local data
    this.d_properties = {}; //for the values
    this.d_properties_info = []; //for the info

    this.d_data = null; //persistent local data
    this.d_flags = {
      //skip_title_render: true,
      //unsafe_execution: false,
    };
  }

  /**
  * configure a node from an object containing the serialized info
  * @method configure
  */
  configure = (info) => {

    for (let j in info) {
      if(j == "console")
        continue;

      if(j == "properties") {
        //i dont want to clone properties, I want to reuse the old container
        for(let k in info.properties) {
          this.d_properties[k] = info.properties[k];
          if(this.d_onPropertyChanged)
            this.onPropertyChanged(k,info.properties[k]);
        }
        continue;
      }

      if(info[j] == null)
        continue;
      else if (typeof(info[j]) == 'object') {
        if(this[j] && this[j].d_configure)
          this[j].configure( info[j] );
        else
          this[j] = LiteGraph.cloneObject(info[j], this[j]);
      } else //value
        this[j] = info[j];
    }

    if(this.d_onConnectionsChange) {
      if(this.d_inputs)
      for(let i = 0; i < this.d_inputs.length; ++i)
      {
        let input = this.d_inputs[i];
        let link_info = this.d_graph.links[ input.link ];
        this.onConnectionsChange( LiteGraph.INPUT, i, true, link_info ); //link_info has been created now, so its updated
      }

      if(this.d_outputs)
      for(let i = 0; i < this.d_outputs.length; ++i)
      {
        let output = this.d_outputs[i];
        for(let j = 0; j < output.links.length; ++j)
        {
          let link_info = this.d_graph.links[ output.links[j] ];
          this.onConnectionsChange( LiteGraph.OUTPUT, i, true, link_info ); //link_info has been created now, so its updated
        }
      }
    }

    //FOR LEGACY, PLEASE REMOVE ON NEXT VERSION
    for(let i in this.d_inputs)
    {
      let input = this.d_inputs[i];
      if(!input.link || !input.link.length )
        continue;
      let link = input.link;
      if(typeof(link) != "object")
        continue;
      input.link = link[0];
      this.d_graph.links[ link[0] ] = { id: link[0], origin_id: link[1], origin_slot: link[2], target_id: link[3], target_slot: link[4] };
    }
    for(let i in this.d_outputs)
    {
      let output = this.d_outputs[i];
      if(!output.links || output.links.length == 0)
        continue;
      for(let j in output.links) {
        let link = output.links[j];
        if(typeof(link) != "object")
          continue;
        output.links[j] = link[0];
      }
    }

    if( this.d_onConfigure )
      this.onConfigure( info );
  }

  /**
  * serialize the content
  * @method serialize
  */
  serialize = () => {
    let o = {
      id: this.d_id,
      title: this.d_title,
      type: this.d_type,
      pos: this.d_pos,
      size: this.d_size,
      data: this.d_data,
      flags: LiteGraph.cloneObject(this.d_flags),
      inputs: this.d_inputs,
      outputs: this.d_outputs,
      mode: this.d_mode
    };

    if(this.d_properties)
      o.properties = LiteGraph.cloneObject(this.d_properties);

    if(!o.type)
      o.type = this.d_constructor.type;

    if(this.d_color)
      o.color = this.d_color;
    if(this.d_bgcolor)
      o.bgcolor = this.d_bgcolor;
    if(this.d_boxcolor)
      o.boxcolor = this.d_boxcolor;
    if(this.d_shape)
      o.shape = this.d_shape;

    if(this.d_onSerialize)
      this.onSerialize(o);

    return o;
  }

  /* Creates a clone of this node */
  clone = () => {
    let node = LiteGraph.createNode(this.d_type);

    //we clone it because serialize returns shared containers
    let data = LiteGraph.cloneObject( this.d_serialize() );

    //remove links
    if(data.inputs)
      for(let i = 0; i < data.inputs.length; ++i)
        data.inputs[i].link = null;

    if(data.outputs)
      for(let i = 0; i < data.outputs.length; ++i) {
        if(data.outputs[i].links)
          data.outputs[i].links.length = 0;
      }

    delete data["id"];
    //remove links
    node.configure(data);

    return node;
  }

  /**
  * serialize and stringify
  * @method toString
  */
  toString = () => {
    return JSON.stringify( this.serialize() );
  }
  //unserialize = (info) {} //this cannot be done from within, must be done in LiteGraph


  /**
  * get the title string
  * @method getTitle
  */
  getTitle = () => {
    return this.d_title || this.d_constructor.title;
  }

  // Execution *************************
  /**
  * sets the output data
  * @method setOutputData
  * @param {number} slot
  * @param {*} data
  */
  setOutputData = (slot,data) => {
    if(!this.d_outputs) 
      return;

    if(slot > -1 && 
       slot < this.d_outputs.length && 
       this.d_outputs[slot] && 
       this.d_outputs[slot].links != null) {
      for(let i = 0; i < this.d_outputs[slot].links.length; i++) {
        let link_id = this.d_outputs[slot].links[i];
        this.d_graph.links[ link_id ].data = data;
      }
    }
  }

  /**
  * retrieves the input data (data traveling through the connection) from one slot
  * @method getInputData
  * @param {number} slot
  * @param {boolean} force_update if set to true it will force the connected node of this slot to output data into this link
  * @return {*} data or if it is not connected returns undefined
  */
  getInputData = ( slot, force_update ) => {
    if(!this.d_inputs) 
      return; //undefined;

    if(slot >= this.d_inputs.length || this.d_inputs[slot].link == null)
      return;

    let link_id = this.d_inputs[slot].link;
    let link = this.d_graph.links[ link_id ];

    //used to extract data from the incomming connection
    if(!force_update)
      return link.data;

    let node = this.d_graph.getNodeById( link.origin_id );
    if(!node)
      return link.data;

    if(node.updateOutputData)
      node.updateOutputData( link.origin_slot );
    else if(node.onExecute)
      node.onExecute();

    return link.data;
  }

  /**
  * tells you if there is a connection in one input slot
  * @method isInputConnected
  * @param {number} slot
  * @return {boolean} 
  */
  isInputConnected = (slot) => {
    if(!this.d_inputs) 
      return false;
    return (slot < this.d_inputs.length && this.d_inputs[slot].link != null);
  }

  /**
  * tells you info about an input connection (which node, type, etc)
  * @method getInputInfo
  * @param {number} slot
  * @return {Object} object or null
  */
  getInputInfo = (slot) => {
    if(!this.d_inputs)
      return null;
    if(slot < this.d_inputs.length)
      return this.d_inputs[slot];
    return null;
  }

  /**
  * returns the node connected in the input slot
  * @method getInputNode
  * @param {number} slot
  * @return {LGraphNode} node or null
  */
  getInputNode = ( slot ) => {
    if(!this.d_inputs)
      return null;
    if(slot >= this.d_inputs.length)
      return null;
    let input = this.d_inputs[slot];
    if(!input || !input.link)
      return null;
    let link_info = this.d_graph.links[ input.link ];
    if(!link_info)
      return null;
    return this.d_graph.getNodeById( link_info.origin_id );
  }

  /**
  * tells you info about an output connection (which node, type, etc)
  * @method getOutputInfo
  * @param {number} slot
  * @return {Object}  object or null
  */
  getOutputInfo = (slot) => {
    if(!this.d_outputs)
      return null;
    if(slot < this.d_outputs.length)
      return this.d_outputs[slot];
    return null;
  }

  /**
  * tells you if there is a connection in one output slot
  * @method isOutputConnected
  * @param {number} slot
  * @return {boolean} 
  */
  isOutputConnected = (slot) => {
    if(!this.d_outputs)
      return null;
    return (slot < this.d_outputs.length && 
            this.d_outputs[slot].links && 
            this.d_outputs[slot].links.length);
  }

  /**
  * retrieves all the nodes connected to this output slot
  * @method getOutputNodes
  * @param {number} slot
  * @return {array} 
  */
  getOutputNodes = (slot) => {
    if(!this.d_outputs || this.d_outputs.length == 0)
      return null;

    if(slot >= this.d_outputs.length)
      return null;

    let output = this.d_outputs[slot];
    if(!output.links || output.links.length == 0)
      return null;

    let r = [];
    for(let i = 0; i < output.links.length; i++) {
      let link_id = output.links[i];
      let link = this.d_graph.links[ link_id ];
      if(link) {
        let target_node = this.d_graph.getNodeById( link.target_id );
        if( target_node )
          r.push( target_node );
      }
    }
    return r;
  }

  /**
  * Triggers an event in this node, this will trigger any output with the same name
  * @method trigger
  * @param {String} event name ( "on_play", ... ) if action is equivalent to false then the event is send to all
  * @param {*} param
  */
  trigger = ( action, param ) => {
    if( !this.d_outputs || !this.d_outputs.length )
      return;

    if(this.d_graph)
      this.d_graph._last_trigger_time = LiteGraph.getTime();

    for(let i = 0; i < this.d_outputs.length; ++i) {
      let output = this.d_outputs[i];
      if(output.type !== LiteGraphStates.EVENT || (action && output.name != action) )
        continue;

      let links = output.links;
      if(!links || !links.length)
        continue;

      //for every link attached here
      for(let k = 0; k < links.length; ++k) {
        let link_info = this.d_graph.links[ links[k] ];
        if(!link_info) //not connected
          continue;
        let node = this.d_graph.getNodeById( link_info.target_id );
        if(!node) //node not found?
          continue;

        //used to mark events in graph
        link_info._last_time = LiteGraph.getTime();

        let target_connection = node.inputs[ link_info.target_slot ];

        if(node.onAction)
          node.onAction( target_connection.name, param );
        else if(node.mode === LiteGraphStates.ON_TRIGGER) {
          if(node.onExecute)
            node.onExecute(param);
        }
      }
    }
  }

  /**
  * add a new property to this node
  * @method addProperty
  * @param {string} name
  * @param {*} default_value
  * @param {string} type string defining the output type ("vec3","number",...)
  * @param {Object} extra_info this can be used to have special properties of the property (like values, etc)
  */
  addProperty = ( name, default_value, type, extra_info ) => {
    let o = { name: name, type: type, default_value: default_value };
    if(extra_info)
      for(let i in extra_info)
        o[i] = extra_info[i];
    if(!this.d_properties_info)
      this.d_properties_info = [];
    this.d_properties_info.push(o);
    if(!this.d_properties)
      this.d_properties = {};
    this.d_properties[ name ] = default_value;
    return o;
  }


  //connections

  /**
  * add a new output slot to use in this node
  * @method addOutput
  * @param {string} name
  * @param {string} type string defining the output type ("vec3","number",...)
  * @param {Object} extra_info this can be used to have special properties of an output (label, special color, position, etc)
  */
  addOutput = (name,type,extra_info) => {
    let o = { name: name, type: type, links: null };
    if(extra_info)
      for(let i in extra_info)
        o[i] = extra_info[i];

    if(!this.d_outputs)
      this.d_outputs = [];
    this.d_outputs.push(o);
    if(this.d_onOutputAdded)
      this.onOutputAdded(o);
    this.d_size = this.computeSize();
    return o;
  }

  /**
  * add a new output slot to use in this node
  * @method addOutputs
  * @param {Array} array of triplets like [[name,type,extra_info],[...]]
  */
  addOutputs = (array) => {
    for(let i = 0; i < array.length; ++i) {
      let info = array[i];
      let o = {name:info[0],type:info[1],link:null};
      if(array[2])
        for(let j in info[2])
          o[j] = info[2][j];

      if(!this.d_outputs)
        this.d_outputs = [];
      this.d_outputs.push(o);
      if(this.d_onOutputAdded)
        this.onOutputAdded(o);
    }

    this.d_size = this.computeSize();
  }

  /**
  * remove an existing output slot
  * @method removeOutput
  * @param {number} slot
  */
  removeOutput = (slot) => {
    this.disconnectOutput(slot);
    this.d_outputs.splice(slot,1);
    this.d_size = this.computeSize();
    if(this.d_onOutputRemoved)
      this.onOutputRemoved(slot);
  }

  /**
  * add a new input slot to use in this node
  * @method addInput
  * @param {string} name
  * @param {string} type string defining the input type ("vec3","number",...), it its a generic one use 0
  * @param {Object} extra_info this can be used to have special properties of an input (label, color, position, etc)
  */
  addInput = (name,type,extra_info) => {
    type = type || 0;
    let o = {name:name,type:type,link:null};
    if(extra_info)
      for(let i in extra_info)
        o[i] = extra_info[i];

    if(!this.d_inputs)
      this.d_inputs = [];
    this.d_inputs.push(o);
    this.d_size = this.computeSize();
    if(this.d_onInputAdded)
      this.onInputAdded(o);
    return o;
  }

  /**
  * add several new input slots in this node
  * @method addInputs
  * @param {Array} array of triplets like [[name,type,extra_info],[...]]
  */
  addInputs = (array) => {
    for(let i = 0; i < array.length; ++i) {
      let info = array[i];
      let o = {name:info[0], type:info[1], link:null};
      if(array[2])
        for(let j in info[2])
          o[j] = info[2][j];

      if(!this.d_inputs)
        this.d_inputs = [];
      this.d_inputs.push(o);
      if(this.d_onInputAdded)
        this.onInputAdded(o);
    }

    this.d_size = this.computeSize();
  }

  /**
  * remove an existing input slot
  * @method removeInput
  * @param {number} slot
  */
  removeInput = (slot) => {
    this.disconnectInput(slot);
    this.d_inputs.splice(slot,1);
    this.d_size = this.computeSize();
    if(this.d_onInputRemoved)
      this.onInputRemoved(slot);
  }

  /**
  * add an special connection to this node (used for special kinds of graphs)
  * @method addConnection
  * @param {string} name
  * @param {string} type string defining the input type ("vec3","number",...)
  * @param {[x,y]} pos position of the connection inside the node
  * @param {string} direction if is input or output
  */
  addConnection = (name,type,pos,direction) => {
    let o = { 
      name: name,
      type: type,
      pos: pos,
      direction: direction,
      links: null
    };
    this.d_connections.push( o );
    return o;
  }

  /**
  * computes the size of a node according to its inputs and output slots
  * @method computeSize
  * @param {number} minHeight
  * @return {number} the total size
  */
  computeSize = ( minHeight, out ) => {
    let rows = Math.max( this.d_inputs ? this.d_inputs.length : 1, this.d_outputs ? this.d_outputs.length : 1);
    let size = out || new Float32Array([0,0]);
    rows = Math.max(rows, 1);
    size[1] = rows * 14 + 6;

    let font_size = 14;
    let title_width = compute_text_size( this.d_title );
    let input_width = 0;
    let output_width = 0;

    if(this.d_inputs)
      for(let i = 0, l = this.d_inputs.length; i < l; ++i) {
        let input = this.d_inputs[i];
        let text = input.label || input.name || "";
        let text_width = compute_text_size( text );
        if(input_width < text_width)
          input_width = text_width;
      }

    if(this.d_outputs)
      for(let i = 0, l = this.d_outputs.length; i < l; ++i) {
        let output = this.d_outputs[i];
        let text = output.label || output.name || "";
        let text_width = compute_text_size( text );
        if(output_width < text_width)
          output_width = text_width;
      }

    size[0] = Math.max( input_width + output_width + 10, title_width );
    size[0] = Math.max( size[0], LiteGraph.NODE_WIDTH );

    function compute_text_size( text )
    {
      if(!text)
        return 0;
      return font_size * text.length * 0.6;
    }

    return size;
  }

  /**
  * returns the bounding of the object, used for rendering purposes
  * @method getBounding
  * @return {Float32Array[4]} the total size
  */
  getBounding = () => {
    return new Float32Array([this.d_pos[0] - 4, this.d_pos[1] - LiteGraph.NODE_TITLE_HEIGHT, this.d_pos[0] + this.d_size[0] + 4, this.d_pos[1] + this.d_size[1] + LGraph.NODE_TITLE_HEIGHT]);
  }

  /**
  * checks if a point is inside the shape of a node
  * @method isPointInsideNode
  * @param {number} x
  * @param {number} y
  * @return {boolean} 
  */
  isPointInsideNode = (x,y, margin) => {
    margin = margin || 0;

    let margin_top = this.d_graph && this.d_graph.isLive() ? 0 : 20;
    if(this.d_flags.collapsed) {
      //if ( distance([x,y], [this.d_pos[0] + this.d_size[0]*0.5, this.d_pos[1] + this.d_size[1]*0.5]) < LiteGraph.NODE_COLLAPSED_RADIUS)
      if( isInsideRectangle( x, y, this.d_pos[0] - margin, this.d_pos[1] - LiteGraph.NODE_TITLE_HEIGHT - margin, LiteGraph.NODE_COLLAPSED_WIDTH + 2 * margin, LiteGraph.NODE_TITLE_HEIGHT + 2 * margin ) )
        return true;
    }
    else if ( (this.d_pos[0] - 4 - margin) < x && (this.d_pos[0] + this.d_size[0] + 4 + margin) > x
      && (this.d_pos[1] - margin_top - margin) < y && (this.d_pos[1] + this.d_size[1] + margin) > y)
      return true;
    return false;
  }

  /**
  * checks if a point is inside a node slot, and returns info about which slot
  * @method getSlotInPosition
  * @param {number} x
  * @param {number} y
  * @return {Object} if found the object contains { input|output: slot object, slot: number, link_pos: [x,y] }
  */
  getSlotInPosition = ( x, y ) => {
    //search for inputs
    if(this.d_inputs)
      for(let i = 0, l = this.d_inputs.length; i < l; ++i)
      {
        let input = this.d_inputs[i];
        let link_pos = this.getConnectionPos( true,i );
        if( isInsideRectangle(x, y, link_pos[0] - 10, link_pos[1] - 5, 20,10) )
          return { input: input, slot: i, link_pos: link_pos, locked: input.locked };
      }

    if(this.d_outputs)
      for(let i = 0, l = this.d_outputs.length; i < l; ++i)
      {
        let output = this.d_outputs[i];
        let link_pos = this.getConnectionPos(false,i);
        if( isInsideRectangle(x, y, link_pos[0] - 10, link_pos[1] - 5, 20,10) )
          return { output: output, slot: i, link_pos: link_pos, locked: output.locked };
      }

    return null;
  }

  /**
  * returns the input slot with a given name (used for dynamic slots), -1 if not found
  * @method findInputSlot
  * @param {string} name the name of the slot 
  * @return {number} the slot (-1 if not found)
  */
  findInputSlot = (name) => {
    if(!this.d_inputs) return -1;
    for(let i = 0, l = this.d_inputs.length; i < l; ++i)
      if(name == this.d_inputs[i].name)
        return i;
    return -1;
  }

  /**
  * returns the output slot with a given name (used for dynamic slots), -1 if not found
  * @method findOutputSlot
  * @param {string} name the name of the slot 
  * @return {number} the slot (-1 if not found)
  */
  findOutputSlot = (name) => {
    if(!this.d_outputs) return -1;
    for(let i = 0, l = this.d_outputs.length; i < l; ++i)
      if(name == this.d_outputs[i].name)
        return i;
    return -1;
  }

  /**
  * connect this node output to the input of another node
  * @method connect
  * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
  * @param {LGraphNode} node the target node 
  * @param {number_or_string} target_slot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
  * @return {boolean} if it was connected succesfully
  */
  connect = ( slot, target_node, target_slot ) => {
    target_slot = target_slot || 0;

    //seek for the output slot
    if( slot.constructor === String ) {
      slot = this.findOutputSlot(slot);
      if(slot == -1)
      {
        if(LiteGraph.d_debug)
          console.log("Connect: Error, no slot of name " + slot);
        return false;
      }
    } else if(!this.d_outputs || slot >= this.d_outputs.length) {
      if(LiteGraph.d_debug)
        console.log("Connect: Error, slot number not found");
      return false;
    }

    if(target_node && target_node.constructor === Number)
      target_node = this.d_graph.getNodeById( target_node );
    if(!target_node)
      throw("Node not found");

    //avoid loopback
    if(target_node == this)
      return false; 

    //you can specify the slot by name
    if(target_slot.constructor === String) {
      target_slot = target_node.findInputSlot( target_slot );
      if(target_slot == -1) {
        if(LiteGraph.d_debug)
          console.log("Connect: Error, no slot of name " + target_slot);
        return false;
      }
    } else if( target_slot === LiteGraphStates.EVENT ) {
      //search for first slot with event?
      /*
      //create input for trigger
      let input = target_node.addInput("onTrigger", LiteGraph.EVENT );
      target_slot = target_node.inputs.length - 1; //last one is the one created
      target_node.mode = LiteGraph.ON_TRIGGER;
      */
      return false;
    } else if( !target_node.inputs || target_slot >= target_node.inputs.length ) {
      if(LiteGraph.d_debug)
        console.log("Connect: Error, slot number not found");
      return false;
    }

    //if there is something already plugged there, disconnect
    if(target_node.inputs[ target_slot ].link != null )
      target_node.disconnectInput( target_slot );

    //why here??
    this.d_setDirtyCanvas(false,true);
    this.d_graph.connectionChange( this );
      
    let output = this.d_outputs[slot];

    //allows nodes to block connection 
    if(target_node.onConnectInput)
      if( target_node.onConnectInput( target_slot, output.type, output ) === false)
        return false;

    let input = target_node.inputs[target_slot];

    if( LiteGraph.isValidConnection( output.type, input.type) ) {
      let link_info = { 
        id: this.d_graph.last_link_id++, 
        origin_id: this.d_id, 
        origin_slot: slot, 
        target_id: target_node.id, 
        target_slot: target_slot
      };

      //add to graph links list
      this.d_graph.links[ link_info.id ] = link_info;

      //connect in output
      if( output.links == null )
        output.links = [];
      output.links.push( link_info.id );
      //connect in input
      target_node.inputs[target_slot].link = link_info.id;

      if(this.d_onConnectionsChange)
        this.onConnectionsChange( LiteGraph.OUTPUT, slot, true, link_info ); //link_info has been created now, so its updated
      if(target_node.onConnectionsChange)
        target_node.onConnectionsChange( LiteGraph.INPUT, target_slot, true, link_info );
    }

    this.setDirtyCanvas(false,true);
    this.d_graph.connectionChange( this );

    return true;
  }

  /**
  * disconnect one output to an specific node
  * @method disconnectOutput
  * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
  * @param {LGraphNode} target_node the target node to which this slot is connected [Optional, if not target_node is specified all nodes will be disconnected]
  * @return {boolean} if it was disconnected succesfully
  */
  disconnectOutput = ( slot, target_node ) => {
    if( slot.constructor === String ) {
      slot = this.d_findOutputSlot(slot);
      if(slot == -1) {
        if(LiteGraph.d_debug)
          console.log("Connect: Error, no slot of name " + slot);
        return false;
      }
    } else if(!this.d_outputs || slot >= this.d_outputs.length) {
      if(LiteGraph.d_debug)
        console.log("Connect: Error, slot number not found");
      return false;
    }

    //get output slot
    let output = this.d_outputs[slot];
    if(!output.links || output.links.length == 0)
      return false;

    //one of the links
    if(target_node) {
      if(target_node.constructor === Number)
        target_node = this.d_graph.getNodeById( target_node );
      if(!target_node)
        throw("Target Node not found");

      for(let i = 0, l = output.links.length; i < l; i++) {
        let link_id = output.links[i];
        let link_info = this.d_graph.links[ link_id ];

        //is the link we are searching for...
        if( link_info.target_id == target_node.id ) {
          output.links.splice(i,1); //remove here
          target_node.inputs[ link_info.target_slot ].link = null; //remove there
          delete this.d_graph.links[ link_id ]; //remove the link from the links pool
          if(target_node.onConnectionsChange)
            target_node.onConnectionsChange( LiteGraphStates.INPUT, link_info.target_slot, false, link_info ); //link_info hasnt been modified so its ok
          if(this.d_onConnectionsChange)
            this.onConnectionsChange( LiteGraphStates.OUTPUT, slot, false, link_info );
          break;
        }
      }
    } else { //all the links
      for(let i = 0, l = output.links.length; i < l; i++) {
        let link_id = output.links[i];
        let link_info = this.d_graph.links[ link_id ];

        let target_node = this.d_graph.getNodeById( link_info.target_id );
        if(target_node)
          target_node.inputs[ link_info.target_slot ].link = null; //remove other side link
        delete this.d_graph.links[ link_id ]; //remove the link from the links pool
        if(target_node.onConnectionsChange)
          target_node.onConnectionsChange( LiteGraphStates.INPUT, link_info.target_slot, false, link_info ); //link_info hasnt been modified so its ok
        if(this.d_onConnectionsChange)
          this.onConnectionsChange( LiteGraphStates.OUTPUT, slot, false, link_info );
      }
      output.links = null;
    }


    this.setDirtyCanvas(false,true);
    this.d_graph.connectionChange( this );
    return true;
  }

  /**
  * disconnect one input
  * @method disconnectInput
  * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
  * @return {boolean} if it was disconnected succesfully
  */
  disconnectInput = ( slot ) => {
    //seek for the output slot
    if( slot.constructor === String ) {
      slot = this.d_findInputSlot(slot);
      if(slot == -1) {
        if(LiteGraph.d_debug)
          console.log("Connect: Error, no slot of name " + slot);
        return false;
      }
    } else if(!this.d_inputs || slot >= this.d_inputs.length) {
      if(LiteGraph.d_debug)
        console.log("Connect: Error, slot number not found");
      return false;
    }

    let input = this.d_inputs[slot];
    if(!input)
      return false;

    let link_id = this.d_inputs[slot].link;
    this.d_inputs[slot].link = null;

    //remove other side
    let link_info = this.d_graph.links[ link_id ];
    if( link_info ) {
      let target_node = this.d_graph.getNodeById( link_info.origin_id );
      if(!target_node)
        return false;

      let output = target_node.outputs[ link_info.origin_slot ];
      if(!output || !output.links || output.links.length == 0) 
        return false;

      //search in the inputs list for this link
      for(let i = 0, l = output.links.length; i < l; i++) {
        let link_id = output.links[i];
        let link_info = this.d_graph.links[ link_id ];
        if( link_info.target_id == this.d_id )
        {
          output.links.splice(i,1);
          break;
        }
      }

      if( this.onConnectionsChange )
        this.d_onConnectionsChange( LiteGraphStates.INPUT, slot, false, link_info );
      if( target_node.onConnectionsChange )
        target_node.onConnectionsChange( LiteGraphStates.OUTPUT, i, false, link_info );
    }

    this.setDirtyCanvas(false,true);
    this.d_graph.connectionChange( this );
    return true;
  }

  /**
  * returns the center of a connection point in canvas coords
  * @method getConnectionPos
  * @param {boolean} is_input true if if a input slot, false if it is an output
  * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
  * @return {[x,y]} the position
  **/
  getConnectionPos = (is_input, slot_number) => {
    if(this.d_flags.collapsed) {
      if(is_input)
        return [this.d_pos[0], this.d_pos[1] - LiteGraph.NODE_TITLE_HEIGHT * 0.5];
      else
        return [this.d_pos[0] + LiteGraph.NODE_COLLAPSED_WIDTH, this.d_pos[1] - LiteGraph.NODE_TITLE_HEIGHT * 0.5];
      //return [this.d_pos[0] + this.d_size[0] * 0.5, this.d_pos[1] + this.d_size[1] * 0.5];
    }

    if(is_input && slot_number == -1) {
      return [this.d_pos[0] + 10, this.d_pos[1] + 10];
    }

    if(is_input && this.d_inputs.length > slot_number && this.d_inputs[slot_number].pos)
      return [this.d_pos[0] + this.d_inputs[slot_number].pos[0],this.d_pos[1] + this.d_inputs[slot_number].pos[1]];
    else if(!is_input && this.d_outputs.length > slot_number && this.d_outputs[slot_number].pos)
      return [this.d_pos[0] + this.d_outputs[slot_number].pos[0],this.d_pos[1] + this.d_outputs[slot_number].pos[1]];

    if(!is_input) //output
      return [this.d_pos[0] + this.d_size[0] + 1, this.d_pos[1] + 10 + slot_number * LiteGraph.NODE_SLOT_HEIGHT];
    return [this.d_pos[0] , this.d_pos[1] + 10 + slot_number * LiteGraph.NODE_SLOT_HEIGHT];
  }

  /* Force align to grid */
  alignToGrid = () => {
    this.d_pos[0] = LiteGraphStates.CANVAS_GRID_SIZE * Math.round(this.d_pos[0] / LiteGraph.CANVAS_GRID_SIZE);
    this.d_pos[1] = LiteGraphStates.CANVAS_GRID_SIZE * Math.round(this.d_pos[1] / LiteGraph.CANVAS_GRID_SIZE);
  }


  /* Console output */
  trace = (msg) => {
    if(!this.d_console)
      this.d_console = [];
    this.d_console.push(msg);
    if(this.d_console.length > LGraphNode.MAX_CONSOLE)
      this.d_console.shift();

    this.d_graph.onNodeTrace(this,msg);
  }

  /* Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas = (dirty_foreground, dirty_background) => {
    if(!this.d_graph)
      return;
    this.d_graph.sendActionToCanvas("setDirty",[dirty_foreground, dirty_background]);
  }

  loadImage = (url) => {
    let img = new Image();
    img.src = LiteGraph.d_node_images_path + url;	
    img.ready = false;

    let that = this;
    img.onload = () => { 
      this.d_ready = true;
      that.setDirtyCanvas(true);
    }
    return img;
  }

  /* Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput = (v) => {
    if(!this.d_graph || !this.d_graph.d_list_of_graphcanvas)
      return;

    let list = this.d_graph.d_list_of_graphcanvas;

    for(let i = 0; i < list.length; ++i) {
      let c = list[i];
      //releasing somebody elses capture?!
      if(!v && c.node_capturing_input != this)
        continue;

      //change
      c.node_capturing_input = v ? this : null;
    }
  }

  /**
  * Collapse the node to make it smaller on the canvas
  * @method collapse
  **/
  collapse = () => {
    if(!this.d_flags.collapsed)
      this.d_flags.collapsed = true;
    else
      this.d_flags.collapsed = false;
    this.d_setDirtyCanvas(true,true);
  }

  /**
  * Forces the node to do not move or realign on Z
  * @method pin
  **/
  pin = (v) => {
    if(v === undefined)
      this.d_flags.pinned = !this.d_flags.pinned;
    else
      this.d_flags.pinned = v;
  }

  localToScreen = (x,y, graphcanvas) => {
    return [(x + this.d_pos[0]) * graphcanvas.scale + graphcanvas.offset[0],
      (y + this.d_pos[1]) * graphcanvas.scale + graphcanvas.offset[1]];
  }

}
