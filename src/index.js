import game from "./shared/game.js";
import Core from "./core/Core.js";

import UI from "./UI/UI.js";
import Level0 from "./game/levels/level0.js";

const levels = [
  new Level0()
];

window.addEventListener("click", () => {
  game.canvas.requestFullscreen();
});

function startGame() {
  game.init();
  Core.KeyboardControl.initEvents();
  Core.TouchControl.initEvents();
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

  Core.TouchControl.renderButtons();
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