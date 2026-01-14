

class Graph {
  nodes = [];
  #currentId = -1;

  // public functions

  /**
   * called when the mouse is clicked anywhere
   * @param {Number} x 
   * @param {Number} y 
   */
  onClick(x, y) {

    // if coordinates are out of bounds -> stop function
    if(outOfBOunds(x, y)){
      console.log("out of bounds");
      return;

    } 

    // if coordiantes are too close to border -> stop function
    if(nearBorder(x, y)){
      console.log("too close to border -> not adding node");
      return; 
    }

    // if the coordinates are inside an already existing node -> stop function
    let insideNode = this.#insideNode(x, y);
    if(insideNode) {

      console.log("current id: ", this.#currentId);

      if(this.#currentId != -1) {
        const insideNodeId = this.nodes.indexOf(insideNode);

        if(this.#currentId === insideNodeId) {
          this.#deselectNode();
          return;
        }
        this.#addEdge(this.#currentId, insideNodeId);
        return;
      }
      console.log("inside preexisting node", insideNode, "not adding node");
      console.log("node is at index", this.nodes.indexOf(insideNode));
      let selectedIndex = this.nodes.indexOf(insideNode);
      
      this.nodes[selectedIndex].selected = true;
      this.#currentId = selectedIndex; 
      return;
    }
    // pushes them back

    if(this.#overlappingNode(x, y)) return;

    // deselect any node
    this.#deselectNode();

    // create a node objects
    let newNode = new Node(x, y, this.nodes.length);

    this.nodes.push(newNode);
  }

  /**
   * called at every main sketch draw
   */
  draw() {
    this.#drawNodes();
    this.#drawEdges();
  }

  /**
   * A graph is complete when all nodes are connected to each other
   *  i.e when all nodes have n - 1 neighbours, where n = number of nodes
   * @returns true if graph is complete, false otherwise
   */
  isComplete() {
    for(let node of this.nodes) {
      if(node.neighbours.length != this.nodes.length - 1) {
        return false;
      }
    }

    return true;
  }
  /**
   * @returns -1 if no selected node or number of neighbours if a node is selected
   */
  getSelectedNodeDegree(){
    if(this.#currentId === -1) return false;

    // get selected node and return degree
    let selectedNode = this.nodes[this.#currentId];
    return selectedNode.neighbours.length;
  }

  // =================== Drawing Functions ===================
  


  

   #insideNode(x,y) {

    let radius = nodeDiameter/2;

    for(let node of this.nodes) {
      if (squareDistance(x, y, node.x, node.y) < radius * radius){
        return node;
      }
    }
    return false;
   }



  /**
   * Check if creating a node in (x, y) would make a node that overlaps with another node
   * @param {Number} x 
   * @param {Number} y 
   * @return {boolean}
   */

  #overlappingNode(x, y) {
    for(let node of this.nodes) {
      if(squareDistance(x, y, node.x, node.y) < nodeDiameter ** 2) return node;
    }
    return false;
  }

  /**
   * draw all nodes that in canvas
   */
  #drawNodes() {
    for(let node of this.nodes){
      fill(100, 0, 200);
      if(node.selected) {
        fill (200, 0, 300);
      }
      circle(node.x, node.y, nodeDiameter);
    }
  }

  /**
   * draw all edges on canvas
   */
  #drawEdges() {
    for(let node of this.nodes) {
      for(let neighbourId of node.neighbours) {
        let neighbour = this.nodes[neighbourId];
        line(node.x, node.y, neighbour.x, neighbour.y)
      }
    }
  }

  // =================== INTERACTIVE ELEMENTS ===================

  
  /**
   * Add new edge from selected node to node at (x, y)
   * @param {numbers} nodeOnePosition
   * @param {Numbers} nodeTwoPosition
   */
  #addEdge(nodeOnePosition, nodeTwoPosition) {

    // get node objects
    let nodeOne = this.nodes[nodeOnePosition];
    let nodeTwo = this.nodes[nodeTwoPosition];

    // add neighbours
    nodeOne.addNeighbour(nodeTwoPosition);
    nodeTwo.addNeighbour(nodeOnePosition);

  }

  /**
   * Add new node at (x, y)
   * @param {Number} x 
   * @param {Number} y 
   */
  #addNode(x, y) {
    
  }

  #deselectNode() {
    if(this.#currentId == -1) return;
    this.nodes[this.#currentId].selected = false;
    this.#currentId = -1;
  }
}

let graph = new Graph();
