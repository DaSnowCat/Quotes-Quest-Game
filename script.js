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

//Game State Variable
let gameState = "welcome";

//Text Writer Variables
let typeIndex = 0;
let typingSpeed = 5; //smaller = faster typing

let clickPromptTimer = 0; // counts frames for 5 seconds
let showClickPrompt = false; // whether to show the prompt

//Mini game buttons





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

    // Light Path Minigame Choice Buttons
    for (let i = 0; i < 3; i++) {
        let btn = new Sprite(width / 2, height / 2 - 150 + i * 200, 500, 120);
        btn.color = "#200337ff";
        btn.stroke = "#ddb3f3ff";
        btn.strokeWeight = 4;
        btn.text = `Light Path Minigame ${i + 1}`;
        btn.textColor = "white";
        btn.textSize = 24;
        btn.collider = 'k'; //This keeps it clickable
        btn.borderRadius = 30; // 🔹 Rounded edges
        btn.visible = false; // Hide initially

    }

    // Enter Button
    enterButton = new Sprite(width / 2 - 500, height / 2 + 50, 300, 100);
    enterButton.color = "#200337ff";
    enterButton.stroke = "#ddb3f3ff";
    enterButton.strokeWeight = 4;
    enterButton.text = "Enter";
    enterButton.textColor = "white";
    enterButton.textSize = 20;
    enterButton.collider = 'k'; //This keeps it clickable
    enterButton.borderRadius = 40; // 🔹 Rounded edges

    //Light Path Button
    lightPathButton = new Sprite(width / 2 - 100, height / 2 + 50, 150, 50);
    lightPathButton.color = 'yellow';
    lightPathButton.stroke = 'orange';
    lightPathButton.strokeWeight = 3;
    lightPathButton.text = "Light Path";
    lightPathButton.textColor = 'white';
    lightPathButton.textSize = 18;
    lightPathButton.collider = 'k'; //This keeps it clickable

    //Dark Path Button
    darkPathButton = new Sprite(width / 2 + 100, height / 2 + 50, 150, 50);
    darkPathButton.color = 'black';
    darkPathButton.stroke = 'red';
    darkPathButton.strokeWeight = 3;
    darkPathButton.text = "Dark Path";
    darkPathButton.textColor = 'white';
    darkPathButton.textSize = 18;
    darkPathButton.collider = 'k'; //This keeps it clickable

    //Hide buttons

    lightPathButton.visible = false;
    darkPathButton.visible = false;
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



    // Draw transition overlay if a transition is active
    handleTransition();

    allSprites.draw();

    //Apply hover effects to buttons
    applyHoverEffect(enterButton, "purple", "magneta");
    applyHoverEffect(lightPathButton, "yellow", "gold");
    applyHoverEffect(darkPathButton, "black", "dimgray");
}

//MY FUNCTIONS (for screens)

//Function for the welcome screen 
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

    //When the Enter button is clicked, go to the path choice screen 
    if (enterButton.mouse.presses()) {
        enterButton.visible = false;

        startTransition("pathChoice");

    }
}



//Function for the path choice screen
function pathChoiceScreen() {
    background(pathChoiceImage);
    textSize(50);
    fill('white')
    textAlign(CENTER, CENTER);
    text("Choose Your Path", width / 2, height / 3);

    //Show buttons to choose paths
    lightPathButton.visible = true;
    darkPathButton.visible = true;

    //When the Light Path button is clicked, go to the light path screen
    if (lightPathButton.mouse.presses()) {
        lightPathButton.visible = false;
        darkPathButton.visible = false;

        startTransition("lightPathScreen");
    }

    //When the Dark Path button is clicked, go to the dark path screen
    if (darkPathButton.mouse.presses()) {
        lightPathButton.visible = false;
        darkPathButton.visible = false;

        startTransition("darkPathScreen");
    }


}

