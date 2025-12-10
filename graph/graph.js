

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
    if(this.#outOfBOunds(x, y)){
      console.log("out of bounds");
      return;

    } 

    // if coordiantes are too close to border -> stop function
    if(this.#nearBorder(x, y)){
      console.log("too close to border -> not adding node");
      return; 
    }

    // if the coordinates are inside an already existing node -> stop function
    let insideNode = this.#insideNode(x, y);
    if(insideNode) {

      if(this.#currentId != -1) {
        const insideNodeId = this.nodes.indexOf(insideNode);
        this.#addEdge(this.#currentId, insideNode);
        return;
      }
      console.log("inside preexisting node", insideNode, "not adding node");
      console.log("node is at index", this.nodes.indexOf(insideNode));
      let selectedIndex = this.nodes.indexOf(insideNode);
      
      this.nodes[selectedIndex].selected = true;
      this.currentId = selectedIndex; 
      return;
    }


    this.nodes.push({x, y});
  }

  /**
   * called at every main sketch draw
   */
  draw() {
    this.#drawNodes();
    this.#drawEdges();
  }

  // =================== Drawing Functions ===================
  /**
   * Check if (x, y) is outside canvas bounds
   * @param {Number} x 
   * @param {Number} y 
   * @return {boolean}
   */
  #outOfBOunds(x, y) {
  



    // x bounds
    let outside = false;
    if(x < 0) outside = true;
    if(x > width) outside = true;

    //  y bounds
    if(y < 0) outside = true;
    if(y > height) outside = true;

    return outside;
  }


  /**
   * Check if (x, y) is inside another node
   * @param {Number} x 
   * @param {Number} y 
   * @return {boolean}
   */
  #nearBorder(x, y) {
    let radius = nodeDiameter / 2;
    // distance to each border
    let distanceLeft = x;
    let distanceTop = y;
    let distanceRight = width - x;
    let distanceBottom = height - y;

    // ?check whether any of border distances are smaller than radius
    let near = false;
    if(distanceLeft < radius) near = true;
    if(distanceTop < radius) near = true;
    if(distanceRight < radius) near = true;
    if(distanceBottom < radius) near = true;
   }

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
      if(node.neighbour) {
        let neighbourNode = this.nodes[node.neighbour];
        line(node.x, node.y, neighbourNode.x, neighbourNode.y);
        console.log("neighbour detected");
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
    this.nodes[nodeOnePosition].neighbour = nodeTwoPosition;
    this.nodes[nodeTwoPosition].neighbour = nodeOnePosition;
    
  }

  /**
   * Add new node at (x, y)
   * @param {Number} x 
   * @param {Number} y 
   */
  #addNode(x, y) {
    
  }
}

let graph = new Graph();
