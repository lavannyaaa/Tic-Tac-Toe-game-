let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let singlePlayer = false;
let playerXScore = 0;
let playerOScore = 0;
let tieScore = 0;  

const cells = document.querySelectorAll(".btn");
const resetButton = document.querySelector(".reset");
const winnerDisplay = document.getElementById("winner");
const modeToggleButton = document.getElementById("modeToggleButton");

function toggleMode() {
  singlePlayer = !singlePlayer;
  modeToggleButton.textContent = singlePlayer ? "👤" : "👥";
  
  playerXScore = 0;
  playerOScore = 0;
  tieScore = 0;
  document.getElementById("playerXScore").textContent = playerXScore;
  document.getElementById("playerOScore").textContent = playerOScore;
  document.getElementById("tieScore").textContent = tieScore;

  resetGame();
}

function handleClick(event) {
  const index = Array.from(cells).indexOf(event.target);
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      updateScore();
      displayWinner(`${currentPlayer} wins!`);
      return;
    }
    if (board.every(cell => cell !== "")) {
      displayWinner("It's a draw!");
      updateTieScore();
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (singlePlayer && currentPlayer === "O") {
      computerMove();
    }
  }
}

function computerMove() {
  const emptyCells = board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  if (checkWin()) {
    updateScore();
    displayWinner("O wins!");
    return;
  }
  if (board.every(cell => cell !== "")) {
    displayWinner("It's a draw!");
    updateTieScore();
  } else {
    currentPlayer = "X";
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winConditions.some(condition => condition.every(index => board[index] === currentPlayer));
}

function displayWinner(message) {
  winnerDisplay.textContent = message;
  gameActive = false;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  winnerDisplay.textContent = "";
  gameActive = true;
}

function updateScore() {
  if (currentPlayer === "X") {
    playerXScore++;
    document.getElementById("playerXScore").textContent = playerXScore;
  } else {
    playerOScore++;
    document.getElementById("playerOScore").textContent = playerOScore;
  }
}

function updateTieScore() {
  tieScore++;
  document.getElementById("tieScore").textContent = tieScore;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);

