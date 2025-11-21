// QUE ? Subway surfer like video game by Yann Kruplewicz. For the Variation Jam.



let currentScreen = "menu";
let currentMode = null;
let score = 0;
let bestScores = { Q: 0, U: 0, E: 0 };
let victory = false;
let victoryFade = 0;

let player;
let obstacles = [];
let obstacleTimer = 0;
let spawnIntervalBase = 1600;
let worldScroll = 0;

let mapleSlowActive = false;
let mapleTimer = 0;
let hitCooldown = false;
let lastScoreTick = 0;

const GRAVITY = 0.8;
const JUMP_FORCE = -15;

let choiceMessage = "";
let choiceMessageTimer = 0;
let showGameOver = false;

let retroFont; // adds a variable for the retro font
let introvideo;
let introVideoPlayed = false;
let endvideo;
let endVideoPlayed = false;




function setup() {
    createCanvas(800, 600);
    textFont('BungeeSpice-Regular');
    resetAll(); // creates the player object

    // Now that player exists, initialize horizontal position
    player.x = laneCenterX(player.lane, player.y);
    player.targetLane = player.lane;
}


function draw() {
    if (currentScreen === "menu") {
        drawMenu();
    } else if (["quebec", "usa", "espana"].includes(currentScreen)) {
        updatGame();e  // UPDATE game logic
        drawGame();    // THEN draw
    } else if (currentScreen === "gameover") {
        drawGameOver();
    }
}



function drawMenu() {

    fill(255);
    textAlign(CENTER, CENTER);

    textSize(40);
    textSize(20);
    text("Click on a letter to choose your region", width / 2, height / 3 + 150);

    drawMenuLetter("Q", width / 2 - 120, height / 2);
    drawMenuLetter("U", width / 2, height / 2);
    drawMenuLetter("E", width / 2 + 120, height / 2);

    drawMenuLetter("?", width / 2, height / 2 + 100);

    // Draw choice message if any
    if (choiceMessage && millis() - choiceMessageTimer < 1000) {
        fill(255, 255, 0);
        textSize(24);
        text(choiceMessage, width / 2, height / 2 + 100);
    }
}

function drawMenuLetter(letter, x, y) {
    push();
    textAlign(CENTER, CENTER);
    textSize(70);
    if (letter === "Q") fill(200, 50, 50);
    else if (letter === "U") fill(50, 120, 255);
    else fill(255, 180, 40);
    text(letter, x, y);
    pop();
}

function laneCenterX(lane, y) {
    const bottomWidth = width * 1.5;
    const topWidth = width * 0.09;
    const roadBottomY = height;
    const roadTopY = 0;
    const centerX = width / 2;

    const depth = map(y, roadTopY, roadBottomY, 0, 1);
    const w = lerp(topWidth, bottomWidth, depth);

    return lerp(centerX - w / 2, centerX + w / 2, (lane + 0.5) / 3);
}



function startGame(mode) {
    currentMode = mode;
    currentScreen = mode === "Q" ? "quebec" : mode === "U" ? "usa" : mode === "E" ? "espana" :
        resetAll();
}

// === GAMEPLAY ===
function drawGame() {
    const baseSpeed = 4 + Math.floor(score / 500);
    const scrollSpeed = mapleSlowActive ? baseSpeed * 0.5 : baseSpeed;
    worldScroll += scrollSpeed * (deltaTime / 16);

    drawParallaxBackground(currentMode, worldScroll);
    drawRoad(scrollSpeed);
    drawObstacles(scrollSpeed);
    updatePlayerJump();
    drawPlayer();

    if (!victory && millis() - lastScoreTick >= 1000) {
        lastScoreTick = millis();
        score = min(2500, score + 1);
    }

    if (!hitCooldown && !victory) checkCollisions();
    drawHUD();

    if (mapleSlowActive && millis() - mapleTimer > 3000) mapleSlowActive = false;

    if (score >= 2500 && !victory) beginVictory();
    if (victory) drawVictoryRun(scrollSpeed);
}

// === BACKGROUND ===
function drawParallaxBackground(mode, scroll) {
    let sky, mid;
    if (mode === "Q") {
        sky = color(190, 220, 255);
        mid = color(200, 80, 60);
    } else if (mode === "U") {
        sky = color(100, 150, 240);
        mid = color(80, 80, 100);
    } else {
        sky = color(230, 200, 150);
        mid = color(180, 140, 90);
    }

    background(sky);
    fill(mid);

}






