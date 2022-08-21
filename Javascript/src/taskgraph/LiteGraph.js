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
import { LiteGraphStates } from "./LiteGraphStates.js";

/**
* @class LiteGraph
*/
export default class LiteGraph {

  constructor() {
    this.d_node_images_path = "";
    this.d_proxy = null; //used to redirect calls

    this.d_debug = false;
    this.d_throw_errors = true;
    this.d_registered_node_types = {}; //nodetypes by string
    this.d_node_types_by_file_extension = {}; //used for droping files in the canvas
    this.d_Nodes = {}; //node types by classname
  }

	/**
	* Register a node class so it can be listed when the user wants to create a new one
	* @method registerNodeType
	* @param {String} type name of the node and path
	* @param {Class} base_class class containing the structure of a node
	*/
  registerNodeType (type, base_class) {
    if (!base_class.prototype)
      throw ("Cannot register a simple object, it must be a class with a prototype");
    base_class.type = type;

    if (this.d_debug)
      console.log("Node registered: " + type);

    let categories = type.split("/");

    let pos = type.lastIndexOf("/");
    base_class.category = type.substr(0, pos);

    //extend class
    if (base_class.prototype) //is a class
      for (let i in LGraphNode.prototype)
        if (!base_class.prototype[i])
          base_class.prototype[i] = LGraphNode.prototype[i];

    this.d_registered_node_types[type] = base_class;
    if (base_class.constructor.name)
      this.d_Nodes[base_class.constructor.name] = base_class;

    //warnings
    if (base_class.prototype.onPropertyChange)
      console.warn("LiteGraph node class " + type + " has onPropertyChange method, it must be called onPropertyChanged with d at the end");

    if (base_class.supported_extensions) {
      for (let i in base_class.supported_extensions)
        this.d_node_types_by_file_extension[base_class.supported_extensions[i].toLowerCase()] = base_class;
    }
  }

	/**
	* Adds this method to all nodetypes, existing and to be created
	* (You can add it to LGraphNode.prototype but then existing node types wont have it)
	* @method addNodeMethod
	* @param {Function} func
	*/
  addNodeMethod (name, func) {
    LGraphNode.prototype[name] = func;
    for (let i in this.d_registered_node_types) {
      let type = this.d_registered_node_types[i];
      if (type.prototype[name])
        type.prototype["_" + name] = type.prototype[name]; //keep old in case of replacing
      type.prototype[name] = func;
    }
  }

	/**
	* Create a node of a given type with a name. The node is not attached to any graph yet.
	* @method createNode
	* @param {String} type full name of the node class. p.e. "math/sin"
	* @param {String} name a name to distinguish from other nodes
	* @param {Object} options to set options
	*/
  createNode (type, title, options) {
    let base_class = this.d_registered_node_types[type];
    if (!base_class) {
      if (LiteGraph.debug)
        console.log("GraphNode type \"" + type + "\" not registered.");
      return null;
    }

    let prototype = base_class.prototype || base_class;

    title = title || base_class.title || type;

    let node = new base_class(name);
    node.type = type;

    if (!node.title) node.title = title;
    if (!node.properties) node.properties = {};
    if (!node.properties_info) node.properties_info = [];
    if (!node.flags) node.flags = {};
    if (!node.size) node.size = node.computeSize();
    if (!node.pos) node.pos = LiteGraphStates.DEFAULT_POSITION.concat();
    if (!node.mode) node.mode = LiteGraphStates.ALWAYS;

    //extra options
    if (options) {
      for (let i in options)
        node[i] = options[i];
    }

    return node;
  }

	/**
	* Returns a registered node type with a given name
	* @method getNodeType
	* @param {String} type full name of the node class. p.e. "math/sin"
	* @return {Class} the node class
	*/
  getNodeType (type) {
    return this.d_registered_node_types[type];
  }

	/**
	* Returns a list of node types matching one category
	* @method getNodeType
	* @param {String} category category name
	* @return {Array} array with all the node classes
	*/
  getNodeTypesInCategory (category) {
    let r = [];
    for (let i in this.registered_node_types)
      if (category == "") {
        if (this.d_registered_node_types[i].category == null)
          r.push(this.d_registered_node_types[i]);
      } else if (this.d_registered_node_types[i].category == category) {
        r.push(this.d_registered_node_types[i]);
      }

    return r;
  }

	/**
	* Returns a list with all the node type categories
	* @method getNodeTypesCategories
	* @return {Array} array with all the names of the categories 
	*/
  getNodeTypesCategories () {
    let categories = { "": 1 };
    for (let i in this.d_registered_node_types) {
      if (this.d_registered_node_types[i].category &&
        !this.d_registered_node_types[i].skip_list) {
        categories[this.d_registered_node_types[i].category] = 1;
      }
    }
    let result = [];
    for (let i in categories) {
      result.push(i);
    }
    return result;
  }

