//Light Path minigame 1: Platformer minigame with catching orbs

//VARIABLES

//Player platform

let player;
let playerWidth = 150;
let playerHeight = 20;
let playerSpeed = 10;
let playerGlow = 0; // player glow multiplier

//Orbs

let orbs = [];
let orbSpawnRate = 90; //frames between spawns
let orbTimer = 0;

//Score
let score = 10;

//Background brightness
let bgBrightness = 30;
let bgTargetBrightness = 30;

//Pulsating effect
let pulseSpeed = 0.08;

//Game states
let gameState = "playing";

//Play Again button
let playAgainButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Player platform setup
    player = createVector(width / 2, height - 50);

    //Play Again button
    playAgainButton = createButton("Play Again");
    playAgainButton.position(width/2 - 60, height/2 + 50);
    playAgainButton.size(120, 50);
    playAgainButton.style("font-size", "20px");
    playAgainButton.style("background-color", "purple");
    playAgainButton.style("color", "white");
    playAgainButton.style("border-radius", "10px");
    playAgainButton.hide();
    playAgainButton.mousePressed(resetGame);
}

function draw() {
    //Background
    bgBrightness = lerp(bgBrightness, bgTargetBrightness, 0.05);
    background(bgBrightness, 0, 60); // dark purple base

    //Game logic
    if (gameState === "playing") {
        playGame();
    } 
    else if (gameState === "win") {
            showWinScreen();
    }
    else if (gameState === "lose") {
        showLoseScreen();
    }
    
}

function playGame() {
    //Draw score
    fill(255);
    textSize(32);
    textAlign(LEFT, TOP);
    text("Score: " + score, 20, 20);

    //Draw player platform with glowing effect
    push();
    let glowColor = color(150 + playerGlow, 0, 255);
    drawingContext.shadowBlur = 50 + playerGlow * 0.5;
    drawingContext.shadowColor = glowColor;
    fill(glowColor);
    rectMode(CENTER);
    rect(player.x, player.y, playerWidth, playerHeight, 10);
    pop();

    // Spawn orbs
    orbTimer++;
    if (orbTimer >= orbSpawnRate) {
        orbTimer = 0;
        spawnOrb();
    }

    // Update and draw orbs
    for (let i = orbs.length - 1; i >=0; i--) {
        let orb = orbs[i];
        orb.y += orb.speed;

        // Pulsating brightness
        orb.pulse += pulseSpeed;
        let brightness = map(sin(orb.pulse), -1, 1, 150, 255);
        let orbColor = orb.type === "light"
            ? color(brightness, brightness, 200)
            : color(brightness * 0.8, 0, 255);

    push();
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = orbColor;
    fill(orbColor);
    ellipse(orb.x, orb.y, orb.size);
    pop();

    // Check collision with player
    if (orb.y + orb.size/2 >= player.y - playerHeight/2 &&
        orb.y - orb.size/2 <= player.y + playerHeight/2 &&
        orb.x >= player.x - playerWidth/2 &&
        orb.x <= player.x + playerWidth/2) {
            if (orb.type === "light") {
                score += 1;
                playerGlow = 100; // increase glow
                bgTargetBrightness = 80; // brighten background
            } else if (orb.type === "dark") {
                score -= 1;
                playerGlow = -50;
                bgTargetBrightness = 20;
            }
            orbs.splice(i, 1);
            continue;
        }
        //Miseed orb
        if (orb.y > height) {
            if (orb.type === "light") {
                score -= 1;
                bgTargetBrightness = 20;
            }
            orbs.splice(i, 1);
        }
    }
    // Gradually reduce platform glow back to normal
    playerGlow = lerp(playerGlow, 0, 0.05);

    //Gradually reset background brightness
    if (bgTargetBrightness > 30) {
        bgTargetBrightness = lerp(bgTargetBrightness, 30, 0.01);
    }

    // Move player
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A key
        player.x -= playerSpeed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D key
        player.x += playerSpeed;
    }
    player.x = constrain(player.x, playerWidth/2, width - playerWidth/2);

    //Check win/lose conditions
    if (score >= 20) gameState = "win";
    if (score <= 0) gameState = "lose";

}

//FUNCTIONS

//Spawn orbs
function spawnOrb() {
    let orbType = random() < 0.6 ? "light" : "dark"; // 60% light, 40% dark
    let orb = {
        x: random(50, width - 50),
        y: -30,
        size: 30,
        speed: random(3, 6),
        type: orbType,
        pulse: random(TWO_PI)
    };
    orbs.push(orb);
}

//Win screen function
function showWinScreen() {
    fill(255, 255, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("You WIn!", width/2, height/2 - 50);
    playAgainButton.show();
}

//Lose screen function
function showLoseScreen() {
    fill(255, 0, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("You Lose!", width/2, height/2-50);
    playAgainButton.show();
}

//Reset Game 
function resetGame() {
    score = 10;
    orbs = [];
    playerGlow = 0;
    bgBrightness = 30;
    bgTargetBrightness = 30;
    gameState = "playing";
    playAgainButton.hide();
}

