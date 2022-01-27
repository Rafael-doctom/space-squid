import Bullet from "../templates/Bullet.js";

const imgPath = {
  frame1: "assets/img/attacks/smallBullet.png",
};

function SmallBullet(x, y) {
  Bullet.call(this, 2, 1.5, 2, 1, x, y, imgPath);
}

export default SmallBullet;