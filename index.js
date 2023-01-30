const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 4;
let tileCount = 20; // number of preferred tiles
let tileSize = 30// clientWidth returns the width of an element in pixels

let headX = 300; // starting position of snake
let headY = 300;

// to draw the body of the snake
let snake = [{x:300, y:300}, {x:270, y:300}, {x:240, y:300}]; 
console.log(snake[0].x);
console.log(typeof(snake));
// random range for apple to appear 
min = 0;
max = 600;

// array for snake parts

const snakeParts = [];
let tailLength = 2;

// initialize the speed of the snake
let xvelocity = 0;
let yvelocity = 0;

// draw apple = 5;
let appleX = 30;
let appleY = 30;

// scores 
let score = 0;

// create game loop-to continously update screen
function drawGame() {

    //changeSnakePosition();  // maybe we dont need this one here. 
    clearScreen();
    drawApple();
    
    changeSnakePosition();
    drawSnake();
    
    // history();
    // apple has to stay, it cant be redrawn everytime. 
    // a helper function must update it once snake eats it. 
    const time = setTimeout(drawGame, 1000/speed); // update screen 4 times a second
    gameOver(time);
    // console.log(getRandomInt(min, max));
}

function gameOver(time) {  // this function freezes the image when 
    // snake hits a wall 
    if (headX + 60 > 600 || headX - 30 < 0 || headY + 60 >
        600 || headY - 30 < 0) {
       clearTimeout(time); // dont update if going
       // outside the bounds. freeze the image. 
    } 

}

function getRandomInt(min, max, tileSize) {
    return Math.floor(Math.random() * ((max - min) / tileSize)) * tileSize + min;// max is inclusive and min is inclusive
}

function clearScreen() {
    ctx.fillStyle = "lightblue"; // screen is blue
    ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight); // this whole thing clears the screen
}

function drawSnake() {
    // ctx.clearRect();
    //snake.forEach(changeSnakePosition); //updates the position for all parts. or so it should 
    snake.forEach(drawSnakePart); //draws the actual snake
    //console.log(drawSnakePart);
    // this is a loop 
}

function changeSnakePosition() {  
    const head = {x: snake[0].x + xvelocity, y: snake[0].y  + yvelocity};
    snake.unshift(head);
    snake.pop();
    // / this one updates the snake position
    // snakePart.x = snakePart.x + xvelocity; // here we update headX and headY
    // snakePart.y = snakePart.y + yvelocity; // from here we have to actualize each snake part.

}

function drawSnakePart(snakePart) {
    ctx.fillStyle = "orange";
    console.log( "from drawSnake","headX", headX, "headY", headY);
    ctx.fillRect(snakePart.x, snakePart.y, tileSize, tileSize);
    //console.log("snakePart from drawsnakePart", typeof(snakePart.x),snakePart.x);
}

function drawApple() {
        // this.appleX = getRandomInt(min, max, tileSize);
        // this.appleY = getRandomInt(min, max, tileSize);
        ctx.fillStyle = "red";
        ctx.fillRect(appleX, appleY, tileSize, tileSize);
        if (headX == appleX && headY == appleY) {
            // console.log("hit"); 
            appleX = getRandomInt(min, max, tileSize);
            appleY = getRandomInt(min, max, tileSize);
            score += 5; // updates score if hit
            console.log(score);
                 };

}

window.addEventListener('keydown', keyDown, false);

function keyDown(e) {

    switch(e.keyCode) {

        case 37: //left 
            // prevent opposite move
            if (xvelocity == tileSize)
            return;
            yvelocity = 0;
            xvelocity = -1 * tileSize; // go to the left
            //console.log("pressing left")
            break;

        case 38: // up 
            if (yvelocity == tileSize)
            return;    
            yvelocity = -1 * tileSize;
            xvelocity = 0; 
            break;

        case 39: // right
            if (xvelocity == -1 * tileSize)
            return;     
            xvelocity = tileSize;
            yvelocity = 0;
            break;

        case 40: // down
            if (yvelocity == -1 * tileSize)
            return;    
            xvelocity = 0;
            yvelocity = tileSize;
            break;
    }
}

drawGame();

