const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//const canvas2 = document.getElementById("score");  // for the score
// const ctx2 = canvas2.getContext("2d");


let speed = 4;
let tileCount = 20; // number of preferred tiles
let tileSize = 30// clientWidth returns the width of an element in pixels

let headX = 300; // starting position of snake
let headY = 300;

// 
let head = 0;

// to draw the body of the snake
// array for snake parts
let snake = [{x:300, y:300}, {x:270, y:300}, {x:240, y:300}]; // we need to call this to grow the snake or add parts

// random range for apple to appear 
min = 0;
max = 600;

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
    
    clearScreen();
    drawApple();
    
    changeSnakePosition();
    drawSnake();
    //displayScore();
    
    const time = setTimeout(drawGame, 1000/speed); // update screen 4 times a second
    gameOver(time);
    // console.log(getRandomInt(min, max));
}

function gameOver(time) {  // this function freezes the image when 
    // snake hits a wall 
    if (head.x + 60 > 630 || head.x - 30 < -30 || head.y + 60 >
        630 || head.y - 30 < -30) {
       
       drawSnake();
       clearTimeout(time); // dont update if going
       // outside the bounds. freeze the image. 
    } 

}


// to draw the apple
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
    head = {x: snake[0].x + xvelocity, y: snake[0].y  + yvelocity};
    snake.unshift(head);
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
    //console.log("snakePart from drawsnakePart", typeof(snakePart.x),snakePart.x);
}

function drawApple() {
        // this.appleX = getRandomInt(min, max, tileSize);
        // this.appleY = getRandomInt(min, max, tileSize);
        ctx.fillStyle = "red";
        ctx.fillRect(appleX, appleY, tileSize, tileSize);
        if (head.x == appleX && head.y == appleY) {  // if it east the apple
            // console.log("hit"); 
            appleX = getRandomInt(min, max, tileSize);
            appleY = getRandomInt(min, max, tileSize);
            newSegment = [snake[0]];
            snake.push(newSegment);
            snake.push(newSegment);
            score += 5; // updates score if hit
            console.log(score);
                 };

}

// we display the score here 
// function displayScore() {
//         ctx2.fillStyle = "white";
//         ctx2.fillRect(-100, 100, clientWidth, clientHeight);
// }

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

