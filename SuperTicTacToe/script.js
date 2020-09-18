const DEBUG = true;
const conversion = ['-', 'X', 'O']

/* stores current active player*/
let player = 1;
let turnCount = 0;
let activeBoard = -1;
let previousBoard = -1;

/* stores and initializes big littleBoards information*/
let bigBoard = new Array(9);
for(let i = 0; i < bigBoard.length; i++){
  bigBoard[i] = 0;
}

/* stores and initializes all little littleBoards information*/
let littleBoards = new Array(9);
for(let i = 0; i < littleBoards.length; i++) {
  littleBoards[i] = new Array(9);
  for(let j = 0; j < littleBoards[i].length; j++){
    littleBoards[i][j] = 0;
  }
}

/* Prints board passed to console in clean 3x3 square for debugging */ 
function printBoard(board) {
  for(let i = 0; i < board.length; i+=3) {
    console.log(conversion[board[i]] + ' ' + conversion[board[i+1]] + ' ' + conversion[board[i+2]])
  }
}

/* Outputs to console the current state of the game board formatted to represent the game */
function printGame() {
  let result = '';
  for(let bigRow = 0; bigRow < 3; bigRow++) {
    for(let smallRow = 0; smallRow < 3; smallRow++){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++) {
          result += conversion[littleBoards[3*bigRow + i][3*smallRow + j]] + ' ';
        }
        result += '  '
      }
      result += '\n';
    }
    result += '\n'
  }
  console.log(result)
}

/* */
function test(id, color = "white") {
  playerClick(id);
}

function getPlayer() {
  return player;
}

function playerClick(id) {
  // Determines which little board was clicked and which cell
  let boardNum = parseInt(id[0]);
  let cellNum = parseInt(id[1]);

  // console debug text
  if(DEBUG)
    console.log("CELL CLICKED:\n=============\nBoard number: " + boardNum + "\nCell number: " + cellNum + '\n');

  // checks to see if click in active square and the square has not already been clicked
  if((activeBoard === -1 || boardNum === activeBoard) && littleBoards[boardNum][cellNum] === 0){
    littleBoards[boardNum][cellNum] = player;
    cell = document.getElementById(id);
    cell.innerHTML = (player == 1) ? "X" : "O";
    if(DEBUG){
        console.log("Win in square #" + boardNum + "?: " + checkSmall(boardNum));
        console.log("Game win?: " + checkBig() + '\n');
    }
    previousBoard = activeBoard;
    let boardFull = true;
    for(let i = 0; i < littleBoards[cellNum].length; i++) {
      if(littleBoards[cellNum][i] === 0) boardFull = false;
    }
    activeBoard = boardFull? -1: cellNum;
    highlightActive();
    (turnCount++ % 2 === 0) ? player = 2: player = 1;
  }
  else
    if(DEBUG)
      console.log("Invalid move!");

  console.log("Game state:");
  printGame();
}

function highlightActive() {
  // unhighlight previous active board, if there is one
  if(previousBoard != -1){
    previousBoard = document.getElementById(parseInt(previousBoard));
    classString = previousBoard.className;
    previousBoard.className = classString.substring(0, classString.length - 13);
  }
  // highlight new active board
  if(activeBoard != -1) {
    board = document.getElementById(parseInt(activeBoard));
    board.className += " activeSquare";
  }
}

function confirmMove() {
  /* 
    1. Update the littleBoards with the new move
    2. Check if new move makes 3 in a row on small littleBoards

  
  */
}

function drawBigBoard(id) {
  let bigCell = document.getElementById(id);
}

/* 
Called every time a player makes a 
move to check if there is a three-in 
*/
function checkSmall(boardNum) {
  if (bigBoard[boardNum] === 0 &&
    ((littleBoards[boardNum][0] == player && littleBoards[boardNum][1] == player && littleBoards[boardNum][2] == player) ||
    (littleBoards[boardNum][3] == player && littleBoards[boardNum][4] == player && littleBoards[boardNum][5] == player) ||
    (littleBoards[boardNum][6] == player && littleBoards[boardNum][7] == player && littleBoards[boardNum][8] == player) ||
    (littleBoards[boardNum][0] == player && littleBoards[boardNum][3] == player && littleBoards[boardNum][6] == player) ||
    (littleBoards[boardNum][1] == player && littleBoards[boardNum][4] == player && littleBoards[boardNum][7] == player) ||
    (littleBoards[boardNum][2] == player && littleBoards[boardNum][5] == player && littleBoards[boardNum][8] == player) ||
    (littleBoards[boardNum][0] == player && littleBoards[boardNum][4] == player && littleBoards[boardNum][8] == player) ||
    (littleBoards[boardNum][2] == player && littleBoards[boardNum][4] == player && littleBoards[boardNum][6] == player))) {
  bigBoard[boardNum] = player;
  return true;
 } 
 return false;
}

/*
Called every time a small littleBoards is completed
to determine if either player has won the game
with three-in-a-row on the big littleBoards
*/
function checkBig(){
  if (
    (bigBoard[0] == player && bigBoard[1] == player && bigBoard[2] == player) ||
    (bigBoard[3] == player && bigBoard[4] == player && bigBoard[5] == player) ||
    (bigBoard[6] == player && bigBoard[7] == player && bigBoard[8] == player) ||
    (bigBoard[0] == player && bigBoard[3] == player && bigBoard[6] == player) ||
    (bigBoard[1] == player && bigBoard[4] == player && bigBoard[7] == player) ||
    (bigBoard[2] == player && bigBoard[5] == player && bigBoard[8] == player) ||
    (bigBoard[0] == player && bigBoard[4] == player && bigBoard[8] == player) ||
    (bigBoard[2] == player && bigBoard[4] == player && bigBoard[6] == player)) {
    return true;
 } 
 return false;
}