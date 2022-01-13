import Component from "../../base/Component.js";
import detectColision from "../../base/detectColision.js";
import Animation from "../../base/Animation.js";

import Bullet from "../other/Bullet.js";
import SoundComponent from "../../base/SoundComponent.js";
import Explosion from "../other/Explosion.js";

const helicopterImgPath = {
  idle1: "../../src/assets/img/enemy/helicopter/idle1.png",
  idle2: "../../src/assets/img/enemy/helicopter/idle2.png",
  idle3: "../../src/assets/img/enemy/helicopter/idle3.png",
  invisible: "../../src/assets/img/char/invisible.png"
};

function Helicopter(x = 940, y = 150) {
  Component.call(this, 120, 80, helicopterImgPath, x, y, "image");

  this.speed = 5;
  this.life = 16;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "up"
  this.bullets = [];
  this.bulletDelay = 0;
  this.idleAnimation = new Animation(this, [0, 1, 2, 1], 2);
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  
  this.render = function() {   
    if (this.isDead && this.deathExplosion.duration > 0) {
      this.deathExplosion.getCurrentPosition(this.x, this.y);
      this.deathExplosion.animation.animate();     
      this.deathExplosion.render();
      this.deathExplosion.duration--;
    } else if (!this.isDead) {
      this.idleAnimation.animate(!this.isDamaged, true);
      this.newPos();
      this.update();
    }
  }

  this.renderBullets = function() {
    this.bullets = this.bullets.filter(bullet => !bullet.isDead);

    for (const bullet of this.bullets) {
      if (bullet.x > 0) {
        bullet.render();
      } else {
        bullet.isDead = true;
        bullet.clearmove();
      }
    }

    if (this.bulletDelay > 0)
      this.bulletDelay -= 10;
  }

  this.attack = function(targetYStart, targetYEnd) {  
    if (this.bulletDelay == 0 && this.y > targetYStart && this.y < targetYEnd) {
      this.bullets.push(new Bullet(this.damage, 40, 20, this.x, this.y));
  
      for (const bullet of this.bullets) {
        bullet.move("left");
      }

      this.bulletDelay = 500;
    } 
  }

  this.move = function(targetYStart, targetYEnd) {
    this.isMoving = true;

    this.speedY = this.direction == "up" ? -this.speed : this.speed;

    if (this.y == 0) {
      this.direction = "down";
    }

    if (this.y == 600) {
      this.direction = "up";
    }
  }

  this.tookDamage = function(object) {
    if (!this.isDamaged) {
      if (detectColision(this, object) && object.isMoving && !object.isDead) {
        this.isDamaged = true;
        this.life -= object.damage;

        if (object.constructor.name == "Bullet") 
          object.isDead = true;
  
        if (this.life <= 0) {
          this.deathSound.play();     
          this.isDead = true;
        }

        this.currentImage = this.images.invisible;
        
        setTimeout(() => {
          this.isDamaged = false; 
        }, 100);
      }     
    }
  }

  this.resurrect = function() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.life = 16;
    this.isDead = false;
  }
}

export default Helicopter;