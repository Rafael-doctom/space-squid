import Core from "../../../core/Core.js";
import game from "../../../shared/game.js";

import syncDelay from "../../../utils/syncDelay.js";

import Explosion from "../other/Explosion.js";
import SmallBullet from "../bullets/SmallBullet.js";
import BigBullet from "../bullets/BigBullet.js";
import Missile from "../bullets/Missile.js";

const imgPath = "../../../src/assets/img/enemy/superAirship/";

const superAirshipImgPath = {
  idle: `${imgPath}idle.png`,
  noUpWing: `${imgPath}noUpWing.png`,
  noDownWing: `${imgPath}noDownWing.png`,
  noWings: `${imgPath}noWings.png`,
  noLasersNoWings: `${imgPath}noLasersNoWings.png`,
  noLasersNoDownWing: `${imgPath}noLasersNoDownWing.png`,
  noLasersNoUpWing: `${imgPath}noLasersNoUpWing.png`,
  noLasers: `${imgPath}noLasers.png`,
  invisible: "../../../src/assets/img/char/invisible.png"
};

function SuperAirship(x, y) {
  Core.Component.call(this, 32, 32, superAirshipImgPath, x, y, "image", game);

  this.speed = 0.5;
  this.life = 128;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.isActive = false;
  this.direction = "down";
  this.bullets = [];
  this.bulletDelay = 0;
  this.cannonDirection = "up";
  this.currentPhase = 1;
  this.hitBox = {
    upWing: new Core.HitBox(16, 8, 16, 2),
    cockpit: new Core.HitBox(15, 8, 0, 2),
    body: new Core.HitBox(16, 16, 0, 2),
    downWing: new Core.HitBox(16, 8, 16, 2)
  }
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new Core.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  this.b = true;
  this.a = true;

  this.render = function() {   
    if (this.isDead) {
      this.deathExplosion.actions(this.x, this.y)
    } else if (!this.isDead && this.isActive) {
      this.hitBox.upWing.getCurrentPosition(this.x + this.width - 16, this.y);
      this.hitBox.body.getCurrentPosition(this.x + 16, this.y + 8);
      this.hitBox.cockpit.getCurrentPosition(this.x + 1, this.y + 12);
      this.hitBox.downWing.getCurrentPosition(this.x + this.width - 16, this.y + 24);
      this.newPos();
      this.update();
    }
  }

  this.move = function(phase) {
    if (phase == 1 || phase == 0) {
      this.speedY = 0;
      return;
    }

    this.isMoving = true;
    this.speedY = this.direction == "up" ? -this.speed : this.speed;

    if (this.y == 2) 
      this.direction = "down";
    if (this.y == game.height - 41) 
      this.direction = "up";    
  }

  this.behavior = async function() {
    if (this.isActive && !this.isDead) {
      if (this.a && this.b) 
        await syncDelay(1000);
      
      this.move(this.currentPhase);
      this.attack(this.currentPhase);
      
      if (this.currentPhase == 1 && this.a) {
        this.a = false;
        this.b = true;
        setTimeout(() => {
          this.currentPhase = 0;
          setTimeout(() => this.currentPhase = 2, 1000);
        }, 3000);
      }
      if (this.currentPhase == 2 && this.b) {
        this.b = false;
        this.a = true;
        setTimeout(() => {
          this.currentPhase = 0;
          setTimeout(() => this.currentPhase = 1, 1000);
        }, 5000);
      }
    }
  }
  
  this.renderBullets = function(char) {
    this.bullets = this.bullets.filter(bullet => !bullet.isDead || (bullet.constructor.name == "Missile" && bullet.deathExplosion.duration > 0));

    for (const bullet of this.bullets) {
      if (bullet.x > 0) {
        if (bullet.constructor.name == "Missile") 
          bullet.getCurrentTargetPosition(char);
        bullet.render();
      } else {
        bullet.isDead = true;
        bullet.clearmove();
      }
    }

    if (this.bulletDelay > 0)
      this.bulletDelay -= 10;
  }

  this.attack = function(phase) {
    if (this.bulletDelay == 0 && this.isActive) {
      if (phase == 1) 
        this.attackPattern1();
      if (phase == 2) 
        this.attackPattern2();
      if (phase == 0)
        this.attackPattern3();

      for (const bullet of this.bullets) {
        bullet.move("left");
      }

      if (phase == 1) 
        this.bulletDelay = 250;
      else if (phase == 2)
        this.bulletDelay = 120;
      else if (phase == 0)
        this.bulletDelay = 750;
    } 
  }

  this.attackPattern1 = function() {
    if (this.hitBox.upWing.isActive) {
      this.bullets.push(new SmallBullet(this.x + 16, this.y + 1));
      this.bullets.push(new SmallBullet(this.x + 16, this.y + 5));
    } 
    if (this.hitBox.downWing.isActive) {
      this.bullets.push(new SmallBullet(this.x + 16, this.y + 26));
      this.bullets.push(new SmallBullet(this.x + 16, this.y + 30));
    }

    if (this.cannonDirection == "up") {
      this.bullets.push(new BigBullet(this.x - 2, this.y + 10));
      this.cannonDirection = "down";
    } else if (this.cannonDirection == "down") {
      this.bullets.push(new BigBullet(this.x - 2, this.y + 19));
      this.cannonDirection = "up";
    }
  }

  this.attackPattern2 = function() {
    this.bullets.push(new BigBullet(this.x - 2, this.y + 10));
    this.bullets.push(new BigBullet(this.x - 2, this.y + 19));
  }

  this.attackPattern3 = function() {
    this.bullets.push(new Missile(this.x + 16, this.y + 14));
  }

  this.tookDamage = function(object) {
    if (!this.isDamaged) {
      let colideCount = 0;
      //console.log(this.life)

      for (let index in this.hitBox) {
        if (Core.detectColision(this.hitBox[index], object) && this.hitBox[index].isActive) {
          this.hitBox[index].life -= object.damage;
          colideCount++;
        }
      }
 
      if (colideCount > 0 && object.isMoving && !object.isDead) {
        this.isDamaged = true;
        this.life -= object.damage;
        object.life -= this.damage; 

        if (object.life <= 0) 
          object.isDead = true;
  
        if (this.life <= 0) {
          this.deathSound.play();     
          this.isDead = true;
        }

        this.changeState();
        this.currentImage = this.images.invisible;
        
        setTimeout(() => {
          this.isDamaged = false;
          this.changeState();
        }, 100);
      }     
    }
  }

  this.changeState = function() {
    if (this.hitBox.upWing.life <= 0 && this.hitBox.downWing.life <= 0) {
      this.currentImage = this.images.noWings;
      this.hitBox.upWing.isActive = false;
      this.hitBox.downWing.isActive = false;
    } else if (this.hitBox.upWing.life <= 0) {
      this.currentImage = this.images.noUpWing;
      this.hitBox.upWing.isActive = false;
    } else if (this.hitBox.downWing.life <= 0) {
      this.currentImage = this.images.noDownWing;
      this.hitBox.downWing.isActive = false;
    } else {
      this.currentImage = this.images.idle;
    }
  }
} 

export default SuperAirship;