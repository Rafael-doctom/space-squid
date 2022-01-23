import Core from "../../core/Core.js";

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