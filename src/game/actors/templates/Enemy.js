import Core from "../../../core/Core.js";
import game from "../../../shared/game.js";

import Explosion from "../other/Explosion.js";

function Enemy(speed, life, damage, width, height, x, y, imgPath) {
  Core.Component.call(this, width, height, imgPath, x, y, "image", game);

  this.speed = speed;
  this.life = life;
  this.damage = damage;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "up"
  this.bullets = [];
  this.bulletDelay = 0;
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new Core.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  
  this.render = function() {   
    if (this.isDead) {
      this.deathExplosion.actions(this.x, this.y);
    } else if (!this.isDead) {
      if (this.animation)
        this.animation.animate(!this.isDamaged, true);
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


  this.tookDamage = function(object) {
    if (!this.isDamaged) {
      if (Core.detectColision(this, object) && object.isMoving && !object.isDead) {
        this.isDamaged = true;
        this.life -= object.damage;
        object.life -= this.damage;

        if (object.life <= 0) 
          object.isDead = true;
  
        if (this.life <= 0) {
          this.deathSound.play();     
          this.isDead = true;
        }

        this.currentImage = this.images.invisible;
        
        setTimeout(() => {
          this.isDamaged = false; 
          this.currentImage = this.images.idle1;
        }, 100);
      }     
    }
  }

  this.resurrect = function() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.life = life;
    this.isDead = false;
  }
}

export default Enemy;