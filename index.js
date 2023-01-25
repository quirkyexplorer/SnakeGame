const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 4;
let tileCount = 20; // number of preferred tiles
let tileSize = 30// clientWidth returns the width of an element in pixels

let headX = 300; // starting position of snake
let headY = 300;


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
    changeSnakePosition(); 
    clearScreen();
    drawSnake();
    drawApple(); // apple has to stay, it cant be redrawn everytime. 
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


function getRandomInt(min, max, tilesize) {
    return Math.floor(Math.random() * ((max - min) / tileSize)) * tileSize + min;// max is inclusive and min is inclusive
}

function clearScreen() {
    ctx.fillStyle = "lightblue"; // screen is blue
    ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight); // this whole thing clears the screen
}


function drawSnake() {
    // ctx.clearRect();
    ctx.fillStyle = "orange";
    ctx.fillRect(headX, headY, tileSize, tileSize);
}


function drawApple() {
    
        // this.appleX = getRandomInt(min, max, tileSize);
        // this.appleY = getRandomInt(min, max, tileSize);
        ctx.fillStyle = "red";
        ctx.fillRect(appleX, appleY, tileSize, tileSize);
}

// function score_increment () {


//     if (headX == appleX && headY == appleY) {
        
//     };

// }

function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
    console.log("headX", headX, "headY", headY);
    if (headX == appleX && headY == appleY) {
        console.log("hit");
        appleX = getRandomInt(min, max, tileSize);
        appleY = getRandomInt(min, max, tileSize);
        console.log("appleX", appleX, "appleY", appleY);
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
            xvelocity = -1 * tileSize;
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

