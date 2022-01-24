import Core from "./core/Core.js";

import UI from "./UI/UI.js";
import Level0 from "./game/levels/level0.js";

import xor from "./utils/xor.js";
import syncDelay from "./utils/syncDelay.js";

const levels = [
  new Level0()
];

let state = 0;

window.addEventListener("click", () => {
  if (state > 0)
    return;

  state++;
  startGame();
});

function startGame() {
  Core.GameArea.init();
  Core.KeyboardControl.initEvents();
  Core.TouchControl.initEvents();
  updateGameArea();
}

async function updateGameArea() {
  if (UI.title.cursor.choice == "none") {
    UI.title.render();
    await syncDelay(100);
  }
  
  if (UI.title.cursor.choice == "start") {
    if (!xor(Core.KeyboardControl.keysPressed.enterPressed == 1, Core.TouchControl.buttonsPressed.enter == 1))  
      levels[0].start();

    if (levels[0].loosed) {
      UI.gameOver.render();
      await syncDelay(500);
      if (UI.gameOver.cursor.choice == "restart") {
        levels[0] = new Level0();
        UI.gameOver.cursor.choice = "none";
      }
    }
  }
  
  Core.TouchControl.renderButtons();
  requestAnimationFrame(updateGameArea);
}