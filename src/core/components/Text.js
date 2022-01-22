function Text(size = "16px", color = "black", position = "black", gameArea) {
  this.size = size;
  this.color = color;
  this.position = position;

  this.fontFace = new FontFace("Arcade Classic", "url(../src/assets/font/ArcadeClassic.ttf)");
  this.ctx = gameArea.canvas.getContext("2d");
  this.fontFace.load().then(font => {
    document.fonts.add(font);
    this.ctx.font = `16px Arcade Classic`;
  })

  this.write = function(string, x, y) {
    this.ctx.font = `${this.size} Arcade Classic`;
    this.ctx.textAlign = this.position;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(string, x, y);
  };
}

export default Text;