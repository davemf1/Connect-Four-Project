/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const HEIGHT = 6;
const WIDTH = 7;
const resetbtn = document.getElementById('reset');
const startbtn = document.getElementById('start');
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let player = document.getElementById('player');

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board');
  const top = document.createElement("tr");  
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // Creates a table row, set the ID of it to column-top and listens for a click event.
  
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  // Loops over top table row and creates a table data and set it's ID to x, then appends it to the top table row.

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
  // Loops over y-axis and creates a table row and name it row, loops over x-axis and creates a table data, name it cell, set ID to y & x and append cell to the row. Then, append that row to the board itself.
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let y = HEIGHT -1; y > -1; y--){
    if(!board[y][x]){
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const playerPiece = document.createElement('div');
  playerPiece.classList.add('piece');
  if(currPlayer === 1){
    playerPiece.classList.add('p1');
  } else {
    playerPiece.classList.add('p2');
  }
  const position = document.getElementById(`${y}-${x}`);
  position.append(playerPiece);
}

/** endGame: announce game end */
function endGame(message){
  setTimeout(function(){
      if(confirm(message)){
        window.location.reload();
      }
    }, 100);
  
  let game = document.getElementById('game');
  game.classList.add('done');
    
}

/** handleClick: handle click of column top to play piece */

function handleClick(e) {
  // get x from ID of clicked cell
  const x = e.target.id;
  currPlayer;
  if(currPlayer === 1) {
    player.textContent = `Player ${2}'s turn!`;
    player.style.color = 'rgb(112, 23, 255)';
  } else {
    player.textContent = `Player ${1}'s turn!`;
    player.style.color = 'rgb(55, 248, 104)';
  }

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
 
  // }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won! Do you want to restart?`);
  } 

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if(board.every(cell => cell.every(row => row))){
    return endGame('The game is tied');
  }
    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer === 1 ? 2 : 1;  
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

startbtn.addEventListener('click', function start(){
    makeBoard();
    makeHtmlBoard();
    player.textContent = `Player ${1}'s turn!`;
    player.style.color = 'rgb(55, 248, 104)';
    startbtn.disabled = true;
});

resetbtn.addEventListener('click', function again(){
  window.location.reload();
})