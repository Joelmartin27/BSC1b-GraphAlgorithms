function setup() {
  createCanvas(800, 700);

  console.log(graph.nodes);
}

function draw() {
  background(220);

  graph.draw();
}

function mouseClicked() {
  console.log("mouse has been clicked at:", mouseX, mouseY);
  graph.onClick(mouseX, mouseY);
}
