// === SUBWAY SURFER STYLE GAME BY YANN KRUPLEWICZ ===

let currentScreen = "menu";
let currentMode = null;
let score = 0;

let victory = false;
let victoryFade = 0;
let gameStartTime = 0;
const GAME_DURATION = 300000; // 300 seconds in milliseconds

let cloudParticles = []; // cloud particles at player's feet
let carDustParticles = [];// Dust from car movement
// Player and obstacles
let player; // Timer for spawning obstacles
let obstacles = [];
let obstacleTimer = 0;
const spawnIntervalBase = 1500;
let planes = []; // planes flying in the sky
let lastPlaneSpawn = 0;


let worldScroll = 0;
let mapleSlowActive = false;// Maple slow effect active
let mapleTimer = 0;
let hitCooldown = false;   // Player invulnerability after hit for 1 sec
let lastScoreTick = 0;// Last score update time

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
let currentSongIndex = 0;// Index of the currently playing song
let currentSong = null; // Current song object
let volumeDamageActive = false;// Is volume temporarily reduced due to damage
let volumeDamageTimer = 0; // Timer for how long the damage effect lasts
const NORMAL_VOLUME = 0.5;// Default volume
const DAMAGED_VOLUME = 0.2; // Volume when damaged
const DAMAGE_DURATION = 3000;  // Duration of volume damage effect (ms)

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
    lastScoreTick = millis();
    obstacles = [];
    obstacleTimer = millis();
    victory = false;
    victoryFade = 0;
    mapleSlowActive = false;
    hitCooldown = false;
    worldScroll = 0;
    cloudParticles = []; // reset cloud particles
    carDustParticles = []; // ADD THIS LINE
    planes = []; // reset planes
    lastPlaneSpawn = millis();

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

