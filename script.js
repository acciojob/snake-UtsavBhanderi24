
// script.js
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
let score = 0;
let snake = [781]; // row 20, col 1
let direction = 1; // right
let foodPixel = null;

for (let i = 1; i <= 1600; i++) {
  const pixel = document.createElement('div');
  pixel.id = 'pixel' + i;
  gameContainer.appendChild(pixel);
}

function drawSnake() {
  snake.forEach((i) => {
    const pixel = document.getElementById('pixel' + i);
    pixel.classList.add('snakeBodyPixel');
  });
}

function clearSnake() {
  snake.forEach((i) => {
    const pixel = document.getElementById('pixel' + i);
    pixel.classList.remove('snakeBodyPixel');
  });
}

function moveSnake() {
  clearSnake();
  const head = snake[snake.length - 1];
  const newHead = head + direction;

  if (
    (direction === 1 && head % 40 === 0) ||
    (direction === -1 && head % 40 === 1) ||
    (direction === -40 && head <= 40) ||
    (direction === 40 && head > 1560) ||
    snake.includes(newHead)
  ) {
    alert('Game Over!');
    clearInterval(gameInterval);
    return;
  }

  snake.push(newHead);

  if (newHead === foodPixel) {
    score++;
    scoreDisplay.textContent = score;
    generateFood();
  } else {
    snake.shift();
  }

  drawSnake();
}

function generateFood() {
  if (foodPixel) document.getElementById('pixel' + foodPixel).classList.remove('food');

  let newFood;
  do {
    newFood = Math.floor(Math.random() * 1600) + 1;
  } while (snake.includes(newFood));

  foodPixel = newFood;
  document.getElementById('pixel' + foodPixel).classList.add('food');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction !== 40) direction = -40;
  if (e.key === 'ArrowDown' && direction !== -40) direction = 40;
  if (e.key === 'ArrowLeft' && direction !== 1) direction = -1;
  if (e.key === 'ArrowRight' && direction !== -1) direction = 1;
});

drawSnake();
generateFood();
const gameInterval = setInterval(moveSnake, 100);
