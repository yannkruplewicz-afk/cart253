

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
    // ... existing spawn code ...

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];

        // ... existing movement code ...

        push();
        translate(ob.x, ob.y);
        scale(0.5);

        // Draw obstacles based on type - UPDATE ALL THESE SCALE VALUES:
        if (ob.type === "maple_syrup") {
            drawMapleSyrupBottle(0, 0, 1);
        } else if (ob.type === "woman_biking") {
            drawWomanBiking(0, 0, 2);  // ← Change from 1 to 2
        } else if (ob.type === "bear") {
            drawBear(0, 0, 2);  // ← Change from 1 to 2
        } else if (ob.type === "maple_tree") {
            drawMappleTree(0, 0, 5);  // ← Change from 1 to 5
        } else if (ob.type === "fat_guy") {
            drawFatGuy(0, 0, 2.3);  // ← Change from 1 to 2.3
            // } else if (ob.type === "school_bus") {
            // drawSchoolBusFrontView(0, 0, 1.5);  // ← Change from 1 to 1.5
        } else if (ob.type === "fiat_car") {
            drawFiatCar(0, 0, 3);  // ← Change from 1 to 3
        } else if (ob.type === "chevrolet") {
            drawChevrolet(0, 0, 2);  // ← Change from 1 to 2
        } else if (ob.type === "hamburger") {
            drawHamburger(0, 0, 1);
        } else if (ob.type === "i_show_speed") {
            drawIShowSpeed(0, 0, 2.5);  // ← Change from 1 to 2.5
        } else if (ob.type === "orange_tree") {
            drawOrangeTree(0, 0, 5);  // ← Change from 1 to 5
        } else if (ob.type === "citrus") {
            drawCitrus(0, 0, 1);
        } else if (ob.type === "kid_soccer") {
            drawKidSoccer(0, 0, 2);  // ← Change from 1 to 2
        }

        pop();

        if (ob.y > height + 50) obstacles.splice(i, 1);
    }
}

function drawSchoolBusFrontView(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === ROOF — longer ===
    fill(240, 180, 0);
    stroke(0);
    strokeWeight(3);
    beginShape();
    vertex(-40, -80);  // raised farther back
    vertex(40, -80);
    vertex(110, -20);
    vertex(-110, -20);
    endShape(CLOSE);

    // Roof vents (moved upward)
    fill(80);
    rect(-25, -75, 20, 8, 2);
    rect(5, -75, 20, 8, 2);

    // === WINDSHIELD ===
    fill(150, 200, 230, 200);
    beginShape();
    vertex(-75, -20);
    vertex(75, -20);
    vertex(85, 10);
    vertex(-85, 10);
    endShape(CLOSE);

    // Wiper
    stroke(40);
    strokeWeight(2);
    line(-30, -5, 10, 0);

    // === HOOD ===
    fill(255, 195, 0);
    stroke(0);
    strokeWeight(3);
    rect(-100, 10, 200, 80, 5);

    // Hood detail lines
    stroke(200, 150, 0);
    line(-90, 15, -90, 85);
    line(90, 15, 90, 85);
    line(-60, 15, -60, 85);
    line(60, 15, 60, 85);

    // === HEADLIGHTS ===
    fill(255, 255, 200);
    stroke(0);
    ellipse(-70, 25, 25, 25);
    ellipse(70, 25, 25, 25);

    fill(240, 170, 0); // slightly darker yellow for contrast
    stroke(0);
    strokeWeight(2);
    rect(-55, 35, 110, 55, 3);

    // === GRILL ===
    fill(30);
    stroke(0);
    rect(-40, 50, 80, 35, 5);

    stroke(80);
    for (let i = 1; i < 5; i++) {
        line(-35, 50 + i * 7, 35, 50 + i * 7);
    }
    for (let i = 1; i < 4; i++) {
        line(-40 + i * 26.6, 52, -40 + i * 26.6, 83);
    }

    // === BUMPER ===
    fill(50);
    stroke(0);
    rect(-105, 85, 210, 12, 4);

    fill(200, 0, 0);
    noStroke();
    ellipse(-90, 91, 6, 6);
    ellipse(90, 91, 6, 6);

    // === LICENSE PLATE ===
    fill(255);
    stroke(0);
    rect(-20, 70, 40, 12, 2);

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(8);
    text("SCHOOL", 0, 73);
    text("BUS-123", 0, 80);

    // === SIDE PANELS ===
    fill(255, 195, 0);
    stroke(0);
    beginShape();
    vertex(-100, -20);
    vertex(-100, 90);
    vertex(-110, 95);
    vertex(-111, -20);
    endShape(CLOSE);

    beginShape();
    vertex(100, -20);
    vertex(100, 90);
    vertex(110, 95);
    vertex(111, -20);
    endShape(CLOSE);

    // Windows
    fill(150, 200, 230, 180);
    rect(-110, 5, 5, 30, 3);
    rect(105, 5, 5, 30, 3);

    // === STOP SIGN ===
    push();
    translate(-110, 15);
    fill(200, 0, 0);
    stroke(0);
    beginShape();
    for (let i = 0; i < 8; i++) {
        let ang = (TWO_PI / 8) * i - PI / 8;
        vertex(cos(ang) * 12, sin(ang) * 12);
    }
    endShape(CLOSE);
    fill(255);
    noStroke();
    textSize(8);
    text("STOP", 0, 0);
    pop();

    // === MIRRORS ===
    fill(50);
    stroke(0);
    rect(-115, -5, 8, 20, 2);
    rect(107, -5, 8, 20, 2);

    fill(150, 200, 230, 180);
    noStroke();
    ellipse(-111, 5, 10, 15);
    ellipse(111, 5, 10, 15);

    // === WHEELS ===
    stroke(0);
    strokeWeight(3);
    fill(40);
    arc(-86, 97, 35, 45, 0, PI, CHORD);
    arc(86, 97, 35, 45, 0, PI, CHORD);

    // === TEXT ===
    // === TEXT WITH PANEL ===
    push();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);

    // Panel behind text
    fill("#edc44aff"); // light yellow panel
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, -35, 120, 25, 5); // x, y, width, height, rounded corners

    // Text
    stroke(2);
    strokeWeight(2);
    fill(0);
    textSize(16);
    text("SCHOOL BUS", 0, -35);

    // === REMOVED ROUND SHADOW ===
    // (intentionally removed)

    pop();
}

function drawFiatCar(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === WINDSHIELD ===
    fill(150, 200, 230, 200);
    beginShape();
    vertex(-35, -25);  // top-left of windshield
    vertex(35, -25);   // top-right of windshield
    vertex(40, 0);     // bottom-right
    vertex(-40, 0);    // bottom-left
    endShape(CLOSE);

    // === ROOF (rounded, above windshield) ===
    fill(200, 50, 50); // Red car
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-35, -25); // align left roof corner with top of windshield
    bezierVertex(-35, -45, 35, -45, 35, -25); // smooth curved roof
    vertex(35, -25);
    vertex(-35, -25);
    endShape(CLOSE);


    // Wiper
    stroke(40);
    strokeWeight(1.5);
    line(-15, -10, 5, -8);

    // === HOOD (rounded corners) ===
    fill(220, 60, 60); // Slightly lighter red
    stroke(0);
    strokeWeight(2);
    rect(-45, 0, 90, 40, 8);

    // Hood detail line
    stroke(180, 40, 40);
    line(0, 2, 0, 38);

    // === HEADLIGHTS ===
    fill(255, 255, 200);
    stroke(0);
    strokeWeight(2);
    ellipse(-32, 10, 15, 15);
    ellipse(32, 10, 15, 15);

    // === GRILL ===
    fill(30);
    stroke(0);
    rect(-18, 22, 36, 15, 3);

    // Grill pattern
    stroke(80);
    strokeWeight(1);
    for (let i = 1; i < 4; i++) {
        line(-15, 22 + i * 3.5, 15, 22 + i * 3.5);
    }

    // === FIAT LOGO ===
    fill(255);
    stroke(0);
    strokeWeight(1.5);
    ellipse(0, 15, 12, 12);
    fill(200, 50, 50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(4);
    textStyle(BOLD);
    text("FIAT", 0, 15);

    // === BUMPER ===
    fill(50);
    stroke(0);
    strokeWeight(2);
    rect(-48, 37, 96, 7, 3);

    // === LICENSE PLATE ===
    fill(255);
    stroke(0);
    rect(-12, 27, 24, 8, 1);
    noStroke();
    fill(0);
    textSize(5);
    text("500-ESA", 0, 31);





    // === MIRRORS ===
    fill(50);
    stroke(0);
    strokeWeight(2);
    rect(-43, -10, 4, 12, 1);
    rect(39, -10, 4, 12, 1);

    fill(150, 200, 230, 180);
    noStroke();


    // === WHEELS ===
    stroke(0);
    strokeWeight(2);
    fill(40);
    arc(-35, 44, 16, 28, 0, PI, CHORD);
    arc(35, 44, 16, 28, 0, PI, CHORD);



    pop();
}


