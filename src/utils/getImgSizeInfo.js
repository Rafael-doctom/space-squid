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

export default getImgSizeInfo;