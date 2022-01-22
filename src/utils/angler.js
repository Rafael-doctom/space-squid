function angler(cx, cy, ex, ey) {
  let dy = ey - cy;
  let dx = ex - cx;
  let theta = Math.atan2(dy, dx);
  return theta;
}

export default angler;