function WaveList() {
  this.waves = [];
  this.currentWave = 0;

  this.start = function() {
    this.waves[this.currentWave]();
  }
}

export default WaveList;