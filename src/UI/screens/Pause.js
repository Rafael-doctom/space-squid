import Core from "../../core/Core.js"
import Screen from "../template/Screen.js";

function Pause() {
  Screen.call(this, "transparent");
  this.content = new Core.Text(Core.GameArea);

  this.render = function() {
    this.update();
    this.write(); 
  }

  this.write = function() {
    this.content.write("Paused", 64, 36, "5px", "#46878f", "center");
  }
}

export default Pause;