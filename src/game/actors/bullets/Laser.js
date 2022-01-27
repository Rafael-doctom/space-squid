import Bullet from "../templates/Bullet.js";

const imgPath = {
  frame1: "assets/img/attacks/laser.png",
};

function Laser(x, y) {
  Bullet.call(this, 2, 3, 5, 1, x, y, imgPath);
}

export default Laser;