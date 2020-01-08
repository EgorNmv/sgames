const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const carImg = new Image();
const hurdleImg = new Image();
const backgroundImg = new Image();
carImg.src = "img/bird.png";
hurdleImg.src = "img/hurdle.png";
backgroundImg.src = "img/space.jpg";

class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  moveToTop() {
    this.y = this.y - STEP;
  }
  moveToBottom() {
    this.y = this.y + STEP;
  }
  moveToRight() {
    this.x = this.x + STEP;
  }
  moveToLeftt() {
    this.x = this.x - STEP;
  }
}

class Enemy {
  constructor(maxX) {
    this.x = Math.floor(Math.random() * maxX) - maxX;
    this.y = 0;
  }
}

const STEP = 10;
const car = new Car(cvs.width / 2, cvs.height / 2);
const enemies = [new Enemy(cvs.width)];

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      if (car.y < cvs.height) {
        car.moveToTop();
      }
      break;
    case "s":
    case "ArrowDown":
      car.moveToBottom();
      break;
    case "a":
    case "ArrowLeft":
      car.moveToLeftt();
      break;
    case "d":
    case "ArrowRight":
      car.moveToRight();
      break;
  }
});

function start() {
  ctx.drawImage(backgroundImg, 0, 0);
  ctx.drawImage(carImg, car.x, car.y);

  enemies.forEach(enemy => {
    ctx.drawImage(hurdleImg, enemy.x, enemy.y);
    enemy.y += 5;

    if (enemy.y == 125) {
      enemies.push(new Enemy(cvs.width));
    }
  });

  window.requestAnimationFrame(start);
}

window.onload = start;
