let secondsPassed;
let oldTimeStamp;
let fps;
let scrollThreshHold = 0;

class GameManager {
  constructor() {
    this.gameHasStarted = false;
    this.gameHasFinished = false;
    this.gameElements = [];
    this.groundHeight = 4000;
    this.heightReserve = 200;
    this.tableElement = document.getElementById("ground");
    document.body.style.height = this.groundHeight;

    this.startButton = document.getElementById("startButton");
    this.startButton.addEventListener("click", () => this.setupGame());
    this.score = 0;

    this.scoreElement = document.getElementById("scoreNumber");
    this.scoreElement.textContent = `${this.score}`;
    this.scoreLinearGradientMax = 1000;
    window.scrollTo({
      top: this.groundHeight - window.innerHeight + this.heightReserve,
      left: 0,
      behavior: "smooth",
    });
  }

  updateScore = (newPoints) => {
    this.score += newPoints;
    this.scoreElement.textContent = `${this.score}`;
    this.scoreElement.style.background = `linear-gradient(
      61deg,
      rgba(196, 211, 219, 1) 0%,
      rgba(${196 + (this.score * 58) / this.scoreLinearGradientMax}, ${
      196 + (this.score * -125) / this.scoreLinearGradientMax
    }, ${196 + (this.score * -123) / this.scoreLinearGradientMax}, 1) 100%
    )`;
  };

  setupGame = () => {
    this.gameHasFinished = false;
    this.startButton.classList.add("inactive");
    this.score = 0;
    this.updateScore(0);

    this.ball = new Ball(
      new Victor(500, 500),
      new Victor(Math.random() * 90 - 45, 50),
      5
    );

    this.simpleBumpers = [
      new SimpleBumber(new Victor(500, 200), 20, 10),
      new SimpleBumber(new Victor(500, 700), 70, 50),
      new SimpleBumber(new Victor(150, 500), 50, 10),

      new SimpleBumber(new Victor(850, 1100), 40, 10),
      new SimpleBumber(new Victor(650, 1200), 40, 10),
      new SimpleBumber(new Victor(450, 1350), 40, 10),

      new SimpleBumber(new Victor(400, 1900), 150, 100),
    ];

    this.simpleLines = [
      new SimpleLine(new Victor(0, 300), new Victor(370, 100)),
      new SimpleLine(new Victor(630, 100), new Victor(1000, 300)),
      new SimpleLine(new Victor(600, 400), new Victor(700, 700)),
      new SimpleLine(new Victor(300, 700), new Victor(400, 400)),
      new SimpleLine(new Victor(200, 800), new Victor(600, 900)),
      new SimpleLine(new Victor(800, 500), new Victor(900, 400)),

      new SimpleLine(new Victor(50, 1400), new Victor(400, 1100)),

      new SimpleLine(new Victor(150, 1700), new Victor(300, 1650)),

      new SimpleLine(new Victor(450, 1600), new Victor(600, 1650)),

      new SimpleLine(new Victor(550, 1400), new Victor(700, 1350)),

      new SimpleLine(new Victor(850, 1600), new Victor(750, 1900)),


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
    this.simpleBumpers.forEach((simpleBumber) => {
      simpleBumber.ownCollisionPoint.element.remove();
      simpleBumber.divElement.remove();
    });

    this.simpleLines.forEach((simpleLine) => {
      simpleLine.ownCollisionPoint.element.remove();
      simpleLine.divElement.remove();
    });

    this.simpleFlippers.forEach((simpleFlippers) => {
      simpleFlippers.divElement.remove();
    });

    this.startButton.classList.remove("inactive");

    this.ball.element.remove();

    document.getElementById("ground").rem;

    this.gameHasStarted = false;
    this.gameHasFinished = true;
    oldTimeStamp = undefined;
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
        this.updateScore(simpleLine.pointsPerHit);
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
        this.updateScore(simpleBumber.pointsPerHit);
      }
    });

    if (nextPositionVectorOfBall.x < 0 || nextPositionVectorOfBall.x > 1000) {
      this.ball.speedVector.multiplyScalarX(-0.5);
    }
    if (nextPositionVectorOfBall.y < 0) {
      this.stopGame();
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
    this.draw(!secondsPassed ? 0 : secondsPassed);

    if (scrollThreshHold === 0) {
      const difference =
        this.groundHeight +
        this.heightReserve -
        this.ball.positionVector.y -
        (window.scrollY + window.innerHeight / 2);
      window.scrollBy({
        top: difference * 0.9,
        left: 0,
        behavior: "smooth",
      });
    }
    scrollThreshHold = (scrollThreshHold + 1) % 2;

    window.requestAnimationFrame(this.gameLoop);
  };
}

window.GameManager = new GameManager();
