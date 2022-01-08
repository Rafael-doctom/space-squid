import component from "../../base/component.js";
import soundComponent from "../../base/soundComponent.js";

const backgroundImgPath = {idle: "../src/assets/img/background/sky2.png"};

function Background() {
  component.call(
    this, 
    window.innerWidth,
    window.innerHeight,
    backgroundImgPath,
    0, 0, "background"
  )

  this.music = new soundComponent("../src/assets/sound/background/sky2.mp3", 0.35, true);

  this.render = function() {
    this.speedX = -1;
    this.newPos();
    this.update();
  }
}

export default Background;