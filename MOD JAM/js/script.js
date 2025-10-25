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

let StreakSound;// sound when streak is activated

let StreakMusic;// music during streaks


let backgroundSound1;// ambience song in the background for level 1

let mouseIsPressed = false; // variable to check if mouse is pressed

let bestScore = 0; // variable that stores the best score 

let streakActive = false; // creates a streak system
let streakStartScore = 10; // when streak starts, when the player reaches 10 points
let streakMultiplier = 1.4; // how much faster flies and clouds move
let baseFlySpeed = 4.5; // base speed of the fly
let streakSpeedFactor = 0; // starts at 0, grows with score
let maxStreakFactor = 15; // maximum speed multiplier
let vibrationTimer = 0;      // counts frames for vibration
let vibrationDuration = 120; // 2 seconds at 60fps




/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    textFont('Press Start 2P'); // set font here
    // Create the video

    // Load saved best score from localStorage
    if (localStorage.getItem("bestScore")) {
        bestScore = parseInt(localStorage.getItem("bestScore"));
    }

    frameRate(60); // sets the framerate to avoid bugs



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
    bgMusic2 = loadSound('assets/sounds/song2.mp3'); // load a sound of frog

    flySound = loadSound('assets/sounds/sound3.mp3');// load the sound of flies

    backgroundSound1 = loadSound('assets/sounds/sound4.mp3')// load an ambience sound for the background
    StreakSound = loadSound('assets/sounds/Begstreaksound.mp3');// load a sound when streak is activated
    StreakMusic = loadSound('assets/sounds/StreakSound.mp3');// load a music during streaks


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
    escaping: false,
    escapeTime: 0,// the flies should be able to escape 30 % of the time
    escapeDuration: 40, // duration of escape
    escapeStartY: 200,  // starting y for curved motion
    escapeAmplitude: 50, // max vertical displacement while escaping
};

let flyColor = 0; // starting with a dark green color for the flies 





