import Component from "../base/Component.js";
import Text from "../base/Text.js";

const gameOverImgPath = {idle: "../src/assets/img/screens/gameOver.png"};

function GameOver() {
  Component.call(this,  
    myGameArea.width,
    myGameArea.height,
    gameOverImgPath,
    0, 0, "image"
  );

  this.heading = new Text("12px", "#e2f3e4", "center");
  this.content = new Text("6px", "#e2f3e4", "center");
  this.choice = "none";

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.heading.write("Game Over", myGameArea.width / 2, 25);
    this.content.write("Press Space", myGameArea.width / 2, 40);
    this.content.write("to Continue", myGameArea.width / 2, 45)
  }

  this.restartGame = function(keyboardControl) {
    if (keyboardControl.keysPressed.spacePressed)
      this.choice = "restart";
  }
}

export default GameOver;