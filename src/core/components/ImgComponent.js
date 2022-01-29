import GameArea from "../other/GameArea.js"

/*
*
* @param {Object} imgPath - a object with img files path as properties
*
*/

function ImgComponent(imgPath) {
  const imgPathPropertiesName = Object.keys(imgPath);
 
  for (let count = 0; count < imgPathPropertiesName.length; count++) {
    this[imgPathPropertiesName[count]] = new Image();
    this[imgPathPropertiesName[count]].src = imgPath[imgPathPropertiesName[count]];
    this[imgPathPropertiesName[count]].onload = () => {
      GameArea.canvas.getContext("2d").imageSmoothingEnabled = false;
    }
  }
}

export default ImgComponent;