function drawMappleTree(x, y, s) {
    push();  // ← ADD THIS
    translate(x, y);  // ← ADD THIS
    scale(s);  // ← ADD THIS
    // === ROOTS (at the base) ===
    fill(101, 67, 33);
    stroke(60, 40, 20);
    strokeWeight(2);

    // Main visible roots spreading from base
    beginShape();
    vertex(-6, 35); // left side of trunk base
    vertex(-12, 38);
    vertex(-18, 40);
    vertex(-20, 42);
    endShape();

    beginShape();
    vertex(6, 35); // right side of trunk base
    vertex(12, 38);
    vertex(18, 40);
    vertex(20, 42);
    endShape();

    // Center root
    beginShape();
    vertex(-2, 35);
    vertex(-3, 40);
    vertex(-4, 43);
    endShape();

    beginShape();
    vertex(2, 35);
    vertex(3, 40);
    vertex(4, 43);
    endShape();

    // Additional smaller roots for realism
    strokeWeight(1.5);
    line(-6, 35, -10, 41);
    line(6, 35, 10, 41);
    line(-3, 36, -7, 42);
    line(3, 36, 7, 42);

    // Root texture lines
    stroke(80, 50, 25);
    strokeWeight(0.8);
    line(-15, 39, -17, 41);
    line(15, 39, 17, 41);
    line(-10, 39, -12, 40);
    line(10, 39, 12, 40);
    // === TRUNK (realistic with bark texture) ===
    noStroke();

    // Main trunk body with gradient effect
    for (let i = 0; i < 12; i++) {
        let yPos = i * 3;
        let darkness = map(i, 0, 12, 0, 30);
        fill(101 - darkness, 67 - darkness / 2, 33 - darkness / 3);
        rect(-6, yPos, 12, 3);
    }

    // Bark texture - vertical irregular lines
    stroke(70, 45, 25);
    strokeWeight(1.5);
    // Left side bark
    line(-5, 2, -5.5, 10);
    line(-5, 12, -4.5, 22);
    line(-5.5, 24, -5, 33);

    // Right side bark
    line(5, 3, 5.5, 11);
    line(5, 13, 4.5, 21);
    line(5.5, 23, 5, 32);

    // Center bark lines
    line(-1, 0, -1.5, 15);
    line(-1.5, 17, -1, 30);
    line(1, 5, 1.5, 18);
    line(1.5, 20, 1, 34);

    // Bark knots and details
    strokeWeight(1);
    stroke(60, 40, 20);
    noFill();
    ellipse(-3, 12, 4, 3); // bark knot
    ellipse(3, 20, 3, 4);
    ellipse(0, 8, 3, 2);
    ellipse(2, 28, 4, 3);

    // Horizontal bark cracks
    stroke(80, 50, 25);
    strokeWeight(0.8);
    line(-5, 7, -2, 7);
    line(2, 7, 5, 7);
    line(-5, 15, -1, 15);
    line(1, 15, 5, 15);
    line(-5, 25, -2, 25);
    line(2, 25, 5, 25);

    // Shadow side of trunk (left edge)
    fill(70, 45, 25, 100);
    noStroke();
    rect(-6, 0, 2, 35);

    // Highlight side of trunk (right edge)
    fill(130, 90, 50, 80);
    rect(4, 0, 2, 35);
    // === BRANCHES ===
    stroke(80, 50, 25);
    strokeWeight(2);
    line(0, 5, -15, -5);  // left branch
    line(0, 5, 15, -5);   // right branch
    line(0, 0, -10, -15); // upper left
    line(0, 0, 10, -15);  // upper right


    // === MAPLE LEAVES (individual, colored) ===
    noStroke();

    // Draw multiple maple leaves at different positions with different colors
    let leafColors = [
        color(255, 69, 0),    // Red-orange
        color(255, 140, 0),   // Dark orange
        color(255, 215, 0),   // Gold
        color(255, 255, 0),   // Yellow
        color(220, 20, 60),   // Crimson
        color(255, 165, 0)    // Orange
    ];

    // NEW: Fill gap between trunk and leaves (bottom section)
    drawMapleLeaf(-10, 0, 0.7, leafColors[0], -30);
    drawMapleLeaf(10, 0, 0.7, leafColors[1], 30);
    drawMapleLeaf(-8, -3, 0.75, leafColors[2], -20);
    drawMapleLeaf(8, -3, 0.75, leafColors[3], 20);
    drawMapleLeaf(-6, 2, 0.65, leafColors[4], -35);
    drawMapleLeaf(6, 2, 0.65, leafColors[5], 35);
    drawMapleLeaf(0, -2, 0.8, leafColors[0], 5);
    drawMapleLeaf(-12, -5, 0.7, leafColors[1], -25);
    drawMapleLeaf(12, -5, 0.7, leafColors[2], 25);
    drawMapleLeaf(-4, -1, 0.7, leafColors[3], -15);
    drawMapleLeaf(4, -1, 0.7, leafColors[4], 15);
    drawMapleLeaf(0, 1, 0.75, leafColors[5], -8);
    drawMapleLeaf(-7, -6, 0.8, leafColors[0], 18);
    drawMapleLeaf(7, -6, 0.8, leafColors[1], -18);

    // LAYER 1: Background leaves (behind everything)
    drawMapleLeaf(-14, -8, 0.85, leafColors[3], -25);
    drawMapleLeaf(14, -8, 0.85, leafColors[2], 25);
    drawMapleLeaf(-18, -18, 0.9, leafColors[4], 18);
    drawMapleLeaf(18, -18, 0.9, leafColors[5], -18);
    drawMapleLeaf(-10, -25, 0.95, leafColors[1], -12);
    drawMapleLeaf(10, -25, 0.95, leafColors[0], 12);
    drawMapleLeaf(0, -33, 1.0, leafColors[3], 8);

    // LAYER 2: Mid-background filling
    drawMapleLeaf(-8, -10, 0.8, leafColors[5], -15);
    drawMapleLeaf(8, -10, 0.8, leafColors[1], 15);
    drawMapleLeaf(-12, -15, 0.85, leafColors[2], 22);
    drawMapleLeaf(12, -15, 0.85, leafColors[4], -22);
    drawMapleLeaf(-6, -20, 0.9, leafColors[0], -8);
    drawMapleLeaf(6, -20, 0.9, leafColors[3], 8);
    drawMapleLeaf(-4, -28, 0.85, leafColors[5], 14);
    drawMapleLeaf(4, -28, 0.85, leafColors[1], -14);
    drawMapleLeaf(0, -25, 0.95, leafColors[2], -5);

    // LAYER 3: Core center filling
    drawMapleLeaf(-2, -12, 0.75, leafColors[4], 10);
    drawMapleLeaf(2, -12, 0.75, leafColors[0], -10);
    drawMapleLeaf(-5, -16, 0.8, leafColors[3], -18);
    drawMapleLeaf(5, -16, 0.8, leafColors[5], 18);
    drawMapleLeaf(-3, -22, 0.85, leafColors[1], 6);
    drawMapleLeaf(3, -22, 0.85, leafColors[2], -6);
    drawMapleLeaf(-7, -30, 0.9, leafColors[4], -20);
    drawMapleLeaf(7, -30, 0.9, leafColors[0], 20);
    drawMapleLeaf(0, -18, 0.9, leafColors[5], 0);
    drawMapleLeaf(0, -30, 1.0, leafColors[3], 12);

    // LAYER 4: Dense middle section
    drawMapleLeaf(-1, -14, 0.7, leafColors[2], -12);
    drawMapleLeaf(1, -14, 0.7, leafColors[1], 12);
    drawMapleLeaf(-4, -19, 0.75, leafColors[0], 16);
    drawMapleLeaf(4, -19, 0.75, leafColors[4], -16);
    drawMapleLeaf(-2, -24, 0.8, leafColors[5], -9);
    drawMapleLeaf(2, -24, 0.8, leafColors[3], 9);
    drawMapleLeaf(-6, -26, 0.85, leafColors[1], 20);
    drawMapleLeaf(6, -26, 0.85, leafColors[2], -20);
    drawMapleLeaf(0, -21, 0.85, leafColors[4], 4);
    drawMapleLeaf(0, -28, 0.9, leafColors[0], -15);

    // Left side outer leaves
    drawMapleLeaf(-18, -10, 0.8, leafColors[0], -20);
    drawMapleLeaf(-15, -20, 0.9, leafColors[1], 15);
    drawMapleLeaf(-12, -5, 0.7, leafColors[2], -35);
    drawMapleLeaf(-20, -25, 0.85, leafColors[3], 10);
    drawMapleLeaf(-10, -12, 0.75, leafColors[4], -15);
    drawMapleLeaf(-16, -15, 0.8, leafColors[5], 25);

    // Right side outer leaves
    drawMapleLeaf(18, -10, 0.8, leafColors[4], 20);
    drawMapleLeaf(15, -20, 0.9, leafColors[5], -15);
    drawMapleLeaf(12, -5, 0.7, leafColors[0], 35);
    drawMapleLeaf(20, -25, 0.85, leafColors[1], -10);
    drawMapleLeaf(10, -12, 0.75, leafColors[2], 15);
    drawMapleLeaf(16, -15, 0.8, leafColors[3], -25);

    // LAYER 5: Top crown leaves
    drawMapleLeaf(-5, -28, 0.9, leafColors[3], -10);
    drawMapleLeaf(5, -28, 0.9, leafColors[4], 10);
    drawMapleLeaf(0, -35, 1.1, leafColors[5], 5);
    drawMapleLeaf(2, -32, 0.85, leafColors[0], -15);
    drawMapleLeaf(-8, -18, 0.75, leafColors[1], 20);
    drawMapleLeaf(8, -32, 0.8, leafColors[2], -20);

    // LAYER 6: Final fill - very center
    drawMapleLeaf(0, -15, 0.85, leafColors[1], 7);
    drawMapleLeaf(-3, -17, 0.75, leafColors[4], -11);
    drawMapleLeaf(3, -23, 0.8, leafColors[0], 13);
    drawMapleLeaf(0, -27, 0.9, leafColors[5], -3);
    drawMapleLeaf(0, -31, 0.95, leafColors[1], 7);
    drawMapleLeaf(-3, -17, 0.75, leafColors[4], -11);
    drawMapleLeaf(3, -23, 0.8, leafColors[0], 13);
    drawMapleLeaf(0, -27, 0.9, leafColors[5], -3);

    pop();
}

