import engine from "../engine/engine.js";

const gameOverImgPath = {idle: "../src/assets/img/screens/gameOver.png"};

function GameOver() {
  engine.components.Component.call(this,  
    myGameArea.width,
    myGameArea.height,
    gameOverImgPath,
    0, 0, "image"
  );

  this.heading = new engine.components.Text("12px", "#e2f3e4", "center");
  this.content = new engine.components.Text("6px", "#e2f3e4", "center");
  this.choice = "none";

  this.render = function() {
    this.update();
    this.write();
  }

  this.write = function() {
    this.heading.write("Game Over", engine.other.myGameArea.width / 2, 25);
    this.content.write("Press Space", engine.other.myGameArea.width / 2, 40);
    this.content.write("to Continue", engine.other.myGameArea.width / 2, 45)
  }

  this.restartGame = function(keyboardControl) {
    if (keyboardControl.keysPressed.spacePressed)
      this.choice = "restart";
  }
}

export default GameOver;