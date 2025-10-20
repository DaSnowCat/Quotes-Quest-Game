//VARIABLES

//Image Variables
let bgImage;
let pathChoiceImage;
let lightPathbgImage;
let darkPathbgImage;

//Transition Variables
let transitioning = false;
let transitionAlpha = 0;
let nextGameState = "";
let transitionPhase = "out";

//Font Variables
let gameTitleFont;

//Button Variables
let enterButton;
let lightPathButton;
let darkPathButton;
let lightMiniGameButton;

//Game State Variable
let gameState = "welcome";

//Text Writer Variables
let typeIndex = 0;
let typingSpeed = 5; //smaller = faster typing

let clickPromptTimer = 0; // counts frames for 5 seconds
let showClickPrompt = false; // whether to show the prompt

//LIGHT PATH MINIGAME 1 VARIABLES

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

//Play Again button
let playAgainButton;

let miniGameState = "playing";

//PRELOAD FUNCTION (runs only once)
function preload() {

    //Load Images
    bgImage = loadImage('assets/welcome-screen-image.png');
    pathChoiceImage = loadImage('assets/path-choice-screen-image.png');
    lightPathbgImage = loadImage('assets/light-path-bgImage.png');
    darkPathbgImage = loadImage('assets/dark-path-bgImage.png');

    //Load Fonts
    gameTitleFont = loadFont('assets/Quivert.ttf');
}

//SETUP FUNCTION (runs only once)
function setup() {
    createCanvas(windowWidth, windowHeight);

    textFont(gameTitleFont);

    // Enter Button
    enterButton = createButton("Enter");
    enterButton.position(width / 2 - 150, height / 2 + 50);
    enterButton.size(300, 100);
    enterButton.style("font-size", "20px");
    enterButton.style("background-color", "#200337ff");
    enterButton.style("color", "white");
    enterButton.style("border-radius", "40px");

    //Light Path Button
    lightPathButton = createButton("Light Path");
    lightPathButton.position(width / 2 - 100, height / 2 + 50);
    lightPathButton.size(150, 50);
    lightPathButton.style("background-color", "yellow");
    lightPathButton.style("color", "white");
    lightPathButton.style("border-radius", "10px");
    lightPathButton.hide();

    //Dark Path Button
    darkPathButton = createButton("Dark Path");
    darkPathButton.position(width / 2 + 100, height / 2 + 50);
    darkPathButton.size(150, 50);
    darkPathButton.style("background-color", "black");
    darkPathButton.style("color", "white");
    darkPathButton.style("border-radius", "10px");
    darkPathButton.hide();

    //Light MiniGame Button
    lightMiniGameButton = createButton("Light Orbs Game");
    lightMiniGameButton.position(width / 2 + 100, height / 2 + 50);
    lightMiniGameButton.size(150, 50);
    lightMiniGameButton.style("background-color", "purple");
    lightMiniGameButton.style("color", "white");
    lightMiniGameButton.style("border-radius", "10px");
    lightMiniGameButton.hide();

    //Play Again button
    playAgainButton = createButton("Play Again");
    playAgainButton.position(width / 2 - 60, height / 2 + 50);
    playAgainButton.size(120, 50);
    playAgainButton.style("font-size", "20px");
    playAgainButton.style("background-color", "purple");
    playAgainButton.style("color", "white");
    playAgainButton.style("border-radius", "10px");
    playAgainButton.mousePressed(resetLightGame);
    playAgainButton.hide();
}

//DRAW FUNCTION (runs in a loop)
function draw() {

    //Game state management
    if (gameState === "welcome") welcomeScreen();
    else if (gameState === "pathChoice") pathChoiceScreen();
    else if (gameState === "lightPathScreen") lightPathScreen();
    else if (gameState === "darkPathScreen") darkPathScreen();
    else if (gameState === "lightPathMiniGameChoicesScreen") lightPathMiniGameChoicesScreen();
    else if (gameState === "darkPathMiniGameChoicesScreen") darkPathMiniGameChoicesScreen();
    else if (gameState === "lightPathMiniGame1") lightPathMiniGame1();
    else if (gameState === "darkPathMiniGame1") darkPathMiniGame1();

    // Draw transition overlay if a transition is active
    handleTransition();

    //Applying the hover effects to all the buttons

    applyHoverEffect(enterButton, "#200337ff", "magenta");
    applyHoverEffect(lightPathButton, "yellow", "gold");
    applyHoverEffect(darkPathButton, "black", "dimgray");
    applyHoverEffect(lightMiniGameButton, "purple", "violet");
}

