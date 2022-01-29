import loading from "../other/loading.js";

/*
*
* @param {String} src - audio file path
* @param {Number} volume - audio volume, 1.0 by default
* @param {Boolean} replay - if true, audio will replay indefinitely, by default it's false
*
*/

function SoundComponent(src, volume = 1.0, replay = false) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = volume;
  this.sound.loop = replay;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.isPlaying = false;
  this.sound.addEventListener("canplaythrough", () => loading.audioCount++);

  this.play = function() {
    this.sound.play();
    this.isPlaying = true;
  }
  this.stop = function() {
    this.sound.pause();
    this.isPlaying = false;
  }
  this.reset = function() {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.isPlaying = false;
  }
}

export default SoundComponent;