function draw() {
    background("#10b8fbff");


    // before game
    if (!gameStarted) {
        drawInstructionScreen(); // show instructions screen
        return; // stop here until player clicks
    }

    // after game, when the player looses, this if conditional makes the end screen appears thanks to the variable 'game over'
    if (gameOver) {

        if (endVideo) {
            image(endVideo, 0, 0, width, height);
        }

        backgroundSound1.stop();// stop the ambience sound when game is over 

        // Dark overlay for text
        fill(0, 0, 0, 120);
        rect(0, 0, width, height);


        endVideo.play();



        // Game Over text
        textAlign(CENTER, CENTER);
        textFont(retroFont);
        fill(235, 0, 0);
        stroke("black");
        strokeWeight(7);
        textSize(32);
        text("GAME OVER!", width / 2, height / 2 - 30);

        textSize(16);
        fill(255);
        strokeWeight(3);
        text("Click anywhere to restart", width / 2, height / 2 + 20);



        return;
    }


    // This is the conditional that makes the game over variable change its value
    if (score <= 0) {
        gameOver = true;


        //plays a end of game song, as in retro games
        if (!bgMusic2.isPlaying()) {
            bgMusic2.play();      // play only once
            bgMusic2.setVolume(2.5);
        }
        return;
    }
    // Activate streak if score reaches streakStartScore
    if (score >= streakStartScore) {
        streakActive = true;
        console.log("STREAK ACTIVATED!");

        // shake the canvas
        let shakeAmount = 2;
        translate(random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
    } else {
        streakActive = false;
        streakSpeedFactor = 0;
    }
    if (streakActive) {
        background("#ffb347"); // sunset orange
    } else {
        background("#10b8fbff"); // normal sky blue
    }
    if (streakActive) {
        // Apply progressive speed (always applied while streakActive)

        drawClouds2(); // draw extra clouds during streaks
        fly.speed = baseFlySpeed + streakSpeedFactor;

    }
    if (streakActive) {
        streakSpeedFactor += 0.004; // smaller increment per frame
        backgroundSound1.stop();// stop the ambience sound during streaks

        // if (!StreakSound.isPlaying()) {
        // StreakSound.play();      // play only once
        //  StreakSound.setVolume(1.5);
        // }

        //  if (!StreakMusic.isPlaying()) {
        // StreakMusic.play();      // play only once
        // StreakMusic.setVolume(1.5);
        // }


        if (streakSpeedFactor > maxStreakFactor) streakSpeedFactor = maxStreakFactor;

        fly.speed = baseFlySpeed + streakSpeedFactor; // now fly actually moves faster
    } else {
        streakSpeedFactor = 0;
        fly.speed = baseFlySpeed;
    }
    // Handle streak effects
    if (streakActive && vibrationTimer < vibrationDuration) {
        let shakeAmount = 2;
        translate(random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
        vibrationTimer++; // increment timer each frame
    }

    if (!streakActive) {
        backgroundSound1.play();
        backgroundSound1.setVolume(1.5);
        StreakMusic.stop(); // stop streak music when not in streak
    }



    // existing basic elements of FROGFROGFROG game's design below
    drawClouds();
    moveFly();
    drawFly();
    drawFrog();
    moveFrog();
    moveTongue();
    checkTongueFlyOverlap();
    drawScore();
}
let clouds = {
    x: 600,
    y: 50,
    velocity: 2
}
let clouds2 = {
    x: 600,
    y: 200,
    velocity: 3
}
let clouds3 = {
    x: 600,
    y: 100,
    velocity: 4
}


function drawClouds() {
    push();
    fill("white");
    noStroke();
    ellipse(clouds.x, clouds.y + 20, 100, 100);
    ellipse(clouds.x + 50, clouds.y + 10, 100, 100);
    ellipse(clouds.x + 45, clouds.y + 20, 100, 100);
    ellipse(clouds.x + 100, clouds.y + 20, 100, 100);
    pop();

    push();
    fill("white");
    noStroke();
    ellipse(clouds2.x, clouds2.y + 20, 100, 100);
    ellipse(clouds2.x + 50, clouds2.y + 10, 100, 100);
    ellipse(clouds2.x + 45, clouds2.y + 20, 100, 100);
    ellipse(clouds2.x + 100, clouds2.y + 20, 100, 100);
    pop();

    push();
    fill("white");
    noStroke();
    ellipse(clouds3.x, clouds3.y + 20, 100, 100);
    ellipse(clouds3.x + 50, clouds3.y + 10, 100, 100);
    ellipse(clouds3.x + 45, clouds3.y + 20, 100, 100);
    ellipse(clouds3.x + 100, clouds3.y + 20, 100, 100);
    pop();

    clouds.x = clouds.x - clouds.velocity
    clouds2.x = clouds2.x - clouds2.velocity
    clouds3.x = clouds3.x - clouds3.velocity

    if (clouds.x <= -155) {
        clouds.x = width + 60
        clouds.velocity += 0.3
    }

    if (clouds2.x <= -135) {
        clouds2.x = width + 50
        clouds2.velocity += 0.3
    }

    if (clouds3.x <= -135) {
        clouds3.x = width + 50
        clouds3.velocity += 0.3
    }



}
let clouds4 = {
    x: 700,
    y: 250,
    velocity: 6
}
let clouds5 = {
    x: 700,
    y: 120,
    velocity: 8
}
let clouds6 = {
    x: 700,
    y: 40,
    velocity: 7
}

function drawClouds2() { // draws extra clouds during streak
    push();
    fill("white");
    noStroke();
    ellipse(clouds4.x, clouds4.y + 20, 100, 100);
    ellipse(clouds4.x + 50, clouds4.y + 10, 100, 100);
    ellipse(clouds4.x + 45, clouds4.y + 20, 100, 100);
    ellipse(clouds4.x + 100, clouds4.y + 20, 100, 100);
    pop();

    push();
    fill("white");
    noStroke();
    ellipse(clouds5.x, clouds5.y + 20, 100, 100);
    ellipse(clouds5.x + 50, clouds5.y + 10, 100, 100);
    ellipse(clouds5.x + 45, clouds5.y + 20, 100, 100);
    ellipse(clouds5.x + 100, clouds5.y + 20, 100, 100);
    pop();

    push();
    fill("white");
    noStroke();
    ellipse(clouds6.x, clouds6.y + 20, 100, 100);
    ellipse(clouds6.x + 50, clouds6.y + 10, 100, 100);
    ellipse(clouds6.x + 45, clouds6.y + 20, 100, 100);
    ellipse(clouds6.x + 100, clouds6.y + 20, 100, 100);
    pop();

    clouds4.x = clouds4.x - clouds4.velocity
    clouds5.x = clouds5.x - clouds5.velocity
    clouds6.x = clouds6.x - clouds6.velocity

    if (clouds4.x <= -155) {
        clouds4.x = width + 60
        clouds4.velocity += 0.4
    }

    if (clouds5.x <= -135) {
        clouds5.x = width + 50
        clouds5.velocity += 0.4
    }

    if (clouds6.x <= -135) {
        clouds6.x = width + 50
        clouds6.velocity += 0.4
    }


}
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    if (!flySound.isPlaying()) {
        flySound.play();      // play only once
        flySound.setVolume(0.7);
    }

    if (score >= streakStartScore) {
        fly.speed = baseFlySpeed + streakSpeedFactor; // increase speed gradually during streak
    } else {
        fly.speed = baseFlySpeed;
    }

    if (fly.escaping) {
        // Move backward horizontally
        fly.x -= fly.speed * 1.3; // faster retreat

        // Move vertically in a sine wave for a curve
        let t = fly.escapeTime / fly.escapeDuration; // 0 → 1
        fly.y = fly.escapeStartY + fly.escapeAmplitude * sin(t * PI); // curved arc

        fly.escapeTime++;

        if (fly.escapeTime > fly.escapeDuration) {
            fly.escaping = false;
            fly.escapeTime = 0;
        }
    } else {
        // Normal forward movement
        fly.x += fly.speed;
    }

    // Reset fly if it goes off screen
    if (fly.x > width || fly.x < -50) {
        resetFly();
    }


}



/**
 * Draws the fly as a black circle
 */


function drawFly() {
    push();
    noStroke();

    // Draw the fly body
    fill(flyColor); // dark green, can be adjusted
    ellipse(fly.x, fly.y, fly.size);

    // Draw wings
    fill(255, 255, 255, 150); // semi-transparent white wings
    let wingSize = fly.size * 0.6; // wings slightly smaller than body
    ellipse(fly.x - fly.size / 3, fly.y - fly.size / 2, wingSize, wingSize / 2); // left wing


    pop();

    // Increment color for this fly
    flyColor = flyColor + 0.2;
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
    push();

    // add glasses for the frog
    const lensHeight = 40;
    const lensOffsetX = 25;
    const lensOffsetY = 70;

    // Left lens
    fill(255, 255, 255, 100); // semi-transparent white
    stroke("#000000");
    strokeWeight(2); // thinner black outline
    beginShape();
    vertex(frog.body.x - 65, frog.body.y - lensOffsetY); // top-left
    vertex(frog.body.x - 25, frog.body.y - lensOffsetY); // top-right
    vertex(frog.body.x - 35, frog.body.y - lensOffsetY + lensHeight); // bottom-right
    vertex(frog.body.x - 60, frog.body.y - lensOffsetY + lensHeight); // bottom-left
    endShape(CLOSE);

    // Right lens
    beginShape();
    vertex(frog.body.x + 25, frog.body.y - lensOffsetY); // top-left
    vertex(frog.body.x + 65, frog.body.y - lensOffsetY); // top-right
    vertex(frog.body.x + 60, frog.body.y - lensOffsetY + lensHeight); // bottom-right
    vertex(frog.body.x + 35, frog.body.y - lensOffsetY + lensHeight); // bottom-left
    endShape(CLOSE);

    // Bridge in grey
    stroke("#1f1c1cff");
    strokeWeight(4);
    line(frog.body.x - 25, frog.body.y - 67, frog.body.x + 25, frog.body.y - 67);
    // Eye whites
    fill("#000000ff");
    stroke("#2f9e2fff");
    strokeWeight(0);
    ellipse(frog.body.x - 50, frog.body.y - 50, 40, 40);
    ellipse(frog.body.x + 50, frog.body.y - 50, 40, 40);

    // Pupils
    fill("#2f9e2fff");
    stroke("#183f15ff");
    strokeWeight(0.5);
    ellipse(frog.body.x - 42, frog.body.y - 42, 26, 52);
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

        // Update best score
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore); // save to browser
        }

        // Then reset fly
        resetFly();
        frog.tongue.state = "inbound";
    }
}



