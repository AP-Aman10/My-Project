const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const scoreXDisplay = document.querySelector("#score-x");
const scoreODisplay = document.querySelector("#score-o");

let turnX = true;
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const updateScoreDisplay = () => {
  scoreXDisplay.textContent = scoreX;
  scoreODisplay.textContent = scoreO;
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
  turnX = true;
  gameOver = false;
  msgContainer.classList.add("hide");
  enableBoxes();
};

const fullReset = () => {
  resetGame();
  scoreX = 0;
  scoreO = 0;
  updateScoreDisplay();
};

const showWinner = (winner) => {
  msg.textContent = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameOver = true;
  disableBoxes();

  if (winner === "X") {
    scoreX++;
  } else {
    scoreO++;
  }
  updateScoreDisplay();
};

const checkGameState = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }

  const isDraw = [...boxes].every(box => box.innerText !== "");
  if (isDraw && !gameOver) {
    msg.textContent = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    gameOver = true;
  }
};

const handleBoxClick = (box) => {
  if (box.disabled || gameOver) return;

  box.innerText = turnX ? "X" : "O";
  box.style.color = turnX ? "#ff6b6b" : "#4fc3f7";
  box.disabled = true;

  checkGameState();
  turnX = !turnX;
};

boxes.forEach(box => {
  box.addEventListener("click", () => handleBoxClick(box));
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", fullReset);
