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

let score = 5; // beggin the score at 0

let flyscoreamount = 1; // how much each fly is worth, increases with each fly caught

let gameStarted = false; // NEW - controls whether the game has begun

let retroFont; // adds a variable for the retro font

let introVideo; // asdds a variable for the intro video

let scoreDecreaseInterval = null; // variable that will make the score decrease over time

let gameOver = false; // make a possibility for the player to loose

let endVideo;// song when game ends, when the player lost


let bgMusic2;// song for end of game

let tongueSound;// tongue soundtrack

let flySound;// sound of flies flying

let backgroundSound1;// ambience song in the background for level 1

let mouseIsPressed = false; // variable to check if mouse is pressed

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    textFont('Press Start 2P'); // set font here
    // Create the video



    resetFly();
}

/**
 * Preload assets
 */

function preload() {
    retroFont = loadFont('assets/font1/PressStart2P-Regular.ttf');// load the retro font file
    introVideo = createVideo(['assets/images/intro.mp4']);// load the video file
    introVideo.hide();
    endVideo = createVideo(['assets/images/video2.mp4']);// load the video file
    endVideo.hide();
    bgMusic = loadSound('assets/sounds/music1.mp3');// load the music file
    bgMusic2 = loadSound('assets/sounds/song2.mp3');

    flySound = loadSound('assets/sounds/sound3.mp3');

    backgroundSound1 = loadSound('assets/sounds/sound4.mp3')


    // load the end video as a background when the player looses, if he looses

    tongueSound = loadSound('assets/sounds/song3.mp3');
}

let bgMusic; // background music variable
let musicStarted = false; // to ensure music starts only once, in the instruction screen

/**
 * Our frog and fly objects
 */

const frog = {  // const variable to help me draw the frog
    body: { x: 320, y: 520, size: 150 },
    tongue: { x: 320, y: 470, size: 20, speed: 20, state: "idle" }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200,
    size: 10,
    speed: 3,
    scoreValue: 1,
    escaping: false, // the flies will be able to escape in 30 per cents of the cases
    escapeTime: 0,
    escapeDuration: 40 // during about 0.66 secs, if a fly escapes, it goes backwards before to go back in its original direction.  
};






function draw() {
    background("#10b8fbff");


    // before game
    if (!gameStarted) {
        drawInstructionScreen(); // show instructions screen
        return; // stop here until player clicks
    }

    // after game, when the player looses, this if conditional makes the end screen appears thanks to the variable 'game over'
    if (gameOver) {
        background(0); // full black
        backgroundSound1.stop();// stop the ambience sound when game is over 

        //plays a end of game song, as in retro games
        userStartAudio();     // ensure browser allows audio
        bgMusic2.play();      // play only once
        bgMusic2.setVolume(0.1);
        musicStarted = true;


        // Dark overlay for text
        fill(0, 0, 0, 120);
        rect(0, 0, width, height);


        // Game Over text
        textAlign(CENTER, CENTER);
        textFont(retroFont);
        fill(255, 0, 0);
        textSize(32);
        text("GAME OVER!", width / 2, height / 2 - 30);

        textSize(16);
        fill(255);
        text("Click anywhere to restart", width / 2, height / 2 + 20);

        endVideo.play();


        return;
    }


    // This is the conditional that makes the game over variable change its value
    if (score <= 0) {
        gameOver = true;
        return;
    }

    // existing basic elements of FROGFROGFROG game's design below
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
    if (fly.escaping) {
        // Move backward for a short time
        fly.x -= fly.speed * 2; // backward, faster than normal
        fly.escapeTime++;

        // After enough frames, stop escaping
        if (fly.escapeTime > fly.escapeDuration) {
            fly.escaping = false;
            fly.escapeTime = 0;
        }
    } else {
        // Normal movement forward
        fly.x += fly.speed;
    }

    // If fly goes off-screen, reset it
    if (fly.x > width || fly.x < -50) {
        resetFly();
    }

    // Play fly sound
    flySound.loop();
    flySound.setVolume(0.2);
}



/**
 * Draws the fly as a black circle
 */


function drawFly() { // draws the flies 
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

function drawFrog() { // draws the frog
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
 * makes the frog'ttongue able to move
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


// Handles the tongue overlapping the fly

function checkTongueFlyOverlap() {
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    if (d < frog.tongue.size / 2 + fly.size / 2) {
        // Add points first
        score += fly.scoreValue;

        // Then reset fly
        resetFly();
        frog.tongue.state = "inbound";
    }
}



/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300); // makes the position random
    fly.escaping = false; // reset the probability of the fly to escape
    fly.escapeTime = 0;
    // attributes different score to the flies depending on their sizes
    const sizeChoice = random(['small', 'medium', 'big']);
    if (sizeChoice === 'small') {
        fly.size = 9;
        fly.speed = 5;
        fly.scoreValue = 3; // small = worth most
    } else if (sizeChoice === 'medium') {
        fly.size = 16;
        fly.speed = 3;
        fly.scoreValue = 2; // medium = middle
    } else { // big
        fly.size = 23;
        fly.speed = 2;
        fly.scoreValue = 1; // big = least
    }
}




/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}


function drawScore() { // takes care of the score 
    push();
    textSize(30);
    fill("#111010ff")
    text(score, 80, 50)

}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {

    // Restart the game if it was over
    if (gameOver) {
        restartGame();
        return;
    }

    // Start the game if it hasn't started yet
    if (!gameStarted) {
        gameStarted = true;

        if (bgMusic && bgMusic.isPlaying()) bgMusic.stop(); // stops music and video to keep a good framerate
        if (introVideo && introVideo.isPlaying()) introVideo.stop();

        return;
    }
    // Frog tongue launching once the user clicks at the screen
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
        tongueSound.play();
        tongueSound.setVolume(5);

        // 30% chance to trigger escape
        if (random(1) < 0.3) {
            fly.escaping = true;
            fly.escapeTime = 0;
        }
    }
    // makes the player loose a point per second = he can loose
    if (scoreDecreaseInterval === null) {
        scoreDecreaseInterval = setInterval(() => {
            if (gameStarted) {
                score = Math.max(0, score - 1); // don't go below 0
            } else {
                // safety: if gameEnded, stop the interval
                clearInterval(scoreDecreaseInterval);
                scoreDecreaseInterval = null;
            }
        }, 1000);
    }

    return;
}

function restartGame() {
    // Reset all necessary variables
    score = 5;
    flyscoreamount = 1;
    gameOver = false;
    frog.tongue.state = "idle";
    resetFly();

    backgroundSound1.play();
}



function drawInstructionScreen() { // draws the instruction screen, adds a video background and a music as well as the instructions text
    // Draw the intro video as the background
    if (introVideo) {
        image(introVideo, 0, 0, width, height);
    }

    // Start music once
    if (!musicStarted && userStartAudio()) {
        bgMusic.loop();
        bgMusic.setVolume(3);
        musicStarted = true;

        // Start video at the same time
        introVideo.play();

        backgroundSound1.play();
        backgroundSound1.setVolume(0.5);

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

