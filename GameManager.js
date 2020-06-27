// import { Ball } from "./Ball";

const gravity = -0.01;

class GameManager {
  constructor() {
    this.gameHasStarted = false;
    this.gameHasFinished = false;
    this.gameElements = [];
  }

  setupGame = () => {
    this.registerGameElement(new Ball(500, 500, -2, 10, "ball"));
  };

  startGame = () => {
    this.gameHasStarted = true;
    window.requestAnimationFrame(this.draw);
  };

  stopGame = () => {
    this.gameHasStarted = false;
  };

  registerGameElement = (gameElement) => {
    this.gameElements.push(gameElement);
  };

  draw = () => {
    console.log("drawing");
    if (this.gameHasFinished) {
      return;
    }

    this.gameElements.forEach((gameElement) => {
      const nextPosX = gameElement.getNextPositionX();
      const nextPosY = gameElement.getNextPositionY(gravity);

      if (nextPosX < 0 || nextPosX > 1000) {
        gameElement.speedX *= -0.8;
        gameElement.gravitySpeed = 0;
      }
      if (nextPosY < 0) {
        gameElement.speedY *= -0.4;
        gameElement.gravitySpeed = 0;
      }

      gameElement.updatePosition(gravity);
    });

    this.gameElements.forEach((gameElement) => {
      gameElement.drawElement();
    });

    window.requestAnimationFrame(this.draw);
  };
}

window.GameManager = new GameManager();
