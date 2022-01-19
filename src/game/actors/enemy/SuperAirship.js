import engine from "../../../engine/engine.js";
import Explosion from "../other/Explosion.js";
import SmallBullet from "../bullets/SmallBullet.js";
import BigBullet from "../bullets/BigBullet.js";
import Missile from "../bullets/Missile.js";
import myGameArea from "../../../engine/other/myGameArea.js";

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
  engine.components.Component.call(this, 32, 32, superAirshipImgPath, x, y, "image");

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
    upWing: new engine.physics.HitBox(16, 8, 16),
    cockpit: new engine.physics.HitBox(15, 8, 80),
    body: new engine.physics.HitBox(16, 16, 16),
    downWing: new engine.physics.HitBox(16, 8, 16)
  }
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new engine.components.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  this.b = true;
  this.a = true;

  this.render = function() {   
    if (this.isDead && this.deathExplosion.duration > 0) {
      this.deathExplosion.getCurrentPosition(this.x, this.y);
      this.deathExplosion.animation.animate();     
      this.deathExplosion.render();
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

    if (this.y == 2) {
      this.direction = "down";
    }

    if (this.y == myGameArea.height - 41) {
      this.direction = "up";    
    }
  }

  this.behavior = async function() {
    if (this.isActive) {
      if (this.a && this.b) {
        await engine.other.syncDelay(1000);
      }
     
      this.move(this.currentPhase);
      this.attack(this.currentPhase);
      
      if (this.currentPhase == 1 && this.a) {
        this.a = false;
        this.b = true;
        setTimeout(() => {
          this.currentPhase = 0;
          setTimeout(() => this.currentPhase = 2, 1000);
        }, 5000);
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
        bullet.render();
        //if (bullet.constructor.name == "Missile")
          //bullet.getCurrentTargetPosition(char);
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
      /*if (phase == 1)
        this.attackPattern1();
      else if (phase == 2)
        this.attackPattern2();
      else if (phase == 0)*/
        this.attackPattern3();

      for (const bullet of this.bullets) {
        bullet.move("left");
      }

      this.bulletDelay = 2000;
/*
      if (phase == 1) 
        this.bulletDelay = 250;
      else if (phase == 2)
        this.bulletDelay = 120;
      else if (phase == 0)
        this.bulletDelay = 750;*/
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
    if (this.hitBox.cockpit.life > 0) {
      if (this.cannonDirection == "up") {
        this.bullets.push(new BigBullet(this.x - 2, this.y + 10));
        this.cannonDirection = "down";
      } else if (this.cannonDirection == "down") {
        this.bullets.push(new BigBullet(this.x - 2, this.y + 19));
        this.cannonDirection = "up";
      }
    }
  }

  this.attackPattern2 = function() {
    if (this.hitBox.cockpit.life > 0) {
      this.bullets.push(new BigBullet(this.x - 2, this.y + 10));
      this.bullets.push(new BigBullet(this.x - 2, this.y + 19));
    }
  }

  this.attackPattern3 = function() {
    this.bullets.push(new Missile(this.x + 16, this.y + 14));
  }

  this.tookDamage = function(object) {
    console.log(this.life);
    let colideCount = 0;

    for (let index in this.hitBox) {
      if (engine.physics.detectColision(this.hitBox[index], object) && this.hitBox[index].isActive) {
        colideCount++;
        this.hitBox[index].life -= object.damage;
      }
    }
 
    if (!this.isDamaged) {
      if (colideCount > 0 && object.isMoving && !object.isDead) {
        this.isDamaged = true;
        this.life -= object.damage;
        object.life -= this.damage; 

        if (object.life <= 0) 
          object.isDead = true;
  
        if (this.life == 0) {
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
    this.transitionFromWingDestroyed();
    this.transitionFromCockpitDestroyed();
  }

  this.transitionFromWingDestroyed = function() {
    if (this.hitBox.upWing.life <= 0 && this.hitBox.downWing.life <= 0 && this.hitBox.cockpit.life > 0) {
      this.currentImage = this.images.noWings;
      this.hitBox.upWing.isActive = false;
      this.hitBox.downWing.isActive = false;
    } else if (this.hitBox.upWing.life <= 0) {
      this.currentImage = this.images.noUpWing;
      this.hitBox.upWing.isActive = false;
    }
    else if (this.hitBox.downWing.life <= 0) {
      this.currentImage = this.images.noDownWing;
      this.hitBox.downWing.isActive = false;
    } else {
      this.currentImage = this.images.idle;
    }
  }

  this.transitionFromCockpitDestroyed = function() {
    if (this.hitBox.cockpit.life <= 0 && this.hitBox.upWing.life <= 0 && this.hitBox.downWing.life <= 0) {
      this.currentImage = this.images.noLasersNoWings;
      this.hitBox.upWing.isActive = false;
      this.hitBox.downWing.isActive = false;
    } else if (this.hitBox.upWing.life <= 0 && this.hitBox.cockpit.life <= 0) {
      this.currentImage = this.images.noLasersNoUpWing;
      this.hitBox.upWing.isActive = false;
    } else if (this.hitBox.downWing.life <= 0 && this.hitBox.cockpit.life <= 0) {
      this.currentImage = this.images.noLasersNoDownWing;
      this.hitBox.downWing.isActive = false;
    } else if (this.hitBox.cockpit.life <= 0) {
      this.currentImage = this.images.noLasers;
    }  
  }
} 

export default SuperAirship;