//MY FUNCTIONS (for screens)

function welcomeScreen() {
    background(bgImage);

    //Text for welcome screen
    textSize(150);
    fill('white');
    textAlign(LEFT, TOP);
    text("Quotes Quest", 30, 30);

    //Tagline for my main title
    textSize(40);
    fill('white');
    textAlign(LEFT, TOP);
    text("Where your adventure lies...", 40, 200);
}

function pathChoiceScreen() {
    background(pathChoiceImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);
    text("Choose Your Path", width / 2, height / 3);

    lightPathButton.show();
    darkPathButton.show();
}

function lightPathScreen() {
    lightPathButton.hide();
    darkPathButton.hide();

    background(lightPathbgImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);

    let story = "You found yourself in a strange place. \n It's cold yet filled with beautiful shades \n of light purple hues. \n Story to be continued...";

    // Typewriter effect
    if (typeIndex < story.length && frameCount % typingSpeed === 0) {
        typeIndex++;
    }
    text(story.substring(0, typeIndex), width / 2, height / 3);

    // Timer to show "Click to proceed"
    if (!showClickPrompt) {
        clickPromptTimer++;
        if (clickPromptTimer > 300 || typeIndex === story.length) {
            showClickPrompt = true;
        }
    }

    if (showClickPrompt) {
        textSize(30);
        text("Click anywhere to proceed", width / 2, height / 2 + 100);
    }
}

function lightPathMiniGameChoicesScreen() {
    background(lightPathbgImage);

    // Title
    textSize(50);
    fill('white');
    textAlign(CENTER, TOP);
    text("Choose Your Minigame", width / 2, 40);

    // Description
    textSize(24);
    fill('lightgrey');
    text("Minigame 1: Catch the falling orbs!", width / 2, height / 2 - 210);

    lightMiniGameButton.show();
}

function darkPathScreen() {
    lightPathButton.hide();
    darkPathButton.hide();

    background(darkPathbgImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);

    let story = "This is the \n dark path screen";

    if (typeIndex < story.length && frameCount % typingSpeed === 0) {
        typeIndex++;
    }
    text(story.substring(0, typeIndex), width / 2, height / 3);

    if (!showClickPrompt) {
        clickPromptTimer++;
        if (clickPromptTimer > 300 || typeIndex === story.length) {
            showClickPrompt = true;
        }
    }

    if (showClickPrompt) {
        textSize(30);
        text("Click anywhere to proceed", width / 2, height / 2 + 100);
    }
}

function darkPathMiniGameChoicesScreen() {
    background(darkPathbgImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);
    text("This is the dark path mini game choices screen", width / 2, height / 3);
}

//TRANSITIONS AND EFFECTS

function startTransition(targetState) {
    transitioning = true;
    transitionAlpha = 0;
    nextGameState = targetState;
    transitionPhase = "out";

    typeIndex = 0;
    clickPromptTimer = 0;
    showClickPrompt = false;
}

function handleTransition() {
    if (transitioning) {
        if (transitionPhase === "out") {
            transitionAlpha += 10;
            if (transitionAlpha >= 255) {
                transitionAlpha = 255;
                gameState = nextGameState;
                transitionPhase = "in";
            }
        } else if (transitionPhase === "in") {
            transitionAlpha -= 10;
            if (transitionAlpha <= 0) {
                transitionAlpha = 0;
                transitioning = false;
            }
        }

        push();
        noStroke();
        fill(0, transitionAlpha);
        rect(0, 0, width, height);
        pop();
    }
}

//MOUSE INTERACTIONS
function mousePressed() {
    if (gameState === "welcome") {
        enterButton.hide();
        startTransition("pathChoice");
    } else if (gameState === "pathChoice") {
        // Detect button clicks manually
        if (mouseX > lightPathButton.x && mouseX < lightPathButton.x + 150 &&
            mouseY > lightPathButton.y && mouseY < lightPathButton.y + 50) {
            lightPathButton.hide();
            darkPathButton.hide();
            startTransition("lightPathScreen");
        } else if (mouseX > darkPathButton.x && mouseX < darkPathButton.x + 150 &&
            mouseY > darkPathButton.y && mouseY < darkPathButton.y + 50) {
            lightPathButton.hide();
            darkPathButton.hide();
            startTransition("darkPathScreen");
        }
    } else if (gameState === "lightPathScreen" && showClickPrompt) {
        startTransition("lightPathMiniGameChoicesScreen");
    } else if (gameState === "darkPathScreen" && showClickPrompt) {
        startTransition("darkPathMiniGameChoicesScreen");
    } else if (gameState === "lightPathMiniGameChoicesScreen") {
        if (mouseX > lightMiniGameButton.x && mouseX < lightMiniGameButton.x + 150 &&
            mouseY > lightMiniGameButton.y && mouseY < lightMiniGameButton.y + 50) {
            lightMiniGameButton.hide();
            gameState = "lightPathMiniGame1";
        }
    }
}

