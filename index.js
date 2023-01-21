const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 30, 30);

function drawSnake() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height); // clearing the canvas so it doesnt drag the square





     // the square
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(30, 0);
    ctx.lineTo(30, 30);
    ctx.lineTo(0, 30);
    ctx.lineTo(0, 0);
    
    ctx.closePath();
    
}


drawSnake();


let deltaX = 0;
let deltaY = 0;

canvas.addEventListener("keydown", move, false); // here move is the event handler

function move(e) {
    switch(e.keyCode){
        case 37: // left key pressed
            deltaX -= 2;
            break;
        case 38: // up arrow
            deltaY -= 2;
            break;
        case 39: // right arrow
            deltaX += 2;
            break;
        case 40: // down arrow
            deltaY += 2;
            break;

    }
}