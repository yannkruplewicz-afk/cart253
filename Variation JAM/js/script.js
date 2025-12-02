// === SUBWAY SURFER STYLE GAME BY YANN KRUPLEWICZ ===

let currentScreen = "menu";
let currentMode = null;
let score = 0;

let victory = false;
let victoryFade = 0;
let gameStartTime = 0;
const GAME_DURATION = 300000; // 300 seconds in milliseconds

let cloudParticles = []; // cloud particles at player's feet
let carDustParticles = [];
let player;
let obstacles = [];
let obstacleTimer = 0;
const spawnIntervalBase = 1500;

let worldScroll = 0;
let mapleSlowActive = false;
let mapleTimer = 0;
let hitCooldown = false;
let lastScoreTick = 0;

// new (lower, more realistic)
const JUMP_FORCE = -10;

// Gravity can remain the same or slightly higher for quicker fall
const GRAVITY = 0.5;

let runPhase = 0; // running animation phase
let bottomLaneX = []; // computed lane positions

let bestScores = { Q: 0, U: 0, E: 0 };
let scoresLoaded = false;

let choiceMessage = "";
let choiceMessageTimer = 0;
let showGameOver = false;

let retroFont; // adds a variable for the retro font
let introvideo;
let introVideoPlayed = false;
let endvideo;
let endVideoPlayed = false;

// === MUSIC SYSTEM ===
let musicPlaylists = {
    Q: [],
    U: [],
    E: []
};
let currentSongIndex = 0;
let currentSong = null;
let volumeDamageActive = false;
let volumeDamageTimer = 0;
const NORMAL_VOLUME = 0.5;
const DAMAGED_VOLUME = 0.2;
const DAMAGE_DURATION = 3000;

function preload() {
    retroFont = loadFont('assets/font1/BungeeSpice-Regular.ttf');
    endVideo = createVideo(['assets/images/Endvideo.mp4']);
    endVideo.hide();

    // Load music playlists for each region
    // Q = Quebec (3 songs)
    musicPlaylists.Q = [
        createAudio('assets/sounds/Q_song1.mp3'),
        createAudio('assets/sounds/Jaimetagrandmere.mp3'),
        createAudio('assets/sounds/faismoiunshow.mp3')
    ];


    // U = USA (3 songs)
    musicPlaylists.U = [
        createAudio('assets/sounds/U_song1.mp3'),
        createAudio('assets/sounds/U_song2.mp3'),
        createAudio('assets/sounds/U_song3.mp3')
    ];


    // E = España (3 songs)
    musicPlaylists.E = [
        createAudio('assets/sounds/E_song1.mp3'),
        createAudio('assets/sounds/E_song2.mp3'),
        createAudio('assets/sounds/E_song3.mp3')
    ];

}
function setup() {
    createCanvas(800, 600);
    textFont('BungeeSpice-Regular');

    resetAll(); // creates the player object

    // Now that player exists, initialize horizontal position
    player.x = laneCenterX(player.lane, player.y);
    player.targetLane = player.lane;
}

// === RESET GAME ===
function resetAll() {
    gameOverFade = 0; // reset game over fade
    endVideo.stop();
    endVideo.time(0); // reset video to start
    player = {
        lane: 1,
        targetLane: 1,
        x: 0,
        y: height - 100,
        life: 3,
        isJumping: false,
        jumpY: 0,
        jumpSpeed: 0
    };

    score = 0;
    lastScoreTick = millis(); // ADD THIS LINE - initialize the timer
    obstacles = [];
    obstacleTimer = millis();
    victory = false;
    victoryFade = 0;
    mapleSlowActive = false;
    hitCooldown = false;
    worldScroll = 0;
    cloudParticles = []; // reset cloud particles
    carDustParticles = []; // ADD THIS LINE

    bottomLaneX = [
        width / 2 - width * 0.25,
        width / 2,
        width / 2 + width * 0.25
    ];

    player.x = laneCenterX(player.lane, player.y);
    // Stop all music
    stopAllMusic();
}

// === MUSIC FUNCTIONS ===
function stopAllMusic() {
    if (currentSong) {
        currentSong.stop();
        currentSong = null;
    }
}

