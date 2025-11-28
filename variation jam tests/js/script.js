function setup() {
    createCanvas(1200, 800);
}

function draw() {
    background(135, 206, 235); // Sky blue



    drawSchoolBusFrontView(400, 330, 1);
    drawFiatCar(400, 200, 1);
    push();
    translate(600, 150); // Move tree to x=600, y=750 (near bottom)
    drawMappleTree();
    pop();
    drawFatGuy(200, 200, 1);
    drawChevrolet(100, 500, 1);

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

    // Wheel rims
    fill(150);
    noStroke();
    ellipse(-35, 46, 2, 4);
    ellipse(35, 46, 2, 4);

    pop();
}


function drawMappleTree() {
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

    // Wheel rims (chrome effect)
    fill(180);
    noStroke();
    ellipse(-42, 58, 2, 18);
    ellipse(42, 58, 2, 18);

    // Rim spokes
    stroke(100);
    strokeWeight(1);
    for (let i = 0; i < 5; i++) {
        let angle = (TWO_PI / 5) * i;
        line(-42, 58, -42 + cos(angle) * 5, 58 + sin(angle) * 8);
        line(42, 58, 42 + cos(angle) * 5, 58 + sin(angle) * 8);
    }

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
    arc(-42, 57, 22, 35, 0, PI, CHORD);
    arc(42, 57, 22, 35, 0, PI, CHORD);

    // Wheel rims (chrome effect)
    fill(180);
    noStroke();
    ellipse(-42, 58, 12, 18);
    ellipse(42, 58, 12, 18);

    // Rim spokes
    stroke(100);
    strokeWeight(1);
    for (let i = 0; i < 5; i++) {
        let angle = (TWO_PI / 5) * i;
        line(-42, 58, -42 + cos(angle) * 5, 58 + sin(angle) * 8);
        line(42, 58, 42 + cos(angle) * 5, 58 + sin(angle) * 8);
    }

    pop();
}