function startPlaylist(mode) { // 9 songs, 3 per sub game
    stopAllMusic();
    currentSongIndex = 0;
    playNextSong(mode);
}
function playNextSong(mode) { // plays 3 songs in a row for each sub game
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


function applyVolumeDamage() {// song's volume turns down for 2 secs if player is hurt
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



function drawMenu() {// chose a letter = chose a sub game
    endVideo.hide();   // extra protection
    fill(255);
    textAlign(CENTER, CENTER);

    textSize(40);
    textSize(20);
    text("Click on a letter to choose your region", width / 2, height / 3 + 150);

    drawMenuLetter("Q", width / 2 - 120, height / 2);//quebec
    drawMenuLetter("U", width / 2, height / 2);//usa
    drawMenuLetter("E", width / 2 + 120, height / 2);//spain

    drawMenuLetter("?", width / 2, height / 2 + 100);

    // Draw choice message if any
    if (choiceMessage && millis() - choiceMessageTimer < 1000) {
        fill(255, 255, 0);
        textSize(24);
        text(choiceMessage, width / 2, height / 2 + 100);
    }
}

function drawMenuLetter(letter, x, y) {// chose a letter = chose a sub game mechanism
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
    lastScoreTick = millis();
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
    if (mode === "Q") {
        drawQuebecForest(scroll);
    } else if (mode === "U") {
        drawNYCStreets(scroll);
    } else {
        drawSpainStreets(scroll);
    }
}

function drawQuebecForest(scroll) {
    // Sky gradient
    for (let y = 0; y < height / 2; y++) {
        let inter = map(y, 0, height / 2, 0, 1);
        let c = lerpColor(color(135, 206, 250), color(190, 220, 255), inter);
        stroke(c);
        line(0, y, width, y);
    }

    // Distant mountains (much higher)
    fill(100, 120, 140, 150);
    noStroke();
    beginShape();
    vertex(0, height / 2 + 50);
    for (let x = 0; x <= width; x += 50) {
        let y = height / 2 - 200 + sin(x * 0.01) * 50 + cos(x * 0.008) * 40;
        vertex(x, y);
    }
    vertex(width, height / 2 + 50);
    endShape(CLOSE);

    // Extra far tree layer (very slow)
    const extraFarScroll = scroll * 0.15;
    drawTreeLayer(extraFarScroll, 0.3, null, height / 2 - 20, 100, 40, true);

    // Far tree layer (slowest parallax)
    const farScroll = scroll * 0.25;
    drawTreeLayer(farScroll, 0.4, null, height / 2 - 20, 120, 35, true);

    // Mid-far tree layer
    const midFarScroll = scroll * 0.35;
    drawTreeLayer(midFarScroll, 0.5, null, height / 2 + 20, 150, 30, true);

    // Mid tree layer
    const midScroll = scroll * 0.45;
    drawTreeLayer(midScroll, 0.6, null, height / 2 + 40, 180, 25, true);

    // Mid-close tree layerc
    const midCloseScroll = scroll * 0.55;
    drawTreeLayer(midCloseScroll, 0.8, null, height / 2 + 80, 220, 20, true);

    // Close tree layer (fastest parallax) 
    const closeScroll = scroll * 0.65;
    drawTreeLayer(closeScroll, 1.0, null, height / 2 + 120, 250, 18, true);

    // Ground foliage
    fill(40, 70, 40);
    noStroke();
    rect(0, height - 100, width, 100);

    // Grass details
    stroke(50, 90, 50);
    strokeWeight(2);
    const grassScroll = scroll * 0.8;
    for (let x = -grassScroll % 20; x < width; x += 20) {
        for (let i = 0; i < 3; i++) {
            let gx = x + random(-5, 5);
            let gy = height - 100 + random(0, 80);
            line(gx, gy, gx + random(-3, 3), gy - random(8, 15));
        }
    }
}

function drawTreeLayer(scroll, scale, treeColor, baseY, treeHeight, numTreesOverride, fillScreen) {
    const roadTopY = 200;
    const roadBottomY = height;
    const spacing = fillScreen ? 40 : 60; // Tighter spacing when filling screen
    const offset = scroll * scale;

    // More trees for smoother motion, or use override
    const numTrees = numTreesOverride || 25;

    // Fall colors palette (yellow, red, orange, green)
    const fallColors = [
        color(255, 215, 0),     // Golden yellow
        color(255, 140, 0),     // Dark orange
        color(220, 20, 60),     // Crimson red
        color(255, 69, 0),      // Red-orange
        color(184, 134, 11),    // Dark goldenrod
        color(34, 139, 34),     // Forest green
        color(255, 165, 0),     // Orange
        color(178, 34, 34),     // Firebrick red
        color(50, 90, 50),      // Dark green
        color(218, 165, 32)     // Goldenrod
    ];

    for (let i = 0; i < numTrees; i++) {
        // Position trees from top (far) to bottom (near) of the road
        let progress = (i + (offset / spacing) % numTrees) / numTrees;
        while (progress > 1) progress -= 1;
        while (progress < 0) progress += 1;

        // Smooth easing for more natural motion
        let easedProgress = progress * progress * (3 - 2 * progress); // smoothstep

        let treeY = lerp(roadTopY - 50, roadBottomY - 80, easedProgress);

        // Calculate depth-based scale (smaller at top, larger at bottom)
        let depthScale = map(treeY, roadTopY - 50, roadBottomY - 80, 0.2, 2.0) * scale;

        // Position trees on sides of the road using perspective
        const roadCenterX = width / 2;
        const depth = map(treeY, roadTopY, roadBottomY, 0, 1);
        const roadWidth = lerp(width * 0.03, width * 1.8, depth);

        // ALL TREES ARE PINE NOW (treeType = 0)
        let treeType = 0; // Only pine trees

        if (fillScreen) {
            // REDUCED DENSITY: Only 3 trees per position (was 6)
            // Draw trees on both sides with only ONE distance from road
            for (let sideIdx = 0; sideIdx < 2; sideIdx++) {
                let side = sideIdx === 0 ? -1 : 1;

                // Place 1.5 trees at different distances from road on each side (REDUCED from 3)
                for (let distIdx = 0; distIdx < 1.5; distIdx++) {
                    let distMultiplier = 1.0 + distIdx * 0.7; // Spread out more
                    let treeX = roadCenterX + side * (roadWidth / 2 + 30 * depthScale * distMultiplier);

                    // Add horizontal variation
                    treeX += sin(i * 2.5 + distIdx * 3.7 + offset * 0.05) * 12 * depthScale;

                    drawSingleTree(treeX, treeY, depthScale, treeType, fallColors, i, roadTopY, progress);
                }
            }
        } else {
            // Normal mode: standard tree placement
            let sideMultiplier = (i % 4 === 0) ? 1.5 : 1.0;
            let side = (i % 2 === 0) ? -1 : 1;
            let treeX = roadCenterX + side * (roadWidth / 2 + 40 * depthScale * sideMultiplier);
            treeX += sin(i * 2.5 + offset * 0.05) * 15 * depthScale;

            drawSingleTree(treeX, treeY, depthScale, treeType, fallColors, i, roadTopY, progress);
        }
    }
}

function drawSingleTree(treeX, treeY, depthScale, treeType, fallColors, index, roadTopY, progress) {
    const roadBottomY = height;
    const treeHeight = 250; // Default height

    // Skip if tree is off screen
    if (treeY < roadTopY - 100 || treeY > roadBottomY) return;

    // Fade in/out at edges for smoother appearance
    let alpha = 255;
    if (progress < 0.05) alpha *= progress / 0.05;
    if (progress > 0.95) alpha *= (1 - progress) / 0.05;

    // Hide trees at road beginning (top area)
    if (treeY < roadTopY + 30) alpha *= (treeY - (roadTopY - 50)) / 80;

    // Pick a consistent fall color for this tree
    let foliageBaseColor = fallColors[index % fallColors.length];

    // Tree trunk
    fill(60, 40, 20, alpha);
    noStroke();
    let trunkW = 15 * depthScale;
    let trunkH = treeHeight * 0.4 * depthScale;
    rect(treeX - trunkW / 2, treeY, trunkW, trunkH);

    let foliageColor = color(
        red(foliageBaseColor),
        green(foliageBaseColor),
        blue(foliageBaseColor),
        alpha * 0.9
    );
    fill(foliageColor);
    stroke(0, min(50, alpha * 0.2));
    strokeWeight(1);

    // Draw different tree types
    if (treeType === 0) {
        // Pine tree (triangular)
        let w1 = 80 * depthScale;
        let h1 = treeHeight * 0.35 * depthScale;
        triangle(treeX - w1 / 2, treeY, treeX + w1 / 2, treeY, treeX, treeY - h1);

        let w2 = 70 * depthScale;
        let h2 = treeHeight * 0.3 * depthScale;
        triangle(treeX - w2 / 2, treeY - h1 * 0.6, treeX + w2 / 2, treeY - h1 * 0.6, treeX, treeY - h1 - h2);

        let w3 = 60 * depthScale;
        let h3 = treeHeight * 0.25 * depthScale;
        triangle(treeX - w3 / 2, treeY - h1 - h2 * 0.6, treeX + w3 / 2, treeY - h1 - h2 * 0.6, treeX, treeY - h1 - h2 - h3);
    } else if (treeType === 1) {
        // Maple tree (iconic maple leaf shape)
        let mapleW = 90 * depthScale;
        let mapleH = treeHeight * 0.8 * depthScale;

        // Main crown (round-ish top)
        ellipse(treeX, treeY - mapleH * 0.5, mapleW * 0.8, mapleH * 0.7);

        // Side lobes
        ellipse(treeX - mapleW * 0.35, treeY - mapleH * 0.4, mapleW * 0.5, mapleH * 0.5);
        ellipse(treeX + mapleW * 0.35, treeY - mapleH * 0.4, mapleW * 0.5, mapleH * 0.5);

        // Top point
        ellipse(treeX, treeY - mapleH * 0.8, mapleW * 0.4, mapleH * 0.4);
    } else {
        // Rounded tree (simple deciduous)
        let roundW = 85 * depthScale;
        let roundH = treeHeight * 0.75 * depthScale;

        // Main round crown
        ellipse(treeX, treeY - roundH * 0.5, roundW, roundH);

        // Additional rounded clusters for natural look
        ellipse(treeX - roundW * 0.25, treeY - roundH * 0.3, roundW * 0.6, roundH * 0.6);
        ellipse(treeX + roundW * 0.25, treeY - roundH * 0.3, roundW * 0.6, roundH * 0.6);
    }
}

function drawSpainStreets(scroll) {




    // Sky gradient
    for (let y = 0; y < height / 2; y++) {
        let inter = map(y, 0, height / 2, 0, 1);
        let c = lerpColor(color(135, 180, 230), color(255, 200, 150), inter);
        stroke(c);
        line(0, y, width, y);
    }
    // --- NEW SIDEWALK / BACKGROUND (behind buildings) ---

    push();
    fill(240, 200, 150);   // building-colored sidewalk
    noStroke();
    ellipse(400, 400, 600, 300);
    rect(0, 300, 800, 600);


    pop();



    // Distant hills
    fill(180, 150, 120, 120);
    noStroke();
    beginShape();
    vertex(0, height / 2 + 50);
    for (let x = 0; x <= width; x += 50) {
        let y = height / 2 - 100 + sin(x * 0.012) * 40;
        vertex(x, y);
    }
    vertex(width, height / 2 + 50);
    endShape(CLOSE);

    // --- REVERSED PARALLAX (negative scroll) ---
    const extraFarScroll = -scroll * 0.08;
    const farScroll = -scroll * 0.12;
    const midFarScroll = -scroll * 0.18;
    const midScroll = -scroll * 0.25;
    const midCloseScroll = -scroll * 0.32;
    const closeScroll = -scroll * 0.40;
    const veryCloseScroll = -scroll * 0.48;

    // Buildings layers
    drawBuildingLayer(extraFarScroll, 0.25, height / 2 - 100, 150, 50, color(200, 160, 120));
    drawBuildingLayer(farScroll, 0.35, height / 2 - 50, 200, 45, color(220, 180, 140));
    drawBuildingLayer(midFarScroll, 0.5, height / 2 + 20, 250, 40, color(240, 200, 150));
    drawBuildingLayer(midScroll, 0.7, height / 2 + 100, 320, 35, color(255, 220, 180));
    drawBuildingLayer(midCloseScroll, 0.85, height / 2 + 180, 400, 30, color(255, 230, 190));
    drawBuildingLayer(closeScroll, 1.0, height / 2 + 260, 480, 25, color(255, 235, 200));
    drawBuildingLayer(veryCloseScroll, 1.2, height / 2 + 340, 550, 22, color(255, 240, 210));

    // Ground
    fill(200, 170, 140);
    noStroke();
    rect(0, height - 100, width, 100);
}

function drawBuildingLayer(scroll, scale, baseY, buildingHeight, numBuildings, buildingColor) {
    const roadTopY = 200;
    const roadBottomY = height;
    const spacing = scale < 0.4 ? 80 : 120; // tighter spacing for far layers
    const offset = scroll * scale;

    for (let i = 0; i < numBuildings; i++) {
        let buildingIndex = floor(offset / spacing) + i;
        let buildingOffset = (buildingIndex * spacing) - offset;
        let buildingY = baseY + buildingOffset * 0.3;

        // Remove top cutoff so buildings can appear near top of screen
        if (buildingY > roadBottomY) continue;

        let depthScale = scale;
        const roadCenterX = width / 2;
        const depth = map(buildingY, roadTopY, roadBottomY, 0, 1);
        const roadWidth = lerp(width * 0.03, width * 1.8, depth);
        let alpha = 255;

        for (let side = 0; side < 2; side++) {
            let sideMultiplier = side === 0 ? -1 : 1;
            let buildingsPerSide = scale > 0.7 ? 4 : 3;

            for (let b = 0; b < buildingsPerSide; b++) {
                let distanceFromRoad = 50 + b * 80;
                let buildingX = roadCenterX + sideMultiplier * (roadWidth / 2 + distanceFromRoad * depthScale);

                randomSeed(buildingIndex * 2000 + side * 300 + b);
                let bWidth = random(60, 120) * depthScale;
                let bHeight = (buildingHeight + random(-40, 40)) * depthScale;

                // Static window colors
                let windowSize = 20 * depthScale;
                let windowSpacing = 28 * depthScale;
                let windowRows = floor(bHeight / windowSpacing);
                let windowCols = floor(bWidth / windowSpacing);

                let windowColors = [];
                for (let r = 0; r < windowRows; r++) {
                    for (let c = 0; c < windowCols; c++) {
                        if (random() < 0.5) {
                            windowColors.push(color(180, 220, 255, alpha * 0.7));
                        } else {
                            windowColors.push(color(red(buildingColor), green(buildingColor), blue(buildingColor), alpha));
                        }
                    }
                }

                // Draw building
                fill(red(buildingColor), green(buildingColor), blue(buildingColor), alpha);
                stroke(0, alpha * 0.3);
                strokeWeight(2);
                rect(buildingX - bWidth / 2, buildingY - bHeight, bWidth, bHeight);

                // Draw windows
                let wIndex = 0;
                for (let r = 0; r < windowRows; r++) {
                    for (let c = 0; c < windowCols; c++) {
                        let wx = buildingX - bWidth / 2 + (c + 0.5) * windowSpacing;
                        let wy = buildingY - bHeight + (r + 0.5) * windowSpacing;

                        fill(windowColors[wIndex]);
                        noStroke();
                        rect(wx - windowSize / 2, wy - windowSize / 2, windowSize * 0.8, windowSize);

                        stroke(80, 80, 80, alpha * 0.5);
                        strokeWeight(1);
                        noFill();
                        rect(wx - windowSize / 2, wy - windowSize / 2, windowSize * 0.8, windowSize);

                        wIndex++;
                    }
                }

                // Roof
                fill(180, 80, 60, alpha);
                triangle(
                    buildingX - bWidth / 2 - 8 * depthScale, buildingY - bHeight,
                    buildingX + bWidth / 2 + 8 * depthScale, buildingY - bHeight,
                    buildingX, buildingY - bHeight - 20 * depthScale
                );

                // Balcony
                if ((buildingIndex + b) % 3 === 0) {
                    fill(100, 100, 100, alpha);
                    let balconyY = buildingY - bHeight * 0.6;
                    rect(buildingX - bWidth / 2, balconyY, bWidth, 4 * depthScale);
                }
            }
        }
    }
}



function drawNYCStreets(scroll) {
    // Sky gradient
    for (let y = 0; y < height / 2; y++) {
        let inter = map(y, 0, height / 2, 0, 1);
        let c = lerpColor(color(135, 206, 250), color(180, 220, 255), inter);
        stroke(c);
        line(0, y, width, y);
    }



    // Spawn plane every 20 seconds
    if (millis() - lastPlaneSpawn > 20000) {
        planes.push({
            x: -100,
            y: random(50, 150),
            speed: random(2, 4)
        });
        lastPlaneSpawn = millis();
    }

    // Update and draw planes
    for (let i = planes.length - 1; i >= 0; i--) {
        let p = planes[i];
        p.x += p.speed;

        // Draw plane
        push();
        translate(p.x, p.y);
        fill(255, 255, 255);
        stroke(0);
        strokeWeight(2);
        // Fuselage
        ellipse(0, 0, 60, 15);
        // Wings
        triangle(-20, 0, -10, -15, 10, 0);
        triangle(-20, 0, -10, 15, 10, 0);
        // Tail
        triangle(25, 0, 30, -10, 35, 0);
        // Banner with FIFA World Cup 2026
        fill(255, 255, 255);
        rect(40, -8, 120, 16);
        fill(0);
        textSize(10);
        textAlign(LEFT, CENTER);
        text("FIFA WORLD CUP 2026", 45, 0);
        pop();

        if (p.x > width + 200) planes.splice(i, 1);
    }

    // Sidewalk background
    push();
    fill(140, 160, 180);
    noStroke();
    ellipse(400, 300, 600, 300);
    rect(0, 200, 800, 600);
    pop();

    // Building layers using Spain logic (reusing drawBuildingLayer)
    const extraFarScroll = -scroll * 0.08;
    const farScroll = -scroll * 0.12;
    const midFarScroll = -scroll * 0.18;
    const midScroll = -scroll * 0.25;
    const midCloseScroll = -scroll * 0.32;
    const closeScroll = -scroll * 0.40;
    const veryCloseScroll = -scroll * 0.48;

    // Use taller buildings and add World Cup banners
    drawNYCBuildingLayer(extraFarScroll, 0.25, height / 2 - 150, 300, 35, color(100, 120, 140));
    drawNYCBuildingLayer(farScroll, 0.35, height / 2 - 100, 380, 32, color(120, 140, 160));
    drawNYCBuildingLayer(midFarScroll, 0.5, height / 2 - 20, 450, 28, color(140, 160, 180));
    drawNYCBuildingLayer(midScroll, 0.7, height / 2 + 80, 520, 25, color(160, 180, 200));
    drawNYCBuildingLayer(midCloseScroll, 0.85, height / 2 + 160, 600, 22, color(180, 190, 210));
    drawNYCBuildingLayer(closeScroll, 1.0, height / 2 + 240, 680, 20, color(190, 200, 220));
    drawNYCBuildingLayer(veryCloseScroll, 1.2, height / 2 + 320, 750, 18, color(200, 210, 230));

    // Ground
    fill(160, 160, 160);
    noStroke();
    rect(0, height - 100, width, 100);

    // Sidewalk cracks
    stroke(120, 120, 120);
    strokeWeight(2);
    const crackScroll = scroll * 0.8;
    for (let x = -crackScroll % 40; x < width; x += 40) {
        line(x, height - 100, x + random(-10, 10), height);
    }
}

function drawNYCBuildingLayer(scroll, scale, baseY, buildingHeight, numBuildings, buildingColor) {
    const roadTopY = 200;
    const roadBottomY = height;
    const spacing = scale < 0.4 ? 100 : 140; // Distance between buildings
    const offset = scroll * scale;             // Scroll offset for animation
    for (let i = 0; i < numBuildings; i++) {
        let buildingIndex = floor(offset / spacing) + i;
        let buildingOffset = (buildingIndex * spacing) - offset;
        let buildingY = baseY + buildingOffset * 0.3;// Vertical position with parallax

        if (buildingY > roadBottomY) continue;// Skip if below screen

        let depthScale = scale;
        const roadCenterX = width / 2;
        const depth = map(buildingY, roadTopY, roadBottomY, 0, 1); // Perspective depth
        const roadWidth = lerp(width * 0.03, width * 1.8, depth);// Road width at this depth
        let alpha = 255;   // Default opacity
        // Draw buildings on both sides of the road
        for (let side = 0; side < 2; side++) {
            let sideMultiplier = side === 0 ? -1 : 1;
            let buildingsPerSide = scale > 0.7 ? 3 : 2;// More buildings if zoomed in

            for (let b = 0; b < buildingsPerSide; b++) {
                let distanceFromRoad = 80 + b * 100;
                let buildingX = roadCenterX + sideMultiplier * (roadWidth / 2 + distanceFromRoad * depthScale);

                randomSeed(buildingIndex * 3000 + side * 500 + b);// Seed for consistent randomness
                let bWidth = random(80, 150) * depthScale;          // Building width
                let bHeight = (buildingHeight + random(-60, 80)) * depthScale;

                // Building body (glass skyscraper) - simplified
                let glassColor = lerpColor(buildingColor, color(150, 180, 220), random(0.3, 0.7));
                fill(red(glassColor), green(glassColor), blue(glassColor), alpha);
                stroke(0, alpha * 0.3);
                strokeWeight(1);
                rect(buildingX - bWidth / 2, buildingY - bHeight, bWidth, bHeight);

                // Optimized windows - only draw for closer buildings with fewer windows
                if (scale > 0.5) {
                    let windowSize = 20 * depthScale;
                    let windowSpacing = 35 * depthScale;
                    let windowRows = floor(bHeight / windowSpacing);
                    let windowCols = floor(bWidth / windowSpacing);

                    noStroke();
                    for (let r = 0; r < windowRows; r++) {
                        for (let c = 0; c < windowCols; c++) {
                            let wx = buildingX - bWidth / 2 + (c + 0.5) * windowSpacing;
                            let wy = buildingY - bHeight + (r + 0.5) * windowSpacing;

                            if (random() < 0.6) {
                                fill(200, 230, 255, alpha * 0.7);
                            } else {
                                fill(255, 255, 200, alpha * 0.5);
                            }
                            rect(wx - windowSize / 2, wy - windowSize / 2, windowSize * 0.8, windowSize);
                        }
                    }
                }

                // World Cup 2026 banners on buildings
                if ((buildingIndex + b) % 3 === 0 && scale > 0.5) {
                    push();
                    fill(255, 215, 0);
                    noStroke();
                    let bannerY = buildingY - bHeight * 0.7;
                    rect(buildingX - bWidth / 2, bannerY, bWidth, 15 * depthScale);
                    fill(0);
                    textSize(8 * depthScale);
                    textAlign(CENTER, CENTER);
                    text("WORLD CUP 2026", buildingX, bannerY + 7 * depthScale);
                    pop();
                }

                // MORE USA flags - increased frequency
                if ((buildingIndex + b) % 2 === 0 && scale > 0.4) {
                    let flagX = buildingX;
                    let flagY = buildingY - bHeight + 20 * depthScale;
                    let wave = sin(frameCount * 0.1 + flagX) * 2 * depthScale;

                    stroke(100, 100, 100, alpha);
                    strokeWeight(2 * depthScale);
                    line(flagX, flagY, flagX, flagY - 40 * depthScale);

                    // Simple USA flag
                    noStroke();
                    fill(200, 16, 46, alpha);
                    rect(flagX, flagY - 35 * depthScale + wave, 25 * depthScale, 15 * depthScale);
                    fill(60, 59, 110, alpha);
                    rect(flagX, flagY - 35 * depthScale + wave, 10 * depthScale, 8 * depthScale);
                }


            }
        }
    }
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
    const stoneBase = color(240, 200, 150);
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
            fill(220 + random(-5, 5), 180 + random(-3, 3), 140 + random(-3, 3));
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

        // When landing, pace slows down
        if (player.jumpY >= 0) {
            player.jumpY = 0;
            player.isJumping = false;
            player.jumpSpeed = 0;
        }
    }
}

function drawPlayer() {

    const physY = player.y - player.jumpY; // account for jump height

    // Compute vertical render position
    let renderY = physY - 90;
    renderY = constrain(renderY, 80, height - 50); // Keep on screen
    player.renderY = renderY;

    // Depth for perspective
    const roadTopY = 200;
    const roadBottomY = height;
    const depth = map(physY, roadTopY, roadBottomY, 0, 1);
    // Horizontal position with lane adjustment and smoothing
    const rawX = laneCenterX(player.targetLane, physY);
    const centerX = laneCenterX(1, physY); // middle lane
    const laneOffsetFactor = 0.3 * (1 - depth);
    const adjustedX = lerp(rawX, centerX, 0.3); player.x = lerp(player.x || adjustedX, adjustedX, 0.2);


    const scaleFactor = map(renderY, 80, height, 0.6, 1.1) * (1 - player.jumpY * 0.002);

    // Scale and jump height
    const scaleFactorY = map(renderY, 1180, height, 0., 1.1);
    // Horizontal angle based on distance from center
    const horizontalOffset = (player.x - centerX) / (width * 0.5);
    const angle = -horizontalOffset * PI / 22;  //perspective effect when player running on left or right sides
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

    const cloudSpawnRate = max(3, 32 - floor(score / 300));  // number of clouds to spawn
    if (!player.isJumping && frameCount % cloudSpawnRate === 0) {
        spawnCloudParticle();
    }
} function spawnCloudParticle() { // make the clouds spawn behind player when he runs
    const physY = player.y - player.jumpY;
    cloudParticles.push({
        x: player.x + random(-25, 25),
        y: physY + 15, // controls the y position of the clouds
        size: random(25, 40),
        opacity: 220,
        speedX: random(-2, 2),
        speedY: random(1, 3),
        life: 1.0
    });
}

function updateCloudParticles() { // updates the clouds, make them disappear
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
        // 3D shadow effect behind the player when he runs
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
function keyPressed() {  // character's movements controls
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
            //  drawSchoolBusFrontView(0, 0, 1);  too heavy, so i commented it
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

        if (ob.type === "woman_biking") { // puts different collision sizes depending on the logical size of the elements themselves
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

// Trigger victory state
function beginVictory() {
    victory = true;
    if (score > bestScores[currentMode]) { // Update best score
        bestScores[currentMode] = score;
        saveBestScores(); // Save immediately when new best score is achieved
    }
}
function drawVictoryRun() {
    victoryFade += 0.003;                  // Gradually increase fade
    fill(255, 255 * victoryFade);          // White overlay with opacity
    rect(0, 0, width, height);             // Cover entire screen

    if (victoryFade > 2.5) {               // After fade completes
        currentScreen = "menu";            // Return to menu
        resetAll();                         // Reset game state
    }
}
// Draw the heads-up display (HUD)
function drawHUD() {
    fill(255);
    textSize(26);
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 20, 20);
    text(`Life: ${player.life}`, 20, 50);


}


// Spawn new car dust particles at (x, y)
function spawnCarDust(x, y) {
    for (let i = 0; i < 3; i++) {
        carDustParticles.push({
            x: x + random(-15, 15),   // Slight horizontal offset
            y: y + random(-5, 5),     // Slight vertical offset
            size: random(8, 20),      // Random size
            opacity: 180,              // Initial opacity
            speedX: random(-1, 1),    // Horizontal movement
            speedY: random(-2, -4),   // Upward movement
            life: 1.0                  // Full life
        });
    }
}
// Update car dust particles
function updateCarDustParticles() {
    // Loop backwards to allow removal
    for (let i = carDustParticles.length - 1; i >= 0; i--) {
        const dust = carDustParticles[i];
        dust.x += dust.speedX;// Move particle
        dust.y += dust.speedY;// Move particle
        dust.life -= 0.04;  // Decrease life
        dust.opacity = dust.life * 180; // Fade out
        dust.size *= 1.02; // grows slightly

        if (dust.life <= 0) {
            carDustParticles.splice(i, 1);// Remove dead particle
        }
    }
}

// Function to draw dust particles kicked up by the car
function drawCarDustParticles() {
    // Loop through each dust particle in the carDustParticles array
    for (const dust of carDustParticles) {
        noStroke(); // Disable outlines for the dust shapes

        // Draw the main dust particle
        // The fill color is a semi-transparent gray based on the particle's opacity
        fill(100, 100, 100, dust.opacity * 0.5);
        ellipse(dust.x, dust.y, dust.size, dust.size); // Draw the ellipse at particle's position with its size

        // Draw a smaller, lighter inner dust particle to create a soft, layered effect
        // This gives the dust a more realistic, airy appearance
        fill(150, 150, 150, dust.opacity * 0.3);
        ellipse(dust.x, dust.y, dust.size * 0.6, dust.size * 0.6);
    }
}
