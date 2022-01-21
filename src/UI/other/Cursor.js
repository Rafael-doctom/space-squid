import engine from "../../engine/engine.js";

const cursorImgPath = {idle: "../../../src/assets/img/other/cursor.png"};

function Cursor(x, y, choices, move) {
  engine.components.Component.call(this, 6, 4, cursorImgPath, x, y, "image");
  this.delay = false;
  this.choice = "none";
  this.choices = choices
  this.index = 0;

  this.render = function() {
    this.newPos();
    this.update();
  }

  this.movement = function(keyboardControl) {
    if (!move) {
      if (keyboardControl.keysPressed.upPressed) {this.move("up")}
      if (keyboardControl.keysPressed.downPressed) {this.move("down")}
    }

    if (keyboardControl.keysPressed.spacePressed) {this.select()}
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
    this.choice = this.choices[this.index];
  }
}

export default Cursor;