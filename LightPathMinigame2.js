// ---------- LIGHTPATH MINIGAME 2: INTERMEDIATE GLOWING MAZE WITH HIDDEN EXIT + MINI HALLWAY ----------

// Maze configuration
let cols = 23;
let rows = 23;
let cellSize;
let maze = [];

// Player
let playerX, playerY;
let playerRadius = 20;
let playerSpeed = 4;

// Lighting
let lightRadius = 120;

// Exit
let exitX = 21;
let exitY = 11;
let exitSize;
let exitVisible = false;

// Timer
let totalTime = 60;
let startTime;

// Game state
let gameState = "playing"; // "playing", "win", "lose"

// Button variables
let replayButton, continueButton;

function setup() {
    createCanvas(windowWidth, windowHeight);
    cellSize = min(width / cols, height / rows);
    exitSize = cellSize * 0.8;

    // Maze layout (intermediate, 23x23 with hallway exit)
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    ];

    // Player start
    playerX = cellSize * 1.5;
    playerY = cellSize * 1.5;

    // Timer
    startTime = millis();
}

function draw() {
    background(10); // dark

    if (gameState === "playing") {
        drawMaze();
        drawPlayer();
        drawExit();
        handleMovement();
        handleTimer();
        checkWin();
    } else if (gameState === "win") {
        drawWinScreen();
    } else if (gameState === "lose") {
        drawLoseScreen();
    }
}

function drawMaze() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * cellSize + cellSize / 2;
            let y = j * cellSize + cellSize / 2;
            let d = dist(playerX, playerY, x, y);
            if (d < lightRadius + cellSize / 2 && maze[j][i] === 1) {
                push();
                let alpha = map(d, 0, lightRadius + cellSize / 2, 255, 0);
                drawingContext.shadowBlur = 20;
                drawingContext.shadowColor = color(150, 150, 255, alpha);
                fill(50, 50, 80, alpha);
                rectMode(CENTER);
                rect(x, y, cellSize, cellSize);
                pop();
            }
        }
    }
}

function drawPlayer() {
    // Lighting effect
    push();
    noStroke();
    let gradient = drawingContext.createRadialGradient(playerX, playerY, 0, playerX, playerY, lightRadius);
    gradient.addColorStop(0, 'rgba(255,255,200,0.8)');
    gradient.addColorStop(1, 'rgba(10,0,20,0)');
    drawingContext.fillStyle = gradient;
    ellipse(playerX, playerY, lightRadius * 2);
    pop();

    // Glowing orb
    push();
    drawingContext.shadowBlur = 40;
    drawingContext.shadowColor = color(255, 255, 200);
    fill(255, 255, 180);
    ellipse(playerX, playerY, playerRadius * 2);
    pop();
}

function drawExit() {
    let ex = exitX * cellSize + cellSize / 2;
    let ey = exitY * cellSize + cellSize / 2;
    let distanceToExit = dist(playerX, playerY, ex, ey);

    if (distanceToExit < cellSize * 3) {
        exitVisible = true;
    }

    if (exitVisible) {
        push();
        fill(0, 255, 0, 200);
        drawingContext.shadowBlur = 30;
        drawingContext.shadowColor = color(0, 255, 0);
        rectMode(CENTER);
        rect(ex, ey, cellSize * 0.8, cellSize * 0.8);
        pop();
    }
}

function handleMovement() {
    let nextX = playerX;
    let nextY = playerY;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) nextX -= playerSpeed;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) nextX += playerSpeed;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) nextY -= playerSpeed;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) nextY += playerSpeed;

    let i = floor(nextX / cellSize);
    let j = floor(nextY / cellSize);

    if (maze[j][i] === 0) {
        playerX = nextX;
        playerY = nextY;
    }
}

function handleTimer() {
    let elapsed = (millis() - startTime) / 1000;
    let remaining = max(0, totalTime - elapsed);

    fill(255);
    textSize(32);
    textAlign(RIGHT, TOP);
    text("Time: " + remaining.toFixed(0), width - 20, 20);

    if (remaining <= 0) gameState = "lose";
}

function checkWin() {
    let px = floor(playerX / cellSize);
    let py = floor(playerY / cellSize);
    if (exitVisible && px === exitX && py === exitY) {
        gameState = "win";
    }
}

function drawWinScreen() {
    background(0, 100, 0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("You Escaped!", width / 2, height / 2);

    // Continue button
    if (!continueButton) {
        continueButton = createButton("Continue");
        continueButton.position(width / 2 - 60, height / 2 + 80);
        continueButton.size(120, 40);
        continueButton.mousePressed(() => {
            // go to next page / state
            window.location.href = "nextPage.html";
        });
    }
}

function drawLoseScreen() {
    background(100, 0, 0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Time's Up! You Lose!", width / 2, height / 2);

    // Replay button
    if (!replayButton) {
        replayButton = createButton("Replay");
        replayButton.position(width / 2 - 50, height / 2 + 80);
        replayButton.size(100, 40);
        replayButton.mousePressed(() => {
            // reset game
            replayButton.remove();
            replayButton = null;
            if (continueButton) {
                continueButton.remove();
                continueButton = null;
            }
            setup(); // restart maze
            gameState = "playing";
        });
    }
}
