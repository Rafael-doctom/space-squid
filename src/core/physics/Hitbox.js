/*
*
* @param {Number} width - width in pixels
* @param {Number} height - height in pixels
* @param {Number} life - life 
* @param {Number} damage - damage 
* @param {Object} gameArea - canvas context
*
*/

function HitBox(width, height, life, damage, gameArea) {
  this.width = width;
  this.height = height;
  this.x = null;
  this.y = null;
  this.life = life;
  this.damage = damage;
  this.isActive = true;
  this.isMoving = false;

  /*
  *
  * @param {Number} x - horizontal position of the element in canvas
  * @param {Number} y - vertical position of the element in canvas
  *
  */

  this.getCurrentPosition = function(x , y) {
    if (this.isActive) {
      this.x = x;
      this.y = y;
      this.isMoving = true;
    }
  }

  this.render = function() {
    const ctx = gameArea.context;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

export default HitBox;