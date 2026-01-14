let completeSpan = document.getElementById("completeSpan");
let degreeSpan = document.getElementById("degreeSpan");

function setup() {
  createCanvas(800, 700);

  console.log(graph.nodes);
}

function draw() {
  background(220);

  graph.draw();

  if(graph.isComplete()) {
    completeSpan.innerHTML = "";
  } else {
    completeSpan.innerHTML = "not";
  }

  // check if mode is selected and change degree text acordingly
  if(graph.getSelectedNodeDegree()=== -1){
    degreeSpan.innerHTML = "";
  } else {
    degreeSpan.innerHTML = graph.getSelectedNodeDegree();
  }
}

function mouseClicked() {
  console.log("mouse has been clicked at:", mouseX, mouseY);
  graph.onClick(mouseX, mouseY);
}