function drawMapleLeaf(x, y, s, col, angle) {
    push();
    translate(x, y);
    rotate(radians(angle)); // Apply rotation angle
    scale(s);
    fill(col);
    stroke(0);
    strokeWeight(0.5);

    // Draw a recognizable maple leaf shape
    beginShape();
    // Center point (bottom of leaf/stem attachment)
    vertex(0, 0);

    // Left side
    vertex(-3, -2);
    vertex(-6, -3);
    vertex(-5, -6);
    vertex(-8, -8);
    vertex(-6, -10);
    vertex(-3, -9);
    vertex(-2, -12);

    // Top point
    vertex(0, -15);

    // Right side (mirror)
    vertex(2, -12);
    vertex(3, -9);
    vertex(6, -10);
    vertex(8, -8);
    vertex(5, -6);
    vertex(6, -3);
    vertex(3, -2);

    endShape(CLOSE);

    // Leaf veins
    stroke(0);
    strokeWeight(0.3);
    line(0, 0, 0, -12);
    line(0, -6, -4, -8);
    line(0, -6, 4, -8);
    line(0, -3, -5, -4);
    line(0, -3, 5, -4);

    pop();
}

function drawFatGuy(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // Slow head movement animation
    let headTilt = sin(frameCount * 0.01) * 8; // Gentle side-to-side
    let headLift = sin(frameCount * 0.008) * 2; // Very subtle up-down

    // === LEGS (shorter with wider quadriceps, very close to body) ===
    fill(40, 50, 80); // Dark blue jeans
    stroke(0);
    strokeWeight(2);

    // Left leg with consistent width from top, closer to center, wider
    beginShape();
    vertex(-18, 80);
    vertex(-30, 80); // Wider at top
    vertex(-34, 100); // Even wider at thigh
    vertex(-30, 130);
    vertex(-12, 130);
    vertex(-6, 80);
    endShape(CLOSE);

    // Right leg with consistent width from top, closer to center, wider
    beginShape();
    vertex(6, 80);
    vertex(12, 130);
    vertex(30, 130);
    vertex(34, 100); // Even wider at thigh
    vertex(30, 80); // Wider at top
    vertex(18, 80);
    endShape(CLOSE);

    // Jeans details - seams
    stroke(30, 40, 60);
    strokeWeight(1);
    line(-12, 85, -21, 128);
    line(12, 85, 21, 128);

    // Pockets
    noFill();
    stroke(30, 40, 60);
    strokeWeight(1.5);
    arc(-20, 92, 10, 12, 0, PI);
    arc(20, 92, 10, 12, 0, PI);

    // Thigh muscle definition
    stroke(30, 40, 60);
    strokeWeight(0.8);
    line(-22, 90, -28, 105);
    line(22, 90, 28, 105);

    // === SHOES ===
    fill(60, 40, 30); // Brown shoes
    stroke(0);
    strokeWeight(2);
    ellipse(-21, 135, 26, 11);
    ellipse(21, 135, 26, 11);

    // Shoe details
    stroke(40, 25, 15);
    strokeWeight(1);
    line(-32, 135, -10, 135);
    line(10, 135, 32, 135);

    // === LARGE BELLY ===
    fill('#1A3D6E'); // Custom blue shirt
    stroke(0);
    strokeWeight(2);

    // Main belly - large ellipse
    ellipse(0, 50, 90, 70);

    // Shirt wrinkles and folds
    noFill();
    stroke(15, 40, 80);
    strokeWeight(1);
    arc(-15, 40, 25, 15, 0, PI);
    arc(15, 45, 20, 12, 0, PI);
    arc(0, 60, 30, 10, 0, PI);

    // Belly button area (subtle)
    stroke(10, 30, 60);
    point(0, 55);

    // === CHEST ===
    fill('#1A3D6E'); // Custom blue
    stroke(0);
    strokeWeight(2);
    ellipse(0, 15, 70, 50);

    // === ARMS ===
    // Left arm
    fill('#1A3D6E'); // Custom blue
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-35, 10);
    vertex(-42, 30);
    vertex(-40, 60);
    vertex(-32, 58);
    vertex(-30, 25);
    endShape(CLOSE);

    // Right arm
    beginShape();
    vertex(35, 10);
    vertex(42, 30);
    vertex(40, 60);
    vertex(32, 58);
    vertex(30, 25);
    endShape(CLOSE);

    // Shirt sleeves detail
    stroke(15, 40, 80);
    strokeWeight(1);
    line(-35, 15, -38, 35);
    line(35, 15, 38, 35);

    // === HANDS ===
    fill(245, 215, 190); // Skin tone
    stroke(0);
    strokeWeight(2);
    ellipse(-36, 65, 12, 14);
    ellipse(36, 65, 12, 14);

    // Fingers suggestion
    stroke(200, 170, 150);
    strokeWeight(0.8);
    line(-38, 68, -38, 72);
    line(-36, 69, -36, 73);
    line(-34, 68, -34, 72);
    line(34, 68, 34, 72);
    line(36, 69, 36, 73);
    line(38, 68, 38, 72);

    // === NECK ===
    fill(245, 215, 190);
    stroke(0);
    strokeWeight(2);
    rect(-8, -5, 16, 15);

    // Neck shadow/fold
    noStroke();
    fill(220, 190, 170, 100);
    ellipse(0, 8, 14, 4);

    // === HEAD (with animation) ===
    push();
    translate(headTilt * 0.3, headLift);
    rotate(radians(headTilt * 0.5));

    // === EARS BEHIND HEAD ===
    fill(235, 205, 180);
    stroke(0);
    strokeWeight(2);
    ellipse(-20, -20, 10, 14);
    ellipse(20, -20, 10, 14);

    // Inner ear
    fill(220, 190, 170);
    noStroke();
    ellipse(-20, -20, 5, 7);
    ellipse(20, -20, 5, 7);

    // Back of head
    fill(245, 215, 190);
    stroke(0);
    strokeWeight(2);
    ellipse(0, -25, 45, 50);

    // === HAIR ===
    fill(80, 70, 60); // Brown hair
    stroke(0);
    strokeWeight(2);

    // Hair as irregular shape on top
    beginShape();
    vertex(-18, -48);
    vertex(-10, -50);
    vertex(-2, -49);
    vertex(5, -50);
    vertex(12, -49);
    vertex(18, -47);
    vertex(22, -40);
    vertex(22, -35);
    vertex(-22, -35);
    vertex(-22, -40);
    endShape(CLOSE);

    // Hair texture strands
    stroke(60, 50, 40);
    strokeWeight(1);
    line(-15, -48, -15, -40);
    line(-8, -49, -8, -38);
    line(-2, -48, -2, -37);
    line(4, -49, 4, -38);
    line(10, -48, 10, -39);
    line(16, -47, 16, -38);

    // Receding hairline details
    noFill();
    stroke(200, 170, 150);
    strokeWeight(0.8);
    arc(-12, -40, 8, 6, PI, TWO_PI);
    arc(12, -40, 8, 6, PI, TWO_PI);

    // === NO FACE (as requested) ===
    // Head is tilted upward looking at sky
    // Just add some shadow to show depth
    noStroke();
    fill(0, 0, 0, 20);
    ellipse(0, -22, 35, 38);

    pop(); // End head transformation

    // === SHIRT BUTTONS ===
    fill(240, 240, 240);
    stroke(0);
    strokeWeight(1);
    ellipse(0, 12, 4, 4);
    ellipse(0, 22, 4, 4);
    ellipse(0, 35, 4, 4);
    ellipse(0, 48, 4, 4);

    // Button holes
    stroke(100);
    strokeWeight(0.5);
    line(-1, 12, 1, 12);
    line(-1, 22, 1, 22);
    line(-1, 35, 1, 35);
    line(-1, 48, 1, 48);

    pop();
}

