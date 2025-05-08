// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const imgBox = document.querySelector('.imgbox img');

// Sound effects
const winSound = new Audio('game-over-160612.mp3');   // Add your win sound file
const drawSound = new Audio('video-game-bonus-323603.mp3'); // Add your draw sound file

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// All possible winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Update the status text
function updateStatus() {
  statusDisplay.textContent = `Player '${currentPlayer}'s turn`;
}

// Check if the current player has won
function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      statusDisplay.textContent = `Player '${currentPlayer}' wins!`;
      imgBox.src = 'excited.gif'; // Replace with your winning image
      winSound.play();            // Play win sound
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameActive = false;
    statusDisplay.textContent = "It's a draw!";
    imgBox.src = 'draw.gif';      // Replace with your draw image
    drawSound.play();             // Play draw sound
  }
}

// Handle cell click event
function handleCellClick(event) {
  const clickedIndex = event.target.getAttribute('data-index');

  if (gameBoard[clickedIndex] !== '' || !gameActive) {
    return;
  }

  // Update the board and the UI
  gameBoard[clickedIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());

  // Check for winner or draw
  checkWinner();

  // Switch players
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

// Reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusDisplay.textContent = `Player '${currentPlayer}'s turn`;
  imgBox.src = ''; // Clear the image

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);

// Initial status update
updateStatus();
