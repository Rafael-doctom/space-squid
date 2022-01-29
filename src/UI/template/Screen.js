import Core from "../../core/Core.js";

/*
*
* Represents a screen template
*
* @param {String or Object} color - a color or image object path
*
*/

function Screen(color) {
  Core.Component.call(
    this,
    Core.GameArea.width,
    Core.GameArea.height,
    color,
    0, 0, "none", Core.GameArea
  );
}

export default Screen;