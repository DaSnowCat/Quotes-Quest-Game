
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
let darkMiniGameButton;

//Game State Variable
let gameState = "welcome";

//Text Writer Variables
let typeIndex = 0;
let typingSpeed = 5; //smaller = faster typing

let clickPromptTimer = 0; // counts frames for 5 seconds
let showClickPrompt = false; // whether to show the prompt


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
    lightMiniGameButton.position(width / 2 - 625, height / 2 - 20);
    lightMiniGameButton.size(200, 50);
    lightMiniGameButton.style("background-color", "purple");
    lightMiniGameButton.style("color", "white");
    lightMiniGameButton.style("border-radius", "10px");
    lightMiniGameButton.hide();

    //Dark MiniGame Button 
    darkMiniGameButton = createButton("Dark Maze Game");
    darkMiniGameButton.position(width / 2, height / 2 - 20);
    darkMiniGameButton.size(200, 50);
    darkMiniGameButton.style("background-color", "black");
    darkMiniGameButton.style("color", "white");
    darkMiniGameButton.style("border-radius", "10px");
    darkMiniGameButton.hide();

    //HTML References to the buttons for the minigames
    lightMiniGameButton.mousePressed(() => window.location.href = "lightPathMinigame1.html");
    darkMiniGameButton.mousePressed(() => window.location.href = "darkPathMiniGame1.html");




}

//DRAW FUNCTION (runs in a loop)
function draw() {

    //The Game States
    if (gameState === "welcome") welcomeScreen();
    else if (gameState === "pathChoice") pathChoiceScreen();

    else if (gameState === "lightPathScreen") lightPathScreen();
    else if (gameState === "darkPathScreen") darkPathScreen();

    else if (gameState === "lightPathMiniGameChoicesScreen") lightPathMiniGameChoicesScreen();
    else if (gameState === "darkPathMiniGameChoicesScreen") darkPathMiniGameChoicesScreen();



    // Draw transition overlay if a transition is active
    handleTransition();

    //Applying the hover effects to all the buttons

    applyHoverEffect(enterButton, "#200337ff", "magenta");
    applyHoverEffect(lightPathButton, "yellow", "gold");
    applyHoverEffect(darkPathButton, "black", "dimgray");
    applyHoverEffect(lightMiniGameButton, "purple", "violet");
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

    // let story = "You found yourself in a strange place. \n It's cold yet filled with beautiful shades \n of light purple hues. \n Story to be continued...";
    let story = "Coming Soon"
    // // Typewriter effect
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
    textAlign(LEFT, TOP);
    text("Minigame 1: Catch the falling orbs!", width / 2 - 700, height / 2 - 100);

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
    text("Dark Path Minigames", width / 2, 40);

    // Description
    textSize(24);
    fill('lightgrey');
    textAlign(LEFT, TOP);
    text("MiniGame 1: Reach End of Maze", width / 2 - 700, height / 2 - 100);

    darkMiniGameButton.show();



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
    } else if (gameState === "darkPathMiniGameChoicesScreen") {
        if (mouseX > darkMiniGameButton.x && mouseX < darkMiniGameButton.x + 150 &&
            mouseY > darkMiniGameButton.y && mouseY < darkMiniGameButton.y + 50) {
            darkMiniGameButton.hide();
            gameState = "darkPathMiniGame1";
        }
    }
}



