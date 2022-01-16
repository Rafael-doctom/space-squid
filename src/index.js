import engine from "./engine/engine.js";

import level1 from "./game/levels/level1.js";
import Title from "./UI/screens/Title.js";

let title = null;

window.addEventListener("click", () => {
  myGameArea.canvas.requestFullscreen();
});

function startGame() {
  engine.other.myGameArea.start();
  title = new Title();
  engine.inputs.keyboardControl.initEvents();
  engine.inputs.touchControl.initEvents();
  updateGameArea();
}

function updateGameArea() {
  if (title.choice == "none") {
    title.render();
    title.movement(engine.inputs.keyboardControl);
  }

  if (title.choice == "start")
    level1();
  //engine.inputs.touchControl.renderButtons();
  requestAnimationFrame(updateGameArea);
}

startGame();