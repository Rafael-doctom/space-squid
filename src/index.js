import myGameArea from "./base/myGameArea.js";
import keyboardControl from "./base/keyboardControl.js";

import Title from "./screens/Title.js";
import level1 from "./levels/level1.js";

let title = null;

function startGame() {
  myGameArea.start();
  title = new Title();
  updateGameArea();

  window.addEventListener('keydown', function (e) {
    keyboardControl.keyDownHandler(e);
  });

  window.addEventListener('keyup', function (e) {
    keyboardControl.keyUpHandler(e);
  });
}

function updateGameArea() {
  if (title.choice == "none") {
    title.render();
    title.movement(keyboardControl);
  }

  if (title.choice == "start")
    level1();

  requestAnimationFrame(updateGameArea);
}

startGame();