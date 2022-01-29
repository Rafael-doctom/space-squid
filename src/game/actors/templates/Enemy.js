import Core from "../../../core/Core.js";

import Explosion from "../other/Explosion.js";

/*
*
* Represents a enemy template
*
* @param {Number} speed - speed
* @param {Number} life - life 
* @param {Number} damage - damage 
* @param {Number} width - width in pixels
* @param {Number} height - height in pixels
* @param {Number} x - horizontal position in canvas
* @param {Number} y - vertical position in canvas
* @param {String or Object} color - a color or image object path
*
*/

function Enemy(speed, life, damage, width, height, x, y, imgPath) {
  Core.Component.call(this, width, height, imgPath, x, y, "image", Core.GameArea);

  this.speed = speed;
  this.life = life;
  this.damage = damage;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.isActive = false;
  this.direction = "up"
  this.bullets = [];
  this.bulletDelay = 0;
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new Core.SoundComponent("assets/sound/enemys/death.wav", 1);
  
  this.entry = function() {
    this.isMoving = true;
    if (!this.isActive) {
      this.speedX = -this.speed;
    }
    
    if (this.x == this.initialX) {
      this.speedX = 0;
      this.isActive = true;
    }
  }

  this.render = function() {   
    if (this.isDead) {
      this.deathExplosion.actions(this.x, this.y);
    } else if (!this.isDead) {
      if (this.animation)
        this.animation.animate(!this.isDamaged, true);
      this.newPos();
      
      if (this.isDamaged)
        this.erase();
      else
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
        
        setTimeout(() => {
          this.isDamaged = false; 
        }, 100);
      }     
    }
  }
}

export default Enemy;