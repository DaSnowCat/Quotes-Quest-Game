// // --- VARIABLES ---
// let quoteButton;
// let currentQuote = "";
// let quotes = [
//     "The only limit to our realization of tomorrow is our doubts of today.",
//     "Life is 10% what happens to us and 90% how we react to it.",
//     "Do not wait to strike till the iron is hot; but make it hot by striking.",
//     "The best way to predict the future is to create it.",
//     "Happiness is not something ready made. It comes from your own actions.",
//     "Believe you can and you're halfway there."
// ];

// // --- SETUP ---
// function setup() {
//     createCanvas(windowWidth, windowHeight);

//     // Create the quote button
//     quoteButton = createButton('Get Quote');
//     quoteButton.size(300, 80);
//     quoteButton.style('font-size', '24px');
//     quoteButton.style('background-color', '#200337');
//     quoteButton.style('color', 'white');
//     quoteButton.style('border', '4px solid #ddb3f3');
//     quoteButton.style('border-radius', '20px');
//     quoteButton.mousePressed(generateQuote);

//     // Position button after draw to be perfectly centered later
// }

// // --- DRAW ---
// function draw() {
//     background(50, 50, 100); // dark background

//     // --- Title ---
//     textSize(50);
//     fill('white');
//     textAlign(CENTER, TOP);
//     text("Light Path Quotes Generator", width / 2, 40);

//     // --- Purple box for the quote ---
//     let boxWidth = 600;
//     let boxHeight = 150;
//     let boxX = width / 2 - boxWidth / 2;
//     let boxY = height / 2 - boxHeight / 2 - 50; // center with slight shift up for button

//     fill('#c8a2ff'); // light purple
//     stroke('#dda0ff');
//     strokeWeight(4);
//     rect(boxX, boxY, boxWidth, boxHeight, 20); // rounded corners

//     // --- Display quote inside the box ---
//     textSize(28);
//     fill(0); // black text
//     textAlign(CENTER, CENTER);
//     text(currentQuote, boxX + boxWidth / 2, boxY + boxHeight / 2, boxWidth - 40, boxHeight - 20);

//     // --- Position the button below the box ---
//     quoteButton.position(width / 2 - quoteButton.width / 2, boxY + boxHeight + 30);
// }

// // --- FUNCTION TO GENERATE QUOTE ---
// function generateQuote() {
//     let index = floor(random(quotes.length));
//     currentQuote = quotes[index];
// }


let soundMusic;

function preload() {
    // Use forward slashes, NOT backslashes
    soundMusic = loadSound("assets/background_music.mp3");
}

function setup() {
    createCanvas(400, 400);
    background(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text("Click anywhere to play sound", width / 2, height / 2);
}

function mousePressed() {
    // Play once on click (browsers block autoplay)
    if (!soundMusic.isPlaying()) {
        soundMusic.play();
    }

}

