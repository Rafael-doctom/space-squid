import component from "../../base/component.js";

const healthBarImgPath = {
  l8: "../src/assets/img/healthBar/eight.png",
  l6: "../src/assets/img/healthBar/six.png",
  l4: "../src/assets/img/healthBar/four.png",
  l2: "../src/assets/img/healthBar/two.png",
  l0: "../src/assets/img/healthBar/zero.png"
};

function HealthBar() {
  component.call(this, 60, 180, healthBarImgPath, 25, 25, "image");

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.changeImg = function(n) {
    this.currentImage = this.images["l" + n];
  }
  
}

export default HealthBar;