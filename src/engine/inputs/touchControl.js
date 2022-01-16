import Component from "../components/Component.js";
import detectColision from "../physics/detectColision.js";

const touchControl = {
  userFinger: new Component(8, 8, "black", 16, 24),
  otherUserFinger: new Component(8, 8, "blue", 0, 0),

  buttons: {
    up: new Component(24, 8, "red", 8, 44),
    down: new Component(24, 8, "green", 8, 60),
    left: new Component(8, 24, "orange", 8, 44),
    right: new Component(8, 24, "yellow", 24, 44),
    space: new Component(8, 8, "red", 110, 52)
  },

  buttonsPressed: {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
  },

  renderButtons: function() {
    this.buttons.up.update();
    this.buttons.down.update();
    this.buttons.left.update();
    this.buttons.right.update();
    this.buttons.space.update();
    this.userFinger.update();
    this.otherUserFinger.update();
  },

  initEvents: function() {
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
    const touch = e.changedTouches[0];
    const touch2 = e.changedTouches[1];

    let xRatio = 128 / innerWidth;
    let yRatio = 72 / innerHeight;

    this.userFinger.x = Math.floor(touch.pageX * xRatio) - this.userFinger.width / 2;
    this.userFinger.y = Math.floor(touch.pageY * yRatio) - this.userFinger.height / 2;

    if (touch2) {
      this.otherUserFinger.x = Math.floor(touch2.pageX * xRatio) - this.otherUserFinger.width / 2;
      this.otherUserFinger.y = Math.floor(touch2.pageY * yRatio) - this.otherUserFinger.height / 2;
    }

    this.isButtonTouched();
  },

  touchEndHandler: function(e) {  
    if (!e.touches[0]) {
      this.userFinger.x = 16;
      this.userFinger.y = 52;
    }

    if (!e.touches[1]) {
      this.otherUserFinger.x = 0;
      this.otherUserFinger.y = 0;
    }

    this.isButtonTouched();
  },

  isButtonTouched: function() {
    for (let button in this.buttons) {
      this.buttonsPressed[button] = 
      detectColision(this.userFinger, this.buttons[button]) ||
      detectColision(this.otherUserFinger, this.buttons[button]);
    }
  },
}

export default touchControl;