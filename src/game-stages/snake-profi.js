// JavaScript
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let box = 32;
let score = 0;
let level = 1;
let levelThresholds = [5, 10, 20, 50, 100];
let gameSpeed = 80; // initial game speed
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };
let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
    context.strokeStyle = "red";
    context.strokeRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x + box/4, food.y + box/4, box/2, box/2); // smaller apple
}

function drawScore() {
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, box, box);
}

canvas.addEventListener('click', update);

function update(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let dx = x - snake[0].x;
    let dy = y - snake[0].y;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) direction = "right";
        else direction = "left";
    } else {
        if (dy > 0) direction = "down";
        else direction = "up";
    }
}

function checkLevelUp() {
    if (score >= levelThresholds[level - 1]) {
        clearInterval(game);
        let continueGame = confirm(`You passed level ${level}! Do you want to continue to the next level?`);
        if (continueGame) {
            level++;
            gameSpeed -= 40; // decrease interval to speed up game
            game = setInterval(startGame, gameSpeed);
        }
    }
}

function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    createBG();
    createSnake();
    drawFood();
    drawScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
        checkLevelUp();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, gameSpeed);