// === ROAD IN PERSPECTIVE ===
function drawRoad(scrollSpeed) {
    const bottomWidth = width;
    const topWidth = width * 0.10;
    const roadBottomY = height;
    const roadTopY = 0;
    const centerX = width / 2;

    fill(40);
    noStroke();
    quad(
        centerX - topWidth / 2, roadTopY,
        centerX + topWidth / 2, roadTopY,
        centerX + bottomWidth / 2, roadBottomY,
        centerX - bottomWidth / 2, roadBottomY
    );

    // Dashed road markings (3 lanes, perspective aligned)
    stroke(255);
    strokeWeight(4);

    const dashSpacing = 100;

    for (let y = roadTopY + (worldScroll % dashSpacing); y < roadBottomY; y += dashSpacing) {

        const depth = map(y, roadTopY, roadBottomY, 0, 1);
        const w = lerp(topWidth, bottomWidth, depth);

        // LANE DIVIDER POSITIONS AT THIS Y  
        const leftLaneX = lerp(centerX - w / 2, centerX + w / 2, 1 / 3);
        const midLaneX = lerp(centerX - w / 2, centerX + w / 2, 2 / 3);

        // Next Y down (for dash length)
        const y2 = y + 25;
        const depth2 = map(y2, roadTopY, roadBottomY, 0, 1);
        const w2 = lerp(topWidth, bottomWidth, depth2);

        // Same lane X positions at y2
        const leftLaneX2 = lerp(centerX - w2 / 2, centerX + w2 / 2, 1 / 3);
        const midLaneX2 = lerp(centerX - w2 / 2, centerX + w2 / 2, 2 / 3);

        // DRAW ALIGNED DASHES
        line(leftLaneX, y, leftLaneX2, y2);
        line(midLaneX, y, midLaneX2, y2);
    }

    // === PERSPECTIVE LANE X ===
    function laneXAtY(lane, y) {
        const bottomWidth = width * 0.7;
        const topWidth = width * 0.25;
        const roadBottomY = height;
        const roadTopY = 100;
        const centerX = width / 2;
        const depth = map(y, roadTopY, roadBottomY, 0, 1);
        const w = lerp(topWidth, bottomWidth, depth);
        return lerp(centerX - w / 2, centerX + w / 2, (lane + 0.5) / 3);
    }
}

function laneCenterX(lane, y) {
    const bottomWidth = width * 1.5;
    const topWidth = width * 0.09;
    const roadBottomY = height;
    const roadTopY = 0;
    const centerX = width / 2;

    const depth = map(y, roadTopY, roadBottomY, 0, 1);
    const w = lerp(topWidth, bottomWidth, depth);

    return lerp(centerX - w / 2, centerX + w / 2, (lane + 0.5) / 3);
}




function preload() {
    retroFont = loadFont('assets/font1/BungeeSpice-Regular.ttf');// load the retro font file

    endVideo = createVideo(['assets/images/Endvideo.mp4']);// load the video file
    endVideo.hide();
}

let bottomLaneX = []; // declare globally

function resetAll() {
    player = {
        lane: 1,
        y: height - 100,
        life: 3,
        isJumping: false,
        jumpY: 0,
        jumpSpeed: 0
    };
    score = 0;
    obstacles = [];
    obstacleTimer = millis();
    victory = false;
    victoryFade = 0;
    mapleSlowActive = false;
    hitCooldown = false;
    worldScroll = 0;

    // Set lane positions after width is defined
    bottomLaneX = [
        width / 2 - width * 0.25, // left lane bottom
        width / 2,                 // center lane bottom
        width / 2 + width * 0.25  // right lane bottom
    ];
}

let runPhase = 0;
const PLAYER_SPEED = 6; // horizontal speed along lanes

// Initialize player's horizontal position along the dark line
function setupPlayer() {
    player.x = laneCenterX(player.lane, player.y);
    player.targetLane = player.lane; // where the player wants to move
}


