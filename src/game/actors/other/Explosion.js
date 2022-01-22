import Core from "../../../core/Core.js";
import game from "../../../shared/game.js";

const imgPath = "../../../src/assets/img/effects/explosion/"

const explosionImgPath = {
  e1: `${imgPath}1.png`,
  e2: `${imgPath}2.png`,
  e3: `${imgPath}3.png`,
  e4: `${imgPath}4.png`,
}

function Explosion() {
  Core.Component.call(this, 12, 12, explosionImgPath, 0, 0, "image", game);
  this.animation = new Core.Animation(this, [0, 1, 2, 3], 5);
  this.duration = 20;

  this.actions = function(x, y) {
    if (this.duration > 0) {
      this.getCurrentPosition(x, y);
      this.animation.animate();
      this.render();
      this.duration--;
    }
  }

  this.getCurrentPosition = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.render = function() {
    this.newPos();
    this.update();
  }
}

export default Explosion;