/**
 * Resets the fly to the left with a random y
 */
function resetFly() {

    // Reset position
    fly.x = 0;
    fly.y = random(10, 300); // makes the position random
    fly.escaping = false; // reset the probability of the fly to escape
    fly.escapeTime = 0;

    // Reset color for this new fly
    flyColor = 0;
    // attributes different score to the flies depending on their sizes
    const sizeChoice = random(['small', 'medium', 'big']);
    if (sizeChoice === 'small') {
        fly.size = 9;

        fly.scoreValue = 5; // small = worth most
    } else if (sizeChoice === 'medium') {
        fly.size = 16;

        fly.scoreValue = 4; // medium = middle
    } else { // big
        fly.size = 23;

        fly.scoreValue = 2; // big = least
    }
    // Stops fly sound
    if (flySound && flySound.isPlaying()) flySound.stop(); // stops music and video to keep a good framerate
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
    text(score, 80, 35)// makes the score be left top corner

    textSize(20);
    fill("#000000ff");// makes the best score appear right top corner
    text("Best:" + bestScore, 530, 35); // shows best score
    pop();

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
        introVideo.stop();

        bgMusic2.play(); // plays a song of frog when the game starts
        bgMusic2.setVolume(15);
        console.log("Background music 2 started");


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
            fly.escapeStartY = fly.y; // remember starting y for sine curve
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
    frog.tongue.y = 470;
    resetFly();
    clouds.velocity = 1;
    clouds2.velocity = 2;
    clouds3.velocity = 3;

    clouds.x = width + 60;
    clouds2.x = width + 60;
    clouds3.x = width + 60;
    endVideo.stop(); // stops playing end video


    backgroundSound1.play();
    backgroundSound1.setVolume(1.5);
}



function drawInstructionScreen() { // draws the instruction screen, adds a video background and a music as well as the instructions text
    // Draw the intro video as the background
    if (introVideo) {
        image(introVideo, 0, 0, width, height);
    }

    // Start music once
    if (!musicStarted && userStartAudio()) {
        bgMusic.play();
        bgMusic.setVolume(3);
        musicStarted = true;

        // Start video at the same time
        introVideo.play();

        backgroundSound1.play();
        backgroundSound1.setVolume(1.5);

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