//Function for the light path screen
function lightPathScreen() {
    background(lightPathbgImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);

    let story = "This is the \nlight path screen";

    // Typewriter effect
    if (typeIndex < story.length && frameCount % typingSpeed === 0) {
        typeIndex++;
    }
    text(story.substring(0, typeIndex), width / 2, height / 3);

    // Timer to show "Click to proceed"
    if (!showClickPrompt) {
        clickPromptTimer++;
        if (clickPromptTimer > 300 || typeIndex === story.length) { // 300 frames ≈ 5 seconds at 60fps
            showClickPrompt = true;
        }
    }

    // Show the click prompt
    if (showClickPrompt) {
        textSize(30);
        text("Click anywhere to proceed", width / 2, height / 2 + 100);
    }

    lightPathButton.visible = false;
    darkPathButton.visible = false;

}

function lightPathMiniGameChoicesScreen() {
    background(lightPathbgImage);

    // Title
    textSize(50);
    fill('white');
    textAlign(CENTER, TOP);
    text("Choose Your Minigame", width / 2, 40);

    // Descriptions
    textSize(24);
    fill('lightgrey');
    text("Minigame 1: Catch the falling orbs!", width / 2, height / 2 - 210);
    text("Minigame 2: Light in Maze!", width / 2, height / 2 - 10);
    text("Minigame 3: Quote Quiz!", width / 2, height / 2 + 190);

    // Show buttons
    for (let btn of minigameButtons) {
        btn.visible = true;
    }

    // Handle clicks
    if (minigameButtons[0].mouse.presses()) {
        startTransition("lightPathMiniGame1");
    }
    if (minigameButtons[1].mouse.presses()) {
        console.log("Minigame 2 clicked");
    }
    if (minigameButtons[2].mouse.presses()) {
        console.log("Minigame 3 clicked");
    }
}


//Function for the dark path screen
function darkPathScreen() {
    background(darkPathbgImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);

    let story = "This is the \n dark path screen";

    // Typewriter effect
    if (typeIndex < story.length && frameCount % typingSpeed === 0) {
        typeIndex++;
    }

    text(story.substring(0, typeIndex), width / 2, height / 3);

    // Timer for click prompt
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

    lightPathButton.visible = false;
    darkPathButton.visible = false;
}

function darkPathMiniGameChoicesScreen() {
    background(darkPathbgImage);
    textSize(50);
    fill('white');
    textAlign(CENTER, CENTER);
    text("This is the dark path mini game choices screen", width / 2, height / 3);
}

//MY FUNCTIONS (for transitions and special effects)

function startTransition(targetState) {
    transitioning = true;
    transitionAlpha = 0; //start fully transparent
    nextGameState = targetState;
    transitionPhase = "out";

    // Reset typewriter and click prompt
    typeIndex = 0;
    clickPromptTimer = 0;
    showClickPrompt = false;
}

function handleTransition() {
    if (transitioning) {
        if (transitionPhase === "out") {

            //Fade to black
            transitionAlpha += 10; //speed of fade out
            if (transitionAlpha >= 255) {
                transitionAlpha = 255;

                //Switch to next state when fully black
                gameState = nextGameState;
                transitionPhase = "in";

            }

        }
        else if (transitionPhase === "in") {
            //Fade from black to new screen
            transitionAlpha -= 10; //speed of fade in
            if (transitionAlpha <= 0) {
                transitionAlpha = 0;
                transitioning = false;
            }
        }

        //Draw black rectangle with current alpha
        push();
        noStroke();
        fill(0, transitionAlpha);
        rect(0, 0, width, height);
        pop();

    }
}

function applyHoverEffect(button, normalColor, hoverColor) {
    if (button.mouse.hovering()) {
        button.color = hoverColor;
        button.scale = 1.1;
    } else {
        button.color = normalColor;
        button.scale = 1;
    }
}

//MY FUNCTIONS (for mouse interaction)
function mousePressed() {
    // Example: If player is on the light path screen, clicking anywhere goes to mini game choices
    if (gameState === "lightPathScreen" && showClickPrompt) {
        startTransition("lightPathMiniGameChoicesScreen");
    }

    // Or if player is on the dark path screen
    else if (gameState === "darkPathScreen" && showClickPrompt) {
        startTransition("darkPathMiniGameChoicesScreen");
    }
}



