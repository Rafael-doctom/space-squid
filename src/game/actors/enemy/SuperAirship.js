import engine from "../../../engine/engine.js";
import Explosion from "../other/Explosion.js";

const imgPath = "../../src/assets/img/enemy/superAirship/";

const superAirshipImgPath = {
  idle: `${imgPath}idle.png`,
  upWing: `${imgPath}upWing.png`,
  noWing: `${imgPath}noWing.png`,
  noLasers: `${imgPath}noLasers.png`,
  oneTurbine: `${imgPath}oneTurbine.png`,
  dead: `${imgPath}dead.png`,
  invisible: "../../../src/assets/img/char/invisible.png"
};

function SuperAirship(x = 940, y = 150) {
  engine.components.Component.call(this, 480, 480, superAirshipImgPath, x, y, "image");

  this.speed = 2.5;
  this.life = 128;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "down";
  this.hitBox = {
    upWing: new engine.physics.HitBox(240, 150),
    body: new engine.physics.HitBox(480, 180),
    downWing: new engine.physics.HitBox(240, 150)
  }
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new engine.components.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);

  this.render = function() {   
      if (this.isDead && this.deathExplosion.duration > 0) {
        this.deathExplosion.getCurrentPosition(this.x, this.y);
        this.deathExplosion.animation.animate();     
        this.deathExplosion.render();
      } else if (!this.isDead) {
        this.hitBox.upWing.getCurrentPosition(this.x + this.width - 240, this.y);
        this.hitBox.body.getCurrentPosition(this.x, this.y + 150);
        this.hitBox.downWing.getCurrentPosition(this.x + this.width - 240, this.y + 300);
        this.newPos();
        this.update();
      }
    }

  this.move = function() {
    this.isMoving = true;

    this.speedY = this.direction == "up" ? -this.speed : this.speed;

    if (this.y == 0) {
      this.direction = "down";
    }

    if (this.y == 200) {
      this.direction = "up";
    }
  }

  this.attack = function() {}

  this.tookDamage = function(object) {
    let colideCount = 0;

    for (let index in this.hitBox) {
      if (engine.physics.detectColision(this.hitBox[index], object) && this.hitBox[index].isActive)
        colideCount++;
    }
 
    if (!this.isDamaged) {
      if (colideCount > 0 && object.isMoving && !object.isDead) {
        this.isDamaged = true;
        this.life -= object.damage;

        if (object.constructor.name == "Bullet") 
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
    if (this.life <= 128 && this.life >= 97)
      this.currentImage = this.images.idle; 
    else if (this.life <= 97 && this.life >= 65) {
      this.currentImage = this.images.upWing;
      this.hitBox.downWing.isActive = false;
    } else if (this.life <= 65 && this.life >= 33) {
      this.currentImage = this.images.noWing;
      this.hitBox.upWing.isActive = false;
    } else if (this.life <= 33 && this.life >= 17)
      this.currentImage = this.images.noLasers;
    else if (this.life <= 17 && this.life >= 0)
      this.currentImage = this.images.oneTurbine
    else 
      this.currentImage = this.images.dead;
  }
} 

export default SuperAirship;