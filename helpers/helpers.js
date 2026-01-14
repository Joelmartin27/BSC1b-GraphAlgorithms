
/**
 * Calculate the square of the euclidean distance between two points
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns 
 */
function squareDistance(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

/**
   * Check if (x, y) is outside canvas bounds
   * @param {Number} x 
   * @param {Number} y 
   * @return {boolean}
   */
  function outOfBOunds(x, y) {
  



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
  function nearBorder(x, y) {
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
    return near;
   }