function drawChevrolet(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === WINDSHIELD ===
    fill(150, 200, 230, 200);
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-45, -30);  // top-left of windshield
    vertex(45, -30);   // top-right of windshield
    vertex(50, 0);     // bottom-right
    vertex(-50, 0);    // bottom-left
    endShape(CLOSE);

    // === ROOF (more angular, classic muscle car style) ===
    fill(20, 20, 20); // Black car
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-45, -30);
    vertex(-40, -50);
    vertex(40, -50);
    vertex(45, -30);
    endShape(CLOSE);

    // Roof detail line
    stroke(40);
    strokeWeight(1);
    line(-42, -40, 42, -40);

    // Wiper
    stroke(40);
    strokeWeight(1.5);
    line(-20, -12, 10, -10);

    // === HOOD (muscular, longer) ===
    fill(30, 30, 30); // Slightly lighter black
    stroke(0);
    strokeWeight(2);
    rect(-55, 0, 110, 50, 5);

    // Hood scoops/vents (classic muscle car feature)
    fill(15, 15, 15);
    rect(-20, 10, 15, 25, 2);
    rect(5, 10, 15, 25, 2);

    // Hood center line
    stroke(50);
    strokeWeight(1.5);
    line(0, 2, 0, 48);

    // Hood side lines
    line(-40, 5, -40, 45);
    line(40, 5, 40, 45);

    // === HEADLIGHTS (rectangular, classic Chevy style) ===
    fill(255, 255, 200);
    stroke(0);
    strokeWeight(2);
    rect(-48, 8, 18, 12, 2);
    rect(30, 8, 18, 12, 2);

    // Headlight details
    stroke(220, 220, 180);
    strokeWeight(1);
    line(-46, 10, -46, 18);
    line(32, 10, 32, 18);

    // === GRILL (iconic Chevy bow-tie grill) ===
    fill(180, 180, 180); // Chrome grill
    stroke(0);
    strokeWeight(2);
    rect(-25, 25, 50, 20, 3);

    // Grill horizontal bars
    stroke(100);
    strokeWeight(1.5);
    for (let i = 1; i < 5; i++) {
        line(-23, 25 + i * 4, 23, 25 + i * 4);
    }

    // === CHEVY BOW-TIE LOGO ===
    fill(220, 180, 0); // Gold bow-tie
    stroke(0);
    strokeWeight(1.5);
    beginShape();
    vertex(-8, 30);
    vertex(0, 28);
    vertex(8, 30);
    vertex(10, 35);
    vertex(8, 40);
    vertex(0, 42);
    vertex(-8, 40);
    vertex(-10, 35);
    endShape(CLOSE);

    // Bow-tie cross detail
    stroke(180, 140, 0);
    strokeWeight(1);
    line(-6, 32, 6, 38);
    line(6, 32, -6, 38);

    // === BUMPER (chrome) ===
    fill(150, 150, 150);
    stroke(0);
    strokeWeight(2);
    rect(-58, 47, 116, 10, 4);

    // Bumper highlights
    stroke(200, 200, 200);
    strokeWeight(1);
    line(-55, 49, 55, 49);

    // === LICENSE PLATE ===
    fill(255);
    stroke(0);
    strokeWeight(1.5);
    rect(-15, 35, 30, 10, 1);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(6);
    text("CHEVY", 0, 40);

    // === SIDE MIRRORS ===
    fill(30, 30, 30);
    stroke(0);
    strokeWeight(2);
    rect(-55, -12, 5, 14, 1);
    rect(50, -12, 5, 14, 1);

    fill(150, 200, 230, 180);
    noStroke();
    ellipse(-52, -5, 8, 10);
    ellipse(52, -5, 8, 10);

    // === WHEELS (bigger, muscle car wheels) ===
    stroke(0);
    strokeWeight(2);
    fill(40);
    arc(-42, 57, 24, 35, 0, PI, CHORD);
    arc(42, 57, 24, 35, 0, PI, CHORD);



    pop();
}















function drawIShowSpeed(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // Use runPhase for synchronized animation with player
    let legOffset = 45 * sin(runPhase + PI);
    let armOffset = 30 * sin(runPhase);
    let torsoTremble = sin(runPhase * 4) * 0.5;
    let headsetTremble = sin(runPhase * 1.1) * 0.8;
    let trembleX = sin(runPhase * 0.8) * 1.5;
    let trembleY = sin(runPhase * 0.8) * 1;

    rectMode(CENTER);
    ellipseMode(CENTER);

    push();
    translate(trembleX, trembleY);

    stroke(0);
    strokeWeight(3);



    // ================================
    // LEGS & SHOES
    // ================================
    fill(170, 50, 80);
    strokeWeight(2);

    rect(-10, 20 + legOffset / 2, 15, 40, 4); // left leg
    rect(10, 20 - legOffset / 2, 15, 40, 4); // right leg

    fill(50);
    rect(-10, 40 + legOffset / 2, 15, 10, 2); // left shoe
    rect(10, 40 - legOffset / 2, 15, 10, 2); // right shoe

    // ================================
    // TORSO - PORTUGAL JERSEY
    // ================================
    fill(255, 255, 255); // Red Portugal color
    strokeWeight(3);
    rect(0, -15 + torsoTremble, 30, 55, 8);

    // Jersey stripes
    stroke(150, 10, 10);
    strokeWeight(1);
    line(-12, -60 + torsoTremble, -12, 8 + torsoTremble);
    line(12, -60 + torsoTremble, 12, 8 + torsoTremble);

    // CR7 jersey number
    fill(255);
    stroke(0);
    strokeWeight(1.5);
    textSize(20);
    textAlign(CENTER);
    text("7", 0, -16 + torsoTremble);

    // Portugal coat of arms (simplified)
    fill(255, 215, 0); // Gold
    noStroke();
    ellipse(0, -29 + torsoTremble, 10, 6);

    // ================================
    // ARMS
    // ================================
    fill(120, 80, 60);
    stroke(0);
    strokeWeight(2);

    // Left arm
    beginShape();
    vertex(-28, -30);
    vertex(-32, -28);
    vertex(-32, -30 + armOffset);
    vertex(-28, -32 + armOffset);
    endShape(CLOSE);

    // Right arm
    beginShape();
    vertex(28, -30);
    vertex(32, -28);
    vertex(32, -30 - armOffset);
    vertex(28, -32 - armOffset);
    endShape(CLOSE)

    // ================================
    // HEAD (SLIGHTLY SMALLER FOR DEPTH)
    // ================================
    fill(120, 80, 60);
    stroke(0);
    strokeWeight(2.5);
    ellipse(0, -65, 42, 50);  // smaller head

    // Hair cap
    fill(15, 10, 8);
    stroke(0);
    strokeWeight(2);
    ellipse(0, -68, 45, 45);

    // Minimal locks (simplified since facing away)
    for (let i = -15; i <= 15; i += 10) {
        stroke(0);
        strokeWeight(3);
        line(i, -60, i + sin(frameCount * 0.1 + i) * 13, -40);
    }



    pop();
    pop();

    // Update running animation
    runPhase += 0.2;
}


