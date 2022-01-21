import engine from "../../engine/engine.js";
import Screen from "../template/Screen.js";
import Cursor from "../other/Cursor.js";

function Title() {
  Screen.call(this, "#332c50");
  this.heading = new engine.components.Text("14px", "#94e344", "center");
  this.menu = new engine.components.Text("6px", "#e2f3e4", "center");
  this.cursor = new Cursor(myGameArea.width / 3, 31, ["start", "options", "credits"]);

  this.render = function() {
    this.update();
    this.write();
    this.cursor.movement(engine.inputs.keyboardControl);
    this.cursor.render();
  }

  this.write = function() {
    this.heading.write("Space Squid", engine.other.myGameArea.width / 2, 15);
    this.menu.write("Start", engine.other.myGameArea.width / 2, 35);
    this.menu.write("Options", engine.other.myGameArea.width / 2, 45);
    this.menu.write("Credits", engine.other.myGameArea.width / 2, 55);
  }
}

export default Title;