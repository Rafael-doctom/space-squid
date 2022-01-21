import myGameArea from "../other/myGameArea.js";

function HitBox(width, height, life, damage) {
  this.width = width;
  this.height = height;
  this.x = null;
  this.y = null;
  this.life = life;
  this.damage = damage;
  this.isActive = true;
  this.isMoving = false;

  this.getCurrentPosition = function(x , y) {
    if (this.isActive) {
      this.x = x;
      this.y = y;
      this.isMoving = true;
    }
  }

  this.render = function() {
    const ctx = myGameArea.canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

export default HitBox;