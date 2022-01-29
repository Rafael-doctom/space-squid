const loading = {
  audioCount: 0,
  imgCount: 0,
  fontCount: 0,
  isLoaded: false,

  start: function() {
    const interval = setInterval(() => {
      if (this.imgCount == 32 && this.audioCount == 4 && this.fontCount == 6) {
        this.isLoaded = true;
        clearInterval(interval);
      }
    }, 50);
  }
}

export default loading;