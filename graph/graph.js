class Graph {
  #nodes = [];
  #currentId = 1;
  #selectedNode = 0;

  #insideNode(x, y) {
    for (let node of this.#nodes) {
      if (
        squareDistance(x, y, node.x, node.y) <
        (nodeDiameter * nodeDiameter) / 4
      )
        return node;
    }
    return false;
  }

  #tooCloseToNode(x, y) {
    for (let node of this.#nodes) {
      console.log(squareDistance(x, y, node.x, node.y));
      if (squareDistance(x, y, node.x, node.y) < nodeDiameter * nodeDiameter) {
        return true;
      }
      return false;
    }
  }

  drawNodes() {
    for (let node of this.#nodes) {
      if (node.selected) {
        push();
        fill(100, 100, 100);
      }
      circle(node.x, node.y, nodeDiameter);
      if (node.selected) pop();
    }
  }

  onClick(x, y) {
    if (!this.#selectedNode) this.addNode(x, y);
  }

  drawEdges() {}

  addNode(x, y) {
    // check if it's inside another node
    const insideNode = this.#insideNode(x, y);
    if (insideNode) {
      this.#selectedNode = insideNode.id;
      insideNode.selected = true;
      return;
    }

    if (this.#tooCloseToNode(x, y)) return;

    let newNode = new Node(x, y, this.#currentId);
    this.#nodes.push(newNode);
    this.#currentId++;
  }
}

let graph = new Graph();
