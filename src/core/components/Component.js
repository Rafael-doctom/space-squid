/*
*
* @param {Integer} width - object width in pixels
* @param {Integer} height - object height in pixels
* @param {String} color - object color or image path
* @param {Integer} x - object horizontal position in canvas
* @param {Integer} y - object vertical position in canvas
* @param {String} type - object type: image or background
* @param {Object} myGameArea - object with canvas context
*
*/

import ImgComponent from "./ImgComponent.js";

function Component(width, height, color, x, y, type, gameArea) {
  this.type = type;
  if (type == "image" || type == "background") {
    this.images = new ImgComponent(color);
    this.currentImage = this.images[Object.keys(this.images)[0]];
  }
  this.width = width;
  this.height = height;
  this.initialX = x;
  this.initialY = y;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function() {
    const ctx = gameArea.canvas.getContext("2d");
    if (type == "image" || type == "background") {
      ctx.drawImage(this.currentImage,
        this.x,
        this.y,
        this.width, this.height);
        if (type == "background") {
          ctx.drawImage(this.currentImage, this.x + this.width, this.y, this.width, this.height);
        }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  },

  this.erase = function() {
    const ctx = gameArea.canvas.getContext("2d");
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == "background") {
      if (this.x == -(this.width)) {
        this.x = 0;
      }
    }
  }

  this.rotate = function(angle) {
    const ctx = gameArea.context;
    const rad = angle; 
    
    ctx.save()
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(this.currentImage, this.width / 2 * (-1), this.height / 2 * (-1), this.width, this.height);
    ctx.restore();
  }
}

export default Component;