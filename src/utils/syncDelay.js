/*
*
* @param {Integer} ms - time in miliseconds
*
* @note: You need to create a async function that await a call for this function
*
* example: async function count() {
*   console.log(1);
*   await syncDelay(1000); // after 1000 miliseconds, console will display 2
*   console.log(2);
* }
*
*/

function syncDelay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms)
    }, ms )
  })
};

export default syncDelay;