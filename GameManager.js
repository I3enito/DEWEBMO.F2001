let secondsPassed;
let oldTimeStamp;
let fps;

class GameManager {
  constructor() {
    this.gameHasStarted = false;
    this.gameHasFinished = false;
    this.gameElements = [];
    this.tableElement = document.getElementById("ground");

    this.startButton = document.getElementById("startButton");
    this.startButton.addEventListener("click", () => this.setupGame());
  }

  setupGame = () => {
    this.startButton.classList.add("inactive");

    this.ball = new Ball(new Victor(800, 800), new Victor(-40, 50), 5);

    this.simpleBumpers = [
      new SimpleBumber(new Victor(500, 200), 20),
      new SimpleBumber(new Victor(500, 700), 70),
      new SimpleBumber(new Victor(150, 500), 50),
    ];

    this.simpleLines = [
      new SimpleLine(new Victor(0, 300), new Victor(370, 100)),
      new SimpleLine(new Victor(630, 100), new Victor(1000, 300)),
      new SimpleLine(new Victor(600, 400), new Victor(700, 700)),
      new SimpleLine(new Victor(300, 700), new Victor(400, 400)),
      new SimpleLine(new Victor(200, 800), new Victor(600, 900)),
      new SimpleLine(new Victor(800, 500), new Victor(900, 400)),
    ];

    this.simpleFlippers = [
      new SimpleFlipper(new Victor(370, 100), new Victor(460, 50), 37, false),
      new SimpleFlipper(new Victor(630, 100), new Victor(540, 50), 39, true),
    ];

    this.startGame();
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
    const nextPositionVectorOfBall = this.ball.getNextPositionVector(
      secondsPassed
    );

    this.simpleFlippers.forEach((simpleFlipper) => {
      simpleFlipper.updateRotation(secondsPassed);
    });

    this.simpleLines.concat(this.simpleFlippers).forEach((simpleLine) => {
      if (simpleLine.getProjectionDistance(nextPositionVectorOfBall) < 10) {
        const simpleLineNormalenWinkel =
          simpleLine.richtungsVektor
            .clone()
            .rotateDeg(90)
            .horizontalAngleDeg() % 180;

        const ballZuNormalenWinkel =
          simpleLineNormalenWinkel -
          (this.ball.speedVector.clone().horizontalAngleDeg() + 180);

        this.ball.speedVector
          .invert()
          .rotateDeg(2 * ballZuNormalenWinkel)
          .multiplyScalar(simpleLine.bouncyNessFactor);
        simpleLine.triggerAnimation();
      }
    });

    this.simpleBumpers.forEach((simpleBumber) => {
      if (simpleBumber.getProjectionDistance(nextPositionVectorOfBall) < 10) {
        const bumberNormalenWinkel =
          simpleBumber.ortsVektor
            .clone()
            .subtract(nextPositionVectorOfBall)
            .horizontalAngleDeg() + 180;

        const ballZuNormalenWinkel =
          bumberNormalenWinkel -
          (this.ball.speedVector.clone().horizontalAngleDeg() + 180);

        this.ball.speedVector
          .invert()
          .rotateDeg(2 * ballZuNormalenWinkel)
          .multiplyScalar(simpleBumber.bouncyNessFactor);
        simpleBumber.triggerAnimation();
      }
    });

    if (nextPositionVectorOfBall.x < 0 || nextPositionVectorOfBall.x > 1000) {
      this.ball.speedVector.multiplyScalarX(-0.5);
    }
    if (nextPositionVectorOfBall.y < 0) {
      this.ball.speedVector.multiplyScalarY(-0.1);
    }

    this.ball.updatePosition(secondsPassed);

    this.ball.drawElement();
  };

  gameLoop = (timeStamp) => {
    if (this.gameHasFinished) {
      return;
    }

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / secondsPassed);
    // console.log(fps);

    this.draw(!secondsPassed ? 0 : secondsPassed);

    window.requestAnimationFrame(this.gameLoop);
  };
}

window.GameManager = new GameManager();
