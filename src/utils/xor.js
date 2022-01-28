/*
*
* @param {Any} a - condition or value
* @param {Any} b - condition or value
*
*/

function xor(a, b) {
  return (a || b) && !(a && b);
}

export default xor;