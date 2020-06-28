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

    new Line(
      this.tableElement,
      new Victor(100, 500),
      new Victor(500, 550),
      "line"
    );

    // this.simpleLine = new SimpleLine(
    //   new Victor(100, 100),
    //   new Victor(600, 300)
    // );
  }

  setupGame = () => {
    this.registerGameElement(new Ball(800, 800, -10, 10, "ball"));
    this.simpleLines = [
      new SimpleLine(new Victor(100, 100), new Victor(300, 200), "simpleLine1"),
      new SimpleLine(new Victor(300, 300), new Victor(600, 200), "simpleLine2"),
      // new SimpleLine(new Victor(100, 500), new Victor(300, 400)),
      new SimpleLine(new Victor(600, 400), new Victor(900, 900), "simpleLine3"),
      new SimpleLine(new Victor(100, 600), new Victor(600, 300), "simpleLine4"),
    ];
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
    // console.log("drawing");

    this.gameElements.forEach((gameElement) => {
      const nextPosX = gameElement.getNextPositionVector(secondsPassed).x;
      const nextPosY = gameElement.getNextPositionVector(secondsPassed).y;

      // console.log(
      //   "projetion distanz:  " +
      //     this.simpleLine.getProjectionDistance(
      //       gameElement.getNextPositionVector(secondsPassed)
      //     )
      // );

      this.simpleLines.forEach((simpleLine) => {
        if (
          simpleLine.getProjectionDistance(
            gameElement.getNextPositionVector(secondsPassed)
          ) < 10
        ) {
          const simpleLineNormalenWinkel =
            simpleLine.richtungsVektor
              .clone()
              .rotateDeg(90)
              .horizontalAngleDeg() % 180;

          const ballZuNormalenWinkel =
            simpleLineNormalenWinkel -
            (gameElement.speedVector.clone().horizontalAngleDeg() + 180);

          gameElement.speedVector
            .invert()
            .rotateDeg(2 * ballZuNormalenWinkel)
            .multiplyScalar(1.2);
        }
      });

      // console.log("next pos y:" + nextPosY);

      if (nextPosX < 0 || nextPosX > 1000) {
        gameElement.speedVector.multiplyScalarX(-0.8);
      }
      if (nextPosY < 0) {
        gameElement.speedVector.multiplyScalarY(-0.9);
      }

      gameElement.updatePosition(secondsPassed);
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
    // console.log(fps);

    this.draw(secondsPassed);

    window.requestAnimationFrame(this.gameLoop);
  };
}

window.GameManager = new GameManager();
