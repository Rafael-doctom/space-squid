import Core from "../../core/Core.js"
import Screen from "../template/Screen.js";

function Credits() {
  Screen.call(this, "#332c50");
  this.content = new Core.Text(Core.GameArea);

  this.render = async function() {
    this.update();
    this.write(); 
  }

  this.write = function() {
    this.content.write("Credits", Core.GameArea.width / 2, 15, "10px", "#e2f3e4", "center");
    this.content.write("Back", 18, 7, "5px", "#e2f3e4", "center");

    this.content.write("Design, Art, Sound and Programming", Core.GameArea.width / 2, 26, "3px", "#94e344", "center");
    this.content.write("Augusto Ravazoli", Core.GameArea.width / 2, 30, "3px", "#e2f3e4", "center");

    this.content.write("Font", Core.GameArea.width / 2, 39, "3px", "#94e344", "center");
    this.content.write("Daymarius", Core.GameArea.width / 2, 43, "3px", "#e2f3e4", "center");

    this.content.write("Music", Core.GameArea.width / 2, 52, "3px", "#94e344", "center");
    this.content.write("Mixkit", Core.GameArea.width / 2, 56, "3px", "#e2f3e4", "center");

    this.content.write("Palette", Core.GameArea.width / 2, 65, "3px", "#94e344", "center");
    this.content.write("Kirokaze", Core.GameArea.width / 2, 69, "3px", "#e2f3e4", "center");
  }
}

export default Credits;