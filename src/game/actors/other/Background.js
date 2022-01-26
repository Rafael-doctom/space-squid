import Core from "../../../core/Core.js";

const backgroundImgPath = {idle: "../../src/assets/img/background/sky.png"};

function Background() {
  Core.Component.call(
    this, 
    Core.GameArea.width,
    Core.GameArea.height,
    backgroundImgPath,
    0, 0, "background",
    Core.GameArea
  )

  this.render = function() {
    this.speedX = -0.25;
    this.newPos();
    this.update();
  }
}

export default Background;