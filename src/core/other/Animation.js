/*
*
* @param {Object} object - a canvas element to be animated
* @param {Array of Integers} frames - the order of the frames 
* @param {Integer} fps - the speed of animation
*
*/

function Animation(object, frames, fps) {
  this.object = object;
  this.frames = frames;
  this.fps = fps;
  this.currentFrame = 0;
  this.frameCount = 0;
  this.animationCicleComplete = true;

  /*
  *
  * @param {Function or Boolean} condition - a callback function or boolean value 
  *   to choice if object will be animated, by default, it's receive true
  * @param {Boolean} forceConditionOverAnimationCicle - if true, the condition param will stop
  *   the animation before it's complete, by default it's false
  * 
  */

  this.animate = function(condition = true, forceConditionOverAnimationCicle = false) {

    if (forceConditionOverAnimationCicle)
      if (!condition)
        return;

    if (!condition && this.animationCicleComplete) 
      return;

    this.animationCicleComplete = false;
    
    this.frameCount++;
    if (this.frameCount < this.fps)
      return;
    this.frameCount = 0;

    const imagesKeys = Object.keys(this.object.images);

    this.object.currentImage = this.object.images[imagesKeys[this.frames[this.currentFrame]]];
    this.currentFrame++;
 
    if (this.currentFrame > this.frames.length - 1) {
      this.currentFrame = 0;
      this.animationCicleComplete = true;
    }
  }
}

export default Animation;