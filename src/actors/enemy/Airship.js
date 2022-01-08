import component from "../../base/component.js";
import soundComponent from "../../base/soundComponent.js";
import detectColision from "../../base/detectColision.js";

import Explosion from "../other/explosion.js";

const airshipImgPath = {
  idle: "../../src/assets/img/enemy/airship/idle.png",
  invisible: "../../src/assets/img/char/invisible.png"
};

function Airship(x = 940, y = 150) {
  component.call(this, 120, 80, airshipImgPath, x, y, "image");

  this.speed = 15;
  this.life = 8;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "left";
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new soundComponent("../../src/assets/sound/enemys/death.wav", 0.75);

  this.render = function() {   
    if (this.isDead && this.deathExplosion.duration > 0) {
      this.deathExplosion.getCurrentPosition(this.x - this.width, this.y);
      this.deathExplosion.animation.animate();     
      this.deathExplosion.render();
      this.deathExplosion.duration--;
    } else if (!this.isDead) {
      this.newPos();
      this.update();
    }
  }

  this.move = function() {
    this.isMoving = true;
    this.speedX = -this.speed;

    if (this.x < 0) {
      this.x = 1300;
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
          this.currentImage = this.images.idle; 
        }, 100);
      }     
    }
  }

  this.resurrect = function() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.life = 8;
    this.isDead = false;
  }
}

export default Airship;