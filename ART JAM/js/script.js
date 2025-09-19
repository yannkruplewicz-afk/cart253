/**
 * Art Jam Project
 * Yann Kruplewicz
 * 
 * Self portrait with JavaScript for Art Jam Project, beggining date: 2025-11-09
 */

"use strict";

/**
 * creates a canvas
*/
function setup() {
    createCanvas(1200, 1000);
}


/**
 * sets the background 
*/
function draw() {
    background("#2D302E");

    DrawFrame();

    clip(frameMask, { invert: false });

    //head of frame
    push();
    fill("#22451D");
    noStroke();
    strokeWeight(2);
    rect(50, 50, 1100, 1000);
    pop();

    DrawJacket();   // draws the jacket step by step with different layers to create a 3D effect
    DrawHead(); // draws the head step by step with different layers to create a 3D effect
    DrawDetailsNeck(); // draws the details of the neck

}

function frameMask() {
    rect(100, 100, width - 200, height - 200); // creates a mask for the frame
}


function DrawFrame() {
    //creates light gray borders of frame
    push();
    noFill();
    stroke("grey");
    strokeWeight(20);
    rect(50, 50, 1100, 900);
    pop();

    // creates white borders of frame
    push();
    noFill();
    stroke("white");
    strokeWeight(10);
    rect(50, 50, 1100, 900);
    pop();

}



function DrawJacket() {
    //draws left bottom part of jacket
    push();
    fill("#060809ff");
    noStroke();
    strokeWeight(2);
    translate(3, 187); // Move the origin to the ellipse center
    rotate(radians(-5)); // Rotate 
    ellipse(300, 800, 1200, 400);
    pop();

    //draws right bottom part of jacket
    push();
    fill("#060809ff");
    noStroke();
    strokeWeight(2);
    translate(1100, 157); // Move the origin to the ellipse center
    rotate(radians(21)); // Rotate 
    ellipse(300, 800, 1200, 400);
    pop();

    //draws higher part of capuche of jacket
    push();
    fill("#010206ff");
    noStroke();
    strokeWeight(2);
    translate(550, -257); // Move the origin to the ellipse center
    rotate(radians(10)); // Rotate 
    ellipse(300, 800, 800, 500);
    pop();


    //draws left part of capuche of jacket
    push();
    fill("#010206ff");
    noStroke();
    strokeWeight(2);
    translate(-150, 157); // Move the origin to the ellipse center
    rotate(radians(-10)); // Rotate 
    ellipse(300, 800, 200, 500);
    pop();

    //draws right part of capuche of jacket
    push();
    fill("#010206ff");
    noStroke();
    strokeWeight(2);
    translate(500, -27); // Move the origin to the ellipse center
    rotate(radians(-5)); // Rotate 
    ellipse(300, 800, 500, 200);
    pop();
}
function DrawHead() {
    // draws the head step by step with different layers to create a 3D effect
    // draws the neck

    //layer of neck
    push();
    fill("#FCC6BB");
    noStroke();
    translate(-435, 0); // Move the origin to the ellipse center
    rotate(radians(-6));
    strokeWeight(2);
    rect(600, 400, 30, 600);
    pop();

    push();
    fill("#FCC6BB");
    noStroke();
    strokeWeight(2);
    ellipse(560, 600, 650, 800); // completes the neck, left hand side
    fill("#fcc6bb");
    translate(-450, 0); // Move the origin to the ellipse center
    rotate(radians(-7));
    rect(625, 700, 600, 1200);// continuity of the neck, left bottom side

    fill("#EB9383");// draws shadow in the neck, left side
    translate(68, 700); // Move the origin to the ellipse center
    rotate(radians(-33));
    ellipse(625, 700, 400, 800);

    pop();



    //jaw


    push();
    fill("#D76D56");
    translate(510, -400); // creates a shadow behind the jaw
    rotate(radians(27)); // creates light brown shadow part 1 behind the jaw
    noStroke();
    ellipse(650, 900, 510, 400);
    pop();

    push();
    fill("#d76d56");
    translate(310, -120); // creates a shadow behind the jaw
    rotate(radians(9)); // // creates light brown shadow part 2 behind the jaw
    noStroke();
    ellipse(650, 900, 210, 700);
    pop();

    // creates big brown circle that acts as a shadow for the head 
    push();
    fill("#8C2817");
    translate(50, 7); // Move the origin to the ellipse center
    rotate(radians(7)); // Rotate 
    noStroke();
    ellipse(600, 430, 700, 500);
    pop();


    // imrpoves the jaw with another layer on the right side
    push();
    fill("#FCC6BB");
    translate(49, 43); // Move the origin to the ellipse center
    rotate(radians(-14)); // Rotate 
    noStroke();
    ellipse(550, 730, 370, 170);
    pop();

    // improves the jaw with another layer on the middle
    push();
    fill("#FCC6BB");
    translate(-50, 50); // develops center of jaw
    rotate(radians(-4)); // Rotate 
    noStroke();
    ellipse(650, 700, 200, 50);
    pop();

    // draws right ear
    //right ear
    push();
    fill("#D76D56");
    noStroke();
    translate(100, -180); // Move the origin to the ellipse center
    rotate(radians(12));
    ellipse(990, 380, 90, 200);
    pop();


    push(); // head itself
    fill("#FCC6BB");
    noStroke();
    ellipse(600, 300, 800, 850);
    pop();


    //left ear
    push();
    fill("#EB9383");
    noStroke();
    translate(240, 400); // Move the origin to the ellipse center
    rotate(radians(-7)); // Rotate the left hair to have a good perspective
    ellipse(0, 0, 190, 240); // Draw ellipse at the new origin
    pop();


    push();   // develops right side of the jaw
    fill("#FCC6BB");
    noStroke();
    translate(430, 1110);
    rotate(radians(-78));
    rect(600, 300, 190, 90);
    pop();




}

function DrawDetailsNeck() {
    //details of the neck

    // creates circles of skin color in the neck, behind the jaw to improve the shadows
    push();
    fill("#FFC6B8");
    translate(-66, -90); // develops center of jaw
    rotate(radians(4)); // Rotate 
    noStroke();
    ellipse(630, 900, 260, 130);
    fill("#ffc6b8");
    translate(-50, -77); // develops center of jaw
    rotate(radians(4)); // Rotate 
    noStroke();
    ellipse(630, 900, 260, 130);
    pop();


    // develops center of jaw, the stroke creates the round thing the men have on the neck
    push();
    fill("#eb9383");
    stroke("#d76d56");
    translate(-90, 17); // develops center of jaw, the stroke creates the round thing the men have on the neck
    rotate(radians(-4)); // rotate for the perspective
    strokeWeight(2);
    ellipse(650, 900, 50, 70);
    pop();




}