function drawWomanBiking(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // Use runPhase for synchronized animation (same as IShowSpeed)
    let pedalAngle = runPhase * 1;
    let legOffset = 25 * sin(pedalAngle);
    let legOffset2 = 25 * sin(pedalAngle + PI);
    let armOffset = 1 * sin(pedalAngle);
    let torsoTremble = sin(pedalAngle * 4) * 0.5;
    let trembleX = sin(pedalAngle * 0.8) * 1.5;
    let trembleY = sin(pedalAngle * 0.8) * 1;

    rectMode(CENTER);
    ellipseMode(CENTER);

    push();
    translate(trembleX, trembleY);

    stroke(0);
    strokeWeight(3);

    // === BICYCLE BACK WHEEL (fixed perspective) ===
    push();
    translate(0, 50); // center of wheel

    stroke(0);
    strokeWeight(8);
    noFill();
    ellipse(0, 0, 9, 80);

    pop();

    // Frame (back view, simplified) - ADJUSTED FOR HIGHER SEAT
    strokeWeight(3);
    line(0, 50, 0, -10); // seat tube (vertical) - extended up
    line(0, -10, -15, -10); // left seat stay
    line(0, -10, 15, -10); // right seat stay

    // Seat (back view) - RAISED HIGHER
    fill(40);
    stroke(0);
    strokeWeight(2);
    ellipse(0, -10, 30, 52);

    // Handlebars (just grips visible from back)
    strokeWeight(2);
    line(-25, -8, -35, -10);
    line(25, -8, 35, -10);
    fill(80);
    ellipse(-35, -10, 10, 10);
    ellipse(35, -10, 10, 10);

    // Pedals (bottom bracket area)
    strokeWeight(2);
    let pedalY = 30 + cos(pedalAngle) * 20;
    let pedalY2 = 30 + cos(pedalAngle + PI) * 20;

    // Left pedal
    fill(60);
    push();
    translate(-15, pedalY);
    rotate(pedalAngle);
    rect(0, 0, 20, 8, 2);
    pop();

    // Right pedal
    push();
    translate(15, pedalY2);
    rotate(pedalAngle + PI);
    rect(0, 0, 20, 8, 2);
    pop();

    // === LEGS (back view, pedaling motion) - ADJUSTED FOR LONGER SHIRT ===
    fill(60, 90, 140); // Blue jeans
    stroke(0);
    strokeWeight(2);

    // Left leg
    beginShape();
    vertex(-12, 5); // hip - adjusted to new shirt bottom
    vertex(-18, 5);
    vertex(-20, pedalY);
    vertex(-10, pedalY);
    vertex(-8, 5);
    endShape(CLOSE);

    // Right leg
    beginShape();
    vertex(8, 5);
    vertex(10, pedalY2);
    vertex(20, pedalY2);
    vertex(18, 5);
    vertex(12, 5);
    endShape(CLOSE);

    // Shoes (back view)
    fill(255, 255, 255); // White sneakers
    stroke(0);
    strokeWeight(2);
    ellipse(-15, pedalY + 8, 22, 12);
    ellipse(15, pedalY2 + 8, 22, 12);

    // Shoe soles
    fill(100);
    ellipse(-15, pedalY + 10, 18, 6);
    ellipse(15, pedalY2 + 10, 18, 6);

    // === TORSO (back view) - LONGER SHIRT ===
    fill(255, 120, 150); // Pink athletic top
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-25, 5); // Extended downward
    vertex(-22, -40); // Extended upward
    vertex(22, -40);
    vertex(25, 5); // Extended downward
    endShape(CLOSE);

    // Sports bra strap across back
    stroke(230, 100, 130);
    strokeWeight(2);
    line(-20, -35, 20, -35);

    // === ARMS (reaching forward to handlebars) - ADJUSTED FOR TALLER TORSO ===
    fill(245, 215, 190); // Skin tone
    stroke(0);
    strokeWeight(2);

    // Left arm
    beginShape();
    vertex(-22, -35);
    vertex(-24, -33);
    vertex(-32, -12 + armOffset);
    vertex(-36, -10 + armOffset);
    vertex(-34, -8 + armOffset);
    vertex(-20, -32);
    endShape(CLOSE);

    // Right arm
    beginShape();
    vertex(22, -35);
    vertex(24, -33);
    vertex(32, -12 - armOffset);
    vertex(36, -10 - armOffset);
    vertex(34, -8 - armOffset);
    vertex(20, -32);
    endShape(CLOSE);

    // Hands on grips
    fill(245, 215, 190);
    stroke(0);
    strokeWeight(2);
    ellipse(-35, -10 + armOffset, 14, 12);
    ellipse(35, -10 - armOffset, 14, 12);

    // === NECK (back view) - ADJUSTED FOR TALLER TORSO ===
    fill(245, 215, 190);
    stroke(0);
    strokeWeight(2);
    rect(0, -45, 14, 10);

    // === HEAD (BACK VIEW - NO FACE) - ADJUSTED FOR TALLER TORSO ===
    fill(245, 215, 190);
    stroke(0);
    strokeWeight(2.5);
    ellipse(0, -60, 40, 45);

    // === HAIR (flowing back from motion) - ADJUSTED FOR TALLER TORSO ===
    fill(70, 45, 30); // Brown hair
    stroke(0);
    strokeWeight(2);

    // Hair on head (back view)
    ellipse(0, -62, 42, 35);

    // Ponytail flowing backward dramatically
    push();
    let ponytailSway = sin(pedalAngle * 2) * 3;
    translate(ponytailSway, 0);

    beginShape();
    vertex(-8, -50);
    vertex(-12, -45);
    vertex(-15, -35);
    vertex(-12, -25);
    vertex(-8, -20);
    vertex(0, -18);
    vertex(8, -20);
    vertex(12, -25);
    vertex(15, -35);
    vertex(12, -45);
    vertex(8, -50);
    vertex(0, -52);
    endShape(CLOSE);

    // Hair strands in ponytail (flowing back)
    stroke(50, 30, 20);
    strokeWeight(1.5);
    for (let i = -10; i <= 10; i += 5) {
        line(i * 0.8, -48, i * 1.2 + sin(frameCount * 0.1 + i) * 2, -22);
    }

    // Hair tie
    fill(255, 120, 150);
    stroke(0);
    strokeWeight(2);
    ellipse(0, -52, 12, 8);

    pop(); // End ponytail transform

    // Hair strands at sides
    stroke(70, 45, 30);
    strokeWeight(2);
    noFill();
    arc(-15, -60, 12, 20, PI / 2, PI);
    arc(15, -60, 12, 20, 0, PI / 2);

    pop(); // End tremble transform
    pop(); // End main transform
}




function drawOrangeTree(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === ROOTS (at the base) ===
    fill(101, 67, 33);
    stroke(60, 40, 20);
    strokeWeight(2);

    // Main visible roots spreading from base
    beginShape();
    vertex(-6, 35);
    vertex(-12, 38);
    vertex(-18, 40);
    vertex(-20, 42);
    endShape();

    beginShape();
    vertex(6, 35);
    vertex(12, 38);
    vertex(18, 40);
    vertex(20, 42);
    endShape();

    // Center roots
    beginShape();
    vertex(-2, 35);
    vertex(-3, 40);
    vertex(-4, 43);
    endShape();

    beginShape();
    vertex(2, 35);
    vertex(3, 40);
    vertex(4, 43);
    endShape();

    // Additional smaller roots
    strokeWeight(1.5);
    line(-6, 35, -10, 41);
    line(6, 35, 10, 41);
    line(-3, 36, -7, 42);
    line(3, 36, 7, 42);

    // Root texture lines
    stroke(80, 50, 25);
    strokeWeight(0.8);
    line(-15, 39, -17, 41);
    line(15, 39, 17, 41);
    line(-10, 39, -12, 40);
    line(10, 39, 12, 40);

    // === TRUNK (realistic with bark texture) ===
    noStroke();

    // Main trunk with gradient
    for (let i = 0; i < 12; i++) {
        let yPos = i * 3;
        let darkness = map(i, 0, 12, 0, 30);
        fill(101 - darkness, 67 - darkness / 2, 33 - darkness / 3);
        rect(-6, yPos, 12, 3);
    }

    // Bark texture - vertical lines
    stroke(70, 45, 25);
    strokeWeight(1.5);
    line(-5, 2, -5.5, 10);
    line(-5, 12, -4.5, 22);
    line(-5.5, 24, -5, 33);

    line(5, 3, 5.5, 11);
    line(5, 13, 4.5, 21);
    line(5.5, 23, 5, 32);

    line(-1, 0, -1.5, 15);
    line(-1.5, 17, -1, 30);
    line(1, 5, 1.5, 18);
    line(1.5, 20, 1, 34);

    // Bark knots
    strokeWeight(1);
    stroke(60, 40, 20);
    noFill();
    ellipse(-3, 12, 4, 3);
    ellipse(3, 20, 3, 4);
    ellipse(0, 8, 3, 2);
    ellipse(2, 28, 4, 3);

    // Horizontal bark cracks
    stroke(80, 50, 25);
    strokeWeight(0.8);
    line(-5, 7, -2, 7);
    line(2, 7, 5, 7);
    line(-5, 15, -1, 15);
    line(1, 15, 5, 15);
    line(-5, 25, -2, 25);
    line(2, 25, 5, 25);

    // Shadow and highlight on trunk
    fill(70, 45, 25, 100);
    noStroke();
    rect(-6, 0, 2, 35);

    fill(130, 90, 50, 80);
    rect(4, 0, 2, 35);

    // === BRANCHES ===
    stroke(80, 50, 25);
    strokeWeight(2);
    line(0, 5, -15, -5);
    line(0, 5, 15, -5);
    line(0, 0, -10, -15);
    line(0, 0, 10, -15);

    // === GREEN LEAVES (dense foliage) ===
    noStroke();

    // Multiple shades of green for depth
    let leafGreen1 = color(34, 139, 34);   // Forest green
    let leafGreen2 = color(50, 205, 50);   // Lime green
    let leafGreen3 = color(60, 179, 113);  // Medium sea green
    let leafGreen4 = color(46, 125, 50);   // Dark green
    let leafGreen5 = color(76, 175, 80);   // Light green

    // LAYER 1: Background leaves
    fill(leafGreen4);
    ellipse(-16, -10, 20, 15);
    ellipse(16, -10, 20, 15);
    ellipse(-18, -20, 22, 18);
    ellipse(18, -20, 22, 18);
    ellipse(-12, -28, 24, 20);
    ellipse(12, -28, 24, 20);
    ellipse(0, -32, 26, 22);

    // LAYER 2: Mid-depth leaves
    fill(leafGreen3);
    ellipse(-14, -8, 18, 14);
    ellipse(14, -8, 18, 14);
    ellipse(-10, -15, 20, 16);
    ellipse(10, -15, 20, 16);
    ellipse(-8, -22, 22, 18);
    ellipse(8, -22, 22, 18);
    ellipse(-4, -28, 20, 16);
    ellipse(4, -28, 20, 16);
    ellipse(0, -25, 24, 20);

    // LAYER 3: Core foliage
    fill(leafGreen1);
    ellipse(-12, -12, 16, 14);
    ellipse(12, -12, 16, 14);
    ellipse(-6, -18, 18, 16);
    ellipse(6, -18, 18, 16);
    ellipse(0, -20, 20, 18);
    ellipse(-3, -26, 18, 16);
    ellipse(3, -26, 18, 16);
    ellipse(0, -30, 22, 20);

    // LAYER 4: Dense center
    fill(leafGreen2);
    ellipse(-8, -10, 14, 12);
    ellipse(8, -10, 14, 12);
    ellipse(-4, -15, 16, 14);
    ellipse(4, -15, 16, 14);
    ellipse(0, -17, 18, 16);
    ellipse(-2, -23, 16, 14);
    ellipse(2, -23, 16, 14);

    // LAYER 5: Top highlights
    fill(leafGreen5);
    ellipse(-5, -8, 12, 10);
    ellipse(5, -8, 12, 10);
    ellipse(0, -12, 14, 12);
    ellipse(-3, -20, 13, 11);
    ellipse(3, -20, 13, 11);
    ellipse(0, -28, 16, 14);

    // LAYER 6: Final fill gaps
    fill(leafGreen1);
    ellipse(-10, -5, 10, 8);
    ellipse(10, -5, 10, 8);
    ellipse(0, -8, 12, 10);
    ellipse(-6, -24, 12, 10);
    ellipse(6, -24, 12, 10);

    // === ORANGES ===
    stroke(0);
    strokeWeight(1);

    // Multiple oranges scattered throughout tree
    // Bottom layer oranges
    fill(255, 140, 0); // Orange color
    ellipse(-12, -8, 8, 8);
    ellipse(10, -10, 7, 7);
    ellipse(-8, -6, 6, 6);

    // Mid layer oranges
    ellipse(-14, -16, 8, 8);
    ellipse(12, -18, 7, 7);
    ellipse(-4, -14, 7, 7);
    ellipse(6, -12, 6, 6);

    // Upper layer oranges
    ellipse(-10, -24, 7, 7);
    ellipse(8, -26, 6, 6);
    ellipse(0, -22, 8, 8);
    ellipse(-6, -20, 6, 6);

    // Top oranges
    ellipse(-3, -28, 6, 6);
    ellipse(4, -30, 7, 7);

    // Orange highlights (to make them look round/3D)
    noStroke();
    fill(255, 180, 0, 150);
    ellipse(-12, -9, 3, 3);
    ellipse(10, -11, 2, 2);
    ellipse(-14, -17, 3, 3);
    ellipse(12, -19, 2, 2);
    ellipse(-10, -25, 2, 2);
    ellipse(0, -23, 3, 3);
    ellipse(4, -31, 2, 2);

    // Orange stems (small brown dots)
    fill(80, 50, 25);
    ellipse(-12, -10, 2, 2);
    ellipse(10, -12, 1.5, 1.5);
    ellipse(-14, -18, 2, 2);
    ellipse(12, -20, 1.5, 1.5);
    ellipse(-10, -26, 1.5, 1.5);
    ellipse(0, -24, 2, 2);

    pop();
}

