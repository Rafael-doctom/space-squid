import Core from "../../../core/Core.js";

const imgPath = "../../src/assets/img/healthBar/";

const healthBarImgPath = {
  l8: `${imgPath}eight.png`,
  l6: `${imgPath}six.png`,
  l4: `${imgPath}four.png`,
  l2: `${imgPath}two.png`,
  l0: `${imgPath}zero.png`
};

function HealthBar() {
  Core.Component.call(this, 6, 17, healthBarImgPath, 1, 1, "image", Core.GameArea);

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.changeImg = function(n) {
    this.currentImage = this.images["l" + n];
  }
  
}

export default HealthBar;