  //debug purposes: reloads all the js scripts that matches a wilcard
  reloadNodes (folder_wildcard) {
    let tmp = document.getElementsByTagName("script");
    //weird, this array changes by its own, so we use a copy
    let script_files = [];
    for (let i in tmp) {
      script_files.push(tmp[i]);
    }

    let docHeadObj = document.getElementsByTagName("head")[0];
    folder_wildcard = document.location.href + folder_wildcard;

    for (let i in script_files) {
      let src = script_files[i].src;
      if (!src ||
        src.substr(0, folder_wildcard.length) != folder_wildcard) {
        continue;
      }

      try {
        if (this.d_debug)
          console.log("Reloading: " + src);
        let dynamicScript = document.createElement("script");
        dynamicScript.type = "text/javascript";
        dynamicScript.src = src;
        docHeadObj.appendChild(dynamicScript);
        docHeadObj.removeChild(script_files[i]);
      } catch (err) {
        if (this.d_throw_errors)
          throw err;
        if (this.d_debug)
          console.log("Error while reloading " + src);
      }
    }

    if (this.d_debug)
      console.log("Nodes reloaded");
  }

  //separated just to improve if it doesnt work
  cloneObject (obj, target) {
    if (obj == null) return null;
    let r = JSON.parse(JSON.stringify(obj));
    if (!target) return r;

    for (let i in r)
      target[i] = r[i];
    return target;
  }

  isValidConnection (type_a, type_b) {
    if (!type_a ||  //generic output
      !type_b || //generic input
      type_a == type_a || //same type (is valid for triggers)
      (type_a !== LiteGraphStates.EVENT &&
        type_b !== LiteGraphStates.EVENT &&
        type_a.toLowerCase() == type_b.toLowerCase())) //same type
      return true;
    return false;
  }

  static compareObjects (a, b) {
    for (var i in a)
      if (a[i] != b[i])
        return false;
    return true;
  }

  static distance (a, b) {
    return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
  }

  static colorToString (c) {
    return "rgba(" + Math.round(c[0] * 255).toFixed() + "," + Math.round(c[1] * 255).toFixed() + "," + Math.round(c[2] * 255).toFixed() + "," + (c.length == 4 ? c[3].toFixed(2) : "1.0") + ")";
  }

  static isInsideRectangle (x, y, left, top, width, height) {
    if (left < x && (left + width) > x &&
      top < y && (top + height) > y)
      return true;
    return false;
  }

  static growBounding (bounding, x, y) {
    if (x < bounding[0])
      bounding[0] = x;
    else if (x > bounding[2])
      bounding[2] = x;

    if (y < bounding[1])
      bounding[1] = y;
    else if (y > bounding[3])
      bounding[3] = y;
  }

  //point inside boundin box
  static isInsideBounding (p, bb) {
    if (p[0] < bb[0][0] ||
      p[1] < bb[0][1] ||
      p[0] > bb[1][0] ||
      p[1] > bb[1][1])
      return false;
    return true;
  }

  //boundings overlap, format: [start,end]
  static overlapBounding (a, b) {
    if (a[0] > b[2] ||
      a[1] > b[3] ||
      a[2] < b[0] ||
      a[3] < b[1])
      return false;
    return true;
  }

  //Convert a hex value to its decimal value - the inputted hex must be in the
  //	format of a hex triplet - the kind we use for HTML colours. The function
  //	will return an array with three values.
  static hex2num (hex) {
    if (hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.
    hex = hex.toUpperCase();
    var hex_alphabets = "0123456789ABCDEF";
    var value = new Array(3);
    var k = 0;
    var int1, int2;
    for (var i = 0; i < 6; i += 2) {
      int1 = hex_alphabets.indexOf(hex.charAt(i));
      int2 = hex_alphabets.indexOf(hex.charAt(i + 1));
      value[k] (int1 * 16) + int2;
      k++;
    }
    return (value);
  }

  //Give a array with three values as the argument and the function will return
  //	the corresponding hex triplet.
  static num2hex (triplet) {
    var hex_alphabets = "0123456789ABCDEF";
    var hex = "#";
    var int1, int2;
    for (var i = 0; i < 3; i++) {
      int1 = triplet[i] / 16;
      int2 = triplet[i] % 16;

      hex += hex_alphabets.charAt(int1) + hex_alphabets.charAt(int2);
    }
    return (hex);
  }

  /* LiteGraph GUI elements *************************************/
  static createContextMenu (values, options, ref_window) {
    options = options || {};
    this.options = options;

    //allows to create graph canvas in separate window
    ref_window = ref_window || window;

    if (!options.from)
      LiteGraph.closeAllContextMenus(ref_window);
    else {
      //closing submenus
      var menus = document.querySelectorAll(".graphcontextmenu");
      for (var key in menus) {
        if (menus[key].previousSibling == options.from)
          menus[key].closeMenu();
      }
    }

    var root = ref_window.document.createElement("div");
    root.className = "graphcontextmenu graphmenubar-panel";
    this.root = root;
    var style = root.style;

    style.minWidth = "100px";
    style.minHeight = "20px";

    style.position = "fixed";
    style.top = "100px";
    style.left = "100px";
    style.color = "#AAF";
    style.padding = "2px";
    style.borderBottom = "2px solid #AAF";
    style.backgroundColor = "#444";
    style.zIndex = 10;

    //title
    if (options.title) {
      var element = document.createElement("div");
      element.className = "graphcontextmenu-title";
      element.innerHTML = options.title;
      root.appendChild(element);
    }

    //avoid a context menu in a context menu
    root.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });

