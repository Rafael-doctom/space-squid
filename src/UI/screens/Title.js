import Core from "../../core/Core.js"
import game from "../../shared/game.js";

import Screen from "../template/Screen.js";
import Cursor from "../other/Cursor.js";

function Title() {
  Screen.call(this, "#332c50");
  this.heading = new Core.Text("14px", "#94e344", "center", game);
  this.menu = new Core.Text("6px", "#e2f3e4", "center", game);
  this.cursor = new Cursor(game.width / 3, 31, ["start", "options", "credits"]);

  this.render = function() {
    this.update();
    this.write();
    this.cursor.movement(Core.KeyboardControl, Core.TouchControl);
    this.cursor.render();
  }

  this.write = function() {
    this.heading.write("Space Squid", game.width / 2, 15);
    this.menu.write("Start", game.width / 2, 35);
    this.menu.write("Options", game.width / 2, 45);
    this.menu.write("Credits", game.width / 2, 55);
  }
}

export default Title;