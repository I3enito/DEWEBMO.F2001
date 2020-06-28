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
    // this.registerGameElement(new Ball(800, 800, -10, 10, "ball"));

    this.ball = new Ball(800, 800, -40, 6, "ball");

    this.simpleLines = [
      new SimpleLine(new Victor(0, 300), new Victor(370, 100), "simpleLine1"),
      new SimpleLine(
        new Victor(630, 100),
        new Victor(1000, 300),
        "simpleLine2"
      ),
      // new SimpleLine(new Victor(100, 500), new Victor(300, 400)),
      new SimpleLine(new Victor(600, 400), new Victor(700, 700), "simpleLine3"),
      new SimpleLine(new Victor(300, 700), new Victor(400, 400), "simpleLine3"),
      // new SimpleLine(new Victor(600, 100), new Victor(100, 300), "simpleLine4"),
    ];

    this.simpleBumbers = [
      new SimpleBumber(
        new Victor(370, 110),
        new Victor(450, 50),
        "simpleBumberLeft",
        37,
        false
      ),
      new SimpleBumber(
        new Victor(640, 110),
        new Victor(550, 50),
        "simpleBumberRight",
        39,
        true
      ),
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
    const nextPositionVectorOfBall = this.ball.getNextPositionVector(
      secondsPassed
    );

    this.simpleBumbers.forEach((simpleBumber) => {
      simpleBumber.updateRotation(secondsPassed);
    });

    this.simpleLines.concat(this.simpleBumbers).forEach((simpleLine) => {
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
      }
    });

    if (nextPositionVectorOfBall.x < 0 || nextPositionVectorOfBall.x > 1000) {
      this.ball.speedVector.multiplyScalarX(-0.8);
    }
    if (nextPositionVectorOfBall.y < 0) {
      this.ball.speedVector.multiplyScalarY(-0.9);
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
