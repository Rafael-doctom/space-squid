import GameArea from "./other/GameArea.js";
import Animation from "./other/Animation.js";

import Component from "./components/Component.js";
import ImgComponent from "./components/ImgComponent.js";
import SoundComponent from "./components/SoundComponent.js";
import Text from "./components/Text.js";

import keyboardControl from "./inputs/keyboardControl.js";
import touchControl from "./inputs/touchControl.js";

import detectColision from "./physics/detectColision.js";
import HitBox from "./physics/Hitbox.js";

class Core {
  static GameArea = GameArea;
  static Animation = Animation;
  static Component = Component;
  static ImgComponent = ImgComponent;
  static SoundComponent = SoundComponent;
  static Text = Text;
  static KeyboardControl = keyboardControl;
  static TouchControl = touchControl;
  static detectColision = detectColision;
  static HitBox = HitBox;
}

export default Core;