import Bullet from "../templates/Bullet.js";

const imgPath = {
  frame1: "assets/img/attacks/bigBullet.png",
};

function BigBullet(x, y) {
  Bullet.call(this, 2, 1.5, 4, 3, x, y, imgPath);
}

export default BigBullet;