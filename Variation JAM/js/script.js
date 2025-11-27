// === SUBWAY SURFER STYLE GAME BY YANN KRUPLEWICZ ===

let currentScreen = "menu";
let currentMode = null;
let score = 0;

let victory = false;
let victoryFade = 0;
let gameStartTime = 0;
const GAME_DURATION = 300000; // 300 seconds in milliseconds
let cloudParticles = []; // cloud particles at player's feet
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
    drawObstacles(scrollSpeed);
    updatePlayerJump();
    updateCloudParticles();
    drawCloudParticles(); // draw before player so clouds are behind
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
    const roadTopY = 200; // start of road
    const centerX = width / 2;

    const roadColor = color(40);
    fill(roadColor);
    noStroke();
    quad(
        centerX - topWidth / 2, roadTopY,
        centerX + topWidth / 2, roadTopY,
        centerX + bottomWidth / 2, roadBottomY,
        centerX - bottomWidth / 2, roadBottomY
    );

    // === White dashed lane dividers ===
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

    // === Dark lane center lines (for player & obstacle guidance) ===
    stroke(roadColor);  // same as road
    strokeWeight(2);
    for (let lane = 0; lane < 3; lane++) {
        beginShape();
        for (let y = roadTopY; y <= roadBottomY; y += 5) { // start from roadTopY
            const x = laneCenterX(lane, y);
            vertex(x, y);
        }
        endShape();
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
    rotate(angle); // tilt player toward lane side
    scale(scaleFactor * 2);
    rectMode(CENTER);
    ellipseMode(CENTER);

    // --- Drawing code ---
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
    // Headset
    fill(40, 40, 40); // dark gray/black headset
    strokeWeight(2);
    const headsetTrembleX = sin(runPhase * 1.1) * 0.8;
    // Headband
    arc(headsetTrembleX, -60, 50, 50, PI, 0, OPEN); // curved band over head
    // Ear cups
    ellipse(-20 + headsetTrembleX, -60, 15, 20); // left ear cup
    ellipse(20 + headsetTrembleX, -60, 15, 20); // right ear cup

    const legOffset = 25 * sin(runPhase + PI);
    // --- Legs & Shoes ---
    fill(pantsColor);

    if (player.isJumping) {
        // Shortened and lifted legs
        const jumpLegOffset = 15; // smaller than running offset
        rect(-10, 20 + jumpLegOffset, 10, 20, 4); // left leg
        rect(10, 20 - jumpLegOffset, 10, 20, 4); // right leg

        // Small shoes
        fill(50);
        rect(-10, 35 + jumpLegOffset, 10, 6, 2); // left shoe
        rect(10, 35 - jumpLegOffset, 10, 6, 2); // right shoe
    } else {
        // Normal running legs
        const legOffset = 25 * sin(runPhase + PI);
        rect(-10, 20 + legOffset / 2, 15, 40, 4); // left leg
        rect(10, 20 - legOffset / 2, 15, 40, 4); // right leg

        // Shoes
        fill(50);
        rect(-10, 40 + legOffset / 2, 15, 10, 2); // left shoe
        rect(10, 40 - legOffset / 2, 15, 10, 2); // right shoe
    }

    fill(shirtColor);
    const torsoTrembleY = sin(runPhase * 4) * 0.5;
    rect(0, -15 + torsoTrembleY, 30, 55, 8);
    // --- Arms ---
    let armSwingSpeed = player.isJumping ? 0.05 : 0.1; // slower when jumping
    runPhase += armSwingSpeed; // update run phase
    // Running trembling effect
    const trembleX = sin(runPhase * 0.8) * 1.5;
    const trembleY = sin(runPhase * 0.8) * 1;
    translate(trembleX, trembleY);

    let armOffset = 20 * sin(runPhase);
    if (player.isJumping) armOffset *= 0.5; // smaller swing in air

    line(-25, -30, -25, -30 + armOffset); // left arm
    line(25, -30, 25, -30 - armOffset);   // right arm
    // Head
    fill(skinColor);
    ellipse(0, -60, 40, 40);

    // Hair / Cap
    fill(50, 30, 10);
    ellipse(0, -60, 40, 40); // Full hair coverage matching head size
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


// === OBSTACLES ===
function spawnObstacle() {
    const lane = int(random(0, 3));
    const type = random(["car", "rock", "maple"]);

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
    // Spawn threshold increases with score and song number
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
        rectMode(CENTER);
        fill(ob.type === "maple" ? color(255, 200, 0) :
            ob.type === "car" ? color(180, 50, 50) : color(30));
        rect(0, -20, 40, 40, 8);
        pop();

        if (ob.y > height + 50) obstacles.splice(i, 1);
    }
}


function checkCollisions() {
    const playerY = player.y - player.jumpY;
    const playerX = player.x;
    const size = 30;

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];

        // If player is in the air, ignore damaging floor obstacles.
        // Still allow collecting "maple" while airborne.
        if (player.isJumping && ob.type !== "maple") {
            continue;
        }

        if (abs(ob.x - playerX) < size && abs(ob.y - playerY) < size) {
            if (ob.type === "maple") {
                mapleSlowActive = true;
                mapleTimer = millis();
                obstacles.splice(i, 1);
            } else {
                player.life--;
                hitCooldown = true;
                applyVolumeDamage(); // Apply volume damage
                setTimeout(() => hitCooldown = false, 1000);
                obstacles.splice(i, 1); // remove the obstacle we hit
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