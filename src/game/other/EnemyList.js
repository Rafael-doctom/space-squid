import Helicopter from "../actors/enemy/Helicopter.js"
import Airship from "../actors/enemy/Airship.js";

/*
*
* @param {String} type - the type of the enemies
*
*/

function EnemyList(type) {
  this.array = [];
  this.type = type;
  this.activeEnemies = 0;
  this.deadEnemies = 0;
  this.isAllEnemiesDead = false;
  this.enemyEntry = false;

  this.addEnemy = function(x, y) {
    if (type == "Helicopter")
      this.array.push(new Helicopter(x, y));
    else if (type == "Airship")
      this.array.push(new Airship(x, y));
  }

  this.activateEnemies = function(quantity, time, condition = true) {
    if (condition)
      setTimeout(() => this.activeEnemies = quantity, time);
  };

  this.renderAll = function() {
    for (let index = 0; index < this.activeEnemies; index++) {
      this.array[index].render();
      this.array[index].renderBullets();
    }
  };

  this.actions = function(charBullets, targetYStart, targetYEnd) {
    for (let index = 0; index < this.activeEnemies; index++) {
      if (!this.array[index].isDead && this.array[index].isActive) {
        for (const bullet of charBullets)
          this.array[index].tookDamage(bullet);
        this.array[index].move();
        this.array[index].attack(targetYStart, targetYEnd);
      } else if (!this.array[index].isActive && !this.array[index].isDead) {
        for (const bullet of charBullets)
          this.array[index].tookDamage(bullet);
        this.array[index].entry();
      }
    }

    this.countDeadEnemeys();
  };

  this.countDeadEnemeys = function() {
    let count = 0
    for (let enemy of this.array) {
      if (enemy.isDead)
        count++;
    }
  
    this.deadEnemies = count;

    if (count == this.array.length)
      this.isAllEnemiesDead = true;
    else
      this.isAllEnemiesDead = false;
  }
}

export default EnemyList;