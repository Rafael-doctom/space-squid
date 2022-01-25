import Core from "../../core/Core.js"

import Screen from "../template/Screen.js";
import Cursor from "../other/Cursor.js";

function Credits() {
  Screen.call(this, "#332c50");
  this.heading = new Core.Text("10px", "#e2f3e4", "center", Core.GameArea);
  this.menu = new Core.Text("4px", "#94e344", "center", Core.GameArea);
  this.paragraph = new Core.Text("3px", "#e2f3e4", "center", Core.GameArea);
  this.cursor = new Cursor(15, 10, ["back"]);

  this.render = async function() {
    this.update();
    this.write(); 
    //this.cursor.render();
    this.cursor.movement(Core.KeyboardControl, Core.TouchControl);
  }

  this.write = function() {
    this.heading.write("Credits", Core.GameArea.width / 2, 15);

    this.menu.write("Design", Core.GameArea.width / 2, 25);
    this.paragraph.write("Augusto_Ravazoli", Core.GameArea.width / 2, 28);

    this.menu.write("Art", Core.GameArea.width / 2, 35);
    this.paragraph.write("Augusto_Ravazoli", Core.GameArea.width / 2, 38);

    this.menu.write("Programming", Core.GameArea.width / 2, 45);
    this.paragraph.write("Augusto_Ravazoli", Core.GameArea.width / 2, 48);

    this.menu.write("Sound", Core.GameArea.width / 2, 55);
    this.paragraph.write("Augusto_Ravazoli", Core.GameArea.width / 2, 58);

    this.menu.write("Test", Core.GameArea.width / 2, 65);
    this.paragraph.write("Augusto_Ravazoli", Core.GameArea.width / 2, 68);

    //this.menu.write("Back", 30, 15);
  }
}

export default Credits;