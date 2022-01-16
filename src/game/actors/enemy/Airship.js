import engine from "../../../engine/engine.js"
import Explosion from "../other/Explosion.js";

const imgPath = "../../src/assets/img/enemy/airship/";

const airshipImgPath = {
  idle: `${imgPath}idle.png`,
  invisible: "../../../src/assets/img/char/invisible.png"
};

function Airship(x = 940, y = 150) {
  engine.components.Component.call(this, 12, 8, airshipImgPath, x, y, "image");

  this.speed = 2;
  this.life = 8;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "left";
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new engine.components.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);

  this.render = function() {   
    if (this.isDead && this.deathExplosion.duration > 0) {
      this.deathExplosion.getCurrentPosition(this.x - this.width, this.y);
      this.deathExplosion.animation.animate();     
      this.deathExplosion.render();
    } else if (!this.isDead) {
      this.newPos();
      this.update();
    }
  }

  this.move = function() {
    this.isMoving = true;
    this.speedX = -this.speed;

    if (this.x < 0) {
      this.x = myGameArea.width;
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