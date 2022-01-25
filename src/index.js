import Core from "./core/Core.js";

import UI from "./UI/UI.js";
import Level0 from "./game/levels/level0.js";

import xor from "./utils/xor.js";

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
    UI.title.music.play();
    //UI.credits.render();
  }
  
  if (UI.title.cursor.choice == "start") {
    if (!xor(Core.KeyboardControl.keysPressed.enterPressed == 1, Core.TouchControl.buttonsPressed.enter == 1))  
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