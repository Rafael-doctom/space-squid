function EnemyList(type, isEnemysActive = false) {
  this.array = [];
  this.type = type;
  this.activeEnemies = 0;
  this.deadEnemies = 0;
  this.isAllEnemiesDead = false;

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
      if (!this.array[index].isDead) {
        for (const bullet of charBullets)
          this.array[index].tookDamage(bullet);
        this.array[index].move();
        this.array[index].attack(targetYStart, targetYEnd);
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

  this.ressurectAllEnemys = function() {    
    for (let enemy of this.array) {
      enemy.resurrect();
    }
  }
}

export default EnemyList;