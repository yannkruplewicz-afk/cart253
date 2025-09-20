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

    createCanvas(1200, 1400);


}


/**
 * sets the background 
*/
function draw() {


    background("#2D302E");


    DrawFrame();


    DrawFace(); // draws the top of the head
    DrawHair(); // draws the hair

    clip(frameMask, { invert: false });


    //head of frame
    push();
    fill("#22451D");
    noStroke();
    strokeWeight(2);
    rect(50, 50, 1100, 1400);
    pop();
    //end of head of frame


    DrawJacket();   // draws the jacket step by step with different layers to create a 3D effect
    DrawHead(); // draws the head step by step with different layers to create a 3D effect
    DrawFace(); // draws the top of the head
    DrawDetailsNeck(); // draws the details of the neck
    DrawHair(); // draws the hair
    DrawEyes(); // draws the eyes 

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
    rect(50, 50, 1100, 1300);
    pop();

    // creates white borders of frame
    push();
    noFill();
    stroke("white");
    strokeWeight(10);
    rect(50, 50, 1100, 1300);
    pop();

}



function DrawJacket() {
    //draws left bottom part of jacket
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#060809ff");
    noStroke();
    strokeWeight(2);
    translate(3, 187); // Move the origin to the ellipse center
    rotate(radians(-5)); // Rotate 
    ellipse(300, 800, 1200, 400);
    pop();

    //draws right bottom part of jacket
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#060809ff");
    noStroke();
    strokeWeight(2);
    translate(1100, 157); // Move the origin to the ellipse center
    rotate(radians(21)); // Rotate 
    ellipse(300, 800, 1200, 400);
    pop();

    //draws higher part of capuche of jacket
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#010206ff");
    noStroke();
    strokeWeight(2);
    translate(550, -257); // Move the origin to the ellipse center
    rotate(radians(10)); // Rotate 
    ellipse(300, 800, 800, 500);
    pop();


    //draws left part of capuche of jacket
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#010206ff");
    noStroke();
    strokeWeight(2);
    translate(-150, 157); // Move the origin to the ellipse center
    rotate(radians(-10)); // Rotate 
    ellipse(300, 800, 200, 500);
    pop();

    //draws right part of capuche of jacket
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
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
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#FCC6BB");
    noStroke();
    translate(-435, 0); // Move the origin to the ellipse center
    rotate(radians(-6));
    strokeWeight(2);
    rect(600, 400, 30, 600);
    pop();

    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
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
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#D76D56");
    translate(510, -400); // creates a shadow behind the jaw
    rotate(radians(27)); // creates light brown shadow part 1 behind the jaw
    noStroke();
    ellipse(650, 900, 510, 400);
    pop();

    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#d76d56");
    translate(310, -120); // creates a shadow behind the jaw
    rotate(radians(9)); // // creates light brown shadow part 2 behind the jaw
    noStroke();
    ellipse(650, 900, 210, 700);
    pop();

    // creates big brown circle that acts as a shadow for the head 
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#8C2817");
    translate(50, 7); // Move the origin to the ellipse center
    rotate(radians(7)); // Rotate 
    noStroke();
    ellipse(600, 430, 700, 500);
    pop();


    // imrpoves the jaw with another layer on the right side
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#FCC6BB");
    translate(49, 43); // Move the origin to the ellipse center
    rotate(radians(-14)); // Rotate 
    noStroke();
    ellipse(550, 730, 370, 170);
    pop();

    // improves the jaw with another layer on the middle
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#FCC6BB");
    translate(-50, 50); // develops center of jaw
    rotate(radians(-4)); // Rotate 
    noStroke();
    ellipse(650, 700, 200, 50);
    pop();

    push();   // develops right side of the jaw
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#FCC6BB");
    noStroke();
    translate(430, 1110);
    rotate(radians(-78));
    rect(600, 300, 190, 90);
    pop();
    // end of jaw




}

