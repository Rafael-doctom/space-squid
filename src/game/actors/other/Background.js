import Core from "../../../core/Core.js";
import game from "../../../shared/game.js";

const backgroundImgPath = {idle: "../../src/assets/img/background/sky.png"};

function Background() {
  Core.Component.call(
    this, 
    game.width,
    game.height,
    backgroundImgPath,
    0, 0, "background",
    game
  )

  this.music = new Core.SoundComponent("../src/assets/sound/background/sky2.mp3", 0.35, true);

  this.render = function() {
    this.speedX = -0.25;
    this.newPos();
    this.update();
  }
}

export default Background;