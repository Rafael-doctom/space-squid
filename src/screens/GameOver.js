import component from "../base/component.js";
import Text from "../base/Text.js";

const gameOverImgPath = {idle: "../src/assets/img/screens/gameOver.png"};

function GameOver() {
  component.call(this,  
    window.innerWidth,
    window.innerHeight,
    gameOverImgPath,
    0, 0, "image"
  );

  this.heading = new Text("120px", "#e2f3e4", "center");
  this.content = new Text("60px", "#e2f3e4", "center");
  this.choice = "none";

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.heading.write("Game Over", window.innerWidth / 2, 250);
    this.content.write("Press Space", window.innerWidth / 2, 450);
    this.content.write("to Continue", window.innerWidth / 2, 500)
  }

  this.restartGame = function(keyboardControl) {
    if (keyboardControl.keysPressed.spacePressed)
      this.choice = "restart";
  }
}

export default GameOver;