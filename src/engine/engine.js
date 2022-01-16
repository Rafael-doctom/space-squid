import myGameArea from "./other/myGameArea.js";
import Animation from "./other/Animation.js";

import Component from "./components/Component.js";
import ImgComponent from "./components/ImgComponent.js";
import SoundComponent from "./components/SoundComponent.js";
import Text from "./components/Text.js";

import keyboardControl from "./inputs/keyboardControl.js";
import touchControl from "./inputs/touchControl.js";

import detectColision from "./physics/detectColision.js";
import HitBox from "./physics/Hitbox.js";

const engine = {
  other: {
    myGameArea,
    Animation
  },
  components: {
    Component,
    ImgComponent,
    SoundComponent,
    Text
  },
  inputs: {
    keyboardControl,
    touchControl
  },
  physics: {
    detectColision,
    HitBox
  }
}

export default engine;