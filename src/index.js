import engine from "./engine/engine.js";
import UI from "./UI/UI.js";

import Level0 from "./game/levels/level0.js";

const levels = [
  new Level0()
];

window.addEventListener("click", () => {
  myGameArea.canvas.requestFullscreen();
});

function startGame() {
  engine.other.myGameArea.start();
  engine.inputs.keyboardControl.initEvents();
  engine.inputs.touchControl.initEvents();
  updateGameArea();
}

function updateGameArea() {
  if (UI.title.cursor.choice == "none")
    UI.title.render();
  
  if (UI.title.cursor.choice == "start") {
    levels[0].start();
    if (levels[0].loosed) {
      UI.gameOver.render();
      if (UI.gameOver.cursor.choice == "restart") {
        levels[0] = new Level0();
      }
    }
  }

  engine.inputs.touchControl.renderButtons();
  requestAnimationFrame(updateGameArea);
}

startGame();
/*
let count = 0;

setInterval(() => {
  count++
  console.log(count);
}, 1000);
*/