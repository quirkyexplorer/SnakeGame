const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



let speed = 4;
let tileCount = 20; // number of preferred tiles
let tileSize = canvas.clientWidth/tileCount-1; // clientWidth returns the width of an element in pixels

let headX = 300; // starting position of snake
let headY = 300;

// array for snake parts

const snakeParts = [];
let tailLength = 2;

// initialize the speed of the snake
let xvelocity = 0;
let yvelocity = 0;

// draw apple = 5;
let appleX = 5;
let appleY = 5;

// scores 
let score = 0;

// create game loop-to continously update screen
function drawGame() {
    changeSnakePosition(); 
    clearScreen();
    drawSnake();
    setTimeout(drawGame, 1000/speed); // update screen 4 times a second
    gameOver();  // gota check game over from here .
    if (gameOver == true) {
        console.log(gameOver());  // dont update? 
    } 
}

function gameOver() {
    if (headX - 20 > 600) {
        
        return true; // dont update. freeze the image. 
    }

    else return false;
    
}


function clearScreen() {
    ctx.fillStyle = "lightblue"; // screen is blue
    ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight); // this whole thing clears the screen
}


function drawSnake() {
    ctx.fillStyle = "green";

    ctx.fillStyle = "orange";
    ctx.fillRect(headX, headY, tileSize, tileSize);

}


function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
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

