window.myGameArea = {
  canvas: document.createElement("canvas"),
  width: 1024,
  height: 576,

  start: function() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default myGameArea;