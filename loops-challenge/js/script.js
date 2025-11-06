/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("green");


    let x = 0;
    let y = 0;
    let s = 10;
    let s2 = 10;

    for (let x = 0; x < width; x++) {
        // Map x position to a color range (darker on left, lighter on right)
        let r = map(x, 0, width, 0, 255);   // Red increases left → right
        let g = map(x, 0, width, 100, 255); // Slight green tint
        let b = map(x, 0, width, 0, 150);   // Blue adds depth

        stroke(r, g, b);
        line(x, 0, x, height); // Vertical line for the gradient
    }


    while (x <= width) {
        stroke(s);
        line(x, y, x, height);
        x += 25;
        s += 12.5;
    }


    while (y <= height) {
        stroke(s2);
        line(0, y, width, y);
        y += 25;
        s2 += 2.5

    }



}