// Get Canvas and Context

const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

// Game Objects

const paddleWidth=10, paddleHeight=100;

let leftPaddle={
    x:10,
    y:150,
    speed:5
};


let rightPaddle={
    x:canvas.width-20,
    y:150,
    speed:5
};

let ball={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:8,
    dx:4,
    dy:4
};


// Player Controls
let upPressed = false, downPressed = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") upPressed = true;
    if (e.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") upPressed = false;
    if (e.key === "ArrowDown") downPressed = false;
});

// Update Game State
function update() {
    // Move right paddle (player)
    if (upPressed && rightPaddle.y > 0) rightPaddle.y -= rightPaddle.speed;
    if (downPressed && rightPaddle.y < canvas.height - paddleHeight) rightPaddle.y += rightPaddle.speed;

    // Move left paddle (simple AI)
    if (ball.y > leftPaddle.y + paddleHeight / 2) leftPaddle.y += leftPaddle.speed;
    else if (ball.y < leftPaddle.y + paddleHeight / 2) leftPaddle.y -= leftPaddle.speed;

    // Ball Movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball Collision with Top & Bottom
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
    }

    // Ball Collision with Paddles
    if (ball.x - ball.radius < leftPaddle.x + paddleWidth &&
        ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
        ball.dx *= -1;
    }

    // Ball Out of Bounds (Reset)
    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }
}

// Draw Game Objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Paddles
    ctx.fillStyle = "white";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

    // Draw Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start Game
gameLoop();

