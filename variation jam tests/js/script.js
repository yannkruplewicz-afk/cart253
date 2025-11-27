function setup() {
    createCanvas(1200, 800);
}

function draw() {
    background(135, 206, 235); // Sky blue



    drawSchoolBusFrontView(400, 330, 1);
    drawFiatCar(400, 200, 1);

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
    arc(-90, 95, 35, 45, 0, PI, CHORD);
    arc(90, 95, 35, 45, 0, PI, CHORD);

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