import Core from "../../../core/Core.js";

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