window.myGameArea = {
  canvas: document.createElement("canvas"),
  width: 1024,
  height: 640,

  start: function() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = window.innerWidth + "px";
    this.canvas.style.height = window.innerHeight + "px";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default myGameArea;