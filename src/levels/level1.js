import keyboardControl from "../base/keyboardControl.js";
import syncDelay from "../base/syncDelay.js";

import Background from "../actors/other/Background.js";
import Char from "../actors/ally/Char.js";
import Helicopter from "../actors/enemy/Helicopter.js"
import Airship from "../actors/enemy/Airship.js";
import SuperAirship from "../actors/enemy/SuperAirship.js";
import HealthBar from "../actors/other/HealthBar.js";

import EnemyList from "../other/EnemyList.js";
import WaveList from "../other/waveList.js";

import GameOver from "../screens/GameOver.js";

const gameOver = new GameOver();

const background = new Background();
const healthBar = new HealthBar();

const char = new Char();

const helicopters = new EnemyList("Helicopter");
const airships = new EnemyList("Airship");

const boss = new SuperAirship(800, 200);

helicopters.array.push(new Helicopter(840, 350));
helicopters.array.push(new Helicopter(740, 250));
helicopters.array.push(new Helicopter(940, 150));

airships.array.push(new Airship(1140, 350));
airships.array.push(new Airship(1040, 250));
airships.array.push(new Airship(940, 150));

const waveList = new WaveList();

const wave1 = function() {
  setTimeout(() => helicopters.isEnemysActive = true, 5000);
  helicopters.actions(char.bullets, char.y, char.y + char.height);
  
  if (helicopters.isAllEnemysDead) {
    waveList.currentWave++;
  }
}

const wave2 = function() {      
  setTimeout(() => airships.isEnemysActive = true, 5000);
  airships.actions(char.bullets);

  if (airships.isAllEnemysDead)
    waveList.currentWave++;
}

const wave3 = function() {
  if (helicopters.isAllEnemysDead && airships.isAllEnemysDead) {
    helicopters.isAllEnemysDead = false;
    airships.isAllEnemysDead = false;
    helicopters.ressurectAllEnemys();
    airships.ressurectAllEnemys();

    setTimeout(() => {
      airships.isEnemysActive = true;
      helicopters.isEnemysActive = true;
    }, 5000);
  }

  helicopters.actions(char.bullets, char.y, char.y + char.height);
  airships.actions(char.bullets);
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
  char.movement(keyboardControl);

  for (let index = 0; index < helicopters.array.length; index++) {
    if (!helicopters.array[index].isDead) {
      char.tookDamage(helicopters.array[index], healthBar);
      for (const bullet of helicopters.array[index].bullets)
        char.tookDamage(bullet, healthBar);
    }
  }

  for (let index = 0; index < airships.array.length; index++) 
    if (!airships.array[index].isDead) 
      char.tookDamage(airships.array[index], healthBar);
}

function renderAll() {
  background.render();
  char.render();
  char.renderBullets();
  helicopters.renderAll();
  airships.renderAll();
  healthBar.render();
}

function lose() {
  gameOver.render();
  gameOver.restartGame(keyboardControl);
  if (gameOver.choice == "restart") {
    char.resurrect(healthBar);
    waveList.currentWave = 0;
    helicopters.ressurectAllEnemys();
    airships.ressurectAllEnemys();
  }
}

export default level1;