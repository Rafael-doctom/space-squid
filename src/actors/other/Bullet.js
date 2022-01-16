import engine from "../../engine/engine.js";

const shotImgPath = {idle: "../src/assets/img/attacks/shot.png"};

function Bullet(damage, width = 4, height = 2, x = 0, y = 0) {
  engine.components.Component.call(this, width, height, shotImgPath, x, y, "image")

  this.damage = damage;
  this.speed = 3;
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