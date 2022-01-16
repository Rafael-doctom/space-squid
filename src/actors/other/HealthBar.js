import engine from "../../engine/engine.js";

const healthBarImgPath = {
  l8: "../src/assets/img/healthBar/eight.png",
  l6: "../src/assets/img/healthBar/six.png",
  l4: "../src/assets/img/healthBar/four.png",
  l2: "../src/assets/img/healthBar/two.png",
  l0: "../src/assets/img/healthBar/zero.png"
};

function HealthBar() {
  engine.components.Component.call(this, 6, 16, healthBarImgPath, 1, 1, "image");

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.changeImg = function(n) {
    this.currentImage = this.images["l" + n];
  }
  
}

export default HealthBar;