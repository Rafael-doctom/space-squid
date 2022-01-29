import Core from "../../core/Core.js";

const cursorImgPath = {idle: "assets/img/other/cursor.png"};

/*
*
* @param {Object} screens - a object with screens objects with choices and position properties 
* @param {String} currentScreen - the current screen of the cursor, by default it's "title"
*
*/

function Cursor(screens, currentScreen = "title") {
  Core.Component.call(this, 6, 4, cursorImgPath, 42, 34, "image", Core.GameArea);
  this.delay = false;
  this.choice = "none";
  this.screens = screens;
  this.currentScreen = currentScreen;
  this.index = 0;
  this.state = 0;

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.changeScreen = function(screen) {
    if (this.currentScreen == screen) return;
    
    this.currentScreen = screen;
    this.index = 0;
    this.x = this.screens[this.currentScreen].positions[0].x;
    this.y = this.screens[this.currentScreen].positions[0].y;
  }

  this.movement = function(keyboardControl, touchControl) {
    if (keyboardControl.keysPressed.upPressed || touchControl.buttonsPressed.up) {
      this.move("up");
    }

    if (keyboardControl.keysPressed.downPressed || touchControl.buttonsPressed.down) {
      this.move("down");
    }

    if (keyboardControl.keysPressed.spacePressed || touchControl.buttonsPressed.space) {
      this.select();
      this.state++;
    } else {
      if (this.state > 1)
        this.state = 0;
    }
  }

  this.move = function(dir) {
    if (this.delay) 
      return;

    if (dir == "down") {
      if (this.index < this.screens[this.currentScreen].positions.length - 1)
        this.index++;
      this.x = this.screens[this.currentScreen].positions[this.index].x;
      this.y = this.screens[this.currentScreen].positions[this.index].y;
    }

    if (dir == "up") {
      if (this.index > 0)
        this.index--;
      this.x = this.screens[this.currentScreen].positions[this.index].x;
      this.y = this.screens[this.currentScreen].positions[this.index].y;
    }

    this.delay = true;
  
    setTimeout(() => {
      this.delay = false;
    }, 150);
  }

  this.select = function() {
    if (this.state != 1) {
      this.choice = "none";
      return;
    }

    this.choice = this.screens[this.currentScreen].choices[this.index];
  }
}

export default Cursor;