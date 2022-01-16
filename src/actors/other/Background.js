import engine from "../../engine/engine.js";

const backgroundImgPath = {idle: "../src/assets/img/background/sky2.png"};

function Background() {
  engine.components.Component.call(
    this, 
    myGameArea.width,
    myGameArea.height,
    backgroundImgPath,
    0, 0, "background"
  )

  this.music = new engine.components.SoundComponent("../src/assets/sound/background/sky2.mp3", 0.35, true);

  this.render = function() {
    this.speedX = -1;
    this.newPos();
    this.update();
  }
}

export default Background;