function DrawDetailsNeck() {
    //details of the neck

    // creates circles of skin color in the neck, behind the jaw to improve the shadows
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
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
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#eb9383");
    stroke("#d76d56");
    translate(-90, 17); // develops center of jaw, the stroke creates the round thing the men have on the neck
    rotate(radians(-4)); // rotate for the perspective
    strokeWeight(2);
    ellipse(650, 900, 50, 70);
    pop();




}
function DrawHair() {
    // draws the hair
    push();
    fill("#2C1B0B");
    noStroke();
    ellipse(600, 265, 500, 100);
    ellipse(640, 165, 300, 200);
    translate(1100, -410); // right side of hair
    rotate(radians(86));
    ellipse(960, 165, 300, 60);
    pop();

    push();
    fill("#24100B");
    noStroke();
    ellipse(600, 265, 170, 40);
    ellipse(640, 165, 190, 20);
    translate(1100, -410); // right side of hair
    rotate(radians(86));
    ellipse(960, 165, 100, 20);
    pop();

    push();
    fill("#2C1B0B");
    noStroke();
    translate(530, -270); // right side of hair
    rotate(radians(66));
    ellipse(760, -100, 300, 90);
    pop();

    push();
    fill("#24100B");
    noStroke();
    translate(530, -270); // right side of hair
    rotate(radians(66));
    ellipse(760, -100, 100, 30);
    pop();

    push();
    fill("#2C1B0B");
    noStroke();
    translate(0, 0); // right side of hair
    rotate(radians(0));
    arc(790, 400, 300, 450, PI + QUARTER_PI, 0 + TWO_PI, OPEN);

    push();// shadow of previous arc
    fill("#24100B");
    noStroke();
    translate(0, 0); // right side of hair
    rotate(radians(0));
    arc(790, 330, 100, 150, PI + QUARTER_PI, 0 + TWO_PI, OPEN);


    pop();


    pop();
    push();
    fill("#2c1b0b");
    noStroke();
    translate(530, -270); // right side of hair
    rotate(radians(66));
    ellipse(870, -90, 120, 50);
    pop();

    push();
    fill("#24100B");
    noStroke();
    translate(530, -270); // right side of hair
    rotate(radians(66));
    ellipse(870, -90, 40, 20);
    pop();



    pop();
    push();
    fill("#2C1B0B");
    noStroke();
    translate(-520, 380); // left side of hair
    rotate(radians(-80));
    ellipse(0, 795, 400, 150);

    pop();

    push();
    fill("#24100B");
    noStroke();
    translate(-520, 380); // left side of hair
    rotate(radians(-80));
    ellipse(0, 765, 300, 100);
    pop();

    push();
    fill("#2C1B0B");
    noStroke();
    translate(-20, -380); // left side of hair
    rotate(radians(-30));
    ellipse(0, 795, 300, 150);
    ellipse(-40, 795, 300, 150);
    ellipse(-80, 825, 300, 100);
    ellipse(60, 745, 300, 100);

    pop();

    // shadows of the hair
    push();
    fill("#24100B");
    noStroke();
    translate(-20, -380); // left side of hair
    rotate(radians(-30));
    ellipse(0, 795, 200, 50);
    ellipse(-40, 795, 100, 50);
    ellipse(-80, 825, 100, 30);
    ellipse(60, 745, 100, 30);


    pop();


}

function DrawFace() {
    // draws the face

    // BEGGINNING OF EARS AND DRAWING OF THE FACE

    // draws right ear
    //right ear
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#D76D56");
    noStroke();
    translate(100, -180); // Move the origin to the ellipse center
    rotate(radians(12));
    ellipse(990, 380, 90, 200);
    pop();


    push(); // head itself
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#FCC6BB");
    noStroke();
    ellipse(600, 300, 800, 850);
    pop();

    push(); // head detail to complete right hand corner of head
    translate(0, 400);
    fill("#FCC6BB");
    noStroke();
    ellipse(800, 100, 400, 450);
    pop();

    push(); // head shadow middle
    translate(-300, -90);
    rotate("0.5")
    fill("#c77463ff")
    stroke("#c77463ff")
    strokeWeight(46)
    ellipse(800, 100, 100, 450);
    pop();



    push(); // head shadow right
    translate(300, 960);
    rotate("-1")
    fill("#eb9383")
    stroke("#eb9383")
    strokeWeight(46)
    ellipse(800, 100, 100, 290);
    pop();

    push(); // head shadow right
    translate(300, 920);
    rotate("-1")
    fill("#c77463ff");
    stroke("#c77463ff")
    strokeWeight(46)
    ellipse(800, 100, 100, 290);
    pop();


    push(); // head itself
    translate(-230, 155); // Move it down because i changed the height of the canvas
    rotate("0")
    fill("#c85c46ff")
    stroke("#c85c46ff")
    strokeWeight(46)
    ellipse(800, 100, 450, 100);
    pop();


    //left ear
    push();
    translate(0, 400); // Move it down because i changed the height of the canvas
    fill("#EB9383");
    noStroke();
    translate(200, 400); // Move the origin to the ellipse center
    rotate(radians(-9)); // Rotate the left hair to have a good perspective
    ellipse(0, 0, 140, 240); // Draw ellipse at the new origin
    pop();

} // end of ears and drawing of the face

function DrawEyes() { // it's funny because the auto completions helped me a lot until this point but now i have reached the max quotas for the free version so i really have to know the codes format, and not write 'pull' rather than 'pop' cause we are not at the gym here !

    push();
    fill("white");
    translate(200, 400); // Move the origin to the ellipse center
    rotate(radians(-9));
    ellipse(500, 100, 200, 100)
    pop();

    push();
    fill("white");
    translate(200, 400); // Move the origin to the ellipse center
    rotate(radians(-9));
    ellipse(300, 100, 200, 100)
    pop();

    push();
    fill("white");
    translate(200, 400); // Move the origin to the ellipse center
    rotate(radians(-9));
    arc(590, 330, 150, 150, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();

    push();
    fill("white");
    translate(200, 400); // Move the origin to the ellipse center
    rotate(radians(-9));
    arc(790, 330, 150, 150, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();


}




