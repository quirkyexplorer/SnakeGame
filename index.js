const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



// this one draws the background : called in drawsnake
function drawBackground() {
    ctx.beginPath();
    // color in the background
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// this sets up the speed of the snake 
let fps = 03;
let interval = Math.floor(1000 / fps);
let startTime = performance.now();
let previousTime = startTime; 

let currentTime = 0;
let deltaTime = 0;


function animationLoop(timestamp) {

    currentTime = timestamp;
    deltaTime = currentTime - previousTime;

    if (deltaTime > interval) {
        previousTime = currentTime - (deltaTime % interval);
        drawSnake();
    }

    requestAnimationFrame(animationLoop);
}

requestAnimationFrame(animationLoop);


function drawSnake() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height); // clearing the canvas so it doesnt drag the square
     
    drawBackground();

    ctx.fillStyle = "black";
    ctx.fillRect(300 + deltaX, 300 + deltaY, 20, 20); // x, y coordinates, then width and height 


    // the outline
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "#000000";
    ctx.fill();

    //deltaX += 20; //starts moving right
    

}


    window.addEventListener("keydown", direction, false);


// these track the movement of the square
 var deltaX = 0;
 var deltaY = 0;

 // in order to move the snake about 
function direction(e) {

   
    switch(e.keyCode){
        case 37: // left key pressed
        // this should lead to square animating left
            deltaX -= 20;
            deltaY = 0;
            console.log("pressing left")
            break;
        case 38: // up arrow
        // this should lead to square animating up
            deltaY -= 20;
            deltaX = 0;
            console.log("pressing up")
            break;
        case 39: // right arrow
        // this should lead to square animating right
            deltaX += 20;
            deltaY = 0;
            console.log("pressing right")
            break;
        case 40: // down arrow
        // this should lead to square animating down 
            deltaY += 20;
            deltaX = 0;
            console.log("pressing down")
            break;

    }

}