import engine from "../../../engine/engine.js";

function Bullet(damage, speed, width, height, x, y, imgPath) {
  engine.components.Component.call(this, width, height, imgPath, x, y, "image");

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