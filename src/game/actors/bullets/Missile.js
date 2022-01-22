import Core from "../../../core/Core.js";

import Bullet from "../templates/Bullet.js";
import Explosion from "../other/Explosion.js";

import angler from "../../../utils/angler.js";

const imgPath = {
  frame1: "../../src/assets/img/attacks/missile1.png",
  frame2: "../../src/assets/img/attacks/missile2.png",
  frame3: "../../src/assets/img/char/invisible.png"
};

function Missile(x, y) {
  Bullet.call(this, 2, 0.5, 10, 4, x, y, imgPath);
  this.animation = new Core.Animation(this, [0, 1], 5);
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new Core.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  this.life = 6;
  this.targetX = null;
  this.targetY = null;
  this.angle = 0;
  this.directionX = 0;
  this.directionY = 0;

  this.render = function() {
    if (this.isDead) {
      this.deathExplosion.actions(this.x + this.directionX, this.y + this.directionY);
    } else if (!this.isDead) {
      this.animation.animate(!this.isDamaged, true);
      this.newPos();
      this.rotate(this.angle);
    }
  }

  this.getCurrentTargetPosition = function(char) {
    this.targetX = char.x;
    this.targetY = char.y;
    
    if (this.y + 1 > this.targetY && this.y - 1 < this.targetY && this.x > this.targetX)
      this.angle = 0;
    else
      this.angle = angler(this.targetX, this.targetY, this.x, this.y);
    
    if (this.y + 1 > this.targetY && this.y - 1 < this.targetY) {
      this.speedY = 0;
      this.directionY = -4;
    }
    else if (this.y > this.targetY) {
      this.speedY = -this.speed / 2;
      this.directionY = -8;
    } else if (this.y < this.targetY) {
      this.speedY = this.speed / 2;
      this.directionY = 0;
    }

    if (this.x + 1 > this.targetX && this.x - 1 < this.targetX) {
      this.speedX = 0;
      this.directionX = 0;
    } else if (this.x > this.targetX) {
      this.speedX = -this.speed;
      this.directionX = -5;
    }
    else if (this.x < this.targetX) {
      this.speedX = this.speed;
      this.directionX = 5;
    }
  }

  this.move = function() {
    this.isMoving = true;
  }

  this.tookDamage = function(object) {
    if (!this.isDamaged) {
      if (Core.detectColision(this, object, "complex") && !object.isDead) {
        this.isDamaged = true;
        if (object.constructor.name == "Char") 
          this.life = 0;
        else {
          object.life -= this.damage;
          this.life -= object.damage;
        }
        

        if (object.life <= 0) 
          object.isDead = true;
  
        if (this.life <= 0) {
          this.deathSound.play();     
          this.isDead = true;
        }

        this.currentImage = this.images.frame3;
        
        setTimeout(() => {
          this.isDamaged = false; 
          this.currentImage = this.images.frame1;
        }, 100);
      }     
    }
  }
}

export default Missile;