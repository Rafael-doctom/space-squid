/*
*
* @param {Object} object1 - a object with x and y properties.
* @param {Object} object2 - another object with x and y properties.
*
*/

function detectColision(object1, object2) {
  if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
		object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      return true;
  } else {
    return false;
  }
}

export default detectColision;