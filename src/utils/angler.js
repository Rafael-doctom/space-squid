/*
*
* Returns the angle in rad between two points
*
* @param {Number} cx - horizontal coordinate of the center point
* @param {Number} cy - vertical coordinate of the center point
* @param {Number} ex - horizontal coordinate of the end point
* @param {Number} ey - vertical coordinate of the end point
*
*/

function angler(cx, cy, ex, ey) {
  let dy = ey - cy;
  let dx = ex - cx;
  let theta = Math.atan2(dy, dx);
  return theta;
}

export default angler;