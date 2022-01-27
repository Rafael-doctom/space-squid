import Core from "./core/Core.js";

import UI from "./UI/UI.js";
import Level0 from "./game/levels/level0.js";

import "./style.css"

const levels = [
  new Level0()
];

document.getElementById("game").addEventListener("click", () => {
  if (document.fullscreenElement && document.fullscreenElement.nodeName == 'CANVAS') 
    return;

  document.getElementById("game").style.display = "none";

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