import engine from "../../../engine/engine.js";

const shotImgPath = {
  bullet: "../../src/assets/img/attacks/smallBullet.png",
  laser: "../../src/assets/img/attacks/laser.png"
};

function Bullet(damage, speed, width = 4, height = 3, x = 0, y = 0, index = 0) {
  engine.components.Component.call(this, width, height, shotImgPath, x, y, "image", index)

  this.damage = damage;
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