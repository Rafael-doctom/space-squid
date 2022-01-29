import loading from "../other/loading.js";

/*
*
* @param {Object} gameArea - canvas context
*
*/

function Text(gameArea) {
  this.fontFace = new FontFace("Retro Gaming", "url(assets/font/RetroGaming.ttf)");
  this.ctx = gameArea.canvas.getContext("2d");
  this.fontFace.load().then(font => {
    document.fonts.add(font);
    this.ctx.font = `6px Retro Gaming`;
    loading.fontCount++;
  })

  this.write = function(string, x, y, size, color, position) {
    this.ctx.font = `${size} Retro Gaming`;
    this.ctx.textAlign = position;
    this.ctx.fillStyle = color;
    this.ctx.fillText(string, x, y);
  };
}

export default Text;