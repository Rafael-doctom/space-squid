import engine from "../../../engine/engine.js"
import Explosion from "../other/Explosion.js";
import Bullet from "../other/Bullet.js";

const imgPath = "../../src/assets/img/enemy/airship/";

const airshipImgPath = {
  idle: `${imgPath}idle.png`,
  invisible: "../../../src/assets/img/char/invisible.png"
};

function Airship(x = 940, y = 150) {
  engine.components.Component.call(this, 8, 8, airshipImgPath, x, y, "image");

  this.speed = 1;
  this.life = 6;
  this.damage = 2;
  this.isDamaged = false;
  this.isDead = false;
  this.isMoving = false;
  this.direction = "left";
  this.bullets = [];
  this.bulletDelay = 0;
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

  this.attack = function() {
    if (this.bulletDelay == 0) {
      this.bullets.push(new Bullet(this.damage, 2, 2, 1, this.x, this.y + 2));
      this.bullets.push(new Bullet(this.damage, 2, 2, 1, this.x, this.y + 5));
  
      for (const bullet of this.bullets) {
        bullet.move("left");
      }y

      this.bulletDelay = 250;
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