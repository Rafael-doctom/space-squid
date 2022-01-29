import Core from "../../../core/Core.js";

import Enemy from "../templates/Enemy.js";
import SmallBullet from "../bullets/SmallBullet.js";

const imgPath = "assets/img/enemy/helicopter/";

const helicopterImgPath = {
  idle1: `${imgPath}idle1.png`,
  idle2: `${imgPath}idle2.png`,
  idle3: `${imgPath}idle3.png`,
  invisible: "assets/img/char/invisible.png"
};

function Helicopter(x, y) {
  Enemy.call(this, 0.5, 8, 2, 12, 7, x, y, helicopterImgPath);
  this.animation = new Core.Animation(this, [0, 1, 2, 1], 2);

  this.move = function() {
    this.isMoving = true;
    this.speedY = this.direction == "up" ? -this.speed : this.speed;

    if (this.y == 0) 
      this.direction = "down";
    if (this.y == Core.GameArea.height - 15)
      this.direction = "up";
  }

  this.attack = function(targetYStart, targetYEnd) {  
    if (this.bulletDelay == 0 && this.y + 5 > targetYStart && this.y + 5 < targetYEnd) {
      this.bullets.push(new SmallBullet(this.x, this.y + 5));
  
      for (const bullet of this.bullets) 
        bullet.move("left");
      this.bulletDelay = 500;
    } 
  }
}

export default Helicopter;