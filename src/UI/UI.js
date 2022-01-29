import Core from "../core/Core.js";

import Cursor from "./other/Cursor.js";

import Title from "./screens/Title.js";
import GameOver from "./screens/GameOver.js";
import Credits from "./screens/Credits.js";
import Options from "./screens/Options.js";

import Level0 from "../game/levels/level0.js";
import Pause from "./screens/Pause.js";
import Controls from "./screens/Controls.js";

const UI = {
  currentScreen: "title",
  screens: {
    title: new Title(),
    gameOver: new GameOver(),
    options: new Options(),
    controls: new Controls(),
    credits: new Credits(),
    game: [
      new Level0
    ],
    pause: new Pause()
  },
  cursor: new Cursor(
    {
      title: {
        choices: ["start", "options", "credits"],
        positions: [{x: 42, y: 34}, {x: 42, y: 44}, {x: 42, y: 54}],
      },
      options: {
        choices: ["back", "sound", "music", "controls"],
        positions: [{x: 3, y: 3}, {x: 64, y: 26}, {x: 64, y: 36}, {x: 64, y: 46}]
      },
      controls: {
        choices: ["back"],
        positions: [{x: 3, y: 3}]
      },
      credits: {
        choices: ["back"],
        positions: [{x: 3, y: 3}]
      },
      gameOver: {
        choices: ["restart"],
        positions: [{x: 40, y: 41}]
      }
    }
  ),

  render: function() {
    if (this.currentScreen == "game") {
      this.screens.title.music.stop();
      this.screens.game[0].start();
      if (this.screens.game[0].paused) {
        this.screens.pause.render();
      }
    } else {
      if (this.currentScreen == "title")
        this.screens[this.currentScreen].music.play();
      this.screens[this.currentScreen].render(this.cursor);

      this.cursor.changeScreen(this.currentScreen);
      this.cursor.render();
      this.cursor.movement(Core.KeyboardControl, Core.TouchControl, this.currentScreen)
    }

    Core.TouchControl.renderButtons(this.screens.game[0].paused);
  },

  transition: function() {
    if (this.currentScreen == "title") {
      if (this.cursor.choice == "start")
        this.currentScreen = "game";
      else if (this.cursor.choice == "options")
        this.currentScreen = "options";
      else if (this.cursor.choice == "credits")
        this.currentScreen = "credits";
    }

    if (this.currentScreen == "options") 
      if (this.cursor.choice == "back")
        this.currentScreen = "title";
      else if (this.cursor.choice == "controls")
        this.currentScreen = "controls";

    if (this.currentScreen == "credits") 
      if (this.cursor.choice == "back")
        this.currentScreen = "title";

    if (this.currentScreen == "controls")
      if (this.cursor.choice == "back")
        this.currentScreen = "options";

    if (this.screens.game[0].loosed)
      this.currentScreen = "gameOver"

    if (this.currentScreen == "gameOver") {
      this.screens.game[0].music.stop();
      if (this.cursor.choice == "restart") {
        this.screens.game[0] = new Level0();
        this.currentScreen = "game";
        this.cursor.choice = "none";
      }
    }
  }
}

export default UI;