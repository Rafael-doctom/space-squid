import engine from "../../engine/engine.js";

function Options() {
  engine.components.Component.call(
    this,
    myGameArea.width,
    myGameArea.height,
    "#332c50",
    0, 0
  );

  this.heading = new engine.components.Text("14px", "#94e344", "center");
  this.menu = new engine.components.Text("6px", "#e2f3e4", "center");


}

export default Options();