    for (var i in values) {
      var item = values[i];
      var element = ref_window.document.createElement("div");
      element.className = "graphmenu-entry";

      if (item == null) {
        element.className += " separator";
        root.appendChild(element);
        continue;
      }

      if (item.is_menu)
        element.className += " submenu";

      if (item.disabled)
        element.className += " disabled";

      if (item.className)
        element.className += " " + item.className;

      element.style.cursor = "pointer";
      element.dataset["value"] = typeof (item) == "string" ? item : item.value;
      element.data = item;

      var content = "";
      if (typeof (item) == "string")
        content = values.constructor == Array ? values[i] : i;
      else
        content = item.content ? item.content : i;
      if (options.allow_html)
        element.innerHTML = content;
      else
        element.innerText = content;

      element.addEventListener("click", on_click);
      root.appendChild(element);
    }

    root.addEventListener("mouseover", function (e) {
      this.mouse_inside = true;
    });

    root.addEventListener("mouseout", function (e) {
      //console.log("OUT!");
      //check if mouse leave a inner element
      var aux = e.relatedTarget || e.toElement;
      while (aux != this && aux != ref_window.document)
        aux = aux.parentNode;

      if (aux == this)
        return;
      this.mouse_inside = false;
      if (!this.block_close)
        this.closeMenu();
    });

    //insert before checking position
    ref_window.document.body.appendChild(root);

    var root_rect = root.getClientRects()[0];

    //link menus
    if (options.from) {
      options.from.block_close = true;
    }

    var left = options.left || 0;
    var top = options.top || 0;
    if (options.event) {
      left = (options.event.pageX - 10);
      top = (options.event.pageY - 10);
      if (options.left)
        left = options.left;

      var rect = ref_window.document.body.getClientRects()[0];

      if (options.from) {
        var parent_rect = options.from.getClientRects()[0];
        left = parent_rect.left + parent_rect.width;
      }


      if (left > (rect.width - root_rect.width - 10))
        left = (rect.width - root_rect.width - 10);
      if (top > (rect.height - root_rect.height - 10))
        top = (rect.height - root_rect.height - 10);
    }

    root.style.left = left + "px";
    root.style.top = top + "px";

    function on_click(e) {
      var value = this.dataset["value"];
      var close = true;
      if (options.callback) {
        var ret = options.callback.call(root, this.data, e);
        if (ret !== undefined) close = ret;
      }

      if (close)
        LiteGraph.closeAllContextMenus(ref_window);
      //root.closeMenu();
    }

    root.closeMenu = function () {
      if (options.from) {
        options.from.block_close = false;
        if (!options.from.mouse_inside)
          options.from.closeMenu();
      }
      if (this.parentNode)
        ref_window.document.body.removeChild(this);
    };

    return root;
  }

  static closeAllContextMenus (ref_window) {
    ref_window = ref_window || window;

    var elements = ref_window.document.querySelectorAll(".graphcontextmenu");
    if (!elements.length) return;

    var result = [];
    for (var i = 0; i < elements.length; i++)
      result.push(elements[i]);

    for (var i in result)
      if (result[i].parentNode)
        result[i].parentNode.removeChild(result[i]);
  }

  static extendClass (target, origin) {
    for (var i in origin) //copy class properties
    {
      if (target.hasOwnProperty(i))
        continue;
      target[i] = origin[i];
    }

    if (origin.prototype) //copy prototype properties
      for (var i in origin.prototype) //only enumerables
      {
        if (!origin.prototype.hasOwnProperty(i))
          continue;

        if (target.prototype.hasOwnProperty(i)) //avoid overwritting existing ones
          continue;

        //copy getters 
        if (origin.prototype.__lookupGetter__(i))
          target.prototype.__defineGetter__(i, origin.prototype.__lookupGetter__(i));
        else
          target.prototype[i] = origin.prototype[i];

        //and setters
        if (origin.prototype.__lookupSetter__(i))
          target.prototype.__defineSetter__(i, origin.prototype.__lookupSetter__(i));
      }
  } 
};

if (typeof (performance) != "undefined")
  LiteGraph.getTime = () => { return performance.now(); }
else
  LiteGraph.getTime = () => { return Date.now(); }


