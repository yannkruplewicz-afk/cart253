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
    // divided into different parts :
    // 1= shadows behind eyes
    // 2= eyes themselves
    // 3= details (eyebrows, eyelashes, retina, eyebowl)
    // 4= details regarding the skin around the eyes
    DrawDetailshead();// draws the noose (nez)

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
    ellipse(960, 165, 230, 60);
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

    push();
    fill("#2C1B0B");
    noStroke();
    translate(35, -25); // right side of hair
    rotate(radians(0));
    arc(790, 400, 300, 450, PI + QUARTER_PI, 0 + TWO_PI, OPEN);

    push();// shadow of previous arc
    fill("#24100B");
    noStroke();
    translate(10, 10); // right side of hair
    rotate(radians(0));
    arc(790, 330, 170, 230, PI + QUARTER_PI, 0 + TWO_PI, OPEN);


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
    fill("#e08773f6");
    noStroke();
    translate(100, -214); // Move the origin to the ellipse center
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


    // draws a shadow between both eyes 
    push();
    noStroke();
    translate(142, 15); // completes the drawing of left eye
    rotate(radians(-1));
    fill("#d47a7a77");
    ellipse(530, 570, 190, 90)
    pop();

    // draws shadows above and around eyes this is FOR LEFT EYE
    push();
    noStroke();
    fill("#bb2424cb");
    ellipse(530, 570, 120, 70)
    pop();

    push();
    noStroke();
    fill("#bb2424cb");
    translate(459, -59); // completes the drawing of right eye, red shadow in the right corner
    rotate(radians(9));
    ellipse(530, 570, 150, 90)
    pop();

    // DRAWS SHADOWS IN BETWEEN THE EYES, right side
    push();
    noStroke();
    fill("#bb2424fd");
    translate(129, 189);
    rotate(radians(-9));
    ellipse(530, 570, 70, 190)
    pop();

    push();
    noStroke();
    fill("#bb2424fd");
    translate(146, 109);
    rotate(radians(-9));
    ellipse(530, 570, 90, 70)
    pop();

    // DRAWS SHADOWS IN BETWEEN THE EYES, left side
    push();
    noStroke();
    fill("#d37575fd");
    translate(-21, 169);
    rotate(radians(-9));
    ellipse(530, 570, 70, 190)
    pop();

    push();
    noStroke();
    fill("#bb2424fd");
    translate(146, 109);
    rotate(radians(-9));
    ellipse(530, 570, 90, 70)
    pop();


    push();
    noStroke();
    translate(-51, 45); // completes the drawing of left eye
    rotate(radians(-5));
    fill("#5b121269");
    ellipse(490, 610, 140, 70)
    pop();

    push();
    noStroke();
    translate(-51, 53); // completes the drawing of left eye
    rotate(radians(-5));
    fill("#f0b6a3ff");
    ellipse(490, 610, 140, 70)
    pop();

    push();
    fill("white");
    translate(-160, 630); // draws left eye
    rotate(radians(-25));
    arc(590, 330, 150, 170, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();


    // creates bottom border of left eye
    push();
    noFill();
    stroke("#f39f9fff");
    strokeWeight("4");
    // Place le triangle au centre de la pupille gauche
    translate(485, 605); // centre de la pupille gauche
    rotate(radians(140));
    scale(1.2); // ajuste la taille (1.2 = un peu plus grand que la pupille)
    beginShape();
    curveVertex(-30, 3);   // coin bas gauche
    curveVertex(19, -39);    // sommet haut
    curveVertex(59, 9);    // coin bas droit
    curveVertex(-2, 10);   // referme la courbe
    endShape(CLOSE);
    pop();


    //RIGHT EYE

    // draw skin that overlaps the bottom of right eye
    push();
    noStroke();
    translate(489, -9);
    rotate(radians(1));
    fill("#f0b3a6ff");
    ellipse(349, 620, 140, 90)
    pop();


    // draws shadows above and around eyes this is FOR RIGHT EYE
    push();
    noStroke();
    translate(333, -45);
    rotate(radians(5));
    fill("#bb2424ff");
    ellipse(530, 570, 120, 70)
    pop();
    // wine red shadow behind right eye
    push();
    noStroke();
    translate(401, -41); // completes the drawing of RIGHT eye
    rotate(radians(5));
    fill("#5b121269");
    ellipse(490, 610, 140, 70)
    pop();
    //skin prat that underlaps right eye
    push();
    noStroke();
    translate(401, -30); // completes the drawing of  RIGHT eye
    rotate(radians(5));
    fill("#f39f9fff");
    ellipse(490, 610, 140, 70)
    pop();



    // eyebowl right eye
    push();
    fill("white");
    noStroke();
    translate(-10, 569); // completes the drawing of RIGHT eye
    rotate(radians(-5));
    ellipse(500, 100, 140, 70)
    pop();

    push();
    fill("white");
    noStroke();
    translate(325, 503); // completes the drawing of right eye
    rotate(radians(2));
    ellipse(507, 100, 140, 70)
    pop();



    push();
    fill("white");
    translate(105, 635); // Draws right eye
    rotate(radians(-25));
    arc(630, 332, 165, 150, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();



    // Details and layers of left eye
    push();
    stroke("#f39f9fff");
    strokeWeight(11);
    fill("#f39f9fff");
    translate(540, -226);
    rotate(radians(41));
    arc(550, 630, 70, 20, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();

    push();
    fill("#dea295ff");
    noStroke();
    translate(-381, 636);
    rotate(radians(-49));
    arc(550, 630, 120, 60, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();



    // Details and layers of right eye
    push();
    fill("#f39f9fff");
    noStroke();
    translate(590, -179);
    rotate(radians(22));
    arc(550, 630, 90, 40, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();

    push();
    fill("#f39f9fff");
    noStroke();
    translate(43, 530);
    rotate(radians(-40));
    arc(550, 630, 60, 20, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();


    // DETAILS OF BOTH EYES (retina, eyebowl, eye corners)

    push();// THIS IF FOR RIGHT EYE, IT DRAWS THE EYEBOWL
    fill("#3d4a04ff")
    stroke("#747474ff")
    strokeWeight(5);
    translate(5, 35);
    rotate(radians(-5));
    ellipse(764, 655, 66, 68)
    pop();

    // creates a shadow in the right eye
    push();
    fill("#2a3014ff")
    noStroke();
    strokeWeight(5);
    translate(172, 214);
    rotate(radians(-22));
    ellipse(469, 619, 28, 46)
    pop();


    // NOW IT'S LEFT EYE
    push();
    fill("#3d4a04ff")
    stroke("#747474ff")
    strokeWeight(5);
    ellipse(495, 625, 66, 68)
    pop();

    // creates a shadow in the left eye
    push();
    fill("#2a3014ff")
    noStroke();
    strokeWeight(5);
    translate(227, -117);
    rotate(radians(15));
    ellipse(434, 645, 28, 46)
    pop();

    push();
    fill("black")
    noStroke();
    ellipse(498, 622, 33, 30) // retina of left eye
    ellipse(824, 618, 33, 30) // retina of right eye
    fill("white")
    noStroke();
    ellipse(497, 623, 15, 12)
    ellipse(820, 619, 13, 10)
    pop();



    fill("#693737ff")
    noStroke();
    ellipse(493, 630, 13, 10)  // reflection light inside of retina of left eye
    ellipse(823, 625, 13, 10) // reflection light inside of retina of right eye
    pop();

    // creates another layer behind the next element : 'triangle with rounded corners' , left eye
    push();
    stroke("#f0b3a6ff");
    strokeWeight(11);
    noFill();
    translate(510, 776);
    scale(1, -1);
    rotate(radians(28));
    arc(100, 100, 70, 20, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();


    // creates another layer behind the next element : 'triangle with rounded corners' , right eye
    push();
    stroke("#f39f9fff");
    strokeWeight(15);
    noFill();
    translate(774, 488);
    scale(1, -1);
    rotate(radians(-129));
    arc(100, 100, 90, 56, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();
    // layer of skin that overlaps right eye at the top
    push();
    stroke("#f0b3a6ff");
    strokeWeight(9);
    noFill();
    translate(844, 484);
    scale(1, -1);
    rotate(radians(-155));
    arc(100, 100, 90, 36, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();


    // DEEPER DETAILS IN EYES 
    // Add of a triangle with rounded corners for more details in the eyes, LEFT EYE
    push();
    fill("#ec9a88ff");
    noStroke();
    translate(-52, 178);
    rotate(radians(-14));
    beginShape();
    curveVertex(470, 600); // control point for smoothness
    curveVertex(475, 610); // first corner (bottom left)
    curveVertex(490, 590); // second corner (top)
    curveVertex(505, 610); // third corner (bottom right)
    endShape(CLOSE);
    pop();

    // covers a part of the triangle that needs to be covered ,LEFT EYE
    push();
    stroke("#F0B3A6FF");
    strokeWeight(9);
    noFill();
    translate(488, 773);
    scale(1, -1);
    rotate(radians(22));
    arc(100, 100, 70, 20, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    // LAYERS OF THE LEFT EYE FOR MORE DETAILS

    //skin that has to be seen prior to the eye at the top, LEFT EYE
    push();
    stroke("#f0b3a6ff");
    strokeWeight(14);
    noFill();
    translate(499, 444); // position au-dessus de l'œil gauche
    scale(1, -1); // miroir vertical
    rotate(radians(181)); // légère inclinaison
    arc(0, 200, 160, 100, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();


    //skin that has to be seen prior to the eye at the BOTTOM, LEFT EYE
    push();
    stroke("#f39f9fff")
    strokeWeight(0);
    fill("#f39f9fff");
    translate(551, 473); // position au-dessus de l'œil gauche
    scale(1, -1); // miroir vertical
    rotate(radians(167)); // légère inclinaison
    arc(0, 200, 50, 20, PI + QUARTER_PI, 0 + TWO_PI, OPEN);
    pop();


    // LAYERS OF THE RIGHT EYE FOR MORE DETAILS , RIGHT EYE

    //skin that has to be seen prior to the eye at the top, RIGHT EYE
    push();
    stroke("#f0b3a6ff");
    strokeWeight(18);
    noFill();
    translate(855, 440); // position au-dessus de l'œil gauche
    scale(1, -1); // miroir vertical
    rotate(radians(174)); // légère inclinaison
    arc(0, 200, 160, 100, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    //skin that has to be seen prior to the eye at the BOTTOM, RIGHT EYE
    push();
    stroke("#f39f9fff");
    strokeWeight(14);
    noFill();
    translate(838, 477); // position au-dessus de l'œil gauche
    scale(1, -1); // miroir vertical
    rotate(radians(175)); // légère inclinaison
    arc(0, 200, 120, 40, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();


    // Add of a triangle with rounded corners for more details in the eyes  RIGHT EYE
    push();
    fill("#ec9a88ff");
    noStroke();
    // completes the drawing of left eye
    translate(755, 636); // centre du triangle
    scale(-1, 1);        // miroir horizontal
    rotate(radians(-14));
    beginShape();
    curveVertex(-20, 0);   // control point for smoothness
    curveVertex(-15, 10);  // premier coin (bas gauche)
    curveVertex(0, -10);   // deuxième coin (haut)
    curveVertex(15, 10);   // troisième coin (bas droit)
    endShape(CLOSE);
    pop();

    // covers a part of the triangle that needs to be covered , RIGHT EYE
    push();
    stroke("#F0B3A6FF");
    strokeWeight(9);
    noFill();
    translate(650, 698);
    scale(1, -1);
    rotate(radians(-20));
    arc(100, 100, 70, 20, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();


    // EYELASHES 

    // EYELASHES LEFT EYE

    push();
    stroke("#ff");
    strokeWeight(1);
    noFill();
    translate(489, 640); // centre de l'œil gauche
    rotate(radians(-39)); // ajuster l'orientation
    for (let i = -2; i <= 2; i++) {
        let angle = radians(-60 + i * 30);
        let r1 = 50;
        let r2 = 60;
        let yOffset = (i >= -1 && i <= 1) ? 10 : 0; // décale les 3 cils du milieu vers le bas
        let x1 = r1 * cos(angle);
        let y1 = r1 * sin(angle) + yOffset;
        let x2 = r2 * cos(angle);
        let y2 = r2 * sin(angle) + yOffset;
        line(x1, y1, x2, y2);
    }
    pop();

    push();
    stroke(60);
    strokeWeight(1);
    noFill();
    translate(481, 640); // centre de l'œil gauche
    rotate(radians(-40)); // ajuster l'orientation
    for (let i = -2; i <= 2; i++) {
        let angle = radians(-60 + i * 30);
        let r1 = 50;
        let r2 = 60;
        let yOffset = (i >= -1 && i <= 1) ? 10 : 0; // décale les 3 cils du milieu vers le bas
        let x1 = r1 * cos(angle);
        let y1 = r1 * sin(angle) + yOffset;
        let x2 = r2 * cos(angle);
        let y2 = r2 * sin(angle) + yOffset;
        line(x1, y1, x2, y2);
    }
    pop();



    // EYELAHES RIGHT EYE

    push();
    stroke("white");
    strokeWeight(1);
    noFill();
    translate(823, 630); // centre de l'œil gauche
    rotate(radians(-31)); // ajuster l'orientation
    for (let i = -2; i <= 2; i++) {
        let angle = radians(-60 + i * 30);
        let r1 = 50;
        let r2 = 60;
        let yOffset = (i >= -1 && i <= 1) ? 10 : 0; // décale les 3 cils du milieu vers le bas
        let x1 = r1 * cos(angle);
        let y1 = r1 * sin(angle) + yOffset;
        let x2 = r2 * cos(angle);
        let y2 = r2 * sin(angle) + yOffset;
        line(x1, y1, x2, y2);
    }
    pop();

    push();
    stroke(60);
    strokeWeight(1);
    noFill();
    translate(833, 632); // centre de l'œil gauche
    rotate(radians(-27)); // ajuster l'orientation
    for (let i = -2; i <= 2; i++) {
        let angle = radians(-60 + i * 30);
        let r1 = 50;
        let r2 = 60;
        let yOffset = (i >= -1 && i <= 1) ? 10 : 0; // décale les 3 cils du milieu vers le bas
        let x1 = r1 * cos(angle);
        let y1 = r1 * sin(angle) + yOffset;
        let x2 = r2 * cos(angle);
        let y2 = r2 * sin(angle) + yOffset;
        line(x1, y1, x2, y2);
    }
    pop();



    // EYEBROWS
    // LEFT EYEBROW
    push();
    stroke("#3b2a1af8");
    strokeWeight(24);
    noFill();
    translate(470, 630); // position au-dessus de l'œil gauche
    rotate(radians(-8)); // légère inclinaison
    arc(0, 0, 300, 170, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    push();
    stroke("#3b2a1af8");
    strokeWeight(15);
    noFill();
    translate(498, 608); // position au-dessus de l'œil droit
    rotate(radians(1)); // légère inclinaison
    arc(0, 0, 440, 140, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    push();
    stroke("#3b2a1af8");
    strokeWeight(22);
    noFill();
    translate(542, 568); // position au-dessus de l'œil droit
    rotate(radians(7)); // légère inclinaison
    arc(0, 0, 340, 40, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    // RIGHT EYEBROW
    push();
    stroke("#3b2a1af8");
    strokeWeight(23);
    noFill();
    translate(868, 610); // position au-dessus de l'œil droit
    rotate(radians(11)); // légère inclinaison
    arc(0, 0, 240, 140, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    // Sourcil droit
    push();
    stroke("#3b2a1af8");
    strokeWeight(13);
    noFill();
    translate(868, 595); // position au-dessus de l'œil droit
    rotate(radians(-5)); // légère inclinaison
    arc(0, 0, 340, 100, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    push();
    stroke("#3b2a1af8");
    strokeWeight(23);
    noFill();
    translate(800, 563); // position au-dessus de l'œil droit
    rotate(radians(-11)); // légère inclinaison
    arc(0, 0, 340, 40, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    push();
    stroke("#3b2a1af8");
    strokeWeight(19);
    noFill();
    translate(809, 570); // position au-dessus de l'œil droit
    rotate(radians(-11)); // légère inclinaison
    arc(0, 0, 360, 40, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    push();
    stroke("#3b2a1af8");
    strokeWeight(19);
    noFill();
    translate(839, 587); // position au-dessus de l'œil droit
    rotate(radians(-3)); // légère inclinaison
    arc(0, 0, 360, 100, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();


    // 


    push();
    stroke("#fcb8a7f1");
    strokeWeight(6);
    noFill();
    translate(857, 565); // position au-dessus de l'œil droit
    rotate(radians(22)); // légère inclinaison
    arc(0, 0, 340, 72, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    // draws corners of eyes for more accurate details THIS IS FOR LEFT
    push();
    fill("#f39f9fff");
    noStroke();
    // Place le triangle au centre de la pupille gauche
    translate(895, 630); // centre de la pupille gauche
    scale(1.2); // ajuste la taille (1.2 = un peu plus grand que la pupille)
    beginShape();
    curveVertex(-10, 10);   // coin bas gauche
    curveVertex(0, -12);    // sommet haut
    curveVertex(10, 10);    // coin bas droit
    curveVertex(-10, 10);   // referme la courbe
    endShape(CLOSE);
    pop();

    push();
    fill("#f39f9fff");
    noStroke();
    // Place le triangle au centre de la pupille gauche
    translate(423, 637); // centre de la pupille gauche
    scale(1.2); // ajuste la taille (1.2 = un peu plus grand que la pupille)
    beginShape();
    curveVertex(-10, 10);   // coin bas gauche
    curveVertex(0, -12);    // sommet haut
    curveVertex(10, 10);    // coin bas droit
    curveVertex(-10, 10);   // referme la courbe
    endShape(CLOSE);
    pop();

    // DRAWS BLACK SHAODOWS JUST ABOVE THE EYEBOWL, left eye
    push();
    stroke("#140404f1");
    strokeWeight(2);
    noFill();
    translate(480, 628); // position au-dessus de l'œil droit
    rotate(radians(-12)); // légère inclinaison
    arc(0, 0, 140, 47, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();

    // DRAWS BLACK SHAODOWS JUST ABOVE THE EYEBOWL, right eye
    push();
    stroke("#140404f1");
    strokeWeight(2);
    noFill();
    translate(850, 623); // position au-dessus de l'œil droit
    rotate(radians(12)); // légère inclinaison
    arc(0, 0, 140, 47, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
    pop();




}


function DrawDetailshead() {

    //draws shadows of left ear
    push();
    translate(0, 400); // MY MISTAKE I HAVE PUT TWO TRANSLATE' BUT IT WORKS RIGHT 
    fill("#D76D56");
    noStroke();
    translate(-230, -347); // Move the origin to the ellipse center
    rotate(radians(-9)); // Rotate 
    ellipse(300, 800, 100, 180);
    pop();

    push();
    translate(0, 420); // MMY MISTAKE I HAVE PUT TWO TRANSLATE' BUT IT WORKS RIGHT 
    fill("#eb9383");
    noStroke();
    translate(-210, -347); // Move the origin to the ellipse center
    rotate(radians(-9)); // Rotate 
    ellipse(300, 800, 100, 180);
    pop();


    push();
    translate(0, 400); // MY MISTAKE I HAVE PUT TWO TRANSLATE' BUT IT WORKS RIGHT 
    noStroke();
    fill("#d26951bb");
    translate(-212, -331); // Move the origin to the ellipse center
    rotate(radians(-9)); // Rotate 
    ellipse(300, 800, 60, 90);
    pop();

    push();
    translate(0, 400); // MY MISTAKE I HAVE PUT TWO TRANSLATE' BUT IT WORKS RIGHT 
    fill("#eb9383");
    noStroke();
    translate(142, -431); // Move the origin to the ellipse center
    rotate(radians(15)); // Rotate 
    ellipse(300, 800, 70, 100);
    pop();

    // END OF SHADWOS OF LEFT EAR

    //draws shadows of right ear

    push();
    fill("#d76d56");
    noStroke();
    translate(840, -77); // Move the origin to the ellipse center
    rotate(radians(9)); // Rotate 
    ellipse(300, 800, 30, 140);
    pop();

    push();
    fill("#e08773ff");
    noStroke();
    translate(805, -77); // Move the origin to the ellipse center
    rotate(radians(9)); // Rotate 
    ellipse(330, 800, 20, 126);
    pop();


    push();
    fill("#d26951ff");
    noStroke();
    translate(832, -71); // Move the origin to the ellipse center
    rotate(radians(9)); // Rotate 
    ellipse(300, 800, 18, 60);
    pop();
    // right EAR FINISHED

}





