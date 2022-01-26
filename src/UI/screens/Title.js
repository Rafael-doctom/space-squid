import Core from "../../core/Core.js"
import Screen from "../template/Screen.js";

function Title() {
  Screen.call(this, "#332c50");
  this.content = new Core.Text(Core.GameArea);
  this.music = new Core.SoundComponent("../src/assets/sound/UI/mixkit-techno-fights-171.mp3", 0.35, true);

  this.render = function() {
    this.music.play();
    this.update();
    this.write(); 
  }

  this.write = function() {
    this.content.write("SPACE SQUID", Core.GameArea.width / 2, 20, "12px", "#94e344", "center");
    this.content.write("Start", Core.GameArea.width / 2, 38, "5px", "#e2f3e4", "center");
    this.content.write("Options", Core.GameArea.width / 2, 48, "5px", "#e2f3e4", "center");
    this.content.write("Credits", Core.GameArea.width / 2, 58, "5px", "#e2f3e4", "center");
    this.content.write("© Augusto Ravazoli, 2022", Core.GameArea.width / 2, 70, "2px", "#e2f3e4", "center")
    this.content.write("v0.1.0", Core.GameArea.width - 10, 70, "2px", "#e2f3e4", "center");
  }
}

export default Title;