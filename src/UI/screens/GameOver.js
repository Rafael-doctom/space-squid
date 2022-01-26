import Core from "../../core/Core.js"
import Screen from "../template/Screen.js";

function GameOver() {
  Screen.call(this, "#332c50");
  this.content = new Core.Text(Core.GameArea);

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.content.write("Game Over", Core.GameArea.width / 2, 25, "12px", "#e2f3e4", "center");
    this.content.write("Restart", Core.GameArea.width / 2, 45, "6px", "#e2f3e4", "center");
  }
}

export default GameOver;