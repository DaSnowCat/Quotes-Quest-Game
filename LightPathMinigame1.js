//Light Path minigame 1: Platformer minigame with catching orbs

//VARIABLES

//Player platform

let player;
let playerWidth = 150;
let playerHeight = 20;
let playerSpeed = 15;
let playerGlow = 0; // player glow multiplier

//Orbs

let orbs = [];
let orbSpawnRate = 90; //frames between spawns
let orbTimer = 0;

//Score
let score = 5;

//Background brightness
let bgBrightness = 30;
let bgTargetBrightness = 30;

//Pulsating effect
let pulseSpeed = 0.08;

//Game states
let miniGameState = "playing";
let gameState = "playing";

//Play Again button
let playAgainButton;

//Sound Effects for the dark and light orbs
let lightorb_sound;
let darkorb_sound;

//My quotes
let quotes = [

    "The only way to do great work is to love what you do. - Steve Jobs",
    "Keep your face always toward the sunshine - \nand shadows will fall behind you. - Walt Whitman",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Happiness is not something ready-made. \nIt comes from your own actions. - Dalai Lama",
    "Do what you can, with what you have, where you are. - Theodore Roosevelt",
    "Success is not the key to happiness. \nHappiness is the key to success. - Albert Schweitzer",
    "The best way to predict the future \nis to create it. - Peter Drucker",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "Act as if what you do makes a difference. It does. - William James",
    "With the new day comes new strength and new thoughts. - Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "What you get by achieving your goals is not as important \nas what you become by achieving your goals. - Zig Ziglar",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Everything you've ever wanted is on the other side of fear. - George Addair",
    "It always seems impossible until it's done. - Nelson Mandela",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "Happiness depends upon ourselves. - Aristotle",
    "Success usually comes to those \nwho are too busy to be looking for it. - Henry David Thoreau",
    "Positive anything is better than negative nothing. - Elbert Hubbard",
    "Do what you love, love what you do. - Ray Bradbury",
    "The harder you work for something, \nthe greater you'll feel when you achieve it.",
    "Don't stop when you're tired. Stop when you're done.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it! Wish it! Do it! Achieve it!",
    "Little by little, day by day, \nwhat is meant for you will find its way.",
    "Success is the sum of small efforts, \nrepeated day in and day out. - Robert Collier",
    "Keep going. Everything you need will \ncome to you at the perfect time."

];

//Floating messages
let quoteText = "";
let quoteTextTimer = 0;
let quoteTextDuration = 300; //Same as 5 seconds

//Font Variable
font_text;

//PRELOAD Function
function preload() {
    //Load Sound Effects
    lightorb_sound = loadSound("assets/lightSoundEffect_lightorb.mp3");
    darkorb_sound = loadSound("assets/lightSoundEffect_darkorb.mp3");

    //Load Main Sound
    light_bgMusic = loadSound("assets/Main Theme from 'Succession'.mp3")

    //Load Text Font
    //font_text = loadFont("Audiowide")


}


function setup() {
    createCanvas(windowWidth, windowHeight);

    //Setting volume for sound effects
    lightorb_sound.setVolume(0.3);
    darkorb_sound.setVolume(0.3);

    //Player platform setup
    player = createVector(width / 2, height - 50);

    //Play Again button
    playAgainButton = createButton("Play Again");
    playAgainButton.position(width / 2 - 60, height / 2 + 50);
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

    playBackgroundMusic();

}

function playGame() {
    //Draw score
    fill(255);
    textFont("Comic Sans MS");

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
    for (let i = orbs.length - 1; i >= 0; i--) {
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
        if (orb.y + orb.size / 2 >= player.y - playerHeight / 2 &&
            orb.y - orb.size / 2 <= player.y + playerHeight / 2 &&
            orb.x >= player.x - playerWidth / 2 &&
            orb.x <= player.x + playerWidth / 2) {

            if (orb.type === "light") {
                score += 1;
                playerGlow = 100; // increase glow
                bgTargetBrightness = 80; // brighten background
                if (lightorb_sound.isLoaded()) lightorb_sound.play(); //Play sound when player catch light orb
                quoteText = quotes[int(random(quotes.length))];
                quoteTextTimer = quoteTextDuration;

            }



            else if (orb.type === "dark") {
                score -= 1;
                playerGlow = -50;
                bgTargetBrightness = 20;
                if (darkorb_sound.isLoaded()) darkorb_sound.play(); //Play sound when player catch dark orb
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
    player.x = constrain(player.x, playerWidth / 2, width - playerWidth / 2);

    //Check win/lose conditions
    if (score >= 20) gameState = "win";
    if (score <= 0) gameState = "lose";

    if (quoteTextTimer > 0) {
        fill(200, 162, 200);
        textSize(30);
        textAlign(CENTER, TOP);
        text(quoteText, width / 2, 20);
        quoteTextTimer--;
    }


}

//FUNCTIONS

//Spawn orbs
function spawnOrb() {
    let orbType = random() < 0.6 ? "light" : "dark"; // 60% light, 40% dark

    let orb = {
        x: random(50, width - 50),
        y: -30,
        size: 30,
        speed: random(5, 10),
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
    text("You WIn!", width / 2, height / 2 - 50);
    playAgainButton.show();
}

//Lose screen function
function showLoseScreen() {
    fill(255, 0, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("You Lose!", width / 2, height / 2 - 50);
    playAgainButton.show();
}

//Reset Game 
function resetGame() {
    score = 10;
    orbs = [];
    playerGlow = 0;
    bgBrightness = 30;
    bgTargetBrightness = 30;
    darkgameState = "playing";
    playAgainButton.hide();
}

//Playing backgorund music


function playBackgroundMusic() {
    if (getAudioContext().state !== "running") {
        getAudioContext().resume(); // unlock sound on first click
    }
    if (!light_bgMusic.isPlaying()) {
        light_bgMusic.loop(); // loop background music
        light_bgMusic.setVolume(0.5); // optional: make it softer
    }
}


