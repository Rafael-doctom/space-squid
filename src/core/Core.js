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

function Core() {}

Core.GameArea = GameArea;
Core.Animation = Animation;
Core.Component = Component;
Core.ImgComponent = ImgComponent;
Core.SoundComponent = SoundComponent;
Core.Text = Text;
Core.KeyboardControl = keyboardControl;
Core.TouchControl = touchControl;
Core.detectColision = detectColision;
Core.HitBox = HitBox;

export default Core;