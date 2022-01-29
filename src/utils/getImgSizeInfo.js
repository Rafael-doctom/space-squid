/*
*
* @param {Object} img - a contain object with x, y, width and height properties
*
*/

function getImgSizeInfo(img) {
 var pos = window.getComputedStyle(img).getPropertyValue("object-position").split(" ");
 return getRenderedSize(
   true,
   innerWidth,
   innerHeight,
   128,
   72,
   parseInt(pos[0])
 );
}

/*
*
* Returns the rendered size and position of a image element with object-fit: contain;
*
* @param {Boolean} contains - if object-fit of the image element is "contain", set it true
* @param {Number} cWidth - current width of the image element
* @param {Number} cHeight - current height of the image element
* @param {Number} width - original width of the image element
* @param {Number} height - original height of the image element
* @param {Number} pos - position of the image element
*
*/

function getRenderedSize(contains, cWidth, cHeight, width, height, pos) {
 var oRatio = width / height,
     cRatio = cWidth / cHeight;
 return function() {
   if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
     this.width = cWidth;
     this.height = cWidth / oRatio;
   } else {
     this.width = cHeight * oRatio;
     this.height = cHeight;
   }

   this.top = (cHeight - this.height) * (pos / 100);
   this.left = (cWidth - this.width) * (pos / 100);
   this.right = this.width + this.left;
   return this;
  }.call({});
}

export default getImgSizeInfo;