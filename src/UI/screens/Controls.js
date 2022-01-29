import Core from "../../core/Core.js"
import Screen from "../template/Screen.js";

function Controls() {
  Screen.call(this, "#332c50");
  this.content = new Core.Text(Core.GameArea);

  this.render = async function() {
    this.update();
    this.write(); 
  }

  this.write = function() {
    this.content.write("Controls", Core.GameArea.width / 2, 15, "10px", "#e2f3e4", "center");
    this.content.write("Back", 18, 7, "5px", "#e2f3e4", "center");

    this.content.write("Up", Core.GameArea.width / 3, 30, "4px", "#e2f3e4", "center");
    this.content.write("Down", Core.GameArea.width / 3, 36, "4px", "#e2f3e4", "center");
    this.content.write("Left", Core.GameArea.width / 3, 42, "4px", "#e2f3e4", "center");
    this.content.write("Right", Core.GameArea.width / 3, 48, "4px", "#e2f3e4", "center");
    this.content.write("Shot", Core.GameArea.width / 3, 54, "4px", "#e2f3e4", "center");
    this.content.write("Pause", Core.GameArea.width / 3, 60, "4px", "#e2f3e4", "center");

    this.content.write("W", Core.GameArea.width - 45, 30, "4px", "#e2f3e4", "center");
    this.content.write("S", Core.GameArea.width - 45, 36, "4px", "#e2f3e4", "center");
    this.content.write("A", Core.GameArea.width - 45, 42, "4px", "#e2f3e4", "center");
    this.content.write("D", Core.GameArea.width - 45, 48, "4px", "#e2f3e4", "center");
    this.content.write("J", Core.GameArea.width - 45, 54, "4px", "#e2f3e4", "center");
    this.content.write("ENTER", Core.GameArea.width - 45, 60, "4px", "#e2f3e4", "center");
  }
}

export default Controls;