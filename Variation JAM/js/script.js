// === QUE Runner: Subway Surfer 3D-like Perspective with Jumping ===

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


function setup() {
    createCanvas(800, 600);
    textFont('Arial');
    resetAll();
}

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
}

function draw() {
    if (currentScreen === "menu") drawMenu();
    else if (["quebec", "usa", "espana"].includes(currentScreen)) drawGame();
    else if (currentScreen === "gameover") drawGameOver();
}


function drawMenu() {
    background(20);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("QUE ?", width / 2, height / 3);
    textSize(20);
    text("Click on a letter to choose your region", width / 2, height / 3 + 50);

    drawMenuLetter("Q", width / 2 - 120, height / 2);
    drawMenuLetter("U", width / 2, height / 2);
    drawMenuLetter("E", width / 2 + 120, height / 2);

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

function mousePressed() {
    if (currentScreen === "menu") {
        if (dist(mouseX, mouseY, width / 2 - 120, height / 2) < 40) {
            choiceMessage = "You chose Quebec!";
            choiceMessageTimer = millis();
            setTimeout(() => startGame("Q"), 1000);
        } else if (dist(mouseX, mouseY, width / 2, height / 2) < 40) {
            choiceMessage = "You chose USA!";
            choiceMessageTimer = millis();
            setTimeout(() => startGame("U"), 1000);
        } else if (dist(mouseX, mouseY, width / 2 + 120, height / 2) < 40) {
            choiceMessage = "You chose España!";
            choiceMessageTimer = millis();
            setTimeout(() => startGame("E"), 1000);
        }
    } else if (currentScreen === "gameover") {
        currentScreen = "menu";
    }
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

    // Lane divider lines (3 lanes)
    stroke(255, 80);
    strokeWeight(2);
    for (let i = 1; i < 3; i++) {
        const t = i / 3;
        const x1 = lerp(centerX - topWidth / 2, centerX + topWidth / 2, t);
        const x2 = lerp(centerX - bottomWidth / 2, centerX + bottomWidth / 2, t);
        line(x1, roadTopY, x2, roadBottomY);
    }

    // Dashed road markings with perspective for 3 lanes
    stroke(255);
    strokeWeight(4);

    const dashSpacing = 100;

    // Add worldScroll instead of subtracting
    for (let y = roadTopY + (worldScroll % dashSpacing); y < roadBottomY; y += dashSpacing) {
        const depth = map(y, roadTopY, roadBottomY, 0, 1);
        const w = lerp(topWidth, bottomWidth, depth);

        // Left lane (angled slightly to left)
        const leftXStart = lerp(centerX - w / 2, centerX - w / 2 + 20, depth);
        const leftXEnd = leftXStart - 5;
        line(leftXStart, y, leftXEnd, y + 20);

        // Center lane (straight)
        const centerXStart = centerX;
        line(centerXStart, y, centerXStart, y + 20);

        // Right lane (angled slightly to right)
        const rightXStart = lerp(centerX + w / 2, centerX + w / 2 - 20, depth);
        const rightXEnd = rightXStart + 5;
        line(rightXStart, y, rightXEnd, y + 20);
    }

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

// === PLAYER ===
function updatePlayerJump() {
    if (player.isJumping) {
        player.jumpY += player.jumpSpeed;
        player.jumpSpeed += GRAVITY;
        if (player.jumpY >= 0) {
            player.jumpY = 0;
            player.isJumping = false;
            player.jumpSpeed = 0;
        }
    }
}

let runPhase = 0; // global variable for running animation

function drawPlayer() {
    const y = player.y - player.jumpY; // lift above road
    const scaleFactor = map(y, 100, height, 0.6, 1.2);
    const px = laneXAtY(player.lane, y);

    push();
    translate(px, y);
    scale(scaleFactor);
    rectMode(CENTER);

    // Set color based on mode
    let colorFill;
    if (currentMode === "Q") colorFill = color(220, 60, 40);
    else if (currentMode === "U") colorFill = color(60, 100, 220);
    else colorFill = color(255, 200, 60);

    fill(colorFill);
    stroke(0);
    strokeWeight(3);

    // Running animation offsets (vertical)
    const armOffset = 20 * sin(runPhase);       // arms swing vertically
    const legOffset = 25 * sin(runPhase + PI);  // legs swing opposite to arms

    // Body (torso)
    rect(0, -30, 30, 60, 8);

    // Head
    ellipse(0, -60, 30, 30);

    // Arms (longer and visible)
    line(-20, -45, -20, -45 + armOffset); // left arm
    line(20, -45, 20, -45 - armOffset);   // right arm

    // Legs (longer)
    line(-10, 0, -10, 0 + legOffset); // left leg
    line(10, 0, 10, 0 - legOffset);   // right leg

    pop();

    // Update run phase for next frame
    runPhase += 0.2; // speed of running animation
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) player.lane = max(0, player.lane - 1);
    if (keyCode === RIGHT_ARROW) player.lane = min(2, player.lane + 1);
    if ((keyCode === UP_ARROW || key === ' ') && !player.isJumping) {
        player.isJumping = true;
        player.jumpSpeed = JUMP_FORCE;
    }
}

// === OBSTACLES ===
function spawnObstacle() {
    const lane = int(random(0, 3));
    const type = random(["car", "rock", "maple"]);
    obstacles.push({ lane, z: -100, type });
}

function drawObstacles(scrollSpeed) {
    const roadTopY = 100;
    const roadBottomY = height;
    const difficultyFactor = 1 + Math.floor(score / 500) * 0.25;
    let spawnInterval = spawnIntervalBase / difficultyFactor;
    if (mapleSlowActive) spawnInterval *= 1.8;

    if (millis() - obstacleTimer > spawnInterval && !victory) {
        obstacleTimer = millis();
        spawnObstacle();
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.z += scrollSpeed * 4;
        const y = roadTopY + ob.z;
        const px = laneXAtY(ob.lane, y);
        const scaleFactor = map(y, roadTopY, roadBottomY, 0.3, 1);

        push();
        translate(px, y);
        scale(scaleFactor);
        if (ob.type === "maple") fill(255, 200, 0);
        else if (ob.type === "car") fill(180, 50, 50);
        else fill(30);
        rectMode(CENTER);
        rect(0, -20, 40, 40, 8);
        pop();

        if (y > height + 50) obstacles.splice(i, 1);
    }
}

// === COLLISIONS ===
function checkCollisions() {
    for (let ob of obstacles) {
        const y = 100 + ob.z;
        const dy = abs((y - player.jumpY) - player.y);
        if (dy < 40 && ob.lane === player.lane && player.jumpY < 20) {
            if (ob.type === "maple") {
                mapleSlowActive = true;
                mapleTimer = millis();
                obstacles.splice(obstacles.indexOf(ob), 1);
                return;
            }
            player.life--;
            hitCooldown = true;
            setTimeout(() => (hitCooldown = false), 1000);
            if (player.life <= 0) gameOver();
            return;
        }
    }
}

// === GAME OVER ===
function gameOver() {
    currentScreen = "gameover";
}

function drawGameOver() {
    background(20, 0, 0);
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