function startPlaylist(mode) {
    stopAllMusic();
    currentSongIndex = 0;
    playNextSong(mode);
}
function playNextSong(mode) {
    if (currentSongIndex < musicPlaylists[mode].length) {
        currentSong = musicPlaylists[mode][currentSongIndex];

        currentSong.volume(NORMAL_VOLUME);
        currentSong.play();
        // Display level message when song starts
        choiceMessage = `Level ${currentSongIndex + 1}`;
        choiceMessageTimer = millis();

        // When song ends → play next
        currentSong.elt.onended = () => {
            playNextSong(mode);
        };

        currentSongIndex++;
    }

}


function updateMusicPlayback() {
    // Volume damage effect
    if (volumeDamageActive) {
        if (millis() - volumeDamageTimer > DAMAGE_DURATION) {
            volumeDamageActive = false;
            if (currentSong) currentSong.volume(NORMAL_VOLUME);
        }
    }
}


function applyVolumeDamage() {
    volumeDamageActive = true;
    volumeDamageTimer = millis();
    if (currentSong) currentSong.volume(DAMAGED_VOLUME);
}
// === DRAW LOOP ===
function draw() {
    if (currentScreen === "menu") drawMenu();
    else if (["quebec", "usa", "espana"].includes(currentScreen)) drawGame();
    else if (currentScreen === "gameover") drawGameOver();
}



function drawMenu() {
    endVideo.hide();   // extra protection
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
    const bottomWidth = width * 2;
    const topWidth = width * 0.0002;
    const roadBottomY = height - 80;
    const roadTopY = 200;
    const centerX = width / 2;

    // clamp Y so perspective doesn't push player off-screen
    const clampedY = constrain(y, roadTopY, roadBottomY - 50); // leave a 50px margin

    const depth = map(clampedY, roadTopY, roadBottomY, 0, 1);
    const w = lerp(topWidth, bottomWidth, depth);

    // lane 0 = left, 1 = middle, 2 = right
    return lerp(centerX - w / 2, centerX + w / 2, (lane + 0.5) / 3);
}


function startGame(mode) {
    currentMode = mode;
    currentScreen = mode === "Q" ? "quebec" : mode === "U" ? "usa" : "espana";
    resetAll();
    startPlaylist(mode);
    gameStartTime = millis();
    lastScoreTick = millis(); // ADD THIS LINE - reset score timer when game starts
}