function drawCitrus(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === SHADOW ===
    noStroke();
    fill(0, 0, 0, 60);
    ellipse(0, 55, 80, 20);

    // === MAIN ORANGE BODY ===
    stroke(0);
    strokeWeight(2);

    // Create gradient effect with multiple circles
    for (let r = 45; r > 0; r -= 3) {
        let brightness = map(r, 0, 45, 200, 255);
        let orangeShade = map(r, 0, 45, 180, 255);
        noStroke();
        fill(orangeShade, brightness * 0.5, 0);
        ellipse(-8, -8, r * 2, r * 2);
    }

    // Main orange outline
    stroke(0);
    strokeWeight(2);
    noFill();
    ellipse(-8, -8, 90, 90);


    // === HIGHLIGHT (makes it look round and shiny) ===
    noStroke();
    fill(255, 255, 200, 150);
    ellipse(-20, -20, 25, 20);

    fill(255, 255, 200, 80);
    ellipse(-18, -18, 35, 28);

    // === STEM AREA (top indentation) ===
    fill(139, 90, 43);
    stroke(0);
    strokeWeight(2);
    ellipse(-8, -52, 10, 8);

    // === STEM ===
    fill(101, 67, 33);
    stroke(0);
    strokeWeight(2);
    rect(-10, -62, 4, 12);

    // === LEAF ===
    fill(34, 139, 34);
    stroke(0);
    strokeWeight(1.5);
    beginShape();
    vertex(-5, -65);
    bezierVertex(-5, -75, 10, -75, 15, -65);
    bezierVertex(10, -70, 0, -70, -5, -65);
    endShape(CLOSE);

    // Leaf vein
    stroke(20, 100, 20);
    strokeWeight(1);
    line(5, -65, 7, -72);

    // === DARKER SHADING (bottom) ===
    noStroke();
    fill(200, 100, 0, 60);
    ellipse(-8, 10, 70, 30);

    pop();
}
function drawHamburger(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === SHADOW ===
    noStroke();
    fill(0, 0, 0, 50);
    ellipse(0, 45, 140, 25);

    // === BOTTOM BUN ===
    fill(210, 170, 100);
    stroke(0);
    strokeWeight(2);

    // Bottom bun shape
    arc(0, 30, 120, 40, 0, PI, CHORD);

    // === PATTY ===
    fill(100, 60, 40);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 20, 110, 18);

    // Patty char marks
    stroke(60, 40, 20);
    strokeWeight(1.5);
    line(-30, 17, -25, 23);
    line(-15, 15, -10, 21);
    line(0, 16, 5, 22);
    line(15, 15, 20, 21);
    line(30, 17, 35, 23);



    // === CHEESE ===
    fill(255, 200, 50);
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-60, 12);
    vertex(60, 12);
    vertex(55, 16);
    vertex(-55, 16);
    endShape(CLOSE);

    // Cheese holes
    fill(230, 180, 40);
    noStroke();
    ellipse(-25, 14, 4, 3);
    ellipse(-10, 13, 3, 2);
    ellipse(15, 14, 4, 3);
    ellipse(35, 13, 3, 2);

    // === LETTUCE ===
    fill(100, 180, 80);
    stroke(0);
    strokeWeight(2);
    noFill();

    // Wavy lettuce edges
    beginShape();
    vertex(-55, 10);
    bezierVertex(-45, 5, -35, 13, -25, 8);
    bezierVertex(-15, 3, -5, 11, 5, 7);
    bezierVertex(15, 3, 25, 12, 35, 8);
    bezierVertex(45, 4, 55, 11, 58, 10);
    endShape();

    beginShape();
    vertex(-55, 7);
    bezierVertex(-40, 12, -30, 5, -20, 10);
    bezierVertex(-10, 13, 0, 6, 10, 11);
    bezierVertex(20, 14, 30, 7, 40, 12);
    bezierVertex(50, 8, 58, 12, 58, 10);
    endShape();

    // Fill lettuce
    fill(100, 180, 80, 200);
    noStroke();
    ellipse(-35, 9, 25, 8);
    ellipse(-10, 8, 30, 8);
    ellipse(15, 9, 28, 8);
    ellipse(40, 8, 20, 8);

    // === TOMATO SLICES ===
    fill(220, 60, 50);
    stroke(0);
    strokeWeight(2);
    ellipse(-28, 3, 28, 8);
    ellipse(5, 2, 30, 8);
    ellipse(32, 3, 26, 8);

    // Tomato seeds
    fill(200, 180, 160);
    noStroke();
    ellipse(-30, 2, 2, 1);
    ellipse(-26, 3, 1.5, 1);
    ellipse(3, 1, 2, 1);
    ellipse(7, 2, 1.5, 1);
    ellipse(30, 2, 2, 1);
    ellipse(34, 3, 1.5, 1);

    // === TOP BUN ===
    fill(200, 160, 90);
    stroke(0);
    strokeWeight(2);

    // Top bun main shape - moved down and made taller
    arc(0, 1, 120, 60, PI, TWO_PI, CHORD);


    // Bun highlight
    noStroke();
    fill(220, 190, 120, 150);
    ellipse(-15, -15, 30, 15);

    // === SESAME SEEDS ===
    fill(245, 235, 200);
    stroke(0);
    strokeWeight(0.5);

    // Random sesame seeds on top
    ellipse(-30, -12, 3, 4);
    ellipse(-20, -16, 2.5, 3.5);
    ellipse(-8, -18, 3, 4);
    ellipse(5, -17, 2.5, 3.5);
    ellipse(15, -16, 3, 4);
    ellipse(25, -13, 2.5, 3.5);
    ellipse(35, -10, 3, 4);
    ellipse(-15, -18, 2.5, 3.5);
    ellipse(10, -16, 3, 4);
    ellipse(-35, -18, 2.5, 3.5);
    ellipse(0, -19, 3, 4);
    ellipse(30, -18, 2.5, 3.5);



    pop();
}


