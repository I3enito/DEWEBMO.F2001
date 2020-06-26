// import { Ball } from "./Ball";

class GameManager {
  constructor() {
    this.gameHasStarted = false;
    this.gameHasFinished = false;
    this.gameElements = [];
  }

  setupGame = () => {
    this.registerGameElement(new Ball(50, 50, 2, 2, 10, "ball"));
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
      gameElement.calcNextPosition();
    });

    this.gameElements.forEach((gameElement) => {
      gameElement.drawElement();
    });

    window.requestAnimationFrame(this.draw);
  };
}

window.GameManager = new GameManager();
