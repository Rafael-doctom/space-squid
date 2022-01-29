import Core from "../../../core/Core.js";

/*
*
* Represents a bullet template
*
* @param {Number} damage - damage 
* @param {Number} speed - speed
* @param {Number} width - width in pixels
* @param {Number} height - height in pixels
* @param {Number} x - horizontal position in canvas
* @param {Number} y - vertical position in canvas
* @param {String or Object} color - a color or image object path
*
*/

function Bullet(damage, speed, width, height, x, y, imgPath) {
  Core.Component.call(this, width, height, imgPath, x, y, "image", Core.GameArea);

  this.damage = damage;
  this.life = damage;
  this.speed = speed;
  this.isMoving = false;
  this.isDead = false;

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.move = function(direction) {
    this.isMoving = true;
    this.speedX = direction == "right" ? this.speed : -this.speed;
  };

  this.clearmove = function() {
    this.isMoving = false;
    this.speedX = 0;
    this.speedY = 0;
  };
}

export default Bullet;