function drawMapleSyrupBottle(x, y, s) {
    push();
    translate(x, y);
    scale(s);

    // === SHADOW ===
    noStroke();
    fill(0, 0, 0, 60);
    ellipse(0, 95, 60, 15);

    // === BOTTLE BODY (glass with syrup inside) ===

    // Outer glass bottle shape
    stroke(0);
    strokeWeight(2);
    fill(240, 245, 250, 100); // Light glass color

    // Main bottle body
    beginShape();
    vertex(-25, 80);
    vertex(-25, 20);
    vertex(-20, 10);
    vertex(-20, -20);
    vertex(20, -20);
    vertex(20, 10);
    vertex(25, 20);
    vertex(25, 80);
    endShape(CLOSE);

    // === SYRUP INSIDE (amber/brown color) ===
    noStroke();
    fill(150, 80, 20, 200); // Dark amber syrup
    beginShape();
    vertex(-23, 78);
    vertex(-23, 22);
    vertex(-18, 12);
    vertex(-18, -18);
    vertex(18, -18);
    vertex(18, 12);
    vertex(23, 22);
    vertex(23, 78);
    endShape(CLOSE);

    // Syrup gradient (lighter at top for realism)
    fill(180, 100, 30, 150);
    beginShape();
    vertex(-23, 78);
    vertex(-23, 40);
    vertex(23, 40);
    vertex(23, 78);
    endShape(CLOSE);

    // === GLASS HIGHLIGHTS (to show it's glass) ===
    noStroke();
    fill(255, 255, 255, 120);

    // Left highlight
    beginShape();
    vertex(-22, 70);
    vertex(-20, 30);
    vertex(-18, 30);
    vertex(-20, 70);
    endShape(CLOSE);

    // Right highlight
    fill(255, 255, 255, 80);
    beginShape();
    vertex(18, 60);
    vertex(20, 25);
    vertex(22, 25);
    vertex(20, 60);
    endShape(CLOSE);

    // === BOTTLE NECK ===
    stroke(0);
    strokeWeight(2);
    fill(240, 245, 250, 150);
    rect(-15, -30, 30, 10);

    // Neck threads (screw top)
    stroke(200, 210, 220);
    strokeWeight(1);
    line(-15, -27, 15, -27);
    line(-15, -24, 15, -24);
    line(-15, -21, 15, -21);

    // === CAP ===
    fill(180, 50, 50); // Red cap
    stroke(0);
    strokeWeight(2);

    // Cap main body
    beginShape();
    vertex(-18, -50);
    vertex(-16, -30);
    vertex(16, -30);
    vertex(18, -50);
    vertex(18, -52);
    vertex(-18, -52);
    endShape(CLOSE);

    // Cap top
    ellipse(0, -50, 36, 10);

    // Cap ridges for grip
    stroke(150, 40, 40);
    strokeWeight(1);
    for (let i = -15; i <= 15; i += 3) {
        line(i, -49, i, -32);
    }

    // Cap highlight
    noStroke();
    fill(220, 80, 80, 150);
    ellipse(-8, -48, 12, 4);

    // === LABEL ===
    fill(210, 180, 140); // Tan/beige label
    stroke(0);
    strokeWeight(2);

    // Main label rectangle
    rect(-22, 0, 44, 40);

    // Label border decoration
    noFill();
    stroke(160, 120, 80);
    strokeWeight(1.5);
    rect(-20, 2, 40, 36);

    // === MAPLE LEAF ON LABEL ===
    fill(200, 50, 50); // Red maple leaf
    stroke(0);
    strokeWeight(1);

    push();
    translate(0, 20);
    scale(0.6);

    // Maple leaf shape
    beginShape();
    vertex(0, 0);
    vertex(-3, -2);
    vertex(-6, -3);
    vertex(-5, -6);
    vertex(-8, -8);
    vertex(-6, -10);
    vertex(-3, -9);
    vertex(-2, -12);
    vertex(0, -15);
    vertex(2, -12);
    vertex(3, -9);
    vertex(6, -10);
    vertex(8, -8);
    vertex(5, -6);
    vertex(6, -3);
    vertex(3, -2);
    endShape(CLOSE);

    // Leaf veins
    stroke(150, 30, 30);
    strokeWeight(0.5);
    line(0, 0, 0, -12);
    line(0, -6, -4, -8);
    line(0, -6, 4, -8);
    pop();

    // === LABEL TEXT ===
    fill(100, 50, 20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(7);
    textStyle(BOLD);
    text("PURE", 0, 5);

    textSize(6);
    text("MAPLE", 0, 26);
    text("SYRUP", 0, 34);

    // === BOTTOM BASE ===
    stroke(0);
    strokeWeight(2);
    fill(240, 245, 250, 100);
    ellipse(0, 80, 50, 12);

    // Glass shine on bottom
    noStroke();
    fill(255, 255, 255, 100);
    ellipse(-8, 78, 15, 4);

    pop();
}
function drawBear(x, y, s, runPhase = 0) {
    push();
    translate(x, y);
    scale(s);

    // === ANIMATION VARIABLES ===
    let legSwing = sin(runPhase) * 12;
    let armSwing = sin(runPhase + PI) * 12;
    let bounce = sin(runPhase * 2) * 2;
    let reachAmount = sin(frameCount * 0.05) * 8;

    // === EYE TRACKING CALCULATION ===
    let eyeLookX = 0;
    let eyeLookY = 0;

    if (typeof player !== 'undefined') {
        let dx = player.x - x;
        let dy = (player.renderY || player.y) - y;
        let distance = sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            eyeLookX = constrain((dx / distance) * 3, -13, 3);
            eyeLookY = constrain((dy / distance) * 2, -12, 2);
        }
    }

    translate(0, bounce);

    // === BACK LEGS ===
    fill(100, 70, 40);
    stroke(0);
    strokeWeight(2);

    // Left back leg
    ellipse(-30 + legSwing, 80, 30, 45);
    // Right back leg
    ellipse(30 - legSwing, 80, 30, 45);

    // Paw pads on back legs
    fill(80, 50, 30);
    noStroke();
    ellipse(-30 + legSwing, 95, 22, 14);
    ellipse(30 - legSwing, 95, 22, 14);

    // === BODY ===
    fill(110, 75, 45);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 40, 90, 100);

    // Belly patch (lighter color)
    fill(130, 95, 65);
    noStroke();
    ellipse(0, 50, 60, 70);

    // === FRONT LEFT ARM (reaching toward player) ===
    push();
    translate(-40, 40 + armSwing * 0.4);
    rotate(radians(armSwing * 0.8 + reachAmount * 0.5));

    // Left arm
    fill(100, 70, 40);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, 25, 45);

    // Left paw
    fill(80, 50, 30);
    ellipse(0, 20, 18, 16);

    // Left claws
    stroke(40, 30, 25);
    strokeWeight(1.5);
    line(-6, 25, -8, 30);
    line(-2, 26, -2, 32);
    line(2, 26, 2, 32);
    line(6, 25, 8, 30);
    pop();

    // === FRONT RIGHT ARM (reaching toward player) ===
    push();
    translate(40, 40 - armSwing * 0.4);
    rotate(radians(-armSwing * 0.8 - reachAmount * 0.5));

    // Right arm
    fill(100, 70, 40);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, 25, 45);

    // Right paw
    fill(80, 50, 30);
    ellipse(0, 20, 18, 16);

    // Right claws
    stroke(40, 30, 25);
    strokeWeight(1.5);
    line(-6, 25, -8, 30);
    line(-2, 26, -2, 32);
    line(2, 26, 2, 32);
    line(6, 25, 8, 30);
    pop();

    // === HEAD ===
    fill(110, 75, 45);
    stroke(0);
    strokeWeight(2);
    ellipse(0, -15, 70, 75);

    // === EARS ===
    // Left ear
    fill(100, 70, 40);
    stroke(0);
    strokeWeight(2);
    ellipse(-25, -45, 25, 28);

    // Right ear
    ellipse(25, -45, 25, 28);

    // Inner ear details
    fill(80, 55, 30);
    noStroke();
    ellipse(-25, -43, 15, 18);
    ellipse(25, -43, 15, 18);

    // === SNOUT ===
    fill(130, 95, 65);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, 45, 35);

    // === NOSE ===
    fill(40, 30, 25);
    beginShape();
    vertex(0, -8);
    vertex(-8, 2);
    vertex(8, 2);
    endShape(CLOSE);

    // === MOUTH ===
    stroke(0);
    strokeWeight(2);
    line(-8, 12, 8, 12);
    line(0, 5, 0, 12);

    // === EYES (with player tracking) ===
    // Left eye white
    fill(40, 30, 25);
    stroke(0);
    strokeWeight(2);
    ellipse(-15, -15, 12, 14);

    // Right eye white
    ellipse(15, -15, 12, 14);

    // Left pupil (tracks player)
    fill(0);
    noStroke();
    ellipse(-15 + eyeLookX, -14 + eyeLookY, 6, 7);

    // Right pupil (tracks player)
    ellipse(15 + eyeLookX, -14 + eyeLookY, 6, 7);

    // Left eye reflection
    fill(255);
    ellipse(-16 + eyeLookX, -16 + eyeLookY, 3, 3);

    // Right eye reflection
    ellipse(16 + eyeLookX, -16 + eyeLookY, 3, 3);

    // === EYEBROWS (focused expression) ===
    stroke(60, 40, 20);
    strokeWeight(3);
    noFill();
    line(-22, -25, -10, -23);
    line(22, -25, 10, -23);

    pop();
}


