import Core from "./core/Core.js";
import UI from "./UI/UI.js";

import "./style.css"

const button = document.getElementById("game");

button.addEventListener("click", () => {
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
  UI.transition();
  UI.render();
  requestAnimationFrame(updateGameArea);
}
