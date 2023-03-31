import { CallThis } from "./test";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvas2 = document.getElementById("score"); // for the score
const ctx2 = canvas2.getContext("2d");

// setting up the snake features
let speed = 4;
let tileSize = 30; // clientWidth returns the width of an element in pixels

// declaring the head of the snake
let head = 0;

// to draw the body of the snake
// array for snake parts
let snake = [
  { x: 300, y: 300 },
  { x: 270, y: 300 },
  { x: 240, y: 300 },
]; // we need to call this to grow the snake or add parts

let body;
// initialize the speed of the snake
let xvelocity = 0;
let yvelocity = 0;

// ------------------------------------------------------------------------

// apple features
// random range for apple to appear
let min = 0;
let max = 600;
// draw apple = 5;
let appleX = 30;
let appleY = 30;

// ------------------------------------------------------------------------

// scores
let score = 0;

// ------------------------------------------------------------------------
// music features

let music = new sound("cumbiaCity.mp3");
let eatSound = new sound("eating-sound.mp3"); // eating Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=36186">Pixabay</a>

// create game loop-to continously update screen
function drawGame() {
  CallThis();
  clearScreen();
  drawApple();

  changeSnakePosition();
  drawSnake();
  music.play(); // -
  displayScore();

  const time = setTimeout(drawGame, 1000 / speed); // update screen 4 times a second
  gameOver(time);
  // console.log(getRandomInt(min, max));
}

function gameOver(time) {
  // checking for body collisions
  flag = false;
  body.filter((obj) => {
    if (obj.x == head.x && obj.y == head.y) {
      flag = true;
    }
  });

  // this function freezes the image when
  // snake hits a wall
  if (
    head.x + 60 > 630 ||
    head.x - 30 < -30 ||
    head.y + 60 > 630 ||
    head.y - 30 < -30 ||
    flag
  ) {
    drawSnake();
    clearTimeout(time); // dont update if going
    // outside the bounds. freeze the image.
    music.stop(); // stop the music
  }
  //   else if (body.includes(head)) {
  //     console.log("body hit");
  //   }
}

// to draw the apple
function getRandomInt(min, max, tileSize) {
  return Math.floor(Math.random() * ((max - min) / tileSize)) * tileSize + min; // max is inclusive and min is inclusive
}

function clearScreen() {
  ctx.fillStyle = "darkgreen"; // screen is blue
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); // this whole thing clears the screen
}

function drawSnake() {
  // ctx.clearRect();
  //snake.forEach(changeSnakePosition); //updates the position for all parts. or so it should
  snake.forEach(drawSnakePart); //draws the actual snake
  //console.log(drawSnakePart);
  // this is a loop
}

function changeSnakePosition() {
  head = { x: snake[0].x + xvelocity, y: snake[0].y + yvelocity };

  snake.unshift(head); // unshift adds elements to the beginning of an array
  snake.pop();
  // / this one updates the snake position
  // snakePart.x = snakePart.x + xvelocity; // here we update headX and headY
  // snakePart.y = snakePart.y + yvelocity; // from here we have to actualize each snake part.
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "orange";
  //console.log( "from drawSnake","headX", headX, "headY", headY);
  ctx.fillRect(snakePart.x, snakePart.y, tileSize, tileSize);
  ctx.strokeStyle = "black";
  ctx.strokeRect(snakePart.x, snakePart.y, tileSize, tileSize);

  // keeping a diminished copy to compare for body collisions
  body = snake.slice(3);

  //console.log("snakePart from drawsnakePart", typeof(snakePart.x),snakePart.x);
}

function drawApple() {
  // this.appleX = getRandomInt(min, max, tileSize);
  // this.appleY = getRandomInt(min, max, tileSize);
  ctx.fillStyle = "red";
  ctx.fillRect(appleX, appleY, tileSize, tileSize);
  if (head.x == appleX && head.y == appleY) {
    // if it east the apple
    // console.log("hit");
    eatSound.play(); // play eating sound
    appleX = getRandomInt(min, max, tileSize);
    appleY = getRandomInt(min, max, tileSize);
    newSegment = [snake[0]];
    snake.push(newSegment); // adding to snake array
    snake.push(newSegment);
    score += 5; // updates score if hit
    //console.log(score);
  }
}

// this takes care of the sound
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// we display the score here
function displayScore() {
  ctx2.fillStyle = "white";
  ctx2.fillRect(0, 0, 500, 100);

  ctx2.fillStyle = "red";
  ctx2.fillRect(0, 0, 2, 2);

  ctx2.font = "20px Comic Sans MS";
  ctx2.fillStyle = "red";

  ctx2.textAlign = "center";
  ctx2.fillText("Score = " + score, 250, 100); // width and height where you want the text aligned.

  if (score < 50) {
    message = "baby snakes are called snakelets";
    ctx2.font = "18px Comic Sans MS";
    ctx2.textAlign = "center";
    ctx2.fillText(message, 250, 50);
  } else if (score >= 50 && score < 100) {
    message1 = "a reticulated python can measure up to";
    message2 = "33 feet in length, thats five average adults";
    message3 = "plus half of one laying down.";

    ctx2.font = "18px Comic Sans MS";
    ctx2.textAlign = "center";
    ctx2.fillText(message1, 250, 15);
    ctx2.fillText(message2, 250, 35);
    ctx2.fillText(message3, 250, 55);
  } else if (score >= 100 && score < 130) {
    message1 = "that snake is getting big, you should";
    message2 = "be paying attention where it goes...";
    ctx2.font = "18px Comic Sans MS";
    ctx2.textAlign = "center";
    ctx2.fillText(message1, 250, 15);
    ctx2.fillText(message2, 250, 35);
  }
}

window.addEventListener("keydown", keyDown, false);

function keyDown(e) {
  switch (e.keyCode) {
    case 37: //left
      // prevent opposite move
      if (xvelocity == tileSize) return;
      yvelocity = 0;
      xvelocity = -1 * tileSize; // go to the left
      //console.log("pressing left")
      break;

    case 38: // up
      if (yvelocity == tileSize) return;
      yvelocity = -1 * tileSize;
      xvelocity = 0;
      break;

    case 39: // right
      if (xvelocity == -1 * tileSize) return;
      xvelocity = tileSize;
      yvelocity = 0;
      break;

    case 40: // down
      if (yvelocity == -1 * tileSize) return;
      xvelocity = 0;
      yvelocity = tileSize;
      break;
  }
}

drawGame(); // this is the main function that calls all the other functions