//MINIGAME FUNCTIONS (Light Orbs Game)

function lightPathMiniGame1() {
    bgBrightness = lerp(bgBrightness, bgTargetBrightness, 0.05);
    background(bgBrightness, 0, 60);

    if (!player) {
        player = createVector(width / 2, height - 50);
    }

    if (miniGameState === "win" || miniGameState === "lost") {
        playAgainButton.show();
    } else {
        playAgainButton.hide();
    }

    if (miniGameState === "win") {
        showLightWinScreen();
        return;
    } else if (miniGameState === "lost") {
        showLightLoseScreen();
        return;
    }

    playLightGame();
}

function playLightGame() {
    fill(255);
    textSize(32);
    textAlign(LEFT, TOP);
    text("Score: " + score, 20, 20);

    push();
    let glowColor = color(150 + playerGlow, 0, 255);
    drawingContext.shadowBlur = 50 + playerGlow * 0.5;
    drawingContext.shadowColor = glowColor;
    fill(glowColor);
    rectMode(CENTER);
    rect(player.x, player.y, playerWidth, playerHeight, 10);
    pop();

    orbTimer++;
    if (orbTimer >= orbSpawnRate) {
        orbTimer = 0;
        spawnOrb();
    }

    for (let i = orbs.length - 1; i >= 0; i--) {
        let orb = orbs[i];
        orb.y += orb.speed;

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

        if (orb.y + orb.size / 2 >= player.y - playerHeight / 2 &&
            orb.y - orb.size / 2 <= player.y + playerHeight / 2 &&
            orb.x >= player.x - playerWidth / 2 &&
            orb.x <= player.x + playerWidth / 2) {
            if (orb.type === "light") {
                score += 1;
                playerGlow = 100;
                bgTargetBrightness = 80;
            } else if (orb.type === "dark") {
                score -= 1;
                playerGlow = -50;
                bgTargetBrightness = 20;
            }
            orbs.splice(i, 1);
            continue;
        }

        if (orb.y > height) {
            if (orb.type === "light") {
                score -= 1;
                bgTargetBrightness = 20;
            }
            orbs.splice(i, 1);
        }
    }

    playerGlow = lerp(playerGlow, 0, 0.05);
    if (bgTargetBrightness > 30) {
        bgTargetBrightness = lerp(bgTargetBrightness, 30, 0.01);
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.x -= playerSpeed;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.x += playerSpeed;
    player.x = constrain(player.x, playerWidth / 2, width - playerWidth / 2);

    if (score >= 20) miniGameState = "win";
    if (score <= 0) miniGameState = "lost";
}

function spawnOrb() {
    let orbType = random() < 0.6 ? "light" : "dark";
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

function showLightWinScreen() {
    fill(255, 255, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("You WIn!", width / 2, height / 2 - 50);
    playAgainButton.show();
}

function showLightLoseScreen() {
    fill(255, 0, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("You Lose!", width / 2, height / 2 - 50);
    playAgainButton.show();
}

function resetLightGame() {
    score = 10;
    orbs = [];
    playerGlow = 0;
    bgBrightness = 30;
    bgTargetBrightness = 30;
    miniGameState = "playing";
    gameState = "lightPathMiniGame1";
    playAgainButton.hide();
}

//Hover effect for the buttons!

function applyHoverEffect(button, normalColor, hoverColor) {
    if (
        mouseX > button.x &&
        mouseX < button.x + button.width &&
        mouseY > button.y &&
        mouseY < button.y + button.height
    ) {
        button.style("background-color", hoverColor);
        button.style("transform", "scale(1.1)");
    } else {
        button.style("background-color", normalColor);
        button.style("transform", "scale(1)");
    }
}
