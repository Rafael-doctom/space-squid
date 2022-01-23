import game from "../../shared/game.js"

import Component from "../components/Component.js";
import detectColision from "../physics/detectColision.js";

const touchControl = {
  touches: [],
  isTouchDevice: false,
  isPressed: false,
  isPressed2: false,

  joystick: {
    out: new Component(24, 24, {idle: "../../src/assets/img/controls/out.png"}, 2, 46, "image", game),
    in: new Component(8, 8, {idle: "../../src/assets/img/controls/in.png"}, 10, 54, "image", game),
    shot: new Component(16, 16, {idle: "../../src/assets/img/controls/shot.png"}, 105, 50, "image", game),
  },

  buttons: {
    up: new Component(24, 8, "red", 2, 46, game),
    down: new Component(24, 8, "green", 2, 62, game),
    left: new Component(8, 24, "orange", 2, 46, game),
    right: new Component(8, 24, "yellow", 18, 46, game),
  },
  
  space: new Component(16, 16, "red", 105, 50, game),

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

    window.addEventListener("touchstart", e => {
      this.touchStartHandler(e);
    }); 

    window.addEventListener("touchmove", e => {
      this.touchMoveHandler(e);
    }); 

    window.addEventListener("touchend", e => {
      this.touchEndHandler(e);
    });
  },

  touchStartHandler: function(e) {
    this.testButtons(e.targetTouches);
    this.testButtons2(e.targetTouches);
  },

  touchMoveHandler: function(e) {
    this.testButtons(e.targetTouches);
    this.testButtons2(e.targetTouches);
  },

  touchEndHandler: function(e) {  
    this.testButtons(e.targetTouches);
    this.testButtons2(e.targetTouches);
  },

  testButtons: function(targetTouches) {
    const xRatio = 128 / innerWidth;
    const yRatio = 72 / innerHeight;
    let button, touch, buttonActive;

    for (let index = 3; index > -1; --index) {
      button = this.buttons[Object.keys(this.buttons)[index]];
      buttonActive = false;

      if (targetTouches.length == 0) {
        this.buttonsPressed.up = false;
        this.buttonsPressed.down = false;
        this.buttonsPressed.left = false;
        this.buttonsPressed.right = false;
        this.isPressed = false;
        this.resetIn();
        return;
      }

      for (let index = targetTouches.length - 1; index > -1; --index) {
        touch = targetTouches[index];    
  
        touch.x = Math.floor(touch.pageX * xRatio) - 4;
        touch.y = Math.floor(touch.pageY * yRatio) - 4;
        touch.width = 4;
        touch.height = 4;
  
        if (touch.x > 100 && touch.y > 45 && targetTouches.length == 1) {
          this.buttonsPressed.up = false;
          this.buttonsPressed.down = false;
          this.buttonsPressed.left = false;
          this.buttonsPressed.right = false;
          this.isPressed = false;
          this.resetIn();
          return;
        } else if (touch.x > 100 && touch.y > 45 && targetTouches.length > 1) {
          continue;
        }
  
        if (detectColision(touch, this.joystick.out))
          this.isPressed = true;
  
        if (this.isPressed) {
          this.moveIn(touch.x, touch.y);
          let in2 = {
            x: this.joystick.in.x,
            y: this.joystick.in.y,
            width: 4,
            height: 4
          }
          if (detectColision(in2, button)) 
            buttonActive = true;
          else 
            buttonActive = false;
        }

      }
      
      this.buttonsPressed[Object.keys(this.buttonsPressed)[index]] = buttonActive;
    } 
  },

  testButtons2: function(targetTouches) {
    const xRatio = 128 / innerWidth;
    const yRatio = 72 / innerHeight;
    let touch;

    if (targetTouches.length == 0) {
      this.buttonsPressed.space = false;
      return;
    }

    for (let index = targetTouches.length - 1; index > -1; --index) {
      touch = targetTouches[index];
      touch.x = Math.floor(touch.pageX * xRatio) - 4;
      touch.y = Math.floor(touch.pageY * yRatio) - 4;
      touch.width = 4;
      touch.height = 4;
  
      if (targetTouches.length == 1 && this.isPressed) {
        this.buttonsPressed.space = false;
        return;
      }

      if (detectColision(touch, this.space)) {
        this.buttonsPressed.space = true;
      }  
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