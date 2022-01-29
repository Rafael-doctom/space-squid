import Core from "./core/Core.js";
import UI from "./UI/UI.js";

import loading from "./core/other/loading.js";

import "./style.css"

const button = document.getElementById("game");

loading.start();

document.fonts.ready.then(function () {
  button.innerHTML = "Loading";
});

const interval = setInterval(() => {
  if (loading.isLoaded) {
    button.classList.remove("button--loading");
    button.classList.add("button--active")
    button.innerHTML = "";

    button.addEventListener("click", () => {
      if (document.fullscreenElement && document.fullscreenElement.nodeName == 'CANVAS') 
        return;
      
      document.getElementById("game").style.display = "none";
      
      startGame();
    });

    clearInterval(interval);
  }
}, 50);

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
