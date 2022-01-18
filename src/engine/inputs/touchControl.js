import Component from "../components/Component.js";
import detectColision from "../physics/detectColision.js";

const touchControl = {
  touches: [],
  isTouchDevice: false,

  joystick: {
    out: new Component(24, 24, {idle: "../../src/assets/img/controls/out.png"}, 2, 46, "image"),
    in: new Component(8, 8, {idle: "../../src/assets/img/controls/in.png"}, 10, 54, "image"),
    shot: new Component(24, 24, {idle: "../../src/assets/img/controls/shot.png"}, 102, 46, "image"),
  },

  buttons: {
    up: new Component(24, 8, "red", 2, 46),
    down: new Component(24, 8, "green", 2, 62),
    left: new Component(8, 24, "orange", 2, 46),
    right: new Component(8, 24, "yellow", 18, 46),
    space: new Component(24, 24, "red", 102, 46)
  },

  buttonsPressed: {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
  },

  renderButtons: function() {
    if (!this.isTouchDevice)
      return;
/*
    this.buttons.up.update();
    this.buttons.down.update();
    this.buttons.left.update();
    this.buttons.right.update();
    this.buttons.space.update();
*/
    this.joystick.out.update()
    this.joystick.in.update();
    this.joystick.shot.update();
  },

  initEvents: function() {
    function isTouchDevice() {
      return (('ontouchstart' in window) ||
         (navigator.maxTouchPoints > 0) ||
         (navigator.msMaxTouchPoints > 0));
    }

    if (isTouchDevice())
      this.isTouchDevice = true;
    else 
      this.isTouchDevice = false;

    if (!this.isTouchDevice)
      return;

    this.buttons.space.name = "space";

    window.addEventListener("touchstart", e => {
      this.touchStartHandler(e);
    }); 

    window.addEventListener("touchmove", e => {
      this.touchStartHandler(e);
    }); 

    window.addEventListener("touchend", e => {
      this.touchEndHandler(e);
    });
  },

  touchStartHandler: function(e) {
    this.testButtons(e.targetTouches);
  },

  touchEndHandler: function(e) {  
    this.testButtons(e.targetTouches);
    this.resetIn();
  },

  testButtons: function(targetTouches) {
    const xRatio = 128 / innerWidth;
    const yRatio = 72 / innerHeight;
    let button, touch, buttonActive;

    for (let index = 4; index > -1; --index) {
      button = this.buttons[Object.keys(this.buttons)[index]];
      buttonActive = false;

      for (let index = targetTouches.length - 1; index > -1; --index) {
        touch = targetTouches[index]
        touch.x = Math.floor(touch.pageX * xRatio) - 4;
        touch.y = Math.floor(touch.pageY * yRatio) - 4;
        touch.width = 8;
        touch.height = 8;
        
        
        if (detectColision(touch, button)) {
          if (button.name != "space")
            this.moveIn(touch.x, touch.y);
          buttonActive = true;
          break;
        } 
      }

      this.buttonsPressed[Object.keys(this.buttonsPressed)[index]] = buttonActive;
    } 
  },

  moveIn: function(x, y) {
    this.joystick.in.x = x;
    this.joystick.in.y = y;

    if (this.joystick.in.x > 18)
      this.joystick.in.x = 18;
    if (this.joystick.in.x < 2)
      this.joystick.in.x = 2;

    if (this.joystick.in.y > 62)
      this.joystick.in.y = 62;
    if (this.joystick.in.y < 46)
      this.joystick.in.y = 46;
  },

  resetIn: function() {
    this.joystick.in.x = 10;
    this.joystick.in.y = 54;
  }
}

export default touchControl;