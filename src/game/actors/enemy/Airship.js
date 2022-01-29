import Core from "../../../core/Core.js";

import Enemy from "../templates/Enemy.js";
import SmallBullet from "../bullets/SmallBullet.js";

const imgPath = "assets/img/enemy/airship/";

const airshipImgPath = {
  idle1: `${imgPath}idle.png`,
};

function Airship(x, y) {
  Enemy.call(this, 1, 6, 2, 8, 8, x, y, airshipImgPath);

  this.attack = function() {
    if (this.bulletDelay == 0) {
      this.bullets.push(new SmallBullet(this.x, this.y + 2));
      this.bullets.push(new SmallBullet(this.x, this.y + 5));
  
      for (const bullet of this.bullets) 
        bullet.move("left");
      this.bulletDelay = 250;
    } 
  }

  this.move = function() {
    this.isMoving = true;
    this.speedX = -this.speed;

    if (this.x < 0) 
      this.x = Core.GameArea.width;
  }
}

export default Airship;