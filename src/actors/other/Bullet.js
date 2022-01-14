import Component from "../../base/Component.js";

const shotImgPath = {idle: "../src/assets/img/attacks/shot.png"};

function Bullet(damage, width = 32, height = 16, x = 0, y = 0) {
  Component.call(this, width, height, shotImgPath, x, y, "image")

  this.damage = damage;
  this.speed = 20;
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