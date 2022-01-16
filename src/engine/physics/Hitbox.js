function HitBox(width, height, x = 0, y = 0) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.isActive = true;

  this.getCurrentPosition = function(x , y) {
    if (this.isActive) {
      this.x = x;
      this.y = y;
    }
  }
}

export default HitBox;