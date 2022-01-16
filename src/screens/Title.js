import Component from "../base/Component.js";
import Text from "../base/Text.js";

const cursorImgPath = {idle: "../src/assets/img/other/cursor.png"};

function Title() {
  Component.call(
    this,
    myGameArea.width,
    myGameArea.height,
    "#332c50",
    0, 0
  );

  this.heading = new Text("14px", "#94e344", "center");
  this.menu = new Text("6px", "#e2f3e4", "center");
  this.cursor = new Component(6, 4, cursorImgPath, myGameArea.width / 3, 35, "image");
  this.choice = "none";
  this.cursorY = 35;
  this.cursorDelay = false;

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.heading.write("Space Squid", myGameArea.width / 2, 15);
    this.menu.write("Start", myGameArea.width / 2, 35);
    this.menu.write("Options", myGameArea.width / 2, 45);
    this.menu.write("Credits", myGameArea.width / 2, 55);

    this.cursor.y = this.cursorY - this.cursor.height;
    this.cursor.update();
  }

  this.movement = function(keyboardControl) {
    if (keyboardControl.keysPressed.upPressed) {this.moveCursor("up")}
    if (keyboardControl.keysPressed.downPressed) {this.moveCursor("down")}
    if (keyboardControl.keysPressed.spacePressed) {this.chooseCursor()}
  }

  this.moveCursor = function(dir) {
    if (this.cursorDelay) {
      return;
    }
  
    if (dir == "down")
      if (this.cursorY + 10 > 55)
        return;
      else
        this.cursorY += 10;
  
    if (dir == "up")
      if (this.cursorY - 10 < 35)
        return;
      else
        this.cursorY -= 10;    
  
    this.cursorDelay = true;
  
    setTimeout(() => {
      this.cursorDelay = false;
    }, 150);
  }

  this.chooseCursor = function() {
    if (this.cursorY == 35)
      this.choice = "start";
    else if (this.cursorY == 45)
      this.choice = "options";
    else if (this.cursorY == 55)
      this.choice = "credit";
  }
}

export default Title;