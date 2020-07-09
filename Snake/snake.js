let gameover = false;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Loading images
let ground = new Image();
ground.src = "img/ground.png";

// Creating unit
let box = 32;

// create snake array and initialize body
let snake = [];
snake[0] = {x: 9*box, y: 10*box};

// create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create score var
let score = 0;

// control the snake 
let d;
let acted = false;
document.addEventListener("keydown", direction);

function direction(event) {
    if(!acted){
        switch(event.keyCode) {
            case 37: 
                if(d!="RIGHT") {d="LEFT"; acted = true;}
                break;
            case 38:
                if(d!="DOWN") {d="UP"; acted = true;}
                break;
            case 39:
                if(d!="LEFT") {d="RIGHT"; acted = true;}
                break;
            case 40:
                if(d!="UP") {d="DOWN"; acted = true;}
                break;
    }
    }
}

// check collision
function collision(head, array) {
    for(let i =0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y)
            return true;
    }
    return false;
}
// draw game on canvas
function draw() {
    //ctx.drawImage(ground, 0, 0);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, 19*box, 19*box);
    acted = false;
    // draw snake
    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = ( i==0 )?"blue" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle="black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);


    // old head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;

        food = {
            x: Math.floor(Math.random() * 18) * box,
            y: Math.floor(Math.random() * 18) * box
        }

        for(let i = 0; i < snake.length; i++) {
            if(snake[i].x == food.x && snake[i].y == food.y){
                food.x = snake[snake.length-1].x;
                food.y = snake[snake.length-1].y;
                break;
            }
        }

    }
    else {
        // remove tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    // game over conditions
    if(snakeX < 0 || snakeX > 18*box || snakeY < 0*box || snakeY > 18*box || collision(newHead, snake)) {
        gameover = true;
        ctx.fillStyle = "red";
        ctx.font= "45px Changa One";
        ctx.fillText("GAME OVER :/", 4.75*box, 9.5*box);
        clearInterval(game);
    }

    snake.unshift(newHead);

    // draw score
    ctx.fillStyle = "red";
    ctx.font="45px Changa One";
    ctx.fillText(score, 0.8*box, 1.6*box);
}
game = setInterval(draw, 100);
function changeSpeed(newSpeed){
    if(!gameover){
        clearInterval(game);
        game = setInterval(draw, newSpeed);
    }
}