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

  this.heading = new Text("100px", "#e2f3e4", "center");
  this.content = new Text("40px", "#e2f3e4", "center");
  this.choice = "none";

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.heading.write("Game Over", myGameArea.width / 2, 250);
    this.content.write("Press Space", myGameArea.width / 2, 450);
    this.content.write("to Continue", myGameArea.width / 2, 500)
  }

  this.restartGame = function(keyboardControl) {
    if (keyboardControl.keysPressed.spacePressed)
      this.choice = "restart";
  }
}

export default GameOver;