import Core from "./core/Core.js";

import UI from "./UI/UI.js";
import Level0 from "./game/levels/level0.js";


const levels = [
  new Level0()
];

window.addEventListener("click", () => {
  if (document.fullscreenElement && document.fullscreenElement.nodeName == 'CANVAS') 
    return;

  startGame();
});

function startGame() {
  Core.GameArea.init();
  Core.KeyboardControl.initEvents();
  Core.TouchControl.initEvents();
  updateGameArea();
}

function updateGameArea() {
  UI.transition(levels[0]);
  UI.render(levels[0]);
  requestAnimationFrame(updateGameArea);
}