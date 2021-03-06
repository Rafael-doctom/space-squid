const keyboardControl = {
  keysCode: {
    up: 87, 
    down: 83, 
    left: 65, 
    right: 68, 
    space: 74,
    enter: 13
  }, 

  keysPressed: {
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false,
    enterPressed: 0
  },

  initEvents: function() {
    window.addEventListener('keydown', e => {
      this.keyDownHandler(e);
    });
  
    window.addEventListener('keyup', e => {
      this.keyUpHandler(e);
    });
  },

  keyDownHandler: function(event) {
    if (event.keyCode == this.keysCode.enter)
      this.keysPressed.enterPressed++;

    if (event.keyCode == this.keysCode.space)
      this.keysPressed.spacePressed = true;

    if(event.keyCode == this.keysCode.right) {
      this.keysPressed.rightPressed = true;
    }
    else if(event.keyCode == this.keysCode.left) {
      this.keysPressed.leftPressed = true;
    }
    if(event.keyCode == this.keysCode.down) {
      this.keysPressed.downPressed = true;
    }
    else if(event.keyCode == this.keysCode.up) {
      this.keysPressed.upPressed = true;
    }
  },
  
  keyUpHandler: function(event) {
    if (this.keysPressed.enterPressed > 1)
      this.keysPressed.enterPressed = 0;

    if (event.keyCode == this.keysCode.space)
      this.keysPressed.spacePressed = false;

    if(event.keyCode == this.keysCode.right) {
      this.keysPressed.rightPressed = false;
    }
    else if(event.keyCode == this.keysCode.left) {
      this.keysPressed.leftPressed = false;
    }
    if(event.keyCode == this.keysCode.down) {
      this.keysPressed.downPressed = false;
    }
    else if(event.keyCode == this.keysCode.up) {
      this.keysPressed.upPressed = false;
    }
  }
};
  
export default keyboardControl;
