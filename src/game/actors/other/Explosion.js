import engine from "../../../engine/engine.js";

const imgPath = "../../../src/assets/img/effects/explosion/"

const explosionImgPath = {
  e1: `${imgPath}1.png`,
  e2: `${imgPath}2.png`,
  e3: `${imgPath}3.png`,
  e4: `${imgPath}4.png`,
}

function Explosion() {
  engine.components.Component.call(this, 12, 12, explosionImgPath, 0, 0, "image");
  this.animation = new engine.other.Animation(this, [0, 1, 2, 3], 5);
  this.duration = 20;

  this.getCurrentPosition = function(x, y) {
    this.x = x;
    this.y = y;
    this.duration--;
  }

  this.render = function() {
    this.newPos();
    this.update();
  }
}

export default Explosion;