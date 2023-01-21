const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function drawSnake() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height); // clearing the canvas so it doesnt drag the square
     // the square
    ctx.beginPath();
    ctx.moveTo(0 + deltaX, 0 + deltaY);
    ctx.lineTo(20 + deltaX, 0 + deltaY);
    ctx.lineTo(20 + deltaX, 20 + deltaY);
    ctx.lineTo(0 + deltaX, 20 + deltaY);
    ctx.lineTo(0 + deltaX, 0 + deltaY);

    // the outline
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "#000000";
    ctx.fill();
    
    ctx.closePath();
    
}

window.addEventListener("keydown", move, false); // here move is the event handler
//The addEventListener() method allows you to add event listeners on any HTML DOM object such as HTML elements, 
//the HTML document, the window object, or other objects that support events, 
//like the xmlHttpRequest object.


 var deltaX = 0;
 var deltaY = 0;

function move(e) {
   
    switch(e.keyCode){
        case 37: // left key pressed
            deltaX -= 20;
            break;
        case 38: // up arrow
            deltaY -= 20;
            break;
        case 39: // right arrow
            deltaX += 20;
            break;
        case 40: // down arrow
            deltaY += 20;
            break;

    }

    drawSnake();
}