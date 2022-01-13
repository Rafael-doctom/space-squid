import Component from "../../base/Component.js";
import detectColision from "../../base/detectColision.js";

import Bullet from "../other/Bullet.js";
import Animation from "../../base/Animation.js";
import SoundComponent from "../../base/SoundComponent.js";

const charImgPath = {
  idle: "../src/assets/img/char/idle.png",
  forward: "../src/assets/img/char/forward.png",
  backward: "../src/assets/img/char/backward.png",
  idleAttack: "../src/assets/img/char/idleAttack.png",
  forwardAttack: "../src/assets/img/char/forwardAttack.png",
  backwardAttack: "../src/assets/img/char/backwardAttack.png",
  damaged: "../src/assets/img/char/damaged.png",
  invisible: "../src/assets/img/char/invisible.png"
}

function Char() {
  Component.call(this, 60, 60, charImgPath, 210, 180, "image");

  this.speed = 5;
  this.life = 8;
  this.damage = 2;
  this.isAttacking = false;
  this.isDamaged = false;
  this.isMoving = false;
  this.isInvencible = false;
  this.isDead = false;
  this.bullets = [];
  this.bulletDelay = 0;
  this.idleAttackAnimation = new Animation(this, [3, 0], 8);
  this.forwardAttackAnimation = new Animation(this, [4, 1], 8);
  this.backwardAttackAnimation = new Animation(this, [5, 2], 8);
  this.attackSound = new SoundComponent("../src/assets/sound/char/attack.wav");

  this.render = function() { 
    if (this.isDamaged) {
      if (this.isInvencible)
        this.currentImage = this.images.invisible;
    } 

    if (this.currentImage == this.images.idle || this.currentImage == this.images.idleAttack)
      this.idleAttackAnimation.animate(this.isAttacking);
    else if (this.currentImage == this.images.forward || this.currentImage == this.images.forwardAttack)
      this.forwardAttackAnimation.animate(this.isAttacking);
    else if (this.currentImage == this.images.backward || this.currentImage == this.images.backwardAttack)
      this.backwardAttackAnimation.animate(this.isAttacking);

    this.update();
    this.newPos();

  }

  this.renderBullets = function() {
    this.bullets = this.bullets.filter(bullet => !bullet.isDead);

    for (const bullet of this.bullets) {
      if (bullet.x < myGameArea.width) {
        bullet.render();
      } else {
        bullet.isDead = true;
        bullet.clearmove();
      }
    }
    
    if (this.bulletDelay > 0)
      this.bulletDelay -= 10;      
  }

  this.attack = function() {
    if (this.bulletDelay == 0) {
      this.attackSound.play();
      this.isAttacking = true;
      this.bullets.push(new Bullet(this.damage, 30, 15, this.x + 85, this.y + 25));
  
      for (const bullet of this.bullets) {
        bullet.move("right");
      }

      this.bulletDelay = 250;
      setTimeout(() => this.attackSound.reset(), 250)
    } 
  }

  this.movement = function(keyboardControl) {
    let isNotMovingCount = 0;

    if (keyboardControl.keysPressed.spacePressed) {this.attack()}
    else this.isAttacking = false;

    if (keyboardControl.keysPressed.leftPressed) {this.move("left")}
    else isNotMovingCount++;

    if (keyboardControl.keysPressed.rightPressed) {this.move("right")}
    else isNotMovingCount++;

    if (keyboardControl.keysPressed.upPressed) {this.move("up")}
    if (keyboardControl.keysPressed.downPressed) {this.move("down")}

    if (isNotMovingCount > 1) this.isMoving = false;
  }

  this.tookDamage = function(object, healthBar) {
    if (!this.isDamaged) {
      if (detectColision(this, object) && (object.isMoving && !object.isDead)) {
        this.isDamaged = true;
        this.life -= object.damage;
        healthBar.changeImg(this.life);
  
        if (this.life == 0)
          this.isDead = true;
        
        setTimeout(() => this.isDamaged = false, 3000);
        setTimeout(() => {
          clearInterval(interval1);
          clearInterval(interval2);
          this.isInvencible = false
        }, 2500);

        const interval1 = setInterval(() => this.isInvencible = false, 100);
        const interval2 = setInterval(() => this.isInvencible = true, 200);
      }     
    }
  }

  this.resurrect = function(healthBar) {
    this.x = 10;
    this.y = 120;
    this.life = 8;
    this.isDead = false;
    healthBar.changeImg(this.life);
  }

  this.move = function(dir) {
    this.isMoving = true;

    if (dir != "left") {
      if (!(this.currentImage == this.images.forward || this.currentImage == this.images.forwardAttack))
        this.currentImage = this.images.forward;
    } else if (dir == "left"){
      if (!(this.currentImage == this.images.backward || this.currentImage == this.images.backwardAttack))
        this.currentImage = this.images.backward;
    } 
  
    if (!this.preventMoveOutScreen())
      return;
  
    if (dir == "up") {this.speedY = -this.speed; }
    if (dir == "down") {this.speedY = this.speed; }
    if (dir == "left") {this.speedX = -this.speed; }
    if (dir == "right") {this.speedX = this.speed; }
  }
  
  this.clearmove = function() {
    if (!this.isMoving && this.speedY == 0)
      if (this.currentImage != this.images.idle && this.currentImage != this.images.idleAttack)
        this.currentImage = this.images.idle;

    this.speedX = 0;
    this.speedY = 0;
  }

  this.preventMoveOutScreen = function() {
    if (this.x < 0) {
      this.x = 0;
      return; 
    }
    if (this.x > myGameArea.width - 100) {
      this.x = myGameArea.width - 100;
      return;
    }  
    if (this.y < 0) {
      this.y = 0;
      return;
    }
    
    if (this.y > myGameArea.height - 100) {
      this.y = myGameArea.height - 100;
      return;
    }
  
    return true;
  }
}

export default Char;