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

  this.heading = new Text("120px", "#94e344", "center");
  this.menu = new Text("40px", "#e2f3e4", "center");
  this.cursor = new Component(40, 40, cursorImgPath, myGameArea.width / 3, 300, "image");
  this.choice = "none";
  this.cursorY = 300;
  this.cursorDelay = false;

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.heading.write("Space Squid", myGameArea.width / 2, 150);
    this.menu.write("Start", myGameArea.width / 2, 300);
    this.menu.write("Options", myGameArea.width / 2, 400);
    this.menu.write("Credits", myGameArea.width / 2, 500);

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
      if (this.cursorY + 100 > 500)
        return;
      else
        this.cursorY += 100;
  
    if (dir == "up")
      if (this.cursorY - 100 < 300)
        return;
      else
        this.cursorY -= 100;    
  
    this.cursorDelay = true;
  
    setTimeout(() => {
      this.cursorDelay = false;
    }, 150);
  }

  this.chooseCursor = function() {
    if (this.cursorY == 300)
      this.choice = "start";
    else if (this.cursorY == 400)
      this.choice = "options";
    else if (this.cursorY == 500)
      this.choice = "credit";
  }
}

export default Title;