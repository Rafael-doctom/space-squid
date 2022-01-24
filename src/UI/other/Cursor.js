import Core from "../../core/Core.js";

const cursorImgPath = {idle: "../../../src/assets/img/other/cursor.png"};

function Cursor(x, y, choices, move) {
  Core.Component.call(this, 6, 4, cursorImgPath, x, y, "image", Core.GameArea);
  this.delay = false;
  this.choice = "none";
  this.choices = choices
  this.index = 0;

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.movement = function(keyboardControl, touchControl) {
    if (!move) {
      if (keyboardControl.keysPressed.upPressed || touchControl.buttonsPressed.up) {this.move("up")}
      if (keyboardControl.keysPressed.downPressed || touchControl.buttonsPressed.down) {this.move("down")}
    }

    if (keyboardControl.keysPressed.spacePressed || touchControl.buttonsPressed.space) {this.select()}
  }

  this.move = function(dir) {
    if (this.delay) 
      return;

    if (dir == "down")
      if (this.y + 10 > 55)
        return;
      else
        this.y += 10;
  
    if (dir == "up")
      if (this.y - 10 < 31)
        return;
      else
        this.y -= 10;    
  
    this.delay = true;
  
    setTimeout(() => {
      this.delay = false;
    }, 150);
  }

  this.select = function() {
    if (this.delay) 
      return;

    this.choice = this.choices[this.index];

    setTimeout(() => {
      this.delay = false;
    }, 150);
  }
}

export default Cursor;