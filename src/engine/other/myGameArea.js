window.myGameArea = {
  canvas: document.createElement("canvas"),
  width: 128,
  height: 72,

  start: function() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;  

    this.canvas.style.width = innerWidth + "px";
    this.canvas.style.height = innerHeight + "px";
    this.canvas.style.objectFit = "contain";

    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    const originalHeight = this.canvas.height;
    const originalWidth = this.canvas.width;

    let dimensions = this.getObjectFitSize(
      true,
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      this.canvas.width,
      this.canvas.height
    );

    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = dimensions.width * dpr;
    this.canvas.height = dimensions.height * dpr;

    let ratio = Math.min(
      this.canvas.clientWidth / originalWidth,
      this.canvas.clientHeight / originalHeight
    );
    
    this.context.scale(ratio * dpr, ratio * dpr); 
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  getObjectFitSize: function(
    contains /* true = contain, false = cover */,
    containerWidth,
    containerHeight,
    width,
    height
  ) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;
  
    if (test) {
      targetWidth = containerWidth;
      targetHeight = targetWidth / doRatio;
    } else {
      targetHeight = containerHeight;
      targetWidth = targetHeight * doRatio;
    }
  
    return {
      width: targetWidth,
      height: targetHeight,
      x: (containerWidth - targetWidth) / 2,
      y: (containerHeight - targetHeight) / 2
    };
  }
}

export default myGameArea;