import Core from "../../core/Core.js";

import Background from "../actors/other/Background.js";
import Char from "../actors/ally/Char.js";
import SuperAirship from "../actors/enemy/SuperAirship.js";
import HealthBar from "../actors/other/HealthBar.js";

import EnemyList from "../other/EnemyList.js";
import WaveList from "../other/waveList.js";

import xor from "../../utils/xor.js";

function Level0() {
  this.waveList = new WaveList();
  this.started = false;
  this.paused = false;
  this.loosed = false;
  this.music = new Core.SoundComponent("../../src/assets/sound/background/sky2.mp3", 0.25, true);

  this.background = new Background(),
  this.healthBar = new HealthBar(),
  this.char = new Char(),
  this.helicopters = new EnemyList("Helicopter"),
  this.airships = new EnemyList("Airship"),
  this.boss = new SuperAirship(92, 20)

  this.start = function() {
    if (xor(Core.KeyboardControl.keysPressed.enterPressed == 1, Core.TouchControl.buttonsPressed.enter == 1)) {
      this.paused = true;
      this.music.stop();
      return;
    } else {
      this.paused = false;
      setTimeout(() => this.music.play(), 150);
    }

    if (!this.started) {
      this.init();
      this.started = true;

      for (let index = 0; index < this.helicopters.array.length; index++) {
        this.helicopters.array[index].x = 128;
      }

      for (let index = 0; index < this.airships.array.length; index++) {
        this.airships.array[index].x += 40;
      }

      this.boss.x = 128;

      setTimeout(() => this.char.isActive = true, 500);
    }

    if (!this.char.isDead) {
      Core.GameArea.clear();
      this.charActions();
      this.waveList.start();
      this.renderAll();
    } else {
      this.loosed = true;
    }
  }

  this.renderAll = function() {
    this.background.render();
    this.char.render();
    this.char.renderBullets();
    this.helicopters.renderAll();
    this.airships.renderAll();
    this.boss.render();
    this.boss.renderBullets(this.char);
    this.healthBar.render();
  }

  this.init = function() {
    this.helicopters.addEnemy(90, 10);

    this.helicopters.addEnemy(90, 30);
    this.helicopters.addEnemy(100, 20);
    this.helicopters.addEnemy(110, 10);

    this.helicopters.addEnemy(70, 50);
    this.helicopters.addEnemy(80, 40);
    this.helicopters.addEnemy(90, 30);
    this.helicopters.addEnemy(100, 20);
    this.helicopters.addEnemy(110, 10);

    this.airships.addEnemy(110, 30);

    this.airships.addEnemy(110, 20);
    this.airships.addEnemy(100, 30);
    this.airships.addEnemy(110, 40);

    this.airships.addEnemy(110, 10);
    this.airships.addEnemy(100, 20);
    this.airships.addEnemy(90, 30);                                                                                                                  
    this.airships.addEnemy(100, 40);
    this.airships.addEnemy(110, 50);

    this.waveList.waves.push(this.waves.wave1);
    this.waveList.waves.push(this.waves.wave2);
    this.waveList.waves.push(this.waves.wave3);
  }

  this.charActions = function() {
    if (!this.char.isActive) return;

    this.char.clearmove();
    this.char.movement(Core.KeyboardControl, Core.TouchControl);

    for (let index = 0; index < this.helicopters.array.length; index++) {
      if (!this.helicopters.array[index].isDead) 
        this.char.tookDamage(this.helicopters.array[index], this.healthBar);

      for (const bullet of this.helicopters.array[index].bullets)
        this.char.tookDamage(bullet, this.healthBar);
    }
    
    for (let index = 0; index < this.airships.array.length; index++) {
      if (!this.airships.array[index].isDead) 
        this.char.tookDamage(this.airships.array[index], this.healthBar);
      
      for (const bullet of this.airships.array[index].bullets) 
        this.char.tookDamage(bullet, this.healthBar);
    }

    if (!this.boss.isDead) {
      this.char.tookDamage(this.boss.hitBox.upWing, this.healthBar);
      this.char.tookDamage(this.boss.hitBox.cockpit, this.healthBar);
      this.char.tookDamage(this.boss.hitBox.body, this.healthBar);
      this.char.tookDamage(this.boss.hitBox.downWing, this.healthBar);
    }

    for (const bullet of this.boss.bullets) 
      this.char.tookDamage(bullet, this.healthBar);
  }

  this.waves = {
    wave1: () => {
      this.helicopters.activateEnemies(1, 5000, this.helicopters.deadEnemies == 0);
      this.helicopters.activateEnemies(4, 5000, this.helicopters.deadEnemies == 1);
      this.helicopters.activateEnemies(9, 5000, this.helicopters.deadEnemies == 4);
      this.helicopters.actions(this.char.bullets, this.char.y, this.char.y + this.char.height);

      if (this.helicopters.isAllEnemiesDead)
        this.waveList.currentWave = 1;
    },

    wave2: () => {      
      this.airships.activateEnemies(1, 5000, this.airships.deadEnemies == 0);
      this.airships.activateEnemies(4, 5000, this.airships.deadEnemies == 1);
      this.airships.activateEnemies(9, 5000, this.airships.deadEnemies == 4);
      this.airships.actions(this.char.bullets);

      if (this.airships.isAllEnemiesDead)
        this.waveList.currentWave = 2;
    },

    wave3: () => {
      setTimeout(() => this.boss.isActive = true, 5000);

      for (let bullet of this.char.bullets) {
        this.boss.tookDamage(bullet);
        for (let bullet2 of this.boss.bullets) {
          if (bullet2.constructor.name == "Missile")
            bullet2.tookDamage(bullet);
        }
      }
      if (this.boss.isActive2)
        this.boss.behavior(this.char.x, this.char.y);
      else
        this.boss.entry();
    }
  }
}

export default Level0;