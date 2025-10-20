/**
 * MOD
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let score = 0; // beggin the score at 0

let flyscoreamount = 1; // how much each fly is worth, increases with each fly caught

let gameStarted = false; // NEW - controls whether the game has begun

let retroFont; // adds a variable for the retro font

let introVideo; // asdds a variable for the intro video



/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    textFont('Press Start 2P'); // set font here
    // Create the video

    // Play the video
    introVideo.loop();   // can also use introVideo.play() for single play
    // Give the fly its first random position
    resetFly();
}

/**
 * Preload assets
 */

function preload() {
    retroFont = loadFont('assets/font1/PressStart2P-Regular.ttf');// load the retro font file
    introVideo = createVideo(['assets/images/intro.mp4']);// load the video file
    introVideo.hide();
    bgMusic = loadSound('assets/sounds/music1.mp3'); // load the music file

}

let bgMusic; // background music variable
let musicStarted = false; // to ensure music starts only once, in the instruction screen

/**
 * Our frog and fly objects
 */

const frog = {
    body: { x: 320, y: 520, size: 150 },
    tongue: { x: 320, y: 470, size: 20, speed: 20, state: "idle" }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};


function draw() {
    background("#10b8fbff");

    if (millis() - lastScoreDecreaseTime > 1000) {
        score = max(0, score - 1); // prevent negative score
        lastScoreDecreaseTime = millis();
    }

    if (!gameStarted) {
        drawInstructionScreen(); // NEW - show instructions
        return; // stop here until player clicks
    }

    // existing game logic below this line...
    moveFly();
    drawFly();
    drawFrog();
    moveFrog();
    moveTongue();
    checkTongueFlyOverlap();
    drawScore();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

function drawFrog() {
    // Tongue
    fill("#f9a1a1ff");
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    stroke("#f9a1a1ff");

    strokeWeight(frog.tongue.size);
    line(frog.body.x, frog.body.y, frog.tongue.x, frog.tongue.y);

    // Body
    fill("#2f9e2fff");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    ellipse(frog.body.x, frog.body.y, 100, 170)
    // Eyes
    drawFrogEyes();
}


function drawFrogEyes() {
    // draws the eyes of the frog
    push();
    fill("#000000ff");
    stroke("#2f9e2fff");
    strokeWeight(0);
    // Left eye white
    ellipse(frog.body.x - 50, frog.body.y - 50, 40, 40);
    // Right eye white
    ellipse(frog.body.x + 50, frog.body.y - 50, 40, 40);
    fill("#2f9e2fff");
    stroke("#183f15ff");
    strokeWeight(0.5);
    // Left eye pupil
    ellipse(frog.body.x - 42, frog.body.y - 42, 26, 52);
    // Right eye pupil
    ellipse(frog.body.x + 42, frog.body.y - 42, 26, 52);
    pop();


}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        // increase the score
        score = score + flyscoreamount;
        flyscoreamount = flyscoreamount + 1;
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}


function drawScore() {
    push();
    textSize(30);
    fill("#111010ff")
    text(score, 80, 50)
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    // makes the game begins
    if (!gameStarted) {
        gameStarted = true;

        // Stop intro music when game starts
        if (bgMusic && bgMusic.isPlaying()) {
            bgMusic.stop();
        }

        return;
    }

    // Frog tongue launching once the user clicks at the screen
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}


function drawInstructionScreen() { // draws the instruction screen, adds a video background and a music as well as the instructions text
    // Draw the intro video as the background
    if (introVideo) {
        image(introVideo, 0, 0, width, height);
    }

    // Start music once
    if (!musicStarted && userStartAudio()) {
        bgMusic.loop();
        bgMusic.setVolume(0.5);
        musicStarted = true;

        // Start video at the same time
        introVideo.loop();
    }

    // Overlay semi-transparent rectangle to make bacjkground darker
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    // === Text overlay ===
    textAlign(CENTER, CENTER);
    textFont(retroFont); // adds a police retro style

    // Main title
    textSize(24);

    // Draw the white part first
    fill(255);
    text("\n\n\THE 21ST CENTURY", width / 2, height / 2 - 100);

    // Draw "FROG GAME" with only "FROG" in green
    let titleY = height / 2 - 70;
    fill("#00ff00"); // bright green for the word 'frog'
    text("\n\n\FROG", width / 2 - 70, titleY); // adjust X so it's aligned nicely
    fill(255);
    text("\n\n\GAME", width / 2 + 40, titleY);

    // Subtext lines
    textSize(12);
    fill(255);
    text("\n\n\n\n\n\n\n\n\nMove with mouse | Click to shoot your tongue", width / 2, height / 2 - 20);// \n is to jump lines
    text("\n\n\n\n\n\n\n\nCatch flies to score points", width / 2, height / 2 + 20);
    text("\n\n\n\n\n\n\n\nClick anywhere to begin!", width / 2, height / 2 + 80);
}

