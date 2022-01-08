const keyboardControl = {
  keysCode: {
    up: 87, //38,
    down: 83, //40,
    left: 65, //37,
    right: 68, //39,
    space: 32
  }, 

  keysPressed: {
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false
  },

  keyDownHandler: function(event) {
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
