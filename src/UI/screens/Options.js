import Core from "../../core/Core.js"
import Screen from "../template/Screen.js";

function Options() {
  Screen.call(this, "#332c50");
  this.content = new Core.Text(Core.GameArea);
  this.soundState = "on";
  this.musicState = "on";

  this.toggleState = function(cursor) {
    if (cursor.choice == "music") {
      this.musicState = this.musicState == "on" ? "off" : "on";
    }

    if (cursor.choice == "sound") {
      this.soundState = this.soundState == "on" ? "off" : "on";
    } 
  }

  this.render = function(cursor) {
    this.toggleState(cursor);
    this.update();
    this.write();
  }

  this.write = function() {
    this.content.write("Options", Core.GameArea.width / 2, 15, "10px", "#e2f3e4", "center");
    this.content.write("Back", 18, 7, "5px", "#e2f3e4", "center");

    this.content.write("Music", Core.GameArea.width / 3, 30, "4px", "#e2f3e4", "center");
    this.content.write("Sound", Core.GameArea.width / 3, 40, "4px", "#e2f3e4", "center");
    this.content.write("Controls", Core.GameArea.width / 3, 50, "4px", "#e2f3e4", "center");

    if (this.soundState == "on")
      this.content.write("ON", Core.GameArea.width - 45, 30, "4px", "#94e344", "center");
    else 
      this.content.write("OFF", Core.GameArea.width - 45, 30, "4px", "#e2f3e4", "center");

    if (this.musicState == "on")
      this.content.write("ON", Core.GameArea.width - 45, 40, "4px", "#94e344", "center");
    else
      this.content.write("OFF", Core.GameArea.width - 45, 40, "4px", "#e2f3e4", "center");

    this.content.write("Default", Core.GameArea.width - 45, 50, "4px", "#e2f3e4", "center");
  }
}

export default Options;