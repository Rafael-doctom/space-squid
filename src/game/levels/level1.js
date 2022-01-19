import engine from "../../engine/engine.js";

import Background from "../actors/other/Background.js";
import Char from "../actors/ally/Char.js";
import Helicopter from "../actors/enemy/Helicopter.js"
import Airship from "../actors/enemy/Airship.js";
import SuperAirship from "../actors/enemy/SuperAirship.js";
import HealthBar from "../actors/other/HealthBar.js";

import EnemyList from "../other/EnemyList.js";
import WaveList from "../other/waveList.js";

import GameOver from "../../UI/screens/GameOver.js";

const gameOver = new GameOver();

const background = new Background();
const healthBar = new HealthBar();

const char = new Char();

const helicopters = new EnemyList("Helicopter");
const airships = new EnemyList("Airship");

const boss = new SuperAirship(92, 20);

helicopters.array.push(new Helicopter(100, 10));

helicopters.array.push(new Helicopter(80, 30));
helicopters.array.push(new Helicopter(90, 20));
helicopters.array.push(new Helicopter(100, 10));

helicopters.array.push(new Helicopter(80, 10));
helicopters.array.push(new Helicopter(90, 20));
helicopters.array.push(new Helicopter(100, 30));
helicopters.array.push(new Helicopter(110, 40));
helicopters.array.push(new Helicopter(120, 50));

airships.array.push(new Airship(110, 30));

airships.array.push(new Airship(110, 20));
airships.array.push(new Airship(100, 30));
airships.array.push(new Airship(110, 40));

airships.array.push(new Airship(110, 10));
airships.array.push(new Airship(100, 20));
airships.array.push(new Airship(90, 30));
airships.array.push(new Airship(100, 40));
airships.array.push(new Airship(110, 50));

const waveList = new WaveList();
waveList.currentWave = 2;

const wave1 = function() {
  helicopters.activateEnemies(1, 5000, helicopters.deadEnemies == 0);
  helicopters.activateEnemies(4, 5000, helicopters.deadEnemies == 1);
  helicopters.activateEnemies(9, 5000, helicopters.deadEnemies == 4);
  helicopters.actions(char.bullets, char.y, char.y + char.height);

  if (helicopters.isAllEnemiesDead)
    waveList.currentWave = 1;
}

const wave2 = function() {      
  airships.activateEnemies(1, 5000, airships.deadEnemies == 0);
  airships.activateEnemies(4, 5000, airships.deadEnemies == 1);
  airships.activateEnemies(9, 5000, airships.deadEnemies == 4);
  airships.actions(char.bullets);

  if (airships.isAllEnemiesDead)
    waveList.currentWave = 2;
}

const wave3 = function() {
  setTimeout(() => boss.isActive = true, 5000);
  for (let bullet of char.bullets) {
    boss.tookDamage(bullet);
    for (let bullet2 of boss.bullets) {
      if (bullet2.constructor.name == "Missile")
        bullet2.tookDamage(bullet);
    }
  }
  boss.behavior(char.x, char.y);
}

waveList.waves.push(wave1);
waveList.waves.push(wave2);
waveList.waves.push(wave3);

function level1() {
  if (!background.music.isPlaying)
    background.music.play();
  
  myGameArea.clear();

  if (!char.isDead) {
    charActions();
    waveList.start();
    renderAll();
  } else {
    lose();
  }
}

function charActions() {
  char.clearmove();
  char.movement(engine.inputs.keyboardControl, engine.inputs.touchControl);

  for (let index = 0; index < helicopters.array.length; index++) {
    if (!helicopters.array[index].isDead) {
      char.tookDamage(helicopters.array[index], healthBar);
      for (const bullet of helicopters.array[index].bullets)
        char.tookDamage(bullet, healthBar);
    }
  }

  for (let index = 0; index < airships.array.length; index++) 
    if (!airships.array[index].isDead) {
      char.tookDamage(airships.array[index], healthBar);
      for (const bullet of airships.array[index].bullets) {
        char.tookDamage(bullet, healthBar);
      }
    }

  if (!boss.isDead) {
    char.tookDamage(boss, healthBar);
    for (const bullet of boss.bullets) {
      char.tookDamage(bullet, healthBar);
    }
  }
}

function renderAll() {
  background.render();
  char.render();
  char.renderBullets();
  helicopters.renderAll();
  airships.renderAll();
  boss.render();
  boss.renderBullets(char);
  healthBar.render();
}

function lose() {
  gameOver.render();
  gameOver.restartGame(engine.inputs.keyboardControl);
  if (gameOver.choice == "restart") {
    char.resurrect(healthBar);
    waveList.currentWave = 0;
    helicopters.ressurectAllEnemys();
    airships.ressurectAllEnemys();
  }
}

export default level1;