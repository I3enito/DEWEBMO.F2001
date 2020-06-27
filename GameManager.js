// import { Ball } from "./Ball";

import { Line } from "./Line.js";
import Victor from "./victor";

const gravity = 9.81;
let secondsPassed;
let oldTimeStamp;
let fps;

class GameManager {
  constructor() {
    this.gameHasStarted = false;
    this.gameHasFinished = false;
    this.gameElements = [];
    this.tableElement = document.getElementById("ground");

    new Line(this.tableElement, new Victor(0, 0), new Victor(0, 1000));
  }

  setupGame = () => {
    this.registerGameElement(new Ball(500, 500, -10, 10, "ball"));
  };

  startGame = () => {
    this.gameHasStarted = true;
    window.requestAnimationFrame(this.gameLoop);
  };

  stopGame = () => {
    this.gameHasStarted = false;
  };

  registerGameElement = (gameElement) => {
    this.gameElements.push(gameElement);
  };

  draw = (secondsPassed) => {
    console.log("drawing");

    this.gameElements.forEach((gameElement) => {
      const nextPosX = gameElement.getNextPositionX();
      const nextPosY = gameElement.getNextPositionY(gravity, secondsPassed);

      if (nextPosX < 0 || nextPosX > 1000) {
        gameElement.speedX *= -0.8;
        gameElement.gravitySpeed = 0;
      }
      if (nextPosY < 0) {
        gameElement.speedY *= -0.4;
        gameElement.gravitySpeed = 0;
      }

      gameElement.updatePosition(gravity, secondsPassed);
    });

    this.gameElements.forEach((gameElement) => {
      gameElement.drawElement();
    });
  };

  gameLoop = (timeStamp) => {
    if (this.gameHasFinished) {
      return;
    }

    // Calculate the number of seconds passed since the last frame
    secondsPassed = ((timeStamp - oldTimeStamp) / 1000) * 6;
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / secondsPassed);
    console.log(fps);

    this.draw(secondsPassed);

    window.requestAnimationFrame(this.gameLoop);
  };
}

window.GameManager = new GameManager();