// === GAMEPLAY ===
function drawGame() {
    const baseSpeed = 4 + Math.floor(score / 500);
    const scrollSpeed = mapleSlowActive ? baseSpeed * 0.5 : baseSpeed;
    worldScroll += scrollSpeed * (deltaTime / 16);

    if (!victory && millis() - lastScoreTick >= 1000) {
        lastScoreTick = millis();
        score = min(2500, score + 1);


    }

    drawParallaxBackground(currentMode, worldScroll);
    drawRoad(scrollSpeed);
    updateCarDustParticles();
    drawCarDustParticles();
    drawObstacles(scrollSpeed);
    updatePlayerJump();
    updateCloudParticles();
    drawCloudParticles();
    drawPlayer();


    if (!hitCooldown && !victory) checkCollisions();
    if (!victory && score > bestScores[currentMode]) {
        bestScores[currentMode] = score;
    }
    drawHUD();
    // Draw level message when song changes
    if (choiceMessage && millis() - choiceMessageTimer < 2000) {
        fill(255, 255, 0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text(choiceMessage, width / 2, height / 3);
    }

    if (mapleSlowActive && millis() - mapleTimer > 3000) mapleSlowActive = false;

    if (score >= 2500 && !victory) beginVictory();
    if (victory) drawVictoryRun();
    if (millis() - gameStartTime >= GAME_DURATION && !victory) {
        beginVictory();
    }

    // Update music playback
    updateMusicPlayback();
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
function mousePressed() {
    userStartAudio();
    if (currentScreen === "gameover") {

        // Restart button
        let btnX = width / 2;
        let btnY = height / 2 + 150;
        let btnR = 40;

        if (dist(mouseX, mouseY, btnX, btnY) < btnR) {
            location.reload();
            return;
        }

        return;
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

// === ROAD ===
function drawRoad(scrollSpeed) {
    const bottomWidth = width * 1.8;
    const topWidth = width * 0.03;
    const roadBottomY = height;
    const roadTopY = 200;
    const centerX = width / 2;

    if (currentMode === "Q") {
        // QUEBEC: Forest dirt path
        drawQuebecPath(topWidth, bottomWidth, roadTopY, roadBottomY, centerX);
    } else if (currentMode === "U") {
        // USA: Modern asphalt road
        drawUSARoad(topWidth, bottomWidth, roadTopY, roadBottomY, centerX);
    } else {
        // ESPAÑA: Zigzag paving stones
        drawSpainRoad(topWidth, bottomWidth, roadTopY, roadBottomY, centerX);
    }
}

function drawQuebecPath(topWidth, bottomWidth, roadTopY, roadBottomY, centerX) {
    // Brown earth/dust path
    const pathColor = color(101, 67, 33);
    fill(pathColor);
    noStroke();
    quad(
        centerX - topWidth / 2, roadTopY,
        centerX + topWidth / 2, roadTopY,
        centerX + bottomWidth / 2, roadBottomY,
        centerX - bottomWidth / 2, roadBottomY
    );

    // Add dirt texture with random spots
    for (let i = 0; i < 150; i++) {
        const randY = random(roadTopY, roadBottomY);
        const depth = map(randY, roadTopY, roadBottomY, 0, 1);
        const w = lerp(topWidth, bottomWidth, depth);
        const randX = centerX + random(-w / 2, w / 2);

        fill(85, 55, 25, 120);
        noStroke();
        ellipse(randX, randY, random(3, 8));
    }

    // Darker worn tracks (no lines, just darker earth)
    fill(101, 67, 33); // Same color as the rest of the road
    noStroke();
    for (let lane = 0; lane < 3; lane++) {
        beginShape();
        for (let y = roadTopY; y <= roadBottomY; y += 10) {
            const x = laneCenterX(lane, y);
            const depth = map(y, roadTopY, roadBottomY, 0, 1);
            const trackWidth = lerp(2, 12, depth);
            vertex(x - trackWidth / 2, y);
        }
        for (let y = roadBottomY; y >= roadTopY; y -= 10) {
            const x = laneCenterX(lane, y);
            const depth = map(y, roadTopY, roadBottomY, 0, 1);
            const trackWidth = lerp(2, 12, depth);
            vertex(x + trackWidth / 2, y);
        }
        endShape(CLOSE);
    }
}

function drawUSARoad(topWidth, bottomWidth, roadTopY, roadBottomY, centerX) {
    // Modern asphalt (original design)
    const roadColor = color(40);
    fill(roadColor);
    noStroke();
    quad(
        centerX - topWidth / 2, roadTopY,
        centerX + topWidth / 2, roadTopY,
        centerX + bottomWidth / 2, roadBottomY,
        centerX - bottomWidth / 2, roadBottomY
    );

    // White dashed lane dividers
    stroke(255);
    strokeWeight(4);
    const dashSpacing = 100;
    for (let y = roadTopY + (worldScroll % dashSpacing); y < roadBottomY; y += dashSpacing) {
        const depth = map(y, roadTopY, roadBottomY, 0, 1);
        const w = lerp(topWidth, bottomWidth, depth);

        const leftLaneX = lerp(centerX - w / 2, centerX + w / 2, 1 / 3);
        const midLaneX = lerp(centerX - w / 2, centerX + w / 2, 2 / 3);

        const y2 = y + 25;
        const depth2 = map(y2, roadTopY, roadBottomY, 0, 1);
        const w2 = lerp(topWidth, bottomWidth, depth2);
        const leftLaneX2 = lerp(centerX - w2 / 2, centerX + w2 / 2, 1 / 3);
        const midLaneX2 = lerp(centerX - w2 / 2, centerX + w2 / 2, 2 / 3);

        line(leftLaneX, y, leftLaneX2, y2);
        line(midLaneX, y, midLaneX2, y2);
    }

    // Dark lane center lines
    stroke(roadColor);
    strokeWeight(2);
    for (let lane = 0; lane < 3; lane++) {
        beginShape();
        for (let y = roadTopY; y <= roadBottomY; y += 5) {
            const x = laneCenterX(lane, y);
            vertex(x, y);
        }
        endShape();
    }
}
function drawSpainRoad(topWidth, bottomWidth, roadTopY, roadBottomY, centerX) {
    // Warm stone base
    const stoneBase = color(180, 160, 140);
    fill(stoneBase);
    noStroke();
    quad(
        centerX - topWidth / 2, roadTopY,
        centerX + topWidth / 2, roadTopY,
        centerX + bottomWidth / 2, roadBottomY,
        centerX - bottomWidth / 2, roadBottomY
    );

    // Draw zigzagging paving stones
    const stoneSize = 40;
    const scrollOffset = (worldScroll * 0.6) % stoneSize;

    for (let y = roadTopY + scrollOffset; y < roadBottomY + stoneSize; y += stoneSize) {
        const depth = map(y, roadTopY, roadBottomY, 0, 1);
        const w = lerp(topWidth, bottomWidth, depth);
        const leftEdge = centerX - w / 2;
        const rightEdge = centerX + w / 2;

        // Create zigzag pattern across the width
        const numStones = max(3, floor(w / stoneSize));

        for (let i = 0; i < numStones; i++) {
            const stoneX = lerp(leftEdge, rightEdge, i / numStones);
            const nextStoneX = lerp(leftEdge, rightEdge, (i + 1) / numStones);
            const stoneWidth = nextStoneX - stoneX;

            // Zigzag offset
            const zigzagOffset = sin((y / stoneSize + i) * 0.5) * 8;

            // Draw individual stone
            fill(170 + random(-5, 5), 150 + random(-3, 3), 130 + random(-3, 3));
            stroke(140, 130, 110);
            strokeWeight(2);

            const stoneDepth = map(y, roadTopY, roadBottomY, 0, 1);
            const stoneH = lerp(stoneSize * 0.3, stoneSize, stoneDepth);

            rect(stoneX + zigzagOffset, y, stoneWidth - 4, stoneH - 4, 2);
        }
    }


}



//      PLAYER JUMP LOGIC
// ==========================
function updatePlayerJump() {

    // Apply vertical movement only if jumping
    if (player.isJumping) {
        player.jumpY += player.jumpSpeed;
        player.jumpSpeed += GRAVITY;

        // When landing
        if (player.jumpY >= 0) {
            player.jumpY = 0;
            player.isJumping = false;
            player.jumpSpeed = 0;
        }
    }
}

function drawPlayer() {

    const physY = player.y - player.jumpY; // account for jump height

    // 1. Render Y
    let renderY = physY - 90;
    renderY = constrain(renderY, 80, height - 50);
    player.renderY = renderY;

    // compute depth: 0 = top of road, 1 = bottom
    const roadTopY = 200;
    const roadBottomY = height;
    const depth = map(physY, roadTopY, roadBottomY, 0, 1);

    const rawX = laneCenterX(player.targetLane, physY);
    const centerX = laneCenterX(1, physY); // middle lane
    const laneOffsetFactor = 0.3 * (1 - depth);
    const adjustedX = lerp(rawX, centerX, 0.3); player.x = lerp(player.x || adjustedX, adjustedX, 0.2);


    const scaleFactor = map(renderY, 80, height, 0.6, 1.1) * (1 - player.jumpY * 0.002);

    // Scale and jump height
    const scaleFactorY = map(renderY, 1180, height, 0., 1.1);
    // Horizontal angle based on distance from center
    const horizontalOffset = (player.x - centerX) / (width * 0.5); // -1 left, 1 right
    const angle = -horizontalOffset * PI / 22; // max ±12°, reversed direction
    push();
    translate(player.x, renderY);
    rotate(angle);
    scale(scaleFactor * 1.7);
    rectMode(CENTER);
    ellipseMode(CENTER);
    // Define colors
    let pantsColor, skinColor;
    if (currentMode === "Q") {
        pantsColor = color(50, 50, 80);
        skinColor = color(255, 220, 180);
    } else if (currentMode === "U") {
        pantsColor = color(100, 150, 220);
        skinColor = color(255, 220, 180);
    } else {
        pantsColor = color(120, 80, 160);
        skinColor = color(255, 200, 160);
    }

    // Animation variables
    let armSwingSpeed = player.isJumping ? 0.05 : 0.1;
    runPhase += armSwingSpeed;
    const trembleX = sin(runPhase * 0.8) * 1.5;
    const trembleY = sin(runPhase * 0.8) * 1;
    const torsoTrembleY = sin(runPhase * 4) * 0.5;
    let armOffset = 20 * sin(runPhase);
    if (player.isJumping) armOffset *= 0.5;
    const legOffset = 25 * sin(runPhase + PI);

    // === LEGS & SHOES ===
    stroke(0);
    strokeWeight(3);
    fill(pantsColor);
    if (player.isJumping) {
        const jumpLegOffset = 15;
        rect(-10, 20 + jumpLegOffset, 10, 20, 4);
        rect(10, 20 - jumpLegOffset, 10, 20, 4);
        fill(50);
        rect(-10, 35 + jumpLegOffset, 10, 6, 2);
        rect(10, 35 - jumpLegOffset, 10, 6, 2);
    } else {
        rect(-10, 20 + legOffset / 2, 15, 40, 4);
        rect(10, 20 - legOffset / 2, 15, 40, 4);
        fill(50);
        rect(-10, 40 + legOffset / 2, 15, 10, 2);
        rect(10, 40 - legOffset / 2, 15, 10, 2);
    }

    // Apply trembling
    translate(trembleX, trembleY);

    // === REGION-SPECIFIC OUTFITS ===
    if (currentMode === "Q") {
        // QUEBEC - Winter Coat
        fill(200, 40, 40);
        stroke(0);
        strokeWeight(3);
        rect(0, -15 + torsoTrembleY, 35, 58, 10);

        stroke(180, 30, 30);
        strokeWeight(2);
        for (let i = -35; i <= 15; i += 12) {
            line(-17, i + torsoTrembleY, 17, i + torsoTrembleY);
        }

        stroke(0);
        strokeWeight(2);
        fill(240, 230, 220);
        ellipse(-12, -38 + torsoTrembleY, 8, 8);
        ellipse(-6, -42 + torsoTrembleY, 8, 8);
        ellipse(0, -43 + torsoTrembleY, 8, 8);
        ellipse(6, -42 + torsoTrembleY, 8, 8);
        ellipse(12, -38 + torsoTrembleY, 8, 8);

        fill(40, 40, 40);
        stroke(0);
        strokeWeight(2);
        ellipse(-25, -10 - armOffset, 8, 10);
        ellipse(25, -10 + armOffset, 8, 10);

        fill(200, 40, 40);
        stroke(0);
        strokeWeight(3);
        ellipse(-25, -25 - armOffset / 2, 12, 25);
        ellipse(25, -25 + armOffset / 2, 12, 25);

    } else if (currentMode === "U") {
        // USA - Baseball Jacket
        fill(40, 80, 180);
        stroke(0);
        strokeWeight(3);
        rect(0, -15 + torsoTrembleY, 32, 52, 8);

        stroke(0);
        strokeWeight(2);
        fill(255);
        rect(0, -38 + torsoTrembleY, 28, 6, 2);


        // Skin-colored arms
        stroke(skinColor);
        strokeWeight(8);
        line(-25, -30, -25, -22 - armOffset);
        line(25, -30, 25, -22 + armOffset);

    } else {
        // ESPAÑA - Real Madrid Jersey
        fill(255);
        stroke(0);
        strokeWeight(3);
        rect(0, -15 + torsoTrembleY, 32, 56, 8);

        stroke(200, 170, 80);
        strokeWeight(3);
        line(-16, -38 + torsoTrembleY, -16, -25 + torsoTrembleY);
        line(-12, -38 + torsoTrembleY, -12, -25 + torsoTrembleY);
        line(-8, -38 + torsoTrembleY, -8, -25 + torsoTrembleY);
        line(16, -38 + torsoTrembleY, 16, -25 + torsoTrembleY);
        line(12, -38 + torsoTrembleY, 12, -25 + torsoTrembleY);
        line(8, -38 + torsoTrembleY, 8, -25 + torsoTrembleY);

        stroke(0);
        strokeWeight(2);
        fill(80, 50, 120);

        // increase the corner radius (e.g., 4, 6, 8, 10...)
        rect(0, -40 + torsoTrembleY, 20, 8, 126);

        fill(200, 170, 80);
        noStroke();
        triangle(-8, -28 + torsoTrembleY, -6, -32 + torsoTrembleY, -4, -28 + torsoTrembleY);
        triangle(-4, -28 + torsoTrembleY, -2, -32 + torsoTrembleY, 0, -28 + torsoTrembleY);
        triangle(0, -28 + torsoTrembleY, 2, -32 + torsoTrembleY, 4, -28 + torsoTrembleY);
        triangle(4, -28 + torsoTrembleY, 6, -32 + torsoTrembleY, 8, -28 + torsoTrembleY);

        fill(200, 170, 80);
        textSize(18);
        textAlign(CENTER, CENTER);
        textFont("Impact");
        text("7", 0, -15 + torsoTrembleY);
        // Golden yellow arms
        stroke(235, 235, 235);
        strokeWeight(7);
        line(-25, -30, -25, -22 - armOffset);
        line(25, -30, 25, -22 + armOffset);


    }

    // === HEADSET ===
    fill(40, 40, 40);
    stroke(0);
    strokeWeight(2);
    const headsetTrembleX = sin(runPhase * 1.1) * 0.8;
    arc(headsetTrembleX, -60, 50, 50, PI, 0, OPEN);
    ellipse(-20 + headsetTrembleX, -60, 15, 20);
    ellipse(20 + headsetTrembleX, -60, 15, 20);

    // === HEAD & HAIR ===
    strokeWeight(3);
    fill(skinColor);
    ellipse(0, -60, 40, 40);
    fill(70, 30, 10);
    ellipse(0, -60, 40, 40);

    pop();

    // Update running animation
    runPhase += 0.2;

    const cloudSpawnRate = max(3, 32 - floor(score / 300)); // I suggest using 12 instead of 92
    if (!player.isJumping && frameCount % cloudSpawnRate === 0) {
        spawnCloudParticle();
    }
} function spawnCloudParticle() {
    const physY = player.y - player.jumpY;
    cloudParticles.push({
        x: player.x + random(-25, 25),
        y: physY + 15, // more at the bottom
        size: random(25, 40),
        opacity: 220,
        speedX: random(-2, 2),
        speedY: random(1, 3),
        life: 1.0
    });
}

function updateCloudParticles() {
    for (let i = cloudParticles.length - 1; i >= 0; i--) {
        const cloud = cloudParticles[i];
        cloud.x += cloud.speedX;
        cloud.y += cloud.speedY;
        cloud.life -= 0.03;
        cloud.opacity = cloud.life * 220;

        if (cloud.life <= 0) {
            cloudParticles.splice(i, 1);
        }
    }
}

function drawCloudParticles() {
    for (const cloud of cloudParticles) {
        // 3D shadow effect
        noStroke();
        fill(100, 100, 100, cloud.opacity * 0.3);
        beginShape();
        vertex(cloud.x - cloud.size * 0.4 + 5, cloud.y + 8);
        bezierVertex(cloud.x - cloud.size * 0.5 + 5, cloud.y - cloud.size * 0.3 + 8,
            cloud.x - cloud.size * 0.2 + 5, cloud.y - cloud.size * 0.4 + 8,
            cloud.x + 5, cloud.y - cloud.size * 0.25 + 8);
        bezierVertex(cloud.x + cloud.size * 0.2 + 5, cloud.y - cloud.size * 0.4 + 8,
            cloud.x + cloud.size * 0.5 + 5, cloud.y - cloud.size * 0.3 + 8,
            cloud.x + cloud.size * 0.4 + 5, cloud.y + 8);
        bezierVertex(cloud.x + cloud.size * 0.35 + 5, cloud.y + cloud.size * 0.15 + 8,
            cloud.x - cloud.size * 0.35 + 5, cloud.y + cloud.size * 0.15 + 8,
            cloud.x - cloud.size * 0.4 + 5, cloud.y + 8);
        endShape(CLOSE);

        // Main cloud with single outline
        stroke(0);
        strokeWeight(3);
        fill(255, 255, 255, cloud.opacity);
        beginShape();
        vertex(cloud.x - cloud.size * 0.4, cloud.y);
        bezierVertex(cloud.x - cloud.size * 0.5, cloud.y - cloud.size * 0.3,
            cloud.x - cloud.size * 0.2, cloud.y - cloud.size * 0.4,
            cloud.x, cloud.y - cloud.size * 0.25);
        bezierVertex(cloud.x + cloud.size * 0.2, cloud.y - cloud.size * 0.4,
            cloud.x + cloud.size * 0.5, cloud.y - cloud.size * 0.3,
            cloud.x + cloud.size * 0.4, cloud.y);
        bezierVertex(cloud.x + cloud.size * 0.35, cloud.y + cloud.size * 0.15,
            cloud.x - cloud.size * 0.35, cloud.y + cloud.size * 0.15,
            cloud.x - cloud.size * 0.4, cloud.y);
        endShape(CLOSE);
    }
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) player.targetLane = max(0, player.targetLane - 1);
    if (keyCode === RIGHT_ARROW) player.targetLane = min(2, player.targetLane + 1);
    if ((keyCode === UP_ARROW || key === ' ') && !player.isJumping) {
        player.isJumping = true;
        player.jumpSpeed = JUMP_FORCE;
    }
}

function spawnObstacle() {
    const lane = int(random(0, 3));
    let type;

    // Determine obstacle type based on current game mode
    if (currentMode === "Q") {
        type = random(["woman_biking", "maple_syrup", "bear", "maple_tree"]);
    } else if (currentMode === "U") {
        type = random(["fat_guy", "chevrolet", "hamburger", "i_show_speed"]);
    } else if (currentMode === "E") {
        type = random(["citrus", "orange_tree", "kid_soccer", "fiat_car"]);
    }

    const startY = 200;
    const targetY = height;
    const startX = laneCenterX(lane, startY);
    const targetX = laneCenterX(lane, targetY);

    obstacles.push({
        lane,
        x: startX,
        y: startY,
        startX,
        startY,
        targetX,
        targetY,
        type
    });
}

function drawObstacles(scrollSpeed) {
    // Spawn obstacles more frequently over time and when song changes
    const roadMidY = (200 + height) / 2;
    const spawnThreshold = roadMidY - (score / 10) - (currentSongIndex * 30);

    if (obstacles.length === 0 || obstacles[obstacles.length - 1].y > spawnThreshold) {
        if (!victory) {
            spawnObstacle();
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];

        // Obstacles move faster as score increases
        const speedMultiplier = 1 + (score / 1000) * 0.8;
        ob.y += scrollSpeed * speedMultiplier;

        const t = (ob.y - ob.startY) / (ob.targetY - ob.startY);
        ob.x = lerp(ob.startX, ob.targetX, t);

        push();
        translate(ob.x, ob.y);
        scale(0.5);
        if ((ob.type === "fiat_car" || ob.type === "chevrolet") && frameCount % 3 === 0) {
            spawnCarDust(ob.x, ob.y + 30);
        }
        // Draw obstacles based on type
        if (ob.type === "maple_syrup") {
            drawMapleSyrupBottle(0, 0, 1);
        } else if (ob.type === "woman_biking") {
            drawWomanBiking(0, 0, 2.5);
        } else if (ob.type === "bear") {
            drawBear(0, 0, 2);
        } else if (ob.type === "maple_tree") {
            drawMappleTree(0, 0, 5);
        } else if (ob.type === "fat_guy") {
            drawFatGuy(0, 0, 2.3);
            // } else if (ob.type === "school_bus") {
            //  drawSchoolBusFrontView(0, 0, 1);
        } else if (ob.type === "fiat_car") {
            drawFiatCar(0, 0, 3.3);
        } else if (ob.type === "chevrolet") {
            drawChevrolet(0, 0, 2);
        } else if (ob.type === "hamburger") {
            drawHamburger(0, 0, 1);
        } else if (ob.type === "i_show_speed") {
            drawIShowSpeed(0, 0, 2.5);
        } else if (ob.type === "orange_tree") {
            drawOrangeTree(0, 0, 5);
        } else if (ob.type === "citrus") {
            drawCitrus(0, 0, 1);
        } else if (ob.type === "kid_soccer") {
            drawKidSoccer(0, 0, 2.5);
        }

        pop();

        if (ob.y > height + 50) obstacles.splice(i, 1);
    }
} function checkCollisions() {
    const playerY = player.y - player.jumpY;
    const playerX = player.x;

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];

        // Power-ups that can be collected while jumping
        const powerUps = ["maple_syrup", "hamburger", "citrus"];

        // If player is in the air, ignore damaging floor obstacles.
        // Still allow collecting power-ups while airborne.
        if (player.isJumping && !powerUps.includes(ob.type)) {
            continue;
        }

        // Define collision sizes based on obstacle type (scaled by 0.5 in drawObstacles)
        let collisionSize = 30; // default
        let yOffset = 0; // vertical offset for better alignment

        if (ob.type === "woman_biking") {
            collisionSize = 45;
            yOffset = -10;
        } else if (ob.type === "bear") {
            collisionSize = 60;
            yOffset = 0;
        } else if (ob.type === "maple_tree" || ob.type === "orange_tree") {
            collisionSize = 55;
            yOffset = -20;
        } else if (ob.type === "fat_guy") {
            collisionSize = 70;
            yOffset = -15;
        } else if (ob.type === "fiat_car" || ob.type === "chevrolet") {
            collisionSize = 75;
            yOffset = 10;
        } else if (ob.type === "i_show_speed") {
            collisionSize = 55;
            yOffset = -5;
        } else if (ob.type === "kid_soccer") {
            collisionSize = 50;
            yOffset = -5;
        } else if (ob.type === "maple_syrup" || ob.type === "citrus" || ob.type === "hamburger") {
            collisionSize = 37;
            yOffset = 0;
        }

        // Adjust for the 0.5 scale applied in drawObstacles
        collisionSize *= 0.5;
        yOffset *= 0.5;

        // Check collision with adjusted parameters
        if (abs(ob.x - playerX) < collisionSize && abs((ob.y + yOffset) - playerY) < collisionSize) {
            // Slow-down power-ups
            if (powerUps.includes(ob.type)) {
                mapleSlowActive = true;
                mapleTimer = millis();
                obstacles.splice(i, 1);
            } else {
                // Regular obstacles damage the player
                player.life--;
                hitCooldown = true;
                applyVolumeDamage();
                setTimeout(() => hitCooldown = false, 1000);
                obstacles.splice(i, 1);
                if (player.life <= 0) gameOver();
            }
        }
    }
}

// === GAMEOVER / VICTORY / HUD ===
function gameOver() {
    // Save best score before game over
    if (score > bestScores[currentMode]) {
        bestScores[currentMode] = score;
        saveBestScores();
    }

    currentScreen = "gameover";
    showGameOver = true;
    gameOverFade = 0; // start fade from 0
    stopAllMusic();
    endVideo.play();
}
function drawGameOver() {
    background(20, 0, 0);
    image(endVideo, 0, 0, width, height);

    // Fade in effect
    if (gameOverFade < 1) {
        gameOverFade = min(1, gameOverFade + 0.02);
    }

    fill(0, 0, 0, 255 * (1 - gameOverFade)); // semi-transparent dark overlay
    rect(0, 0, width, height);

    fill(255, 255 * gameOverFade); // fade in text
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Game Over", width / 2, height / 2);
    textSize(40);
    text("Click to return to menu", width / 2, height / 2 + 60);

    // === Restart Button (rounded reverse arrow) ===
    let btnX = width / 2;
    let btnY = height / 2 + 150;
    let btnR = 40; // radius

    // Button background circle
    fill(255, 255 * gameOverFade);
    noStroke();
    ellipse(btnX, btnY, btnR * 2);

    // Draw reverse arrow
    stroke(0);
    strokeWeight(4);
    noFill();

    // Arrow head (curved)
    beginShape();
    vertex(btnX + 10, btnY - 10);
    vertex(btnX - 10, btnY);
    vertex(btnX + 10, btnY + 10);
    endShape();

    // Curved tail
    noFill();
    arc(btnX, btnY, 50, 50, PI * 0.3, PI * 1.7);

}
function beginVictory() {
    victory = true;
    if (score > bestScores[currentMode]) {
        bestScores[currentMode] = score;
        saveBestScores(); // Save immediately when new best score is achieved
    }
}
function drawVictoryRun() {
    victoryFade += 0.003;
    fill(255, 255 * victoryFade);
    rect(0, 0, width, height);
    if (victoryFade > 2.5) {
        currentScreen = "menu";
        resetAll();
    }
}
function drawHUD() {
    fill(255);
    textSize(26);
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 20, 20);
    text(`Life: ${player.life}`, 20, 50);


}



function spawnCarDust(x, y) {
    for (let i = 0; i < 3; i++) {
        carDustParticles.push({
            x: x + random(-15, 15),
            y: y + random(-5, 5),
            size: random(8, 20),
            opacity: 180,
            speedX: random(-1, 1),
            speedY: random(-2, -4), // moves upward
            life: 1.0
        });
    }
}

function updateCarDustParticles() {
    for (let i = carDustParticles.length - 1; i >= 0; i--) {
        const dust = carDustParticles[i];
        dust.x += dust.speedX;
        dust.y += dust.speedY;
        dust.life -= 0.04;
        dust.opacity = dust.life * 180;
        dust.size *= 1.02; // grows slightly

        if (dust.life <= 0) {
            carDustParticles.splice(i, 1);
        }
    }
}

function drawCarDustParticles() {
    for (const dust of carDustParticles) {
        noStroke();
        fill(100, 100, 100, dust.opacity * 0.5);
        ellipse(dust.x, dust.y, dust.size, dust.size);

        // Inner lighter dust
        fill(150, 150, 150, dust.opacity * 0.3);
        ellipse(dust.x, dust.y, dust.size * 0.6, dust.size * 0.6);
    }
}