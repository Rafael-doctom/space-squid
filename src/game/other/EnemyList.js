function EnemyList(type, isEnemysActive = false) {
  this.array = [];
  this.type = type;
  this.isAllEnemysDead = false;
  this.isEnemysActive = isEnemysActive;
  this.isEnemysActiveInitial = isEnemysActive;

  this.renderAll = function() {
    if (!this.isEnemysActive)
      return;

    for (let index = 0; index < this.array.length; index++) {
      this.array[index].render();
      if (this.type == "Helicopter")
        this.array[index].renderBullets();
    }
  };

  this.actions = function(charBullets, targetYStart, targetYEnd) {
    if (!this.isEnemysActive)
      return;

    for (let index = 0; index < this.array.length; index++) {
      if (!this.array[index].isDead) {
        for (const bullet of charBullets)
          this.array[index].tookDamage(bullet);
        this.array[index].move();
        if (this.type == "Helicopter")
          this.array[index].attack(targetYStart, targetYEnd);
      }
    }

    this.verifyIfIsAllEnemysDead();
  };

  this.verifyIfIsAllEnemysDead = function() {
    let count = 0
    for (let enemy of this.array) {
      if (enemy.isDead)
        count++;
    }
  
    if (count == this.array.length) {
      this.isEnemysActive = false;
      this.isAllEnemysDead = true;
    }
  }

  this.ressurectAllEnemys = function() {    
    this.isAllEnemysDead = false;

    for (let enemy of this.array) {
      enemy.resurrect();
    }
  }
}

export default EnemyList;