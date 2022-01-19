import Bullet from "../templates/Bullet.js";
import Explosion from "../other/Explosion.js";
import engine from "../../../engine/engine.js";

const imgPath = {
  frame1: "../../src/assets/img/attacks/missile1.png",
  frame2: "../../src/assets/img/attacks/missile2.png",
  frame3: "../../src/assets/img/char/invisible.png"
};

function Missile(x, y) {
  Bullet.call(this, 2, 0.5, 10, 4, x, y, imgPath);
  this.animation = new engine.other.Animation(this, [0, 1], 5);
  this.deathExplosion = new Explosion(this.x, this.y);
  this.deathSound = new engine.components.SoundComponent("../../src/assets/sound/enemys/death.wav", 0.75);
  this.life = 6;

  this.render = function() {
    if (this.isDead) {
      this.deathExplosion.actions(this.x - 5, this.y - 4);
    } else if (!this.isDead) {
      this.animation.animate(!this.isDamaged, true);
      this.newPos();
      this.update();
    }
  }

  this.tookDamage = function(object) {
    if (!this.isDamaged) {
      if (engine.physics.detectColision(this, object) && !object.isDead) {
        this.isDamaged = true;
        if (object.constructor.name == "Char") 
          this.life = 0;
        else {
          object.life -= this.damage;
          this.life -= object.damage;
        }
        

        if (object.life <= 0) 
          object.isDead = true;
  
        if (this.life <= 0) {
          this.deathSound.play();     
          this.isDead = true;
        }

        this.currentImage = this.images.frame3;
        
        setTimeout(() => {
          this.isDamaged = false; 
          this.currentImage = this.images.frame1;
        }, 100);
      }     
    }
  }
}

export default Missile;