function drawPlayer() {


    // Smooth horizontal movement along dark lane lines
    const y = player.y - player.jumpY; // vertical position
    const targetX = laneCenterX(player.targetLane, y);
    player.x = lerp(player.x, targetX, 0.2); // smooth horizontal movement


    const scaleFactor = map(y, 100, height, 0.6, 1.2);

    push();
    translate(player.x, y);
    scale(scaleFactor * 2);
    rectMode(CENTER);
    ellipseMode(CENTER);

    // Body colors based on region
    let shirtColor, pantsColor, skinColor;
    if (currentMode === "Q") {
        shirtColor = color(220, 60, 40);
        pantsColor = color(50, 50, 80);
        skinColor = color(255, 220, 180);
    } else if (currentMode === "U") {
        shirtColor = color(60, 100, 220);
        pantsColor = color(40, 40, 80);
        skinColor = color(255, 220, 180);
    } else {
        shirtColor = color(255, 200, 60);
        pantsColor = color(80, 50, 30);
        skinColor = color(255, 200, 160);
    }

    stroke(0);
    strokeWeight(3);

    // Running offsets
    const armOffset = 20 * sin(runPhase);
    const legOffset = 25 * sin(runPhase + PI);

    // Legs
    fill(pantsColor);
    rect(-10, 20 + legOffset / 2, 15, 40, 4);
    rect(10, 20 - legOffset / 2, 15, 40, 4);

    // Shoes
    fill(50);
    rect(-10, 40 + legOffset / 2, 15, 10, 2);
    rect(10, 40 - legOffset / 2, 15, 10, 2);

    // Torso
    fill(shirtColor);
    rect(0, -10, 30, 60, 8);

    // Arms
    line(-25, -30, -25, -30 + armOffset);
    line(25, -30, 25, -30 - armOffset);

    // Head
    fill(skinColor);
    ellipse(0, -60, 40, 40);

    // Hair (cap)
    fill(50, 30, 10);
    arc(0, -65, 42, 30, PI, 0, CHORD);

    pop();

    runPhase += 0.2;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) player.targetLane = max(0, player.targetLane - 1);
    if (keyCode === RIGHT_ARROW) player.targetLane = min(2, player.targetLane + 1);
    if ((keyCode === UP_ARROW || key === ' ') && !player.isJumping) {
        player.isJumping = true;
        player.jumpSpeed = JUMP_FORCE;
    }
}




// === GAME OVER ===
function gameOver() {
    currentScreen = "gameover";
    triggerGameOver();   // <-- start video here
}


function triggerGameOver() {
    showGameOver = true;
    endVideo.play();
}


function drawGameOver() {
    background(20, 0, 0);

    // draw the video on the canvas
    image(endVideo, 0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Click to return to menu", width / 2, height / 2 + 40);
}


// === VICTORY ===
function beginVictory() {
    victory = true;
    if (score > bestScores[currentMode]) bestScores[currentMode] = score;
}

function drawVictoryRun(scrollSpeed) {
    fill(255, 255 * victoryFade);
    rect(0, 0, width, height);
    victoryFade += 0.01;
    if (victoryFade > 1.5) {
        currentScreen = "menu";
        resetAll();
    }
}

// === HUD ===
function drawHUD() {
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text(`Score: ${score}`, 20, 20);
    text(`Life: ${player.life}`, 20, 40);
    pop();
}
function mousePressed() {
    if (showGameOver) {
        if (currentScreen === "gameover") {
            endVideo.stop();
            currentScreen = "menu";
            resetAll();
        }
        endVideo.stop();
        showGameOver = false;
        // Go back to menu here
    }
    if (currentScreen === "menu") {
        let radius = 50; // slightly bigger than 40 for easier clicking
        if (dist(mouseX, mouseY, width / 2 - 120, height / 2) < radius) {
            choiceMessage = "You chose Quebec!";
            choiceMessageTimer = millis();
            startGame("Q");
        } else if (dist(mouseX, mouseY, width / 2, height / 2) < radius) {
            choiceMessage = "You chose USA!";
            choiceMessageTimer = millis();
            startGame("U");
        } else if (dist(mouseX, mouseY, width / 2 + 120, height / 2) < radius) {
            choiceMessage = "You chose España!";
            choiceMessageTimer = millis();
            startGame("E");
        }
    }

}

function startGame(region) {
    currentMode = region;
    currentScreen = region === "Q" ? "quebec" : region === "U" ? "usa" : "espana";
    resetAll();
}
