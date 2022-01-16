import engine from "../../../engine/engine.js"

import Bullet from "../other/Bullet.js";
import Explosion from "../other/Explosion.js";

const imgPath = "../../src/assets/img/enemy/helicopter/";

const helicopterImgPath = {
  idle1: `${imgPath}idle1.png`,
  idle2: `${imgPath}idle2.png`,
  idle3: `${imgPath}idle3.png`,
  invisible: "../../../src/assets/img/char/invisible.png"
};

function Helicopter(x = 940, y = 150) {
  engine.components.Component.call(this, 12, 8, helicopterImgPath, x, y, "image");

  this.speed = 0.5;
  this.life = 16;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "up"
  this.bullets = [];
  this.bulletDelay = 0;
  this.idleAnimation = new engine.other.Animation(this, [0, 1, 2, 1], 2);
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new engine.components.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  
  this.render = function() {   
    if (this.isDead && this.deathExplosion.duration > 0) {
      this.deathExplosion.getCurrentPosition(this.x, this.y);
      this.deathExplosion.animation.animate();     
      this.deathExplosion.render();
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
      this.bullets.push(new Bullet(this.damage, 4, 2, this.x, this.y));
  
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

    if (this.y == myGameArea.height - 8) {
      this.direction = "up";
    }
  }

  this.tookDamage = function(object) {
    if (!this.isDamaged) {
      if (engine.physics.detectColision(this, object) && object.isMoving && !object.isDead) {
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