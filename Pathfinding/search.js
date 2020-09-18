
// DECLARING CONSTANTS
const BOX = 25;                             // size of each box
const CANVAS_FULL = 750;                    // full canvas including bordering wall
const CANVAS_SIZE = CANVAS_FULL - 2*BOX;    // "usable" canvas area, takes off one box on each side for bordering wall
const GRID_SIZE = CANVAS_FULL / BOX;
const DEBUG = true;

const canvas = document.getElementById("canvas");;
const ctx = canvas.getContext("2d");
const colorMap = ["white", "black", "green", "red", "blue", "teal"];

let start;
let goal;
let grid = new Array(GRID_SIZE); 

function logCoord(name, coord) {
    console.log(name + ": ( " + coord.x + ", " + coord.y + " )");
}
// Initialize canvas and create start and endpoint
function setUp( ) {
    // draw bordering walls
    for(let i = 0; i < GRID_SIZE; i++){
        grid[i] = new Array(GRID_SIZE);
    }

    for(let x = 0; x < GRID_SIZE; x++) {
        grid[0][x] = 1;
        grid[GRID_SIZE - 1][x] = 1;

        grid[x][0] = 1;
        grid[x][GRID_SIZE - 1] = 1;
    }

    // draw individual boxes on canvas
    for(let x = 1; x <= (CANVAS_SIZE / BOX); x++) {
       for(let y = 1; y <= (CANVAS_SIZE / BOX); y++){
            grid[x][y] = (Math.random() < 0.25) ? 1 : 0;
        }
    }

    // set up start and end points (will be randomized later)
    if(DEBUG) console.table(grid);
    start = {x: 2, y: 2};
    grid[start.x][start.y] = 2;

    goal = {x: 25, y: 25};
    grid[goal.x][goal.y] = 3;

    for(let i = 0; i < GRID_SIZE; i++) {
        for(let j = 0; j < GRID_SIZE; j++){
            ctx.fillStyle = colorMap[grid[i][j]];
            ctx.fillRect(i*BOX, j*BOX, BOX, BOX);
            ctx.strokeStyle = "black";
            ctx.strokeRect(i*BOX, j*BOX, BOX, BOX);
        }
    }
    refresh = setInterval(dfs, 25 );
}


setUp();
// [x, y] : right == [1, 0], down = [0, 1], left = [-1, 0], up = [0, -1]
let directions = [{x: 1, y:0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y: -1}];
let stack = [];
let current = start;

function dfs() {

    let found = false;
    let isOption = false;

    /* Algorithm: 
            - Look right, else down, else left, else up
            - When look at each box, if open update current there and push to stack
            - Else, if no open boxes, backtrack by popping off stack into current, and continue checking
    */
    
    // label current spot
    grid[current.x][current.y] = 4;

    let next;
    // looks for first available option
    for(let i= 0; !isOption && i < directions.length; i++) {
        next = {x: current.x + directions[i].x, y: current.y + directions[i].y};
        if(next.x === goal.x && next.y === goal.y) {
            clearInterval(refresh);
        }
        if(grid[next.x][next.y] === 0) {
            isOption = true;
        }
    }

    if(DEBUG) console.log(next.x +' '+ next.y + "  " + goal.x +' '+ goal.y);
    
    if(next.x === goal.x && next.y === goal.y) {
        clearInterval(refresh);
        found = true;
    }
    else {
        if(isOption) {  // found a viable option, pursue it in depth first manner
            stack.push(current);
            current = next;
            isOption = false;
        }
        else {          // backtrack using stack
            if(stack.length == 0) {
                clearInterval(refresh);
            }
            else {
                grid[current.x][current.y] = 5;
                current = stack.pop();
                isOption = false;
            }
        }
    }

    // draws the grid 
    grid[start.x][start.y] = 2;
    for(let i = 0; i < GRID_SIZE; i++) {
        for(let j = 0; j < GRID_SIZE; j++){
            ctx.fillStyle = colorMap[grid[i][j]];
            ctx.fillRect(i*BOX, j*BOX, BOX, BOX);
            ctx.strokeStyle = "black";
            ctx.strokeRect(i*BOX, j*BOX, BOX, BOX);
        }
    }
}

let queue = [];
function bfs () {
    let found = false;
    let isOption = false;

    /* Algorithm: 
            - Look right, else down, else left, else up
            - When look at each box, if open enqueue those coordinates (push to array)
            - Else, if no open boxes, backtrack by popping off stack into current, and continue checking
    */
    
    // label current spot
    grid[current.x][current.y] = 4;

    let next;
    // looks for first available option
    for(let i= 0; !isOption && i < directions.length; i++) {
        next = {x: current.x + directions[i].x, y: current.y + directions[i].y};
        if(next.x === goal.x && next.y === goal.y) {
            clearInterval(refresh);
            found = true;
        }
        if(grid[next.x][next.y] == 0){
            queue.push(next);
        }
    }
    
    //if(!found) {
        if(queue.length === 0) {
            clearInterval(refresh);
        }
        current = queue.shift();
   // }

    // draws the grid 
    grid[start.x][start.y] = 2;
    for(let i = 0; i < GRID_SIZE; i++) {
        for(let j = 0; j < GRID_SIZE; j++){
            ctx.fillStyle = colorMap[grid[i][j]];
            ctx.fillRect(i*BOX, j*BOX, BOX, BOX);
            ctx.strokeStyle = "black";
            ctx.strokeRect(i*BOX, j*BOX, BOX, BOX);
        }
    }
}