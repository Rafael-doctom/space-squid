import engine from "../../engine/engine.js";

const explosionImgPath = {
  e1: "../../src/assets/img/effects/explosion/1.png",
  e2: "../../src/assets/img/effects/explosion/2.png",
  e3: "../../src/assets/img/effects/explosion/3.png",
  e4: "../../src/assets/img/effects/explosion/4.png",
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