function drawKidSoccer(x, y, s) {
    push();
    translate(x, y);
    scale(s);
    // Use runPhase for synchronized animation (opposite direction)
    let legOffset = 35 * sin(-runPhase + PI); // Negative for opposite direction
    let armOffset = 30 * sin(-runPhase * 0.7); // Slower arm movement (0.5x speed)
    let torsoTremble = sin(-runPhase * 4) * 0.5;
    let trembleX = sin(-runPhase * 0.8) * 1.5;
    let trembleY = sin(-runPhase * 0.8) * 1;

    rectMode(CENTER);
    ellipseMode(CENTER);

    push();
    translate(trembleX, trembleY);

    stroke(0);
    strokeWeight(3);

    // Calculate knee bend for running animation
    let leftLegPhase = -runPhase;
    let rightLegPhase = -runPhase;

    // Vertical leg movement (up and down) - smaller range for perspective
    let leftLegY = abs(sin(leftLegPhase)) * 1;
    let rightLegY = abs(sin(rightLegPhase)) * 20;

    // Slight forward angle for perspective (legs coming towards viewer)
    let leftLegAngle = sin(leftLegPhase) * -1; // Slight angle forward/back
    let rightLegAngle = sin(rightLegPhase) * 1;

    // Knee angles (lower leg bend) - bend more when lifted
    let leftKneeBend = sin(leftLegPhase) * 15 + 15; // Less extreme bend
    let rightKneeBend = sin(rightLegPhase) * 15 + 15;

    // ================================
    // SOCCER BALL (in front, being kicked forward)
    // ================================
    let ballX = sin(leftLegPhase) * 15;
    let ballY = 50 + abs(sin(leftLegPhase)) * 10;

    fill(255);
    stroke(0);
    strokeWeight(2);
    ellipse(ballX, ballY, 15, 15);

    // Black pentagons pattern
    fill(0);
    noStroke();
    beginShape();
    vertex(ballX, ballY - 5);
    vertex(ballX - 3, ballY - 2);
    vertex(ballX - 2, ballY + 2);
    vertex(ballX + 2, ballY + 2);
    vertex(ballX + 3, ballY - 2);
    endShape(CLOSE);

    // ================================
    // LEGS & SHOES (with knees, running vertically)
    // ================================

    fill(40, 50, 80);
    stroke(0);
    strokeWeight(2);

    // LEFT LEG
    push();
    translate(-10, 15 - leftLegY); // Vertical movement
    rotate(radians(leftLegAngle)); // Slight angle for perspective

    // Left thigh
    rect(0, 10, 12, 20, 4);

    // Left knee joint
    fill(35, 45, 75);
    ellipse(0, 20, 10, 10);

    // Left shin (lower leg)
    push();
    translate(0, 20);
    rotate(radians(leftKneeBend));
    fill(40, 50, 80);
    rect(0, 10, 11, 20, 4);

    // Left shoe
    fill(255, 50, 50);
    rect(0, 22, 16, 10, 2);

    // Shoe stripes
    stroke(255);
    strokeWeight(1);
    line(-3, 20, 3, 20);
    line(-3, 22, 3, 22);
    line(-3, 24, 3, 24);
    pop();
    pop();

    // RIGHT LEG
    push();
    translate(10, 15 - rightLegY); // Vertical movement
    rotate(radians(rightLegAngle)); // Slight angle for perspective

    // Right thigh
    fill(40, 50, 80);
    stroke(0);
    strokeWeight(2);
    rect(0, 10, 12, 20, 4);

    // Right knee joint
    fill(35, 45, 75);
    ellipse(0, 20, 10, 10);

    // Right shin (lower leg)
    push();
    translate(0, 20);
    rotate(radians(rightKneeBend));
    fill(40, 50, 80);
    rect(0, 10, 11, 20, 4);

    // Right shoe
    fill(255, 50, 50);
    rect(0, 22, 16, 10, 2);

    // Shoe stripes
    stroke(255);
    strokeWeight(1);
    line(-3, 20, 3, 20);
    line(-3, 22, 3, 22);
    line(-3, 24, 3, 24);
    pop();
    pop();

    // ================================
    // TORSO - BARCELONA JERSEY
    // ================================
    fill(165, 0, 52); // Barcelona burgundy/garnet
    stroke(0);
    strokeWeight(3);
    rect(0, -15 + torsoTremble, 30, 55, 8);

    // Barcelona horizontal stripes (blue)
    fill(0, 51, 160); // Barcelona blue
    noStroke();
    rect(0, -38 + torsoTremble, 27, 6);
    rect(0, -26 + torsoTremble, 30, 6);
    rect(0, -14 + torsoTremble, 30, 6);
    rect(0, -2 + torsoTremble, 30, 6);

    // Barcelona crest (simplified)
    stroke(0);
    strokeWeight(1.5);
    fill(255, 215, 0); // Gold
    beginShape();
    vertex(-8, -36 + torsoTremble);
    vertex(-8, -30 + torsoTremble);
    vertex(0, -28 + torsoTremble);
    vertex(8, -30 + torsoTremble);
    vertex(8, -36 + torsoTremble);
    vertex(0, -38 + torsoTremble);
    endShape(CLOSE);

    // Cross on crest (red)
    fill(200, 16, 46);
    noStroke();
    rect(-1, -36 + torsoTremble, 2, 6);
    rect(-4, -34 + torsoTremble, 8, 2);

    // Jersey collar
    stroke(0);
    strokeWeight(2);
    fill(165, 0, 52);
    arc(0, -42 + torsoTremble, 20, 12, 0, PI);

    // Jersey number
    fill(255, 215, 0); // Gold number
    stroke(0);
    strokeWeight(1.5);
    textSize(9);
    textAlign(CENTER);
    text("10", 3, -22 + torsoTremble);
    // ================================
    // ARMS (with elbows, closer to body)
    // ================================
    fill(200, 160, 130); // Lighter skin tone for kid
    stroke(0);
    strokeWeight(2);

    // LEFT ARM
    push();
    translate(-15, -25); // Closer to body

    // Left upper arm
    beginShape();
    vertex(0, 0);
    vertex(-3, 0);
    vertex(-3, 15);
    vertex(0, 15);
    endShape(CLOSE);

    // Left elbow joint
    fill(180, 140, 110);
    ellipse(-1.5, 15, 7, 7);

    // Left forearm (bends at elbow)
    push();
    translate(-1.5, 15);
    rotate(radians(-armOffset * 0.7)); // Bend at elbow
    fill(200, 160, 130);
    beginShape();
    vertex(-2, 0);
    vertex(2, 0);
    vertex(2, 12);
    vertex(-2, 12);
    endShape(CLOSE);

    // Left hand
    fill(200, 160, 130);
    ellipse(0, 14, 6, 7);
    pop();
    pop();

    // RIGHT ARM
    push();
    translate(15, -25); // Closer to body

    // Right upper arm
    fill(200, 160, 130);
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(0, 0);
    vertex(3, 0);
    vertex(3, 15);
    vertex(0, 15);
    endShape(CLOSE);

    // Right elbow joint
    fill(180, 140, 110);
    ellipse(1.5, 15, 7, 7);

    // Right forearm (bends at elbow)
    push();
    translate(1.5, 15);
    rotate(radians(armOffset * 1)); // Bend at elbow (opposite direction)
    fill(200, 160, 130);
    beginShape();
    vertex(-2, 0);
    vertex(2, 0);
    vertex(2, 12);
    vertex(-2, 12);
    endShape(CLOSE);

    // Right hand
    fill(200, 160, 130);
    ellipse(0, 14, 6, 7);
    pop();
    pop();

    // ================================
    // HEAD (SMALLER - it's a kid)
    // ================================
    fill(200, 160, 130);
    stroke(0);
    strokeWeight(2.5);
    ellipse(0, -65, 38, 46);  // Smaller head for child

    // Hair (short, messy kid hair)
    fill(40, 30, 20); // Dark brown
    stroke(0);
    strokeWeight(2);
    ellipse(0, -75, 35, 27);

    // Eyebrows (determined expression)
    stroke(30, 20, 10);
    strokeWeight(4);
    line(-12, -59, -5, -57);
    line(12, -59, 5, -57);

    // Mouth (small smile/determined)
    noFill();
    stroke(0);
    strokeWeight(1.5);
    arc(0, -50, 10, 2, 0, PI);

    pop();
    pop();
}


