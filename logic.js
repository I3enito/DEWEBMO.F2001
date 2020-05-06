const bumper = document.getElementById("bumper");
const flipperLeft = document.getElementById("flipper-left");
const flipperRight = document.getElementById("flipper-right");

const animateBumper = function () {
  bumper.animate(
    [
      { boxShadow: "20px 20px 20px 20px greenyellow" },
      { boxShadow: "0px 0px 0px 0px greenyellow", offset: 0.2 },
      { boxShadow: "20px 20px 20px 20px greenyellow", offset: 0.4 },
      { boxShadow: "0px 0px 0px 0px greenyellow", offset: 0.6 },
      { boxShadow: "20px 20px 20px 20px greenyellow", offset: 0.8 },
      { boxShadow: "0px 0px 0px 0px greenyellow" },
    ],
    {
      duration: 300,
    }
  );
};

const animateFlipperLeft = function (anim) {
  if (anim == "up") {
    from = "32deg";
    to = "-10deg";
  } else if (anim == "down") {
    from = "-10deg";
    to = "32deg";
  }

  flipperLeft.animate(
    [
      { transform: "rotateZ(" + from + ")", offset: 0 },
      { transform: "rotateZ(" + to + ")", offset: 1 },
    ],
    {
      duration: 50,
      fill: "both",
    }
  );
};

const animateFlipperRight = function (anim) {
  if (anim == "up") {
    from = "-32deg";
    to = "10deg";
  } else if (anim == "down") {
    from = "10deg";
    to = "-32deg";
  }

  flipperRight.animate(
    [
      { transform: "rotateZ(" + from + ")", offset: 0 },
      { transform: "rotateZ(" + to + ")", offset: 1 },
    ],
    {
      duration: 50,
      fill: "both",
    }
  );
};

document.addEventListener("down", onkeydown, false);
document.addEventListener("up", onkeyup, false);
const lastKeyType = new Array(255).fill("keyup");

onkeydown = onkeyup = function (e) {
  let keyCode = e.keyCode;
  let keyType = e.type;

  // left key
  if (keyCode == "37" && keyType != lastKeyType[keyCode]) {
    // left key down => left flipper up
    if (keyType == "keydown") {
      console.log("flipper left up");
      lastKeyType[keyCode] = "keydown";
      animateFlipperLeft("up");
    }
    // left key up => left flipper down
    else {
      console.log("flipper left down");
      lastKeyType[keyCode] = "keyup";
      animateFlipperLeft("down");
    }
  }

  // right key
  if (keyCode == "39" && keyType != lastKeyType[keyCode]) {
    // right key down => right flipper up
    if (e.type == "keydown") {
      console.log("flipper right up");
      lastKeyType[keyCode] = "keydown";
      animateFlipperRight("up");
    }
    // right key up => right flipper down
    else {
      console.log("flipper right down");
      lastKeyType[keyCode] = "keyup";
      animateFlipperRight("down");
    }
  }

  // up key down
  if (keyCode == "38" && keyType == "keydown") {
    console.log("Bumper Glow (Up)");
    animateBumper();
  }
};
